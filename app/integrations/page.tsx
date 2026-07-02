import IntegrationDirectoryClient from "@/app/components/IntegrationDirectoryClient";
import type { Metadata } from "next";

// /integrations/ — JAPANESE directory (site convention: JA at root). The
// English twin lives at /en/integrations/. Until 2026-07-02 this section was
// inverted (root=EN, /ja/=JA) — the only /ja/* paths on the site; /ja/* now
// 308s here (next.config.js).

export const metadata: Metadata = {
  title: "連携",
  description:
    "Meeton aiをSlack、Zoom、Salesforce、HubSpot、Googleカレンダー、Microsoft Teamsなどと連携できます。",
  alternates: {
    canonical: "/integrations/",
    languages: {
      ja: "/integrations/",
      en: "/en/integrations/",
      "x-default": "/integrations/",
    },
  },
  openGraph: {
    title: "連携｜Meeton ai",
    description: "Meeton aiを主要ビジネスツールとシームレスに連携。",
    url: "https://dynameet.ai/integrations/",
    siteName: "Meeton ai",
    locale: "ja_JP",
    type: "website",
  },
};

export default function IntegrationsPage() {
  return <IntegrationDirectoryClient lang="ja" />;
}
