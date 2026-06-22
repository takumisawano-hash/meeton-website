// i18n foundation for the bilingual site (JA at root, EN under /en/*).
// Extends the proven integrations pattern (.en/.ja data + lang prop) site-wide.
// JA is the primary locale → x-default points at JA.

import type { Metadata } from "next";

export type Lang = "ja" | "en";

export const DEFAULT_LANG: Lang = "ja";

/** Map a JA (root) path to its EN twin and back. Root JA path is canonical. */
export function enPath(jaPath: string): string {
  if (jaPath === "/") return "/en/";
  return `/en${jaPath.startsWith("/") ? "" : "/"}${jaPath}`;
}
export function jaPath(enPathStr: string): string {
  const p = enPathStr.replace(/^\/en(?=\/|$)/, "");
  return p === "" ? "/" : p;
}

/**
 * hreflang/canonical alternates for a JA/EN page pair. Pass the JA (root) path;
 * returns metadata.alternates with self-canonical + both languages + x-default→JA.
 * Mirrors the integrations convention (self + alternate + x-default).
 */
export function altLanguages(jaRootPath: string, lang: Lang): NonNullable<Metadata["alternates"]> {
  const ja = jaRootPath;
  const en = enPath(jaRootPath);
  return {
    canonical: lang === "en" ? en : ja,
    languages: {
      ja,
      en,
      "x-default": ja,
    },
  };
}

export const ogLocale = (lang: Lang) => (lang === "en" ? "en_US" : "ja_JP");

// ── Shared chrome strings (Nav / Footer / common CTAs) ──────────────
// Centralised so Nav.tsx / Footer.tsx can do `t(lang).<key>` instead of
// hardcoding Japanese. Add keys as pages are localised.
export const CHROME = {
  ja: {
    navProduct: "製品",
    navUsage: "活用",
    navCases: "事例",
    navPricing: "料金",
    navResources: "リソース",
    ctaSeePricing: "料金を見る",
    ctaBookDemo: "デモを予約",
    langSwitch: "EN",
    footerProduct: "製品",
    footerSolutions: "ソリューション",
    footerUseCases: "活用シーン",
    footerResources: "リソース",
    footerCompany: "会社",
    footerLegalPrivacy: "プライバシーポリシー",
    footerLegalTerms: "利用規約",
    footerLegalSecurity: "セキュリティ",
  },
  en: {
    navProduct: "Product",
    navUsage: "Use cases",
    navCases: "Customers",
    navPricing: "Pricing",
    navResources: "Resources",
    ctaSeePricing: "See pricing",
    ctaBookDemo: "Book a demo",
    langSwitch: "日本語",
    footerProduct: "Product",
    footerSolutions: "Solutions",
    footerUseCases: "Use cases",
    footerResources: "Resources",
    footerCompany: "Company",
    footerLegalPrivacy: "Privacy Policy",
    footerLegalTerms: "Terms",
    footerLegalSecurity: "Security",
  },
} as const;

export const t = (lang: Lang) => CHROME[lang];
