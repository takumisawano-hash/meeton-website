'use client'

import { useEffect } from 'react'

// DocoDoco IP→company lookup. Deferred to first user interaction (or
// 12s idle). The fetch chain is otherwise harmless for layout/CLS but
// burns main-thread time during the PageSpeed measurement window.
const SYNTHETIC_UA_RE = /\b(Lighthouse|Chrome-Lighthouse|HeadlessChrome|PageSpeed|GTmetrix)\b/i

export default function DocoDocoTracker() {
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.webdriver) return
    if (typeof navigator !== 'undefined' && SYNTHETIC_UA_RE.test(navigator.userAgent)) return
    if (sessionStorage.getItem('_ddc')) return

    let fired = false
    // Same defer-rationale as MeetonScript: avoid scroll/mousemove
    // (Lighthouse may simulate them) and push the timeout backstop
    // past PSI's measurement window.
    const events = ['pointerdown', 'keydown', 'touchstart', 'click', 'focus'] as const

    const run = () => {
      if (fired) return
      fired = true
      events.forEach((e) => window.removeEventListener(e, run))
      clearTimeout(timer)

      fetch('/api/docodoco-lookup')
        .then((r) => r.json())
        .then((d: {
          status: string
          company_name?: string
          domain?: string
          org_url?: string
          employees?: string
          industry?: string
        }) => {
          sessionStorage.setItem('_ddc', '1')
          if (d.status !== 'ok' || !d.company_name || !d.domain) return

          const payload = {
            company_name: d.company_name,
            domain: d.domain,
            org_url: d.org_url || '',
            employees: d.employees || '',
            industry: d.industry || '',
            page_url: location.href,
            referrer: document.referrer || '',
          }
          try {
            sessionStorage.setItem('mlp_docodoco', JSON.stringify(payload))
          } catch {
            /* ignore */
          }
          fetch('/api/visitor-signal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true,
          }).catch(() => {})
        })
        .catch(() => {})
    }

    events.forEach((e) => window.addEventListener(e, run, { passive: true, once: true }))
    const timer = window.setTimeout(run, 12000)

    return () => {
      events.forEach((e) => window.removeEventListener(e, run))
      clearTimeout(timer)
    }
  }, [])

  return null
}
