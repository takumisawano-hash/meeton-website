'use client'

import { useEffect, useState } from 'react'
import HubSpotMeetingModal from '../../components/HubSpotMeetingModal'
import HubSpotModal from '../../components/HubSpotModal'

/* ── Types ── */
type Variant = 'google' | 'linkedin'

type LPClientProps = {
  variant?: Variant
}

/* ── Data ── */
const caseData = [
  {
    name: 'G-gen',
    industry: 'Google Cloud Premier Partner',
    quote:
      'Meeton ai導入後、月10件以上の商談を安定的に創出。リードからの転換率は40%以上を実現し、営業チームが商談対応に集中できる体制が整いました。',
    stats: [
      { v: '10件+', l: '月間商談創出' },
      { v: '40%+', l: 'リード→商談 転換率' },
    ],
  },
  {
    name: 'Univis',
    industry: 'M&Aアドバイザリー・財務会計コンサル',
    quote:
      '商談化率は80%超え。Meeton aiが精度の高いMeetingを創出し、確度の高い商談だけが営業に届く仕組みが実現しています。',
    stats: [
      { v: '80%+', l: '商談化率' },
      { v: '高精度', l: 'Meeting創出' },
    ],
  },
  {
    name: 'BizteX',
    industry: 'クラウドRPA・業務自動化ツール',
    quote:
      '導入した1週目から6件の商談を創出。複雑な設定なしで即座に成果が出る、そのスピード感がMeeton aiの最大の魅力です。',
    stats: [
      { v: '6件', l: '初週の商談創出' },
      { v: '1週目', l: '成果が出るまで' },
    ],
  },
]

const clients = [
  { name: 'G-gen', logo: '/clients/ggen.png' },
  { name: 'EdulinX', logo: '/clients/edulinx.png' },
  { name: 'Univis', logo: '/clients/univis.png' },
  { name: '銀座桜屋', logo: '/clients/ginza-sakuraya.png' },
  { name: 'BizteX', logo: '/clients/biztex.png' },
  { name: 'Domo', logo: '/clients/domo.svg' },
  { name: 'インプレックスアンドカンパニー', logo: '/clients/imprexc.png' },
]

const faqData = [
  {
    q: '導入にどのくらい時間がかかりますか？',
    a: 'JavaScriptタグの設置は5分です。設定を含めても最短で当日中に稼働開始できます。開発リソースは不要です。',
  },
  {
    q: '既存のCRM（Salesforce / HubSpot）と連携できますか？',
    a: 'はい。Salesforce、HubSpotとのネイティブ連携に対応。商談情報は自動でCRMに登録されます。',
  },
  {
    q: '無料トライアルはありますか？',
    a: '14日間の無料トライアルをご用意しています。クレジットカード不要で全機能をお試しいただけます。',
  },
  {
    q: '従来のチャットボットとの違いは？',
    a: 'Meeton aiはAI SDRとして、リードの温度感を判断し、チャット・メール・資料提案・カレンダーの中から最適なアプローチを自律的に選択して商談を獲得します。',
  },
]

/* ── Variant copy ── */
const copy = {
  google: {
    badge: 'AI SDR — 商談を自動で獲得',
    h1pre: 'Webサイト訪問者を',
    h1em: '商談に変える',
    h1post: 'AIセールスプラットフォーム',
    sub: 'リードの検知から商談予約まで、Meeton aiが5秒で対応。人間SDRの42時間を待たずに、見込み客の関心が高い瞬間を逃しません。',
    ctaPrimary: '無料デモを予約',
    ctaSecondary: '資料をダウンロード',
  },
  linkedin: {
    badge: 'AI SDR — 営業組織を変革',
    h1pre: '営業チームの',
    h1em: '商談数を3倍に',
    h1post: 'する方法',
    sub: '人材採用なし・ツール乱立なし。Meeton aiが見込み客の検知から商談設定までを自動で完結。導入初週から成果が出ます。',
    ctaPrimary: '無料デモを予約',
    ctaSecondary: '導入事例を見る',
  },
}

/* ── Component ── */
export default function LPClient({ variant = 'google' }: LPClientProps) {
  const [meetingOpen, setMeetingOpen] = useState(false)
  const [resourceOpen, setResourceOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [caseIdx, setCaseIdx] = useState(0)
  const c = copy[variant]
  const utmCampaign = `lp_${variant}`

  /* Track UTM params */
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const utmData: Record<string, string> = {}
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      const val = params.get(key)
      if (val) utmData[key] = val
    }
    if (Object.keys(utmData).length > 0) {
      sessionStorage.setItem('utm_data', JSON.stringify(utmData))
    }
  }, [])

  return (
    <>
      <style>{lpCSS}</style>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-dot-grid" />
        <div className="lp-glow lp-glow-1" />
        <div className="lp-glow lp-glow-2" />
        <div className="lp-hero-inner">
          <div className="lp-badge anim">{c.badge}</div>
          <h1 className="lp-h1 anim d1">
            {c.h1pre}
            <br />
            <em>{c.h1em}</em>
            <br />
            {c.h1post}
          </h1>
          <p className="lp-sub anim d2">{c.sub}</p>
          <div className="lp-ctas anim d3">
            <button className="lp-btn-primary" onClick={() => setMeetingOpen(true)}>
              {c.ctaPrimary}
            </button>
            <button className="lp-btn-secondary" onClick={() => setResourceOpen(true)}>
              {c.ctaSecondary}
            </button>
          </div>
          <div className="lp-stats anim d4">
            <div className="lp-stat">
              <div className="lp-stat-v">5秒</div>
              <div className="lp-stat-l">リード対応速度</div>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-v">40%+</div>
              <div className="lp-stat-l">リード→商談 転換率</div>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-v">5分</div>
              <div className="lp-stat-l">セットアップ完了</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGOS ── */}
      <section className="lp-section lp-clients-section">
        <div className="lp-section-inner">
          <p className="lp-clients-label">導入企業</p>
          <div className="lp-clients">
            {clients.map((cl) => (
              <div className="lp-client" key={cl.name}>
                <img src={cl.logo} alt={cl.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="lp-section">
        <div className="lp-section-inner">
          <div className="lp-label">HOW IT WORKS</div>
          <h2 className="lp-h2">4つのフェーズで商談を自動獲得</h2>
          <p className="lp-section-sub">
            Meeton aiは見込み客の検知から商談設定までを自律的に実行します
          </p>
          <div className="lp-phases">
            {[
              {
                num: '01',
                title: '見つける',
                desc: 'サイト訪問・フォーム送信・資料DLをリアルタイムでスコアリングし、ホットリードを即座に検知',
                color: '#0891b2',
              },
              {
                num: '02',
                title: '話しかける',
                desc: '行動データに基づいてAIチャットとメールで即時パーソナライズ接触。5秒以内に対応開始',
                color: '#12a37d',
              },
              {
                num: '03',
                title: '理解を深める',
                desc: 'コンテンツ提供・Q&A対応でバイヤーの理解を深め、購買意欲を醸成',
                color: '#7c5cfc',
              },
              {
                num: '04',
                title: '商談を決める',
                desc: 'カレンダー連携で商談を自動設定。フォローアップまで完結し、CRMに自動登録',
                color: '#3b6ff5',
              },
            ].map((phase) => (
              <div className="lp-phase" key={phase.num}>
                <div className="lp-phase-num" style={{ background: phase.color }}>
                  {phase.num}
                </div>
                <div className="lp-phase-body">
                  <h3 className="lp-phase-title">{phase.title}</h3>
                  <p className="lp-phase-desc">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY MEETON ── */}
      <section className="lp-section lp-section-alt">
        <div className="lp-section-inner">
          <div className="lp-label">WHY MEETON AI</div>
          <h2 className="lp-h2">
            {variant === 'linkedin'
              ? 'なぜ営業リーダーがMeeton aiを選ぶのか'
              : 'なぜMeeton aiが選ばれるのか'}
          </h2>
          <div className="lp-benefits">
            {[
              {
                icon: '⚡',
                title: '5秒で初動対応',
                desc: '人間SDRの平均対応時間42時間に対し、Meeton aiは5秒以内にリードへ接触。関心が最も高い瞬間を逃しません。',
              },
              {
                icon: '🎯',
                title: '7チャネル統合',
                desc: 'チャット・メール・電話・資料・カレンダー・CRM・通知。バラバラだったツールを1つのAIが統合管理。',
              },
              {
                icon: '📈',
                title: '商談転換率40%以上',
                desc: 'リードの温度感をAIが判断し、最適なアプローチを自律選択。従来のチャットボットの5〜10倍の転換率を実現。',
              },
              {
                icon: '🔌',
                title: '5分でセットアップ',
                desc: 'JavaScriptタグ1行を設置するだけ。開発リソース不要、最短当日で稼働開始。Salesforce・HubSpotとネイティブ連携。',
              },
            ].map((b) => (
              <div className="lp-benefit" key={b.title}>
                <div className="lp-benefit-icon">{b.icon}</div>
                <h3 className="lp-benefit-title">{b.title}</h3>
                <p className="lp-benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="lp-section">
        <div className="lp-section-inner">
          <div className="lp-label">CASE STUDIES</div>
          <h2 className="lp-h2">導入企業の成果</h2>
          <div className="lp-cases">
            {caseData.map((cs, i) => (
              <div
                className={'lp-case' + (i === caseIdx ? ' active' : '')}
                key={cs.name}
                onClick={() => setCaseIdx(i)}
              >
                <div className="lp-case-header">
                  <div className="lp-case-name">{cs.name}</div>
                  <div className="lp-case-industry">{cs.industry}</div>
                </div>
                <div className="lp-case-quote">{cs.quote}</div>
                <div className="lp-case-stats">
                  {cs.stats.map((s) => (
                    <div className="lp-case-stat" key={s.l}>
                      <div className="lp-case-stat-v">{s.v}</div>
                      <div className="lp-case-stat-l">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="lp-section lp-section-alt">
        <div className="lp-section-inner">
          <div className="lp-label">FAQ</div>
          <h2 className="lp-h2">よくあるご質問</h2>
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
        <div className="lp-glow lp-glow-3" />
        <div className="lp-final-inner">
          <h2 className="lp-h2" style={{ color: 'var(--heading)', marginBottom: 16 }}>
            {variant === 'linkedin'
              ? '営業チームの生産性を今すぐ変える'
              : 'AIが商談をつくる時代へ'}
          </h2>
          <p className="lp-section-sub" style={{ marginBottom: 40 }}>
            14日間の無料トライアル。クレジットカード不要。
          </p>
          <div className="lp-ctas">
            <button className="lp-btn-primary lp-btn-lg" onClick={() => setMeetingOpen(true)}>
              無料デモを予約
            </button>
            <button className="lp-btn-secondary" onClick={() => setResourceOpen(true)}>
              資料をダウンロード
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER (minimal) ── */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <span>© {new Date().getFullYear()} DynaMeet Inc.</span>
          <div className="lp-footer-links">
            <a href="https://dynameet.ai/privacy/" target="_blank" rel="noopener noreferrer">
              プライバシーポリシー
            </a>
            <a href="https://dynameet.ai/terms/" target="_blank" rel="noopener noreferrer">
              利用規約
            </a>
          </div>
        </div>
      </footer>

      {/* ── MODALS ── */}
      <HubSpotMeetingModal
        isOpen={meetingOpen}
        onClose={() => setMeetingOpen(false)}
        utmCampaign={utmCampaign}
      />
      <HubSpotModal
        isOpen={resourceOpen}
        onClose={() => setResourceOpen(false)}
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
  --accent:#7c5cfc;--accent-light:#f0ecfe;--accent-glow:rgba(124,92,252,.2);
  --blue:#3b6ff5;--blue-light:#eaf0fe;
  --fd:'Plus Jakarta Sans',var(--font-jakarta),sans-serif;
  --fb:'Noto Sans JP',var(--font-noto),'Plus Jakarta Sans',sans-serif;
  --fm:'JetBrains Mono',var(--font-mono),monospace;
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:var(--fb);font-size:18px;overflow-x:hidden;-webkit-font-smoothing:antialiased}

@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
.anim{opacity:0;animation:fadeUp .8s cubic-bezier(.16,1,.3,1) forwards}
.d1{animation-delay:.1s}.d2{animation-delay:.22s}.d3{animation-delay:.38s}.d4{animation-delay:.52s}

/* ── HERO ── */
.lp-hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:100px 24px 80px;background:linear-gradient(165deg,#edfcf7 0%,#fff 30%,#f3f0ff 60%,#fff 100%)}
.lp-hero-inner{max-width:800px;text-align:center;position:relative;z-index:2}
.lp-dot-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(124,92,252,.08) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
.lp-glow{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}
.lp-glow-1{width:500px;height:500px;background:rgba(18,163,125,.12);top:-10%;right:-10%}
.lp-glow-2{width:400px;height:400px;background:rgba(124,92,252,.1);bottom:0;left:-5%}
.lp-glow-3{width:600px;height:300px;background:rgba(18,163,125,.08);top:50%;left:50%;transform:translate(-50%,-50%)}

.lp-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(18,163,125,.15);padding:9px 22px;border-radius:24px;margin-bottom:32px;font-size:15px;font-weight:700;color:var(--cta)}

.lp-h1{font-size:clamp(32px,6.5vw,64px);font-weight:900;color:var(--heading);line-height:1.18;letter-spacing:-2px;margin-bottom:24px}
.lp-h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

.lp-sub{font-size:clamp(16px,2.5vw,20px);line-height:1.8;color:var(--sub);max-width:600px;margin:0 auto 40px}

.lp-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.lp-btn-primary{border:none;cursor:pointer;font-family:var(--fb);font-weight:700;border-radius:10px;background:linear-gradient(135deg,var(--cta),#0fc19a);color:#fff;padding:14px 32px;font-size:16px;box-shadow:0 4px 16px var(--cta-glow);transition:all .25s}
.lp-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 28px var(--cta-glow)}
.lp-btn-lg{padding:18px 40px;font-size:18px;box-shadow:0 6px 28px var(--cta-glow)}
.lp-btn-secondary{border:2px solid var(--border2);background:transparent;color:var(--heading);padding:12px 28px;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;font-family:var(--fb);transition:all .25s}
.lp-btn-secondary:hover{border-color:var(--cta);color:var(--cta);background:var(--cta-light)}

.lp-stats{display:flex;justify-content:center;gap:clamp(32px,6vw,64px);margin-top:48px;padding-top:32px;border-top:1px solid var(--border);flex-wrap:wrap}
.lp-stat-v{font-family:var(--fm);font-size:clamp(32px,5vw,48px);font-weight:700;background:linear-gradient(135deg,var(--heading),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1px}
.lp-stat-l{font-size:clamp(12px,2vw,14px);color:var(--sub);margin-top:6px;font-weight:600}

/* ── SECTIONS ── */
.lp-section{padding:clamp(60px,10vw,100px) clamp(16px,5vw,48px)}
.lp-section-alt{background:var(--surface)}
.lp-section-inner{max-width:1060px;margin:0 auto}
.lp-label{font-family:var(--fm);font-size:12px;font-weight:700;color:var(--accent);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;text-align:center}
.lp-h2{font-size:clamp(26px,4.5vw,42px);font-weight:900;color:var(--heading);line-height:1.25;letter-spacing:-.5px;margin-bottom:16px;text-align:center}
.lp-section-sub{font-size:clamp(15px,2.5vw,18px);line-height:1.8;color:var(--sub);max-width:600px;margin:0 auto 48px;text-align:center}

/* ── CLIENTS ── */
.lp-clients-section{padding:40px 24px;background:var(--surface)}
.lp-clients-label{font-family:var(--fm);font-size:11px;font-weight:700;color:var(--sub);letter-spacing:2px;text-transform:uppercase;text-align:center;margin-bottom:20px}
.lp-clients{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;align-items:center}
.lp-client{padding:14px 24px;background:var(--bg);border:1px solid var(--border);border-radius:12px;display:flex;align-items:center;justify-content:center;height:60px;min-width:120px}
.lp-client img{height:32px;width:auto;max-width:110px;object-fit:contain}

/* ── PHASES ── */
.lp-phases{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:48px}
.lp-phase{display:flex;gap:18px;padding:28px;background:var(--bg);border:1px solid var(--border);border-radius:18px;transition:all .3s}
.lp-phase:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(0,0,0,.06)}
.lp-phase-num{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--fm);font-size:14px;font-weight:700;flex-shrink:0}
.lp-phase-body{flex:1}
.lp-phase-title{font-size:20px;font-weight:800;color:var(--heading);margin-bottom:8px}
.lp-phase-desc{font-size:15px;line-height:1.75;color:var(--sub)}

/* ── BENEFITS ── */
.lp-benefits{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.lp-benefit{padding:32px;background:var(--bg);border:1px solid var(--border);border-radius:18px;transition:all .3s}
.lp-benefit:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(0,0,0,.06)}
.lp-benefit-icon{font-size:32px;margin-bottom:16px}
.lp-benefit-title{font-size:20px;font-weight:800;color:var(--heading);margin-bottom:10px}
.lp-benefit-desc{font-size:15px;line-height:1.75;color:var(--sub)}

/* ── CASE STUDIES ── */
.lp-cases{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:40px}
.lp-case{padding:28px;background:var(--bg);border:2px solid var(--border);border-radius:18px;cursor:pointer;transition:all .3s}
.lp-case:hover,.lp-case.active{border-color:var(--cta);box-shadow:0 8px 32px var(--cta-glow)}
.lp-case-header{margin-bottom:16px}
.lp-case-name{font-size:20px;font-weight:900;color:var(--heading);margin-bottom:2px}
.lp-case-industry{font-size:13px;color:var(--sub);font-weight:500}
.lp-case-quote{font-size:14px;line-height:1.8;color:var(--text);margin-bottom:20px;padding:16px;background:var(--surface);border-radius:12px;border-left:3px solid var(--cta)}
.lp-case-stats{display:flex;gap:24px;padding-top:16px;border-top:1px solid var(--border)}
.lp-case-stat-v{font-family:var(--fm);font-size:22px;font-weight:700;color:var(--cta)}
.lp-case-stat-l{font-size:11px;color:var(--sub);margin-top:2px;font-weight:500}

/* ── FAQ ── */
.lp-faq{max-width:680px;margin:0 auto;display:flex;flex-direction:column;gap:10px}
.lp-faq-item{background:var(--bg);border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:all .25s}
.lp-faq-item:hover{border-color:var(--border2)}
.lp-faq-q{width:100%;padding:18px 24px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-size:17px;font-weight:700;color:var(--heading);transition:color .2s;background:none;border:none;font-family:var(--fb);text-align:left;gap:12px}
.lp-faq-q:hover{color:var(--cta)}
.lp-faq-toggle{width:28px;height:28px;border-radius:50%;background:var(--surface);display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--sub);transition:all .25s;flex-shrink:0}
.lp-faq-item.open .lp-faq-toggle{background:var(--cta-light);color:var(--cta);transform:rotate(45deg)}
.lp-faq-a{padding:0 24px 18px;font-size:15px;line-height:1.8;color:var(--sub)}

/* ── FINAL CTA ── */
.lp-final-cta{padding:clamp(60px,10vw,100px) 24px clamp(80px,12vw,120px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#edfcf7 0%,#fff 40%,#f3f0ff 80%,#eaf0fe 100%)}
.lp-final-inner{position:relative;z-index:2;max-width:600px;margin:0 auto}

/* ── FOOTER ── */
.lp-footer{padding:24px;border-top:1px solid var(--border);text-align:center}
.lp-footer-inner{max-width:1060px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--sub);flex-wrap:wrap;gap:12px}
.lp-footer-links{display:flex;gap:20px}
.lp-footer-links a{color:var(--sub);text-decoration:none;font-size:13px;transition:color .2s}
.lp-footer-links a:hover{color:var(--cta)}

/* ── RESPONSIVE ── */
@media(max-width:768px){
  .lp-hero{padding:80px 20px 60px;min-height:auto}
  .lp-h1{letter-spacing:-1px}
  .lp-phases{grid-template-columns:1fr}
  .lp-benefits{grid-template-columns:1fr}
  .lp-cases{grid-template-columns:1fr}
  .lp-stats{flex-direction:column;gap:16px;align-items:center}
  .lp-ctas{flex-direction:column;align-items:center}
  .lp-btn-primary,.lp-btn-secondary{width:100%;max-width:320px;text-align:center}
  .lp-footer-inner{flex-direction:column;text-align:center}
}
`
