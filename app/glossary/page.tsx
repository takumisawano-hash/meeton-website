import type { Metadata } from "next";
import { altLanguages } from '@/app/lib/i18n'
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { Section, SectionHead, Eyebrow, Card } from "@/app/components/v2/ui";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { CLUSTERS, CLUSTER_ORDER, type ClusterId } from "@/app/lib/content-clusters";
import { allTerms } from "@/app/lib/glossary-data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "用語集｜Meeton ai — AI SDR・商談化の用語解説" },
  description:
    "AI SDR・インサイドセールス・商談化に関する用語を、結論先出しで解説。AI SDR とは / Speed to Lead とは / 商談化率とは など、Meeton ai が現場の定義でまとめた用語集。",
  alternates: altLanguages("/glossary/", 'ja'),
  openGraph: { title: "用語集｜Meeton ai", description: "AI SDR・商談化の用語を結論先出しで解説。", url: "https://dynameet.ai/glossary/", type: "website" },
};

export default function Page() {
  const terms = allTerms();
  const byCluster: Record<ClusterId, typeof terms> = { library: [], calendar: [], email: [], chat: [], ads: [], "ai-sdr": [] };
  for (const t of terms) byCluster[t.cluster].push(t);

  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Meeton ai 用語集",
    url: "https://dynameet.ai/glossary/",
    hasDefinedTerm: terms.map((t) => ({ "@type": "DefinedTerm", name: t.term, url: `https://dynameet.ai/glossary/${t.slug}/` })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />
      <Section tone="navy" py={0} style={{ paddingTop: 122, paddingBottom: 52 }}>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow tone="dark">用語集</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(30px,4.6vw,46px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            AI SDR・商談化の用語集
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "18px 0 0" }}>
            現場の定義で、結論から。AI SDR とは何か、商談化をどう測るか——重要用語をまとめました。
          </p>
        </div>
      </Section>

      <Section tone="white">
        {terms.length === 0 ? (
          <p style={{ color: "var(--sub)" }}>用語を準備中です。</p>
        ) : (
          CLUSTER_ORDER.map((cid) =>
            byCluster[cid].length === 0 ? null : (
              <div key={cid} style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--heading)", margin: "0 0 16px" }}>{CLUSTERS[cid].label}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                  {byCluster[cid].map((t) => (
                    <Link key={t.slug} href={`/glossary/${t.slug}/`} style={{ textDecoration: "none" }}>
                      <Card style={{ height: "100%" }}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 6px" }}>{t.term}</h3>
                        <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--text)", margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{t.shortDef}</p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )
          )
        )}
      </Section>

      {/* Conversion strip — the glossary is a high-traffic AEO surface and
          previously had zero CTA (2026-07-02 CRO audit). */}
      <Section tone="navy" py={56}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <p style={{ margin: 0, fontSize: "clamp(20px,2.6vw,26px)", fontWeight: 800, color: "var(--on-navy)", letterSpacing: "-0.02em" }}>用語の先にある「商談化」を、実際に見る。</p>
            <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--on-navy-sub)" }}>30分のデモで、AI SDR が自社サイトでどう動くかを確認できます。</p>
          </div>
          <CTAButtons source="glossary-hub" tone="onNavy" size="md" />
        </div>
      </Section>
      <Footer />
    </>
  );
}
