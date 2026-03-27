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
    title: `${integration.name}連携 | Meeton ai`,
    description: integration.ja.description,
    alternates: {
      canonical: `/ja/integrations/${slug}/`,
      languages: {
        en: `/integrations/${slug}/`,
      },
    },
    openGraph: {
      title: `${integration.name}連携 | Meeton ai`,
      description: integration.ja.description,
      url: `https://dynameet.ai/ja/integrations/${slug}/`,
      siteName: "Meeton ai",
      locale: "ja_JP",
      type: "website",
    },
  };
}

export default async function JaIntegrationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const integration = integrations.find((i) => i.slug === slug);
  if (!integration) notFound();

  return <IntegrationDetailLayout integration={integration} lang="ja" />;
}
