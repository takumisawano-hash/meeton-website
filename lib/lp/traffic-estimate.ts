import { getTrancoRank, rankToMonthlyVisits } from './tranco'
import { fetchSimilarWebFree, type SimilarWebFreeResult } from './similarweb-free'

const SIMILARWEB_API_KEY = process.env.SIMILARWEB_API_KEY || ''

export type TrafficEstimate = {
  monthlyVisits: number
  source: 'user-input' | 'similarweb-free' | 'similarweb' | 'tranco-rank' | 'industry-employee-bench' | 'fallback'
  confidence: 'high' | 'medium' | 'low'
  details?: {
    rank?: number
    countryRank?: number
    bounceRate?: number
    avgVisitDuration?: number
    pagesPerVisit?: number
    category?: string
    jpShareRatio?: number
    trafficSources?: SimilarWebFreeResult['trafficSources']
    topKeywords?: SimilarWebFreeResult['topKeywords']
    recentMonths?: SimilarWebFreeResult['recentMonths']
  }
}

const INDUSTRY_BASE_VISITS: Record<string, number> = {
  '金融': 35000,
  '物流': 14000,
  '製造': 16000,
  'IT': 22000,
  '商社': 11000,
  '小売': 50000,
  '建設': 7000,
  '医療': 14000,
  '不動産': 28000,
  '教育': 24000,
  'コンサル': 10000,
  '広告マーケ': 16000,
  'エネルギー': 12000,
  '食品': 18000,
  default: 14000,
}

const EMPLOYEE_MULTIPLIER: Record<string, number> = {
  '1-9': 0.1,
  '10-29': 0.2,
  '30-49': 0.35,
  '50-99': 0.5,
  '100-299': 0.8,
  '300-499': 1.2,
  '500-999': 1.7,
  '1000-2999': 2.5,
  '3000+': 4.0,
}

function fromBenchmark(industry?: string, employees?: string): number {
  const base = INDUSTRY_BASE_VISITS[industry || 'default'] || INDUSTRY_BASE_VISITS.default
  const mult = EMPLOYEE_MULTIPLIER[employees || ''] ?? 1.0
  return Math.round(base * mult)
}

async function fromSimilarWeb(domain: string): Promise<TrafficEstimate | null> {
  if (!SIMILARWEB_API_KEY) return null
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 6000)
    const url = `https://api.similarweb.com/v1/website/${encodeURIComponent(domain)}/total-traffic-and-engagement/visits?api_key=${SIMILARWEB_API_KEY}&start_date=2025-01&end_date=2025-12&granularity=monthly&main_domain_only=false&format=json`
    const res = await fetch(url, { signal: ctrl.signal, cache: 'no-store' })
    clearTimeout(timer)
    if (!res.ok) return null
    const data = (await res.json()) as { visits?: Array<{ date?: string; visits?: number }> }
    const recent = (data.visits || []).filter(v => typeof v.visits === 'number').slice(-3)
    if (!recent.length) return null
    const avg = Math.round(recent.reduce((s, v) => s + (v.visits || 0), 0) / recent.length)
    return { monthlyVisits: avg, source: 'similarweb', confidence: 'high' }
  } catch {
    return null
  }
}

async function fromSimilarWebFreeSrc(domain: string): Promise<TrafficEstimate | null> {
  const sw = await fetchSimilarWebFree(domain)
  if (!sw) return null
  return {
    monthlyVisits: sw.monthlyVisits,
    source: 'similarweb-free',
    confidence: 'high',
    details: {
      rank: sw.globalRank,
      countryRank: sw.countryRank,
      category: sw.category,
      jpShareRatio: sw.jpShareRatio,
      trafficSources: sw.trafficSources,
      topKeywords: sw.topKeywords,
      recentMonths: sw.recentMonths,
    },
  }
}

async function fromTranco(domain: string): Promise<TrafficEstimate | null> {
  const rank = await getTrancoRank(domain)
  if (!rank) return null
  return {
    monthlyVisits: rankToMonthlyVisits(rank),
    source: 'tranco-rank',
    confidence: 'medium',
    details: { rank },
  }
}

export async function estimateTraffic(opts: {
  domain?: string
  industry?: string
  employees?: string
  userMonthlyVisits?: number
}): Promise<TrafficEstimate> {
  if (opts.userMonthlyVisits && opts.userMonthlyVisits > 0) {
    return { monthlyVisits: opts.userMonthlyVisits, source: 'user-input', confidence: 'high' }
  }
  if (opts.domain) {
    const swFree = await fromSimilarWebFreeSrc(opts.domain)
    if (swFree) return swFree
    const sw = await fromSimilarWeb(opts.domain)
    if (sw) return sw
    const tr = await fromTranco(opts.domain)
    if (tr) return tr
  }
  const visits = fromBenchmark(opts.industry, opts.employees)
  return {
    monthlyVisits: visits,
    source: opts.industry || opts.employees ? 'industry-employee-bench' : 'fallback',
    confidence: opts.industry && opts.employees ? 'medium' : 'low',
  }
}
