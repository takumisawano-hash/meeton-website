import type { Metadata } from 'next'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'お問い合わせありがとうございます',
  robots: { index: false, follow: false },
}

export default function ContactThanksPage() {
  return (
    <>
      <Nav />
      <main style={{
        paddingTop: 'clamp(70px, 12vw, 100px)',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8fafc 0%, #fff 50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <section style={{
          maxWidth: 560,
          margin: '0 auto',
          padding: 'clamp(30px, 6vw, 60px) clamp(16px, 4vw, 24px) clamp(80px, 12vw, 120px)',
          textAlign: 'center',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #12a37d, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 28px',
            boxShadow: '0 8px 32px rgba(18,163,125,0.25)',
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 style={{
            fontSize: 'clamp(24px, 4.5vw, 32px)',
            fontWeight: 800,
            color: '#1a1a2e',
            marginBottom: 16,
            lineHeight: 1.3,
          }}>
            お問い合わせありがとうございます
          </h1>
          <p style={{
            fontSize: 'clamp(15px, 2vw, 17px)',
            color: '#6e7494',
            lineHeight: 1.8,
            marginBottom: 40,
          }}>
            内容を確認のうえ、担当者より<br />2営業日以内にご連絡いたします。
          </p>
          <a
            href="/"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              background: 'linear-gradient(135deg, #12a37d, #0d8a6a)',
              color: '#fff',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
            }}
          >
            トップページに戻る
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
