"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// ── Meeton ai v2 footer (2026-05-29 rebuild) ────────────────────────
// §3.8: footer is a navy frame surface. Discover grid feeds sitewide
// internal links to the new IA (product LPs at root, /solutions, /cases,
// /pricing, /tools/roi) — every page links down to conversion-intent
// destinations, concentrating PageRank toward money pages (§4.8).

type FooterProps = {
  variant?: "light" | "dark";
  /** Hide the discover grid on paid-traffic LPs where it dilutes the CV CTA. */
  hideDiscoverGrid?: boolean;
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

const DISCOVER = [
  {
    heading: "製品",
    items: [
      { href: "/calendar", label: "Meeton Calendar" },
      { href: "/chat", label: "Meeton Chat" },
      { href: "/library", label: "Meeton Library" },
      { href: "/email", label: "Meeton Email" },
      { href: "/pricing", label: "料金" },
    ],
  },
  {
    heading: "ソリューション",
    items: [
      { href: "/solutions/cmo", label: "CMO / マーケ責任者" },
      { href: "/solutions/cro", label: "CRO / 営業責任者" },
      { href: "/solutions/sdr", label: "IS / SDR 責任者" },
      { href: "/solutions/ceo", label: "経営者" },
    ],
  },
  {
    heading: "活用シーン",
    items: [
      { href: "/use-cases/pre-inquiry", label: "問い合わせ前" },
      { href: "/use-cases/post-download", label: "資料 DL 後" },
      { href: "/use-cases/revisit", label: "再訪問" },
      { href: "/use-cases/nurture", label: "追客" },
    ],
  },
  {
    heading: "リソース",
    items: [
      { href: "/blog/", label: "ブログ" },
      { href: "/glossary/ai-sdr", label: "用語集" },
      { href: "/cases", label: "導入事例" },
      { href: "/tools/roi", label: "ROI 診断" },
    ],
  },
];

const LEGAL = [
  { href: "/about/", label: "会社概要" },
  { href: "/security/", label: "セキュリティ" },
  { href: "/integrations/", label: "連携一覧" },
  { href: "/careers/", label: "採用情報" },
  { href: "/contact/", label: "お問い合わせ" },
  { href: "/privacy-policy/", label: "プライバシーポリシー" },
  { href: "/terms/", label: "利用規約" },
];

export default function Footer({ hideDiscoverGrid = false }: FooterProps) {
  const isMobile = useIsMobile();

  return (
    <footer
      style={{
        background: "var(--navy-deep)",
        borderTop: "1px solid var(--on-navy-border)",
        padding: isMobile ? "36px 20px 28px" : "52px 48px 36px",
        fontFamily: "var(--fb)",
      }}
    >
      {!hideDiscoverGrid && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, minmax(0,1fr))",
            gap: isMobile ? "24px 16px" : "32px",
            maxWidth: 1280,
            margin: "0 auto",
            paddingBottom: isMobile ? 28 : 36,
            marginBottom: isMobile ? 28 : 36,
            borderBottom: "1px solid var(--on-navy-border)",
          }}
        >
          {DISCOVER.map((col) => (
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
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: isMobile ? 20 : 24,
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <Link href="/" aria-label="Meeton ai">
          <Image
            src="/logo.svg"
            alt="Meeton ai — DynaMeet"
            width={130}
            height={28}
            style={{ height: 26, width: "auto", opacity: 0.92 }}
          />
        </Link>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: isMobile ? "10px 16px" : "10px 22px",
          }}
        >
          {LEGAL.map((l) => (
            <Link
              key={l.href}
              href={l.href}
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
        © 2026 DynaMeet K.K. All rights reserved.
      </div>
    </footer>
  );
}
