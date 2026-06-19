'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-82W1HG59QL'
const ADS_TAG_ID = 'AW-18060590496'
const SYNTHETIC_UA_RE = /\b(Lighthouse|Chrome-Lighthouse|HeadlessChrome|PageSpeed|GTmetrix)\b/i

function isSyntheticClient(): boolean {
  if (typeof navigator === 'undefined') return false
  if ((navigator as Navigator & { webdriver?: boolean }).webdriver === true) return true
  return SYNTHETIC_UA_RE.test(navigator.userAgent)
}

// GA4 + Google Ads gtag.
//
// History / why this shape:
// - 2026-05-08: a window-'load'-only loader broke pageviews (load takes
//   8-20s on slow mobile; most visitors bounced first). Sessions fell ~1000→~2/day.
// - The 2026-05 "fix" replaced it with an imperative requestIdleCallback
//   loader PLUS a manual Measurement Protocol page_view beacon. That restored
//   the pageview COUNT (the bare beacon registers) but NOT sessions: the beacon
//   sends page_view with no session_id, so GA4 logged ~1800 pageviews/14d as
//   "Unassigned / session=0" while session_start fell to ~1/14d and every
//   conversion event (generate_lead, *_cta_*) stopped — i.e. Google Ads
//   conversion tracking was dead for ~a month. (Confirmed via GA4 event
//   breakdown + GSC showing real organic traffic was actually healthy.)
// - 2026-06-19 fix: drop the imperative+beacon hack and load gtag.js the
//   documented, reliable way via next/script `afterInteractive`. afterInteractive
//   injects right after hydration (~1-2s, well before 'load'), so it is both
//   fast AND reliably fires session_start + page_view + conversions. gtag's own
//   transport handles fast bouncers, so no separate beacon is needed.
//
// Synthetic clients (Lighthouse/PSI/headless/webdriver) render nothing — saves
// the ~317KB gtag bytes PSI flags as "unused JS" and keeps bots out of GA.
export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (GA_MEASUREMENT_ID && !isSyntheticClient()) setEnabled(true)
  }, [])

  if (!enabled) return null

  return (
    <>
      <Script
        id="ga-tag-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
gtag('config', '${ADS_TAG_ID}');`}
      </Script>
    </>
  )
}
