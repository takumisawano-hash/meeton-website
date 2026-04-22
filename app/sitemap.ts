import { MetadataRoute } from 'next'
import { getAllPosts, getCategoriesWithCounts, getTagsWithCounts } from '@/app/lib/notion'
import { getAllCaseStudies } from '@/app/lib/case-studies'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dynameet.ai'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/talent/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/features/ai-chat/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/ai-email/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/meetings/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/offers/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

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

  let categoryPages: MetadataRoute.Sitemap = []
  let tagPages: MetadataRoute.Sitemap = []

  try {
    const [cats, tags] = await Promise.all([
      getCategoriesWithCounts(3),
      getTagsWithCounts(5),
    ])
    categoryPages = cats.map((c) => ({
      url: `${baseUrl}/blog/category/${c.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
    tagPages = tags.map((t) => ({
      url: `${baseUrl}/blog/tag/${t.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))
  } catch {
    // Notion 未接続時は空で返す
  }

  return [...staticPages, ...blogPosts, ...caseStudies, ...categoryPages, ...tagPages]
}
