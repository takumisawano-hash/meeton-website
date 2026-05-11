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
      <style>{`
        .th-dotgrid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(18,163,125,.08) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
        .th-glow{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none}
        .th-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',var(--font-mono),monospace;font-size:12px;font-weight:700;color:#0f8a68;letter-spacing:3px;text-transform:uppercase;margin-bottom:18px;justify-content:center}
        .th-eyebrow::before,.th-eyebrow::after{content:'';width:24px;height:1px;background:#12a37d}
        .th-eyebrow::before{background:linear-gradient(90deg,transparent,#12a37d)}
        .th-eyebrow::after{background:linear-gradient(90deg,#12a37d,transparent)}
        .th-h1{font-size:clamp(28px,4.6vw,40px);font-weight:900;color:#0b1e1a;line-height:1.18;letter-spacing:-.022em;margin-bottom:16px}
        .th-h1 em{font-style:normal;background:linear-gradient(135deg,#12a37d,#7c5cfc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .th-sub{font-size:clamp(15px,2vw,17px);line-height:1.85;color:#5b6478;max-width:540px;margin:0 auto 36px}
        .th-card{background:linear-gradient(180deg,rgba(255,255,255,.92) 0%,rgba(247,250,249,.95) 100%);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:20px;border:1.5px solid rgba(11,30,26,.08);box-shadow:0 18px 50px rgba(11,30,26,.06);padding:clamp(20px,3vw,28px);max-width:520px;margin:0 auto 36px;text-align:left}
        .th-step{display:flex;align-items:flex-start;gap:14px;padding:14px 0;border-bottom:1px solid rgba(11,30,26,.06)}
        .th-step:last-child{border-bottom:none}
        .th-step-num{font-family:'JetBrains Mono',var(--font-mono),monospace;font-size:11px;font-weight:700;color:#12a37d;letter-spacing:2px;flex-shrink:0;width:32px;height:32px;border-radius:8px;background:rgba(18,163,125,.08);border:1px solid rgba(18,163,125,.18);display:inline-flex;align-items:center;justify-content:center}
        .th-step-t{font-size:14.5px;font-weight:700;color:#0b1e1a;margin-bottom:4px;letter-spacing:-.005em}
        .th-step-d{font-size:13px;color:#5b6478;line-height:1.65}
        .th-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
        .th-cta{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:12px;font-weight:800;font-size:15px;text-decoration:none;transition:transform .2s,box-shadow .2s,border-color .2s}
        .th-cta-primary{background:linear-gradient(135deg,#12a37d,#0d8a6a);color:#fff;box-shadow:0 6px 20px rgba(18,163,125,.28)}
        .th-cta-primary:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(18,163,125,.36)}
        .th-cta-ghost{background:#fff;color:#0b3d2f;border:1.5px solid rgba(18,163,125,.22)}
        .th-cta-ghost:hover{transform:translateY(-1px);border-color:#12a37d;box-shadow:0 8px 20px rgba(18,163,125,.14)}
        .th-icon{width:76px;height:76px;border-radius:50%;background:linear-gradient(135deg,#12a37d,#7c5cfc);display:flex;align-items:center;justify-content:center;margin:0 auto 28px;box-shadow:0 16px 40px rgba(18,163,125,.3)}
      `}</style>
      <main style={{
        paddingTop: 'clamp(72px, 11vw, 100px)',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f3f8f7 0%, #fbfdfc 28%, #ffffff 100%)',
        color: '#0b1e1a',
      }}>
        <section style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(36px, 6vw, 72px) clamp(16px, 4vw, 28px) clamp(56px, 9vw, 96px)',
        }}>
          <div className="th-dotgrid" style={{ opacity: 0.55 }} />
          <div className="th-glow" style={{
            top: '-4%', left: '6%',
            width: 'min(46vw, 440px)', height: 'min(46vw, 440px)',
            background: 'radial-gradient(circle, rgba(18,163,125,0.22) 0%, rgba(18,163,125,0) 70%)',
          }} />
          <div className="th-glow" style={{
            top: '6%', right: '6%',
            width: 'min(40vw, 360px)', height: 'min(40vw, 360px)',
            background: 'radial-gradient(circle, rgba(124,92,252,0.18) 0%, rgba(124,92,252,0) 70%)',
          }} />

          <div style={{
            position: 'relative',
            maxWidth: 720,
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <div className="th-icon">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="th-eyebrow">Submitted · 送信完了</div>
            <h1 className="th-h1">
              送信ありがとう<em>ございました</em>
            </h1>
            <p className="th-sub">
              お問い合わせを受け付けました。<br />
              内容を確認のうえ、担当者より営業時間内に順次ご連絡いたします。
            </p>

            <div className="th-card">
              <div className="th-step">
                <div className="th-step-num">01</div>
                <div>
                  <div className="th-step-t">内容の確認</div>
                  <div className="th-step-d">担当者が、いただいたお問い合わせ内容を確認いたします。</div>
                </div>
              </div>
              <div className="th-step">
                <div className="th-step-num">02</div>
                <div>
                  <div className="th-step-t">ご返信</div>
                  <div className="th-step-d">営業時間（平日 9:00–18:00 JST）内に順次ご返信いたします。土日祝・年末年始は翌営業日以降の対応となります。</div>
                </div>
              </div>
              <div className="th-step">
                <div className="th-step-num">03</div>
                <div>
                  <div className="th-step-t">次のステップ</div>
                  <div className="th-step-d">ご要望に応じて、デモのご案内や個別のご相談の場をご提案いたします。</div>
                </div>
              </div>
            </div>

            <div className="th-ctas">
              <a href="/" className="th-cta th-cta-primary">
                トップページに戻る
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="/blog/" className="th-cta th-cta-ghost">
                ブログを読む
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
