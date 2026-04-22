import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import BlogContent from '../../components/BlogContent'
import {
  getAllCaseStudySlugs,
  getCaseStudyBlocks,
  getCaseStudyBySlug,
  getAllCaseStudies,
} from '../../lib/case-studies'

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = await getCaseStudyBySlug(slug)
  if (!item) return {}
  const canonical = `/case-studies/${item.slug}/`
  return {
    title: `${item.company} 導入事例｜${item.title}`,
    description: item.description,
    alternates: { canonical },
    robots: item.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    openGraph: {
      title: `${item.company} 導入事例`,
      description: item.description,
      url: `https://dynameet.ai${canonical}`,
      siteName: 'Meeton ai',
      locale: 'ja_JP',
      type: 'article',
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = await getCaseStudyBySlug(slug)
  if (!item) notFound()

  const [blocks, allItems] = await Promise.all([
    getCaseStudyBlocks(item.id),
    getAllCaseStudies(),
  ])

  const related = allItems
    .filter((i) => i.slug !== item.slug && i.industry === item.industry)
    .slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.description,
    url: `https://dynameet.ai/case-studies/${item.slug}/`,
    datePublished: item.publishedDate || undefined,
    dateModified: item.modifiedDate || item.publishedDate || undefined,
    image: item.heroImage || item.companyLogo || undefined,
    author: { '@type': 'Organization', name: 'DynaMeet K.K.', url: 'https://dynameet.ai' },
    publisher: {
      '@type': 'Organization',
      name: 'Meeton ai',
      url: 'https://dynameet.ai',
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'Meeton ai',
      applicationCategory: 'BusinessApplication',
    },
    mainEntity: {
      '@type': 'Organization',
      name: item.company,
      ...(item.industry ? { industry: item.industry } : {}),
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://dynameet.ai/case-studies/${item.slug}/`,
    },
  }

  return (
    <div style={{ background: '#fafaf7', color: '#0a0e0c', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav variant="light" />

      {/* HERO */}
      <section
        style={{
          padding:
            'clamp(120px, 16vw, 180px) clamp(20px, 4vw, 48px) clamp(40px, 6vw, 80px)',
          borderBottom: '1px solid #e4e3dd',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Link
            href="/case-studies/"
            style={{
              fontFamily: 'var(--font-mono), ui-monospace, monospace',
              fontSize: 12,
              color: '#82897f',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 28,
            }}
          >
            ← Case Studies
          </Link>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
              gap: 48,
              alignItems: 'end',
            }}
            className="cs-hero-grid"
          >
            <div>
              {item.companyLogo && (
                <div style={{ position: 'relative', width: 140, height: 40, marginBottom: 20 }}>
                  <Image
                    src={item.companyLogo}
                    alt={item.company}
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'left center' }}
                    sizes="140px"
                  />
                </div>
              )}
              {!item.companyLogo && (
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: 24,
                    color: '#0a0e0c',
                    marginBottom: 20,
                  }}
                >
                  {item.company}
                </div>
              )}
              {item.companyNote && (
                <div
                  style={{
                    fontFamily: 'var(--font-mono), ui-monospace, monospace',
                    fontSize: 11,
                    color: '#82897f',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 28,
                  }}
                >
                  {item.companyNote}
                </div>
              )}
              <h1
                style={{
                  fontWeight: 900,
                  fontSize: 'clamp(32px, 4.5vw, 64px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.035em',
                  margin: '0 0 32px',
                  wordBreak: 'keep-all',
                }}
              >
                {item.title}
              </h1>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.9,
                  color: '#3d4541',
                  maxWidth: 640,
                  margin: 0,
                }}
              >
                {item.description}
              </p>

              {/* Meta chips */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginTop: 36,
                }}
              >
                <MetaChip label="業界" value={item.industry} />
                {item.employeeSize && <MetaChip label="従業員" value={item.employeeSize} />}
                {item.usedProducts.map((p) => (
                  <MetaChip key={p} label="利用機能" value={p} accent />
                ))}
                {item.integrations.slice(0, 3).map((i) => (
                  <MetaChip key={i} label="連携" value={i} />
                ))}
              </div>
            </div>

            {/* Hero metric block */}
            {item.heroMetric && (
              <div
                style={{
                  background: '#fff',
                  border: '1px solid #e4e3dd',
                  borderRadius: 24,
                  padding: 36,
                  boxShadow: '0 16px 40px -20px rgba(10,14,12,0.12)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), ui-monospace, monospace',
                    fontSize: 11,
                    color: '#82897f',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 16,
                  }}
                >
                  // HIGHLIGHT
                </div>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: 'clamp(56px, 6vw, 88px)',
                    color: '#065f46',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {item.heroMetric}
                </div>
                <div style={{ fontSize: 15, color: '#3d4541', lineHeight: 1.6 }}>
                  {item.heroMetricLabel}
                </div>

                {item.stats.length > 0 && (
                  <div
                    style={{
                      marginTop: 28,
                      paddingTop: 24,
                      borderTop: '1px solid #e4e3dd',
                      display: 'grid',
                      gap: 16,
                    }}
                  >
                    {item.stats.map((s, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr auto',
                          gap: 12,
                          alignItems: 'baseline',
                        }}
                      >
                        <div style={{ fontSize: 13, color: '#3d4541' }}>{s.label}</div>
                        <div style={{ fontWeight: 800, fontSize: 20, color: '#0a0e0c' }}>
                          {s.value}
                          {s.context && (
                            <span style={{ fontSize: 12, color: '#82897f', marginLeft: 6 }}>
                              {s.context}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      {item.heroImage && (
        <section
          style={{
            padding: '0 clamp(20px, 4vw, 48px) clamp(40px, 6vw, 72px)',
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              position: 'relative',
              aspectRatio: '16 / 9',
              borderRadius: 24,
              overflow: 'hidden',
              border: '1px solid #e4e3dd',
              boxShadow: '0 24px 60px -30px rgba(10,14,12,0.2)',
            }}
          >
            <Image
              src={item.heroImage}
              alt={`${item.company} のオフィス風景`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        </section>
      )}

      {/* QUOTE */}
      {item.quote && (
        <section
          style={{
            padding: 'clamp(60px, 8vw, 96px) clamp(20px, 4vw, 48px)',
            background: '#f3f2ed',
          }}
        >
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <blockquote
              style={{
                fontSize: 'clamp(20px, 2.6vw, 32px)',
                fontWeight: 700,
                lineHeight: 1.6,
                letterSpacing: '-0.02em',
                color: '#0a0e0c',
                margin: 0,
                padding: 0,
              }}
            >
              “{item.quote}”
            </blockquote>
            {item.quotePerson && (
              <div
                style={{
                  marginTop: 28,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                {item.quoteAvatar && (
                  <div
                    style={{
                      position: 'relative',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      background: '#e4e3dd',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.quoteAvatar}
                      alt={item.quotePerson}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="48px"
                    />
                  </div>
                )}
                <div style={{ fontSize: 14, color: '#3d4541', lineHeight: 1.5 }}>
                  {item.quotePerson}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* BODY */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 48px)',
        }}
      >
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {(() => {
            const splitIdx = blocks.findIndex(
              (b) =>
                b.type === 'heading_2' &&
                (b as unknown as {
                  heading_2: { rich_text: { plain_text: string }[] }
                }).heading_2.rich_text
                  .map((r) => r.plain_text)
                  .join('')
                  .includes('印象的なエピソード')
            )
            const before = splitIdx > 0 ? blocks.slice(0, splitIdx) : blocks
            const after = splitIdx > 0 ? blocks.slice(splitIdx) : []
            return (
              <>
                <BlogContent blocks={before} />
                {after.length > 0 && (
                  <MidArticleCTA
                    heroMetric={item.heroMetric}
                    heroMetricLabel={item.heroMetricLabel}
                    company={item.company}
                  />
                )}
                {after.length > 0 && <BlogContent blocks={after} />}
              </>
            )
          })()}
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section
          style={{
            padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 48px)',
            borderTop: '1px solid #e4e3dd',
            background: '#f3f2ed',
          }}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono), ui-monospace, monospace',
                fontSize: 11,
                letterSpacing: '0.15em',
                color: '#065f46',
                textTransform: 'uppercase',
                marginBottom: 24,
              }}
            >
              関連事例
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 16,
              }}
            >
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/case-studies/${r.slug}/`}
                  style={{
                    display: 'block',
                    background: '#fff',
                    border: '1px solid #e4e3dd',
                    borderRadius: 16,
                    padding: 24,
                    textDecoration: 'none',
                    color: '#0a0e0c',
                  }}
                >
                  <div
                    style={{ fontWeight: 800, fontSize: 15, marginBottom: 8 }}
                  >
                    {r.company}
                  </div>
                  <div style={{ fontSize: 13, color: '#3d4541', lineHeight: 1.6 }}>
                    {r.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        style={{
          padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px)',
          textAlign: 'center',
          background: '#0a0e0c',
          color: '#f5f5f2',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 48px)',
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
              marginBottom: 28,
            }}
          >
            次の事例は、あなたの会社かもしれない。
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.9,
              color: 'rgba(245,245,242,0.72)',
              maxWidth: 520,
              margin: '0 auto 40px',
            }}
          >
            Meeton ai のデモをご希望の方は、お気軽にお問い合わせください。
          </p>
          <Link
            href="/contact/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: '#6fe3b2',
              color: '#0a0e0c',
              padding: '18px 36px',
              borderRadius: 999,
              fontSize: 16,
              fontWeight: 800,
              textDecoration: 'none',
            }}
          >
            デモを予約する <span>→</span>
          </Link>
        </div>
      </section>

      <Footer variant="light" />

      <style>{`
        @media (max-width: 1024px) {
          .cs-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; align-items: stretch !important; }
        }
      `}</style>
    </div>
  )
}

function MidArticleCTA({
  heroMetric,
  heroMetricLabel,
  company,
}: {
  heroMetric: string
  heroMetricLabel: string
  company: string
}) {
  return (
    <aside
      style={{
        margin: 'clamp(48px, 6vw, 72px) 0',
        padding: 'clamp(32px, 5vw, 56px)',
        background: 'linear-gradient(135deg, #0a0e0c 0%, #102a1e 100%)',
        color: '#f5f5f2',
        borderRadius: 24,
        boxShadow: '0 24px 60px -28px rgba(10,14,12,0.35)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono), ui-monospace, monospace',
          fontSize: 11,
          letterSpacing: '0.18em',
          color: '#6fe3b2',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}
      >
        // {company} と同じ結果を、あなたの会社でも
      </div>
      <h3
        style={{
          fontWeight: 900,
          fontSize: 'clamp(22px, 3.2vw, 34px)',
          lineHeight: 1.35,
          letterSpacing: '-0.03em',
          margin: '0 0 20px',
        }}
      >
        <span style={{ color: '#6fe3b2' }}>{heroMetric}</span> の
        {heroMetricLabel.replace(/（.*?）/g, '').trim()}を、<br />
        あなたのリードでも実現しませんか。
      </h3>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.85,
          color: 'rgba(245,245,242,0.72)',
          maxWidth: 560,
          margin: '0 0 32px',
        }}
      >
        Meeton ai は、Web サイト訪問者の意図を理解し、温まった状態で商談へと運ぶ AI SDR
        プラットフォームです。貴社の業界・課題に合わせたデモをご用意します。
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Link
          href="/contact/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            background: '#6fe3b2',
            color: '#0a0e0c',
            padding: '16px 32px',
            borderRadius: 999,
            fontSize: 15,
            fontWeight: 800,
            textDecoration: 'none',
          }}
        >
          デモを予約する <span>→</span>
        </Link>
        <Link
          href="/features/ai-chat/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            border: '1px solid rgba(245,245,242,0.24)',
            color: '#f5f5f2',
            padding: '16px 28px',
            borderRadius: 999,
            fontSize: 15,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          AI Chat を詳しく見る
        </Link>
      </div>
    </aside>
  )
}

function MetaChip({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 12px',
        border: `1px solid ${accent ? 'rgba(14,171,110,0.25)' : '#e4e3dd'}`,
        background: accent ? 'rgba(14,171,110,0.08)' : '#fff',
        borderRadius: 999,
        fontSize: 12,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono), ui-monospace, monospace',
          fontSize: 10,
          color: '#82897f',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <span style={{ color: accent ? '#065f46' : '#0a0e0c', fontWeight: accent ? 700 : 500 }}>
        {value}
      </span>
    </span>
  )
}
