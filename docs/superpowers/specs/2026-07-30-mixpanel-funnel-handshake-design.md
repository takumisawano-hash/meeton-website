# Mixpanel funnel handshake — marketing site half

**Date:** 2026-07-30
**Branch:** `feat/mixpanel-funnel-handshake`
**Counterpart:** dynameet-saas #2917 (app side, already shipped)

## Goal

Join this marketing site's funnel to the app's 10-stage self-signup funnel as one
continuous Mixpanel stream. The app at `app.dynameet.ai` already reads an inbound
`?distinct_id=` from the URL and calls `mixpanel.identify()` with it before emitting
`Signup Landed`. This side sends that parameter.

**Both sites report to the same Mixpanel project.** One project is what makes the
funnel continuous. A token for a different project fails *silently* — Mixpanel
returns success for any valid token, so events are accepted and simply never appear
in the project being watched.

## Success criterion

`Landing Viewed` and `Signup Landed` land on the **same Mixpanel profile**, and
`Signup Landed` carries `adopted_distinct_id: true`. That property exists
specifically to prove the handshake worked.

---

## 1. Architecture

| File | Role |
|---|---|
| `app/lib/signup-url.ts` | **Pure.** `buildSignupUrl(base, distinctId, currentSearch)`. No SDK, no `window`. The contract the app validates lives here, and this is what the tests cover. |
| `app/lib/mixpanel.ts` | Client SDK wrapper: lazy idempotent init, `trackEvent`, `getDistinctId`, `useTrialHref` |
| `app/components/MixpanelTracker.tsx` | Layout-mounted, returns `null` — inits + emits `Landing Viewed` |
| `app/components/StartTrialLink.tsx` | CTA island for plain-anchor call sites |
| `app/lib/signup-url.test.ts` | Vitest over the pure builder |

Init is **lazy and idempotent**: `getDistinctId()` self-inits rather than depending
on `MixpanelTracker`'s effect having already run. Sibling-effect ordering in the
root layout would otherwise be a silent, fragile dependency.

## 2. Event semantics

- **`Landing Viewed`** — `/en/*` only, once per full page load (not on client-side
  `<Link>` navigations, matching "on first load"). No custom properties; Mixpanel
  auto-captures `$current_url`, `utm_*`, referrer, geo.
- **`Start Trial Clicked`** — one `source` property (`"nav"`, `"footer"`,
  `"pricing-lead"`, …), reusing the existing GA `source` convention.

No personal data on either event: no email, no name, no form contents.

**Init runs on every page (JA included); only the event is `/en/*`-gated.** A
visitor who lands on a JA blog post and switches to EN keeps the same
`distinct_id`, so the handshake survives the language switch. Scope is `/en/*`
because the self-serve funnel is EN-only — JA CTAs point at demo booking
(`demoUrl`), never `/signup`.

Synthetic clients (Lighthouse / PageSpeed / headless / webdriver) are skipped,
mirroring `GoogleAnalytics.tsx`. Bot-inflated `Landing Viewed` would corrupt the
exact conversion rate this work exists to measure.

## 3. CTA upgrade

One mechanism, two ergonomics:

```
useTrialHref(source, plan?)  →  href upgraded post-hydration via useEffect
        ↑                        SSR/no-JS renders plain trialUrl() — always works
        └── StartTrialLink       convenience wrapper for plain-anchor sites
```

The href is upgraded in `useEffect`, **not** at click time with `preventDefault`.
This matters for three independent reasons:

1. The anchor's real `href` is correct, so cmd-click, middle-click and
   "copy link address" all carry `distinct_id`. A click-time `preventDefault`
   would silently drop it for exactly those users.
2. No hydration mismatch — server and first client render agree on the plain URL.
3. **GA safety.** gtag decorates outbound links with its `_gl` cross-domain linker
   param *at click time*. Navigating via `location.href` would clobber that
   decoration and break GA4 session stitching between `dynameet.ai` and
   `app.dynameet.ai`.

### Call sites (12 renderings, 9 files)

**8 hardcoded `<a href="…/signup?…">` → `StartTrialLink`:**
`Footer.tsx:149`, `TrialPageClient.tsx:283`, `IntegrationDetailLayout.tsx:934`,
`SolutionLpTemplate.tsx:163`, `PricingContent.tsx:283,295` (+ enterprise).

For the two data-driven renderers (`Footer.tsx:318`, `PricingContent.tsx:464/512/544`)
this is a one-line `isSignupHref(href) ? <StartTrialLink> : <a>` conditional in the
generic mapper — which also catches any *future* hardcoded signup URL dropped into
those data arrays.

**4 `trialUrl()` callers keep their own anchors, styling and GA events untouched** —
they swap `trialUrl(x)` → `useTrialHref(x)` and add one line to the existing
`onClick`:
`Nav.tsx:183` (covers 4 render points), `MobileStickyCta.tsx:32`,
`CTAButtons.tsx:69`, `RoiTool.tsx:314`.

`CTAButtons` branches between demo and trial hrefs; wrapping it in `StartTrialLink`
would mean restructuring it. The hook avoids that.

## 4. Google Analytics safety

The marketing team depends on GA. Rules observed:

- **Every existing GA/dataLayer call is preserved verbatim.** The hook only changes
  an href value; it never touches `onClick` semantics.
- **`StartTrialLink` fires Mixpanel only — it does not add GA events.** Call sites
  that already fire GA pass their handler through via the optional `onClick` prop.
  GA event counts therefore stay exactly as they are; no new or duplicated
  conversions appear in the marketing team's reports.
- **`GoogleAnalytics.tsx` is not touched at all.** The originally-proposed
  `isSyntheticClient()` extraction was dropped: it is unrelated refactoring in the
  most incident-scarred file in the repo (see its own comment history — a prior
  change killed Ads conversion tracking for ~a month). The new lib carries its own
  copy with a cross-reference comment. Duplicating one bot regex is the cheaper risk.

Existing GA events on signup CTAs, all preserved:

| Call site | Event |
|---|---|
| `TrialPageClient.tsx:299` | `trial_click {source:'trial-page-hero', destination:'app_signup'}` |
| `MobileStickyCta.tsx:38` | `trial_click` / `demo_click` |
| `CTAButtons.tsx:38` | `track()` → gtag, dataLayer fallback |
| `RoiTool.tsx:197` | `track()` → gtag, dataLayer fallback |

## 5. utm_* precedence — RESOLVED (2026-07-30, 拓実確認)

`trialUrl()` already sets `utm_source=dynameet.ai&utm_medium=website_cta&
utm_campaign=en_selfserve&utm_content=<source>` on the signup URL. The requirement
also says to carry over "every `utm_*` from `window.location.search`". When a
visitor arrives on `/en/?utm_source=google&utm_medium=cpc`, these collide.

**Decision: the CTA's own `utm_*` win.** Page params only fill in keys the CTA
does not already set — in practice `utm_term`. Existing behaviour is unchanged.

Rejected alternative (page params win, per the requirement's `set` pseudocode)
because of its blast radius on the **app's** GA4:

- Saved reports, audiences and conversion segments keyed on
  `utm_source=dynameet.ai` / `utm_medium=website_cta` / `utm_campaign=en_selfserve`
  would silently stop matching on deploy day.
- `utm_medium=cpc` would reclassify those sessions from Referral to **Paid
  Search** in the app property's channel grouping — a step change that breaks
  before/after comparisons.
- If the app property is linked to Google Ads, that yields Paid Search sessions
  with no matching `gclid`, and one ad click counted as paid on both properties.

**Nothing is lost for the funnel.** Mixpanel auto-captures the page's `utm_*`
onto `Landing Viewed` (verified on the wire: `utm_source: "google"`,
`utm_medium: "cpc"`), and that event shares a profile with the app's
`Signup Landed`. Campaign attribution is already in the funnel; this param only
ever affected the app's GA4. Section attribution additionally rides on
`Start Trial Clicked.source`.

## 6. Failure modes

Every path degrades to a working CTA with no parameter:

| Failure | Behavior |
|---|---|
| `NEXT_PUBLIC_MIXPANEL_TOKEN` unset | Nothing inits, nothing emits — local dev and CI stay silent |
| SDK blocked / throws | `getDistinctId()` returns `null`, href stays plain `trialUrl()` |
| JS disabled | SSR href is the plain signup URL |
| Malformed base URL | `buildSignupUrl` returns it untouched |

## 7. Contract

The app accepts a bare uuid **or** the SDK's `$device:<uuid>` form and rejects
anything else. `mixpanel.get_distinct_id()` returns one of those two, so its value
is passed through **verbatim** via `URLSearchParams.set` — no trim, no reformat, no
wrapping. Param name is exactly `distinct_id`.

## 8. Tests

Vitest over `buildSignupUrl` only:

- bare uuid preserved exactly
- `$device:<uuid>` preserved exactly, including `$` and `:`
- `utm_*` carried from the current page
- non-`utm_` params (e.g. `gclid`, `fbclid`) **not** carried
- `null` distinct_id → no `distinct_id` key, URL otherwise unchanged
- malformed base URL → returned untouched

## 9. Verification

1. `.env.local` → DEV token (gitignored; never committed)
2. Load an `/en/` page → `Landing Viewed` in the dev project
3. Click a CTA → landed URL carries `?distinct_id=$device:…`
4. Complete a signup → `Landing Viewed` and `Signup Landed` on the **same profile**,
   `Signup Landed.adopted_distinct_id === true`

If `adopted_distinct_id` is `false`: either the param never arrived (check the URL
after the click) or it was rejected (check the format in §7).

## 10. Deploy

Production build needs `NEXT_PUBLIC_MIXPANEL_TOKEN` set to **the same token the
app's production build uses**. This cannot be verified from inside this repo — it
is an explicit pre-merge confirmation step in the PR description, not something
this branch can prove. The wrong-project failure is silent and cost hours on the
app side.
