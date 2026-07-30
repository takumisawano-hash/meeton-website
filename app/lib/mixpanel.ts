"use client";

import mixpanel from "mixpanel-browser";
import { useEffect, useState } from "react";

import { trialUrl } from "./cta-urls";
import { buildSignupUrl } from "./signup-url";

/**
 * Mixpanel SDK glue — marketing half of the self-signup funnel handshake.
 * Spec: docs/superpowers/specs/2026-07-30-mixpanel-funnel-handshake-design.md
 *
 * This site and the app (app.dynameet.ai) report to the SAME Mixpanel project.
 * One project is what makes the funnel continuous — do NOT point this at a
 * second one. A token for a different project fails *silently*: Mixpanel
 * returns success for any valid token, so events are accepted and simply never
 * appear in the project you are watching.
 *
 * Event names are Title Case to match the app's existing convention
 * (`Page View`, `Login`, `Signup Landed`, …).
 *
 * Privacy: no personal data is ever attached to these events — no email, no
 * name, no form contents. Mixpanel auto-captures utm_*, referrer and geo,
 * which is enough. Autocapture and session recording are explicitly disabled
 * below so a future SDK default cannot start hoovering up form fields.
 */

const TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

/**
 * Deliberate near-duplicate of GoogleAnalytics.tsx's private copy.
 * That file has a scarred history (a 2026-05 change silently killed Ads
 * conversion tracking for ~a month); extracting a shared helper out of it is
 * unrelated refactoring on the critical path of a system the marketing team
 * depends on. Duplicating one bot regex is the cheaper risk. If you edit one,
 * consider the other.
 */
const SYNTHETIC_UA_RE = /\b(Lighthouse|Chrome-Lighthouse|HeadlessChrome|PageSpeed|GTmetrix)\b/i;

function isSyntheticClient(): boolean {
  if (typeof navigator === "undefined") return false;
  if ((navigator as Navigator & { webdriver?: boolean }).webdriver === true) return true;
  return SYNTHETIC_UA_RE.test(navigator.userAgent);
}

type InitState = "pending" | "ready" | "disabled";
let initState: InitState = "pending";

/**
 * Idempotent, lazy init. Callers invoke this rather than relying on
 * <MixpanelTracker /> having mounted first — sibling-effect ordering in the
 * root layout would otherwise be a silent, fragile dependency.
 *
 * Returns false (and stays silent) when there is no token, so local dev and CI
 * emit nothing at all.
 */
export function ensureMixpanel(): boolean {
  if (initState !== "pending") return initState === "ready";
  // Never latch state during SSR — the browser still needs its chance to init.
  if (typeof window === "undefined") return false;

  if (!TOKEN || isSyntheticClient()) {
    initState = "disabled";
    return false;
  }

  try {
    mixpanel.init(TOKEN, {
      // We emit our own `Landing Viewed`; the SDK's built-in pageview would be
      // a second, differently-named event in the same funnel.
      track_pageview: false,
      // Cookie on .dynameet.ai so the marketing site and app.dynameet.ai share
      // one distinct_id natively. The ?distinct_id= URL param remains the
      // contract — it is what survives ITP and blocked third-party storage —
      // but this makes the two agree by default.
      cross_subdomain_cookie: true,
      // Privacy: never auto-collect DOM interactions or replay sessions. Both
      // default to off today; pinned so an SDK upgrade cannot flip them and
      // start capturing form contents.
      autocapture: false,
      record_sessions_percent: 0,
      debug: process.env.NODE_ENV !== "production",
    });
    initState = "ready";
  } catch {
    // Blocked by an ad blocker, storage denied, etc. Stay silent forever.
    initState = "disabled";
  }

  return initState === "ready";
}

/** Emit an event. No-op when Mixpanel is unavailable. */
export function trackEvent(event: string, props?: Record<string, unknown>): void {
  if (!ensureMixpanel()) return;
  try {
    mixpanel.track(event, props);
  } catch {
    /* never let analytics break the page */
  }
}

/** `Start Trial Clicked` — fired from every Start Trial CTA. */
export function trackStartTrialClick(source: string): void {
  trackEvent("Start Trial Clicked", { source });
}

/**
 * The visitor's Mixpanel id, or null if the SDK is unavailable.
 *
 * Returned verbatim: the app accepts a bare uuid or `$device:<uuid>` and
 * rejects anything else, so this value must not be trimmed or reformatted.
 */
export function getDistinctId(): string | null {
  if (!ensureMixpanel()) return null;
  try {
    const id = mixpanel.get_distinct_id();
    return typeof id === "string" && id.length > 0 ? id : null;
  } catch {
    return null;
  }
}

/**
 * Upgrade a signup URL with the visitor's Mixpanel id + the page's utm_*.
 *
 * The upgrade happens in an effect, AFTER hydration, rather than at click time
 * with preventDefault(). Three reasons this matters:
 *
 *  1. The anchor's real href is correct, so cmd-click, middle-click and
 *     "copy link address" all carry distinct_id. Hijacking the click would
 *     silently drop it for exactly those users.
 *  2. No hydration mismatch — server and first client render agree on the
 *     plain URL, which is also the correct no-JS fallback.
 *  3. GA safety: gtag decorates outbound links with its `_gl` cross-domain
 *     linker param *at click time*. Navigating via location.href would clobber
 *     that and break GA4 session stitching between dynameet.ai and
 *     app.dynameet.ai.
 */
export function useSignupHref(baseUrl: string): string {
  const [href, setHref] = useState(baseUrl);

  useEffect(() => {
    setHref(buildSignupUrl(baseUrl, getDistinctId(), window.location.search));
  }, [baseUrl]);

  return href;
}

/** useSignupHref over the standard trialUrl() destination. */
export function useTrialHref(source: string, plan?: string): string {
  return useSignupHref(trialUrl(source, plan));
}
