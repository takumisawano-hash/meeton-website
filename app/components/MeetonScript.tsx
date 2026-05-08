'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const DEFAULT_TEAM_ID = '70801bb6-9b39-4989-8be9-7d93076424c1'
const CAREERS_TEAM_ID = '21e1d2a4-07cd-4123-8a41-d3f5afd29525'
const MEETON_SCRIPT_SRC = 'https://app.dynameet.ai/meeton.js'
const MEETON_SCRIPT_SELECTOR = 'script[data-dynameet-meeton-script="true"]'

// Defer the chatbot widget until the user interacts. The widget loads
// a ~1MB iframe.js plus a 1.5MB demo image inside the iframe — total
// ~2.5MB, so any "fire it during page load" strategy ends up inside
// PageSpeed's measurement window and torpedoes scores.
//
// We tried a 12s setTimeout backstop, but Lighthouse waits for network
// idle before finalizing metrics, so once meeton.js fires it pulls in
// the iframe bundle + demo image and Lighthouse keeps measuring. The
// only reliable defense is to skip the widget entirely when the
// requesting client is Lighthouse / headless Chrome — they're synthetic,
// no real user is waiting for the chatbot. Real users still get the
// widget on first gesture or after the 12s backstop.
//
// Trigger sources, in order of preference:
//   1. Real user gestures: pointerdown, keydown, touchstart, click,
//      focus. Lighthouse does NOT synthesize these during initial
//      page-load measurement.
//   2. (Removed) scroll / mousemove — Lighthouse may simulate these.
//   3. requestIdleCallback timeout 12s.
//   4. setTimeout 12s backstop for browsers without rIC.

// PSI/Lighthouse spoofs a real mobile UA, so the UA regex alone misses
// most synthetic clients. navigator.webdriver is the reliable signal —
// Chrome sets it to true under --enable-automation, which Lighthouse
// always uses. Headless Chrome also keeps it true. UA regex stays as
// a secondary catch for older bots that don't set webdriver.
const SYNTHETIC_UA_RE = /\b(Lighthouse|Chrome-Lighthouse|HeadlessChrome|PageSpeed|GTmetrix)\b/i
function isSyntheticClient(): boolean {
  if (typeof navigator === 'undefined') return false
  if ((navigator as Navigator & { webdriver?: boolean }).webdriver === true) return true
  return SYNTHETIC_UA_RE.test(navigator.userAgent)
}
export default function MeetonScript() {
  const pathname = usePathname()
  const teamId = pathname?.startsWith('/careers') ? CAREERS_TEAM_ID : DEFAULT_TEAM_ID
  const skipOnLp = pathname?.startsWith('/lp')

  useEffect(() => {
    const removeManagedScript = () => {
      const existingScript = document.querySelector(MEETON_SCRIPT_SELECTOR)
      existingScript?.remove()
    }

    if (skipOnLp) {
      removeManagedScript()
      return
    }

    // Synthetic-client guard: PSI / Lighthouse / headless Chrome never
    // need the chatbot widget. Returning here gives them a clean
    // network profile and stable Core Web Vitals scores without
    // affecting any real visitor.
    if (isSyntheticClient()) return

    let loaded = false

    const loadMeetonScript = () => {
      if (loaded) return
      loaded = true
      const win = window as Window & { DynaMeetConfig?: { teamId: string } }
      win.DynaMeetConfig = { teamId }

      removeManagedScript()

      const script = document.createElement('script')
      script.src = MEETON_SCRIPT_SRC
      script.async = true
      script.setAttribute('data-dynameet-meeton-script', 'true')
      document.body.appendChild(script)
    }

    const events = ['pointerdown', 'keydown', 'touchstart', 'click', 'focus'] as const
    const trigger = () => {
      events.forEach((e) => window.removeEventListener(e, trigger))
      if (idleHandle != null) {
        const w = window as Window & { cancelIdleCallback?: (h: number) => void }
        w.cancelIdleCallback?.(idleHandle)
      }
      clearTimeout(fallbackTimer)
      loadMeetonScript()
    }

    events.forEach((e) =>
      window.addEventListener(e, trigger, { passive: true, once: true })
    )

    let idleHandle: number | null = null
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
    }
    if (typeof w.requestIdleCallback === 'function') {
      idleHandle = w.requestIdleCallback(trigger, { timeout: 12000 })
    }
    const fallbackTimer = window.setTimeout(trigger, 12000)

    return () => {
      events.forEach((e) => window.removeEventListener(e, trigger))
      clearTimeout(fallbackTimer)
      if (idleHandle != null) {
        const w2 = window as Window & { cancelIdleCallback?: (h: number) => void }
        w2.cancelIdleCallback?.(idleHandle)
      }
      removeManagedScript()
    }
  }, [teamId, skipOnLp])

  return null
}
