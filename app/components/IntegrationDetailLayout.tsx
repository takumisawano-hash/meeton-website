import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import DemoBookingButton from "@/app/components/DemoBookingButton";
import { Integration } from "@/lib/integrations-data";
import Image from "next/image";
import Link from "next/link";

type Props = {
  integration: Integration;
  lang: "en" | "ja";
};

const strings = {
  en: {
    breadcrumbRoot: "Integrations",
    breadcrumbRootHref: "/integrations",
    howToInstall: "How to install",
    troubleshootingLinkText: "Contact support",
    usageAndPrereqs: "Usage & Prerequisites",
    prerequisites: "Prerequisites",
    featuresAndUseCases: "Features & Use Cases",
    howToUninstall: "Removing the App",
    implications: "Implications of removal",
    dataHandlingTitle: "How your data is handled",
    developer: "Developer",
    developerName: "DynaMeet K.K.",
    website: "Website",
    support: "Support",
    supportLabel: "Contact support",
    privacyPolicy: "Privacy policy",
    privacyPolicyLabel: "View policy",
    langChip: "日本語",
    langHrefBase: "/ja/integrations",
    overview: "Overview",
    aboutIntegration: "About this integration",
    readyToConnect: (name: string) => `Ready to connect ${name}?`,
    readyToConnectSub:
      "Talk to our team and we'll show you how Meeton ai fits your stack in under 20 minutes.",
    bookDemo: "Book a demo",
    backToList: "Back to integrations",
    category: "Category",
    appInfo: "App information",
    detailsLabel: "Details",
  },
  ja: {
    breadcrumbRoot: "連携一覧",
    breadcrumbRootHref: "/ja/integrations",
    howToInstall: "導入手順",
    troubleshootingLinkText: "サポートに問い合わせる",
    usageAndPrereqs: "使い方と前提条件",
    prerequisites: "前提条件",
    featuresAndUseCases: "機能と利用シナリオ",
    howToUninstall: "アプリの削除",
    implications: "削除後の影響",
    dataHandlingTitle: "データの取り扱い",
    developer: "開発元",
    developerName: "DynaMeet株式会社",
    website: "ウェブサイト",
    support: "サポート",
    supportLabel: "サポートに問い合わせる",
    privacyPolicy: "プライバシーポリシー",
    privacyPolicyLabel: "ポリシーを確認する",
    langChip: "EN",
    langHrefBase: "/integrations",
    overview: "概要",
    aboutIntegration: "この連携について",
    readyToConnect: (name: string) => `${name}との連携を始めませんか？`,
    readyToConnectSub:
      "20分以内のオンライン商談で、Meeton aiがあなたのスタックにどう組み込まれるかをご説明します。",
    bookDemo: "デモを予約する",
    backToList: "連携一覧に戻る",
    category: "カテゴリ",
    appInfo: "アプリ情報",
    detailsLabel: "詳細",
  },
};

export default function IntegrationDetailLayout({ integration, lang }: Props) {
  const s = strings[lang];
  const content = lang === "en" ? integration.en : integration.ja;
  const langSwitchHref = `${s.langHrefBase}/${integration.slug}`;
  const websiteHost = (() => {
    try {
      return new URL(integration.links.website).hostname.replace(/^www\./, "");
    } catch {
      return integration.links.website;
    }
  })();

  return (
    <>
      <style>{`
        /* ---------- Page shell ---------- */
        .int-page{
          background: #fafaf7;
          color: #0a0e0c;
          min-height: 100vh;
        }

        /* ---------- HERO ---------- */
        .int-hero{
          position: relative;
          overflow: hidden;
          padding: clamp(120px, 16vw, 180px) clamp(20px, 4vw, 48px) clamp(56px, 8vw, 96px);
          border-bottom: 1px solid #e4e3dd;
          background: linear-gradient(165deg, #edfcf7 0%, #fafaf7 35%, #fafaf7 65%, #f3f0ff 100%);
        }
        .int-hero-dotgrid{
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(18,163,125,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          mask-image: linear-gradient(180deg,#000 0%,#000 70%,transparent 100%);
          -webkit-mask-image: linear-gradient(180deg,#000 0%,#000 70%,transparent 100%);
        }
        .int-hero-glow-tr{
          position: absolute; top: -180px; right: -120px;
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(18,163,125,0.12) 0%, transparent 60%);
          pointer-events: none;
        }
        .int-hero-glow-bl{
          position: absolute; bottom: -160px; left: -80px;
          width: 440px; height: 440px;
          background: radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .int-hero-inner{
          position: relative; max-width: 1200px; margin: 0 auto;
        }

        /* Breadcrumb */
        .int-breadcrumb{
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 12px; letter-spacing: 0.08em;
          color: #82897f;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .int-breadcrumb a{
          color: #0e864a; text-decoration: none;
          transition: color .2s;
        }
        .int-breadcrumb a:hover{ color: #12a37d; text-decoration: underline; }
        .int-breadcrumb-sep{ color: #c3c8be; }
        .int-breadcrumb-current{ color: #3d4541; }

        /* Hero card */
        .int-hero-card{
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: clamp(20px, 4vw, 40px);
          align-items: center;
        }
        .int-hero-logo-wrap{
          width: 96px; height: 96px;
          border-radius: 22px;
          background: #fff;
          border: 1.5px solid rgba(18,163,125,0.14);
          display: flex; align-items: center; justify-content: center;
          padding: 14px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.9) inset,
            0 -1px 0 rgba(18,163,125,0.04) inset,
            0 10px 30px -10px rgba(18,163,125,0.18),
            0 2px 6px rgba(10,14,12,0.04);
          flex-shrink: 0;
        }
        .int-hero-logo{ object-fit: contain; }

        .int-hero-meta{ min-width: 0; }
        .int-hero-pill{
          display: inline-flex; align-items: center; gap: 10px;
          padding: 7px 16px;
          background: linear-gradient(135deg, rgba(18,163,125,0.10), rgba(124,92,252,0.10));
          border: 1px solid rgba(18,163,125,0.18);
          border-radius: 999px;
          font-size: 12px; font-weight: 700; color: #065f46;
          letter-spacing: 0.06em;
          margin-bottom: 22px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .int-hero-pill-tag{
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 10px; letter-spacing: 0.16em;
          text-transform: uppercase; color: #0e864a;
        }
        .int-hero-pill-dot{ color: #82897f; }

        .int-hero-name{
          font-weight: 900;
          font-size: clamp(32px, 5vw, 56px);
          line-height: 1.1;
          letter-spacing: -0.035em;
          color: #0a0e0c;
          margin: 0 0 18px;
          overflow-wrap: anywhere;
        }
        .int-hero-tagline{
          font-size: clamp(16px, 1.6vw, 19px);
          line-height: 1.65;
          color: #3d4541;
          margin: 0;
          max-width: 720px;
        }

        /* ---------- BODY ---------- */
        .int-body{
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(48px, 7vw, 88px) clamp(20px, 4vw, 48px) 80px;
        }
        .int-grid{
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: clamp(32px, 5vw, 64px);
          align-items: start;
        }

        /* Section block */
        .int-section{ margin-bottom: 56px; }
        .int-section:last-child{ margin-bottom: 0; }
        .int-section-eyebrow{
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #0e864a;
          margin-bottom: 14px;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .int-section-eyebrow::before{
          content: ''; width: 18px; height: 1.5px;
          background: linear-gradient(90deg,#12a37d,transparent);
        }
        .int-section-title{
          font-size: clamp(22px, 2.6vw, 28px);
          font-weight: 800; color: #0a0e0c;
          letter-spacing: -0.02em; line-height: 1.25;
          margin: 0 0 20px;
        }
        .int-section-lead{
          font-size: 17px; line-height: 1.85; color: #3d4541;
          margin: 0;
        }

        /* Step list */
        .int-steps{
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 4px;
        }
        .int-step{
          display: flex; align-items: flex-start; gap: 18px;
          position: relative;
          padding: 14px 16px 14px 14px;
          border-radius: 14px;
          border: 1px solid transparent;
          transition: all .25s ease;
        }
        .int-step:hover{
          background: #fff;
          border-color: rgba(18,163,125,0.14);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px -10px rgba(18,163,125,0.18);
        }
        .int-step:not(:last-child)::before{
          content: '';
          position: absolute;
          left: 33px; top: 56px; bottom: -2px; width: 1.5px;
          background: linear-gradient(180deg, rgba(18,163,125,0.32) 0%, rgba(18,163,125,0.0) 100%);
        }
        .int-step-num{
          width: 40px; height: 40px;
          border-radius: 50%;
          flex-shrink: 0;
          background: linear-gradient(135deg,#12a37d 0%,#0fc19a 100%);
          color: #fff;
          font-size: 15px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.25) inset,
            0 6px 14px -4px rgba(18,163,125,0.45);
        }
        .int-step-text{
          font-size: 16px; line-height: 1.75; color: #3d4541;
          padding-top: 8px;
        }

        /* Uninstall steps — muted variant */
        .int-step--mute .int-step-num{
          background: linear-gradient(135deg,#94a3b8 0%,#cbd5e1 100%);
          box-shadow: 0 1px 0 rgba(255,255,255,0.25) inset, 0 6px 14px -4px rgba(100,116,139,0.35);
        }

        /* Install / contact note */
        .int-note{
          margin-top: 20px;
          font-size: 14px; color: #5a6266;
          font-style: italic; line-height: 1.7;
        }
        .int-note a{ color: #0e864a; text-decoration: none; font-weight: 600; }
        .int-note a:hover{ text-decoration: underline; }

        /* Prereq callout */
        .int-prereq{
          display: flex; align-items: flex-start; gap: 14px;
          padding: 18px 20px;
          background: #f0fdf9;
          border: 1px solid rgba(18,163,125,0.18);
          border-left: 3px solid #12a37d;
          border-radius: 14px;
          margin-bottom: 32px;
        }
        .int-prereq-icon{
          width: 22px; height: 22px; flex-shrink: 0;
          color: #12a37d; margin-top: 2px;
        }
        .int-prereq-label{
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #0e864a;
          margin-bottom: 4px;
        }
        .int-prereq-text{
          font-size: 15px; line-height: 1.75; color: #3d4541;
          margin: 0;
        }

        /* Use case mini-grid */
        .int-cases{
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }
        .int-case{
          position: relative;
          background: #fff;
          border: 1.5px solid #e4e3dd;
          border-radius: 14px;
          padding: 18px 18px 18px 20px;
          transition: all .25s ease;
          overflow: hidden;
        }
        .int-case::before{
          content: '';
          position: absolute; inset: 0;
          border-radius: inherit;
          padding: 1.5px;
          background: linear-gradient(135deg, rgba(18,163,125,0.0), rgba(124,92,252,0.0));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          transition: background .25s ease;
        }
        .int-case:hover{
          transform: translateY(-2px);
          box-shadow: 0 10px 28px -12px rgba(10,14,12,0.10);
        }
        .int-case:hover::before{
          background: linear-gradient(135deg, rgba(18,163,125,0.45), rgba(124,92,252,0.35));
        }
        .int-case-head{
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 8px;
        }
        .int-case-icon{
          width: 22px; height: 22px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(18,163,125,0.14), rgba(124,92,252,0.10));
          color: #0e864a;
        }
        .int-case-title{
          font-size: 14px; font-weight: 800; color: #0a0e0c;
          letter-spacing: -0.005em; line-height: 1.35;
        }
        .int-case-desc{
          font-size: 13.5px; line-height: 1.7; color: #4a5258;
        }

        /* Implications / data handling callouts */
        .int-callout{
          margin-top: 18px;
          display: flex; gap: 14px;
          padding: 18px 20px;
          background: #fff;
          border: 1px solid #e4e3dd;
          border-left: 3px solid #94a3b8;
          border-radius: 14px;
        }
        .int-callout--warn{
          background: #fffaed;
          border-color: #fde68a;
          border-left-color: #f59e0b;
        }
        .int-callout--data{
          background: #f0fdf9;
          border-color: rgba(18,163,125,0.20);
          border-left-color: #12a37d;
        }
        .int-callout-icon{
          width: 22px; height: 22px; flex-shrink: 0; margin-top: 1px;
          color: #65707a;
        }
        .int-callout--warn .int-callout-icon{ color: #b45309; }
        .int-callout--data .int-callout-icon{ color: #0e864a; }
        .int-callout-label{
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #0e864a;
          margin-bottom: 4px;
        }
        .int-callout--warn .int-callout-label{ color: #b45309; }
        .int-callout-text{
          font-size: 14.5px; line-height: 1.75; color: #3d4541;
          margin: 0;
        }

        /* ---------- SIDEBAR ---------- */
        .int-sidebar{
          position: sticky;
          top: 96px;
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1.5px solid rgba(228,227,221,0.9);
          border-radius: 20px;
          padding: 24px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.8) inset,
            0 12px 36px -16px rgba(10,14,12,0.10);
        }
        .int-sidebar-eyebrow{
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #82897f;
          margin-bottom: 14px;
        }
        .int-sidebar-cta{
          display: block; width: 100%; box-sizing: border-box;
          padding: 13px 16px;
          background: linear-gradient(135deg,#12a37d,#0fc19a);
          color: #fff !important;
          border: none; border-radius: 12px;
          font-size: 15px; font-weight: 700;
          text-align: center; text-decoration: none; cursor: pointer;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.25) inset,
            0 8px 22px -8px rgba(18,163,125,0.50);
          transition: all .25s ease;
          margin-bottom: 20px;
        }
        .int-sidebar-cta:hover{
          transform: translateY(-1px);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.25) inset,
            0 12px 28px -10px rgba(18,163,125,0.55);
        }
        .int-sidebar-divider{
          border: none;
          border-top: 1px solid #ececdf;
          margin: 0 0 14px;
        }
        .int-meta{ display: flex; flex-direction: column; gap: 0; }
        .int-meta-row{
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f1f0e8;
        }
        .int-meta-row:last-child{ border-bottom: none; padding-bottom: 2px; }
        .int-meta-label{
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #82897f;
          flex-shrink: 0;
        }
        .int-meta-value{
          font-size: 13.5px; font-weight: 700; color: #3d4541;
          text-align: right;
          max-width: 60%; overflow-wrap: anywhere;
        }
        .int-meta-value--mono{
          font-family: var(--font-mono), ui-monospace, monospace;
          font-weight: 600; font-size: 12.5px;
          letter-spacing: 0.02em;
        }
        .int-meta-link{
          display: inline-flex; align-items: center; gap: 4px;
          color: #0e864a !important;
          text-decoration: none;
          transition: gap .2s ease;
        }
        .int-meta-link:hover{ gap: 7px; }
        .int-meta-link svg{ flex-shrink: 0; }
        .int-sidebar-lang{
          margin-top: 18px;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px; font-weight: 700;
          color: #3d4541; border: 1px solid #e4e3dd;
          background: #fff; text-decoration: none;
          transition: all .2s ease;
        }
        .int-sidebar-lang:hover{ border-color: #12a37d; color: #0e864a; }

        /* ---------- BOTTOM CTA ---------- */
        .int-bottom{
          position: relative;
          margin-top: 64px;
          padding: clamp(40px, 6vw, 64px) clamp(24px, 4vw, 56px);
          background: linear-gradient(135deg, #edfcf7 0%, #fafaf7 50%, #f3f0ff 100%);
          border: 1px solid #e4e3dd;
          border-radius: 24px;
          overflow: hidden;
          text-align: center;
        }
        .int-bottom::before{
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(18,163,125,0.08) 1px, transparent 1px);
          background-size: 24px 24px;
          mask-image: radial-gradient(ellipse at center, #000 0%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at center, #000 0%, transparent 70%);
          pointer-events: none;
        }
        .int-bottom-inner{ position: relative; }
        .int-bottom-title{
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 900; color: #0a0e0c;
          letter-spacing: -0.025em; line-height: 1.2;
          margin: 0 0 14px;
        }
        .int-bottom-sub{
          font-size: 16px; line-height: 1.7; color: #3d4541;
          margin: 0 auto 28px;
          max-width: 560px;
        }
        .int-bottom-actions{
          display: inline-flex; flex-wrap: wrap; gap: 12px;
          align-items: center; justify-content: center;
        }
        .int-bottom-btn{
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 22px;
          background: linear-gradient(135deg,#12a37d,#0fc19a);
          color: #fff !important;
          border: none; border-radius: 12px;
          font-size: 15px; font-weight: 700;
          cursor: pointer; text-decoration: none;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.25) inset,
            0 10px 24px -8px rgba(18,163,125,0.50);
          transition: all .25s ease;
        }
        .int-bottom-btn:hover{
          transform: translateY(-2px);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.25) inset,
            0 14px 30px -10px rgba(18,163,125,0.55);
        }
        .int-bottom-back{
          display: inline-flex; align-items: center; gap: 6px;
          padding: 13px 20px;
          color: #3d4541 !important;
          background: #fff;
          border: 1.5px solid #e4e3dd;
          border-radius: 12px;
          font-size: 14.5px; font-weight: 700;
          text-decoration: none;
          transition: all .25s ease;
        }
        .int-bottom-back:hover{
          border-color: #12a37d;
          color: #0e864a !important;
          transform: translateY(-1px);
        }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width: 1023px){
          .int-grid{ grid-template-columns: minmax(0,1fr); }
          .int-sidebar{ position: static; }
        }
        @media (max-width: 720px){
          .int-hero-card{ grid-template-columns: minmax(0,1fr); gap: 20px; }
          .int-hero-logo-wrap{ width: 80px; height: 80px; padding: 12px; }
          .int-cases{ grid-template-columns: minmax(0,1fr); }
          .int-step{ padding: 12px 12px 12px 10px; }
          .int-step:not(:last-child)::before{ left: 30px; top: 52px; }
          .int-step-text{ font-size: 15px; }
          .int-section{ margin-bottom: 44px; }
        }
      `}</style>

      <div className="int-page">
        <Nav variant="light" langSwitchHref={langSwitchHref} langSwitchLabel={s.langChip} />

        {/* ---------- HERO ---------- */}
        <section className="int-hero">
          <div aria-hidden className="int-hero-dotgrid" />
          <div aria-hidden className="int-hero-glow-tr" />
          <div aria-hidden className="int-hero-glow-bl" />

          <div className="int-hero-inner">
            {/* Breadcrumb */}
            <nav className="int-breadcrumb" aria-label="Breadcrumb">
              <Link href={s.breadcrumbRootHref}>{s.breadcrumbRoot}</Link>
              <span className="int-breadcrumb-sep">›</span>
              <span className="int-breadcrumb-current">{integration.name}</span>
            </nav>

            <div className="int-hero-card">
              <div className="int-hero-logo-wrap">
                <Image
                  src={integration.logo}
                  alt={integration.name}
                  width={68}
                  height={68}
                  className="int-hero-logo"
                />
              </div>

              <div className="int-hero-meta">
                <div className="int-hero-pill">
                  <span className="int-hero-pill-tag">
                    {s.category}
                  </span>
                  <span className="int-hero-pill-dot">·</span>
                  <span style={{ fontSize: 12, color: "#3d4541" }}>
                    {content.categoryLabel}
                  </span>
                </div>
                <h1 className="int-hero-name">
                  {integration.name}
                </h1>
                <p className="int-hero-tagline">{content.tagline}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- BODY ---------- */}
        <main className="int-body">
          <div className="int-grid">
            {/* Left column */}
            <div>
              {/* About */}
              <section className="int-section">
                <div className="int-section-eyebrow">{s.overview}</div>
                <h2 className="int-section-title">{s.aboutIntegration}</h2>
                <p className="int-section-lead">{content.description}</p>
              </section>

              {/* How to install */}
              <section className="int-section">
                <div className="int-section-eyebrow">01</div>
                <h2 className="int-section-title">{s.howToInstall}</h2>
                <ol className="int-steps">
                  {content.steps.map((step, i) => (
                    <li key={i} className="int-step">
                      <div className="int-step-num">{i + 1}</div>
                      <div className="int-step-text">{step}</div>
                    </li>
                  ))}
                </ol>
                {content.installNote && (
                  <p className="int-note">
                    {content.installNote}{" "}
                    <a
                      href={integration.links.support}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.troubleshootingLinkText}
                    </a>
                    .
                  </p>
                )}
              </section>

              {/* Usage & Prerequisites */}
              {(content.prerequisites ||
                (content.useCases && content.useCases.length > 0)) && (
                <section className="int-section">
                  <div className="int-section-eyebrow">02</div>
                  <h2 className="int-section-title">{s.usageAndPrereqs}</h2>

                  {content.prerequisites && (
                    <div className="int-prereq">
                      <svg
                        className="int-prereq-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M9 12l2 2 4-4" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      <div style={{ minWidth: 0 }}>
                        <div className="int-prereq-label">{s.prerequisites}</div>
                        <p className="int-prereq-text">{content.prerequisites}</p>
                      </div>
                    </div>
                  )}

                  {content.useCases && content.useCases.length > 0 && (
                    <>
                      <div
                        className="int-section-eyebrow"
                        style={{ marginTop: 8 }}
                      >
                        {s.featuresAndUseCases}
                      </div>
                      <div className="int-cases">
                        {content.useCases.map((uc, i) => (
                          <div key={i} className="int-case">
                            <div className="int-case-head">
                              <span className="int-case-icon" aria-hidden>
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </span>
                              <div className="int-case-title">{uc.title}</div>
                            </div>
                            <div className="int-case-desc">{uc.description}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </section>
              )}

              {/* Uninstall */}
              <section className="int-section">
                <div className="int-section-eyebrow">03</div>
                <h2 className="int-section-title">{s.howToUninstall}</h2>
                <ol className="int-steps">
                  {content.uninstallSteps.map((step, i) => (
                    <li key={i} className="int-step int-step--mute">
                      <div className="int-step-num">{i + 1}</div>
                      <div className="int-step-text">{step}</div>
                    </li>
                  ))}
                </ol>

                {content.uninstallImplications && (
                  <div className="int-callout int-callout--warn">
                    <svg
                      className="int-callout-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <div style={{ minWidth: 0 }}>
                      <div className="int-callout-label">{s.implications}</div>
                      <p className="int-callout-text">
                        {content.uninstallImplications}
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* Data handling */}
              {content.dataHandling && (
                <section className="int-section">
                  <div className="int-callout int-callout--data">
                    <svg
                      className="int-callout-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                    <div style={{ minWidth: 0 }}>
                      <div className="int-callout-label">{s.dataHandlingTitle}</div>
                      <p className="int-callout-text">{content.dataHandling}</p>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Right sidebar */}
            <aside className="int-sidebar">
              <div className="int-sidebar-eyebrow">{s.appInfo}</div>
              <a
                href={integration.links.cta}
                target="_blank"
                rel="noopener noreferrer"
                className="int-sidebar-cta"
              >
                {content.ctaText}
              </a>
              <hr className="int-sidebar-divider" />
              <div className="int-meta">
                <div className="int-meta-row">
                  <span className="int-meta-label">{s.developer}</span>
                  <span className="int-meta-value int-meta-value--mono">
                    {s.developerName}
                  </span>
                </div>
                <div className="int-meta-row">
                  <span className="int-meta-label">{s.website}</span>
                  <span className="int-meta-value">
                    <a
                      className="int-meta-link"
                      href={integration.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {websiteHost}
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                  </span>
                </div>
                <div className="int-meta-row">
                  <span className="int-meta-label">{s.support}</span>
                  <span className="int-meta-value">
                    <a
                      className="int-meta-link"
                      href={integration.links.support}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.supportLabel}
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                  </span>
                </div>
                <div className="int-meta-row">
                  <span className="int-meta-label">{s.privacyPolicy}</span>
                  <span className="int-meta-value">
                    <a
                      className="int-meta-link"
                      href={integration.links.privacyPolicy}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.privacyPolicyLabel}
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
              <Link href={langSwitchHref} className="int-sidebar-lang">
                {s.langChip}
              </Link>
            </aside>
          </div>

          {/* Bottom CTA */}
          <section className="int-bottom">
            <div className="int-bottom-inner">
              <h2 className="int-bottom-title">{s.readyToConnect(integration.name)}</h2>
              <p className="int-bottom-sub">{s.readyToConnectSub}</p>
              <div className="int-bottom-actions">
                <DemoBookingButton
                  className="int-bottom-btn"
                  utmCampaign={`integration-${integration.slug}`}
                >
                  {s.bookDemo}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </DemoBookingButton>
                <Link href={s.breadcrumbRootHref} className="int-bottom-back">
                  ← {s.backToList}
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
