import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { getAllCaseStudies } from '../lib/case-studies'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '導入事例',
  description:
    'Meeton ai を導入した企業の実績。商談化率・初動対応時間・工数削減など、具体的な成果と運用の実態を業種別にご紹介します。',
  alternates: { canonical: '/case-studies/' },
  openGraph: {
    title: '導入事例',
    description: 'Meeton ai 導入企業の実績と運用の実態。',
    url: 'https://dynameet.ai/case-studies/',
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

export default async function CaseStudiesPage() {
  const items = await getAllCaseStudies()
  const industries = Array.from(new Set(items.map((i) => i.industry).filter(Boolean)))

  return (
    <div style={{ background: '#fafaf7', color: '#0a0e0c', minHeight: '100vh' }}>
      <Nav variant="light" />

      <section
        style={{
          padding: 'clamp(120px, 16vw, 180px) clamp(20px, 4vw, 48px) clamp(60px, 8vw, 100px)',
          borderBottom: '1px solid #e4e3dd',
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
              marginBottom: 20,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ width: 20, height: 1, background: '#0eab6e' }} />
            Case Studies · {items.length}
          </div>
          <h1
            style={{
              fontWeight: 900,
              fontSize: 'clamp(40px, 6vw, 88px)',
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              margin: '0 0 28px',
              wordBreak: 'keep-all',
            }}
          >
            Meeton ai が、<span style={{ color: '#065f46' }}>何を変えたか</span>。
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.85,
              color: '#3d4541',
              maxWidth: 640,
              margin: 0,
            }}
          >
            導入企業で実際に起きた変化を、数字とストーリーで。商談化率・初動対応時間・工数削減。
          </p>
          {industries.length > 0 && (
            <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {industries.map((ind) => (
                <span
                  key={ind}
                  style={{
                    padding: '6px 14px',
                    border: '1px solid #e4e3dd',
                    borderRadius: 999,
                    fontSize: 12,
                    color: '#3d4541',
                    background: '#fff',
                  }}
                >
                  {ind}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 48px)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {items.length === 0 ? (
            <p style={{ color: '#82897f' }}>導入事例は準備中です。</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={`/case-studies/${item.slug}/`}
                  className="cs-index-card"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 6fr)',
                    gap: 0,
                    background: '#fff',
                    border: '1px solid #e4e3dd',
                    borderRadius: 24,
                    overflow: 'hidden',
                    textDecoration: 'none',
                    color: '#0a0e0c',
                    transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                >
                  <div
                    className="cs-index-image"
                    style={{
                      position: 'relative',
                      minHeight: 320,
                      background: '#f3f2ed',
                    }}
                  >
                    {item.heroImage ? (
                      <Image
                        src={item.heroImage}
                        alt={item.company}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 900px) 100vw, 500px"
                      />
                    ) : null}
                  </div>

                  <div
                    className="cs-index-body"
                    style={{
                      padding: 'clamp(28px, 4vw, 48px)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 20,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16,
                      }}
                    >
                      {item.companyLogo ? (
                        <div style={{ position: 'relative', width: 120, height: 36 }}>
                          <Image
                            src={item.companyLogo}
                            alt={item.company}
                            fill
                            style={{ objectFit: 'contain', objectPosition: 'left center' }}
                            sizes="120px"
                          />
                        </div>
                      ) : (
                        <span style={{ fontWeight: 800, fontSize: 18 }}>{item.company}</span>
                      )}
                      {item.industry && (
                        <span
                          style={{
                            fontFamily: 'var(--font-mono), ui-monospace, monospace',
                            fontSize: 10,
                            color: '#82897f',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.industry}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: 'clamp(20px, 2.4vw, 26px)',
                        lineHeight: 1.4,
                        letterSpacing: '-0.02em',
                        wordBreak: 'break-word',
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {item.title}
                    </div>

                    {item.heroMetric && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: 14,
                          paddingTop: 4,
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 900,
                            fontSize: 'clamp(40px, 5.2vw, 56px)',
                            color: '#065f46',
                            letterSpacing: '-0.04em',
                            lineHeight: 1,
                          }}
                        >
                          {item.heroMetric}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: '#3d4541',
                            lineHeight: 1.5,
                          }}
                        >
                          {item.heroMetricLabel}
                        </div>
                      </div>
                    )}

                    {item.description && (
                      <p
                        style={{
                          margin: 0,
                          fontSize: 15,
                          lineHeight: 1.75,
                          color: '#3d4541',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3,
                          overflow: 'hidden',
                        }}
                      >
                        {item.description}
                      </p>
                    )}

                    <div
                      style={{
                        marginTop: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 16,
                        paddingTop: 8,
                      }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {item.usedProducts.slice(0, 4).map((prod) => (
                          <span
                            key={prod}
                            style={{
                              fontFamily: 'var(--font-mono), ui-monospace, monospace',
                              fontSize: 10,
                              padding: '3px 8px',
                              border: '1px solid #e4e3dd',
                              borderRadius: 4,
                              color: '#3d4541',
                              letterSpacing: '0.03em',
                            }}
                          >
                            {prod}
                          </span>
                        ))}
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono), ui-monospace, monospace',
                          fontSize: 12,
                          color: '#065f46',
                          letterSpacing: '0.05em',
                          fontWeight: 600,
                        }}
                      >
                        Read case study →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer variant="light" />

      <style>{`
        .cs-index-card:hover {
          border-color: #065f46 !important;
          transform: translateY(-2px);
          box-shadow: 0 24px 48px -24px rgba(10, 14, 12, 0.18);
        }
        @media (max-width: 820px) {
          .cs-index-card { grid-template-columns: 1fr !important; }
          .cs-index-image { min-height: 0 !important; aspect-ratio: 16 / 9 !important; }
        }
      `}</style>
    </div>
  )
}
