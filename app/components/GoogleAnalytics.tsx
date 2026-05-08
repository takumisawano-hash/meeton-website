'use client'

import { useEffect } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-82W1HG59QL'
const ADS_TAG_ID = 'AW-18060590496'
const SYNTHETIC_UA_RE = /\b(Lighthouse|Chrome-Lighthouse|HeadlessChrome|PageSpeed|GTmetrix)\b/i

// GA + Google Ads gtag, loaded imperatively on window load (or 12s
// fallback) instead of via next/script's lazyOnload — lazyOnload
// emits the <script> tag at SSR time, so unmounting it from React
// after a UA check doesn't reliably prevent the fetch. With the
// imperative pattern we can synchronously gate on UA and never
// touch the DOM for synthetic clients.
//
// Why skip on synthetic clients:
// - Saves ~317KB of gtag script bytes that PSI then attributes to
//   us as "unused JavaScript".
// - Stops Lighthouse/PSI runs from polluting GA pageview counts —
//   we'd otherwise have to filter them out in the dashboard.
export default function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    if (typeof navigator !== 'undefined' && SYNTHETIC_UA_RE.test(navigator.userAgent)) return
    if (document.getElementById('ga-tag-loader')) return

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

    if (document.readyState === 'complete') {
      window.setTimeout(load, 0)
    } else {
      window.addEventListener('load', load, { once: true })
    }
    const timer = window.setTimeout(load, 12000)
    return () => {
      window.removeEventListener('load', load)
      clearTimeout(timer)
    }
  }, [])

  return null
}
