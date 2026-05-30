import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GlossaryLP, { glossarySchema } from "@/app/components/v2/GlossaryLP";
import { getTerm, allTermSlugs } from "@/app/lib/glossary-data";

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
    alternates: { canonical: `/glossary/${term}/` },
    openGraph: { title: data.metaTitle, description: data.metaDescription, url: `https://dynameet.ai/glossary/${term}/`, type: "article" },
  };
}

export default async function Page({ params }: { params: Promise<{ term: string }> }) {
  const { term } = await params;
  const data = getTerm(term);
  if (!data) notFound();
  const { defined, faq } = glossarySchema(data);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(defined) }} />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />}
      <GlossaryLP data={data} />
    </>
  );
}
