const ENDPOINT = 'https://data.similarweb.com/api/v1/data'
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

type SimilarWebRaw = {
  Engagments?: { Visits?: string; BounceRate?: string; PagePerVisit?: string; TimeOnSite?: string; Month?: string; Year?: string }
  EstimatedMonthlyVisits?: Record<string, number>
  GlobalRank?: { Rank?: number }
  CountryRank?: { Country?: number; CountryCode?: string; Rank?: number }
  Category?: string
  Description?: string
  Title?: string
  IsSmall?: boolean
  TopCountryShares?: Array<{ CountryCode?: string; Value?: number }>
  TrafficSources?: { Direct?: number; Search?: number; Social?: number; Referrals?: number; Mail?: number; 'Paid Referrals'?: number }
  TopKeywords?: Array<{ Name?: string; Volume?: number; Cpc?: number | null; EstimatedValue?: number }>
}

export type SimilarWebFreeResult = {
  domain: string
  monthlyVisits: number
  globalRank?: number
  countryRank?: number
  countryCode?: string
  category?: string
  description?: string
  isSmall?: boolean
  jpShareRatio?: number
  trafficSources?: { direct?: number; search?: number; social?: number; referrals?: number; mail?: number; paid?: number }
  topKeywords?: Array<{ name: string; volume?: number }>
  recentMonths?: Array<{ month: string; visits: number }>
}

export async function fetchSimilarWebFree(domain: string, timeoutMs = 7000): Promise<SimilarWebFreeResult | null> {
  if (!domain) return null
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(`${ENDPOINT}?domain=${encodeURIComponent(domain)}`, {
      signal: ctrl.signal,
      cache: 'no-store',
      headers: { 'User-Agent': UA, Accept: 'application/json' },
    })
    if (!res.ok) return null
    const data = (await res.json()) as SimilarWebRaw
    const visitsStr = data.Engagments?.Visits
    const monthlyVisits = visitsStr ? Math.round(Number(visitsStr)) : 0
    if (!monthlyVisits || Number.isNaN(monthlyVisits)) return null
    const jpShare = data.TopCountryShares?.find(c => c.CountryCode === 'JP')?.Value
    const recent = Object.entries(data.EstimatedMonthlyVisits || {})
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .slice(0, 3)
      .map(([month, visits]) => ({ month, visits }))
    return {
      domain,
      monthlyVisits,
      globalRank: data.GlobalRank?.Rank,
      countryRank: data.CountryRank?.Rank,
      countryCode: data.CountryRank?.CountryCode,
      category: data.Category,
      description: data.Description,
      isSmall: data.IsSmall,
      jpShareRatio: jpShare,
      trafficSources: data.TrafficSources
        ? {
            direct: data.TrafficSources.Direct,
            search: data.TrafficSources.Search,
            social: data.TrafficSources.Social,
            referrals: data.TrafficSources.Referrals,
            mail: data.TrafficSources.Mail,
            paid: data.TrafficSources['Paid Referrals'],
          }
        : undefined,
      topKeywords: (data.TopKeywords || [])
        .filter(k => k.Name)
        .slice(0, 5)
        .map(k => ({ name: k.Name as string, volume: k.Volume })),
      recentMonths: recent.length ? recent : undefined,
    }
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}
