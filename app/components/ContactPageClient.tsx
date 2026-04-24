'use client'

import { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'

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
      <main style={{
        paddingTop: 'clamp(70px, 12vw, 100px)',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8fafc 0%, #fff 50%)',
      }}>
        <section style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: 'clamp(30px, 6vw, 60px) clamp(16px, 4vw, 24px) clamp(50px, 8vw, 80px)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 48px)' }}>
            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 800,
              color: '#1a1a2e',
              marginBottom: 16,
              lineHeight: 1.3,
            }}>
              お問い合わせ
            </h1>
            <p style={{
              fontSize: 'clamp(15px, 2vw, 17px)',
              color: '#6e7494',
              lineHeight: 1.7,
            }}>
              製品に関するご質問、デモのご依頼、導入のご相談など、<br />
              お気軽にお問い合わせください。
            </p>
          </div>

          {submitted ? (
            <div style={{
              background: '#fff',
              borderRadius: 16,
              padding: 'clamp(40px, 6vw, 64px) clamp(24px, 4vw, 40px)',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              textAlign: 'center',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg, #12a37d, #3b82f6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 style={{
                fontSize: 'clamp(22px, 4vw, 28px)',
                fontWeight: 800,
                color: '#1a1a2e',
                marginBottom: 12,
              }}>
                お問い合わせありがとうございます
              </h2>
              <p style={{
                fontSize: 'clamp(14px, 2vw, 16px)',
                color: '#6e7494',
                lineHeight: 1.7,
                marginBottom: 32,
              }}>
                内容を確認のうえ、担当者より2営業日以内にご連絡いたします。
              </p>
              <a
                href="/"
                style={{
                  display: 'inline-block',
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg, #12a37d, #0d8a6a)',
                  color: '#fff',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(18,163,125,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                トップページに戻る
              </a>
            </div>
          ) : (
            <div style={{
              background: '#fff',
              borderRadius: 16,
              padding: 'clamp(24px, 4vw, 40px)',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
            }}>
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
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
