import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, ProductIcon, Check, MAXW } from "@/app/components/v2/ui";
import { PRODUCTS, PRODUCT_ORDER } from "@/app/lib/product-lp-data";
import LogoWall from "@/app/components/v2/LogoWall";
import IntegrationLogos from "@/app/components/v2/IntegrationLogos";
import StageFlow from "@/app/components/v2/StageFlow";
import StageMedia from "@/app/components/v2/StageMedia";
import CountUp from "@/app/components/v2/CountUp";
import DemoFrame from "@/app/components/v2/DemoFrame";
import type { CaseCardData } from "@/app/components/v2/CaseCardGrid";
import FeaturedCase from "@/app/components/v2/FeaturedCase";
import type { Lang } from "@/app/lib/i18n";

type CaseCard = CaseCardData;

// All hardcoded UI copy for the homepage, keyed off `lang` (JA default → the
// Japanese site renders byte-identically when the prop is omitted). Stats are
// kept EXACT across locales (60%超→"60%+", 2倍→"2x", 30時間以上/月→"30+ hrs/mo").
const STR = {
  ja: {
    skip: "本文へスキップ",
    heroEyebrow: "訪問者は去り、リードは商談にならない。",
    heroH1a: "「待つ」Webサイトから、",
    heroH1b: "商談を生み出す",
    heroH1c: "AI SDRへ。",
    heroSub:
      "Meeton ai は、Webサイトに配属する AI SDR。問い合わせを待たず潜在層に会話で踏み込み、あらゆる瞬間を商談に変えます。",
    demoTitle: "Meeton Chat のデモ",
    heroAssurances: ["30分のデモで自社への効き方を確認", "シナリオ設計不要", "ノーコード・設置5分"],
    proof: [
      { n: 60, suf: "%超", l: "Meeton ai 経由の商談化率", sub: "業界平均 約20%" },
      { n: 2, suf: "倍", l: "有効リード数", sub: "導入前比 +100%" },
      { n: 30, suf: "時間以上/月", l: "削減できた営業工数", sub: "初動・追客の自動化で" },
    ],
    stagesEyebrow: "AI SDR の3つの仕事",
    stagesTitle: "掴んで育て、商談化し、逃さず追う。",
    stagesLede: "潜在層の獲得から追客まで、4つのプロダクトがひとつの AI SDR として連携します。",
    stagesPriceA: "料金は3プラン・月額12万円〜。30分のデモで、自社に合うプランをご案内します。 ",
    stagesPriceLink: "料金を見る",
    casesEyebrow: "導入事例",
    casesTitle: "成果が、データで出ている。",
    casesAll: "すべての事例を見る →",
    ctaStripLine: "同じ仕組みを、30分のデモで。",
    routerEyebrow: "どの仕事から始める？",
    routerTitle: "迷ったら、いちばん効く一手から。",
    router: [
      { slug: "chat", q: "訪問者を会話で掴んでリードにしたい", a: "Meeton Chat" },
      { slug: "library", q: "資料で見込み客を育てたい", a: "Meeton Library" },
      { slug: "calendar", q: "問い合わせの取りこぼしを止めたい", a: "Meeton Calendar" },
      { slug: "email", q: "既存リードを追客で再商談化したい", a: "Meeton Email" },
    ],
    finalTitle: "待つWebサイトを、卒業する。",
    finalSub: "30分のデモで、自社サイトにAI SDRを配属する具体策が見えます。",
  },
  en: {
    skip: "Skip to content",
    heroEyebrow: "Visitors leave, and leads never become meetings.",
    heroH1a: "From a Website that waits, ",
    heroH1b: "to an AI SDR that",
    heroH1c: "generates meetings.",
    heroSub:
      "Meeton ai is an AI SDR deployed on your website. It doesn't wait for inquiries — it engages prospects in conversation and turns every moment into a meeting.",
    demoTitle: "Meeton Chat demo",
    heroAssurances: ["See how it works for you in a 30-min demo", "No scenario design", "No-code, install in 5 minutes"],
    proof: [
      { n: 60, suf: "%+", l: "Meeting conversion via Meeton ai", sub: "Industry average ~20%" },
      { n: 2, suf: "x", l: "Qualified leads", sub: "+100% vs. before deployment" },
      { n: 30, suf: "+ hrs/mo", l: "Sales hours saved", sub: "By automating speed-to-lead and follow-up" },
    ],
    stagesEyebrow: "The 3 jobs of the AI SDR",
    stagesTitle: "Capture and nurture, convert, and chase down every lead.",
    stagesLede: "From acquiring prospects to winning them back, four products work together as a single AI SDR.",
    stagesPriceA: "Three plans, from ¥120,000/mo. A 30-minute demo helps you find the right one. ",
    stagesPriceLink: "See pricing",
    casesEyebrow: "Customer stories",
    casesTitle: "The results show up in the data.",
    casesAll: "See all customers →",
    ctaStripLine: "See the same playbook in a 30-minute demo.",
    routerEyebrow: "Where do you start?",
    routerTitle: "Not sure? Start with the move that pays off most.",
    router: [
      { slug: "chat", q: "Capture visitors in conversation and turn them into leads", a: "Meeton Chat" },
      { slug: "library", q: "Nurture prospects with content", a: "Meeton Library" },
      { slug: "calendar", q: "Stop losing inbound inquiries", a: "Meeton Calendar" },
      { slug: "email", q: "Win back existing leads with follow-up", a: "Meeton Email" },
    ],
    finalTitle: "Graduate from a Website that waits.",
    finalSub: "A 30-minute demo shows exactly how to deploy an AI SDR on your own site.",
  },
} as const;

export default function Home({ caseStudies = [], lang = "ja" }: { caseStudies?: CaseCard[]; lang?: Lang }) {
  const s = STR[lang];
  return (
    <>
      <a href="#main" className="v2-skip">{s.skip}</a>
      <Nav lang={lang} />
      <main id="main">

      {/* 1. Hero (navy) — 2 columns ≥1024px: copy left, product window right.
          Mobile: single column, media renders AFTER the CTA block so the CTA
          stays above the fold at 390px. */}
      <Section tone="navy" py={0} style={{ paddingTop: 128, paddingBottom: 40 }}>
        <div className="v2-hero">
          <div>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--cta)" }}>
              {s.heroEyebrow}
            </p>
            <h1
              className="v2-hero-h1"
              style={{
                fontFamily: "var(--fd)",
                fontSize: "clamp(34px, 4.8vw, 48px)",
                lineHeight: 1.18,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--on-navy)",
                margin: "16px 0 0",
              }}
            >
              {s.heroH1a}<span className="v2-hero-brk"><br /></span>
              <span style={{ color: "var(--cta)", whiteSpace: "nowrap" }}>{s.heroH1b}</span>{lang === "en" ? " " : ""}
              <span style={{ whiteSpace: "nowrap" }}>{s.heroH1c}</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "22px 0 30px", maxWidth: 720 }}>
              {s.heroSub}
            </p>
            <CTAButtons source="home-hero" tone="onNavy" size="lg" lang={lang} />
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 20, fontSize: 13, color: "var(--on-navy-sub)" }}>
              {s.heroAssurances.map((a) => (
                <span key={a}>✓ {a}</span>
              ))}
            </div>
          </div>
          {/* product window: the REAL Meeton Chat demo, framed like an app on navy */}
          <div className="v2-hero-media">
            <DemoFrame src="/product/chat.html" title={s.demoTitle} />
          </div>
        </div>
        <style>{`
          .v2-hero{display:grid;grid-template-columns:1fr;gap:40px;align-items:center}
          .v2-hero-h1{text-wrap:balance;word-break:auto-phrase}
          .v2-hero-media{display:flex;flex-direction:column;justify-content:center;border-radius:var(--r-feature);border:1px solid var(--on-navy-border);background:var(--navy-2);overflow:hidden;box-shadow:0 44px 88px -48px rgba(0,0,0,.65)}
          @media(min-width:1024px){.v2-hero{grid-template-columns:1fr .9fr;gap:clamp(36px,4.5vw,64px)}}
          @media(max-width:719px){.v2-hero-brk{display:none}}
        `}</style>
      </Section>

      {/* 2. Proof stats — promoted to big cards (navy, continuous with hero) */}
      <Section tone="navy" py={0} style={{ paddingTop: 12, paddingBottom: 64 }}>
        <div className="v2-proof" style={{ borderTop: "1px solid var(--on-navy-border)", paddingTop: 40 }}>
          {s.proof.map((p) => (
            <div key={p.l} className="v2-proof-card">
              <div className="v2-proof-num"><CountUp to={p.n} /><span className="v2-proof-suf">{p.suf}</span></div>
              <div className="v2-proof-label">{p.l}</div>
              <div className="v2-proof-sub">{p.sub}</div>
            </div>
          ))}
        </div>
        <style>{`
          .v2-proof{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2.5vw,28px)}
          .v2-proof-card{background:var(--navy-2);border:1px solid var(--on-navy-border);border-radius:18px;padding:clamp(22px,3vw,32px);text-align:center}
          .v2-proof-num{font-family:var(--fd);font-size:clamp(44px,7vw,72px);font-weight:800;color:var(--cta);line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
          .v2-proof-suf{font-size:.42em;font-weight:800;margin-left:4px;color:var(--cta)}
          .v2-proof-label{font-size:clamp(14px,1.6vw,16px);font-weight:800;color:var(--on-navy);margin-top:14px}
          .v2-proof-sub{font-size:12px;color:var(--on-navy-sub);margin-top:6px}
          @media(max-width:720px){.v2-proof{grid-template-columns:1fr;gap:14px}.v2-proof-card{display:flex;align-items:baseline;gap:14px;text-align:left;padding:18px 22px}.v2-proof-num{font-size:40px}.v2-proof-label{margin-top:0}.v2-proof-sub{display:none}}
        `}</style>
      </Section>

      {/* 2.5 Customer logo wall — social proof near first view */}
      <LogoWall tone="white" {...(lang === "en" ? { heading: "Chosen on the front lines of meeting generation, across every industry" } : {})} />

      {/* 4. The 3 stages (deck p7) — 掴む → 商談化 → 追客 */}
      <Section tone="surface" id="stages">
        <SectionHead
          eyebrow={s.stagesEyebrow}
          title={s.stagesTitle}
          lede={s.stagesLede}
        />
        <StageFlow lang={lang} />
        <p style={{ fontSize: 13, color: "var(--sub)", marginTop: 18, textAlign: "center" }}>
          {s.stagesPriceA}
          <Link href="/pricing/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>{s.stagesPriceLink}</Link>
        </p>
      </Section>

      {/* 6. Per-job media walkthrough (screenshots/video → LP) */}
      <StageMedia lang={lang} />

      {/* 7. Cases — one featured story + link to all */}
      {caseStudies.length > 0 && (
        <Section tone="white">
          <SectionHead eyebrow={s.casesEyebrow} title={s.casesTitle} align="center" />
          <FeaturedCase c={caseStudies.find((x) => x.slug === "g-gen-inside-sales-sql-2x") ?? caseStudies[0]} lang={lang} />
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/cases/" className="v2-link" style={{ fontSize: 15, fontWeight: 800, color: "var(--cta-ink)", textDecoration: "none", border: "1.5px solid var(--border2)", borderRadius: 12, padding: "13px 28px", display: "inline-block" }}>
              {s.casesAll}
            </Link>
          </div>
        </Section>
      )}

      {/* 7.5 Slim CTA strip — the walkthrough + case stretch is long with no
          conversion point until the footer; give scrollers an exit here. */}
      <Section tone="navy" py={56}>
        <div className="v2-ctastrip">
          <p className="v2-ctastrip-line">{s.ctaStripLine}</p>
          <CTAButtons source="home-mid" tone="onNavy" size="md" lang={lang} />
        </div>
        <style>{`
          .v2-ctastrip{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}
          .v2-ctastrip-line{font-family:var(--fd);font-size:clamp(20px,2.6vw,26px);font-weight:800;letter-spacing:-.02em;color:var(--on-navy);margin:0}
          @media(max-width:720px){.v2-ctastrip{flex-direction:column;align-items:flex-start;gap:18px}}
        `}</style>
      </Section>

      {/* 8. Soft router — 2×2 grid (even boxes) */}
      <Section tone="surface" py={64}>
        <SectionHead eyebrow={s.routerEyebrow} title={s.routerTitle} align="center" />
        <div className="v2-router-grid">
          {s.router.map((r) => (
            <Link key={r.slug} href={`/${r.slug}/`} className="v2-router-card">
              <span className="v2-router-icon">
                <ProductIcon kind={PRODUCTS[r.slug as keyof typeof PRODUCTS].icon} size={22} />
              </span>
              <span className="v2-router-text">
                <span className="v2-router-q">{r.q}</span>
                <span className="v2-router-a">{r.a} →</span>
              </span>
            </Link>
          ))}
        </div>
        <style>{`
          .v2-router-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:820px;margin:0 auto}
          .v2-router-card{display:flex;gap:16px;align-items:center;background:#fff;border:1px solid var(--border);border-radius:16px;padding:22px 24px;text-decoration:none;box-shadow:0 1px 2px rgba(15,17,40,.04);transition:transform .2s,border-color .2s,box-shadow .2s}
          .v2-router-card:hover{transform:translateY(-2px);border-color:var(--cta);box-shadow:0 12px 28px rgba(15,17,40,.10)}
          .v2-router-icon{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:12px;background:var(--cta-light);color:var(--cta-ink)}
          .v2-router-text{display:flex;flex-direction:column;gap:4px}
          .v2-router-q{font-size:15px;font-weight:700;color:var(--heading);line-height:1.5}
          .v2-router-a{font-size:13px;font-weight:700;color:var(--cta-ink)}
          @media(max-width:560px){.v2-router-grid{grid-template-columns:1fr;gap:14px}}
        `}</style>
      </Section>

      {/* 9. Final CTA */}
      <Section tone="navyDeep" py={76}>
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(28px,4.4vw,42px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            {s.finalTitle}
          </h2>
          <p style={{ fontSize: 16, color: "var(--on-navy-sub)", margin: "0 0 28px" }}>
            {s.finalSub}
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CTAButtons source="home-footer" tone="onNavy" size="lg" align="center" lang={lang} />
          </div>
        </div>
      </Section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
