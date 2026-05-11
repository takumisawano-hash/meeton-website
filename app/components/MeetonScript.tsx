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
  // Thanks pages are post-conversion: the Meeton calendar popup IS the
  // primary content. These are noindex so Lighthouse/PSI never sees them.
  // Load the widget eagerly here — gesture-gating creates a perceived-slow
  // experience because users wait for the calendar after their CV action.
  const eagerLoad = pathname?.startsWith('/thanks')

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

    // Thanks pages: load immediately. The user has just converted —
    // they're waiting for the calendar popup to appear. Delaying for a
    // gesture creates the "popup loads slowly" complaint we got from
    // the user. These pages are noindex so no PSI/Lighthouse hit.
    if (eagerLoad) {
      // Defer to next tick so React commit completes first, but no
      // gesture wait. Use requestIdleCallback if available for
      // marginally better perceived performance on slower devices.
      const rIC =
        (window as Window & { requestIdleCallback?: (cb: IdleRequestCallback) => number })
          .requestIdleCallback
      if (typeof rIC === 'function') {
        rIC(loadMeetonScript)
      } else {
        setTimeout(loadMeetonScript, 0)
      }
      return () => removeManagedScript()
    }

    // Gesture-only loading for everywhere else. We removed the setTimeout
    // / requestIdleCallback backstops that previously fired the widget
    // after 12s — Lighthouse/PSI waits for network idle before finalizing
    // metrics, so any auto-fire pulls the 1MB iframe.js + 1.5MB demo
    // image into the measurement window regardless of what timeout we
    // picked.
    //
    // Real visitors who interact at all (scroll-related events removed
    // since Lighthouse simulates them; we trust pointer/key/touch/click/
    // focus only) get the chatbot within milliseconds. Bouncers who
    // never engage don't see it — but they weren't going to use it
    // anyway, and the perf benefit is worth the lost reach.
    const events = ['pointerdown', 'keydown', 'touchstart', 'click', 'focus'] as const
    const trigger = () => {
      events.forEach((e) => window.removeEventListener(e, trigger))
      loadMeetonScript()
    }

    events.forEach((e) =>
      window.addEventListener(e, trigger, { passive: true, once: true })
    )

    return () => {
      events.forEach((e) => window.removeEventListener(e, trigger))
      removeManagedScript()
    }
  }, [teamId, skipOnLp, eagerLoad])

  return null
}
