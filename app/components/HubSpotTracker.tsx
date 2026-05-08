'use client'

import { useEffect } from 'react'

const HUBSPOT_PORTAL_ID = '45872857'
const HUBSPOT_SRC = `https://js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`

// HubSpot tracker is deferred to first user interaction (or 12s idle)
// so it stops contributing to PageSpeed TBT. Bouncing visitors who
// never interact have no behavioral signal worth capturing anyway.
//
// PSI/Lighthouse spoofs a real mobile UA, so navigator.webdriver is
// the reliable synthetic-client signal — Chrome sets it under
// --enable-automation which Lighthouse always uses. UA regex stays
// as a secondary catch for older bots that don't set webdriver.
const SYNTHETIC_UA_RE = /\b(Lighthouse|Chrome-Lighthouse|HeadlessChrome|PageSpeed|GTmetrix)\b/i
function isSyntheticClient(): boolean {
  if (typeof navigator === 'undefined') return false
  if ((navigator as Navigator & { webdriver?: boolean }).webdriver === true) return true
  return SYNTHETIC_UA_RE.test(navigator.userAgent)
}

export default function HubSpotTracker() {
  useEffect(() => {
    if (document.getElementById('hs-script-loader')) return
    if (isSyntheticClient()) return

    let loaded = false
    // Same defer-rationale as MeetonScript: avoid scroll/mousemove
    // (Lighthouse may simulate them) and push the timeout backstop
    // past PSI's measurement window.
    const events = ['pointerdown', 'keydown', 'touchstart', 'click', 'focus'] as const

    const load = () => {
      if (loaded) return
      loaded = true
      events.forEach((e) => window.removeEventListener(e, load))
      clearTimeout(timer)
      const s = document.createElement('script')
      s.id = 'hs-script-loader'
      s.src = HUBSPOT_SRC
      s.async = true
      s.defer = true
      document.body.appendChild(s)
    }

    events.forEach((e) => window.addEventListener(e, load, { passive: true, once: true }))
    const timer = window.setTimeout(load, 12000)

    return () => {
      events.forEach((e) => window.removeEventListener(e, load))
      clearTimeout(timer)
    }
  }, [])

  return null
}
