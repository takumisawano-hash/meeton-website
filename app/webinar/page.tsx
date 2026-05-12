import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FAQJsonLd from '../components/FAQJsonLd'
import {
  getCurrentWebinar,
  getUpcomingWebinars,
  getPastWebinars,
} from '../lib/webinars-schedule'
import WebinarCountdown from './components/WebinarCountdown'
import { webinarCss } from './components/webinarStyles'

/**
 * /webinar/ — Index LP. 3-month overview of the monthly webinar series.
 *
 * Structure:
 *   1. Hero (dot-grid + radial gradient)
 *   2. Featured = next upcoming webinar (big card)
 *   3. Upcoming pair = next 2 after that (small cards)
 *   4. About this series (3 columns — thought leadership positioning)
 *   5. On-Demand library (past webinars, hidden if empty)
 *   6. FAQ + FAQPage JSON-LD
 */

export const metadata: Metadata = {
  title: '月次ラーニング型ウェビナー | Meeton ai',
  description:
    'リードはあるけど商談化に困っている B2B 企業向けの thought leadership ウェビナー。毎月 1 回 Live で開催。Speed to Lead・ナーチャリング・パイプライン損失など、構造的な課題を分解します。',
  alternates: { canonical: '/webinar/' },
  openGraph: {
    title: '月次ラーニング型ウェビナー',
    description:
      'リードを商談化に変える、毎月のラーニング。Meeton ai 主催の thought leadership ウェビナー。',
    url: 'https://dynameet.ai/webinar/',
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

const INDEX_FAQ = [
  {
    question: 'このウェビナーは誰向けですか？',
    answer:
      'リードはあるのに商談化に伸び悩む B2B 企業のマーケティングマネージャー、インサイドセールスマネージャー、CRO・営業企画責任者の方々を想定しています。リード獲得後の "見えない損失" を構造で捉えたい方に最適です。',
  },
  {
    question: '参加費用はかかりますか？',
    answer:
      '無料です。事前登録のみでご参加いただけます。営業色のあるピッチではなく、業界統計と実装フレームを中心とした学習用コンテンツです。',
  },
  {
    question: '当日参加できない場合、録画はもらえますか？',
    answer:
      'はい。ご登録いただいた方には開催後 1 週間以内に録画リンクをメールでお送りします。当日参加できなくても登録だけしておけば後日視聴できます。',
  },
  {
    question: 'Q&A セッションはありますか？',
    answer:
      '毎回 10 - 15 分の Live Q&A を設けています。事前登録時にも質問を書き込んでいただけます。匿名での質問も歓迎です。',
  },
  {
    question: '参加方法を教えてください。',
    answer:
      'Zoom Webinar で開催します。開催日前日にメールで Zoom リンクをお送りします。PC・スマホどちらからでも参加可能です。',
  },
  {
    question: '次回以降のトピックはどう決まりますか？',
    answer:
      'B2B マーケティング・インサイドセールスの現場で実際にご相談を受ける構造課題から、月次でトピックを選定しています。リクエストがあれば登録フォームからお寄せください。',
  },
]

export default function WebinarIndexPage() {
  const featured = getCurrentWebinar()
  const upcoming = getUpcomingWebinars().slice(1, 3)
  const past = getPastWebinars()
  const pageUrl = 'https://dynameet.ai/webinar/'

  return (
    <div className="wb-root">
      <FAQJsonLd items={INDEX_FAQ} pageUrl={pageUrl} />
      <Nav variant="light" />

      {/* ── HERO ── */}
      <section className="wb-hero">
        <div className="wb-hero-grid" aria-hidden />
        <div className="wb-hero-inner">
          <div className="wb-eyebrow">
            <span className="wb-eyebrow-dash" />
            Monthly Live Webinar
            <span className="wb-eyebrow-tag">毎月 第 3 木曜 14:00 JST</span>
          </div>
          <h1 className="wb-hero-h1">
            リードを<em>商談化</em>に変える、<br />
            毎月のラーニング
          </h1>
          <p className="wb-hero-sub">
            「リードはあるのに商談化しない」という B2B の構造課題を、業界統計と
            実装フレームで分解する thought leadership ウェビナー。
            営業色のないラーニング設計です。
          </p>

          {featured && (
            <>
              <div className="wb-hero-ctas">
                <Link
                  href={`/webinar/${featured.slug}/`}
                  className="wb-btn wb-btn-primary"
                >
                  次回の席を確保する
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <a href="#about" className="wb-btn wb-btn-ghost">
                  シリーズについて
                </a>
              </div>
              <p
                style={{
                  marginTop: 18, fontSize: 13, color: 'var(--w-mute)',
                  fontWeight: 600, letterSpacing: 0.01,
                }}
              >
                無料 · 録画送付 · Live Q&amp;A
              </p>
            </>
          )}
        </div>
      </section>

      {/* ── FEATURED (next upcoming) ── */}
      {featured && (
        <section className="wb-section">
          <div className="wb-section-inner">
            <div className="wb-section-head">
              <div className="wb-section-eyebrow">
                <span className="wb-eyebrow-dash" />
                Next Webinar
              </div>
              <h2 className="wb-h2">
                次回開催の<em>テーマ</em>
              </h2>
            </div>

            <div className="wb-featured">
              <div className="wb-featured-glow" aria-hidden />
              <div className="wb-featured-inner">
                <div>
                  <div className="wb-featured-badge">
                    <span className="wb-featured-badge-dot" />
                    Featured · Next Up
                  </div>
                  <div className="wb-featured-date">{featured.dateLabel}</div>
                  <div style={{ marginBottom: 12 }}>
                    <WebinarCountdown date={featured.date} />
                  </div>
                  <h3 className="wb-featured-title">
                    {featured.title}
                  </h3>
                  <p className="wb-featured-subtitle">{featured.subtitle}</p>

                  <ul className="wb-featured-learnings">
                    {featured.learnings.slice(0, 3).map((l, i) => (
                      <li key={i}>
                        <span className="wb-check" aria-hidden>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="wb-featured-cta-row">
                    <Link
                      href={`/webinar/${featured.slug}/`}
                      className="wb-btn wb-btn-primary"
                    >
                      席を確保する
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link href={`/webinar/${featured.slug}/`} className="wb-btn wb-btn-ghost">
                      アジェンダを見る
                    </Link>
                  </div>
                </div>

                <aside className="wb-featured-meta-col">
                  <div className="wb-featured-meta-row">
                    <span className="wb-featured-meta-icon" aria-hidden>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </span>
                    <div>
                      <div className="wb-featured-meta-l">Date</div>
                      <div className="wb-featured-meta-v">{featured.dateLabel}</div>
                    </div>
                  </div>
                  <div className="wb-featured-meta-row">
                    <span className="wb-featured-meta-icon" aria-hidden>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </span>
                    <div>
                      <div className="wb-featured-meta-l">Duration</div>
                      <div className="wb-featured-meta-v">30 分 (Q&A 含む)</div>
                    </div>
                  </div>
                  <div className="wb-featured-meta-row">
                    <span className="wb-featured-meta-icon" aria-hidden>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 7l-7 5 7 5V7z" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </svg>
                    </span>
                    <div>
                      <div className="wb-featured-meta-l">Format</div>
                      <div className="wb-featured-meta-v">Zoom Webinar / 無料</div>
                    </div>
                  </div>
                  <div className="wb-featured-meta-row">
                    <span className="wb-featured-meta-icon" aria-hidden>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <div>
                      <div className="wb-featured-meta-l">Speaker</div>
                      <div className="wb-featured-meta-v">
                        {featured.speaker?.name || '澤野 拓実'}
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── UPCOMING PAIR ── */}
      {upcoming.length > 0 && (
        <section className="wb-section wb-section-alt">
          <div className="wb-section-inner">
            <div className="wb-section-head">
              <div className="wb-section-eyebrow">
                <span className="wb-eyebrow-dash" />
                Coming Up
              </div>
              <h2 className="wb-h2">
                これから<em>3 ヶ月</em>のラインナップ
              </h2>
              <p className="wb-section-sub">
                毎月 1 トピックずつ、構造で課題を分解します。事前にリマインダー登録しておくとリリース通知が届きます。
              </p>
            </div>

            <div className="wb-upcoming-grid">
              {upcoming.map((w) => (
                <Link
                  key={w.slug}
                  href={`/webinar/${w.slug}/`}
                  className="wb-upcoming-card"
                >
                  <div className="wb-upcoming-date">{w.dateLabel}</div>
                  <h3 className="wb-upcoming-title">{w.title}</h3>
                  <p className="wb-upcoming-subtitle">{w.subtitle}</p>
                  <span className="wb-upcoming-cta">
                    詳細 + リマインダー登録
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT SERIES (3-col thought leadership) ── */}
      <section id="about" className="wb-section">
        <div className="wb-section-inner">
          <div className="wb-section-head">
            <div className="wb-section-eyebrow">
              <span className="wb-eyebrow-dash" />
              About This Series
            </div>
            <h2 className="wb-h2">
              なぜ "ラーニング型"<em>ウェビナー</em>なのか
            </h2>
            <p className="wb-section-sub">
              プロダクトピッチでも事例トークでもない。「リード→商談化」の構造を
              業界統計と実装フレームで掘り下げる、現場の意思決定者向けラーニングです。
            </p>
          </div>

          <div className="wb-about">
            <article className="wb-about-card">
              <div className="wb-about-num">01</div>
              <h3 className="wb-about-title">構造で課題を分解する</h3>
              <p className="wb-about-body">
                「リードはあるのに商談化しない」という曖昧な悩みを、
                Speed to Lead・ナーチャリング設計・初動アーキテクチャといった
                測れる単位まで分解。意思決定の前提を揃えます。
              </p>
            </article>
            <article className="wb-about-card">
              <div className="wb-about-num">02</div>
              <h3 className="wb-about-title">業界統計 × 実証データ</h3>
              <p className="wb-about-body">
                Harvard Business Review の Speed to Lead 古典研究から、
                Japan B2B 文脈での最新実証データまで。一次情報と二次情報を
                組み合わせ、エビデンスベースで議論します。
              </p>
            </article>
            <article className="wb-about-card">
              <div className="wb-about-num">03</div>
              <h3 className="wb-about-title">Live Q&A で持ち帰れる</h3>
              <p className="wb-about-body">
                毎回 10 - 15 分の Live Q&A。自社のリードジャーニーや組織体制に合わせて、
                どこから着手すべきかを個別にお返ししています。匿名質問も歓迎です。
              </p>
            </article>
          </div>

          <p
            style={{
              marginTop: 32,
              fontSize: 12.5,
              color: 'var(--w-mute)',
              fontWeight: 600,
              letterSpacing: 0.02,
            }}
          >
            主催: Meeton ai (DynaMeet 株式会社)
          </p>
        </div>
      </section>

      {/* ── ON-DEMAND LIBRARY (only when past >=1) ── */}
      {past.length > 0 && (
        <section className="wb-section wb-section-alt">
          <div className="wb-section-inner">
            <div className="wb-section-head">
              <div className="wb-section-eyebrow">
                <span className="wb-eyebrow-dash" />
                On-Demand Library
              </div>
              <h2 className="wb-h2">
                過去回の<em>録画ライブラリ</em>
              </h2>
              <p className="wb-section-sub">
                各回のキーフレームと Q&A をフルバージョンで視聴できます。
              </p>
            </div>

            <div className="wb-past-grid">
              {past.map((w) => (
                <Link
                  key={w.slug}
                  href={w.replayUrl || `/webinar/${w.slug}/`}
                  className="wb-past-card"
                >
                  <div className="wb-past-date">{w.dateLabel}</div>
                  <h3 className="wb-past-title">{w.title}</h3>
                  <span className="wb-past-cta">
                    録画を視聴
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="wb-section">
        <div className="wb-section-inner">
          <div className="wb-section-head">
            <div className="wb-section-eyebrow">
              <span className="wb-eyebrow-dash" />
              FAQ
            </div>
            <h2 className="wb-h2">
              よく頂く<em>質問</em>
            </h2>
          </div>

          <dl className="wb-faq">
            {INDEX_FAQ.map((f, i) => (
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

      {/* ── FOOTER CTA ── */}
      {featured && (
        <section className="wb-footer-cta">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="wb-section-eyebrow" style={{ justifyContent: 'center' }}>
              <span className="wb-eyebrow-dash" />
              Join Next Session
            </div>
            <h2 className="wb-footer-cta-h">
              次回 <em>{featured.title}</em>
            </h2>
            <p className="wb-footer-cta-p">{featured.dateLabel} 開催。事前登録は無料です。</p>
            <Link
              href={`/webinar/${featured.slug}/`}
              className="wb-btn wb-btn-primary"
            >
              席を確保する
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      <Footer variant="light" />

      <style>{webinarCss()}</style>
    </div>
  )
}
