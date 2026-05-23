'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

/**
 * AdsDebugPanel — gated dev tool for pre-launch verification of the
 * ads attribution pipeline.
 *
 * Activation: append `?ads_debug=1` to any URL on dynameet.ai. The
 * panel persists across in-app navigations by re-reading the URL on
 * each visibility check, but query params survive next.js client-side
 * routing so once on, it stays on for the session.
 *
 * What it surfaces (live, polling 1s):
 *   - Current URL utm_* / gclid / msclkid / yclid
 *   - localStorage["mlp_attribution"] (first+last touch + landingPath)
 *   - Cookie _meeton_attr (cross-subdomain mirror)
 *   - body[data-lp-slug]
 *   - window.__meetonAttribution (exported by AttributionBootstrap)
 *   - window.DynaMeetConfig.attribution (chatbot widget payload —
 *     proves cross-subdomain forward works)
 *   - GA4 dataLayer event count + last 5 events (sanity that
 *     gtag is mounted)
 *
 * Each field has a "copy" button. Mismatches between expected and
 * actual values are highlighted red so the §8 verification checklist
 * in docs/measurement-spec.md runs in ~30 seconds instead of an
 * hour of DevTools navigation.
 *
 * NOT included in production bundle by accident: this component
 * gates ALL of its work behind the `?ads_debug=1` flag on mount,
 * so it renders null + does no polling for normal visitors. Bundle
 * size impact: ~3KB minified. Safe to leave mounted globally.
 */

type AttributionPayload = {
  firstTouch?: Record<string, string>
  lastTouch?: Record<string, string>
  landingPath?: string
  firstSeenAt?: string
  lastSeenAt?: string
}

type DataLayerEvent = {
  event?: string
  [key: string]: unknown
}

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[]
    DynaMeetConfig?: { teamId?: string; attribution?: unknown }
    __meetonAttribution?: AttributionPayload
  }
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.split('=')[1]) : null
}

function copyToClipboard(text: string) {
  if (typeof navigator === 'undefined' || !navigator.clipboard) return
  navigator.clipboard.writeText(text).catch(() => {})
}

export default function AdsDebugPanel() {
  const [enabled, setEnabled] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [tick, setTick] = useState(0)

  // Enable check — runs on mount + when URL changes.
  useEffect(() => {
    const check = () => {
      try {
        const sp = new URLSearchParams(window.location.search)
        setEnabled(sp.get('ads_debug') === '1')
      } catch {
        setEnabled(false)
      }
    }
    check()
    // Listen for in-app SPA navigations
    const handler = () => check()
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  // Poll every 1s while enabled so values update as chatbot loads /
  // attribution updates / dataLayer grows.
  useEffect(() => {
    if (!enabled) return
    const id = window.setInterval(() => setTick((t) => t + 1), 1000)
    return () => window.clearInterval(id)
  }, [enabled])

  const data = useMemo(() => {
    if (!enabled || typeof window === 'undefined') return null

    const url = new URL(window.location.href)
    const sp = url.searchParams
    const utm = {
      utm_source: sp.get('utm_source') || '',
      utm_medium: sp.get('utm_medium') || '',
      utm_campaign: sp.get('utm_campaign') || '',
      utm_content: sp.get('utm_content') || '',
      utm_term: sp.get('utm_term') || '',
      gclid: sp.get('gclid') || '',
      msclkid: sp.get('msclkid') || '',
      yclid: sp.get('yclid') || '',
    }

    let storageRaw: string | null = null
    let storage: AttributionPayload | null = null
    try {
      storageRaw = localStorage.getItem('mlp_attribution')
      if (storageRaw) storage = JSON.parse(storageRaw)
    } catch {
      /* private mode */
    }

    const cookie = readCookie('_meeton_attr')
    const lpSlug = document.body?.getAttribute('data-lp-slug') || ''
    const windowAttribution = window.__meetonAttribution || null
    const chatbotAttribution = window.DynaMeetConfig?.attribution ?? '(chatbot widget not loaded)'

    const dataLayer = window.dataLayer || []
    const recentEvents = dataLayer.slice(-5).map((e, i) => ({
      idx: dataLayer.length - 5 + i,
      event: typeof e === 'object' && e ? (e.event as string) || '(no event name)' : String(e),
      payload: e,
    }))

    return {
      url: url.toString(),
      utm,
      storageRaw,
      storage,
      cookie,
      lpSlug,
      windowAttribution,
      chatbotAttribution,
      dataLayerLen: dataLayer.length,
      recentEvents,
    }
  }, [enabled, tick])

  // Touch tick so useMemo recomputes (don't strip even though
  // ESLint won't see the dependency).
  void tick

  const fireTestEvent = useCallback((name: string) => {
    if (typeof window === 'undefined') return
    if (!window.dataLayer) window.dataLayer = []
    window.dataLayer.push({
      event: name,
      lp_slug: document.body?.getAttribute('data-lp-slug') || '(no lp slug)',
      ads_debug: true,
      ts: new Date().toISOString(),
    })
  }, [])

  const writeTestAttribution = useCallback(() => {
    if (typeof window === 'undefined') return
    const test = {
      firstTouch: {
        utm_source: 'test',
        utm_medium: 'cpc',
        utm_campaign: 'verify_crm',
        utm_content: 'ad_test',
        utm_term: 'test_kw',
        gclid: 'test_gclid_001',
      },
      lastTouch: {
        utm_source: 'test',
        utm_medium: 'cpc',
        utm_campaign: 'verify_crm',
        utm_content: 'ad_test',
        utm_term: 'test_kw',
        gclid: 'test_gclid_001',
      },
      landingPath: window.location.pathname,
      firstSeenAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
    }
    try {
      localStorage.setItem('mlp_attribution', JSON.stringify(test))
      const compact = encodeURIComponent(
        JSON.stringify({ ...test.lastTouch, lp: test.landingPath, fs: test.firstSeenAt })
      )
      document.cookie = `_meeton_attr=${compact}; Path=/; Domain=.dynameet.ai; Max-Age=15552000; SameSite=Lax; Secure`
      window.__meetonAttribution = test
      setTick((t) => t + 1)
    } catch (e) {
      console.warn('ads-debug: writeTestAttribution failed', e)
    }
  }, [])

  const clearAttribution = useCallback(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem('mlp_attribution')
      document.cookie = `_meeton_attr=; Path=/; Domain=.dynameet.ai; Max-Age=0`
      window.__meetonAttribution = undefined
      setTick((t) => t + 1)
    } catch (e) {
      console.warn('ads-debug: clearAttribution failed', e)
    }
  }, [])

  if (!enabled || !data) return null

  const ftMatch =
    data.utm.utm_source &&
    data.storage?.firstTouch?.utm_source === data.utm.utm_source
  const gclidMatch =
    data.utm.gclid && data.storage?.firstTouch?.gclid === data.utm.gclid

  return (
    <div
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 100000,
        width: collapsed ? 200 : 420,
        maxHeight: collapsed ? 36 : '80vh',
        overflowY: collapsed ? 'hidden' : 'auto',
        background: '#0a0e0c',
        color: '#e4eaef',
        fontFamily: 'ui-monospace, monospace',
        fontSize: 11,
        lineHeight: 1.5,
        border: '1px solid #2a3340',
        borderRadius: 10,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        padding: 0,
      }}
      data-ads-debug-panel
    >
      <div
        onClick={() => setCollapsed((c) => !c)}
        style={{
          padding: '8px 12px',
          background: '#12a37d',
          color: '#fff',
          fontWeight: 800,
          letterSpacing: 0.5,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '10px 10px 0 0',
        }}
      >
        <span>🧪 Ads Debug Panel</span>
        <span>{collapsed ? '▲' : '×'}</span>
      </div>

      {!collapsed && (
        <div style={{ padding: '10px 14px' }}>
          <Section title="URL params (current visit)">
            {Object.entries(data.utm).map(([k, v]) => (
              <Row key={k} k={k} v={v || '(empty)'} highlight={!!v} />
            ))}
          </Section>

          <Section title="body[data-lp-slug]">
            <Row k="lp_slug" v={data.lpSlug || '(none)'} highlight={!!data.lpSlug} />
          </Section>

          <Section title="localStorage[mlp_attribution]">
            {data.storage ? (
              <>
                <Row
                  k="firstTouch.utm_source"
                  v={data.storage.firstTouch?.utm_source || '(none)'}
                  highlight={!!data.storage.firstTouch?.utm_source}
                  warn={data.utm.utm_source ? !ftMatch : false}
                />
                <Row
                  k="firstTouch.utm_campaign"
                  v={data.storage.firstTouch?.utm_campaign || '(none)'}
                  highlight={!!data.storage.firstTouch?.utm_campaign}
                />
                <Row
                  k="firstTouch.gclid"
                  v={data.storage.firstTouch?.gclid || '(none)'}
                  highlight={!!data.storage.firstTouch?.gclid}
                  warn={data.utm.gclid ? !gclidMatch : false}
                />
                <Row
                  k="lastTouch.utm_source"
                  v={data.storage.lastTouch?.utm_source || '(none)'}
                  highlight={!!data.storage.lastTouch?.utm_source}
                />
                <Row
                  k="landingPath"
                  v={data.storage.landingPath || '(none)'}
                  highlight={!!data.storage.landingPath}
                />
                <Row k="firstSeenAt" v={data.storage.firstSeenAt || '(none)'} />
                <Row k="lastSeenAt" v={data.storage.lastSeenAt || '(none)'} />
              </>
            ) : (
              <Row k="(empty)" v="not written yet — visit with utm params" warn />
            )}
          </Section>

          <Section title="cookie _meeton_attr (cross-subdomain)">
            <Row k="cookie" v={data.cookie || '(not set)'} warn={!data.cookie} />
          </Section>

          <Section title="window.__meetonAttribution">
            <Row
              k="bound?"
              v={data.windowAttribution ? 'yes' : 'no'}
              warn={!data.windowAttribution}
            />
          </Section>

          <Section title="chatbot widget (DynaMeetConfig.attribution)">
            <pre
              style={{
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                color: '#9aa5b3',
                fontSize: 10,
              }}
            >
              {typeof data.chatbotAttribution === 'object'
                ? JSON.stringify(data.chatbotAttribution, null, 2)
                : String(data.chatbotAttribution)}
            </pre>
          </Section>

          <Section title="GA4 dataLayer">
            <Row
              k="length"
              v={String(data.dataLayerLen)}
              warn={data.dataLayerLen === 0}
            />
            {data.recentEvents.map((e) => (
              <div
                key={e.idx}
                style={{
                  paddingLeft: 6,
                  borderLeft: '2px solid #2a3340',
                  marginBottom: 4,
                }}
              >
                <div style={{ color: '#a4ecc0', fontWeight: 700 }}>
                  [{e.idx}] {e.event}
                </div>
                <pre
                  style={{
                    margin: '2px 0 0',
                    fontSize: 10,
                    color: '#7f8c9c',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                  }}
                >
                  {JSON.stringify(e.payload, null, 0).slice(0, 180)}
                </pre>
              </div>
            ))}
          </Section>

          <Section title="Actions">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <button onClick={writeTestAttribution} style={btn}>
                Write test attribution (utm=test, gclid=test_gclid_001)
              </button>
              <button onClick={clearAttribution} style={btn}>
                Clear attribution (localStorage + cookie)
              </button>
              <button onClick={() => fireTestEvent('primary_cta_click')} style={btn}>
                Fire dataLayer primary_cta_click
              </button>
              <button onClick={() => fireTestEvent('calendar_book')} style={btn}>
                Fire dataLayer calendar_book
              </button>
              <button
                onClick={() => copyToClipboard(JSON.stringify(data, null, 2))}
                style={btn}
              >
                Copy full debug payload (JSON)
              </button>
            </div>
          </Section>

          <div
            style={{
              marginTop: 12,
              padding: '8px 10px',
              background: '#11161c',
              borderRadius: 6,
              fontSize: 10,
              color: '#6e7494',
              lineHeight: 1.6,
            }}
          >
            ?ads_debug=1 で起動。spec: docs/measurement-spec.md §8
            <br />
            polling 1s — chatbot widget は user gesture 後にロード。
          </div>
        </div>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: 1,
          color: '#0fc19a',
          textTransform: 'uppercase',
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div>{children}</div>
    </div>
  )
}

function Row({
  k,
  v,
  highlight = false,
  warn = false,
}: {
  k: string
  v: string
  highlight?: boolean
  warn?: boolean
}) {
  const valColor = warn ? '#ff6b6b' : highlight ? '#a4ecc0' : '#9aa5b3'
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '160px 1fr 24px',
        gap: 6,
        alignItems: 'baseline',
        padding: '2px 0',
        borderBottom: '1px dashed #1a2028',
      }}
    >
      <div style={{ color: '#7f8c9c' }}>{k}</div>
      <div
        style={{
          color: valColor,
          wordBreak: 'break-all',
          fontFamily: 'inherit',
        }}
      >
        {v}
      </div>
      <button
        onClick={() => copyToClipboard(v)}
        title="copy"
        style={{
          background: 'transparent',
          border: '1px solid #2a3340',
          color: '#7f8c9c',
          borderRadius: 4,
          cursor: 'pointer',
          padding: '0 4px',
          fontSize: 10,
          height: 18,
        }}
      >
        ⧉
      </button>
    </div>
  )
}

const btn: React.CSSProperties = {
  background: '#1a2028',
  color: '#e4eaef',
  border: '1px solid #2a3340',
  borderRadius: 6,
  padding: '6px 8px',
  fontSize: 11,
  cursor: 'pointer',
  textAlign: 'left',
  fontFamily: 'inherit',
}
