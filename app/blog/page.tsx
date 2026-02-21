import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/app/lib/notion'
import BlogCard from '@/app/components/BlogCard'
import BlogListJsonLd from '@/app/components/BlogListJsonLd'

export const revalidate = 3600 // 1時間ごとに再検証

export const metadata: Metadata = {
  title: 'ブログ',
  description: 'Meeton AIの最新情報、AI営業に関するノウハウ、インサイドセールスのベストプラクティス、業界トレンドをお届けします。B2B営業・マーケティングの効率化に役立つ情報が満載です。',
  alternates: {
    canonical: '/blog/',
    languages: {
      'ja-JP': '/blog/',
    },
  },
  openGraph: {
    title: 'ブログ｜Meeton AI',
    description: 'Meeton AIの最新情報、AI営業に関するノウハウ、業界トレンドをお届けします。',
    url: 'https://dynameet.ai/blog/',
    type: 'website',
    siteName: 'Meeton AI',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ブログ｜Meeton AI',
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

  return (
    <>
      <BlogListJsonLd posts={posts} />
      <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '48px 24px 80px',
      }}
    >
      {/* Breadcrumb */}
      <nav
        aria-label="パンくずリスト"
        style={{
          marginBottom: 32,
          fontSize: 14,
          color: '#6e7494',
        }}
      >
        <Link
          href="/"
          style={{
            color: '#6e7494',
            textDecoration: 'none',
          }}
        >
          ホーム
        </Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: '#0f1128' }}>ブログ</span>
      </nav>

      {/* Header */}
      <header style={{ marginBottom: 48 }}>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: '#0f1128',
            margin: 0,
            marginBottom: 16,
          }}
        >
          ブログ
        </h1>
        <p
          style={{
            fontSize: 16,
            color: '#6e7494',
            margin: 0,
            lineHeight: 1.7,
          }}
        >
          AI営業に関する最新情報やノウハウをお届けします
        </p>
      </header>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 32,
          }}
        >
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 0',
            color: '#6e7494',
          }}
        >
          <p style={{ fontSize: 18, marginBottom: 16 }}>
            まだ記事がありません
          </p>
          <p style={{ fontSize: 14 }}>
            近日中に記事を公開予定です。お楽しみに！
          </p>
        </div>
      )}
    </div>
    </>
  )
}
