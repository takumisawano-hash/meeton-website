'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const DEFAULT_TEAM_ID = '70801bb6-9b39-4989-8be9-7d93076424c1'
const CAREERS_TEAM_ID = '21e1d2a4-07cd-4123-8a41-d3f5afd29525'
const MEETON_SCRIPT_SRC = 'https://app.dynameet.ai/meeton.js'
const MEETON_SCRIPT_SELECTOR = 'script[data-dynameet-meeton-script="true"]'
const DEMO_CALENDAR_ID = 'takumi-sawano'

// Load the chatbot widget promptly, the same way every customer site does
// (a plain async <script>). The widget loads in ~1s in the field; the heavy
// iframe bundle lives in a separate browsing context and the widget defers it
// itself, so it does not block this page's main thread.
//
// History: this file previously gated the widget behind a user gesture with a
// 20s backstop, plus a "skip for Lighthouse/headless" cloak, purely to protect
// a synthetic PageSpeed score. That made the widget appear 2–20s late for real
// visitors on THIS site only — every customer using the plain snippet got it in
// ~1s. The lab-score concern never matched real-user latency, so we removed the
// deferral. If we later need to keep the widget out of the LCP window for PSI,
// prefer a short requestIdleCallback defer over re-introducing a gesture gate.

export default function MeetonScript() {
  const pathname = usePathname()
  const teamId = pathname?.startsWith('/careers') ? CAREERS_TEAM_ID : DEFAULT_TEAM_ID
  const skipOnLp = pathname?.startsWith('/lp')

  useEffect(() => {
    // In-place demo calendar: demo CTAs call window.meetonOpenCalendar() first
    // and fall back to href navigation when it returns false (widget not loaded
    // yet, or an LP page where the widget is skipped). The widget exposes
    // window.Meeton.openCalendar / openChat once meeton.js boots.
    const ctaWin = window as Window & {
      meetonOpenCalendar?: () => boolean
      Meeton?: {
        openCalendar?: (opts: { calendarId: string }) => void
        openChat?: (opts?: { showCalendar?: boolean; calendarId?: string }) => void
      }
    }
    ctaWin.meetonOpenCalendar = () => {
      try {
        const api = ctaWin.Meeton
        if (api?.openCalendar) {
          api.openCalendar({ calendarId: DEMO_CALENDAR_ID })
          return true
        }
        if (api?.openChat) {
          api.openChat({ showCalendar: true, calendarId: DEMO_CALENDAR_ID })
          return true
        }
      } catch {
        // widget in a broken state — treat as not ready, caller falls back
      }
      return false
    }

    const removeManagedScript = () => {
      const existingScript = document.querySelector(MEETON_SCRIPT_SELECTOR)
      existingScript?.remove()
    }

    // /lp landing pages intentionally run without the widget.
    if (skipOnLp) {
      removeManagedScript()
      return
    }

    // Forward attribution payload (utm/gclid/etc.) set by AttributionBootstrap
    // into the chatbot widget config so the iframe attaches the same source
    // fields to every HubSpot Contact / Deal it creates. Without this, chatbot
    // bookings arrive as OFFLINE/INTEGRATION and Google Ads sees 0 CV.
    // Spec: docs/measurement-spec.md §4.
    const win = window as Window & {
      DynaMeetConfig?: { teamId: string; attribution?: unknown }
      __meetonAttribution?: unknown
    }
    win.DynaMeetConfig = {
      teamId,
      attribution: win.__meetonAttribution ?? null,
    }

    removeManagedScript()

    const script = document.createElement('script')
    script.src = MEETON_SCRIPT_SRC
    script.async = true
    script.setAttribute('data-dynameet-meeton-script', 'true')
    document.body.appendChild(script)

    return () => removeManagedScript()
  }, [teamId, skipOnLp])

  return null
}
