"use client";

import { useEffect } from "react";

import { ensureMixpanel, trackEvent } from "@/app/lib/mixpanel";

/**
 * MixpanelTracker — inits Mixpanel and emits `Landing Viewed`.
 * Mounted in app/layout.tsx so it runs once per page load on every route.
 * Spec: docs/superpowers/specs/2026-07-30-mixpanel-funnel-handshake-design.md
 *
 * Scope split, deliberate:
 *
 *  - Init runs on EVERY page, JA included. The self-serve funnel is EN-only,
 *    but a visitor who lands on a JA blog post and then switches to EN must
 *    keep the same distinct_id or the handshake breaks at the language switch.
 *  - `Landing Viewed` fires on /en/* ONLY. JA CTAs point at demo booking
 *    (demoUrl), never /signup, so a JA `Landing Viewed` could never reach
 *    `Signup Landed` and would just depress the funnel's conversion rate.
 *
 * Empty dep array = once per full page load, not per client-side <Link>
 * navigation, matching "on first load".
 */
export default function MixpanelTracker() {
  useEffect(() => {
    if (!ensureMixpanel()) return;

    // NOT startsWith("/en") — that also matches /enterprise/.
    const path = window.location.pathname;
    const isEnglish = path === "/en" || path.startsWith("/en/");
    if (!isEnglish) return;

    trackEvent("Landing Viewed");
  }, []);

  return null;
}
