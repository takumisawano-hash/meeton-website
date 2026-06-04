// Centralized CTA destinations.
// 2026-06-04: pricing pivoted to a sales-led 3-plan model (deck p19); the free
// tier was removed, so the old self-serve "無料で始める → app signup" entry is
// retired. Primary CTA is now demo booking; secondary points at pricing.

const DEMO_BASE = "https://dynameet.ai/";

/** Demo-booking URL (Meeton widget calendar) — primary CTA. */
export function demoUrl(source = "website"): string {
  const p = new URLSearchParams({
    calendarId: "takumi-sawano",
    showChat: "true",
    utm_source: "website",
    utm_medium: source,
    utm_campaign: "demo",
  });
  return `${DEMO_BASE}?${p.toString()}`;
}

/** Pricing page — secondary CTA default. */
export function pricingUrl(): string {
  return "/pricing/";
}
