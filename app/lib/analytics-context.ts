/**
 * Pure page-context helpers for analytics. No SDK, no `window`, no React —
 * so the funnel's gating rules are unit-testable in isolation.
 * Spec: docs/superpowers/specs/2026-07-30-mixpanel-funnel-handshake-design.md
 */

export type Language = "en" | "ja";

/**
 * Which language funnel a path belongs to. JA is the default at `/`; EN lives
 * under `/en/`.
 *
 * The two funnels have genuinely different conversion goals — Japan is
 * partner-led and the app hard-rejects JP self-serve signups with a 403 — so
 * every event carries this and neither funnel is read through the other.
 *
 * NOT `startsWith("/en")`: that also matches `/enterprise/`, which is a
 * Japanese page and would be silently misfiled into the English funnel.
 */
export function detectLanguage(pathname: string): Language {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ja";
}

/**
 * True when a URL is a booking-widget view rather than a landing.
 *
 * The demo CTA is a SAME-ORIGIN navigation to `/?calendarId=…&showChat=true`,
 * which opens our own booking widget. That is a full page load, so a naive
 * "fire on every page load" would emit a SECOND `Landing Viewed` the moment
 * someone clicks the demo CTA, inflating the top of the funnel with the very
 * visitors who converted.
 */
export function isBookingWidgetUrl(search: string): boolean {
  try {
    return new URLSearchParams(search).has("calendarId");
  } catch {
    return false;
  }
}

/** sessionStorage key claiming `Landing Viewed` once per tab. */
export const LANDING_VIEWED_CLAIM_KEY = "mp_landing_viewed";

/**
 * Claim `Landing Viewed` for this tab, returning true only for the first
 * caller. Mirrors how the app claims `Signup Landed`, so a reload mid-journey
 * does not re-count the visitor.
 *
 * sessionStorage (not localStorage) is deliberate: the claim must last exactly
 * one tab session. Returns true when storage is unavailable (private mode,
 * quota) — better to risk a duplicate than to lose the funnel's first step
 * entirely.
 */
export function claimLandingView(storage: Storage | undefined): boolean {
  if (!storage) return true;
  try {
    if (storage.getItem(LANDING_VIEWED_CLAIM_KEY)) return false;
    storage.setItem(LANDING_VIEWED_CLAIM_KEY, "1");
    return true;
  } catch {
    return true;
  }
}

/**
 * Whether `Landing Viewed` should fire for this page view. Both guards from
 * the spec, in one place so the rule is testable as a unit.
 */
export function shouldTrackLandingView(
  search: string,
  storage: Storage | undefined,
): boolean {
  if (isBookingWidgetUrl(search)) return false;
  return claimLandingView(storage);
}

/**
 * The CTA's funnel source, read off a demo link's `utm_medium`
 * (nav / cta / partners / …). Non-personal; mirrors the `source` property on
 * `Start Trial Clicked` so both CTAs are sliceable the same way.
 */
export function demoSourceFromHref(href: string): string {
  try {
    return new URL(href).searchParams.get("utm_medium") || "unknown";
  } catch {
    return "unknown";
  }
}
