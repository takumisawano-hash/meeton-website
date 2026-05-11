'use client'

import { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import DemoBookingButton from './DemoBookingButton'

export default function ContactPageClient() {
  const formRef = useRef<HTMLDivElement>(null)
  const [formLoaded, setFormLoaded] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Load HubSpot script
    if (document.getElementById('hubspot-script')) {
      if (window.hbspt) renderForm()
      else {
        document.getElementById('hubspot-script')?.addEventListener('load', renderForm)
      }
      return
    }

    const script = document.createElement('script')
    script.id = 'hubspot-script'
    script.src = '//js-na2.hsforms.net/forms/embed/v2.js'
    script.charset = 'utf-8'
    script.async = true
    script.onload = renderForm
    document.head.appendChild(script)
  }, [])

  function renderForm() {
    if (!formRef.current || !window.hbspt) return
    formRef.current.innerHTML = ''
    window.hbspt.forms.create({
      portalId: '45872857',
      formId: '08dc0777-eba7-419f-befe-70ae7bc44f02',
      region: 'na2',
      target: '#contact-hubspot-form',
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
    setFormLoaded(true)
  }

  return (
    <>
      <Nav />

      {/* Page-scoped styles: dot grid, glows, hairlines, form polish */}
      <style>{`
        .ct-dotgrid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(18,163,125,.08) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
        .ct-glow{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none}
        .ct-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',var(--font-mono),monospace;font-size:12px;font-weight:700;color:#0f8a68;letter-spacing:3px;text-transform:uppercase;margin-bottom:18px}
        .ct-eyebrow::before{content:'';width:24px;height:1px;background:linear-gradient(90deg,transparent,#12a37d)}
        .ct-eyebrow::after{content:'';width:24px;height:1px;background:linear-gradient(90deg,#12a37d,transparent)}
        .ct-h1{font-size:clamp(32px,5.4vw,52px);font-weight:900;color:#0b1e1a;line-height:1.14;letter-spacing:-.025em;margin-bottom:18px}
        .ct-h1 em{font-style:normal;background:linear-gradient(135deg,#12a37d,#7c5cfc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .ct-sub{font-size:clamp(15px,2vw,18px);line-height:1.8;color:#5b6478;max-width:640px;margin:0 auto}

        .ct-grid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:clamp(20px,3vw,32px);align-items:start}
        @media (max-width:900px){.ct-grid{grid-template-columns:1fr}}

        .ct-card{background:#fff;border-radius:20px;border:1.5px solid rgba(11,30,26,.08);box-shadow:0 12px 40px rgba(11,30,26,.05),0 1px 2px rgba(11,30,26,.03);overflow:hidden}
        .ct-card-h{padding:clamp(20px,3vw,28px) clamp(20px,3vw,32px);border-bottom:1px solid rgba(11,30,26,.06);display:flex;align-items:center;gap:14px}
        .ct-card-h-num{font-family:'JetBrains Mono',var(--font-mono),monospace;font-size:11px;font-weight:700;color:#12a37d;letter-spacing:2px;padding:5px 9px;border-radius:6px;background:rgba(18,163,125,.08);border:1px solid rgba(18,163,125,.16)}
        .ct-card-h-title{font-size:15px;font-weight:800;color:#0b1e1a;letter-spacing:-.01em}
        .ct-card-h-sub{font-size:12.5px;color:#6e7494;margin-top:2px}
        .ct-card-body{padding:clamp(20px,3vw,32px)}

        /* HubSpot form overrides — preserve native structure */
        #contact-hubspot-form .hs-form-field{margin-bottom:18px}
        #contact-hubspot-form .hs-form-field > label{display:block;font-size:13px;font-weight:700;color:#0b1e1a;margin-bottom:8px;letter-spacing:.005em}
        #contact-hubspot-form .hs-form-field > label .hs-form-required{color:#dc2626;margin-left:4px}
        #contact-hubspot-form .hs-field-desc{font-size:12px;color:#6e7494;margin-bottom:6px}
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
          color:#0b1e1a;
          background:#fbfcfd;
          border:1.5px solid rgba(11,30,26,.1);
          border-radius:10px;
          transition:border-color .18s, box-shadow .18s, background .18s;
          -webkit-appearance:none;
          appearance:none;
          box-sizing:border-box;
        }
        #contact-hubspot-form textarea{min-height:120px;line-height:1.6;resize:vertical}
        #contact-hubspot-form select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236e7494' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:40px}
        #contact-hubspot-form input:focus,
        #contact-hubspot-form select:focus,
        #contact-hubspot-form textarea:focus{outline:none;border-color:#12a37d;background:#fff;box-shadow:0 0 0 4px rgba(18,163,125,.14)}
        #contact-hubspot-form input::placeholder,
        #contact-hubspot-form textarea::placeholder{color:#9ca3af}
        #contact-hubspot-form .hs-error-msgs{list-style:none;padding:0;margin:6px 0 0;font-size:12.5px;color:#dc2626}
        #contact-hubspot-form .hs-error-msg{color:#dc2626}
        #contact-hubspot-form input.invalid,
        #contact-hubspot-form select.invalid,
        #contact-hubspot-form textarea.invalid{border-color:#dc2626;background:#fff5f5}
        #contact-hubspot-form .hs-form-booleancheckbox label,
        #contact-hubspot-form .hs-form-checkbox label,
        #contact-hubspot-form .hs-form-radio label{display:flex;align-items:flex-start;gap:10px;font-size:13.5px;color:#3a4156;line-height:1.6;cursor:pointer;font-weight:500}
        #contact-hubspot-form .hs-form-booleancheckbox input,
        #contact-hubspot-form .hs-form-checkbox input,
        #contact-hubspot-form .hs-form-radio input{margin-top:3px;accent-color:#12a37d}
        #contact-hubspot-form .legal-consent-container{margin-top:8px;padding:14px;border-radius:10px;background:#f7faf9;border:1px solid rgba(11,30,26,.06);font-size:12.5px;line-height:1.65;color:#5b6478}
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
          color:#fff;
          font-family:inherit;
          background:linear-gradient(135deg,#12a37d,#0d8a6a);
          border:none;
          border-radius:12px;
          cursor:pointer;
          letter-spacing:.01em;
          box-shadow:0 6px 20px rgba(18,163,125,.28),0 1px 0 rgba(255,255,255,.18) inset;
          transition:transform .2s cubic-bezier(.16,1,.3,1), box-shadow .25s, background .2s;
        }
        #contact-hubspot-form .hs-button:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(18,163,125,.36),0 1px 0 rgba(255,255,255,.22) inset}
        #contact-hubspot-form .hs-button:active{transform:translateY(0)}
        #contact-hubspot-form .hs-button:disabled{opacity:.6;cursor:not-allowed;transform:none;box-shadow:0 4px 12px rgba(18,163,125,.18)}
        #contact-hubspot-form .submitted-message{padding:16px 0;color:#0b1e1a;font-size:15px;line-height:1.7}
        #contact-hubspot-form fieldset{max-width:none !important;border:none;padding:0;margin:0}
        #contact-hubspot-form fieldset.form-columns-2 .hs-form-field{width:100% !important;padding-right:0 !important}
        @media (min-width:600px){
          #contact-hubspot-form fieldset.form-columns-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        }
        #contact-hubspot-form fieldset .input{margin-right:0 !important}

        .ct-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px}
        .ct-pill{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:999px;background:rgba(18,163,125,.06);border:1px solid rgba(18,163,125,.16);font-size:12.5px;font-weight:600;color:#0b3d2f;letter-spacing:.01em}
        .ct-pill svg{flex-shrink:0;color:#12a37d}

        .ct-info-card{background:linear-gradient(180deg,rgba(255,255,255,.85) 0%,rgba(247,250,249,.92) 100%);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:20px;border:1.5px solid rgba(11,30,26,.08);box-shadow:0 12px 40px rgba(11,30,26,.05);padding:clamp(22px,3vw,28px);position:sticky;top:96px}
        @media (max-width:900px){.ct-info-card{position:static}}
        .ct-info-section{padding:18px 0;border-bottom:1px solid rgba(11,30,26,.06)}
        .ct-info-section:first-child{padding-top:0}
        .ct-info-section:last-child{border-bottom:none;padding-bottom:0}
        .ct-info-label{font-family:'JetBrains Mono',var(--font-mono),monospace;font-size:10.5px;font-weight:700;color:#0f8a68;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px}
        .ct-info-title{font-size:15px;font-weight:800;color:#0b1e1a;margin-bottom:4px;letter-spacing:-.005em}
        .ct-info-body{font-size:13.5px;color:#5b6478;line-height:1.7}

        .ct-alt-btn{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:14px 16px;background:#fff;border:1.5px solid rgba(18,163,125,.22);border-radius:12px;color:#0b3d2f;font-size:14px;font-weight:700;font-family:inherit;cursor:pointer;transition:transform .2s,border-color .2s,box-shadow .2s;text-align:left;letter-spacing:.005em}
        .ct-alt-btn:hover{transform:translateY(-1px);border-color:#12a37d;box-shadow:0 8px 20px rgba(18,163,125,.14)}
        .ct-alt-btn-arrow{color:#12a37d;flex-shrink:0;transition:transform .2s}
        .ct-alt-btn:hover .ct-alt-btn-arrow{transform:translateX(2px)}
        .ct-alt-link{display:inline-flex;align-items:center;gap:6px;color:#0f8a68;font-size:13px;font-weight:700;text-decoration:none;border-bottom:1px solid transparent;transition:border-color .2s}
        .ct-alt-link:hover{border-bottom-color:#0f8a68}

        .ct-success{text-align:center;padding:clamp(40px,6vw,56px) clamp(22px,4vw,40px)}
        .ct-success-icon{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#12a37d,#7c5cfc);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;box-shadow:0 14px 36px rgba(18,163,125,.28)}
        .ct-success h2{font-size:clamp(22px,3.6vw,28px);font-weight:900;color:#0b1e1a;margin-bottom:14px;letter-spacing:-.018em}
        .ct-success p{font-size:clamp(14px,2vw,15.5px);color:#5b6478;line-height:1.8;margin-bottom:32px;max-width:480px;margin-left:auto;margin-right:auto}
        .ct-success-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 30px;background:linear-gradient(135deg,#12a37d,#0d8a6a);color:#fff;border-radius:12px;font-weight:800;font-size:15px;text-decoration:none;transition:transform .2s,box-shadow .2s;box-shadow:0 6px 20px rgba(18,163,125,.28)}
        .ct-success-cta:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(18,163,125,.36)}
      `}</style>

      <main style={{
        paddingTop: 'clamp(72px, 11vw, 100px)',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f3f8f7 0%, #fbfdfc 28%, #ffffff 100%)',
        color: '#0b1e1a',
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
            background: 'radial-gradient(circle, rgba(18,163,125,0.22) 0%, rgba(18,163,125,0) 70%)',
          }} />
          <div className="ct-glow" style={{
            top: '8%', right: '4%',
            width: 'min(40vw, 360px)', height: 'min(40vw, 360px)',
            background: 'radial-gradient(circle, rgba(124,92,252,0.18) 0%, rgba(124,92,252,0) 70%)',
          }} />

          <div style={{
            position: 'relative',
            maxWidth: 880,
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <div className="ct-eyebrow">Contact · お問い合わせ</div>
            <h1 className="ct-h1">
              お気軽に<em>ご相談ください</em>
            </h1>
            <p className="ct-sub">
              製品に関するご質問、デモのご依頼、導入のご相談など、<br />
              下記フォームよりお寄せください。営業時間内に順次ご返信いたします。
            </p>
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
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h2>送信ありがとうございます</h2>
                    <p>
                      内容を確認のうえ、担当者より営業時間内に順次ご連絡いたします。<br />
                      お急ぎの場合は、デモのご予約も承っております。
                    </p>
                    <a href="/" className="ct-success-cta">
                      トップページに戻る
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
                    <span className="ct-card-h-num">01</span>
                    <div>
                      <div className="ct-card-h-title">お問い合わせフォーム</div>
                      <div className="ct-card-h-sub">必要事項をご記入のうえ送信してください</div>
                    </div>
                  </div>
                  <div className="ct-card-body">
                    {!formLoaded && (
                      <div style={{
                        textAlign: 'center',
                        padding: '40px 0',
                        color: '#9ca3af',
                        fontSize: 14,
                      }}>
                        フォームを読み込み中...
                      </div>
                    )}
                    <div id="contact-hubspot-form" ref={formRef} />
                  </div>
                </div>
              )}

              {/* TRUST PILLS */}
              {!submitted && (
                <div className="ct-pills">
                  {[
                    '営業時間内に順次ご返信',
                    '平日 9:00–18:00 (JST)',
                    '情報セキュリティ管理体制構築済み',
                  ].map((label) => (
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
                  <div className="ct-info-label">Response</div>
                  <div className="ct-info-title">ご返信のタイミング</div>
                  <div className="ct-info-body">
                    営業時間内（平日 9:00–18:00 JST）に順次ご返信いたします。土日祝・年末年始は翌営業日以降の対応となります。
                  </div>
                </div>

                <div className="ct-info-section">
                  <div className="ct-info-label">Quick Demo</div>
                  <div className="ct-info-title" style={{ marginBottom: 10 }}>すぐにデモをご覧になりたい方</div>
                  <div className="ct-info-body" style={{ marginBottom: 14 }}>
                    フォームを介さず、カレンダーから直接デモのご予約が可能です。
                  </div>
                  <DemoBookingButton utmCampaign="contact-sidebar">
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, width: '100%' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        デモを直接予約する
                      </span>
                      <svg className="ct-alt-btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </DemoBookingButton>
                </div>

                <div className="ct-info-section">
                  <div className="ct-info-label">Resources</div>
                  <div className="ct-info-title" style={{ marginBottom: 12 }}>その他の窓口</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <a href="/blog/" className="ct-alt-link">
                      ブログを読む
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                    <a href="/security/" className="ct-alt-link">
                      情報セキュリティについて
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                    <a href="/library/" className="ct-alt-link">
                      導入事例・資料を見る
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="ct-info-section">
                  <div className="ct-info-label">Privacy</div>
                  <div className="ct-info-body" style={{ fontSize: 12.5, lineHeight: 1.7 }}>
                    ご入力いただいた情報は、お問い合わせへの対応および当社サービスのご案内に限り利用いたします。
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
