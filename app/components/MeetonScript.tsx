'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

const DEFAULT_TEAM_ID = '70801bb6-9b39-4989-8be9-7d93076424c1'
const CAREERS_TEAM_ID = '21e1d2a4-07cd-4123-8a41-d3f5afd29525'

export default function MeetonScript() {
  const pathname = usePathname()
  const teamId = pathname?.startsWith('/careers') ? CAREERS_TEAM_ID : DEFAULT_TEAM_ID

  return (
    <>
      <Script
        id="dynameet-config"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `window.DynaMeetConfig = { teamId: "${teamId}" };`,
        }}
      />
      <Script
        src="https://app.dynameet.ai/meeton.js"
        strategy="lazyOnload"
      />
    </>
  )
}
