import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CompareLP, { compareFaqSchema, compareBreadcrumb } from "@/app/components/v2/CompareLP";
import { getCompareEn, alternativeSlugs } from "@/app/lib/compare-data";
import { altLanguages, ogLocale } from "@/app/lib/i18n";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return alternativeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getCompareEn(slug);
  if (!data || !data.alternative) return {};
  const url = `https://dynameet.ai/en/alternatives/${slug}/`;
  const title = `${data.competitorName} alternative｜${data.productName} (AI SDR)`;
  const desc = `For those considering switching from or replacing ${data.competitorName}. We organize the differences with ${data.productName} and what changes with an AI SDR. ${data.metaDescription}`;
  return {
    title: { absolute: title },
    description: desc.slice(0, 158),
    alternates: altLanguages(`/alternatives/${slug}/`, "en"),
    openGraph: { title, description: desc.slice(0, 158), url, type: "website", locale: ogLocale("en") },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getCompareEn(slug);
  if (!data || !data.alternative) notFound();
  const path = `/en/alternatives/${slug}/`;
  const label = `${data.competitorName} alternative (${data.productName})`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareFaqSchema(data, path)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareBreadcrumb(data, path, label, "en")) }} />
      <CompareLP data={data} mode="alternative" lang="en" />
    </>
  );
}
