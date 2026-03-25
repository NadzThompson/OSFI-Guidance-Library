import { useState } from "react";

const TODAY = "March 23, 2026";

const DOCS = [
  // ── CAR 2026 FAMILY ─────────────────────────────────────────────────────
  {
    family: "CAR 2026",
    title: "Capital Adequacy Requirements (CAR) – Guideline (2026)",
    titleYear: "2026",
    published: "Sep 11, 2025",
    effectiveDateText: "November 2025 / January 2026",
    effectiveDateNote: "Nov 2025 for Oct 31 FYE banks (RBC, TD, BMO, BNS, CIBC, NBC); Jan 2026 for Dec 31 FYE",
    effectiveDatePast: true,
    status: "FINAL_CURRENT",
    tier: 1,
    novaAction: "Ingest into primary corpus. Tag split effective date. RBC effective Nov 2025.",
    warningFlag: "⚠️ Contains CAR 2027 draft banner — Rule 6 guard must fire",
    banner: "Consultation status: Closed (CAR 2027 draft, closed Feb 18, 2026)"
  },
  {
    family: "CAR 2026",
    title: "CAR (2026) – Chapters 1–9 (all 9 chapters)",
    titleYear: "2026",
    published: "Sep 11, 2025",
    effectiveDateText: "November 2025 / January 2026",
    effectiveDateNote: "Same split as parent. Each chapter page carries the consultation banner for the 2027 draft.",
    effectiveDatePast: true,
    status: "FINAL_CURRENT",
    tier: 1,
    novaAction: "Ingest all 9 chapters into primary corpus. Each chapter carries its own Rule 6 banner risk.",
    warningFlag: "⚠️ Each chapter has a 2027 draft consultation banner — Rule 6 must apply per chapter",
    banner: "Each chapter: 'Consultation for chapter N of the 2027 CAR Guideline closed on February 18, 2026'"
  },
  {
    family: "CAR 2027 (DRAFT)",
    title: "Draft Capital Adequacy Requirements Guideline (2027) – Letter",
    titleYear: "2027",
    published: "Nov 20, 2025",
    effectiveDateText: "Not yet set (draft)",
    effectiveDateNote: "Consultation closed Feb 18, 2026. Final not yet published as of Mar 23, 2026.",
    effectiveDatePast: false,
    status: "DRAFT_OR_CONSULTATION",
    tier: 3,
    novaAction: "Contextual store only. NOT in primary index. Monitor for finalization.",
    warningFlag: "🚫 Draft — exclude from primary corpus",
    banner: "Consultation closed Feb 18, 2026. Final expected but not yet published."
  },
  // ── LAR 2026 FAMILY ─────────────────────────────────────────────────────
  {
    family: "LAR 2026",
    title: "Liquidity Adequacy Requirements (LAR) – Guideline (2026)",
    titleYear: "2026",
    published: "Jan 29, 2026",
    effectiveDateText: "January 1, 2026",
    effectiveDateNote: "Single effective date — no fiscal year split. Published Jan 29, 2026; effective Jan 1, 2026 (retroactive from publication).",
    effectiveDatePast: true,
    status: "FINAL_CURRENT",
    tier: 1,
    novaAction: "Ingest into primary corpus. Current operative LAR.",
    warningFlag: null,
    banner: null
  },
  {
    family: "LAR 2026",
    title: "LAR (2026) – Chapters 1–7 (all 7 chapters)",
    titleYear: "2026",
    published: "Jan 29, 2026",
    effectiveDateText: "January 1, 2026",
    effectiveDateNote: "Chapters 2, 3, 4, 5, 6, 7 and Overview all effective Jan 1, 2026.",
    effectiveDatePast: true,
    status: "FINAL_CURRENT",
    tier: 1,
    novaAction: "Ingest all 7 chapters into primary corpus.",
    warningFlag: null,
    banner: null
  },
  {
    family: "LAR 2025 (SUPERSEDED)",
    title: "LAR (2025) – Guideline + Chapters 1–7",
    titleYear: "2025",
    published: "Nov 21, 2024",
    effectiveDateText: "January 1, 2025",
    effectiveDateNote: "Was operative during 2025. Superseded by LAR 2026 effective Jan 1, 2026. Still live in OSFI library.",
    effectiveDatePast: true,
    status: "SUPERSEDED",
    tier: 1,
    novaAction: "Ingest but tag SUPERSEDED. Retrieval boost −2. NOVA must warn when citing.",
    warningFlag: "⚡ Superseded by LAR 2026 — de-prioritize in retrieval",
    banner: null
  },
  // ── MCT 2026 ─────────────────────────────────────────────────────────────
  {
    family: "MCT 2026",
    title: "Minimum Capital Test (MCT) – Guideline (2026)",
    titleYear: "2026",
    published: "Nov 20, 2025",
    effectiveDateText: "January 1, 2026",
    effectiveDateNote: "Applicable to P&C insurers for fiscal years beginning on or after Jan 1, 2026.",
    effectiveDatePast: true,
    status: "FINAL_CURRENT",
    tier: 1,
    novaAction: "Ingest into primary corpus. Current operative MCT for P&C sector.",
    warningFlag: null,
    banner: null
  },
  {
    family: "MCT 2024 (SUPERSEDED)",
    title: "Minimum Capital Test (MCT) – Guideline (2024)",
    titleYear: "2024",
    published: "Jan 1, 2024",
    effectiveDateText: "January 1, 2024",
    effectiveDateNote: "Superseded by MCT 2026 effective Jan 1, 2026. Still in OSFI library.",
    effectiveDatePast: true,
    status: "SUPERSEDED",
    tier: 1,
    novaAction: "Ingest but tag SUPERSEDED. Retrieval boost −2.",
    warningFlag: "⚡ Superseded by MCT 2026",
    banner: null
  },
  // ── SMSBs 2026 ────────────────────────────────────────────────────────────
  {
    family: "SMSBs 2026",
    title: "SMSBs Capital and Liquidity Requirements – Guideline (2026)",
    titleYear: "2026",
    published: "Sep 11, 2025",
    effectiveDateText: "November 2025 / January 2026",
    effectiveDateNote: "Same split effective date as CAR 2026 — aligns with fiscal year end.",
    effectiveDatePast: true,
    status: "FINAL_CURRENT",
    tier: 1,
    novaAction: "Ingest into primary corpus.",
    warningFlag: null,
    banner: null
  },
  // ── E-23 2027 ─────────────────────────────────────────────────────────────
  {
    family: "E-23 (2027)",
    title: "Guideline E-23 – Model Risk Management (2027)",
    titleYear: "2027",
    published: "Sep 11, 2025",
    effectiveDateText: "May 1, 2027",
    effectiveDateNote: "Final guideline, fully published. Effective date is 14 months in the future from today. NOT yet operative.",
    effectiveDatePast: false,
    status: "FINAL_FUTURE_EFFECTIVE",
    tier: 1,
    novaAction: "Ingest into primary corpus. Every NOVA citation MUST carry the 'Effective May 1, 2027 — not yet in force' warning.",
    warningFlag: "🔵 Final but future-effective — mandatory citation warning required",
    banner: null
  },
  // ── LICAT 2025 ────────────────────────────────────────────────────────────
  {
    family: "LICAT 2025",
    title: "Life Insurance Capital Adequacy Test (LICAT) – Guideline (2025) + 12 Chapters",
    titleYear: "2025",
    published: "Jan 1, 2025",
    effectiveDateText: "January 1, 2025",
    effectiveDateNote: "Effective Jan 1, 2025. Current operative LICAT. No superseding version yet published.",
    effectiveDatePast: true,
    status: "FINAL_CURRENT",
    tier: 1,
    novaAction: "Ingest all 12 chapters plus parent into primary corpus.",
    warningFlag: null,
    banner: null
  },
];

const STATUS_META = {
  FINAL_CURRENT: { label: "FINAL — IN EFFECT", bg: "#dcfce7", color: "#166534", border: "#86efac" },
  FINAL_FUTURE_EFFECTIVE: { label: "FINAL — NOT YET IN FORCE", bg: "#dbeafe", color: "#1e40af", border: "#93c5fd" },
  SUPERSEDED: { label: "SUPERSEDED", bg: "#fef9c3", color: "#854d0e", border: "#fde047" },
  DRAFT_OR_CONSULTATION: { label: "DRAFT / CONSULTATION", bg: "#fee2e2", color: "#991b1b", border: "#fca5a5" },
};

export default function App() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 13, background: "#f8fafc", minHeight: "100vh", padding: 16 }}>
      {/* Header */}
      <div style={{ background: "#1e3a5f", color: "white", borderRadius: 8, padding: "12px 16px", marginBottom: 14 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>OSFI 2026 & 2027 Guidelines — Effective Date & Classification Matrix</div>
        <div style={{ fontSize: 11, opacity: 0.8 }}>Today: {TODAY} · Effective date on page vs. today determines NOVA corpus status</div>
      </div>

      {/* Key principle box */}
      <div style={{ background: "#fffbeb", border: "1.5px solid #fbbf24", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 12 }}>
        <strong>Core rule:</strong> The year in the title (e.g. "2026", "2027") refers to the <em>version family</em>, not whether it is currently in force.
        Classification is determined solely by comparing the document's <strong>effective_date field</strong> against today ({TODAY}).
        A "(2026)" document can be FINAL_CURRENT <em>and</em> a "(2027)" document can be FINAL_FUTURE_EFFECTIVE — both belong in the primary corpus.
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {Object.entries(STATUS_META).map(([k, v]) => (
          <div key={k} style={{ background: v.bg, color: v.color, border: `1.5px solid ${v.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600 }}>
            {v.label}
          </div>
        ))}
      </div>

      {/* Document cards */}
      {DOCS.map((doc, i) => {
        const sm = STATUS_META[doc.status];
        const isOpen = expanded === i;
        return (
          <div key={i} style={{ background: "white", border: `1.5px solid ${sm.border}`, borderRadius: 8, marginBottom: 10, overflow: "hidden" }}>
            {/* Card header */}
            <div
              onClick={() => setExpanded(isOpen ? null : i)}
              style={{ padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10 }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                  <span style={{ background: "#1e3a5f", color: "white", borderRadius: 4, padding: "2px 7px", fontSize: 10, fontWeight: 700 }}>
                    {doc.family}
                  </span>
                  <span style={{ background: sm.bg, color: sm.color, border: `1px solid ${sm.border}`, borderRadius: 4, padding: "2px 7px", fontSize: 10, fontWeight: 700 }}>
                    {sm.label}
                  </span>
                  <span style={{ background: "#f1f5f9", color: "#475569", borderRadius: 4, padding: "2px 7px", fontSize: 10, fontWeight: 600 }}>
                    Tier {doc.tier}
                  </span>
                  {doc.warningFlag && (
                    <span style={{ fontSize: 11, color: "#92400e" }}>{doc.warningFlag}</span>
                  )}
                </div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{doc.title}</div>
                <div style={{ display: "flex", gap: 16, marginTop: 4, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: "#64748b" }}>📅 Published: {doc.published}</span>
                  <span style={{ fontSize: 11, color: doc.effectiveDatePast ? "#166534" : "#1e40af", fontWeight: 600 }}>
                    ⚡ Effective: {doc.effectiveDateText}
                    {doc.effectiveDatePast ? " ✓ (PAST)" : " ⏳ (FUTURE)"}
                  </span>
                </div>
              </div>
              <div style={{ color: "#94a3b8", fontSize: 16, marginTop: 2 }}>{isOpen ? "▲" : "▼"}</div>
            </div>

            {/* Expanded detail */}
            {isOpen && (
              <div style={{ borderTop: `1px solid ${sm.border}`, padding: "10px 14px", background: sm.bg + "44" }}>
                <div style={{ marginBottom: 8 }}>
                  <strong style={{ fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Effective Date Notes</strong>
                  <div style={{ fontSize: 12, color: "#334155", marginTop: 3 }}>{doc.effectiveDateNote}</div>
                </div>
                {doc.banner && (
                  <div style={{ background: "#fef3c7", border: "1px solid #fcd34d", borderRadius: 6, padding: "6px 10px", marginBottom: 8, fontSize: 11 }}>
                    <strong>⚠️ Banner present on OSFI page:</strong> {doc.banner}
                    <div style={{ marginTop: 3, color: "#92400e" }}>
                      → Rule 6 classifier must detect this refers to a different version family and NOT exclude this document.
                    </div>
                  </div>
                )}
                <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 6, padding: "6px 10px", fontSize: 11 }}>
                  <strong>🤖 NOVA Agent Action:</strong> {doc.novaAction}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Summary decision table */}
      <div style={{ background: "white", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "12px 14px", marginTop: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "#1e3a5f" }}>Summary: What Happens to Each Group</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              {["Title Year", "Effective Date Reality", "Status", "Primary Corpus?", "NOVA Citation Rule"].map(h => (
                <th key={h} style={{ padding: "7px 10px", textAlign: "left", fontWeight: 600, color: "#475569", fontSize: 11, borderBottom: "2px solid #e2e8f0" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { year: '"2026" guidelines (CAR, LAR, MCT, SMSBs)', reality: "Effective Nov 2025 or Jan 2026 — both dates PAST", status: "FINAL_CURRENT", corpus: "✅ YES", rule: "Cite normally. Include split FYE note where applicable." },
              { year: '"2027" — E-23 only', reality: "Effective May 1, 2027 — 14 months in the FUTURE", status: "FINAL_FUTURE_EFFECTIVE", corpus: "✅ YES", rule: "MUST append: 'Effective May 1, 2027 — not yet in force'" },
              { year: '"2027" — CAR 2027 draft', reality: "Consultation closed Feb 18, 2026. Final not published yet.", status: "DRAFT_OR_CONSULTATION", corpus: "🚫 NO", rule: "Contextual store only. Never cite as operative guidance." },
              { year: '"2025" (LAR/MCT superseded)', reality: "Was effective in 2025. Now replaced by 2026 versions.", status: "SUPERSEDED", corpus: "✅ YES (de-ranked)", rule: "MUST append: 'Superseded by [2026 version] effective Jan 1, 2026'" },
              { year: '"2025" — LICAT, Reinsurance, etc.', reality: "Effective Jan 1, 2025. No newer version published yet.", status: "FINAL_CURRENT", corpus: "✅ YES", rule: "Cite normally — these are the current operative guidelines." },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                <td style={{ padding: "7px 10px", fontWeight: 500 }}>{r.year}</td>
                <td style={{ padding: "7px 10px", color: "#64748b" }}>{r.reality}</td>
                <td style={{ padding: "7px 10px" }}>
                  <span style={{
                    background: STATUS_META[r.status]?.bg,
                    color: STATUS_META[r.status]?.color,
                    border: `1px solid ${STATUS_META[r.status]?.border}`,
                    borderRadius: 4, padding: "2px 6px", fontSize: 10, fontWeight: 600
                  }}>{r.status}</span>
                </td>
                <td style={{ padding: "7px 10px" }}>{r.corpus}</td>
                <td style={{ padding: "7px 10px", color: "#334155" }}>{r.rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
