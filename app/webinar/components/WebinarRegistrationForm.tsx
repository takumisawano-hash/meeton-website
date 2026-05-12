'use client'

import { useEffect, useId, useRef, useState } from 'react'

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
  scriptLoadPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve()
      return
    }
    const existing = document.getElementById('hubspot-script') as HTMLScriptElement | null
    if (existing) {
      if (window.hbspt) {
        resolve()
      } else {
        existing.addEventListener('load', () => resolve())
        existing.addEventListener('error', () => reject(new Error('hubspot-script-failed')))
      }
      return
    }
    const script = document.createElement('script')
    script.id = 'hubspot-script'
    script.src = '//js-na2.hsforms.net/forms/embed/v2.js'
    script.charset = 'utf-8'
    script.async = true
    script.onload = () => resolve()
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
 * Embedded HubSpot form for webinar registration.
 *
 * UX:
 *   - Skeleton fields while script loads (no jarring "Loading...")
 *   - Graceful fallback link if HubSpot fails to load (progressive enhancement)
 *   - Privacy reassurance below submit
 *   - Optimistic success state (renders before redirect resolves)
 *
 * Data flow: reuses portal 45872857 / form dd42d8b3. Injects
 * webinarSlug + webinarDate + webinarTitle into hs_context so the
 * contact record carries registration source for routing/segmentation
 * in HubSpot.
 */
export default function WebinarRegistrationForm({
  webinarSlug,
  webinarDate,
  webinarTitle,
  thanksHref,
}: Props) {
  const reactId = useId()
  // useId returns `:r0:`-style strings — strip colons so it's a valid CSS selector
  const containerId = `webinar-form-${reactId.replace(/[^a-z0-9_-]/gi, '')}`
  const containerRef = useRef<HTMLDivElement>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptFailed, setScriptFailed] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    let mounted = true
    loadHubSpotScript()
      .then(() => mounted && setScriptLoaded(true))
      .catch(() => mounted && setScriptFailed(true))
    return () => {
      mounted = false
    }
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
      target: `#${containerId}`,
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
        // Improve mobile UX — add proper input modes/autocomplete to inputs
        const email = $form.querySelector(
          'input[type="email"]'
        ) as HTMLInputElement | null
        if (email && !email.getAttribute('autocomplete')) {
          email.setAttribute('autocomplete', 'email')
          email.setAttribute('inputmode', 'email')
        }
        const tel = $form.querySelector(
          'input[type="tel"]'
        ) as HTMLInputElement | null
        if (tel && !tel.getAttribute('autocomplete')) {
          tel.setAttribute('autocomplete', 'tel')
          tel.setAttribute('inputmode', 'tel')
        }
        // Honeypot (basic bot deterrent — invisible to humans)
        if (!$form.querySelector('input[name="wb_hp"]')) {
          const hp = document.createElement('input')
          hp.type = 'text'
          hp.name = 'wb_hp'
          hp.tabIndex = -1
          hp.autocomplete = 'off'
          hp.setAttribute('aria-hidden', 'true')
          hp.style.cssText =
            'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;'
          $form.appendChild(hp)
        }
      },
    })
  }, [scriptLoaded, submitted, webinarSlug, webinarDate, webinarTitle, thanksHref, containerId])

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
      <div id={containerId} ref={containerRef} />

      {/* Privacy reassurance — only render once script is up (avoids double-render) */}
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
