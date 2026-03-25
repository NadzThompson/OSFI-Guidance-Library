"""
Scrape OSFI (Office of the Superintendent of Financial Institutions) guidance library.

Fetches all active (non-rescinded) guidance documents from:
  https://www.osfi-bsif.gc.ca/en/guidance/guidance-library

Produces RAG-optimized output in four formats (html, json, md, pdf),
each in its own subfolder. Only pure guidance content is retained.
"""

import json
import os
import re
import sys
import time
import html as html_mod
from datetime import date
from pathlib import Path
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup
from fpdf import FPDF

# ── Configuration ────────────────────────────────────────────────────────────

BASE_URL = "https://www.osfi-bsif.gc.ca"
LISTING_URL = BASE_URL + "/en/guidance/guidance-library"
BASE_DIR = Path(__file__).parent
OUTPUT_DIRS = {
    "html": BASE_DIR / "html",
    "json": BASE_DIR / "json",
    "md":   BASE_DIR / "md",
    "pdf":  BASE_DIR / "pdf",
}
METADATA_FILE = BASE_DIR / "osfi_guidance_metadata.json"

REQUEST_DELAY = 1.5  # seconds between requests
ITEMS_PER_PAGE = 50
SESSION = requests.Session()
SESSION.headers.update({
    "User-Agent": "Mozilla/5.0 (OSFI-Guidance-Scraper/1.0; Academic Research)",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-CA,en;q=0.9",
})


# ══════════════════════════════════════════════════════════════════════════════
# Step 1: Scrape the listing pages to get all document URLs + listing metadata
# ══════════════════════════════════════════════════════════════════════════════

def scrape_listing_page(page_num: int) -> list[dict]:
    """Scrape one page of the guidance library listing.

    The page uses a 5-column table: Date | Title | Sector | Publication type | Category.
    """
    url = LISTING_URL if page_num == 0 else f"{LISTING_URL}?page={page_num}"
    print(f"  Fetching listing page {page_num} ... ", end="", flush=True)
    resp = SESSION.get(url, timeout=60)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    items = []

    # Find the results table
    table = soup.find("table", class_=re.compile(r"sticky-enabled|table"))
    if not table:
        print("0 items (no table found)")
        return items

    tbody = table.find("tbody")
    if not tbody:
        print("0 items (no tbody)")
        return items

    for tr in tbody.find_all("tr"):
        tds = tr.find_all("td")
        if len(tds) < 5:
            continue

        doc_date = tds[0].get_text(strip=True)
        title_td = tds[1]
        sector = tds[2].get_text(separator=", ", strip=True)
        pub_type = tds[3].get_text(strip=True)
        category = tds[4].get_text(strip=True)

        link = title_td.find("a", href=True)
        if not link:
            continue

        href = link.get("href", "")
        title = link.get_text(strip=True)

        # Skip non-document links
        skip_paths = (
            "/en/guidance/guidance-library",
            "/en/guidance/guidance-library/rescinded-guidance",
            "/en/guidance/guidance-library/osfi-guidance-aligns-our-mandate",
        )
        if href.rstrip("/") in skip_paths:
            continue
        if not title or len(title) < 5:
            continue

        full_url = urljoin(BASE_URL, href)

        items.append({
            "title": title,
            "url": full_url,
            "path": href,
            "date_listing": doc_date,
            "pub_type_listing": pub_type,
            "category_listing": category,
            "sector_listing": sector,
        })

    print(f"{len(items)} items found")
    return items


def scrape_all_listings() -> list[dict]:
    """Scrape all pages of the guidance library."""
    all_items = []
    seen_urls = set()

    for page_num in range(0, 10):  # Up to 10 pages (safety limit)
        items = scrape_listing_page(page_num)
        if not items:
            break

        new_count = 0
        for item in items:
            if item["url"] not in seen_urls:
                seen_urls.add(item["url"])
                all_items.append(item)
                new_count += 1

        if new_count == 0:
            break  # No new items on this page

        time.sleep(REQUEST_DELAY)

    return all_items


# ══════════════════════════════════════════════════════════════════════════════
# Step 2: Scrape individual guidance detail pages
# ══════════════════════════════════════════════════════════════════════════════

def extract_text(el) -> str:
    """Clean text from a BS element."""
    if el is None:
        return ""
    txt = el.get_text(separator=" ", strip=True)
    return re.sub(r'\s+', ' ', txt).strip()


def scrape_detail_page(url: str) -> dict:
    """Scrape a single guidance document detail page."""
    resp = SESSION.get(url, timeout=90)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    # ── Extract metadata ─────────────────────────────────────────────────
    title_el = soup.find("h1")
    title = extract_text(title_el) if title_el else ""

    # Metadata fields - OSFI puts these in definition lists or field divs
    metadata = {
        "title": title,
        "url": url,
        "publication_type": "",
        "category": "",
        "date": "",
        "sector": "",
        "document_number": "",
    }

    # Look for metadata in field items (Drupal pattern)
    for field_div in soup.find_all("div", class_=re.compile(r"field--name")):
        label_el = field_div.find(class_=re.compile(r"field--label|field__label"))
        value_el = field_div.find(class_=re.compile(r"field--item|field__item"))
        if not label_el:
            continue
        label = extract_text(label_el).lower().rstrip(":")
        value = extract_text(value_el) if value_el else extract_text(field_div).replace(extract_text(label_el), "").strip()

        if "publication type" in label or "type" == label:
            metadata["publication_type"] = value
        elif "category" in label:
            metadata["category"] = value
        elif "date" in label:
            metadata["date"] = value
        elif "sector" in label:
            metadata["sector"] = value
        elif label in ("no", "number", "no."):
            metadata["document_number"] = value

    # Fallback: look for dl/dt/dd pairs
    for dl in soup.find_all("dl"):
        dts = dl.find_all("dt")
        dds = dl.find_all("dd")
        for dt, dd in zip(dts, dds):
            label = extract_text(dt).lower().rstrip(":")
            value = extract_text(dd)
            if "type" in label and not metadata["publication_type"]:
                metadata["publication_type"] = value
            elif "category" in label and not metadata["category"]:
                metadata["category"] = value
            elif "date" in label and not metadata["date"]:
                metadata["date"] = value
            elif "sector" in label and not metadata["sector"]:
                metadata["sector"] = value
            elif ("no" == label or "number" in label) and not metadata["document_number"]:
                metadata["document_number"] = value

    # Also check meta tags
    for meta_tag in soup.find_all("meta"):
        name = (meta_tag.get("name") or meta_tag.get("property") or "").lower()
        content = meta_tag.get("content", "")
        if "date" in name and content and not metadata["date"]:
            metadata["date"] = content

    # ── Extract main content ─────────────────────────────────────────────
    # Remove noise elements
    for tag in soup.find_all(["nav", "header", "footer", "script", "style", "noscript"]):
        tag.decompose()
    for tag in soup.find_all(class_=re.compile(
        r"breadcrumb|menu|nav|sidebar|footer|header|banner|search|cookie|skip|toolbar|contextual"
    )):
        tag.decompose()
    for tag in soup.find_all(id=re.compile(
        r"breadcrumb|menu|nav|sidebar|footer|header|banner|search|toolbar"
    )):
        tag.decompose()

    # Find the main content area
    main_content = (
        soup.find("article") or
        soup.find("div", class_=re.compile(r"node__content|field--name-body")) or
        soup.find("main") or
        soup.find("div", id="main-content") or
        soup.body
    )

    # Extract structured sections
    sections = []
    current_section = {"heading": "", "content": []}

    if main_content:
        for el in main_content.find_all(
            ["h1", "h2", "h3", "h4", "h5", "p", "li", "table", "ol", "ul",
             "blockquote", "figure", "img", "figcaption", "aside", "div"],
            recursive=True,
        ):
            tag_name = el.name

            # Skip deeply nested duplicates: only process if we haven't already
            # processed a parent that would contain this element
            if tag_name == "div":
                # Only process divs that are footnote containers
                classes = " ".join(el.get("class", []))
                if "footnote" not in classes and "note" not in classes:
                    continue

            if tag_name in ("h1", "h2", "h3", "h4", "h5"):
                if current_section["content"]:
                    sections.append(current_section)
                heading_text = extract_text(el)
                if heading_text == title and tag_name == "h1":
                    current_section = {"heading": "", "content": []}
                    continue
                current_section = {
                    "heading": heading_text,
                    "heading_level": int(tag_name[1]),
                    "content": [],
                }
            elif tag_name == "table":
                rows = []
                for tr in el.find_all("tr"):
                    cells = [extract_text(td) for td in tr.find_all(["td", "th"])]
                    if any(c for c in cells):  # skip empty rows
                        rows.append(cells)
                if rows:
                    # Try to extract a caption
                    caption_el = el.find("caption")
                    caption = extract_text(caption_el) if caption_el else ""
                    current_section["content"].append({
                        "type": "table",
                        "caption": caption,
                        "rows": rows,
                    })
            elif tag_name in ("figure", "figcaption"):
                # Handle figures with images or tables
                img = el.find("img")
                if img:
                    src = img.get("src", "")
                    alt = img.get("alt", "")
                    if src:
                        full_src = urljoin(BASE_URL, src)
                        figcap = el.find("figcaption")
                        caption = extract_text(figcap) if figcap else alt
                        current_section["content"].append({
                            "type": "image",
                            "src": full_src,
                            "alt": alt,
                            "caption": caption,
                        })
            elif tag_name == "img":
                if el.parent and el.parent.name == "figure":
                    continue  # already handled by figure
                src = el.get("src", "")
                alt = el.get("alt", "")
                if src and not src.endswith((".svg", ".gif", ".ico")):
                    full_src = urljoin(BASE_URL, src)
                    current_section["content"].append({
                        "type": "image",
                        "src": full_src,
                        "alt": alt,
                        "caption": alt,
                    })
            elif tag_name == "aside" or (tag_name == "div" and "footnote" in " ".join(el.get("class", []))):
                # Footnotes / asides with regulatory notes
                text = extract_text(el)
                if text and len(text) > 5:
                    current_section["content"].append({"type": "footnote", "text": text})
            elif tag_name in ("ol", "ul"):
                items = [extract_text(li) for li in el.find_all("li", recursive=False)]
                if items:
                    current_section["content"].append({
                        "type": "list",
                        "ordered": tag_name == "ol",
                        "items": items,
                    })
            elif tag_name == "li":
                if el.parent and el.parent.name in ("ol", "ul"):
                    continue
                text = extract_text(el)
                if text:
                    current_section["content"].append({"type": "paragraph", "text": text})
            elif tag_name == "blockquote":
                text = extract_text(el)
                if text:
                    current_section["content"].append({"type": "paragraph", "text": text})
            else:
                text = extract_text(el)
                if text and len(text) > 2:
                    if any(text.startswith(skip) for skip in [
                        "Publication type", "Category", "Date", "Sector", "No.",
                        "Type de publication", "Catégorie", "Secteur"
                    ]):
                        continue
                    current_section["content"].append({"type": "paragraph", "text": text})

        # Capture any footnotes that are in a separate section at the bottom
        footnote_sections = main_content.find_all(
            class_=re.compile(r"footnote|endnote|note-section")
        )
        for fn_sec in footnote_sections:
            for fn in fn_sec.find_all(["p", "li", "div"]):
                text = extract_text(fn)
                if text and len(text) > 3:
                    current_section["content"].append({"type": "footnote", "text": text})

        if current_section["content"]:
            sections.append(current_section)

    return {
        "metadata": metadata,
        "sections": sections,
    }


# ══════════════════════════════════════════════════════════════════════════════
# Step 3: Output generators
# ══════════════════════════════════════════════════════════════════════════════

def safe_filename(title: str, max_len: int = 120) -> str:
    """Create filesystem-safe filename from title."""
    name = re.sub(r'[<>:"/\\|?*]', '', title)
    name = re.sub(r'[\s]+', '_', name)
    name = re.sub(r'[^\w\s\-_.]', '', name)
    name = name.strip('_. ')
    if len(name) > max_len:
        name = name[:max_len].rstrip('_')
    return name


def section_to_text(section: dict) -> str:
    """Convert a section dict to plain text."""
    lines = []
    for item in section.get("content", []):
        if item["type"] == "paragraph":
            lines.append(item["text"])
        elif item["type"] == "footnote":
            lines.append(f"[Note: {item['text']}]")
        elif item["type"] == "list":
            for i, li in enumerate(item["items"], 1):
                prefix = f"{i}." if item["ordered"] else "-"
                lines.append(f"  {prefix} {li}")
        elif item["type"] == "table":
            if item.get("caption"):
                lines.append(f"Table: {item['caption']}")
            for row in item["rows"]:
                lines.append(" | ".join(row))
        elif item["type"] == "image":
            alt = item.get("alt", "")
            caption = item.get("caption", "")
            lines.append(f"[Image: {caption or alt}] ({item.get('src', '')})")
    return "\n".join(lines)


def make_clean_html(data: dict, fname: str) -> str:
    """Generate clean HTML."""
    meta = data["metadata"]
    lines = [
        '<!DOCTYPE html>',
        '<html lang="en">',
        '<head>',
        '  <meta charset="UTF-8">',
        f'  <meta name="osfi-document-number" content="{html_mod.escape(meta.get("document_number", ""))}">',
        f'  <meta name="publication-type" content="{html_mod.escape(meta.get("publication_type", ""))}">',
        f'  <meta name="category" content="{html_mod.escape(meta.get("category", ""))}">',
        f'  <meta name="sector" content="{html_mod.escape(meta.get("sector", ""))}">',
        f'  <meta name="date" content="{html_mod.escape(meta.get("date", ""))}">',
        f'  <title>{html_mod.escape(meta["title"])}</title>',
        '  <style>',
        '    body { font-family: "Segoe UI", Arial, sans-serif; max-width: 900px; margin: 2em auto; line-height: 1.6; color: #1a1a1a; }',
        '    h1 { font-size: 1.4em; border-bottom: 2px solid #1a3a5c; padding-bottom: 0.3em; color: #1a3a5c; }',
        '    h2 { font-size: 1.2em; margin-top: 1.5em; color: #1a3a5c; }',
        '    h3 { font-size: 1.1em; margin-top: 1.2em; }',
        '    .meta { font-size: 0.9em; color: #555; margin: 0.5em 0; }',
        '    .section { margin: 1.5em 0; }',
        '    table { border-collapse: collapse; width: 100%; margin: 1em 0; }',
        '    th, td { border: 1px solid #ccc; padding: 0.5em; text-align: left; }',
        '    th { background: #f0f0f0; }',
        '  </style>',
        '</head>',
        '<body>',
        f'  <h1>{html_mod.escape(meta["title"])}</h1>',
    ]

    # Metadata block
    meta_parts = []
    if meta.get("publication_type"):
        meta_parts.append(f"<strong>Type:</strong> {html_mod.escape(meta['publication_type'])}")
    if meta.get("document_number"):
        meta_parts.append(f"<strong>No:</strong> {html_mod.escape(meta['document_number'])}")
    if meta.get("category"):
        meta_parts.append(f"<strong>Category:</strong> {html_mod.escape(meta['category'])}")
    if meta.get("date"):
        meta_parts.append(f"<strong>Date:</strong> {html_mod.escape(meta['date'])}")
    if meta.get("sector"):
        meta_parts.append(f"<strong>Sector:</strong> {html_mod.escape(meta['sector'])}")
    if meta_parts:
        lines.append(f'  <p class="meta">{" | ".join(meta_parts)}</p>')

    for sec in data["sections"]:
        level = sec.get("heading_level", 2)
        if sec.get("heading"):
            lines.append(f'  <h{level}>{html_mod.escape(sec["heading"])}</h{level}>')
        for item in sec.get("content", []):
            if item["type"] == "paragraph":
                lines.append(f'  <p>{html_mod.escape(item["text"])}</p>')
            elif item["type"] == "list":
                tag = "ol" if item["ordered"] else "ul"
                lines.append(f'  <{tag}>')
                for li in item["items"]:
                    lines.append(f'    <li>{html_mod.escape(li)}</li>')
                lines.append(f'  </{tag}>')
            elif item["type"] == "table":
                if item.get("caption"):
                    lines.append(f'  <p><strong>{html_mod.escape(item["caption"])}</strong></p>')
                lines.append('  <table>')
                for i, row in enumerate(item["rows"]):
                    cell_tag = "th" if i == 0 else "td"
                    lines.append('    <tr>' + ''.join(f'<{cell_tag}>{html_mod.escape(c)}</{cell_tag}>' for c in row) + '</tr>')
                lines.append('  </table>')
            elif item["type"] == "footnote":
                lines.append(f'  <aside class="footnote"><em>{html_mod.escape(item["text"])}</em></aside>')
            elif item["type"] == "image":
                alt = html_mod.escape(item.get("alt", ""))
                src = html_mod.escape(item.get("src", ""))
                caption = html_mod.escape(item.get("caption", ""))
                lines.append(f'  <figure><img src="{src}" alt="{alt}"><figcaption>{caption}</figcaption></figure>')

    lines.append('</body>')
    lines.append('</html>')
    return "\n".join(lines)


def make_json(data: dict, listing_info: dict) -> dict:
    """Generate RAG-optimized JSON."""
    meta = data["metadata"]
    return {
        "metadata": {
            "title": meta["title"],
            "document_number": meta.get("document_number", ""),
            "publication_type": meta.get("publication_type", "") or listing_info.get("pub_type_listing", ""),
            "category": meta.get("category", "") or listing_info.get("category_listing", ""),
            "date": meta.get("date", ""),
            "sector": meta.get("sector", ""),
            "source_url": meta["url"],
            "issuing_body": "Office of the Superintendent of Financial Institutions (OSFI)",
            "jurisdiction": "Canada",
            "document_type": "regulatory_guidance",
            "scraped_on": str(date.today()),
        },
        "sections": [
            {
                "heading": sec.get("heading", ""),
                "heading_level": sec.get("heading_level", 2),
                "full_text": section_to_text(sec),
                "content": sec["content"],
            }
            for sec in data["sections"]
        ],
    }


def make_markdown(data: dict) -> str:
    """Generate clean Markdown."""
    meta = data["metadata"]
    lines = [f"# {meta['title']}", ""]

    meta_parts = []
    if meta.get("publication_type"):
        meta_parts.append(f"**Type:** {meta['publication_type']}")
    if meta.get("document_number"):
        meta_parts.append(f"**No:** {meta['document_number']}")
    if meta.get("category"):
        meta_parts.append(f"**Category:** {meta['category']}")
    if meta.get("date"):
        meta_parts.append(f"**Date:** {meta['date']}")
    if meta.get("sector"):
        meta_parts.append(f"**Sector:** {meta['sector']}")
    if meta_parts:
        lines.append(" | ".join(meta_parts))
        lines.extend(["", "---", ""])

    for sec in data["sections"]:
        if sec.get("heading"):
            level = sec.get("heading_level", 2)
            lines.append(f"{'#' * level} {sec['heading']}")
            lines.append("")
        for item in sec.get("content", []):
            if item["type"] == "paragraph":
                lines.append(item["text"])
                lines.append("")
            elif item["type"] == "list":
                for i, li in enumerate(item["items"], 1):
                    prefix = f"{i}." if item["ordered"] else "-"
                    lines.append(f"{prefix} {li}")
                lines.append("")
            elif item["type"] == "table":
                if item.get("caption"):
                    lines.append(f"**{item['caption']}**")
                    lines.append("")
                if item["rows"]:
                    header = item["rows"][0]
                    lines.append("| " + " | ".join(header) + " |")
                    lines.append("| " + " | ".join(["---"] * len(header)) + " |")
                    for row in item["rows"][1:]:
                        padded = row + [""] * (len(header) - len(row))
                        lines.append("| " + " | ".join(padded[:len(header)]) + " |")
                    lines.append("")
            elif item["type"] == "footnote":
                lines.append(f"> *{item['text']}*")
                lines.append("")
            elif item["type"] == "image":
                alt = item.get("alt", "")
                src = item.get("src", "")
                caption = item.get("caption", "")
                lines.append(f"![{caption or alt}]({src})")
                lines.append("")

    return "\n".join(lines)


def sanitize_for_pdf(text: str) -> str:
    """Replace Unicode chars that latin-1 can't encode."""
    replacements = {
        '\u2013': '-',   # en-dash
        '\u2014': '--',  # em-dash
        '\u2018': "'",   # left single quote
        '\u2019': "'",   # right single quote
        '\u201c': '"',   # left double quote
        '\u201d': '"',   # right double quote
        '\u2022': '-',   # bullet
        '\u2026': '...', # ellipsis
        '\u00a0': ' ',   # non-breaking space
        '\u200b': '',    # zero-width space
        '\u00b2': '2',   # superscript 2
        '\u00b3': '3',   # superscript 3
        '\u2265': '>=',  # >=
        '\u2264': '<=',  # <=
        '\u00bd': '1/2', # fraction half
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text.encode("latin-1", errors="replace").decode("latin-1")


def pdf_safe_write(pdf, w, h, text):
    """Write text to PDF, handling any encoding/layout errors gracefully."""
    try:
        pdf.multi_cell(w, h, sanitize_for_pdf(text))
    except Exception:
        # Strip all non-ASCII as last resort
        fallback = text.encode("ascii", errors="replace").decode("ascii")
        try:
            pdf.multi_cell(w, h, fallback)
        except Exception:
            pass  # skip this line entirely


def make_pdf(data: dict, output_path: Path):
    """Generate PDF."""
    meta = data["metadata"]
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.add_page()

    # Title
    pdf.set_font("Helvetica", "B", 13)
    pdf_safe_write(pdf, 0, 6, meta["title"])
    pdf.ln(3)

    # Metadata
    pdf.set_font("Helvetica", "I", 9)
    meta_line = []
    if meta.get("publication_type"):
        meta_line.append(f"Type: {meta['publication_type']}")
    if meta.get("document_number"):
        meta_line.append(f"No: {meta['document_number']}")
    if meta.get("category"):
        meta_line.append(f"Category: {meta['category']}")
    if meta.get("date"):
        meta_line.append(f"Date: {meta['date']}")
    if meta_line:
        pdf_safe_write(pdf, 0, 4.5, " | ".join(meta_line))
    if meta.get("sector"):
        pdf_safe_write(pdf, 0, 4.5, f"Sector: {meta['sector']}")
    pdf.ln(3)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(5)

    for sec in data["sections"]:
        if sec.get("heading"):
            level = sec.get("heading_level", 2)
            size = max(10, 14 - level)
            pdf.set_font("Helvetica", "B", size)
            pdf_safe_write(pdf, 0, 5, sec["heading"])
            pdf.ln(2)

        pdf.set_font("Helvetica", "", 9)
        for item in sec.get("content", []):
            if item["type"] == "paragraph":
                pdf_safe_write(pdf, 0, 4.5, item["text"])
                pdf.ln(1.5)
            elif item["type"] == "footnote":
                pdf.set_font("Helvetica", "I", 8)
                pdf_safe_write(pdf, 0, 4, item["text"])
                pdf.set_font("Helvetica", "", 9)
                pdf.ln(1)
            elif item["type"] == "list":
                for i, li in enumerate(item["items"], 1):
                    prefix = f"{i}." if item["ordered"] else "-"
                    pdf_safe_write(pdf, 0, 4.5, f"  {prefix} {li}")
                    pdf.ln(0.5)
                pdf.ln(1)
            elif item["type"] == "table":
                pdf.set_font("Helvetica", "", 8)
                for row in item["rows"]:
                    pdf_safe_write(pdf, 0, 4, " | ".join(row))
                pdf.set_font("Helvetica", "", 9)
                pdf.ln(2)
            elif item["type"] == "image":
                pdf.set_font("Helvetica", "I", 8)
                alt = item.get("alt", "")
                src = item.get("src", "")
                pdf_safe_write(pdf, 0, 4, f"[Image: {alt}] ({src})")
                pdf.set_font("Helvetica", "", 9)
                pdf.ln(1)

        pdf.ln(2)

    pdf.output(str(output_path))


# ══════════════════════════════════════════════════════════════════════════════
# Main
# ══════════════════════════════════════════════════════════════════════════════

def process_document(listing_info: dict, idx: int, total: int) -> dict:
    """Fetch, parse, and export one guidance document."""
    url = listing_info["url"]
    title = listing_info["title"]
    fname = safe_filename(title)

    print(f"\n[{idx:3d}/{total}] {title[:80]}...")
    sys.stdout.flush()

    try:
        data = scrape_detail_page(url)
    except Exception as e:
        print(f"         FAILED to fetch: {e}")
        return {
            "title": title,
            "url": url,
            "status": "failed",
            "error": str(e),
        }

    # Supplement metadata from listing if detail page didn't have it
    meta = data["metadata"]
    if not meta.get("publication_type"):
        meta["publication_type"] = listing_info.get("pub_type_listing", "")
    if not meta.get("category"):
        meta["category"] = listing_info.get("category_listing", "")
    if not meta.get("sector"):
        meta["sector"] = listing_info.get("sector_listing", "")
    if not meta.get("date"):
        meta["date"] = listing_info.get("date_listing", "")

    # Use the detail page title if available (more accurate), else listing title
    actual_title = meta["title"] if meta["title"] else title
    fname = safe_filename(actual_title)

    section_count = len(data["sections"])
    content_items = sum(len(s.get("content", [])) for s in data["sections"])

    if section_count == 0 or content_items < 2:
        print(f"         WARNING: Very little content extracted ({section_count} sections, {content_items} items)")

    # ── Generate outputs ──────────────────────────────────────────────────

    # 1. Clean HTML
    clean_html = make_clean_html(data, fname)
    html_path = OUTPUT_DIRS["html"] / f"{fname}.html"
    html_path.write_text(clean_html, encoding="utf-8")

    # 2. JSON
    json_data = make_json(data, listing_info)
    json_path = OUTPUT_DIRS["json"] / f"{fname}.json"
    json_path.write_text(json.dumps(json_data, indent=2, ensure_ascii=False), encoding="utf-8")

    # 3. Markdown
    md_text = make_markdown(data)
    md_path = OUTPUT_DIRS["md"] / f"{fname}.md"
    md_path.write_text(md_text, encoding="utf-8")

    # 4. PDF
    pdf_path = OUTPUT_DIRS["pdf"] / f"{fname}.pdf"
    try:
        make_pdf(data, pdf_path)
    except Exception as e:
        print(f"         WARNING: PDF failed: {e}")
        pdf_path = None

    print(f"         {section_count} sections, {content_items} content items")

    return {
        "title": meta["title"] or title,
        "url": url,
        "document_number": meta.get("document_number", ""),
        "publication_type": meta.get("publication_type", ""),
        "category": meta.get("category", ""),
        "date": meta.get("date", ""),
        "sector": meta.get("sector", ""),
        "section_count": section_count,
        "content_items": content_items,
        "files": {
            "html": str(html_path.relative_to(BASE_DIR)),
            "json": str(json_path.relative_to(BASE_DIR)),
            "md": str(md_path.relative_to(BASE_DIR)),
            "pdf": str(pdf_path.relative_to(BASE_DIR)) if pdf_path else None,
        },
        "status": "success",
    }


def main():
    for d in OUTPUT_DIRS.values():
        d.mkdir(parents=True, exist_ok=True)

    print("=" * 70)
    print("  OSFI Guidance Library Scraper")
    print("  Output formats: HTML | JSON | Markdown | PDF")
    print("=" * 70)

    # Step 1: Get all document listings
    print("\nStep 1: Scraping guidance library listings...")
    all_docs = scrape_all_listings()
    print(f"\n  Total documents found: {len(all_docs)}")

    if not all_docs:
        print("ERROR: No documents found. Exiting.")
        sys.exit(1)

    # Step 2: Scrape each document
    print(f"\nStep 2: Scraping {len(all_docs)} guidance documents...")

    master_metadata = {
        "source": "OSFI Guidance Library",
        "source_url": LISTING_URL,
        "issuing_body": "Office of the Superintendent of Financial Institutions (OSFI)",
        "jurisdiction": "Canada",
        "scraped_on": str(date.today()),
        "total_documents": len(all_docs),
        "excludes_rescinded": True,
        "output_formats": ["html", "json", "md", "pdf"],
        "documents": [],
    }

    success = 0
    failed = 0

    for idx, doc_info in enumerate(all_docs, 1):
        result = process_document(doc_info, idx, len(all_docs))
        master_metadata["documents"].append(result)

        if result.get("status") == "success":
            success += 1
        else:
            failed += 1

        # Rate limiting
        if idx < len(all_docs):
            time.sleep(REQUEST_DELAY)

        # Save metadata periodically (every 25 docs)
        if idx % 25 == 0:
            with open(METADATA_FILE, "w", encoding="utf-8") as f:
                json.dump(master_metadata, f, indent=2, ensure_ascii=False)

    # Final metadata save
    master_metadata["successful"] = success
    master_metadata["failed"] = failed
    with open(METADATA_FILE, "w", encoding="utf-8") as f:
        json.dump(master_metadata, f, indent=2, ensure_ascii=False)

    # Summary
    print("\n" + "=" * 70)
    print(f"  COMPLETE: {success}/{len(all_docs)} documents scraped")
    print(f"  Failed: {failed}")
    print(f"  Output:")
    for fmt, d in OUTPUT_DIRS.items():
        count = len(list(d.glob("*")))
        print(f"    {fmt:4s} -> {d}  ({count} files)")
    print(f"  Metadata -> {METADATA_FILE}")
    print("=" * 70)


if __name__ == "__main__":
    main()
