import type { Metadata } from 'next'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'ご予約ありがとうございます',
  robots: { index: false, follow: false },
}

export default function MeetingThanksPage() {
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
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <polyline points="10 14 12 16 16 12" />
            </svg>
          </div>
          <h1 style={{
            fontSize: 'clamp(24px, 4.5vw, 32px)',
            fontWeight: 800,
            color: '#1a1a2e',
            marginBottom: 16,
            lineHeight: 1.3,
          }}>
            ご予約ありがとうございます
          </h1>
          <p style={{
            fontSize: 'clamp(15px, 2vw, 17px)',
            color: '#6e7494',
            lineHeight: 1.8,
            marginBottom: 40,
          }}>
            確認メールをお送りしました。<br />当日お会いできることを楽しみにしています。
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
