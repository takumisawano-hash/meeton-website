const LOGODEV_TOKEN = process.env.LOGODEV_TOKEN || ''
const BRANDFETCH_TOKEN = process.env.BRANDFETCH_CLIENT_ID || ''

function pickDomain(opts: { domain?: string; companyUrl?: string; email?: string }): string | undefined {
  if (opts.domain) return opts.domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  if (opts.companyUrl) {
    try {
      return new URL(opts.companyUrl.startsWith('http') ? opts.companyUrl : `https://${opts.companyUrl}`).host
    } catch {
      return undefined
    }
  }
  if (opts.email && opts.email.includes('@')) {
    const part = opts.email.split('@')[1]
    if (part && part.includes('.') && !/(gmail|yahoo|outlook|hotmail|icloud|live|aol)\./i.test(part)) {
      return part
    }
  }
  return undefined
}

export type LogoCandidate = {
  domain: string
  primary: string
  fallbacks: string[]
}

export function buildLogoCandidate(opts: { domain?: string; companyUrl?: string; email?: string }): LogoCandidate | null {
  const domain = pickDomain(opts)
  if (!domain) return null

  // Fallback chain (in order):
  //   1. Primary: best-quality source we can reach (logo.dev > brandfetch > duckduckgo)
  //   2. duckduckgo (if not already primary) — free, no key, decent quality
  //   3. google s2 favicons — universal fallback, low quality but reliable
  //   4. site's own /favicon.ico
  // The component renders an initials circle if every URL fails.
  const ddg = `https://icons.duckduckgo.com/ip3/${domain}.ico`
  const google = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
  const ownFavicon = `https://${domain}/favicon.ico`

  let primary: string
  const fallbacks: string[] = []
  if (LOGODEV_TOKEN) {
    primary = `https://img.logo.dev/${domain}?token=${LOGODEV_TOKEN}&size=200&format=png`
    fallbacks.push(ddg, google, ownFavicon)
  } else if (BRANDFETCH_TOKEN) {
    primary = `https://cdn.brandfetch.io/${domain}/w/200/h/200?c=${BRANDFETCH_TOKEN}`
    fallbacks.push(ddg, google, ownFavicon)
  } else {
    // No token — DuckDuckGo gives much better quality than Google s2 for most domains
    primary = ddg
    fallbacks.push(google, ownFavicon)
  }
  return { domain, primary, fallbacks }
}
