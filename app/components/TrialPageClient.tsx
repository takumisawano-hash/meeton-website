'use client'

import { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'

// ── /en/trial/ — EN-only self-serve trial request (2026-07-02) ────────
// The English site's primary CTA. No self-serve billing exists yet, so the
// honest funnel is: request → we set you up within 1 business day → 1 month
// free with full plan features → paid service starts only after explicit
// approval (no credit card collected, no auto-billing). Copy must never
// promise otherwise.
//
// Form mechanics: reuses the existing HubSpot contact form embed (captcha is
// enabled on the form, so the Forms Submission API is not available). The
// form's field labels are Japanese in HubSpot, so we relabel them in the DOM
// (onFormReady + MutationObserver for re-renders). Plan choice + website URL
// are our own controls; they're injected into the `inquiry` textarea right
// before submit so the lead lands in HubSpot fully annotated.

const PORTAL_ID = '45872857'
const FORM_ID = '08dc0777-eba7-419f-befe-70ae7bc44f02'

// JA field labels as defined in HubSpot → EN replacements.
const LABEL_MAP: Record<string, string> = {
  姓: 'Last name',
  名: 'First name',
  Eメール: 'Work email',
  会社名: 'Company',
  お問い合せ内容: 'Anything we should know? (optional)',
  お問い合わせ内容: 'Anything we should know? (optional)',
  送信する: 'Request my free trial',
}

// 2026-07-17 USD pivot: overseas self-serve is USD-only, and Meeton Email
// (win-back / "all-in-one") is removed from the self-serve offer. Old
// ?plan=all-in-one links fall through the PLANS.some() guard → default plan.
const PLANS = [
  { id: 'lead', label: 'Capture Leads (base)', price: 'From $999/mo' },
  { id: 'meeting', label: 'Book More Meetings', price: 'From $1,349/mo', recommended: true },
  { id: 'unsure', label: 'Not sure yet', price: "We'll recommend one" },
]

const STEPS = [
  { n: '1', t: 'Request your trial', d: 'Two minutes. No credit card.' },
  { n: '2', t: 'We set you up', d: 'Within 1 business day — one JS tag, calendar & CRM connected.' },
  { n: '3', t: '1 month free, full features', d: 'Your AI SDR captures, qualifies, and books meetings from your site.' },
  { n: '4', t: 'You decide', d: 'No auto-billing. Paid service starts only after you approve.' },
]

const FAQ = [
  {
    q: 'Do I need a credit card to start?',
    a: 'No. The trial requires no payment details at all. At the end of the month we review results together, and paid service begins only if you approve — there is no automatic charge.',
  },
  {
    q: 'How long does setup take?',
    a: 'About 5 minutes of your time: one JS tag on your site, then calendar and CRM connections. We handle the configuration with you within 1 business day of your request.',
  },
  {
    q: 'What happens to our data?',
    a: 'Visitor and lead data is processed under our information-security management program and used only to run your trial. See the Security page for details.',
  },
  {
    q: 'Which plan does the trial include?',
    a: 'Whichever you pick — full features of that plan, including up to 30,000 website sessions during the trial month. Not sure? Pick "Not sure yet" and we\'ll recommend one based on your traffic and sales motion.',
  },
]

// window.hbspt is declared globally elsewhere (HubSpotModal et al.) with a
// narrower create() config type; cast locally instead of widening the global.
function getHbspt(): { forms: { create: (opts: Record<string, unknown>) => void } } | undefined {
  return (window as unknown as { hbspt?: { forms: { create: (opts: Record<string, unknown>) => void } } }).hbspt
}

function relabel(root: HTMLElement) {
  // labels + any text nodes carrying the known JA strings
  root.querySelectorAll('label, .hs-button, input[type="submit"]').forEach((el) => {
    const node = el as HTMLElement
    if (node instanceof HTMLInputElement) {
      if (LABEL_MAP[node.value]) node.value = LABEL_MAP[node.value]
      return
    }
    // label elements wrap a text node + required marker span
    node.childNodes.forEach((c) => {
      if (c.nodeType === Node.TEXT_NODE && c.textContent) {
        const trimmed = c.textContent.trim()
        if (LABEL_MAP[trimmed]) c.textContent = LABEL_MAP[trimmed]
      }
    })
    if (node.tagName === 'BUTTON' && LABEL_MAP[node.textContent?.trim() ?? '']) {
      node.textContent = LABEL_MAP[node.textContent!.trim()]
    }
  })
}

export default function TrialPageClient() {
  const formRef = useRef<HTMLDivElement>(null)
  const [formStatus, setFormStatus] = useState<'loading' | 'ready' | 'failed'>('loading')
  const [submitted, setSubmitted] = useState(false)
  const [plan, setPlan] = useState('meeting')
  const [website, setWebsite] = useState('')
  // refs so the HubSpot callbacks (bound once) always read the latest values
  const planRef = useRef(plan)
  const websiteRef = useRef(website)
  planRef.current = plan
  websiteRef.current = website

  // preselect plan from ?plan= (pricing cards link here with it)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('plan')
    if (p && PLANS.some((x) => x.id === p)) setPlan(p)
  }, [])

  useEffect(() => {
    function renderForm() {
      const hbspt = getHbspt()
      if (!formRef.current || !hbspt) return
      formRef.current.innerHTML = ''
      hbspt.forms.create({
        portalId: PORTAL_ID,
        formId: FORM_ID,
        region: 'na2',
        target: '#trial-hubspot-form',
        locale: 'en',
        translations: {
          en: {
            required: 'Please complete this required field.',
            invalidEmail: 'Please enter a valid email address.',
            submitText: 'Request my free trial',
          },
        },
        onFormReady: () => {
          setFormStatus('ready')
          const root = formRef.current
          if (!root) return
          relabel(root)
          // HubSpot re-renders on validation → keep labels English
          const mo = new MutationObserver(() => relabel(root))
          mo.observe(root, { childList: true, subtree: true })
        },
        onFormSubmit: () => {
          // annotate the inquiry textarea with plan + website before submit
          const ta = formRef.current?.querySelector<HTMLTextAreaElement>('textarea[name="inquiry"]')
          if (ta) {
            const chosen = PLANS.find((x) => x.id === planRef.current)
            const meta = [
              '[FREE TRIAL REQUEST — /en/trial/]',
              `Plan: ${chosen?.label ?? planRef.current}`,
              `Website: ${websiteRef.current || '(not provided)'}`,
            ].join('\n')
            ta.value = ta.value ? `${meta}\n---\n${ta.value}` : meta
            ta.dispatchEvent(new Event('input', { bubbles: true }))
            ta.dispatchEvent(new Event('change', { bubbles: true }))
          }
        },
        onFormSubmitted: () => {
          setSubmitted(true)
          const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
          gtag?.('event', 'form_submit', { form_type: 'trial', form_id: FORM_ID })
          gtag?.('event', 'generate_lead', { form_type: 'trial' })
        },
      })
    }

    if (document.getElementById('hubspot-script')) {
      if (getHbspt()) renderForm()
      else document.getElementById('hubspot-script')?.addEventListener('load', renderForm)
    } else {
      const script = document.createElement('script')
      script.id = 'hubspot-script'
      script.src = '//js-na2.hsforms.net/forms/embed/v2.js'
      script.charset = 'utf-8'
      script.async = true
      script.onload = renderForm
      document.head.appendChild(script)
    }

    const fallbackTimer = window.setTimeout(() => {
      setFormStatus((s) => {
        if (s !== 'loading') return s
        return formRef.current?.querySelector('form, iframe') ? 'ready' : 'failed'
      })
    }, 6000)
    return () => window.clearTimeout(fallbackTimer)
  }, [])

  return (
    <>
      <Nav lang="en" />

      <style>{`
        .tr-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:var(--fm);font-size:12px;font-weight:700;color:var(--cta-ink);letter-spacing:3px;text-transform:uppercase;margin-bottom:18px}
        .tr-eyebrow::before{content:'';width:24px;height:1px;background:linear-gradient(90deg,transparent,var(--cta))}
        .tr-eyebrow::after{content:'';width:24px;height:1px;background:linear-gradient(90deg,var(--cta),transparent)}
        .tr-h1{font-family:var(--fd);font-size:clamp(32px,5.4vw,52px);font-weight:900;color:var(--heading);line-height:1.14;letter-spacing:-.025em;margin-bottom:18px}
        .tr-h1 em{font-style:normal;color:var(--cta-ink)}
        .tr-sub{font-size:clamp(15px,2vw,18px);line-height:1.8;color:var(--sub);max-width:680px;margin:0 auto}
        .tr-grid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:clamp(20px,3vw,32px);align-items:start}
        @media (max-width:900px){.tr-grid{grid-template-columns:1fr}}
        .tr-card{background:#fff;border-radius:var(--r-feature);border:1.5px solid var(--border);box-shadow:0 12px 40px rgba(15,17,40,.05),0 1px 2px rgba(15,17,40,.03);overflow:hidden}
        .tr-card-h{padding:clamp(20px,3vw,28px) clamp(20px,3vw,32px);border-bottom:1px solid var(--border)}
        .tr-card-h-title{font-size:15px;font-weight:800;color:var(--heading);letter-spacing:-.01em}
        .tr-card-h-sub{font-size:12.5px;color:var(--sub);margin-top:2px}
        .tr-card-body{padding:clamp(20px,3vw,32px)}
        .tr-planchips{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px}
        @media (max-width:560px){.tr-planchips{grid-template-columns:1fr}}
        .tr-chip{position:relative;text-align:left;padding:12px 14px;border-radius:12px;border:1.5px solid var(--border2);background:var(--surface);cursor:pointer;font-family:inherit;transition:border-color .15s,box-shadow .15s,background .15s}
        .tr-chip[aria-pressed="true"]{border-color:var(--cta);background:#fff;box-shadow:0 0 0 3px rgba(7,203,121,.14)}
        .tr-chip-t{display:block;font-size:14px;font-weight:800;color:var(--heading)}
        .tr-chip-p{display:block;font-size:12px;font-weight:600;color:var(--sub);margin-top:2px}
        .tr-chip-badge{position:absolute;top:-9px;right:10px;background:var(--cta);color:var(--on-cta);font-size:10px;font-weight:800;padding:2px 8px;border-radius:999px}
        .tr-field-label{display:block;font-size:13px;font-weight:700;color:var(--heading);margin-bottom:8px}
        .tr-input{width:100%;min-height:48px;padding:12px 14px;font-size:15px;font-family:inherit;color:var(--heading);background:var(--surface);border:1.5px solid var(--border2);border-radius:10px;box-sizing:border-box;-webkit-appearance:none;appearance:none;transition:border-color .18s,box-shadow .18s,background .18s}
        .tr-input:focus{outline:none;border-color:var(--cta);background:#fff;box-shadow:0 0 0 4px rgba(7,203,121,.16)}
        .tr-input::placeholder{color:#9ca3af}
        #trial-hubspot-form .hs-form-field{margin-bottom:18px}
        #trial-hubspot-form .hs-form-field > label{display:block;font-size:13px;font-weight:700;color:var(--heading);margin-bottom:8px;letter-spacing:.005em}
        #trial-hubspot-form .hs-form-field > label .hs-form-required{color:#dc2626;margin-left:4px}
        #trial-hubspot-form input[type="text"],
        #trial-hubspot-form input[type="email"],
        #trial-hubspot-form select,
        #trial-hubspot-form textarea{width:100%;min-height:48px;padding:12px 14px;font-size:15px;font-family:inherit;color:var(--heading);background:var(--surface);border:1.5px solid var(--border2);border-radius:10px;transition:border-color .18s,box-shadow .18s,background .18s;-webkit-appearance:none;appearance:none;box-sizing:border-box}
        #trial-hubspot-form textarea{min-height:100px;line-height:1.6;resize:vertical}
        #trial-hubspot-form input:focus,#trial-hubspot-form textarea:focus{outline:none;border-color:var(--cta);background:#fff;box-shadow:0 0 0 4px rgba(7,203,121,.16)}
        #trial-hubspot-form .hs-error-msgs{list-style:none;padding:0;margin:6px 0 0;font-size:12.5px;color:#dc2626}
        #trial-hubspot-form input.invalid,#trial-hubspot-form textarea.invalid{border-color:#dc2626;background:#fff5f5}
        #trial-hubspot-form .legal-consent-container{margin-top:8px;padding:14px;border-radius:10px;background:var(--surface);border:1px solid var(--border);font-size:12.5px;line-height:1.65;color:var(--sub)}
        #trial-hubspot-form .hs-submit{margin-top:8px}
        #trial-hubspot-form .hs-button{width:100%;min-height:52px;padding:14px 28px;font-size:16px;font-weight:800;color:var(--on-cta);font-family:inherit;background:var(--cta);border:none;border-radius:var(--r-btn);cursor:pointer;letter-spacing:.01em;box-shadow:0 6px 22px var(--cta-glow);transition:background .18s,box-shadow .18s,transform .12s}
        #trial-hubspot-form .hs-button:hover{background:var(--cta-hover);transform:translateY(-1px)}
        #trial-hubspot-form .hs-button:active{background:var(--cta-press);transform:translateY(1px)}
        #trial-hubspot-form fieldset{max-width:none !important;border:none;padding:0;margin:0}
        #trial-hubspot-form fieldset.form-columns-2 .hs-form-field{width:100% !important;padding-right:0 !important}
        @media (min-width:600px){#trial-hubspot-form fieldset.form-columns-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}}
        #trial-hubspot-form fieldset .input{margin-right:0 !important}
        .tr-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px}
        .tr-pill{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;background:var(--cta-wash);border:1px solid var(--cta-border);font-size:12.5px;font-weight:600;color:var(--cta-ink);letter-spacing:.01em}
        .tr-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;max-width:1080px;margin:0 auto}
        @media (max-width:900px){.tr-steps{grid-template-columns:1fr 1fr}}
        @media (max-width:520px){.tr-steps{grid-template-columns:1fr}}
        .tr-step{background:#fff;border:1px solid var(--border);border-radius:14px;padding:18px}
        .tr-step-n{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:999px;background:var(--cta);color:var(--on-cta);font-weight:800;font-size:13px;margin-bottom:10px}
        .tr-step-t{font-size:14.5px;font-weight:800;color:var(--heading);margin-bottom:4px}
        .tr-step-d{font-size:13px;line-height:1.65;color:var(--sub)}
        .tr-info-card{background:linear-gradient(180deg,rgba(255,255,255,.85) 0%,rgba(246,248,251,.92) 100%);border-radius:var(--r-feature);border:1.5px solid var(--border);box-shadow:0 12px 40px rgba(15,17,40,.05);padding:clamp(22px,3vw,28px);position:sticky;top:96px}
        @media (max-width:900px){.tr-info-card{position:static}}
        .tr-faq-q{font-size:14.5px;font-weight:800;color:var(--heading);margin:0 0 6px}
        .tr-faq-a{font-size:13px;line-height:1.75;color:var(--sub);margin:0}
        .tr-faq-item{padding:16px 0;border-bottom:1px solid var(--border)}
        .tr-faq-item:first-child{padding-top:0}
        .tr-faq-item:last-child{border-bottom:none;padding-bottom:0}
        .tr-success{text-align:center;padding:clamp(40px,6vw,56px) clamp(22px,4vw,40px)}
        .tr-success-icon{width:72px;height:72px;border-radius:50%;background:var(--cta);color:var(--on-cta);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;box-shadow:0 14px 36px var(--cta-glow)}
        .tr-success h2{font-size:clamp(22px,3.6vw,28px);font-weight:900;color:var(--heading);margin-bottom:14px;letter-spacing:-.018em}
        .tr-success p{font-size:clamp(14px,2vw,15.5px);color:var(--sub);line-height:1.8;margin-bottom:32px;max-width:520px;margin-left:auto;margin-right:auto}
        .tr-success-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 30px;background:var(--cta);color:var(--on-cta);border-radius:var(--r-btn);font-weight:800;font-size:15px;text-decoration:none;box-shadow:0 6px 22px var(--cta-glow)}
      `}</style>

      <main
        style={{
          paddingTop: 'clamp(72px, 11vw, 100px)',
          minHeight: '100vh',
          background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg) 32%)',
          color: 'var(--text)',
        }}
      >
        {/* HERO */}
        <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(36px,6vw,64px) clamp(16px,4vw,28px) clamp(20px,3vw,32px)' }}>
          <div style={{ position: 'relative', maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
            <div className="tr-eyebrow">1-month free trial</div>
            <h1 className="tr-h1">
              Start your <em>1-month free trial</em>
            </h1>
            <p className="tr-sub">
              Turn your website into an AI SDR that captures visitors, qualifies them, and books
              meetings — live within 1 business day. No credit card required. No auto-billing:
              paid service starts only after you approve.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ padding: '8px clamp(16px,4vw,28px) clamp(28px,4vw,40px)' }}>
          <div className="tr-steps">
            {STEPS.map((st) => (
              <div key={st.n} className="tr-step">
                <span className="tr-step-n">{st.n}</span>
                <div className="tr-step-t">{st.t}</div>
                <div className="tr-step-d">{st.d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FORM + SIDEBAR */}
        <section style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: 'clamp(8px,2vw,24px) clamp(16px,4vw,28px) clamp(48px,7vw,72px)' }}>
          <div className="tr-grid">
            <div>
              {submitted ? (
                <div className="tr-card">
                  <div className="tr-success">
                    <div className="tr-success-icon">
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h2>Trial request received</h2>
                    <p>
                      We&apos;ll reach out within 1 business day to get you live — one JS tag on
                      your site, then calendar and CRM connections. Keep an eye on your inbox.
                    </p>
                    <a href="/en/" className="tr-success-cta v2-cta-primary">
                      Back to home
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="tr-card">
                  <div className="tr-card-h">
                    <div className="tr-card-h-title">Request your free trial</div>
                    <div className="tr-card-h-sub">Takes about 2 minutes — we handle the setup with you</div>
                  </div>
                  <div className="tr-card-body">
                    {/* Plan choice (ours, injected into the lead on submit) */}
                    <span className="tr-field-label">Which plan do you want to try?</span>
                    <div className="tr-planchips" role="group" aria-label="Plan">
                      {PLANS.map((p) => (
                        <button key={p.id} type="button" className="tr-chip" aria-pressed={plan === p.id} onClick={() => setPlan(p.id)}>
                          {p.recommended && <span className="tr-chip-badge">Recommended</span>}
                          <span className="tr-chip-t">{p.label}</span>
                          <span className="tr-chip-p">{p.price}</span>
                        </button>
                      ))}
                    </div>

                    {/* Website (ours, injected into the lead on submit) */}
                    <label className="tr-field-label" htmlFor="trial-website">
                      Company website URL
                    </label>
                    <input
                      id="trial-website"
                      className="tr-input"
                      type="url"
                      inputMode="url"
                      placeholder="https://example.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      style={{ marginBottom: 18 }}
                    />

                    {formStatus === 'loading' && (
                      <div role="status" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--sub)', fontSize: 14 }}>
                        Loading form...
                      </div>
                    )}
                    {formStatus === 'failed' && (
                      <div role="alert" style={{ textAlign: 'center', padding: '32px 8px' }}>
                        <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--heading)', margin: '0 0 8px' }}>We could not load the form</p>
                        <p style={{ fontSize: 13.5, lineHeight: 1.8, color: 'var(--sub)', margin: '0 0 16px' }}>
                          Network conditions or an ad blocker may prevent it from displaying.
                          <br />
                          Email us instead and we&apos;ll set up your trial:
                        </p>
                        <p style={{ fontSize: 14, margin: 0 }}>
                          <a href="mailto:contact@dynameet.ai?subject=Free%20trial%20request" className="v2-link" style={{ color: 'var(--cta-ink)', fontWeight: 800, textDecoration: 'none' }}>
                            contact@dynameet.ai
                          </a>
                        </p>
                      </div>
                    )}
                    <div id="trial-hubspot-form" ref={formRef} />
                  </div>
                </div>
              )}

              {!submitted && (
                <div className="tr-pills">
                  {['1-month free trial', 'No credit card required', 'Cancel anytime', 'Setup support included'].map((label) => (
                    <span key={label} className="tr-pill">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* SIDEBAR — FAQ + reassurance */}
            <aside>
              <div className="tr-info-card">
                {FAQ.map((f) => (
                  <div key={f.q} className="tr-faq-item">
                    <p className="tr-faq-q">{f.q}</p>
                    <p className="tr-faq-a">{f.a}</p>
                  </div>
                ))}
                <div className="tr-faq-item">
                  <p className="tr-faq-a">
                    Prefer a walkthrough first?{' '}
                    <a href="/en/contact/" className="v2-link" style={{ color: 'var(--cta-ink)', fontWeight: 700 }}>
                      Book a 30-minute demo
                    </a>{' '}
                    · Security details on the{' '}
                    <a href="/en/security/" className="v2-link" style={{ color: 'var(--cta-ink)', fontWeight: 700 }}>
                      Security page
                    </a>
                    .
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </>
  )
}
