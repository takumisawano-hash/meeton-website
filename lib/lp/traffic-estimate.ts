const SIMILARWEB_API_KEY = process.env.SIMILARWEB_API_KEY || ''

export type TrafficEstimate = {
  monthlyVisits: number
  source: 'similarweb' | 'industry-employee-bench' | 'fallback'
  confidence: 'high' | 'medium' | 'low'
  details?: {
    rank?: number
    bounceRate?: number
    avgVisitDuration?: number
    pagesPerVisit?: number
  }
}

const INDUSTRY_BASE_VISITS: Record<string, number> = {
  '金融': 80000,
  '物流': 35000,
  '製造': 40000,
  'IT': 60000,
  '商社': 28000,
  '小売': 120000,
  '建設': 18000,
  '医療': 35000,
  '不動産': 70000,
  '教育': 60000,
  'コンサル': 25000,
  '広告マーケ': 40000,
  'エネルギー': 30000,
  '食品': 45000,
  default: 35000,
}

const EMPLOYEE_MULTIPLIER: Record<string, number> = {
  '1-9': 0.15,
  '10-29': 0.3,
  '30-49': 0.5,
  '50-99': 0.8,
  '100-299': 1.2,
  '300-499': 1.7,
  '500-999': 2.4,
  '1000-2999': 3.5,
  '3000+': 5.5,
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

export async function estimateTraffic(opts: {
  domain?: string
  industry?: string
  employees?: string
}): Promise<TrafficEstimate> {
  if (opts.domain) {
    const sw = await fromSimilarWeb(opts.domain)
    if (sw) return sw
  }
  const visits = fromBenchmark(opts.industry, opts.employees)
  return {
    monthlyVisits: visits,
    source: opts.industry || opts.employees ? 'industry-employee-bench' : 'fallback',
    confidence: opts.industry && opts.employees ? 'medium' : 'low',
  }
}
