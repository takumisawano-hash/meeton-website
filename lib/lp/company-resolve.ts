import { fetchSimilarWebFree, type SimilarWebFreeResult } from './similarweb-free'

export type ResolvedCompany = {
  domain: string
  name: string
  source: 'similarweb-title' | 'similarweb-sitename' | 'description' | 'domain-prefix' | 'user-input'
  category?: string
  description?: string
  similarweb?: SimilarWebFreeResult
}

const SPLIT_REGEX = /[｜|–—\-：:・/]+/
const PAGE_TERMS_RE = /(コミュニティ|ログイン|資料|料金|事例|機能|について|ニュース|サポート|プラン|お知らせ|活用|使い方|FAQ|ヘルプ|サンクス|ホーム|問い合わせ|新着|セミナー|イベント|採用|キャリア|ブログ|公式|オフィシャル|無料|ダウンロード)/i
const COMPANY_HINT_RE = /(株式会社|有限会社|合同会社|Inc\.?|LLC|Co\.?,?\s*Ltd\.?|GmbH|Corp\.?|Corporation)/i

function scorePart(part: string, domainPrefix: string): number {
  let score = 0
  if (PAGE_TERMS_RE.test(part)) score -= 10
  if (COMPANY_HINT_RE.test(part)) score += 8
  if (part.toLowerCase().includes(domainPrefix)) score += 5
  if (part.length <= 12) score += 3
  else if (part.length <= 20) score += 1
  return score
}

function extractHead(text: string | undefined, fallbackDomain?: string): string | null {
  if (!text) return null
  let cleaned = text.split(/[【「『（(]/)[0]
  cleaned = cleaned.replace(/[】」』）)]/g, '').trim()
  if (!cleaned) cleaned = text
  const parts = cleaned
    .split(SPLIT_REGEX)
    .map(s => s.trim())
    .filter(s => s.length >= 2 && s.length <= 40)
  if (!parts.length) return null
  const domainPrefix = (fallbackDomain || '').split('.')[0].toLowerCase()
  let best: { name: string; score: number } | null = null
  for (const p of parts) {
    if (fallbackDomain && p.toLowerCase() === fallbackDomain.toLowerCase()) continue
    const s = scorePart(p, domainPrefix)
    if (!best || s > best.score) best = { name: p, score: s }
  }
  if (!best) return null
  if (best.score < -5) return null
  return best.name
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
