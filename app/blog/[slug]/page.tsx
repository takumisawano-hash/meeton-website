import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPostBlocks, getAllPostSlugs } from '@/app/lib/notion'
import BlogContent from '@/app/components/BlogContent'
import BlogJsonLd from '@/app/components/BlogJsonLd'

export const revalidate = 3600 // 1時間ごとに再検証

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: '記事が見つかりません',
    }
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedDate,
      url: `https://dynameet.ai/blog/${post.slug}/`,
      ...(post.featuredImage && {
        images: [{ url: post.featuredImage }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      ...(post.featuredImage && {
        images: [post.featuredImage],
      }),
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const blocks = await getPostBlocks(post.id)

  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <>
      <BlogJsonLd post={post} />
      <article
        style={{
          maxWidth: 800,
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
          <Link
            href="/blog/"
            style={{
              color: '#6e7494',
              textDecoration: 'none',
            }}
          >
            ブログ
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: '#0f1128' }}>{post.title}</span>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: 40 }}>
          {post.category && (
            <span
              style={{
                display: 'inline-block',
                fontSize: 13,
                fontWeight: 600,
                color: '#12a37d',
                background: 'rgba(18,163,125,0.1)',
                padding: '6px 14px',
                borderRadius: 8,
                marginBottom: 20,
              }}
            >
              {post.category}
            </span>
          )}
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              lineHeight: 1.4,
              color: '#0f1128',
              margin: 0,
              marginBottom: 20,
            }}
          >
            {post.title}
          </h1>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <time
              dateTime={post.publishedDate}
              style={{
                fontSize: 14,
                color: '#6e7494',
              }}
            >
              {formattedDate}
            </time>
            {post.tags.length > 0 && (
              <div style={{ display: 'flex', gap: 8 }}>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 12,
                      color: '#6e7494',
                      background: '#f0f2f5',
                      padding: '4px 10px',
                      borderRadius: 6,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: 16,
              overflow: 'hidden',
              marginBottom: 40,
            }}
          >
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={800}
              height={450}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
              priority
            />
          </div>
        )}

        {/* Content */}
        <BlogContent blocks={blocks} />

        {/* Footer */}
        <footer
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: '1px solid #e5e7eb',
          }}
        >
          <Link
            href="/blog/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 15,
              fontWeight: 600,
              color: '#12a37d',
              textDecoration: 'none',
            }}
          >
            ← ブログ一覧に戻る
          </Link>
        </footer>
      </article>
    </>
  )
}
