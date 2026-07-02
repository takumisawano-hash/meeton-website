"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { demoUrl, pricingUrl, trialUrl, openDemoCalendarInPlace } from "@/app/lib/cta-urls";

// Client-side ROI / 商談化の余地 calculator (§2.6). Two-stage model:
//   ① 獲得の余地  = いま黙って去る訪問者を会話で掴む分
//   ② 商談化の余地 = 集めたリードの商談化率を引き上げる分
// Benchmarks are grounded in real cases (利用企業の商談化率 ~60% vs 業界平均
// ~20%). Conservative, transparent, and user-adjustable. All values are
// 試算（参考値）— labeled as such so it never reads as a guarantee.
// Bilingual: `lang` (JA default) switches every user-visible string via the
// STR table; numbers/formulas are identical across locales. JA omits the prop
// → byte-identical output. 2026-07-02 EN self-serve pivot: on lang="en" the
// PRIMARY result CTA is the 1-month free trial; demo becomes the secondary.

const CHAT_CAPTURE_RATE = 0.015; // 去る訪問者のうち会話でリード化できる割合（保守的）
const BENCH_MEETING_RATE = 60; // 利用企業の商談化率ベンチ（%）

type Lang = "ja" | "en";

// All user-visible copy. Functions take pre-formatted numbers so the formulas
// stay in the component and never fork per-locale.
const STR = {
  ja: {
    visitsLabel: "月間サイト訪問数",
    cvrLabel: "現状の問い合わせ・フォームCV率（%）",
    meetingRateLabel: "現状の商談化率（リード→商談, %）",
    note: (rate: string, bench: number) =>
      `※ 試算（参考値）。去る訪問者の${rate}%を会話でリード化、商談化率は利用企業ベンチ（最大${bench}%）を上限に試算。実値は運用で変動します。`,
    resultEyebrow: "商談化の余地（試算）",
    meetingsUnit: " 商談/月",
    summaryPre: (cur: string) => `現状 ${cur} 件/月 → Meeton ai 試算 `,
    summaryBold: (wth: string) => `${wth} 件/月`,
    summaryMult: (m: string) => `（約 ${m} 倍）`,
    acqTitle: "① 獲得の余地",
    acqDesc: (leads: string) => `去る訪問者を会話で掴む → +${leads} リード相当`,
    convTitle: "② 商談化の余地",
    convDesc: (from: number, to: number) => `商談化率 ${from}% → ${to}% へ`,
    breakdownValue: (v: string) => `+${v} 商談/月`,
    ctaHeadingEnterprise: "規模が大きいので、設計から相談がおすすめ。",
    ctaHeading: "この余地を、デモで具体化する。",
    ctaDemo: "デモを予約",
    ctaPricing: "料金を見る",
    ctaTrial: "デモを予約",
    proof: "実例: 商談化率60%+の導入事例を見る →",
    proofHref: "/cases/",
  },
  en: {
    visitsLabel: "Monthly website visits",
    cvrLabel: "Current inquiry / form conversion rate (%)",
    meetingRateLabel: "Current lead-to-meeting rate (%)",
    note: (rate: string, bench: number) =>
      `Estimate only. We assume AI chat turns ${rate}% of leaving visitors into leads, and lifts your lead-to-meeting rate up to the customer benchmark (max ${bench}%). Actual results vary with execution.`,
    resultEyebrow: "Meeting upside (estimate)",
    meetingsUnit: " meetings/mo",
    summaryPre: (cur: string) => `Now ${cur}/mo → with Meeton ai `,
    summaryBold: (wth: string) => `${wth}/mo`,
    summaryMult: (m: string) => ` (≈${m}×)`,
    acqTitle: "① Acquisition upside",
    acqDesc: (leads: string) => `Capture leaving visitors in conversation → +${leads} leads`,
    convTitle: "② Conversion upside",
    convDesc: (from: number, to: number) => `Meeting rate ${from}% → ${to}%`,
    breakdownValue: (v: string) => `+${v} mtgs/mo`,
    ctaHeadingEnterprise: "At this scale, a guided setup gets you there faster.",
    ctaHeading: "Turn this upside into a concrete plan.",
    ctaDemo: "Book a demo",
    ctaPricing: "See pricing",
    ctaTrial: "Start 1-month free trial",
    proof: "See the customer stories behind these numbers →",
    proofHref: "/en/cases/",
  },
} as const;

function track(event: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag === "function") w.gtag("event", event, params);
  else w.dataLayer.push({ event, ...params });
}

function jp(n: number) {
  return Math.round(n).toLocaleString("ja-JP");
}

const fieldWrap: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 8 };
const labelS: React.CSSProperties = { fontSize: 14, fontWeight: 700, color: "var(--heading)" };
const inputS: React.CSSProperties = {
  width: "100%", padding: "12px 14px", fontSize: 16, fontWeight: 700, color: "var(--heading)",
  border: "1.5px solid var(--border2)", borderRadius: 10, background: "#fff", fontFamily: "var(--fb)",
};

export default function RoiTool({ lang = "ja" }: { lang?: Lang }) {
  const s = STR[lang];
  const en = lang === "en";
  const [visits, setVisits] = useState(10000);
  const [cvr, setCvr] = useState(1); // 現状の問い合わせ/フォームCV率 %
  const [meetingRate, setMeetingRate] = useState(20); // 現状の商談化率 %
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const check = () => setNarrow(window.innerWidth < 860);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const r = useMemo(() => {
    const v = Math.max(0, visits);
    const currentLeads = (v * cvr) / 100;
    const currentMeetings = (currentLeads * meetingRate) / 100;
    // ② 商談化の余地: 現状→ベンチ(上限60%)へ。下げない。
    const targetRate = Math.min(BENCH_MEETING_RATE, Math.max(meetingRate, meetingRate * 2));
    const meetingsFromConversion = (currentLeads * Math.max(0, targetRate - meetingRate)) / 100;
    // ① 獲得の余地: 去る訪問者(=非CV)を会話で掴む
    const lostVisitors = v * (1 - cvr / 100);
    const extraLeads = lostVisitors * CHAT_CAPTURE_RATE;
    const meetingsFromAcquisition = (extraLeads * targetRate) / 100;
    const extraMeetings = meetingsFromConversion + meetingsFromAcquisition;
    const withMeeton = currentMeetings + extraMeetings;
    return {
      currentLeads, currentMeetings, targetRate,
      meetingsFromConversion, extraLeads, meetingsFromAcquisition,
      extraMeetings, withMeeton,
      multiple: currentMeetings > 0 ? withMeeton / currentMeetings : 0,
    };
  }, [visits, cvr, meetingRate]);

  // result-tailored CTA: 大規模流入のみデモ寄り（席数/要件が絡むため）。
  // 規模はトラフィックで判定（試算商談数で判定すると小規模でも誤発火する）。
  const enterpriseScale = visits >= 50000;

  const onCta = (kind: "demo" | "pricing" | "trial") => {
    track("roi_complete", {
      source: "tools-roi",
      cta: kind,
      visits, cvr, meeting_rate: meetingRate,
      extra_meetings: Math.round(r.extraMeetings),
    });
  };

  // EN self-serve: primary = trial request, secondary = demo booking.
  // JA (unchanged): primary = demo booking, secondary = pricing.
  const primaryBtn = en
    ? { label: s.ctaTrial, href: trialUrl("tools-roi"), kind: "trial" as const, isDemo: false }
    : { label: s.ctaDemo, href: demoUrl("tools-roi"), kind: "demo" as const, isDemo: true };
  const secondaryBtn = en
    ? { label: s.ctaDemo, href: demoUrl("tools-roi"), kind: "demo" as const, isDemo: true }
    : { label: s.ctaPricing, href: pricingUrl(), kind: "pricing" as const, isDemo: false };

  const primaryStyle: React.CSSProperties = { flex: "1 1 auto", textAlign: "center", background: "var(--cta)", color: "var(--on-cta)", padding: "13px 22px", borderRadius: 12, fontSize: 15, fontWeight: 800, textDecoration: "none", boxShadow: "0 6px 22px var(--cta-glow)" };
  const ghostStyle: React.CSSProperties = { flex: "1 1 auto", textAlign: "center", background: "transparent", color: "#fff", padding: "13px 22px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", border: "1.5px solid var(--on-navy-border)" };

  return (
    <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "minmax(0,1fr) minmax(0,1.1fr)", gap: 24, alignItems: "start" }}>
      {/* Inputs */}
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, padding: 28, display: "grid", gap: 22 }}>
        <div style={fieldWrap}>
          <label style={labelS}>{s.visitsLabel}</label>
          <input style={inputS} type="number" min={0} value={visits} onChange={(e) => setVisits(Number(e.target.value) || 0)} />
          <input type="range" min={500} max={300000} step={500} value={Math.min(visits, 300000)} onChange={(e) => setVisits(Number(e.target.value))} style={{ accentColor: "var(--cta)" }} />
        </div>
        <div style={fieldWrap}>
          <label style={labelS}>{s.cvrLabel}</label>
          <input style={inputS} type="number" min={0} max={100} step={0.1} value={cvr} onChange={(e) => setCvr(Number(e.target.value) || 0)} />
          <input type="range" min={0.1} max={10} step={0.1} value={Math.min(cvr, 10)} onChange={(e) => setCvr(Number(e.target.value))} style={{ accentColor: "var(--cta)" }} />
        </div>
        <div style={fieldWrap}>
          <label style={labelS}>{s.meetingRateLabel}</label>
          <input style={inputS} type="number" min={0} max={100} step={1} value={meetingRate} onChange={(e) => setMeetingRate(Number(e.target.value) || 0)} />
          <input type="range" min={1} max={80} step={1} value={Math.min(meetingRate, 80)} onChange={(e) => setMeetingRate(Number(e.target.value))} style={{ accentColor: "var(--cta)" }} />
        </div>
        <p style={{ fontSize: 12, color: "var(--sub)", margin: 0, lineHeight: 1.7 }}>
          {s.note((CHAT_CAPTURE_RATE * 100).toFixed(1), BENCH_MEETING_RATE)}
        </p>
      </div>

      {/* Result + proof link */}
      <div>
        <div style={{ background: "var(--navy)", borderRadius: 16, padding: 28, color: "var(--on-navy)" }}>
          <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", color: "var(--cta)" }}>{s.resultEyebrow}</div>
          <div style={{ fontFamily: "var(--fd)", fontSize: "clamp(40px,7vw,64px)", fontWeight: 800, lineHeight: 1.05, margin: "8px 0 4px" }}>
            +{jp(r.extraMeetings)}<span style={{ fontSize: 22, fontWeight: 700 }}>{s.meetingsUnit}</span>
          </div>
          <div style={{ fontSize: 14, color: "var(--on-navy-sub)", marginBottom: 20 }}>
            {s.summaryPre(jp(r.currentMeetings))}<b style={{ color: "var(--on-navy)" }}>{s.summaryBold(jp(r.withMeeton))}</b>
            {r.multiple >= 1.5 && <>{s.summaryMult(r.multiple.toFixed(1))}</>}
          </div>

          <div style={{ display: "grid", gap: 10, marginBottom: 22 }}>
            {[
              { t: s.acqTitle, d: s.acqDesc(jp(r.extraLeads)), v: s.breakdownValue(jp(r.meetingsFromAcquisition)) },
              { t: s.convTitle, d: s.convDesc(meetingRate, Math.round(r.targetRate)), v: s.breakdownValue(jp(r.meetingsFromConversion)) },
            ].map((x) => (
              <div key={x.t} style={{ display: "flex", justifyContent: "space-between", gap: 12, background: "var(--navy-2)", border: "1px solid var(--on-navy-border)", borderRadius: 12, padding: "12px 14px" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800 }}>{x.t}</div>
                  <div style={{ fontSize: 12, color: "var(--on-navy-sub)" }}>{x.d}</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "var(--cta)", whiteSpace: "nowrap" }}>{x.v}</div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--on-navy-border)", paddingTop: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>
              {enterpriseScale ? s.ctaHeadingEnterprise : s.ctaHeading}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href={primaryBtn.href}
                onClick={(e) => {
                  onCta(primaryBtn.kind);
                  if (primaryBtn.isDemo && openDemoCalendarInPlace()) e.preventDefault();
                }}
                className="v2-cta-primary"
                style={primaryStyle}
              >
                {primaryBtn.label}
              </a>
              <a
                href={secondaryBtn.href}
                onClick={(e) => {
                  onCta(secondaryBtn.kind);
                  if (secondaryBtn.isDemo && openDemoCalendarInPlace()) e.preventDefault();
                }}
                className="v2-cta-ghost"
                style={ghostStyle}
              >
                {secondaryBtn.label}
              </a>
            </div>
          </div>
        </div>

        {/* proof: link the estimate to real customer outcomes */}
        <div style={{ textAlign: "center", marginTop: 14, fontSize: 13 }}>
          <Link href={s.proofHref} style={{ color: "var(--cta-ink)", textDecoration: "underline", fontWeight: 700 }}>
            {s.proof}
          </Link>
        </div>
      </div>
    </div>
  );
}
