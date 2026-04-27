import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'
import {
  getTagsWithCounts,
  getPostsByTag,
  slugToTag,
  tagToSlug,
} from '../../../lib/notion'

export const revalidate = 3600
export const dynamicParams = true

// Skip build-time prerender; pages generated on first request, cached by ISR.
export async function generateStaticParams() {
  return []
}

async function resolveTag(slug: string): Promise<{ name: string; count: number } | null> {
  const tags = await getTagsWithCounts(1)
  const match = tags.find((t) => t.slug === slug || tagToSlug(t.name) === slug)
  if (match) return { name: match.name, count: match.count }
  const decoded = slugToTag(slug)
  const fallback = tags.find(
    (t) => t.name.toLowerCase().trim() === decoded.toLowerCase().trim()
  )
  return fallback ? { name: fallback.name, count: fallback.count } : null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  const t = await resolveTag(tag)
  if (!t) return {}
  const title = `#${t.name}の記事一覧`
  const description = `「${t.name}」タグがついたMeeton aiのブログ記事を紹介します。AI SDR・B2B営業・インサイドセールスに関する具体的な手法と事例。`
  return {
    title,
    description,
    alternates: { canonical: `/blog/tag/${tag}/` },
    openGraph: {
      title: `${title}｜Meeton ai`,
      description,
      url: `https://dynameet.ai/blog/tag/${tag}/`,
      siteName: 'Meeton ai',
      locale: 'ja_JP',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const t = await resolveTag(tag)
  if (!t) notFound()

  const [posts, allTags] = await Promise.all([
    getPostsByTag(t.name),
    getTagsWithCounts(5),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `#${t.name}の記事一覧`,
    url: `https://dynameet.ai/blog/tag/${tag}/`,
    about: t.name,
    isPartOf: { '@type': 'Blog', '@id': 'https://dynameet.ai/blog/#blog' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 20).map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://dynameet.ai/blog/${p.slug}/`,
        name: p.title,
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://dynameet.ai/' },
        { '@type': 'ListItem', position: 2, name: 'ブログ', item: 'https://dynameet.ai/blog/' },
        { '@type': 'ListItem', position: 3, name: `#${t.name}`, item: `https://dynameet.ai/blog/tag/${tag}/` },
      ],
    },
  }

  return (
    <div style={{ background: '#fafaf7', color: '#0a0e0c', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav variant="light" />

      <section
        style={{
          padding: 'clamp(120px, 16vw, 180px) clamp(20px, 4vw, 48px) clamp(48px, 6vw, 72px)',
          borderBottom: '1px solid #e4e3dd',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <nav
            aria-label="breadcrumb"
            style={{
              fontSize: 12,
              color: '#82897f',
              marginBottom: 24,
              fontFamily: 'var(--font-mono), ui-monospace, monospace',
            }}
          >
            <Link href="/" style={{ color: '#82897f', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <Link href="/blog/" style={{ color: '#82897f', textDecoration: 'none' }}>
              Blog
            </Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#0a0e0c' }}>#{t.name}</span>
          </nav>
          <div
            style={{
              fontFamily: 'var(--font-mono), ui-monospace, monospace',
              fontSize: 11,
              letterSpacing: '0.15em',
              color: '#065f46',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Tag · {t.count} posts
          </div>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              margin: '0 0 20px',
              wordBreak: 'keep-all',
            }}
          >
            #{t.name}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#3d4541', maxWidth: 640, margin: 0 }}>
            「{t.name}」タグの記事 {t.count} 件。関連トピックの具体的なノウハウをまとめています。
          </p>

          {/* Other popular tags */}
          {allTags.length > 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32 }}>
              {allTags.slice(0, 20).map((tt) => {
                const active = tt.slug === tag
                return (
                  <Link
                    key={tt.slug}
                    href={`/blog/tag/${tt.slug}/`}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 999,
                      fontSize: 13,
                      textDecoration: 'none',
                      border: `1px solid ${active ? '#0a0e0c' : '#e4e3dd'}`,
                      background: active ? '#0a0e0c' : '#fff',
                      color: active ? '#fafaf7' : '#3d4541',
                    }}
                  >
                    #{tt.name} <span style={{ opacity: 0.6 }}>({tt.count})</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {posts.length === 0 ? (
            <p style={{ color: '#82897f' }}>このタグには現在、記事がありません。</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                gap: 20,
              }}
            >
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}/`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#fff',
                    border: '1px solid #e4e3dd',
                    borderRadius: 20,
                    overflow: 'hidden',
                    textDecoration: 'none',
                    color: '#0a0e0c',
                  }}
                >
                  {post.featuredImage && (
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16/9',
                        background: '#f3f2ed',
                      }}
                    >
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 640px) 100vw, 400px"
                      />
                    </div>
                  )}
                  <div style={{ padding: '20px 24px', flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono), ui-monospace, monospace',
                        fontSize: 11,
                        color: '#82897f',
                        letterSpacing: '0.08em',
                        marginBottom: 10,
                      }}
                    >
                      {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString('ja-JP') : ''}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.5, marginBottom: 10 }}>
                      {post.title}
                    </div>
                    <p style={{ fontSize: 13, color: '#3d4541', lineHeight: 1.65, margin: 0 }}>
                      {post.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer variant="light" />
    </div>
  )
}
