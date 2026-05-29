"use client";

import { signupUrl, demoUrl } from "@/app/lib/cta-urls";

// Permanent dual CTA (§1.2). Primary = 無料で始める (green), secondary =
// デモを予約 (ghost). This is a client island ONLY so the click can fire a
// GA4 / dataLayer conversion event (§6.2 ad-LP tracking) — the surrounding
// page copy stays server-rendered for AEO.

type Props = {
  /** funnel source label, becomes utm_medium + event param (e.g. "calendar-hero") */
  source: string;
  /** color context: buttons sit on a navy band or a white canvas */
  tone?: "onNavy" | "onLight";
  size?: "lg" | "md";
  align?: "left" | "center";
  /** override primary CTA label */
  primaryLabel?: string;
};

function track(event: string, source: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...a: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag === "function") {
    w.gtag("event", event, { source });
  } else {
    w.dataLayer.push({ event, source });
  }
}

export default function CTAButtons({
  source,
  tone = "onNavy",
  size = "lg",
  align = "left",
  primaryLabel = "無料で始める",
}: Props) {
  const pad = size === "lg" ? "15px 30px" : "12px 24px";
  const fontSize = size === "lg" ? 16 : 15;

  const primary: React.CSSProperties = {
    background: "var(--cta)",
    color: "#04231a",
    padding: pad,
    borderRadius: 12,
    fontSize,
    fontWeight: 800,
    textDecoration: "none",
    boxShadow: "0 6px 22px var(--cta-glow)",
    whiteSpace: "nowrap",
  };
  const ghost: React.CSSProperties = {
    background: "transparent",
    color: tone === "onNavy" ? "#fff" : "var(--heading)",
    padding: pad,
    borderRadius: 12,
    fontSize,
    fontWeight: 700,
    textDecoration: "none",
    border:
      tone === "onNavy"
        ? "1.5px solid var(--on-navy-border)"
        : "1.5px solid var(--border2)",
    whiteSpace: "nowrap",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        alignItems: "center",
      }}
    >
      <a
        href={signupUrl(source)}
        style={primary}
        onClick={() => track("free_signup_click", source)}
      >
        {primaryLabel}
      </a>
      <a
        href={demoUrl(source)}
        style={ghost}
        onClick={() => track("demo_click", source)}
      >
        デモを予約
      </a>
    </div>
  );
}
