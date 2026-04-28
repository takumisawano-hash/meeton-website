'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import HubSpotMeetingModal from './HubSpotMeetingModal'

const STORAGE_VISITOR_KEY = 'mlp_vid'
const STORAGE_DISMISSED_KEY = 'mlp_dismissed_at'
const STORAGE_LAST_SHOW = 'mlp_last_show'
const DISMISS_COOLDOWN_MS = 1000 * 60 * 60 * 24
const SHOW_COOLDOWN_MS = 1000 * 60 * 30

const HIGH_INTENT_PATHS = ['/pricing', '/case-studies', '/features/', '/contact']
const SCROLL_THRESHOLD = 0.25
const TIME_THRESHOLD_MS = 20_000

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

type LpDocument = {
  visitorId: string
  generatedAt: string
  components: LpComponentRender[]
  primaryCta: 'demo' | 'document' | 'chat'
  rationale?: string
}

type ProfileSnapshot = {
  visitorId: string
  company: { name: string; industry?: string; employees?: string }
  scoreTier: string
  funnelStage: string
  hubspot?: { firstName?: string; lastName?: string }
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
  return HIGH_INTENT_PATHS.some(p => path.includes(p))
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
  onSubmit: (data: { companyName: string; companyUrl?: string; email?: string }) => void
  onClose: () => void
  visitorId: string
}) {
  const [companyName, setCompanyName] = useState(initialName)
  const [companyUrl, setCompanyUrl] = useState(initialUrl || '')
  const [email, setEmail] = useState('')
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
    const trimmed = companyName.trim()
    if (!trimmed) return
    if (wasPrefilledRef.current && trimmed !== initialName) {
      trackEvent(visitorId, 'docodoco_corrected', { from: initialName, to: trimmed })
    }
    setSubmitting(true)
    onSubmit({ companyName: trimmed, companyUrl: companyUrl.trim() || undefined, email: email.trim() || undefined })
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
          あなたの会社向けに、最適化したご提案を3秒で生成します
        </h3>
        <p style={{ color: '#3d4a44', fontSize: 14, lineHeight: 1.7, margin: '0 0 22px' }}>
          会社名から、業種・規模・流入経路を考慮した専用ページを作成します。
        </p>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', marginBottom: 6 }}>
            会社名 <span style={{ color: '#b91c1c' }}>*</span>
          </label>
          <input
            ref={inputRef}
            type="text"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            onFocus={e => e.target.select()}
            placeholder="例) 株式会社○○"
            required
            autoComplete="organization"
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
          {wasPrefilledRef.current && companyName === initialName ? (
            <div style={{ fontSize: 11, color: '#6b7873', marginTop: 6 }}>
              ↑ 自動推定です（{docodoco?.industry || '推定'}）。違う場合は修正してください
            </div>
          ) : null}
          <HoujinSuggest query={companyName} onPick={n => setCompanyName(n)} />

          <details style={{ marginTop: 18 }}>
            <summary style={{ fontSize: 12, color: '#0eab6e', cursor: 'pointer', listStyle: 'none' }}>
              ＋ 会社サイトURL・メールアドレスでより精度を上げる（任意）
            </summary>
            <div style={{ marginTop: 12 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', marginBottom: 6 }}>会社サイトURL</label>
              <input
                type="url"
                value={companyUrl}
                onChange={e => setCompanyUrl(e.target.value)}
                placeholder="https://example.co.jp"
                style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff', marginBottom: 10 }}
              />
              <label style={{ display: 'block', fontSize: 12, color: '#3d4a44', marginBottom: 6 }}>会社のメールアドレス</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.co.jp"
                style={{ width: '100%', padding: '10px 12px', fontSize: 14, border: '1px solid #d4d2c7', borderRadius: 8, background: '#fff' }}
              />
            </div>
          </details>

          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            <button type="button" onClick={onClose} style={{ flex: '0 0 auto', padding: '12px 18px', background: 'transparent', border: '1px solid #d4d2c7', borderRadius: 8, color: '#3d4a44', cursor: 'pointer', fontSize: 14 }}>
              閉じる
            </button>
            <button type="submit" disabled={submitting || !companyName.trim()} style={{ flex: '1 1 auto', padding: '12px 18px', background: '#0eab6e', border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 700, opacity: submitting ? 0.6 : 1 }}>
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

function GeneratedLpModal({
  data,
  onClose,
  onCta,
  visitorId,
}: {
  data: IdentifyResponse
  onClose: () => void
  onCta: (kind: 'demo' | 'document' | 'chat') => void
  visitorId: string
}) {
  const { profile, lp } = data
  const heroComp = lp.components.find(c => c.key === 'hero')
  const socialComp = lp.components.find(c => c.key === 'social_proof')
  const caseComp = lp.components.find(c => c.key === 'case_study')
  const roiComp = lp.components.find(c => c.key === 'roi')
  const useCasesComp = lp.components.find(c => c.key === 'use_cases')
  const comparisonComp = lp.components.find(c => c.key === 'comparison')
  const urgencyComp = lp.components.find(c => c.key === 'urgency')
  const ctaComp = lp.components.find(c => c.key === 'cta')

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

  return (
    <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, background: 'rgba(10,14,12,0.65)', zIndex: 9999, overflowY: 'auto', padding: '24px 16px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', background: '#fafaf7', color: '#0a0e0c', borderRadius: 16, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.3)', fontFamily: 'var(--font-noto, -apple-system, system-ui), sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #e4e3dd', background: '#fff' }}>
          <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.15em', color: '#065f46', textTransform: 'uppercase' }}>
            ▸ {profile.company.name} 様向け · AI生成
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 22, color: '#3d4a44', padding: 4 }} aria-label="閉じる">×</button>
        </div>

        <section style={{ padding: 'clamp(36px, 6vw, 64px) clamp(24px, 5vw, 56px)' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, lineHeight: 1.3, margin: '0 0 16px' }}>
            {copyOf(heroComp, 'headline') || `${profile.company.name} の商談を、AIが自動で増やす`}
          </h1>
          <p style={{ fontSize: 16, color: '#3d4a44', lineHeight: 1.75, margin: '0 0 32px' }}>
            {copyOf(heroComp, 'sub') || '訪問者識別から商談予約までAIが自動化します'}
          </p>
          <button
            onClick={() => onCta(lp.primaryCta)}
            style={{ padding: '14px 28px', fontSize: 16, fontWeight: 700, background: '#0eab6e', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer' }}
          >
            {copyOf(heroComp, 'ctaLabel') || '相談する（30分・無料）'}
          </button>
          {urgencyComp && copyOf(urgencyComp, 'message') ? (
            <div style={{ marginTop: 16, padding: '10px 14px', background: '#fef3c7', color: '#92400e', borderRadius: 8, fontSize: 13, display: 'inline-block' }}>
              ⏰ {copyOf(urgencyComp, 'message')}
            </div>
          ) : null}
        </section>

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

        {caseComp ? (
          <section style={{ padding: '24px clamp(24px, 5vw, 56px)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 16px' }}>
              {copyOf(caseComp, 'headline') || `${profile.company.industry || ''}業界での導入事例`}
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {arrOf(caseComp, 'items').map((it, i) => (
                <li key={i} style={{ background: '#fff', border: '1px solid #e4e3dd', borderRadius: 8, padding: '12px 16px', fontSize: 14, color: '#3d4a44' }}>{it}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {roiComp ? (
          <section style={{ padding: '24px clamp(24px, 5vw, 56px)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 16px' }}>
              {copyOf(roiComp, 'headline') || '貴社想定ROI'}
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
              {arrOf(roiComp, 'lines').map((it, i) => (
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
                  onCta(sec as 'demo' | 'document' | 'chat')
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
  const [data, setData] = useState<IdentifyResponse | null>(null)
  const [demoOpen, setDemoOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const triggeredRef = useRef(false)
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

  const checkCooldown = useCallback((): boolean => {
    try {
      const dismissed = Number(localStorage.getItem(STORAGE_DISMISSED_KEY) || 0)
      if (Date.now() - dismissed < DISMISS_COOLDOWN_MS) return false
      const lastShow = Number(localStorage.getItem(STORAGE_LAST_SHOW) || 0)
      if (Date.now() - lastShow < SHOW_COOLDOWN_MS) return false
    } catch {
      // ignore
    }
    return true
  }, [])

  const triggerPopup = useCallback(() => {
    if (triggeredRef.current) return
    if (!checkCooldown()) return
    if (data) return
    triggeredRef.current = true
    try {
      localStorage.setItem(STORAGE_LAST_SHOW, String(Date.now()))
    } catch {
      // ignore
    }
    setPopupOpen(true)
    if (visitorId) {
      trackEvent(visitorId, 'popup_view', { path: location.pathname, prefill: docodoco?.company_name || null })
    }
  }, [checkCooldown, data, docodoco, visitorId])

  useEffect(() => {
    if (!visitorId) return
    if (location.pathname.startsWith('/lp')) return

    let timer: ReturnType<typeof setTimeout> | null = null
    let scrollPassed = false
    let timePassed = false

    const tryFire = () => {
      if (scrollPassed && timePassed) {
        triggerPopup()
      }
    }

    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      if (max <= 0) return
      const pct = window.scrollY / max
      if (pct >= SCROLL_THRESHOLD && !scrollPassed) {
        scrollPassed = true
        tryFire()
      }
    }
    timer = setTimeout(() => {
      timePassed = true
      tryFire()
    }, TIME_THRESHOLD_MS)

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && Date.now() - startTsRef.current > 8000) {
        triggerPopup()
      }
    }

    if (isHighIntentPage(location.pathname)) {
      const fast = setTimeout(triggerPopup, 8000)
      const cleanup = () => {
        clearTimeout(fast)
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      document.addEventListener('mouseleave', onMouseLeave)
      return () => {
        cleanup()
        if (timer) clearTimeout(timer)
        window.removeEventListener('scroll', onScroll)
        document.removeEventListener('mouseleave', onMouseLeave)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [triggerPopup, visitorId])

  const initialName = useMemo(() => docodoco?.company_name || '', [docodoco?.company_name])

  const handleSubmit = useCallback(
    async (input: { companyName: string; companyUrl?: string; email?: string }) => {
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

  const handleCta = useCallback(
    (kind: 'demo' | 'document' | 'chat') => {
      if (!visitorId) return
      trackEvent(visitorId, 'cta_click', { kind, source: 'mlp_modal' })
      if (kind === 'demo') {
        setDemoOpen(true)
        return
      }
      if (kind === 'document') {
        window.open('/contact/?form=document', '_blank')
        return
      }
      if (kind === 'chat') {
        const w = window as unknown as { DynaMeet?: { openChat?: () => void } }
        if (w.DynaMeet?.openChat) {
          w.DynaMeet.openChat()
        } else {
          setDemoOpen(true)
        }
      }
    },
    [visitorId]
  )

  if (!mounted || typeof document === 'undefined') return null

  return createPortal(
    <>
      {popupOpen ? (
        <CompanyPopup
          initialName={initialName}
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
