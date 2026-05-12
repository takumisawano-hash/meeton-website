import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { findWebinar } from '../../lib/webinars-schedule'
import { webinarCss } from '../components/webinarStyles'

/**
 * /webinar/thanks/ — Confirmation page after registration.
 *
 * Receives ?slug=... query to look up which webinar the user just
 * registered for. Provides:
 *   - Confirmation message
 *   - Add to Calendar: Google Calendar link, Outlook link, .ics download
 *   - "Zoom リンクは前日にメール送付" notice
 *   - CTA back to /webinar/
 *
 * Noindex (not for organic discovery).
 */

export const metadata: Metadata = {
  title: '登録ありがとうございました | Meeton ai ウェビナー',
  description: 'ウェビナー登録の確認ページです。',
  robots: { index: false, follow: false },
  alternates: { canonical: '/webinar/thanks/' },
}

type SearchParams = Promise<{ slug?: string }>

function buildGoogleCalUrl(args: {
  title: string
  details: string
  startUtc: string
  endUtc: string
  url: string
}) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: args.title,
    dates: `${args.startUtc}/${args.endUtc}`,
    details: args.details,
    location: args.url,
  })
  return `https://www.google.com/calendar/render?${params.toString()}`
}

function buildOutlookCalUrl(args: {
  title: string
  details: string
  startIso: string
  endIso: string
  url: string
}) {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: args.title,
    body: args.details,
    startdt: args.startIso,
    enddt: args.endIso,
    location: args.url,
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

/** Compact UTC stamp for Google Cal: YYYYMMDDTHHMMSSZ */
function toGoogleStamp(iso: string): string {
  return iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

export default async function WebinarThanksPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { slug } = await searchParams
  const webinar = slug ? findWebinar(slug) : null

  // Compute calendar times only when we have a webinar to anchor.
  let calendar: {
    googleUrl: string
    outlookUrl: string
    icsUrl: string
    title: string
    when: string
  } | null = null

  if (webinar) {
    // JST 14:00 - 15:00 = UTC 05:00 - 06:00
    const startIso = `${webinar.date}T05:00:00.000Z`
    const endIso = `${webinar.date}T06:00:00.000Z`
    const pageUrl = `https://dynameet.ai/webinar/${webinar.slug}/`
    const details = `${webinar.title}\n\n${webinar.description}\n\n参加: ${pageUrl}`
    calendar = {
      googleUrl: buildGoogleCalUrl({
        title: `[Meeton ai Webinar] ${webinar.title}`,
        details,
        startUtc: toGoogleStamp(startIso),
        endUtc: toGoogleStamp(endIso),
        url: pageUrl,
      }),
      outlookUrl: buildOutlookCalUrl({
        title: `[Meeton ai Webinar] ${webinar.title}`,
        details,
        startIso,
        endIso,
        url: pageUrl,
      }),
      icsUrl: `/api/webinar-ics/${webinar.slug}/`,
      title: webinar.title,
      when: webinar.dateLabel,
    }
  }

  return (
    <div className="wb-root">
      <Nav variant="light" />

      <section className="wb-hero" style={{ minHeight: 'auto' }}>
        <div className="wb-hero-grid" aria-hidden />
        <div className="wb-hero-inner" style={{ maxWidth: 760 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 999,
              background: 'linear-gradient(135deg, #12a37d, #065f46)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 18px 40px -16px rgba(6, 95, 70, 0.5)',
              marginBottom: 28,
            }}
            aria-hidden
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div className="wb-eyebrow">
            <span className="wb-eyebrow-dash" />
            Registration Confirmed
          </div>

          <h1 className="wb-hero-h1">
            ご登録<em>ありがとうございました</em>
          </h1>

          <p className="wb-hero-sub">
            確認メールを送付しました。
            {webinar ? (
              <>
                <br />
                <strong>{webinar.title}</strong> — {webinar.dateLabel}
              </>
            ) : null}
            <br />
            Zoom 参加リンクは<strong>開催日前日</strong>にメールでお届けします。
          </p>

          {calendar && (
            <div
              style={{
                marginTop: 8,
                padding: 28,
                background: '#fff',
                border: '1px solid var(--w-border)',
                borderRadius: 22,
                maxWidth: 620,
                boxShadow: '0 18px 40px -28px rgba(6, 95, 70, 0.18)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), ui-monospace, monospace',
                  fontSize: 10.5,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--w-mute)',
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                Add to Calendar
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: 'var(--w-sub)',
                  marginBottom: 18,
                  lineHeight: 1.7,
                }}
              >
                忘れないように、いまカレンダーに追加しておきましょう。
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <a
                  href={calendar.googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wb-btn wb-btn-ghost"
                  style={{ fontSize: 13.5 }}
                >
                  Google Calendar
                </a>
                <a
                  href={calendar.outlookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wb-btn wb-btn-ghost"
                  style={{ fontSize: 13.5 }}
                >
                  Outlook
                </a>
                <a
                  href={calendar.icsUrl}
                  className="wb-btn wb-btn-ghost"
                  style={{ fontSize: 13.5 }}
                >
                  .ics ダウンロード
                </a>
              </div>
            </div>
          )}

          <div style={{ marginTop: 36 }}>
            <Link href="/webinar/" className="wb-btn wb-btn-primary">
              他のウェビナーも見る
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <style>{webinarCss()}</style>
    </div>
  )
}
