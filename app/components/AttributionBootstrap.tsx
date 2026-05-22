'use client'

import { useEffect } from 'react'

/**
 * AttributionBootstrap — read paid/organic source params from the URL
 * and persist them so every downstream system (chatbot widget, HubSpot
 * forms, GA4 events) can attach the same attribution to a Contact /
 * Deal / Conversion.
 *
 * Source of truth for the schema: docs/measurement-spec.md (2026-05-22).
 *
 * Flow:
 *   1. Read utm_source / utm_medium / utm_campaign / utm_content /
 *      utm_term / gclid / msclkid / yclid from window.location.search.
 *   2. Build / merge into localStorage["mlp_attribution"]:
 *        firstTouch  → never overwrite once set
 *        lastTouch   → always overwrite when params present
 *        landingPath → first non-redirect page seen (kept for funnel debug)
 *        firstSeenAt / lastSeenAt → ISO timestamps
 *   3. Mirror compact summary to cookie "_meeton_attr"
 *      (domain=.dynameet.ai, max-age=180d) so the chatbot widget at
 *      app.dynameet.ai can read it cross-subdomain.
 *   4. Expose `window.__meetonAttribution` for ad-hoc reads from
 *      chatbot widget / inline scripts.
 *
 * Mounted in app/layout.tsx so it runs once per page on every route.
 */

const STORAGE_KEY = 'mlp_attribution'
const COOKIE_KEY = '_meeton_attr'
const COOKIE_DOMAIN = '.dynameet.ai'
const COOKIE_MAX_AGE_DAYS = 180

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

const CLICKID_KEYS = ['gclid', 'msclkid', 'yclid'] as const

type AttributionPayload = {
  firstTouch?: Record<string, string>
  lastTouch?: Record<string, string>
  landingPath?: string
  firstSeenAt?: string
  lastSeenAt?: string
}

declare global {
  interface Window {
    __meetonAttribution?: AttributionPayload
  }
}

function readUrlParams(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const out: Record<string, string> = {}
  try {
    const sp = new URLSearchParams(window.location.search)
    for (const k of UTM_KEYS) {
      const v = sp.get(k)
      if (v) out[k] = v.toLowerCase()
    }
    for (const k of CLICKID_KEYS) {
      const v = sp.get(k)
      if (v) out[k] = v
    }
  } catch {
    /* ignore parse errors */
  }
  return out
}

function loadPayload(): AttributionPayload {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') return parsed as AttributionPayload
  } catch {
    /* ignore */
  }
  return {}
}

function persist(payload: AttributionPayload): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    /* quota / private mode */
  }

  // Cookie mirror — compact summary so the widget on app.dynameet.ai
  // can read attribution without hitting localStorage cross-subdomain.
  try {
    const lastOrFirst = payload.lastTouch || payload.firstTouch || {}
    const compact: Record<string, string> = {
      ...lastOrFirst,
      lp: payload.landingPath || '',
      fs: payload.firstSeenAt || '',
    }
    const value = encodeURIComponent(JSON.stringify(compact))
    const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60
    document.cookie = `${COOKIE_KEY}=${value}; Path=/; Domain=${COOKIE_DOMAIN}; Max-Age=${maxAge}; SameSite=Lax; Secure`
  } catch {
    /* ignore */
  }

  // Window export for inline scripts.
  window.__meetonAttribution = payload
}

export default function AttributionBootstrap() {
  useEffect(() => {
    const incoming = readUrlParams()
    const existing = loadPayload()
    const now = new Date().toISOString()

    // landingPath is the FIRST page seen during the attribution lifecycle;
    // do not overwrite once set.
    const landingPath = existing.landingPath || window.location.pathname

    let firstTouch = existing.firstTouch
    let lastTouch = existing.lastTouch
    let firstSeenAt = existing.firstSeenAt

    const hasIncoming = Object.keys(incoming).length > 0
    if (hasIncoming) {
      if (!firstTouch) {
        firstTouch = incoming
        firstSeenAt = now
      }
      // Always overwrite lastTouch when we see new params — this is the
      // most-recent-touch source for HubSpot last-touch reporting.
      lastTouch = incoming
    } else if (!firstSeenAt) {
      // No params, no record yet — record the timestamp so a future
      // touch can compute session age.
      firstSeenAt = now
    }

    const payload: AttributionPayload = {
      firstTouch,
      lastTouch,
      landingPath,
      firstSeenAt,
      lastSeenAt: now,
    }

    persist(payload)
  }, [])

  return null
}
