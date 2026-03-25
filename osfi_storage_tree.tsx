import { useState } from "react";

const STATUS_META = {
  FINAL_CURRENT:           { color: "#166534", bg: "#dcfce7", border: "#86efac", label: "FINAL — IN EFFECT" },
  FINAL_FUTURE_EFFECTIVE:  { color: "#1e40af", bg: "#dbeafe", border: "#93c5fd", label: "FINAL — FUTURE" },
  SUPERSEDED:              { color: "#854d0e", bg: "#fef9c3", border: "#fde047", label: "SUPERSEDED" },
  DRAFT_OR_CONSULTATION:   { color: "#991b1b", bg: "#fee2e2", border: "#fca5a5", label: "DRAFT / CONSULT" },
  RESCINDED:               { color: "#4b5563", bg: "#f3f4f6", border: "#d1d5db", label: "RESCINDED" },
};

const EXT_COLORS = {
  html: { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  pdf:  { bg: "#fdf2f8", color: "#9d174d", border: "#fbcfe8" },
  json: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  md:   { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  txt:  { bg: "#fafaf9", color: "#57534e", border: "#d6d3d1" },
  jsonl:{ bg: "#faf5ff", color: "#7e22ce", border: "#e9d5ff" },
};

// File list helpers
const carChapters = [
  "capital-adequacy-requirements-car-guideline-2026",
  "capital-adequacy-requirements-car-2026-chapter-1-overview-risk-based-capital-requirements",
  "capital-adequacy-requirements-car-2026-chapter-2-definition-capital",
  "capital-adequacy-requirements-car-2026-chapter-3-operational-risk",
  "capital-adequacy-requirements-car-2026-chapter-4-credit-risk-standardized-approach",
  "capital-adequacy-requirements-car-2026-chapter-5-credit-risk-internal-ratings-based-approach",
  "capital-adequacy-requirements-car-2026-chapter-6-securitization",
  "capital-adequacy-requirements-car-2026-chapter-7-settlement-counterparty-risk",
  "capital-adequacy-requirements-car-2026-chapter-8-credit-valuation-adjustment-cva-risk",
  "capital-adequacy-requirements-car-2026-chapter-9-market-risk",
  "capital-adequacy-requirements-guideline-2026-letter",
  "small-medium-sized-deposit-taking-institutions-smsbs-capital-liquidity-requirements-guideline-2026",
];
const lar2026 = [
  "liquidity-adequacy-requirements-lar-guideline-2026",
  "liquidity-adequacy-requirements-lar-2026-chapter-1-overview",
  "liquidity-adequacy-requirements-lar-2026-chapter-2-liquidity-coverage-ratio",
  "liquidity-adequacy-requirements-lar-2026-chapter-3-net-stable-funding-ratio",
  "liquidity-adequacy-requirements-lar-2026-chapter-4-net-cumulative-cash-flow",
  "liquidity-adequacy-requirements-lar-2026-chapter-5-operating-cash-flow-statement",
  "liquidity-adequacy-requirements-lar-2026-chapter-6-liquidity-monitoring-tools",
  "liquidity-adequacy-requirements-lar-2026-chapter-7-intraday-liquidity-monitoring-tools",
  "liquidity-adequacy-requirements-guideline-2026-letter",
];
const mct2026 = [
  "minimum-capital-test-guideline-2026",
  "minimum-capital-test-2026-letter",
];
const licat2025 = [
  "life-insurance-capital-adequacy-test-guideline-2025",
  "life-insurance-capital-adequacy-test-2025-chapter-1-overview-general-requirements",
  "life-insurance-capital-adequacy-test-2025-chapter-2-available-capital",
  "life-insurance-capital-adequacy-test-2025-chapter-3-credit-risk-balance-sheet-items",
  "life-insurance-capital-adequacy-test-2025-chapter-4-credit-risk-balance-sheet-activities",
  "life-insurance-capital-adequacy-test-2025-chapter-5-market-risk",
  "life-insurance-capital-adequacy-test-2025-chapter-6-insurance-risk",
  "life-insurance-capital-adequacy-test-2025-chapter-7-segregated-fund-guarantee-risk",
  "life-insurance-capital-adequacy-test-2025-chapter-8-operational-risk",
  "life-insurance-capital-adequacy-test-2025-chapter-9-participating-adjustable-products",
  "life-insurance-capital-adequacy-test-2025-chapter-10-credit-reinsurance",
  "life-insurance-capital-adequacy-test-2025-chapter-11-aggregation-diversification-risks",
  "life-insurance-capital-adequacy-test-2025-chapter-12-life-insurers-operating-canada-branch-basis",
  "life-insurance-capital-adequacy-test-2025-letter",
];
const other2025current = [
  "sound-reinsurance-practices-procedures-guideline-2025",
  "pillar-3-disclosure-guideline-domestic-systemically-important-banks-sibs-2025",
  "pillar-3-disclosure-guideline-small-medium-sized-deposit-taking-institutions-smsbs-2025",
  "mortgage-insurer-capital-adequacy-test-guideline-2025",
  "parental-stand-alone-solo-capital-framework-federally-regulated-life-insurers-2025",
  "regulatory-capital-internal-capital-targets-2025",
];
const e23 = [
  "guideline-e-23-model-risk-management-2027",
  "guideline-e-23-model-risk-management-2027-letter",
];
const car2027draft = [
  "draft-capital-adequacy-requirements-guideline-2027-letter",
];
const lar2025 = [
  "liquidity-adequacy-requirements-lar-guideline-2025",
  "liquidity-adequacy-requirements-lar-2025-chapter-1-overview",
  "liquidity-adequacy-requirements-lar-2025-chapter-2-liquidity-coverage-ratio",
  "liquidity-adequacy-requirements-lar-2025-chapter-3-net-stable-funding-ratio",
  "liquidity-adequacy-requirements-lar-2025-chapter-4-net-cumulative-cash-flow",
  "liquidity-adequacy-requirements-lar-2025-chapter-5-operating-cash-flow-statement",
  "liquidity-adequacy-requirements-lar-2025-chapter-6-liquidity-monitoring-tools",
  "liquidity-adequacy-requirements-lar-2025-chapter-7-intraday-liquidity-monitoring-tools",
  "liquidity-adequacy-requirements-guideline-2025-letter",
];
const mct2024 = ["minimum-capital-test-guideline-2024"];

const MANIFESTS = [
  "current_library_manifest.jsonl",
  "rescinded_manifest.jsonl",
  "draft_manifest.jsonl",
  "detail_manifest.jsonl",
  "asset_manifest.jsonl",
  "corpus_manifest_2026-03-22.json",
];
const LOGS = [
  "completeness_report_2026-03-22.json",
  "classification_report_2026-03-22.json",
  "rule6_guard_report_2026-03-22.json",
  "fetch_errors_2026-03-22.jsonl",
];

// Tree structure
const TREE = [
  {
    layer: "BRONZE", path: "bronze/osfi/", color: "#92400e", bg: "#fffbeb", border: "#fcd34d",
    icon: "🥉",
    desc: "Raw as-fetched files. Append-only. Never modified after write.",
    folders: [
      {
        name: "html/", desc: "Raw HTML pages exactly as fetched",
        subfolders: [
          { status: "FINAL_CURRENT", groups: [
            { label: "CAR 2026 (12 files)", slugs: carChapters, ext: "html" },
            { label: "LAR 2026 (9 files)", slugs: lar2026, ext: "html" },
            { label: "MCT 2026 (2 files)", slugs: mct2026, ext: "html" },
            { label: "LICAT 2025 (14 files)", slugs: licat2025, ext: "html" },
            { label: "Other 2025 current (6 files)", slugs: other2025current, ext: "html" },
          ]},
          { status: "FINAL_FUTURE_EFFECTIVE", groups: [
            { label: "E-23 2027 (2 files)", slugs: e23, ext: "html" },
          ]},
          { status: "SUPERSEDED", groups: [
            { label: "LAR 2025 (9 files)", slugs: lar2025, ext: "html" },
            { label: "MCT 2024 (1 file)", slugs: mct2024, ext: "html" },
          ]},
          { status: "DRAFT_OR_CONSULTATION", groups: [
            { label: "CAR 2027 Draft (1 file)", slugs: car2027draft, ext: "html" },
          ]},
          { status: "RESCINDED", groups: [
            { label: "All rescinded (audit only)", slugs: ["[all rescinded slugs from rescinded_manifest]"], ext: "html" },
          ]},
        ]
      },
      {
        name: "pdf/", desc: "Raw PDFs — binary, no OCR unless image-only",
        subfolders: [
          { status: "FINAL_CURRENT", groups: [
            { label: "CAR 2026 (12 files)", slugs: carChapters, ext: "pdf" },
            { label: "LAR 2026 (9 files)", slugs: lar2026, ext: "pdf" },
            { label: "MCT 2026 (2 files)", slugs: mct2026, ext: "pdf" },
            { label: "LICAT 2025 (14 files)", slugs: licat2025, ext: "pdf" },
            { label: "Other 2025 current (6 files)", slugs: other2025current, ext: "pdf" },
          ]},
          { status: "FINAL_FUTURE_EFFECTIVE", groups: [
            { label: "E-23 2027 (2 files)", slugs: e23, ext: "pdf" },
          ]},
          { status: "SUPERSEDED", groups: [
            { label: "LAR 2025 (9 files)", slugs: lar2025, ext: "pdf" },
            { label: "MCT 2024 (1 file)", slugs: mct2024, ext: "pdf" },
          ]},
          { status: "DRAFT_OR_CONSULTATION", groups: [
            { label: "CAR 2027 Draft (1 file)", slugs: car2027draft, ext: "pdf" },
          ]},
        ]
      },
      {
        name: "http_headers/", desc: "HTTP response headers — one file per slug",
        subfolders: [],
        flatFiles: ["[slug].headers.json — one per document scraped"],
      },
      {
        name: "manifests/", desc: "Control manifests built before any document scraping",
        subfolders: [],
        flatFiles: MANIFESTS,
      },
    ]
  },
  {
    layer: "SILVER", path: "silver/osfi/", color: "#374151", bg: "#f9fafb", border: "#9ca3af",
    icon: "🥈",
    desc: "Cleaned, enriched, normalized. Canonical document model lives here.",
    folders: [
      {
        name: "json/", desc: "Canonical document model — full metadata, relationships, status",
        subfolders: [
          { status: "FINAL_CURRENT", groups: [
            { label: "CAR 2026", slugs: carChapters, ext: "json" },
            { label: "LAR 2026", slugs: lar2026, ext: "json" },
            { label: "MCT 2026", slugs: mct2026, ext: "json" },
            { label: "LICAT 2025", slugs: licat2025, ext: "json" },
            { label: "Other 2025", slugs: other2025current, ext: "json" },
          ]},
          { status: "FINAL_FUTURE_EFFECTIVE", groups: [
            { label: "E-23 2027", slugs: e23, ext: "json" },
          ]},
          { status: "SUPERSEDED", groups: [
            { label: "LAR 2025", slugs: lar2025, ext: "json" },
            { label: "MCT 2024", slugs: mct2024, ext: "json" },
          ]},
          { status: "DRAFT_OR_CONSULTATION", groups: [
            { label: "CAR 2027 Draft", slugs: car2027draft, ext: "json" },
          ]},
          { status: "RESCINDED", groups: [
            { label: "Tombstone records only", slugs: ["[rescinded-slug].json — tombstone only"], ext: "json" },
          ]},
        ]
      },
      {
        name: "md/", desc: "Clean normalized markdown body text — stripped of all nav/footer noise",
        subfolders: [
          { status: "FINAL_CURRENT", groups: [
            { label: "CAR 2026", slugs: carChapters, ext: "md" },
            { label: "LAR 2026", slugs: lar2026, ext: "md" },
            { label: "MCT 2026", slugs: mct2026, ext: "md" },
            { label: "LICAT 2025", slugs: licat2025, ext: "md" },
            { label: "Other 2025", slugs: other2025current, ext: "md" },
          ]},
          { status: "FINAL_FUTURE_EFFECTIVE", groups: [
            { label: "E-23 2027", slugs: e23, ext: "md" },
          ]},
          { status: "SUPERSEDED", groups: [
            { label: "LAR 2025", slugs: lar2025, ext: "md" },
            { label: "MCT 2024", slugs: mct2024, ext: "md" },
          ]},
          { status: "DRAFT_OR_CONSULTATION", groups: [
            { label: "CAR 2027 Draft", slugs: car2027draft, ext: "md" },
          ]},
        ]
      },
      {
        name: "pdf_text/", desc: "PDF-extracted plain text (only where HTML < 200 words)",
        subfolders: [
          { status: "FINAL_CURRENT", groups: [{ label: "Where applicable", slugs: ["[slug].txt — only stub pages"], ext: "txt" }] },
          { status: "FINAL_FUTURE_EFFECTIVE", groups: [{ label: "E-23 2027", slugs: ["guideline-e-23-model-risk-management-2027"], ext: "txt" }] },
          { status: "SUPERSEDED", groups: [{ label: "Where applicable", slugs: ["[slug].txt"], ext: "txt" }] },
        ]
      },
    ]
  },
  {
    layer: "GOLD", path: "gold/osfi/", color: "#713f12", bg: "#fefce8", border: "#fbbf24",
    icon: "🥇",
    desc: "Embed-ready chunks. Primary index (final_current + future + superseded). Sidecar index (draft).",
    folders: [
      {
        name: "chunks/", desc: "One _chunks.jsonl per document — each line = one chunk record",
        subfolders: [
          { status: "FINAL_CURRENT", groups: [
            { label: "CAR 2026", slugs: carChapters.map(s => s + "_chunks"), ext: "jsonl" },
            { label: "LAR 2026", slugs: lar2026.map(s => s + "_chunks"), ext: "jsonl" },
            { label: "MCT 2026", slugs: mct2026.map(s => s + "_chunks"), ext: "jsonl" },
            { label: "LICAT 2025", slugs: licat2025.map(s => s + "_chunks"), ext: "jsonl" },
            { label: "Other 2025", slugs: other2025current.map(s => s + "_chunks"), ext: "jsonl" },
          ], indexNote: "→ Indexed in: osfi_guidance_chunks_v2 (PRIMARY)" },
          { status: "FINAL_FUTURE_EFFECTIVE", groups: [
            { label: "E-23 2027", slugs: e23.map(s => s + "_chunks"), ext: "jsonl" },
          ], indexNote: "→ Indexed in: osfi_guidance_chunks_v2 (PRIMARY) with citation_warning" },
          { status: "SUPERSEDED", groups: [
            { label: "LAR 2025", slugs: lar2025.map(s => s + "_chunks"), ext: "jsonl" },
            { label: "MCT 2024", slugs: mct2024.map(s => s + "_chunks"), ext: "jsonl" },
          ], indexNote: "→ Indexed in: osfi_guidance_chunks_v2 with retrieval_boost: -2" },
          { status: "DRAFT_OR_CONSULTATION", groups: [
            { label: "CAR 2027 Draft", slugs: car2027draft.map(s => s + "_chunks"), ext: "jsonl" },
          ], indexNote: "→ Indexed in: osfi_guidance_contextual_v2 (SIDECAR — never primary)" },
        ]
      },
      {
        name: "logs/", desc: "QA, classification, and run audit reports",
        subfolders: [],
        flatFiles: LOGS,
      },
    ]
  },
];

function FileChip({ name, ext }) {
  const c = EXT_COLORS[ext] || EXT_COLORS.json;
  const short = name.length > 60 ? name.slice(0, 57) + "…" : name;
  return (
    <div title={name} style={{ display: "inline-flex", alignItems: "center", gap: 4, background: c.bg, color: c.color, border: `1px solid ${c.border}`, borderRadius: 4, padding: "2px 6px", fontSize: 10, margin: "2px", fontFamily: "monospace" }}>
      <span style={{ fontWeight: 700, opacity: 0.7 }}>.{ext}</span>
      <span>{short}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const m = STATUS_META[status];
  return <span style={{ background: m.bg, color: m.color, border: `1px solid ${m.border}`, borderRadius: 4, padding: "1px 6px", fontSize: 10, fontWeight: 700 }}>{m.label}</span>;
}

function Subfolder({ sf, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false);
  const totalFiles = sf.groups.reduce((a, g) => a + g.slugs.length, 0);
  return (
    <div style={{ marginLeft: 16, marginBottom: 4 }}>
      <div onClick={() => setOpen(o => !o)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, padding: "3px 0" }}>
        <span style={{ fontSize: 11 }}>{open ? "▾" : "▸"}</span>
        <StatusBadge status={sf.status} />
        <span style={{ fontSize: 11, color: "#64748b" }}>{totalFiles} files</span>
        {sf.indexNote && <span style={{ fontSize: 10, color: "#6d28d9", background: "#ede9fe", borderRadius: 3, padding: "1px 5px" }}>{sf.indexNote}</span>}
      </div>
      {open && (
        <div style={{ marginLeft: 20, marginTop: 4 }}>
          {sf.groups.map((g, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#475569", marginBottom: 3 }}>📂 {g.label}</div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {g.slugs.map((s, j) => <FileChip key={j} name={`${s}.${g.ext}`} ext={g.ext} />)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Folder({ folder, layerColor, depth }) {
  const [open, setOpen] = useState(depth === 0);
  return (
    <div style={{ marginLeft: depth * 12, marginBottom: 6 }}>
      <div onClick={() => setOpen(o => !o)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: "4px 6px", background: "#f8fafc", borderRadius: 5, border: "1px solid #e2e8f0" }}>
        <span>{open ? "📂" : "📁"}</span>
        <span style={{ fontFamily: "monospace", fontWeight: 700, color: layerColor, fontSize: 12 }}>{folder.name}</span>
        <span style={{ fontSize: 11, color: "#94a3b8" }}>{folder.desc}</span>
      </div>
      {open && (
        <div style={{ marginLeft: 12, marginTop: 4 }}>
          {folder.subfolders && folder.subfolders.map((sf, i) => (
            <Subfolder key={i} sf={sf} defaultOpen={false} />
          ))}
          {folder.flatFiles && (
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: 4 }}>
              {folder.flatFiles.map((f, i) => {
                const ext = f.split(".").pop();
                return <FileChip key={i} name={f} ext={ext} />;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [openLayers, setOpenLayers] = useState({ BRONZE: true, SILVER: true, GOLD: true });
  return (
    <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 13, background: "#f8fafc", minHeight: "100vh", padding: 16 }}>
      <div style={{ background: "#1e3a5f", color: "white", borderRadius: 8, padding: "12px 16px", marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>OSFI Corpus Storage Tree — Interactive Explorer</div>
        <div style={{ fontSize: 11, opacity: 0.8 }}>OSFI slugs preserved exactly · Organized by format (html/pdf/json/md) and status · Click to expand</div>
      </div>

      {/* Naming rule */}
      <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 7, padding: "8px 12px", marginBottom: 12, fontSize: 11 }}>
        <strong>File naming rule:</strong> Every file uses OSFI's exact URL slug as the base name.
        Example: <code style={{ background: "#dbeafe", padding: "1px 4px", borderRadius: 3 }}>capital-adequacy-requirements-car-2026-chapter-1-overview-risk-based-capital-requirements.html</code>
      </div>

      {/* Extension legend */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {Object.entries(EXT_COLORS).map(([ext, c]) => (
          <div key={ext} style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}`, borderRadius: 4, padding: "3px 8px", fontSize: 11, fontWeight: 600, fontFamily: "monospace" }}>
            .{ext}
          </div>
        ))}
      </div>

      {TREE.map(layer => (
        <div key={layer.layer} style={{ background: layer.bg, border: `2px solid ${layer.border}`, borderRadius: 10, marginBottom: 14, overflow: "hidden" }}>
          <div
            onClick={() => setOpenLayers(s => ({ ...s, [layer.layer]: !s[layer.layer] }))}
            style={{ padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: layer.bg }}
          >
            <span style={{ fontSize: 20 }}>{layer.icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: layer.color, fontFamily: "monospace" }}>
                {layer.layer} — {layer.path}
              </div>
              <div style={{ fontSize: 11, color: "#64748b" }}>{layer.desc}</div>
            </div>
            <div style={{ marginLeft: "auto", color: "#94a3b8" }}>{openLayers[layer.layer] ? "▲" : "▼"}</div>
          </div>
          {openLayers[layer.layer] && (
            <div style={{ padding: "8px 14px 12px" }}>
              {layer.folders.map((folder, i) => (
                <Folder key={i} folder={folder} layerColor={layer.color} depth={0} />
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Transition rules summary */}
      <div style={{ background: "white", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "12px 14px" }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: "#1e3a5f" }}>Status Folder Transition Rules</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead><tr style={{ background: "#f1f5f9" }}>
            {["From Folder", "To Folder", "Trigger", "Re-embed?"].map(h => (
              <th key={h} style={{ padding: "6px 8px", textAlign: "left", fontWeight: 600, color: "#475569", borderBottom: "2px solid #e2e8f0" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {[
              { from: "final_future_effective/", to: "final_current/", trigger: "effective_date ≤ today on new run", reembed: "No — update status field only" },
              { from: "final_current/", to: "superseded/", trigger: "New version of same family published", reembed: "No — lower retrieval_boost in ES" },
              { from: "draft_or_consultation/", to: "final_current/", trigger: "OSFI publishes final (new slug, no 'draft-' prefix)", reembed: "Yes — new slug, new files" },
              { from: "final_current/", to: "rescinded/", trigger: "Slug appears in rescinded manifest", reembed: "No — delete from ES, write tombstone" },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "6px 8px", fontFamily: "monospace", color: "#7c3aed", fontSize: 10 }}>{r.from}</td>
                <td style={{ padding: "6px 8px", fontFamily: "monospace", color: "#166534", fontSize: 10 }}>{r.to}</td>
                <td style={{ padding: "6px 8px", color: "#334155" }}>{r.trigger}</td>
                <td style={{ padding: "6px 8px", color: r.reembed.startsWith("No") ? "#166534" : "#92400e", fontWeight: 600 }}>{r.reembed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
