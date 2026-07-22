import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GlossaryLP, { glossarySchema } from "@/app/components/v2/GlossaryLP";
import { getTerm, allTermSlugs } from "@/app/lib/glossary-data";
import { altLanguages } from "@/app/lib/i18n";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return allTermSlugs().map((term) => ({ term }));
}

export async function generateMetadata({ params }: { params: Promise<{ term: string }> }): Promise<Metadata> {
  const { term } = await params;
  const data = getTerm(term);
  if (!data) return {};
  return {
    title: { absolute: data.metaTitle },
    description: data.metaDescription,
    // "ai-sdr" cannibalization, take 2 (2026-07-22): the cross-page canonical
    // to /ai-sdr/ was IGNORED by Google (this page kept ranking, +362 imp WoW,
    // while the pillar declined) — the two pages are too different for
    // canonical consolidation. New strategy per the approved weekly plan:
    // both pages stay indexable with differentiated intent (glossary = とは
    // definition, pillar = product/commercial) plus explicit cross-links.
    alternates: altLanguages(`/glossary/${term}/`, "ja"),
    openGraph: { title: data.metaTitle, description: data.metaDescription, url: `https://dynameet.ai/glossary/${term}/`, type: "article" },
  };
}

export default async function Page({ params }: { params: Promise<{ term: string }> }) {
  const { term } = await params;
  const data = getTerm(term);
  if (!data) notFound();
  const { defined, faq } = glossarySchema(data);
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://dynameet.ai/" },
      { "@type": "ListItem", position: 2, name: "用語集", item: "https://dynameet.ai/glossary/" },
      { "@type": "ListItem", position: 3, name: data.term, item: `https://dynameet.ai/glossary/${term}/` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(defined) }} />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <GlossaryLP data={data} />
    </>
  );
}
