import { MetadataRoute } from 'next'
import { getAllPosts } from '@/app/lib/notion'

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
  ]

  let blogPosts: MetadataRoute.Sitemap = []

  try {
    const posts = await getAllPosts()
    blogPosts = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: post.publishedDate ? new Date(post.publishedDate) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch {
    // Notion API接続前やエラー時は空配列
  }

  return [...staticPages, ...blogPosts]
}
