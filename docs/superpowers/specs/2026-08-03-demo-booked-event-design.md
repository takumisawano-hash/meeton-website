# `Demo Booked` — closing the acquisition funnel

**Date:** 2026-08-03
**Predecessor:** `2026-07-30-mixpanel-funnel-handshake-design.md`

## Goal

Add the last step of the acquisition funnel. Today it ends at intent:

```
Landing Viewed → Demo Requested → ???
```

`Demo Requested` fires when someone *clicks* a demo CTA. Nothing records
whether they actually completed a booking. `Demo Booked` closes that gap.

```
Landing Viewed → Demo Requested → Demo Booked
```

## Success criterion

One completed booking through any entry point (calendar popup, Download
Center, marketing-offer popup) produces exactly one `Demo Booked` event,
carrying the `source` of the CTA that started the journey and the
visitor's `landing_path`.

---

## 1. How the widget signals a booking

`meeton.js` loads from `https://app.dynameet.ai/meeton.js` (see
`app/components/MeetonScript.tsx`) and injects an iframe whose only URL form
in the bundle is:

```
https://app.dynameet.ai/iframe.html?cb=<ts>[&mode=<mode>]
```

On a completed booking the iframe posts to its parent:

```js
{ type: "meetingBooked", data: {} }
```

`data` is empty — no calendar or meeting id. Everything we attach must come
from our own page state.

### Verified against the live bundle (2026-08-03)

Checks run against a fetched copy of `https://app.dynameet.ai/meeton.js`
(800KB, HTTP 200):

| Claim | Result |
|---|---|
| `event.origin` is `https://app.dynameet.ai` | **Confirmed** — the only iframe src constructed is `https://app.dynameet.ai/iframe.html?cb=…` |
| The message reaches our `window` | **Confirmed** — `meeton.js` runs its own parent-side listener containing `if (n.type === "meetingBooked") { this._fireCalendarConversionEvents(); return }`, beside the `setIframeDimensions` case |
| No double-fire from rebroadcast | **Confirmed** — zero matches for `window\|top\|parent\|self.postMessage` in the bundle. `meeton.js` consumes `meetingBooked` and never re-posts it |
| Only one iframe can send it | **Confirmed** — one iframe URL template in the whole bundle |

`meeton.js` already fires Google Ads / Meta / LinkedIn conversions from this
message via `_fireCalendarConversionEvents()`. Mixpanel is wired **directly**
rather than through GTM, matching the other three funnel events.

---

## 2. Mixpanel is already installed

The brief assumed otherwise. It is not:

- `mixpanel-browser` is a dependency (`package.json`)
- `app/lib/mixpanel.ts` owns lazy init, the token guard and the synthetic-client guard
- `app/components/MixpanelTracker.tsx` is mounted in `app/layout.tsx:222`, so it runs on every route

`Demo Booked` extends this. **Do not call `init()` a second time** — the
existing `ensureMixpanel()` is idempotent and already the single entry point.

---

## 3. Event shape

```
Demo Booked  { language: "ja" | "en", source?: string, landing_path?: string }
```

| Property | Source | Notes |
|---|---|---|
| `language` | `resolveBookedContext` — page pathname, except on the booking-widget URL where the stash wins | Always present. Never merge the JA and EN funnels |
| `source` | stashed at `Demo Requested` | Omitted for chat-initiated bookings with no prior CTA click |
| `landing_path` | `window.__meetonAttribution?.landingPath` | Omitted when unset |

Title Case name and lowercase property names match the existing three events.

### Why `source` and `language` are stashed rather than derived

The widget gives us nothing. Both are captured at `Demo Requested` time into
one `sessionStorage` record and read back at booking time.

The write lives **inside `trackDemoRequested()`**, not at the call sites.
That function is already the funnel-wide chokepoint — both the delegated
anchor listener in `MixpanelTracker` and `openMeetonCalendar()` in
`meeton-cta.ts` route through it — so the stash cannot drift out of sync with
the event it describes, and any future demo CTA inherits it.

`sessionStorage` survives the same-origin navigation to
`dynameet.ai/?calendarId=…` that the demo CTA falls back to when the widget
has not loaded yet. It also scopes the record to one tab, matching the
existing `claimLandingView` precedent.

### `landing_path` semantics

`AttributionBootstrap.tsx:127` does `existing.landingPath || pathname` and
persists to `localStorage` for **180 days**. So `landing_path` is lifetime
first-touch, not this visit's entry page. That is a deliberate carry-over of
the existing attribution model, but it is not what the name implies at face
value — read it as "first page this browser ever saw".

Read from `window.__meetonAttribution` (`AttributionBootstrap.tsx:116`), NOT
from the `DynaMeetConfig.attribution` snapshot that `MeetonScript.tsx:79`
takes. The snapshot is load-bearing on `AttributionBootstrap` (mounted at
`app/layout.tsx:217`) flushing before `MeetonScript` (line 226), goes null
forever if that order ever changes, and is never assigned at all on `/lp*`
where `MeetonScript` returns early. `__meetonAttribution` is populated on every
route, and `AdsDebugPanel` / `SolutionLpTemplate` already read it directly.

### Language: both paths land correctly

There is currently **no EN demo CTA** — every English surface routes to trial
or signup (`Nav.tsx:307`, `CTAButtons.tsx:64`, `MobileStickyCta.tsx:35`,
`RoiTool.tsx:317`, explicit `ctaHref` on all EN plans in
`PricingContent.tsx:274–297`, and EN blog omits the JA-only CTA components).

EN bookings still happen — the chat widget loads on every page except `/lp`,
so a visitor on `/en/pricing/` can book without touching a demo CTA.

| Booking path | Language from | Result |
|---|---|---|
| Demo CTA → widget opens in place | current pathname | correct for either language |
| Demo CTA → fallback navigation to `/?calendarId=…` | stashed record | survives the JA-root landing |
| Chat widget on an EN page | current pathname | `"en"` |

The stash only outranks the pathname on the `?calendarId=` URL, because that
is the one case where the page lies. Trusting it unconditionally would let a
stale JA stash misfile a later EN booking — see §5.

---

## 4. Architecture

Follows the existing three-layer split.

| File | Role |
|---|---|
| `app/lib/analytics-context.ts` | Pure rules. No SDK, no `window`, no React — unit-testable in isolation |
| `app/lib/mixpanel.ts` | SDK glue: `trackDemoBooked`, and the stash write inside `trackDemoRequested` |
| `app/components/MixpanelTracker.tsx` | DOM wiring: the `message` listener, in the effect that already owns the click listener |

### New pure helpers

```ts
MEETON_APP_ORIGIN   = "https://app.dynameet.ai"
DEMO_CONTEXT_KEY    = "mp_demo_context"
DEMO_CONTEXT_TTL_MS = 30 * 60 * 1000

isMeetingBookedMessage(origin: string, data: unknown): boolean
readLandingPath(attribution: unknown): string | undefined
rememberDemoContext(storage, ctx, now?): void
recallDemoContext(storage, now?): DemoContext | null
resolveBookedContext(stash, pathname, search): { language, source? }
```

`resolveBookedContext` is the only conditional rule in the feature, so it lives
here rather than inline in the effect where nothing could test it.

`isMeetingBookedMessage` holds **both** guards so the rule is testable as a
unit: origin equality first, then `type === "meetingBooked"`. `data` is
reached with optional chaining — the same channel carries strings, `null`,
and frequent unrelated widget traffic (`setIframeDimensions`, `chatOpen`, …).

`readLandingPath` walks `unknown` defensively: `__meetonAttribution` is a
mutable global any script on the page can overwrite, and a wrong shape must
degrade to "no landing_path" rather than throw inside a message handler.

### Listener

Registered in `MixpanelTracker`'s existing effect, cleaned up alongside the
click listener. StrictMode's double-invoke in dev is handled by that cleanup
removing the same function reference the effect added — mount, unmount,
mount leaves exactly one listener. No capture phase: unlike the click
listener there is nothing to observe ahead of.

---

## 5. Decisions taken

- **The stash is not cleared after a booking, but does expire.** Someone who
  books twice inside `DEMO_CONTEXT_TTL_MS` (30 min) has the second booking
  inherit the first's `source`; clearing on read would drop it entirely. The
  TTL exists because nothing else ages this record — unlike
  `AttributionBootstrap`'s `lastTouch`, which any new URL params refresh — so
  without it a 09:00 click would claim credit for a 17:00 chat booking.
- **The stashed `language` only wins on the booking-widget URL**
  (`resolveBookedContext`). That is the one place the page's own path lies.
  Trusting it everywhere lets a stale JA stash file a genuine EN booking into
  the JA funnel after a language switch — `sessionStorage` survives it,
  because the switcher is a full-page `<a>`.
- **`window.sessionStorage` is reached through `safeSessionStorage()`.** The
  getter itself throws when a browser blocks all storage, and
  `trackDemoRequested` runs synchronously inside `openMeetonCalendar()` before
  the widget opens — an uncaught throw there kills every `<button>` demo CTA.
- **Property named `landing_path`**, matching lowercase `source` / `language`.
- **No dedupe guard.** The bundle audit above rules out rebroadcast, and one
  visitor genuinely booking twice should produce two events.
- **Privacy unchanged.** No personal data; `data` is empty and we never read
  form contents. Autocapture and session replay stay disabled.

## 6. Testing

Unit tests in `app/lib/analytics-context.test.ts` (node environment, pure
functions, fake `Storage` — matching the existing file): wrong origin,
`data` as string / `null` / `undefined`, unrelated `setIframeDimensions`
traffic, a malformed attribution global, stash round-trip with corrupt JSON
and an expired TTL, and the stash-vs-pathname precedence rule.

Live verification does NOT require a real booking. A `window.postMessage` typed
into the console on the page carries this site's origin and is correctly
rejected — but DevTools can evaluate inside an injected `app.dynameet.ai`
frame, which produces a genuine origin. Full procedure, including the reset
steps and negative cases: `docs/mixpanel-funnel-testing.md` Test 3.5.

Verified live 2026-08-03: correct event and properties; exactly one event per
message (StrictMode cleanup); `setIframeDimensions` / non-object `data` /
missing `type` all ignored; top-frame post rejected by the origin guard;
stashed context overriding the pathname on the booking-widget URL.
