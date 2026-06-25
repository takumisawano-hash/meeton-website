import Link from "next/link";
import Image from "next/image";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, ProductIcon, Check } from "@/app/components/v2/ui";
import LogoWall from "@/app/components/v2/LogoWall";
import { FEATURED_CASES } from "@/app/lib/featured-cases";
import { PRODUCTS } from "@/app/lib/product-lp-data";
import { productMedia } from "@/app/lib/product-media";
import ProductAnim from "@/app/components/v2/ProductAnim";
import DemoFrame from "@/app/components/v2/DemoFrame";
import type { Lang } from "@/app/lib/i18n";

// Lang-aware ①掴む・育てる stage page. JA is the default → the existing
// /capture/ page renders byte-identically. The embedded product demo HTML
// stays Japanese (known follow-up); only page copy is translated.

const chat = PRODUCTS.chat;
const library = PRODUCTS.library;

type Sub = {
  key: string;
  job: string;
  transform: string;
  product: typeof chat;
  href: string;
  desc: string;
  points: string[];
  detailA: string; // "この動きを担う {product} の詳細" → split around product name
  detailB: string;
};

type CaptureStrings = {
  metaTitleAbsolute: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  skip: string;
  eyebrow: string;
  heroBadge: string;
  heroH1: React.ReactNode;
  heroSub: string;
  jobsEyebrow: string;
  jobsTitle: string;
  proofName: string;
  proofIndustry: string;
  proofQuote: string;
  proofMetricLabel: string;
  nextEyebrow: string;
  nextLine: React.ReactNode;
  nextLink: string;
  faqEyebrow: string;
  faqTitle: string;
  finalTitle: string;
  finalSub: string;
  subs: Sub[];
  faq: { name: string; text: string }[];
};

export const CAPTURE_STR: Record<Lang, CaptureStrings> = {
  ja: {
    metaTitleAbsolute: "掴む・育てる｜潜在層を会話と資料でリードに変える｜Meeton ai",
    metaDescription:
      "問い合わせ前の潜在層を、会話で掴み、資料で育ててリードにする。AIチャットが訪問者と対話し、AIが解説する資料で検討を前に進める——AI SDR の最初の仕事「掴む・育てる」を Meeton ai で。",
    ogTitle: "掴む・育てる｜潜在層をリードに変える｜Meeton ai",
    ogDescription: "会話で掴み、資料で育てる。問い合わせ前の潜在層をリードに変える AI SDR の最初の仕事。",
    skip: "本文へスキップ",
    eyebrow: "AI SDR の3つの仕事",
    heroBadge: "① 掴む・育てる（潜在層 → リード）",
    heroH1: (
      <>
        訪問者を<span style={{ color: "var(--cta)" }}>掴み</span>、リードに<span style={{ color: "var(--cta)" }}>育てる</span>。
      </>
    ),
    heroSub:
      "買い手は購買の約70%を、営業に接触する前に独力で進めます（Gartner/6sense）。その時間に会話で掴み、資料で育てて——問い合わせ前の潜在層を、商談につながるリードに変えます。",
    jobsEyebrow: "この仕事は、2つの動きでできている",
    jobsTitle: "会話で掴み、資料で育てる。",
    proofName: "BizteX 株式会社",
    proofIndustry: "SaaS",
    proofQuote: "従来は月1〜2件。Meeton ai にしてから月20件以上——20倍以上のリードがチャットから生まれている。",
    proofMetricLabel: "チャット経由のリード獲得数（対 従来型チャット）",
    nextEyebrow: "次の仕事",
    nextLine: (
      <>
        掴んで育てたリードは、次に<Link href="/calendar/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>商談化</Link>し、逃したら<Link href="/email/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>追客</Link>へ。
      </>
    ),
    nextLink: "AI SDR の3つの仕事を見る →",
    faqEyebrow: "よくある質問",
    faqTitle: "「掴む・育てる」のFAQ",
    finalTitle: "まず「掴む・育てる」を、デモで。",
    finalSub: "30分のデモで、自社サイトでの掴み方・育て方を具体的に確認できます。",
    subs: [
      {
        key: "chat",
        job: "会話で、掴む",
        transform: "匿名の訪問者 → リード",
        product: chat,
        href: "/chat/",
        desc: "問い合わせを待たず、AIチャットが訪問者に話しかける。接触前の検討の土台に立ち、Webでは出せない答えをその場で渡してリードに変える。",
        points: ["シナリオ設計不要・設置5分", "過去の閲覧/会話の文脈を引き継ぐ", "温まったら予約へ繋ぐ"],
        detailA: "この動きを担う ",
        detailB: " の詳細 →",
      },
      {
        key: "library",
        job: "資料で、育てる",
        transform: "まだ早い見込み客 → 温まったリード",
        product: library,
        href: "/library/",
        desc: "まだ商談には早い見込み客を、資料で自動ナーチャリング。関心に合わせた資料を届け、AIが内容を解説し、反応を見て次の一手を出す。検討が温まるまで、放置せず育て続ける。",
        points: ["関心に合った資料を自動で届ける", "AIが資料の疑問に答え理解を進める", "反応を見て育成し、温まったら次の仕事へ"],
        detailA: "この動きを担う ",
        detailB: " の詳細 →",
      },
    ],
    faq: [
      {
        name: "「掴む・育てる」とは何をする仕事ですか？",
        text: "AI SDR の最初の仕事で、問い合わせ前の潜在層をリードに変えるフェーズです。Meeton ai では、AIチャットが訪問者に話しかけて会話で掴み（リード化）、AIが解説する資料で検討を育てて前に進めます。買い手は購買の約70%を営業接触前に独力で進めるため、この段階で掴めるかどうかが商談数を左右します。",
      },
      {
        name: "会話と資料、どちらから始めるべきですか？",
        text: "匿名訪問者が多く離脱が課題ならチャット（会話で掴む）から、送った資料の反応が見えず追えないなら資料共有（資料で育てる）から始めるのが目安です。両方つなぐと、会話で掴んだ相手に最適な資料を渡し、開封を見て次の一手を打てます。まず30分のデモで自社に合う入り方を確認できます。",
      },
    ],
  },
  en: {
    metaTitleAbsolute: "Capture & nurture｜Turn latent prospects into leads with conversation and content｜Meeton ai",
    metaDescription:
      "Capture pre-inquiry latent prospects in conversation, nurture them with content, and turn them into leads. An AI chat talks with visitors, and AI-explained materials move consideration forward — the first job of an AI SDR, capture & nurture, with Meeton ai.",
    ogTitle: "Capture & nurture｜Turn latent prospects into leads｜Meeton ai",
    ogDescription: "Capture in conversation, nurture with content. The first job of an AI SDR — turning pre-inquiry prospects into leads.",
    skip: "Skip to content",
    eyebrow: "The three jobs of an AI SDR",
    heroBadge: "① Capture & nurture (latent prospects → leads)",
    heroH1: (
      <>
        <span style={{ color: "var(--cta)" }}>Capture</span> visitors and <span style={{ color: "var(--cta)" }}>nurture</span> them into leads.
      </>
    ),
    heroSub:
      "B2B buyers complete about 70% of the purchase process on their own before contacting sales (Gartner/6sense). During that window, capture them in conversation and nurture them with content — turning pre-inquiry prospects into leads that lead to meetings.",
    jobsEyebrow: "This job is made of two moves",
    jobsTitle: "Capture in conversation, nurture with content.",
    proofName: "BizteX, Inc.",
    proofIndustry: "SaaS",
    proofQuote: "Previously 1–2 a month. Since switching to Meeton ai, 20+ a month — more than 20x the leads are born from chat.",
    proofMetricLabel: "Chat-sourced leads acquired (vs. conventional chat)",
    nextEyebrow: "The next job",
    nextLine: (
      <>
        Leads you capture and nurture next move to <Link href="/calendar/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>convert</Link>, and if missed, to <Link href="/email/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>win back</Link>.
      </>
    ),
    nextLink: "See the three jobs of an AI SDR →",
    faqEyebrow: "FAQ",
    faqTitle: "Capture & nurture FAQ",
    finalTitle: "See capture & nurture in a demo first.",
    finalSub: "In a 30-minute demo, see concretely how to capture and nurture on your own site.",
    subs: [
      {
        key: "chat",
        job: "Capture, in conversation",
        transform: "Anonymous visitors → leads",
        product: chat,
        href: "/chat/",
        desc: "Without waiting for an inquiry, an AI chat speaks to visitors. It stands at the foundation of pre-contact consideration, hands over answers the website can't, and turns them into leads.",
        points: ["No scenario design, 5-minute setup", "Carries over past browsing / conversation context", "Connects to a booking once warm"],
        detailA: "Details on ",
        detailB: ", which handles this move →",
      },
      {
        key: "library",
        job: "Nurture, with content",
        transform: "Not-yet-ready prospects → warmed leads",
        product: library,
        href: "/library/",
        desc: "Automatically nurture prospects who aren't ready for a meeting yet with content. Deliver materials matched to their interests, have AI explain the content, and make the next move based on their response. Keep nurturing — not neglecting — until consideration warms up.",
        points: ["Auto-delivers content matched to interest", "AI answers questions about the materials to deepen understanding", "Nurtures by response, then moves to the next job once warm"],
        detailA: "Details on ",
        detailB: ", which handles this move →",
      },
    ],
    faq: [
      {
        name: "What does the capture & nurture job do?",
        text: "It is the first job of an AI SDR — the phase that turns pre-inquiry latent prospects into leads. With Meeton ai, an AI chat speaks to visitors and captures them in conversation (lead creation), and AI-explained materials nurture and advance their consideration. Since buyers complete about 70% of the purchase on their own before contacting sales, whether you can capture them at this stage drives your number of meetings.",
      },
      {
        name: "Should I start with conversation or content?",
        text: "If many anonymous visitors and drop-off are your issue, start with chat (capture in conversation). If you can't see the response to materials you sent and can't follow up, start with content sharing (nurture with content). Connecting both lets you hand the right material to someone you captured in conversation and make the next move based on opens. You can confirm the right entry point for your company in a 30-minute demo first.",
      },
    ],
  },
};

export const captureBreadcrumb = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "ホーム", item: lang === "en" ? "https://dynameet.ai/en/" : "https://dynameet.ai/" },
    { "@type": "ListItem", position: 2, name: lang === "en" ? "Capture & nurture" : "掴む・育てる", item: lang === "en" ? "https://dynameet.ai/en/capture/" : "https://dynameet.ai/capture/" },
  ],
});

export const captureFaqSchema = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: lang === "en" ? "https://dynameet.ai/en/capture/" : "https://dynameet.ai/capture/",
  mainEntity: CAPTURE_STR[lang].faq.map((f) => ({
    "@type": "Question",
    name: f.name,
    acceptedAnswer: { "@type": "Answer", text: f.text },
  })),
});

// Animation/media for a sub-job — resolves public/product/<slug>.(mp4|png) and
// falls back to the detailed mock animation. Demo HTML stays Japanese.
function CaptureMedia({ slug, lang = "ja" }: { slug: string; lang?: Lang }) {
  const m = productMedia(slug, lang);
  const demoTitle = lang === "en" ? `${slug} demo` : `${slug} のデモ`;
  if (m?.kind === "html") return <DemoFrame src={m.src} title={demoTitle} />;
  if (m?.kind === "video") return <video src={m.src} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
  if (m?.kind === "image") return <Image src={m.src} alt={demoTitle} fill sizes="(max-width:900px) 100vw, 560px" style={{ objectFit: "cover" }} />;
  return <ProductAnim kind={slug} />;
}

export default function CaptureContent({ lang = "ja" }: { lang?: Lang }) {
  const s = CAPTURE_STR[lang];
  const hasProof = FEATURED_CASES.some((c) => c.slug === "biztex-chat-leads-10x");
  const proofMetric = FEATURED_CASES.find((c) => c.slug === "biztex-chat-leads-10x")?.heroMetric;
  const stagesHref = lang === "en" ? "/en/#stages" : "/#stages";
  return (
    <>
      <a href="#main" className="v2-skip">{s.skip}</a>
      <Nav lang={lang} />
      <main id="main">

      {/* Hero — JOB is the headline, products are means */}
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 64 }}>
        <div style={{ maxWidth: 820 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <Eyebrow tone="dark">{s.eyebrow}</Eyebrow>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--cta)", background: "var(--on-navy-surface)", border: "1px solid var(--on-navy-border)", borderRadius: 999, padding: "5px 12px" }}>
              {s.heroBadge}
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.18, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            {s.heroH1}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "20px 0 30px", maxWidth: 700 }}>
            {s.heroSub}
          </p>
          <CTAButtons source="capture-hero" tone="onNavy" size="lg" lang={lang} />
        </div>
      </Section>

      <LogoWall tone="surface" />

      {/* Two jobs: capture / nurture — text + animated demo, alternating */}
      <Section tone="white">
        <SectionHead eyebrow={s.jobsEyebrow} title={s.jobsTitle} align="center" />
        <div className="cap-rows">
          {s.subs.map((sub, i) => (
            <div key={sub.job} className={`cap-row ${i % 2 === 1 ? "rev" : ""}`}>
              <div className={`cap-media${productMedia(sub.key, lang)?.kind === "html" ? " demo" : ""}`}><CaptureMedia slug={sub.key} lang={lang} /></div>
              <div className="cap-body">
                <div style={{ color: "var(--cta)", marginBottom: 10 }}>
                  <ProductIcon kind={sub.product.icon} size={26} />
                </div>
                <h3 className="cap-title">{sub.job}</h3>
                <div className="cap-transform">{sub.transform}</div>
                <p className="cap-desc">{sub.desc}</p>
                <ul className="cap-points">
                  {sub.points.map((p) => (
                    <li key={p} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}><Check size={16} /> {p}</li>
                  ))}
                </ul>
                {/* product name as the means — small, linking to the SEO landing page */}
                <Link href={sub.href} className="v2-link" style={{ fontSize: 13, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "none" }}>
                  {sub.detailA}{sub.product.productName}{sub.detailB}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          .cap-rows{display:flex;flex-direction:column;gap:clamp(40px,6vw,72px)}
          .cap-row{display:grid;grid-template-columns:1.05fr 1fr;gap:clamp(28px,5vw,64px);align-items:center}
          .cap-row.rev .cap-media{order:2}
          .cap-media{position:relative;width:100%;min-height:clamp(360px,34vw,440px);display:flex;border-radius:18px;overflow:hidden;border:1px solid var(--border);background:var(--surface);box-shadow:0 12px 40px -24px rgba(15,17,40,.30)}
          .cap-media.demo{display:flex;flex-direction:column;justify-content:center;min-height:0;background:var(--navy-2)}
          .cap-title{font-family:var(--fd);font-size:clamp(22px,2.6vw,30px);font-weight:800;color:var(--heading);letter-spacing:-.02em;margin:0 0 6px;line-height:1.3}
          .cap-transform{font-family:var(--fm);font-size:12px;font-weight:700;color:var(--cta-ink);margin-bottom:14px}
          .cap-desc{font-size:16px;line-height:1.85;color:var(--text);margin:0 0 16px}
          .cap-points{list-style:none;padding:0;margin:0 0 20px;display:grid;gap:9px;font-size:14px;line-height:1.7;color:var(--text)}
          @media(max-width:900px){
            .cap-row,.cap-row.rev{grid-template-columns:1fr;gap:20px}
            .cap-row.rev .cap-media{order:0}
          }
          @media(max-width:720px){.cap-proof{grid-template-columns:1fr;gap:24px}}
        `}</style>
      </Section>

      {/* Proof — stacks to 1 column on mobile (.cap-proof rule above) */}
      {hasProof && (
        <Section tone="navy">
          <div className="cap-proof" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "var(--fd)", fontSize: "clamp(40px,7vw,72px)", fontWeight: 800, color: "var(--cta)", lineHeight: 1 }}>{proofMetric}</div>
              <div style={{ fontSize: 13, color: "var(--on-navy-sub)", marginTop: 8, maxWidth: 220 }}>{s.proofMetricLabel}</div>
            </div>
            <div>
              <p style={{ fontSize: "clamp(17px,2.2vw,22px)", lineHeight: 1.7, color: "var(--on-navy)", fontWeight: 600, margin: 0 }}>「{s.proofQuote}」</p>
              <div style={{ fontSize: 13, color: "var(--on-navy-sub)", marginTop: 14 }}>— {s.proofName}（{s.proofIndustry}）</div>
            </div>
          </div>
        </Section>
      )}

      {/* Next stage teaser */}
      <Section tone="surface" py={56}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow>{s.nextEyebrow}</Eyebrow>
          <p style={{ fontSize: "clamp(18px,2.6vw,24px)", lineHeight: 1.6, color: "var(--heading)", fontWeight: 700, margin: "16px 0 18px" }}>
            {s.nextLine}
          </p>
          <Link href={stagesHref} className="v2-link" style={{ fontSize: 14, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "underline" }}>
            {s.nextLink}
          </Link>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="white">
        <SectionHead eyebrow={s.faqEyebrow} title={s.faqTitle} align="center" />
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 14 }}>
          {s.faq.map((f) => (
            <Card key={f.name}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{f.name}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{f.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="navyDeep" py={72}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            {s.finalTitle}
          </h2>
          <p style={{ fontSize: 16, color: "var(--on-navy-sub)", margin: "0 0 28px" }}>{s.finalSub}</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source="capture-footer" tone="onNavy" size="lg" align="center" lang={lang} /></div>
        </div>
      </Section>
      </main>

      <Footer lang={lang} />
    </>
  );
}
