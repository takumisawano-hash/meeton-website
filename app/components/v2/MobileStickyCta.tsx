"use client";

import { useEffect, useState } from "react";
import { demoUrl, trialUrl, openDemoCalendarInPlace } from "@/app/lib/cta-urls";
import type { Lang } from "@/app/lib/i18n";

// Mobile-only sticky CTA (2026-07-02 CRO): on small screens the nav's compact
// CTA scrolls away with the header on some browsers and the next conversion
// point can be several screens down. This pill fades in after the hero and
// hides again near the page end (the final CTA / footer take over there).
// Positioning leaves the bottom-right corner free for the Meeton chat widget.
export default function MobileStickyCta({ lang = "ja", source }: { lang?: Lang; source: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearEnd =
        window.innerHeight + y > document.documentElement.scrollHeight - 900;
      setShow(y > 640 && !nearEnd && window.innerWidth < 720);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const en = lang === "en";
  const href = en ? trialUrl(`${source}-sticky`) : demoUrl(`${source}-sticky`);
  const label = en ? "Start free trial" : "デモを予約";
  const sub = en ? "1 month free · no card" : "30分・オンライン";

  const track = () => {
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    w.gtag?.("event", en ? "trial_click" : "demo_click", { source: `${source}-sticky` });
  };

  return (
    <div
      aria-hidden={!show}
      style={{
        position: "fixed",
        left: 12,
        right: 96, // keep clear of the Meeton widget bubble (bottom-right)
        bottom: 12,
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "rgba(15,17,40,.94)",
        backdropFilter: "blur(10px)",
        border: "1px solid var(--on-navy-border)",
        borderRadius: 14,
        padding: "10px 12px",
        boxShadow: "0 16px 40px -12px rgba(0,0,0,.5)",
        transform: show ? "translateY(0)" : "translateY(90px)",
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none",
        transition: "transform .3s ease, opacity .3s ease",
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--on-navy-sub)", whiteSpace: "nowrap" }}>{sub}</span>
      <a
        href={href}
        className="v2-cta-primary"
        onClick={(e) => {
          track();
          if (!en && openDemoCalendarInPlace()) e.preventDefault();
        }}
        style={{
          marginLeft: "auto",
          background: "var(--cta)",
          color: "var(--on-cta)",
          fontSize: 14,
          fontWeight: 800,
          padding: "10px 18px",
          borderRadius: 10,
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </a>
    </div>
  );
}
