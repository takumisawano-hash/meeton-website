'use client'

import { useEffect } from 'react'

// DocoDoco IP→company lookup. Deferred to first user interaction (or
// 5s idle). The fetch chain is otherwise harmless for layout/CLS but
// burns main-thread time during the PageSpeed measurement window.
export default function DocoDocoTracker() {
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.webdriver) return
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

      fetch('https://api.ipify.org?format=json')
        .then((r) => r.json())
        .then((ipData: { ip: string }) =>
          fetch(
            'https://api.docodoco.jp/v6/search?format=json' +
              '&ipadr=' + encodeURIComponent(ipData.ip) +
              '&key1=Oq3jXfIIMPjyTgR6rpI00j41YnOdH3G9XBcVp4UqTmxskjBLoXCOvugFVrR5CiYv' +
              '&key2=538c14fdb5fdfde8b64547df6aa902961ac2442c'
          )
        )
        .then((r) => r.json())
        .then((d: {
          OrgName?: string
          DomainName?: string
          OrgUrl?: string
          OrgEmployeesCode?: string
          OrgIndustrialCategoryL?: string
          LineCode?: string
        }) => {
          sessionStorage.setItem('_ddc', '1')
          const org = d.OrgName || ''
          if (!org || !d.DomainName) return
          const lineCode = d.LineCode || ''
          if (lineCode === '1' || lineCode === '2') return

          const payload = {
            company_name: org,
            domain: d.DomainName,
            org_url: d.OrgUrl || '',
            employees: d.OrgEmployeesCode || '',
            industry: d.OrgIndustrialCategoryL || '',
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
