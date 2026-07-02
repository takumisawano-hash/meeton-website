import IntegrationDetailLayout from "@/app/components/IntegrationDetailLayout";
import { EN_OG_IMAGE } from "@/app/lib/i18n";
import { integrations } from "@/lib/integrations-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// /en/integrations/[slug]/ — English detail twin (JA original at root).

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
      canonical: `/en/integrations/${slug}/`,
      languages: {
        ja: `/integrations/${slug}/`,
        en: `/en/integrations/${slug}/`,
        "x-default": `/integrations/${slug}/`,
      },
    },
    openGraph: {
      images: EN_OG_IMAGE,
      title: `${integration.name} Integration`,
      description: integration.en.description,
      url: `https://dynameet.ai/en/integrations/${slug}/`,
      siteName: "Meeton ai",
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function EnIntegrationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const integration = integrations.find((i) => i.slug === slug);
  if (!integration) notFound();

  return <IntegrationDetailLayout integration={integration} lang="en" />;
}
