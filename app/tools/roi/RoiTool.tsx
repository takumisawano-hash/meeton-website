"use client";

import { useEffect, useMemo, useState } from "react";
import { signupUrl, demoUrl } from "@/app/lib/cta-urls";

// Client-side ROI / 商談化の余地 calculator (§2.6). Two-stage model:
//   ① 獲得の余地  = いま黙って去る訪問者を会話で掴む分
//   ② 商談化の余地 = 集めたリードの商談化率を引き上げる分
// Benchmarks are grounded in real cases (利用企業の商談化率 ~60% vs 業界平均
// ~20%). Conservative, transparent, and user-adjustable. All values are
// 試算（参考値）— labeled as such so it never reads as a guarantee.

const CHAT_CAPTURE_RATE = 0.015; // 去る訪問者のうち会話でリード化できる割合（保守的）
const BENCH_MEETING_RATE = 60; // 利用企業の商談化率ベンチ（%）

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

export default function RoiTool() {
  const [visits, setVisits] = useState(10000);
  const [cvr, setCvr] = useState(1); // 現状の問い合わせ/フォームCV率 %
  const [meetingRate, setMeetingRate] = useState(20); // 現状の商談化率 %
  const [email, setEmail] = useState("");
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

  // result-tailored CTA: 大規模流入 → デモ寄り、それ以外 → 無料登録寄り
  const enterpriseScale = visits >= 100000 || r.extraMeetings >= 50;

  const onCta = (kind: "signup" | "demo") => {
    track("roi_complete", {
      source: "tools-roi",
      cta: kind,
      visits, cvr, meeting_rate: meetingRate,
      extra_meetings: Math.round(r.extraMeetings),
      has_email: email.length > 3,
    });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: narrow ? "1fr" : "minmax(0,1fr) minmax(0,1.1fr)", gap: 24, alignItems: "start" }}>
      {/* Inputs */}
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 16, padding: 28, display: "grid", gap: 22 }}>
        <div style={fieldWrap}>
          <label style={labelS}>月間サイト訪問数</label>
          <input style={inputS} type="number" min={0} value={visits} onChange={(e) => setVisits(Number(e.target.value) || 0)} />
          <input type="range" min={500} max={300000} step={500} value={Math.min(visits, 300000)} onChange={(e) => setVisits(Number(e.target.value))} style={{ accentColor: "var(--cta)" }} />
        </div>
        <div style={fieldWrap}>
          <label style={labelS}>現状の問い合わせ・フォームCV率（%）</label>
          <input style={inputS} type="number" min={0} max={100} step={0.1} value={cvr} onChange={(e) => setCvr(Number(e.target.value) || 0)} />
          <input type="range" min={0.1} max={10} step={0.1} value={Math.min(cvr, 10)} onChange={(e) => setCvr(Number(e.target.value))} style={{ accentColor: "var(--cta)" }} />
        </div>
        <div style={fieldWrap}>
          <label style={labelS}>現状の商談化率（リード→商談, %）</label>
          <input style={inputS} type="number" min={0} max={100} step={1} value={meetingRate} onChange={(e) => setMeetingRate(Number(e.target.value) || 0)} />
          <input type="range" min={1} max={80} step={1} value={Math.min(meetingRate, 80)} onChange={(e) => setMeetingRate(Number(e.target.value))} style={{ accentColor: "var(--cta)" }} />
        </div>
        <p style={{ fontSize: 12, color: "var(--sub)", margin: 0, lineHeight: 1.7 }}>
          ※ 試算（参考値）。去る訪問者の{(CHAT_CAPTURE_RATE * 100).toFixed(1)}%を会話でリード化、商談化率は利用企業ベンチ（最大{BENCH_MEETING_RATE}%）を上限に試算。実値は運用で変動します。
        </p>
      </div>

      {/* Result */}
      <div style={{ background: "var(--navy)", borderRadius: 16, padding: 28, color: "var(--on-navy)" }}>
        <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", color: "var(--cta)" }}>商談化の余地（試算）</div>
        <div style={{ fontFamily: "var(--fd)", fontSize: "clamp(40px,7vw,64px)", fontWeight: 800, lineHeight: 1.05, margin: "8px 0 4px" }}>
          +{jp(r.extraMeetings)}<span style={{ fontSize: 22, fontWeight: 700 }}> 商談/月</span>
        </div>
        <div style={{ fontSize: 14, color: "var(--on-navy-sub)", marginBottom: 20 }}>
          現状 {jp(r.currentMeetings)} 件/月 → Meeton ai 試算 <b style={{ color: "var(--on-navy)" }}>{jp(r.withMeeton)} 件/月</b>
          {r.multiple >= 1.5 && <>（約 {r.multiple.toFixed(1)} 倍）</>}
        </div>

        <div style={{ display: "grid", gap: 10, marginBottom: 22 }}>
          {[
            { t: "① 獲得の余地", d: `去る訪問者を会話で掴む → +${jp(r.extraLeads)} リード相当`, v: `+${jp(r.meetingsFromAcquisition)} 商談/月` },
            { t: "② 商談化の余地", d: `商談化率 ${meetingRate}% → ${Math.round(r.targetRate)}% へ`, v: `+${jp(r.meetingsFromConversion)} 商談/月` },
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
            {enterpriseScale ? "規模が大きいので、設計から相談がおすすめ。" : "この余地を、無料で動かし始める。"}
          </div>
          <input
            style={{ ...inputS, marginBottom: 10 }}
            type="email"
            placeholder="メールアドレス（任意・結果の控えに）"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href={signupUrl("tools-roi") + (email ? `&email=${encodeURIComponent(email)}` : "")}
              onClick={() => onCta("signup")}
              style={{ flex: "1 1 auto", textAlign: "center", background: "var(--cta)", color: "#04231a", padding: "13px 22px", borderRadius: 12, fontSize: 15, fontWeight: 800, textDecoration: "none", boxShadow: "0 6px 22px var(--cta-glow)" }}
            >
              無料で始める
            </a>
            <a
              href={demoUrl("tools-roi")}
              onClick={() => onCta("demo")}
              style={{ flex: "1 1 auto", textAlign: "center", background: "transparent", color: "#fff", padding: "13px 22px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", border: "1.5px solid var(--on-navy-border)" }}
            >
              デモを予約
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
