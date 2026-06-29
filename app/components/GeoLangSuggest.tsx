"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { enTwinFor } from "@/app/lib/i18n";

// Soft, dismissible "View in English" suggestion shown to non-JP visitors on
// JA pages (the geo middleware already hard-redirects 1:1 pages, so in practice
// this catches blog articles and any non-allowlisted JA path). SEO-safe per
// Google guidance: NO IP redirect here. Bots (no JS) never see it and crawl
// freely; hreflang signals the alternates. An explicit choice (dismiss, or a
// pref_lang cookie) suppresses it.
//
// Country comes from /api/geo (Vercel x-vercel-ip-country) via a client fetch,
// so JA pages stay statically rendered. Twin resolution is shared with the Nav
// switch + geo middleware via enTwinFor().

export default function GeoLangSuggest() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [href, setHref] = useState("/en/");

  useEffect(() => {
    if (!pathname || pathname.startsWith("/en")) return; // JA pages only
    const c = document.cookie;
    if (c.includes("geo_lang_dismiss=1") || c.includes("pref_lang=")) return;
    let alive = true;
    fetch("/api/geo/")
      .then((r) => r.json())
      .then(({ country }: { country?: string }) => {
        if (alive && country && country !== "JP") {
          setHref(enTwinFor(pathname));
          setShow(true);
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [pathname]);

  if (!show) return null;

  const remember = () => {
    document.cookie = "pref_lang=en; max-age=31536000; path=/";
  };
  const dismiss = () => {
    document.cookie = "geo_lang_dismiss=1; max-age=2592000; path=/";
    setShow(false);
  };

  return (
    <div
      role="region"
      aria-label="Language suggestion"
      style={{
        position: "fixed",
        left: "clamp(16px,3vw,28px)",
        bottom: "clamp(16px,3vw,28px)",
        zIndex: 9980,
        maxWidth: "min(340px, calc(100vw - 32px))",
        background: "var(--navy-2, #171A36)",
        color: "#fff",
        border: "1px solid var(--on-navy-border, rgba(255,255,255,.12))",
        borderRadius: 14,
        boxShadow: "0 20px 56px -20px rgba(0,0,0,.6)",
        padding: "14px 16px",
        fontFamily: "var(--fb)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        animation: "geoSlideUp .28s ease-out",
      }}
    >
      <style>{`@keyframes geoSlideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ fontSize: 14, lineHeight: 1.5 }}>
        This page is also available in English.
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <a
          href={href}
          onClick={remember}
          className="v2-cta-primary"
          style={{
            background: "var(--cta, #07CB79)",
            color: "var(--on-cta, #04231a)",
            fontWeight: 800,
            fontSize: 13.5,
            padding: "9px 16px",
            borderRadius: 10,
            textDecoration: "none",
          }}
        >
          View in English →
        </a>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          style={{
            background: "transparent",
            border: "1px solid var(--on-navy-border, rgba(255,255,255,.18))",
            color: "var(--on-navy-sub, #AEB4D6)",
            fontSize: 13,
            padding: "9px 12px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
