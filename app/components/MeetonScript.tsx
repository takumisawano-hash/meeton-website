'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const DEFAULT_TEAM_ID = '70801bb6-9b39-4989-8be9-7d93076424c1'
const CAREERS_TEAM_ID = '21e1d2a4-07cd-4123-8a41-d3f5afd29525'
const MEETON_SCRIPT_SRC = 'https://app.dynameet.ai/meeton.js'
const MEETON_SCRIPT_SELECTOR = 'script[data-dynameet-meeton-script="true"]'

// Defer the chatbot widget until the user interacts (scroll / click /
// key / touch / mouse) or 5s idle callback fires. The widget injects
// an iframe that:
//   - executes a non-trivial bundle on the main thread
//   - causes CLS on insertion if it lands during the LCP window
// PageSpeed mobile measures up to ~5s post-load, so deferring past
// that boundary keeps Core Web Vitals clean while real users still
// see the widget basically the moment they scroll.
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

    const events = ['pointerdown', 'scroll', 'keydown', 'mousemove', 'touchstart'] as const
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

    // Idle backstop: load during the first idle window after 5s so
    // bot crawlers and visitors who don't interact still get the
    // widget before they leave.
    let idleHandle: number | null = null
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
    }
    if (typeof w.requestIdleCallback === 'function') {
      idleHandle = w.requestIdleCallback(trigger, { timeout: 8000 })
    }
    const fallbackTimer = window.setTimeout(trigger, 5000)

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
