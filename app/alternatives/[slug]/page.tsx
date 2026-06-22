import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CompareLP, { compareFaqSchema, compareBreadcrumb } from "@/app/components/v2/CompareLP";
import { getCompare, alternativeSlugs } from "@/app/lib/compare-data";
import { altLanguages } from "@/app/lib/i18n";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return alternativeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getCompare(slug);
  if (!data || !data.alternative) return {};
  const url = `https://dynameet.ai/alternatives/${slug}/`;
  const title = `${data.competitorName} の代替｜${data.productName}（AI SDR）`;
  const desc = `${data.competitorName} からの乗り換え・代替を検討する方へ。${data.productName} との違いと、AI SDR で何が変わるかを整理。${data.metaDescription}`;
  return {
    title: { absolute: title },
    description: desc.slice(0, 158),
    alternates: altLanguages(`/alternatives/${slug}/`, "ja"),
    openGraph: { title, description: desc.slice(0, 158), url, type: "website" },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getCompare(slug);
  if (!data || !data.alternative) notFound();
  const path = `/alternatives/${slug}/`;
  const label = `${data.competitorName} の代替（${data.productName}）`;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareFaqSchema(data, path)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareBreadcrumb(data, path, label)) }} />
      <CompareLP data={data} mode="alternative" />
    </>
  );
}
