import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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
  title: '商談化に悩むあなたへ — 月1回30分のウェビナー | Meeton ai',
  description:
    '「リードは来てるのに商談にならない」を、現場の論点で分解する月1回30分のウェビナー。第3木曜14:00から。録画あり・無料。',
  alternates: { canonical: '/webinar/' },
  openGraph: {
    title: '商談化に悩むあなたへ — 月1回30分のウェビナー',
    description:
      '「リードは来てるのに商談にならない」を、現場の論点で分解する月1回30分のウェビナー。録画あり・無料。',
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
    question: 'どんな人が参加してますか？',
    answer:
      'マーケ・インサイドセールス・営業企画・CRO の方が多いです。「リードは取れてるけど商談化で詰まってる」「IS の現場が回ってない」と感じている、100 - 2000 名規模の B2B 企業の現場〜マネージャー層を想定しています。',
  },
  {
    question: '当日の中で売り込みされたりしますか？',
    answer:
      'ウェビナー中の 30 分は学習に集中いただける構成です。デモや個別営業のセクションを挟むことはありません。終了後、ご記入いただいた役職や事前質問内容を見て、こちらから個別にご連絡することがあります。電話やメールでのご連絡をご希望されない場合は、Q&A や登録時の質問欄でその旨を一言いただければ尊重いたします。',
  },
  {
    question: '当日参加できないんですが…',
    answer:
      '登録だけしておいてください。終了後 1 週間以内に録画リンクをメールでお送りします。スライドも一緒にお送りするので、社内で共有してもらって構いません。',
  },
  {
    question: '質問したいんですが、社名を出したくないです',
    answer:
      '匿名 OK です。登録フォームの質問欄に書いてもらえれば、当日こちらで読み上げて回答します。Zoom 上の Q&A も匿名で投げられます。',
  },
  {
    question: 'どうやって参加するんですか？',
    answer:
      'Zoom Webinar で開催します。前日にメールで参加リンクをお送りするので、当日その時間にクリックするだけ。PC でもスマホでも入れます。',
  },
  {
    question: '取り上げてほしいテーマがあるんですが',
    answer:
      '登録フォームの質問欄に書いてください。実際に複数の方から声が上がったテーマから、翌月以降の回を組んでいます。',
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
          {/* 2026-05-19: 外部レビュー指摘で見出しを「月1勉強会」感から
              「商談化ボトルネック診断」型に強化。受講動機を明確化。 */}
          <h1 className="wb-hero-h1">
            リードは来ているのに、<em>商談にならない</em>理由を<br />
            30 分で分解する
          </h1>
          <p className="wb-hero-sub">
            初動対応・フォロー・再訪対応のどこで落ちているかを 3 つの転換点に整理し、
            明日から改善できる打ち手を持ち帰る、月 1 回 30 分の無料ウェビナーです。
            録画あり・質問は匿名でも OK。
          </p>

          {featured && (
            <>
              <div className="wb-hero-ctas">
                <Link
                  href={`/webinar/${featured.slug}/`}
                  className="wb-btn wb-btn-primary"
                >
                  30 分で商談化のボトルネックを見つける
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <a href="#about" className="wb-btn wb-btn-ghost">
                  どんなウェビナーか見る
                </a>
              </div>
              <p
                style={{
                  marginTop: 18, fontSize: 13, color: 'var(--w-mute)',
                  fontWeight: 600, letterSpacing: 0.01,
                }}
              >
                参加無料 · 後日録画もお送りします · 質問は匿名でも OK
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
                次回、扱う<em>テーマ</em>
              </h2>
            </div>

            <div className="wb-featured">
              <div className="wb-featured-glow" aria-hidden />
              {featured.thumbnailUrl && (
                <div className="wb-featured-thumb">
                  <Image
                    src={featured.thumbnailUrl}
                    alt={featured.title}
                    width={1200}
                    height={630}
                    priority
                    sizes="(max-width: 1024px) 100vw, 1100px"
                  />
                </div>
              )}
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
                      参加を申し込む
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link href={`/webinar/${featured.slug}/`} className="wb-btn wb-btn-ghost">
                      30 分の中身を見る
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
                これから<em>3 ヶ月</em>のテーマ
              </h2>
              <p className="wb-section-sub">
                先のスケジュールも事前登録できます。気になる回があれば押さえておけば、リマインドと当日リンクが届きます。
              </p>
            </div>

            <div className="wb-upcoming-grid">
              {upcoming.map((w) => (
                <Link
                  key={w.slug}
                  href={`/webinar/${w.slug}/`}
                  className="wb-upcoming-card"
                >
                  {w.thumbnailUrl && (
                    <div className="wb-upcoming-thumb">
                      <Image
                        src={w.thumbnailUrl}
                        alt={w.title}
                        width={1200}
                        height={630}
                        sizes="(max-width: 720px) 100vw, 540px"
                      />
                    </div>
                  )}
                  <div className="wb-upcoming-body">
                    <div className="wb-upcoming-date">{w.dateLabel}</div>
                    <h3 className="wb-upcoming-title">{w.title}</h3>
                    <p className="wb-upcoming-subtitle">{w.subtitle}</p>
                    <span className="wb-upcoming-cta">
                      この回を詳しく見る
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT SERIES (3-col) ── */}
      <section id="about" className="wb-section">
        <div className="wb-section-inner">
          <div className="wb-section-head">
            <div className="wb-section-eyebrow">
              <span className="wb-eyebrow-dash" />
              About This Series
            </div>
            <h2 className="wb-h2">
              どんな<em>30 分</em>か
            </h2>
            <p className="wb-section-sub">
              プロダクト紹介でも自慢話でもありません。月 1 トピック、現場のマネージャー目線で
              「次に何をすればいいか」を持ち帰れる形にしてあります。
            </p>
          </div>

          <div className="wb-about">
            <article className="wb-about-card">
              <div className="wb-about-num">01</div>
              <h3 className="wb-about-title">月 1 トピックに絞る</h3>
              <p className="wb-about-body">
                毎月 1 つだけ、商談化に直結する論点を選んで深掘りします。
                範囲を広げすぎないので、30 分で「あ、そこ詰まってたな」と
                持ち帰れます。
              </p>
            </article>
            <article className="wb-about-card">
              <div className="wb-about-num">02</div>
              <h3 className="wb-about-title">営業 MTG の合間に滑り込める</h3>
              <p className="wb-about-body">
                第 3 木曜の 14:00 から 30 分だけ。MTG の前後に挟みやすい時間です。
                ご都合つかなければ録画とスライドが後日届くので、
                出張中でも夜の電車でも見られます。
              </p>
            </article>
            <article className="wb-about-card">
              <div className="wb-about-num">03</div>
              <h3 className="wb-about-title">質問は匿名で OK</h3>
              <p className="wb-about-body">
                毎回 10〜15 分は Q&A の時間。自社の数字や社内事情込みで
                相談してもらって構いません。社名を出したくなければ匿名で投げてください。
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
                過去回の<em>録画</em>
              </h2>
              <p className="wb-section-sub">
                以前の回も Q&A 込みでフルで見られます。気になるテーマから。
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
              参加前の<em>気になること</em>
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
            <p className="wb-footer-cta-p">{featured.dateLabel} 開催。参加は無料・録画も届きます。</p>
            <Link
              href={`/webinar/${featured.slug}/`}
              className="wb-btn wb-btn-primary"
            >
              参加を申し込む
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
