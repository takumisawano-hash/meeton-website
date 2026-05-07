import type { Metadata } from 'next'
import { getAllPosts } from '@/app/lib/notion'
import BlogListJsonLd from '@/app/components/BlogListJsonLd'
import BlogPageClient from '@/app/components/BlogPageClient'

export const revalidate = 3600 // 1時間ごとに再検証

export const metadata: Metadata = {
  title: 'AI営業ブログ｜AI SDR・インサイドセールス・商談化ノウハウ',
  description: 'AI SDR・インサイドセールス・商談化率改善・ABM運用のベストプラクティスを毎日配信。B2B営業の最前線を実例と数字で解説する160本超の記事。',
  alternates: {
    canonical: '/blog/',
    languages: {
      'ja-JP': '/blog/',
    },
  },
  openGraph: {
    title: 'AI営業ブログ｜AI SDR・インサイドセールス・商談化ノウハウ',
    description: 'AI SDR・インサイドセールス・商談化率改善・ABM運用のベストプラクティスを毎日配信。B2B営業の最前線を実例と数字で解説する160本超の記事。',
    url: 'https://dynameet.ai/blog/',
    type: 'website',
    siteName: 'Meeton ai',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI営業ブログ｜AI SDR・商談化ノウハウ',
    description: 'AI SDR・インサイドセールス・商談化率改善のベストプラクティスを毎日配信。160本超の記事。',
    site: '@meetonai',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  // Extract unique categories
  const categories = Array.from(new Set(posts.map(p => p.category).filter(Boolean)))

  return (
    <>
      <BlogListJsonLd posts={posts} />
      <BlogPageClient posts={posts} categories={categories} />
    </>
  )
}
