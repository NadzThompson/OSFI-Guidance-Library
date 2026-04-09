"""
One-time fix: align version_id and version_label in OSFI_Guidance JSON files
to match the NOVA standard format used by Basel Framework and US_Fed_Regulations.

- version_id:    ISO date string (YYYY-MM-DD), derived from effective_date_start
- version_label: 4-digit year string, derived from version_id
"""

import json
import sys
from pathlib import Path

JSON_DIR = Path(__file__).parent / "json"


def fix_file(json_path: Path) -> dict:
    """Fix version_id and version_label in a single JSON file.
    Returns a dict describing what changed."""
    meta = json.loads(json_path.read_text(encoding="utf-8"))

    old_vid = meta.get("version_id", "")
    old_vl = meta.get("version_label", "")
    eds = meta.get("effective_date_start", "")

    changes = {}

    # version_id: must be ISO date (YYYY-MM-DD), derived from effective_date_start
    if eds and (not old_vid or len(str(old_vid)) < 8):
        meta["version_id"] = eds
        changes["version_id"] = f"{old_vid!r} -> {eds!r}"
    elif not eds and old_vid and len(str(old_vid)) == 4:
        # version_id is year-only and no effective_date_start — keep as-is but note it
        changes["version_id"] = f"{old_vid!r} (no effective_date_start to derive from)"

    # version_label: must be 4-digit year string
    vid = meta.get("version_id", "")
    vid_str = str(vid)
    year = vid_str[:4] if len(vid_str) >= 4 else ""

    if not year and eds:
        year = eds[:4]

    if year and old_vl != year:
        meta["version_label"] = year
        changes["version_label"] = f"{old_vl!r} -> {year!r}"

    if changes:
        json_path.write_text(json.dumps(meta, indent=2, ensure_ascii=False), encoding="utf-8")

    return changes


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    json_files = sorted(JSON_DIR.glob("*.json"))
    print(f"Processing {len(json_files)} OSFI_Guidance JSON files...\n")

    fixed = 0
    skipped = 0
    for jf in json_files:
        changes = fix_file(jf)
        if changes:
            fixed += 1
            print(f"  FIXED: {jf.name[:60]}")
            for field, desc in changes.items():
                print(f"         {field}: {desc}")
        else:
            skipped += 1

    print(f"\nDone. Fixed: {fixed}, Already correct: {skipped}, Total: {len(json_files)}")


if __name__ == "__main__":
    main()
