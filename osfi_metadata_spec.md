# OSFI Corpus — Complete Metadata Specification
**Version:** 1.0 | **Owner:** RBC Corporate Treasury — AI & Advanced Analytics
**For:** NOVA RAG Pipeline — Silver Layer Canonical Document Model

---

## METADATA ARCHITECTURE

Every field belongs to exactly one of ten groups. Groups 1–2 are scraped directly.
Groups 3–5 are derived during classification. Groups 6–7 are extracted from the body.
Groups 8–10 are engineering/retrieval fields assigned during ingestion.

```
Group 1  — Library Row Metadata          (scraped from index page)
Group 2  — Detail Page Metadata          (scraped from detail page)
Group 3  — Family & Version Metadata     (derived: family graph)
Group 4  — Status & Applicability        (derived: classification rules)
Group 5  — Authority Metadata            (derived: publication type → tier mapping)
Group 6  — Structural Body Metadata      (extracted: heading/paragraph parser)
Group 7  — Relationship Metadata         (extracted: related-documents links)
Group 8  — Raw File & Provenance         (engineering: fetch audit trail)
Group 9  — Search & Retrieval Fields     (derived: ES/ELSER optimization)
Group 10 — Chunk-Level Metadata          (per-chunk: inherited + structural)
```

---

## FULL CANONICAL DOCUMENT SCHEMA

```json
{
  // ─────────────────────────────────────────────────────────────────────────
  // GROUP 1 — LIBRARY ROW METADATA
  // Source: index page table rows
  // Scraped at: Phase 0 (before any detail page is fetched)
  // ─────────────────────────────────────────────────────────────────────────

  "source_system": "osfi_guidance_library",

  "library_row_title": "Capital Adequacy Requirements (CAR) – Guideline (2026)",
  // Exact text from the <a> link in the index table row — before detail page normalization

  "library_row_url": "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/capital-adequacy-requirements-car-guideline-2026",
  // Absolute URL as it appears in the index table

  "listing_date_raw": "September 11, 2025",
  // Raw date string from column 0 of the index row — preserve before parsing

  "listing_date_iso": "2025-09-11",
  // ISO 8601 parsed from listing_date_raw

  "listing_publication_type": "Guideline",
  // Exact text from column 3 of the index row

  "listing_category": "Capital Adequacy Requirements",
  // Exact text from column 4 of the index row

  "listing_sector": ["Banks", "Trust and Loan Companies"],
  // All <li> text values within the sector cell — preserve as array

  "crawl_timestamp": "2026-03-22T10:00:00Z",
  // ISO 8601 UTC timestamp when this row was scraped from the index

  "crawl_page_number": 0,
  // Zero-indexed page number in the paginated library (0–5 for current corpus)

  "crawl_position_on_page": 25,
  // Zero-indexed row position within that page

  "library_filters_used": {
    "keyword": "",
    "category": "All",
    "publication_type": "All",
    "sector": "All",
    "items_per_page": 100
  },
  // The filter state active when this row was scraped — critical for reproducibility


  // ─────────────────────────────────────────────────────────────────────────
  // GROUP 2 — DETAIL PAGE METADATA
  // Source: individual guidance page (e.g. /en/guidance/guidance-library/{slug})
  // Scraped at: Phase 1 (detail page fetch)
  // ─────────────────────────────────────────────────────────────────────────

  "detail_url": "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/capital-adequacy-requirements-car-guideline-2026",
  // The URL fetched — should match library_row_url; log discrepancy if not

  "canonical_url": "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/capital-adequacy-requirements-car-guideline-2026",
  // From <link rel="canonical"> in page <head> if present; else = detail_url

  "slug": "capital-adequacy-requirements-car-guideline-2026",
  // Extracted from detail_url — used as the base filename across all storage layers

  "title": "Capital Adequacy Requirements (CAR) – Guideline (2026)",
  // From <h1> on the detail page — may differ slightly from library_row_title

  "publication_type": "Guideline",
  // From <dt>Publication type</dt><dd> metadata block on detail page

  "category": "Capital Adequacy Requirements",
  // From <dt>Category</dt><dd> metadata block

  "document_date_raw": "September 11, 2025",
  // From <dt>Date</dt><dd> metadata block — raw string before parsing

  "document_date_iso": "2025-09-11",
  // ISO 8601 parsed from document_date_raw

  "sector": ["Banks", "Trust and Loan Companies"],
  // From <dt>Sector</dt><dd> — each institution type as a separate array element

  "effective_date_text": "November 2025 / January 2026",
  // From <dt>Effective date</dt><dd> — raw text EXACTLY as shown on page
  // Preserve verbatim — split-date entries like this must not be simplified

  "guideline_number": "CAR",
  // From <dt>No</dt><dd> if present — e.g. "E-23", "B-10", "B-13", "CAR", "LAR"
  // null if not shown on the page

  "date_modified_raw": "2025-09-11",
  // From "Date modified:" label at bottom of page — ISO date

  "generate_pdf_url": "https://www.osfi-bsif.gc.ca/en/print/pdf/node/1842",
  // From [Generate PDF] link href — extract node ID as integer
  // null if no Generate PDF button present

  "pdf_node_id": 1842,
  // Integer extracted from generate_pdf_url

  "direct_pdf_url": null,
  // URL if a direct "PDF x KB" link appears on the page (not Generate PDF)
  // null if only Generate PDF is present

  "has_table_of_contents": true,
  // true if a "Table of contents" block appears on the detail page

  "toc_entries": [
    "A. Overview",
    "A.1 Purpose",
    "A.2 Scope",
    "B. Enterprise-wide model risk management",
    "C. Risk-based approach to model risk management",
    "D. Model lifecycle management",
    "Appendix 1: Information tracking for models"
  ],
  // All entries extracted from the Table of contents block — in order

  "has_related_documents": true,
  // true if a "Related documents" section appears on the detail page

  "related_document_links_raw": [
    {
      "title": "Capital Adequacy Requirements Guideline (2026) – Letter",
      "url": "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/capital-adequacy-requirements-guideline-2026-letter"
    },
    {
      "title": "Backgrounder: Final Capital Adequacy Requirements Guideline (2026)",
      "url": "https://www.osfi-bsif.gc.ca/en/news/backgrounder-final-capital-adequacy-requirements-guideline-2026"
    },
    {
      "title": "Frequently asked questions – Basel III reforms",
      "url": "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/frequently-asked-questions-basel-iii-reforms"
    }
  ],
  // Raw related-document links exactly as scraped — title + absolute URL

  "consultation_status_text": "Consultation status: Closed. The consultation for the 2027 CAR Guideline closed on February 18, 2026.",
  // Full raw text of any consultation-status banner on the page
  // null if no banner present
  // IMPORTANT: This field is metadata ONLY — it does NOT drive classification
  // (see Rule 6: banner may refer to a different version family)

  "consultation_status_refers_to_version": "2027",
  // Version year extracted from consultation_status_text if it references a different version
  // null if no banner or if banner applies to this page's own version

  "page_language": "en",
  // "en" for English pages; "fr" for French (out of scope for primary corpus)

  "word_count_raw_body": 4821,
  // Word count of extracted body text after noise stripping — used to route PDF fallback


  // ─────────────────────────────────────────────────────────────────────────
  // GROUP 3 — FAMILY & VERSION METADATA
  // Source: derived during Phase 2 classification pass
  // ─────────────────────────────────────────────────────────────────────────

  "doc_id": "osfi.car.2026.guideline",
  // Format: osfi.{family}.{version}.{doc_class}
  // Globally unique identifier for this specific document

  "doc_family_id": "osfi.car",
  // Identifies the guideline family — all CAR chapters and parent share this
  // Derived by stripping year suffix from slug and mapping to FAMILY_MAP

  "version_id": "2026",
  // Year component of the version family — extracted from title or slug

  "version_label": "CAR (2026)",
  // Human-readable version label for display and citation

  "version_sort_key": "2026-11",
  // ISO year-month string for sorting versions chronologically
  // Use effective_date_start month if available, else document_date month

  "parent_doc_id": null,
  // doc_id of the parent package page — null for package-level pages
  // e.g. CAR Chapter 1 would have parent_doc_id = "osfi.car.2026.guideline"

  "child_doc_ids": [
    "osfi.car.2026.chapter1",
    "osfi.car.2026.chapter2",
    "osfi.car.2026.chapter3",
    "osfi.car.2026.chapter4",
    "osfi.car.2026.chapter5",
    "osfi.car.2026.chapter6",
    "osfi.car.2026.chapter7",
    "osfi.car.2026.chapter8",
    "osfi.car.2026.chapter9"
  ],
  // doc_ids of child chapter pages — populated on package-level pages
  // empty array for leaf/chapter pages

  "is_package_page": true,
  // true if this page is a parent guideline that lists chapters
  // false for individual chapter pages, letters, FAQs etc.

  "is_chapter_page": false,
  // true for chapter-level pages within a chapterized guideline

  "chapter_number": null,
  // Integer chapter number if is_chapter_page = true; null otherwise

  "chapter_title": null,
  // Chapter title if is_chapter_page = true; null otherwise

  "document_order_within_family": 0,
  // 0 for the parent/package page; 1–N for chapters in order

  "supersedes_doc_id": "osfi.car.2025.guideline",
  // doc_id of the version this document replaces — null if no prior version

  "superseded_by_doc_id": null,
  // doc_id of the version that replaces this document — null if current

  "current_version_flag": true,
  // true if this is the most recent published version of its family


  // ─────────────────────────────────────────────────────────────────────────
  // GROUP 4 — STATUS & APPLICABILITY METADATA
  // Source: derived by applying classification rules (Rules 1–7)
  // ─────────────────────────────────────────────────────────────────────────

  "status": "final_current",
  // One of: final_current | final_future_effective | superseded |
  //         draft_or_consultation | rescinded | supporting_material

  "include_in_primary_corpus": true,
  // true → index in osfi_guidance_chunks_v2 (primary ES index)

  "include_in_support_corpus": false,
  // true → index in osfi_guidance_support_v2 (letters, FAQs, backgrounders)

  "include_in_context_corpus": false,
  // true → index in osfi_guidance_contextual_v2 (drafts, consultations)

  "effective_date_start": "2025-11-01",
  // ISO 8601 — first day the document is in force
  // For split-FYE documents (CAR 2026): use October FYE date (Nov 1, 2025)

  "effective_date_end": null,
  // ISO 8601 if there is a known sunset date; null for open-ended guidance

  "effective_date_fye_split": true,
  // true if the effective date differs by fiscal year end
  // Captures the "November 2025 / January 2026" pattern on CAR 2026

  "effective_date_oct_fye": "2025-11-01",
  // Effective date for October 31 FYE institutions (RBC, TD, BMO, BNS, CIBC, NBC)
  // null if effective_date_fye_split = false

  "effective_date_dec_fye": "2026-01-01",
  // Effective date for December 31 FYE institutions
  // null if effective_date_fye_split = false

  "is_future_effective": false,
  // true if effective_date_start > crawl_date

  "is_rescinded": false,
  // true if slug appears in rescinded_manifest with rescission_date ≤ crawl_date

  "is_draft_or_consultation": false,
  // true if classified as draft or consultation by Rules 2–3

  "rescission_date": null,
  // ISO 8601 date from rescinded_manifest — null if not rescinded

  "consultation_closing_date": null,
  // ISO 8601 date from draft_manifest — null if not a consultation item

  "as_of_applicability": "2026-03-22",
  // The crawl date against which status was evaluated
  // Used to re-evaluate status on future runs without re-classifying from scratch

  "rule_applied": "rule_5_final_current",
  // The classification rule that determined this document's status
  // One of: rule_1_rescinded | rule_2_draft | rule_3_banner_different_version |
  //         rule_4_future_effective | rule_5_final_current |
  //         rule_6_supporting | rule_7_superseded


  // ─────────────────────────────────────────────────────────────────────────
  // GROUP 5 — AUTHORITY METADATA
  // Source: derived from publication_type via authority mapping table
  // ─────────────────────────────────────────────────────────────────────────

  "authority_class": "primary_normative",
  // One of: primary_normative | primary_implementation |
  //         official_interpretive | official_support |
  //         contextual_summary | contextual_process | excluded

  "authority_level": 100,
  // Integer 0–100:
  //   100 = Guideline, Advisory, Regulatory notice, Reg & legislative advisory
  //    90 = Implementation note, Instructions, Adjustments and clarifications
  //    70 = FAQ, Guidance note, Bulletin, Assessment tool
  //    60 = Letter (transmittal), Memorandum
  //    40 = Guideline at a glance, Backgrounder, Impact analysis statement
  //    30 = Consultation response, Policy papers
  //     0 = Consultative document, Discussion paper, Rescinded, Draft

  "nova_tier": 1,
  // 1 = authority_level 90–100 (primary corpus, outranks all others)
  // 2 = authority_level 40–89  (support corpus, cited only when Tier 1 insufficient)
  // 3 = authority_level 0–39   (contextual only)

  "document_class": "chapter_guideline",
  // Structural classification independent of authority:
  // package_guideline | chapter_guideline | standalone_guideline |
  // transmittal_letter | interpretive_faq | assessment_tool |
  // regulatory_notice | advisory | implementation_note |
  // backgrounder | discussion_paper | consultation_response

  "guidance_type_normalized": "guideline",
  // Normalized controlled vocabulary regardless of OSFI's exact publication_type wording

  "is_primary_normative": true,
  // true if authority_class = primary_normative or primary_implementation

  "is_supporting_interpretive": false,
  // true if authority_class = official_interpretive or official_support

  "is_context_only": false,
  // true if authority_class = contextual_summary, contextual_process, or excluded

  "prudential_weight": 1.0,
  // Float 0.0–1.0 for retrieval scoring:
  //   1.0 = binding prudential requirement
  //   0.7 = official interpretation
  //   0.4 = contextual/summary
  //   0.0 = excluded


  // ─────────────────────────────────────────────────────────────────────────
  // GROUP 6 — STRUCTURAL BODY METADATA
  // Source: extracted during Phase 1 HTML parsing pass
  // ─────────────────────────────────────────────────────────────────────────

  "section_headings": [
    {
      "level": 1,
      "text": "Capital Adequacy Requirements (CAR) – Guideline (2026)",
      "id": "h1-0",
      "offset_chars": 0
    },
    {
      "level": 2,
      "text": "Guideline (Effective January 2026)",
      "id": "h2-0",
      "offset_chars": 412
    }
  ],
  // All headings extracted in document order with level, text, id, and char offset

  "heading_path": ["Capital Adequacy Requirements (CAR) – Guideline (2026)"],
  // Breadcrumb heading path for the document root — used in chunk embed_text prefix

  "toc_depth": 2,
  // Maximum heading depth found in the Table of Contents

  "has_appendices": false,
  // true if the document body contains an "Appendix" section

  "appendix_ids": [],
  // List of appendix identifiers found in body (e.g. ["Appendix 1", "Appendix 2-1"])

  "has_tables": true,
  // true if the body contains one or more <table> elements

  "table_count": 3,
  // Number of tables found in the body

  "has_footnotes": true,
  // true if footnote markers and/or footnote text are found in the body

  "footnote_count": 4,
  // Number of footnotes found

  "inline_cross_references": [
    "Guideline B-10 Third-Party Risk Management",
    "Guideline E-4 on Foreign Entities Operating in Canada on a Branch Basis",
    "Corporate Governance Guideline"
  ],
  // OSFI guideline references found inline in the body text

  "quoted_external_references": [
    "Basel Committee on Banking Supervision (BCBS) Basel Framework",
    "OECD definition of AI"
  ],
  // External regulatory/standards references found in the body


  // ─────────────────────────────────────────────────────────────────────────
  // GROUP 7 — RELATIONSHIP METADATA
  // Source: extracted from related_document_links_raw + body inline refs
  //         then enriched by cross-referencing against the detail manifest
  // ─────────────────────────────────────────────────────────────────────────

  "related_doc_ids": [
    "osfi.car.2026.letter",
    "osfi.car.2026.faq_basel3",
    "osfi.leverage.2023.guideline",
    "osfi.lar.2025.guideline",
    "osfi.smsb.2026.guideline",
    "osfi.pillar3.disclosure.expectations"
  ],
  // doc_ids resolved from related_document_links_raw — only OSFI library slugs
  // External links (news, BCAR manual, BIS) are captured in related_external_urls

  "related_external_urls": [
    {
      "title": "Backgrounder: Final Capital Adequacy Requirements Guideline (2026)",
      "url": "https://www.osfi-bsif.gc.ca/en/news/backgrounder-final-capital-adequacy-requirements-guideline-2026",
      "type": "backgrounder"
    },
    {
      "title": "Basel Capital Adequacy Reporting (BCAR) 2026",
      "url": "https://www.osfi-bsif.gc.ca/en/data-forms/reporting-returns/...",
      "type": "reporting_manual"
    }
  ],
  // Links from related_document_links_raw that resolve outside the guidance library

  "linked_guidelines": ["osfi.leverage.2023.guideline", "osfi.lar.2025.guideline", "osfi.smsb.2026.guideline"],
  "linked_letters": ["osfi.car.2026.letter"],
  "linked_faqs": ["osfi.car.2026.faq_basel3"],
  "linked_manuals": [],
  "linked_backgrounders": [],

  "relationship_map": [
    {
      "target_doc_id": "osfi.car.2026.letter",
      "relationship_type": "has_transmittal_letter",
      "relationship_direction": "outbound",
      "relationship_reason": "Listed under Related documents on this page"
    },
    {
      "target_doc_id": "osfi.car.2025.guideline",
      "relationship_type": "supersedes",
      "relationship_direction": "outbound",
      "relationship_reason": "Derived from family version detection — CAR 2026 replaces CAR 2025"
    },
    {
      "target_doc_id": "osfi.car.2027.draft",
      "relationship_type": "has_draft_successor",
      "relationship_direction": "outbound",
      "relationship_reason": "Consultation banner on page references 2027 draft"
    }
  ],
  // Full typed relationship graph — one entry per relationship


  // ─────────────────────────────────────────────────────────────────────────
  // GROUP 8 — RAW FILE & PROVENANCE METADATA
  // Source: HTTP response headers + file storage layer
  // ─────────────────────────────────────────────────────────────────────────

  "raw_html_path": "bronze/osfi/html/final_current/capital-adequacy-requirements-car-guideline-2026.html",
  // ADLS path to the stored raw HTML

  "raw_pdf_path": "bronze/osfi/pdf/final_current/capital-adequacy-requirements-car-guideline-2026.pdf",
  // ADLS path to the stored PDF — null if not available

  "normalized_md_path": "silver/osfi/md/final_current/capital-adequacy-requirements-car-guideline-2026.md",
  "canonical_json_path": "silver/osfi/json/final_current/capital-adequacy-requirements-car-guideline-2026.json",
  "chunks_jsonl_path": "gold/osfi/chunks/final_current/capital-adequacy-requirements-car-guideline-2026_chunks.jsonl",

  "raw_html_sha256": "a3f9c2d1e4b7f8a0c5d2e1f4b8a3c6d9e2f5b1a4c7d0e3f6b9a2c5d8e1f4b7",
  // SHA-256 of the raw HTML file — for change detection on incremental runs

  "raw_pdf_sha256": "b7d1e4f8a2c6d9e3f7b1a5c8d2e6f0b4a8c2d6e0f4b8a2c6d0e4f8b2a6c0d4",
  // SHA-256 of the raw PDF — null if no PDF

  "normalized_text_sha256": "c5a8f0b3d6e9a2c5d8e1f4b7a0c3d6e9f2b5a8c1d4e7f0b3a6c9d2e5f8b1a4",
  // SHA-256 of the normalized markdown body text

  "http_status_code": 200,
  "content_type": "text/html; charset=UTF-8",
  "content_length_bytes": 184320,
  "last_modified_header": "Thu, 11 Sep 2025 00:00:00 GMT",
  "etag": "\"a3f9c2d1\"",
  "download_timestamp": "2026-03-22T10:14:33Z",
  "content_source": "HTML",
  // "HTML" | "PDF" | "HTML+PDF" — what was used for the normalized text

  "parser_version": "osfi-parser-v2.1.0",
  // Version string of the HTML/PDF parsing component used

  "normalizer_version": "osfi-normalizer-v1.4.0",
  // Version string of the text normalization component

  "chunker_version": "osfi-chunker-v1.2.0",
  // Version string of the chunking component

  "embedding_model_version": "text-embedding-3-large-2024-01",
  // OpenAI model + deployment version used for dense embeddings

  "elser_model_version": ".elser_model_2",
  // ELSER model identifier used for sparse embeddings

  "quality_score": 1.0,
  // Float 0.0–1.0 assigned after parsing:
  //   1.0 = full body text extracted, all metadata fields populated
  //   0.8 = minor fields missing (e.g. no effective_date)
  //   0.5 = body text thin (<500 words), fell back to PDF
  //   0.2 = PDF extraction only, no structured HTML available
  //   0.0 = fetch failed or content unreadable

  "quality_flags": [],
  // Array of warning strings — e.g. ["missing_effective_date", "thin_body_text", "pdf_fallback_used"]


  // ─────────────────────────────────────────────────────────────────────────
  // GROUP 9 — SEARCH & RETRIEVAL FIELDS
  // Source: derived during Silver enrichment pass before embedding
  // ─────────────────────────────────────────────────────────────────────────

  "title_normalized": "capital adequacy requirements car guideline 2026",
  // Lowercased, punctuation-stripped, whitespace-normalized for BM25

  "publication_type_normalized": "guideline",
  // Controlled vocabulary lowercase form

  "category_normalized": "capital_adequacy_requirements",
  // Snake-case controlled vocabulary

  "sector_normalized": ["banks", "trust_and_loan_companies"],
  // Snake-case controlled vocabulary for filter facets

  "guideline_number_normalized": "CAR",
  // Uppercased, stripped of hyphens and spaces — for exact-match lookups

  "effective_date_sort_key": "2025-11-01",
  // ISO date for sorting — use earliest effective date (Oct FYE where split)

  "status_sort_key": 1,
  // Integer for status ordering: 1=final_current, 2=final_future, 3=superseded,
  // 4=draft, 5=rescinded

  "authority_sort_key": 100,
  // = authority_level — used in secondary sort after relevance score

  "version_sort_key_int": 2026,
  // Integer for version family sorting

  "keywords_normalized": [
    "capital adequacy", "CAR", "risk-weighted assets", "CET1", "tier 1 capital",
    "Basel III", "D-SIB", "domestic stability buffer", "credit risk", "market risk",
    "operational risk", "IRB", "standardized approach", "capital floor", "NVCC"
  ],
  // Extracted key terms for query expansion and BM25 boosting

  "applies_to_banks": true,
  "applies_to_trust_loan": true,
  "applies_to_life_insurance": false,
  "applies_to_pc_insurance": false,
  "applies_to_foreign_bank": false,
  "applies_to_foreign_insurance": false,
  "applies_to_cooperative": false,
  "applies_to_bank_holding": true,
  // Boolean sector flags for fast filter queries in Elasticsearch

  "bm25_text": "Capital Adequacy Requirements CAR Guideline 2026 Banks Trust and Loan Companies risk-weighted assets CET1 Tier 1 capital Basel III D-SIB domestic stability buffer credit risk market risk operational risk IRB standardized approach capital floor NVCC...",
  // Concatenated title + keywords + heading titles — fed to BM25/ELSER index field

  "vector_text": "[OSFI Guideline CAR | Capital Adequacy Requirements | Banks / Trust | FINAL_CURRENT | Effective Nov 2025 / Jan 2026]\nCapital Adequacy Requirements (CAR) – Guideline (2026)\n{normalized body text}",
  // The full text used for dense embedding at document level

  "llm_summary": "The CAR (2026) Guideline sets out OSFI's risk-based capital requirements for Canadian banks and trust companies. It establishes minimum CET1 (4.5%), Tier 1 (6.0%), and Total Capital (8.0%) ratios, plus the capital conservation buffer (2.5%), D-SIB surcharge (1%), and Domestic Stability Buffer. The guideline applies Basel III reforms and is structured in nine chapters covering credit risk (standardized and IRB), market risk, operational risk, securitization, CVA, and settlement risk. Effective November 2025 for October FYE institutions and January 2026 for December FYE institutions.",
  // 3–5 sentence LLM-generated executive summary — produced during Silver enrichment

  "query_expansion_terms": [
    "capital requirements", "regulatory capital", "risk weighted assets", "RWA",
    "Basel", "BCBS", "CET1", "leverage ratio", "ICAAP", "Pillar 1",
    "CAR guideline", "capital floor", "countercyclical buffer", "CCyB",
    "D-SIB surcharge", "DSB", "SMSB", "SMSBs"
  ],
  // Additional terms for query expansion in hybrid retrieval


  // ─────────────────────────────────────────────────────────────────────────
  // GROUP 10 — DOCUMENT-LEVEL IDENTITY SUMMARY
  // The fields from the user's required schema — all populated
  // ─────────────────────────────────────────────────────────────────────────

  "source_system": "osfi_guidance_library",
  "doc_family_id": "osfi.car",
  "doc_id": "osfi.car.2026.guideline",
  "version_id": "2026",
  "title": "Capital Adequacy Requirements (CAR) – Guideline (2026)",
  "title_normalized": "capital adequacy requirements car guideline 2026",
  "detail_url": "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/capital-adequacy-requirements-car-guideline-2026",
  "pdf_url": "https://www.osfi-bsif.gc.ca/en/print/pdf/node/1842",
  "publication_type": "Guideline",
  "publication_type_normalized": "guideline",
  "category": "Capital Adequacy Requirements",
  "category_normalized": "capital_adequacy_requirements",
  "sector": ["Banks", "Trust and Loan Companies"],
  "document_date": "2025-09-11",
  "effective_date_text": "November 2025 / January 2026",
  "effective_date_start": "2025-11-01",
  "effective_date_end": null,
  "guideline_number": "CAR",
  "status": "final_current",
  "authority_class": "primary_normative",
  "authority_level": 100,
  "document_class": "package_guideline",
  "parent_doc_id": null,
  "child_doc_ids": ["osfi.car.2026.chapter1","osfi.car.2026.chapter2","osfi.car.2026.chapter3","osfi.car.2026.chapter4","osfi.car.2026.chapter5","osfi.car.2026.chapter6","osfi.car.2026.chapter7","osfi.car.2026.chapter8","osfi.car.2026.chapter9"],
  "related_doc_ids": ["osfi.car.2026.letter","osfi.car.2026.faq_basel3","osfi.leverage.2023.guideline","osfi.lar.2025.guideline","osfi.smsb.2026.guideline"],
  "rescission_date": null,
  "consultation_closing_date": null,
  "heading_path": ["Capital Adequacy Requirements (CAR) – Guideline (2026)"],
  "citation_anchor": "osfi-car-2026",
  "language": "en",
  "raw_html_sha256": "a3f9c2d1e4b7f8a0c5d2e1f4b8a3c6d9e2f5b1a4c7d0e3f6b9a2c5d8e1f4b7",
  "raw_pdf_sha256": "b7d1e4f8a2c6d9e3f7b1a5c8d2e6f0b4a8c2d6e0f4b8a2c6d0e4f8b2a6c0d4",
  "normalized_text_sha256": "c5a8f0b3d6e9a2c5d8e1f4b7a0c3d6e9f2b5a8c1d4e7f0b3a6c9d2e5f8b1a4",
  "crawl_timestamp": "2026-03-22T10:14:33Z",
  "parser_version": "osfi-parser-v2.1.0",
  "quality_score": 1.0
}
```

---

## CHUNK-LEVEL SCHEMA (Group 10 — per chunk in `_chunks.jsonl`)

Every chunk written to `gold/osfi/chunks/{status}/{slug}_chunks.jsonl` carries this schema. One JSON object per line.

```json
{
  // ── Identity ──────────────────────────────────────────────────────────────
  "chunk_id": "osfi.car.2026.chapter1-sect1.2-001",
  // Format: {doc_id}-{section_anchor}-{chunk_index_within_section}

  "doc_id": "osfi.car.2026.chapter1",
  "doc_family_id": "osfi.car",
  "version_id": "2026",
  "chunk_index": 7,
  // Zero-based index within the document — global ordering

  "chunk_type": "section",
  // Types: full_doc | section | subsection | table | appendix | footnote_block

  // ── Position ──────────────────────────────────────────────────────────────
  "heading_path": [
    "Capital Adequacy Requirements (CAR) (2026) – Chapter 1",
    "1.3 Total Risk-weighted Assets",
    "1.3.1 Credit Risk"
  ],
  // Full heading breadcrumb from H1 down to the heading of this chunk's section

  "chapter_number": 1,
  "section_title": "1.3.1 Credit Risk",
  "heading_level": 4,
  "paragraph_range": [12, 18],
  // Start and end paragraph numbers within the section

  "citation_anchor": "car-2026-ch1-sect1.3.1",
  // Stable anchor for precise citation in NOVA responses

  "pdf_page_range": [4, 5],
  // Approximate PDF page range if chunk was parsed from PDF — null if HTML-parsed

  // ── Content ───────────────────────────────────────────────────────────────
  "text": "RWA for credit risk (including counterparty credit risk) is calculated as the sum of: Credit RWA for banking book exposures which, except the RWA listed in (b) through (e) below, is calculated using: the standardized approach (as set out in Chapter 4); or the Internal Ratings-Based (IRB) approach (as set out in Chapter 5)...",
  // Clean extracted text — no metadata prefix — used for NOVA response display and citation

  "embed_text": "[OSFI CAR 2026 Ch.1 | Capital Adequacy Requirements | Banks / Trust | FINAL_CURRENT | Effective Nov 2025 / Jan 2026]\n1.3.1 Credit Risk:\nRWA for credit risk (including counterparty credit risk) is calculated as the sum of...",
  // Metadata-prefixed text sent to the embedding model — NOT returned to users

  "chunk_summary": "Describes how risk-weighted assets for credit risk are calculated under CAR 2026, including banking book exposures using the standardized approach or IRB approach, counterparty credit risk, securitization, and CVA.",
  // 1–2 sentence LLM-generated summary of this specific chunk

  "token_count": 487,
  "char_count": 1923,
  "overlap_tokens_from_prev": 95,
  // Tokens carried over from the end of the previous chunk

  // ── Status & Authority (inherited from document) ──────────────────────────
  "status": "final_current",
  "effective_date_start": "2025-11-01",
  "effective_date_end": null,
  "effective_date_fye_split": true,
  "effective_date_oct_fye": "2025-11-01",
  "effective_date_dec_fye": "2026-01-01",
  "is_future_effective": false,
  "current_version_flag": true,

  "authority_class": "primary_normative",
  "authority_level": 100,
  "nova_tier": 1,
  "include_in_primary_corpus": true,
  "retrieval_boost": 0,

  // Citation warning — populated for FUTURE and SUPERSEDED chunks only
  "citation_warning": null,
  // "Effective May 1, 2027 — not yet in force" for FINAL_FUTURE_EFFECTIVE
  // "Superseded by LAR (2026) effective January 1, 2026" for SUPERSEDED
  // null for FINAL_CURRENT

  // ── Sector & Publication Type (for ES filters) ────────────────────────────
  "publication_type": "Guideline",
  "publication_type_normalized": "guideline",
  "category": "Capital Adequacy Requirements",
  "category_normalized": "capital_adequacy_requirements",
  "sector": ["Banks", "Trust and Loan Companies"],
  "sector_normalized": ["banks", "trust_and_loan_companies"],
  "applies_to_banks": true,
  "applies_to_trust_loan": true,
  "applies_to_life_insurance": false,
  "applies_to_pc_insurance": false,
  "applies_to_foreign_bank": false,
  "guideline_number": "CAR",
  "guideline_number_normalized": "CAR",
  "language": "en",

  // ── Source & Provenance ───────────────────────────────────────────────────
  "source_url": "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/capital-adequacy-requirements-car-2026-chapter-1-overview-risk-based-capital-requirements",
  "doc_title": "CAR (2026) – Chapter 1 – Overview of Risk-based Capital Requirements",
  "citation_label": "OSFI CAR (2026) Ch.1, §1.3.1",

  "chunker_version": "osfi-chunker-v1.2.0",
  "embedding_model_version": "text-embedding-3-large-2024-01",
  "chunk_created_at": "2026-03-22T11:45:00Z"
}
```

---

## SCRAPING PRIORITY: FIELD SOURCE MATRIX

| Field | Scraped From | Phase | Required? |
|---|---|---|---|
| `library_row_title`, `listing_date_iso`, `listing_publication_type`, `listing_category`, `listing_sector` | Index page table row | Phase 0 | ✅ Must-have |
| `title`, `publication_type`, `document_date_iso`, `sector`, `effective_date_text`, `guideline_number` | Detail page metadata block | Phase 1 | ✅ Must-have |
| `generate_pdf_url`, `toc_entries`, `related_document_links_raw`, `consultation_status_text` | Detail page controls | Phase 1 | ✅ Must-have |
| `doc_family_id`, `version_id`, `parent_doc_id`, `child_doc_ids`, `supersedes_doc_id` | Derived from slug + FAMILY_MAP | Phase 2 | ✅ Must-have |
| `status`, `effective_date_start`, `is_future_effective`, `include_in_primary_corpus` | Classification rules 1–7 | Phase 2 | ✅ Must-have |
| `authority_class`, `authority_level`, `nova_tier`, `document_class` | Publication type → authority mapping | Phase 2 | ✅ Must-have |
| `section_headings`, `toc_depth`, `inline_cross_references`, `table_count` | HTML body parser | Phase 1 | ✅ Must-have |
| `related_doc_ids`, `relationship_map`, `linked_guidelines` | Related-docs cross-reference pass | Phase 3 | ✅ Must-have |
| `raw_html_sha256`, `http_status_code`, `last_modified_header`, `etag` | HTTP response headers | Phase 1 | ✅ Must-have |
| `llm_summary`, `keywords_normalized`, `query_expansion_terms` | LLM enrichment pass | Phase 4 (Silver) | ✅ Must-have |
| `bm25_text`, `vector_text`, `embed_text` | Text assembly pass | Phase 4 (Silver) | ✅ Must-have |
| `applies_to_banks`, `applies_to_life_insurance`, etc. | Derived from `sector_normalized` | Phase 2 | ✅ Must-have |
| `pdf_page_range` | PDF parser (where applicable) | Phase 1 fallback | ⚠️ Where applicable |
| `footnote_count`, `appendix_ids`, `quoted_external_references` | HTML body parser | Phase 1 | ⚠️ Best-effort |
| `consultation_closing_date` | Draft manifest lookup | Phase 0 | ⚠️ Where applicable |
| `quality_flags` | Post-parse QA check | Phase 2 | ⚠️ Best-effort |
