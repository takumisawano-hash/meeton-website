"use client";

import { useEffect } from "react";

import { demoSourceFromHref, detectLanguage, shouldTrackLandingView } from "@/app/lib/analytics-context";
import { ensureMixpanel, trackDemoRequested, trackLandingViewed } from "@/app/lib/mixpanel";

/**
 * MixpanelTracker — emits `Landing Viewed` and `Demo Requested`.
 * Mounted in app/layout.tsx so it runs on every route, both languages.
 * Spec: docs/superpowers/specs/2026-07-30-mixpanel-funnel-handshake-design.md
 *
 * `Landing Viewed` fires for BOTH languages, each tagged with `language`, so
 * the English self-serve funnel and the Japanese partner-led funnel can each
 * be read on their own. Two guards stop it double-counting:
 *
 *  1. Skip when the URL carries `calendarId`. The demo CTA is a same-origin
 *     navigation to `/?calendarId=…&showChat=true`, so without this a naive
 *     fire-on-every-load emits a SECOND landing the instant someone clicks the
 *     demo CTA — inflating the top of the funnel with the visitors who
 *     actually converted.
 *  2. Claim once per tab via sessionStorage, so a reload mid-journey does not
 *     re-count. Mirrors how the app claims `Signup Landed`.
 *
 * `Demo Requested` uses one delegated listener rather than an edit at each of
 * the ~12 demo call sites (Nav ×4, CTAButtons, MobileStickyCta, RoiTool ×2,
 * DemoBookingButton, Home router card, PricingContent JA fallback, partners).
 * Delegation is safe here in a way it would not be for the signup CTA: this
 * only OBSERVES the click. It never calls preventDefault and never rewrites an
 * href, so navigation, cmd-click and gtag's link decoration are all untouched.
 * It also catches the in-place widget path, where the handler preventDefaults
 * but the event still bubbles.
 */
export default function MixpanelTracker() {
  useEffect(() => {
    if (!ensureMixpanel()) return;

    const language = detectLanguage(window.location.pathname);

    if (shouldTrackLandingView(window.location.search, window.sessionStorage)) {
      trackLandingViewed(language);
    }

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      // The demo CTA is any link into the booking widget, on either language.
      const link = target.closest<HTMLAnchorElement>('a[href*="calendarId="]');
      if (!link) return;
      trackDemoRequested(demoSourceFromHref(link.href), language);
    };

    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, []);

  return null;
}
