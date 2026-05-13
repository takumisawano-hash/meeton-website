'use client'

import type { CSSProperties, ReactNode } from 'react'

type DemoBookingButtonProps = {
  children: ReactNode
  style?: CSSProperties
  className?: string
  utmCampaign?: string
}

const BASE_URL = 'https://dynameet.ai/?calendarId=takumi-sawano&showChat=true'

/**
 * Demo booking CTA — navigates to the Meeton ai widget calendar flow
 * (was: HubSpot iframe modal embed).
 *
 * The new URL opens the homepage with the Meeton chatbot widget
 * pre-configured to scheduling mode. Better UX than iframe modal +
 * keeps booking inside our own product.
 */
export default function DemoBookingButton({
  children,
  style,
  className,
  utmCampaign = 'case-study',
}: DemoBookingButtonProps) {
  const href = `${BASE_URL}&utm_source=website&utm_medium=cta&utm_campaign=${encodeURIComponent(utmCampaign)}`
  return (
    <a href={href} style={style} className={className}>
      {children}
    </a>
  )
}
