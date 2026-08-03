"use client";

import { useEffect } from "react";

import {
  demoSourceFromHref,
  detectLanguage,
  isMeetingBookedMessage,
  readLandingPath,
  recallDemoContext,
  resolveBookedContext,
  shouldTrackLandingView,
} from "@/app/lib/analytics-context";
import {
  ensureMixpanel,
  safeSessionStorage,
  trackDemoBooked,
  trackDemoRequested,
  trackLandingViewed,
} from "@/app/lib/mixpanel";

/**
 * MixpanelTracker — emits `Landing Viewed`, `Demo Requested` and `Demo Booked`.
 * Mounted in app/layout.tsx so it runs on every route, both languages.
 * Specs: docs/superpowers/specs/2026-07-30-mixpanel-funnel-handshake-design.md
 *        docs/superpowers/specs/2026-08-03-demo-booked-event-design.md
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
    const language = detectLanguage(window.location.pathname);

    // Attached synchronously, before the SDK has loaded, so a click during the
    // load window is still captured — trackEvent queues it against the import.
    // trackDemoRequested is a no-op when there is no token.
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      // The demo CTA is any link into the booking widget, on either language.
      const link = target.closest<HTMLAnchorElement>('a[href*="calendarId="]');
      if (!link) return;
      trackDemoRequested(demoSourceFromHref(link.href), language);
    };
    document.addEventListener("click", onDocumentClick, true);

    // `Demo Booked` — the widget iframe posts { type: "meetingBooked", data: {} }
    // to its parent on a completed booking. One listener covers every entry
    // point (calendar popup, Download Center, marketing-offer popups) because
    // they all share this channel.
    //
    // No capture phase: unlike the click listener there is nothing to observe
    // ahead of. meeton.js runs its own listener on the same message to fire
    // Google Ads / Meta / LinkedIn conversions, but never re-posts it, so this
    // sees each booking exactly once.
    const onMessage = (event: MessageEvent) => {
      if (!isMeetingBookedMessage(event.origin, event.data)) return;
      const { language: bookedLanguage, source } = resolveBookedContext(
        recallDemoContext(safeSessionStorage()),
        window.location.pathname,
        window.location.search,
      );
      trackDemoBooked(bookedLanguage, source, readLandingPath(window.__meetonAttribution));
    };
    window.addEventListener("message", onMessage);

    // Claim the landing only once the SDK is actually available. Claiming
    // before the await would burn the once-per-tab claim on a load that failed,
    // losing the visitor's landing entirely.
    let cancelled = false;
    void ensureMixpanel().then((mp) => {
      if (cancelled || !mp) return;
      if (shouldTrackLandingView(window.location.search, safeSessionStorage())) {
        trackLandingViewed(language);
      }
    });

    // Removing the same function references the effect added is what makes
    // StrictMode's dev double-invoke safe: mount → unmount → mount leaves
    // exactly one of each listener, not two.
    return () => {
      cancelled = true;
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return null;
}
