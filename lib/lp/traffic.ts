import type { TrafficContext, IdentifyRequest } from './types'

const COMPARISON_HOSTS = ['boxil.jp', 'itreview.jp', 'kigyolog.com', 'startuplog.com', 'g2.com', 'capterra.com']
const SNS_HOSTS = ['twitter.com', 'x.com', 't.co', 'linkedin.com', 'lnkd.in', 'facebook.com', 'note.com']
const SEARCH_HOSTS = ['google.', 'bing.', 'yahoo.co.jp', 'duckduckgo.', 'baidu.']

function hostOf(url?: string): string | undefined {
  if (!url) return undefined
  try {
    return new URL(url).host.toLowerCase()
  } catch {
    return undefined
  }
}

export function deriveTraffic(req: IdentifyRequest): TrafficContext {
  const utm = req.utm || {}
  const ref = hostOf(req.referrer)

  if (req.gclid || utm.source === 'google' && utm.medium === 'cpc') {
    return {
      channel: 'paid_search',
      source: 'google',
      medium: 'cpc',
      campaign: utm.campaign,
      isAdClick: true,
      adNetwork: 'google',
    }
  }
  if (req.yclid) {
    return { channel: 'paid_search', source: 'yahoo', medium: 'cpc', campaign: utm.campaign, isAdClick: true, adNetwork: 'yahoo' }
  }
  if (req.msclkid) {
    return { channel: 'paid_search', source: 'bing', medium: 'cpc', campaign: utm.campaign, isAdClick: true, adNetwork: 'microsoft' }
  }
  if (utm.source === 'linkedin' || (utm.source && utm.source.includes('linkedin'))) {
    return { channel: 'paid_social', source: 'linkedin', medium: utm.medium, campaign: utm.campaign, isAdClick: utm.medium === 'cpc' || utm.medium === 'paid', adNetwork: 'linkedin' }
  }
  if (utm.source === 'facebook' || utm.source === 'meta' || utm.source === 'instagram') {
    return { channel: 'paid_social', source: utm.source, medium: utm.medium, campaign: utm.campaign, isAdClick: utm.medium === 'cpc' || utm.medium === 'paid', adNetwork: 'meta' }
  }
  if (utm.medium === 'email' || utm.source === 'instantly') {
    return { channel: 'email', source: utm.source, medium: 'email', campaign: utm.campaign, isAdClick: false }
  }
  if (ref && COMPARISON_HOSTS.some(h => ref.includes(h))) {
    return { channel: 'comparison_site', source: ref, referrerHost: ref, isAdClick: false }
  }
  if (ref && SNS_HOSTS.some(h => ref.includes(h))) {
    return { channel: 'sns', source: ref, referrerHost: ref, isAdClick: false }
  }
  if (ref && SEARCH_HOSTS.some(h => ref.includes(h))) {
    return { channel: 'organic', source: ref, referrerHost: ref, isAdClick: false }
  }
  if (!ref && !utm.source) {
    return { channel: 'direct', isAdClick: false }
  }
  if (ref) {
    return { channel: 'referral', source: ref, referrerHost: ref, isAdClick: false }
  }
  return { channel: 'unknown', isAdClick: false, source: utm.source, medium: utm.medium, campaign: utm.campaign }
}

const SEARCH_INTENT_HINTS: Array<[RegExp, string]> = [
  [/(比較|vs |おすすめ|ランキング)/i, 'comparison'],
  [/(料金|価格|費用|プラン|pricing)/i, 'pricing'],
  [/(導入事例|事例|case)/i, 'case-study'],
  [/(セキュリティ|security|soc2|iso)/i, 'security'],
  [/(AI SDR|AI SEM|AI 営業)/i, 'category-ai-sales'],
  [/(インサイドセールス|is)/i, 'category-is'],
  [/(商談|アポ|デモ)/i, 'category-meeting'],
  [/(ウェブ接客|チャットボット|chatbot)/i, 'category-chat'],
]

export function inferSearchIntent(keyword?: string): string | undefined {
  if (!keyword) return undefined
  for (const [pat, label] of SEARCH_INTENT_HINTS) {
    if (pat.test(keyword)) return label
  }
  return undefined
}
