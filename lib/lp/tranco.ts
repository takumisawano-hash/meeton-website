const ENDPOINT = 'https://tranco-list.eu/api/ranks/domain'

type TrancoResponse = {
  ranks?: Array<{ rank?: number; date?: string }>
}

export async function getTrancoRank(domain: string, timeoutMs = 4500): Promise<number | null> {
  if (!domain) return null
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(`${ENDPOINT}/${encodeURIComponent(domain)}`, {
      signal: ctrl.signal,
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = (await res.json()) as TrancoResponse
    const hit = (data.ranks || []).find(r => typeof r.rank === 'number')
    return hit?.rank ?? null
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

export function rankToMonthlyVisits(rank: number): number {
  if (rank <= 0) return 0
  const raw = Math.pow(10, 8 - Math.log10(rank) * 0.7)
  const bucketed = Math.max(1000, Math.round(raw / 1000) * 1000)
  return bucketed
}
