import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import {
  getCategoriesWithCounts,
  getPostsByCategory,
  slugToCategory,
  categoryToSlug,
  getAllPosts,
} from '@/app/lib/notion'
import { ogLocale } from '@/app/lib/i18n'

// /en/blog/category/[category]/ — English twin of /blog/category/[category]/.
// Resolves against EN posts only (lang='en'); links to /en/blog/*. Needed
// because the EN hub + EN detail pages link to category archives.

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

async function resolveCategory(slug: string): Promise<{ name: string; count: number } | null> {
  const cats = await getCategoriesWithCounts(1, 'en')
  const match = cats.find((c) => c.slug === slug || categoryToSlug(c.name) === slug)
  if (match) return { name: match.name, count: match.count }
  const decoded = slugToCategory(slug)
  const fallback = cats.find((c) => c.name.toLowerCase().trim() === decoded.toLowerCase().trim())
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
  const title = `${cat.name} posts`
  const description = `Meeton ai blog posts about ${cat.name}. The latest know-how on AI SDRs, B2B sales and inside sales.`
  return {
    title,
    description,
    alternates: { canonical: `/en/blog/category/${category}/` },
    openGraph: {
      title,
      description,
      url: `https://dynameet.ai/en/blog/category/${category}/`,
      siteName: 'Meeton ai',
      locale: ogLocale('en'),
      type: 'website',
    },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  }
}

export default async function CategoryPageEn({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const cat = await resolveCategory(category)
  if (!cat) notFound()

  const [posts, allCats, allPosts] = await Promise.all([
    getPostsByCategory(cat.name, 'en'),
    getCategoriesWithCounts(3, 'en'),
    getAllPosts('en'),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.name} posts`,
    url: `https://dynameet.ai/en/blog/category/${category}/`,
    about: cat.name,
    inLanguage: 'en',
    isPartOf: { '@type': 'Blog', '@id': 'https://dynameet.ai/en/blog/#blog' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 20).map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://dynameet.ai/en/blog/${p.slug}/`,
        name: p.title,
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dynameet.ai/en/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dynameet.ai/en/blog/' },
        { '@type': 'ListItem', position: 3, name: cat.name, item: `https://dynameet.ai/en/blog/category/${category}/` },
      ],
    },
  }

  return (
    <div style={{ background: '#fafaf7', color: '#0a0e0c', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav variant="light" lang="en" />

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
            <Link href="/en/" style={{ color: '#82897f', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <Link href="/en/blog/" style={{ color: '#82897f', textDecoration: 'none' }}>
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
            {cat.count} posts in “{cat.name}”. Practical know-how on AI SDRs, B2B sales and inside sales.
          </p>

          {allCats.length > 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32 }}>
              {allCats.map((c) => {
                const active = c.slug === category
                return (
                  <Link
                    key={c.slug}
                    href={`/en/blog/category/${c.slug}/`}
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
            <p style={{ color: '#82897f' }}>There are no posts in this category yet.</p>
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
                  href={`/en/blog/${post.slug}/`}
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
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#f3f2ed' }}>
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
                      {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString('en-US') : ''}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.5, color: '#0a0e0c', marginBottom: 10 }}>
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
              href="/en/blog/"
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
              See all posts → {allPosts.length}
            </Link>
          </div>
        </div>
      </section>

      <Footer variant="light" lang="en" />
    </div>
  )
}
