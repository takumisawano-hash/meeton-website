"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { t, type Lang } from "@/app/lib/i18n";

// ── Meeton ai v2 footer (2026-05-29 rebuild) ────────────────────────
// §3.8: footer is a navy frame surface. Discover grid feeds sitewide
// internal links to the new IA (product LPs at root, /solutions, /cases,
// /pricing, /tools/roi) — every page links down to conversion-intent
// destinations, concentrating PageRank toward money pages (§4.8).
// 2026-06-12 (磨き6): brand row (wordmark + tagline + company SNS) added
// as a trust anchor; link hovers pick up the green accent.

type FooterProps = {
  variant?: "light" | "dark";
  /** Hide the discover grid on paid-traffic LPs where it dilutes the CV CTA. */
  hideDiscoverGrid?: boolean;
  /** locale (JA default). EN swaps headings/labels/tagline; the 4 product
   *  links go to /en/<slug>/, everything else points at root (JA) URLs until
   *  translated. JA omits the prop → byte-identical output. */
  lang?: Lang;
};

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

// Tagline reuses the homepage hero line verbatim (app/page.tsx) — do not
// reword; this is the v2 slogan.
const TAGLINE = "「待つ」Webサイトを、商談を生み出すAI営業チャネルへ。";

// Company SNS — same URLs as the Organization sameAs in JsonLd.tsx.
const SNS = [
  {
    href: "https://x.com/meetonai",
    label: "X",
    // X wordmark glyph
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z",
  },
  {
    href: "https://www.linkedin.com/company/dynameet/",
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
];

const DISCOVER = [
  {
    heading: "製品",
    items: [
      // stage order (stages.ts): ① capture landing first, then product LPs
      { href: "/capture/", label: "① 掴む" },
      { href: "/chat/", label: "Meeton Chat" },
      { href: "/library/", label: "Meeton Library" },
      { href: "/ads/", label: "Meeton Ads" },
      { href: "/calendar/", label: "Meeton Calendar" },
      { href: "/email/", label: "Meeton Email" },
      { href: "/pricing/", label: "料金" },
    ],
  },
  {
    heading: "ソリューション",
    items: [
      { href: "/solutions/cmo/", label: "CMO / マーケ責任者" },
      { href: "/solutions/cro/", label: "CRO / 営業責任者" },
      { href: "/solutions/sdr/", label: "IS / SDR 責任者" },
      { href: "/solutions/ceo/", label: "経営者" },
    ],
  },
  {
    heading: "活用シーン",
    items: [
      { href: "/use-cases/pre-inquiry/", label: "問い合わせ前" },
      { href: "/use-cases/post-inquiry/", label: "問い合わせ後" },
      { href: "/use-cases/post-download/", label: "資料 DL 後" },
      { href: "/use-cases/exhibition/", label: "展示会後" },
      { href: "/use-cases/webinar-follow-up/", label: "ウェビナー後" },
      { href: "/use-cases/revisit/", label: "再訪問" },
      { href: "/use-cases/nurture/", label: "追客" },
    ],
  },
  {
    heading: "業界別",
    items: [
      { href: "/use-cases/saas/", label: "SaaS" },
      { href: "/use-cases/it/", label: "IT・SIer" },
      { href: "/use-cases/manufacturing/", label: "製造業" },
      { href: "/use-cases/hr-staffing/", label: "人材" },
      { href: "/use-cases/fintech/", label: "金融・フィンテック" },
      { href: "/use-cases/bpo/", label: "BPO・コールセンター" },
      { href: "/use-cases/education/", label: "教育・研修" },
      { href: "/use-cases/professional-services/", label: "士業・コンサル" },
    ],
  },
  {
    heading: "リソース",
    items: [
      { href: "/blog/", label: "ブログ" },
      { href: "/glossary/ai-sdr/", label: "用語集" },
      { href: "/cases/", label: "導入事例" },
      { href: "/tools/roi/", label: "ROI 診断" },
      { href: "/compare/ai-sdr-tools/", label: "AI SDRツール比較" },
      { href: "/pillar/website-shodanka/", label: "サイト商談化ガイド" },
    ],
  },
];

const LEGAL = [
  { href: "/about/", label: "会社概要" },
  { href: "/security/", label: "情報セキュリティ" },
  { href: "/integrations/", label: "連携一覧" },
  { href: "/careers/", label: "採用情報" },
  { href: "/contact/", label: "お問い合わせ" },
  { href: "/privacy-policy/", label: "プライバシーポリシー" },
  { href: "/terms/", label: "利用規約" },
  { href: "/legal/tokushoho/", label: "特定商取引法に基づく表記" },
];

// ── English footer (lang="en") ──────────────────────────────────────
// 2026-07-02: the full EN tree exists — every footer link points at its /en/*
// twin. Only /tools/roi/, /integrations/, /careers/, /privacy-policy/ and
// /terms/ remain JA-only (no EN twin yet).
const TAGLINE_EN = "Turn your “waiting” website into an AI sales channel that creates meetings.";
const C_EN = t("en"); // EN chrome strings (headings/legal labels) from i18n
const DISCOVER_EN = [
  {
    heading: C_EN.footerProduct,
    items: [
      { href: "/en/capture/", label: "① Capture" },
      { href: "/en/chat/", label: "Meeton Chat" },
      { href: "/en/library/", label: "Meeton Library" },
      { href: "/en/ads/", label: "Meeton Ads" },
      { href: "/en/calendar/", label: "Meeton Calendar" },
      { href: "/en/email/", label: "Meeton Email" },
      { href: "/en/pricing/", label: "Pricing" },
      { href: "/en/trial/", label: "Start free trial" },
    ],
  },
  {
    heading: C_EN.footerSolutions,
    items: [
      { href: "/en/solutions/cmo/", label: "CMO / Head of Marketing" },
      { href: "/en/solutions/cro/", label: "CRO / Head of Sales" },
      { href: "/en/solutions/sdr/", label: "Head of IS / SDR" },
      { href: "/en/solutions/ceo/", label: "Founders & CEOs" },
    ],
  },
  {
    heading: C_EN.footerUseCases,
    items: [
      { href: "/en/use-cases/pre-inquiry/", label: "Before the inquiry" },
      { href: "/en/use-cases/post-inquiry/", label: "After the inquiry" },
      { href: "/en/use-cases/post-download/", label: "After a download" },
      { href: "/en/use-cases/exhibition/", label: "After a trade show" },
      { href: "/en/use-cases/webinar-follow-up/", label: "After a webinar" },
      { href: "/en/use-cases/revisit/", label: "Return visit" },
      { href: "/en/use-cases/nurture/", label: "Follow-up" },
    ],
  },
  {
    heading: "Industries",
    items: [
      { href: "/en/use-cases/saas/", label: "SaaS" },
      { href: "/en/use-cases/it/", label: "IT services" },
      { href: "/en/use-cases/manufacturing/", label: "Manufacturing" },
      { href: "/en/use-cases/hr-staffing/", label: "HR & staffing" },
      { href: "/en/use-cases/fintech/", label: "Fintech" },
      { href: "/en/use-cases/bpo/", label: "BPO & contact centers" },
      { href: "/en/use-cases/education/", label: "Education & training" },
      { href: "/en/use-cases/professional-services/", label: "Professional services" },
    ],
  },
  {
    heading: C_EN.footerResources,
    items: [
      { href: "/en/blog/", label: "Blog" },
      { href: "/en/glossary/ai-sdr/", label: "Glossary" },
      { href: "/en/cases/", label: "Customers" },
      { href: "/en/tools/roi/", label: "ROI calculator" },
      { href: "/en/compare/ai-sdr-tools/", label: "AI SDR tools compared" },
    ],
  },
];
const LEGAL_EN = [
  { href: "/en/about/", label: "About" },
  { href: "/en/security/", label: C_EN.footerLegalSecurity },
  { href: "/en/integrations/", label: "Integrations" },
  { href: "/careers/", label: "Careers" },
  { href: "/en/contact/", label: "Contact" },
  { href: "/en/privacy-policy/", label: C_EN.footerLegalPrivacy },
  { href: "/en/terms/", label: C_EN.footerLegalTerms },
  { href: "/en/legal/tokushoho/", label: "Commercial Disclosure" },
];

export default function Footer({ hideDiscoverGrid = false, lang = "ja" }: FooterProps) {
  const isMobile = useIsMobile();
  const en = lang === "en";
  const tagline = en ? TAGLINE_EN : TAGLINE;
  const discover = en ? DISCOVER_EN : DISCOVER;
  const legal = en ? LEGAL_EN : LEGAL;

  return (
    <footer
      style={{
        background: "var(--navy-deep)",
        borderTop: "1px solid var(--on-navy-border)",
        padding: isMobile ? "36px 20px 28px" : "52px 48px 36px",
        fontFamily: "var(--fb)",
      }}
    >
      {/* Brand row — wordmark + tagline (+ company SNS). SNS is hidden with
          the discover grid on paid LPs (external links dilute the CV CTA). */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "flex-end",
          justifyContent: "space-between",
          gap: isMobile ? 18 : 24,
          maxWidth: 1280,
          margin: "0 auto",
          paddingBottom: isMobile ? 24 : 32,
          marginBottom: isMobile ? 24 : 32,
          borderBottom: "1px solid var(--on-navy-border)",
        }}
      >
        <div>
          <Link href={en ? "/en/" : "/"} aria-label="Meeton ai" style={{ display: "inline-block" }}>
            <Image
              src="/logo.svg"
              alt="Meeton ai — DynaMeet"
              width={130}
              height={28}
              style={{ height: 26, width: "auto", opacity: 0.92 }}
            />
          </Link>
          <p
            style={{
              margin: "12px 0 0",
              fontSize: isMobile ? 13 : 14,
              fontWeight: 600,
              color: "var(--on-navy-sub)",
              lineHeight: 1.7,
            }}
          >
            {tagline}
          </p>
        </div>
        {!hideDiscoverGrid && (
          <div style={{ display: "flex", gap: 10 }}>
            {SNS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="v2-ft-sns"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: "1px solid var(--on-navy-border)",
                  color: "var(--on-navy-sub)",
                }}
              >
                {/* monochrome: inherits currentColor so hover turns green */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>

      {!hideDiscoverGrid && (
        <div
          className="v2-ft-grid"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            paddingBottom: isMobile ? 28 : 36,
            marginBottom: isMobile ? 28 : 36,
            borderBottom: "1px solid var(--on-navy-border)",
          }}
        >
          {discover.map((col) => (
            <div key={col.heading}>
              <div
                style={{
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 800,
                  color: "var(--on-navy-sub)",
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                {col.heading}
              </div>
              {col.items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="v2-ft-link"
                  style={{
                    display: "block",
                    fontSize: isMobile ? 13 : 14,
                    color: "var(--on-navy-sub)",
                    textDecoration: "none",
                    fontWeight: 500,
                    lineHeight: 2.1,
                  }}
                >
                  {it.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: isMobile ? "10px 16px" : "10px 22px",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {legal.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="v2-ft-link"
            style={{
              fontSize: isMobile ? 12 : 13,
              color: "var(--on-navy-sub)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: "20px auto 0",
          fontSize: isMobile ? 11 : 12,
          color: "var(--on-navy-sub)",
          opacity: 0.7,
        }}
      >
        © {new Date().getFullYear()} {en ? "DynaMeet, Inc." : "DynaMeet株式会社"} All rights reserved.
      </div>

      <style>{`
        .v2-ft-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:32px}
        @media (max-width:767px){.v2-ft-grid{grid-template-columns:1fr 1fr;gap:24px 16px}}
        @media (max-width:440px){.v2-ft-grid{grid-template-columns:1fr;gap:20px}}
        .v2-ft-link,.v2-ft-sns{transition:color .15s ease}
        .v2-ft-link:hover,.v2-ft-sns:hover{color:var(--cta)}
      `}</style>
    </footer>
  );
}
