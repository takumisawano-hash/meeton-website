import { MetadataRoute } from 'next'
import { getAllPosts } from '@/app/lib/notion'
import { getAllCaseStudies } from '@/app/lib/case-studies'
import { integrations } from '@/lib/integrations-data'
import { getUpcomingWebinars } from '@/app/lib/webinars-schedule'
import { allCompareSlugs, alternativeSlugs } from '@/app/lib/compare-data'
import { allTermSlugs } from '@/app/lib/glossary-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dynameet.ai'

  // Stable lastmod for static/data-driven pages. Using new Date() here made
  // EVERY url report lastmod = the moment Google fetched the sitemap, which
  // teaches Google the signal is noise and it stops trusting lastmod (incl.
  // the accurate per-post blog/cases dates below). Bump this when static
  // pages get a material content change. Blog/cases keep their real dates.
  const now = new Date('2026-06-19T00:00:00Z')

  // Static pages. /features/offers/ removed — it 301-redirects to /.
  // /talent/ removed — intentionally hidden from Nav.
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog/`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/cases/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    // Solutions (役割別) + use-cases (瞬間別) + enterprise — MOFU/trust.
    { url: `${baseUrl}/solutions/cmo/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/solutions/cro/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/solutions/sdr/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/solutions/ceo/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/use-cases/pre-inquiry/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/use-cases/post-download/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/use-cases/revisit/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/use-cases/nurture/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/enterprise/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    // 2026-05-23 ads relaunch: Phase 1 paid-traffic LPs
    { url: `${baseUrl}/solutions/crm-to-meeting/`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/solutions/lead-to-meeting/`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    // v2 product LPs (money pages / pillars) — highest priority after home.
    { url: `${baseUrl}/capture/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/calendar/`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/chat/`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/library/`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/email/`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    // EN product LPs (/en/<slug>/) — bilingual twins of the JA money pages.
    { url: `${baseUrl}/en/calendar/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/en/chat/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/en/library/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/en/email/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/pricing/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tools/roi/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/integrations/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/ja/integrations/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    // NOTE: old /for/* persona URLs were REMOVED from the sitemap — they
    // 308-redirect to /solutions/* (already listed above), and a sitemap must
    // contain only canonical 200 URLs. The redirects stay live in next.config.
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
    // Category-comparison LPs (real static pages under app/compare/).
    { url: `${baseUrl}/compare/chatbot-vs-ai-sdr/`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/compare/ma-vs-ai-sdr/`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/compare/scheduling-vs-ai-sdr/`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    // Pillar pages — SEO hub-and-spoke. Consolidate authority for
    // head-term queries ("B2B リードジェネレーション", "クッキーレス マーケティング")
    // and internal-link to 20+ cluster blog posts each.
    { url: `${baseUrl}/pillar/lead-generation/`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/pillar/cookieless-marketing/`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    // 2026-05-19: /roi-simulator/ 撤去 → 301 to /webinar/。商談化文脈に合わず学習動線をウェビナーに統合。
    // Webinar series — index + per-webinar registration LPs.
    // /webinar/thanks/ is intentionally excluded (noindex).
    { url: `${baseUrl}/webinar/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/careers/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/security/`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/security-policy/`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/privacy-policy/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Upcoming webinar registration LPs. We only list upcoming events
  // (past webinars stay in the index page's On-Demand library but don't
  // need their own sitemap entry — they cease to be transactional).
  const webinarPages: MetadataRoute.Sitemap = getUpcomingWebinars().map((w) => ({
    url: `${baseUrl}/webinar/${w.slug}/`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.85,
  }))

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
    // Exclude noindex posts — listing a noindex URL in the sitemap is a
    // self-contradictory signal (Notion noIndex flag → page emits robots
    // noindex, yet the sitemap says "index me").
    blogPosts = posts.filter((post) => !post.noIndex).map((post) => ({
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
    caseStudies = items.filter((c) => !c.noIndex).map((c) => ({
      url: `${baseUrl}/cases/${c.slug}/`,
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

  // v2 compare/alternatives BOFU pages (high commercial intent).
  const comparePages: MetadataRoute.Sitemap = allCompareSlugs().map((slug) => ({
    url: `${baseUrl}/compare/${slug}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))
  const alternativePages: MetadataRoute.Sitemap = alternativeSlugs().map((slug) => ({
    url: `${baseUrl}/alternatives/${slug}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Glossary (用語集) — definition pages for AEO.
  const glossaryPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/glossary/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    ...allTermSlugs().map((s) => ({
      url: `${baseUrl}/glossary/${s}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  return [
    ...staticPages,
    ...comparePages,
    ...alternativePages,
    ...glossaryPages,
    ...webinarPages,
    ...integrationPages,
    ...blogPosts,
    ...caseStudies,
  ]
}
