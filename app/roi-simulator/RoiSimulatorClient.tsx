'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import DemoBookingButton from '../components/DemoBookingButton'
const HubSpotMeetingModal = dynamic(() => import('../components/HubSpotMeetingModal'), { ssr: false })

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

// ── Result snapshot in URL hash ──────────────────────────────────────
function encodeSnapshot(r: Result): string {
  try {
    const json = JSON.stringify({ v: 1, r })
    const utf8 = new TextEncoder().encode(json)
    let bin = ''
    utf8.forEach((b) => (bin += String.fromCharCode(b)))
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  } catch {
    return ''
  }
}

function decodeSnapshot(s: string): Result | null {
  try {
    const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'))
    const bytes = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
    const json = new TextDecoder().decode(bytes)
    const parsed = JSON.parse(json) as { v: number; r: Result }
    if (parsed.v !== 1 || !parsed.r) return null
    return parsed.r
  } catch {
    return null
  }
}

function readSnapshotFromHash(): Result | null {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash
  const m = hash.match(/[#&]r=([^&]+)/)
  return m ? decodeSnapshot(decodeURIComponent(m[1])) : null
}

function setHashSnapshot(r: Result | null) {
  if (typeof window === 'undefined') return
  if (!r) {
    if (window.location.hash) {
      const url = new URL(window.location.href)
      url.hash = ''
      window.history.replaceState(null, '', url.toString())
    }
    return
  }
  const enc = encodeSnapshot(r)
  if (!enc) return
  const url = new URL(window.location.href)
  url.hash = `r=${enc}`
  window.history.replaceState(null, '', url.toString())
}

function StatBig({ label, value, accent, blurred, mono }: { label: string; value: string; accent?: string; blurred?: boolean; mono?: boolean }) {
  return (
    <div
      style={{
        flex: '1 1 200px',
        minWidth: 200,
        background: '#fff',
        border: '1px solid #e4e3dd',
        borderRadius: 16,
        padding: '24px 28px',
        boxShadow: '0 1px 0 rgba(255,255,255,0.6) inset, 0 12px 32px -24px rgba(10,14,12,0.18)',
        filter: blurred ? 'blur(8px)' : undefined,
        userSelect: blurred ? 'none' : undefined,
        pointerEvents: blurred ? 'none' : undefined,
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono), ui-monospace, monospace', fontSize: 10.5, color: '#6b7873', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 900,
          lineHeight: 1.1,
          color: accent || '#0a0e0c',
          letterSpacing: '-0.02em',
          fontVariantNumeric: mono ? 'tabular-nums' : undefined,
        }}
      >
        {value}
      </div>
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
    <div style={{ marginTop: 24, padding: '20px 22px', background: 'linear-gradient(135deg, #ecfdf5 0%, #f4f7f5 100%)', border: '1px solid #c8e6d6', borderRadius: 14 }}>
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
      <div style={{ fontFamily: 'var(--font-mono), ui-monospace, monospace', fontSize: 11, color: '#065f46', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
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
        <div style={{ width: `${Math.min(100, (Math.max(0, step) / ANALYSIS_STEPS.length) * 100)}%`, height: '100%', background: 'linear-gradient(90deg, #0eab6e 0%, #12a37d 100%)', transition: 'width 1.2s ease-out' }} />
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
    <div className="no-print" style={{ marginBottom: 28 }}>
      <div style={{ fontFamily: 'var(--font-mono), ui-monospace, monospace', fontSize: 11, color: '#6b7873', letterSpacing: '0.14em', marginBottom: 8, textTransform: 'uppercase' }}>
        Step {idx} / {total}
      </div>
      <div style={{ height: 4, background: '#e4e3dd', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #0eab6e 0%, #12a37d 60%, #7c5cfc 100%)', transition: 'width 0.35s ease-out' }} />
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
    // silently fail
  }
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

// ── Mini before/after bar chart ─────────────────────────────────────
function BeforeAfterChart({ before, after }: { before: number; after: number }) {
  const max = Math.max(before, after, 1)
  const bp = Math.max(6, (before / max) * 100)
  const ap = Math.max(6, (after / max) * 100)
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'grid', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, color: '#3d4a44' }}>
            <span style={{ fontWeight: 600 }}>導入前(現状)</span>
            <span style={{ fontFamily: 'var(--font-mono), ui-monospace, monospace', fontVariantNumeric: 'tabular-nums', color: '#0a0e0c', fontWeight: 700 }}>{before.toLocaleString('ja-JP')}件 / 月</span>
          </div>
          <div style={{ height: 12, background: '#eef0eb', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ width: `${bp}%`, height: '100%', background: '#c8d3cd', transition: 'width 0.45s ease-out' }} />
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, color: '#0a0e0c' }}>
            <span style={{ fontWeight: 700 }}>Meeton ai 導入後</span>
            <span style={{ fontFamily: 'var(--font-mono), ui-monospace, monospace', fontVariantNumeric: 'tabular-nums', color: '#065f46', fontWeight: 800 }}>{after.toLocaleString('ja-JP')}件 / 月</span>
          </div>
          <div style={{ height: 12, background: '#eef0eb', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ width: `${ap}%`, height: '100%', background: 'linear-gradient(90deg, #0eab6e 0%, #12a37d 100%)', transition: 'width 0.45s ease-out' }} />
          </div>
        </div>
      </div>
    </div>
  )
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
    const snapshot = readSnapshotFromHash()
    if (snapshot) {
      setResult(snapshot)
      setDomain(snapshot.company?.domain || '')
      setStep('result')
      autoRanRef.current = true
      return
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
      const snapshot: Result = {
        company: data.profile.company,
        companyInsights: data.profile.companyInsights,
        roi: data.lp.trafficRoi,
      }
      setResult(snapshot)
      setStep('result')
      setHashSnapshot(snapshot)
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

  // Derived for result hero metric
  const heroMeetings = result?.roi?.expected.meetingsPerMonth ?? 0
  const beforeMeetings = result?.roi?.uplift
    ? Math.max(0, Math.round((result.roi.uplift.currentLeadsPerMonth || 0) * (result.roi.basis.meetingCvrPct / 100)))
    : 0
  const afterMeetings = beforeMeetings + heroMeetings

  return (
    <main style={{ position: 'relative' }}>
      <style>{`
        @media print {
          @page { margin: 14mm; size: A4; }
          .no-print { display: none !important; }
          body > nav, body > footer,
          body > div > nav, body > div > footer { display: none !important; }
          html, body { background: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .roi-hero-bg { display: none !important; }
          .roi-shell { padding: 0 !important; max-width: none !important; margin: 0 !important; }
          .roi-hero { padding: 0 !important; background: transparent !important; border: none !important; }
          .roi-hero-inner { padding: 0 !important; }
          .roi-body { padding: 0 !important; }
          header { margin-bottom: 14px !important; }
          h1 { font-size: 22px !important; line-height: 1.4 !important; }
          h2 { font-size: 16px !important; line-height: 1.4 !important; page-break-after: avoid; }
          h3 { font-size: 14px !important; }
          section { padding: 12px 0 !important; border: none !important; box-shadow: none !important; page-break-inside: avoid; }
          .blur-target { filter: none !important; pointer-events: auto !important; user-select: auto !important; }
          .stat-row { display: block !important; }
          .stat-row > div { width: 100% !important; max-width: none !important; flex: none !important; margin-bottom: 10px !important; padding: 12px 16px !important; box-shadow: none !important; }
          .stat-row > div > div:last-child { font-size: 22px !important; }
          *, *::before, *::after { overflow: visible !important; word-wrap: break-word !important; overflow-wrap: anywhere !important; }
          .gate-overlay { display: none !important; }
          .roi-mobile-bar { display: none !important; }
          .roi-cta { display: none !important; }
        }
        .roi-input:focus {
          border-color: #12a37d !important;
          box-shadow: 0 0 0 4px rgba(18,163,125,0.12) !important;
        }
        .roi-primary-btn {
          background: linear-gradient(135deg, #12a37d 0%, #0eab6e 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          box-shadow: 0 12px 28px -14px rgba(18,163,125,0.55), 0 1px 0 rgba(255,255,255,0.25) inset;
        }
        .roi-primary-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 18px 36px -16px rgba(18,163,125,0.65), 0 1px 0 rgba(255,255,255,0.25) inset;
        }
        .roi-primary-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .roi-ghost-btn {
          background: transparent;
          color: #3d4a44;
          border: 1px solid #d4d2c7;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
        }
        .roi-ghost-btn:hover { border-color: #0a0e0c; color: #0a0e0c; background: #f4f7f5; }
        .roi-dark-btn {
          background: #0a0e0c;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
          box-shadow: 0 10px 24px -12px rgba(10,14,12,0.5);
        }
        .roi-dark-btn:hover { transform: translateY(-1px); }
        .roi-gradient-text {
          background: linear-gradient(135deg, #065f46 0%, #0eab6e 35%, #12a37d 70%, #7c5cfc 120%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        @media (max-width: 768px) {
          .roi-hero h1 { font-size: 32px !important; }
        }
      `}</style>

      {/* ── HERO BACKDROP ─────────────────────────────────── */}
      <div
        className="roi-hero-bg no-print"
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 720,
          background:
            'linear-gradient(165deg, #edfcf7 0%, #fafaf7 35%, #fafaf7 65%, #f3f0ff 100%)',
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* dot grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(18,163,125,0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'linear-gradient(180deg, #000 0%, #000 65%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 65%, transparent 100%)',
          }}
        />
        {/* green glow */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -120,
            width: 560,
            height: 560,
            background:
              'radial-gradient(circle, rgba(18,163,125,0.14) 0%, transparent 60%)',
          }}
        />
        {/* purple glow */}
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: -120,
            width: 480,
            height: 480,
            background:
              'radial-gradient(circle, rgba(124,92,252,0.10) 0%, transparent 60%)',
          }}
        />
      </div>

      <div
        className="roi-shell"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1080,
          margin: '0 auto',
          padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 48px) 120px',
        }}
      >
        {/* ── HEADER ─────────────────────────────────── */}
        <header className="no-print roi-hero" style={{ marginBottom: 32 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '7px 16px',
              background:
                'linear-gradient(135deg, rgba(18,163,125,0.10), rgba(124,92,252,0.10))',
              border: '1px solid rgba(18,163,125,0.20)',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              color: '#065f46',
              letterSpacing: '0.08em',
              marginBottom: 24,
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono), ui-monospace, monospace',
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#0e864a',
              }}
            >
              ROI Calculator
            </span>
            <span style={{ color: '#82897f' }}>·</span>
            <span style={{ fontSize: 12, color: '#3d4541' }}>30秒で試算</span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(32px, 5.2vw, 56px)',
              fontWeight: 900,
              lineHeight: 1.18,
              letterSpacing: '-0.035em',
              margin: '0 0 18px',
            }}
          >
            {step === 'welcome' ? (
              <>
                貴社のROIを<br />
                <em
                  className="roi-gradient-text"
                  style={{ fontStyle: 'normal', fontWeight: 900 }}
                >
                  30秒で試算
                </em>
              </>
            ) : step === 'inputs' ? (
              <>
                現状をいくつか<br />
                <em
                  className="roi-gradient-text"
                  style={{ fontStyle: 'normal', fontWeight: 900 }}
                >
                  教えてください
                </em>
              </>
            ) : (
              <>
                {result?.company.name || '貴社'} 様向け<br />
                <em
                  className="roi-gradient-text"
                  style={{ fontStyle: 'normal', fontWeight: 900 }}
                >
                  ROI 試算結果
                </em>
              </>
            )}
          </h1>
          <p style={{ fontSize: 17, color: '#3d4a44', lineHeight: 1.85, margin: 0, maxWidth: 720 }}>
            {step === 'welcome'
              ? 'WebサイトURLと現状指標から、 月間商談数・工数削減・売上ポテンシャルを即時試算します。 入力した数字に応じて、 貴社専用のROI試算結果をその場で表示します。'
              : step === 'inputs'
                ? 'すべて任意・URL以外は空欄でも試算可能です。 ご入力いただいた数字は、 試算の精度を高めるためにのみ使用します。'
                : 'AI が貴社のWebサイトを解析し、 Meeton ai 導入後の効果を算出しました。 数字の根拠は下部の「試算ロジック」セクションで確認できます。'}
          </p>
        </header>

        <ProgressBar step={step} />

        <div className="roi-body">

        {/* ── STEP: WELCOME ─────────────────────────────────── */}
        {step === 'welcome' ? (
          <section
            className="no-print"
            style={{
              background: '#fff',
              border: '1px solid #e4e3dd',
              borderRadius: 20,
              padding: 'clamp(28px, 4vw, 48px)',
              boxShadow:
                '0 1px 0 rgba(255,255,255,0.6) inset, 0 28px 60px -40px rgba(10,14,12,0.18)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono), ui-monospace, monospace',
                fontSize: 11,
                letterSpacing: '0.16em',
                color: '#065f46',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              ▸ こんな結果が見られます
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.4, margin: '0 0 24px', letterSpacing: '-0.02em' }}>
              入力URLから貴社専用のROI指標を算出
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'grid', gap: 14 }}>
              {[
                '月間自動獲得される商談数',
                'AI が代替する営業工数(時間/月)',
                '業界カテゴリ・流入経路 自動分析',
                '貴社主力製品・顧客層を AI 解析',
                '結果を PDF で持ち帰り、 社内共有',
              ].map((s, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: '#3d4a44', lineHeight: 1.6 }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #12a37d 0%, #0eab6e 100%)',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 1,
                    }}
                  >
                    ✓
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setStep('inputs')}
              className="roi-primary-btn"
              style={{ padding: '16px 32px', fontSize: 16, minHeight: 52 }}
            >
              試算を始める →
            </button>
            <div style={{ fontSize: 12, color: '#6b7873', marginTop: 16, lineHeight: 1.6 }}>
              所要時間 約30秒 / すべて任意 / メールアドレスは詳細結果の表示時に
            </div>
          </section>
        ) : null}

        {/* ── STEP: INPUTS ─────────────────────────────────── */}
        {step === 'inputs' ? (
          <form
            className="no-print"
            onSubmit={(e) => {
              e.preventDefault()
              runCalc()
            }}
            style={{
              background: '#fff',
              border: '1px solid #e4e3dd',
              borderRadius: 20,
              padding: 'clamp(24px, 3.5vw, 36px)',
              boxShadow:
                '0 1px 0 rgba(255,255,255,0.6) inset, 0 28px 60px -40px rgba(10,14,12,0.18)',
            }}
          >
            {/* Section: URL */}
            <div style={{ borderLeft: '3px solid #12a37d', paddingLeft: 18, marginBottom: 28 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono), ui-monospace, monospace',
                  fontSize: 10.5,
                  letterSpacing: '0.16em',
                  color: '#065f46',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}
              >
                01 · 貴社情報
              </div>
              <label style={{ display: 'block', fontSize: 14, color: '#0a0e0c', fontWeight: 700, marginBottom: 6 }}>
                Webサイト URL またはドメイン <span style={{ color: '#b91c1c' }}>*</span>
              </label>
              <div style={{ fontSize: 12, color: '#6b7873', marginBottom: 10 }}>
                貴社サイトを AI が解析し、 業種・流入経路・主力製品を自動抽出します。
              </div>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="例) example.co.jp / https://corp.example.com"
                required
                autoFocus
                className="roi-input"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: 16,
                  minHeight: 48,
                  border: '1px solid #d4d2c7',
                  borderRadius: 12,
                  background: '#fafaf7',
                  outline: 'none',
                  color: '#0a0e0c',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                }}
              />
            </div>

            {/* Hairline divider */}
            <div style={{ height: 1, background: '#e4e3dd', margin: '0 0 28px' }} />

            {/* Section: Optional metrics */}
            <div style={{ borderLeft: '3px solid #c8d3cd', paddingLeft: 18, marginBottom: 8 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono), ui-monospace, monospace',
                  fontSize: 10.5,
                  letterSpacing: '0.16em',
                  color: '#3d4a44',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}
              >
                02 · 現状指標 (任意)
              </div>
              <div style={{ fontSize: 12, color: '#6b7873', marginBottom: 18, lineHeight: 1.6 }}>
                ご存知の数字だけで結構です。 空欄の場合は外部データから推定します。
              </div>

              <div style={{ display: 'grid', gap: 22 }}>
                {/* Monthly visits */}
                <div>
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: '#0a0e0c', fontWeight: 700, marginBottom: 6 }}>
                    <span>月間訪問数(およそ)</span>
                    <span style={{ fontSize: 11, color: '#6b7873', fontWeight: 500, letterSpacing: '0.05em' }}>人 / 月</span>
                  </label>
                  <div style={{ fontSize: 11, color: '#6b7873', marginBottom: 8, lineHeight: 1.6 }}>
                    ご存知でない場合は空欄で結構です。 SimilarWeb 等から自動取得します。
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={visits}
                    onChange={(e) => setVisits(e.target.value)}
                    placeholder="例) 50000"
                    className="roi-input"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: 15,
                      minHeight: 46,
                      border: '1px solid #d4d2c7',
                      borderRadius: 10,
                      background: '#fafaf7',
                      outline: 'none',
                      fontVariantNumeric: 'tabular-nums',
                      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                    }}
                  />
                </div>

                {/* Monthly leads */}
                <div>
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: '#0a0e0c', fontWeight: 700, marginBottom: 6 }}>
                    <span>月間獲得リード数</span>
                    <span style={{ fontSize: 11, color: '#6b7873', fontWeight: 500, letterSpacing: '0.05em' }}>件 / 月</span>
                  </label>
                  <div style={{ fontSize: 11, color: '#6b7873', marginBottom: 8, lineHeight: 1.6 }}>
                    現状値があれば「現状◯件 → 導入後+◯件」 の差分試算になります。
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={leads}
                    onChange={(e) => setLeads(e.target.value)}
                    placeholder="例) 100"
                    className="roi-input"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: 15,
                      minHeight: 46,
                      border: '1px solid #d4d2c7',
                      borderRadius: 10,
                      background: '#fafaf7',
                      outline: 'none',
                      fontVariantNumeric: 'tabular-nums',
                      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                    }}
                  />
                </div>

                {/* SDR headcount */}
                <div>
                  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: '#0a0e0c', fontWeight: 700, marginBottom: 6 }}>
                    <span>営業 / SDR の人数</span>
                    <span style={{ fontSize: 11, color: '#6b7873', fontWeight: 500, letterSpacing: '0.05em' }}>名</span>
                  </label>
                  <div style={{ fontSize: 11, color: '#6b7873', marginBottom: 8, lineHeight: 1.6 }}>
                    工数削減を「営業◯人分」 として実数換算します。
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={sdr}
                    onChange={(e) => setSdr(e.target.value)}
                    placeholder="例) 5"
                    className="roi-input"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: 15,
                      minHeight: 46,
                      border: '1px solid #d4d2c7',
                      borderRadius: 10,
                      background: '#fafaf7',
                      outline: 'none',
                      fontVariantNumeric: 'tabular-nums',
                      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setStep('welcome')}
                disabled={calcSubmitting}
                className="roi-ghost-btn"
                style={{ padding: '14px 22px', fontSize: 14, minHeight: 48 }}
              >
                ← 戻る
              </button>
              <button
                type="submit"
                disabled={calcSubmitting || !domain.trim()}
                className="roi-primary-btn"
                style={{ flex: '1 1 auto', padding: '14px 22px', fontSize: 15, minHeight: 48 }}
              >
                {calcSubmitting ? '貴社のWebサイトを解析中…' : '貴社向けROIを試算 →'}
              </button>
            </div>
            {error ? (
              <div style={{ marginTop: 14, padding: '12px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, color: '#b91c1c', fontSize: 13 }}>
                {error}
              </div>
            ) : null}

            {analysisStep >= 0 ? <AnalysisProgress step={analysisStep} /> : null}
          </form>
        ) : null}

        {/* ── STEP: RESULT ─────────────────────────────────── */}
        {step === 'result' && result?.roi ? (
          <>
            {/* Result hero card */}
            <section
              style={{
                background: '#fff',
                border: '1px solid #e4e3dd',
                borderRadius: 20,
                padding: 'clamp(28px, 4vw, 44px)',
                boxShadow:
                  '0 1px 0 rgba(255,255,255,0.6) inset, 0 28px 60px -40px rgba(10,14,12,0.20)',
                marginBottom: 32,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* subtle accent gradient corner */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -120,
                  right: -120,
                  width: 360,
                  height: 360,
                  background:
                    'radial-gradient(circle, rgba(18,163,125,0.10) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  fontFamily: 'var(--font-mono), ui-monospace, monospace',
                  fontSize: 11,
                  letterSpacing: '0.16em',
                  color: '#065f46',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}
              >
                ▸ {result.company.name} 様向け ROI 試算
              </div>
              <h2
                style={{
                  position: 'relative',
                  fontSize: 'clamp(20px, 2.6vw, 26px)',
                  fontWeight: 800,
                  lineHeight: 1.4,
                  margin: '0 0 20px',
                  letterSpacing: '-0.02em',
                }}
              >
                月間訪問{' '}
                <span style={{ fontFamily: 'var(--font-mono), ui-monospace, monospace', fontVariantNumeric: 'tabular-nums' }}>
                  {result.roi.monthlyVisits.toLocaleString('ja-JP')}
                </span>
                {' '}→ 自動商談{' '}
                <span style={{ color: '#065f46', fontFamily: 'var(--font-mono), ui-monospace, monospace', fontVariantNumeric: 'tabular-nums' }}>
                  {result.roi.expected.meetingsPerMonth.toLocaleString('ja-JP')}件
                </span>
                {' '}/ 工数削減{' '}
                <span style={{ color: '#065f46', fontFamily: 'var(--font-mono), ui-monospace, monospace', fontVariantNumeric: 'tabular-nums' }}>
                  {result.roi.expected.hoursSavedPerMonth.toLocaleString('ja-JP')}h
                </span>
              </h2>

              {/* Hero metric */}
              <div style={{ position: 'relative', padding: '18px 0 14px', borderTop: '1px solid #f0eee6', borderBottom: '1px solid #f0eee6', margin: '0 0 22px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), ui-monospace, monospace',
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    color: '#6b7873',
                    textTransform: 'uppercase',
                    marginBottom: 8,
                  }}
                >
                  自動獲得される商談 / 月
                </div>
                <div
                  className="roi-gradient-text"
                  style={{
                    fontSize: 'clamp(48px, 8vw, 72px)',
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  +{result.roi.expected.meetingsPerMonth.toLocaleString('ja-JP')}
                  <span style={{ fontSize: '0.4em', fontWeight: 800, marginLeft: 8, letterSpacing: '0' }}>件</span>
                </div>
              </div>

              {/* Supporting stats */}
              <div className="stat-row" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 22 }}>
                {result.roi.uplift ? (
                  <StatBig label={`リード上乗せ / 月 (現状 ${result.roi.uplift.currentLeadsPerMonth}件 →)`} value={`+${result.roi.uplift.addLeadsPerMonth.toLocaleString('ja-JP')}件`} accent="#0eab6e" mono />
                ) : (
                  <StatBig label="AIが自動フォローするリード / 月" value={`${result.roi.expected.autoFollowedLeadsPerMonth.toLocaleString('ja-JP')}件`} accent="#0eab6e" mono />
                )}
                <StatBig
                  label={result.roi.basis.sdrHeadcount ? `工数削減 / 月 (営業${result.roi.basis.sdrHeadcount}名)` : `工数削減 / 月 (営業${result.roi.expected.hoursSavedAsHeadcount}人分)`}
                  value={`${result.roi.expected.hoursSavedPerMonth.toLocaleString('ja-JP')}時間`}
                  accent="#0eab6e"
                  mono
                />
                <StatBig
                  label="月間訪問数 (試算ベース)"
                  value={result.roi.monthlyVisits.toLocaleString('ja-JP')}
                  mono
                />
              </div>

              {/* Before/After mini chart */}
              {result.roi.uplift ? (
                <div
                  style={{
                    background: 'linear-gradient(135deg, #f4f7f5 0%, #fafaf7 100%)',
                    border: '1px solid #e4e3dd',
                    borderRadius: 14,
                    padding: '20px 22px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), ui-monospace, monospace',
                      fontSize: 11,
                      letterSpacing: '0.14em',
                      color: '#6b7873',
                      textTransform: 'uppercase',
                      marginBottom: 14,
                    }}
                  >
                    ▸ 導入前 vs 導入後 (商談数 / 月)
                  </div>
                  <BeforeAfterChart
                    before={Math.max(beforeMeetings, 0)}
                    after={Math.max(afterMeetings, heroMeetings)}
                  />
                </div>
              ) : null}

              {/* Locked area: AI insights */}
              <div style={{ position: 'relative', marginTop: 22 }}>
                <div
                  className="blur-target"
                  style={{
                    filter: unlocked ? 'none' : 'blur(8px)',
                    userSelect: unlocked ? 'auto' : 'none',
                    pointerEvents: unlocked ? 'auto' : 'none',
                  }}
                >
                  {result.companyInsights ? (
                    <div style={{ borderTop: '1px solid #e4e3dd', paddingTop: 22, marginBottom: 22 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.01em' }}>
                        AI が解析した貴社情報
                      </h3>
                      <div style={{ display: 'grid', gap: 12, fontSize: 14, color: '#3d4a44', lineHeight: 1.8 }}>
                        {result.companyInsights.flagshipProduct ? <div><strong style={{ color: '#0a0e0c' }}>主力製品:</strong> {result.companyInsights.flagshipProduct}</div> : null}
                        {result.companyInsights.customerType ? <div><strong style={{ color: '#0a0e0c' }}>顧客層:</strong> {result.companyInsights.customerType}</div> : null}
                        {result.companyInsights.strength ? <div><strong style={{ color: '#0a0e0c' }}>強み:</strong> {result.companyInsights.strength}</div> : null}
                        {result.companyInsights.recentActivity ? <div><strong style={{ color: '#0a0e0c' }}>直近の動き:</strong> {result.companyInsights.recentActivity}</div> : null}
                        {result.companyInsights.meetingAiOpportunity ? <div><strong style={{ color: '#0a0e0c' }}>Meeton ai 貢献ポイント:</strong> {result.companyInsights.meetingAiOpportunity}</div> : null}
                      </div>
                    </div>
                  ) : null}

                  <div
                    style={{
                      borderTop: '1px solid #e4e3dd',
                      paddingTop: 18,
                      fontSize: 11.5,
                      color: '#6b7873',
                      lineHeight: 1.75,
                    }}
                  >
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

                {/* Unlock gate */}
                {!unlocked ? (
                  <div
                    className="no-print gate-overlay"
                    style={{
                      position: 'absolute',
                      inset: '0 -8px -8px -8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 24,
                    }}
                  >
                    <form
                      onSubmit={handleUnlock}
                      style={{
                        background: '#fff',
                        border: '1px solid #d4d2c7',
                        borderRadius: 18,
                        padding: 'clamp(24px, 3.5vw, 36px)',
                        maxWidth: 480,
                        width: '100%',
                        boxShadow: '0 28px 60px rgba(0,0,0,0.14), 0 1px 0 rgba(255,255,255,0.6) inset',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-mono), ui-monospace, monospace',
                          fontSize: 11,
                          letterSpacing: '0.16em',
                          color: '#065f46',
                          textTransform: 'uppercase',
                          marginBottom: 10,
                        }}
                      >
                        ▸ 詳細を表示するには
                      </div>
                      <h3 style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.4, margin: '0 0 10px', letterSpacing: '-0.01em' }}>
                        AI解析インサイト と PDF を見る
                      </h3>
                      <p style={{ fontSize: 13, color: '#3d4a44', lineHeight: 1.7, margin: '0 0 20px' }}>
                        会社名とメールアドレスをご入力ください。 結果と PDF をその場で表示します。
                      </p>
                      <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', fontWeight: 600, marginBottom: 6 }}>
                        会社名 <span style={{ color: '#b91c1c' }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder={result.company.name || '株式会社○○'}
                        required
                        className="roi-input"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          fontSize: 14,
                          minHeight: 46,
                          border: '1px solid #d4d2c7',
                          borderRadius: 10,
                          background: '#fafaf7',
                          marginBottom: 14,
                          outline: 'none',
                          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                        }}
                      />
                      <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', fontWeight: 600, marginBottom: 6 }}>
                        メールアドレス <span style={{ color: '#b91c1c' }}>*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.co.jp"
                        required
                        className="roi-input"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          fontSize: 14,
                          minHeight: 46,
                          border: '1px solid #d4d2c7',
                          borderRadius: 10,
                          background: '#fafaf7',
                          marginBottom: 18,
                          outline: 'none',
                          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                        }}
                      />
                      <button
                        type="submit"
                        disabled={unlockSubmitting}
                        className="roi-primary-btn"
                        style={{ width: '100%', padding: '14px 20px', fontSize: 15, minHeight: 48 }}
                      >
                        {unlockSubmitting ? '送信中…' : 'ROI詳細を見る'}
                      </button>
                      {error ? <div style={{ marginTop: 12, color: '#b91c1c', fontSize: 12 }}>{error}</div> : null}
                      <div style={{ fontSize: 10.5, color: '#6b7873', marginTop: 14, lineHeight: 1.7 }}>
                        入力情報は本ページの試算結果表示およびご連絡のためにのみ使用します
                      </div>
                    </form>
                  </div>
                ) : null}
              </div>

              {/* Action buttons */}
              <div className="no-print" style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setDemoOpen(true)}
                  className="roi-primary-btn"
                  style={{ padding: '14px 24px', fontSize: 14, minHeight: 48 }}
                >
                  デモを予約 →
                </button>
                {unlocked ? (
                  <>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="roi-dark-btn"
                      style={{ padding: '14px 24px', fontSize: 14, minHeight: 48 }}
                    >
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
                      className="roi-ghost-btn"
                      style={{ padding: '14px 24px', fontSize: 14, minHeight: 48 }}
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
                  className="roi-ghost-btn"
                  style={{ padding: '14px 24px', fontSize: 14, minHeight: 48 }}
                >
                  ↻ 別の URL で試算
                </button>
              </div>
            </section>

            {/* ── Methodology Callout ─────────────────────────────────── */}
            <section
              className="no-print"
              style={{
                background: 'linear-gradient(135deg, #fafaf7 0%, #f4f7f5 100%)',
                border: '1px solid #e4e3dd',
                borderRadius: 20,
                padding: 'clamp(28px, 4vw, 40px)',
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), ui-monospace, monospace',
                  fontSize: 11,
                  letterSpacing: '0.16em',
                  color: '#065f46',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}
              >
                ▸ Methodology
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.4, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                試算ロジック
              </h3>
              <p style={{ fontSize: 14, color: '#3d4a44', lineHeight: 1.75, margin: '0 0 24px', maxWidth: 720 }}>
                本ページの試算は、 マーケティングの「常識的なベンチマーク」 と 貴社サイトの実データを掛け合わせて算出しています。 すべての仮定と計算式を以下に開示します。
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 24,
                }}
              >
                {/* Assumptions */}
                <div style={{ background: '#fff', border: '1px solid #e4e3dd', borderRadius: 14, padding: '22px 24px' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), ui-monospace, monospace',
                      fontSize: 10.5,
                      letterSpacing: '0.14em',
                      color: '#6b7873',
                      textTransform: 'uppercase',
                      marginBottom: 14,
                    }}
                  >
                    使用する仮定
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12, fontSize: 13, color: '#3d4a44', lineHeight: 1.7 }}>
                    <li style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderBottom: '1px dashed #e4e3dd', paddingBottom: 10 }}>
                      <span>有能訪問者率</span>
                      <strong style={{ color: '#0a0e0c', fontFamily: 'var(--font-mono), ui-monospace, monospace', fontVariantNumeric: 'tabular-nums' }}>
                        {(result.roi.basis.engageableRate * 100).toFixed(1)}%
                      </strong>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderBottom: '1px dashed #e4e3dd', paddingBottom: 10 }}>
                      <span>リード化率 (CVR)</span>
                      <strong style={{ color: '#0a0e0c', fontFamily: 'var(--font-mono), ui-monospace, monospace', fontVariantNumeric: 'tabular-nums' }}>
                        {result.roi.basis.leadCvrPct}%
                      </strong>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderBottom: '1px dashed #e4e3dd', paddingBottom: 10 }}>
                      <span>商談化率</span>
                      <strong style={{ color: '#0a0e0c', fontFamily: 'var(--font-mono), ui-monospace, monospace', fontVariantNumeric: 'tabular-nums' }}>
                        {result.roi.basis.meetingCvrPct}%
                      </strong>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderBottom: '1px dashed #e4e3dd', paddingBottom: 10 }}>
                      <span>商談1件あたり工数</span>
                      <strong style={{ color: '#0a0e0c', fontFamily: 'var(--font-mono), ui-monospace, monospace', fontVariantNumeric: 'tabular-nums' }}>
                        {result.roi.basis.hoursPerMeeting}h
                      </strong>
                    </li>
                    <li style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <span>フォロー1件あたり工数</span>
                      <strong style={{ color: '#0a0e0c', fontFamily: 'var(--font-mono), ui-monospace, monospace', fontVariantNumeric: 'tabular-nums' }}>
                        {result.roi.basis.hoursPerFollowup}h
                      </strong>
                    </li>
                  </ul>
                </div>

                {/* Formula */}
                <div style={{ background: '#fff', border: '1px solid #e4e3dd', borderRadius: 14, padding: '22px 24px' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), ui-monospace, monospace',
                      fontSize: 10.5,
                      letterSpacing: '0.14em',
                      color: '#6b7873',
                      textTransform: 'uppercase',
                      marginBottom: 14,
                    }}
                  >
                    計算式
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), ui-monospace, monospace',
                      fontSize: 12.5,
                      color: '#0a0e0c',
                      background: '#fafaf7',
                      border: '1px solid #e4e3dd',
                      borderRadius: 10,
                      padding: '14px 16px',
                      lineHeight: 1.85,
                      overflowX: 'auto',
                    }}
                  >
                    <div style={{ color: '#6b7873' }}>// 自動獲得商談 / 月</div>
                    <div>有能訪問者数</div>
                    <div style={{ paddingLeft: 12 }}>= 月間訪問数 × 有能訪問者率</div>
                    <div style={{ marginTop: 8 }}>リード数</div>
                    <div style={{ paddingLeft: 12 }}>= 有能訪問者数 × リード化率</div>
                    <div style={{ marginTop: 8, color: '#065f46', fontWeight: 700 }}>商談数</div>
                    <div style={{ paddingLeft: 12, color: '#065f46', fontWeight: 700 }}>= リード数 × 商談化率</div>
                    <div style={{ marginTop: 14, color: '#6b7873' }}>// 工数削減 / 月</div>
                    <div style={{ color: '#065f46', fontWeight: 700 }}>削減時間</div>
                    <div style={{ paddingLeft: 12, color: '#065f46', fontWeight: 700 }}>= 商談数 × {result.roi.basis.hoursPerMeeting}h</div>
                    <div style={{ paddingLeft: 12, color: '#065f46', fontWeight: 700 }}>+ フォロー数 × {result.roi.basis.hoursPerFollowup}h</div>
                  </div>
                  <div style={{ marginTop: 12, fontSize: 11.5, color: '#6b7873', lineHeight: 1.65 }}>
                    {result.roi.basis.capApplied ? '※ 営業人数に応じた上限を適用しています。' : '※ 上限調整は適用していません。'}
                  </div>
                </div>
              </div>
            </section>

            {/* ── Closing CTA ─────────────────────────────────── */}
            <section
              className="no-print roi-cta"
              style={{
                position: 'relative',
                background: 'radial-gradient(ellipse at top right, #102a1e 0%, #0a0e0c 70%)',
                color: '#fff',
                borderRadius: 20,
                padding: 'clamp(36px, 5vw, 56px)',
                overflow: 'hidden',
              }}
            >
              {/* dot grid overlay */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'radial-gradient(circle, rgba(111,227,178,0.08) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                  maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
                  pointerEvents: 'none',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: -120,
                  right: -120,
                  width: 420,
                  height: 420,
                  background:
                    'radial-gradient(circle, rgba(111,227,178,0.18) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ position: 'relative', maxWidth: 720 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), ui-monospace, monospace',
                    fontSize: 11,
                    letterSpacing: '0.16em',
                    color: '#6fe3b2',
                    textTransform: 'uppercase',
                    marginBottom: 14,
                  }}
                >
                  ▸ Next Step
                </div>
                <h3
                  style={{
                    fontSize: 'clamp(24px, 3.6vw, 36px)',
                    fontWeight: 900,
                    lineHeight: 1.3,
                    margin: '0 0 16px',
                    letterSpacing: '-0.025em',
                  }}
                >
                  この試算結果を、 弊社チームと一緒に<br />
                  <em style={{ fontStyle: 'normal', color: '#6fe3b2' }}>貴社の数字で検証</em>しませんか?
                </h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.85, color: '#c8d3cd', margin: '0 0 28px' }}>
                  上記の数字はベンチマークと貴社サイトの実データから算出した目安です。 30分のデモで、 貴社のリードフロー・営業体制に合わせた具体的な ROI ターゲットを一緒に設計します。
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  <DemoBookingButton
                    utmCampaign="roi_simulator_methodology"
                    style={{
                      padding: '16px 28px',
                      fontSize: 15,
                      fontWeight: 700,
                      minHeight: 52,
                      background: 'linear-gradient(135deg, #12a37d 0%, #0eab6e 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 12,
                      cursor: 'pointer',
                      boxShadow: '0 14px 28px -12px rgba(18,163,125,0.6), 0 1px 0 rgba(255,255,255,0.25) inset',
                    }}
                  >
                    無料デモを予約する →
                  </DemoBookingButton>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('inputs')
                      setResult(null)
                      autoRanRef.current = true
                    }}
                    style={{
                      padding: '16px 28px',
                      fontSize: 14,
                      fontWeight: 600,
                      minHeight: 52,
                      background: 'transparent',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.25)',
                      borderRadius: 12,
                      cursor: 'pointer',
                    }}
                  >
                    別の URL で試算
                  </button>
                </div>
              </div>
            </section>

            {/* ── Mobile sticky CTA bar ─────────────────────────────────── */}
            <div
              className="no-print roi-mobile-bar"
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderTop: '1px solid #e4e3dd',
                padding: '12px 16px',
                display: 'none',
                gap: 12,
                alignItems: 'center',
                zIndex: 50,
                boxShadow: '0 -8px 24px rgba(10,14,12,0.08)',
              }}
            >
              <style>{`
                @media (max-width: 768px) {
                  .roi-mobile-bar { display: flex !important; }
                  .roi-shell { padding-bottom: 100px !important; }
                }
              `}</style>
              <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), ui-monospace, monospace',
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    color: '#6b7873',
                    textTransform: 'uppercase',
                  }}
                >
                  自動商談 / 月
                </div>
                <div
                  className="roi-gradient-text"
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    lineHeight: 1.1,
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '-0.02em',
                  }}
                >
                  +{result.roi.expected.meetingsPerMonth.toLocaleString('ja-JP')}件
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="roi-primary-btn"
                style={{ padding: '12px 18px', fontSize: 14, minHeight: 44, whiteSpace: 'nowrap' }}
              >
                デモを予約 →
              </button>
            </div>
          </>
        ) : null}

        </div>
      </div>

      <HubSpotMeetingModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} utmCampaign="roi_simulator" />
    </main>
  )
}
