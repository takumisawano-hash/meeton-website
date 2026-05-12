import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { findWebinar, getUpcomingWebinars } from '../../lib/webinars-schedule'
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
  title: '申し込みありがとうございました | Meeton ai ウェビナー',
  description: 'ウェビナー申し込みの確認ページです。',
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
  // Cross-sell: show up to 2 upcoming webinars after the one user just registered for
  const otherUpcoming = getUpcomingWebinars()
    .filter((w) => w.slug !== webinar?.slug)
    .slice(0, 2)

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
            お申し込み<em>ありがとうございました</em>
          </h1>

          <p className="wb-hero-sub">
            確認メールを送りました。
            {webinar ? (
              <>
                <br />
                <strong>{webinar.title}</strong> — {webinar.dateLabel}
              </>
            ) : null}
            <br />
            当日の Zoom リンクは<strong>開催前日</strong>にメールで届きます。
          </p>

          {calendar && (
            <div
              style={{
                marginTop: 8,
                padding: 32,
                background: '#fff',
                border: '1px solid var(--w-border)',
                borderRadius: 22,
                maxWidth: 620,
                boxShadow: '0 24px 56px -28px rgba(6, 95, 70, 0.22)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), ui-monospace, monospace',
                  fontSize: 10.5,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--w-green-deep)',
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                Step 1 · Add to Calendar
              </div>
              <h2
                style={{
                  fontSize: 20, fontWeight: 900, letterSpacing: '-0.02em',
                  margin: '0 0 8px', lineHeight: 1.35,
                }}
              >
                カレンダーに入れておきましょう
              </h2>
              <div
                style={{
                  fontSize: 13.5,
                  color: 'var(--w-sub)',
                  marginBottom: 22,
                  lineHeight: 1.7,
                }}
              >
                30 分のブロックを押さえておけば、当日に MTG をぶつけられずに済みます。Zoom リンクは前日にメールで届きます。
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <a
                  href={calendar.googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wb-btn wb-btn-primary"
                  style={{ fontSize: 14 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Google Calendar
                </a>
                <a
                  href={calendar.outlookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wb-btn wb-btn-ghost"
                  style={{ fontSize: 14 }}
                >
                  Outlook
                </a>
                <a
                  href={calendar.icsUrl}
                  className="wb-btn wb-btn-ghost"
                  style={{ fontSize: 14 }}
                >
                  .ics (Apple / その他)
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Cross-sell: other upcoming webinars (avoid abandoning the user on a dead-end page) */}
      {otherUpcoming.length > 0 && (
        <section style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(60px, 8vw, 96px)' }}>
          <div className="wb-cross-sell">
            <div className="wb-cross-sell-l">Step 2 · 来月以降も押さえておく</div>
            <h2 className="wb-cross-sell-h">
              次回以降のテーマも見ておきますか
            </h2>
            <div className="wb-cross-sell-grid">
              {otherUpcoming.map((w) => (
                <Link key={w.slug} href={`/webinar/${w.slug}/`} className="wb-cross-sell-card">
                  <div className="wb-cross-sell-date">{w.dateLabel}</div>
                  <h3 className="wb-cross-sell-title">{w.title}</h3>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: 22, textAlign: 'center' }}>
              <Link href="/webinar/" className="wb-btn wb-btn-ghost">
                ラインナップを見る
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer variant="light" />

      <style>{webinarCss()}</style>
    </div>
  )
}
