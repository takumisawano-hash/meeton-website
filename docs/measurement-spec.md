# Measurement Spec — Ads Re-launch (2026-05-22)

This is the single source of truth for tracking on the 2026 ads relaunch.
Every LP, every event, every HubSpot field must conform to this spec.
Without these, "LP A vs LP B" comparisons stay invisible and the relaunch
repeats the last cycle's "can't tell what's working" failure mode.

---

## 0. Scope

The relaunch builds 2 new LPs (`/solutions/crm-to-meeting/`,
`/solutions/lead-to-meeting/`) and drives Google Search + Retargeting
traffic to them. Tracking must close the loop:

```
Click on Ad
  → URL with utm + gclid lands on LP
  → gclid + utm captured client-side, persisted (cookie + localStorage)
  → Chatbot widget reads & forwards them on every conversation
  → Form submit / Calendar booking pushes them to HubSpot Contact
  → HubSpot Deal inherits utm + gclid from Contact
  → GA4 Conversion fires with utm + gclid attached
  → Revenue / 商談 outcome visible by utm_campaign + utm_source
```

---

## 1. URL & UTM convention

All paid links MUST use this UTM scheme. No exceptions, no shortened
links that strip params.

| Param | Rule | Example |
|-------|------|---------|
| `utm_source` | channel | `google`, `meta`, `linkedin`, `outbound`, `referral` |
| `utm_medium` | format | `cpc`, `retargeting`, `email`, `social`, `display` |
| `utm_campaign` | mapped to ad campaign | `2026q2_crm_to_meeting`, `2026q2_lead_to_meeting`, `2026q2_retarget` |
| `utm_content` | ad creative variant | `ad_v1_hubspot_dormant`, `ad_v2_mql_to_meeting` |
| `utm_term` | search query / kw | `休眠リード掘り起こし`, `mql 商談化` (Search only) |
| `gclid` | Google auto-tag | auto |

Campaign-name convention: `<year>q<n>_<lp_slug>` so a year of data
groups naturally in HubSpot reports.

---

## 2. Client-side persistence

When a visitor lands with `?utm_*=...&gclid=...`:

1. Read all 5 utm params + gclid + msclkid + yclid from `location.search`.
2. Write them to `localStorage` under key `mlp_attribution`:
   ```json
   {
     "utm_source": "google",
     "utm_medium": "cpc",
     "utm_campaign": "2026q2_crm_to_meeting",
     "utm_content": "ad_v1_hubspot_dormant",
     "utm_term": "休眠リード掘り起こし",
     "gclid": "Cj0KCQ...",
     "landingPath": "/solutions/crm-to-meeting/",
     "firstSeenAt": "2026-05-22T10:31:14.123Z",
     "lastSeenAt": "2026-05-22T10:42:55.987Z"
   }
   ```
3. Mirror to a 1st-party cookie `_meeton_attr` (domain=`.dynameet.ai`,
   max-age=180 days) so chatbot widget on `app.dynameet.ai` subdomain
   can read it cross-subdomain.
4. Update `lastSeenAt` on every page view; do NOT overwrite first-touch
   utm/gclid when the visitor revisits without params.
5. Last-touch override: if visitor returns with NEW utm/gclid, write
   both `firstTouch` and `lastTouch` blocks so HubSpot gets the full
   funnel attribution.

Implementation file: `app/components/AttributionBootstrap.tsx`
(client component, mounted in root layout, runs before any other JS
on the page).

---

## 3. GA4 events

GA4 measurement ID: `G-82W1HG59QL`.

All events must include the visitor's attribution payload as event
parameters so we can segment in GA4 by utm/gclid.

| Event name | When | Required params |
|------------|------|-----------------|
| `page_view` | every navigation | `page_location`, `page_title`, all utm, `gclid` |
| `chat_open` | user opens chatbot | `lp_slug`, all utm, `gclid` |
| `chat_first_message` | user sends first chat msg | `lp_slug`, `chat_session_id` |
| `form_submit` | any form submitted | `form_type` (resource/demo/contact), `lp_slug`, all utm, `gclid` |
| `calendar_view` | calendar widget displayed | `lp_slug`, `cta_location` |
| `calendar_book` | meeting confirmed | `meeting_type` (30min/60min), `lp_slug`, all utm, `gclid`, `value: 50000`, `currency: 'JPY'` |
| `generate_lead` | Google Ads CV mirror | same as form_submit / calendar_book |
| `conversion` | Google Ads-specific | `send_to: AW-18060590496/...` |

`generate_lead` and `conversion` fire BOTH for form_submit and
calendar_book so Google Ads sees the same CV regardless of path.

---

## 4. Chatbot widget — gclid/UTM forwarding

The widget at `app.dynameet.ai` currently does NOT receive attribution
context from the parent page. This is the single biggest reason
"Google Ads shows 0 CV" — chatbot bookings are invisible.

Required change: the `meeton.js` bootstrap must, on init, read
`window.parent`'s `_meeton_attr` cookie (or `localStorage.mlp_attribution`)
and pass it into the iframe via:

```js
window.DynaMeetConfig = {
  teamId: '...',
  attribution: {
    utm_source, utm_medium, utm_campaign, utm_content, utm_term,
    gclid, msclkid, yclid,
    landingPath,
    firstSeenAt
  }
}
```

The iframe then includes this payload in every backend call that
creates a HubSpot Contact or Deal, so the same fields land on the
record.

**Status: NOT IMPLEMENTED.** This blocks the entire measurement plan.
Engineering needs to ship the widget-side reader + propagation before
ads relaunch.

---

## 5. HubSpot mapping

### 5.1 Custom Contact properties

Create / verify these properties exist (Settings → Properties → Contacts):

| Internal name | Type | Description |
|---------------|------|-------------|
| `meeton_utm_source` | Single-line text | First-touch utm_source |
| `meeton_utm_medium` | Single-line text | First-touch utm_medium |
| `meeton_utm_campaign` | Single-line text | First-touch utm_campaign |
| `meeton_utm_content` | Single-line text | First-touch utm_content |
| `meeton_utm_term` | Single-line text | First-touch utm_term |
| `meeton_gclid` | Single-line text | Google Click ID |
| `meeton_msclkid` | Single-line text | Microsoft (Bing) Click ID |
| `meeton_yclid` | Single-line text | Yahoo Click ID |
| `meeton_landing_path` | Single-line text | Path of first-touch LP |
| `meeton_last_utm_source` | Single-line text | Last-touch utm_source |
| `meeton_last_utm_campaign` | Single-line text | Last-touch utm_campaign |
| `meeton_first_seen_at` | Date | Timestamp of first session |
| `meeton_last_seen_at` | Date | Timestamp of most recent session |
| `meeton_widget_origin` | Single-line text | `chatbot_iframe` / `inline_form` / `meeting_iframe` |

### 5.2 Deal inheritance

When a Deal is created from a Contact (form submit, calendar booking),
copy the Contact's `meeton_utm_*` and `meeton_gclid` fields onto the
Deal as Deal properties (same internal names). HubSpot Workflow:
"Contact creates Deal → copy attribution properties to Deal".

### 5.3 Source segmentation

The current `hs_analytics_source` field is unreliable (mostly
OFFLINE / INTEGRATION for our integrations). Treat it as informational
only. Authoritative source = `meeton_utm_source`.

To separate true inbound from outbound:

| Filter | Rule |
|--------|------|
| True inbound (paid) | `meeton_utm_source IN (google, meta, linkedin)` AND `meeton_utm_medium != email` |
| True inbound (organic) | `hs_analytics_source = ORGANIC_SEARCH` AND `meeton_utm_source IS UNKNOWN` |
| True inbound (chatbot) | `meeton_widget_origin = chatbot_iframe` |
| Outbound (us pushing) | `meeton_utm_source = outbound` OR `Original Source Drill-Down 1 IN ('Instantly', 'Apollo', 'PB-CSV')` |
| Other / Unknown | everything else |

This filter set must be encoded in a saved HubSpot view named
"True Inbound" so reports always show real demand-gen activity.

---

## 6. LP-level analytics

Every LP defines:

1. A unique `data-lp-slug` attribute on `<body>` (e.g. `crm-to-meeting`,
   `lead-to-meeting`).
2. A unique `og:url` / canonical for SEO.
3. GA4 page_view event includes `lp_slug` parameter, populated from the
   body attribute.

This lets us slice every downstream CV by LP without changing GA4 setup.

GA4 Custom Dimension config: register `lp_slug` as an
event-scoped custom dimension (Admin → Custom Definitions).

---

## 7. Win criteria

Two LPs (`/solutions/crm-to-meeting/`, `/solutions/lead-to-meeting/`)
are validated on 4–6 weeks of paid data. **Phase 1 budget = ¥300,000 /
month** (Google Search 70-80%, Google Retargeting 10-20%, Meta
retargeting 0-10%, LinkedIn Ads 0). The budget shapes the qualified-
meeting math, so all thresholds below assume ¥300k/mo.

### 7.1 LP-level performance (any LP at any budget)

| Metric | Stop / pivot threshold | Investment threshold |
|--------|------------------------|----------------------|
| LP CVR (any form / chat / cal book) | < 1.5% | ≥ 3% |
| LP CVR (calendar book) | < 0.5% | ≥ 1% |
| Bounce rate | > 75% | < 55% |

CVR < 1.5% after 4 weeks → rewrite H1 / proof / CTA before continuing.
CVR ≥ 3% with poor CPA → keep iterating, the LP itself is fine.

### 7.2 Cost per qualified meeting — budget-aware tiers

| CPA range | Verdict | Action |
|-----------|---------|--------|
| ≤ ¥50,000 | **勝ち** | Increase budget, prep child LPs (Phase 2) |
| ¥50,000 – ¥100,000 | 改善継続 | Iterate H1 / CTA / proof, keep running |
| > ¥100,000 | 停止 or 大幅リライト | Pause spend, full rewrite or kill the LP |

"Qualified meeting" = the meeting actually happens AND the rep marks it
"viable opportunity" (not noshow, not spammer, not 競合 recon). Attribution
flows from `meeton_utm_campaign` on the Deal.

### 7.3 Volume targets — for ¥300k / month budget

| Period | Target | Pivot signal |
|--------|--------|--------------|
| 4 weeks | 3–5 qualified meetings | < 2 = something fundamental is off |
| 6 weeks | 5+ qualified meetings | < 3 = budget too small OR LP/KW wrong |

If budget changes (10万 / 50万), scale the volume targets ~linearly but
keep CPA tiers constant. CPA is the deciding KPI; lead count is the
sanity check.

---

## 8. Implementation verification checklist

This is the **pre-ads gate**. Every box must be checked on production
(not preview) before Google Ads spend turns on. If any fails, ads stay
off until fixed — repeating the prior "can't tell what worked" loop is
not acceptable.

Run with a single test URL (use both LPs once each):
```
https://dynameet.ai/solutions/crm-to-meeting/?utm_source=test&utm_medium=cpc&utm_campaign=verify_crm&utm_content=ad_test&utm_term=test_kw&gclid=test_gclid_001
```

### 8.1 Client-side persistence (browser)

- [ ] **localStorage** `mlp_attribution` contains `firstTouch.utm_source=test`,
      `firstTouch.gclid=test_gclid_001`, `landingPath=/solutions/...`,
      `firstSeenAt` and `lastSeenAt` ISO timestamps
- [ ] **cookie** `_meeton_attr` is present on `.dynameet.ai`, max-age ≥ 180d
- [ ] `window.__meetonAttribution` returns the same payload as
      `mlp_attribution` (sanity)
- [ ] Re-visit the URL **without** params — `firstTouch` stays
      unchanged, `lastSeenAt` updates
- [ ] Re-visit with a **different** `utm_campaign=verify_lead` —
      `firstTouch` preserved, `lastTouch` overwritten

### 8.2 GA4 events

In GA4 DebugView (Admin → DebugView, with `?debug_mode=1`):

- [ ] `page_view` event fires with `lp_slug=crm-to-meeting` parameter
- [ ] Custom dimension `lp_slug` is registered and populating
- [ ] `chat_open` fires when user clicks chatbot launcher
- [ ] `form_submit` fires on form completion with `form_type` parameter
- [ ] `calendar_view` fires when Meeton calendar is displayed
- [ ] `calendar_book` fires on confirmed booking with `value: 50000`,
      `currency: 'JPY'`
- [ ] `generate_lead` AND `conversion` (with `send_to: AW-18060590496/...`)
      both fire alongside `form_submit` and `calendar_book`
- [ ] All conversion events carry `utm_source`, `utm_medium`,
      `utm_campaign`, `utm_content`, `utm_term`, `gclid`

### 8.3 Chatbot widget (cross-subdomain)

- [ ] In `app.dynameet.ai` iframe console: `window.DynaMeetConfig.attribution`
      contains the test values from the parent page (proves cookie
      / parent-window read works)
- [ ] Open chatbot from the LP → in the conversation backend payload,
      attribution payload is attached to the Contact created
- [ ] Chatbot-booked meeting creates a HubSpot Deal that inherits
      `meeton_utm_*` and `meeton_gclid` fields

### 8.4 HubSpot mapping

- [ ] **All 14 Contact custom properties** from §5.1 exist in HubSpot
      Settings → Properties. Internal names exactly match.
- [ ] Same 14 properties are mirrored on the **Deal** object
- [ ] Workflow "Contact creates Deal → copy attribution" is active and
      tested with a manual contact creation
- [ ] Saved Contact view **"True Inbound"** exists with the filter set
      from §5.3, and the test contact shows up in the "Google Ads"
      bucket
- [ ] HubSpot Deal stage progression keeps `meeton_*` fields populated
      (i.e. no workflow blanks them out)

### 8.5 Google Ads

- [ ] Test gclid `test_gclid_001` registers a conversion in Google Ads
      → Conversions → Recent activity within 24h
- [ ] Conversion is attributed to the correct campaign (not "Other")
- [ ] Enhanced Conversions toggle is ON for form_submit + calendar_book
      conversion actions
- [ ] Auto-tagging (gclid append) is ON in account settings

### 8.6 LP-level sanity

For both `/solutions/crm-to-meeting/` and `/solutions/lead-to-meeting/`:

- [ ] `<body data-lp-slug="...">` attribute set correctly
- [ ] Canonical URL matches the deployed path (no trailing-slash drift)
- [ ] OG image renders correctly when shared
- [ ] Mobile PageSpeed score ≥ 80 (target for ads landing pages)
- [ ] No JS console errors in production browser
- [ ] All CTAs route through `openMeetonCalendar` / `openMeetonDownloadCenter`
      (no leftover HubSpot iframe modals from old patterns)

### 8.7 End-to-end smoke test

- [ ] Run the full path: open ad-test URL → scroll LP → click "デモを予約" →
      book a calendar slot → check HubSpot Deal has utm/gclid set → check
      GA4 has `calendar_book` event with same params → check Google Ads
      conversion appears within 24h. Single trace, no missing hops.

**Sign-off**: this checklist is signed off by takumi in a commit message
referencing this section before the ads budget is moved from ¥0 to
¥300k/mo.

---

## 9. Anti-patterns to avoid

These broke prior cycles:

- ❌ `?utm_source=meta&utm_campaign=anything` with `meta` being lowercase
  on some ads and `Meta` on others. **Always lowercase.**
- ❌ Different campaigns sharing a campaign name (e.g. all retargeting
  using `utm_campaign=retarget`). Always include LP slug.
- ❌ Sending traffic to redirected URLs (e.g. `/lp/` → `/`). Strips
  utm params unless explicitly forwarded by Next.js. Only point ads at
  canonical final URLs.
- ❌ Trusting `hs_analytics_source` as primary source. It's wrong for us.
- ❌ Looking at "leads" before "qualified meetings". A bumped lead count
  with poor-quality leads is worse than no leads.

---

## 10. Owner

- Spec maintenance: this file (PRs welcome)
- Implementation: tracked in commits with `tag: measurement`
- Verification: pre-ads-launch checklist run (above) by takumi
