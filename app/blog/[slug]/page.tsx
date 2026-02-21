import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPostBlocks, getAllPostSlugs, getRelatedPosts, calculateReadingTime } from '@/app/lib/notion'
import BlogContent from '@/app/components/BlogContent'
import BlogJsonLd from '@/app/components/BlogJsonLd'
import BreadcrumbJsonLd from '@/app/components/BreadcrumbJsonLd'
import RelatedPosts from '@/app/components/RelatedPosts'
import BlogCTA from '@/app/components/BlogCTA'
import FAQJsonLd, { extractFAQFromContent } from '@/app/components/FAQJsonLd'
import HowToJsonLd, { extractHowToFromContent } from '@/app/components/HowToJsonLd'

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

  // description がない場合のフォールバック
  const description = post.description || `${post.title}についての詳細記事。Meeton AIブログでAI営業の最新情報をお届けします。`

  return {
    title: post.title,
    description: description,
    authors: [{ name: 'DynaMeet Inc.', url: 'https://dynameet.ai' }],
    alternates: {
      canonical: `/blog/${post.slug}/`,
      languages: {
        'ja-JP': `/blog/${post.slug}/`,
      },
    },
    openGraph: {
      title: post.title,
      description: description,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate || post.publishedDate,
      authors: ['DynaMeet Inc.'],
      section: post.category || 'セールス',
      tags: post.tags,
      url: `https://dynameet.ai/blog/${post.slug}/`,
      siteName: 'Meeton AI',
      locale: 'ja_JP',
      ...(post.featuredImage && {
        images: [{
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      creator: '@meetonai',
      site: '@meetonai',
      ...(post.featuredImage && {
        images: [post.featuredImage],
      }),
    },
    robots: {
      index: !post.noIndex,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    ...(post.focusKeyword && {
      keywords: [post.focusKeyword, ...(post.tags || [])].join(', '),
    }),
  }
}

// ブロックからテキストを抽出
function extractTextFromBlocks(blocks: Awaited<ReturnType<typeof getPostBlocks>>): string {
  let text = ''
  for (const block of blocks) {
    if ('paragraph' in block && block.type === 'paragraph') {
      text += block.paragraph.rich_text.map(t => t.plain_text).join('') + ' '
    } else if ('heading_1' in block && block.type === 'heading_1') {
      text += block.heading_1.rich_text.map(t => t.plain_text).join('') + ' '
    } else if ('heading_2' in block && block.type === 'heading_2') {
      text += block.heading_2.rich_text.map(t => t.plain_text).join('') + ' '
    } else if ('heading_3' in block && block.type === 'heading_3') {
      text += block.heading_3.rich_text.map(t => t.plain_text).join('') + ' '
    } else if ('bulleted_list_item' in block && block.type === 'bulleted_list_item') {
      text += block.bulleted_list_item.rich_text.map(t => t.plain_text).join('') + ' '
    } else if ('numbered_list_item' in block && block.type === 'numbered_list_item') {
      text += block.numbered_list_item.rich_text.map(t => t.plain_text).join('') + ' '
    }
  }
  return text
}

// ブロックから見出しを抽出（AEO/GEO用）
function extractHeadingsFromBlocks(blocks: Awaited<ReturnType<typeof getPostBlocks>>): string[] {
  const headings: string[] = []
  for (const block of blocks) {
    if ('heading_2' in block && block.type === 'heading_2') {
      const text = block.heading_2.rich_text.map(t => t.plain_text).join('')
      if (text) headings.push(text)
    } else if ('heading_3' in block && block.type === 'heading_3') {
      const text = block.heading_3.rich_text.map(t => t.plain_text).join('')
      if (text) headings.push(text)
    }
  }
  return headings
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const [blocks, relatedPosts] = await Promise.all([
    getPostBlocks(post.id),
    getRelatedPosts(post.category, post.slug, 4),
  ])

  // 読了時間とワードカウントを計算
  const contentText = extractTextFromBlocks(blocks)
  const wordCount = contentText.length
  const readingTime = calculateReadingTime(contentText)

  // AEO/GEO: 見出し、FAQ、HowToを抽出
  const headings = extractHeadingsFromBlocks(blocks)
  const faqItems = extractFAQFromContent(blocks as Array<{ type: string; [key: string]: unknown }>)
  const howToData = extractHowToFromContent(blocks as Array<{ type: string; [key: string]: unknown }>, post.title)

  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  // パンくずリストのデータ
  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://dynameet.ai/' },
    { name: 'ブログ', url: 'https://dynameet.ai/blog/' },
    { name: post.title, url: `https://dynameet.ai/blog/${post.slug}/` },
  ]

  return (
    <>
      <BlogJsonLd post={post} wordCount={wordCount} readingTime={readingTime} headings={headings} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {/* AEO: FAQスキーマ（質問形式の見出しがある場合） */}
      {faqItems.length > 0 && (
        <FAQJsonLd items={faqItems} pageUrl={`https://dynameet.ai/blog/${post.slug}/`} />
      )}
      {/* AEO: HowToスキーマ（ステップ形式の記事の場合） */}
      {howToData && (
        <HowToJsonLd
          name={post.title}
          description={howToData.description || post.description}
          steps={howToData.steps}
          totalTime={readingTime ? `PT${readingTime}M` : undefined}
          image={post.featuredImage || undefined}
        />
      )}
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
            <span
              style={{
                fontSize: 14,
                color: '#6e7494',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {readingTime}分で読了
            </span>
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

        {/* CTA Section */}
        <BlogCTA />

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} currentSlug={post.slug} />

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
