import IntegrationDirectoryClient from "@/app/components/IntegrationDirectoryClient";
import { EN_OG_IMAGE } from "@/app/lib/i18n";
import type { Metadata } from "next";

// /en/integrations/ — English directory twin of /integrations/ (JA at root).
// Shares IntegrationDirectoryClient; detail twins at /en/integrations/[slug]/.

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Meeton ai to Slack, Zoom, Salesforce, HubSpot, Google Calendar, Microsoft Teams, and more.",
  alternates: {
    canonical: "/en/integrations/",
    languages: {
      ja: "/integrations/",
      en: "/en/integrations/",
      "x-default": "/integrations/",
    },
  },
  openGraph: {
    images: EN_OG_IMAGE,
    title: "Integrations｜Meeton ai",
    description: "Connect Meeton ai to Slack, Zoom, Salesforce, HubSpot, and more.",
    url: "https://dynameet.ai/en/integrations/",
    siteName: "Meeton ai",
    locale: "en_US",
    type: "website",
  },
};

export default function EnIntegrationsPage() {
  return <IntegrationDirectoryClient lang="en" />;
}
