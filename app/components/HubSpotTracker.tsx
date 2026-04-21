'use client'

import Script from 'next/script'

const HUBSPOT_PORTAL_ID = '45872857'

export default function HubSpotTracker() {
  return (
    <Script
      id="hs-script-loader"
      strategy="lazyOnload"
      src={`//js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`}
    />
  )
}
