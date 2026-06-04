"use client";

import { demoUrl, pricingUrl } from "@/app/lib/cta-urls";

// Permanent dual CTA (§1.2). 2026-06-04 sales-led pivot (deck p19, free tier
// removed): primary = デモを予約 (green), secondary = 料金を見る (ghost → /pricing).
// Client island ONLY so the click fires a GA4/dataLayer conversion event
// (§6.2); surrounding page copy stays server-rendered for AEO.

type Props = {
  /** funnel source label, becomes utm_medium + event param (e.g. "calendar-hero") */
  source: string;
  tone?: "onNavy" | "onLight";
  size?: "lg" | "md";
  align?: "left" | "center";
  /** override primary CTA label (default デモを予約) */
  primaryLabel?: string;
  /** override secondary CTA (default 料金を見る → /pricing/) */
  secondaryLabel?: string;
  secondaryHref?: string;
};

function track(event: string, source: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag === "function") w.gtag("event", event, { source });
  else w.dataLayer.push({ event, source });
}

export default function CTAButtons({
  source,
  tone = "onNavy",
  size = "lg",
  align = "left",
  primaryLabel = "デモを予約",
  secondaryLabel = "料金を見る",
  secondaryHref,
}: Props) {
  const pad = size === "lg" ? "15px 30px" : "12px 24px";
  const fontSize = size === "lg" ? 16 : 15;

  const primary: React.CSSProperties = {
    background: "var(--cta)",
    color: "var(--on-cta)",
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
    border: tone === "onNavy" ? "1.5px solid var(--on-navy-border)" : "1.5px solid var(--border2)",
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
        href={demoUrl(source)}
        className="v2-cta-primary"
        style={primary}
        onClick={() => track("demo_click", source)}
      >
        {primaryLabel}
      </a>
      <a
        href={secondaryHref ?? pricingUrl()}
        className="v2-cta-ghost"
        style={ghost}
        onClick={() => track("pricing_click", source)}
      >
        {secondaryLabel}
      </a>
    </div>
  );
}
