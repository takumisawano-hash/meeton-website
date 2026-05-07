import IntegrationDirectoryClient from "@/app/components/IntegrationDirectoryClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "連携",
  description:
    "Meeton aiをSlack、Zoom、Salesforce、HubSpot、Googleカレンダー、Microsoft Teamsなどと連携できます。",
  alternates: {
    canonical: "/ja/integrations/",
    languages: {
      en: "/integrations/",
    },
  },
  openGraph: {
    title: "連携",
    description: "Meeton aiを主要ビジネスツールとシームレスに連携。",
    url: "https://dynameet.ai/ja/integrations/",
    siteName: "Meeton ai",
    locale: "ja_JP",
    type: "website",
  },
};

export default function JaIntegrationsPage() {
  return <IntegrationDirectoryClient lang="ja" />;
}
