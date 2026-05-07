import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'
import {
  getCategoriesWithCounts,
  getPostsByCategory,
  slugToCategory,
  categoryToSlug,
  getAllPosts,
} from '../../../lib/notion'

export const revalidate = 3600
export const dynamicParams = true

// Skip build-time prerender (Notion API rate limits during parallel build);
// pages will be generated on first request and cached by ISR.
export async function generateStaticParams() {
  return []
}

async function resolveCategory(slug: string): Promise<{ name: string; count: number } | null> {
  const cats = await getCategoriesWithCounts(1)
  const match = cats.find((c) => c.slug === slug || categoryToSlug(c.name) === slug)
  if (match) return { name: match.name, count: match.count }
  // Fallback: case-insensitive match on decoded slug
  const decoded = slugToCategory(slug)
  const fallback = cats.find(
    (c) => c.name.toLowerCase().trim() === decoded.toLowerCase().trim()
  )
  return fallback ? { name: fallback.name, count: fallback.count } : null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const cat = await resolveCategory(category)
  if (!cat) return {}
  const title = `${cat.name}の記事一覧`
  const description = `${cat.name}に関するMeeton aiのブログ記事を一覧で紹介します。AI SDR・B2B営業・インサイドセールスに関する最新情報とノウハウ。`
  return {
    title,
    description,
    alternates: { canonical: `/blog/category/${category}/` },
    openGraph: {
      title: `${title}`,
      description,
      url: `https://dynameet.ai/blog/category/${category}/`,
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const cat = await resolveCategory(category)
  if (!cat) notFound()

  const [posts, allCats, allPosts] = await Promise.all([
    getPostsByCategory(cat.name),
    getCategoriesWithCounts(3),
    getAllPosts(),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.name}の記事一覧`,
    url: `https://dynameet.ai/blog/category/${category}/`,
    about: cat.name,
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
        { '@type': 'ListItem', position: 3, name: cat.name, item: `https://dynameet.ai/blog/category/${category}/` },
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
            <span style={{ color: '#0a0e0c' }}>{cat.name}</span>
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
            Category · {cat.count} posts
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
            {cat.name}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: '#3d4541', maxWidth: 640, margin: 0 }}>
            「{cat.name}」カテゴリの記事 {cat.count} 件。AI SDR・B2B営業・インサイドセールスに関する実践的なノウハウを紹介します。
          </p>

          {/* Other categories */}
          {allCats.length > 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32 }}>
              {allCats.map((c) => {
                const active = c.slug === category
                return (
                  <Link
                    key={c.slug}
                    href={`/blog/category/${c.slug}/`}
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
                    {c.name} <span style={{ opacity: 0.6 }}>({c.count})</span>
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
            <p style={{ color: '#82897f' }}>このカテゴリには現在、記事がありません。</p>
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
                    transition: 'all 0.25s',
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
                  <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 16,
                        lineHeight: 1.5,
                        color: '#0a0e0c',
                        marginBottom: 10,
                      }}
                    >
                      {post.title}
                    </div>
                    <p style={{ fontSize: 13, color: '#3d4541', lineHeight: 1.65, flex: 1, margin: 0 }}>
                      {post.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div style={{ marginTop: 48 }}>
            <Link
              href="/blog/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                color: '#065f46',
                textDecoration: 'none',
                borderBottom: '1px solid #065f46',
                paddingBottom: 2,
              }}
            >
              すべての記事を見る → {allPosts.length} 件
            </Link>
          </div>
        </div>
      </section>

      <Footer variant="light" />
    </div>
  )
}
