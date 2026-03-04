'use client'

import { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'

export default function ContactPageClient() {
  const formRef = useRef<HTMLDivElement>(null)
  const [formLoaded, setFormLoaded] = useState(false)

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
        </section>
      </main>
      <Footer />
    </>
  )
}
