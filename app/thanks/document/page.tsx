import type { Metadata } from 'next'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: '資料請求ありがとうございます',
  robots: { index: false, follow: false },
}

export default function DocumentThanksPage() {
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <h1 style={{
            fontSize: 'clamp(24px, 4.5vw, 32px)',
            fontWeight: 800,
            color: '#1a1a2e',
            marginBottom: 16,
            lineHeight: 1.3,
          }}>
            資料請求ありがとうございます
          </h1>
          <p style={{
            fontSize: 'clamp(15px, 2vw, 17px)',
            color: '#6e7494',
            lineHeight: 1.8,
            marginBottom: 40,
          }}>
            ご入力いただいたメールアドレスに<br />資料をお送りしました。ご確認ください。
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
