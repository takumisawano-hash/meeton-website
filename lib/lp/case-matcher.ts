import { getAllCaseStudies, type CaseStudy } from '../../app/lib/case-studies'

export type CaseStudyHit = {
  slug: string
  title: string
  company: string
  industry: string
  employeeSize: string | null
  heroMetric: string
  heroMetricLabel: string
  description: string
  url: string
  matchScore: number
  matchReason: string[]
}

const EMPLOYEE_BAND_ORDER = ['1-9', '10-29', '30-49', '50-99', '100-299', '300-499', '500-999', '1000-2999', '3000+']

function bandIndex(band?: string | null): number {
  if (!band) return -1
  const norm = band.replace(/\s/g, '')
  const idx = EMPLOYEE_BAND_ORDER.findIndex(b => norm.startsWith(b))
  return idx
}

function bandDistance(a?: string | null, b?: string | null): number {
  const ai = bandIndex(a)
  const bi = bandIndex(b)
  if (ai < 0 || bi < 0) return 99
  return Math.abs(ai - bi)
}

function industryMatch(target?: string, candidate?: string): number {
  if (!target || !candidate) return 0
  const t = target.toLowerCase()
  const c = candidate.toLowerCase()
  if (t === c) return 3
  if (t.includes(c) || c.includes(t)) return 2
  const buckets: string[][] = [
    ['金融', '銀行', '保険', '証券'],
    ['物流', '運送', '輸送', '倉庫', '海運'],
    ['製造', 'メーカー', '工業'],
    ['it', 'ソフト', 'システム', 'saas', 'テック'],
    ['商社', '貿易'],
    ['小売', '販売', '流通', '百貨'],
    ['建設', '建築'],
    ['医療', '病院', 'ヘルスケア'],
    ['不動産', '住宅'],
    ['教育', '学習', 'スクール'],
    ['コンサル', 'アドバイザリ'],
    ['広告', 'マーケティング'],
    ['エネルギー', '電力', 'ガス'],
    ['食品', '飲料', '外食'],
  ]
  for (const bucket of buckets) {
    if (bucket.some(k => t.includes(k)) && bucket.some(k => c.includes(k))) return 2
  }
  return 0
}

function rankCases(items: CaseStudy[], target: { industry?: string; employeeSize?: string | null }): CaseStudyHit[] {
  const ranked = items
    .filter(c => !c.noIndex)
    .map(c => {
      const reasons: string[] = []
      let score = 0
      const indScore = industryMatch(target.industry, c.industry)
      if (indScore > 0) {
        score += indScore * 10
        reasons.push(`業種一致 (${c.industry})`)
      }
      const dist = bandDistance(target.employeeSize, c.employeeSize)
      if (dist === 0) {
        score += 8
        reasons.push(`規模一致 (${c.employeeSize})`)
      } else if (dist === 1) {
        score += 5
        reasons.push(`規模近傍 (${c.employeeSize})`)
      } else if (dist === 2) {
        score += 2
      }
      score += Math.max(0, 5 - (c.order || 0))
      return {
        slug: c.slug,
        title: c.title,
        company: c.company,
        industry: c.industry,
        employeeSize: c.employeeSize,
        heroMetric: c.heroMetric,
        heroMetricLabel: c.heroMetricLabel,
        description: c.description,
        url: `/case-studies/${c.slug}/`,
        matchScore: score,
        matchReason: reasons,
      } as CaseStudyHit
    })
    .sort((a, b) => b.matchScore - a.matchScore)
  return ranked
}

export async function matchCaseStudies(target: {
  industry?: string
  employeeSize?: string | null
  limit?: number
}): Promise<CaseStudyHit[]> {
  try {
    const all = await getAllCaseStudies()
    if (!all.length) return []
    const ranked = rankCases(all, target)
    return ranked.slice(0, target.limit ?? 3)
  } catch {
    return []
  }
}
