import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import CTAButtons from '@/app/components/v2/CTAButtons'
import {
  getPostBySlug,
  getPostBlocks,
  getAllPosts,
  getRelatedPosts,
  calculateReadingTime,
  categoryToSlug,
  tagToSlug,
} from '@/app/lib/notion'
import BlogContent from '@/app/components/BlogContent'
import { altLanguages, ogLocale } from '@/app/lib/i18n'
import { classifyCluster, CLUSTERS } from '@/app/lib/content-clusters'

// /en/blog/[slug]/ — English twin of /blog/[slug]/. EN post slug = `<ja-slug>-en`
// and is globally unique, so getPostBySlug(slug) resolves it directly. The page
// SHELL (breadcrumb, header chrome, related-posts heading, footer, CTA) is
// English and links to /en/blog/*. The article BODY is rendered by the shared,
// locale-agnostic BlogContent. JA-only CTA components (BlogCTA / BlogClusterCTA)
// are intentionally NOT used here — they carry Japanese copy + /blog/ links.
//
// hreflang: canonical → this EN page, en → EN, ja & x-default → the JA original
// (post.translationOf, falling back to the slug with the -en suffix stripped).

export const revalidate = 3600
export const dynamicParams = true // EN posts are added over time

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts('en')
  return posts.map((post) => ({ slug: post.slug }))
}

// EN pillar targets for the cluster cross-link (JA cluster data + /en twins).
const EN_PILLAR: Record<string, { href: string; name: string; line: string }> = {
  chat: { href: '/en/chat/', name: 'Meeton Chat', line: 'Capture visitors in conversation and turn them into leads.' },
  ads: { href: '/en/ads/', name: 'Meeton Ads', line: 'AI-optimized on-site ads that capture more leads from the traffic you already have.' },
  library: { href: '/en/library/', name: 'Meeton Library', line: 'Nurture not-yet-ready prospects with AI-explained content.' },
  calendar: { href: '/en/calendar/', name: 'Meeton Calendar', line: 'Book the meeting the moment intent peaks.' },
  email: { href: '/en/email/', name: 'Meeton Email', line: 'Win back missed leads with 1:1 autonomous follow-up.' },
  'ai-sdr': { href: '/en/', name: 'Meeton ai', line: 'The AI SDR platform: capture, nurture, convert, win back.' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post || post.lang !== 'en') {
    return { title: 'Post not found' }
  }

  const description =
    post.description ||
    `${post.title} — read the latest on AI sales from the Meeton ai blog.`
  const jaSlug = post.translationOf || slug.replace(/-en$/, '')

  return {
    title: post.title,
    description,
    authors: [{ name: 'DynaMeet Inc.', url: 'https://dynameet.ai' }],
    // NOT altLanguages(): the EN slug carries an "-en" suffix, so the EN URL
    // is /en/blog/<ja-slug>-en/ — altLanguages would canonicalize to the
    // non-existent /en/blog/<ja-slug>/ (was live as a systemic canonical→404).
    alternates: {
      canonical: `/en/blog/${post.slug}/`,
      languages: {
        ja: `/blog/${jaSlug}/`,
        en: `/en/blog/${post.slug}/`,
        'x-default': `/blog/${jaSlug}/`,
      },
    },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate || post.publishedDate,
      authors: ['DynaMeet Inc.'],
      section: post.category || 'Sales',
      tags: post.tags,
      url: `https://dynameet.ai/en/blog/${post.slug}/`,
      siteName: 'Meeton ai',
      locale: ogLocale('en'),
      ...(post.featuredImage && {
        images: [{
          url: post.featuredImage.startsWith('/') ? `https://dynameet.ai${post.featuredImage}` : post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      creator: '@meetonai',
      site: '@meetonai',
      ...(post.featuredImage && {
        images: [post.featuredImage.startsWith('/') ? `https://dynameet.ai${post.featuredImage}` : post.featuredImage],
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

function extractTextFromBlocks(blocks: Awaited<ReturnType<typeof getPostBlocks>>): string {
  let text = ''
  for (const block of blocks) {
    if ('paragraph' in block && block.type === 'paragraph') {
      text += block.paragraph.rich_text.map((t) => t.plain_text).join('') + ' '
    } else if ('heading_1' in block && block.type === 'heading_1') {
      text += block.heading_1.rich_text.map((t) => t.plain_text).join('') + ' '
    } else if ('heading_2' in block && block.type === 'heading_2') {
      text += block.heading_2.rich_text.map((t) => t.plain_text).join('') + ' '
    } else if ('heading_3' in block && block.type === 'heading_3') {
      text += block.heading_3.rich_text.map((t) => t.plain_text).join('') + ' '
    } else if ('bulleted_list_item' in block && block.type === 'bulleted_list_item') {
      text += block.bulleted_list_item.rich_text.map((t) => t.plain_text).join('') + ' '
    } else if ('numbered_list_item' in block && block.type === 'numbered_list_item') {
      text += block.numbered_list_item.rich_text.map((t) => t.plain_text).join('') + ' '
    }
  }
  return text
}

function extractHeadingsFromBlocks(blocks: Awaited<ReturnType<typeof getPostBlocks>>): string[] {
  const headings: string[] = []
  for (const block of blocks) {
    if ('heading_2' in block && block.type === 'heading_2') {
      const text = block.heading_2.rich_text.map((t) => t.plain_text).join('')
      if (text) headings.push(text)
    } else if ('heading_3' in block && block.type === 'heading_3') {
      const text = block.heading_3.rich_text.map((t) => t.plain_text).join('')
      if (text) headings.push(text)
    }
  }
  return headings
}

export default async function BlogPostPageEn({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  // Not found, or a JA post hit via the EN route → send to the EN hub.
  if (!post) {
    redirect('/en/blog/')
  }
  if (post.lang !== 'en') {
    notFound()
  }

  const [blocks, relatedPosts] = await Promise.all([
    getPostBlocks(post.id),
    getRelatedPosts(post.category, post.slug, 4, 'en'),
  ])

  const contentText = extractTextFromBlocks(blocks)
  const wordCount = contentText.length
  const readingTime = calculateReadingTime(contentText)
  const headings = extractHeadingsFromBlocks(blocks)

  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  const pillar = EN_PILLAR[classifyCluster({ category: post.category, tags: post.tags, title: post.title })] ?? EN_PILLAR['ai-sdr']

  const articleUrl = `https://dynameet.ai/en/blog/${post.slug}/`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#article`,
    headline: post.title,
    name: post.title,
    description: post.description,
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate || post.publishedDate,
    author: {
      '@type': 'Organization',
      '@id': 'https://dynameet.ai/#organization',
      name: 'DynaMeet Inc.',
      url: 'https://dynameet.ai',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://dynameet.ai/#organization',
      name: 'DynaMeet Inc.',
      url: 'https://dynameet.ai',
      logo: { '@type': 'ImageObject', url: 'https://dynameet.ai/logo-dark.svg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    url: articleUrl,
    inLanguage: 'en',
    isAccessibleForFree: true,
    ...(headings.length > 0 && {
      about: headings.slice(0, 5).map((heading) => ({ '@type': 'Thing', name: heading })),
    }),
    ...(post.category && { articleSection: post.category, genre: post.category }),
    ...(post.featuredImage && {
      image: {
        '@type': 'ImageObject',
        url: post.featuredImage.startsWith('/') ? `https://dynameet.ai${post.featuredImage}` : post.featuredImage,
        width: 1200,
        height: 630,
      },
    }),
    ...((post.focusKeyword || post.tags.length > 0) && {
      keywords: [post.focusKeyword, ...post.tags].filter(Boolean).join(', '),
    }),
    ...(wordCount && { wordCount }),
    ...(readingTime && { timeRequired: `PT${readingTime}M` }),
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://dynameet.ai/en/blog/#blog',
      name: 'Meeton ai blog',
      publisher: { '@type': 'Organization', '@id': 'https://dynameet.ai/#organization' },
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dynameet.ai/en/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dynameet.ai/en/blog/' },
      { '@type': 'ListItem', position: 3, name: post.title, item: articleUrl },
    ],
  }

  const related = relatedPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Nav lang="en" />
      <main
        style={{
          minHeight: '100vh',
          paddingTop: 'clamp(70px, 12vw, 100px)',
          background: 'linear-gradient(180deg, #f8fafc 0%, #fff 50%)',
        }}
      >
        <article
          style={{
            maxWidth: 800,
            margin: '0 auto',
            padding: 'clamp(24px, 6vw, 48px) clamp(16px, 4vw, 24px) clamp(50px, 10vw, 80px)',
          }}
        >
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              marginBottom: 'clamp(20px, 4vw, 32px)',
              fontSize: 'clamp(12px, 2vw, 14px)',
              color: '#6e7494',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}
          >
            <Link href="/en/" style={{ color: '#6e7494', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <Link href="/en/blog/" style={{ color: '#6e7494', textDecoration: 'none' }}>
              Blog
            </Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#0f1128', whiteSpace: 'normal' }}>{post.title}</span>
          </nav>

          {/* Header */}
          <header style={{ marginBottom: 'clamp(24px, 5vw, 40px)' }}>
            {post.category && (
              <Link
                href={`/en/blog/category/${categoryToSlug(post.category)}/`}
                style={{
                  display: 'inline-block',
                  fontSize: 'clamp(11px, 1.8vw, 13px)',
                  fontWeight: 600,
                  color: '#12a37d',
                  background: 'rgba(18,163,125,0.1)',
                  padding: 'clamp(4px, 1vw, 6px) clamp(10px, 2vw, 14px)',
                  borderRadius: 8,
                  marginBottom: 'clamp(14px, 3vw, 20px)',
                  textDecoration: 'none',
                }}
              >
                {post.category}
              </Link>
            )}
            <h1
              style={{
                fontSize: 'clamp(24px, 5vw, 32px)',
                fontWeight: 800,
                lineHeight: 1.4,
                color: '#0f1128',
                margin: 0,
                marginBottom: 'clamp(14px, 3vw, 20px)',
              }}
            >
              {post.title}
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(10px, 2vw, 16px)',
                flexWrap: 'wrap',
              }}
            >
              <time dateTime={post.publishedDate} style={{ fontSize: 'clamp(12px, 2vw, 14px)', color: '#6e7494' }}>
                {formattedDate}
              </time>
              <span
                style={{
                  fontSize: 'clamp(12px, 2vw, 14px)',
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
                {readingTime} min read
              </span>
              {post.tags.length > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/en/blog/tag/${tagToSlug(tag)}/`}
                      style={{
                        fontSize: 'clamp(10px, 1.5vw, 12px)',
                        color: '#6e7494',
                        background: '#f0f2f5',
                        padding: '4px 10px',
                        borderRadius: 6,
                        textDecoration: 'none',
                      }}
                    >
                      #{tag}
                    </Link>
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
                borderRadius: 'clamp(10px, 2vw, 16px)',
                overflow: 'hidden',
                marginBottom: 'clamp(24px, 5vw, 40px)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featuredImage}
                alt={post.title}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          )}

          {/* Content */}
          <BlogContent blocks={blocks} />

          {/* CTA Section (English, localized) */}
          <aside style={{ marginTop: 48, background: '#f6f8fb', border: '1px solid #e5e7eb', borderRadius: 16, padding: '22px 26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#0c9b6e', letterSpacing: '.05em', textTransform: 'uppercase' }}>Related product</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#0f1128', margin: '6px 0 4px' }}>{pillar.name}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: '#3d4551', margin: 0 }}>{pillar.line}</p>
            </div>
            <Link href={pillar.href} style={{ whiteSpace: 'nowrap', fontSize: 14, fontWeight: 800, color: '#0c9b6e', textDecoration: 'none', border: '1.5px solid #bdeddd', borderRadius: 10, padding: '10px 18px' }}>
              Learn more →
            </Link>
          </aside>

          <section
            style={{
              marginTop: 'clamp(40px, 8vw, 64px)',
              padding: 'clamp(28px, 5vw, 44px)',
              borderRadius: 20,
              background: 'linear-gradient(135deg,#0f2d40 0%,#1a4a5e 100%)',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              See what an AI SDR does for your pipeline.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.78)', margin: '0 0 24px', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
              In a 30-minute demo, see concretely how Meeton ai turns leads into booked meetings.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CTAButtons source={`blog-en-${post.slug}`} tone="onNavy" size="lg" align="center" lang="en" />
            </div>
          </section>

          {/* Related Posts */}
          {related.length > 0 && (
            <section style={{ marginTop: 64, paddingTop: 48, borderTop: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f1128', marginBottom: 24 }}>
                Related posts
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 20,
                }}
              >
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/en/blog/${p.slug}/`}
                    style={{
                      display: 'block',
                      padding: 20,
                      background: '#f8fafc',
                      borderRadius: 12,
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    {p.category && (
                      <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, color: '#12a37d', marginBottom: 8 }}>
                        {p.category}
                      </span>
                    )}
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#0f1128',
                        lineHeight: 1.5,
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {p.title}
                    </h3>
                    {p.publishedDate && (
                      <time
                        dateTime={p.publishedDate}
                        style={{ display: 'block', fontSize: 12, color: '#9ca3af', marginTop: 8 }}
                      >
                        {new Date(p.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </time>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Footer */}
          <footer
            style={{
              marginTop: 'clamp(40px, 8vw, 64px)',
              paddingTop: 'clamp(20px, 4vw, 32px)',
              borderTop: '1px solid #e5e7eb',
            }}
          >
            <Link
              href="/en/blog/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 'clamp(14px, 2vw, 15px)',
                fontWeight: 600,
                color: '#12a37d',
                textDecoration: 'none',
              }}
            >
              ← Back to all posts
            </Link>
          </footer>
        </article>
      </main>
      <Footer lang="en" />
    </>
  )
}
