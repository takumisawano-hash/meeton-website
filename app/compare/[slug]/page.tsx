import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CompareLP, { compareFaqSchema, compareBreadcrumb } from "@/app/components/v2/CompareLP";
import { getCompare, allCompareSlugs } from "@/app/lib/compare-data";
import { altLanguages } from "@/app/lib/i18n";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return allCompareSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getCompare(slug);
  if (!data) return {};
  const url = `https://dynameet.ai/compare/${slug}/`;
  return {
    title: { absolute: data.metaTitle },
    description: data.metaDescription,
    alternates: altLanguages(`/compare/${slug}/`, "ja"),
    openGraph: { title: data.metaTitle, description: data.metaDescription, url, type: "website" },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getCompare(slug);
  if (!data) notFound();
  const path = `/compare/${slug}/`;
  const label = `${data.productName} と ${data.competitorName} の比較`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareFaqSchema(data, path)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareBreadcrumb(data, path, label)) }} />
      <CompareLP data={data} mode="compare" />
    </>
  );
}
