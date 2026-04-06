'use client'

import { useEffect, useRef, useState } from 'react'
import HubSpotMeetingModal from '../../components/HubSpotMeetingModal'

/* ── Types ── */
type Variant = 'google' | 'linkedin'
type LPClientProps = { variant?: Variant }

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          portalId: string
          formId: string
          region: string
          target: string
          onFormReady?: ($form: HTMLFormElement) => void
          onFormSubmitted?: () => void
        }) => void
      }
    }
    gtag?: (...args: unknown[]) => void
  }
}

/* ── Data ── */
const clients = [
  { name: 'G-gen', logo: '/clients/ggen.png' },
  { name: 'EdulinX', logo: '/clients/edulinx.png' },
  { name: 'Univis', logo: '/clients/univis.png' },
  { name: 'BizteX', logo: '/clients/biztex.png' },
  { name: 'Domo', logo: '/clients/domo.svg' },
  { name: '銀座桜屋', logo: '/clients/ginza-sakuraya.png' },
  { name: 'インプレックスアンドカンパニー', logo: '/clients/imprexc.png' },
]

const faqData = [
  {
    q: '導入にどのくらい時間がかかりますか？',
    a: 'JavaScriptタグの設置は5分。設定を含めても最短当日で稼働開始。開発リソース不要です。',
  },
  {
    q: 'CRM（Salesforce / HubSpot）と連携できますか？',
    a: 'はい。ネイティブ連携対応。商談情報は自動でCRMに登録されます。',
  },
  {
    q: '無料トライアルはありますか？',
    a: '14日間、クレジットカード不要で全機能をお試しいただけます。',
  },
]

/* ── Variant copy ── */
const copy = {
  google: {
    badge: 'AI SDR — 24時間365日稼働',
    h1: ['Webサイト訪問者を', '商談に変える'],
    sub: '人間SDRの平均対応42時間 → Meeton aiは5秒。見込み客の関心が最も高い瞬間に、自動で商談を獲得します。',
    formHeading: '3分で読める資料を無料ダウンロード',
    formSub: 'Meeton aiの機能・導入事例・料金をまとめた資料をお送りします',
  },
  linkedin: {
    badge: '営業リーダー向け',
    h1: ['営業チームの商談数を', '3倍にする方法'],
    sub: '人材採用なし・ツール乱立なし。導入初週から成果。Meeton aiが検知→接触→商談設定を自動で完結します。',
    formHeading: '導入事例と資料を無料ダウンロード',
    formSub: '商談数3倍を実現した企業の具体的なROIをお見せします',
  },
}

/* ── Inline HubSpot Form ── */
function InlineHubSpotForm({ utmCampaign }: { utmCampaign: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = () => {
      if (typeof window === 'undefined') return
      const initForm = () => {
        if (cancelled || !containerRef.current || !window.hbspt) return
        containerRef.current.innerHTML = ''
        setLoaded(true)
        window.hbspt.forms.create({
          portalId: '45872857',
          formId: 'dd42d8b3-e426-4079-9479-fa28287c0544',
          region: 'na2',
          target: '#lp-inline-form',
          onFormSubmitted: () => {
            setSubmitted(true)
            if (window.gtag) {
              window.gtag('event', 'conversion', {
                send_to: 'AW-18060590496/5EyJCIqrspUcEKD7-qND',
              })
            }
          },
          onFormReady: ($form: HTMLFormElement) => {
            if (utmCampaign && $form) {
              const input = $form.querySelector('input[name="hs_context"]')
              if (input) {
                try {
                  const ctx = JSON.parse((input as HTMLInputElement).value || '{}')
                  ctx.pageUrl = `${window.location.origin}${window.location.pathname}?utm_source=website&utm_medium=cta&utm_campaign=${utmCampaign}`
                  ;(input as HTMLInputElement).value = JSON.stringify(ctx)
                } catch { /* ignore */ }
              }
            }
          },
        })
      }
      if (window.hbspt) { initForm(); return }
      if (!document.getElementById('hubspot-script')) {
        const s = document.createElement('script')
        s.id = 'hubspot-script'
        s.src = '//js-na2.hsforms.net/forms/embed/v2.js'
        s.charset = 'utf-8'
        s.async = true
        s.onload = initForm
        document.head.appendChild(s)
      } else {
        const existing = document.getElementById('hubspot-script')
        existing?.addEventListener('load', initForm)
      }
    }
    load()
    return () => { cancelled = true }
  }, [utmCampaign])

  if (submitted) {
    return (
      <div className="lp-form-success">
        <div className="lp-form-success-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h3>ありがとうございます</h3>
        <p>資料をメールでお送りしました。<br />デモのご予約もお待ちしています。</p>
      </div>
    )
  }

  return (
    <div className="lp-form-wrapper">
      {!loaded && (
        <div className="lp-form-loading">
          <div className="lp-spinner" />
        </div>
      )}
      <div id="lp-inline-form" ref={containerRef} />
    </div>
  )
}

/* ── Component ── */
export default function LPClient({ variant = 'google' }: LPClientProps) {
  const [meetingOpen, setMeetingOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const c = copy[variant]
  const utmCampaign = `lp_${variant}`

  useEffect(() => {
    if (typeof window === 'undefined') return
    // UTM capture
    const params = new URLSearchParams(window.location.search)
    const utmData: Record<string, string> = {}
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      const val = params.get(key)
      if (val) utmData[key] = val
    }
    if (Object.keys(utmData).length > 0) {
      sessionStorage.setItem('utm_data', JSON.stringify(utmData))
    }
    // Sticky CTA on scroll
    const onScroll = () => setScrolled(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{lpCSS}</style>

      {/* ── STICKY TOP BAR ── */}
      <div className={'lp-sticky-bar' + (scrolled ? ' visible' : '')}>
        <div className="lp-sticky-inner">
          <span className="lp-sticky-text">
            <strong>Meeton ai</strong> — 14日間無料トライアル
          </span>
          <button className="lp-btn-primary lp-btn-sm" onClick={() => setMeetingOpen(true)}>
            デモを予約
          </button>
        </div>
      </div>

      {/* ── HERO: Split layout with inline form ── */}
      <section className="lp-hero">
        <div className="lp-dot-grid" />
        <div className="lp-glow lp-glow-1" />
        <div className="lp-glow lp-glow-2" />
        <div className="lp-hero-split">
          {/* Left: Copy */}
          <div className="lp-hero-text">
            <div className="lp-badge anim">{c.badge}</div>
            <h1 className="lp-h1 anim d1">
              {c.h1[0]}<br /><em>{c.h1[1]}</em>
            </h1>
            <p className="lp-sub anim d2">{c.sub}</p>
            {/* Social proof inline */}
            <div className="lp-hero-proof anim d3">
              <div className="lp-proof-stats">
                <div className="lp-proof-stat">
                  <span className="lp-proof-v">5秒</span>
                  <span className="lp-proof-l">初動対応</span>
                </div>
                <div className="lp-proof-divider" />
                <div className="lp-proof-stat">
                  <span className="lp-proof-v">40%+</span>
                  <span className="lp-proof-l">商談転換率</span>
                </div>
                <div className="lp-proof-divider" />
                <div className="lp-proof-stat">
                  <span className="lp-proof-v">5分</span>
                  <span className="lp-proof-l">セットアップ</span>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Form */}
          <div className="lp-hero-form anim d2">
            <div className="lp-form-card">
              <h2 className="lp-form-heading">{c.formHeading}</h2>
              <p className="lp-form-sub">{c.formSub}</p>
              <InlineHubSpotForm utmCampaign={utmCampaign} />
              <div className="lp-form-divider">
                <span>または</span>
              </div>
              <button className="lp-btn-meeting-link" onClick={() => setMeetingOpen(true)}>
                今すぐ話を聞きたい方は<strong>デモを予約 →</strong>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGOS (trust bar) ── */}
      <section className="lp-trust-bar">
        <div className="lp-trust-inner">
          {clients.map((cl) => (
            <img key={cl.name} src={cl.logo} alt={cl.name} className="lp-trust-logo" loading="lazy" />
          ))}
        </div>
      </section>

      {/* ── PROBLEM → SOLUTION (concise) ── */}
      <section className="lp-section">
        <div className="lp-section-inner">
          <div className="lp-vs">
            <div className="lp-vs-card lp-vs-before">
              <div className="lp-vs-label">Before</div>
              <h3 className="lp-vs-title">人間SDRに依存した営業</h3>
              <ul className="lp-vs-list">
                <li>リード対応まで平均<strong>42時間</strong></li>
                <li>見込み客の<strong>78%が最初に対応した会社</strong>から購入</li>
                <li>SDR1人あたり年間コスト<strong>800万円以上</strong></li>
                <li>深夜・休日のリードは<strong>翌営業日まで放置</strong></li>
              </ul>
            </div>
            <div className="lp-vs-arrow">→</div>
            <div className="lp-vs-card lp-vs-after">
              <div className="lp-vs-label">After</div>
              <h3 className="lp-vs-title">Meeton aiが24時間自動対応</h3>
              <ul className="lp-vs-list">
                <li>リード検知から<strong>5秒</strong>で接触開始</li>
                <li>チャット・メール・電話を<strong>AI が自律選択</strong></li>
                <li>商談設定まで<strong>完全自動</strong>、CRMに即登録</li>
                <li>導入<strong>初週から商談創出</strong>の実績</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4つの武器 ── */}
      <section className="lp-section">
        <div className="lp-section-inner">
          <h2 className="lp-h2">商談をつくる、4つの武器</h2>
          <p className="lp-section-sub" style={{ marginBottom: 36 }}>AIチャットを軸に、メール・商談予約・資料提案が連携。あらゆる接点から商談を自動獲得します。</p>
          <div className="lp-weapons">
            <div className="lp-weapon">
              <div className="lp-weapon-icon" style={{ background: 'linear-gradient(135deg, #12a37d, #0fc19a)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </div>
              <h3 className="lp-weapon-title">AIチャット</h3>
              <p className="lp-weapon-desc">訪問者に自ら話しかけ、ニーズを把握し商談予約まで会話で完結</p>
            </div>
            <div className="lp-weapon">
              <div className="lp-weapon-icon" style={{ background: 'linear-gradient(135deg, #3b6ff5, #60a5fa)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </div>
              <h3 className="lp-weapon-title">AIメール</h3>
              <p className="lp-weapon-desc">未反応リードにDay 1/3/5で自動フォロー。休眠リードも逃さず商談化</p>
            </div>
            <div className="lp-weapon">
              <div className="lp-weapon-icon" style={{ background: 'linear-gradient(135deg, #0891b2, #22d3ee)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              </div>
              <h3 className="lp-weapon-title">商談予約</h3>
              <p className="lp-weapon-desc">関心が高い瞬間にカレンダー提示。事前ヒアリングまでAIが完了</p>
            </div>
            <div className="lp-weapon">
              <div className="lp-weapon-icon" style={{ background: 'linear-gradient(135deg, #7c5cfc, #a78bfa)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
              </div>
              <h3 className="lp-weapon-title">資料提案</h3>
              <p className="lp-weapon-desc">閲覧ページに応じた最適な資料を自動レコメンド。DL時にリード獲得</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES (横並び、数字を目立たせる) ── */}
      <section className="lp-section lp-section-alt">
        <div className="lp-section-inner">
          <h2 className="lp-h2">導入企業の実績</h2>
          <div className="lp-results">
            <div className="lp-result">
              <div className="lp-result-v">10件+</div>
              <div className="lp-result-l">月間商談創出</div>
              <div className="lp-result-company">G-gen — Google Cloud Premier Partner</div>
            </div>
            <div className="lp-result">
              <div className="lp-result-v">80%+</div>
              <div className="lp-result-l">商談化率</div>
              <div className="lp-result-company">Univis — M&Aアドバイザリー</div>
            </div>
            <div className="lp-result">
              <div className="lp-result-v">6件</div>
              <div className="lp-result-l">初週の商談創出</div>
              <div className="lp-result-company">BizteX — クラウドRPA</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (1行フロー) ── */}
      <section className="lp-section">
        <div className="lp-section-inner">
          <h2 className="lp-h2">セットアップは5分</h2>
          <div className="lp-flow">
            {[
              { num: '1', title: 'タグを設置', desc: 'JavaScript 1行' },
              { num: '2', title: 'AIを設定', desc: '声かけ内容・ルール' },
              { num: '3', title: '商談が届く', desc: 'CRM自動連携' },
            ].map((step, i) => (
              <div className="lp-flow-item" key={step.num}>
                <div className="lp-flow-num">{step.num}</div>
                <div className="lp-flow-body">
                  <div className="lp-flow-title">{step.title}</div>
                  <div className="lp-flow-desc">{step.desc}</div>
                </div>
                {i < 2 && <div className="lp-flow-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (minimal) ── */}
      <section className="lp-section lp-section-alt">
        <div className="lp-section-inner">
          <h2 className="lp-h2">よくある質問</h2>
          <div className="lp-faq">
            {faqData.map((f, i) => (
              <div className={'lp-faq-item' + (openFaq === i ? ' open' : '')} key={i}>
                <button className="lp-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <div className="lp-faq-toggle">+</div>
                </button>
                {openFaq === i && <div className="lp-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="lp-final-cta">
        <div className="lp-dot-grid" />
        <div className="lp-final-inner">
          <h2 className="lp-h2" style={{ marginBottom: 12 }}>
            今すぐ商談を自動で獲得しませんか？
          </h2>
          <p className="lp-section-sub" style={{ marginBottom: 32 }}>
            14日間無料 ・ クレジットカード不要 ・ 5分でセットアップ
          </p>
          <div className="lp-ctas">
            <button className="lp-btn-primary lp-btn-lg" onClick={() => setMeetingOpen(true)}>
              無料デモを予約する
            </button>
          </div>
        </div>
      </section>

      {/* ── MOBILE STICKY CTA ── */}
      <div className={'lp-mobile-cta' + (scrolled ? ' visible' : '')}>
        <button className="lp-btn-primary lp-mobile-cta-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          無料で資料をダウンロード
        </button>
      </div>

      {/* ── FOOTER (legal only) ── */}
      <footer className="lp-footer">
        <span>© {new Date().getFullYear()} DynaMeet Inc.</span>
        <div className="lp-footer-links">
          <a href="https://dynameet.ai/privacy/" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
          <a href="https://dynameet.ai/terms/" target="_blank" rel="noopener noreferrer">利用規約</a>
        </div>
      </footer>

      {/* ── MODAL ── */}
      <HubSpotMeetingModal
        isOpen={meetingOpen}
        onClose={() => setMeetingOpen(false)}
        utmCampaign={utmCampaign}
      />
    </>
  )
}

/* ── Styles ── */
const lpCSS = `
:root {
  --bg:#ffffff;--surface:#f4f6fb;--surface2:#eaedfa;
  --border:#dfe3f0;--border2:#c8cedf;
  --text:#4a506e;--heading:#0f1128;--sub:#6e7494;
  --cta:#12a37d;--cta-hover:#0fc19a;--cta-glow:rgba(18,163,125,.25);--cta-light:#e5f8f2;
  --accent:#7c5cfc;--accent-light:#f0ecfe;
  --blue:#3b6ff5;--blue-light:#eaf0fe;
  --fd:'Plus Jakarta Sans',var(--font-jakarta),sans-serif;
  --fb:'Noto Sans JP',var(--font-noto),'Plus Jakarta Sans',sans-serif;
  --fm:'JetBrains Mono',var(--font-mono),monospace;
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:var(--fb);font-size:18px;overflow-x:hidden;-webkit-font-smoothing:antialiased}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
.anim{opacity:0;animation:fadeUp .7s cubic-bezier(.16,1,.3,1) forwards}
.d1{animation-delay:.08s}.d2{animation-delay:.18s}.d3{animation-delay:.3s}

/* ── STICKY BAR ── */
.lp-sticky-bar{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(255,255,255,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:10px 24px;transform:translateY(-100%);transition:transform .3s cubic-bezier(.16,1,.3,1)}
.lp-sticky-bar.visible{transform:translateY(0)}
.lp-sticky-inner{max-width:1060px;margin:0 auto;display:flex;align-items:center;justify-content:space-between}
.lp-sticky-text{font-size:14px;color:var(--heading)}
.lp-sticky-text strong{font-weight:800}

/* ── BUTTONS ── */
.lp-btn-primary{border:none;cursor:pointer;font-family:var(--fb);font-weight:700;border-radius:10px;background:linear-gradient(135deg,var(--cta),#0fc19a);color:#fff;padding:14px 32px;font-size:16px;box-shadow:0 4px 16px var(--cta-glow);transition:all .25s}
.lp-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 28px var(--cta-glow)}
.lp-btn-lg{padding:18px 40px;font-size:18px}
.lp-btn-sm{padding:8px 20px;font-size:13px}
.lp-btn-full{width:100%;text-align:center;margin-top:12px}
.lp-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}

/* ── HERO SPLIT ── */
.lp-hero{position:relative;overflow:hidden;padding:80px 24px 60px;background:linear-gradient(165deg,#edfcf7 0%,#fff 30%,#f3f0ff 60%,#fff 100%)}
.lp-dot-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(124,92,252,.06) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
.lp-glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}
.lp-glow-1{width:500px;height:500px;background:rgba(18,163,125,.1);top:-10%;right:-5%}
.lp-glow-2{width:400px;height:400px;background:rgba(124,92,252,.08);bottom:-10%;left:-5%}

.lp-hero-split{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 400px;gap:48px;align-items:center;position:relative;z-index:2}
.lp-hero-text{padding:20px 0}
.lp-badge{display:inline-flex;align-items:center;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(18,163,125,.15);padding:7px 18px;border-radius:20px;margin-bottom:24px;font-size:13px;font-weight:700;color:var(--cta)}
.lp-h1{font-size:clamp(30px,5vw,52px);font-weight:900;color:var(--heading);line-height:1.2;letter-spacing:-1.5px;margin-bottom:18px}
.lp-h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.lp-sub{font-size:clamp(15px,2vw,18px);line-height:1.8;color:var(--sub);max-width:480px;margin-bottom:28px}

/* Hero proof stats */
.lp-hero-proof{display:flex;align-items:center}
.lp-proof-stats{display:flex;align-items:center;gap:0;background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:14px 24px}
.lp-proof-stat{display:flex;flex-direction:column;align-items:center;padding:0 20px}
.lp-proof-v{font-family:var(--fm);font-size:24px;font-weight:700;color:var(--heading)}
.lp-proof-l{font-size:11px;color:var(--sub);font-weight:600;margin-top:2px}
.lp-proof-divider{width:1px;height:36px;background:var(--border)}

/* Hero form card */
.lp-hero-form{position:relative}
.lp-form-card{background:#fff;border:1px solid var(--border);border-radius:20px;padding:28px;box-shadow:0 16px 48px rgba(0,0,0,.08)}
.lp-form-heading{font-size:22px;font-weight:900;color:var(--heading);margin-bottom:4px;text-align:center}
.lp-form-sub{font-size:13px;color:var(--sub);text-align:center;margin-bottom:20px}
.lp-form-note{font-size:11px;color:var(--sub);text-align:center;margin-top:12px;font-weight:500}
.lp-form-wrapper{min-height:200px;position:relative}
.lp-form-loading{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.lp-spinner{width:32px;height:32px;border:3px solid var(--border);border-top-color:var(--cta);border-radius:50%;animation:spin .8s linear infinite}
.lp-form-success{text-align:center;padding:32px 0}
.lp-form-success-icon{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--cta),var(--blue));display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.lp-form-success h3{font-size:20px;font-weight:800;color:var(--heading);margin-bottom:8px}
.lp-form-success p{font-size:14px;color:var(--sub);line-height:1.6}
.lp-form-divider{display:flex;align-items:center;gap:12px;margin:16px 0 12px}
.lp-form-divider::before,.lp-form-divider::after{content:'';flex:1;height:1px;background:var(--border)}
.lp-form-divider span{font-size:12px;color:var(--sub);font-weight:500;white-space:nowrap}
.lp-btn-meeting-link{width:100%;background:none;border:none;cursor:pointer;font-family:var(--fb);font-size:13px;color:var(--sub);padding:8px;text-align:center;transition:color .2s;border-radius:8px}
.lp-btn-meeting-link:hover{color:var(--cta)}
.lp-btn-meeting-link strong{color:var(--cta);font-weight:700}

/* ── TRUST BAR ── */
.lp-trust-bar{padding:20px 24px;background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.lp-trust-inner{max-width:900px;margin:0 auto;display:flex;justify-content:center;align-items:center;gap:28px;flex-wrap:wrap}
.lp-trust-logo{height:26px;width:auto;object-fit:contain;opacity:.55;transition:opacity .2s;filter:grayscale(100%)}
.lp-trust-logo:hover{opacity:1;filter:none}

/* ── SECTIONS ── */
.lp-section{padding:clamp(48px,8vw,80px) clamp(16px,5vw,48px)}
.lp-section-alt{background:var(--surface)}
.lp-section-inner{max-width:960px;margin:0 auto}
.lp-h2{font-size:clamp(24px,4vw,36px);font-weight:900;color:var(--heading);line-height:1.25;letter-spacing:-.5px;margin-bottom:40px;text-align:center}
.lp-section-sub{font-size:clamp(14px,2vw,17px);line-height:1.8;color:var(--sub);max-width:520px;margin:0 auto;text-align:center}

/* ── BEFORE / AFTER ── */
.lp-vs{display:grid;grid-template-columns:1fr auto 1fr;gap:24px;align-items:stretch}
.lp-vs-card{padding:28px;border-radius:18px;border:1px solid var(--border)}
.lp-vs-before{background:#fff5f5;border-color:#fecaca}
.lp-vs-after{background:#ecfdf5;border-color:#a7f3d0}
.lp-vs-label{font-family:var(--fm);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px}
.lp-vs-before .lp-vs-label{color:#dc2626}
.lp-vs-after .lp-vs-label{color:var(--cta)}
.lp-vs-title{font-size:20px;font-weight:800;color:var(--heading);margin-bottom:16px}
.lp-vs-list{list-style:none;display:flex;flex-direction:column;gap:10px}
.lp-vs-list li{font-size:15px;line-height:1.6;color:var(--text);padding-left:20px;position:relative}
.lp-vs-list li::before{content:'';position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%}
.lp-vs-before .lp-vs-list li::before{background:#fca5a5}
.lp-vs-after .lp-vs-list li::before{background:#6ee7b7}
.lp-vs-list li strong{color:var(--heading);font-weight:700}
.lp-vs-arrow{display:flex;align-items:center;font-size:28px;color:var(--border2);font-weight:300}

/* ── RESULTS ── */
.lp-results{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.lp-result{text-align:center;padding:32px 20px;background:var(--bg);border:1px solid var(--border);border-radius:18px;transition:all .3s}
.lp-result:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(0,0,0,.06)}
.lp-result-v{font-family:var(--fm);font-size:clamp(36px,5vw,48px);font-weight:700;color:var(--cta);letter-spacing:-1px}
.lp-result-l{font-size:15px;font-weight:700;color:var(--heading);margin-top:4px}
.lp-result-company{font-size:12px;color:var(--sub);margin-top:12px;font-weight:500}

/* ── FLOW ── */
.lp-flow{display:flex;align-items:center;justify-content:center;gap:0;margin-top:8px}
.lp-flow-item{display:flex;align-items:center;gap:0}
.lp-flow-num{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--cta),#0fc19a);color:#fff;font-family:var(--fm);font-size:20px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.lp-flow-body{padding:0 16px}
.lp-flow-title{font-size:17px;font-weight:800;color:var(--heading)}
.lp-flow-desc{font-size:13px;color:var(--sub);font-weight:500}
.lp-flow-connector{width:40px;height:2px;background:linear-gradient(90deg,var(--cta),var(--border));flex-shrink:0}

/* ── FAQ ── */
.lp-faq{max-width:640px;margin:0 auto;display:flex;flex-direction:column;gap:8px}
.lp-faq-item{background:var(--bg);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:all .25s}
.lp-faq-q{width:100%;padding:16px 20px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-size:16px;font-weight:700;color:var(--heading);background:none;border:none;font-family:var(--fb);text-align:left;gap:12px;transition:color .2s}
.lp-faq-q:hover{color:var(--cta)}
.lp-faq-toggle{width:24px;height:24px;border-radius:50%;background:var(--surface);display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--sub);transition:all .25s;flex-shrink:0}
.lp-faq-item.open .lp-faq-toggle{background:var(--cta-light);color:var(--cta);transform:rotate(45deg)}
.lp-faq-a{padding:0 20px 16px;font-size:14px;line-height:1.8;color:var(--sub)}

/* ── FINAL CTA ── */
.lp-final-cta{padding:clamp(48px,8vw,80px) 24px;text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#edfcf7 0%,#fff 40%,#f3f0ff 80%,#eaf0fe 100%)}
.lp-final-inner{position:relative;z-index:2;max-width:560px;margin:0 auto}

/* ── FOOTER ── */
.lp-footer{padding:20px 24px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--sub);flex-wrap:wrap;gap:8px;max-width:960px;margin:0 auto}
.lp-footer-links{display:flex;gap:16px}
.lp-footer-links a{color:var(--sub);text-decoration:none;font-size:12px;transition:color .2s}
.lp-footer-links a:hover{color:var(--cta)}

/* ── 4 WEAPONS ── */
.lp-weapons{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.lp-weapon{text-align:center;padding:28px 16px;background:var(--bg);border:1px solid var(--border);border-radius:18px;transition:all .3s}
.lp-weapon:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(0,0,0,.06)}
.lp-weapon-icon{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.lp-weapon-title{font-size:17px;font-weight:800;color:var(--heading);margin-bottom:8px}
.lp-weapon-desc{font-size:13px;line-height:1.7;color:var(--sub)}

/* ── MOBILE STICKY CTA ── */
.lp-mobile-cta{display:none}

/* ── RESPONSIVE ── */
@media(max-width:768px){
  .lp-hero{padding:60px 16px 40px}
  .lp-hero-split{grid-template-columns:1fr;gap:32px}
  .lp-hero-text{text-align:center}
  .lp-sub{margin-left:auto;margin-right:auto}
  .lp-hero-proof{justify-content:center}
  .lp-proof-stats{flex-direction:row;gap:0;padding:10px 16px}
  .lp-proof-stat{padding:0 12px}
  .lp-proof-v{font-size:18px}
  .lp-proof-l{font-size:10px}
  .lp-vs{grid-template-columns:1fr;gap:16px}
  .lp-vs-arrow{transform:rotate(90deg);justify-content:center}
  .lp-results{grid-template-columns:1fr}
  .lp-weapons{grid-template-columns:repeat(2,1fr);gap:12px}
  .lp-weapon{padding:20px 12px}
  .lp-weapon-icon{width:44px;height:44px;border-radius:12px;margin-bottom:12px}
  .lp-weapon-title{font-size:15px}
  .lp-weapon-desc{font-size:12px}
  .lp-flow{flex-direction:column;gap:12px}
  .lp-flow-item{flex-direction:row}
  .lp-flow-connector{width:2px;height:24px;display:none}
  .lp-ctas{flex-direction:column;align-items:center}
  .lp-btn-primary{width:100%;max-width:320px;text-align:center}
  .lp-sticky-bar.visible{display:none}
  .lp-mobile-cta{display:block;position:fixed;bottom:0;left:0;right:0;z-index:1000;background:rgba(255,255,255,.95);backdrop-filter:blur(12px);border-top:1px solid var(--border);padding:12px 16px;transform:translateY(100%);transition:transform .3s cubic-bezier(.16,1,.3,1)}
  .lp-mobile-cta.visible{transform:translateY(0)}
  .lp-mobile-cta-btn{width:100%;padding:16px;font-size:16px;border-radius:12px}
  .lp-footer{flex-direction:column;text-align:center;padding-bottom:80px}
}
`
