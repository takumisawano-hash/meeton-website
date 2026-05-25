"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Footer from "@/app/components/Footer";
const HubSpotMeetingModal = dynamic(() => import("@/app/components/HubSpotMeetingModal"), { ssr: false });

type CaseCard = {
  slug: string;
  name: string;
  industry: string;
  quote?: string | null;
  quotePerson?: string | null;
  heroMetric?: string | null;
  heroMetricLabel?: string | null;
  heroImage?: string | null;
  stats: Array<{ value?: string; label?: string }>;
};

type Props = {
  cases: CaseCard[];
};

const css = `
:root {
  --bg:#ffffff;--surface:#f4f6fb;--surface2:#eaedfa;
  --border:#dfe3f0;--border2:#c8cedf;
  --text:#4a506e;--heading:#0f1128;--sub:#6e7494;
  --cta:#12a37d;--cta-hover:#0fc19a;--cta-glow:rgba(18,163,125,.25);--cta-light:#e5f8f2;
  --accent:#7c5cfc;--accent-light:#f0ecfe;
  --pink:#d03ea1;--blue:#3b6ff5;--blue-light:#eaf0fe;--cyan:#0891b2;
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:'Hiragino Sans','Yu Gothic',var(--font-noto),'Noto Sans JP',sans-serif;font-size:17px;overflow-x:hidden;-webkit-font-smoothing:antialiased}

/* HERO */
.event-hero{padding:96px 24px 72px;background:linear-gradient(180deg,#f7f8ff 0%,#fff 100%);position:relative;overflow:hidden}
.event-hero::before{content:"";position:absolute;top:-120px;right:-120px;width:440px;height:440px;background:radial-gradient(circle,rgba(124,92,252,.12) 0%,transparent 70%);pointer-events:none}
.event-hero-inner{max-width:980px;margin:0 auto;text-align:center;position:relative;z-index:1}
.event-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;background:var(--accent-light);color:var(--accent);border-radius:100px;font-size:12px;font-weight:700;margin-bottom:28px;letter-spacing:.08em}
.event-eyebrow svg{flex-shrink:0}
.event-h1{font-size:48px;font-weight:800;color:var(--heading);line-height:1.28;margin-bottom:24px;letter-spacing:-.015em;max-width:840px;margin-left:auto;margin-right:auto}
.event-h1 strong{color:var(--accent)}
.event-sub{font-size:17px;color:var(--sub);line-height:1.85;max-width:680px;margin:0 auto 40px}
.event-meta{display:inline-flex;gap:24px;font-size:13px;color:var(--sub);align-items:center;flex-wrap:wrap;justify-content:center;padding-top:32px;border-top:1px solid var(--border);margin-top:8px}
.event-meta-item{display:flex;align-items:center;gap:8px}
.event-meta-item strong{color:var(--heading);font-weight:700}
.event-meta-divider{width:1px;height:14px;background:var(--border)}

/* EVENT BANNER — 澤野登壇の証拠 + Tier 2 思い出し補助 */
.event-banner-wrap{max-width:760px;margin:0 auto 32px;border-radius:18px;overflow:hidden;border:1px solid var(--border);box-shadow:0 16px 40px -20px rgba(15,17,40,.18);background:#fff}
.event-banner-img{display:block;width:100%;height:auto;object-fit:cover}

/* NO RECORDING CALLOUT — hero 直下、最重要文脈 */
.no-recording-callout{display:flex;gap:16px;align-items:flex-start;max-width:680px;margin:0 auto 32px;padding:20px 24px;background:#fff7e6;border:1.5px solid #f5d486;border-radius:14px;text-align:left;font-size:14px;line-height:1.75;color:#5b4419}
.no-recording-callout strong{color:#7a5a14;display:block;margin-bottom:4px;font-size:15px;font-weight:800}
.no-recording-icon{flex-shrink:0;width:38px;height:38px;border-radius:50%;background:#f5d486;color:#7a5a14;display:flex;align-items:center;justify-content:center}

/* HERO CTA — スライドDLのみ、診断 CTA はここに出さない */
.event-hero-cta{display:flex;justify-content:center;margin:0 auto 40px}

/* CTA buttons (shared) */
.btn{padding:14px 24px;border:none;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;transition:all .2s;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:inherit;line-height:1}
.btn-primary{background:var(--cta);color:#fff}
.btn-primary:hover{background:var(--cta-hover);transform:translateY(-1px);box-shadow:0 8px 20px var(--cta-glow)}
.btn-outline{background:transparent;color:var(--cta);border:1.5px solid var(--cta)}
.btn-outline:hover{background:var(--cta-light)}
.btn-arrow{font-size:18px;line-height:1}

/* SLIDES (anchor target) */
.slides-section{padding:80px 24px;background:#fff}
.slides-inner{max-width:880px;margin:0 auto}
.slides-title{text-align:center;font-size:30px;font-weight:800;color:var(--heading);margin-bottom:10px;letter-spacing:-.01em}
.slides-subtitle{text-align:center;color:var(--sub);font-size:15px;margin-bottom:36px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.7}
.slides-card{display:flex;gap:24px;align-items:center;padding:32px 32px;background:linear-gradient(135deg,#1a1d3a 0%,#0f1128 100%);color:#fff;border-radius:18px;flex-wrap:wrap}
.slides-card-icon{width:64px;height:64px;border-radius:14px;background:rgba(18,163,125,.18);color:#0fc19a;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.slides-card-body{flex:1;min-width:200px}
.slides-card-h{font-size:18px;font-weight:800;color:#fff;line-height:1.45;margin-bottom:6px;letter-spacing:-.005em}
.slides-card-desc{font-size:13px;color:#c8cedf;line-height:1.7}

/* LOSS (商談化ロス 5 つ) */
.loss-section{padding:88px 24px;background:#fff}
.loss-inner{max-width:1080px;margin:0 auto}
.loss-title{text-align:center;font-size:30px;font-weight:800;color:var(--heading);margin-bottom:10px;letter-spacing:-.01em}
.loss-subtitle{text-align:center;color:var(--sub);font-size:15px;margin-bottom:48px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.7}
.loss-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;max-width:880px;margin:0 auto}
@media (max-width:880px){.loss-grid{grid-template-columns:1fr;max-width:520px}}
.loss-item{display:flex;gap:14px;align-items:flex-start;padding:20px 22px;background:#fef6f6;border:1.5px solid #f5d4d4;border-radius:14px;font-size:14px;color:var(--heading);line-height:1.7;font-weight:700}
.loss-item-icon{flex-shrink:0;width:28px;height:28px;border-radius:50%;background:#e0475b;color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900}
.loss-item-text{flex:1}
.loss-item-text strong{display:block;color:var(--heading);font-weight:800;font-size:15px;margin-bottom:4px}
.loss-item-text span{font-weight:500;font-size:13px;color:var(--sub);line-height:1.7}

/* RECAP (Session 3 points) */
.recap-section{padding:88px 24px;background:var(--surface)}
.recap-inner{max-width:1080px;margin:0 auto}
.recap-title{text-align:center;font-size:30px;font-weight:800;color:var(--heading);margin-bottom:10px;letter-spacing:-.01em}
.recap-subtitle{text-align:center;color:var(--sub);font-size:15px;margin-bottom:48px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.7}
.recap-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media (max-width:880px){.recap-grid{grid-template-columns:1fr;max-width:520px;margin-left:auto;margin-right:auto}}
.recap-card{padding:32px 28px;background:#fff;border-radius:16px;border:1px solid var(--border);transition:all .25s}
.recap-card:hover{transform:translateY(-2px);box-shadow:0 12px 32px -16px rgba(0,0,0,.12);border-color:var(--border2)}
.recap-num{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:var(--accent);color:#fff;font-weight:900;font-size:16px;margin-bottom:18px}
.recap-h{font-size:18px;font-weight:800;color:var(--heading);margin-bottom:12px;line-height:1.45;letter-spacing:-.005em}
.recap-p{font-size:14px;color:var(--sub);line-height:1.8}

/* FEATURES (4 products) */
.features-section{padding:88px 24px;background:#fff}
.features-inner{max-width:1180px;margin:0 auto}
.features-title{text-align:center;font-size:30px;font-weight:800;color:var(--heading);margin-bottom:10px;letter-spacing:-.01em}
.features-subtitle{text-align:center;color:var(--sub);font-size:15px;margin-bottom:48px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.7}
.features-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
@media (max-width:1100px){.features-grid{grid-template-columns:repeat(2,1fr);gap:18px;max-width:720px;margin-left:auto;margin-right:auto}}
@media (max-width:600px){.features-grid{grid-template-columns:1fr;max-width:420px}}
.feature-card{padding:30px 24px;background:#fff;border:1px solid var(--border);border-radius:16px;position:relative;overflow:hidden;transition:all .3s;display:flex;flex-direction:column;gap:14px}
.feature-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--feat-color);opacity:0;transition:opacity .25s}
.feature-card:hover{transform:translateY(-4px);border-color:transparent;box-shadow:0 18px 40px -16px rgba(0,0,0,.12)}
.feature-card:hover::before{opacity:1}
.feature-icon{width:48px;height:48px;border-radius:12px;background:var(--feat-bg);color:var(--feat-color);display:flex;align-items:center;justify-content:center}
.feature-product-name{font-size:11px;color:var(--feat-color);font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-bottom:-6px}
.feature-name{font-size:17px;font-weight:800;color:var(--heading);line-height:1.4;letter-spacing:-.005em}
.feature-sub{font-size:13px;color:var(--sub);line-height:1.7;flex:1}
.feature-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;padding-top:14px;border-top:1px solid var(--border)}
.feature-list li{font-size:12px;color:var(--text);font-weight:600;display:flex;align-items:flex-start;gap:8px;line-height:1.5}
.feature-list li svg{flex-shrink:0;margin-top:2px;color:var(--feat-color)}

/* CASES */
.cases-section{padding:88px 24px;background:var(--surface)}
.cases-inner{max-width:1180px;margin:0 auto}
.cases-title{text-align:center;font-size:30px;font-weight:800;color:var(--heading);margin-bottom:10px;letter-spacing:-.01em}
.cases-subtitle{text-align:center;color:var(--sub);font-size:15px;margin-bottom:48px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.7}
.cases-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
@media (max-width:1024px){.cases-grid{grid-template-columns:repeat(2,1fr);max-width:720px;margin-left:auto;margin-right:auto}}
@media (max-width:680px){.cases-grid{grid-template-columns:1fr;max-width:420px}}
.case-card{background:#fff;border:1px solid var(--border);border-radius:16px;overflow:hidden;text-decoration:none;color:inherit;display:flex;flex-direction:column;transition:all .25s}
.case-card:hover{transform:translateY(-3px);box-shadow:0 18px 40px -16px rgba(18,163,125,.18);border-color:var(--cta)}
.case-img-wrap{position:relative;width:100%;aspect-ratio:16/10;background:linear-gradient(135deg,#eef1fb,#e3e8f5);overflow:hidden}
.case-img-wrap img{width:100%;height:100%;object-fit:cover;display:block}
.case-body{padding:24px 22px;display:flex;flex-direction:column;gap:10px;flex:1}
.case-industry{font-size:11px;color:var(--accent);font-weight:800;letter-spacing:.08em;text-transform:uppercase}
.case-name{font-size:18px;font-weight:800;color:var(--heading);line-height:1.4;letter-spacing:-.005em}
.case-metric-row{display:flex;align-items:baseline;gap:10px;padding:14px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin:4px 0}
.case-metric{font-size:36px;font-weight:900;color:var(--cta);line-height:1;letter-spacing:-.02em}
.case-metric-label{font-size:12px;color:var(--sub);font-weight:600;line-height:1.4}
.case-quote{font-size:13px;color:var(--text);line-height:1.75;flex:1}
.case-quote-person{font-size:11px;color:var(--sub);font-weight:600;margin-top:6px}
.case-link{font-size:13px;color:var(--cta);font-weight:700;display:inline-flex;align-items:center;gap:6px;margin-top:8px}

/* CLOSING CTA */
.cta-section{padding:96px 24px;background:linear-gradient(135deg,#1a1d3a 0%,#0f1128 100%);color:#fff;text-align:center;position:relative;overflow:hidden}
.cta-section::before{content:'';position:absolute;top:-200px;right:-200px;width:500px;height:500px;background:radial-gradient(circle,rgba(124,92,252,.18) 0%,transparent 70%);pointer-events:none}
.cta-section::after{content:'';position:absolute;bottom:-200px;left:-200px;width:500px;height:500px;background:radial-gradient(circle,rgba(18,163,125,.12) 0%,transparent 70%);pointer-events:none}
.cta-inner{max-width:760px;margin:0 auto;position:relative;z-index:1}
.cta-h{font-size:36px;font-weight:800;line-height:1.4;margin-bottom:18px;letter-spacing:-.01em}
.cta-p{font-size:16px;color:#c8cedf;margin-bottom:36px;line-height:1.8}
.cta-buttons{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.cta-buttons .btn{padding:16px 30px;font-size:16px}
.cta-buttons .btn-outline{color:#fff;border-color:rgba(255,255,255,.4)}
.cta-buttons .btn-outline:hover{background:rgba(255,255,255,.08);border-color:#fff}

@media (max-width:880px){
  .event-h1{font-size:34px;line-height:1.3}
  .event-sub{font-size:16px}
  .slides-title,.recap-title,.loss-title,.features-title,.cases-title{font-size:26px}
  .cta-h{font-size:28px}
  .event-meta{gap:14px;font-size:12px}
  .event-meta-divider{display:none}
  .no-recording-callout{font-size:13px;padding:16px 18px}
  .slides-card{padding:24px 20px;gap:16px}
}
@media (max-width:560px){
  .event-hero{padding:72px 20px 56px}
  .event-h1{font-size:28px}
  .loss-item{padding:16px 18px}
  .feature-card{padding:26px 22px}
}
`;

/* ── SVG Icons ── */
const IconSparkle = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
  </svg>
);

const IconChat = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconCalendar = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const IconMail = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconLibrary = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const IconCheck = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const FEATURES = [
  {
    key: "calendar",
    name: "日程調整までスムーズにつなげる",
    productName: "Meeton Calendar",
    sub: "コンバージョン直後 5 秒で商談予約を提示。資料請求後の初動対応の遅れを解消する。",
    bullets: ["フォーム送信直後の即時提示", "サンクスページ埋め込み", "営業日程の自動最適化"],
    color: "#0891b2",
    bg: "rgba(8,145,178,.10)",
    icon: <IconCalendar />,
  },
  {
    key: "email",
    name: "CRM や営業活動に引き継ぐ",
    productName: "Meeton Email",
    sub: "即時予約しなかったリード・CRM に眠るリードを 1:1 で追跡。AI が動的にナーチャリング。",
    bullets: ["1:1 動的シーケンス", "返信内容に応じた分岐", "商談化までナーチャリング"],
    color: "#7c5cfc",
    bg: "rgba(124,92,252,.10)",
    icon: <IconMail />,
  },
  {
    key: "live",
    name: "その場で会話・質問対応する",
    productName: "Meeton Live",
    sub: "再訪した識別済みリードに過去全文脈を引き継いで AI SDR が即時応答。問い合わせ前の高意欲ユーザーを逃さない。",
    bullets: ["訪問者を即時識別", "過去会話の継続対応", "ラストワンマイル対話"],
    color: "#12a37d",
    bg: "rgba(18,163,125,.10)",
    icon: <IconChat />,
  },
  {
    key: "library",
    name: "Web 上の高意欲ユーザーを見つける",
    productName: "Meeton Library",
    sub: "価格・事例ページ閲覧者など、フォーム前の高温度サインを識別。AI が文脈に応じた資料を提案。",
    bullets: ["文脈に応じた資料提案", "AI による解説対応", "Calendar への自動引継ぎ"],
    color: "#d03ea1",
    bg: "rgba(208,62,161,.10)",
    icon: <IconLibrary />,
  },
];

export default function MarkezineDayClient({ cases }: Props) {
  const [meetingOpen, setMeetingOpen] = useState(false);

  const openConsultation = () => setMeetingOpen(true);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Minimal LP header — logo only, no navigation (focus on CTA) */}
      <header
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid #eef0f7",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <Link href="/" aria-label="Meeton ai homepage">
          <Image
            src="/logo-dark.svg"
            alt="DynaMeet"
            width={120}
            height={26}
            style={{ height: 26, width: "auto" }}
            priority
          />
        </Link>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#6e7494",
            letterSpacing: "0.06em",
          }}
        >
          MarkeZine Day 2026 登壇内容まとめ
        </div>
      </header>

      {/* Hero */}
      <section className="event-hero">
        <div className="event-hero-inner">
          <div className="event-eyebrow">
            <IconSparkle />
            <span>MarkeZine Day 2026 登壇内容まとめ</span>
          </div>
          <h1 className="event-h1">
            「リードは来ているのに、<br />
            商談にならない」を<strong>分解する</strong>
          </h1>
          <p className="event-sub">
            MarkeZine Day 2026 Online「AI SDR が変える BtoB 営業の新常識」での
            DynaMeet 登壇内容を、ページにまとめました。
          </p>

          <div className="event-banner-wrap">
            <Image
              src="/event/markezine-day-2026/event-banner.webp"
              alt="MarkeZine Day 2026 Online｜AI SDR が変える BtoB 営業の新常識 — DynaMeet 澤野登壇 告知画像"
              width={1950}
              height={989}
              priority
              sizes="(max-width: 880px) 100vw, 760px"
              className="event-banner-img"
            />
          </div>

          <div className="no-recording-callout">
            <div className="no-recording-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div>
              <strong>本セッションは録画共有がない形式です。</strong>
              当日お話しした要点と登壇スライド、自社サイトで確認すべき商談化ロスのポイントをこちらにまとめました。
            </div>
          </div>

          <div className="event-hero-cta">
            <a className="btn btn-primary" href="#slides">
              登壇スライドをダウンロード <IconArrowRight />
            </a>
          </div>

          <div className="event-meta">
            <div className="event-meta-item">
              <span>登壇</span>
              <strong>澤野 拓実</strong>
            </div>
            <div className="event-meta-divider" />
            <div className="event-meta-item">
              <span>提供</span>
              <strong>DynaMeet 株式会社</strong>
            </div>
            <div className="event-meta-divider" />
            <div className="event-meta-item">
              <span>セッション</span>
              <strong>2026/05/21</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Slides DL section (anchor target) */}
      <section className="slides-section" id="slides">
        <div className="slides-inner">
          <h2 className="slides-title">登壇スライド</h2>
          <p className="slides-subtitle">
            当日お話しした内容のスライドを PDF でご覧いただけます。
          </p>
          <div className="slides-card">
            <div className="slides-card-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div className="slides-card-body">
              <h3 className="slides-card-h">AI SDR が変える BtoB 営業の新常識</h3>
              <p className="slides-card-desc">
                MarkeZine Day 2026 Online｜DynaMeet 澤野登壇スライド (PDF)
              </p>
            </div>
            <a className="btn btn-primary" href="/downloads/markezine-day-2026-slides.pdf" target="_blank" rel="noopener">
              スライドをダウンロード <IconArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* Session Recap — 商談化ロス文脈に書き換え */}
      <section className="recap-section">
        <div className="recap-inner">
          <h2 className="recap-title">当日の要点 3 つ</h2>
          <p className="recap-subtitle">
            「リードは来ているのに、商談にならない」を分解する 3 つの視点。
          </p>
          <div className="recap-grid">
            <div className="recap-card">
              <div className="recap-num">1</div>
              <h3 className="recap-h">リード対応の遅れが、商談化率を下げる</h3>
              <p className="recap-p">
                資料請求・問い合わせ・チャット — リードが「興味を持った瞬間」を逃すと、
                温度は急速に下がる。商談化の歩留まりは、最初の数分で 8 割決まる。
              </p>
            </div>
            <div className="recap-card">
              <div className="recap-num">2</div>
              <h3 className="recap-h">AI SDR は、問い合わせ前後の "空白時間" を埋める</h3>
              <p className="recap-p">
                24 時間 365 日、リードが現れたその瞬間に、AI が会話・ヒアリング・
                資料提案・日程調整までシームレスに完結。人だけで全リードに即時対応する負担を消す。
              </p>
            </div>
            <div className="recap-card">
              <div className="recap-num">3</div>
              <h3 className="recap-h">人間 SDR は、より高温度な商談に集中できる</h3>
              <p className="recap-p">
                AI が温度高いリードだけを商談まで引き上げ、人が向き合うのは "勝てる商談" だけ。
                AI に置き換える話ではなく、人がより高付加価値な仕事に集中できる構造への移行。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* よくある商談化ロス 5 つ */}
      <section className="loss-section">
        <div className="loss-inner">
          <h2 className="loss-title">よくある商談化ロス 5 つ</h2>
          <p className="loss-subtitle">
            BtoB サイトでリードを取れているのに商談化しない企業に、共通して見られる 5 つのロス。
            自社で当てはまるものがないか、チェックしてみてください。
          </p>
          <div className="loss-grid">
            <div className="loss-item">
              <div className="loss-item-icon">1</div>
              <div className="loss-item-text">
                <strong>資料請求後の初動対応が遅い</strong>
                <span>1 時間以内に接触できないリードは、商談化率が 1/10 まで下がる。</span>
              </div>
            </div>
            <div className="loss-item">
              <div className="loss-item-icon">2</div>
              <div className="loss-item-text">
                <strong>価格・事例ページ閲覧者を追えていない</strong>
                <span>高温度サインを出している匿名訪問者を識別・接触する仕組みがない。</span>
              </div>
            </div>
            <div className="loss-item">
              <div className="loss-item-icon">3</div>
              <div className="loss-item-text">
                <strong>CRM に溜まったリードが放置されている</strong>
                <span>過去問合せ・名刺交換・ウェビナー登録の数千件が眠ったまま動かない。</span>
              </div>
            </div>
            <div className="loss-item">
              <div className="loss-item-icon">4</div>
              <div className="loss-item-text">
                <strong>問い合わせ前の高意欲ユーザーに接触できていない</strong>
                <span>「問い合わせ」する前に競合に流れている。フォーム前の接点がない。</span>
              </div>
            </div>
            <div className="loss-item">
              <div className="loss-item-icon">5</div>
              <div className="loss-item-text">
                <strong>営業が Hot リードを優先できていない</strong>
                <span>温度判定の仕組みがなく、全リードを均等に追って勝てる商談を逃す。</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 商談化ロスを減らすために必要な 4 つの仕組み (旧: Meeton ai 4 機能) */}
      <section className="features-section">
        <div className="features-inner">
          <h2 className="features-title">商談化ロスを減らすために必要な 4 つの仕組み</h2>
          <p className="features-subtitle">
            Web 上の高意欲ユーザーを見つける → 会話・質問対応 → 日程調整 → 営業引継ぎ。
            Meeton ai では、これらを AI SDR の仕組みとして提供しています。
          </p>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div
                key={f.key}
                className="feature-card"
                style={{ ["--feat-color" as string]: f.color, ["--feat-bg" as string]: f.bg } as React.CSSProperties}
              >
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-product-name">{f.productName}</div>
                <h3 className="feature-name">{f.name}</h3>
                <p className="feature-sub">{f.sub}</p>
                <ul className="feature-list">
                  {f.bullets.map((b) => (
                    <li key={b}>
                      <IconCheck />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      {cases.length > 0 && (
        <section className="cases-section">
          <div className="cases-inner">
            <h2 className="cases-title">主な導入事例</h2>
            <p className="cases-subtitle">
              セッション内で紹介した事例を含む、Meeton ai 導入企業様の成果。
            </p>
            <div className="cases-grid">
              {cases.map((c) => (
                <Link key={c.slug} href={`/case-studies/${c.slug}/`} className="case-card">
                  <div className="case-img-wrap">
                    {c.heroImage ? (
                      <img src={c.heroImage} alt={c.name} loading="lazy" />
                    ) : null}
                  </div>
                  <div className="case-body">
                    <div className="case-industry">{c.industry}</div>
                    <div className="case-name">{c.name}</div>
                    {c.heroMetric && (
                      <div className="case-metric-row">
                        <div className="case-metric">{c.heroMetric}</div>
                        <div className="case-metric-label">{c.heroMetricLabel}</div>
                      </div>
                    )}
                    {c.quote && (
                      <p className="case-quote">
                        「{c.quote}」
                        {c.quotePerson && (
                          <span className="case-quote-person"><br />— {c.quotePerson}</span>
                        )}
                      </p>
                    )}
                    <span className="case-link">
                      事例の詳細を読む <IconArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA — 30 分診断のみ */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-h">貴社サイトの商談化ロスを、30 分で診断します。</h2>
          <p className="cta-p">
            貴社サイトやリード対応フローに当てはめて、どこで商談化ロスが起きているかを 30 分で整理します。
            導入前提ではなく、改善余地の確認だけでも歓迎です。
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={openConsultation}>
              30 分 商談化ロス診断を予約する <IconArrowRight />
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <HubSpotMeetingModal
        isOpen={meetingOpen}
        onClose={() => setMeetingOpen(false)}
        utmCampaign="markezine_day_2026"
      />
    </div>
  );
}
