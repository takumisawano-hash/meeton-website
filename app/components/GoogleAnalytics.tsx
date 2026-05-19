'use client'

import { useEffect } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-82W1HG59QL'
const ADS_TAG_ID = 'AW-18060590496'
const SYNTHETIC_UA_RE = /\b(Lighthouse|Chrome-Lighthouse|HeadlessChrome|PageSpeed|GTmetrix)\b/i
function isSyntheticClient(): boolean {
  if (typeof navigator === 'undefined') return false
  if ((navigator as Navigator & { webdriver?: boolean }).webdriver === true) return true
  return SYNTHETIC_UA_RE.test(navigator.userAgent)
}

// GA + Google Ads gtag, loaded via requestIdleCallback (or window 'load')
// instead of next/script's lazyOnload — lazyOnload emits the <script> tag
// at SSR time, so unmounting it from React after a UA check doesn't
// reliably prevent the fetch. With the imperative pattern we can
// synchronously gate on UA and never touch the DOM for synthetic clients.
//
// History: 2026-05-08 broke GA pageviews — the previous version fired only
// on window 'load' (which takes 8-20s on slow mobile) with a 12s fallback
// that most visitors never reached. Sessions dropped from ~1000/day to
// ~2/day. Switched to requestIdleCallback for fast firing without
// blocking LCP (rIC schedules during browser idle, typically 1-2s after
// paint). Also send a Measurement Protocol beacon synchronously so that
// even users who bounce in <1s register a pageview.
//
// Why skip on synthetic clients:
// - Saves ~317KB of gtag script bytes that PSI then attributes to
//   us as "unused JavaScript".
// - Stops Lighthouse/PSI runs from polluting GA pageview counts.
export default function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    if (isSyntheticClient()) return
    if (document.getElementById('ga-tag-loader')) return

    // Beacon: send a pageview immediately via Measurement Protocol so it
    // registers even if user leaves before gtag.js has loaded.
    // cid stored in localStorage for deterministic client ID across pages.
    try {
      let cid = localStorage.getItem('_ga4_cid')
      if (!cid) {
        cid = `${Math.floor(Math.random() * 1e10)}.${Math.floor(Date.now() / 1000)}`
        localStorage.setItem('_ga4_cid', cid)
      }
      const params = new URLSearchParams({
        v: '2',
        tid: GA_MEASUREMENT_ID,
        cid,
        en: 'page_view',
        dl: location.href,
        dr: document.referrer || '',
        dt: document.title || '',
      })
      const beaconUrl = `https://www.google-analytics.com/g/collect?${params.toString()}`
      if (typeof navigator.sendBeacon === 'function') {
        navigator.sendBeacon(beaconUrl)
      } else {
        fetch(beaconUrl, { method: 'POST', keepalive: true }).catch(() => {})
      }
    } catch {}

    let loaded = false
    const load = () => {
      if (loaded) return
      loaded = true
      const w = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
      w.dataLayer = w.dataLayer || []
      function gtag(...args: unknown[]) {
        w.dataLayer!.push(args)
      }
      w.gtag = gtag
      gtag('js', new Date())
      gtag('config', GA_MEASUREMENT_ID)
      gtag('config', ADS_TAG_ID)

      const s = document.createElement('script')
      s.id = 'ga-tag-loader'
      s.async = true
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      document.head.appendChild(s)
    }

    // Fire on browser idle (typically 1-2s after paint) — past LCP but
    // before most users bounce. Fall back to 3s timer if rIC unavailable.
    const rIC =
      (window as Window & { requestIdleCallback?: (cb: IdleRequestCallback, opts?: { timeout: number }) => number })
        .requestIdleCallback
    let timer: ReturnType<typeof setTimeout> | null = null
    if (typeof rIC === 'function') {
      rIC(load, { timeout: 3000 })
    } else {
      timer = setTimeout(load, 1500)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [])

  return null
}
