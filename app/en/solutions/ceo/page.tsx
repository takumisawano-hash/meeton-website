import type { Metadata } from "next";
import PlaybookLP, { playbookSchema } from "@/app/components/v2/PlaybookLP";
import { getSolution } from "@/app/lib/playbook-data";
import { altLanguages, ogLocale } from "@/app/lib/i18n";

// /en/solutions/ceo/ — English twin of /solutions/ceo/. Faithful translation of
// the JA role LP; renders through the shared (lang-aware) PlaybookLP.

export const revalidate = 3600;

const SLUG = "ceo";
const data = getSolution(SLUG)!;
const en = data.en!;

export const metadata: Metadata = {
  title: { absolute: en.metaTitle },
  description: en.metaDescription,
  alternates: altLanguages(`/solutions/${SLUG}/`, "en"),
  openGraph: { title: en.metaTitle, description: en.metaDescription, url: `https://dynameet.ai/en/solutions/${SLUG}/`, type: "website", locale: ogLocale("en") },
};

export default function CeoSolutionPageEn() {
  const { faq, breadcrumb } = playbookSchema(data, `/en/solutions/${SLUG}/`, "en");
  return (
    <>
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PlaybookLP data={data} lang="en" />
    </>
  );
}
