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
// 2026-07-10 lead-gen device upgrade: the result now diagnoses WHICH lever
// dominates (獲得 vs 商談化) and renders a recommended setup + a matched
// customer case, the demo link carries the diagnostic inputs, and the result
// can be copied / printed (browser print → PDF).

const CHAT_CAPTURE_RATE = 0.015; // 去る訪問者のうち会話でリード化できる割合（保守的）
const BENCH_MEETING_RATE = 60; // 利用企業の商談化率ベンチ（%）

type Lang = "ja" | "en";
type RecoKey = "base" | "convert" | "full";

type RecoCard = { title: string; price: string; products: string; why: string };
type CaseCard = { name: string; metric: string; line: string; href: string };

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
    missLine: "いま毎月、これだけの商談を取りこぼしている可能性があります（試算）。",
    summaryPre: (cur: string) => `現状 ${cur} 件/月 → Meeton ai 試算 `,
    summaryBold: (wth: string) => `${wth} 件/月`,
    summaryMult: (m: string) => `（約 ${m} 倍）`,
    acqTitle: "① 獲得の余地",
    acqDesc: (leads: string) => `去る訪問者を会話で掴む → +${leads} リード相当`,
    convTitle: "② 商談化の余地",
    convDesc: (from: number, to: number) => `商談化率 ${from}% → ${to}% へ`,
    breakdownValue: (v: string) => `+${v} 商談/月`,
    recoEyebrow: "この結果に効く推奨構成",
    recoCta: "この構成の料金を見る",
    recoHref: () => pricingUrl(),
    reco: {
      base: {
        title: "基本プラン「リード獲得」",
        price: "¥15万〜/月",
        products: "Chat + Ads + Library",
        why: "伸びしろの中心は「獲得」。黙って去る訪問者を会話とサイト内広告で掴むのが、最初の一手です。",
      },
      convert: {
        title: "基本＋商談化アドオン",
        price: "¥20万〜/月",
        products: "Chat + Ads + Library + Calendar",
        why: "リードは獲れています。伸びしろの中心は「商談化」— 温度が高い瞬間に予約まで運ぶ導線が効きます。",
      },
      full: {
        title: "フル構成（＋追客）",
        price: "¥25万〜/月",
        products: "Chat + Ads + Library + Calendar + Email",
        why: "獲得と商談化の両方に伸びしろがあります。掴む→育てる→商談化→追客の4ステージ全体で回収します。",
      },
    } satisfies Record<RecoKey, RecoCard>,
    caseEyebrow: "同じ課題を解いた事例",
    caseCta: "事例を読む →",
    cases: {
      base: {
        name: "BizteX 株式会社（SaaS）",
        metric: "チャット経由リード 20倍+",
        line: "従来は月1〜2件 → Meeton ai で月20件以上。去る訪問者を会話で掴んだ事例。",
        href: "/cases/biztex-chat-leads-10x/",
      },
      convert: {
        name: "研修業界リーダー（人材・研修）",
        metric: "商談化率 60%超",
        line: "Meeton ai 経由のお客様は育った状態で問い合わせる。業界平均約20%の約3倍の商談化率。",
        href: "/cases/edulinx-ai-chat-40-percent/",
      },
      full: {
        name: "株式会社G-gen（IT・クラウド）",
        metric: "月間SQL 2倍",
        line: "検討層の早期特定→IS直結で月間SQLが約20件から41〜48件に。商談化率80%。",
        href: "/cases/g-gen-inside-sales-sql-2x/",
      },
    } satisfies Record<RecoKey, CaseCard>,
    ctaHeadingEnterprise: "規模が大きいので、設計から相談がおすすめ。",
    ctaHeading: "この診断結果を持って、デモで具体化する。",
    ctaDemo: "この結果でデモを予約",
    ctaPricing: "料金を見る",
    ctaTrial: "この結果でデモを予約",
    copyBtn: "結果をコピー",
    copiedToast: "コピーしました",
    printBtn: "印刷 / PDF保存",
    proof: "実例: 商談化率60%+の導入事例を見る →",
    proofHref: "/cases/",
    copyHeader: "【Meeton ai 商談化の余地 診断結果】",
    copyInputs: (v: string, c: string, m: string) => `入力: 月間訪問 ${v} / CV率 ${c}% / 商談化率 ${m}%`,
    copyResult: (extra: string, cur: string, wth: string) => `商談化の余地: +${extra} 商談/月（現状 ${cur} → 試算 ${wth}）`,
    copyReco: (title: string, price: string) => `推奨構成: ${title}（${price}）`,
    copyFooter: "詳細: https://dynameet.ai/tools/roi/ ※試算（参考値）",
  },
  en: {
    visitsLabel: "Monthly website visits",
    cvrLabel: "Current inquiry / form conversion rate (%)",
    meetingRateLabel: "Current lead-to-meeting rate (%)",
    note: (rate: string, bench: number) =>
      `Estimate only. We assume AI chat turns ${rate}% of leaving visitors into leads, and lifts your lead-to-meeting rate up to the customer benchmark (max ${bench}%). Actual results vary with execution.`,
    resultEyebrow: "Meeting upside (estimate)",
    meetingsUnit: " meetings/mo",
    missLine: "This is roughly how many meetings your site may be leaving on the table each month (estimate).",
    summaryPre: (cur: string) => `Now ${cur}/mo → with Meeton ai `,
    summaryBold: (wth: string) => `${wth}/mo`,
    summaryMult: (m: string) => ` (≈${m}×)`,
    acqTitle: "① Acquisition upside",
    acqDesc: (leads: string) => `Capture leaving visitors in conversation → +${leads} leads`,
    convTitle: "② Conversion upside",
    convDesc: (from: number, to: number) => `Meeting rate ${from}% → ${to}%`,
    breakdownValue: (v: string) => `+${v} mtgs/mo`,
    recoEyebrow: "Recommended setup for this result",
    recoCta: "See pricing for this setup",
    recoHref: () => "/en/pricing/",
    reco: {
      base: {
        title: "Base plan: Lead Acquisition",
        price: "From ¥150,000/mo",
        products: "Chat + Ads + Library",
        why: "Your biggest upside is acquisition — capturing visitors who currently leave in silence, with conversation and on-site ads.",
      },
      convert: {
        title: "Base + Meeting Booking add-on",
        price: "From ¥200,000/mo",
        products: "Chat + Ads + Library + Calendar",
        why: "You're capturing leads already. Your biggest upside is conversion — carrying leads to a booked meeting the moment intent peaks.",
      },
      full: {
        title: "Full stack (+ win-back)",
        price: "From ¥250,000/mo",
        products: "Chat + Ads + Library + Calendar + Email",
        why: "You have upside on both acquisition and conversion. All four stages — capture, nurture, convert, win back — work together here.",
      },
    } satisfies Record<RecoKey, RecoCard>,
    caseEyebrow: "A customer who solved the same problem",
    caseCta: "Read the story →",
    cases: {
      base: {
        name: "BizteX Inc. (SaaS)",
        metric: "20x+ chat-sourced leads",
        line: "From 1–2 leads a month to 20+ — capturing visitors who used to leave in silence.",
        href: "/en/cases/biztex-chat-leads-10x/",
      },
      convert: {
        name: "EdulinX, Inc. (corporate training)",
        metric: "60%+ meeting conversion",
        line: "Leads arrive already nurtured — about 3x the ~20% industry-average meeting conversion.",
        href: "/en/cases/edulinx-ai-chat-40-percent/",
      },
      full: {
        name: "G-gen Co., Ltd. (IT & cloud)",
        metric: "2x monthly SQLs",
        line: "Early identification of in-market visitors routed straight to inside sales — SQLs doubled with 80% meeting conversion.",
        href: "/en/cases/g-gen-inside-sales-sql-2x/",
      },
    } satisfies Record<RecoKey, CaseCard>,
    ctaHeadingEnterprise: "At this scale, a guided setup gets you there faster.",
    ctaHeading: "Turn this result into a concrete plan.",
    ctaDemo: "Book a demo with this result",
    ctaPricing: "See pricing",
    ctaTrial: "Start 1-month free trial",
    copyBtn: "Copy result",
    copiedToast: "Copied",
    printBtn: "Print / save as PDF",
    proof: "See the customer stories behind these numbers →",
    proofHref: "/en/cases/",
    copyHeader: "[Meeton ai — meeting upside estimate]",
    copyInputs: (v: string, c: string, m: string) => `Inputs: ${v} visits/mo / CVR ${c}% / meeting rate ${m}%`,
    copyResult: (extra: string, cur: string, wth: string) => `Meeting upside: +${extra}/mo (now ${cur} → estimated ${wth})`,
    copyReco: (title: string, price: string) => `Recommended setup: ${title} (${price})`,
    copyFooter: "Details: https://dynameet.ai/en/tools/roi/ — estimate only.",
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

/** Append the diagnostic inputs to a CTA URL so sales sees the visitor's
 *  self-reported numbers on the booking (arrives as plain query params). */
function withRoiParams(url: string, p: { visits: number; cvr: number; meetingRate: number; extra: number }): string {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}roi_visits=${p.visits}&roi_cvr=${p.cvr}&roi_rate=${p.meetingRate}&roi_upside=${Math.round(p.extra)}`;
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
  const [copied, setCopied] = useState(false);
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

  // Weak-point diagnosis: which lever dominates the upside decides the
  // recommended setup (獲得優位→基本 / 商談化優位→+Calendar / 拮抗→フル).
  const recoKey: RecoKey = useMemo(() => {
    if (r.extraMeetings <= 0) return "base";
    const acqShare = r.meetingsFromAcquisition / r.extraMeetings;
    if (acqShare >= 0.6) return "base";
    if (acqShare <= 0.35) return "convert";
    return "full";
  }, [r.extraMeetings, r.meetingsFromAcquisition]);
  const reco = s.reco[recoKey];
  const caseCard = s.cases[recoKey];

  // result-tailored CTA: 大規模流入のみデモ寄り（席数/要件が絡むため）。
  // 規模はトラフィックで判定（試算商談数で判定すると小規模でも誤発火する）。
  const enterpriseScale = visits >= 50000;

  const onCta = (kind: "demo" | "pricing" | "trial" | "reco" | "case") => {
    track("roi_complete", {
      source: "tools-roi",
      cta: kind,
      reco: recoKey,
      visits, cvr, meeting_rate: meetingRate,
      extra_meetings: Math.round(r.extraMeetings),
    });
  };

  const copyText = [
    s.copyHeader,
    s.copyInputs(jp(visits), String(cvr), String(meetingRate)),
    s.copyResult(jp(r.extraMeetings), jp(r.currentMeetings), jp(r.withMeeton)),
    `  ${s.acqTitle}: +${jp(r.meetingsFromAcquisition)}${s.meetingsUnit}`,
    `  ${s.convTitle}: +${jp(r.meetingsFromConversion)}${s.meetingsUnit}`,
    s.copyReco(reco.title, reco.price),
    s.copyFooter,
  ].join("\n");

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      track("roi_copy", { source: "tools-roi", reco: recoKey });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const onPrint = () => {
    track("roi_print", { source: "tools-roi", reco: recoKey });
    window.print();
  };

  const roiParams = { visits, cvr, meetingRate, extra: r.extraMeetings };

  // EN self-serve: primary = trial request, secondary = demo booking.
  // JA (unchanged): primary = demo booking, secondary = pricing.
  const primaryBtn = en
    ? { label: s.ctaTrial, href: trialUrl("tools-roi"), kind: "trial" as const, isDemo: false }
    : { label: s.ctaDemo, href: withRoiParams(demoUrl("tools-roi"), roiParams), kind: "demo" as const, isDemo: true };
  const secondaryBtn = en
    ? { label: s.ctaDemo, href: withRoiParams(demoUrl("tools-roi"), roiParams), kind: "demo" as const, isDemo: true }
    : { label: s.ctaPricing, href: pricingUrl(), kind: "pricing" as const, isDemo: false };

  const primaryStyle: React.CSSProperties = { flex: "1 1 auto", textAlign: "center", background: "var(--cta)", color: "var(--on-cta)", padding: "13px 22px", borderRadius: 12, fontSize: 15, fontWeight: 800, textDecoration: "none", boxShadow: "0 6px 22px var(--cta-glow)" };
  const ghostStyle: React.CSSProperties = { flex: "1 1 auto", textAlign: "center", background: "transparent", color: "#fff", padding: "13px 22px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", border: "1.5px solid var(--on-navy-border)" };
  const utilBtn: React.CSSProperties = { background: "transparent", border: "1px solid var(--on-navy-border)", color: "var(--on-navy-sub)", borderRadius: 9, padding: "7px 14px", fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "var(--fb)" };

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

      {/* Result + recommendation + matched case */}
      <div>
        <div style={{ background: "var(--navy)", borderRadius: 16, padding: 28, color: "var(--on-navy)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", color: "var(--cta)" }}>{s.resultEyebrow}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" style={utilBtn} onClick={onCopy}>{copied ? s.copiedToast : s.copyBtn}</button>
              <button type="button" style={utilBtn} onClick={onPrint}>{s.printBtn}</button>
            </div>
          </div>
          <div style={{ fontFamily: "var(--fd)", fontSize: "clamp(40px,7vw,64px)", fontWeight: 800, lineHeight: 1.05, margin: "8px 0 4px" }}>
            +{jp(r.extraMeetings)}<span style={{ fontSize: 22, fontWeight: 700 }}>{s.meetingsUnit}</span>
          </div>
          <div style={{ fontSize: 14, color: "var(--on-navy-sub)", marginBottom: 6 }}>
            {s.summaryPre(jp(r.currentMeetings))}<b style={{ color: "var(--on-navy)" }}>{s.summaryBold(jp(r.withMeeton))}</b>
            {r.multiple >= 1.5 && <>{s.summaryMult(r.multiple.toFixed(1))}</>}
          </div>
          <div style={{ fontSize: 12.5, color: "var(--on-navy-sub)", marginBottom: 20 }}>{s.missLine}</div>

          <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
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

          {/* Recommended setup — driven by which lever dominates */}
          <div style={{ background: "var(--navy-2)", border: "1px solid var(--cta)", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
            <div style={{ fontFamily: "var(--fm)", fontSize: 11, fontWeight: 700, letterSpacing: ".08em", color: "var(--cta)", marginBottom: 6 }}>{s.recoEyebrow}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{reco.title}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "var(--cta)", whiteSpace: "nowrap" }}>{reco.price}</div>
            </div>
            <div style={{ fontSize: 12, color: "var(--cta)", fontWeight: 700, margin: "4px 0 6px" }}>{reco.products}</div>
            <p style={{ fontSize: 12.5, color: "var(--on-navy-sub)", lineHeight: 1.7, margin: 0 }}>{reco.why}</p>
            <Link href={s.recoHref()} onClick={() => onCta("reco")} style={{ display: "inline-block", marginTop: 10, fontSize: 12.5, fontWeight: 800, color: "var(--cta)", textDecoration: "underline" }}>
              {s.recoCta}
            </Link>
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

        {/* matched case: the customer story that solved this exact weak point */}
        <Link href={caseCard.href} onClick={() => onCta("case")} style={{ display: "block", marginTop: 14, background: "#fff", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 18px", textDecoration: "none" }}>
          <div style={{ fontFamily: "var(--fm)", fontSize: 11, fontWeight: 700, letterSpacing: ".08em", color: "var(--cta-ink)", marginBottom: 6 }}>{s.caseEyebrow}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14.5, fontWeight: 800, color: "var(--heading)" }}>{caseCard.name}</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: "var(--cta-ink)", whiteSpace: "nowrap" }}>{caseCard.metric}</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--text)", margin: "6px 0 8px" }}>{caseCard.line}</p>
          <span style={{ fontSize: 12.5, fontWeight: 800, color: "var(--cta-ink)" }}>{s.caseCta}</span>
        </Link>

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
