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

// Default social-share card for EN pages (JA relies on the root
// opengraph-image; per-page openGraph blocks don't inherit file-based images,
// so EN money pages attach this explicitly).
export const EN_OG_IMAGE = [
  {
    url: "/og/en-default.png",
    width: 1200,
    height: 630,
    alt: "Meeton ai — the AI SDR that turns your website into booked meetings",
  },
];

// JA paths with a guaranteed 1:1 English page (mirrors the next.config.js /en
// allowlist + the geo middleware). Used to point the language switch at the
// correct EN twin instead of always dumping the visitor on the EN homepage.
export const EN_TWIN_PREFIXES = [
  "chat", "calendar", "library", "email", "ads", "capture", "tools/roi",
  "privacy-policy", "terms", "integrations", "legal/tokushoho",
  "pricing", "about", "contact", "enterprise", "security", "glossary",
  "cases", "compare", "alternatives", "use-cases",
  "solutions/crm-to-meeting", "solutions/lead-to-meeting",
  "solutions/cmo", "solutions/cro", "solutions/sdr", "solutions/ceo",
];

/**
 * Best-effort English twin for a JA path, for the language switcher.
 * - "/"                      → "/en/"
 * - 1:1 static pages         → exact /en/<path>
 * - blog hub/category/tag    → exact /en/<path>
 * - a blog article /blog/x   → /en/blog/x-en/ (the EN slug convention; if no
 *                              twin exists yet the EN route gracefully falls
 *                              back to the EN blog hub, never a hard 404)
 * - anything else            → "/en/" (EN homepage)
 */
// EN-only pages with NO JA twin (self-serve funnel + self-serve legal set).
// The geo middleware must not strip these to a (non-existent) JA path, and the
// language switch sends visitors to the JA homepage instead of a 404.
export const EN_ONLY_PREFIXES = [
  "trial",
  "legal/terms-self-serve",
  "legal/dpa",
  "legal/sub-processors",
];

export function isEnOnlyPath(enPathStr: string): boolean {
  const seg = enPathStr.replace(/^\/en\/?/, "").replace(/\/+$/, "");
  return EN_ONLY_PREFIXES.some((p) => seg === p || seg.startsWith(p + "/"));
}

/**
 * Best-effort Japanese twin for an EN path, for the language switcher.
 * - strips the /en prefix (every /en page mirrors a JA page)…
 * - …except EN-only pages (e.g. /en/trial/) → JA homepage
 * - EN blog articles use the "<ja-slug>-en" convention → recover the JA slug
 *   (otherwise /blog/<slug>-en would serve the EN article inside the JA tree)
 */
export function jaTwinFor(enPathStr: string): string {
  if (isEnOnlyPath(enPathStr)) return "/";
  let p = enPathStr.replace(/^\/en(?=\/|$)/, "") || "/";
  p = p.replace(/^(\/blog\/[^/]+?)-en(\/?)$/, "$1$2");
  return p;
}

export function enTwinFor(jaPath: string): string {
  const clean = jaPath.replace(/[?#].*$/, "").replace(/\/+$/, "") || "/";
  if (clean === "/") return "/en/";
  const seg = clean.slice(1); // drop leading "/"
  if (seg === "blog" || seg.startsWith("blog/category/") || seg.startsWith("blog/tag/")) {
    return enPath(clean) + "/";
  }
  const blogArticle = clean.match(/^\/blog\/([^/]+)$/);
  if (blogArticle) return `/en/blog/${blogArticle[1]}-en/`;
  if (EN_TWIN_PREFIXES.some((p) => seg === p || seg.startsWith(p + "/"))) {
    return enPath(clean) + "/";
  }
  return "/en/";
}

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
    ctaStartTrial: "無料トライアル",
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
    ctaStartTrial: "Start free trial",
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
