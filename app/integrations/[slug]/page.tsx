import IntegrationDetailLayout from "@/app/components/IntegrationDetailLayout";
import { integrations } from "@/lib/integrations-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// /integrations/[slug]/ — JAPANESE detail (JA at root; EN twin at
// /en/integrations/[slug]/). Swapped from the legacy inverted IA 2026-07-02.

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
    title: `${integration.name}連携`,
    description: integration.ja.description,
    alternates: {
      canonical: `/integrations/${slug}/`,
      languages: {
        ja: `/integrations/${slug}/`,
        en: `/en/integrations/${slug}/`,
        "x-default": `/integrations/${slug}/`,
      },
    },
    openGraph: {
      title: `${integration.name}連携`,
      description: integration.ja.description,
      url: `https://dynameet.ai/integrations/${slug}/`,
      siteName: "Meeton ai",
      locale: "ja_JP",
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

  return <IntegrationDetailLayout integration={integration} lang="ja" />;
}
