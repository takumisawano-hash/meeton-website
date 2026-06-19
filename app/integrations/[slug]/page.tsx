import IntegrationDetailLayout from "@/app/components/IntegrationDetailLayout";
import { integrations } from "@/lib/integrations-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return integrations.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const integration = integrations.find((i) => i.slug === slug);
  if (!integration) return {};

  return {
    title: `${integration.name} Integration`,
    description: integration.en.description,
    alternates: {
      canonical: `/integrations/${slug}/`,
      // Full hreflang cluster: every alternate must include a self-reference
      // and an x-default, else Google treats the cluster as invalid and may
      // ignore it (duplicate-content risk vs the near-identical JA page).
      // x-default → JA: the site is Japanese-primary.
      languages: {
        en: `/integrations/${slug}/`,
        ja: `/ja/integrations/${slug}/`,
        "x-default": `/ja/integrations/${slug}/`,
      },
    },
    openGraph: {
      title: `${integration.name} Integration`,
      description: integration.en.description,
      url: `https://dynameet.ai/integrations/${slug}/`,
      siteName: "Meeton ai",
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const integration = integrations.find((i) => i.slug === slug);
  if (!integration) notFound();

  return <IntegrationDetailLayout integration={integration} lang="en" />;
}
