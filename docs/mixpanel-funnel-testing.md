# Testing the Mixpanel funnel handshake (marketing site ⇄ app)

How to verify locally that a visitor's identity survives the jump from
`dynameet.ai` to `app.dynameet.ai/signup`, so the marketing funnel and the
self-signup funnel read as one continuous stream.

Design doc: `docs/superpowers/specs/2026-07-30-mixpanel-funnel-handshake-design.md`
App counterpart: dynameet-saas #2917.

---

## What the handshake is

The marketing site appends `?distinct_id=<mixpanel id>` to every English
signup CTA. The app reads it, adopts it as its own `$device_id`, and emits
`Signup Landed` with `adopted_distinct_id: true`. Both origins then emit the
same device id, Mixpanel's ID Merge clusters them, and a later
`identify(userId)` at login pulls the pre-account events in.

**Both sides must report to the SAME Mixpanel project.** A token for a
different project fails *silently* — Mixpanel returns success for any valid
token, so events are accepted and simply never appear in the project you are
watching. There is no error anywhere.

---

## 1. Local setup

```bash
# marketing site (this repo)
echo 'NEXT_PUBLIC_APP_ORIGIN=http://localhost:3005' >> .env.local
npm run dev                                  # :3000

# app (dynameet-saas), separate terminal
FRONTEND_PORT=3005 npm run start:frontend    # :3005
```

`.env.local` must also carry `NEXT_PUBLIC_MIXPANEL_TOKEN` set to the **dev**
project token — the same one the app's dev build uses.

`NEXT_PUBLIC_APP_ORIGIN` exists only for this test. Signup CTAs hardcode
`https://app.dynameet.ai`; this repoints them at the local app. **It must never
be set in Vercel** — it would redirect real signups.

## 2. Open the marketing site on `127.0.0.1`, not `localhost`

Browse to **`http://127.0.0.1:3000`** while the app runs on
`http://localhost:3005`.

Cookies are **not port-scoped**. If both sides are on `localhost`, they share a
cookie jar, the app may already hold the marketing site's Mixpanel id without
ever reading the URL parameter, and the test passes while proving nothing.
Different hostnames give separate cookie jars and force a real handshake.

Only Test 3 needs this. Tests 1 and 2 never touch the app, so plain
`localhost:3000` is fine there.

## 3. Four things that look like bugs but are not

| Symptom | Cause |
|---|---|
| `Landing Viewed` fires only once, reload does nothing | Working as designed — claimed once per tab via `sessionStorage`. Open a **new tab**. |
| `/en/` redirects to Japanese | Geo middleware. Run `document.cookie='pref_lang=en; Path=/'` first. |
| No events at all | Ad blockers silently block `api-js.mixpanel.com`. Disable for localhost. |
| `.env.local` edit had no effect | `NEXT_PUBLIC_*` is inlined at **build time**. Restart `npm run dev`. |

---

## Test 1 — the three events

Mixpanel dev project → **Events**. To filter to yourself: right-click any
"Start free trial" → Copy Link Address; the `distinct_id` is in that URL.

| Action | Expected |
|---|---|
| New tab → `/en/` | `Landing Viewed`, `language: "en"` |
| Click "Start free trial" | `Start Trial Clicked`, `language: "en"`, `source` |
| New tab → `/` | `Landing Viewed`, `language: "ja"` |
| Click "デモを予約" in the nav | `Demo Requested`, `language: "ja"` |
| New tab → `/library/`, click "デモを予約" | `Demo Requested`, `source: "widget-button"` |

The last row exercises a different code path: those CTAs are `<button>`s with
no href, so they are invisible to the delegated anchor listener and are
instrumented inside `openMeetonCalendar()` (`app/lib/meeton-cta.ts`). Test it
separately from the anchor CTAs.

## Test 2 — the double-count guards

Easiest thing to regress, hardest to notice.

| Action | Expected |
|---|---|
| New tab → `/?calendarId=takumi-sawano&showChat=true` | **no** `Landing Viewed` |
| Reload any page twice | **no** extra `Landing Viewed` |
| New tab → `/enterprise/` | `Landing Viewed` with `language: "ja"` — not `"en"` |

Why each matters:

1. The demo CTA is a same-origin navigation to `/?calendarId=…`. Without the
   guard, every visitor who clicks it is counted as a second landing —
   inflating the top of the funnel with exactly the people who converted.
2. `sessionStorage` claims the landing once per tab, mirroring how the app
   claims `Signup Landed`.
3. `/enterprise/` is a **Japanese** page. A naive `startsWith("/en")` matches
   it and files it into the English funnel. The check is
   `pathname === "/en" || pathname.startsWith("/en/")`.

These guards read `window.location.search` only — no network, no widget — so
they work even when the Meeton chat widget fails to load.

## Test 3 — the handshake

1. New tab → `http://127.0.0.1:3000/en/`
2. Click "Start free trial"
3. You land on `localhost:3005/signup`. Confirm the URL carries **all four
   original `utm_*`** *and* `distinct_id=$device:…`
4. Run this in the DevTools console **on that page** (`Cmd+Option+J`; Chrome
   requires typing `allow pasting` the first time):

```js
(() => {
  const urlId = new URLSearchParams(location.search).get('distinct_id');
  const uuid  = (urlId || '').replace(/^\$device:/, '');
  const k = Object.keys(localStorage).find(k => /^mp_[0-9a-f]{32}_mixpanel$/.test(k));
  const o = k ? JSON.parse(localStorage.getItem(k)) : {};
  return {
    adopted: o.distinct_id === urlId && o.$device_id === uuid,
    appDeviceId: o.$device_id,
    inboundUuid: uuid,
  };
})()
```

`adopted: true` with `appDeviceId === inboundUuid` means the app took the
inbound identity.

5. In Mixpanel: open a recent **`Signup Landed`** → property panel →
   **`adopted_distinct_id: true`**.
6. Search Users for the `$device:<uuid>` you landed with. One profile should
   show `Landing Viewed` → `Start Trial Clicked` → `Signup Landed`.

You do **not** need to complete a signup. Both events fire on reaching
`/signup`, so the JP 403 on submit does not block verification.

## Test 4 — the negative case (do not skip)

```
http://localhost:3005/signup?distinct_id=someone@example.com
```

Expect `adopted: false` and `adopted_distinct_id: false`, with the app keeping
its own id and no PII entering the identity.

This test is what makes every `true` meaningful. `adopted_distinct_id`
originally reported whether a *parameter was present*, not whether adoption
*succeeded* — so it read `true` over a completely broken handshake. Until you
have watched the flag correctly report `false`, a `true` proves nothing.

---

## Verifying the production token match

You do not need Mixpanel access. Load `app.dynameet.ai/signup` and run:

```js
Object.keys(localStorage).filter(k => /^mp_[0-9a-f]{32}_mixpanel$/.test(k))
```

The 32-hex string inside that key name is the token the production app is
actually using. It must equal `NEXT_PUBLIC_MIXPANEL_TOKEN` in Vercel.

This is how we established that production sits on a **different project** from
the dev token — which is why Test 3 must run against a local or preview app
build, never production.

## Aggregate event counts do not prove the handshake

The Events list shows project-wide totals. Both halves were incrementing
happily while the funnel was split in two, because totals cannot distinguish
"one person did both" from "two anonymous profiles each did one". Only the
profile view and `adopted_distinct_id` prove the join.

## Known red herring

The Meeton chat widget's config call to `api.dynameet.ai` can fail with a
console error that reads as CORS:

```
No 'Access-Control-Allow-Origin' header is present on the requested resource
```

The underlying response is a **403**; error responses carry no CORS headers, so
the browser reports it as CORS. It is the chat widget, unrelated to Mixpanel,
and it does not affect any test here — the guards read the URL, and
`Demo Requested` fires before `window.Meeton` is touched.

---

## Before shipping

- [ ] Remove `NEXT_PUBLIC_APP_ORIGIN` from `.env.local`; never set it in Vercel
- [ ] Set `NEXT_PUBLIC_MIXPANEL_TOKEN` in Vercel to the **production** token,
      verified to match the app's via the localStorage check above
- [ ] `npm test` green
