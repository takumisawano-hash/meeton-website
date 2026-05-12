'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// HubSpot Forms Embed (new style — portal-specific script + data-attribute div).
// User-supplied 2026-05-12 in place of legacy v2.js + hbspt.forms.create() API.
const PORTAL_ID = '45872857'
const FORM_ID = '737d392d-d8ca-40a4-9c01-9f36aff8a4a0'
const REGION = 'na2'
const SCRIPT_SRC = `https://js-na2.hsforms.net/forms/embed/${PORTAL_ID}.js`
const SCRIPT_ID = 'hubspot-portal-embed-script'

let scriptLoadPromise: Promise<void> | null = null
function loadPortalScript(): Promise<void> {
  if (scriptLoadPromise) return scriptLoadPromise
  if (typeof window === 'undefined') return Promise.resolve()

  scriptLoadPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
    if (existing) {
      // Already loaded (or in-flight)
      if (existing.dataset.loaded === '1') {
        resolve()
      } else {
        existing.addEventListener('load', () => {
          existing.dataset.loaded = '1'
          resolve()
        })
        existing.addEventListener('error', () => reject(new Error('hubspot-script-failed')))
      }
      return
    }
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = SCRIPT_SRC
    script.defer = true
    script.onload = () => {
      script.dataset.loaded = '1'
      resolve()
    }
    script.onerror = () => reject(new Error('hubspot-script-failed'))
    document.head.appendChild(script)
  })
  return scriptLoadPromise
}

type Props = {
  webinarSlug: string
  webinarDate: string
  webinarTitle: string
  /** Redirect path to thank-you page (default /webinar/thanks/?slug=...) */
  thanksHref?: string
}

/**
 * Embedded HubSpot form (new Forms Embed v3 — portal-specific script).
 *
 * The new embed is declarative: drop a div with data attrs and HubSpot
 * auto-renders. Submit notifications arrive via window postMessage
 * with type === 'hsFormCallback' / eventName === 'onFormSubmitted'.
 *
 * UX:
 *   - Skeleton fields while script loads
 *   - Graceful mailto fallback if script fails
 *   - Privacy reassurance below submit
 *   - Auto-redirect to /webinar/thanks/?slug=... on submit
 */
export default function WebinarRegistrationForm({
  webinarSlug,
  webinarDate,
  webinarTitle,
  thanksHref,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptFailed, setScriptFailed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Load portal script once
  useEffect(() => {
    let mounted = true
    loadPortalScript()
      .then(() => mounted && setScriptLoaded(true))
      .catch(() => mounted && setScriptFailed(true))
    return () => {
      mounted = false
    }
  }, [])

  // Listen for HubSpot postMessage events. The new embed dispatches:
  //   { type: 'hsFormCallback', eventName: 'onFormSubmitted', ... }
  // and similar for onFormReady. Both legacy v2 and new embed use the
  // same postMessage shape, so this listener works for both transitions.
  useEffect(() => {
    if (submitted) return
    function handleMessage(e: MessageEvent) {
      const d = e.data as { type?: string; eventName?: string; id?: string } | undefined
      if (!d || typeof d !== 'object') return
      if (d.type !== 'hsFormCallback') return
      if (d.eventName !== 'onFormSubmitted') return
      // Optional: verify this is OUR form's submission via id match.
      // If d.id is the form id, narrow to FORM_ID; otherwise accept.
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
      {!scriptLoaded && !scriptFailed && (
        <div className="wb-form-skeleton" aria-hidden>
          <div>
            <div className="wb-form-skel-label" />
            <div className="wb-form-skel-field" style={{ marginTop: 6 }} />
          </div>
          <div>
            <div className="wb-form-skel-label" />
            <div className="wb-form-skel-field" style={{ marginTop: 6 }} />
          </div>
          <div>
            <div className="wb-form-skel-label" />
            <div className="wb-form-skel-field" style={{ marginTop: 6 }} />
          </div>
          <div className="wb-form-skel-button" />
        </div>
      )}

      {/* HubSpot embed v3 target — auto-rendered by /forms/embed/{portalId}.js */}
      <div
        ref={frameRef}
        className="hs-form-frame"
        data-region={REGION}
        data-form-id={FORM_ID}
        data-portal-id={PORTAL_ID}
      />

      {!scriptFailed && (
        <p className="wb-form-privacy">
          ご登録情報は本ウェビナーの運営目的でのみ利用します。
          <br />
          配信停止はいつでも 1 クリックで可能です。
          {' · '}
          <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer">
            プライバシーポリシー
          </a>
        </p>
      )}

      {scriptFailed && (
        <div className="wb-form-fallback" role="alert">
          フォームの読み込みに失敗しました。お手数ですが
          {' '}
          <a
            href={`mailto:contact@dynameet.ai?subject=${encodeURIComponent(
              `[Webinar 登録] ${webinarTitle}`
            )}&body=${encodeURIComponent(
              `以下の内容で登録を希望します:\n\n氏名:\nメール:\n会社名:\n役職:\n\n対象ウェビナー: ${webinarTitle}\n開催日: ${webinarDate}`
            )}`}
          >
            こちらからメール
          </a>
          {' '}
          でご登録ください。
        </div>
      )}
    </div>
  )
}
