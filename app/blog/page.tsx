import type { Metadata } from 'next'
import { getAllPosts } from '@/app/lib/notion'
import BlogListJsonLd from '@/app/components/BlogListJsonLd'
import BlogPageClient from '@/app/components/BlogPageClient'

export const revalidate = 3600 // 1時間ごとに再検証

export const metadata: Metadata = {
  title: 'ブログ',
  description: 'Meeton aiの最新情報、AI営業に関するノウハウ、インサイドセールスのベストプラクティス、業界トレンドをお届けします。B2B営業・マーケティングの効率化に役立つ情報が満載です。',
  alternates: {
    canonical: '/blog/',
    languages: {
      'ja-JP': '/blog/',
    },
  },
  openGraph: {
    title: 'ブログ｜Meeton ai',
    description: 'Meeton aiの最新情報、AI営業に関するノウハウ、業界トレンドをお届けします。',
    url: 'https://dynameet.ai/blog/',
    type: 'website',
    siteName: 'Meeton ai',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ブログ｜Meeton ai',
    description: 'AI営業に関する最新情報やノウハウをお届けします。',
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
