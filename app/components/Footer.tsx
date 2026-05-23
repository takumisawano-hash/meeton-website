"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type FooterProps = {
  variant?: "light" | "dark";
  /** Hide the sitewide "Discover" grid (role / industry / compare /
   *  resources). Set true on paid-traffic LPs where the discovery
   *  links read as noise and dilute the CV CTA. */
  hideDiscoverGrid?: boolean;
};

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

export default function Footer({ variant = "light", hideDiscoverGrid = false }: FooterProps) {
  const pathname = usePathname();
  const isDark = variant === "dark";
  const isTalent = pathname.startsWith("/talent");
  const isJa = pathname.startsWith("/ja");
  const isMobile = useIsMobile();

  const linkStyle = {
    fontSize: isMobile ? 12 : 13,
    color: isDark ? "#7878a0" : "#6e7494",
    textDecoration: "none" as const,
    fontWeight: 600,
  };

  const links = [
    { href: "/", label: "Meeton ai" },
    { href: "/blog/what-is-meeton-ai-sdr-platform/", label: "Meeton ai とは" },
    { href: "/features/meetings/", label: "Meeton Calendar" },
    { href: "/features/ai-email/", label: "Meeton Email" },
    { href: "/features/ai-chat/", label: "Meeton Live" },
    { href: "/features/ai-library/", label: "Meeton Library" },
    isJa
      ? { href: "/ja/integrations/", label: "連携" }
      : { href: "/integrations/", label: "Integrations" },
    ...(isDark ? [] : [{ href: "/blog/", label: "ブログ" }]),
    { href: "/about/", label: "会社概要" },
    { href: "/careers/", label: "採用情報" },
    { href: "/contact/", label: "お問い合わせ" },
    { href: "/privacy-policy/", label: "プライバシーポリシー" },
    { href: "/security-policy/", label: "情報セキュリティポリシー" },
    { href: "/terms/", label: "利用規約" },
  ];

  // Site-wide discovery columns — feeds internal links to high-intent
  // landing pages (persona, industry, comparison). Each new page below
  // is reachable from every page on the site, accelerating indexation
  // and concentrating PageRank toward conversion-intent destinations.
  const discoverColumns = [
    {
      heading: "ロール別",
      items: [
        { href: "/for/cmo/", label: "CMO 向け" },
        { href: "/for/cro/", label: "CRO 向け" },
        { href: "/for/inside-sales/", label: "Inside Sales 向け" },
        { href: "/for/marketing-manager/", label: "マーケマネージャー向け" },
      ],
    },
    {
      heading: "業界別",
      items: [
        { href: "/use-cases/saas/", label: "SaaS" },
        { href: "/use-cases/manufacturing/", label: "製造業" },
        { href: "/use-cases/professional-services/", label: "プロフェッショナルサービス" },
        { href: "/use-cases/fintech/", label: "フィンテック" },
      ],
    },
    {
      heading: "他社比較",
      items: [
        { href: "/compare/meeton-vs-sinclo/", label: "vs sinclo" },
        { href: "/compare/meeton-vs-karte/", label: "vs KARTE" },
        { href: "/compare/meeton-vs-chatplus/", label: "vs ChatPlus" },
        { href: "/compare/meeton-vs-anybot/", label: "vs anybot" },
      ],
    },
    {
      heading: "リソース",
      items: [
        { href: "/webinar/", label: "ウェビナー" },
        { href: "/blog/", label: "ブログ" },
        { href: "/case-studies/", label: "導入事例" },
        { href: "/integrations/", label: "連携一覧" },
      ],
    },
  ];

  const discoverHeadingStyle = {
    fontSize: isMobile ? 11 : 12,
    fontWeight: 800,
    color: isDark ? "#9aa0c5" : "#3d4a73",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    marginBottom: 10,
  };
  const discoverLinkStyle = {
    fontSize: isMobile ? 12 : 13,
    color: isDark ? "#9aa0c5" : "#5a6285",
    textDecoration: "none" as const,
    fontWeight: 500,
    lineHeight: 1.9,
    display: "block" as const,
  };
  const DiscoverGrid = () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, minmax(0, 1fr))",
        gap: isMobile ? "20px 16px" : "24px 32px",
        padding: isMobile ? "0 0 24px" : "0 0 32px",
        borderBottom: `1px solid ${isDark ? "#2a2a44" : "#dfe3f0"}`,
        marginBottom: isMobile ? 24 : 32,
        maxWidth: 1280,
        margin: isMobile ? "0 auto 24px" : "0 auto 32px",
      }}
    >
      {discoverColumns.map((col) => (
        <div key={col.heading}>
          <div style={discoverHeadingStyle}>{col.heading}</div>
          {col.items.map((it) => (
            <Link key={it.href} href={it.href} style={discoverLinkStyle}>
              {it.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );

  if (isDark) {
    return (
      <footer
        style={{
          borderTop: "1px solid #2a2a44",
          padding: isMobile ? "32px 20px" : "40px 48px",
          background: "#12121e",
        }}
      >
        {!hideDiscoverGrid && <DiscoverGrid />}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isMobile ? 24 : 0,
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
        <Image
          src="/logo.svg"
          alt="DynaMeet"
          width={120}
          height={26}
          style={{ height: 24, width: "auto", opacity: 0.7 }}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: isMobile ? "10px 16px" : 20,
            justifyContent: "center",
          }}
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href} style={linkStyle}>
              {link.label}
            </Link>
          ))}
        </div>
        <div
          style={{
            fontSize: isMobile ? 11 : 12,
            color: "#7878a0",
            textAlign: "center" as const,
          }}
        >
          © 2026 DynaMeet K.K. All rights reserved.
        </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      style={{
        borderTop: "1px solid #dfe3f0",
        padding: isMobile ? "32px 20px" : "44px 48px 36px",
        background: isTalent ? "#f8f9fc" : "#f4f6fb",
      }}
    >
      {!hideDiscoverGrid && <DiscoverGrid />}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? 24 : 0,
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
      <Image
        src="/logo-dark.svg"
        alt="DynaMeet"
        width={120}
        height={26}
        style={{ height: 24, width: "auto", opacity: 0.7 }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: isMobile ? "10px 16px" : 24,
          justifyContent: "center",
        }}
      >
        {links.map((link) => (
          <Link key={link.href} href={link.href} style={linkStyle}>
            {link.label}
          </Link>
        ))}
      </div>
      <div
        style={{
          fontSize: isMobile ? 11 : 12,
          color: "#9498b2",
          textAlign: "center" as const,
        }}
      >
        © 2026 DynaMeet K.K. All rights reserved.
      </div>
      </div>
    </footer>
  );
}
