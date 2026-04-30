'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import HubSpotMeetingModal from './HubSpotMeetingModal'

const STORAGE_VISITOR_KEY = 'mlp_vid'
const STORAGE_DISMISSED_KEY = 'mlp_dismissed_at'
const STORAGE_LAST_SHOW = 'mlp_last_show'
const STORAGE_BANNER_DISMISSED_KEY = 'mlp_banner_dismissed_at'
const DISMISS_COOLDOWN_MS = 1000 * 60 * 60 * 24
const SHOW_COOLDOWN_MS = 1000 * 60 * 30
const BANNER_DISMISS_COOLDOWN_MS = 1000 * 60 * 60 * 24
const BANNER_NORMAL_DELAY_MS = 15_000

const HIGH_INTENT_EXACT_PATHS = ['/contact', '/security']
const HIGH_INTENT_PREFIXES = [
  '/features/ai-chat',
  '/features/ai-email',
  '/features/meetings',
  '/features/offers',
]
const HIGH_INTENT_PATTERNS: RegExp[] = [/^\/case-studies\/[^/]+/]
const EXCLUDED_PREFIXES = ['/integrations', '/talent', '/careers', '/lp', '/blog/category', '/blog/tag', '/ja/']

const SCROLL_THRESHOLD = 0.3
const TIME_THRESHOLD_MS = 30_000
const HIGH_INTENT_TIME_MS = 10_000
const EXIT_INTENT_MIN_MS = 15_000
const MULTI_PAGE_TIME_MS = 20_000
const SESSION_PAGE_VISITS_KEY = 'mlp_page_visits'

type DocoDocoSignal = {
  company_name?: string
  domain?: string
  org_url?: string
  employees?: string
  industry?: string
}

type LpComponentRender = {
  key: string
  variant: string
  copy: Record<string, string | string[]>
}

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

type CaseHitShape = {
  slug: string
  title: string
  company: string
  industry: string
  employeeSize: string | null
  heroMetric: string
  heroMetricLabel: string
  description: string
  url: string
}

type BlogHitShape = {
  slug: string
  title: string
  description: string
  category: string
  url: string
}

type LogoShape = { primary: string; fallbacks: string[]; domain: string } | null

type LpDocument = {
  visitorId: string
  generatedAt: string
  components: LpComponentRender[]
  primaryCta: 'demo' | 'document'
  rationale?: string
  logo?: LogoShape
  trafficRoi?: RoiCalcShape | null
  relatedCases?: CaseHitShape[]
  relatedBlogs?: BlogHitShape[]
}

type ProfileSnapshot = {
  visitorId: string
  company: { name: string; industry?: string; employees?: string; prefecture?: string }
  scoreTier: string
  funnelStage: string
  hubspot?: {
    firstName?: string
    lastName?: string
    jobTitle?: string
    lifecyclestage?: string
    numFormSubmissions?: number
    recentConversionEvent?: string
    lastModified?: string
  }
  mcp?: {
    intentScore?: number
    engagementLevel?: string
    topInterest?: string
    hasMeeting?: boolean
  }
  pageContext?: {
    landingPath?: string
    currentPath?: string
    pagesViewed?: string[]
    isPricingViewed?: boolean
    isCaseStudyViewed?: boolean
  }
}

type IdentifyResponse = { profile: ProfileSnapshot; lp: LpDocument }

function ensureVisitorId(): string {
  try {
    const existing = localStorage.getItem(STORAGE_VISITOR_KEY)
    if (existing) return existing
    const id = `vid_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
    localStorage.setItem(STORAGE_VISITOR_KEY, id)
    return id
  } catch {
    return `vid_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
  }
}

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.split('; ').find(c => c.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.split('=')[1]) : undefined
}

function readDocoDoco(): DocoDocoSignal | undefined {
  try {
    const cached = sessionStorage.getItem('mlp_docodoco')
    if (cached) return JSON.parse(cached) as DocoDocoSignal
  } catch {
    // ignore
  }
  return undefined
}

function parseQuery(): { utm: Record<string, string>; gclid?: string; yclid?: string; msclkid?: string } {
  if (typeof window === 'undefined') return { utm: {} }
  const params = new URLSearchParams(window.location.search)
  const utm: Record<string, string> = {}
  for (const k of ['source', 'medium', 'campaign', 'content', 'term']) {
    const v = params.get(`utm_${k}`)
    if (v) utm[k] = v
  }
  return {
    utm,
    gclid: params.get('gclid') || undefined,
    yclid: params.get('yclid') || undefined,
    msclkid: params.get('msclkid') || undefined,
  }
}

function isHighIntentPage(path: string): boolean {
  if (HIGH_INTENT_EXACT_PATHS.some(p => path === p || path === p + '/')) return true
  if (HIGH_INTENT_PREFIXES.some(p => path === p || path.startsWith(p + '/') || path === p + '/')) return true
  if (HIGH_INTENT_PATTERNS.some(re => re.test(path))) return true
  return false
}

function isExcludedPage(path: string): boolean {
  return EXCLUDED_PREFIXES.some(p => path === p || path.startsWith(p))
}

function isAiChatActive(): boolean {
  if (typeof window === 'undefined') return false
  const w = window as unknown as {
    DynaMeet?: { isChatOpen?: boolean; chatOpen?: boolean }
    __dynameetChatOpen?: boolean
  }
  if (w.DynaMeet?.isChatOpen || w.DynaMeet?.chatOpen) return true
  if (w.__dynameetChatOpen) return true
  const el = document.querySelector('[data-dynameet-chat-open="true"], .dynameet-chat-open')
  return Boolean(el)
}

function bumpSessionPageVisit(): number {
  try {
    const cur = Number(sessionStorage.getItem(SESSION_PAGE_VISITS_KEY) || 0)
    const next = cur + 1
    sessionStorage.setItem(SESSION_PAGE_VISITS_KEY, String(next))
    return next
  } catch {
    return 1
  }
}

function trackEvent(visitorId: string, type: string, context?: Record<string, unknown>): void {
  try {
    fetch('/api/lp/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId, type, context }),
      keepalive: true,
    }).catch(() => {})
    const w = window as unknown as { gtag?: (e: string, n: string, p?: Record<string, unknown>) => void }
    if (w.gtag) {
      w.gtag('event', `mlp_${type}`, context || {})
    }
  } catch {
    // ignore
  }
}

function attachExistingCtaTracking(visitorId: string): () => void {
  if (typeof document === 'undefined') return () => {}
  const handler = (e: Event) => {
    const target = e.target as HTMLElement | null
    if (!target) return
    const el = (target.closest('a, button') as HTMLElement | null) || null
    if (!el) return
    const text = (el.textContent || '').trim()
    const href = (el as HTMLAnchorElement).href || ''
    const looksLikeDemo = /デモ|相談|予約|book|demo/i.test(text + ' ' + href)
    const looksLikeDoc = /資料|ダウンロード|whitepaper|document/i.test(text + ' ' + href)
    if (looksLikeDemo || looksLikeDoc) {
      trackEvent(visitorId, 'cta_click', {
        kind: looksLikeDemo ? 'demo' : 'document',
        text: text.slice(0, 80),
        href,
        path: location.pathname,
        source: 'existing_site_cta',
      })
    }
  }
  document.addEventListener('click', handler, true)
  return () => document.removeEventListener('click', handler, true)
}

function HoujinSuggest({ query, onPick }: { query: string; onPick: (name: string) => void }) {
  const [items, setItems] = useState<Array<{ name: string; corporateNumber: string; prefecture?: string }>>([])
  useEffect(() => {
    if (!query || query.length < 2) {
      setItems([])
      return
    }
    const ctrl = new AbortController()
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/lp/suggest-houjin?q=${encodeURIComponent(query)}`, { signal: ctrl.signal })
        if (!r.ok) return
        const d = (await r.json()) as { items?: Array<{ name: string; corporateNumber: string; prefecture?: string }> }
        setItems(d.items || [])
      } catch {
        // ignore
      }
    }, 350)
    return () => {
      clearTimeout(t)
      ctrl.abort()
    }
  }, [query])
  if (!items.length) return null
  return (
    <div style={{ marginTop: 6, background: '#fff', border: '1px solid #e4e3dd', borderRadius: 8, maxHeight: 200, overflow: 'auto', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
      {items.map(it => (
        <button
          key={it.corporateNumber}
          type="button"
          onClick={() => onPick(it.name)}
          style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', background: 'transparent', border: 'none', cursor: 'pointer', borderBottom: '1px solid #f4f3ee' }}
        >
          <div style={{ fontSize: 14, color: '#0a0e0c' }}>{it.name}</div>
          {it.prefecture ? <div style={{ fontSize: 11, color: '#6b7873', marginTop: 2 }}>{it.prefecture}</div> : null}
        </button>
      ))}
    </div>
  )
}

function InvitationBanner({
  prefillCompany,
  onOpen,
  onDismiss,
}: {
  prefillCompany?: string
  onOpen: () => void
  onDismiss: () => void
}) {
  return (
    <div
      role="region"
      aria-label="貴社向けLP生成オファー"
      style={{
        position: 'fixed',
        left: 'clamp(16px, 3vw, 28px)',
        bottom: 'clamp(16px, 3vw, 28px)',
        zIndex: 9990,
        maxWidth: 320,
        background: '#fafaf7',
        color: '#0a0e0c',
        border: '1px solid #d4d2c7',
        borderRadius: 14,
        boxShadow: '0 18px 48px rgba(0,0,0,0.12)',
        padding: '14px 16px 14px 18px',
        fontFamily: 'var(--font-noto, -apple-system, system-ui), sans-serif',
        animation: 'mlpSlideUp 0.32s ease-out',
      }}
    >
      <style>{`@keyframes mlpSlideUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }`}</style>
      <button
        onClick={onDismiss}
        aria-label="閉じる"
        style={{
          position: 'absolute',
          top: 6,
          right: 8,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: 16,
          color: '#6b7873',
          padding: 4,
          lineHeight: 1,
        }}
      >
        ×
      </button>
      <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 10, letterSpacing: '0.12em', color: '#065f46', textTransform: 'uppercase', marginBottom: 6 }}>
        ▸ AI Personalized Offer
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.45, margin: '0 0 4px' }}>
        {prefillCompany ? `${prefillCompany} 様向けの` : '貴社向けの'}試算と専用LPを30秒で
      </div>
      <div style={{ fontSize: 12, color: '#3d4a44', lineHeight: 1.6, margin: '0 0 12px' }}>
        Webサイトを入れるだけで、月間商談数とSDR工数削減を試算します
      </div>
      <button
        type="button"
        onClick={onOpen}
        style={{
          width: '100%',
          padding: '10px 14px',
          background: '#0eab6e',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        ▸ 30秒で試算を見る
      </button>
    </div>
  )
}

function CompanyPopup({
  initialName,
  initialUrl,
  docodoco,
  onSubmit,
  onClose,
  visitorId,
}: {
  initialName: string
  initialUrl?: string
  docodoco?: DocoDocoSignal
  onSubmit: (data: {
    companyName?: string
    companyUrl: string
    email?: string
    userMonthlyVisits?: number
    userMonthlyLeads?: number
    userSdrCount?: number
  }) => void
  onClose: () => void
  visitorId: string
}) {
  const [companyName, setCompanyName] = useState(initialName)
  const [companyUrl, setCompanyUrl] = useState(initialUrl || '')
  const [email, setEmail] = useState('')
  const [monthlyVisits, setMonthlyVisits] = useState('')
  const [monthlyLeads, setMonthlyLeads] = useState('')
  const [sdrCount, setSdrCount] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const wasPrefilledRef = useRef(Boolean(initialName))

  useEffect(() => {
    if (inputRef.current && initialName) {
      inputRef.current.select()
    }
  }, [initialName])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const urlTrimmed = companyUrl.trim()
    if (!urlTrimmed) return
    setSubmitting(true)
    const toInt = (v: string) => {
      const n = parseInt(v.replace(/[^0-9]/g, ''), 10)
      return Number.isFinite(n) && n > 0 ? n : undefined
    }
    onSubmit({
      companyName: companyName.trim() || undefined,
      companyUrl: urlTrimmed,
      email: email.trim() || undefined,
      userMonthlyVisits: toInt(monthlyVisits),
      userMonthlyLeads: toInt(monthlyLeads),
      userSdrCount: toInt(sdrCount),
    })
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10,14,12,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 20,
        animation: 'mlpFadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <style>{`@keyframes mlpFadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fafaf7',
          color: '#0a0e0c',
          maxWidth: 480,
          width: '100%',
          padding: 'clamp(28px, 5vw, 40px)',
          borderRadius: 16,
          boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
          fontFamily: 'var(--font-noto, -apple-system, system-ui), sans-serif',
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.15em', color: '#065f46', textTransform: 'uppercase', marginBottom: 14 }}>
          ▸ AI Personalized Page
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.35, margin: '0 0 8px' }}>
          貴社のWebサイトURLから、最適化したご提案を30秒以内に生成します
        </h3>
        <p style={{ color: '#3d4a44', fontSize: 14, lineHeight: 1.7, margin: '0 0 22px' }}>
          ロゴ・業種・トラフィック・流入経路を自動解析して、貴社専用ページを作成します。
        </p>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', marginBottom: 6 }}>
            Webサイト URL またはドメイン <span style={{ color: '#b91c1c' }}>*</span>
          </label>
          <input
            ref={inputRef}
            type="text"
            value={companyUrl}
            onChange={e => setCompanyUrl(e.target.value)}
            onFocus={e => e.target.select()}
            placeholder="例) example.co.jp / https://corp.example.com"
            required
            autoComplete="url"
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: 16,
              border: '1px solid #d4d2c7',
              borderRadius: 8,
              background: '#fff',
              color: '#0a0e0c',
              outline: 'none',
            }}
          />
          <div style={{ fontSize: 11, color: '#6b7873', marginTop: 6 }}>
            URLから会社名・業種・月間訪問数を自動取得します
          </div>

          <details style={{ marginTop: 18 }}>
            <summary style={{ fontSize: 12, color: '#0eab6e', cursor: 'pointer', listStyle: 'none' }}>
              ＋ 任意項目を追加するとより正確な試算になります
            </summary>
            <div style={{ marginTop: 12 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', marginBottom: 6 }}>会社名(URLから自動取得します)</label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="例) 株式会社○○"
                autoComplete="organization"
                style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff', marginBottom: 10 }}
              />
              <HoujinSuggest query={companyName} onPick={n => setCompanyName(n)} />
              <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', marginBottom: 6, marginTop: 10 }}>会社のメールアドレス</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.co.jp"
                style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff', marginBottom: 14 }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', marginBottom: 6 }}>月間訪問数(およそ)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={monthlyVisits}
                    onChange={e => setMonthlyVisits(e.target.value)}
                    placeholder="例) 50000"
                    style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', marginBottom: 6 }}>月間獲得リード数</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={monthlyLeads}
                    onChange={e => setMonthlyLeads(e.target.value)}
                    placeholder="例) 100"
                    style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff' }}
                  />
                </div>
              </div>
              <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', marginBottom: 6 }}>営業/SDR人数</label>
              <input
                type="text"
                inputMode="numeric"
                value={sdrCount}
                onChange={e => setSdrCount(e.target.value)}
                placeholder="例) 5"
                style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff' }}
              />
              <div style={{ fontSize: 11, color: '#6b7873', marginTop: 8, lineHeight: 1.6 }}>
                入力された値は推定より優先されます。何も入れなくても外部データから自動推定します。
              </div>
            </div>
          </details>

          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            <button type="button" onClick={onClose} style={{ flex: '0 0 auto', padding: '12px 18px', background: 'transparent', border: '1px solid #d4d2c7', borderRadius: 8, color: '#3d4a44', cursor: 'pointer', fontSize: 14 }}>
              閉じる
            </button>
            <button type="submit" disabled={submitting || !companyUrl.trim()} style={{ flex: '1 1 auto', padding: '12px 18px', background: '#0eab6e', border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 700, opacity: submitting ? 0.6 : 1 }}>
              {submitting ? '生成中…' : '専用ページを表示'}
            </button>
          </div>
        </form>
        <p style={{ fontSize: 10, color: '#6b7873', marginTop: 16, lineHeight: 1.6 }}>
          入力情報は本ページのパーソナライズ目的でのみ使用します。詳しくは <a href="/privacy-policy/" style={{ color: '#065f46' }}>プライバシーポリシー</a> をご覧ください。
        </p>
      </div>
    </div>
  )
}

function copyOf(comp: LpComponentRender | undefined, key: string): string {
  if (!comp) return ''
  const v = comp.copy[key]
  return typeof v === 'string' ? v : ''
}

function arrOf(comp: LpComponentRender | undefined, key: string): string[] {
  if (!comp) return []
  const v = comp.copy[key]
  return Array.isArray(v) ? v : []
}

function CompanyLogo({
  logo,
  size = 56,
  fallbackName,
}: {
  logo: LogoShape
  size?: number
  fallbackName?: string
}) {
  const [src, setSrc] = useState<string | null>(logo?.primary || null)
  const [allFailed, setAllFailed] = useState(false)
  const fallbackIdx = useRef(0)
  useEffect(() => {
    setSrc(logo?.primary || null)
    setAllFailed(false)
    fallbackIdx.current = 0
  }, [logo?.primary])
  // Initials avatar — final fallback when no logo URL works (or no domain at all).
  if (!logo || allFailed || !src) {
    const seed = fallbackName || logo?.domain || ''
    // First non-ASCII / Latin letter for the initial. Latin: uppercase. CJK: keep as-is.
    const initial = seed.replace(/[\s（）()「」『』·・]/g, '').charAt(0)
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #12a37d, #0fc19a)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: Math.round(size * 0.45),
          fontFamily: 'var(--font-mono, monospace)',
          letterSpacing: '-0.02em',
          boxShadow: '0 2px 8px rgba(18,163,125,0.25)',
          flexShrink: 0,
        }}
        aria-label={fallbackName || logo?.domain || ''}
      >
        {initial ? initial.toUpperCase() : '·'}
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={logo.domain}
      width={size}
      height={size}
      onError={() => {
        const next = logo.fallbacks[fallbackIdx.current]
        if (next) {
          fallbackIdx.current += 1
          setSrc(next)
        } else {
          setAllFailed(true)
        }
      }}
      style={{ width: size, height: size, objectFit: 'contain', borderRadius: 8, background: '#fff', border: '1px solid #e4e3dd', padding: 4 }}
    />
  )
}

function StatBig({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div style={{ flex: '1 1 160px', minWidth: 160, background: '#fff', border: '1px solid #e4e3dd', borderRadius: 12, padding: '18px 20px' }}>
      <div style={{ fontSize: 11, color: '#6b7873', letterSpacing: '0.05em', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.2, color: accent || '#0a0e0c' }}>{value}</div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────
 * Personalization helpers — turn structured profile data into
 * surface-visible signals so the LP feels like it knows the visitor.
 * ────────────────────────────────────────────────────────────────── */

function addressee(profile: ProfileSnapshot): string | null {
  const last = profile.hubspot?.lastName?.trim()
  const first = profile.hubspot?.firstName?.trim()
  if (last) return `${last} 様`
  if (first) return `${first} 様`
  return null
}

function computeGreetingPill(profile: ProfileSnapshot): string {
  const person = addressee(profile)
  const isReturning =
    (profile.hubspot?.numFormSubmissions ?? 0) > 0 ||
    Boolean(profile.hubspot?.lastModified)
  const company = profile.company.name
  if (person && isReturning) return `${person}、お久しぶりです`
  if (person && company) return `${company} ${person}向け`
  if (person) return `${person}向け`
  if (company) return `${company} 様向け`
  return 'AI 生成 LP'
}

function computeHeroLead(profile: ProfileSnapshot, fallback: string): string {
  const person = addressee(profile)
  const company = profile.company.name
  if (person && company) {
    return `${person}、${company} の商談を AI で自動増加させます`
  }
  if (company) return `${company} の商談を、AI が自動で増やす`
  return fallback
}

function funnelStageLabel(stage?: string): string | null {
  if (!stage) return null
  const map: Record<string, string> = {
    awareness: '情報収集中',
    evaluation: '比較検討中',
    decision: '導入検討中',
    customer: '既存顧客',
  }
  return map[stage] || null
}

function lifecycleLabel(stage?: string): string | null {
  if (!stage) return null
  const map: Record<string, string> = {
    subscriber: '購読者',
    lead: 'リード',
    marketingqualifiedlead: 'MQL',
    salesqualifiedlead: 'SQL',
    opportunity: '商談',
    customer: '顧客',
  }
  return map[stage.toLowerCase()] || null
}

type DetectedItem = { label: string; value: string }

function buildDetectedInfo(profile: ProfileSnapshot, lp: LpDocument): DetectedItem[] {
  const items: DetectedItem[] = []
  if (profile.company.industry) items.push({ label: '業界', value: profile.company.industry })
  if (profile.company.employees) items.push({ label: '従業員', value: profile.company.employees })
  if (profile.hubspot?.jobTitle) items.push({ label: '役職', value: profile.hubspot.jobTitle })
  const lifecycle = lifecycleLabel(profile.hubspot?.lifecyclestage)
  if (lifecycle) items.push({ label: 'ステージ', value: lifecycle })
  const funnel = funnelStageLabel(profile.funnelStage)
  if (funnel) items.push({ label: '検討段階', value: funnel })
  const visits = lp.trafficRoi?.monthlyVisits
  if (visits) items.push({ label: '月間流入', value: `~${visits.toLocaleString('ja-JP')}` })
  const trancoRank = lp.trafficRoi?.trancoRank
  if (trancoRank) items.push({ label: 'Tranco', value: `${trancoRank.toLocaleString('ja-JP')} 位` })
  const submissions = profile.hubspot?.numFormSubmissions
  if (submissions && submissions > 0) items.push({ label: 'お問い合わせ', value: `${submissions} 回` })
  if (profile.mcp?.topInterest) items.push({ label: '関心領域', value: profile.mcp.topInterest })
  const recent = profile.pageContext?.currentPath
  if (recent) items.push({ label: '直近閲覧', value: recent })
  return items
}

function DetectedInfoStrip({ items }: { items: DetectedItem[] }) {
  if (items.length === 0) return null
  return (
    <div
      style={{
        padding: '14px 20px',
        borderBottom: '1px solid #e4e3dd',
        background: 'linear-gradient(180deg, #f3f8f6 0%, #ffffff 100%)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: 10,
          letterSpacing: '0.12em',
          color: '#065f46',
          textTransform: 'uppercase',
          marginBottom: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 0 3px rgba(16,185,129,0.18)',
          }}
        />
        AI が解析した貴社情報
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map((it, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              padding: '4px 10px',
              borderRadius: 999,
              background: '#fff',
              border: '1px solid #d4e8df',
              color: '#1a3530',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
            }}
          >
            <span style={{ color: '#6b7873', fontWeight: 600 }}>{it.label}</span>
            <span style={{ color: '#0a0e0c', fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>
              {it.value}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

function GeneratedLpModal({
  data,
  onClose,
  onCta,
  visitorId,
}: {
  data: IdentifyResponse
  onClose: () => void
  onCta: (kind: 'demo' | 'document') => void
  visitorId: string
}) {
  const { profile, lp } = data
  const heroComp = lp.components.find(c => c.key === 'hero')
  const socialComp = lp.components.find(c => c.key === 'social_proof')
  const caseComp = lp.components.find(c => c.key === 'case_study' || c.key === 'related_cases')
  const roiTextComp = lp.components.find(c => c.key === 'roi')
  const trafficRoiComp = lp.components.find(c => c.key === 'traffic_roi')
  const useCasesComp = lp.components.find(c => c.key === 'use_cases')
  const comparisonComp = lp.components.find(c => c.key === 'comparison')
  const blogsComp = lp.components.find(c => c.key === 'related_blogs')
  const urgencyComp = lp.components.find(c => c.key === 'urgency')
  const ctaComp = lp.components.find(c => c.key === 'cta')
  const cases = lp.relatedCases || []
  const blogs = lp.relatedBlogs || []
  const roi = lp.trafficRoi || null

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    trackEvent(visitorId, 'lp_view', { variant: heroComp?.variant, primaryCta: lp.primaryCta, scoreTier: profile.scoreTier })
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onEsc)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onEsc)
    }
  }, [heroComp?.variant, lp.primaryCta, onClose, profile.scoreTier, visitorId])

  const greeting = computeGreetingPill(profile)
  const detectedItems = buildDetectedInfo(profile, lp)
  const heroFallback = computeHeroLead(profile, '訪問者識別から商談予約まで AI が自動化します')

  return (
    <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, background: 'rgba(10,14,12,0.65)', zIndex: 9999, overflowY: 'auto', padding: '24px 16px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', background: '#fafaf7', color: '#0a0e0c', borderRadius: 16, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.3)', fontFamily: 'var(--font-noto, -apple-system, system-ui), sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #e4e3dd', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <CompanyLogo logo={lp.logo ?? null} size={36} fallbackName={profile.company.name} />
            <span style={{ fontSize: 18, color: '#9aa39e' }}>×</span>
            <img src="/icon.png" alt="Meeton ai" width={36} height={36} style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 8 }} />
            <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.12em', color: '#065f46', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              ▸ {greeting} · AI 生成
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 22, color: '#3d4a44', padding: 4, flexShrink: 0 }} aria-label="閉じる">×</button>
        </div>

        <DetectedInfoStrip items={detectedItems} />

        <section style={{ padding: 'clamp(36px, 6vw, 64px) clamp(24px, 5vw, 56px) 24px' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, lineHeight: 1.3, margin: '0 0 16px' }}>
            {copyOf(heroComp, 'headline') || heroFallback}
          </h1>
          <p style={{ fontSize: 16, color: '#3d4a44', lineHeight: 1.75, margin: '0 0 28px' }}>
            {copyOf(heroComp, 'sub') || '訪問者識別から商談予約までAIが自動化します'}
          </p>
          <button
            onClick={() => onCta(lp.primaryCta)}
            style={{ padding: '14px 28px', fontSize: 16, fontWeight: 700, background: '#0eab6e', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer' }}
          >
            {lp.primaryCta === 'demo' ? 'デモを予約' : '資料請求'}
          </button>
          {urgencyComp && copyOf(urgencyComp, 'message') ? (
            <div style={{ marginTop: 16, padding: '10px 14px', background: '#fef3c7', color: '#92400e', borderRadius: 8, fontSize: 13, display: 'inline-block' }}>
              ⏰ {copyOf(urgencyComp, 'message')}
            </div>
          ) : null}
        </section>

        {roi ? (
          <section style={{ padding: 'clamp(8px, 2vw, 24px) clamp(24px, 5vw, 56px) clamp(28px, 4vw, 40px)' }}>
            <div style={{ background: '#fff', border: '1px solid #e4e3dd', borderRadius: 14, padding: 'clamp(20px, 3vw, 28px)' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.1em', color: '#065f46', textTransform: 'uppercase', marginBottom: 8 }}>
                ▸ Meeton ai 導入後の見込み
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.35, margin: '0 0 6px' }}>
                {copyOf(trafficRoiComp, 'headline') || `${profile.company.name} の月間訪問数 約${roi.monthlyVisits.toLocaleString('ja-JP')} から想定される効果`}
              </h2>
              <div style={{ fontSize: 13, color: '#3d4a44', margin: '0 0 18px' }}>
                月間訪問数 {roi.monthlyVisits.toLocaleString('ja-JP')} → 有能訪問者 {roi.monthlyEngageable.toLocaleString('ja-JP')}({Math.round(roi.basis.engageableRate * 100)}%)
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <StatBig label="自動獲得される商談/月" value={`${roi.expected.meetingsPerMonth.toLocaleString('ja-JP')}件`} accent="#0eab6e" />
                {roi.uplift ? (
                  <StatBig
                    label={`リード上乗せ/月 (現状${roi.uplift.currentLeadsPerMonth}件→)`}
                    value={`+${roi.uplift.addLeadsPerMonth.toLocaleString('ja-JP')}件`}
                    accent="#0eab6e"
                  />
                ) : (
                  <StatBig
                    label="AIが自動フォローするリード/月"
                    value={`${roi.expected.autoFollowedLeadsPerMonth.toLocaleString('ja-JP')}件`}
                    accent="#0eab6e"
                  />
                )}
                <StatBig
                  label={
                    roi.basis.sdrHeadcount
                      ? `工数削減/月 (営業${roi.basis.sdrHeadcount}名チーム)`
                      : `工数削減/月 (営業${roi.expected.hoursSavedAsHeadcount}人分)`
                  }
                  value={`${roi.expected.hoursSavedPerMonth.toLocaleString('ja-JP')}時間`}
                  accent="#0eab6e"
                />
              </div>
              <div style={{ fontSize: 11, color: '#6b7873', marginTop: 14, lineHeight: 1.7 }}>
                ※ トラフィック出典:{' '}
                {roi.trafficSource === 'user-input'
                  ? '訪問者ご入力の月間訪問数'
                  : roi.trafficSource === 'similarweb-free'
                    ? `SimilarWeb 実データ${roi.trancoRank ? ` (世界 ${roi.trancoRank.toLocaleString('ja-JP')} 位)` : ''}`
                    : roi.trafficSource === 'similarweb'
                      ? 'SimilarWeb 実データ'
                      : roi.trafficSource === 'tranco-rank'
                        ? `Tranco rank ${roi.trancoRank?.toLocaleString('ja-JP')}位 から推定`
                        : '業種・規模ベンチマーク'}
                <br />※ 工数削減 = 商談1件あたり {roi.basis.hoursPerMeeting}h × 商談数 + AIフォロー1件 {roi.basis.hoursPerFollowup}h × フォロー件数{roi.basis.capApplied ? '（営業人数で上限調整）' : ''}
              </div>
            </div>
          </section>
        ) : null}

        {socialComp && arrOf(socialComp, 'stats').length ? (
          <section style={{ padding: '0 clamp(24px, 5vw, 56px) 36px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              {arrOf(socialComp, 'stats').map((s, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #e4e3dd', borderRadius: 10, padding: '18px 20px', fontSize: 18, fontWeight: 700, color: '#065f46' }}>
                  {s}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {cases.length ? (
          <section style={{ padding: '24px clamp(24px, 5vw, 56px)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 6px' }}>
              {copyOf(caseComp, 'headline') || `${profile.company.industry ? profile.company.industry + '業界の' : ''}実際の導入事例`}
            </h2>
            <p style={{ fontSize: 13, color: '#6b7873', margin: '0 0 16px' }}>
              {copyOf(caseComp, 'intro') || '貴社に近い業種・規模での実績です。クリックで詳細レポートが開きます。'}
            </p>
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
              {cases.map(cs => (
                <a
                  key={cs.slug}
                  href={cs.url}
                  target="_blank"
                  rel="noopener"
                  onClick={() => trackEvent(visitorId, 'cta_click', { kind: 'case_study', slug: cs.slug, source: 'mlp_modal' })}
                  style={{ display: 'block', background: '#fff', border: '1px solid #e4e3dd', borderRadius: 12, padding: 18, textDecoration: 'none', color: '#0a0e0c' }}
                >
                  <div style={{ fontSize: 11, color: '#6b7873', marginBottom: 6 }}>{cs.industry}{cs.employeeSize ? ` · ${cs.employeeSize}` : ''}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#0eab6e', lineHeight: 1.1 }}>{cs.heroMetric}</div>
                  <div style={{ fontSize: 12, color: '#3d4a44', marginTop: 2 }}>{cs.heroMetricLabel}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginTop: 12, lineHeight: 1.4 }}>{cs.company}</div>
                  <div style={{ fontSize: 12, color: '#3d4a44', marginTop: 6, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{cs.description}</div>
                  <div style={{ fontSize: 11, color: '#0eab6e', marginTop: 10 }}>事例詳細を読む →</div>
                </a>
              ))}
            </div>
          </section>
        ) : null}

        {roiTextComp ? (
          <section style={{ padding: '24px clamp(24px, 5vw, 56px)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 16px' }}>
              {copyOf(roiTextComp, 'headline') || '想定効果サマリー'}
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
              {arrOf(roiTextComp, 'lines').map((it, i) => (
                <li key={i} style={{ fontSize: 14, color: '#0a0e0c', padding: '8px 0', borderBottom: '1px dashed #e4e3dd' }}>● {it}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {useCasesComp ? (
          <section style={{ padding: '24px clamp(24px, 5vw, 56px)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 16px' }}>{copyOf(useCasesComp, 'headline') || '想定ユースケース'}</h2>
            <ol style={{ paddingLeft: 22, margin: 0, color: '#3d4a44', fontSize: 14, lineHeight: 1.85 }}>
              {arrOf(useCasesComp, 'items').map((it, i) => <li key={i}>{it}</li>)}
            </ol>
          </section>
        ) : null}

        {comparisonComp ? (
          <section style={{ padding: '24px clamp(24px, 5vw, 56px)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 16px' }}>{copyOf(comparisonComp, 'headline') || 'Meeton ai が選ばれる理由'}</h2>
            <p style={{ color: '#3d4a44', fontSize: 14, lineHeight: 1.75, margin: 0 }}>
              IP→企業特定の自動化、AI Email/Calendar/Offer の標準搭載、日本市場特化の事例数。詳細はデモでご案内します。
            </p>
          </section>
        ) : null}

        {blogs.length ? (
          <section style={{ padding: '24px clamp(24px, 5vw, 56px)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 16px' }}>
              {copyOf(blogsComp, 'headline') || '貴社の状況にあわせた深掘り読み物'}
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {blogs.map(b => (
                <li key={b.slug}>
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener"
                    onClick={() => trackEvent(visitorId, 'cta_click', { kind: 'blog', slug: b.slug, source: 'mlp_modal' })}
                    style={{ display: 'block', background: '#fff', border: '1px solid #e4e3dd', borderRadius: 10, padding: '14px 18px', textDecoration: 'none', color: '#0a0e0c' }}
                  >
                    <div style={{ fontSize: 11, color: '#6b7873', marginBottom: 4 }}>{b.category}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.4 }}>{b.title}</div>
                    {b.description ? <div style={{ fontSize: 12, color: '#3d4a44', marginTop: 4, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{b.description}</div> : null}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section style={{ padding: 'clamp(28px, 5vw, 48px) clamp(24px, 5vw, 56px)', background: '#0a0e0c', color: '#fafaf7' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 20px' }}>
            {profile.company.name} 様、次のステップ
          </h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => onCta(lp.primaryCta)}
              style={{ padding: '14px 24px', fontSize: 15, fontWeight: 700, background: '#0eab6e', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer' }}
            >
              {copyOf(ctaComp, 'primary') || (lp.primaryCta === 'demo' ? '30分で相談する（無料）' : '資料をダウンロード')}
            </button>
            {ctaComp && copyOf(ctaComp, 'secondary') ? (
              <button
                onClick={() => {
                  const sec = lp.primaryCta === 'demo' ? 'document' : 'demo'
                  onCta(sec as 'demo' | 'document')
                }}
                style={{ padding: '14px 24px', fontSize: 15, fontWeight: 600, background: 'transparent', color: '#fafaf7', border: '1px solid #fafaf7', borderRadius: 10, cursor: 'pointer' }}
              >
                {copyOf(ctaComp, 'secondary')}
              </button>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  )
}

export default function DynamicLpController() {
  const [visitorId, setVisitorId] = useState<string>('')
  const [docodoco, setDocodoco] = useState<DocoDocoSignal | undefined>(undefined)
  const [popupOpen, setPopupOpen] = useState(false)
  const [bannerOpen, setBannerOpen] = useState(false)
  const [data, setData] = useState<IdentifyResponse | null>(null)
  const [demoOpen, setDemoOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const popupTriggeredRef = useRef(false)
  const bannerTriggeredRef = useRef(false)
  const startTsRef = useRef(Date.now())
  const pageHistoryRef = useRef<string[]>([])

  useEffect(() => {
    setMounted(true)
    const vid = ensureVisitorId()
    setVisitorId(vid)
    const dd = readDocoDoco()
    setDocodoco(dd)
    pageHistoryRef.current = [location.pathname]
    const detach = attachExistingCtaTracking(vid)
    return () => detach()
  }, [])

  const isTestMode = useCallback((): boolean => {
    return typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('mlp_test') === '1'
  }, [])

  const checkPopupCooldown = useCallback((): boolean => {
    try {
      if (isTestMode()) return true
      const dismissed = Number(localStorage.getItem(STORAGE_DISMISSED_KEY) || 0)
      if (Date.now() - dismissed < DISMISS_COOLDOWN_MS) return false
      const lastShow = Number(localStorage.getItem(STORAGE_LAST_SHOW) || 0)
      if (Date.now() - lastShow < SHOW_COOLDOWN_MS) return false
    } catch {
      // ignore
    }
    return true
  }, [isTestMode])

  const checkBannerCooldown = useCallback((): boolean => {
    try {
      if (isTestMode()) return true
      const dismissed = Number(localStorage.getItem(STORAGE_BANNER_DISMISSED_KEY) || 0)
      if (Date.now() - dismissed < BANNER_DISMISS_COOLDOWN_MS) return false
    } catch {
      // ignore
    }
    return true
  }, [isTestMode])

  const triggerPopup = useCallback(
    (reason: string) => {
      if (popupTriggeredRef.current) return
      if (!checkPopupCooldown()) return
      if (data) return
      if (isAiChatActive()) return
      popupTriggeredRef.current = true
      setBannerOpen(false)
      try {
        localStorage.setItem(STORAGE_LAST_SHOW, String(Date.now()))
      } catch {
        // ignore
      }
      setPopupOpen(true)
      if (visitorId) {
        trackEvent(visitorId, 'popup_view', { path: location.pathname, reason, prefill: docodoco?.company_name || null })
      }
    },
    [checkPopupCooldown, data, docodoco, visitorId]
  )

  const triggerBanner = useCallback(
    (reason: string) => {
      if (bannerTriggeredRef.current) return
      if (!checkBannerCooldown()) return
      if (popupOpen || data) return
      if (isAiChatActive()) return
      bannerTriggeredRef.current = true
      setBannerOpen(true)
      if (visitorId) {
        trackEvent(visitorId, 'banner_view', { path: location.pathname, reason, prefill: docodoco?.company_name || null })
      }
    },
    [checkBannerCooldown, data, docodoco, popupOpen, visitorId]
  )

  useEffect(() => {
    if (!visitorId) return
    const path = location.pathname
    const testMode = isTestMode()
    if (!testMode && isExcludedPage(path)) return

    if (testMode) {
      const t = setTimeout(() => triggerPopup('TEST'), 500)
      return () => clearTimeout(t)
    }

    const pageVisitNumber = bumpSessionPageVisit()
    const highIntent = isHighIntentPage(path)
    const isMultiPage = pageVisitNumber >= 2

    const timers: Array<ReturnType<typeof setTimeout>> = []

    timers.push(
      setTimeout(
        () => triggerBanner(highIntent ? 'L1:high-intent' : 'L2:normal-page'),
        highIntent ? HIGH_INTENT_TIME_MS : BANNER_NORMAL_DELAY_MS
      )
    )

    if (isMultiPage) {
      timers.push(setTimeout(() => triggerPopup('L4:multi-page'), MULTI_PAGE_TIME_MS))
    }

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && Date.now() - startTsRef.current >= EXIT_INTENT_MIN_MS) {
        triggerPopup('L3:exit-intent')
      }
    }
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      timers.forEach(t => clearTimeout(t))
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [triggerBanner, triggerPopup, isTestMode, visitorId])

  const initialName = useMemo(() => docodoco?.company_name || '', [docodoco?.company_name])
  const initialUrl = useMemo(() => docodoco?.domain || docodoco?.org_url || '', [docodoco?.domain, docodoco?.org_url])

  const handleSubmit = useCallback(
    async (input: {
      companyName?: string
      companyUrl: string
      email?: string
      userMonthlyVisits?: number
      userMonthlyLeads?: number
      userSdrCount?: number
    }) => {
      const q = parseQuery()
      const payload = {
        companyName: input.companyName,
        companyUrl: input.companyUrl,
        email: input.email,
        hubspotutk: readCookie('hubspotutk'),
        visitorId,
        pagePath: location.pathname,
        referrer: document.referrer,
        utm: q.utm,
        gclid: q.gclid,
        yclid: q.yclid,
        msclkid: q.msclkid,
        gaClientId: readCookie('_ga'),
        docodoco,
        pageHistory: pageHistoryRef.current,
        userMonthlyVisits: input.userMonthlyVisits,
        userMonthlyLeads: input.userMonthlyLeads,
        userSdrCount: input.userSdrCount,
      }
      trackEvent(visitorId, 'company_submit', { company: input.companyName })
      try {
        const r = await fetch('/api/lp/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!r.ok) {
          setPopupOpen(false)
          return
        }
        const result = (await r.json()) as IdentifyResponse
        setData(result)
        setPopupOpen(false)
      } catch {
        setPopupOpen(false)
      }
    },
    [docodoco, visitorId]
  )

  const handlePopupClose = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_DISMISSED_KEY, String(Date.now()))
    } catch {
      // ignore
    }
    if (visitorId) trackEvent(visitorId, 'popup_dismiss')
    setPopupOpen(false)
  }, [visitorId])

  const handleBannerOpen = useCallback(() => {
    if (visitorId) trackEvent(visitorId, 'banner_click')
    setBannerOpen(false)
    popupTriggeredRef.current = false
    triggerPopup('banner-click')
  }, [triggerPopup, visitorId])

  const handleBannerDismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_BANNER_DISMISSED_KEY, String(Date.now()))
    } catch {
      // ignore
    }
    if (visitorId) trackEvent(visitorId, 'banner_dismiss')
    setBannerOpen(false)
  }, [visitorId])

  const handleCta = useCallback(
    (kind: 'demo' | 'document') => {
      if (!visitorId) return
      trackEvent(visitorId, 'cta_click', { kind, source: 'mlp_modal' })
      if (kind === 'demo') {
        setDemoOpen(true)
        return
      }
      window.open('/contact/?form=document', '_blank')
    },
    [visitorId]
  )

  if (!mounted || typeof document === 'undefined') return null

  return createPortal(
    <>
      {bannerOpen && !popupOpen && !data ? (
        <InvitationBanner
          prefillCompany={initialName || undefined}
          onOpen={handleBannerOpen}
          onDismiss={handleBannerDismiss}
        />
      ) : null}
      {popupOpen ? (
        <CompanyPopup
          initialName={initialName}
          initialUrl={initialUrl}
          docodoco={docodoco}
          onSubmit={handleSubmit}
          onClose={handlePopupClose}
          visitorId={visitorId}
        />
      ) : null}
      {data ? (
        <GeneratedLpModal
          data={data}
          onClose={() => setData(null)}
          onCta={handleCta}
          visitorId={visitorId}
        />
      ) : null}
      <HubSpotMeetingModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} utmCampaign={`mlp_${data?.lp.components.find(c => c.key === 'hero')?.variant || 'default'}`} />
    </>,
    document.body
  )
}
