import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, Check } from "@/app/components/v2/ui";
import type { CompareData } from "@/app/lib/compare-data";
import type { Lang } from "@/app/lib/i18n";

// Compare/alternatives BOFU template (spec §2.3): 結論先出し → 比較表(自社優位を
// data で) → 使い分け(公正) → 製品LPへCTA. FAQ schema + canonical in the route.
// Server-rendered; comparison is a semantic <table> (AEO §4.16 / scannable §3.2).
// Bilingual: `lang` (JA default) switches the template chrome via STR; the
// comparison copy itself comes from the localized `data` prop. JA omits the
// prop → byte-identical output.

const th: React.CSSProperties = { textAlign: "left", padding: "13px 16px", fontWeight: 800, color: "var(--heading)", borderBottom: "2px solid var(--border)", fontSize: 14 };
const td: React.CSSProperties = { padding: "13px 16px", color: "var(--text)", borderBottom: "1px solid var(--border)", fontSize: 14, lineHeight: 1.7, verticalAlign: "top" };

const STR = {
  ja: {
    altEyebrow: (c: string) => `${c} 代替`,
    compareEyebrow: (cat: string) => `比較 — ${cat}`,
    altHeading: (c: string, p: string) => `${c} の代替に、${p}。`,
    compareHeading: (p: string, c: string) => `${p} と ${c}、どちらを選ぶ？`,
    verdictLabel: "結論",
    tableEyebrow: "比較表",
    tableTitle: (p: string, c: string) => `${p} vs ${c}`,
    colDim: "比較項目",
    sourceNote: (c: string) => `※ ${c} の情報は公開情報に基づく参考です（最新の仕様は各社公式をご確認ください）。`,
    fitEyebrow: "使い分け",
    fitTitle: "どちらが、あなたに向くか。",
    fitMeeton: (p: string) => `${p} が向くケース`,
    fitCompetitor: (c: string) => `${c} が向くケース`,
    heroPrimary: "自社に合う構成を相談する",
    roiLink: "60秒で、自社サイトの商談化の余地を診断する →",
    roiHref: "/tools/roi/",
    midDemo: (p: string) => `${p} を、デモで体験する。`,
    midDetail: (p: string) => `${p} の詳細 →`,
    faqEyebrow: "よくある質問",
    faqTitle: "FAQ",
    sourcesLabel: "参考・出典",
    sourceLine: (claim: string, source: string) => `${claim}（${source}）`,
    finalTitle: "迷ったら、デモで両方の使い勝手を。",
    finalSub: (p: string) => `30分のデモで、${p} の効き方を具体的に確認できます。`,
  },
  en: {
    altEyebrow: (c: string) => `${c} alternative`,
    compareEyebrow: (cat: string) => `Comparison — ${cat}`,
    altHeading: (c: string, p: string) => `${p}, as an alternative to ${c}.`,
    compareHeading: (p: string, c: string) => `${p} or ${c}: which should you choose?`,
    verdictLabel: "Verdict",
    tableEyebrow: "Comparison table",
    tableTitle: (p: string, c: string) => `${p} vs ${c}`,
    colDim: "Criteria",
    sourceNote: (c: string) => `* Information on ${c} is for reference based on public sources (please check each vendor's official page for the latest specs).`,
    fitEyebrow: "Which fits you",
    fitTitle: "Which one is right for you.",
    fitMeeton: (p: string) => `When ${p} fits`,
    fitCompetitor: (c: string) => `When ${c} fits`,
    heroPrimary: "Talk through the right setup",
    roiLink: "Estimate your site's meeting upside in 60 seconds →",
    roiHref: "/en/tools/roi/",
    midDemo: (p: string) => `Experience ${p} in a demo.`,
    midDetail: (p: string) => `Learn more about ${p} →`,
    faqEyebrow: "FAQ",
    faqTitle: "FAQ",
    sourcesLabel: "References & sources",
    sourceLine: (claim: string, source: string) => `${claim} (${source})`,
    finalTitle: "Unsure? Try both in a demo.",
    finalSub: (p: string) => `A 30-minute demo shows exactly how ${p} works for you.`,
  },
} as const;

export default function CompareLP({ data, mode = "compare", lang = "ja" }: { data: CompareData; mode?: "compare" | "alternative"; lang?: Lang }) {
  const src = `${mode}-${data.slug}`;
  const s = STR[lang];
  const en = lang === "en";
  // Product LP href: EN product LPs live at /en/<slug>/; JA at /<slug>/.
  const productHref = en ? `/en/${data.product}/` : `/${data.product}/`;
  const heading =
    mode === "alternative"
      ? s.altHeading(data.competitorName, data.productName)
      : s.compareHeading(data.productName, data.competitorName);
  return (
    <>
      <Nav lang={lang} />

      {/* Hero + 結論先出し */}
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 60 }}>
        <div style={{ maxWidth: 820 }}>
          <Eyebrow tone="dark">{mode === "alternative" ? s.altEyebrow(data.competitorName) : s.compareEyebrow(data.category)}</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            {heading}
          </h1>
          {/* 結論 — self-contained answer for AEO passage extraction */}
          <div style={{ background: "var(--navy-2)", border: "1px solid var(--on-navy-border)", borderRadius: 14, padding: "18px 20px", margin: "24px 0 28px" }}>
            <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: "var(--cta)", marginBottom: 8 }}>{s.verdictLabel}</div>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--on-navy)", margin: 0 }}>{data.verdict}</p>
          </div>
          {/* JA: intent-matched primary (構成相談). EN keeps the trial-first
              default — passing primaryLabel would silently revert to demo. */}
          <CTAButtons source={`${src}-hero`} tone="onNavy" size="lg" lang={lang} {...(en ? {} : { primaryLabel: s.heroPrimary })} />
          {/* tertiary: self-serve diagnostic for comparison shoppers not ready to talk */}
          <div style={{ marginTop: 14 }}>
            <Link href={s.roiHref} className="v2-link" style={{ fontSize: 13.5, fontWeight: 700, color: "var(--cta)", textDecoration: "underline" }}>
              {s.roiLink}
            </Link>
          </div>
        </div>
      </Section>

      {/* Comparison table */}
      <Section tone="white">
        <SectionHead eyebrow={s.tableEyebrow} title={s.tableTitle(data.productName, data.competitorName)} />
        <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
            <thead>
              <tr>
                <th style={th}>{s.colDim}</th>
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
          {s.sourceNote(data.competitorName)}
        </p>
      </Section>

      {/* 使い分け (fair) */}
      <Section tone="surface">
        <SectionHead eyebrow={s.fitEyebrow} title={s.fitTitle} lede={data.competitorStrength} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          <Card style={{ border: "2px solid var(--cta)" }}>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 12px" }}>{s.fitMeeton(data.productName)}</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {data.chooseMeeton.map((x) => (
                <li key={x} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14, lineHeight: 1.7, color: "var(--text)" }}><Check size={17} /> {x}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 12px" }}>{s.fitCompetitor(data.competitorName)}</h3>
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
            {s.midDemo(data.productName)}
          </p>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
            <CTAButtons source={`${src}-mid`} tone="onNavy" size="md" lang={lang} />
            <Link href={productHref} style={{ color: "var(--cta)", fontWeight: 700, textDecoration: "none" }}>
              {s.midDetail(data.productName)}
            </Link>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      {data.faq.length > 0 && (
        <Section tone="white">
          <SectionHead eyebrow={s.faqEyebrow} title={s.faqTitle} align="center" />
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
            <div style={{ fontSize: 13, fontWeight: 800, color: "var(--sub)", marginBottom: 10 }}>{s.sourcesLabel}</div>
            <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6 }}>
              {data.sources.map((s2, i) => (
                <li key={i} style={{ fontSize: 12, color: "var(--sub)", lineHeight: 1.6 }}>
                  {s.sourceLine(s2.claim, s2.source)}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <Section tone="navyDeep" py={68}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(24px,3.6vw,34px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            {s.finalTitle}
          </h2>
          <p style={{ fontSize: 15, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>{s.finalSub(data.productName)}</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source={`${src}-footer`} tone="onNavy" size="lg" align="center" lang={lang} /></div>
        </div>
      </Section>

      <Footer lang={lang} />
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

export function compareBreadcrumb(data: CompareData, path: string, label: string, lang: Lang = "ja") {
  const home = lang === "en" ? "Home" : "ホーム";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: home, item: "https://dynameet.ai/" },
      { "@type": "ListItem", position: 2, name: label, item: `https://dynameet.ai${path}` },
    ],
  };
}
