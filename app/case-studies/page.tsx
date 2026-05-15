import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FAQJsonLd from '../components/FAQJsonLd'
import DemoBookingButton from '../components/DemoBookingButton'
import DocRequestButton from '../components/DocRequestButton'
import { getAllCaseStudies } from '../lib/case-studies'

// FAQ on the case-studies hub helps Google + AI search engines extract
// answers about Meeton ai's track record, supported industries, and
// implementation timeline — these are exactly the questions a vendor-
// research session typically opens with.
const CASE_STUDIES_FAQ = [
  {
    question: 'Meeton ai はどのような業種・規模の企業で導入されていますか？',
    answer: 'SaaS、コンサルティング、教育、業務自動化など、Webサイト経由でリードを獲得している幅広い業界で導入されています。従業員数は数十名のスタートアップから数百名の中堅企業まで対応しています。',
  },
  {
    question: '導入後どのくらいで成果が出始めますか？',
    answer: '初期設定は最短5分、AIが自律学習を開始するため設置直後から商談獲得が可能です。多くの導入企業が初月で目に見える商談数の増加を実感しており、3ヶ月以内に商談化率の有意な改善を達成しています。',
  },
  {
    question: 'どのような成果が期待できますか？',
    answer: '導入企業の実績では、チャット経由のリード獲得20倍以上、AIチャット経由の商談化率40%超、3ヶ月で複数受注など、業種・運用設計により多様な成果を実現しています。各事例ページで具体的な数字をご確認いただけます。',
  },
  {
    question: '既存のCRM・MAツールと併用できますか？',
    answer: 'HubSpot・Salesforce・Slack・Google Calendar とネイティブ連携しており、既存のセールススタックを置き換えずにそのまま強化できます。導入企業の多くがこの構成で運用しています。',
  },
  {
    question: '事例として取り上げられた企業のインタビューは可能ですか？',
    answer: '一部の導入企業様はリファレンス対応に応じていただいています。ご希望の場合は、お問い合わせまたは資料請求の際にお知らせください。',
  },
]

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

// Map Notion-managed industry labels to /use-cases/* landing pages so the
// industry chips on the hub become real internal links, concentrating
// PageRank toward our vertical LPs. Unknown industries fall through to a
// plain (non-clickable) chip.
const INDUSTRY_USE_CASE_HREF: Record<string, string> = {
  SaaS: '/use-cases/saas/',
  'IT・SaaS': '/use-cases/saas/',
  '製造業': '/use-cases/manufacturing/',
  '製造': '/use-cases/manufacturing/',
  '専門サービス': '/use-cases/professional-services/',
  'プロフェッショナルサービス': '/use-cases/professional-services/',
  'コンサルティング': '/use-cases/professional-services/',
  'フィンテック': '/use-cases/fintech/',
  FinTech: '/use-cases/fintech/',
  '金融': '/use-cases/fintech/',
}

export default async function CaseStudiesPage() {
  const items = await getAllCaseStudies()
  const industries = Array.from(new Set(items.map((i) => i.industry).filter(Boolean)))
  const featured = items[0]
  const rest = items.slice(1)

  return (
    <div className="cs-root">
      <FAQJsonLd
        items={CASE_STUDIES_FAQ}
        pageUrl="https://dynameet.ai/case-studies/"
      />
      <Nav variant="light" />

      {/* HERO */}
      <section className="cs-hero">
        <div className="cs-hero-grid" aria-hidden />
        <div className="cs-hero-inner">
          <div className="cs-eyebrow">
            <span className="cs-eyebrow-dash" />
            Customer Stories
            <span className="cs-eyebrow-count">{items.length.toString().padStart(2, '0')}</span>
          </div>
          <h1 className="cs-hero-h1">
            導入企業が、<br />
            <em>数字で語る成果</em>
          </h1>
          <p className="cs-hero-sub">
            商談化率・初動対応時間・工数削減。Meeton ai を導入した企業で実際に起きた変化を、
            業種別・運用別に。ロジックではなく、現場の数字で。
          </p>

          {/* Stats */}
          <div className="cs-hero-stats">
            <div className="cs-stat">
              <div className="cs-stat-v">{items.length}</div>
              <div className="cs-stat-l">公開事例</div>
            </div>
            <div className="cs-stat">
              <div className="cs-stat-v">40<span className="cs-stat-u">%+</span></div>
              <div className="cs-stat-l">AI 商談化率</div>
            </div>
            <div className="cs-stat">
              <div className="cs-stat-v">20<span className="cs-stat-u">x</span></div>
              <div className="cs-stat-l">リード獲得増</div>
            </div>
            <div className="cs-stat">
              <div className="cs-stat-v">5<span className="cs-stat-u">秒</span></div>
              <div className="cs-stat-l">初動対応</div>
            </div>
          </div>

          {industries.length > 0 && (
            <div className="cs-industries">
              <span className="cs-industries-label">業種</span>
              {industries.map((ind) => {
                const href = INDUSTRY_USE_CASE_HREF[ind]
                if (href) {
                  return (
                    <Link key={ind} href={href} className="cs-industry-chip">
                      {ind}
                    </Link>
                  )
                }
                return (
                  <span key={ind} className="cs-industry-chip">
                    {ind}
                  </span>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Trusted by — company logo strip */}
      {items.some((i) => i.companyLogo) && (
        <section className="cs-trusted">
          <div className="cs-trusted-inner">
            <div className="cs-trusted-label">Trusted by</div>
            <div className="cs-trusted-logos">
              {items
                .filter((i) => i.companyLogo)
                .map((i) => (
                  <Link
                    key={i.id}
                    href={`/case-studies/${i.slug}/`}
                    className="cs-trusted-logo"
                    aria-label={`${i.company} の事例を見る`}
                  >
                    <Image
                      src={i.companyLogo!}
                      alt={i.company}
                      fill
                      style={{ objectFit: 'contain' }}
                      sizes="160px"
                    />
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* CASE STUDIES — Featured + Grid */}
      <section className="cs-listing">
        <div className="cs-listing-inner">
          {items.length === 0 ? (
            <p style={{ color: '#82897f' }}>導入事例は準備中です。</p>
          ) : (
            <>
              {/* Featured (1st story) */}
              {featured && (
                <Link
                  href={`/case-studies/${featured.slug}/`}
                  className="cs-featured"
                >
                  <div className="cs-featured-media">
                    {featured.heroImage ? (
                      <Image
                        src={featured.heroImage}
                        alt={featured.company}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 900px) 100vw, 640px"
                        priority
                      />
                    ) : (
                      <div className="cs-featured-media-fallback" />
                    )}
                    <div className="cs-featured-badge">
                      <span className="cs-featured-badge-dot" />
                      Featured Story
                    </div>
                  </div>

                  <div className="cs-featured-body">
                    <div className="cs-featured-meta">
                      {featured.companyLogo ? (
                        <div className="cs-featured-logo">
                          <Image
                            src={featured.companyLogo}
                            alt={featured.company}
                            fill
                            style={{ objectFit: 'contain', objectPosition: 'left center' }}
                            sizes="140px"
                          />
                        </div>
                      ) : (
                        <span className="cs-featured-company">{featured.company}</span>
                      )}
                      {featured.industry && (
                        <span className="cs-featured-industry">{featured.industry}</span>
                      )}
                    </div>

                    <h2 className="cs-featured-title">{featured.title}</h2>

                    {featured.heroMetric && (
                      <div className="cs-featured-metric-row">
                        <div className="cs-featured-metric">{featured.heroMetric}</div>
                        <div className="cs-featured-metric-label">
                          {featured.heroMetricLabel}
                        </div>
                      </div>
                    )}

                    {featured.quote && (
                      <blockquote className="cs-featured-quote">
                        <span className="cs-featured-quote-mark" aria-hidden>
                          “
                        </span>
                        {featured.quote}
                        {featured.quotePerson && (
                          <cite className="cs-featured-quote-cite">
                            — {featured.quotePerson}
                          </cite>
                        )}
                      </blockquote>
                    )}

                    <div className="cs-featured-footer">
                      <div className="cs-tags">
                        {featured.usedProducts.slice(0, 4).map((p) => (
                          <span key={p} className="cs-tag">
                            {p}
                          </span>
                        ))}
                      </div>
                      <span className="cs-featured-cta">
                        詳しく見る
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="cs-grid">
                  {rest.map((item) => (
                    <Link
                      key={item.id}
                      href={`/case-studies/${item.slug}/`}
                      className="cs-card"
                    >
                      <div className="cs-card-media">
                        {item.heroImage ? (
                          <Image
                            src={item.heroImage}
                            alt={item.company}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 400px"
                          />
                        ) : (
                          <div className="cs-card-media-fallback" />
                        )}
                        {item.industry && (
                          <span className="cs-card-industry-tag">{item.industry}</span>
                        )}
                      </div>

                      <div className="cs-card-body">
                        <div className="cs-card-head">
                          {item.companyLogo ? (
                            <div className="cs-card-logo">
                              <Image
                                src={item.companyLogo}
                                alt={item.company}
                                fill
                                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                                sizes="110px"
                              />
                            </div>
                          ) : (
                            <span className="cs-card-company">{item.company}</span>
                          )}
                        </div>

                        <h3 className="cs-card-title">{item.title}</h3>

                        {item.heroMetric && (
                          <div className="cs-card-metric-row">
                            <div className="cs-card-metric">{item.heroMetric}</div>
                            <div className="cs-card-metric-label">
                              {item.heroMetricLabel}
                            </div>
                          </div>
                        )}

                        {item.quote ? (
                          <p className="cs-card-quote">
                            <span aria-hidden className="cs-card-quote-mark">
                              “
                            </span>
                            {item.quote}
                          </p>
                        ) : item.description ? (
                          <p className="cs-card-desc">{item.description}</p>
                        ) : null}

                        <div className="cs-card-footer">
                          <div className="cs-tags">
                            {item.usedProducts.slice(0, 3).map((p) => (
                              <span key={p} className="cs-tag">
                                {p}
                              </span>
                            ))}
                          </div>
                          <span className="cs-card-cta">
                            詳しく見る
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14M13 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="cs-cta">
        <div className="cs-cta-inner">
          <div className="cs-cta-eyebrow">
            <span className="cs-eyebrow-dash" />
            Next Step
          </div>
          <h2 className="cs-cta-h">
            次に名前が並ぶのは、<br />
            <em>あなたの会社</em>かもしれない。
          </h2>
          <p className="cs-cta-p">
            導入の前に、まずは設計と運用を見てください。
            30分のデモで、自社にどう効くかが具体的に見えます。
          </p>
          <div className="cs-cta-buttons">
            <DemoBookingButton
              className="cs-btn cs-btn-primary"
              utmCampaign="case-studies-list"
            >
              30分デモを予約する
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </DemoBookingButton>
            <DocRequestButton className="cs-btn cs-btn-ghost">
              資料請求
            </DocRequestButton>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <style>{`
        .cs-root {
          background: #fafaf7;
          color: #0a0e0c;
          min-height: 100vh;
          --cs-green: #12a37d;
          --cs-green-deep: #065f46;
          --cs-purple: #7c5cfc;
          --cs-cyan: #0891b2;
          --cs-blue: #3b6ff5;
          --cs-pink: #d03ea1;
          --cs-border: #e4e3dd;
          --cs-border-2: #d8d7d0;
          --cs-text: #0a0e0c;
          --cs-sub: #3d4541;
          --cs-mute: #82897f;
        }

        /* ========== HERO ========== */
        .cs-hero {
          position: relative;
          padding: clamp(120px, 16vw, 180px) clamp(20px, 4vw, 48px) clamp(48px, 7vw, 80px);
          border-bottom: 1px solid var(--cs-border);
          overflow: hidden;
          /* Pre-baked glow via stacked radial-gradients (GPU-cheap, no filter:blur) */
          background:
            radial-gradient(circle 360px at calc(100% - 40px) -80px, rgba(18, 163, 125, 0.22), transparent 70%),
            radial-gradient(circle 280px at -40px calc(100% - 40px), rgba(124, 92, 252, 0.16), transparent 70%),
            radial-gradient(ellipse 80% 60% at 20% 0%, rgba(18, 163, 125, 0.06), transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 30%, rgba(124, 92, 252, 0.05), transparent 60%),
            #fafaf7;
        }
        .cs-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(6, 95, 70, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 95, 70, 0.04) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse at top, black 30%, transparent 80%);
          pointer-events: none;
        }
        .cs-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
        }
        .cs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--cs-green-deep);
          text-transform: uppercase;
          margin-bottom: 24px;
          font-weight: 700;
        }
        .cs-eyebrow-dash {
          width: 24px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--cs-green));
        }
        .cs-eyebrow-count {
          color: var(--cs-mute);
          font-weight: 600;
          padding-left: 8px;
          border-left: 1px solid var(--cs-border);
        }
        .cs-hero-h1 {
          font-weight: 900;
          font-size: clamp(40px, 6vw, 84px);
          line-height: 1.08;
          letter-spacing: -0.04em;
          margin: 0 0 28px;
          word-break: keep-all;
        }
        .cs-hero-h1 em {
          font-style: normal;
          background: linear-gradient(135deg, var(--cs-green-deep) 0%, var(--cs-green) 70%, var(--cs-cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cs-hero-sub {
          font-size: clamp(15px, 2vw, 18px);
          line-height: 1.85;
          color: var(--cs-sub);
          max-width: 600px;
          margin: 0 0 48px;
        }
        .cs-hero-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0;
          max-width: 720px;
          padding: 28px 0;
          border-top: 1px solid var(--cs-border);
          border-bottom: 1px solid var(--cs-border);
        }
        .cs-stat {
          position: relative;
          padding: 0 24px;
        }
        .cs-stat:first-child {
          padding-left: 0;
        }
        .cs-stat:not(:first-child)::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10%;
          bottom: 10%;
          width: 1px;
          background: var(--cs-border);
        }
        .cs-stat-v {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, var(--cs-text), var(--cs-green-deep));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cs-stat-u {
          font-size: 0.6em;
          font-weight: 700;
          margin-left: 2px;
          color: var(--cs-green-deep);
          -webkit-text-fill-color: var(--cs-green-deep);
        }
        .cs-stat-l {
          font-size: 12px;
          font-weight: 600;
          color: var(--cs-sub);
          margin-top: 8px;
          letter-spacing: 0.02em;
        }
        .cs-industries {
          margin-top: 32px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }
        .cs-industries-label {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--cs-mute);
          font-weight: 700;
          margin-right: 4px;
        }
        .cs-industry-chip {
          padding: 6px 14px;
          border: 1px solid var(--cs-border);
          border-radius: 999px;
          font-size: 12px;
          color: var(--cs-sub);
          background: #fff;
          font-weight: 600;
        }

        /* ========== TRUSTED BY ========== */
        .cs-trusted {
          padding: clamp(36px, 5vw, 56px) clamp(20px, 4vw, 48px);
          border-bottom: 1px solid var(--cs-border);
          background: #fff;
        }
        .cs-trusted-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: clamp(20px, 4vw, 48px);
          flex-wrap: wrap;
        }
        .cs-trusted-label {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--cs-mute);
          font-weight: 700;
          white-space: nowrap;
        }
        .cs-trusted-logos {
          display: flex;
          align-items: center;
          gap: clamp(24px, 4vw, 56px);
          flex-wrap: wrap;
          flex: 1;
        }
        .cs-trusted-logo {
          position: relative;
          width: clamp(110px, 14vw, 150px);
          height: 36px;
          opacity: 0.55;
          transition: opacity 0.25s ease, transform 0.25s ease;
          filter: grayscale(40%);
        }
        .cs-trusted-logo:hover {
          opacity: 1;
          transform: translateY(-1px);
          filter: grayscale(0%);
        }

        /* ========== LISTING ========== */
        .cs-listing {
          padding: clamp(64px, 9vw, 112px) clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px);
        }
        .cs-listing-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: clamp(40px, 6vw, 64px);
        }

        /* Featured card */
        .cs-featured {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
          gap: 0;
          background: #fff;
          border: 1px solid var(--cs-border);
          border-radius: 28px;
          overflow: hidden;
          text-decoration: none;
          color: var(--cs-text);
          transition:
            transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
            border-color 0.3s ease,
            box-shadow 0.4s ease;
          box-shadow: 0 1px 2px rgba(10, 14, 12, 0.04);
        }
        .cs-featured:hover {
          transform: translateY(-4px);
          border-color: var(--cs-green-deep);
          box-shadow: 0 32px 64px -28px rgba(6, 95, 70, 0.25);
        }
        .cs-featured-media {
          position: relative;
          min-height: 440px;
          background: linear-gradient(135deg, #e9ede5, #d8e0d3);
          overflow: hidden;
        }
        .cs-featured-media img {
          transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .cs-featured:hover .cs-featured-media img {
          transform: scale(1.04);
        }
        .cs-featured-media-fallback {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 30% 30%, rgba(18, 163, 125, 0.2), transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(124, 92, 252, 0.15), transparent 50%),
            #f3f2ed;
        }
        .cs-featured-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--cs-green-deep);
          box-shadow: 0 4px 16px rgba(10, 14, 12, 0.08);
        }
        .cs-featured-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--cs-green);
          box-shadow: 0 0 0 3px rgba(18, 163, 125, 0.2);
        }
        .cs-featured-body {
          padding: clamp(32px, 4vw, 56px);
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
        }
        .cs-featured-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .cs-featured-logo {
          position: relative;
          width: 140px;
          height: 40px;
        }
        .cs-featured-company {
          font-weight: 800;
          font-size: 20px;
          color: var(--cs-text);
        }
        .cs-featured-industry {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10px;
          color: var(--cs-mute);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 700;
        }
        .cs-featured-title {
          font-weight: 800;
          font-size: clamp(22px, 2.4vw, 30px);
          line-height: 1.35;
          letter-spacing: -0.02em;
          margin: 0;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        .cs-featured-metric-row {
          display: flex;
          align-items: baseline;
          gap: 16px;
          padding: 16px 0;
          border-top: 1px solid var(--cs-border);
          border-bottom: 1px solid var(--cs-border);
        }
        .cs-featured-metric {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-weight: 800;
          font-size: clamp(40px, 5.2vw, 60px);
          color: var(--cs-green-deep);
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .cs-featured-metric-label {
          font-size: 13px;
          color: var(--cs-sub);
          line-height: 1.5;
          font-weight: 600;
        }
        .cs-featured-quote {
          margin: 0;
          padding: 0;
          font-size: 15px;
          line-height: 1.85;
          color: var(--cs-sub);
          font-style: normal;
          position: relative;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
        }
        .cs-featured-quote-mark {
          font-family: 'Plus Jakarta Sans', Georgia, serif;
          font-size: 36px;
          line-height: 0.8;
          color: var(--cs-green);
          font-weight: 800;
          margin-right: 4px;
          vertical-align: -6px;
        }
        .cs-featured-quote-cite {
          display: block;
          margin-top: 10px;
          font-size: 12px;
          color: var(--cs-mute);
          font-style: normal;
          font-weight: 600;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          letter-spacing: 0.04em;
        }
        .cs-featured-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 12px;
        }
        .cs-featured-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 13px;
          color: var(--cs-green-deep);
          letter-spacing: 0.04em;
          font-weight: 700;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(18, 163, 125, 0.06);
          transition: all 0.25s ease;
          min-height: 44px;
        }
        .cs-featured:hover .cs-featured-cta {
          background: var(--cs-green-deep);
          color: #fff;
        }
        .cs-featured-cta svg {
          transition: transform 0.25s ease;
        }
        .cs-featured:hover .cs-featured-cta svg {
          transform: translateX(3px);
        }

        /* Grid */
        .cs-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(20px, 2.5vw, 28px);
        }
        .cs-card {
          background: #fff;
          border: 1px solid var(--cs-border);
          border-radius: 22px;
          overflow: hidden;
          text-decoration: none;
          color: var(--cs-text);
          display: flex;
          flex-direction: column;
          transition:
            transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
            border-color 0.3s ease,
            box-shadow 0.4s ease;
          box-shadow: 0 1px 2px rgba(10, 14, 12, 0.04);
          min-height: 0;
        }
        .cs-card:hover {
          transform: translateY(-3px);
          border-color: var(--cs-green-deep);
          box-shadow: 0 24px 48px -24px rgba(6, 95, 70, 0.2);
        }
        .cs-card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          background: linear-gradient(135deg, #eef1fb, #e3e8f5);
          overflow: hidden;
        }
        .cs-card-media img {
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .cs-card:hover .cs-card-media img {
          transform: scale(1.05);
        }
        .cs-card-media-fallback {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 30% 30%, rgba(18, 163, 125, 0.18), transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(124, 92, 252, 0.12), transparent 50%),
            #f3f2ed;
        }
        .cs-card-industry-tag {
          position: absolute;
          top: 16px;
          left: 16px;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--cs-sub);
          box-shadow: 0 2px 8px rgba(10, 14, 12, 0.06);
        }
        .cs-card-body {
          padding: clamp(20px, 2.5vw, 28px);
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
          min-width: 0;
        }
        .cs-card-head {
          display: flex;
          align-items: center;
          min-height: 32px;
        }
        .cs-card-logo {
          position: relative;
          width: 110px;
          height: 32px;
        }
        .cs-card-company {
          font-weight: 800;
          font-size: 16px;
          color: var(--cs-text);
        }
        .cs-card-title {
          font-weight: 800;
          font-size: clamp(17px, 2vw, 20px);
          line-height: 1.4;
          letter-spacing: -0.015em;
          margin: 0;
          color: var(--cs-text);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        .cs-card-metric-row {
          display: flex;
          align-items: baseline;
          gap: 12px;
          padding: 12px 0;
          border-top: 1px solid var(--cs-border);
          border-bottom: 1px solid var(--cs-border);
        }
        .cs-card-metric {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-weight: 800;
          font-size: clamp(28px, 3.4vw, 40px);
          color: var(--cs-green-deep);
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .cs-card-metric-label {
          font-size: 12px;
          color: var(--cs-sub);
          line-height: 1.5;
          font-weight: 600;
        }
        .cs-card-quote {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.75;
          color: var(--cs-sub);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
        .cs-card-quote-mark {
          font-family: 'Plus Jakarta Sans', Georgia, serif;
          font-size: 22px;
          line-height: 0;
          color: var(--cs-green);
          font-weight: 800;
          margin-right: 2px;
          vertical-align: -4px;
        }
        .cs-card-desc {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.75;
          color: var(--cs-sub);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
        .cs-card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 8px;
        }
        .cs-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          color: var(--cs-green-deep);
          letter-spacing: 0.04em;
          font-weight: 700;
          padding: 8px 0;
          transition: gap 0.25s ease;
          min-height: 44px;
          align-self: center;
        }
        .cs-card:hover .cs-card-cta {
          gap: 10px;
        }
        .cs-card-cta svg {
          transition: transform 0.25s ease;
        }
        .cs-card:hover .cs-card-cta svg {
          transform: translateX(2px);
        }

        /* Tags shared */
        .cs-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .cs-tag {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10px;
          padding: 4px 8px;
          border: 1px solid var(--cs-border);
          border-radius: 6px;
          color: var(--cs-sub);
          letter-spacing: 0.03em;
          background: #fafaf7;
          font-weight: 600;
        }

        /* ========== CLOSING CTA ========== */
        .cs-cta {
          padding: clamp(80px, 12vw, 140px) clamp(20px, 4vw, 48px);
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(18, 163, 125, 0.08), transparent 60%),
            linear-gradient(180deg, #f5f5f0 0%, #fafaf7 100%);
          border-top: 1px solid var(--cs-border);
          position: relative;
          overflow: hidden;
        }
        .cs-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(6, 95, 70, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 95, 70, 0.04) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
          pointer-events: none;
        }
        .cs-cta-inner {
          position: relative;
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }
        .cs-cta-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--cs-green-deep);
          text-transform: uppercase;
          margin-bottom: 24px;
          font-weight: 700;
        }
        .cs-cta-eyebrow .cs-eyebrow-dash {
          background: linear-gradient(90deg, var(--cs-green), transparent);
        }
        .cs-cta-h {
          font-weight: 900;
          font-size: clamp(28px, 5vw, 52px);
          line-height: 1.2;
          letter-spacing: -0.03em;
          margin: 0 0 20px;
          word-break: keep-all;
        }
        .cs-cta-h em {
          font-style: normal;
          background: linear-gradient(135deg, var(--cs-green-deep), var(--cs-green));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cs-cta-p {
          font-size: clamp(15px, 2vw, 17px);
          line-height: 1.85;
          color: var(--cs-sub);
          margin: 0 0 36px;
        }
        .cs-cta-buttons {
          display: inline-flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .cs-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          cursor: pointer;
          transition:
            transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 0.25s ease,
            background 0.2s ease,
            border-color 0.2s ease;
          min-height: 52px;
          border: none;
          font-family: inherit;
          -webkit-tap-highlight-color: transparent;
        }
        .cs-btn-primary {
          background: linear-gradient(135deg, var(--cs-green-deep), var(--cs-green));
          color: #fff;
          box-shadow:
            0 6px 20px rgba(6, 95, 70, 0.28),
            0 1px 0 rgba(255, 255, 255, 0.18) inset;
          letter-spacing: 0.01em;
        }
        .cs-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow:
            0 12px 32px rgba(6, 95, 70, 0.34),
            0 1px 0 rgba(255, 255, 255, 0.22) inset;
        }
        .cs-btn-primary svg {
          transition: transform 0.25s ease;
        }
        .cs-btn-primary:hover svg {
          transform: translateX(3px);
        }
        .cs-btn-ghost {
          background: #fff;
          color: var(--cs-text);
          border: 1.5px solid var(--cs-border-2);
        }
        .cs-btn-ghost:hover {
          border-color: var(--cs-green-deep);
          color: var(--cs-green-deep);
          background: rgba(18, 163, 125, 0.04);
          transform: translateY(-1px);
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 1024px) {
          .cs-featured {
            grid-template-columns: 1fr;
          }
          .cs-featured-media {
            min-height: 0;
            aspect-ratio: 16 / 9;
          }
        }
        @media (max-width: 720px) {
          .cs-hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px 0;
            padding: 24px 0;
          }
          .cs-stat {
            padding: 0 16px;
          }
          .cs-stat:nth-child(3) {
            padding-left: 0;
          }
          .cs-stat:nth-child(3)::before {
            display: none;
          }
          .cs-grid {
            grid-template-columns: 1fr;
          }
          .cs-trusted-inner {
            justify-content: center;
          }
          .cs-trusted-logos {
            justify-content: center;
            gap: 32px;
          }
          .cs-cta-buttons {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
          }
          .cs-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
