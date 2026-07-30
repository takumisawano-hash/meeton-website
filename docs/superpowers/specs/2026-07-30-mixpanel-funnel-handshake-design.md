# Mixpanel funnel handshake — marketing site half

**Date:** 2026-07-30
**Branch:** `feat/mixpanel-funnel-handshake`
**Counterpart:** dynameet-saas #2917 (app side, already shipped)

## Goal

Join this marketing site's funnel to the app's self-signup funnel as one
continuous Mixpanel stream. The app at `app.dynameet.ai` reads an inbound
`?distinct_id=` from the URL and calls `mixpanel.identify()` with it before
emitting `Signup Landed`. This side sends that parameter.

**Both sites report to the same Mixpanel project.** One project is what makes
the funnel continuous. A token for a different project fails *silently* —
Mixpanel returns success for any valid token, so events are accepted and simply
never appear in the project being watched. There is no error anywhere.

## Success criterion

`Landing Viewed` and `Signup Landed` land on the **same Mixpanel profile**, and
`Signup Landed` carries `adopted_distinct_id: true`. That property exists
specifically to prove the handshake worked.

---

## 1. Architecture

| File | Role |
|---|---|
| `app/lib/signup-url.ts` | **Pure.** `buildSignupUrl(baseUrl, distinctId)` + `isSignupHref`. No SDK, no `window`. |
| `app/lib/analytics-context.ts` | **Pure.** `detectLanguage`, `isBookingWidgetUrl`, `claimLandingView`, `shouldTrackLandingView`, `demoSourceFromHref`. |
| `app/lib/mixpanel.ts` | Client SDK wrapper: lazy idempotent init, the three event emitters, `getDistinctId`, `useTrialHref`. |
| `app/components/MixpanelTracker.tsx` | Layout-mounted, returns `null` — emits `Landing Viewed` + delegated `Demo Requested`. |
| `app/components/StartTrialLink.tsx` | CTA island for plain-anchor signup call sites. |
| `app/lib/*.test.ts` | Vitest over both pure modules (43 tests). |

The gating rules and the URL contract live in **pure** modules with no SDK,
`window` or React, so the parts the app validates are unit-testable in
isolation.

Init is **lazy and idempotent**: `getDistinctId()` self-inits rather than
depending on `MixpanelTracker`'s effect having already run. Sibling-effect
ordering in the root layout would otherwise be a silent, fragile dependency.

**No token → no init, no events.** Local dev and CI stay silent.

## 2. Event semantics

Three events, Title Case to match the app's convention (`Page View`, `Login`,
`Signup Landed`, …). **All three carry `language: "en" | "ja"`.**

| Event | Fires on | Properties |
|---|---|---|
| `Landing Viewed` | both languages, once per tab session | `language` |
| `Start Trial Clicked` | English self-serve CTA | `language: "en"`, `source` |
| `Demo Requested` | demo booking CTA, both languages | `language`, `source` |

`language` is on all three because the funnels are genuinely different: Japan is
partner-led, self-serve signup is closed there, and the app hard-rejects JP
signups with a 403. Merging them into one "CTA clicked" event would make either
funnel unreadable.

No personal data on any event — no email, name or form contents. Mixpanel
auto-captures `utm_*`, referrer and geo, which is enough. `autocapture: false`
and `record_sessions_percent: 0` are pinned so an SDK upgrade cannot start
collecting form fields.

Language detection is `pathname === "/en" || pathname.startsWith("/en/")`.
NOT `startsWith("/en")` — that also matches `/enterprise/`, a Japanese page,
which would be silently misfiled into the English funnel.

## 3. `Landing Viewed` must not double-count

The demo CTA is a SAME-ORIGIN navigation to `/?calendarId=…&showChat=true`
which opens our own booking widget. That is a full page load, so a naive
fire-on-every-load emits a SECOND landing the instant someone clicks the demo
CTA — inflating the top of the funnel with precisely the visitors who
converted. Two guards, both in `app/lib/analytics-context.ts`:

1. **Skip when the URL carries `calendarId`.** That load is a booking view, not
   a landing. The claim is deliberately *not* burned, so the visitor's genuine
   landing later in the same tab still counts.
2. **Claim once per tab via `sessionStorage`.** A reload mid-journey does not
   re-count. Mirrors how the app claims `Signup Landed`. Fails *open* when
   storage is unavailable (private mode / quota): a rare duplicate beats losing
   the funnel's first step entirely.

## 4. CTA handling

`distinct_id` is **appended only**. The existing `utm_source` / `utm_medium` /
`utm_campaign` / `utm_content` on each signup href are preserved exactly —
never rewritten, replaced or regenerated. `utm_content` distinguishes the CTA
slots (nav / home-hero / home-mid / home-footer / home-sticky / footer) and the
app's GA4 reporting is keyed on those values.

Page-level `utm_*` are deliberately NOT merged in. Doing so would change what
the app's GA4 sees for paid signups: reports keyed on `utm_source=dynameet.ai`
stop matching, and `utm_medium=cpc` reclassifies the session from Referral to
Paid Search. Campaign attribution is already preserved — Mixpanel auto-captures
the page's `utm_*` onto `Landing Viewed`, which shares a profile with
`Signup Landed`.

The demo CTA does NOT get `distinct_id`: it is a same-origin navigation, so
Mixpanel identity already persists via its own storage.

### The signup CTA

```
useTrialHref(source, plan?)  →  href upgraded post-hydration via useEffect
        ↑                        SSR/no-JS renders plain trialUrl() — always works
        └── StartTrialLink       convenience wrapper for plain-anchor sites
```

The href is upgraded in an effect, **not** at click time with `preventDefault`:

1. The anchor's real `href` is correct, so cmd-click, middle-click and
   "copy link address" all carry `distinct_id`.
2. No hydration mismatch — server and first client render agree.
3. **GA safety.** gtag decorates outbound links with its `_gl` cross-domain
   linker param *at click time*. Navigating via `location.href` would clobber
   that and break GA4 session stitching.

Applied at 12 renderings across 9 files. Eight hardcoded
`<a href="…/signup?…">` became `StartTrialLink`; for the two data-driven
renderers (`Footer`, `PricingContent`) this is a one-line
`isSignupHref(href) ? <StartTrialLink> : <a>` conditional in the generic mapper,
which also catches any *future* hardcoded signup URL dropped into those arrays.
The four `trialUrl()` callers (`Nav` — covering 4 render points —
`MobileStickyCta`, `CTAButtons`, `RoiTool`) keep their own anchors, styling and
GA events, swapping `trialUrl(x)` → `useTrialHref(x)`.

### The demo CTA

**One delegated listener** on `a[href*="calendarId="]` rather than an edit at
each of the ~12 demo anchors. Delegation is safe here in a way it would not be
for the signup CTA: it only OBSERVES the click, never calls `preventDefault`
and never rewrites an href, so navigation, cmd-click and gtag's link decoration
are untouched. It also catches the in-place widget path, where the handler
preventDefaults but the event still bubbles.

**`openMeetonCalendar()` is instrumented directly** (`app/lib/meeton-cta.ts`)
because its ~15 call sites are all `<button>` elements with no href — the
delegated anchor listener cannot see them. Its signature must stay zero-arg:
call sites pass it as `onClick={openMeetonCalendar}`, so any parameter would
receive a MouseEvent.

## 5. Google Analytics safety

The marketing team depends on GA. Rules observed:

- **Every existing GA/dataLayer call is preserved verbatim.** The hook only
  changes an href value; it never touches `onClick` semantics.
- **`StartTrialLink` fires Mixpanel only — no GA events.** Call sites that
  already fire GA pass their handler through the optional `onClick` prop, so GA
  event counts are unchanged and no duplicate conversions appear.
- **`GoogleAnalytics.tsx` is not touched at all.** An earlier draft extracted
  its `isSyntheticClient()` helper for reuse; that was dropped as unrelated
  refactoring in the most incident-scarred file in the repo (its own comments
  record a change that silently killed Ads conversion tracking for ~a month).
  The new lib carries its own copy with a cross-reference comment.

Existing GA events on signup CTAs, all preserved: `TrialPageClient`
(`trial_click` + `destination: app_signup`), `MobileStickyCta`, `CTAButtons`,
`RoiTool`.

## 6. Contract

The app accepts a bare uuid **or** the SDK's `$device:<uuid>` form and rejects
anything else. `mixpanel.get_distinct_id()` returns one of those two, so its
value is passed through **verbatim** via `URLSearchParams.set` — no trim, no
reformat, no lowercase, no wrapping. Param name is exactly `distinct_id`.

## 7. Failure modes

Every path degrades to a working CTA with no parameter:

| Failure | Behavior |
|---|---|
| `NEXT_PUBLIC_MIXPANEL_TOKEN` unset | Nothing inits, nothing emits |
| SDK blocked / throws | `getDistinctId()` returns `null`, href stays plain |
| JS disabled | SSR href is the plain signup URL |
| `sessionStorage` unavailable | Claim fails open — landing still counted |
| Malformed base URL | Returned untouched |

## 8. Verification (performed 2026-07-30, dev token)

| Check | Result |
|---|---|
| `Landing Viewed` on `/en/` | claim set; POST → 200 |
| `Landing Viewed` on `/` (JA) | claim set; `Demo Requested` confirmed `language: "ja"` |
| `/?calendarId=…` | suppressed, **and claim not burned** |
| Reload of a claimed tab | zero Mixpanel requests |
| `/enterprise/` (JA) | init only, zero events |
| 6 EN signup CTAs | all utm intact; `$device:<uuid>`; `distinct_id` appended **last** |
| `utm_content` slots | nav, home-hero, home-mid, home-footer, home-sticky, footer |
| `Start Trial Clicked` | `language: "en"`, `source: "nav"`, no personal fields |
| `Demo Requested` | `language: "ja"`, `source: "nav"`, no personal fields |
| GA | gtag.js loaded, GA4 + Ads configs both present |
| Landed URL | `app.dynameet.ai/signup?…&distinct_id=$device:…` |

**Not verifiable from this repo:** that the production token matches the app's
(no access to either Mixpanel project), and `adopted_distinct_id: true` (needs a
real signup plus visibility into the project).

## 9. Deploy

Production build needs `NEXT_PUBLIC_MIXPANEL_TOKEN` set to **the same token the
app's production build uses**. Confirm the value matches before shipping — the
wrong-project failure is silent and cost hours on the app side.

Note that testing the full handshake requires **both halves on the same token**.
Clicking a CTA from a local dev build lands on production `app.dynameet.ai`,
which reports to the production project — so a dev-token marketing site and a
prod-token app will never share a profile, and it looks exactly like a broken
handshake even when the code is correct.
