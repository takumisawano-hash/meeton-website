'use client'

import { useCallback, useEffect, useState } from 'react'

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
  uplift?: {
    addLeadsPerMonth: number
    currentLeadsPerMonth: number
    expectedLeadsPerMonth: number
  }
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

type CompanyShape = {
  name: string
  domain?: string
  industry?: string
  employees?: string
  prefecture?: string
}

type CompanyInsightsShape = {
  flagshipProduct?: string
  customerType?: string
  strength?: string
  recentActivity?: string
  meetingAiOpportunity?: string
}

type Result = {
  company: CompanyShape
  companyInsights?: CompanyInsightsShape
  roi: RoiCalcShape | null
}

function readQuery(): { domain: string; visits?: number; leads?: number; sdr?: number } {
  if (typeof window === 'undefined') return { domain: '' }
  const p = new URLSearchParams(window.location.search)
  const toInt = (v: string | null) => {
    if (!v) return undefined
    const n = parseInt(v.replace(/[^0-9]/g, ''), 10)
    return Number.isFinite(n) && n > 0 ? n : undefined
  }
  return {
    domain: p.get('domain') || '',
    visits: toInt(p.get('visits')),
    leads: toInt(p.get('leads')),
    sdr: toInt(p.get('sdr')),
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

function StatBig({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div style={{ flex: '1 1 200px', minWidth: 200, background: '#fff', border: '1px solid #e4e3dd', borderRadius: 14, padding: '22px 26px' }}>
      <div style={{ fontSize: 12, color: '#6b7873', letterSpacing: '0.05em', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.15, color: accent || '#0a0e0c' }}>{value}</div>
    </div>
  )
}

export default function RoiSimulatorClient() {
  const [domain, setDomain] = useState('')
  const [visits, setVisits] = useState('')
  const [leads, setLeads] = useState('')
  const [sdr, setSdr] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const q = readQuery()
    if (q.domain) setDomain(q.domain)
    if (q.visits) setVisits(String(q.visits))
    if (q.leads) setLeads(String(q.leads))
    if (q.sdr) setSdr(String(q.sdr))
  }, [])

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault()
      const trimmed = domain.trim()
      if (!trimmed) return
      setSubmitting(true)
      setError(null)
      const toInt = (v: string) => {
        const n = parseInt(v.replace(/[^0-9]/g, ''), 10)
        return Number.isFinite(n) && n > 0 ? n : undefined
      }
      const payload = {
        companyUrl: trimmed,
        companyName: companyName.trim() || undefined,
        pagePath: '/roi-simulator/',
        userMonthlyVisits: toInt(visits),
        userMonthlyLeads: toInt(leads),
        userSdrCount: toInt(sdr),
      }
      setQuery({
        domain: trimmed,
        visits: toInt(visits),
        leads: toInt(leads),
        sdr: toInt(sdr),
      })
      try {
        const r = await fetch('/api/lp/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!r.ok) {
          setError('試算に失敗しました。 もう一度お試しください。')
          return
        }
        const data = await r.json()
        setResult({
          company: data.profile.company,
          companyInsights: data.profile.companyInsights,
          roi: data.lp.trafficRoi,
        })
      } catch {
        setError('試算に失敗しました。 ネットワークをご確認ください。')
      } finally {
        setSubmitting(false)
      }
    },
    [domain, companyName, visits, leads, sdr]
  )

  useEffect(() => {
    const q = readQuery()
    if (q.domain && !result && !submitting) {
      handleSubmit()
    }
  }, [handleSubmit, result, submitting])

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print()
  }

  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: 'clamp(96px, 12vw, 140px) clamp(20px, 4vw, 48px) 80px' }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          main { padding: 24px !important; max-width: none !important; }
        }
      `}</style>

      <header className="no-print" style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.18em', color: '#065f46', textTransform: 'uppercase', marginBottom: 12 }}>
          ▸ AI ROI Simulator
        </div>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.25, margin: '0 0 14px' }}>
          貴社のWebサイトから、月間商談数と工数削減を試算
        </h1>
        <p style={{ fontSize: 16, color: '#3d4a44', lineHeight: 1.7, margin: 0 }}>
          URLを入れるだけで、SimilarWebの実トラフィックを取得し、Meeton ai 導入企業4社の実データに基づく ROI を即時試算します。 結果は印刷/PDFとして持ち帰り可能です。
        </p>
      </header>

      <form onSubmit={handleSubmit} className="no-print" style={{ background: '#fff', border: '1px solid #e4e3dd', borderRadius: 14, padding: 'clamp(20px, 3vw, 28px)', marginBottom: 28 }}>
        <label style={{ display: 'block', fontSize: 13, color: '#3d4a44', fontWeight: 600, marginBottom: 6 }}>
          Webサイト URL またはドメイン <span style={{ color: '#b91c1c' }}>*</span>
        </label>
        <input
          type="text"
          value={domain}
          onChange={e => setDomain(e.target.value)}
          placeholder="例) example.co.jp / https://corp.example.com"
          required
          style={{ width: '100%', padding: '12px 14px', fontSize: 16, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff', outline: 'none', marginBottom: 16 }}
        />

        <details style={{ marginBottom: 16 }}>
          <summary style={{ fontSize: 13, color: '#0eab6e', cursor: 'pointer', listStyle: 'none', fontWeight: 600 }}>
            ＋ 任意項目を追加するとより正確に試算
          </summary>
          <div style={{ marginTop: 12 }}>
            <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', marginBottom: 6 }}>会社名(URLから自動取得)</label>
            <input
              type="text"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="例) 株式会社○○"
              style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff', marginBottom: 14 }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 8 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', marginBottom: 6 }}>月間訪問数</label>
                <input type="text" inputMode="numeric" value={visits} onChange={e => setVisits(e.target.value)} placeholder="50000" style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', marginBottom: 6 }}>月間獲得リード</label>
                <input type="text" inputMode="numeric" value={leads} onChange={e => setLeads(e.target.value)} placeholder="100" style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', marginBottom: 6 }}>営業/SDR人数</label>
                <input type="text" inputMode="numeric" value={sdr} onChange={e => setSdr(e.target.value)} placeholder="5" style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff' }} />
              </div>
            </div>
          </div>
        </details>

        <button type="submit" disabled={submitting || !domain.trim()} style={{ padding: '14px 28px', fontSize: 16, fontWeight: 700, background: '#0eab6e', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', opacity: submitting ? 0.6 : 1 }}>
          {submitting ? '試算中…' : '貴社向けROIを試算'}
        </button>
        {error ? <div style={{ marginTop: 12, color: '#b91c1c', fontSize: 13 }}>{error}</div> : null}
      </form>

      {result?.roi ? (
        <section style={{ background: '#fff', border: '1px solid #e4e3dd', borderRadius: 16, padding: 'clamp(24px, 4vw, 36px)' }}>
          <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.12em', color: '#065f46', textTransform: 'uppercase', marginBottom: 8 }}>
            ▸ {result.company.name} 様向け ROI 試算
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.3, margin: '0 0 6px' }}>
            月間訪問 {result.roi.monthlyVisits.toLocaleString('ja-JP')} → 自動商談 {result.roi.expected.meetingsPerMonth.toLocaleString('ja-JP')}件 / 工数削減 {result.roi.expected.hoursSavedPerMonth.toLocaleString('ja-JP')}h
          </h2>
          <div style={{ fontSize: 13, color: '#3d4a44', margin: '0 0 22px' }}>
            有能訪問者 {result.roi.monthlyEngageable.toLocaleString('ja-JP')} 人(全訪問の {Math.round(result.roi.basis.engageableRate * 100)}%)から、 Meeton ai が下記の月次価値を提供します。
          </div>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 24 }}>
            <StatBig label="自動獲得される商談/月" value={`${result.roi.expected.meetingsPerMonth.toLocaleString('ja-JP')}件`} accent="#0eab6e" />
            {result.roi.uplift ? (
              <StatBig label={`リード上乗せ/月 (現状${result.roi.uplift.currentLeadsPerMonth}件→)`} value={`+${result.roi.uplift.addLeadsPerMonth.toLocaleString('ja-JP')}件`} accent="#0eab6e" />
            ) : (
              <StatBig label="AIが自動フォローするリード/月" value={`${result.roi.expected.autoFollowedLeadsPerMonth.toLocaleString('ja-JP')}件`} accent="#0eab6e" />
            )}
            <StatBig label={result.roi.basis.sdrHeadcount ? `工数削減/月 (営業${result.roi.basis.sdrHeadcount}名)` : `工数削減/月 (営業${result.roi.expected.hoursSavedAsHeadcount}人分)`} value={`${result.roi.expected.hoursSavedPerMonth.toLocaleString('ja-JP')}時間`} accent="#0eab6e" />
          </div>

          {result.companyInsights ? (
            <div style={{ borderTop: '1px solid #e4e3dd', paddingTop: 20, marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 12px' }}>AI が解析した貴社情報</h3>
              <div style={{ display: 'grid', gap: 10, fontSize: 13, color: '#3d4a44', lineHeight: 1.7 }}>
                {result.companyInsights.flagshipProduct ? <div><strong style={{ color: '#0a0e0c' }}>主力製品:</strong> {result.companyInsights.flagshipProduct}</div> : null}
                {result.companyInsights.customerType ? <div><strong style={{ color: '#0a0e0c' }}>顧客層:</strong> {result.companyInsights.customerType}</div> : null}
                {result.companyInsights.strength ? <div><strong style={{ color: '#0a0e0c' }}>強み:</strong> {result.companyInsights.strength}</div> : null}
                {result.companyInsights.recentActivity ? <div><strong style={{ color: '#0a0e0c' }}>直近の動き:</strong> {result.companyInsights.recentActivity}</div> : null}
                {result.companyInsights.meetingAiOpportunity ? <div><strong style={{ color: '#0a0e0c' }}>Meeton ai 貢献ポイント:</strong> {result.companyInsights.meetingAiOpportunity}</div> : null}
              </div>
            </div>
          ) : null}

          <div style={{ borderTop: '1px solid #e4e3dd', paddingTop: 14, fontSize: 11, color: '#6b7873', lineHeight: 1.7 }}>
            ※ トラフィック出典: {result.roi.trafficSource === 'user-input' ? 'ご入力の月間訪問数' : result.roi.trafficSource === 'similarweb-free' ? `SimilarWeb 実データ${result.roi.trancoRank ? ` (世界 ${result.roi.trancoRank.toLocaleString('ja-JP')} 位)` : ''}` : result.roi.trafficSource === 'tranco-rank' ? `Tranco rank ${result.roi.trancoRank?.toLocaleString('ja-JP')}位 から推定` : '業種・規模ベンチマーク'}
            <br />※ 工数削減 = 商談1件あたり {result.roi.basis.hoursPerMeeting}h × 商談数 + AIフォロー1件 {result.roi.basis.hoursPerFollowup}h × フォロー件数{result.roi.basis.capApplied ? '(営業人数で上限調整)' : ''}
          </div>

          <div className="no-print" style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
            <button onClick={handlePrint} style={{ padding: '12px 22px', fontSize: 14, fontWeight: 700, background: '#0a0e0c', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
              📄 PDFとして保存・印刷
            </button>
            <a href="/" style={{ padding: '12px 22px', fontSize: 14, fontWeight: 700, background: '#0eab6e', color: '#fff', borderRadius: 8, textDecoration: 'none' }}>
              デモ予約・資料請求 →
            </a>
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
          </div>
        </section>
      ) : null}
    </main>
  )
}
