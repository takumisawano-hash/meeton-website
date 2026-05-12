'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// HubSpot Forms Embed v3 — portal-specific script + data-attribute div.
// The script auto-scans for .hs-form-frame divs on load.
const PORTAL_ID = '45872857'
const FORM_ID = '737d392d-d8ca-40a4-9c01-9f36aff8a4a0'
const REGION = 'na2'

type Props = {
  webinarSlug: string
  webinarDate: string
  webinarTitle: string
  /** Redirect path to thank-you page (default /webinar/thanks/?slug=...) */
  thanksHref?: string
}

/**
 * Embedded HubSpot form (Forms Embed v3).
 *
 * The hs-form-frame element is rendered via dangerouslySetInnerHTML so
 * that React does NOT manage the DOM children HubSpot's portal script
 * injects (iframe, etc). The portal script in page.tsx scans for this
 * element on first load.
 *
 * Side effects (all isolated from form DOM):
 *   - Stamp ?webinar_slug=... on URL so HubSpot URL-param pre-fill works
 *   - Listen for hsFormCallback / onFormSubmitted postMessage → fire
 *     gtag events and redirect to /webinar/thanks/?slug=...
 *   - Enrichment hint banner while Form Shortening is checking known
 *     fields
 */
export default function WebinarRegistrationForm({
  webinarSlug,
  webinarDate,
  webinarTitle,
  thanksHref,
}: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [enrichmentDone, setEnrichmentDone] = useState(false)

  // Stamp URL for HubSpot hidden-field pre-fill.
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const url = new URL(window.location.href)
      let changed = false
      if (url.searchParams.get('webinar_slug') !== webinarSlug) {
        url.searchParams.set('webinar_slug', webinarSlug)
        changed = true
      }
      if (!url.searchParams.has('webinar_date')) {
        url.searchParams.set('webinar_date', webinarDate)
        changed = true
      }
      if (!url.searchParams.has('utm_campaign')) {
        url.searchParams.set('utm_campaign', `webinar-${webinarSlug}`)
        changed = true
      }
      if (changed) {
        window.history.replaceState({}, '', url.toString())
      }
    } catch {
      /* ignore */
    }
  }, [webinarSlug, webinarDate])

  // Auto-hide enrichment hint after 3.5s safety timeout.
  useEffect(() => {
    if (enrichmentDone) return
    const t = setTimeout(() => setEnrichmentDone(true), 3500)
    return () => clearTimeout(t)
  }, [enrichmentDone])

  // Listen for HubSpot postMessage events (submit + ready).
  useEffect(() => {
    if (submitted) return
    function handleMessage(e: MessageEvent) {
      const d = e.data as { type?: string; eventName?: string; id?: string } | undefined
      if (!d || typeof d !== 'object') return
      if (d.type !== 'hsFormCallback') return

      if (d.eventName === 'onFormReady') {
        setEnrichmentDone(true)
        return
      }
      if (d.eventName !== 'onFormSubmitted') return
      if (d.id && d.id !== FORM_ID) return

      setSubmitted(true)
      const utmCampaign = `webinar-${webinarSlug}`
      window.gtag?.('event', 'form_submit', {
        form_type: 'webinar_registration',
        webinar_slug: webinarSlug,
        webinar_date: webinarDate,
        utm_campaign: utmCampaign,
      })
      window.gtag?.('event', 'generate_lead', {
        form_type: 'webinar_registration',
        value: 1,
      })
      const target =
        thanksHref || `/webinar/thanks/?slug=${encodeURIComponent(webinarSlug)}`
      setTimeout(() => {
        window.location.href = target
      }, 800)
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [submitted, webinarSlug, webinarDate, thanksHref])

  if (submitted) {
    return (
      <div className="wb-form-success" role="status" aria-live="polite">
        <div className="wb-form-success-icon" aria-hidden>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="wb-form-success-h">ご登録ありがとうございました</h3>
        <p className="wb-form-success-p">
          確認メールを送付しました。Zoom 参加リンクは前日にお届けします。
          <br />
          確認ページへ移動しています...
        </p>
      </div>
    )
  }

  return (
    <div className="wb-form-shell">
      {/* HubSpot embed v3 target. dangerouslySetInnerHTML keeps React
       * from touching the form-frame's children (iframe HubSpot injects). */}
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `<div class="hs-form-frame" data-region="${REGION}" data-form-id="${FORM_ID}" data-portal-id="${PORTAL_ID}"></div>`,
        }}
      />

      {!enrichmentDone && (
        <div className="wb-form-enrich-hint" role="status" aria-live="polite">
          <span className="wb-form-enrich-hint-spinner" aria-hidden />
          <span>
            フォームを読み込み中…
          </span>
        </div>
      )}

      <p className="wb-form-privacy">
        ご登録情報は本ウェビナーの運営目的でのみ利用します。
        <br />
        配信停止はいつでも 1 クリックで可能です。
        {' · '}
        <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer">
          プライバシーポリシー
        </a>
      </p>

      {/* Mailto fallback always visible if user can't see form after 10s.
       * Subtle, non-alarming. */}
      <noscript>
        <div className="wb-form-fallback" role="alert">
          フォームには JavaScript が必要です。{' '}
          <a
            href={`mailto:contact@dynameet.ai?subject=${encodeURIComponent(
              `[Webinar 登録] ${webinarTitle}`
            )}`}
          >
            メールで登録
          </a>
        </div>
      </noscript>
    </div>
  )
}
