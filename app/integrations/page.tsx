import IntegrationDirectoryClient from "@/app/components/IntegrationDirectoryClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Meeton ai to Slack, Zoom, Salesforce, HubSpot, Google Calendar, Microsoft Teams, and more.",
  alternates: {
    canonical: "/integrations/",
    // Full hreflang cluster (self + alternate + x-default → JA, JP-primary site).
    languages: {
      en: "/integrations/",
      ja: "/ja/integrations/",
      "x-default": "/ja/integrations/",
    },
  },
  openGraph: {
    title: "Integrations",
    description:
      "Connect Meeton ai to Slack, Zoom, Salesforce, HubSpot, and more.",
    url: "https://dynameet.ai/integrations/",
    siteName: "Meeton ai",
    locale: "en_US",
    type: "website",
  },
};

export default function IntegrationsPage() {
  return <IntegrationDirectoryClient lang="en" />;
}
