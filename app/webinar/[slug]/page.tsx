import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import FAQJsonLd from '../../components/FAQJsonLd'
import {
  WEBINAR_SCHEDULE,
  findWebinar,
} from '../../lib/webinars-schedule'
import WebinarRegistrationForm from '../components/WebinarRegistrationForm'
import WebinarCountdown from '../components/WebinarCountdown'
import { webinarCss } from '../components/webinarStyles'

/**
 * /webinar/[slug]/ — Individual webinar registration LP.
 *
 * Pulls from WEBINAR_SCHEDULE (single source of truth). Sections:
 *   - Hero (date eyebrow + H1 + speaker card)
 *   - What you'll learn (2-col card grid)
 *   - Agenda (numbered with minute counter)
 *   - Registration (HubSpot embedded form, hidden context: webinarSlug/Date/Title)
 *   - Trust signals (open count + speaker LinkedIn)
 *   - FAQ (webinar-specific) + FAQPage JSON-LD
 *   - Event JSON-LD (schema.org/Event with VirtualLocation)
 *   - Footer CTA → /webinar/
 */

export const dynamicParams = false

export function generateStaticParams() {
  return WEBINAR_SCHEDULE.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const webinar = findWebinar(slug)
  if (!webinar) {
    return {
      title: 'Webinar Not Found',
      robots: { index: false, follow: false },
    }
  }
  return {
    title: `${webinar.title} | ${webinar.dateLabel} | Meeton ai ウェビナー`,
    description: webinar.description,
    alternates: { canonical: `/webinar/${webinar.slug}/` },
    openGraph: {
      title: webinar.title,
      description: webinar.description,
      url: `https://dynameet.ai/webinar/${webinar.slug}/`,
      siteName: 'Meeton ai',
      locale: 'ja_JP',
      type: 'website',
      images: webinar.thumbnailUrl
        ? [{ url: `https://dynameet.ai${webinar.thumbnailUrl}`, width: 1200, height: 630, alt: webinar.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: webinar.title,
      description: webinar.description,
      images: webinar.thumbnailUrl
        ? [`https://dynameet.ai${webinar.thumbnailUrl}`]
        : undefined,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

/**
 * Build common webinar-specific FAQ tailored to "what does THIS one cover?"
 * plus standard logistics. Different shape per webinar via dynamic merge.
 */
function buildFaq(webinar: ReturnType<typeof findWebinar>) {
  if (!webinar) return []
  return [
    {
      question: `この回で具体的に何を持って帰れますか？`,
      answer: webinar.learnings.join(' / '),
    },
    {
      question: '当日の中で売り込みされたりしますか？',
      answer:
        'ウェビナー中の 30 分は学習に集中いただける構成です。デモや個別営業のセクションを挟むことはありません。終了後、ご記入いただいた役職や事前質問内容を見て、こちらから個別にご連絡することがあります。電話やメールでのご連絡をご希望されない場合は、Q&A や登録時の質問欄でその旨を一言いただければ尊重いたします。',
    },
    {
      question: '当日参加できないんですが…',
      answer:
        '登録だけしておいてください。終了後 1 週間以内に録画リンクをメールでお送りします。スライドも一緒にお送りするので、社内共有にも使ってもらって構いません。',
    },
    {
      question: '質問はできますか？匿名でもいいですか？',
      answer:
        '毎回 10〜15 分は Q&A の時間にしています。登録フォームの質問欄に事前に書いておくこともできますし、Zoom 上の Q&A は匿名でも投げられます。社名を出したくない場合も気にせずどうぞ。',
    },
    {
      question: 'どうやって入るんですか？',
      answer:
        'Zoom Webinar で開催します。前日にメールで参加リンクをお送りするので、当日その時間にクリックするだけ。PC でもスマホでも入れます。',
    },
    {
      question: '競合や同業の人が参加してても大丈夫ですか？',
      answer:
        '気にせずどうぞ。特定の顧客名や機密データは扱わない構成にしてあります。',
    },
  ]
}

/**
 * Build full schema.org/Event JSON-LD. Includes VirtualLocation,
 * eventStatus, performer, organizer — required for Google's Event search
 * surface (rich results, "Upcoming events" carousel).
 */
function buildEventJsonLd(
  webinar: ReturnType<typeof findWebinar>,
  url: string
) {
  if (!webinar) return null
  const startDateIso = `${webinar.date}T14:00:00+09:00`
  const endDateIso = `${webinar.date}T14:30:00+09:00`
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: webinar.title,
    description: webinar.description,
    startDate: startDateIso,
    endDate: endDateIso,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url,
    },
    image: [
      webinar.thumbnailUrl
        ? `https://dynameet.ai${webinar.thumbnailUrl}`
        : 'https://dynameet.ai/og-image.png',
    ],
    organizer: {
      '@type': 'Organization',
      name: 'Meeton ai (DynaMeet 株式会社)',
      url: 'https://dynameet.ai/',
    },
    performer: {
      '@type': 'Person',
      name: webinar.speaker?.name || '澤野 拓実',
      jobTitle:
        webinar.speaker?.title || 'DynaMeet 株式会社 共同創業者 兼 CRO',
    },
    offers: {
      '@type': 'Offer',
      url,
      price: '0',
      priceCurrency: 'JPY',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    inLanguage: 'ja-JP',
    isAccessibleForFree: true,
  }
}

export default async function WebinarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const webinar = findWebinar(slug)
  if (!webinar) notFound()

  const pageUrl = `https://dynameet.ai/webinar/${webinar.slug}/`
  const faq = buildFaq(webinar)
  const eventLd = buildEventJsonLd(webinar, pageUrl)
  const speakerInitial = (webinar.speaker?.name || '澤').slice(0, 1)

  return (
    <div className="wb-root">
      <FAQJsonLd items={faq} pageUrl={pageUrl} />
      {eventLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
        />
      )}
      <Nav variant="light" />

      {/* ── HERO (split: copy left, registration form right — above-fold conversion) ── */}
      <section className="wb-hero">
        <div className="wb-hero-grid" aria-hidden />
        <div className="wb-hero-inner wb-hero-split">
          {/* LEFT: copy column */}
          <div>
            <div className="wb-eyebrow">
              <span className="wb-eyebrow-dash" />
              Live Webinar
              <span className="wb-eyebrow-tag">Meeton ai 主催</span>
            </div>

            <WebinarCountdown date={webinar.date} />

            <h1 className="wb-hero-h1">
              <em>{webinar.title}</em>
            </h1>
            <p className="wb-hero-sub">{webinar.subtitle}</p>

            {/* Meta strip — 1) what 2) when 3) format 4) who-for */}
            <div className="wb-meta-strip">
              <div className="wb-meta-strip-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>
                  <span className="wb-meta-strip-k">When</span>
                  <span className="wb-meta-strip-v">{webinar.dateLabel}</span>
                </span>
              </div>
              <div className="wb-meta-strip-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>
                  <span className="wb-meta-strip-k">Duration</span>
                  <span className="wb-meta-strip-v">30 分 · Q&amp;A 含む</span>
                </span>
              </div>
              <div className="wb-meta-strip-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
                <span>
                  <span className="wb-meta-strip-k">Format</span>
                  <span className="wb-meta-strip-v">Zoom Webinar / 無料</span>
                </span>
              </div>
              <div className="wb-meta-strip-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                  <circle cx="10" cy="7" r="4" />
                  <path d="M21 8v6M18 11h6" />
                </svg>
                <span>
                  <span className="wb-meta-strip-k">For</span>
                  <span className="wb-meta-strip-v">マーケ / IS / 営業企画</span>
                </span>
              </div>
            </div>

            {/* Speaker card */}
            {webinar.speaker && (
              <div className="wb-speaker-card">
                <div className="wb-speaker-avatar" aria-hidden>
                  {speakerInitial}
                </div>
                <div className="wb-speaker-info">
                  <div className="wb-speaker-name">
                    {webinar.speaker.name}
                    <a
                      href="https://www.linkedin.com/in/sawanotakumi/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${webinar.speaker.name} の LinkedIn`}
                      style={{
                        marginLeft: 8, color: 'var(--w-green-deep)',
                        display: 'inline-flex', verticalAlign: 'middle',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                      </svg>
                    </a>
                  </div>
                  <div className="wb-speaker-title">{webinar.speaker.title}</div>
                  <p className="wb-speaker-bio">{webinar.speaker.bio}</p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: registration form (above-fold on desktop, sticky-ish) */}
          <aside className="wb-hero-aside">
            <div id="register" className="wb-hero-form-card">
              <div className="wb-hero-form-eyebrow">
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--w-green)',
                }} aria-hidden />
                Free Registration
              </div>
              <h2 className="wb-hero-form-h">無料で申し込む</h2>
              <p className="wb-hero-form-sub">
                4 項目のみ・1 分で終わります。Zoom リンクは前日にメールで届きます。
                <br />
                <strong style={{ color: 'var(--w-text)' }}>
                  当日来られなくても、登録すれば録画とスライドが届きます。
                </strong>
              </p>
              <div className="wb-hero-form-trust-chips">
                <span className="wb-trust-chip">
                  <span className="wb-trust-chip-dot" aria-hidden /> 参加無料
                </span>
                <span className="wb-trust-chip">
                  <span className="wb-trust-chip-dot" aria-hidden /> 録画も届く
                </span>
                <span className="wb-trust-chip">
                  <span className="wb-trust-chip-dot" aria-hidden /> 質問は匿名 OK
                </span>
              </div>
              <WebinarRegistrationForm
                webinarSlug={webinar.slug}
                webinarDate={webinar.date}
                webinarTitle={webinar.title}
              />
            </div>
          </aside>
        </div>
      </section>

      {/* ── WHAT YOU'LL LEARN ── */}
      <section className="wb-section">
        <div className="wb-section-inner">
          <div className="wb-section-head">
            <div className="wb-section-eyebrow">
              <span className="wb-eyebrow-dash" />
              What You'll Learn
            </div>
            <h2 className="wb-h2">
              この 30 分で<em>持って帰れる</em>もの
            </h2>
            <p className="wb-section-sub">
              {webinar.subtitle}
            </p>
          </div>

          <div className="wb-learnings-grid">
            {webinar.learnings.map((l, i) => (
              <article key={i} className="wb-learning-card">
                <span className="wb-learning-icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <p className="wb-learning-text">{l}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGENDA ── */}
      <section className="wb-section wb-section-alt">
        <div className="wb-section-inner">
          <div className="wb-section-head">
            <div className="wb-section-eyebrow">
              <span className="wb-eyebrow-dash" />
              Agenda
            </div>
            <h2 className="wb-h2">
              30 分の<em>流れ</em>
            </h2>
            <p className="wb-section-sub">
              各パートの目安時間です。質問は途中でも投げ込めるので、聞きながら気になったところを書いておいてください。
            </p>
          </div>

          <ol className="wb-agenda">
            {webinar.agenda.map((a) => (
              <li key={a.topic} className="wb-agenda-row">
                <span className="wb-agenda-mins">{a.minutes} 分</span>
                <span className="wb-agenda-topic">{a.topic}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── REGISTRATION (secondary — for users who scrolled past hero form) ── */}
      <section id="register-bottom" className="wb-reg">
        <div className="wb-reg-inner">
          <div>
            <div className="wb-section-eyebrow">
              <span className="wb-eyebrow-dash" />
              Registration
            </div>
            <h2 className="wb-h2">
              参加を<em>申し込む</em>
            </h2>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.85,
                color: 'var(--w-sub)',
                marginBottom: 24,
              }}
            >
              {webinar.dateLabel}
              <br />
              30 分 (Q&amp;A 含む) / Zoom Webinar / 参加費無料
            </p>

            <div className="wb-reg-side">
              <div className="wb-reg-trust">
                <div className="wb-reg-trust-l">参加するメリット</div>
                <div className="wb-reg-trust-row">
                  <div className="wb-reg-trust-v">30<span style={{ fontSize: 12, marginLeft: 2 }}>分</span></div>
                  <div className="wb-reg-trust-k">MTG の合間に入る短さ、要点に絞った構成</div>
                </div>
                <div className="wb-reg-trust-row">
                  <div className="wb-reg-trust-v">録画</div>
                  <div className="wb-reg-trust-k">当日来られなくても後日メールで届きます</div>
                </div>
                <div className="wb-reg-trust-row">
                  <div className="wb-reg-trust-v">0<span style={{ fontSize: 12, marginLeft: 2 }}>円</span></div>
                  <div className="wb-reg-trust-k">参加・録画視聴いずれも無料</div>
                </div>
                <p style={{
                  marginTop: 14, fontSize: 12.5, lineHeight: 1.7,
                  color: 'var(--w-sub)',
                }}>
                  質問は匿名でも投げられます。社名や具体的な数字を出したくない場合もそのままどうぞ。
                </p>
              </div>
            </div>
          </div>

          <div className="wb-reg-card">
            <h3 className="wb-reg-card-h">参加登録フォーム</h3>
            <p className="wb-reg-card-sub">
              4 項目だけ、1 分で終わります。Zoom リンクは前日にメールで届きます。
            </p>
            <WebinarRegistrationForm
              webinarSlug={webinar.slug}
              webinarDate={webinar.date}
              webinarTitle={webinar.title}
              thanksHref={`/webinar/thanks/?slug=${encodeURIComponent(webinar.slug)}`}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="wb-section">
        <div className="wb-section-inner">
          <div className="wb-section-head">
            <div className="wb-section-eyebrow">
              <span className="wb-eyebrow-dash" />
              FAQ
            </div>
            <h2 className="wb-h2">
              申し込む前に<em>気になること</em>
            </h2>
          </div>

          <dl className="wb-faq">
            {faq.map((f, i) => (
              <div key={i} className="wb-faq-item">
                <dt className="wb-faq-q">
                  <span className="wb-faq-num">
                    Q{(i + 1).toString().padStart(2, '0')}
                  </span>
                  <span>{f.question}</span>
                </dt>
                <dd className="wb-faq-a">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── FOOTER CTA → INDEX ── */}
      <section className="wb-footer-cta">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="wb-section-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="wb-eyebrow-dash" />
            More Sessions
          </div>
          <h2 className="wb-footer-cta-h">
            来月以降の<em>テーマも見てみる</em>
          </h2>
          <p className="wb-footer-cta-p">
            3 ヶ月先まで公開しています。気になるテーマがあれば、今のうちに押さえておけます。
          </p>
          <Link href="/webinar/" className="wb-btn wb-btn-primary">
            ラインナップを見る
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer variant="light" />

      {/* Mobile-only sticky CTA — reappears after user scrolls past hero form */}
      <div className="wb-sticky-cta" role="complementary" aria-label="ウェビナー登録">
        <div className="wb-sticky-cta-info">
          <div className="wb-sticky-cta-l">{webinar.dateLabel.split(' ')[0]}</div>
          <div className="wb-sticky-cta-v">{webinar.title}</div>
        </div>
        <a href="#register" className="wb-btn wb-btn-primary">
          申し込む
        </a>
      </div>

      <style>{webinarCss()}</style>
    </div>
  )
}
