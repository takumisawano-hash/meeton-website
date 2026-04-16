'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const DEFAULT_TEAM_ID = '70801bb6-9b39-4989-8be9-7d93076424c1'
const CAREERS_TEAM_ID = '21e1d2a4-07cd-4123-8a41-d3f5afd29525'
const MEETON_SCRIPT_SRC = 'https://app.dynameet.ai/meeton.js'
const MEETON_SCRIPT_SELECTOR = 'script[data-dynameet-meeton-script="true"]'

export default function MeetonScript() {
  const pathname = usePathname()
  const teamId = pathname?.startsWith('/careers') ? CAREERS_TEAM_ID : DEFAULT_TEAM_ID

  useEffect(() => {
    const loadMeetonScript = () => {
      const existingScript = document.querySelector(MEETON_SCRIPT_SELECTOR)
      existingScript?.remove()

      const script = document.createElement('script')
      script.src = MEETON_SCRIPT_SRC
      script.async = true
      script.setAttribute('data-dynameet-meeton-script', 'true')
      document.body.appendChild(script)
    }

    const win = window as Window & { DynaMeetConfig?: { teamId: string } }
    win.DynaMeetConfig = { teamId }

    let onLoad: (() => void) | undefined
    if (document.readyState === 'loading') {
      onLoad = () => {
        loadMeetonScript()
      }

      window.addEventListener('load', onLoad)
    } else {
      loadMeetonScript()
    }

    return () => {
      if (onLoad) {
        window.removeEventListener('load', onLoad)
      }

      const existingScript = document.querySelector(MEETON_SCRIPT_SELECTOR)
      existingScript?.remove()
    }
  }, [teamId])

  return null
}
