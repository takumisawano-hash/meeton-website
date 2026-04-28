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
  const fallbacks: string[] = []
  let primary = ''
  if (LOGODEV_TOKEN) {
    primary = `https://img.logo.dev/${domain}?token=${LOGODEV_TOKEN}&size=200&format=png`
  } else if (BRANDFETCH_TOKEN) {
    primary = `https://cdn.brandfetch.io/${domain}/w/200/h/200?c=${BRANDFETCH_TOKEN}`
  } else {
    primary = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
  }
  if (LOGODEV_TOKEN || BRANDFETCH_TOKEN) {
    fallbacks.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`)
  }
  fallbacks.push(`https://${domain}/favicon.ico`)
  return { domain, primary, fallbacks }
}
