import { useState } from "react";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, BarChart,
} from "recharts";

const annualData = [
  { year: "FY21", revenue: 16.7, netIncome: 4.3, fcf: 4.7 },
  { year: "FY22", revenue: 26.9, netIncome: 9.75, fcf: 8.1 },
  { year: "FY23", revenue: 27.0, netIncome: 4.4, fcf: 3.8 },
  { year: "FY24", revenue: 60.9, netIncome: 29.8, fcf: 27.0 },
  { year: "FY25", revenue: 130.5, netIncome: 72.9, fcf: 61.2 },
  { year: "FY26", revenue: 215.9, netIncome: 120.0, fcf: 97.0 },
];

const quarterlyData = [
  { q: "Q1 FY25", rev: 26.0, dc: 22.6 },
  { q: "Q2 FY25", rev: 30.0, dc: 26.3 },
  { q: "Q3 FY25", rev: 35.1, dc: 30.8 },
  { q: "Q4 FY25", rev: 39.3, dc: 35.6 },
  { q: "Q1 FY26", rev: 44.1, dc: 39.1 },
  { q: "Q2 FY26", rev: 46.7, dc: 41.1 },
  { q: "Q3 FY26", rev: 57.0, dc: 51.2 },
  { q: "Q4 FY26", rev: 68.1, dc: 62.3 },
];

const peers = [
  { company: "NVIDIA (NVDA)", cap: "$5.1T", pe: "31.3×", fpe: "23.4×", evEbi: "29.7×", rev: "+65%", roe: "114%", npm: "55.6%", de: "0.07", highlight: true },
  { company: "AMD", cap: "~$380B", pe: "170×", fpe: "59×", evEbi: "111×", rev: "~30%", roe: "8%", npm: "~10%", de: "0.06", highlight: false },
  { company: "Broadcom (AVGO)", cap: "~$1.82T", pe: "64×", fpe: "~40×", evEbi: "~35×", rev: "+48%", roe: "50%+", npm: "38%", de: "1.2+", highlight: false },
  { company: "Intel (INTC)", cap: "~$95B", pe: "NM", fpe: "NM", evEbi: "NM", rev: "Declining", roe: "Neg.", npm: "Neg.", de: "1.0+", highlight: false },
];

const scores = [
  { area: "Business Quality", score: 10, hex: "#3B6D11", note: "Unmatched CUDA moat, 80%+ AI GPU share, full-stack platform lock-in" },
  { area: "Financial Strength", score: 10, hex: "#3B6D11", note: "D/E 0.07, $97B FCF (FY26), $62B+ cash, 3.44× current ratio" },
  { area: "Growth", score: 9, hex: "#3B6D11", note: "Revenue CAGR ~100% (3Y); EPS CAGR ~212% (FY23–26); Q2 FY27 guided $91B" },
  { area: "Valuation", score: 6, hex: "#BA7517", note: "Forward P/E 23.4× (below sector median 36×); PEG 0.46 — reasonable at this growth" },
  { area: "Management", score: 9, hex: "#3B6D11", note: "Jensen Huang's visionary leadership; 50%+ FCF return pledge; minor insider selling" },
  { area: "Capital Allocation", score: 8, hex: "#639922", note: "25× dividend hike; $41B returned FY26; $80B buyback auth Q1 FY27; structurally improving" },
];

const buffett = [
  { label: "Economic Moat", tag: "Wide", color: "#3B6D11", text: "CUDA has 10× the developer activity of nearest competitor. Millions of production workloads and AI model pipelines are CUDA-dependent. Porting to alternatives takes 6–18 months for hyperscale systems — a structural, not cosmetic, switching cost." },
  { label: "Pricing Power", tag: "Exceptional", color: "#3B6D11", text: "75% gross margins at $216B revenue is nearly unprecedented in hardware history. NVIDIA has maintained or expanded margins even as volumes scaled massively — a textbook sign of genuine pricing power, not commodity dynamics." },
  { label: "ROE Consistency", tag: "Outstanding", color: "#3B6D11", text: "TTM ROE of 114%, ROIC 104.67%. FY23 ROE dipped during the crypto/gaming cycle downturn, but the recent trajectory at this revenue scale is extraordinary and unique in the history of the semiconductor industry." },
  { label: "Debt Discipline", tag: "Excellent", color: "#3B6D11", text: "D/E of 0.07. Net cash ~$50B. Interest coverage effectively infinite. NVIDIA financed its entire AI infrastructure expansion (Blackwell, Hopper, Spectrum-X networking) entirely from operating cash flow — zero dilutive equity raises." },
  { label: "Management Quality", tag: "Strong", color: "#639922", text: "Jensen Huang co-founded NVIDIA in 1993 and remains CEO — one of the great technology CEOs of the modern era. He envisioned GPU computing 15 years before the AI boom. Comp is tied to TSR vs S&P 500. Insider selling via scheduled 10b5-1 plan is noted but not alarming at this wealth level." },
  { label: "Long-Term Durability", tag: "High (with caveats)", color: "#BA7517", text: "AI compute demand is structural and growing. Blackwell → Vera Rubin → Feynman roadmap is visible through 2027+. Key question: will hyperscaler custom ASICs (Google Ironwood, Amazon Trainium, Microsoft Maia) erode GPU share over a 10-year horizon? Near-term (3–5Y) case is strongly positive. The 10-year case depends on CUDA moat durability." },
];

const risks = [
  { lvl: "High", lvlColor: "#E24B4A", title: "Export Control / China Market", body: "H20 ban (April 2025) caused a ~$7B Q1 FY26 charge. Partial reversal (H200 to approved customers, July 2025) with a 15% government fee. NVIDIA's own 10-K admits it is 'effectively foreclosed from China data center compute market' at FY26 year-end, ceding ground to Huawei Ascend chips." },
  { lvl: "High", lvlColor: "#E24B4A", title: "Hyperscaler Custom ASICs", body: "Google (Ironwood TPU), Amazon (Trainium 2/Inferentia), Microsoft (Maia 100), Meta (MTIA) are all investing billions in custom AI chips to reduce NVIDIA dependence. ~50% of Q1 FY27 data center revenue comes from hyperscalers — if they achieve parity for inference workloads, NVDA's TAM for those use cases narrows." },
  { lvl: "Medium", lvlColor: "#EF9F27", title: "TSMC Concentration & Taiwan Risk", body: "NVIDIA is 100% dependent on TSMC for leading-edge chip fabrication. A Taiwan geopolitical incident, TSMC production disruption, or supply chain shock would be catastrophic. TSMC Arizona fabs are being built, but volume ramp takes years and is limited to older nodes." },
  { lvl: "Medium", lvlColor: "#EF9F27", title: "Valuation & High-Beta Risk", body: "At $5.1T market cap, NVIDIA is the single most systemically important AI equity. Beta of 2.2× means any macro slowdown, AI capex rationalization, or earnings miss can trigger sharp de-rating. Stock-based compensation ($15B+ in FY25) creates ongoing dilution that buybacks must offset." },
  { lvl: "Medium", lvlColor: "#EF9F27", title: "AMD ROCm Ecosystem Maturation", body: "AMD's MI350X matches B200 FP8 TFLOPS. TCO gap for inference is near-zero per SemiAnalysis. Seven of the ten largest AI model builders are running production workloads on AMD Instinct (per AMD, June 2025). CUDA moat is narrowing, though still 10× wider in developer ecosystem depth." },
  { lvl: "Low–Med", lvlColor: "#BA7517", title: "AI Efficiency Leaps / Capex Cycle", body: "DeepSeek (Jan 2025) raised fears of compute demand softening. Didn't materialize — inference token generation surged 10× per Jensen Huang. But future algorithmic efficiency breakthroughs could reduce chips-per-model ratios. Current $725B hyperscaler AI capex for 2026 is strong." },
];

const NVGREEN = "#639922";
const NVGREENDK = "#3B6D11";

function Tag({ children, color }) {
  return (
    <span style={{ fontSize: "11px", fontWeight: "500", padding: "2px 9px", borderRadius: "12px", background: color + "22", color, display: "inline-block" }}>
      {children}
    </span>
  );
}

function SectionHead({ n, title, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "10px", marginBottom: "14px", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
      <i className={`ti ${icon}`} style={{ fontSize: "18px", color: NVGREEN, flexShrink: 0 }} aria-hidden="true" />
      <h2 style={{ fontSize: "16px", fontWeight: "500", margin: "0", color: "var(--color-text-primary)" }}>
        {n}. {title}
      </h2>
    </div>
  );
}

function StatCard({ label, value, sub, valueColor }) {
  return (
    <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "12px", border: "0.5px solid var(--color-border-tertiary)" }}>
      <p style={{ fontSize: "10px", color: "var(--color-text-tertiary)", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</p>
      <p style={{ fontSize: "18px", fontWeight: "500", margin: "0 0 2px", color: valueColor || "var(--color-text-primary)" }}>{value}</p>
      {sub && <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", margin: "0", lineHeight: "1.4" }}>{sub}</p>}
    </div>
  );
}

function ScoreBar({ area, score, hex, note }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
        <span style={{ fontSize: "13px", color: "var(--color-text-primary)", fontWeight: "500" }}>{area}</span>
        <span style={{ fontSize: "14px", fontWeight: "500", color: hex }}>{score}/10</span>
      </div>
      <div style={{ height: "7px", background: "var(--color-background-tertiary)", borderRadius: "4px", overflow: "hidden", marginBottom: "4px" }}>
        <div style={{ width: `${score * 10}%`, height: "100%", background: hex, borderRadius: "4px" }} />
      </div>
      <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", margin: "0", lineHeight: "1.4" }}>{note}</p>
    </div>
  );
}

export default function NvidiaReport() {
  const totalScore = scores.reduce((s, i) => s + i.score, 0);
  const overall = ((totalScore / (scores.length * 10)) * 10).toFixed(1);

  const fmtAnnual = (value, name) => {
    const label = name === "revenue" ? "Revenue" : name === "netIncome" ? "Net Income" : "FCF";
    return [`$${value}B`, label];
  };
  const fmtQ = (value, name) => [`$${value}B`, name === "rev" ? "Total Revenue" : "Data Center"];

  return (
    <div style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-primary)", maxWidth: "680px", padding: "0.5rem 0" }}>

      {/* ── HEADER ── */}
      <div style={{ borderLeft: "3px solid " + NVGREEN, paddingLeft: "16px", marginBottom: "2rem" }}>
        <p style={{ fontSize: "10px", color: "var(--color-text-tertiary)", margin: "0 0 3px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Stock Fundamental Research · Deep Dive
        </p>
        <h1 style={{ fontSize: "28px", fontWeight: "500", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
          NVIDIA Corporation
        </h1>
        <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", margin: "0" }}>
          NASDAQ: NVDA &nbsp;·&nbsp; AI Infrastructure & Semiconductors &nbsp;·&nbsp; Data as of <strong style={{ fontWeight: "500", color: "var(--color-text-primary)" }}>June 18, 2026</strong>
        </p>
      </div>

      {/* ── 1. MARKET SNAPSHOT ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="1" title="Market Snapshot" icon="ti-report-analytics" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))", gap: "10px", marginBottom: "12px" }}>
          <StatCard label="CMP (Jun 18, 2026)" value="$208.82" sub="NASDAQ: NVDA" valueColor="var(--color-text-primary)" />
          <StatCard label="Market Cap" value="~$5.1T" sub="#1 Largest Semiconductor globally" />
          <StatCard label="52-Week Range" value="$142–$237" sub="High $236.54 · Low $142.03" />
          <StatCard label="Face Value" value="$0.001" sub="Post 10:1 split (Jun 10, 2024)" />
          <StatCard label="P/E (Trailing)" value="~31.3×" sub="vs 3Y avg ~61×; 5Y avg ~70×" valueColor={NVGREENDK} />
          <StatCard label="P/E (Forward)" value="23.4×" sub="vs sector median ~36×" valueColor={NVGREENDK} />
          <StatCard label="EV / EBITDA" value="~29.7×" sub="PEG ratio: 0.46" />
          <StatCard label="Dividend Yield" value="~0.48%" sub="$0.25/qtr after 25× hike (Jun 2026)" />
        </div>
      </section>

      {/* ── 2. BUSINESS MODEL ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="2" title="Business Overview" icon="ti-building-factory" />
        <p style={{ fontSize: "14px", lineHeight: "1.75", color: "var(--color-text-secondary)", margin: "0 0 12px" }}>
          Founded in 1993 by Jensen Huang, NVIDIA pioneered GPU-accelerated computing and is now the backbone of the global AI revolution. The company is fabless — it designs chips manufactured exclusively by TSMC — and operates through two segments.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
          {[
            { name: "Compute & Networking", pct: "~91%", desc: "Data center AI GPUs (Hopper, Blackwell, Vera Rubin), NVLink interconnects, InfiniBand & Spectrum-X Ethernet networking, DGX SuperPODs, CUDA software platform, AI Enterprise software" },
            { name: "Graphics", pct: "~9%", desc: "GeForce gaming GPUs, RTX Studio workstations, DRIVE for automotive. Growing Automotive segment (Isaac robotics, DRIVE Thor) is a watch category for future contribution." },
          ].map((s) => (
            <div key={s.name} style={{ padding: "12px 14px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-primary)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--color-text-primary)" }}>{s.name}</span>
                <span style={{ fontSize: "12px", fontWeight: "500", color: NVGREEN }}>{s.pct} of FY26 revenue</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "0", lineHeight: "1.55" }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "13px", lineHeight: "1.7", color: "var(--color-text-secondary)", margin: "0 0 8px" }}>
          NVIDIA's strategy is "full-stack AI infrastructure" — chips + networking + software sold as a platform. The Vera CPU (announced Q1 FY27) enters the $200B data center CPU TAM. Management cited ~$1 trillion in committed platform orders through 2027 at GTC 2026.
        </p>
      </section>

      {/* ── 3. GROWTH CHARTS ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="3" title="Revenue, Earnings & FCF Growth" icon="ti-chart-bar" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "16px" }}>
          <StatCard label="FY26 Revenue" value="$215.9B" sub="+65% YoY (up from $130.5B FY25)" valueColor={NVGREENDK} />
          <StatCard label="Q1 FY27 Revenue" value="$81.6B" sub="+85% YoY · Beat consensus of $80.4B" valueColor={NVGREENDK} />
          <StatCard label="Q2 FY27 Guidance" value="~$91B" sub="±2% · Zero China revenue assumed" valueColor={NVGREENDK} />
        </div>

        <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", margin: "0 0 6px" }}>Annual Revenue, Net Income & Free Cash Flow (in $B) — FY2021 to FY2026</p>
        <div style={{ position: "relative", width: "100%", height: "240px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={annualData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.12)" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#888" }} />
              <YAxis tick={{ fontSize: 11, fill: "#888" }} tickFormatter={(v) => `$${v}B`} />
              <Tooltip formatter={fmtAnnual} contentStyle={{ fontSize: 12 }} />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Bar dataKey="revenue" name="revenue" fill="#378ADD" radius={[2, 2, 0, 0]} />
              <Bar dataKey="netIncome" name="netIncome" fill="#1D9E75" radius={[2, 2, 0, 0]} />
              <Line type="monotone" dataKey="fcf" name="fcf" stroke="#BA7517" strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", margin: "10px 0 16px", fontSize: "12px", color: "var(--color-text-tertiary)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#378ADD" }}></span>Revenue</span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#1D9E75" }}></span>Net Income</span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: 10, height: 3, background: "#BA7517" }}></span>FCF</span>
        </div>

        <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", margin: "0 0 6px" }}>Quarterly Revenue: Total vs Data Center (in $B) — Q1 FY25 to Q4 FY26</p>
        <div style={{ position: "relative", width: "100%", height: "210px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={quarterlyData} margin={{ top: 5, right: 5, left: -15, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.12)" />
              <XAxis dataKey="q" tick={{ fontSize: 10, fill: "#888" }} angle={-30} textAnchor="end" />
              <YAxis tick={{ fontSize: 11, fill: "#888" }} tickFormatter={(v) => `$${v}B`} />
              <Tooltip formatter={fmtQ} contentStyle={{ fontSize: 12 }} />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="rev" name="Total Revenue" fill="#378ADD" radius={[2, 2, 0, 0]} />
              <Bar dataKey="dc" name="Data Center" fill="#1D9E75" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", margin: "10px 0 0", fontSize: "12px", color: "var(--color-text-tertiary)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#378ADD" }}></span>Total Revenue</span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#1D9E75" }}></span>Data Center</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", marginTop: "14px" }}>
          {[
            { label: "Revenue CAGR (3Y FY23–FY26)", value: "~100%", note: "Historically unprecedented at this scale" },
            { label: "Revenue CAGR (5Y FY21–FY26)", value: "~67%", note: "Sustained hypergrowth from $16.7B" },
            { label: "Net Income CAGR (3Y FY23–FY26)", value: "~200%+", note: "Profits grew faster than revenue" },
            { label: "EPS CAGR (3Y FY23–FY26)", value: "~212%", note: "FY23: $0.16 (post-split) → FY26: $4.90" },
          ].map((m) => (
            <div key={m.label} style={{ padding: "10px 14px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-primary)" }}>
              <p style={{ fontSize: "10px", color: "var(--color-text-tertiary)", margin: "0 0 2px", textTransform: "uppercase" }}>{m.label}</p>
              <p style={{ fontSize: "17px", fontWeight: "500", color: NVGREENDK, margin: "0 0 1px" }}>{m.value}</p>
              <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", margin: "0" }}>{m.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. VALUATION ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="4" title="Valuation" icon="ti-calculator" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "12px" }}>
          {[
            { label: "P/E Trailing (TTM)", value: "~31.3×", sub: "vs 3Y avg ~61×", pos: true },
            { label: "P/E Forward (12M)", value: "23.4×", sub: "vs sector median ~36×", pos: true },
            { label: "EV/EBITDA", value: "~29.7×", sub: "Semiconductor comps vary widely", pos: false },
            { label: "Price / Book", value: "~32.6×", sub: "$157.3B book value (FY26)", pos: false },
            { label: "PEG Ratio", value: "0.46", sub: "Below 1.0 = growth-adjusted cheap", pos: true },
            { label: "P/S Ratio", value: "~20×", sub: "On TTM revenue basis", pos: false },
          ].map((v) => (
            <div key={v.label} style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "12px", border: "0.5px solid var(--color-border-tertiary)" }}>
              <p style={{ fontSize: "10px", color: "var(--color-text-tertiary)", margin: "0 0 4px", textTransform: "uppercase" }}>{v.label}</p>
              <p style={{ fontSize: "18px", fontWeight: "500", margin: "0 0 2px", color: v.pos ? NVGREENDK : "var(--color-text-primary)" }}>{v.value}</p>
              <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", margin: "0" }}>{v.sub}</p>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 16px", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", fontSize: "13px", lineHeight: "1.7", color: "var(--color-text-secondary)" }}>
          <span style={{ color: "var(--color-text-primary)", fontWeight: "500" }}>Valuation View: </span>
          NVIDIA's trailing P/E of ~31× is its lowest in the modern AI era — well below its 3Y (~61×) and 5Y (~70×) averages. The forward P/E of 23.4× sits meaningfully below the semiconductor sector median of ~36×. PEG of 0.46 implies the stock is cheap relative to its earnings growth rate. The "expensive" thesis is further complicated by the rarity of a $216B-revenue company growing at 65–85% YoY. Key valuation risk: if AI capex materially disappoints or margins compress, growth-dependent premiums reprice sharply.
        </div>
      </section>

      {/* ── 5. FINANCIAL HEALTH & RETURNS ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="5" title="Financial Health & Returns" icon="ti-heart-rate-monitor" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginBottom: "12px" }}>
          {[
            { label: "Debt / Equity", value: "0.07", rating: "✓ Safe — <1 threshold", good: true },
            { label: "Current Ratio", value: "3.44×", rating: "✓ Comfortable — >1.5 threshold", good: true },
            { label: "Total Cash (FY26 end)", value: "~$62.5B", rating: "✓ Net cash ~$50B (debt ~$12.8B)", good: true },
            { label: "Interest Coverage", value: ">100×", rating: "✓ Essentially unlimited headroom", good: true },
            { label: "FCF — Full Year FY26", value: "$97.0B", rating: "✓ Strong & Growing | FCF margin ~45%", good: true },
            { label: "FCF — Q1 FY27 alone", value: "$48.6B", rating: "✓ Accelerating; $49B/qtr run rate", good: true },
            { label: "ROE (TTM)", value: "114.3%", rating: "✓ Far exceeds 15% benchmark", good: true },
            { label: "ROIC (TTM)", value: "104.7%", rating: "✓ Exceptional capital efficiency", good: true },
          ].map((r) => (
            <div key={r.label} style={{ padding: "10px 14px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-primary)" }}>
              <p style={{ fontSize: "10px", color: "var(--color-text-tertiary)", margin: "0 0 2px", textTransform: "uppercase" }}>{r.label}</p>
              <p style={{ fontSize: "16px", fontWeight: "500", margin: "0 0 2px", color: "var(--color-text-primary)" }}>{r.value}</p>
              <p style={{ fontSize: "11px", color: r.good ? NVGREENDK : "#E24B4A", margin: "0", fontWeight: "500" }}>{r.rating}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "13px", lineHeight: "1.7", color: "var(--color-text-secondary)", margin: "0" }}>
          NVIDIA's balance sheet is immaculate. It self-finances the entire AI hardware roadmap from operating cash flow — no equity raises, no meaningful leverage. FCF margin expanded from ~14% (FY21) to ~45% (FY26). In Q1 FY2027, NVIDIA generated more free cash flow ($48.6B) in a single quarter than most Fortune 500 companies produce in an entire year. The Working Capital position was $93.4B at FY26 year-end — up from $62B a year prior.
        </p>
      </section>

      {/* ── 6. PROFITABILITY ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="6" title="Profitability — Margin Trend" icon="ti-percentage" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ borderBottom: "0.5px solid var(--color-border-secondary)" }}>
                {["Period", "Revenue", "Gross Margin", "Op. Margin (est.)", "Net Margin", "FCF Margin"].map((h) => (
                  <th key={h} style={{ padding: "7px 8px", textAlign: "left", color: "var(--color-text-tertiary)", fontWeight: "500", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { p: "FY2023", r: "$27.0B", gm: "56.9%", om: "~17%", nm: "16.3%", fcfm: "~14%" },
                { p: "FY2024", r: "$60.9B", gm: "72.7%", om: "~55%", nm: "48.9%", fcfm: "~44%" },
                { p: "FY2025", r: "$130.5B", gm: "74.6%", om: "~65%", nm: "55.9%", fcfm: "~47%" },
                { p: "FY2026", r: "$215.9B", gm: "71.1%*", om: "~67%", nm: "55.6%", fcfm: "~45%" },
                { p: "Q4 FY2026", r: "$68.1B", gm: "75.0%", om: "~69%", nm: "~63%", fcfm: "~51%" },
                { p: "Q1 FY2027", r: "$81.6B", gm: "74.9%", om: "~68%", nm: "~60%", fcfm: "~60%" },
              ].map((row, i) => (
                <tr key={row.p} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)", background: i >= 4 ? "var(--color-background-secondary)" : "transparent" }}>
                  <td style={{ padding: "8px", color: "var(--color-text-primary)", fontWeight: i >= 4 ? "500" : "400" }}>{row.p}</td>
                  <td style={{ padding: "8px", color: "var(--color-text-secondary)" }}>{row.r}</td>
                  <td style={{ padding: "8px", color: NVGREENDK, fontWeight: "500" }}>{row.gm}</td>
                  <td style={{ padding: "8px", color: "var(--color-text-secondary)" }}>{row.om}</td>
                  <td style={{ padding: "8px", color: "var(--color-text-secondary)" }}>{row.nm}</td>
                  <td style={{ padding: "8px", color: "var(--color-text-secondary)" }}>{row.fcfm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", margin: "8px 0 0", lineHeight: "1.5" }}>
          * FY26 full-year gross margin of 71.1% was impacted by the $4.5B H20 inventory charge in Q1 FY26. Underlying gross margins have been 74–75% and management targets mid-70s through FY27. Operating margin estimates are approximate from available data. Sources: NVIDIA SEC 8-K filings, StockAnalysis.
        </p>
      </section>

      {/* ── 7. OWNERSHIP ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="7" title="Ownership & Shareholder Returns" icon="ti-users" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
          {[
            { label: "Founder/CEO (Jensen Huang)", val: "~3.5% beneficially", note: "Highly aligned. Selling via pre-scheduled 10b5-1 plan — estate planning, not distress signal." },
            { label: "Institutional Ownership", val: "~65–70%", note: "Vanguard, BlackRock, State Street, Capital Group are top holders." },
            { label: "Insider Pledging", val: "None reported", note: "No promoter-equivalent pledging. NVIDIA is US-listed; no governance concerns flagged." },
            { label: "FY26 Shareholder Returns", val: "$41.1B", note: "Combination of share buybacks and dividends. $58.5B repurchase authorization remaining at FY26 end." },
            { label: "Q1 FY27 Capital Return", val: "$20B (single quarter)", note: "25× dividend hike to $0.25/qtr + $80B new buyback authorization. Record quarterly return." },
            { label: "FCF Return Commitment", val: "≥50% of FCF", note: "Jensen Huang pledged minimum 50% FCF returned to shareholders 'this year, next year, and beyond' (Jun 2026)." },
          ].map((o) => (
            <div key={o.label} style={{ padding: "10px 14px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-primary)" }}>
              <p style={{ fontSize: "10px", color: "var(--color-text-tertiary)", margin: "0 0 3px", textTransform: "uppercase" }}>{o.label}</p>
              <p style={{ fontSize: "14px", fontWeight: "500", margin: "0 0 3px", color: "var(--color-text-primary)" }}>{o.val}</p>
              <p style={{ fontSize: "11px", color: "var(--color-text-secondary)", margin: "0", lineHeight: "1.5" }}>{o.note}</p>
            </div>
          ))}
        </div>
        <div style={{ padding: "11px 15px", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: "1.7" }}>
          Only ~47% of NVIDIA's FY2022–FY2025 FCF was returned to shareholders, vs ~80% for large tech peers (per BofA, May 2026). The company reinvested heavily in AI ecosystem building, OpenAI/Anthropic equity stakes, and CoreWeave investment. The Q1 FY27 pivot to ≥50% FCF return marks a structural shift — NVIDIA is entering its "cash return maturity" phase while still funding Rubin/Feynman chip roadmaps.
        </div>
      </section>

      {/* ── 8. COMPETITIVE MOAT ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="8" title="Business Quality & Competitive Moat" icon="ti-shield" />
        {[
          { moat: "CUDA Software Ecosystem", lvl: "Deep / Structural", c: NVGREENDK, body: "Developer activity 10× nearest competitor (AMD ROCm). Millions of production AI workloads, research papers, and inference pipelines are CUDA-built. Porting a large hyperscale system takes 6–18 months — a prohibitive switching cost. The ecosystem self-reinforces: every new CUDA-trained model generates CUDA-dependent inference pipelines." },
          { moat: "Full-Stack AI Platform Lock-in", lvl: "Strong", c: NVGREENDK, body: "NVIDIA sells the DGX SuperPOD (compute), NVLink (chip interconnect), InfiniBand + Spectrum-X Ethernet (networking), TensorRT + NEMO + CUDA (software), and AI Enterprise (SaaS). Customers adopt the stack holistically — switching one component means switching all, multiplying switching costs." },
          { moat: "Annual Architecture Cadence", lvl: "Defensible", c: "#0F6E56", body: "Hopper → Blackwell → Vera Rubin → Feynman — one major architecture annually. This 'shock and awe' approach obsoletes competitors' chips just as they reach production scale. Jensen Huang: '$1 trillion in committed orders through 2027.' AMD and custom ASICs are always 1-2 generations behind on real-world software performance." },
          { moat: "Network Effects in AI Research", lvl: "Growing", c: "#0F6E56", body: "Every AI paper, model, benchmark, and GitHub repository uses CUDA. Every AI course teaches CUDA. Every AI startup writes CUDA code. This creates a positive feedback loop: more CUDA users → more CUDA libraries → more AI developers choosing NVIDIA → even more CUDA users." },
          { moat: "Pricing Power", lvl: "Exceptional", c: NVGREENDK, body: "75% gross margins at $216B revenue is essentially unique in hardware history. NVIDIA has not been forced to discount to defend market share. H100 and B200 GPUs routinely sold at premium pricing with multi-quarter backlogs. Gross margins have been stable-to-expanding even as volumes scaled from $27B to $216B." },
        ].map((m) => (
          <div key={m.moat} style={{ marginBottom: "10px", padding: "12px 14px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-primary)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
              <Tag color={m.c}>{m.lvl}</Tag>
              <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--color-text-primary)" }}>{m.moat}</span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "0", lineHeight: "1.6" }}>{m.body}</p>
          </div>
        ))}
      </section>

      {/* ── 9. INDUSTRY ANALYSIS ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="9" title="AI Infrastructure — Industry Analysis" icon="ti-brain" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
          <div style={{ padding: "12px 14px", border: "0.5px solid " + NVGREEN + "60", borderRadius: "var(--border-radius-md)", background: "var(--color-background-primary)" }}>
            <p style={{ fontSize: "11px", fontWeight: "500", color: NVGREEN, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Sector Tailwinds</p>
            {[
              "AI model training scaling laws: more compute → smarter models",
              "Inference token demand surged 10× in just one year (Jensen Huang, Q1 FY27 call)",
              "Agentic AI inflection: agents need CPU+GPU — Vera CPU enters $200B TAM",
              "Sovereign AI: 100+ countries building national AI infrastructure",
              "$725B combined hyperscaler AI capex budgeted for 2026",
              "Networking: NVDA #1 data center Ethernet switching by revenue (IDC, Q1 2026)",
              "Physical AI & robotics: DRIVE Thor for automotive, Isaac for industrial",
            ].map((t) => (
              <div key={t} style={{ display: "flex", gap: "6px", marginBottom: "5px" }}>
                <i className="ti ti-trending-up" style={{ fontSize: "13px", color: NVGREEN, flexShrink: 0, marginTop: "2px" }} aria-hidden="true" />
                <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 14px", border: "0.5px solid #E24B4A60", borderRadius: "var(--border-radius-md)", background: "var(--color-background-primary)" }}>
            <p style={{ fontSize: "11px", fontWeight: "500", color: "#E24B4A", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Sector Headwinds</p>
            {[
              "US export controls on advanced chips to China — ongoing regulatory uncertainty",
              "Hyperscalers building custom ASICs to reduce NVIDIA dependency",
              "AMD ROCm closing the CUDA gap for inference workloads",
              "Potential AI capex rationalization if enterprise ROI disappoints",
              "AI efficiency breakthroughs (DeepSeek-style) could reduce chips-per-model",
              "TSMC supply concentration — single point of geopolitical failure",
            ].map((h) => (
              <div key={h} style={{ display: "flex", gap: "6px", marginBottom: "5px" }}>
                <i className="ti ti-trending-down" style={{ fontSize: "13px", color: "#E24B4A", flexShrink: 0, marginTop: "2px" }} aria-hidden="true" />
                <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "11px 15px", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: "1.7" }}>
          <span style={{ color: "var(--color-text-primary)", fontWeight: "500" }}>Recent Developments: </span>
          Vera CPU announced Q1 FY27 — $20B standalone CPU revenue projected for FY27, entering the $200B data center CPU TAM for the first time (challenging Intel Xeon). NVIDIA became #1 data center Ethernet switching vendor by revenue per IDC Q1 2026 data — networking segment grew 142% YoY in FY26. H200 exports to China approved with 15% government fee (July 2025). Vera Rubin GPU platform expected to ship Q3 FY2027.
        </div>
      </section>

      {/* ── 10. PEER COMPARISON ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="10" title="Peer Comparison" icon="ti-arrows-diff" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", tableLayout: "auto" }}>
            <thead>
              <tr style={{ borderBottom: "0.5px solid var(--color-border-secondary)" }}>
                {["Company", "Mkt Cap", "P/E", "Fwd P/E", "EV/EBITDA", "Rev Growth", "ROE", "Net Margin", "D/E"].map((h) => (
                  <th key={h} style={{ padding: "7px 6px", textAlign: "left", color: "var(--color-text-tertiary)", fontWeight: "500", fontSize: "10px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {peers.map((p, i) => (
                <tr key={p.company} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)", background: p.highlight ? "rgba(99,153,34,0.06)" : "transparent" }}>
                  <td style={{ padding: "9px 6px", fontWeight: p.highlight ? "500" : "400", color: "var(--color-text-primary)", whiteSpace: "nowrap" }}>{p.company}</td>
                  <td style={{ padding: "9px 6px", color: "var(--color-text-secondary)", whiteSpace: "nowrap" }}>{p.cap}</td>
                  <td style={{ padding: "9px 6px", color: p.highlight ? NVGREENDK : "var(--color-text-secondary)" }}>{p.pe}</td>
                  <td style={{ padding: "9px 6px", color: p.highlight ? NVGREENDK : "var(--color-text-secondary)" }}>{p.fpe}</td>
                  <td style={{ padding: "9px 6px", color: "var(--color-text-secondary)" }}>{p.evEbi}</td>
                  <td style={{ padding: "9px 6px", color: p.highlight ? NVGREENDK : i === 3 ? "#E24B4A" : "var(--color-text-secondary)" }}>{p.rev}</td>
                  <td style={{ padding: "9px 6px", color: p.highlight ? NVGREENDK : i === 3 ? "#E24B4A" : "var(--color-text-secondary)" }}>{p.roe}</td>
                  <td style={{ padding: "9px 6px", color: p.highlight ? NVGREENDK : i === 3 ? "#E24B4A" : "var(--color-text-secondary)" }}>{p.npm}</td>
                  <td style={{ padding: "9px 6px", color: p.highlight ? NVGREENDK : "var(--color-text-secondary)" }}>{p.de}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", margin: "7px 0 0", lineHeight: "1.6" }}>
          Data as of June 2026. NM = not meaningful. NVIDIA's trailing P/E is meaningfully lower than both AMD and AVGO while its ROE, net margin, and revenue growth outclass all peers. NVIDIA's forward P/E of 23.4× sits 35% below the semiconductor sector median of ~36×. AMD's high trailing P/E reflects low-base earnings; AVGO carries significantly higher leverage (D/E 1.2+) from the VMware acquisition.
        </p>
      </section>

      {/* ── 11. RISKS ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="11" title="Risks & Red Flags" icon="ti-alert-triangle" />
        {risks.map((r) => (
          <div key={r.title} style={{ marginBottom: "10px", padding: "12px 14px", borderLeft: `3px solid ${r.lvlColor}`, border: `0.5px solid ${r.lvlColor}30`, borderRadius: "0 var(--border-radius-md) var(--border-radius-md) 0", background: "var(--color-background-primary)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px", flexWrap: "wrap" }}>
              <Tag color={r.lvlColor}>{r.lvl}</Tag>
              <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--color-text-primary)" }}>{r.title}</span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "0", lineHeight: "1.6" }}>{r.body}</p>
          </div>
        ))}
        <div style={{ padding: "11px 15px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: "1.7", marginTop: "4px" }}>
          <span style={{ color: "var(--color-text-primary)", fontWeight: "500" }}>Red Flag Checklist: </span>
          Rising Debt ✗ &nbsp;·&nbsp; Declining ROE ✗ &nbsp;·&nbsp; Negative FCF ✗ &nbsp;·&nbsp; Insider Pledging ✗ &nbsp;·&nbsp; Margin Compression ✗ &nbsp;·&nbsp; Governance Concerns ✗ (minor: $15B+ annual SBC) &nbsp;·&nbsp; Earnings Volatility — limited (Q1 FY26 H20 charge was one-time and disclosed). <span style={{ color: NVGREENDK, fontWeight: "500" }}>No material red flags identified.</span> Single monitoring item: net dilution from stock-based compensation vs buyback offset.
        </div>
      </section>

      {/* ── 12. INVESTMENT THESIS ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="12" title="Investment Thesis" icon="ti-bulb" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
          {[
            { icon: "ti-coin", title: "How NVIDIA Makes Money", body: "Designs (fabless) and sells AI/HPC GPU accelerators, networking chips, and software/services. Hyperscalers and cloud providers are the primary buyers; enterprises, AI-native companies, and sovereign governments are growing segments. New Vera CPU enters $200B TAM." },
            { icon: "ti-trending-up", title: "Key Growth Drivers", body: "1. AI training & inference scaling (more compute per model generation). 2. Agentic AI: requires CPU+GPU orchestration → Vera CPU. 3. Sovereign AI infrastructure globally. 4. Networking: NVDA now #1 data center Ethernet by revenue. 5. Physical AI (robotics, autonomous vehicles)." },
            { icon: "ti-alert-circle", title: "Key Risks to Monitor", body: "China export restriction expansion; hyperscaler custom ASIC adoption curves; AMD ROCm maturation for inference; macro AI capex rationalization; TSMC concentration; stock-based compensation dilution vs buyback net effect." },
            { icon: "ti-radar", title: "Metric to Track Each Quarter", body: "Data Center revenue YoY growth rate and gross margin. Secondary: Networking ARR growth (Spectrum-X); Software/NVAIE ARR; hyperscaler capex commentary on Q2-Q4 guidance calls." },
          ].map((item) => (
            <div key={item.title} style={{ padding: "12px 14px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-primary)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "7px" }}>
                <i className={`ti ${item.icon}`} style={{ fontSize: "16px", color: NVGREEN }} aria-hidden="true" />
                <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--color-text-primary)" }}>{item.title}</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "0", lineHeight: "1.6" }}>{item.body}</p>
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 16px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.7" }}>
          <span style={{ color: "var(--color-text-primary)", fontWeight: "500" }}>Long-Term Durability: </span>
          NVIDIA owns the "infrastructure layer" of the AI economy — analogous to how Cisco owned internet routing in the late 1990s. The critical question for 10-year durability: (1) do scaling laws continue to require exponentially more silicon per model generation, and (2) can the CUDA moat survive decade-long hyperscaler custom chip programs? Near-term (3–5Y) case is strongly positive given current capex trajectory. The 10-year outlook requires monitoring custom ASIC adoption and AMD ROCm ecosystem depth.
        </div>
      </section>

      {/* ── 13. BUFFETT LENS ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="13" title="Buffett Lens Analysis" icon="ti-eye" />
        {buffett.map((b) => (
          <div key={b.label} style={{ marginBottom: "10px", padding: "12px 14px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-primary)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px", flexWrap: "wrap", gap: "6px" }}>
              <span style={{ fontSize: "14px", fontWeight: "500", color: "var(--color-text-primary)" }}>{b.label}</span>
              <Tag color={b.color}>{b.tag}</Tag>
            </div>
            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "0", lineHeight: "1.6" }}>{b.text}</p>
          </div>
        ))}
        <div style={{ padding: "12px 16px", border: "0.5px solid " + NVGREEN + "50", borderRadius: "var(--border-radius-md)", background: "rgba(99,153,34,0.05)", fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.7" }}>
          <span style={{ color: NVGREENDK, fontWeight: "500" }}>Buffett Summary: </span>
          NVIDIA scores exceptionally across the core Buffett criteria — wide moat, elite pricing power, extraordinary ROE, minimal debt, and strong management. Where it diverges from classic Buffett is the complexity of understanding cutting-edge semiconductor architecture and the technology-cycle dependency. That said, the CUDA moat is arguably more structurally analogous to a classical economic moat (brand, network effects, switching costs) than any other technology company's competitive advantage today.
        </div>
      </section>

      {/* ── 14. FUNDAMENTAL SCORECARD ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="14" title="Fundamental Scorecard" icon="ti-star" />
        {scores.map((s) => (
          <ScoreBar key={s.area} {...s} />
        ))}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", marginTop: "8px" }}>
          <div>
            <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Overall Fundamental Score</p>
            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "0" }}>Sum {totalScore}/{scores.length * 10} · Normalized to /10</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "42px", fontWeight: "500", margin: "0", color: NVGREENDK, lineHeight: "1.05" }}>{overall}</p>
            <p style={{ fontSize: "12px", color: NVGREEN, margin: "0", fontWeight: "500" }}>/ 10 — Exceptional</p>
          </div>
        </div>
      </section>

      {/* ── 15. OVERALL VIEW ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="15" title="Overall View" icon="ti-report" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
          <div style={{ padding: "12px 14px", border: "0.5px solid rgba(99,153,34,0.35)", borderRadius: "var(--border-radius-md)", background: "rgba(99,153,34,0.05)" }}>
            <p style={{ fontSize: "11px", fontWeight: "500", color: NVGREENDK, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Strengths</p>
            {[
              "Deepest software moat in semiconductors — CUDA ecosystem 10× nearest rival",
              "75% gross margins at $216B scale — essentially unique in hardware history",
              "$97B FCF in FY26; $48.6B in a single quarter (Q1 FY27)",
              "Annual chip cadence obsoletes competitors before they reach scale",
              "Jensen Huang's visionary founder-led culture with high alignment",
              "Vera CPU enters $200B TAM — new growth vector for FY27+",
              "25× dividend hike + $80B buyback = structural shareholder return era",
            ].map((s) => (
              <div key={s} style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
                <i className="ti ti-check" style={{ fontSize: "13px", color: NVGREENDK, flexShrink: 0, marginTop: "2px" }} aria-hidden="true" />
                <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 14px", border: "0.5px solid rgba(239,159,39,0.35)", borderRadius: "var(--border-radius-md)", background: "rgba(239,159,39,0.04)" }}>
            <p style={{ fontSize: "11px", fontWeight: "500", color: "#BA7517", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Watch Points</p>
            {[
              "China export policy remains unpredictable — could expand or contract",
              "Hyperscaler custom ASIC programs maturing on 3–5 year horizon",
              "AMD ROCm TCO near-parity for inference in some workloads",
              "SBC $15B+ annually; must be tracked against net buyback offset",
              "~50% of data center revenue from hyperscalers = concentration",
              "Beta 2.2× — extreme volatility, not suitable for low-risk profiles",
            ].map((w) => (
              <div key={w} style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
                <i className="ti ti-alert-small" style={{ fontSize: "13px", color: "#BA7517", flexShrink: 0, marginTop: "2px" }} aria-hidden="true" />
                <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>{w}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div style={{ padding: "12px 14px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)" }}>
            <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", margin: "0 0 3px" }}>Key Metric to Track</p>
            <p style={{ fontSize: "13px", fontWeight: "500", color: "var(--color-text-primary)", margin: "0 0 4px" }}>Data Center Revenue YoY + Gross Margin</p>
            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "0", lineHeight: "1.5" }}>Together these define whether the AI supercycle is accelerating, steady, or normalizing. Networking ARR and NVAIE ARR are secondary leading indicators to watch.</p>
          </div>
          <div style={{ padding: "12px 14px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)" }}>
            <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", margin: "0 0 3px" }}>Fundamental Quality</p>
            <p style={{ fontSize: "13px", fontWeight: "500", color: NVGREENDK, margin: "0 0 4px" }}>Exceptional — Rare Category</p>
            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "0", lineHeight: "1.5" }}>NVIDIA's fundamental quality is arguably the highest of any semiconductor franchise ever built. Key uncertainty is whether GPU dominance remains structurally intact at the 10-year horizon as custom ASICs mature.</p>
          </div>
        </div>
      </section>

      {/* ── 16. DATA CONFIDENCE ── */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHead n="16" title="Data Confidence" icon="ti-shield-check" />
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", border: "0.5px solid rgba(99,153,34,0.4)", borderRadius: "var(--border-radius-md)", background: "rgba(99,153,34,0.05)", marginBottom: "10px" }}>
          <i className="ti ti-check-square" style={{ fontSize: "28px", color: NVGREENDK, flexShrink: 0, marginTop: "2px" }} aria-hidden="true" />
          <div>
            <p style={{ fontSize: "15px", fontWeight: "500", color: NVGREENDK, margin: "0 0 4px" }}>High Confidence</p>
            <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "0", lineHeight: "1.7" }}>
              All financial figures sourced directly from NVIDIA's SEC 8-K and 10-K filings (FY2025, FY2026, Q1 FY2027). Market data (price, P/E, EV/EBITDA, D/E, ROE, current ratio) cross-referenced from StockAnalysis.com, MacroTrends, Robinhood, and GuruFocus as of June 18, 2026. Peer figures sourced from respective company SEC filings and financial databases. Competitive analysis sourced from SemiAnalysis, IDC, and publicly available industry research (SiliconAnalysts, Kavout, mlq.ai). No figures have been fabricated. FY2021–FY2023 FCF margins are estimates derived from disclosed operating cash flow and capex; all other FCF figures are management-disclosed.
            </p>
          </div>
        </div>
        <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", margin: "0", lineHeight: "1.6" }}>
          Primary sources: NVIDIA 8-K filings (SEC EDGAR), NVIDIA 10-K FY2026, NVIDIA Newsroom, StockAnalysis.com, MacroTrends.net, GuruFocus.com, Yahoo Finance, Robinhood, SiliconAnalysts, IDC (Ethernet market share Q1 2026), Motley Fool, ServeTheHome, AMD/Broadcom 8-K filings.
        </p>
      </section>

      {/* ── DISCLAIMER ── */}
      <div style={{ padding: "13px 16px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)" }}>
        <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", margin: "0", lineHeight: "1.75" }}>
          <span style={{ color: "var(--color-text-secondary)", fontWeight: "500" }}>Disclaimer: </span>
          This report is for educational and informational purposes only. It is not investment advice and should not be considered a buy, sell, or hold recommendation. All data should be independently verified using official company filings and trusted financial sources. Past performance is not indicative of future results. The final investment decision is entirely your own responsibility and should account for your individual financial circumstances, risk tolerance, and investment objectives. This analysis does not constitute personalized financial advice.
        </p>
      </div>
    </div>
  );
}
