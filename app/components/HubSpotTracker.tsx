'use client'

import { useEffect } from 'react'

const HUBSPOT_PORTAL_ID = '45872857'
const HUBSPOT_SRC = `https://js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`

// HubSpot tracker is deferred to first user interaction (or 5s idle)
// so it stops contributing to PageSpeed TBT. Bouncing visitors who
// never interact have no behavioral signal worth capturing anyway.
export default function HubSpotTracker() {
  useEffect(() => {
    if (document.getElementById('hs-script-loader')) return

    let loaded = false
    const events = ['pointerdown', 'scroll', 'keydown', 'mousemove', 'touchstart'] as const

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
    const timer = window.setTimeout(load, 5000)

    return () => {
      events.forEach((e) => window.removeEventListener(e, load))
      clearTimeout(timer)
    }
  }, [])

  return null
}
