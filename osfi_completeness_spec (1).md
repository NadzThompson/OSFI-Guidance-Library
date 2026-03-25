# OSFI Scraper — Completeness Verification Specification
**Purpose:** Prove all active guidance has been scraped when no official total count is published
**Feeds into:** Part 10 (QA) of the main OSFI Scraping Spec

---

## The Core Problem

OSFI's guidance library renders no total document count in the HTML. There is no:
- "Showing 1–50 of 277 results" counter
- Public sitemap.xml listing all guidance slugs
- API or JSON feed exposing the full corpus

The pagination shows **6 pages at 50 items/page** (pages 0–5). Page 5 (last page) has 27 items. So the ground-truth count is:

```
5 full pages × 50 items + 27 items on last page = 277 active documents
(as of March 2026 — this changes with every new publication)
```

Because OSFI cannot be asked "how many documents do you have?", completeness must be proven using **five independent verification layers**. All five must pass before Gold layer ingestion is approved.

---

## Layer 1 — Pagination Termination Detection (Structural Proof)

This is the primary mechanism. The agent must detect when it has reached the true last page and stop — not assume a fixed page count.

### Rule: Scrape until the "Next page" link disappears

On every index page, parse the pagination block:
```html
<li class="pager__item--next">
  <a href="...?page={n+1}">Next page</a>
</li>
```

**Algorithm:**
```python
page = 0
all_seeds = []

while True:
    url = f"{BASE}?page={page}&items_per_page=50"
    html = fetch(url)
    rows = parse_table_rows(html)
    all_seeds.extend(rows)

    # Termination condition: no "Next page" link in pagination block
    has_next = bool(html.find('pager__item--next'))
    if not has_next:
        break

    page += 1

TOTAL_FROM_PAGINATION = len(all_seeds)
```

**Why this is necessary:** OSFI adds new documents frequently. If you hardcode `range(6)` and OSFI adds enough documents to spill onto a 7th page, your agent silently misses an entire page. The while-loop with termination detection is the only safe approach.

**What to store:**
```json
{
  "run_id": "2026-03-22-001",
  "pages_scraped": 6,
  "last_page_index": 5,
  "last_page_had_next_link": false,
  "total_seeds_from_index": 277
}
```

---

## Layer 2 — Filter-Based Cross-Validation (Independent Count)

OSFI's index page has three independent filter dimensions: **Category**, **Publication Type**, and **Sector**. Each can be queried individually. The sum of counts across all values of a dimension must equal the unfiltered total.

This is your independent "official" count mechanism.

### Step 2.1 — Query each Category filter individually

Fetch each category URL and count the rows returned (sum all pages within that category):

| Category Filter Value | URL Parameter |
|---|---|
| Accounting and Disclosure | `category=accounting_and_disclosure` |
| Capital Adequacy Requirements | `category=capital_adequacy_requirements` |
| Prudential Limits and Restrictions | `category=prudential_limits_and_restrictions` |
| Regulatory and legislative | `category=regulatory_and_legislative` |
| Sound Business and Financial Practices | `category=sound_business_and_financial_practices` |
| Standards of Sound Business (Life Insurance) | `category=standards_of_sound_business_...` |
| Supervisory Advisories | `category=supervisory_advisories` |
| (No category / blank) | Requires manual count from unfiltered results |

**Note:** Some documents have no category assigned. Query the unfiltered list and subtract the sum of all category-filtered counts to find the uncategorized count. The total must reconcile.

### Step 2.2 — Query each Publication Type filter individually

| Publication Type | Expected |
|---|---|
| Guideline | High count (~60–80) — most critical |
| Letter | High count (~80–100) — transmittals |
| Regulatory notice | Medium |
| Advisory | Low |
| Frequently asked questions | Low |
| ... (all 19 types) | Sum must = total |

### Step 2.3 — Reconciliation Check

```python
def cross_validate_counts(seeds_from_pagination, filter_counts):
    total_from_pagination = len(seeds_from_pagination)

    # Category sum (including uncategorized)
    category_sum = sum(filter_counts["category"].values())
    assert category_sum == total_from_pagination, \
        f"Category sum {category_sum} ≠ pagination total {total_from_pagination}"

    # Publication type sum
    pubtype_sum = sum(filter_counts["publication_type"].values())
    assert pubtype_sum == total_from_pagination, \
        f"Pub type sum {pubtype_sum} ≠ pagination total {total_from_pagination}"
```

**If any assertion fails:** There is a counting anomaly on the site (duplicate rows, filter overlap, or a document appearing in the wrong state). Flag for manual review before proceeding.

---

## Layer 3 — Critical Document Checklist (Mandatory Presence)

Some documents are so central to RBC's regulatory obligations that their absence from the corpus is unacceptable regardless of aggregate counts. The agent must verify these specific slugs are present in the scraped seed list.

### Versioning Patterns: Critical Context Before the Checklist

OSFI uses **two distinct versioning behaviours** that the agent and checklist must handle differently:

**Pattern A — New versioned pages (most common for major guidelines):**
OSFI creates new pages with year-tagged slugs (e.g., `-2025`, `-2026`) and keeps the prior year's pages live in the library. Both the old and new version are discoverable in the index simultaneously during a transition period. Example: LAR 2025 chapters (published Nov 2024) and LAR 2026 chapters (published Jan 2026) **both appear in the index** right now.

**Pattern B — In-place replacement (observed for CAR):**
OSFI removes or replaces the prior version's index entry when the new version is published, so only one version of the guideline family is visible in the index at any time. The 2025 CAR chapters are **not present anywhere** in the 6-page index — they do not appear at all, despite the 2026 CAR having been published only in September 2025. This means OSFI either updated the existing pages in-place or delisted the 2025 versions entirely when issuing 2026.

**Operational implication for NOVA:**
- LAR 2025 chapters: present in index, scrape them, tag `corpus_status: SUPERSEDED` (see new status below)
- CAR 2025 chapters: not in index, treat as removed/replaced — do NOT attempt to invent URLs for them
- The agent must **never guess or construct URLs** for versions not found in the index; it must only follow confirmed links

**New corpus_status value:** Add `SUPERSEDED` to the existing `ACTIVE / FUTURE / RESCINDED / CONSULTATION` taxonomy:
```
SUPERSEDED: Document is still live in the OSFI library but has been replaced by a newer
            version. Include in corpus but tag clearly; NOVA must not cite as current.
            Retrieval boost = -2 (de-prioritize vs. current version in same family).
```

---

### Tier 1 Critical Documents — Must Be Present

```python
CRITICAL_SLUGS = {

    # ── CAR 2026 (in effect Jan 1, 2026 — current) ─────────────────────────────
    "capital-adequacy-requirements-car-guideline-2026":                         "ACTIVE",
    "capital-adequacy-requirements-car-2026-chapter-1-overview-risk-based-capital-requirements": "ACTIVE",
    "capital-adequacy-requirements-car-2026-chapter-2-definition-capital":      "ACTIVE",
    "capital-adequacy-requirements-car-2026-chapter-3-operational-risk":        "ACTIVE",
    "capital-adequacy-requirements-car-2026-chapter-4-credit-risk-standardized-approach": "ACTIVE",
    "capital-adequacy-requirements-car-2026-chapter-5-credit-risk-internal-ratings-based-approach": "ACTIVE",
    "capital-adequacy-requirements-car-2026-chapter-6-securitization":          "ACTIVE",
    "capital-adequacy-requirements-car-2026-chapter-7-settlement-counterparty-risk": "ACTIVE",
    "capital-adequacy-requirements-car-2026-chapter-8-credit-valuation-adjustment-cva-risk": "ACTIVE",
    "capital-adequacy-requirements-car-2026-chapter-9-market-risk":             "ACTIVE",

    # NOTE: CAR 2025 chapters are NOT in the OSFI index (Pattern B in-place replacement).
    # Do not add them. Do not attempt to construct their URLs.

    # ── LAR 2026 (in effect Jan 1, 2026 — current) ─────────────────────────────
    "liquidity-adequacy-requirements-lar-guideline-2026":                       "ACTIVE",
    "liquidity-adequacy-requirements-lar-2026-chapter-1-overview":              "ACTIVE",
    "liquidity-adequacy-requirements-lar-2026-chapter-2-liquidity-coverage-ratio": "ACTIVE",
    "liquidity-adequacy-requirements-lar-2026-chapter-3-net-stable-funding-ratio": "ACTIVE",
    "liquidity-adequacy-requirements-lar-2026-chapter-4-net-cumulative-cash-flow": "ACTIVE",
    "liquidity-adequacy-requirements-lar-2026-chapter-5-operating-cash-flow-statement": "ACTIVE",
    "liquidity-adequacy-requirements-lar-2026-chapter-6-liquidity-monitoring-tools": "ACTIVE",
    "liquidity-adequacy-requirements-lar-2026-chapter-7-intraday-liquidity-monitoring-tools": "ACTIVE",

    # ── LAR 2025 (superseded by 2026 but still live in library — Pattern A) ────
    "liquidity-adequacy-requirements-lar-guideline-2025":                       "SUPERSEDED",
    "liquidity-adequacy-requirements-lar-2025-chapter-1-overview":              "SUPERSEDED",
    "liquidity-adequacy-requirements-lar-2025-chapter-2-liquidity-coverage-ratio": "SUPERSEDED",
    "liquidity-adequacy-requirements-lar-2025-chapter-3-net-stable-funding-ratio": "SUPERSEDED",
    "liquidity-adequacy-requirements-lar-2025-chapter-4-net-cumulative-cash-flow": "SUPERSEDED",
    "liquidity-adequacy-requirements-lar-2025-chapter-5-operating-cash-flow-statement": "SUPERSEDED",
    "liquidity-adequacy-requirements-lar-2025-chapter-6-liquidity-monitoring-tools": "SUPERSEDED",
    "liquidity-adequacy-requirements-lar-2025-chapter-7-intraday-liquidity-monitoring-tools": "SUPERSEDED",

    # ── Model Risk ──────────────────────────────────────────────────────────────
    "guideline-e-23-model-risk-management-2027":                                "FUTURE",

    # ── Third-Party Risk ────────────────────────────────────────────────────────
    "third-party-risk-management-guideline":                                    "ACTIVE",

    # ── Technology / Cyber (B-13) ───────────────────────────────────────────────
    "technology-cyber-risk-management":                                         "ACTIVE",

    # ── Operational Risk (E-21) ─────────────────────────────────────────────────
    "operational-risk-management-resilience-guideline":                         "ACTIVE",

    # ── Climate Risk (B-15) ─────────────────────────────────────────────────────
    "climate-risk-management":                                                  "ACTIVE",

    # ── Integrity and Security ──────────────────────────────────────────────────
    "integrity-security-guideline":                                             "ACTIVE",

    # ── Corporate Governance ────────────────────────────────────────────────────
    "corporate-governance-guideline-2018":                                      "ACTIVE",

    # ── SMSB ────────────────────────────────────────────────────────────────────
    "small-medium-sized-deposit-taking-institutions-smsbs-capital-liquidity-requirements-guideline-2026": "ACTIVE",

    # ── Leverage ────────────────────────────────────────────────────────────────
    "leverage-requirements-guideline-2023":                                     "ACTIVE",

    # ── Crypto ──────────────────────────────────────────────────────────────────
    "capital-liquidity-treatment-crypto-asset-exposures-banking-guideline":     "ACTIVE",
    "frequently-asked-questions-crypto-assets":                                 "ACTIVE",

    # ── Disclosure ──────────────────────────────────────────────────────────────
    "pillar-3-disclosure-guideline-domestic-systemically-important-banks-sibs-2025": "ACTIVE",
    "pillar-3-disclosure-expectations":                                         "ACTIVE",

    # ── Mortgage Underwriting ───────────────────────────────────────────────────
    "infosheet-residential-mortgage-underwriting-practices-procedures-guideline-b-20": "ACTIVE",

    # ── DSB (most recent) ───────────────────────────────────────────────────────
    "osfi-maintains-level-domestic-stability-buffer-35-letter-december-2025":  "ACTIVE",

    # ── Margin Requirements ─────────────────────────────────────────────────────
    "margin-requirements-non-centrally-cleared-derivatives-guideline-2020":     "ACTIVE",

    # ── Reinsurance ─────────────────────────────────────────────────────────────
    "sound-reinsurance-practices-procedures-guideline-2025":                    "ACTIVE",
}

def verify_critical_documents(scraped_slugs: set, scraped_statuses: dict) -> dict:
    missing = []
    wrong_status = []

    for slug, expected_status in CRITICAL_SLUGS.items():
        if slug not in scraped_slugs:
            missing.append(slug)
        elif scraped_statuses.get(slug) != expected_status:
            wrong_status.append({
                "slug": slug,
                "expected": expected_status,
                "actual": scraped_statuses.get(slug)
            })

    return {
        "critical_total": len(CRITICAL_SLUGS),
        "critical_found": len(CRITICAL_SLUGS) - len(missing),
        "critical_missing": missing,
        "status_mismatches": wrong_status,
        "pass": len(missing) == 0 and len(wrong_status) == 0
    }
```

def verify_critical_documents(scraped_slugs: set) -> dict:
    missing = [slug for slug in CRITICAL_SLUGS if slug not in scraped_slugs]
    return {
        "critical_total": len(CRITICAL_SLUGS),
        "critical_found": len(CRITICAL_SLUGS) - len(missing),
        "critical_missing": missing,
        "pass": len(missing) == 0
    }
```

**If any critical slug is missing:** Stop ingestion. Investigate whether the document was rescinded, renamed, or the slug changed. Do not proceed to Silver layer.

---

## Layer 4 — Slug Manifest Hash (Run-to-Run Integrity)

After every successful run, compute a canonical hash of the complete scraped URL set. Store it in the Bronze layer. On the next run, compare hashes to detect unexpected additions, removals, or renames.

```python
import hashlib, json

def compute_corpus_fingerprint(seed_urls: list[str]) -> str:
    """Deterministic hash of the full URL set, order-independent."""
    canonical = sorted(set(seed_urls))
    payload = json.dumps(canonical, separators=(',', ':'))
    return hashlib.sha256(payload.encode()).hexdigest()

# After each run:
fingerprint = compute_corpus_fingerprint([s.url for s in seeds])
manifest = {
    "run_id": run_id,
    "run_date": today_iso,
    "total_documents": len(seeds),
    "corpus_fingerprint": fingerprint,
    "new_since_last_run": [],      # URLs in this run not in prior manifest
    "removed_since_last_run": [],  # URLs in prior manifest not in this run
    "fingerprint_changed": fingerprint != prior_fingerprint
}
```

**What a changed fingerprint tells you:**
- New document(s) added → queue for Silver/Gold processing
- Document(s) removed → either rescinded (cross-check blocklist) or renamed (investigate)
- Same fingerprint → no structural changes, check `date_modified` for content updates

**Store manifest at:** `bronze/osfi/logs/corpus_manifest_{run_date}.json`

---

## Layer 5 — Related-Documents Graph Closure (Link Trap)

Every individual OSFI guidance page has a **"Related documents"** section containing links to companion documents. These links sometimes point to documents that are:
- Only accessible via the related-documents link (not listed directly in the main index)
- Parent or child documents the agent might miss if only scraping the flat index

### Algorithm: Follow-the-links pass

After Phase 1 (index scraping), run a second-pass check:

```python
def related_documents_closure(bronze_docs, known_slugs):
    discovered_new = []

    for doc in bronze_docs:
        for related in doc.related_documents:
            slug = extract_slug(related.url)
            if slug not in known_slugs:
                # New document found via related-documents link
                discovered_new.append({
                    "slug": slug,
                    "url": related.url,
                    "title": related.title,
                    "discovered_via": doc.slug,
                    "discovery_method": "related_documents_link"
                })
                known_slugs.add(slug)

    return discovered_new
```

Scrape all newly discovered URLs, apply the same Bronze parsing logic, and add them to the corpus. Log all link-discovered documents separately for audit.

**Why this matters:** OSFI frequently publishes guidance as a cluster — a Guideline + a transmittal Letter + a Backgrounder + an At-a-Glance, all linked together. The index might sometimes show only the Guideline, with the companion documents appearing only via related-document links on the Guideline page.

---

## Completeness Verification Report Schema

After all 5 layers pass, emit this report to `bronze/osfi/logs/completeness_report_{run_date}.json`:

```json
{
  "run_id": "2026-03-22-001",
  "run_date": "2026-03-22",

  "layer_1_pagination": {
    "pages_scraped": 6,
    "last_page_index": 5,
    "termination_confirmed": true,
    "total_from_index": 277,
    "pass": true
  },

  "layer_2_filter_cross_validation": {
    "total_from_pagination": 277,
    "category_sum": 277,
    "publication_type_sum": 277,
    "reconciliation_pass": true,
    "anomalies": [],
    "pass": true
  },

  "layer_3_critical_checklist": {
    "critical_total": 34,
    "critical_found": 34,
    "critical_missing": [],
    "pass": true
  },

  "layer_4_manifest_hash": {
    "corpus_fingerprint": "a3f9c2...",
    "prior_fingerprint": "a3f9c2...",
    "fingerprint_changed": false,
    "new_documents": [],
    "removed_documents": [],
    "pass": true
  },

  "layer_5_link_closure": {
    "related_docs_scanned": 277,
    "new_docs_discovered": 3,
    "new_docs_added_to_corpus": 3,
    "pass": true
  },

  "final_corpus_count": 280,
  "all_layers_passed": true,
  "approved_for_silver_ingestion": true
}
```

**Gate rule:** `approved_for_silver_ingestion` is `true` only when ALL five layer `pass` values are `true`. Any single failure blocks the pipeline and triggers an alert.

---

## What "All Files Scraped" Actually Means

Given that OSFI publishes no official count, "complete" is defined operationally as:

1. **Pagination is exhausted** — no "Next page" link exists after the last scraped page
2. **Filter counts reconcile** — independent dimension sums match the pagination total
3. **Every known critical document is present** — named checklist passes with zero missing
4. **Run-to-run diff is explained** — every addition/removal is accounted for
5. **Link graph is closed** — no related-document links point outside the corpus

When all five conditions are met simultaneously, the corpus is complete *by definition* for the state of the OSFI site at that moment in time.
