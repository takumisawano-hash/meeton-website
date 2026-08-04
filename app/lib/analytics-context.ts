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

/** sessionStorage key prefix claiming `Landing Viewed` once per tab. */
export const LANDING_VIEWED_CLAIM_KEY = "mp_landing_viewed";

/**
 * The claim key for one language funnel — `mp_landing_viewed_ja` / `…_en`.
 *
 * Namespaced by language because the switcher is a plain full-page `<a>`
 * (Nav.tsx:480, deliberately not a soft-nav Link so the pref_lang cookie is
 * written before the geo middleware sees the request). The tab — and its
 * sessionStorage — therefore survives the switch, so a single shared key let
 * the JA landing swallow the EN one: the EN funnel got a `Demo Requested` with
 * no `Landing Viewed` above it, reading better than reality.
 */
export function landingViewedClaimKey(language: Language): string {
  return `${LANDING_VIEWED_CLAIM_KEY}_${language}`;
}

/**
 * Claim `Landing Viewed` for this tab and language, returning true only for
 * the first caller. Mirrors how the app claims `Signup Landed`, so a reload
 * mid-journey does not re-count the visitor.
 *
 * sessionStorage (not localStorage) is deliberate: the claim must last exactly
 * one tab session. Returns true when storage is unavailable (private mode,
 * quota) — better to risk a duplicate than to lose the funnel's first step
 * entirely.
 *
 * Scope is once per tab session, PER LANGUAGE — not once per page load, and
 * not once per visitor. A visitor toggling JA↔EN repeatedly still produces
 * exactly two events, one per funnel, because each namespace holds its claim.
 */
export function claimLandingView(
  storage: Storage | undefined,
  language: Language,
): boolean {
  if (!storage) return true;
  const key = landingViewedClaimKey(language);
  try {
    if (storage.getItem(key)) return false;
    storage.setItem(key, "1");
    return true;
  } catch {
    return true;
  }
}

/**
 * Whether `Landing Viewed` should fire for this page view. Both guards from
 * the spec, in one place so the rule is testable as a unit.
 *
 * Order matters: the booking-widget skip returns before any claim is taken, so
 * a demo CTA never burns a claim. That is load-bearing for EN visitors — the
 * CTA sends them to the JA root (`dynameet.ai/?calendarId=…`), which must
 * neither count as a JA landing nor consume the JA claim.
 */
export function shouldTrackLandingView(
  search: string,
  storage: Storage | undefined,
  language: Language,
): boolean {
  if (isBookingWidgetUrl(search)) return false;
  return claimLandingView(storage, language);
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

/** Where a demo CTA that did not name itself is filed. */
export const DEFAULT_DEMO_SOURCE = "widget-button";

/**
 * The `source` a `<button>` demo CTA is reporting.
 *
 * `openMeetonCalendar` takes its source as an optional argument, and many call
 * sites still pass the function itself: `onClick={openMeetonCalendar}`. React
 * then hands it a **MouseEvent**, which without this guard would be stringified
 * into the funnel as `source: "[object Object]"`.
 *
 * That hazard is why the function was pinned zero-arg. The guard removes the
 * cause rather than the symptom, so named CTAs can opt in one at a time while
 * every un-migrated site keeps reporting the old default.
 */
export function demoSourceFromArg(arg: unknown): string {
  return typeof arg === "string" && arg.length > 0 ? arg : DEFAULT_DEMO_SOURCE;
}

/* ── `Demo Booked` — the booking widget's completion signal ──────────────
 * Spec: docs/superpowers/specs/2026-08-03-demo-booked-event-design.md
 */

/**
 * Origin of the booking iframe. meeton.js only ever builds one iframe URL,
 * `https://app.dynameet.ai/iframe.html?cb=…`, so this is the sole legitimate
 * sender of `meetingBooked`.
 *
 * A window.postMessage typed into the console on the page itself carries THIS
 * site's origin and is rejected here. That does not require a real booking to
 * verify: DevTools can evaluate inside an injected app.dynameet.ai frame,
 * which produces a genuine origin. Procedure: docs/mixpanel-funnel-testing.md
 * Test 3.5.
 */
export const MEETON_APP_ORIGIN = "https://app.dynameet.ai";

/**
 * True only for the booking-completed message from the widget iframe.
 *
 * Both guards live here so the rule is testable without a DOM. Origin is
 * checked BEFORE anything is read off `data`: the page carries other
 * postMessage traffic (HubSpot, Pardot, GTM), and the widget's own channel is
 * busy with unrelated chatter — `setIframeDimensions`, `chatOpen`, … — which
 * would otherwise be counted as bookings.
 *
 * `data` is not always an object. The same channel delivers strings and null,
 * so it is narrowed rather than cast.
 */
export function isMeetingBookedMessage(origin: string, data: unknown): boolean {
  if (origin !== MEETON_APP_ORIGIN) return false;
  if (typeof data !== "object" || data === null) return false;
  return (data as { type?: unknown }).type === "meetingBooked";
}

/**
 * `landingPath` out of an attribution payload, or undefined.
 *
 * Read from `window.__meetonAttribution` (AttributionBootstrap), NOT from
 * `window.DynaMeetConfig.attribution`. The latter is a one-time snapshot taken
 * in MeetonScript's effect, which makes it load-bearing on AttributionBootstrap
 * flushing first and leaves it null forever if that order ever changes. It is
 * also never assigned at all on `/lp*`, where MeetonScript returns early.
 * `__meetonAttribution` is populated on every route; AdsDebugPanel and
 * SolutionLpTemplate already read the same source directly.
 *
 * Still walks `unknown`: this is a mutable global any script on the page can
 * overwrite, and a wrong shape must degrade to "no landing_path" rather than
 * throw inside a message handler.
 *
 * Caveat carried from AttributionBootstrap: landingPath is sticky in
 * localStorage for 180 days, so this is the first page this BROWSER ever saw,
 * not the entry page of the current visit.
 */
export function readLandingPath(attribution: unknown): string | undefined {
  if (typeof attribution !== "object" || attribution === null) return undefined;
  const path = (attribution as { landingPath?: unknown }).landingPath;
  return typeof path === "string" && path.length > 0 ? path : undefined;
}

/** sessionStorage key carrying demo-request context to the booking event. */
export const DEMO_CONTEXT_KEY = "mp_demo_context";

/**
 * How long a demo request may still explain a later booking.
 *
 * Without a bound the record only ever expires when another demo CTA is
 * clicked, so a click at 09:00 would attribute a chat-initiated booking at
 * 17:00 in the same tab. The "last-touch, like AttributionBootstrap"
 * justification does not carry over: `lastTouch` is refreshed by any new URL
 * params, whereas nothing refreshes this but another click.
 */
export const DEMO_CONTEXT_TTL_MS = 30 * 60 * 1000;

/** What `Demo Requested` knew that the widget's postMessage cannot tell us. */
export type DemoContext = { source: string; language: Language };

/**
 * Stash the demo request so `Demo Booked` can carry the same `source` and
 * `language`, making the funnel sliceable end to end.
 *
 * sessionStorage, not localStorage: the record must last exactly one tab
 * session, and it has to survive the same-origin navigation to
 * `dynameet.ai/?calendarId=…` that demo CTAs fall back to when the widget has
 * not loaded yet. Silent on failure — analytics never breaks a CTA.
 */
export function rememberDemoContext(
  storage: Storage | undefined,
  context: DemoContext,
  now: number = Date.now(),
): void {
  if (!storage) return;
  try {
    storage.setItem(DEMO_CONTEXT_KEY, JSON.stringify({ ...context, at: now }));
  } catch {
    /* private mode, quota — the booking still reports, just without source */
  }
}

/**
 * Read back the stashed demo request, or null when there was none (a booking
 * opened straight from the chat widget), it has expired, or it is unusable.
 *
 * Deliberately NOT cleared on read. A visitor who books twice within the TTL
 * has the second booking inherit the first's source; clearing would instead
 * drop source from that booking entirely.
 *
 * An empty `source` is rejected rather than half-honoured — it would otherwise
 * count as "a demo was requested" for the language rule while contributing no
 * source, since trackDemoBooked omits falsy values. No caller produces one:
 * demoSourceFromHref falls back to "unknown".
 */
export function recallDemoContext(
  storage: Storage | undefined,
  now: number = Date.now(),
): DemoContext | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(DEMO_CONTEXT_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const { source, language, at } = parsed as {
      source?: unknown;
      language?: unknown;
      at?: unknown;
    };
    if (typeof source !== "string" || source.length === 0) return null;
    if (language !== "en" && language !== "ja") return null;
    // A record with no timestamp predates the TTL and cannot be aged.
    if (typeof at !== "number" || !Number.isFinite(at)) return null;
    if (now - at > DEMO_CONTEXT_TTL_MS) return null;
    return { source, language };
  } catch {
    return null;
  }
}

/**
 * The `language` and `source` a `Demo Booked` event should carry.
 *
 * This is the one genuinely conditional rule in the feature, so it lives here
 * rather than inline in the effect — the DOM component is not unit-testable.
 *
 * `source` always comes from the stash; it is page-independent.
 *
 * `language` only defers to the stash when the current URL is the booking
 * widget itself (`?calendarId=…`). That is the ONE case where the page's own
 * path lies: demo CTAs fall back to navigating to the JA root when the widget
 * has not loaded, so an English visitor would otherwise be filed as Japanese.
 *
 * Everywhere else the pathname wins, because the stash goes stale in ways the
 * page does not. A visitor can click a JA demo CTA, abandon it, switch
 * language (a full-page <a> nav, so sessionStorage survives) and book from the
 * chat widget on an English page — trusting the stash there would file a
 * genuine EN booking into the JA funnel, the one merge CLAUDE.md forbids.
 */
export function resolveBookedContext(
  stash: DemoContext | null,
  pathname: string,
  search: string,
): { language: Language; source?: string } {
  const pageLanguage = detectLanguage(pathname);
  if (!stash) return { language: pageLanguage };
  return {
    language: isBookingWidgetUrl(search) ? stash.language : pageLanguage,
    source: stash.source,
  };
}
