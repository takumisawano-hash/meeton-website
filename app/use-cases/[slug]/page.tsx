import type { Metadata } from "next";
import { altLanguages } from '@/app/lib/i18n'
import { notFound } from "next/navigation";
import PlaybookLP, { playbookSchema } from "@/app/components/v2/PlaybookLP";
import { getMoment, MOMENT_SLUGS } from "@/app/lib/playbook-data";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return MOMENT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getMoment(slug);
  if (!data) return {};
  return {
    title: { absolute: data.metaTitle },
    description: data.metaDescription,
    alternates: altLanguages(`/use-cases/${slug}/`, "ja"),
    openGraph: { title: data.metaTitle, description: data.metaDescription, url: `https://dynameet.ai/use-cases/${slug}/`, type: "website" },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getMoment(slug);
  if (!data) notFound();
  const { faq, breadcrumb } = playbookSchema(data, `/use-cases/${slug}/`);
  return (
    <>
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PlaybookLP data={data} />
    </>
  );
}
