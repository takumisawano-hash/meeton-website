'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import HubSpotMeetingModal from '../components/HubSpotMeetingModal'

type RoiCalcShape = {
  monthlyVisits: number
  monthlyEngageable: number
  trafficSource: string
  confidence: 'high' | 'medium' | 'low'
  trancoRank?: number
  category?: string
  jpShareRatio?: number
  topKeywords?: Array<{ name: string; volume?: number }>
  expected: {
    meetingsPerMonth: number
    autoFollowedLeadsPerMonth: number
    hoursSavedPerMonth: number
    hoursSavedAsHeadcount: number
  }
  uplift?: { addLeadsPerMonth: number; currentLeadsPerMonth: number; expectedLeadsPerMonth: number }
  basis: {
    engageableRate: number
    leadCvrPct: number
    meetingCvrPct: number
    boost: number
    hoursPerMeeting: number
    hoursPerFollowup: number
    standardSdrHoursPerMonth: number
    sdrHeadcount?: number
    sdrHeadcountSource: 'user-input' | 'unknown'
    capApplied: boolean
  }
}

type CompanyShape = { name: string; domain?: string; industry?: string; employees?: string }
type CompanyInsightsShape = {
  flagshipProduct?: string
  customerType?: string
  strength?: string
  recentActivity?: string
  meetingAiOpportunity?: string
}
type Result = { company: CompanyShape; companyInsights?: CompanyInsightsShape; roi: RoiCalcShape | null }

type Step = 'welcome' | 'inputs' | 'result'

const STORAGE_UNLOCKED = 'mlp_roi_unlocked'
const HUBSPOT_PORTAL_ID = '45872857'
const HUBSPOT_FORM_ID = 'dd42d8b3-e426-4079-9479-fa28287c0544'

function readQuery(): { domain: string; visits?: string; leads?: string; sdr?: string } {
  if (typeof window === 'undefined') return { domain: '' }
  const p = new URLSearchParams(window.location.search)
  return {
    domain: p.get('domain') || '',
    visits: p.get('visits') || '',
    leads: p.get('leads') || '',
    sdr: p.get('sdr') || '',
  }
}

function setQuery(params: Record<string, string | number | undefined>) {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === '' || v === null) url.searchParams.delete(k)
    else url.searchParams.set(k, String(v))
  })
  window.history.replaceState(null, '', url.toString())
}

function StatBig({ label, value, accent, blurred }: { label: string; value: string; accent?: string; blurred?: boolean }) {
  return (
    <div
      style={{
        flex: '1 1 200px',
        minWidth: 200,
        background: '#fff',
        border: '1px solid #e4e3dd',
        borderRadius: 14,
        padding: '22px 26px',
        filter: blurred ? 'blur(8px)' : undefined,
        userSelect: blurred ? 'none' : undefined,
        pointerEvents: blurred ? 'none' : undefined,
      }}
    >
      <div style={{ fontSize: 12, color: '#6b7873', letterSpacing: '0.05em', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.15, color: accent || '#0a0e0c' }}>{value}</div>
    </div>
  )
}

const ANALYSIS_STEPS = [
  'SimilarWeb から月間訪問数・業種・流入経路を取得',
  '貴社サイト本文を読み込み',
  'AI が主力製品・顧客層・強みを要約',
  'Meeton ai 導入後の月次ROIを計算',
] as const

function AnalysisProgress({ step }: { step: number }) {
  return (
    <div style={{ marginTop: 22, padding: '20px 22px', background: '#f4f7f5', border: '1px solid #d4dcd6', borderRadius: 12 }}>
      <style>{`
        @keyframes mlpSpin { to { transform: rotate(360deg) } }
        .mlp-spinner {
          width: 16px; height: 16px;
          border: 2px solid #c8d3cd;
          border-top-color: #0eab6e;
          border-radius: 50%;
          animation: mlpSpin 0.7s linear infinite;
          flex-shrink: 0;
        }
      `}</style>
      <div style={{ fontSize: 12, color: '#065f46', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 12 }}>
        ▸ AI が貴社のWebサイトを解析しています
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
        {ANALYSIS_STEPS.map((label, i) => {
          const state = step > i ? 'done' : step === i ? 'active' : 'pending'
          return (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: state === 'pending' ? '#9aa39e' : '#0a0e0c', fontWeight: state === 'active' ? 600 : 400 }}>
              {state === 'done' ? (
                <span style={{ width: 16, height: 16, background: '#0eab6e', color: '#fff', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>✓</span>
              ) : state === 'active' ? (
                <span className="mlp-spinner" />
              ) : (
                <span style={{ width: 16, height: 16, border: '2px solid #c8d3cd', borderRadius: '50%', flexShrink: 0 }} />
              )}
              {label}
            </li>
          )
        })}
      </ul>
      <div style={{ marginTop: 14, height: 4, background: '#d4dcd6', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${Math.min(100, (Math.max(0, step) / ANALYSIS_STEPS.length) * 100)}%`, height: '100%', background: '#0eab6e', transition: 'width 1.2s ease-out' }} />
      </div>
    </div>
  )
}

function ProgressBar({ step }: { step: Step }) {
  const order: Step[] = ['welcome', 'inputs', 'result']
  const idx = order.indexOf(step) + 1
  const total = order.length
  const pct = (idx / total) * 100
  return (
    <div className="no-print" style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 11, color: '#6b7873', letterSpacing: '0.1em', marginBottom: 6 }}>
        Step {idx} / {total}
      </div>
      <div style={{ height: 4, background: '#e4e3dd', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: '#0eab6e', transition: 'width 0.3s' }} />
      </div>
    </div>
  )
}

async function submitToHubSpot(opts: {
  email: string
  companyName: string
  companyUrl: string
  visits?: number
  leads?: number
  sdr?: number
  expectedMeetings?: number
  expectedHoursSaved?: number
}) {
  const fields = [
    { name: 'email', value: opts.email },
    { name: 'company', value: opts.companyName },
    { name: 'website', value: opts.companyUrl },
  ]
  const body = {
    fields,
    context: {
      pageUri: typeof window !== 'undefined' ? window.location.href : '',
      pageName: 'ROI Simulator',
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: 'ROI 試算結果の表示およびご連絡のため、 ご入力情報を処理いたします',
      },
    },
  }
  try {
    await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    // silently fail; lead is still partially recovered via /api/lp/track
  }
  // Also log to our own tracking for redundancy
  try {
    await fetch('/api/lp/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId: 'roi-sim-' + Date.now().toString(36),
        type: 'company_submit',
        context: { source: 'roi-simulator', ...opts },
      }),
      keepalive: true,
    })
  } catch {
    // ignore
  }
}

export default function RoiSimulatorClient() {
  const [step, setStep] = useState<Step>('welcome')
  const [unlocked, setUnlocked] = useState(false)
  const [domain, setDomain] = useState('')
  const [visits, setVisits] = useState('')
  const [leads, setLeads] = useState('')
  const [sdr, setSdr] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [unlockSubmitting, setUnlockSubmitting] = useState(false)
  const [calcSubmitting, setCalcSubmitting] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [demoOpen, setDemoOpen] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(-1)
  const autoRanRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (localStorage.getItem(STORAGE_UNLOCKED) === '1') setUnlocked(true)
    } catch {
      // ignore
    }
    const q = readQuery()
    if (q.domain) {
      setDomain(q.domain)
      setStep('inputs')
    }
    if (q.visits) setVisits(q.visits)
    if (q.leads) setLeads(q.leads)
    if (q.sdr) setSdr(q.sdr)
  }, [])

  const runCalc = useCallback(async () => {
    const trimmed = domain.trim()
    if (!trimmed) return
    setCalcSubmitting(true)
    setAnalysisStep(0)
    setError(null)
    const stepTimers: Array<ReturnType<typeof setTimeout>> = []
    stepTimers.push(setTimeout(() => setAnalysisStep(1), 2000))
    stepTimers.push(setTimeout(() => setAnalysisStep(2), 5500))
    stepTimers.push(setTimeout(() => setAnalysisStep(3), 9500))
    const toInt = (v: string) => {
      const n = parseInt(v.replace(/[^0-9]/g, ''), 10)
      return Number.isFinite(n) && n > 0 ? n : undefined
    }
    setQuery({ domain: trimmed, visits: toInt(visits), leads: toInt(leads), sdr: toInt(sdr) })
    try {
      const r = await fetch('/api/lp/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyUrl: trimmed,
          companyName: companyName.trim() || undefined,
          pagePath: '/roi-simulator/',
          userMonthlyVisits: toInt(visits),
          userMonthlyLeads: toInt(leads),
          userSdrCount: toInt(sdr),
        }),
      })
      stepTimers.forEach(clearTimeout)
      if (!r.ok) {
        setError('試算に失敗しました。 もう一度お試しください。')
        return
      }
      const data = await r.json()
      setAnalysisStep(4)
      setResult({ company: data.profile.company, companyInsights: data.profile.companyInsights, roi: data.lp.trafficRoi })
      setStep('result')
    } catch {
      stepTimers.forEach(clearTimeout)
      setError('試算に失敗しました。 ネットワークをご確認ください。')
    } finally {
      setCalcSubmitting(false)
      setTimeout(() => setAnalysisStep(-1), 800)
    }
  }, [companyName, domain, leads, sdr, visits])

  useEffect(() => {
    if (autoRanRef.current) return
    if (step !== 'inputs' || !domain || result || calcSubmitting) return
    const q = readQuery()
    if (q.domain && q.domain === domain) {
      autoRanRef.current = true
      runCalc()
    }
  }, [step, domain, result, calcSubmitting, runCalc])

  const handleUnlock = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const trimmedEmail = email.trim()
      const trimmedCo = companyName.trim() || result?.company.name || ''
      if (!trimmedEmail || !trimmedEmail.includes('@')) {
        setError('有効なメールアドレスをご入力ください')
        return
      }
      setUnlockSubmitting(true)
      setError(null)
      const toInt = (v: string) => {
        const n = parseInt(v.replace(/[^0-9]/g, ''), 10)
        return Number.isFinite(n) && n > 0 ? n : undefined
      }
      await submitToHubSpot({
        email: trimmedEmail,
        companyName: trimmedCo || domain,
        companyUrl: domain,
        visits: toInt(visits),
        leads: toInt(leads),
        sdr: toInt(sdr),
        expectedMeetings: result?.roi?.expected.meetingsPerMonth,
        expectedHoursSaved: result?.roi?.expected.hoursSavedPerMonth,
      })
      try {
        localStorage.setItem(STORAGE_UNLOCKED, '1')
      } catch {
        // ignore
      }
      setUnlocked(true)
      setUnlockSubmitting(false)
    },
    [companyName, domain, email, leads, result, sdr, visits]
  )

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print()
  }

  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 48px) 80px' }}>
      <style>{`
        @media print {
          @page { margin: 14mm; size: A4; }
          .no-print { display: none !important; }
          html, body { background: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          main { padding: 0 !important; max-width: none !important; margin: 0 !important; }
          header { margin-bottom: 14px !important; }
          h1 { font-size: 22px !important; line-height: 1.4 !important; }
          h2 { font-size: 16px !important; line-height: 1.4 !important; page-break-after: avoid; }
          h3 { font-size: 14px !important; }
          section { padding: 12px 0 !important; border: none !important; box-shadow: none !important; page-break-inside: avoid; }
          .blur-target { filter: none !important; pointer-events: auto !important; user-select: auto !important; }
          /* Stat row 3列を縦並びに(PDFで横切れ防止) */
          .stat-row { display: block !important; }
          .stat-row > div { width: 100% !important; max-width: none !important; flex: none !important; margin-bottom: 10px !important; padding: 12px 16px !important; box-shadow: none !important; }
          .stat-row > div > div:last-child { font-size: 22px !important; }
          /* 文字切れ防止 */
          *, *::before, *::after { overflow: visible !important; word-wrap: break-word !important; overflow-wrap: anywhere !important; }
          /* ぼかしフォーム gate を完全非表示 */
          .gate-overlay { display: none !important; }
        }
      `}</style>

      <header className="no-print" style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.18em', color: '#065f46', textTransform: 'uppercase', marginBottom: 12 }}>
          ▸ AI ROI Simulator
        </div>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.25, margin: '0 0 14px' }}>
          {step === 'welcome'
            ? '貴社のROIを60秒で試算'
            : step === 'inputs'
              ? '現状をいくつか教えてください'
              : `${result?.company.name || '貴社'} 様向け ROI 試算結果`}
        </h1>
        <p style={{ fontSize: 16, color: '#3d4a44', lineHeight: 1.7, margin: 0 }}>
          {step === 'welcome'
            ? 'WebサイトURLと現状指標から、 月間商談数・工数削減・売上ポテンシャルを即時試算します。'
            : step === 'inputs'
              ? 'すべて任意・URL以外は空欄でも試算可能です。 数字は精度UPに使います。'
              : 'AI が貴社のWebサイトを解析し、 Meeton ai 導入後の効果を算出しました。'}
        </p>
      </header>

      <ProgressBar step={step} />

      {step === 'welcome' ? (
        <section className="no-print" style={{ background: '#fff', border: '1px solid #e4e3dd', borderRadius: 14, padding: 'clamp(28px, 4vw, 44px)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.4, margin: '0 0 14px' }}>
            こんな結果が見られます
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'grid', gap: 10 }}>
            <li style={{ fontSize: 15, color: '#3d4a44' }}>✓ 月間自動獲得される商談数</li>
            <li style={{ fontSize: 15, color: '#3d4a44' }}>✓ AI が代替する営業工数(時間/月)</li>
            <li style={{ fontSize: 15, color: '#3d4a44' }}>✓ 業界カテゴリ・流入経路 自動分析</li>
            <li style={{ fontSize: 15, color: '#3d4a44' }}>✓ 貴社主力製品・顧客層を AI 解析</li>
            <li style={{ fontSize: 15, color: '#3d4a44' }}>✓ 結果を PDF で持ち帰り、 社内共有</li>
          </ul>
          <button
            onClick={() => setStep('inputs')}
            style={{ padding: '14px 32px', fontSize: 16, fontWeight: 700, background: '#0eab6e', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer' }}
          >
            試算を始める →
          </button>
          <div style={{ fontSize: 11, color: '#6b7873', marginTop: 14 }}>
            所要時間 約60秒 / すべて任意 / メールアドレスは詳細結果の表示時に
          </div>
        </section>
      ) : null}

      {step === 'inputs' ? (
        <form
          className="no-print"
          onSubmit={e => {
            e.preventDefault()
            runCalc()
          }}
          style={{ background: '#fff', border: '1px solid #e4e3dd', borderRadius: 14, padding: 'clamp(20px, 3vw, 28px)' }}
        >
          <label style={{ display: 'block', fontSize: 13, color: '#3d4a44', fontWeight: 600, marginBottom: 6 }}>
            Webサイト URL またはドメイン <span style={{ color: '#b91c1c' }}>*</span>
          </label>
          <input
            type="text"
            value={domain}
            onChange={e => setDomain(e.target.value)}
            placeholder="例) example.co.jp / https://corp.example.com"
            required
            autoFocus
            style={{ width: '100%', padding: '12px 14px', fontSize: 16, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff', outline: 'none', marginBottom: 16 }}
          />
          <div style={{ display: 'grid', gap: 18, marginBottom: 8 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#0a0e0c', fontWeight: 600, marginBottom: 4 }}>
                月間訪問数(およそ) <span style={{ fontSize: 11, color: '#6b7873', fontWeight: 400 }}>任意</span>
              </label>
              <div style={{ fontSize: 11, color: '#6b7873', marginBottom: 8 }}>
                ご存知でない場合は空欄で結構です。 SimilarWeb 等から自動取得します。
              </div>
              <input
                type="text"
                inputMode="numeric"
                value={visits}
                onChange={e => setVisits(e.target.value)}
                placeholder="例) 50000"
                style={{ width: '100%', padding: '12px 14px', fontSize: 15, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#0a0e0c', fontWeight: 600, marginBottom: 4 }}>
                月間獲得リード数 <span style={{ fontSize: 11, color: '#6b7873', fontWeight: 400 }}>任意</span>
              </label>
              <div style={{ fontSize: 11, color: '#6b7873', marginBottom: 8 }}>
                現状値があれば「現状◯件 → 導入後+◯件」 の差分試算になります。
              </div>
              <input
                type="text"
                inputMode="numeric"
                value={leads}
                onChange={e => setLeads(e.target.value)}
                placeholder="例) 100"
                style={{ width: '100%', padding: '12px 14px', fontSize: 15, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#0a0e0c', fontWeight: 600, marginBottom: 4 }}>
                営業 / SDR の人数 <span style={{ fontSize: 11, color: '#6b7873', fontWeight: 400 }}>任意</span>
              </label>
              <div style={{ fontSize: 11, color: '#6b7873', marginBottom: 8 }}>
                工数削減を「営業◯人分」 として実数換算します。
              </div>
              <input
                type="text"
                inputMode="numeric"
                value={sdr}
                onChange={e => setSdr(e.target.value)}
                placeholder="例) 5"
                style={{ width: '100%', padding: '12px 14px', fontSize: 15, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff', outline: 'none' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" onClick={() => setStep('welcome')} disabled={calcSubmitting} style={{ padding: '12px 18px', background: 'transparent', border: '1px solid #d4d2c7', borderRadius: 8, color: '#3d4a44', cursor: calcSubmitting ? 'not-allowed' : 'pointer', fontSize: 14, opacity: calcSubmitting ? 0.5 : 1 }}>
              戻る
            </button>
            <button type="submit" disabled={calcSubmitting || !domain.trim()} style={{ flex: '1 1 auto', padding: '12px 18px', background: '#0eab6e', border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: 15, fontWeight: 700, opacity: calcSubmitting ? 0.7 : 1 }}>
              {calcSubmitting ? '貴社のWebサイトを解析中…' : '貴社向けROIを試算 →'}
            </button>
          </div>
          {error ? <div style={{ marginTop: 12, color: '#b91c1c', fontSize: 13 }}>{error}</div> : null}

          {analysisStep >= 0 ? <AnalysisProgress step={analysisStep} /> : null}
        </form>
      ) : null}

      {step === 'result' && result?.roi ? (
        <section style={{ background: '#fff', border: '1px solid #e4e3dd', borderRadius: 16, padding: 'clamp(24px, 4vw, 36px)' }}>
          <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.12em', color: '#065f46', textTransform: 'uppercase', marginBottom: 8 }}>
            ▸ {result.company.name} 様向け ROI 試算
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.3, margin: '0 0 18px' }}>
            月間訪問 {result.roi.monthlyVisits.toLocaleString('ja-JP')} → 自動商談 {result.roi.expected.meetingsPerMonth.toLocaleString('ja-JP')}件 / 工数削減 {result.roi.expected.hoursSavedPerMonth.toLocaleString('ja-JP')}h
          </h2>

          <div className="stat-row" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 18 }}>
            <StatBig label="自動獲得される商談/月" value={`${result.roi.expected.meetingsPerMonth.toLocaleString('ja-JP')}件`} accent="#0eab6e" />
            {result.roi.uplift ? (
              <StatBig label={`リード上乗せ/月 (現状${result.roi.uplift.currentLeadsPerMonth}件→)`} value={`+${result.roi.uplift.addLeadsPerMonth.toLocaleString('ja-JP')}件`} accent="#0eab6e" />
            ) : (
              <StatBig label="AIが自動フォローするリード/月" value={`${result.roi.expected.autoFollowedLeadsPerMonth.toLocaleString('ja-JP')}件`} accent="#0eab6e" />
            )}
            <StatBig label={result.roi.basis.sdrHeadcount ? `工数削減/月 (営業${result.roi.basis.sdrHeadcount}名)` : `工数削減/月 (営業${result.roi.expected.hoursSavedAsHeadcount}人分)`} value={`${result.roi.expected.hoursSavedPerMonth.toLocaleString('ja-JP')}時間`} accent="#0eab6e" />
          </div>

          <div style={{ position: 'relative' }}>
            <div className="blur-target" style={{ filter: unlocked ? 'none' : 'blur(8px)', userSelect: unlocked ? 'auto' : 'none', pointerEvents: unlocked ? 'auto' : 'none' }}>
              {result.companyInsights ? (
                <div style={{ borderTop: '1px solid #e4e3dd', paddingTop: 22, marginBottom: 22 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 14px' }}>AI が解析した貴社情報</h3>
                  <div style={{ display: 'grid', gap: 12, fontSize: 14, color: '#3d4a44', lineHeight: 1.75 }}>
                    {result.companyInsights.flagshipProduct ? <div><strong style={{ color: '#0a0e0c' }}>主力製品:</strong> {result.companyInsights.flagshipProduct}</div> : null}
                    {result.companyInsights.customerType ? <div><strong style={{ color: '#0a0e0c' }}>顧客層:</strong> {result.companyInsights.customerType}</div> : null}
                    {result.companyInsights.strength ? <div><strong style={{ color: '#0a0e0c' }}>強み:</strong> {result.companyInsights.strength}</div> : null}
                    {result.companyInsights.recentActivity ? <div><strong style={{ color: '#0a0e0c' }}>直近の動き:</strong> {result.companyInsights.recentActivity}</div> : null}
                    {result.companyInsights.meetingAiOpportunity ? <div><strong style={{ color: '#0a0e0c' }}>Meeton ai 貢献ポイント:</strong> {result.companyInsights.meetingAiOpportunity}</div> : null}
                  </div>
                </div>
              ) : null}

              <div style={{ borderTop: '1px solid #e4e3dd', paddingTop: 18, fontSize: 11, color: '#6b7873', lineHeight: 1.7 }}>
                ※ トラフィック出典:{' '}
                {result.roi.trafficSource === 'user-input'
                  ? 'ご入力の月間訪問数'
                  : result.roi.trafficSource === 'similarweb-free'
                    ? `SimilarWeb 実データ${result.roi.trancoRank ? ` (世界 ${result.roi.trancoRank.toLocaleString('ja-JP')} 位)` : ''}`
                    : result.roi.trafficSource === 'tranco-rank'
                      ? `Tranco rank ${result.roi.trancoRank?.toLocaleString('ja-JP')}位 から推定`
                      : '業種・規模ベンチマーク'}
                <br />※ 工数削減 = 商談1件あたり {result.roi.basis.hoursPerMeeting}h × 商談数 + AIフォロー1件 {result.roi.basis.hoursPerFollowup}h × フォロー件数{result.roi.basis.capApplied ? '(営業人数で上限調整)' : ''}
              </div>
            </div>

            {!unlocked ? (
              <div className="no-print gate-overlay" style={{ position: 'absolute', inset: '0 -8px -8px -8px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                <form
                  onSubmit={handleUnlock}
                  style={{ background: '#fff', border: '1px solid #d4d2c7', borderRadius: 14, padding: 'clamp(22px, 3vw, 32px)', maxWidth: 460, width: '100%', boxShadow: '0 18px 48px rgba(0,0,0,0.12)' }}
                >
                  <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.12em', color: '#065f46', textTransform: 'uppercase', marginBottom: 8 }}>
                    ▸ 詳細を表示するには
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.4, margin: '0 0 8px' }}>
                    AI解析インサイト と PDF を見る
                  </h3>
                  <p style={{ fontSize: 13, color: '#3d4a44', lineHeight: 1.65, margin: '0 0 16px' }}>
                    会社名とメールアドレスをご入力ください。 結果と PDF をその場で表示します。
                  </p>
                  <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', marginBottom: 6 }}>会社名 <span style={{ color: '#b91c1c' }}>*</span></label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder={result.company.name || '株式会社○○'}
                    required
                    style={{ width: '100%', padding: '11px 13px', fontSize: 14, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff', marginBottom: 12 }}
                  />
                  <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', marginBottom: 6 }}>メールアドレス <span style={{ color: '#b91c1c' }}>*</span></label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@company.co.jp"
                    required
                    style={{ width: '100%', padding: '11px 13px', fontSize: 14, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff', marginBottom: 16 }}
                  />
                  <button type="submit" disabled={unlockSubmitting} style={{ width: '100%', padding: '13px 20px', fontSize: 15, fontWeight: 700, background: '#0eab6e', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', opacity: unlockSubmitting ? 0.6 : 1 }}>
                    {unlockSubmitting ? '送信中…' : 'ROI詳細を見る'}
                  </button>
                  {error ? <div style={{ marginTop: 10, color: '#b91c1c', fontSize: 12 }}>{error}</div> : null}
                  <div style={{ fontSize: 10, color: '#6b7873', marginTop: 12, lineHeight: 1.6 }}>
                    入力情報は本ページの試算結果表示およびご連絡のためにのみ使用します
                  </div>
                </form>
              </div>
            ) : null}
          </div>

          <div className="no-print" style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setDemoOpen(true)}
              style={{ padding: '12px 22px', fontSize: 14, fontWeight: 700, background: '#0eab6e', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}
            >
              デモを予約 →
            </button>
            {unlocked ? (
              <>
                <button onClick={handlePrint} style={{ padding: '12px 22px', fontSize: 14, fontWeight: 700, background: '#0a0e0c', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                  📄 PDFとして保存・印刷
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      navigator.clipboard?.writeText(window.location.href)
                      alert('URLをコピーしました')
                    }
                  }}
                  style={{ padding: '12px 22px', fontSize: 14, fontWeight: 600, background: 'transparent', color: '#3d4a44', border: '1px solid #d4d2c7', borderRadius: 8, cursor: 'pointer' }}
                >
                  🔗 結果URLをコピー
                </button>
              </>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setStep('inputs')
                setResult(null)
                autoRanRef.current = true
              }}
              style={{ padding: '12px 22px', fontSize: 14, fontWeight: 600, background: 'transparent', color: '#3d4a44', border: '1px solid #d4d2c7', borderRadius: 8, cursor: 'pointer' }}
            >
              ↻ 別の URL で試算
            </button>
          </div>
        </section>
      ) : null}

      <HubSpotMeetingModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} utmCampaign="roi_simulator" />
    </main>
  )
}
