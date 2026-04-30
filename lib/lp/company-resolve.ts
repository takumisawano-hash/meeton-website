import { fetchSimilarWebFree, type SimilarWebFreeResult } from './similarweb-free'

export type ResolvedCompany = {
  domain: string
  name: string
  source: 'similarweb-title' | 'similarweb-sitename' | 'description' | 'domain-prefix' | 'user-input'
  category?: string
  description?: string
  similarweb?: SimilarWebFreeResult
}

const SEPARATORS = ['｜', '|', '–', '—', '-', '：', ':', '・', '/']

function extractHead(text: string | undefined, fallbackDomain?: string): string | null {
  if (!text) return null
  let head = text.trim()
  for (const sep of SEPARATORS) {
    const idx = head.indexOf(sep)
    if (idx > 0) {
      head = head.slice(0, idx).trim()
      break
    }
  }
  if (!head) return null
  if (fallbackDomain && head.toLowerCase() === fallbackDomain.toLowerCase()) return null
  if (head.length < 2 || head.length > 50) return null
  return head
}

function extractFromDescription(description: string | undefined): string | null {
  if (!description) return null
  const m = description.match(/^([぀-ヿ一-龯A-Za-z0-9・()株式会社\s]{2,40}?)(?:は|が|の)/)
  return m ? m[1].trim() : null
}

function nameFromDomainPrefix(domain: string): string {
  const prefix = domain.split('.')[0]
  return prefix.charAt(0).toUpperCase() + prefix.slice(1)
}

export function normalizeUrlToDomain(input: string): string | null {
  if (!input) return null
  const trimmed = input.trim().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '')
  if (!trimmed.includes('.')) return null
  return trimmed.toLowerCase()
}

export async function resolveCompany(opts: {
  companyUrl: string
  userCompanyName?: string
}): Promise<ResolvedCompany | null> {
  const domain = normalizeUrlToDomain(opts.companyUrl)
  if (!domain) return null
  const sw = await fetchSimilarWebFree(domain)

  if (opts.userCompanyName && opts.userCompanyName.trim()) {
    return {
      domain,
      name: opts.userCompanyName.trim(),
      source: 'user-input',
      category: sw?.category,
      description: sw?.description,
      similarweb: sw || undefined,
    }
  }

  const fromTitle = extractHead(sw?.title, domain)
  if (fromTitle) {
    return { domain, name: fromTitle, source: 'similarweb-title', category: sw?.category, description: sw?.description, similarweb: sw || undefined }
  }
  const fromSite = extractHead(sw?.siteName, domain)
  if (fromSite) {
    return { domain, name: fromSite, source: 'similarweb-sitename', category: sw?.category, description: sw?.description, similarweb: sw || undefined }
  }
  const fromDesc = extractFromDescription(sw?.description)
  if (fromDesc) {
    return { domain, name: fromDesc, source: 'description', category: sw?.category, description: sw?.description, similarweb: sw || undefined }
  }
  return {
    domain,
    name: nameFromDomainPrefix(domain),
    source: 'domain-prefix',
    category: sw?.category,
    description: sw?.description,
    similarweb: sw || undefined,
  }
}
