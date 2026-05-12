'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          portalId: string
          formId: string
          region: string
          target: string
          onFormReady?: ($form: HTMLFormElement) => void
          onFormSubmitted?: () => void
        }) => void
      }
    }
    gtag?: (...args: unknown[]) => void
  }
}

let scriptLoadPromise: Promise<void> | null = null
function loadHubSpotScript(): Promise<void> {
  if (scriptLoadPromise) return scriptLoadPromise
  if (typeof window !== 'undefined' && window.hbspt) {
    return Promise.resolve()
  }
  scriptLoadPromise = new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve()
      return
    }
    if (document.getElementById('hubspot-script')) {
      if (window.hbspt) resolve()
      else {
        const existing = document.getElementById('hubspot-script')
        existing?.addEventListener('load', () => resolve())
      }
      return
    }
    const script = document.createElement('script')
    script.id = 'hubspot-script'
    script.src = '//js-na2.hsforms.net/forms/embed/v2.js'
    script.charset = 'utf-8'
    script.async = true
    script.onload = () => resolve()
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
 * Embedded HubSpot form for webinar registration.
 *
 * Reuses portal 45872857 / form dd42d8b3 (general lead capture). We inject
 * webinarSlug + webinarDate into hs_context so the contact record carries
 * the registration source for routing/segmentation in HubSpot.
 *
 * On submit: track form_submit + generate_lead events, then redirect to
 * /webinar/thanks/?slug=... so the user lands on a static confirmation
 * page with calendar download.
 */
export default function WebinarRegistrationForm({
  webinarSlug,
  webinarDate,
  webinarTitle,
  thanksHref,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    loadHubSpotScript().then(() => setScriptLoaded(true))
  }, [])

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || !window.hbspt) return
    if (submitted) return
    containerRef.current.innerHTML = ''

    const baseUrl =
      typeof window !== 'undefined'
        ? window.location.origin + window.location.pathname
        : ''
    const utmCampaign = `webinar-${webinarSlug}`
    const utmParams = `?utm_source=website&utm_medium=webinar-lp&utm_campaign=${utmCampaign}`

    window.hbspt.forms.create({
      portalId: '45872857',
      formId: 'dd42d8b3-e426-4079-9479-fa28287c0544',
      region: 'na2',
      target: '#webinar-form-container',
      onFormSubmitted: () => {
        setSubmitted(true)
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
        // After a short delay so HubSpot finishes its POST, send to thanks.
        const target =
          thanksHref ||
          `/webinar/thanks/?slug=${encodeURIComponent(webinarSlug)}`
        setTimeout(() => {
          window.location.href = target
        }, 800)
      },
      onFormReady: ($form: HTMLFormElement) => {
        if (!$form) return
        const ctx = $form.querySelector(
          'input[name="hs_context"]'
        ) as HTMLInputElement | null
        if (ctx) {
          try {
            const parsed = JSON.parse(ctx.value || '{}')
            parsed.pageUrl = baseUrl + utmParams
            parsed.webinarSlug = webinarSlug
            parsed.webinarDate = webinarDate
            parsed.webinarTitle = webinarTitle
            ctx.value = JSON.stringify(parsed)
          } catch {
            /* ignore */
          }
        }
      },
    })
  }, [scriptLoaded, submitted, webinarSlug, webinarDate, webinarTitle, thanksHref])

  if (submitted) {
    return (
      <div className="wb-form-success">
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
      {!scriptLoaded && (
        <div className="wb-form-loading" aria-live="polite">
          フォームを読み込み中...
        </div>
      )}
      <div id="webinar-form-container" ref={containerRef} />
    </div>
  )
}
