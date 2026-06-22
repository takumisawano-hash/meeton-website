'use client'

import { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import DemoBookingButton from './DemoBookingButton'
import type { Lang } from '@/app/lib/i18n'

// Lang-aware contact UI chrome. JA is the default → the existing /contact/
// page renders byte-identically. The HubSpot form embed itself is unchanged.
const CONTACT_STR = {
  ja: {
    eyebrow: 'Contact · お問い合わせ',
    h1a: 'お気軽に',
    h1em: 'ご相談ください',
    h1b: '',
    subLine1: '製品に関するご質問、デモのご依頼、導入のご相談など、',
    subLine2: '下記フォームよりお寄せください。営業時間内に順次ご返信いたします。',
    hurryPrefix: 'お急ぎの方は',
    hurryCta: 'カレンダーから直接デモを予約',
    successH2: '送信ありがとうございます',
    successP1: '内容を確認のうえ、担当者より営業時間内に順次ご連絡いたします。',
    successP2: 'お急ぎの場合は、デモのご予約も承っております。',
    successCta: 'トップページに戻る',
    successHref: '/',
    cardNum: '01',
    cardTitle: 'お問い合わせフォーム',
    cardSub: '必要事項をご記入のうえ送信してください',
    loading: 'フォームを読み込み中...',
    failedTitle: 'フォームを読み込めませんでした',
    failedBody1: '通信環境や広告ブロッカーの影響で表示できない場合があります。',
    failedBody2: '再読み込みするか、カレンダーから直接デモをご予約ください。',
    failedDemoCta: '30分デモを予約する',
    failedReload: '再読み込み',
    emailLabel: 'メールでのお問い合わせ:',
    pills: ['営業時間内に順次ご返信', '平日 9:00–18:00 (JST)', '情報セキュリティ管理体制構築済み'],
    infoResponseLabel: 'Response',
    infoResponseTitle: 'ご返信のタイミング',
    infoResponseBody: '営業時間内（平日 9:00–18:00 JST）に順次ご返信いたします。土日祝・年末年始は翌営業日以降の対応となります。',
    infoDemoLabel: 'Quick Demo',
    infoDemoTitle: 'すぐにデモをご覧になりたい方',
    infoDemoBody: 'フォームを介さず、カレンダーから直接デモのご予約が可能です。',
    infoDemoBtn: 'デモを直接予約する',
    infoResourcesLabel: 'Resources',
    infoResourcesTitle: 'その他の窓口',
    resBlog: 'ブログを読む',
    resSecurity: '情報セキュリティについて',
    resLibrary: '導入事例・資料を見る',
    infoPrivacyLabel: 'Privacy',
    infoPrivacyBody: 'ご入力いただいた情報は、お問い合わせへの対応および当社サービスのご案内に限り利用いたします。',
  },
  en: {
    eyebrow: 'Contact',
    h1a: 'Feel free to ',
    h1em: 'reach out',
    h1b: ' to us',
    subLine1: 'For product questions, demo requests, or rollout consultations,',
    subLine2: 'please use the form below. We reply during business hours.',
    hurryPrefix: 'In a hurry?',
    hurryCta: 'Book a demo directly from the calendar',
    successH2: 'Thank you for reaching out',
    successP1: 'We will review your message and a representative will contact you during business hours.',
    successP2: 'If you are in a hurry, you can also book a demo.',
    successCta: 'Back to home',
    successHref: '/en/',
    cardNum: '01',
    cardTitle: 'Contact form',
    cardSub: 'Please fill in the required fields and submit',
    loading: 'Loading form...',
    failedTitle: 'We could not load the form',
    failedBody1: 'Network conditions or an ad blocker may prevent it from displaying.',
    failedBody2: 'Please reload, or book a demo directly from the calendar.',
    failedDemoCta: 'Book a 30-min demo',
    failedReload: 'Reload',
    emailLabel: 'Contact by email:',
    pills: ['Replies during business hours', 'Weekdays 9:00–18:00 (JST)', 'Information-security management in place'],
    infoResponseLabel: 'Response',
    infoResponseTitle: 'When we reply',
    infoResponseBody: 'We reply during business hours (weekdays 9:00–18:00 JST). Weekends, holidays, and the year-end/New Year period are handled on the next business day.',
    infoDemoLabel: 'Quick Demo',
    infoDemoTitle: 'Want to see a demo right away?',
    infoDemoBody: 'You can book a demo directly from the calendar, without going through the form.',
    infoDemoBtn: 'Book a demo directly',
    infoResourcesLabel: 'Resources',
    infoResourcesTitle: 'Other channels',
    resBlog: 'Read the blog',
    resSecurity: 'About information security',
    resLibrary: 'See customer stories & materials',
    infoPrivacyLabel: 'Privacy',
    infoPrivacyBody: 'The information you provide will be used only to respond to your inquiry and to inform you about our services.',
  },
} as const

export default function ContactPageClient({ lang = 'ja' }: { lang?: Lang }) {
  const c = CONTACT_STR[lang]
  const formRef = useRef<HTMLDivElement>(null)
  // 'loading' = skeleton, 'ready' = HubSpot form rendered, 'failed' =
  // embed never signaled ready (slow network / ad blocker) → fallback CTA
  const [formStatus, setFormStatus] = useState<'loading' | 'ready' | 'failed'>('loading')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Load HubSpot script
    if (document.getElementById('hubspot-script')) {
      if (window.hbspt) renderForm()
      else {
        document.getElementById('hubspot-script')?.addEventListener('load', renderForm)
      }
    } else {
      const script = document.createElement('script')
      script.id = 'hubspot-script'
      script.src = '//js-na2.hsforms.net/forms/embed/v2.js'
      script.charset = 'utf-8'
      script.async = true
      script.onload = renderForm
      document.head.appendChild(script)
    }

    // Failsafe (audit 2026-06-12): if the embed hasn't rendered after ~6s
    // (script blocked or very slow), swap the skeleton for real alternatives
    // instead of an empty dead-end card. onFormReady still flips the state
    // back to 'ready' if the form arrives late.
    const fallbackTimer = window.setTimeout(() => {
      setFormStatus((s) => {
        if (s !== 'loading') return s
        return formRef.current?.querySelector('form, iframe') ? 'ready' : 'failed'
      })
    }, 6000)
    return () => window.clearTimeout(fallbackTimer)
  }, [])

  function renderForm() {
    if (!formRef.current || !window.hbspt) return
    formRef.current.innerHTML = ''
    window.hbspt.forms.create({
      portalId: '45872857',
      formId: '08dc0777-eba7-419f-befe-70ae7bc44f02',
      region: 'na2',
      target: '#contact-hubspot-form',
      // create() returning is NOT the same as the form being in the DOM —
      // keep the skeleton until the embed actually signals ready.
      onFormReady: () => setFormStatus('ready'),
      onFormSubmitted: () => {
        setSubmitted(true)
        const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
        gtag?.('event', 'form_submit', {
          form_type: 'contact',
          form_id: '08dc0777-eba7-419f-befe-70ae7bc44f02',
        })
        gtag?.('event', 'generate_lead', { form_type: 'contact' })
      },
    })
  }

  return (
    <>
      <Nav lang={lang} />

      {/* Page-scoped styles: dot grid, glows, hairlines, form polish.
          Re-skinned to v2 tokens (audit 2026-06-12): navy frame, white
          canvas, green --cta as the single accent — purple/legacy-green
          hues removed. */}
      <style>{`
        .ct-dotgrid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(7,203,121,.07) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
        .ct-glow{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none}
        .ct-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:var(--fm);font-size:12px;font-weight:700;color:var(--cta-ink);letter-spacing:3px;text-transform:uppercase;margin-bottom:18px}
        .ct-eyebrow::before{content:'';width:24px;height:1px;background:linear-gradient(90deg,transparent,var(--cta))}
        .ct-eyebrow::after{content:'';width:24px;height:1px;background:linear-gradient(90deg,var(--cta),transparent)}
        .ct-h1{font-family:var(--fd);font-size:clamp(32px,5.4vw,52px);font-weight:900;color:var(--heading);line-height:1.14;letter-spacing:-.025em;margin-bottom:18px}
        .ct-h1 em{font-style:normal;color:var(--cta-ink)}
        .ct-sub{font-size:clamp(15px,2vw,18px);line-height:1.8;color:var(--sub);max-width:640px;margin:0 auto}

        .ct-grid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:clamp(20px,3vw,32px);align-items:start}
        @media (max-width:900px){.ct-grid{grid-template-columns:1fr}}

        .ct-card{background:#fff;border-radius:var(--r-feature);border:1.5px solid var(--border);box-shadow:0 12px 40px rgba(15,17,40,.05),0 1px 2px rgba(15,17,40,.03);overflow:hidden}
        .ct-card-h{padding:clamp(20px,3vw,28px) clamp(20px,3vw,32px);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:14px}
        .ct-card-h-num{font-family:var(--fm);font-size:11px;font-weight:700;color:var(--cta-ink);letter-spacing:2px;padding:5px 9px;border-radius:6px;background:var(--cta-light);border:1px solid var(--cta-border)}
        .ct-card-h-title{font-size:15px;font-weight:800;color:var(--heading);letter-spacing:-.01em}
        .ct-card-h-sub{font-size:12.5px;color:var(--sub);margin-top:2px}
        .ct-card-body{padding:clamp(20px,3vw,32px)}

        /* HubSpot form overrides — preserve native structure */
        #contact-hubspot-form .hs-form-field{margin-bottom:18px}
        #contact-hubspot-form .hs-form-field > label{display:block;font-size:13px;font-weight:700;color:var(--heading);margin-bottom:8px;letter-spacing:.005em}
        #contact-hubspot-form .hs-form-field > label .hs-form-required{color:#dc2626;margin-left:4px}
        #contact-hubspot-form .hs-field-desc{font-size:12px;color:var(--sub);margin-bottom:6px}
        #contact-hubspot-form input[type="text"],
        #contact-hubspot-form input[type="email"],
        #contact-hubspot-form input[type="tel"],
        #contact-hubspot-form input[type="number"],
        #contact-hubspot-form input[type="url"],
        #contact-hubspot-form select,
        #contact-hubspot-form textarea{
          width:100%;
          min-height:48px;
          padding:12px 14px;
          font-size:15px;
          font-family:inherit;
          color:var(--heading);
          background:var(--surface);
          border:1.5px solid var(--border2);
          border-radius:10px;
          transition:border-color .18s, box-shadow .18s, background .18s;
          -webkit-appearance:none;
          appearance:none;
          box-sizing:border-box;
        }
        #contact-hubspot-form textarea{min-height:120px;line-height:1.6;resize:vertical}
        #contact-hubspot-form select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23656D8A' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:40px}
        #contact-hubspot-form input:focus,
        #contact-hubspot-form select:focus,
        #contact-hubspot-form textarea:focus{outline:none;border-color:var(--cta);background:#fff;box-shadow:0 0 0 4px rgba(7,203,121,.16)}
        #contact-hubspot-form input::placeholder,
        #contact-hubspot-form textarea::placeholder{color:#9ca3af}
        #contact-hubspot-form .hs-error-msgs{list-style:none;padding:0;margin:6px 0 0;font-size:12.5px;color:#dc2626}
        #contact-hubspot-form .hs-error-msg{color:#dc2626}
        #contact-hubspot-form input.invalid,
        #contact-hubspot-form select.invalid,
        #contact-hubspot-form textarea.invalid{border-color:#dc2626;background:#fff5f5}
        #contact-hubspot-form .hs-form-booleancheckbox label,
        #contact-hubspot-form .hs-form-checkbox label,
        #contact-hubspot-form .hs-form-radio label{display:flex;align-items:flex-start;gap:10px;font-size:13.5px;color:var(--text);line-height:1.6;cursor:pointer;font-weight:500}
        #contact-hubspot-form .hs-form-booleancheckbox input,
        #contact-hubspot-form .hs-form-checkbox input,
        #contact-hubspot-form .hs-form-radio input{margin-top:3px;accent-color:var(--cta)}
        #contact-hubspot-form .legal-consent-container{margin-top:8px;padding:14px;border-radius:10px;background:var(--surface);border:1px solid var(--border);font-size:12.5px;line-height:1.65;color:var(--sub)}
        #contact-hubspot-form .legal-consent-container p{margin:0 0 4px}
        #contact-hubspot-form .hs-fieldtype-intl-phone .input{display:flex;gap:8px}
        #contact-hubspot-form .hs-fieldtype-intl-phone select{flex:0 0 100px}
        #contact-hubspot-form .hs-submit{margin-top:8px}
        #contact-hubspot-form .actions{margin-top:4px}
        #contact-hubspot-form .hs-button{
          width:100%;
          min-height:52px;
          padding:14px 28px;
          font-size:16px;
          font-weight:800;
          color:var(--on-cta);
          font-family:inherit;
          background:var(--cta);
          border:none;
          border-radius:var(--r-btn);
          cursor:pointer;
          letter-spacing:.01em;
          box-shadow:0 6px 22px var(--cta-glow);
          transition:background .18s, box-shadow .18s, transform .12s;
        }
        /* mirror .v2-cta-primary states (class can't be added to HubSpot's injected button) */
        #contact-hubspot-form .hs-button:hover{background:var(--cta-hover);transform:translateY(-1px);box-shadow:0 2px 6px rgba(15,17,40,.14),0 8px 20px -8px rgba(6,184,109,.45)}
        #contact-hubspot-form .hs-button:active{background:var(--cta-press);transform:translateY(1px);box-shadow:0 1px 3px rgba(15,17,40,.12)}
        #contact-hubspot-form .hs-button:disabled{opacity:.6;cursor:not-allowed;transform:none;box-shadow:0 3px 10px rgba(7,203,121,.16)}
        #contact-hubspot-form .submitted-message{padding:16px 0;color:var(--text);font-size:15px;line-height:1.7}
        #contact-hubspot-form fieldset{max-width:none !important;border:none;padding:0;margin:0}
        #contact-hubspot-form fieldset.form-columns-2 .hs-form-field{width:100% !important;padding-right:0 !important}
        @media (min-width:600px){
          #contact-hubspot-form fieldset.form-columns-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        }
        #contact-hubspot-form fieldset .input{margin-right:0 !important}

        .ct-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px}
        .ct-pill{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;background:var(--cta-wash);border:1px solid var(--cta-border);font-size:12.5px;font-weight:600;color:var(--cta-ink);letter-spacing:.01em}
        .ct-pill svg{flex-shrink:0;color:var(--cta-ink)}

        .ct-info-card{background:linear-gradient(180deg,rgba(255,255,255,.85) 0%,rgba(246,248,251,.92) 100%);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:var(--r-feature);border:1.5px solid var(--border);box-shadow:0 12px 40px rgba(15,17,40,.05);padding:clamp(22px,3vw,28px);position:sticky;top:96px}
        @media (max-width:900px){.ct-info-card{position:static}}
        .ct-info-section{padding:18px 0;border-bottom:1px solid var(--border)}
        .ct-info-section:first-child{padding-top:0}
        .ct-info-section:last-child{border-bottom:none;padding-bottom:0}
        .ct-info-label{font-family:var(--fm);font-size:10.5px;font-weight:700;color:var(--cta-ink);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px}
        .ct-info-title{font-size:15px;font-weight:800;color:var(--heading);margin-bottom:4px;letter-spacing:-.005em}
        .ct-info-body{font-size:13.5px;color:var(--sub);line-height:1.7}

        .ct-alt-btn{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:14px 16px;background:#fff;border:1.5px solid var(--cta-border);border-radius:var(--r-btn);color:var(--heading);font-size:14px;font-weight:700;font-family:inherit;cursor:pointer;transition:transform .2s,border-color .2s,box-shadow .2s;text-align:left;letter-spacing:.005em;text-decoration:none}
        .ct-alt-btn:hover{transform:translateY(-1px);border-color:var(--cta);box-shadow:0 8px 20px rgba(7,203,121,.14)}
        .ct-alt-btn-arrow{color:var(--cta-ink);flex-shrink:0;transition:transform .2s}
        .ct-alt-btn:hover .ct-alt-btn-arrow{transform:translateX(2px)}
        .ct-alt-link{display:inline-flex;align-items:center;gap:6px;color:var(--cta-ink);font-size:13px;font-weight:700;text-decoration:none;border-bottom:1px solid transparent;transition:border-color .2s}
        .ct-alt-link:hover{border-bottom-color:var(--cta-ink)}

        .ct-success{text-align:center;padding:clamp(40px,6vw,56px) clamp(22px,4vw,40px)}
        .ct-success-icon{width:72px;height:72px;border-radius:50%;background:var(--cta);color:var(--on-cta);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;box-shadow:0 14px 36px var(--cta-glow)}
        .ct-success h2{font-size:clamp(22px,3.6vw,28px);font-weight:900;color:var(--heading);margin-bottom:14px;letter-spacing:-.018em}
        .ct-success p{font-size:clamp(14px,2vw,15.5px);color:var(--sub);line-height:1.8;margin-bottom:32px;max-width:480px;margin-left:auto;margin-right:auto}
        .ct-success-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 30px;background:var(--cta);color:var(--on-cta);border-radius:var(--r-btn);font-weight:800;font-size:15px;text-decoration:none;box-shadow:0 6px 22px var(--cta-glow)}
      `}</style>

      <main style={{
        paddingTop: 'clamp(72px, 11vw, 100px)',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg) 32%)',
        color: 'var(--text)',
      }}>
        {/* HERO HEADER */}
        <section style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(36px, 6vw, 64px) clamp(16px, 4vw, 28px) clamp(20px, 3vw, 32px)',
        }}>
          <div className="ct-dotgrid" style={{ opacity: 0.55 }} />
          <div className="ct-glow" style={{
            top: '-6%', left: '4%',
            width: 'min(46vw, 440px)', height: 'min(46vw, 440px)',
            background: 'radial-gradient(circle, rgba(7,203,121,0.18) 0%, rgba(7,203,121,0) 70%)',
          }} />
          <div className="ct-glow" style={{
            top: '8%', right: '4%',
            width: 'min(40vw, 360px)', height: 'min(40vw, 360px)',
            background: 'radial-gradient(circle, rgba(15,17,40,0.07) 0%, rgba(15,17,40,0) 70%)',
          }} />

          <div style={{
            position: 'relative',
            maxWidth: 880,
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <div className="ct-eyebrow">{c.eyebrow}</div>
            <h1 className="ct-h1">
              {c.h1a}<em>{c.h1em}</em>{c.h1b}
            </h1>
            <p className="ct-sub">
              {c.subLine1}<br />
              {c.subLine2}
            </p>

            {/* 2026-05-19: お急ぎ向けの即時デモ予約導線を hero 内に昇格
                (外部レビュー指摘)。Meeton ai は「5秒対応」を売り、
                contact page だけ「営業時間内順次返信」だと矛盾するため
                即時アクション窓口を H1 直下に明示。 */}
            <div
              style={{
                marginTop: 28,
                padding: '14px 22px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--cta-border)',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--heading)',
                flexWrap: 'wrap',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(15,17,40,0.06)',
              }}
            >
              <span>{c.hurryPrefix}</span>
              <DemoBookingButton
                utmCampaign="contact-hero"
                className="v2-cta-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 16px',
                  background: 'var(--cta)',
                  color: 'var(--on-cta)',
                  borderRadius: 999,
                  fontWeight: 800,
                  fontSize: 13,
                  textDecoration: 'none',
                }}
              >
                {c.hurryCta}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </DemoBookingButton>
            </div>
          </div>
        </section>

        {/* MAIN GRID: FORM + INFO SIDEBAR */}
        <section style={{
          position: 'relative',
          maxWidth: 1180,
          margin: '0 auto',
          padding: 'clamp(8px, 2vw, 24px) clamp(16px, 4vw, 28px) clamp(48px, 7vw, 72px)',
        }}>
          <div className="ct-grid">
            {/* LEFT — FORM CARD */}
            <div>
              {submitted ? (
                <div className="ct-card">
                  <div className="ct-success">
                    <div className="ct-success-icon">
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h2>{c.successH2}</h2>
                    <p>
                      {c.successP1}<br />
                      {c.successP2}
                    </p>
                    <a href={c.successHref} className="ct-success-cta v2-cta-primary">
                      {c.successCta}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="ct-card">
                  <div className="ct-card-h">
                    <span className="ct-card-h-num">{c.cardNum}</span>
                    <div>
                      <div className="ct-card-h-title">{c.cardTitle}</div>
                      <div className="ct-card-h-sub">{c.cardSub}</div>
                    </div>
                  </div>
                  <div className="ct-card-body">
                    {formStatus === 'loading' && (
                      <div role="status" style={{
                        textAlign: 'center',
                        padding: '40px 0',
                        color: 'var(--sub)',
                        fontSize: 14,
                      }}>
                        {c.loading}
                      </div>
                    )}
                    {formStatus === 'failed' && (
                      <div role="alert" style={{ textAlign: 'center', padding: '32px 8px' }}>
                        <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--heading)', margin: '0 0 8px' }}>
                          {c.failedTitle}
                        </p>
                        <p style={{ fontSize: 13.5, lineHeight: 1.8, color: 'var(--sub)', margin: '0 0 20px' }}>
                          {c.failedBody1}<br />
                          {c.failedBody2}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 16 }}>
                          <DemoBookingButton
                            utmCampaign="contact-form-fallback"
                            className="v2-cta-primary"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 8,
                              padding: '12px 22px',
                              background: 'var(--cta)',
                              color: 'var(--on-cta)',
                              borderRadius: 'var(--r-btn)',
                              fontWeight: 800,
                              fontSize: 14,
                              textDecoration: 'none',
                            }}
                          >
                            {c.failedDemoCta}
                          </DemoBookingButton>
                          <button
                            type="button"
                            className="v2-cta-ghost"
                            onClick={() => window.location.reload()}
                            style={{
                              padding: '12px 22px',
                              background: '#fff',
                              border: '1.5px solid var(--border2)',
                              borderRadius: 'var(--r-btn)',
                              color: 'var(--heading)',
                              fontWeight: 700,
                              fontSize: 14,
                              fontFamily: 'inherit',
                              cursor: 'pointer',
                            }}
                          >
                            {c.failedReload}
                          </button>
                        </div>
                        <p style={{ fontSize: 12.5, color: 'var(--sub)', margin: 0 }}>
                          {c.emailLabel}{' '}
                          <a href="mailto:contact@dynameet.ai" className="v2-link" style={{ color: 'var(--cta-ink)', fontWeight: 700, textDecoration: 'none' }}>
                            contact@dynameet.ai
                          </a>
                        </p>
                      </div>
                    )}
                    <div id="contact-hubspot-form" ref={formRef} />
                  </div>
                </div>
              )}

              {/* TRUST PILLS */}
              {!submitted && (
                <div className="ct-pills">
                  {c.pills.map((label) => (
                    <span key={label} className="ct-pill">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT — INFO SIDEBAR */}
            <aside>
              <div className="ct-info-card">
                <div className="ct-info-section">
                  <div className="ct-info-label">{c.infoResponseLabel}</div>
                  <div className="ct-info-title">{c.infoResponseTitle}</div>
                  <div className="ct-info-body">
                    {c.infoResponseBody}
                  </div>
                </div>

                <div className="ct-info-section">
                  <div className="ct-info-label">{c.infoDemoLabel}</div>
                  <div className="ct-info-title" style={{ marginBottom: 10 }}>{c.infoDemoTitle}</div>
                  <div className="ct-info-body" style={{ marginBottom: 14 }}>
                    {c.infoDemoBody}
                  </div>
                  <DemoBookingButton utmCampaign="contact-sidebar" className="ct-alt-btn">
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, width: '100%' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {c.infoDemoBtn}
                      </span>
                      <svg className="ct-alt-btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </DemoBookingButton>
                </div>

                <div className="ct-info-section">
                  <div className="ct-info-label">{c.infoResourcesLabel}</div>
                  <div className="ct-info-title" style={{ marginBottom: 12 }}>{c.infoResourcesTitle}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <a href="/blog/" className="ct-alt-link">
                      {c.resBlog}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                    <a href="/security/" className="ct-alt-link">
                      {c.resSecurity}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                    <a href={lang === 'en' ? '/en/library/' : '/library/'} className="ct-alt-link">
                      {c.resLibrary}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="ct-info-section">
                  <div className="ct-info-label">{c.infoPrivacyLabel}</div>
                  <div className="ct-info-body" style={{ fontSize: 12.5, lineHeight: 1.7 }}>
                    {c.infoPrivacyBody}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  )
}
