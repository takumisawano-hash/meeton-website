'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'
import HubSpotMeetingModal from './HubSpotMeetingModal'

type DemoBookingButtonProps = {
  children: ReactNode
  style?: CSSProperties
  className?: string
  utmCampaign?: string
}

export default function DemoBookingButton({
  children,
  style,
  className,
  utmCampaign = 'case-study',
}: DemoBookingButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} style={style} className={className}>
        {children}
      </button>
      <HubSpotMeetingModal isOpen={open} onClose={() => setOpen(false)} utmCampaign={utmCampaign} />
    </>
  )
}
