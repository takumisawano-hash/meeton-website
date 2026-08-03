"use client";

import { useEffect, useState } from "react";

import { detectLanguage, type Language } from "./analytics-context";
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
 *
 * The SDK is loaded via DYNAMIC import (2026-08-03). Statically imported it was
 * ~103KB of the 312KB of JavaScript on /en/ — a third of the page's JS for
 * three events, on a site whose Core Web Vitals feed its SEO. Dynamic import
 * keeps it out of the initial bundle so the browser paints without parsing it.
 *
 * It is still fetched immediately on mount, NOT on idle. That matters: every
 * emitter here is fire-and-forget, so an event raised before the module lands
 * is queued against the load promise rather than sent. Deferring the fetch
 * would widen the window in which a fast click navigates away before the SDK
 * exists and the event is lost outright. Loading eagerly-but-off-critical-path
 * keeps that window to the network round trip.
 */

const TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

/**
 * LOCAL TESTING ONLY — retargets signup CTAs at a dev build of the app.
 * Leave unset in production; the CTA then uses its real app.dynameet.ai href.
 * See buildSignupUrl for why testing the handshake requires this.
 */
const APP_ORIGIN_OVERRIDE = process.env.NEXT_PUBLIC_APP_ORIGIN;

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

type Mixpanel = typeof import("mixpanel-browser").default;

/** Resolved SDK once loaded and initialised; null when unavailable. */
let sdk: Mixpanel | null = null;
/** Single in-flight load, so concurrent callers share one import. */
let loadOnce: Promise<Mixpanel | null> | null = null;

/**
 * Idempotent, lazy init. Callers invoke this rather than relying on
 * <MixpanelTracker /> having mounted first — sibling-effect ordering in the
 * root layout would otherwise be a silent, fragile dependency.
 *
 * Resolves null (and stays silent) when there is no token, so local dev and CI
 * emit nothing at all — and in that case the SDK is never even downloaded.
 */
export function ensureMixpanel(): Promise<Mixpanel | null> {
  if (loadOnce) return loadOnce;

  // Never latch during SSR — the browser still needs its chance to load.
  if (typeof window === "undefined") return Promise.resolve(null);

  if (!TOKEN || isSyntheticClient()) {
    loadOnce = Promise.resolve(null);
    return loadOnce;
  }

  loadOnce = import("mixpanel-browser")
    .then((mod) => {
      const instance = mod.default;
      instance.init(TOKEN, {
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
      sdk = instance;
      return instance;
    })
    .catch(() => {
      // Chunk blocked by an ad blocker, offline, storage denied, etc.
      // Stay silent forever rather than retrying on every call.
      sdk = null;
      return null;
    });

  return loadOnce;
}

/**
 * Emit an event. Fire-and-forget: never awaited by callers, so it cannot delay
 * a click or a navigation. Events raised before the SDK lands queue against the
 * same load promise and fire in call order once it resolves.
 */
export function trackEvent(event: string, props?: Record<string, unknown>): void {
  void ensureMixpanel().then((mp) => {
    if (!mp) return;
    try {
      mp.track(event, props);
    } catch {
      /* never let analytics break the page */
    }
  });
}

/**
 * The language funnel the current page belongs to.
 *
 * Every event carries this. Japan is partner-led — self-serve signup is closed
 * there and the app hard-rejects JP signups with a 403 — so the two languages
 * have genuinely different conversion goals and each funnel must be readable
 * on its own.
 */
export function currentLanguage(): Language {
  if (typeof window === "undefined") return "ja";
  return detectLanguage(window.location.pathname);
}

/** `Landing Viewed` — the top of both funnels. Callers own the guards. */
export function trackLandingViewed(language: Language): void {
  trackEvent("Landing Viewed", { language });
}

/**
 * `Start Trial Clicked` — the English self-serve CTA.
 * Always `language: "en"`: this CTA only exists on the English pages, since
 * JP self-serve signup is closed.
 */
export function trackStartTrialClick(source: string): void {
  trackEvent("Start Trial Clicked", { source, language: "en" });
}

/** `Demo Requested` — the demo booking CTA, on both languages. */
export function trackDemoRequested(source: string, language: Language): void {
  trackEvent("Demo Requested", { source, language });
}

/**
 * The visitor's Mixpanel id, or null if the SDK is unavailable.
 *
 * Returned verbatim: the app accepts a bare uuid or `$device:<uuid>` and
 * rejects anything else, so this value must not be trimmed or reformatted.
 */
export async function getDistinctId(): Promise<string | null> {
  const mp = await ensureMixpanel();
  return readDistinctId(mp);
}

/**
 * Synchronous read, for when the SDK already happens to be loaded — lets a
 * client-side route change compute the correct href on first render instead of
 * flashing the plain one. Returns null before the SDK lands.
 */
export function getDistinctIdSync(): string | null {
  return readDistinctId(sdk);
}

function readDistinctId(mp: Mixpanel | null): string | null {
  if (!mp) return null;
  try {
    const id = mp.get_distinct_id();
    return typeof id === "string" && id.length > 0 ? id : null;
  } catch {
    return null;
  }
}

/**
 * Append the visitor's Mixpanel id to a signup URL, preserving its utm_*.
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
  // APP_ORIGIN is a local-testing override only; unset in production.
  const upgrade = (id: string | null) => buildSignupUrl(baseUrl, id, APP_ORIGIN_OVERRIDE);
  // Seed from the sync read so a client-side route change with the SDK already
  // loaded renders the correct href immediately, with no flash of the plain URL.
  const [href, setHref] = useState(() => upgrade(getDistinctIdSync()));

  useEffect(() => {
    let cancelled = false;
    // Re-read synchronously first: `baseUrl` may have changed while the SDK was
    // already loaded, in which case there is nothing to wait for.
    setHref(upgrade(getDistinctIdSync()));
    void getDistinctId().then((id) => {
      if (!cancelled) setHref(upgrade(id));
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl]);

  return href;
}

/** useSignupHref over the standard trialUrl() destination. */
export function useTrialHref(source: string, plan?: string): string {
  return useSignupHref(trialUrl(source, plan));
}
