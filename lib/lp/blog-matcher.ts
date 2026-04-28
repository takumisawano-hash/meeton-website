import { getAllPosts, type BlogPost } from '../../app/lib/notion'

export type BlogHit = {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  url: string
  matchScore: number
}

const KEYWORD_GROUPS: Array<{ keywords: string[]; weight: number; topic: string }> = [
  { keywords: ['事例', 'case', '導入'], weight: 4, topic: 'case-study' },
  { keywords: ['料金', '価格', 'pricing', 'コスト', 'roi'], weight: 4, topic: 'pricing' },
  { keywords: ['比較', '違い', 'vs', 'おすすめ'], weight: 4, topic: 'comparison' },
  { keywords: ['ai sdr', 'ai 営業', 'インサイドセールス', 'sdr', 'is'], weight: 5, topic: 'ai-sdr' },
  { keywords: ['チャットボット', 'web接客', 'ウェブ接客', 'chat'], weight: 5, topic: 'ai-chat' },
  { keywords: ['メール', 'email', 'メルマガ'], weight: 5, topic: 'ai-email' },
  { keywords: ['カレンダー', '日程調整', '商談予約', 'calendar'], weight: 5, topic: 'ai-calendar' },
  { keywords: ['ma ', 'マーケティングオートメーション', 'リードジェネ'], weight: 4, topic: 'ma' },
  { keywords: ['セキュリティ', 'security', 'soc2', 'iso'], weight: 5, topic: 'security' },
  { keywords: ['採用', '人材', 'hr', '採用ブランディング'], weight: 4, topic: 'hr' },
  { keywords: ['広告', 'google ads', '広告運用', '広告 cv'], weight: 4, topic: 'ads' },
]

const INDUSTRY_HINTS: Array<{ pat: RegExp; topics: string[] }> = [
  { pat: /(金融|銀行|保険|証券)/, topics: ['security', 'comparison'] },
  { pat: /(物流|運送|倉庫)/, topics: ['ai-sdr', 'case-study'] },
  { pat: /(製造|メーカー)/, topics: ['ai-sdr', 'case-study', 'ai-email'] },
  { pat: /(it|ソフト|saas|テック)/i, topics: ['comparison', 'pricing', 'ai-sdr'] },
  { pat: /(コンサル)/, topics: ['ai-sdr', 'ai-email'] },
  { pat: /(教育|学習|スクール)/, topics: ['ai-chat', 'case-study'] },
  { pat: /(医療|ヘルスケア)/, topics: ['security', 'ai-chat'] },
  { pat: /(広告|マーケティング)/, topics: ['ads', 'comparison', 'ma'] },
]

function topicsFromContext(args: {
  industry?: string
  searchKeyword?: string
  isPricingViewed?: boolean
  isCaseStudyViewed?: boolean
  topInterest?: string
  funnelStage?: string
}): Set<string> {
  const topics = new Set<string>()
  if (args.isPricingViewed) topics.add('pricing')
  if (args.isCaseStudyViewed) topics.add('case-study')
  if (args.topInterest) topics.add(args.topInterest)
  if (args.searchKeyword) {
    const lower = args.searchKeyword.toLowerCase()
    for (const grp of KEYWORD_GROUPS) {
      if (grp.keywords.some(k => lower.includes(k))) topics.add(grp.topic)
    }
  }
  if (args.industry) {
    for (const ih of INDUSTRY_HINTS) {
      if (ih.pat.test(args.industry)) ih.topics.forEach(t => topics.add(t))
    }
  }
  if (args.funnelStage === 'sql' || args.funnelStage === 'opportunity') topics.add('comparison')
  if (args.funnelStage === 'mql') topics.add('case-study')
  return topics
}

function scorePost(post: BlogPost, topics: Set<string>): number {
  let score = 0
  const blob = `${post.title} ${post.description} ${(post.tags || []).join(' ')} ${post.category} ${post.focusKeyword || ''}`.toLowerCase()
  for (const topic of topics) {
    const grp = KEYWORD_GROUPS.find(g => g.topic === topic)
    if (!grp) continue
    if (grp.keywords.some(k => blob.includes(k))) score += grp.weight
  }
  if (post.views) score += Math.min(3, Math.log10(Math.max(1, post.views)))
  if (post.modifiedDate) {
    const days = (Date.now() - new Date(post.modifiedDate).getTime()) / 86400000
    if (days < 90) score += 2
    else if (days < 365) score += 1
  }
  return score
}

export async function matchBlogs(args: {
  industry?: string
  searchKeyword?: string
  isPricingViewed?: boolean
  isCaseStudyViewed?: boolean
  topInterest?: string
  funnelStage?: string
  limit?: number
}): Promise<BlogHit[]> {
  try {
    const all = await getAllPosts()
    if (!all.length) return []
    const topics = topicsFromContext(args)
    if (topics.size === 0) return []
    const ranked = all
      .filter(p => !p.noIndex)
      .map(p => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        category: p.category,
        tags: p.tags || [],
        url: `/blog/${p.slug}/`,
        matchScore: scorePost(p, topics),
      }))
      .filter(h => h.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
    return ranked.slice(0, args.limit ?? 3)
  } catch {
    return []
  }
}
