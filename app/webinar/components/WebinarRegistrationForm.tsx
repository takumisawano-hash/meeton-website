'use client'

import { useEffect, useId, useRef, useState } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// HubSpot Forms Embed v2 (legacy) — synchronous DOM render. More reliable
// than v3 iframe in our case (no React hydration conflicts with iframe
// children, no progressive Form Shortening surprises).
const PORTAL_ID = '45872857'
const FORM_ID = '7aeb7f2e-1b74-4dca-a54e-dfdc5aec8ead'
const REGION = 'na2'
const SCRIPT_SRC = 'https://js-na2.hsforms.net/forms/embed/v2.js'
const SCRIPT_ID = 'hubspot-forms-v2'

type HbsptCreateConfig = {
  portalId: string
  formId: string
  region: string
  target: string
  onFormReady?: ($form: HTMLFormElement) => void
  onFormSubmitted?: () => void
}

type HubSpotWindow = Window & {
  hbspt?: {
    forms?: {
      create?: (config: HbsptCreateConfig) => void
    }
  }
}

let scriptPromise: Promise<void> | null = null
function loadV2Script(): Promise<void> {
  if (scriptPromise) return scriptPromise
  if (typeof window === 'undefined') return Promise.resolve()
  scriptPromise = new Promise((resolve, reject) => {
    const w = window as HubSpotWindow
    if (w.hbspt?.forms?.create) {
      resolve()
      return
    }
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('hubspot-v2-load-failed')))
      return
    }
    const s = document.createElement('script')
    s.id = SCRIPT_ID
    s.src = SCRIPT_SRC
    s.charset = 'utf-8'
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('hubspot-v2-load-failed'))
    document.head.appendChild(s)
  })
  return scriptPromise
}

type Props = {
  webinarSlug: string
  webinarDate: string
  webinarTitle: string
  thanksHref?: string
}

/**
 * Embedded HubSpot form (v2 legacy embed).
 *
 * Renders synchronously into a target div via hbspt.forms.create().
 * No iframe — React hydration conflicts and Form Shortening progressive
 * rendering both avoided.
 *
 * Side effects:
 *   - Stamp URL with webinar_slug / webinar_date / utm_campaign
 *     (for HubSpot hidden field pre-fill + Google Ads attribution)
 *   - gtag form_submit + generate_lead on submit
 *   - Auto-redirect to /webinar/thanks/?slug=...
 */
export default function WebinarRegistrationForm({
  webinarSlug,
  webinarDate,
  webinarTitle,
  thanksHref,
}: Props) {
  const reactId = useId()
  const targetId = `wb-hsform-${reactId.replace(/[^a-z0-9]/gi, '')}`
  const containerRef = useRef<HTMLDivElement>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptFailed, setScriptFailed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // URL stamp for HubSpot hidden-field pre-fill
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

  useEffect(() => {
    let mounted = true
    loadV2Script()
      .then(() => mounted && setScriptLoaded(true))
      .catch(() => mounted && setScriptFailed(true))
    return () => {
      mounted = false
    }
  }, [])

  // Create form once script + target div are ready
  useEffect(() => {
    if (!scriptLoaded || submitted || !containerRef.current) return
    const w = window as HubSpotWindow
    if (!w.hbspt?.forms?.create) return
    // Clear any prior render (SPA back-nav safety)
    containerRef.current.innerHTML = ''
    w.hbspt.forms.create({
      portalId: PORTAL_ID,
      formId: FORM_ID,
      region: REGION,
      target: `#${targetId}`,
      onFormSubmitted: () => {
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
      },
    })
  }, [scriptLoaded, submitted, webinarSlug, webinarDate, thanksHref, targetId])

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

      <div ref={containerRef} id={targetId} />

      <p className="wb-form-privacy">
        ご登録情報は本ウェビナーの運営目的でのみ利用します。
        <br />
        配信停止はいつでも 1 クリックで可能です。
        {' · '}
        <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer">
          プライバシーポリシー
        </a>
      </p>

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
