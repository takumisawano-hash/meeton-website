import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, Check } from "@/app/components/v2/ui";
import type { CompareData } from "@/app/lib/compare-data";

// Compare/alternatives BOFU template (spec §2.3): 結論先出し → 比較表(自社優位を
// data で) → 使い分け(公正) → 製品LPへCTA. FAQ schema + canonical in the route.
// Server-rendered; comparison is a semantic <table> (AEO §4.16 / scannable §3.2).

const th: React.CSSProperties = { textAlign: "left", padding: "13px 16px", fontWeight: 800, color: "var(--heading)", borderBottom: "2px solid var(--border)", fontSize: 14 };
const td: React.CSSProperties = { padding: "13px 16px", color: "var(--text)", borderBottom: "1px solid var(--border)", fontSize: 14, lineHeight: 1.7, verticalAlign: "top" };

export default function CompareLP({ data, mode = "compare" }: { data: CompareData; mode?: "compare" | "alternative" }) {
  const src = `${mode}-${data.slug}`;
  const heading =
    mode === "alternative"
      ? `${data.competitorName} の代替に、${data.productName}。`
      : `${data.productName} と ${data.competitorName}、どちらを選ぶ？`;
  return (
    <>
      <Nav />

      {/* Hero + 結論先出し */}
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 60 }}>
        <div style={{ maxWidth: 820 }}>
          <Eyebrow tone="dark">{mode === "alternative" ? `${data.competitorName} 代替` : `比較 — ${data.category}`}</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            {heading}
          </h1>
          {/* 結論 — self-contained answer for AEO passage extraction */}
          <div style={{ background: "var(--navy-2)", border: "1px solid var(--on-navy-border)", borderRadius: 14, padding: "18px 20px", margin: "24px 0 28px" }}>
            <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: "var(--cta)", marginBottom: 8 }}>結論</div>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--on-navy)", margin: 0 }}>{data.verdict}</p>
          </div>
          <CTAButtons source={`${src}-hero`} tone="onNavy" size="lg" />
        </div>
      </Section>

      {/* Comparison table */}
      <Section tone="white">
        <SectionHead eyebrow="比較表" title={`${data.productName} vs ${data.competitorName}`} />
        <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
            <thead>
              <tr>
                <th style={th}>比較項目</th>
                <th style={{ ...th, color: "var(--cta-ink)" }}>{data.productName}</th>
                <th style={th}>{data.competitorName}</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((r, i) => (
                <tr key={i}>
                  <td style={{ ...td, fontWeight: 700, color: "var(--heading)", whiteSpace: "nowrap" }}>{r.dim}</td>
                  <td style={{ ...td, background: r.meetonWins ? "var(--cta-wash)" : undefined, fontWeight: r.meetonWins ? 700 : 400, color: r.meetonWins ? "var(--heading)" : "var(--text)" }}>
                    {r.meeton}
                  </td>
                  <td style={td}>{r.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: "var(--sub)", marginTop: 12 }}>
          ※ {data.competitorName} の情報は公開情報に基づく参考です（最新の仕様は各社公式をご確認ください）。
        </p>
      </Section>

      {/* 使い分け (fair) */}
      <Section tone="surface">
        <SectionHead eyebrow="使い分け" title="どちらが、あなたに向くか。" lede={data.competitorStrength} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          <Card style={{ border: "2px solid var(--cta)" }}>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 12px" }}>{data.productName} が向くケース</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {data.chooseMeeton.map((x) => (
                <li key={x} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14, lineHeight: 1.7, color: "var(--text)" }}><Check size={17} /> {x}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 12px" }}>{data.competitorName} が向くケース</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {data.chooseCompetitor.map((x) => (
                <li key={x} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14, lineHeight: 1.7, color: "var(--text)" }}>
                  <span style={{ color: "var(--sub)", flexShrink: 0 }}>・</span> {x}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* CTA to product LP */}
      <Section tone="navy" py={60}>
        <div style={{ maxWidth: 720 }}>
          <Eyebrow tone="dark">{data.productName}</Eyebrow>
          <p style={{ fontSize: "clamp(20px,3vw,28px)", lineHeight: 1.6, color: "var(--on-navy)", fontWeight: 700, margin: "16px 0 20px" }}>
            まずは無料で、{data.productName} を試す。
          </p>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
            <CTAButtons source={`${src}-mid`} tone="onNavy" size="md" />
            <Link href={`/${data.product}/`} style={{ color: "var(--cta)", fontWeight: 700, textDecoration: "none" }}>
              {data.productName} の詳細 →
            </Link>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      {data.faq.length > 0 && (
        <Section tone="white">
          <SectionHead eyebrow="よくある質問" title="FAQ" align="center" />
          <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 14 }}>
            {data.faq.map((f) => (
              <Card key={f.q}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{f.q}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{f.a}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Sources (credibility / AEO citability) */}
      {data.sources && data.sources.length > 0 && (
        <Section tone="surface" py={48}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "var(--sub)", marginBottom: 10 }}>参考・出典</div>
            <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6 }}>
              {data.sources.map((s, i) => (
                <li key={i} style={{ fontSize: 12, color: "var(--sub)", lineHeight: 1.6 }}>
                  {s.claim}（{s.source}）
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <Section tone="navyDeep" py={68}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(24px,3.6vw,34px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            迷ったら、無料で両方の手触りを。
          </h2>
          <p style={{ fontSize: 15, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>クレジットカード不要。{data.productName} は今日から動きます。</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source={`${src}-footer`} tone="onNavy" size="lg" align="center" /></div>
        </div>
      </Section>

      <Footer />
    </>
  );
}

export function compareFaqSchema(data: CompareData, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `https://dynameet.ai${path}`,
    mainEntity: data.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function compareBreadcrumb(data: CompareData, path: string, label: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://dynameet.ai/" },
      { "@type": "ListItem", position: 2, name: label, item: `https://dynameet.ai${path}` },
    ],
  };
}
