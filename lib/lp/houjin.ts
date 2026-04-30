import type { CompanyProfile } from './types'

const APP_ID = process.env.HOUJIN_BANGOU_APP_ID || ''
const ENDPOINT = 'https://api.houjin-bangou.nta.go.jp/4'

type HoujinNumberHit = {
  corporateNumber: string
  name: string
  prefectureName?: string
  cityName?: string
  postCode?: string
  furigana?: string
  kind?: string
}

const INDUSTRY_HINTS: Array<[RegExp, string]> = [
  [/銀行|証券|保険|金融|信用金庫|信託/, '金融'],
  [/物流|運送|倉庫|フォワーダー|海運|航空運送/, '物流'],
  [/製造|工業|メーカー|電機|機械|部品/, '製造'],
  [/IT|ソフト|システム|テクノロジ|テック/, 'IT'],
  [/商社|貿易/, '商社'],
  [/小売|百貨店|販売|流通/, '小売'],
  [/建設|建築|工務|設備/, '建設'],
  [/医療|病院|クリニック|薬|ヘルスケア/, '医療'],
  [/不動産|住宅/, '不動産'],
  [/教育|学習|スクール|大学|学園/, '教育'],
  [/コンサル|アドバイザリ/, 'コンサル'],
  [/広告|マーケティング|PR/, '広告マーケ'],
  [/エネルギー|電力|ガス|石油|再エネ/, 'エネルギー'],
  [/食品|飲料|レストラン|外食/, '食品'],
]

function inferIndustry(name: string): string | undefined {
  for (const [pat, label] of INDUSTRY_HINTS) {
    if (pat.test(name)) return label
  }
  return undefined
}

export async function lookupHoujin(name: string): Promise<CompanyProfile | null> {
  if (!name) return null
  if (!APP_ID) {
    return {
      name,
      industry: inferIndustry(name),
      source: 'user-input',
      confidence: 'low',
    }
  }
  try {
    const url = `${ENDPOINT}/name?id=${APP_ID}&name=${encodeURIComponent(name)}&type=12&mode=2`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) {
      return { name, source: 'user-input', confidence: 'low', industry: inferIndustry(name) }
    }
    const text = await res.text()
    const lines = text.split('\n').filter(Boolean)
    const first = lines.find(l => l.includes(',')) || ''
    const cols = first.split(',').map(c => c.replace(/^"|"$/g, ''))
    if (cols.length < 5) return { name, source: 'user-input', confidence: 'low', industry: inferIndustry(name) }
    const hit: HoujinNumberHit = {
      corporateNumber: cols[1] || '',
      name: cols[6] || name,
      prefectureName: cols[9] || undefined,
      cityName: cols[10] || undefined,
    }
    return {
      name: hit.name,
      corporateNumber: hit.corporateNumber || undefined,
      prefecture: hit.prefectureName,
      industry: inferIndustry(hit.name),
      source: 'houjin',
      confidence: 'high',
    }
  } catch {
    return { name, source: 'user-input', confidence: 'low', industry: inferIndustry(name) }
  }
}

export async function suggestHoujin(query: string, limit = 5): Promise<Array<{ name: string; corporateNumber: string; prefecture?: string }>> {
  if (!query || !APP_ID) return []
  try {
    const url = `${ENDPOINT}/name?id=${APP_ID}&name=${encodeURIComponent(query)}&type=12&mode=2`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return []
    const text = await res.text()
    const lines = text.split('\n').filter(l => l.includes(',')).slice(0, limit)
    return lines.map(l => {
      const cols = l.split(',').map(c => c.replace(/^"|"$/g, ''))
      return { corporateNumber: cols[1] || '', name: cols[6] || '', prefecture: cols[9] || undefined }
    }).filter(h => h.name)
  } catch {
    return []
  }
}
