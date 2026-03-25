# OSFI Corpus — Complete Storage Layout & File Naming Specification
**Version:** 1.0 | **Owner:** RBC Corporate Treasury — AI & Advanced Analytics
**For:** NOVA RAG Pipeline — Bronze / Silver / Gold ADLS Architecture

---

## CORE NAMING RULE

**All files use OSFI's exact slug as the base filename.** The slug is extracted directly from the OSFI URL:

```
URL:  https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/{slug}
File: {slug}.{ext}

Example:
URL:  .../capital-adequacy-requirements-car-guideline-2026
File: capital-adequacy-requirements-car-guideline-2026.html
      capital-adequacy-requirements-car-guideline-2026.pdf
      capital-adequacy-requirements-car-guideline-2026.json
      capital-adequacy-requirements-car-guideline-2026.md
```

No renaming, no shortening, no hashing. If OSFI changes a slug, the manifest hash detects it and triggers a reclassification event.

---

## FULL DIRECTORY TREE

```
adls://nova-data/
│
├── bronze/osfi/
│   │
│   ├── html/                          ← Raw HTML exactly as fetched
│   │   ├── final_current/
│   │   ├── final_future_effective/
│   │   ├── superseded/
│   │   ├── draft_or_consultation/
│   │   └── rescinded/
│   │
│   ├── pdf/                           ← Raw PDFs (binary)
│   │   ├── final_current/
│   │   ├── final_future_effective/
│   │   ├── superseded/
│   │   ├── draft_or_consultation/
│   │   └── rescinded/
│   │
│   ├── http_headers/                  ← HTTP response headers per fetch
│   │   └── {slug}.headers.json
│   │
│   └── manifests/
│       ├── current_library_manifest.jsonl
│       ├── rescinded_manifest.jsonl
│       ├── draft_manifest.jsonl
│       ├── detail_manifest.jsonl
│       ├── asset_manifest.jsonl
│       └── corpus_manifest_{YYYY-MM-DD}.json
│
├── silver/osfi/
│   │
│   ├── json/                          ← Canonical document model (enriched metadata)
│   │   ├── final_current/
│   │   ├── final_future_effective/
│   │   ├── superseded/
│   │   ├── draft_or_consultation/
│   │   └── rescinded/
│   │
│   ├── md/                            ← Clean normalized markdown body text
│   │   ├── final_current/
│   │   ├── final_future_effective/
│   │   ├── superseded/
│   │   ├── draft_or_consultation/
│   │   └── rescinded/
│   │
│   └── pdf_text/                      ← PDF-extracted plain text (where applicable)
│       ├── final_current/
│       ├── final_future_effective/
│       ├── superseded/
│       └── draft_or_consultation/
│
└── gold/osfi/
    │
    ├── chunks/                        ← JSONL chunk records (embed-ready)
    │   ├── final_current/
    │   ├── final_future_effective/
    │   ├── superseded/
    │   └── draft_or_consultation/     ← Contextual store chunks only
    │
    └── logs/
        ├── completeness_report_{YYYY-MM-DD}.json
        ├── classification_report_{YYYY-MM-DD}.json
        ├── fetch_errors_{YYYY-MM-DD}.jsonl
        └── rule6_guard_report_{YYYY-MM-DD}.json
```

---

## STATUS-FOLDER MAPPING

Every file lives in exactly one status subfolder. Status is assigned during classification (Part 3 of the scraping spec) and never changes within a run — only a new run can reclassify.

| Status | Folder Name | Bronze | Silver | Gold |
|---|---|---|---|---|
| FINAL_CURRENT | `final_current/` | ✅ html + pdf | ✅ json + md + pdf_text | ✅ chunks |
| FINAL_FUTURE_EFFECTIVE | `final_future_effective/` | ✅ html + pdf | ✅ json + md + pdf_text | ✅ chunks |
| SUPERSEDED | `superseded/` | ✅ html + pdf | ✅ json + md + pdf_text | ✅ chunks (de-ranked) |
| DRAFT_OR_CONSULTATION | `draft_or_consultation/` | ✅ html + pdf | ✅ json + md | ✅ contextual chunks only |
| RESCINDED | `rescinded/` | ✅ html only | ✅ json only (tombstone) | 🚫 never |

**Rescinded rule:** Raw HTML is preserved for audit. A tombstone JSON is written to silver/json/rescinded/ to record the slug, title, and rescission date. Nothing from rescinded/ ever enters gold/.

---

## COMPLETE FILE MANIFEST BY GROUP

### GROUP 1 — FINAL_CURRENT: "2026" Guidelines

**CAR 2026 Family** (effective Nov 2025 / Jan 2026)

```
bronze/osfi/html/final_current/
  capital-adequacy-requirements-car-guideline-2026.html
  capital-adequacy-requirements-car-2026-chapter-1-overview-risk-based-capital-requirements.html
  capital-adequacy-requirements-car-2026-chapter-2-definition-capital.html
  capital-adequacy-requirements-car-2026-chapter-3-operational-risk.html
  capital-adequacy-requirements-car-2026-chapter-4-credit-risk-standardized-approach.html
  capital-adequacy-requirements-car-2026-chapter-5-credit-risk-internal-ratings-based-approach.html
  capital-adequacy-requirements-car-2026-chapter-6-securitization.html
  capital-adequacy-requirements-car-2026-chapter-7-settlement-counterparty-risk.html
  capital-adequacy-requirements-car-2026-chapter-8-credit-valuation-adjustment-cva-risk.html
  capital-adequacy-requirements-car-2026-chapter-9-market-risk.html
  capital-adequacy-requirements-guideline-2026-letter.html         ← Cover letter (Tier 2)
  small-medium-sized-deposit-taking-institutions-smsbs-capital-liquidity-requirements-guideline-2026.html

bronze/osfi/pdf/final_current/
  capital-adequacy-requirements-car-guideline-2026.pdf
  capital-adequacy-requirements-car-2026-chapter-1-overview-risk-based-capital-requirements.pdf
  capital-adequacy-requirements-car-2026-chapter-2-definition-capital.pdf
  capital-adequacy-requirements-car-2026-chapter-3-operational-risk.pdf
  capital-adequacy-requirements-car-2026-chapter-4-credit-risk-standardized-approach.pdf
  capital-adequacy-requirements-car-2026-chapter-5-credit-risk-internal-ratings-based-approach.pdf
  capital-adequacy-requirements-car-2026-chapter-6-securitization.pdf
  capital-adequacy-requirements-car-2026-chapter-7-settlement-counterparty-risk.pdf
  capital-adequacy-requirements-car-2026-chapter-8-credit-valuation-adjustment-cva-risk.pdf
  capital-adequacy-requirements-car-2026-chapter-9-market-risk.pdf
  capital-adequacy-requirements-guideline-2026-letter.pdf
  small-medium-sized-deposit-taking-institutions-smsbs-capital-liquidity-requirements-guideline-2026.pdf

silver/osfi/json/final_current/
  capital-adequacy-requirements-car-guideline-2026.json
  capital-adequacy-requirements-car-2026-chapter-1-overview-risk-based-capital-requirements.json
  [... all chapters ...]
  capital-adequacy-requirements-guideline-2026-letter.json
  small-medium-sized-deposit-taking-institutions-smsbs-capital-liquidity-requirements-guideline-2026.json

silver/osfi/md/final_current/
  capital-adequacy-requirements-car-guideline-2026.md
  capital-adequacy-requirements-car-2026-chapter-1-overview-risk-based-capital-requirements.md
  [... all chapters ...]

gold/osfi/chunks/final_current/
  capital-adequacy-requirements-car-guideline-2026_chunks.jsonl
  capital-adequacy-requirements-car-2026-chapter-1-overview-risk-based-capital-requirements_chunks.jsonl
  [... all chapters ...]
```

**LAR 2026 Family** (effective Jan 1, 2026)

```
bronze/osfi/html/final_current/
  liquidity-adequacy-requirements-lar-guideline-2026.html
  liquidity-adequacy-requirements-lar-2026-chapter-1-overview.html
  liquidity-adequacy-requirements-lar-2026-chapter-2-liquidity-coverage-ratio.html
  liquidity-adequacy-requirements-lar-2026-chapter-3-net-stable-funding-ratio.html
  liquidity-adequacy-requirements-lar-2026-chapter-4-net-cumulative-cash-flow.html
  liquidity-adequacy-requirements-lar-2026-chapter-5-operating-cash-flow-statement.html
  liquidity-adequacy-requirements-lar-2026-chapter-6-liquidity-monitoring-tools.html
  liquidity-adequacy-requirements-lar-2026-chapter-7-intraday-liquidity-monitoring-tools.html
  liquidity-adequacy-requirements-guideline-2026-letter.html

bronze/osfi/pdf/final_current/
  liquidity-adequacy-requirements-lar-guideline-2026.pdf
  liquidity-adequacy-requirements-lar-2026-chapter-1-overview.pdf
  liquidity-adequacy-requirements-lar-2026-chapter-2-liquidity-coverage-ratio.pdf
  liquidity-adequacy-requirements-lar-2026-chapter-3-net-stable-funding-ratio.pdf
  liquidity-adequacy-requirements-lar-2026-chapter-4-net-cumulative-cash-flow.pdf
  liquidity-adequacy-requirements-lar-2026-chapter-5-operating-cash-flow-statement.pdf
  liquidity-adequacy-requirements-lar-2026-chapter-6-liquidity-monitoring-tools.pdf
  liquidity-adequacy-requirements-lar-2026-chapter-7-intraday-liquidity-monitoring-tools.pdf
  liquidity-adequacy-requirements-guideline-2026-letter.pdf

silver/osfi/json/final_current/
  liquidity-adequacy-requirements-lar-guideline-2026.json
  liquidity-adequacy-requirements-lar-2026-chapter-1-overview.json
  [... all chapters ...]

silver/osfi/md/final_current/
  liquidity-adequacy-requirements-lar-guideline-2026.md
  liquidity-adequacy-requirements-lar-2026-chapter-1-overview.md
  [... all chapters ...]

gold/osfi/chunks/final_current/
  liquidity-adequacy-requirements-lar-guideline-2026_chunks.jsonl
  liquidity-adequacy-requirements-lar-2026-chapter-1-overview_chunks.jsonl
  [... all chapters ...]
```

**MCT 2026** (effective Jan 1, 2026 — P&C sector)

```
bronze/osfi/html/final_current/
  minimum-capital-test-guideline-2026.html
  minimum-capital-test-2026-letter.html

bronze/osfi/pdf/final_current/
  minimum-capital-test-guideline-2026.pdf
  minimum-capital-test-2026-letter.pdf

silver/osfi/json/final_current/
  minimum-capital-test-guideline-2026.json
  minimum-capital-test-2026-letter.json

silver/osfi/md/final_current/
  minimum-capital-test-guideline-2026.md

gold/osfi/chunks/final_current/
  minimum-capital-test-guideline-2026_chunks.jsonl
```

---

### GROUP 2 — FINAL_FUTURE_EFFECTIVE: "2027" Guidelines (E-23 only)

**E-23 Model Risk Management 2027** (effective May 1, 2027)

```
bronze/osfi/html/final_future_effective/
  guideline-e-23-model-risk-management-2027.html
  guideline-e-23-model-risk-management-2027-letter.html

bronze/osfi/pdf/final_future_effective/
  guideline-e-23-model-risk-management-2027.pdf
  guideline-e-23-model-risk-management-2027-letter.pdf

silver/osfi/json/final_future_effective/
  guideline-e-23-model-risk-management-2027.json
  guideline-e-23-model-risk-management-2027-letter.json

silver/osfi/md/final_future_effective/
  guideline-e-23-model-risk-management-2027.md

silver/osfi/pdf_text/final_future_effective/
  guideline-e-23-model-risk-management-2027.txt

gold/osfi/chunks/final_future_effective/
  guideline-e-23-model-risk-management-2027_chunks.jsonl
```

**Note on E-23 chunk metadata:** Every chunk record for this document must include:
```json
{
  "status": "FINAL_FUTURE_EFFECTIVE",
  "effective_date": "2027-05-01",
  "current_version_flag": false,
  "citation_warning": "Effective May 1, 2027 — not yet in force as of [query_date]"
}
```

---

### GROUP 3 — DRAFT_OR_CONSULTATION: "2027" CAR Draft

**CAR 2027 Draft** (consultation closed Feb 18, 2026 — final not yet published)

```
bronze/osfi/html/draft_or_consultation/
  draft-capital-adequacy-requirements-guideline-2027-letter.html

bronze/osfi/pdf/draft_or_consultation/
  draft-capital-adequacy-requirements-guideline-2027-letter.pdf

silver/osfi/json/draft_or_consultation/
  draft-capital-adequacy-requirements-guideline-2027-letter.json

silver/osfi/md/draft_or_consultation/
  draft-capital-adequacy-requirements-guideline-2027-letter.md

gold/osfi/chunks/draft_or_consultation/
  draft-capital-adequacy-requirements-guideline-2027-letter_chunks.jsonl
```

**Note:** Chunks in `gold/chunks/draft_or_consultation/` are **never indexed into the primary Elasticsearch index** (`osfi_guidance_chunks_v2`). They are written to a separate sidecar index:
```
osfi_guidance_contextual_v2   ← draft, consultation, backgrounders
```
NOVA queries this index only when explicitly answering "what is OSFI proposing?" or "what changed in a draft?" — never for operative regulatory guidance.

---

### GROUP 4 — SUPERSEDED: "2025" LAR and MCT (replaced by 2026 versions)

**LAR 2025** (superseded by LAR 2026 effective Jan 1, 2026)

```
bronze/osfi/html/superseded/
  liquidity-adequacy-requirements-lar-guideline-2025.html
  liquidity-adequacy-requirements-lar-2025-chapter-1-overview.html
  liquidity-adequacy-requirements-lar-2025-chapter-2-liquidity-coverage-ratio.html
  liquidity-adequacy-requirements-lar-2025-chapter-3-net-stable-funding-ratio.html
  liquidity-adequacy-requirements-lar-2025-chapter-4-net-cumulative-cash-flow.html
  liquidity-adequacy-requirements-lar-2025-chapter-5-operating-cash-flow-statement.html
  liquidity-adequacy-requirements-lar-2025-chapter-6-liquidity-monitoring-tools.html
  liquidity-adequacy-requirements-lar-2025-chapter-7-intraday-liquidity-monitoring-tools.html
  liquidity-adequacy-requirements-guideline-2025-letter.html

bronze/osfi/pdf/superseded/
  liquidity-adequacy-requirements-lar-guideline-2025.pdf
  liquidity-adequacy-requirements-lar-2025-chapter-1-overview.pdf
  [... all chapters ...]

silver/osfi/json/superseded/
  liquidity-adequacy-requirements-lar-guideline-2025.json
  liquidity-adequacy-requirements-lar-2025-chapter-1-overview.json
  [... all chapters ...]

silver/osfi/md/superseded/
  liquidity-adequacy-requirements-lar-guideline-2025.md
  liquidity-adequacy-requirements-lar-2025-chapter-1-overview.md
  [... all chapters ...]

gold/osfi/chunks/superseded/
  liquidity-adequacy-requirements-lar-guideline-2025_chunks.jsonl
  liquidity-adequacy-requirements-lar-2025-chapter-1-overview_chunks.jsonl
  [... all chapters ...]
```

**MCT 2024** (superseded by MCT 2026 effective Jan 1, 2026)

```
bronze/osfi/html/superseded/
  minimum-capital-test-guideline-2024.html

bronze/osfi/pdf/superseded/
  minimum-capital-test-guideline-2024.pdf

silver/osfi/json/superseded/
  minimum-capital-test-guideline-2024.json

silver/osfi/md/superseded/
  minimum-capital-test-guideline-2024.md

gold/osfi/chunks/superseded/
  minimum-capital-test-guideline-2024_chunks.jsonl
```

**Note on superseded chunk metadata:**
```json
{
  "status": "SUPERSEDED",
  "superseded_by": "liquidity-adequacy-requirements-lar-guideline-2026",
  "superseded_date": "2026-01-01",
  "retrieval_boost": -2,
  "citation_warning": "Superseded by LAR (2026) effective January 1, 2026"
}
```

---

### GROUP 5 — FINAL_CURRENT: "2025" Guidelines Still Operative

These have "(2025)" in the title but no newer version has been published. They are fully current.

**LICAT 2025 Family** (effective Jan 1, 2025)

```
bronze/osfi/html/final_current/
  life-insurance-capital-adequacy-test-guideline-2025.html
  life-insurance-capital-adequacy-test-2025-chapter-1-overview-general-requirements.html
  life-insurance-capital-adequacy-test-2025-chapter-2-available-capital.html
  life-insurance-capital-adequacy-test-2025-chapter-3-credit-risk-balance-sheet-items.html
  life-insurance-capital-adequacy-test-2025-chapter-4-credit-risk-balance-sheet-activities.html
  life-insurance-capital-adequacy-test-2025-chapter-5-market-risk.html
  life-insurance-capital-adequacy-test-2025-chapter-6-insurance-risk.html
  life-insurance-capital-adequacy-test-2025-chapter-7-segregated-fund-guarantee-risk.html
  life-insurance-capital-adequacy-test-2025-chapter-8-operational-risk.html
  life-insurance-capital-adequacy-test-2025-chapter-9-participating-adjustable-products.html
  life-insurance-capital-adequacy-test-2025-chapter-10-credit-reinsurance.html
  life-insurance-capital-adequacy-test-2025-chapter-11-aggregation-diversification-risks.html
  life-insurance-capital-adequacy-test-2025-chapter-12-life-insurers-operating-canada-branch-basis.html
  life-insurance-capital-adequacy-test-2025-letter.html

bronze/osfi/pdf/final_current/
  life-insurance-capital-adequacy-test-guideline-2025.pdf
  [... all 12 chapters + letter ...]

silver/osfi/json/final_current/
  life-insurance-capital-adequacy-test-guideline-2025.json
  [... all 12 chapters ...]

silver/osfi/md/final_current/
  life-insurance-capital-adequacy-test-guideline-2025.md
  [... all 12 chapters ...]

gold/osfi/chunks/final_current/
  life-insurance-capital-adequacy-test-guideline-2025_chunks.jsonl
  [... all 12 chapters ...]
```

**Other current 2025 guidelines (same pattern)**

```
bronze/osfi/html/final_current/
  sound-reinsurance-practices-procedures-guideline-2025.html
  pillar-3-disclosure-guideline-domestic-systemically-important-banks-sibs-2025.html
  pillar-3-disclosure-guideline-small-medium-sized-deposit-taking-institutions-smsbs-2025.html
  mortgage-insurer-capital-adequacy-test-guideline-2025.html
  parental-stand-alone-solo-capital-framework-federally-regulated-life-insurers-2025.html
  regulatory-capital-internal-capital-targets-2025.html

[same pattern replicated across pdf/, silver/json/, silver/md/, gold/chunks/]
```

---

## CHUNKS FILE FORMAT

Each `_chunks.jsonl` file contains one JSON object per line, one line per chunk:

```jsonl
{"chunk_id":"car-2026-ch1-001","doc_id":"capital-adequacy-requirements-car-2026-chapter-1-overview-risk-based-capital-requirements","doc_family_id":"osfi.car","status":"FINAL_CURRENT","effective_date":"2026-01-01","nova_tier":1,"authority_level":100,"section_heading":"1.2 Regulatory Capital","text":"Total capital consists of the sum of the following elements: Tier 1 capital...","embed_text":"[OSFI CAR 2026 Ch.1 | Capital Adequacy | Banks | FINAL_CURRENT | Effective Jan 2026]\n1.2 Regulatory Capital:\nTotal capital consists of...","token_count":487,"citation_label":"OSFI CAR (2026) Ch.1, §1.2","source_url":"https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/capital-adequacy-requirements-car-2026-chapter-1-overview-risk-based-capital-requirements"}
{"chunk_id":"car-2026-ch1-002", ...}
```

---

## HTTP HEADERS FILE FORMAT

```
bronze/osfi/http_headers/
  capital-adequacy-requirements-car-guideline-2026.headers.json
```

```json
{
  "slug": "capital-adequacy-requirements-car-guideline-2026",
  "fetch_url": "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/capital-adequacy-requirements-car-guideline-2026",
  "status_code": 200,
  "last_modified": "Thu, 11 Sep 2025 00:00:00 GMT",
  "content_type": "text/html; charset=UTF-8",
  "etag": "...",
  "crawl_timestamp": "2026-03-22T10:00:00Z"
}
```

---

## SILVER JSON TOMBSTONE FORMAT (Rescinded documents)

```
silver/osfi/json/rescinded/
  {slug}.json
```

```json
{
  "doc_id": "osfi-{slug}",
  "slug": "{slug}",
  "title": "...",
  "status": "RESCINDED",
  "rescission_date": "YYYY-MM-DD",
  "include_primary": false,
  "include_contextual": false,
  "reason": "Rescinded per OSFI rescinded-guidance page",
  "tombstone": true,
  "crawl_timestamp": "..."
}
```

---

## CLASSIFICATION TRANSITION RULES

When the agent reruns and a document changes status, move the file to the new status folder. Do not leave copies in the old folder.

| From → To | Trigger | Action |
|---|---|---|
| `final_future_effective/` → `final_current/` | `effective_date` ≤ today on new run | Move all files to `final_current/`. Update JSON + re-index ES with new status. No re-embedding needed. |
| `final_current/` → `superseded/` | New version of same family published | Move all files to `superseded/`. Update JSON. Lower retrieval boost in ES. |
| `draft_or_consultation/` → `final_current/` | OSFI publishes final version | Remove draft files. Scrape final page. Write to `final_current/`. New slug will differ (drop "draft-" prefix). |
| `final_current/` → `rescinded/` | Slug appears in rescinded manifest | Move HTML to `rescinded/html/`. Write tombstone to `rescinded/json/`. Delete from ES. |

---

## MANIFEST FILE LOCATIONS

```
bronze/osfi/manifests/
  current_library_manifest.jsonl        ← All rows from index pages, all 3 control feeds
  rescinded_manifest.jsonl              ← All entries from rescinded-guidance page
  draft_manifest.jsonl                  ← All entries from draft-guidance page
  detail_manifest.jsonl                 ← Per-document metadata extracted from detail pages
  asset_manifest.jsonl                  ← All linked PDFs, chapter URLs, related doc URLs
  corpus_manifest_2026-03-22.json       ← Run-level fingerprint and counts
```

```
gold/osfi/logs/
  completeness_report_2026-03-22.json   ← 5-layer completeness verification results
  classification_report_2026-03-22.json ← Per-document status decisions + rule applied
  rule6_guard_report_2026-03-22.json    ← List of pages where Rule 6 fired
  fetch_errors_2026-03-22.jsonl         ← All non-200 responses
```
