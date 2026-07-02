// Real author entity for E-E-A-T (§4.13). The founder's enterprise SDR/AE
// domain knowledge is the Experience signal. Used as the `author` in article
// and glossary schema, and as a visible byline.

export const AUTHOR = {
  name: "澤野 拓実",
  altName: ["Takumi Sawano", "Sawano Takumi"],
  jobTitle: "DynaMeet 共同創業者 / CRO",
  bio: "エンタープライズ領域のSDR / AE として商談化の現場を経験。Meeton ai（AI SDR Platform）を提供する DynaMeet 共同創業者。",
  url: "https://dynameet.ai/about/",
  sameAs: "https://x.com/Founder_Meeton",
} as const;

// English byline for the /en/* surfaces (JSON-LD keeps the JA canonical name
// with alternateName covering the romanized form).
export const AUTHOR_EN = {
  name: "Takumi Sawano",
  jobTitle: "Co-founder & CRO, DynaMeet",
} as const;

export function authorPersonSchema() {
  return {
    "@type": "Person",
    "@id": "https://dynameet.ai/#author-takumi-sawano",
    name: AUTHOR.name,
    alternateName: AUTHOR.altName,
    jobTitle: AUTHOR.jobTitle,
    description: AUTHOR.bio,
    url: AUTHOR.url,
    sameAs: AUTHOR.sameAs,
    worksFor: { "@id": "https://dynameet.ai/#organization" },
  };
}
