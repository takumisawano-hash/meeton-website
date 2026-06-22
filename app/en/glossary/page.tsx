import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { Section, Eyebrow, Card } from "@/app/components/v2/ui";
import { CLUSTER_ORDER, type ClusterId } from "@/app/lib/content-clusters";
import { allTermsEn } from "@/app/lib/glossary-data";
import { altLanguages, ogLocale } from "@/app/lib/i18n";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Glossary｜Meeton ai — AI SDR & meeting-conversion terms" },
  description:
    "Terms on AI SDR, inside sales, and meeting conversion, explained verdict-first. What is an AI SDR / What is Speed to Lead / What is the meeting-conversion rate — a glossary compiled by Meeton ai with on-the-ground definitions.",
  alternates: altLanguages("/glossary/", "en"),
  openGraph: { title: "Glossary｜Meeton ai", description: "AI SDR & meeting-conversion terms, explained verdict-first.", url: "https://dynameet.ai/en/glossary/", type: "website", locale: ogLocale("en") },
};

// English cluster labels (content-clusters.ts stores JA only).
const CLUSTER_LABEL_EN: Record<ClusterId, string> = {
  library: "Content sharing & tracking",
  calendar: "Scheduling & meeting conversion",
  email: "Follow-up & nurturing",
  chat: "Web engagement & chat meeting conversion",
  "ai-sdr": "AI SDR / category",
};

export default function Page() {
  const terms = allTermsEn();
  const byCluster: Record<ClusterId, typeof terms> = { library: [], calendar: [], email: [], chat: [], "ai-sdr": [] };
  for (const t of terms) byCluster[t.cluster].push(t);

  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Meeton ai Glossary",
    url: "https://dynameet.ai/en/glossary/",
    hasDefinedTerm: terms.map((t) => ({ "@type": "DefinedTerm", name: t.term, url: `https://dynameet.ai/en/glossary/${t.slug}/` })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav lang="en" />
      <Section tone="navy" py={0} style={{ paddingTop: 122, paddingBottom: 52 }}>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow tone="dark">Glossary</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(30px,4.6vw,46px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            AI SDR & meeting-conversion glossary
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "18px 0 0" }}>
            On-the-ground definitions, verdict-first. What an AI SDR is, how to measure meeting conversion — we've compiled the key terms.
          </p>
        </div>
      </Section>

      <Section tone="white">
        {terms.length === 0 ? (
          <p style={{ color: "var(--sub)" }}>Terms are being prepared.</p>
        ) : (
          CLUSTER_ORDER.map((cid) =>
            byCluster[cid].length === 0 ? null : (
              <div key={cid} style={{ marginBottom: 40 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--heading)", margin: "0 0 16px" }}>{CLUSTER_LABEL_EN[cid]}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                  {byCluster[cid].map((t) => (
                    <Link key={t.slug} href={`/en/glossary/${t.slug}/`} style={{ textDecoration: "none" }}>
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
      <Footer lang="en" />
    </>
  );
}
