import { NextResponse } from 'next/server'
import { findWebinar } from '@/app/lib/webinars-schedule'

/**
 * GET /api/webinar-ics/[slug]/
 *
 * Dynamically generates an RFC 5545 .ics calendar invite for the given
 * webinar slug. Used by /webinar/thanks/ to give registrants a one-click
 * download to add the event to their calendar (works with Apple Calendar,
 * Outlook desktop, Thunderbird, etc.).
 *
 * Times are anchored to JST 14:00 - 14:30 (UTC 05:00 - 05:30).
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const webinar = findWebinar(slug)
  if (!webinar) {
    return new NextResponse('Webinar not found', { status: 404 })
  }

  // JST 14:00 - 14:30 → UTC 05:00 - 05:30
  const startUtc = `${webinar.date.replace(/-/g, '')}T050000Z`
  const endUtc = `${webinar.date.replace(/-/g, '')}T053000Z`
  const nowUtc =
    new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

  const pageUrl = `https://dynameet.ai/webinar/${webinar.slug}/`
  const uid = `${webinar.slug}-${webinar.date}@dynameet.ai`

  // ICS requires CRLF line endings + folded long lines. Quoting per RFC 5545.
  const escape = (s: string): string =>
    s
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/,/g, '\\,')
      .replace(/;/g, '\\;')

  const description = `${webinar.title}\n\n${webinar.description}\n\n参加URL: ${pageUrl}`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Meeton ai//Webinar//JA',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${escape(`[Meeton ai Webinar] ${webinar.title}`)}`,
    `DESCRIPTION:${escape(description)}`,
    `URL:${pageUrl}`,
    `LOCATION:${escape(pageUrl)}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escape(webinar.title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  const body = lines.join('\r\n')

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="meeton-webinar-${webinar.slug}.ics"`,
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
