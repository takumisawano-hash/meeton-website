"use client";

import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Footer from "@/app/components/Footer";
const HubSpotMeetingModal = dynamic(() => import("@/app/components/HubSpotMeetingModal"), { ssr: false });
const HubSpotModal = dynamic(() => import("@/app/components/HubSpotModal"), { ssr: false });

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

/* HERO STATS */
.hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;max-width:680px;margin:48px auto 0}
.hero-stat{padding:24px 16px;background:rgba(255,255,255,.85);border:1px solid var(--border);border-radius:16px;text-align:center;backdrop-filter:blur(12px)}
.hero-stat-num{font-size:44px;font-weight:900;line-height:1;letter-spacing:-.02em;background:linear-gradient(135deg,var(--cta),#0fc19a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:6px}
.hero-stat-num.alt{background:linear-gradient(135deg,var(--accent),#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-stat-num.alt2{background:linear-gradient(135deg,var(--blue),#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-stat-label{font-size:12px;color:var(--sub);font-weight:700;letter-spacing:.04em}

/* CTA buttons (shared) */
.btn{padding:14px 24px;border:none;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;transition:all .2s;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:inherit;line-height:1}
.btn-primary{background:var(--cta);color:#fff}
.btn-primary:hover{background:var(--cta-hover);transform:translateY(-1px);box-shadow:0 8px 20px var(--cta-glow)}
.btn-outline{background:transparent;color:var(--cta);border:1.5px solid var(--cta)}
.btn-outline:hover{background:var(--cta-light)}
.btn-arrow{font-size:18px;line-height:1}

/* OFFERS */
.offers-section{padding:80px 24px;background:#fff}
.offers-inner{max-width:1080px;margin:0 auto}
.offers-title{text-align:center;font-size:30px;font-weight:800;color:var(--heading);margin-bottom:10px;letter-spacing:-.01em}
.offers-subtitle{text-align:center;color:var(--sub);font-size:15px;margin-bottom:48px;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.7}
.offers-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:24px;max-width:880px;margin:0 auto}
@media (max-width:880px){.offers-grid{grid-template-columns:1fr;max-width:520px}}
.offer-card{padding:36px 32px;background:#fff;border:1.5px solid var(--border);border-radius:18px;display:flex;flex-direction:column;gap:18px;transition:all .25s;position:relative;overflow:hidden}
.offer-card:hover{transform:translateY(-3px);border-color:var(--accent);box-shadow:0 20px 40px -12px rgba(124,92,252,.12)}
.offer-card.primary{background:linear-gradient(135deg,#1a1d3a 0%,#0f1128 100%);color:#fff;border-color:#0f1128}
.offer-card.primary:hover{border-color:var(--cta-hover);box-shadow:0 24px 48px -12px rgba(18,163,125,.25)}
.offer-card.primary .offer-h{color:#fff}
.offer-card.primary .offer-desc{color:#c8cedf}
.offer-icon-wrap{width:52px;height:52px;border-radius:13px;background:var(--cta-light);color:var(--cta);display:flex;align-items:center;justify-content:center}
.offer-card.primary .offer-icon-wrap{background:rgba(18,163,125,.18);color:#0fc19a}
.offer-tag{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;background:var(--cta);color:#fff;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:.06em;width:fit-content}
.offer-h{font-size:22px;font-weight:800;color:var(--heading);line-height:1.4;letter-spacing:-.005em}
.offer-desc{font-size:14px;color:var(--sub);line-height:1.8;flex:1}
.offer-card.primary .offer-cta{background:var(--cta);color:#fff}
.offer-card.primary .offer-cta:hover{background:var(--cta-hover)}

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
.feature-name{font-size:17px;font-weight:800;color:var(--heading);line-height:1.3;letter-spacing:-.005em}
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
  .offers-title,.recap-title,.features-title,.cases-title{font-size:26px}
  .cta-h{font-size:28px}
  .hero-stats{gap:12px}
  .hero-stat{padding:18px 10px}
  .hero-stat-num{font-size:32px}
  .event-meta{gap:14px;font-size:12px}
  .event-meta-divider{display:none}
}
@media (max-width:560px){
  .event-hero{padding:72px 20px 56px}
  .event-h1{font-size:28px}
  .hero-stat-num{font-size:28px}
  .offer-card{padding:28px 24px}
  .feature-card{padding:26px 22px}
}
`;

/* ── SVG Icons ── */
const IconSparkle = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
  </svg>
);

const IconRocket = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
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
    name: "Meeton Calendar",
    sub: "コンバージョン直後 5 秒で商談予約を提示。フォーム送信・サンクスページ・メール経由で発動。",
    bullets: ["フォーム送信直後の即時提示", "サンクスページ埋め込み", "営業日程の自動最適化"],
    color: "#0891b2",
    bg: "rgba(8,145,178,.10)",
    icon: <IconCalendar />,
  },
  {
    key: "email",
    name: "Meeton Email",
    sub: "即時予約しなかったリードを 1:1 で追跡。AI が動的に内容・タイミングを判断するもう一人の SDR。",
    bullets: ["1:1 動的シーケンス", "返信内容に応じた分岐", "商談化までナーチャリング"],
    color: "#7c5cfc",
    bg: "rgba(124,92,252,.10)",
    icon: <IconMail />,
  },
  {
    key: "live",
    name: "Meeton Live",
    sub: "再訪した識別済みリードに過去全文脈を引き継いで AI SDR が即時応答。その場で商談予約まで完結。",
    bullets: ["訪問者を即時識別", "過去会話の継続対応", "ラストワンマイル対話"],
    color: "#12a37d",
    bg: "rgba(18,163,125,.10)",
    icon: <IconChat />,
  },
  {
    key: "library",
    name: "Meeton Library",
    sub: "既存リードに AI が文脈に応じた資料を提案・解説。検討再開タイミングで Meeton Calendar に引き渡し。",
    bullets: ["文脈に応じた資料提案", "AI による解説対応", "Calendar への自動引継ぎ"],
    color: "#d03ea1",
    bg: "rgba(208,62,161,.10)",
    icon: <IconLibrary />,
  },
];

const _utm = (content: string) =>
  `?utm_source=markezine&utm_medium=event&utm_campaign=markezine_day_2026&utm_content=${content}`;

export default function MarkezineDayClient({ cases }: Props) {
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formCampaign, setFormCampaign] = useState("markezine_day_2026");

  const openConsultation = () => setMeetingOpen(true);
  const openTrial = () => {
    setFormCampaign("markezine_day_2026_trial");
    setFormOpen(true);
  };

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
          MarkeZine Day 2026
        </div>
      </header>

      {/* Hero */}
      <section className="event-hero">
        <div className="event-hero-inner">
          <div className="event-eyebrow">
            <IconSparkle />
            <span>MarkeZine Day 2026 視聴者限定特典</span>
          </div>
          <h1 className="event-h1">
            ウェブサイトのリードを、<br />
            <strong>5 秒で商談に変える</strong>
          </h1>
          <p className="event-sub">
            「AI SDR が変える BtoB 営業の新常識」へのご関心ありがとうございました。
            登壇内容を実際の自社サイトで試せる環境を、
            ご登録者の皆様に <strong style={{ color: "var(--heading)" }}>30 日間無料</strong> でご提供します。
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">5秒</div>
              <div className="hero-stat-label">Speed to Lead</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num alt">1:1</div>
              <div className="hero-stat-label">AI ナーチャリング</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num alt2">30日</div>
              <div className="hero-stat-label">無料トライアル</div>
            </div>
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

      {/* Offers */}
      <section className="offers-section">
        <div className="offers-inner">
          <h2 className="offers-title">視聴者限定オファー</h2>
          <p className="offers-subtitle">
            「まず実運用で試す」が最短ルート。判断に迷う場合は個別相談もご用意しています。
          </p>
          <div className="offers-grid">
            {/* Primary: 30日トライアル */}
            <div className="offer-card primary">
              <div className="offer-icon-wrap">
                <IconRocket />
              </div>
              <span className="offer-tag">通常 14 日 → 30 日に延長</span>
              <h3 className="offer-h">30 日間 無料トライアル</h3>
              <p className="offer-desc">
                カード情報不要、全機能利用可能、初期設定の無料サポート付。
                Meeton Calendar / Email / Live / Library を実運用で体感してください。
              </p>
              <button className="btn btn-primary offer-cta" onClick={openTrial}>
                無料で始める <IconArrowRight />
              </button>
            </div>

            {/* Secondary: 30分相談 */}
            <div className="offer-card">
              <div className="offer-icon-wrap">
                <IconChat />
              </div>
              <h3 className="offer-h">まずは相談したい方へ</h3>
              <p className="offer-desc">
                30 分 AI SDR 戦略相談（無料）。
                澤野が直接、貴社の営業課題に合わせた導入ステップをご提案します。
                ご質問だけでも歓迎です。
              </p>
              <button className="btn btn-outline" onClick={openConsultation}>
                相談を予約する <IconArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Session Recap */}
      <section className="recap-section">
        <div className="recap-inner">
          <h2 className="recap-title">セッションでお伝えした 3 つのポイント</h2>
          <p className="recap-subtitle">
            登壇内容のエッセンスを、すぐに自社で実装に移せる粒度で整理しました。
          </p>
          <div className="recap-grid">
            <div className="recap-card">
              <div className="recap-num">1</div>
              <h3 className="recap-h">AI SDR とは何か</h3>
              <p className="recap-p">
                従来の SDR 業務（リード対応・初期接触・商談設定）を AI エージェントが
                24 時間 365 日、Speed to Lead の業界標準 5 分の 1/60 — 5 秒で処理する仕組み。
              </p>
            </div>
            <div className="recap-card">
              <div className="recap-num">2</div>
              <h3 className="recap-h">AI SDR 導入の実践知見</h3>
              <p className="recap-p">
                EdulinX 様で商談化率 60% を達成。設計のコツは「AI に任せる範囲」と
                「人が介在する場面」の境界線設計。
              </p>
            </div>
            <div className="recap-card">
              <div className="recap-num">3</div>
              <h3 className="recap-h">AI 時代の営業組織</h3>
              <p className="recap-p">
                人間 SDR を AI に置き換える話ではなく、人がより高付加価値な仕事に
                集中できる構造への移行。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meeton ai 4 機能の紹介 */}
      <section className="features-section">
        <div className="features-inner">
          <h2 className="features-title">Meeton ai の 4 つの機能</h2>
          <p className="features-subtitle">
            リードコンバートから商談予約まで、4 つの AI が連動して 24 時間自動で実行します。
          </p>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div
                key={f.key}
                className="feature-card"
                style={{ ["--feat-color" as string]: f.color, ["--feat-bg" as string]: f.bg } as React.CSSProperties}
              >
                <div className="feature-icon">{f.icon}</div>
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

      {/* Closing CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-h">AI SDR の導入を、最短最速で。</h2>
          <p className="cta-p">
            ご視聴後の次の一歩として、ぜひ視聴者特典をご活用ください。
            ご質問・ご相談は澤野が直接対応いたします。
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={openTrial}>
              30 日間 無料トライアル <IconArrowRight />
            </button>
            <button className="btn btn-outline" onClick={openConsultation}>
              30 分 相談を予約する <IconArrowRight />
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
      <HubSpotModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        utmCampaign={formCampaign}
      />
    </div>
  );
}
