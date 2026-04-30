"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type FooterProps = {
  variant?: "light" | "dark";
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

export default function Footer({ variant = "light" }: FooterProps) {
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
    // { href: "/talent/", label: "Meeton Talent" }, // Meeton Talent: temporarily hidden
    { href: "/features/ai-chat/", label: "AI Chat" },
    { href: "/features/ai-email/", label: "AI Email" },
    { href: "/features/meetings/", label: "AI Calendar" },
    { href: "/features/offers/", label: "AI Offer" },
    isJa
      ? { href: "/ja/integrations/", label: "連携" }
      : { href: "/integrations/", label: "Integrations" },
    ...(isDark ? [] : [{ href: "/blog/", label: "ブログ" }]),
    { href: "/about/", label: "会社概要" },
    { href: "/privacy-policy/", label: "プライバシーポリシー" },
    { href: "/security-policy/", label: "セキュリティポリシー" },
    { href: "/terms/", label: "利用規約" },
  ];

  if (isDark) {
    return (
      <footer
        style={{
          borderTop: "1px solid #2a2a44",
          padding: isMobile ? "32px 20px" : "32px 48px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? 24 : 0,
          background: "#12121e",
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
      </footer>
    );
  }

  return (
    <footer
      style={{
        borderTop: "1px solid #dfe3f0",
        padding: isMobile ? "32px 20px" : "36px 48px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: isMobile ? 24 : 0,
        background: isTalent ? "#f8f9fc" : "#f4f6fb",
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
    </footer>
  );
}
