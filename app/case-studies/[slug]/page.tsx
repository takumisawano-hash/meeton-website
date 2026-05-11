import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import BlogContent from '../../components/BlogContent'
import DemoBookingButton from '../../components/DemoBookingButton'
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
            'clamp(120px, 16vw, 180px) clamp(20px, 4vw, 48px) clamp(48px, 7vw, 88px)',
          borderBottom: '1px solid #e4e3dd',
          background:
            'linear-gradient(165deg, #edfcf7 0%, #fafaf7 35%, #fafaf7 65%, #f3f0ff 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid backdrop */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(18,163,125,0.07) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
            maskImage:
              'linear-gradient(180deg, #000 0%, #000 70%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(180deg, #000 0%, #000 70%, transparent 100%)',
          }}
        />
        {/* Soft glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -180,
            right: -120,
            width: 520,
            height: 520,
            background:
              'radial-gradient(circle, rgba(18,163,125,0.12) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: -160,
            left: -80,
            width: 440,
            height: 440,
            background:
              'radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
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
              marginBottom: 32,
              transition: 'color 0.2s',
            }}
            className="cs-back-link"
          >
            ← Case Studies
          </Link>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
              gap: 56,
              alignItems: 'end',
            }}
            className="cs-hero-grid"
          >
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '7px 16px',
                  background:
                    'linear-gradient(135deg, rgba(18,163,125,0.10), rgba(124,92,252,0.10))',
                  border: '1px solid rgba(18,163,125,0.18)',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#065f46',
                  letterSpacing: '0.06em',
                  marginBottom: 24,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono), ui-monospace, monospace',
                    fontSize: 10,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#0e864a',
                  }}
                >
                  Customer Story
                </span>
                <span style={{ color: '#82897f' }}>·</span>
                <span style={{ fontSize: 12, color: '#3d4541' }}>{item.industry}</span>
              </div>

              {item.companyLogo && (
                <div style={{ position: 'relative', width: 156, height: 44, marginBottom: 24 }}>
                  <Image
                    src={item.companyLogo}
                    alt={item.company}
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'left center' }}
                    sizes="156px"
                  />
                </div>
              )}
              {!item.companyLogo && (
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: 28,
                    color: '#0a0e0c',
                    marginBottom: 24,
                    letterSpacing: '-0.02em',
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
                  fontSize: 'clamp(30px, 4vw, 56px)',
                  lineHeight: 1.18,
                  letterSpacing: '-0.035em',
                  margin: '0 0 28px',
                  overflowWrap: 'anywhere',
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
                  position: 'relative',
                  background: '#fff',
                  border: '1px solid #e4e3dd',
                  borderRadius: 24,
                  padding: 'clamp(28px, 3.2vw, 40px)',
                  boxShadow:
                    '0 32px 80px -40px rgba(10,14,12,0.22), 0 1px 0 rgba(255,255,255,0.6) inset',
                  overflow: 'hidden',
                }}
              >
                {/* Accent strip */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background:
                      'linear-gradient(90deg, #12a37d 0%, #0fc19a 35%, #7c5cfc 100%)',
                  }}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-mono), ui-monospace, monospace',
                    fontSize: 11,
                    color: '#0e864a',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    marginBottom: 18,
                    fontWeight: 700,
                  }}
                >
                  // Highlight
                </div>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: 'clamp(60px, 7vw, 96px)',
                    background:
                      'linear-gradient(135deg, #065f46 0%, #12a37d 50%, #0fc19a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.045em',
                    lineHeight: 0.95,
                    marginBottom: 14,
                    overflowWrap: 'anywhere',
                  }}
                >
                  {item.heroMetric}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: '#3d4541',
                    lineHeight: 1.65,
                    fontWeight: 500,
                  }}
                >
                  {item.heroMetricLabel}
                </div>

                {item.stats.length > 0 && (
                  <div
                    style={{
                      marginTop: 32,
                      paddingTop: 24,
                      borderTop: '1px solid #e4e3dd',
                      display: 'grid',
                      gap: 18,
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
                        <div style={{ fontSize: 13, color: '#3d4541', lineHeight: 1.5 }}>
                          {s.label}
                        </div>
                        <div
                          style={{
                            fontWeight: 800,
                            fontSize: 22,
                            color: '#0a0e0c',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {s.value}
                          {s.context && (
                            <span
                              style={{
                                fontSize: 12,
                                color: '#82897f',
                                marginLeft: 6,
                                fontWeight: 600,
                              }}
                            >
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
            padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 48px) clamp(40px, 6vw, 72px)',
          }}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '16 / 9',
                borderRadius: 28,
                overflow: 'hidden',
                border: '1px solid #e4e3dd',
                boxShadow:
                  '0 40px 90px -40px rgba(10,14,12,0.28), 0 2px 0 rgba(255,255,255,0.6) inset',
              }}
            >
              <Image
                src={item.heroImage}
                alt={item.company}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
              {/* Subtle gradient overlay for depth */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, transparent 60%, rgba(10,14,12,0.12) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* QUOTE */}
      {item.quote && (
        <section
          style={{
            padding: 'clamp(72px, 9vw, 112px) clamp(20px, 4vw, 48px)',
            background:
              'linear-gradient(180deg, #f3f2ed 0%, #efeee8 100%)',
            borderTop: '1px solid #e4e3dd',
            borderBottom: '1px solid #e4e3dd',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative quotation mark */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 'clamp(20px, 4vw, 48px)',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(120px, 18vw, 220px)',
              lineHeight: 1,
              fontWeight: 900,
              color: 'rgba(18,163,125,0.08)',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            “
          </div>
          <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
            <blockquote
              style={{
                fontSize: 'clamp(22px, 2.8vw, 34px)',
                fontWeight: 700,
                lineHeight: 1.6,
                letterSpacing: '-0.025em',
                color: '#0a0e0c',
                margin: 0,
                padding: 0,
              }}
            >
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #0a0e0c 0%, #1a3a2e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                “{item.quote}”
              </span>
            </blockquote>
            {item.quotePerson && (
              <div
                style={{
                  marginTop: 32,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  paddingTop: 24,
                  borderTop: '1px solid rgba(10,14,12,0.08)',
                }}
              >
                {item.quoteAvatar && (
                  <div
                    style={{
                      position: 'relative',
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      background: '#e4e3dd',
                      flexShrink: 0,
                      border: '2px solid #fff',
                      boxShadow: '0 4px 12px rgba(10,14,12,0.10)',
                    }}
                  >
                    <Image
                      src={item.quoteAvatar}
                      alt={item.quotePerson}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="52px"
                    />
                  </div>
                )}
                <div
                  style={{
                    fontSize: 14,
                    color: '#3d4541',
                    lineHeight: 1.55,
                    fontWeight: 500,
                  }}
                >
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
          padding: 'clamp(72px, 9vw, 112px) clamp(20px, 4vw, 48px)',
        }}
      >
        <div
          className="cs-article"
          style={{
            maxWidth: 760,
            margin: '0 auto',
            fontSize: 17,
            lineHeight: 1.95,
            color: '#1f2622',
          }}
        >
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
            padding: 'clamp(72px, 9vw, 112px) clamp(20px, 4vw, 48px)',
            borderTop: '1px solid #e4e3dd',
            background:
              'linear-gradient(180deg, #f3f2ed 0%, #fafaf7 100%)',
          }}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
                marginBottom: 32,
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), ui-monospace, monospace',
                    fontSize: 11,
                    letterSpacing: '0.16em',
                    color: '#0e864a',
                    textTransform: 'uppercase',
                    marginBottom: 12,
                    fontWeight: 700,
                  }}
                >
                  // Related stories
                </div>
                <h2
                  style={{
                    fontWeight: 900,
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    lineHeight: 1.25,
                    letterSpacing: '-0.03em',
                    margin: 0,
                  }}
                >
                  同じ業界の他の事例
                </h2>
              </div>
              <Link
                href="/case-studies/"
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#065f46',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 18px',
                  border: '1px solid rgba(18,163,125,0.25)',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                すべての事例を見る <span>→</span>
              </Link>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 20,
              }}
            >
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/case-studies/${r.slug}/`}
                  className="cs-related-card"
                  style={{
                    display: 'block',
                    background: '#fff',
                    border: '1px solid #e4e3dd',
                    borderRadius: 20,
                    padding: 24,
                    textDecoration: 'none',
                    color: '#0a0e0c',
                    position: 'relative',
                    overflow: 'hidden',
                    transition:
                      'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  }}
                >
                  {/* Top accent on hover */}
                  <div
                    aria-hidden
                    className="cs-related-accent"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background:
                        'linear-gradient(90deg, #12a37d, #0fc19a, #7c5cfc)',
                      opacity: 0,
                      transition: 'opacity 0.25s ease',
                    }}
                  />
                  {r.companyLogo ? (
                    <div
                      style={{
                        position: 'relative',
                        width: 100,
                        height: 28,
                        marginBottom: 18,
                      }}
                    >
                      <Image
                        src={r.companyLogo}
                        alt={r.company}
                        fill
                        style={{
                          objectFit: 'contain',
                          objectPosition: 'left center',
                        }}
                        sizes="100px"
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: 16,
                        marginBottom: 14,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {r.company}
                    </div>
                  )}
                  {r.heroMetric && (
                    <div
                      style={{
                        fontWeight: 900,
                        fontSize: 32,
                        background:
                          'linear-gradient(135deg, #065f46 0%, #12a37d 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        marginBottom: 6,
                      }}
                    >
                      {r.heroMetric}
                    </div>
                  )}
                  {r.heroMetricLabel && (
                    <div
                      style={{
                        fontSize: 12,
                        color: '#82897f',
                        marginBottom: 14,
                        lineHeight: 1.5,
                      }}
                    >
                      {r.heroMetricLabel}
                    </div>
                  )}
                  <div
                    style={{
                      fontSize: 13,
                      color: '#3d4541',
                      lineHeight: 1.65,
                      marginTop: 12,
                      paddingTop: 14,
                      borderTop: '1px solid #efeee8',
                    }}
                  >
                    {r.title}
                  </div>
                  <div
                    style={{
                      marginTop: 18,
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#065f46',
                      fontFamily: 'var(--font-mono), ui-monospace, monospace',
                      letterSpacing: '0.06em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    Read story →
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
          padding: 'clamp(96px, 12vw, 144px) clamp(20px, 4vw, 48px)',
          textAlign: 'center',
          background:
            'radial-gradient(ellipse at top, #102a1e 0%, #0a0e0c 60%)',
          color: '#f5f5f2',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid #1a2620',
        }}
      >
        {/* Decorative dot grid on dark bg */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(111,227,178,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            pointerEvents: 'none',
            maskImage:
              'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
          }}
        />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 16px',
              background: 'rgba(111,227,178,0.10)',
              border: '1px solid rgba(111,227,178,0.25)',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              color: '#6fe3b2',
              letterSpacing: '0.1em',
              marginBottom: 28,
              fontFamily: 'var(--font-mono), ui-monospace, monospace',
              textTransform: 'uppercase',
            }}
          >
            // Get started
          </div>
          <h2
            style={{
              fontWeight: 900,
              fontSize: 'clamp(30px, 4.4vw, 52px)',
              lineHeight: 1.18,
              letterSpacing: '-0.035em',
              marginBottom: 24,
            }}
          >
            同じ変化を、
            <br />
            <span
              style={{
                background:
                  'linear-gradient(135deg, #6fe3b2 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              あなたの会社でも。
            </span>
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.9,
              color: 'rgba(245,245,242,0.72)',
              maxWidth: 540,
              margin: '0 auto 40px',
            }}
          >
            15分のデモで、Meeton ai が御社の営業にどうフィットするかをご案内します。
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <DemoBookingButton
              utmCampaign={`case-study-${item.slug}-bottom`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                background:
                  'linear-gradient(135deg, #6fe3b2 0%, #0fc19a 100%)',
                color: '#0a0e0c',
                padding: '18px 36px',
                borderRadius: 999,
                fontSize: 16,
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                boxShadow:
                  '0 12px 32px -8px rgba(111,227,178,0.45), 0 1px 0 rgba(255,255,255,0.25) inset',
                letterSpacing: '0.01em',
              }}
            >
              デモを予約する <span>→</span>
            </DemoBookingButton>
            <Link
              href="/case-studies/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                background: 'rgba(245,245,242,0.06)',
                color: '#f5f5f2',
                padding: '18px 32px',
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid rgba(245,245,242,0.18)',
                backdropFilter: 'blur(8px)',
              }}
            >
              他の事例を見る
            </Link>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <style>{`
        @media (max-width: 1024px) {
          .cs-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; align-items: stretch !important; }
        }
        .cs-back-link:hover { color: #065f46 !important; }
        .cs-related-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 60px -28px rgba(10,14,12,0.18);
          border-color: rgba(18,163,125,0.35) !important;
        }
        .cs-related-card:hover .cs-related-accent { opacity: 1 !important; }
        .cs-article h2 {
          font-weight: 900;
          font-size: clamp(22px, 2.6vw, 30px);
          line-height: 1.3;
          letter-spacing: -0.025em;
          margin: 56px 0 20px;
          color: #0a0e0c;
          position: relative;
          padding-left: 18px;
        }
        .cs-article h2::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.35em;
          bottom: 0.35em;
          width: 4px;
          border-radius: 4px;
          background: linear-gradient(180deg, #12a37d, #0fc19a);
        }
        .cs-article h3 {
          font-weight: 800;
          font-size: clamp(18px, 2.2vw, 22px);
          line-height: 1.4;
          letter-spacing: -0.02em;
          margin: 40px 0 14px;
          color: #0a0e0c;
        }
        .cs-article p { margin: 0 0 1.4em; }
        .cs-article a { color: #065f46; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1.5px; }
        .cs-article a:hover { color: #12a37d; }
        .cs-article ul, .cs-article ol { margin: 0 0 1.6em; padding-left: 1.6em; }
        .cs-article li { margin-bottom: 0.5em; }
        .cs-article blockquote {
          margin: 32px 0;
          padding: 20px 28px;
          background: linear-gradient(135deg, #f3f2ed, #edfcf7);
          border-left: 3px solid #12a37d;
          border-radius: 12px;
          font-size: 16px;
          color: #1f2622;
        }
        .cs-article code {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 0.92em;
          padding: 2px 6px;
          background: #efeee8;
          border-radius: 4px;
          color: #065f46;
        }
        .cs-article pre {
          background: #0a0e0c;
          color: #f5f5f2;
          padding: 20px;
          border-radius: 12px;
          overflow-x: auto;
          font-size: 14px;
          margin: 24px 0;
        }
        .cs-article img {
          border-radius: 16px;
          border: 1px solid #e4e3dd;
          margin: 28px 0;
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
        margin: 'clamp(56px, 7vw, 80px) 0',
        padding: 'clamp(36px, 5vw, 60px)',
        background:
          'radial-gradient(ellipse at top right, #102a1e 0%, #0a0e0c 70%)',
        color: '#f5f5f2',
        borderRadius: 28,
        boxShadow:
          '0 32px 80px -36px rgba(10,14,12,0.42), 0 1px 0 rgba(255,255,255,0.06) inset',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative dot grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(111,227,178,0.07) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
          maskImage:
            'linear-gradient(135deg, transparent 30%, #000 100%)',
          WebkitMaskImage:
            'linear-gradient(135deg, transparent 30%, #000 100%)',
        }}
      />
      {/* Glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -120,
          right: -80,
          width: 360,
          height: 360,
          background:
            'radial-gradient(circle, rgba(111,227,178,0.18) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono), ui-monospace, monospace',
            fontSize: 11,
            letterSpacing: '0.18em',
            color: '#6fe3b2',
            textTransform: 'uppercase',
            marginBottom: 18,
            fontWeight: 700,
          }}
        >
          // {company} と同じ結果を、あなたの会社でも
        </div>
        <h3
          style={{
            fontWeight: 900,
            fontSize: 'clamp(24px, 3.4vw, 36px)',
            lineHeight: 1.3,
            letterSpacing: '-0.03em',
            margin: '0 0 22px',
          }}
        >
          <span
            style={{
              background:
                'linear-gradient(135deg, #6fe3b2 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {heroMetric}
          </span>{' '}
          の
          {heroMetricLabel.replace(/（.*?）/g, '').trim()}を、
          <br />
          あなたのリードでも実現しませんか。
        </h3>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.85,
            color: 'rgba(245,245,242,0.74)',
            maxWidth: 580,
            margin: '0 0 32px',
          }}
        >
          Meeton ai は、Web サイト訪問者の意図を理解し、ホットな状態で商談へと運ぶ AI SDR
          プラットフォームです。貴社の業界・課題に合わせたデモをご用意します。
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <DemoBookingButton
            utmCampaign={`case-study-${company}-mid`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background:
                'linear-gradient(135deg, #6fe3b2 0%, #0fc19a 100%)',
              color: '#0a0e0c',
              padding: '16px 32px',
              borderRadius: 999,
              fontSize: 15,
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              boxShadow:
                '0 10px 28px -8px rgba(111,227,178,0.45), 0 1px 0 rgba(255,255,255,0.22) inset',
            }}
          >
            デモを予約する <span>→</span>
          </DemoBookingButton>
          <Link
            href="/features/ai-chat/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              border: '1px solid rgba(245,245,242,0.22)',
              background: 'rgba(245,245,242,0.04)',
              color: '#f5f5f2',
              padding: '16px 28px',
              borderRadius: 999,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              backdropFilter: 'blur(8px)',
            }}
          >
            AI Chat を詳しく見る
          </Link>
        </div>
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
        padding: '7px 14px',
        border: `1px solid ${accent ? 'rgba(18,163,125,0.28)' : '#e4e3dd'}`,
        background: accent
          ? 'linear-gradient(135deg, rgba(18,163,125,0.10), rgba(124,92,252,0.06))'
          : 'rgba(255,255,255,0.7)',
        borderRadius: 999,
        fontSize: 12,
        backdropFilter: 'blur(8px)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono), ui-monospace, monospace',
          fontSize: 10,
          color: accent ? '#0e864a' : '#82897f',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: accent ? '#065f46' : '#0a0e0c',
          fontWeight: accent ? 700 : 600,
        }}
      >
        {value}
      </span>
    </span>
  )
}
