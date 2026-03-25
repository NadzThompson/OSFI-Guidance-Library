# OSFI Guidance Library — AI Agent Scraping & RAG Ingestion Specification
**For:** NOVA RAG Pipeline (TreasuryNavigatorAgent)
**Version:** 1.0 | **Owner:** RBC Corporate Treasury — AI & Advanced Analytics
**Last Updated:** March 2026

---

## PART 1: SITE ARCHITECTURE & DISCOVERY

### 1.1 Base URLs and Page Structure

| Purpose | URL Pattern |
|---|---|
| Index (page 0–5, 50/page) | `https://www.osfi-bsif.gc.ca/en/guidance/guidance-library?page={n}` |
| Index (100/page — 3 pages) | `https://www.osfi-bsif.gc.ca/en/guidance/guidance-library?items_per_page=100&page={n}` |
| Individual guidance page | `https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/{slug}` |
| PDF download | `https://www.osfi-bsif.gc.ca/en/print/pdf/node/{node_id}` |
| Rescinded guidance (EXCLUDE) | `https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/rescinded-guidance` |

**Total corpus estimate:** ~300 active guidance documents across 6 pages (50 items/page default).

**Optimal crawl strategy:** Set `items_per_page=100` to reduce index pages to 3 fetches. Then crawl all individual document URLs extracted from those 3 index pages.

---

## PART 2: AGENT CRAWL SPECIFICATION

### 2.1 Phase 1 — Index Scraping (Seed Discovery)

**Step 1.1 — Fetch all 3 index pages (100 items/page):**
```
GET https://www.osfi-bsif.gc.ca/en/guidance/guidance-library?items_per_page=100&page=0
GET https://www.osfi-bsif.gc.ca/en/guidance/guidance-library?items_per_page=100&page=1
GET https://www.osfi-bsif.gc.ca/en/guidance/guidance-library?items_per_page=100&page=2
```

**Step 1.2 — Parse the guidance table from each index page.**

**HTML selector targets (CSS/XPath):**
```
Table rows:  table > tbody > tr
Cell 0:      <td> → publication_date (text)
Cell 1:      <td> <a href> → url (absolute), title (text)
Cell 2:      <td> <ul><li> items → sector[] (list)
Cell 3:      <td> → publication_type (text)
Cell 4:      <td> → category (text)
```

**Step 1.3 — Build the seed URL list.**
- Extract `href` from every `<a>` in column 1 of every table row
- Resolve to absolute URL: prefix `https://www.osfi-bsif.gc.ca` if relative
- Deduplicate by URL
- Persist to: `bronze/osfi_guidance_seed_urls.jsonl`

**Seed record schema (index-level):**
```json
{
  "url": "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027",
  "slug": "guideline-e-23-model-risk-management-2027",
  "title_from_index": "Guideline E-23 – Model Risk Management (2027)",
  "publication_date_raw": "September 11, 2025",
  "sector": ["Banks", "Foreign Bank Branches", "Life Insurance and Fraternal Companies", "Property and Casualty Companies", "Trust and Loan Companies"],
  "publication_type": "Guideline",
  "category": "Sound Business and Financial Practices",
  "scraped_at_index": "2026-03-22T00:00:00Z"
}
```

---

### 2.2 Phase 2 — Individual Page Scraping (Full Content)

**For each URL in the seed list:**

**Step 2.1 — HTTP Request:**
```
GET {url}
Headers:
  Accept: text/html
  Accept-Language: en-CA, en
  User-Agent: NOVA-RegulatoryBot/1.0 (RBC Corporate Treasury Research; contact: nova-ops@rbc.com)
```

**Rate limiting:** 1 request per 2 seconds. Retry up to 3 times on 429/503 with exponential backoff (4s, 8s, 16s). Log all non-200 responses to `bronze/fetch_errors.jsonl`.

**Step 2.2 — HTML Parsing: What to EXTRACT**

Target the main content area only:
```
Primary content selector:  #wb-cont  OR  main[role="main"]  OR  div.field--type-text-with-summary
```

**Structured metadata block** (appears as a definition list or info panel near the top of every guidance page):
```
Publication type:    .field--name-field-publication-type  OR  <dt>Publication type</dt><dd>
Category:           .field--name-field-category          OR  <dt>Category</dt><dd>
Date:               .field--name-field-date-1            OR  <dt>Date</dt><dd>
Sector:             .field--name-field-sector            OR  <dt>Sector</dt><dd>
Effective date:     .field--name-field-effective-date    OR  <dt>Effective date</dt><dd>
Guideline number:   .field--name-field-no                OR  <dt>No</dt><dd>
Date modified:      .modified  OR  "Date modified:" label at page footer
PDF node ID:        href in [Generate PDF] link → extract integer from URL
Related documents:  All <a href> within "Related documents" section
```

**Body text content:**
```
Extract all <h1>, <h2>, <h3>, <h4>, <p>, <ul>, <ol>, <table> elements
within the main content block — AFTER the metadata panel and BEFORE
the "Report a problem" form and site footer.
```

**Step 2.3 — HTML Parsing: What to IGNORE (Noise Removal)**

Strip the following elements entirely before any text extraction:
```
- <nav>                             → site navigation
- .wb-sec  / #wb-info              → site footer
- .report-problem / #report-problem → feedback form
- .breadcrumb                       → breadcrumb navigation
- <script>, <style>                 → scripts and styles
- <form>                            → any form elements
- .gc-follow-us                     → social media section
- "#wb-cont" skip links             → accessibility anchors
- [class*="pagination"]            → pagination controls
- "About this site" section         → site boilerplate
- Language toggle / search bar      → site chrome
- img alt text from logos           → Government of Canada logo text
- "Leave this field blank" inputs   → honeypot form fields
```

**Step 2.4 — Text Normalization:**
- Collapse consecutive whitespace/newlines to single space
- Remove zero-width characters, non-breaking spaces (`\u00a0` → regular space)
- Normalize quotation marks to standard ASCII
- Strip HTML entities (e.g., `&amp;` → `&`, `&ndash;` → `–`)
- Preserve footnote markers as `[Footnote N]` inline references
- Convert tables to pipe-delimited text or structured JSON sub-objects
- Preserve heading hierarchy (H1 → `# Title`, H2 → `## Section`, etc.)

---

### 2.3 Phase 3 — Rescinded Guidance Exclusion

**This is critical.** The main guidance library index only shows active guidance. However, some older documents in deep pages may need verification.

**Step 3.1 — Fetch the rescinded list:**
```
GET https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/rescinded-guidance
```

**Step 3.2 — Extract all rescinded document slugs/URLs from that page.**

**Step 3.3 — Build a rescinded blocklist:**
```json
// bronze/osfi_rescinded_blocklist.jsonl
{"slug": "guideline-b-2", "title": "...", "rescinded_date": "..."}
```

**Step 3.4 — Cross-reference the seed list against the blocklist.** Any URL that matches a rescinded slug must be flagged `"status": "RESCINDED"` and excluded from ingestion into Silver/Gold layers.

**Rule:** The main guidance library index already excludes rescinded documents. However, running the cross-reference provides a defense-in-depth check and is required for the NOVA corpus integrity guarantee.

---

### 2.4 Phase 4 — PDF Download (Supplementary)

Some documents are primarily published as PDFs (especially older guidelines). The `[Generate PDF]` link on each page creates a server-rendered PDF via:
```
https://www.osfi-bsif.gc.ca/en/print/pdf/node/{node_id}
```

**Agent behavior:**
- For HTML pages with substantial body text (> 500 words extracted): HTML content is the primary source; PDF is supplementary only
- For pages where extracted body text < 200 words (stub pages linking to external PDFs): attempt PDF download and extract text using `pdfplumber` or `pymupdf`
- Store downloaded PDFs at: `bronze/pdfs/{slug}.pdf`
- Store extracted PDF text at: `bronze/pdf_text/{slug}.txt`

---

### 2.5 Full Bronze Record Schema

Store one JSON record per guidance document at `bronze/documents/{slug}.json`:

```json
{
  "doc_id": "osfi-{slug}",
  "slug": "guideline-e-23-model-risk-management-2027",
  "url": "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027",
  "pdf_url": "https://www.osfi-bsif.gc.ca/en/print/pdf/node/1893",
  "pdf_node_id": "1893",

  // Structured metadata (from page info block)
  "title": "Guideline E-23 – Model Risk Management (2027)",
  "guideline_number": "E-23",
  "publication_type": "Guideline",
  "category": "Sound Business and Financial Practices",
  "publication_date": "2025-09-11",
  "effective_date": "2027-05-01",
  "effective_date_is_future": true,
  "sector": [
    "Banks",
    "Foreign Bank Branches",
    "Life Insurance and Fraternal Companies",
    "Property and Casualty Companies",
    "Trust and Loan Companies"
  ],
  "date_modified": "2025-09-11",

  // Content
  "raw_html": "...",                // full raw HTML of main content block
  "body_text_markdown": "...",      // cleaned, normalized markdown text
  "word_count": 4821,
  "has_table_of_contents": true,
  "section_headings": [
    "A. Overview",
    "A.1 Purpose",
    "A.2 Scope",
    "B. Enterprise-wide model risk management",
    "..."
  ],
  "related_documents": [
    {
      "title": "Guideline E-23 – Model Risk Management (2027) - Letter",
      "url": "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027-letter"
    }
  ],

  // Provenance
  "scrape_status": "SUCCESS",
  "scraped_at": "2026-03-22T10:00:00Z",
  "content_source": "HTML",           // "HTML" | "PDF" | "HTML+PDF"
  "corpus_status": "ACTIVE",          // "ACTIVE" | "FUTURE" | "RESCINDED" (excluded)
  "is_in_effect": true,
  "is_future_dated": false
}
```

---

## PART 3: CONTENT CLASSIFICATION RULES

### 3.1 Corpus Status Classification

The agent must assign a `corpus_status` to every document:

| Rule | Status | Include in NOVA? | Retrieval Boost |
|---|---|---|---|
| `effective_date` is present AND is in the past (≤ today) | `ACTIVE` | YES | +0 (baseline) |
| `effective_date` is present AND is in the future (> today) | `FUTURE` | YES — tag prominently | +0 |
| No `effective_date` AND `publication_date` is present | `ACTIVE` | YES | +0 |
| Document appears on rescinded blocklist | `RESCINDED` | NO | — |
| Document is a `Consultative document` or `Discussion paper` | `CONSULTATION` | YES — tag as non-binding | -1 |
| Newer version of same guideline family exists in corpus | `SUPERSEDED` | YES — tag prominently | -2 (de-prioritize vs. current version) |

**SUPERSEDED detection logic:**
```python
def detect_superseded(silver_docs):
    """
    Identify guideline families with multiple year-tagged versions.
    Mark older versions as SUPERSEDED.
    A 'family' is identified by stripping the year suffix from a slug.
    """
    import re
    from collections import defaultdict

    family_map = defaultdict(list)

    for doc in silver_docs:
        # Strip trailing year pattern: -2024, -2025, -2026, (2025), (2026) etc.
        family_key = re.sub(r'[-\s]*\(?\b(19|20)\d{2}\b\)?', '', doc.slug).strip('-')
        family_map[family_key].append(doc)

    for family_key, docs in family_map.items():
        if len(docs) > 1:
            # Sort by publication_date descending; most recent = ACTIVE
            sorted_docs = sorted(docs, key=lambda d: d.publication_date, reverse=True)
            sorted_docs[0].corpus_status = "ACTIVE"       # Most recent
            for older_doc in sorted_docs[1:]:
                older_doc.corpus_status = "SUPERSEDED"    # All prior versions

    return silver_docs
```

**Key known case as of March 2026:**
- LAR 2025 (published Nov 2024) → `SUPERSEDED` by LAR 2026 (published Jan 2026)
- CAR 2025 → not in index (OSFI uses Pattern B in-place replacement; no 2025 CAR pages exist to scrape)
- MCT 2024 (published Jan 2024) → `SUPERSEDED` by MCT 2026 (published Nov 2025)

**NOVA citation rule for SUPERSEDED documents:**
> "Note: This document (LAR 2025) has been superseded by [LAR 2026 — link]. It remains in the OSFI library for reference but the 2026 version is the operative guideline as of January 1, 2026."

**Critical:** `FUTURE` documents (e.g., E-23 effective May 1, 2027) must be ingested and tagged — NOVA must be able to answer questions about upcoming regulatory obligations.

### 3.2 Publication Type → RAG Priority Tier

Map OSFI publication types to NOVA's Tier system:

| Publication Type | NOVA Source Tier | Reasoning |
|---|---|---|
| Guideline | Tier 1 (Authoritative) | Binding regulatory expectations |
| Regulatory and legislative advisory | Tier 1 | Statutory/legal in nature |
| Regulatory notice | Tier 1 | Formal regulatory action |
| Advisory | Tier 1 | Direct supervisory expectation |
| Implementation note | Tier 2 (Official) | Technical implementation detail |
| Instructions | Tier 2 | Operational/reporting requirements |
| Frequently asked questions | Tier 2 | Interpretive guidance |
| Guidance note | Tier 2 | Supplementary interpretation |
| Bulletin | Tier 2 | Historical/standing positions |
| Letter | Tier 2 | Transmittal or update notice |
| Assessment tool | Tier 2 | Self-assessment framework |
| Guideline at a glance | Tier 2 | Summary — always link to parent |
| Consultative document | Tier 3 (Contextual) | Proposed, not yet in effect |
| Discussion paper | Tier 3 | Conceptual/policy development |
| Consultation response | Tier 3 | Industry feedback record |
| Backgrounder | Tier 3 | Context and explanation |
| Policy papers | Tier 3 | Policy rationale |
| Memorandum | Tier 3 | Internal/transitional notices |
| Adjustments and clarifications | Tier 2 | Minor official corrections |
| Guideline impact analysis statement | Tier 2 | Regulatory impact analysis |

---

## PART 4: SILVER LAYER — CLEANING AND ENRICHMENT

### 4.1 Silver Document Schema

Transform Bronze records to `silver/documents/{slug}.json`:

```json
{
  "doc_id": "osfi-guideline-e-23-model-risk-management-2027",
  "title": "Guideline E-23 – Model Risk Management (2027)",
  "guideline_number": "E-23",
  "publication_type": "Guideline",
  "nova_tier": 1,
  "category": "Sound Business and Financial Practices",
  "publication_date": "2025-09-11",
  "effective_date": "2027-05-01",
  "corpus_status": "FUTURE",
  "is_future_dated": true,
  "sector_tags": ["Banks", "Foreign Bank Branches", "Life Insurance", "P&C", "Trust and Loan"],
  "applies_to_banks": true,
  "applies_to_insurance": true,

  // Enriched
  "summary": "",                        // Generated in Silver pass (see 4.2)
  "key_topics": [],                     // Extracted topic tags
  "regulatory_references": [],          // Cross-refs to other OSFI docs, BCBS, etc.
  "has_effective_date_change": false,   // Flag if effective date deferred/changed

  // Clean content
  "clean_text": "...",                  // Final clean body text
  "sections": [                         // Structured sections for hierarchical chunking
    {
      "section_id": "osfi-e23-A",
      "heading": "A. Overview",
      "level": 2,
      "text": "...",
      "subsections": [...]
    }
  ],

  "word_count": 4821,
  "source_url": "...",
  "scraped_at": "2026-03-22T10:00:00Z",
  "ingested_to_silver_at": "2026-03-22T11:00:00Z"
}
```

### 4.2 Silver Enrichment Steps

**Step 4.2.1 — Summary Generation**
Call an LLM (GPT-5) with:
```
System: You are a regulatory analyst. Generate a 3-5 sentence executive summary
of this OSFI guidance document for use in a regulatory RAG system. Include:
the document's purpose, scope (who it applies to), key obligations, and
effective date if applicable. Be precise and factual.

User: [clean_text]
```
Store result as `"summary"` field in Silver record.

**Step 4.2.2 — Topic Tag Extraction**
Extract normalized topic tags for hybrid retrieval:
- Model/guideline number (E-23, B-10, LAR, CAR, MCT, LICAT, etc.)
- Risk domain (e.g., "model risk", "liquidity risk", "capital adequacy", "cyber risk")
- Technology terms (e.g., "AI/ML", "crypto assets", "third-party risk")
- Regulatory framework cross-refs (e.g., "Basel III", "IFRS 17", "BCBS 239")

**Step 4.2.3 — Cross-Reference Mapping**
Parse body text for mentions of other OSFI guidelines (e.g., "Guideline B-10", "E-21"). Build a `regulatory_references` list linking slug → slug for graph traversal.

**Step 4.2.4 — Sector Normalization**
Map raw sector strings to canonical tags:
```
"Banks" → sector:bank
"Trust and Loan Companies" → sector:trust_loan
"Life Insurance and Fraternal Companies" → sector:life_insurance
"Property and Casualty Companies" → sector:pc_insurance
"Foreign Bank Branches" → sector:foreign_bank
"Foreign Insurance Branches" → sector:foreign_insurance
"Bank Holding Companies" → sector:bank_holding
"Cooperative Credit Associations" → sector:cooperative
```

---

## PART 5: CHUNKING STRATEGY

### 5.1 Chunking Philosophy

OSFI guidance documents range from stub letters (< 300 words) to comprehensive guidelines (5,000+ words with multiple chapters). A single chunking strategy does not fit all. Apply the following adaptive strategy:

### 5.2 Chunk Types and Rules

**Type A — Short Document (< 800 words): Single Chunk**
- The entire document body is one chunk
- Attach all metadata as chunk-level fields
- Use case: Letters, bulletins, regulatory notices, simple FAQs

**Type B — Medium Document (800–2,500 words): Paragraph Chunks**
- Split at `<h3>` / `<h4>` level headings
- Target chunk size: 400–600 tokens
- Overlap: 1 preceding paragraph (≈ 100 tokens) carried into next chunk
- Use case: Guidance notes, advisories, implementation notes

**Type C — Large Document (2,500+ words): Hierarchical Section Chunks**
- Split at `<h2>` level (major sections: A, B, C, D...)
- Each H2 section becomes a parent chunk
- Sub-split at `<h3>` level within each H2 section
- Target chunk size: 500–800 tokens per sub-chunk
- Overlap: 100-token window from end of prior chunk
- Use case: Full Guidelines (E-23, CAR, LAR, LICAT, MCT, B-10, B-13, etc.)

**Type D — Tables**: Extract tables as separate atomic chunks. Serialize as markdown pipe tables. Attach parent document metadata and nearest heading context. Do not split tables mid-row.

**Type E — Appendices**: Treat appendices as distinct chunks with `"chunk_type": "appendix"` tag.

### 5.3 Chunk Record Schema

```json
{
  "chunk_id": "osfi-e23-B1-para2",
  "doc_id": "osfi-guideline-e-23-model-risk-management-2027",
  "chunk_index": 7,
  "chunk_type": "section",            // "full_doc" | "section" | "subsection" | "table" | "appendix"
  "parent_section": "B. Enterprise-wide model risk management",
  "section_heading": "B.2 Model risk management framework",
  "heading_level": 3,
  "text": "...",
  "token_count": 512,
  "char_count": 2048,
  "overlap_tokens_from_prev": 95,

  // Inherited from document
  "doc_title": "Guideline E-23 – Model Risk Management (2027)",
  "guideline_number": "E-23",
  "publication_type": "Guideline",
  "nova_tier": 1,
  "category": "Sound Business and Financial Practices",
  "effective_date": "2027-05-01",
  "corpus_status": "FUTURE",
  "sector_tags": ["Banks", "Foreign Bank Branches", ...],
  "applies_to_banks": true,
  "source_url": "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-...",
  "citation_label": "OSFI E-23 (2027), §B.2"
}
```

**Contextual header prepend:** Prepend the following to every chunk's text before embedding, to improve retrieval without polluting stored content:
```
[OSFI Guideline E-23 | Sound Business and Financial Practices | Banks | Effective: 2027-05-01]
B.2 Model risk management framework:
{chunk_text}
```
This is the **embedding text** only — store it separately as `"embed_text"`. The `"text"` field stores the clean chunk text for display/citation.

---

## PART 6: EMBEDDING SPECIFICATION

### 6.1 Embedding Model

| Layer | Model | Dimension | Purpose |
|---|---|---|---|
| Dense (semantic) | `text-embedding-3-large` (OpenAI) | 3072 | Semantic similarity |
| Sparse (lexical) | ELSER v2 (Elasticsearch) | Sparse | Exact term matching (guideline numbers, regulatory codes) |

**Hybrid retrieval = ELSER (BM25 sparse) + text-embedding-3-large (dense)**. This is critical: OSFI documents use highly specific terminology (e.g., "NCCF", "LCR", "ICAAP", "DFAST", "E-23") that dense embeddings alone underperform on. ELSER captures exact term hits; dense captures semantic meaning.

### 6.2 Embedding Input Construction

For each chunk, build the embedding input as:
```
[OSFI {publication_type} {guideline_number} | {category} | {sector_csv} | {effective_date_label}]
{section_heading}:
{chunk_text}
```

Where:
- `effective_date_label` = `"In Effect"` if `corpus_status == "ACTIVE"`, `"Effective {date}"` if `FUTURE`, `"Consultation Only"` if `CONSULTATION`
- Max input tokens: 8,192 (text-embedding-3-large supports this)

### 6.3 Batch Embedding

- Batch size: 100 chunks per API call
- Retry on rate limit with exponential backoff
- Store embedding vectors in `gold/embeddings/{slug}_{chunk_index}.npy` or directly in Elasticsearch

---

## PART 7: ELASTICSEARCH INDEX SPECIFICATION

### 7.1 Index Name
```
osfi_guidance_chunks_v1
```

### 7.2 Index Mapping

```json
{
  "mappings": {
    "properties": {
      "chunk_id":           { "type": "keyword" },
      "doc_id":             { "type": "keyword" },
      "chunk_index":        { "type": "integer" },
      "chunk_type":         { "type": "keyword" },

      // Full-text search (BM25)
      "text":               { "type": "text", "analyzer": "english" },
      "embed_text":         { "type": "text", "index": false },

      // ELSER sparse vector
      "elser_embedding":    { "type": "sparse_vector" },

      // Dense vector
      "dense_embedding":    {
        "type": "dense_vector",
        "dims": 3072,
        "index": true,
        "similarity": "cosine"
      },

      // Metadata filters (all keyword for exact-match filtering)
      "doc_title":          { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
      "guideline_number":   { "type": "keyword" },
      "publication_type":   { "type": "keyword" },
      "nova_tier":          { "type": "integer" },
      "category":           { "type": "keyword" },
      "publication_date":   { "type": "date", "format": "yyyy-MM-dd" },
      "effective_date":     { "type": "date", "format": "yyyy-MM-dd" },
      "corpus_status":      { "type": "keyword" },
      "is_future_dated":    { "type": "boolean" },
      "applies_to_banks":   { "type": "boolean" },
      "sector_tags":        { "type": "keyword" },
      "source_url":         { "type": "keyword" },
      "citation_label":     { "type": "keyword" },
      "parent_section":     { "type": "text" },
      "section_heading":    { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
      "token_count":        { "type": "integer" },
      "scraped_at":         { "type": "date" }
    }
  },
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 1,
    "analysis": {
      "analyzer": {
        "english": {
          "type": "english"
        }
      }
    }
  }
}
```

### 7.3 Query Template (Hybrid Retrieval for NOVA)

```json
{
  "query": {
    "bool": {
      "should": [
        {
          "text_expansion": {
            "elser_embedding": {
              "model_id": ".elser_model_2",
              "model_text": "{user_query}",
              "boost": 0.4
            }
          }
        }
      ],
      "filter": [
        { "term": { "corpus_status": "ACTIVE" } },
        { "term": { "applies_to_banks": true } }
      ]
    }
  },
  "knn": {
    "field": "dense_embedding",
    "query_vector": "{dense_embedding_of_query}",
    "k": 20,
    "num_candidates": 100,
    "boost": 0.6
  },
  "_source": {
    "excludes": ["elser_embedding", "dense_embedding", "embed_text"]
  },
  "size": 10
}
```

**NOVA retrieval logic should apply additional filters based on query context:**
- If query involves banks/DTIs: add `"term": { "applies_to_banks": true }`
- If query is about a specific guideline: add `"term": { "guideline_number": "E-23" }`
- If query is about upcoming requirements: add `"term": { "corpus_status": "FUTURE" }` or remove the ACTIVE filter
- Always boost `nova_tier: 1` documents (Tier 1 = authoritative guidelines)

---

## PART 8: AZURE ADLS LAYER MAPPING

| ADLS Layer | Content | Path |
|---|---|---|
| **Bronze** | Raw HTML, raw JSON, downloaded PDFs, fetch logs | `adls://nova-data/bronze/osfi/guidance/{year}/{slug}/` |
| **Silver** | Cleaned JSON, enriched metadata, summaries | `adls://nova-data/silver/osfi/guidance/{slug}.json` |
| **Gold** | Chunked records with embeddings, ES bulk load files | `adls://nova-data/gold/osfi/chunks/{slug}_chunks.jsonl` |
| **Logs** | Fetch errors, rescinded blocklist, run manifests | `adls://nova-data/bronze/osfi/logs/` |

---

## PART 9: INCREMENTAL UPDATE AND REFRESH PROTOCOL

### 9.1 Scheduled Refresh Trigger

Run the full discovery pass (Phase 1 index scrape) weekly. Compare extracted URLs and `date_modified` fields against the Silver manifest.

**Change detection logic:**
```python
for doc in new_index_records:
    existing = silver_manifest.get(doc.slug)
    if not existing:
        action = "NEW"               # Scrape, parse, chunk, embed, index
    elif doc.date_modified > existing.date_modified:
        action = "UPDATE"            # Re-scrape, re-chunk, re-embed, delete+reindex
    elif existing.corpus_status == "FUTURE" and doc.effective_date <= today:
        action = "STATUS_CHANGE"     # Update status FUTURE → ACTIVE in ES, no re-embed needed
    else:
        action = "NO_CHANGE"         # Skip
```

### 9.2 Version Control
- Do not overwrite Bronze records. Append with `scraped_at` timestamp.
- Silver/Gold records are versioned: `{slug}_v{n}.json`
- Elasticsearch: use `doc_as_upsert: true` for chunk updates; delete all old chunks for a `doc_id` before reinserting

---

## PART 10: QUALITY ASSURANCE AND VALIDATION

### 10.1 Agent-Level QA Checks

After each scrape run, the agent must emit a QA report:

| Check | Pass Condition |
|---|---|
| Total documents scraped | ≥ 285 (expected ~300) |
| Documents with empty body text | < 5% of total |
| Documents missing `publication_date` | < 2% |
| Documents missing `effective_date` where applicable | < 10% of Guidelines |
| Rescinded documents in Silver layer | 0 (strict zero) |
| Chunks with token_count > 1000 | < 1% (flag for manual review) |
| Chunks with token_count < 50 | < 2% (likely stub/noise) |
| Missing embeddings | 0 |
| Elasticsearch index doc count = chunk record count | True |

### 10.2 NOVA RAGAS Evaluation Targets

After ingestion, run the Golden Dataset evaluation:

| Metric | Target |
|---|---|
| Context Recall (regulatory Q&A) | ≥ 0.85 |
| Faithfulness | ≥ 0.90 |
| Answer Relevancy | ≥ 0.88 |
| Context Precision | ≥ 0.80 |

Key test questions for OSFI corpus validation:
- "What are OSFI's capital requirements for domestic systemically important banks?"
- "What is the effective date of Guideline E-23?"
- "Does Guideline B-10 apply to foreign bank branches?"
- "What is the current Domestic Stability Buffer level?"
- "What are OSFI's expectations for ICAAP?"

---

## PART 11: AGENT PSEUDOCODE (FULL PIPELINE)

```python
class OSFIGuidanceScraper:

    BASE = "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library"

    def run(self):
        # Phase 1: Discover all active document URLs
        seeds = self.scrape_index_pages()
        rescinded = self.scrape_rescinded_blocklist()
        active_seeds = [s for s in seeds if s.slug not in rescinded]

        # Phase 2: Scrape each document
        bronze_docs = []
        for seed in active_seeds:
            doc = self.scrape_document(seed)
            if doc.status == "SUCCESS":
                self.store_bronze(doc)
                bronze_docs.append(doc)
            time.sleep(2)  # Rate limiting

        # Phase 3: Silver enrichment
        silver_docs = [self.enrich_silver(doc) for doc in bronze_docs]

        # Phase 4: Chunking
        all_chunks = []
        for doc in silver_docs:
            chunks = self.chunk_document(doc)
            all_chunks.extend(chunks)

        # Phase 5: Embedding
        embeddings = self.batch_embed(all_chunks)

        # Phase 6: Elasticsearch ingestion
        self.bulk_index(all_chunks, embeddings)

        # Phase 7: QA Report
        self.emit_qa_report()

    def scrape_index_pages(self):
        seeds = []
        for page in range(3):  # 3 pages at 100 items/page
            url = f"{self.BASE}?items_per_page=100&page={page}"
            html = self.fetch(url)
            seeds.extend(self.parse_index_table(html))
        return deduplicate(seeds)

    def scrape_document(self, seed):
        html = self.fetch(seed.url)
        meta = self.extract_metadata_block(html)
        body = self.extract_clean_body(html)
        sections = self.parse_sections(body)
        return BronzeDoc(seed=seed, meta=meta, body=body, sections=sections)

    def chunk_document(self, doc):
        if doc.word_count < 800:
            return [self.make_chunk(doc, doc.clean_text, "full_doc")]
        elif doc.word_count < 2500:
            return self.chunk_by_paragraphs(doc)
        else:
            return self.chunk_by_sections(doc)
```

---

## PART 12: CITATION FORMAT FOR NOVA RESPONSES

Every chunk retrieved and used in a NOVA response must be cited using:

```
Source: {doc_title} | {publication_type} | OSFI | {effective_date_label}
Reference: {citation_label}
URL: {source_url}
Tier: {nova_tier}
Status: {corpus_status}
```

Example:
```
Source: Guideline E-23 – Model Risk Management (2027) | Guideline | OSFI | Effective: May 1, 2027
Reference: OSFI E-23 (2027), §B.2 — Model risk management framework
URL: https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/guideline-e-23-model-risk-management-2027
Tier: 1 (Authoritative)
Status: FUTURE — Not yet in effect
```

The `Status: FUTURE` flag is critical for compliance integrity — NOVA must never present a future-dated guideline as currently binding without this label.
```
