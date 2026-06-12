import type { Metadata } from "next";
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

// Stage page for ①掴む・育てる — merges Chat (会話で掴む) + Library (資料で育てる)
// into ONE job-led page (2026-06-04, Takumi: 製品名は誰も興味ない). Product
// names appear small as the means; the JOB is the headline. /chat and /library
// stay as SEO landing pages and are linked from here for detail.

const chat = PRODUCTS.chat;
const library = PRODUCTS.library;

export const metadata: Metadata = {
  title: { absolute: "掴む・育てる｜潜在層を会話と資料でリードに変える｜Meeton ai" },
  description:
    "問い合わせ前の潜在層を、会話で掴み、資料で育ててリードにする。AIチャットが訪問者と対話し、AIが解説する資料で検討を前に進める——AI SDR の最初の仕事「掴む・育てる」を Meeton ai で。",
  alternates: { canonical: "/capture/" },
  openGraph: {
    title: "掴む・育てる｜潜在層をリードに変える｜Meeton ai",
    description: "会話で掴み、資料で育てる。問い合わせ前の潜在層をリードに変える AI SDR の最初の仕事。",
    url: "https://dynameet.ai/capture/",
    type: "website",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://dynameet.ai/" },
    { "@type": "ListItem", position: 2, name: "掴む・育てる", item: "https://dynameet.ai/capture/" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: "https://dynameet.ai/capture/",
  mainEntity: [
    { "@type": "Question", name: "「掴む・育てる」とは何をする仕事ですか？", acceptedAnswer: { "@type": "Answer", text: "AI SDR の最初の仕事で、問い合わせ前の潜在層をリードに変えるフェーズです。Meeton ai では、AIチャットが訪問者に話しかけて会話で掴み（リード化）、AIが解説する資料で検討を育てて前に進めます。買い手は購買の約70%を営業接触前に独力で進めるため、この段階で掴めるかどうかが商談数を左右します。" } },
    { "@type": "Question", name: "会話と資料、どちらから始めるべきですか？", acceptedAnswer: { "@type": "Answer", text: "匿名訪問者が多く離脱が課題ならチャット（会話で掴む）から、送った資料の反応が見えず追えないなら資料共有（資料で育てる）から始めるのが目安です。両方つなぐと、会話で掴んだ相手に最適な資料を渡し、開封を見て次の一手を打てます。まず30分のデモで自社に合う入り方を確認できます。" } },
  ],
};

const SUBS = [
  {
    key: "chat", // productMedia slug + ProductAnim kind (ChatScene)
    job: "会話で、掴む",
    transform: "匿名の訪問者 → リード",
    product: chat,
    href: "/chat/",
    desc: "問い合わせを待たず、AIチャットが訪問者に話しかける。接触前の検討の土台に立ち、Webでは出せない答えをその場で渡してリードに変える。",
    points: ["シナリオ設計不要・設置5分", "過去の閲覧/会話の文脈を引き継ぐ", "温まったら予約へ繋ぐ"],
  },
  {
    key: "library", // productMedia slug + ProductAnim kind (LibraryScene)
    job: "資料で、育てる",
    transform: "まだ早い見込み客 → 温まったリード",
    product: library,
    href: "/library/",
    desc: "まだ商談には早い見込み客を、資料で自動ナーチャリング。関心に合わせた資料を届け、AIが内容を解説し、反応を見て次の一手を出す。検討が温まるまで、放置せず育て続ける。",
    points: ["関心に合った資料を自動で届ける", "AIが資料の疑問に答え理解を進める", "反応を見て育成し、温まったら次の仕事へ"],
  },
];

// Animation/media for a sub-job — resolves public/product/<slug>.(mp4|png) and
// falls back to the detailed mock animation (ChatScene / LibraryScene), same as
// the product LPs and home StageMedia.
function CaptureMedia({ slug }: { slug: string }) {
  const m = productMedia(slug);
  if (m?.kind === "video") return <video src={m.src} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
  if (m?.kind === "image") return <Image src={m.src} alt={`${slug} のデモ`} fill sizes="(max-width:900px) 100vw, 560px" style={{ objectFit: "cover" }} />;
  return <ProductAnim kind={slug} />;
}

export default function Page() {
  const proof = FEATURED_CASES.find((c) => c.slug === "biztex-chat-leads-10x");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <a href="#main" className="v2-skip">本文へスキップ</a>
      <Nav />
      <main id="main">

      {/* Hero — JOB is the headline, products are means */}
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 64 }}>
        <div style={{ maxWidth: 820 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <Eyebrow tone="dark">AI SDR の3つの仕事</Eyebrow>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--cta)", background: "var(--on-navy-surface)", border: "1px solid var(--on-navy-border)", borderRadius: 999, padding: "5px 12px" }}>
              ① 掴む・育てる（潜在層 → リード）
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.18, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            訪問者を<span style={{ color: "var(--cta)" }}>掴み</span>、リードに<span style={{ color: "var(--cta)" }}>育てる</span>。
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "20px 0 30px", maxWidth: 700 }}>
            買い手は購買の約70%を、営業に接触する前に独力で進めます（Gartner/6sense）。その時間に会話で掴み、資料で育てて——問い合わせ前の潜在層を、商談につながるリードに変えます。
          </p>
          <CTAButtons source="capture-hero" tone="onNavy" size="lg" />
        </div>
      </Section>

      <LogoWall tone="surface" />

      {/* Two jobs: 会話で掴む / 資料で育てる — text + animated demo, alternating */}
      <Section tone="white">
        <SectionHead eyebrow="この仕事は、2つの動きでできている" title="会話で掴み、資料で育てる。" align="center" />
        <div className="cap-rows">
          {SUBS.map((s, i) => (
            <div key={s.job} className={`cap-row ${i % 2 === 1 ? "rev" : ""}`}>
              <div className="cap-media"><CaptureMedia slug={s.key} /></div>
              <div className="cap-body">
                <div style={{ color: "var(--cta)", marginBottom: 10 }}>
                  <ProductIcon kind={s.product.icon} size={26} />
                </div>
                <h3 className="cap-title">{s.job}</h3>
                <div className="cap-transform">{s.transform}</div>
                <p className="cap-desc">{s.desc}</p>
                <ul className="cap-points">
                  {s.points.map((p) => (
                    <li key={p} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}><Check size={16} /> {p}</li>
                  ))}
                </ul>
                {/* product name as the means — small, linking to the SEO landing page */}
                <Link href={s.href} className="v2-link" style={{ fontSize: 13, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "none" }}>
                  この動きを担う {s.product.productName} の詳細 →
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
      {proof && (
        <Section tone="navy">
          <div className="cap-proof" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "var(--fd)", fontSize: "clamp(40px,7vw,72px)", fontWeight: 800, color: "var(--cta)", lineHeight: 1 }}>{proof.heroMetric}</div>
              <div style={{ fontSize: 13, color: "var(--on-navy-sub)", marginTop: 8, maxWidth: 220 }}>{proof.heroMetricLabel}</div>
            </div>
            <div>
              <p style={{ fontSize: "clamp(17px,2.2vw,22px)", lineHeight: 1.7, color: "var(--on-navy)", fontWeight: 600, margin: 0 }}>「{proof.quote}」</p>
              <div style={{ fontSize: 13, color: "var(--on-navy-sub)", marginTop: 14 }}>— {proof.name}（{proof.industry}）</div>
            </div>
          </div>
        </Section>
      )}

      {/* Next stage teaser */}
      <Section tone="surface" py={56}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow>次の仕事</Eyebrow>
          <p style={{ fontSize: "clamp(18px,2.6vw,24px)", lineHeight: 1.6, color: "var(--heading)", fontWeight: 700, margin: "16px 0 18px" }}>
            掴んで育てたリードは、次に<Link href="/calendar/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>商談化</Link>し、逃したら<Link href="/email/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>追客</Link>へ。
          </p>
          <Link href="/#stages" className="v2-link" style={{ fontSize: 14, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "underline" }}>
            AI SDR の3つの仕事を見る →
          </Link>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="white">
        <SectionHead eyebrow="よくある質問" title="「掴む・育てる」のFAQ" align="center" />
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 14 }}>
          {faqSchema.mainEntity.map((f) => (
            <Card key={f.name}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{f.name}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{f.acceptedAnswer.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="navyDeep" py={72}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            まず「掴む・育てる」を、デモで。
          </h2>
          <p style={{ fontSize: 16, color: "var(--on-navy-sub)", margin: "0 0 28px" }}>30分のデモで、自社サイトでの掴み方・育て方を具体的に確認できます。</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source="capture-footer" tone="onNavy" size="lg" align="center" /></div>
        </div>
      </Section>
      </main>

      <Footer />
    </>
  );
}
