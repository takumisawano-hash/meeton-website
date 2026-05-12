import { MetadataRoute } from 'next'
import { getAllPosts } from '@/app/lib/notion'
import { getAllCaseStudies } from '@/app/lib/case-studies'
import { integrations } from '@/lib/integrations-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dynameet.ai'

  const now = new Date()

  // Static pages. /features/offers/ removed — it 301-redirects to /.
  // /talent/ removed — intentionally hidden from Nav.
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog/`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/case-studies/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/features/ai-chat/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/features/ai-email/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/features/meetings/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/features/ai-library/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/integrations/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/ja/integrations/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    // Persona LPs — high-intent role-targeted landing pages.
    { url: `${baseUrl}/for/cmo/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/for/cro/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/for/inside-sales/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/for/marketing-manager/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // Industry use-case LPs — vertical-specific high-intent landing pages.
    { url: `${baseUrl}/use-cases/saas/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/use-cases/manufacturing/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/use-cases/professional-services/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/use-cases/fintech/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // Competitor comparison LPs — highest commercial-intent traffic
    // (buyers in final evaluation phase).
    { url: `${baseUrl}/compare/meeton-vs-sinclo/`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/compare/meeton-vs-karte/`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/compare/meeton-vs-chatplus/`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/compare/meeton-vs-anybot/`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    // Pillar pages — SEO hub-and-spoke. Consolidate authority for
    // head-term queries ("B2B リードジェネレーション", "クッキーレス マーケティング")
    // and internal-link to 20+ cluster blog posts each.
    { url: `${baseUrl}/pillar/lead-generation/`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/pillar/cookieless-marketing/`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/roi-simulator/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/careers/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/security/`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/security-policy/`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/privacy-policy/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Integration detail pages — high-quality, deep content per partner.
  // /integrations/slack gets 308s dwell time (10x site average). Indexing
  // these is high-leverage.
  const integrationPages: MetadataRoute.Sitemap = integrations.flatMap((i) => [
    {
      url: `${baseUrl}/integrations/${i.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ja/integrations/${i.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ])

  let blogPosts: MetadataRoute.Sitemap = []

  try {
    const posts = await getAllPosts()
    blogPosts = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: post.modifiedDate
        ? new Date(post.modifiedDate)
        : post.publishedDate
          ? new Date(post.publishedDate)
          : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch {
    // Notion API接続前やエラー時は空配列
  }

  let caseStudies: MetadataRoute.Sitemap = []

  try {
    const items = await getAllCaseStudies()
    caseStudies = items.map((c) => ({
      url: `${baseUrl}/case-studies/${c.slug}/`,
      lastModified: c.modifiedDate
        ? new Date(c.modifiedDate)
        : c.publishedDate
          ? new Date(c.publishedDate)
          : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch {
    // Notion 未接続時は空で返す
  }

  return [...staticPages, ...integrationPages, ...blogPosts, ...caseStudies]
}
