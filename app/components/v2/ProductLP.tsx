import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, ProductIcon, Check, MAXW } from "@/app/components/v2/ui";
import type { ProductLPData } from "@/app/lib/product-lp-data";
import { COMPARE } from "@/app/lib/compare-data";
import IntegrationLogos, { pickIntegrations } from "@/app/components/v2/IntegrationLogos";

// 8-section product-LP template (spec §2.2). Server-rendered so all copy is
// in the HTML for AEO (§4.16). CTAs are client islands for tracking.

export default function ProductLP({ data }: { data: ProductLPData }) {
  const src = data.slug;
  const compares = Object.values(COMPARE).filter((c) => c.product === data.slug);
  return (
    <>
      <Nav />

      {/* 1. Hero (navy frame) */}
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 76 }}>
        <div style={{ maxWidth: 820 }}>
          <Eyebrow tone="dark">{data.eyebrow}</Eyebrow>
          <p style={{ marginTop: 22, marginBottom: 10, fontSize: 16, color: "var(--cta)", fontWeight: 700 }}>
            {data.problemLine}
          </p>
          <h1
            style={{
              fontFamily: "var(--fd)",
              fontSize: "clamp(32px, 5.2vw, 52px)",
              lineHeight: 1.18,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "var(--on-navy)",
              margin: 0,
            }}
          >
            {data.h1}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "22px 0 30px", maxWidth: 680 }}>
            {data.heroSub}
          </p>
          <CTAButtons source={`${src}-hero`} tone="onNavy" size="lg" />
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 22, fontSize: 13, color: "var(--on-navy-sub)" }}>
            <span>✓ 無料で開始・クレジットカード不要</span>
            <span>✓ Google / Microsoft ワンクリック</span>
            <span>✓ ノーコード設置</span>
          </div>
        </div>
      </Section>

      {/* 2. How it works */}
      <Section tone="white">
        <SectionHead eyebrow="30秒で分かる仕組み" title={`${data.productName} の動き方`} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {data.steps.map((s, i) => (
            <Card key={i}>
              <div style={{ fontFamily: "var(--fm)", fontSize: 13, fontWeight: 700, color: "var(--cta-ink)" }}>
                STEP {i + 1}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--heading)", margin: "10px 0 8px" }}>{s.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>{s.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 3. Differentiation + AI angle */}
      <Section tone="surface">
        <SectionHead eyebrow={data.competitorsLabel} title={data.diffTitle} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {data.diffPoints.map((d, i) => (
            <Card key={i} style={{ background: "#fff" }}>
              <div style={{ color: "var(--cta)", marginBottom: 12 }}>
                <ProductIcon kind="spark" size={22} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{d.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>{d.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 3.5 Compare links (cluster internal linking §4.8) */}
      {compares.length > 0 && (
        <Section tone="white" py={48}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--sub)" }}>比較で見る:</span>
            {compares.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}/`}
                style={{ fontSize: 14, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "none", background: "var(--cta-light)", border: "1px solid #cdeede", borderRadius: 999, padding: "8px 16px" }}
              >
                vs {c.competitorName} →
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* 4. Proof (navy band, green metric) */}
      <Section tone="navy">
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "var(--fd)", fontSize: "clamp(48px,8vw,84px)", fontWeight: 800, color: "var(--cta)", lineHeight: 1 }}>
              {data.proof.metric}
            </div>
            <div style={{ fontSize: 14, color: "var(--on-navy-sub)", marginTop: 8, maxWidth: 220 }}>{data.proof.label}</div>
          </div>
          <div>
            <p style={{ fontSize: "clamp(18px,2.4vw,24px)", lineHeight: 1.7, color: "var(--on-navy)", fontWeight: 600, margin: 0 }}>
              「{data.proof.quote}」
            </p>
            <div style={{ fontSize: 13, color: "var(--on-navy-sub)", marginTop: 14 }}>— {data.proof.source}</div>
          </div>
        </div>
      </Section>

      {/* 5. Stack integrations (real logos) */}
      <Section tone="white" py={64}>
        <SectionHead eyebrow="スタック連携" title="今のスタックに、そのまま挿さる。" align="center" />
        <IntegrationLogos items={pickIntegrations(data.integrations)} />
      </Section>

      {/* 6. Pricing (this product only) */}
      <Section tone="surface">
        <SectionHead
          eyebrow="料金"
          title={`${data.productName} の料金`}
          lede="まず無料で。必要になったら単体Proへ。"
          align="center"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, maxWidth: 720, margin: "0 auto" }}>
          <Card>
            <div style={{ fontFamily: "var(--fm)", fontSize: 13, fontWeight: 700, color: "var(--sub)" }}>無料</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: "var(--heading)", margin: "6px 0 12px" }}>¥0</div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text)", margin: 0 }}>{data.freeTier}</p>
          </Card>
          <Card style={{ border: "2px solid var(--cta)" }}>
            <div style={{ fontFamily: "var(--fm)", fontSize: 13, fontWeight: 700, color: "var(--cta-ink)" }}>単体Pro</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: "var(--heading)", margin: "6px 0 12px" }}>
              {data.proPrice}
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--sub)" }}> / 月（税抜）</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
              {data.proIncludes.map((it) => (
                <li key={it} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14, color: "var(--text)" }}>
                  <Check size={17} /> {it}
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/pricing" style={{ fontSize: 15, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "underline" }}>
            4機能まとめて Meeton ai で（バンドルなら別々より¥3万お得）→
          </Link>
        </div>
      </Section>

      {/* 7. Expansion teaser (navy) */}
      <Section tone="navy" py={64}>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow tone="dark">これは Meeton ai の一部</Eyebrow>
          <p style={{ fontSize: "clamp(20px,3vw,28px)", lineHeight: 1.6, color: "var(--on-navy)", fontWeight: 700, margin: "18px 0 0" }}>
            {data.crossSell}
          </p>
          <div style={{ marginTop: 22, display: "flex", gap: 18, flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "var(--cta)", fontWeight: 700, textDecoration: "none" }}>
              Meeton ai（4機能の統合）を見る →
            </Link>
            <Link href="/pricing" style={{ color: "var(--on-navy-sub)", fontWeight: 700, textDecoration: "none" }}>
              料金を見る →
            </Link>
          </div>
        </div>
      </Section>

      {/* FAQ (AEO — answers self-contained; schema emitted in route) */}
      <Section tone="white">
        <SectionHead eyebrow="よくある質問" title={`${data.productName} のFAQ`} align="center" />
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 14 }}>
          {data.faq.map((f, i) => (
            <Card key={i}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{f.q}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{f.a}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 8. Final CTA (navy deep) */}
      <Section tone="navyDeep" py={72}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            {data.productName} を、無料で試す。
          </h2>
          <p style={{ fontSize: 16, color: "var(--on-navy-sub)", margin: "0 0 28px" }}>
            クレジットカード不要・ノーコード。今日から動き出します。
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CTAButtons source={`${src}-footer`} tone="onNavy" size="lg" align="center" />
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}

/** FAQPage JSON-LD for a product LP — call from the route's server page. */
export function productFaqSchema(data: ProductLPData) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `https://dynameet.ai/${data.slug}`,
    mainEntity: data.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** SoftwareApplication JSON-LD for a product LP. */
export function productAppSchema(data: ProductLPData) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `https://dynameet.ai/${data.slug}#product`,
    name: data.productName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: data.metaDescription,
    url: `https://dynameet.ai/${data.slug}`,
    image: "https://dynameet.ai/logo-dark.svg",
    publisher: { "@id": "https://dynameet.ai/#organization" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
      description: "無料ティアあり（クレジットカード不要）。単体Proは" + data.proPrice + "/月（税抜）。",
    },
  };
}

const PRODUCT_PATH = (slug: string) => `https://dynameet.ai/${slug}`;
export { PRODUCT_PATH };
