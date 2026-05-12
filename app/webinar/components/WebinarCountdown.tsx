'use client'

import { useEffect, useState } from 'react'

type Props = {
  /** Hosting date in YYYY-MM-DD (JST 14:00 assumed by ICS endpoint). */
  date: string
}

/**
 * Genuine countdown to webinar start (JST 14:00 of `date`).
 *
 * Renders nothing until mounted to avoid hydration mismatch with the
 * client-only clock. Shows: "あと N 日" / "あと N 時間" / "あと N 分".
 * Hides itself entirely once the start time has passed.
 *
 * Earns its place by surfacing real time-bound information without
 * fabricating urgency.
 */
export default function WebinarCountdown({ date }: Props) {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    // JST = UTC+9. ISO 8601 with offset is parsed correctly by Date.
    const tick = () => setNow(Date.now())
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])

  if (now === null) return null

  const start = new Date(`${date}T14:00:00+09:00`).getTime()
  const diff = start - now
  if (diff <= 0) return null

  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)

  let label: string
  if (days >= 1) {
    label = `あと ${days} 日 ${hours} 時間`
  } else if (hours >= 1) {
    label = `あと ${hours} 時間 ${minutes} 分`
  } else {
    label = `あと ${minutes} 分`
  }

  return (
    <div className="wb-countdown" role="timer" aria-live="off">
      <span className="wb-countdown-pulse" aria-hidden />
      <span className="wb-countdown-units">
        <span className="wb-countdown-label">開催まで</span>
        <span className="wb-countdown-unit">{label}</span>
      </span>
    </div>
  )
}
