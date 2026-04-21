'use client'

import { useEffect, useRef, useState } from 'react'
import HubSpotMeetingModal from '../../components/HubSpotMeetingModal'

/* ── Types ── */
type Variant = 'google' | 'linkedin' | 'web-chat' | 'inside-sales' | 'meeting' | 'lead-gen'
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
    lintrk?: (action: string, data: { conversion_id: number }) => void
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

const variantFaq: Record<string, typeof faqData> = {
  'web-chat': [
    { q: 'Web接客ツールとして何ができますか？', a: 'AIチャットボットがサイト訪問者に自動で声をかけ、質問応答・資料提案・商談予約まで完結します。BtoB特化のWeb接客を24時間自動化します。' },
    { q: '既存のチャットボットとの違いは？', a: '従来のチャットボットはシナリオ型で定型応答のみ。Meeton aiはAIが会話を理解し、訪問者の関心に合わせて最適な対応を自律選択します。' },
    ...faqData,
  ],
  'inside-sales': [
    { q: 'インサイドセールスの工数はどのくらい削減できますか？', a: 'SDR業務の初期対応をAIが代行することで、リード対応工数を最大80%削減。営業チームは商談に集中できます。' },
    { q: 'セールスイネーブルメントツールとして使えますか？', a: 'はい。AIが見込み客の温度感を判定し、最適なコンテンツを自動提案。営業効率化とセールスイネーブルメントを同時に実現します。' },
    ...faqData,
  ],
  'meeting': [
    { q: '商談自動化の仕組みを教えてください', a: 'AIがWebサイト訪問者を検知し、チャットで会話→温度感を判定→カレンダー連携で商談予約まで自動完結。アポ獲得を完全自動化します。' },
    { q: '商談化率はどのくらい改善しますか？', a: '導入企業では商談化率40%以上を実現。人間SDRの平均対応42時間がAIなら5秒で、商談化率が劇的に改善します。' },
    ...faqData,
  ],
  'lead-gen': [
    { q: 'BtoBリード獲得の自動化はどう実現しますか？', a: 'Webサイト訪問者をAIがリアルタイム検知し、チャット・メール・資料提案で自動アプローチ。24時間リードを獲得し続けます。' },
    { q: 'マーケティングオートメーションとの違いは？', a: 'MAはリードのスコアリングとメール配信が主軸。Meeton aiはリード検知→対話→商談獲得まで一気通貫で自動化します。' },
    ...faqData,
  ],
}

/* ── Variant copy ──
 * エビデンス: Unbounce 2024（短く具体的 > 抽象的）+ HubSpot（オファー先行 > 機能説明）
 * MCP実績で DL率の高い資料を各variantに紐付け
 */
const copy = {
  google: {
    badge: '【無料DL】AI SDR導入の適性診断シート',
    h1: ['自社に本当にAI SDRは必要？', '10分で分かる適性診断'],
    sub: '人手不足のSDR部門にAIを入れるべきか、診断シートで可視化。商談数・対応速度・工数を定量評価し、導入判断の根拠をまとめます。',
    formHeading: '【無料】AI SDR導入の\n適性診断シートをDL',
    formSub: '10ページ / 4分で読める。人手不足・商談数低迷の課題を整理した診断ワークブック。',
  },
  linkedin: {
    badge: '営業/マーケリーダー向け 限定配布',
    h1: ['商談数+40%を達成した', 'AI SDR 運用ガイド'],
    sub: '導入初週から商談を創出した企業の実例と、AI SDRを「使いこなす」ための運用設計・KPI設定を解説。',
    formHeading: '【無料】商談数+40%達成の\n運用ガイドをDL',
    formSub: '13ページ / 6分で読める。導入から定着までの実施ステップを時系列でまとめました。',
  },
  'web-chat': {
    badge: '【無料DL】比較ホワイトペーパー',
    h1: ['AIチャットボット vs', 'AI営業エージェント 徹底比較'],
    sub: 'サイト訪問者対応の自動化ツール選定で迷う担当者向け。機能・コスト・商談化率で両者の違いを定量比較します。',
    formHeading: '【無料】AIチャットボット vs\nAI営業エージェント比較資料',
    formSub: '10ページ / 4分で読める。よくある比較ポイント14項目を一覧化した選定ガイド。',
  },
  'inside-sales': {
    badge: '【無料DL】営業インパクト実証データ',
    h1: ['問い合わせ直後の対応速度が', '商談化率を左右する'],
    sub: '対応までの時間を42時間→5秒に短縮すると何が起きるか。実データで示す、インサイドセールスの「初動」が売上に与える影響。',
    formHeading: '【無料】即時対応の\n営業インパクト資料をDL',
    formSub: '10ページ / 4分で読める。対応速度別の商談化率、成約率、失注率の実測データ付き。',
  },
  'meeting': {
    badge: '【無料DL】商談自動化事例集',
    h1: ['商談化率40%以上を実現した', '導入事例まとめ'],
    sub: '業界・規模別にAI商談自動化の導入事例を収録。運用体制、KPI、改善プロセスまで解説した事例集。',
    formHeading: '【無料】商談自動化\n導入事例集をDL',
    formSub: '業種別の成功パターンと失敗回避のチェックポイントを事例と共にまとめました。',
  },
  'lead-gen': {
    badge: '【無料DL】業界別ベンチマーク資料',
    h1: ['業界別 問い合わせ率の', '平均値と改善ポイント'],
    sub: '自社の問い合わせ率は業界平均より上か下か。業種別ベンチマーク値と、問い合わせ率を2倍にした施策の実例を一覧化。',
    formHeading: '【無料】業界別\nベンチマーク資料をDL',
    formSub: '10ページ / 4分で読める。業種別の問い合わせ率平均値と、改善の優先ポイントを1冊に。',
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
            if (window.lintrk) {
              window.lintrk('track', { conversion_id: 25161212 })
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
    const schedule = (cb: () => void) => {
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback
      if (idle) { idle(cb, { timeout: 2000 }) } else { setTimeout(cb, 1500) }
    }
    schedule(load)
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

    const fired = { scroll25: false, scroll50: false, scroll75: false, formView: false }

    const onScroll = () => {
      setScrolled(window.scrollY > 600)
      const scrollPct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
      if (!fired.scroll25 && scrollPct >= 25) {
        fired.scroll25 = true
        window.gtag?.('event', 'lp_scroll_25', { lp_variant: variant })
      }
      if (!fired.scroll50 && scrollPct >= 50) {
        fired.scroll50 = true
        window.gtag?.('event', 'lp_scroll_50', { lp_variant: variant })
      }
      if (!fired.scroll75 && scrollPct >= 75) {
        fired.scroll75 = true
        window.gtag?.('event', 'lp_scroll_75', { lp_variant: variant })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const formEl = document.getElementById('lp-inline-form')
    let observer: IntersectionObserver | null = null
    if (formEl && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !fired.formView) {
            fired.formView = true
            window.gtag?.('event', 'lp_form_view', { lp_variant: variant })
            observer?.disconnect()
          }
        }
      }, { threshold: 0.5 })
      observer.observe(formEl)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer?.disconnect()
    }
  }, [variant])

  return (
    <>
      <style>{lpCSS}</style>

      {/* ── STICKY TOP BAR ── */}
      <div className={'lp-sticky-bar' + (scrolled ? ' visible' : '')}>
        <div className="lp-sticky-inner">
          <span className="lp-sticky-text">
            <strong>Meeton ai</strong> — 14日間無料トライアル
          </span>
          <button className="lp-btn-primary lp-btn-sm" onClick={() => { window.gtag?.('event', 'lp_cta_demo_click', { lp_variant: variant, location: 'sticky_bar' }); setMeetingOpen(true) }}>
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
              <h2 className="lp-form-heading">{c.formHeading.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}</h2>
              <p className="lp-form-sub">{c.formSub}</p>
              <InlineHubSpotForm utmCampaign={utmCampaign} />
              <div className="lp-form-divider">
                <span>または</span>
              </div>
              <button className="lp-btn-meeting-link" onClick={() => { window.gtag?.('event', 'lp_cta_demo_click', { lp_variant: variant, location: 'form_secondary' }); setMeetingOpen(true) }}>
                今すぐ話を聞きたい方は<strong>デモを予約 →</strong>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT LOGOS (scrolling carousel) ── */}
      <section className="lp-trust-bar">
        <div className="lp-trust-carousel">
          <div className="lp-trust-track">
            {[...clients, ...clients].map((cl, i) => (
              <div className="lp-trust-item" key={`${cl.name}-${i}`}>
                <img src={cl.logo} alt={cl.name} className="lp-trust-logo" loading="lazy" />
              </div>
            ))}
          </div>
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

      {/* ── 4つの武器 with UI mockups ── */}
      <section className="lp-section">
        <div className="lp-section-inner">
          <h2 className="lp-h2">商談をつくる、4つの武器</h2>
          <p className="lp-section-sub" style={{ marginBottom: 48 }}>AIチャットを軸に、メール・商談予約・資料提案が連携。あらゆる接点から商談を自動獲得します。</p>

          {/* AI Chat */}
          <div className="lp-weapon-row">
            <div className="lp-weapon-copy">
              <div className="lp-weapon-badge" style={{ color: '#12a37d', background: '#e5f8f2' }}>AIチャット</div>
              <h3 className="lp-weapon-h3">訪問者と対話し、商談予約まで完結</h3>
              <ul className="lp-weapon-list">
                <li>ページ文脈に応じた自動声かけ</li>
                <li>会話の流れで資料提案・疑問解消</li>
                <li>温度感に応じて商談予約まで誘導</li>
              </ul>
            </div>
            <div className="lp-weapon-mockup">
              <div className="lp-mock-chat">
                <div className="lp-mock-chat-hdr">
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #12a37d, #0fc19a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>M</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--heading)' }}>Meeton ai</div>
                    <div style={{ fontSize: 10, color: '#12a37d', display: 'flex', alignItems: 'center', gap: 4 }}><span className="lp-pulse-dot" />オンライン</div>
                  </div>
                </div>
                <div className="lp-mock-chat-body">
                  <div className="lp-mock-msg lp-mock-ai">こんにちは！料金プランについてご質問はありますか？</div>
                  <div className="lp-mock-msg lp-mock-user">導入事例を知りたいです</div>
                  <div className="lp-mock-msg lp-mock-ai">御社と同じ業界の事例をご用意しています。資料をお送りしましょうか？</div>
                  <div className="lp-mock-msg lp-mock-user">はい、お願いします</div>
                  <div className="lp-mock-msg lp-mock-ai">
                    ありがとうございます！さらに詳しくご説明しますので、商談をご予約ください。
                    <div className="lp-mock-cal-mini">
                      <span className="lp-mock-slot">月 10:00</span>
                      <span className="lp-mock-slot lp-mock-slot-active">水 14:00</span>
                      <span className="lp-mock-slot">金 11:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Email */}
          <div className="lp-weapon-row lp-weapon-row-rev">
            <div className="lp-weapon-copy">
              <div className="lp-weapon-badge" style={{ color: '#3b6ff5', background: '#eaf0fe' }}>AIメール</div>
              <h3 className="lp-weapon-h3">未反応リードも逃さず商談化</h3>
              <ul className="lp-weapon-list">
                <li>フォーム送信直後にAIメールを自動送信</li>
                <li>Day 1/3/5で自動フォローアップ</li>
                <li>返信にもAIが自動応答</li>
              </ul>
            </div>
            <div className="lp-weapon-mockup">
              <div className="lp-mock-email">
                {[
                  { day: 'Day 0', subject: '資料をお送りしました', status: '開封済み', statusColor: '#12a37d', bar: '100%' },
                  { day: 'Day 1', subject: 'ご確認いただけましたか？', status: '開封済み', statusColor: '#12a37d', bar: '80%' },
                  { day: 'Day 3', subject: 'よくある質問をまとめました', status: '送信済み', statusColor: '#3b6ff5', bar: '60%' },
                  { day: 'Day 5', subject: '15分だけお時間いただけませんか？', status: '送信予定', statusColor: '#6e7494', bar: '40%' },
                ].map((e, i) => (
                  <div className="lp-mock-email-row" key={i} style={{ animationDelay: `${0.3 + i * 0.15}s` }}>
                    <div className="lp-mock-email-day">{e.day}</div>
                    <div className="lp-mock-email-subject">{e.subject}</div>
                    <div className="lp-mock-email-status" style={{ color: e.statusColor }}>{e.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Calendar */}
          <div className="lp-weapon-row">
            <div className="lp-weapon-copy">
              <div className="lp-weapon-badge" style={{ color: '#0891b2', background: '#ecfeff' }}>AIカレンダー</div>
              <h3 className="lp-weapon-h3">関心が高い瞬間に、商談を獲得</h3>
              <ul className="lp-weapon-list">
                <li>チャット内でそのまま商談予約</li>
                <li>サンクスページで即カレンダー提示</li>
                <li>事前ヒアリングまでAIが自動完了</li>
              </ul>
            </div>
            <div className="lp-weapon-mockup">
              <div className="lp-mock-cal">
                <div className="lp-mock-cal-hdr">商談日時を選択</div>
                <div className="lp-mock-cal-grid">
                  {['月 10:00', '月 14:00', '火 10:00', '火 15:00', '水 11:00', '水 14:00', '木 10:00', '木 16:00', '金 11:00'].map((t, i) => (
                    <div className={'lp-mock-cal-slot' + (i === 5 ? ' active' : '')} key={i}>{t}</div>
                  ))}
                </div>
                <div className="lp-mock-cal-confirm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#12a37d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>水 14:00 で商談確定！営業チームへ自動通知</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Offer */}
          <div className="lp-weapon-row lp-weapon-row-rev">
            <div className="lp-weapon-copy">
              <div className="lp-weapon-badge" style={{ color: '#7c5cfc', background: '#f0ecfe' }}>AIオファー</div>
              <h3 className="lp-weapon-h3">最適な資料を自動で提案</h3>
              <ul className="lp-weapon-list">
                <li>閲覧ページに応じて資料を自動マッチング</li>
                <li>最適タイミングでポップアップ表示</li>
                <li>DL時にリード情報を獲得</li>
              </ul>
            </div>
            <div className="lp-weapon-mockup">
              <div className="lp-mock-offer">
                {[
                  { title: 'サービス概要資料', match: '98%', tag: 'おすすめ', tagColor: '#12a37d' },
                  { title: '料金比較表', match: '92%', tag: '閲覧中', tagColor: '#3b6ff5' },
                  { title: '導入事例集', match: '85%', tag: '', tagColor: '' },
                ].map((o, i) => (
                  <div className="lp-mock-offer-card" key={i}>
                    <div className="lp-mock-offer-info">
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--heading)' }}>{o.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--sub)' }}>マッチ度 {o.match}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {o.tag && <span className="lp-mock-offer-tag" style={{ color: o.tagColor, background: `${o.tagColor}15` }}>{o.tag}</span>}
                      <div className="lp-mock-offer-dl">DL</div>
                    </div>
                  </div>
                ))}
                <div style={{ fontSize: 11, color: 'var(--sub)', textAlign: 'center', marginTop: 8 }}>AIが閲覧行動から最適な資料をレコメンド</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MID CTA ── */}
      <section className="lp-mid-cta">
        <div className="lp-mid-cta-inner">
          <h2 className="lp-h2" style={{ marginBottom: 8, fontSize: 'clamp(20px,3vw,28px)' }}>4つの武器を資料で詳しく見る</h2>
          <p className="lp-section-sub" style={{ marginBottom: 24 }}>機能・導入事例・料金をまとめた資料を無料でお送りします</p>
          <button className="lp-btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            無料で資料をダウンロード
          </button>
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

      {/* ── TESTIMONIALS ── */}
      <section className="lp-section">
        <div className="lp-section-inner">
          <h2 className="lp-h2">導入企業の声</h2>
          <div className="lp-testimonials">
            <div className="lp-testimonial">
              <div className="lp-testimonial-quote">&ldquo;導入初週から商談が入り始めました。深夜のリードにも即座に対応してくれるので、営業チームは朝出社すると商談が入っている状態です。&rdquo;</div>
              <div className="lp-testimonial-author">
                <div className="lp-testimonial-avatar" style={{ background: 'linear-gradient(135deg, #12a37d, #0fc19a)' }}>G</div>
                <div>
                  <div className="lp-testimonial-name">G-gen</div>
                  <div className="lp-testimonial-role">Google Cloud Premier Partner</div>
                </div>
              </div>
            </div>
            <div className="lp-testimonial">
              <div className="lp-testimonial-quote">&ldquo;AIが事前ヒアリングまで済ませてくれるので、商談の質が格段に上がりました。営業メンバーが本来の提案業務に集中できるようになりました。&rdquo;</div>
              <div className="lp-testimonial-author">
                <div className="lp-testimonial-avatar" style={{ background: 'linear-gradient(135deg, #3b6ff5, #60a5fa)' }}>B</div>
                <div>
                  <div className="lp-testimonial-name">BizteX</div>
                  <div className="lp-testimonial-role">クラウドRPA</div>
                </div>
              </div>
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
            {(variantFaq[variant] || [...faqData]).map((f, i) => (
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
          <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
          <a href="/terms/" target="_blank" rel="noopener noreferrer">利用規約</a>
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

/* ── TRUST BAR (scrolling carousel) ── */
@keyframes logoScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.lp-trust-bar{padding:20px 0;background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border);overflow:hidden}
.lp-trust-carousel{overflow:hidden;position:relative;width:100%;mask-image:linear-gradient(90deg,transparent 0%,#000 10%,#000 90%,transparent 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 10%,#000 90%,transparent 100%)}
.lp-trust-track{display:flex;gap:24px;animation:logoScroll 20s linear infinite;width:max-content}
.lp-trust-track:hover{animation-play-state:paused}
.lp-trust-item{padding:12px 24px;background:var(--bg);border:1px solid var(--border);border-radius:10px;display:flex;align-items:center;justify-content:center;min-width:120px;height:56px;flex-shrink:0;transition:all .3s}
.lp-trust-item:hover{border-color:var(--cta);box-shadow:0 2px 8px rgba(0,0,0,.04)}
.lp-trust-logo{height:24px;width:auto;object-fit:contain;opacity:.55;transition:opacity .2s;filter:grayscale(100%)}
.lp-trust-item:hover .lp-trust-logo{opacity:1;filter:none}

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

/* ── 4 WEAPONS (rich rows) ── */
.lp-weapon-row{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-bottom:56px}
.lp-weapon-row:last-child{margin-bottom:0}
.lp-weapon-row-rev{direction:rtl}.lp-weapon-row-rev>*{direction:ltr}
.lp-weapon-badge{display:inline-block;font-size:13px;font-weight:700;padding:5px 14px;border-radius:8px;margin-bottom:14px}
.lp-weapon-h3{font-size:clamp(20px,3vw,26px);font-weight:900;color:var(--heading);line-height:1.3;margin-bottom:16px}
.lp-weapon-list{list-style:none;display:flex;flex-direction:column;gap:10px}
.lp-weapon-list li{font-size:15px;line-height:1.6;color:var(--text);padding-left:22px;position:relative}
.lp-weapon-list li::before{content:'';position:absolute;left:0;top:8px;width:8px;height:8px;border-radius:50%;background:var(--cta)}

/* Mock: Chat */
.lp-mock-chat{border-radius:16px;border:1px solid var(--border);overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.06)}
.lp-mock-chat-hdr{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--border);background:var(--surface)}
.lp-mock-chat-body{padding:16px;display:flex;flex-direction:column;gap:10px;background:#fff;min-height:220px}
.lp-mock-msg{max-width:80%;padding:10px 14px;border-radius:12px;font-size:13px;line-height:1.6;color:var(--text)}
.lp-mock-ai{background:var(--surface);align-self:flex-start;border-bottom-left-radius:4px}
.lp-mock-user{background:var(--cta);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
.lp-mock-cal-mini{display:flex;gap:6px;margin-top:8px}
.lp-mock-slot{font-size:11px;padding:4px 10px;border-radius:6px;background:var(--bg);border:1px solid var(--border);color:var(--sub);font-weight:600}
.lp-mock-slot-active{background:#0891b2;color:#fff;border-color:#0891b2}
.lp-pulse-dot{width:6px;height:6px;border-radius:50%;background:#12a37d;display:inline-block;animation:pulse 2s infinite}

/* Mock: Email */
.lp-mock-email{border-radius:16px;border:1px solid var(--border);overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.06);background:#fff}
.lp-mock-email-row{display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:1px solid var(--border);animation:fadeUp .5s ease-out forwards;opacity:0}
.lp-mock-email-row:last-child{border-bottom:none}
.lp-mock-email-day{font-family:var(--fm);font-size:12px;font-weight:700;color:var(--heading);min-width:44px}
.lp-mock-email-subject{flex:1;font-size:13px;color:var(--text);font-weight:500}
.lp-mock-email-status{font-size:11px;font-weight:700;white-space:nowrap}

/* Mock: Calendar */
.lp-mock-cal{border-radius:16px;border:1px solid var(--border);overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.06);background:#fff;padding:20px}
.lp-mock-cal-hdr{font-size:15px;font-weight:800;color:var(--heading);margin-bottom:16px;text-align:center}
.lp-mock-cal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px}
.lp-mock-cal-slot{font-size:12px;padding:10px 8px;border-radius:8px;background:var(--surface);border:1px solid var(--border);text-align:center;color:var(--text);font-weight:600;transition:all .2s;cursor:default}
.lp-mock-cal-slot.active{background:#0891b2;color:#fff;border-color:#0891b2;box-shadow:0 4px 12px rgba(8,145,178,.3)}
.lp-mock-cal-confirm{display:flex;align-items:center;gap:8px;font-size:13px;color:#12a37d;font-weight:700;justify-content:center;padding:12px;background:#ecfdf5;border-radius:10px}

/* Mock: Offer */
.lp-mock-offer{border-radius:16px;border:1px solid var(--border);overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.06);background:#fff;padding:16px}
.lp-mock-offer-card{display:flex;align-items:center;justify-content:space-between;padding:14px;border-radius:10px;border:1px solid var(--border);margin-bottom:8px;transition:all .2s}
.lp-mock-offer-card:last-of-type{margin-bottom:0}
.lp-mock-offer-card:hover{border-color:var(--cta);box-shadow:0 2px 8px rgba(0,0,0,.04)}
.lp-mock-offer-info{display:flex;flex-direction:column;gap:2px}
.lp-mock-offer-tag{font-size:10px;font-weight:700;padding:3px 8px;border-radius:6px}
.lp-mock-offer-dl{width:32px;height:32px;border-radius:8px;background:var(--cta);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;cursor:default}

/* ── MID CTA ── */
.lp-mid-cta{padding:48px 24px;text-align:center;background:linear-gradient(135deg,#ecfdf5 0%,#eaf0fe 100%);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.lp-mid-cta-inner{max-width:560px;margin:0 auto}

/* ── TESTIMONIALS ── */
.lp-testimonials{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.lp-testimonial{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:28px;position:relative}
.lp-testimonial-quote{font-size:15px;line-height:1.8;color:var(--text);margin-bottom:20px;font-style:italic}
.lp-testimonial-author{display:flex;align-items:center;gap:12px}
.lp-testimonial-avatar{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:16px;flex-shrink:0}
.lp-testimonial-name{font-size:14px;font-weight:800;color:var(--heading)}
.lp-testimonial-role{font-size:12px;color:var(--sub)}

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
  .lp-weapon-row,.lp-weapon-row-rev{grid-template-columns:1fr;gap:24px;direction:ltr;margin-bottom:40px}
  .lp-weapon-row-rev>*{direction:ltr}
  .lp-testimonials{grid-template-columns:1fr;gap:16px}
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
