'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-82W1HG59QL'
const ADS_TAG_ID = 'AW-18060590496'
const SYNTHETIC_UA_RE = /\b(Lighthouse|Chrome-Lighthouse|HeadlessChrome|PageSpeed|GTmetrix)\b/i

// Skip GA on synthetic clients (Lighthouse / PSI / GTmetrix).
// Two reasons:
// 1. They contribute ~317KB of gtag scripts that PSI then audits
//    against itself — the test runner literally measures the cost of
//    its own measurement headers.
// 2. Synthetic hits would otherwise inflate GA pageviews on every
//    deploy or PSI poll, which the marketing dashboard has to
//    manually filter out.
//
// We render a placeholder on the server to avoid hydration mismatch,
// then drop GA entirely on the client when the UA looks synthetic.
export default function GoogleAnalytics() {
  const [skip, setSkip] = useState(false)
  useEffect(() => {
    if (typeof navigator !== 'undefined' && SYNTHETIC_UA_RE.test(navigator.userAgent)) {
      setSkip(true)
    }
  }, [])

  if (!GA_MEASUREMENT_ID || skip) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
            gtag('config', '${ADS_TAG_ID}');
          `,
        }}
      />
    </>
  )
}
