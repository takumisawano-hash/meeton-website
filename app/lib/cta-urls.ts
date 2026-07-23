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

/**
 * EN self-serve signup — primary CTA on the English site.
 * 2026-07-23: the product's self-signup flow shipped (app.dynameet.ai/signup),
 * replacing the /en/trial/ HubSpot request form as the CTA destination.
 * UTM params land in the app's GA4 property so signups stay attributable to
 * the website page/section that sent them. `plan` preselects a plan.
 */
export function trialUrl(source = "website", plan?: string): string {
  const p = new URLSearchParams({
    utm_source: "dynameet.ai",
    utm_medium: "website_cta",
    utm_campaign: "en_selfserve",
    utm_content: source,
  });
  if (plan) p.set("plan", plan);
  return `https://app.dynameet.ai/signup?${p.toString()}`;
}

/**
 * Try to open the Meeton widget calendar in place (no page navigation).
 * window.meetonOpenCalendar is registered by MeetonScript once the page
 * mounts; it returns true only when the loaded widget handled the open.
 * Returns false otherwise → the caller should let the default href
 * navigation proceed (SEO / no-JS / widget-not-loaded fallback).
 */
export function openDemoCalendarInPlace(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as Window & { meetonOpenCalendar?: () => boolean };
  try {
    return w.meetonOpenCalendar?.() === true;
  } catch {
    return false;
  }
}
