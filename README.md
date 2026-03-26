# OSFI Corpus

Regulatory guidance from the Office of the Superintendent of Financial Institutions (OSFI), Canada's federal prudential regulator. This corpus serves as the gold-standard reference for the NOVA metadata pattern.

## Contents

**278 documents** with perfect 1:1 matching across all four formats.

## Folder Structure

```
OSFI_Guidance/
  json/   <- Metadata only (121 fields per document, no content embedded)
  md/     <- Readable text content (authoritative)
  html/   <- Original HTML source from osfi-bsif.gc.ca
  pdf/    <- Rendered PDF
```

Every document has exactly one file in each subfolder: 278 JSON, 278 MD, 278 HTML, 278 PDF.

## File Formats

- **JSON** (metadata only): One file per document. Contains 121 metadata fields covering identification, classification, NOVA pipeline fields, regulatory context, and supersession chains. No content is embedded.
- **MD** (content): The authoritative text content. Use this for ingestion, search indexing, and embedding.
- **HTML** (source): The original HTML as scraped from osfi-bsif.gc.ca.
- **PDF** (rendered): PDF rendering of the content. 45 PDFs were regenerated from HTML sources in March 2026 to fix truncation from the original HTML-to-PDF conversion.

## Key Metadata Fields

| Field | Description | Coverage |
|-------|-------------|----------|
| `doc_id` | Unique identifier (e.g., `osfi.e23.2027.standalone`) | 100% |
| `title` | Full document title | 100% |
| `short_title` | Abbreviated title (e.g., `E-23`) | 100% |
| `status` | Document status (see Status Model below) | 100% |
| `regulator` | `OSFI` | 100% |
| `document_class` | Type: `standalone_guideline`, `chapter_guideline`, `transmittal_letter`, `advisory`, etc. | 100% |
| `nova_tier` | NOVA importance tier (1 = core binding, 5 = administrative) | 100% |
| `jurisdiction` | `Canada` | 100% |
| `guideline_number` | Formal identifier (e.g., `E-23`, `B-20`) | 25% (only formal guidelines have these) |
| `sector` | Applicable sectors (array) | 100% |
| `effective_date_start` | Date the document version became effective | 100% |
| `version_sort_key` | YYYY-MM format for version ordering | 100% |
| `citation_anchor` | Anchor for citation linking | 100% |
| `section_path` | Hierarchical path (regulator > class > guideline) | 100% |
| `superseded_by_doc_id` | Forward link to replacement document | 20 docs |
| `supersedes_doc_id` | Reverse link from replacement back to predecessor | 9 docs |

## Status Model

- **final_current** (244 docs): Published and currently in force.
- **superseded** (20 docs): Replaced by a newer version. All have valid `superseded_by_doc_id` forward links.
- **final_future_effective** (9 docs): Published but not yet in force (future effective date).
- **draft_or_consultation** (5 docs): Draft or consultation documents, not yet finalized.

### Supersession Chains

All 20 superseded documents have bidirectional links:
- **Forward**: `superseded_by_doc_id` points to the replacement document.
- **Reverse**: The replacement document's `supersedes_doc_id` points back to the predecessor. Where a single document replaces multiple predecessors (e.g., LAR 2026 Chapter 1 replacing 8 older chapters), the reverse link is stored as an array.

## Document Classes

| Class | Count | Description |
|-------|-------|-------------|
| transmittal_letter | 80 | Cover letters accompanying guideline updates |
| standalone_guideline | 57 | Self-contained regulatory guidelines |
| package_guideline | 34 | Multi-part guideline packages |
| advisory | 31 | Advisory notices and bulletins |
| chapter_guideline | 28 | Individual chapters of multi-part guidelines |
| implementation_note | 9 | Implementation guidance for specific guidelines |
| Other types | 39 | guidance_note, bulletin, instructions, regulatory_notice, etc. |

## Sources

- OSFI Website: https://www.osfi-bsif.gc.ca
- OSFI Guidelines and Guidance: https://www.osfi-bsif.gc.ca/en/guidance

## Related Documentation

See the `docs/` folder in this repository:

| Document | Description |
|----------|-------------|
| `OSFI_Scraped_Content_Audit_Report.docx` | Detailed audit findings, remediation steps, and final status |
| `osfi_guidance_metadata.json` | Master metadata index with collection-level statistics (status breakdown, field completeness, NOVA tier distribution) |
| `NOVA_Corpus_Guide.docx` | Comprehensive guide covering RAG pipeline, ADLS migration, dual-store architecture, and metadata usage |
| `NOVA_Metadata_Build_Specification.docx` | NOVA pipeline metadata field definitions, roles, and the Three Rules |
| `NOVA_RAG_Pipeline_Implementation_Guide.docx` | Pipeline implementation guidance for Databricks ingestion and retrieval |
