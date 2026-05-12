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
      // Script tag from page-level <script defer> — by the time React
      // hydrates and this useEffect runs, defer scripts have already
      // executed (deferred scripts run before DOMContentLoaded; React
      // hydration runs AFTER). So we can resolve immediately.
      // Also keep a load listener as a safety net for older browsers.
      if (existing.dataset.loaded === '1') {
        resolve()
        return
      }
      // Belt-and-suspenders: listener for the rare case the script
      // isn't done by hydration.
      existing.addEventListener('load', () => {
        existing.dataset.loaded = '1'
        resolve()
      })
      existing.addEventListener('error', () => reject(new Error('hubspot-script-failed')))
      // If document is already complete, the script must already be
      // executed (deferred scripts run before DOMContentLoaded).
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        existing.dataset.loaded = '1'
        resolve()
      }
      return
    }
    // Fallback: page didn't include the script (shouldn't happen on
    // /webinar/[slug]/ — server render adds it — but just in case).
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
  const frameRef = useRef<HTMLDivElement | null>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptFailed, setScriptFailed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  // Show enrichment hint between script-loaded and form-ready
  // (~2-3s window where HubSpot Form Shortening checks known fields).
  const [enrichmentDone, setEnrichmentDone] = useState(false)

  // Stamp the URL with ?webinar_slug=... so HubSpot can pre-fill a
  // hidden "webinar_slug" field from URL params. This is the only
  // reliable way to identify which webinar a contact registered for
  // when using a single shared form across all webinar LPs.
  // Also stamps utm_campaign for cleaner Google Ads attribution.
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
      /* ignore — replaceState not critical */
    }
  }, [webinarSlug, webinarDate])

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

  // Heal-only: if the iframe still hasn't rendered ~2.5s after script
  // load, fire a custom event the portal script listens to AND/OR
  // dispatch a 'load' event on the script tag (some HubSpot embed
  // versions re-scan on that). This kicks the portal script's observer
  // without touching React's DOM, so first-visit isn't affected.
  useEffect(() => {
    if (!scriptLoaded || !frameRef.current || submitted) return
    const el = frameRef.current

    const t = setTimeout(() => {
      // If iframe child already exists, no rescue needed.
      if (el.querySelector('iframe')) return
      // Nudge the portal script to rescan by dispatching events it
      // commonly observes. Safe: just events, no DOM replacement.
      try {
        window.dispatchEvent(new Event('hsFormsV4Loaded'))
        window.dispatchEvent(new Event('hsFormReady'))
        const scriptEl = document.getElementById(SCRIPT_ID)
        if (scriptEl) scriptEl.dispatchEvent(new Event('load'))
      } catch {
        /* ignore */
      }
    }, 2500)

    return () => clearTimeout(t)
  }, [scriptLoaded, submitted, webinarSlug])

  // Auto-hide the enrichment hint after a safety timeout. HubSpot's
  // Form Shortening typically completes its known-field lookup in
  // 800-2500ms; 3500ms gives plenty of room. Triggered when script
  // finishes loading.
  useEffect(() => {
    if (!scriptLoaded || enrichmentDone) return
    const t = setTimeout(() => setEnrichmentDone(true), 3500)
    return () => clearTimeout(t)
  }, [scriptLoaded, enrichmentDone])

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
      // Hide enrichment hint as soon as form signals ready — better
      // than waiting the 3.5s safety timeout.
      if (d.eventName === 'onFormReady') {
        setEnrichmentDone(true)
        return
      }
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

      {/* Enrichment hint — explains why other fields appear after Email.
       * Shows from script-loaded until either onFormReady postMessage
       * fires or the 3.5s safety timeout expires. Prevents the "is the
       * form broken?" perception during HubSpot Form Shortening lookup. */}
      {scriptLoaded && !scriptFailed && !enrichmentDone && !submitted && (
        <div className="wb-form-enrich-hint" role="status" aria-live="polite">
          <span className="wb-form-enrich-hint-spinner" aria-hidden />
          <span>
            既知の情報を自動チェック中。残りの項目をすぐに表示します。
          </span>
        </div>
      )}

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
