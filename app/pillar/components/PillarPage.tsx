import Link from 'next/link'
import type { ReactNode } from 'react'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import FAQJsonLd from '../../components/FAQJsonLd'
import DemoBookingButton from '../../components/DemoBookingButton'
import DocRequestButton from '../../components/DocRequestButton'
import type { BlogPost } from '@/app/lib/notion'

/**
 * Pillar page shared layout.
 *
 * 構造は SEO の "hub & spoke" モデルに沿って固定:
 *   1. Hero (kicker + 定義含む h1 + sub)
 *   2. TL;DR (200字前後の citation-ready 定義 block)
 *   3. Why it matters / Why now (3-card)
 *   4. Stages / Strategies (5-step framework)
 *   5. Meeton ai's role (4-module bridge)
 *   6. Cluster article index (grid grouped by sub-topic)
 *   7. FAQ (FAQPage JSON-LD)
 *   8. Closing CTA
 *
 * グローは Hero/CTA とも stacked radial-gradient で焼き込み済み。
 * filter:blur を使わず GPU が安いまま 60fps を維持する。
 */
export type PillarStage = {
  /** 1-indexed step number (01, 02, ...) */
  num: string
  /** Short stage label (e.g. "Awareness") */
  label: string
  /** Japanese title for the stage */
  title: string
  /** 1-2 sentence explanation */
  body: string
  /** Optional outbound link with label (e.g. /features/ai-chat) */
  link?: { href: string; label: string }
}

export type PillarFaq = {
  question: string
  answer: string
}

export type PillarClusterGroup = {
  /** Sub-topic label rendered as the group heading */
  label: string
  /** Posts that belong to this sub-topic */
  posts: BlogPost[]
}

export type PillarPageProps = {
  /** Page URL slug under /pillar/ (e.g. "lead-generation") */
  slug: string
  /** Kicker shown above hero h1 */
  kicker: string
  /** Hero h1 — split highlight via {highlight} */
  heroTitle: ReactNode
  /** Hero subtitle (lead paragraph under h1) */
  heroSub: string
  /** Target head-term keywords listed as chips below the hero */
  headTerms: string[]
  /** 200-word citation-ready definition for TL;DR block */
  tldrTitle: string
  tldrBody: string
  /** 3 "why it matters" cards */
  whyMatters: { title: string; body: string }[]
  /** 5-stage framework section heading */
  stagesHeading: string
  stagesIntro: string
  stages: PillarStage[]
  /** Meeton ai integration / approach section */
  approachHeading: string
  approachIntro: string
  approachItems: { title: string; body: string; href: string; cta: string }[]
  /** Cluster article index (grouped by sub-topic) */
  clusterHeading: string
  clusterIntro: string
  clusterGroups: PillarClusterGroup[]
  /** Total count of cluster articles (for sub-headline) */
  clusterCount: number
  /** FAQ block */
  faqHeading: string
  faq: PillarFaq[]
  /** Closing CTA */
  ctaHeading: ReactNode
  ctaBody: string
  /** utm_campaign for primary CTA */
  utmCampaign: string
}

function formatDate(d: string): string {
  if (!d) return ''
  try {
    return new Date(d).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}

export default function PillarPage(props: PillarPageProps) {
  const pageUrl = `https://dynameet.ai/pillar/${props.slug}/`

  return (
    <div className="pl-root">
      <FAQJsonLd items={props.faq} pageUrl={pageUrl} />
      <Nav variant="light" />

      {/* HERO */}
      <section className="pl-hero">
        <div className="pl-hero-grid" aria-hidden />
        <div className="pl-hero-inner">
          <div className="pl-eyebrow">
            <span className="pl-eyebrow-dash" />
            {props.kicker}
            <span className="pl-eyebrow-count">PILLAR</span>
          </div>
          <h1 className="pl-hero-h1">{props.heroTitle}</h1>
          <p className="pl-hero-sub">{props.heroSub}</p>

          <div className="pl-headterms">
            <span className="pl-headterms-label">対象クエリ</span>
            {props.headTerms.map((t) => (
              <span key={t} className="pl-chip">
                {t}
              </span>
            ))}
          </div>

          <div className="pl-hero-cta">
            <DemoBookingButton
              className="pl-btn pl-btn-primary"
              utmCampaign={props.utmCampaign}
            >
              30分デモを予約する
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </DemoBookingButton>
            <a href="#cluster" className="pl-btn pl-btn-ghost">
              関連記事を読む
            </a>
          </div>
        </div>
      </section>

      {/* TL;DR */}
      <section className="pl-tldr">
        <div className="pl-tldr-inner">
          <div className="pl-tldr-card">
            <div className="pl-tldr-tag">TL;DR</div>
            <h2 className="pl-tldr-h">{props.tldrTitle}</h2>
            <p className="pl-tldr-body">{props.tldrBody}</p>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="pl-section pl-why">
        <div className="pl-section-inner">
          <div className="pl-section-head">
            <div className="pl-section-eyebrow">
              <span className="pl-eyebrow-dash" />
              Why it matters
            </div>
            <h2 className="pl-section-h">なぜ今、このテーマが重要か</h2>
          </div>
          <div className="pl-why-grid">
            {props.whyMatters.map((w, i) => (
              <div key={i} className="pl-why-card">
                <div className="pl-why-num">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="pl-why-card-h">{w.title}</h3>
                <p className="pl-why-card-body">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAGES / STRATEGIES */}
      <section className="pl-section pl-stages">
        <div className="pl-section-inner">
          <div className="pl-section-head">
            <div className="pl-section-eyebrow">
              <span className="pl-eyebrow-dash" />
              Framework
            </div>
            <h2 className="pl-section-h">{props.stagesHeading}</h2>
            <p className="pl-section-sub">{props.stagesIntro}</p>
          </div>

          <div className="pl-stages-track">
            {props.stages.map((s, i) => (
              <div key={i} className="pl-stage">
                <div className="pl-stage-rail">
                  <div className="pl-stage-num">{s.num}</div>
                  {i !== props.stages.length - 1 && (
                    <div className="pl-stage-line" aria-hidden />
                  )}
                </div>
                <div className="pl-stage-body">
                  <div className="pl-stage-label">{s.label}</div>
                  <h3 className="pl-stage-h">{s.title}</h3>
                  <p className="pl-stage-p">{s.body}</p>
                  {s.link && (
                    <Link href={s.link.href} className="pl-stage-link">
                      {s.link.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEETON AI APPROACH */}
      <section className="pl-section pl-approach">
        <div className="pl-section-inner">
          <div className="pl-section-head">
            <div className="pl-section-eyebrow">
              <span className="pl-eyebrow-dash" />
              Meeton ai's role
            </div>
            <h2 className="pl-section-h">{props.approachHeading}</h2>
            <p className="pl-section-sub">{props.approachIntro}</p>
          </div>
          <div className="pl-approach-grid">
            {props.approachItems.map((a, i) => (
              <Link key={i} href={a.href} className="pl-approach-card">
                <h3 className="pl-approach-h">{a.title}</h3>
                <p className="pl-approach-body">{a.body}</p>
                <span className="pl-approach-cta">
                  {a.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CLUSTER ARTICLES */}
      <section className="pl-section pl-cluster" id="cluster">
        <div className="pl-section-inner">
          <div className="pl-section-head">
            <div className="pl-section-eyebrow">
              <span className="pl-eyebrow-dash" />
              Cluster articles
              <span className="pl-eyebrow-count">
                {props.clusterCount.toString().padStart(2, '0')}
              </span>
            </div>
            <h2 className="pl-section-h">{props.clusterHeading}</h2>
            <p className="pl-section-sub">{props.clusterIntro}</p>
          </div>

          {props.clusterGroups.length === 0 ? (
            <p className="pl-cluster-empty">
              関連記事は順次追加予定です。最新の記事は{' '}
              <Link href="/blog/" className="pl-inline-link">
                ブログ一覧
              </Link>
              {' '}からご覧ください。
            </p>
          ) : (
            <div className="pl-cluster-groups">
              {props.clusterGroups.map((g, gi) => (
                <div key={gi} className="pl-cluster-group">
                  <div className="pl-cluster-group-head">
                    <h3 className="pl-cluster-group-h">{g.label}</h3>
                    <span className="pl-cluster-group-count">
                      {g.posts.length} 記事
                    </span>
                  </div>
                  <div className="pl-cluster-grid">
                    {g.posts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}/`}
                        className="pl-post-card"
                      >
                        <div className="pl-post-card-body">
                          {post.category && (
                            <div className="pl-post-category">
                              {post.category}
                            </div>
                          )}
                          <h4 className="pl-post-title">{post.title}</h4>
                          {post.description && (
                            <p className="pl-post-desc">{post.description}</p>
                          )}
                          <div className="pl-post-footer">
                            <span className="pl-post-date">
                              {formatDate(post.publishedDate)}
                            </span>
                            <span className="pl-post-cta">
                              Read
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M13 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="pl-section pl-faq">
        <div className="pl-section-inner pl-faq-inner">
          <div className="pl-section-head">
            <div className="pl-section-eyebrow">
              <span className="pl-eyebrow-dash" />
              FAQ
            </div>
            <h2 className="pl-section-h">{props.faqHeading}</h2>
          </div>
          <div className="pl-faq-list">
            {props.faq.map((q, i) => (
              <details key={i} className="pl-faq-item">
                <summary className="pl-faq-q">
                  <span className="pl-faq-q-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="pl-faq-q-text">{q.question}</span>
                  <span className="pl-faq-q-icon" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <div className="pl-faq-a">{q.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="pl-cta">
        <div className="pl-cta-inner">
          <div className="pl-cta-eyebrow">
            <span className="pl-eyebrow-dash" />
            Next step
          </div>
          <h2 className="pl-cta-h">{props.ctaHeading}</h2>
          <p className="pl-cta-p">{props.ctaBody}</p>
          <div className="pl-cta-buttons">
            <DemoBookingButton
              className="pl-btn pl-btn-primary"
              utmCampaign={props.utmCampaign}
            >
              30分デモを予約する
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </DemoBookingButton>
            <DocRequestButton className="pl-btn pl-btn-ghost">
              資料請求
            </DocRequestButton>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <style>{`
        .pl-root {
          background: #fafaf7;
          color: #0a0e0c;
          min-height: 100vh;
          --pl-green: #12a37d;
          --pl-green-deep: #065f46;
          --pl-purple: #7c5cfc;
          --pl-cyan: #0891b2;
          --pl-border: #e4e3dd;
          --pl-border-2: #d8d7d0;
          --pl-text: #0a0e0c;
          --pl-sub: #3d4541;
          --pl-mute: #82897f;
        }

        /* ===== HERO ===== */
        .pl-hero {
          position: relative;
          padding: clamp(120px, 16vw, 180px) clamp(20px, 4vw, 48px) clamp(56px, 8vw, 96px);
          border-bottom: 1px solid var(--pl-border);
          overflow: hidden;
          background:
            radial-gradient(circle 360px at calc(100% - 40px) -80px, rgba(18, 163, 125, 0.22), transparent 70%),
            radial-gradient(circle 320px at -60px calc(100% - 80px), rgba(124, 92, 252, 0.18), transparent 70%),
            radial-gradient(ellipse 80% 60% at 20% 0%, rgba(18, 163, 125, 0.06), transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 40%, rgba(8, 145, 178, 0.06), transparent 60%),
            #fafaf7;
        }
        .pl-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(6, 95, 70, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 95, 70, 0.045) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse at top, black 30%, transparent 80%);
          pointer-events: none;
        }
        .pl-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
        }
        .pl-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--pl-green-deep);
          text-transform: uppercase;
          margin-bottom: 24px;
          font-weight: 700;
        }
        .pl-eyebrow-dash {
          width: 24px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--pl-green));
        }
        .pl-eyebrow-count {
          color: var(--pl-mute);
          font-weight: 600;
          padding-left: 8px;
          border-left: 1px solid var(--pl-border);
        }
        .pl-hero-h1 {
          font-weight: 900;
          font-size: clamp(36px, 5.6vw, 76px);
          line-height: 1.08;
          letter-spacing: -0.04em;
          margin: 0 0 28px;
          word-break: keep-all;
        }
        .pl-hero-h1 em {
          font-style: normal;
          background: linear-gradient(135deg, var(--pl-green-deep) 0%, var(--pl-green) 60%, var(--pl-cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pl-hero-sub {
          font-size: clamp(15px, 2vw, 19px);
          line-height: 1.85;
          color: var(--pl-sub);
          max-width: 680px;
          margin: 0 0 36px;
        }
        .pl-headterms {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-bottom: 40px;
        }
        .pl-headterms-label {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--pl-mute);
          font-weight: 700;
          margin-right: 4px;
        }
        .pl-chip {
          padding: 6px 14px;
          border: 1px solid var(--pl-border);
          border-radius: 999px;
          font-size: 12px;
          color: var(--pl-sub);
          background: #fff;
          font-weight: 600;
        }
        .pl-hero-cta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* ===== TL;DR ===== */
        .pl-tldr {
          padding: clamp(48px, 7vw, 88px) clamp(20px, 4vw, 48px) 0;
        }
        .pl-tldr-inner {
          max-width: 980px;
          margin: 0 auto;
        }
        .pl-tldr-card {
          position: relative;
          padding: clamp(32px, 4vw, 56px);
          background: #fff;
          border: 1px solid var(--pl-border);
          border-radius: 24px;
          box-shadow: 0 1px 2px rgba(10, 14, 12, 0.04);
        }
        .pl-tldr-tag {
          display: inline-block;
          padding: 6px 12px;
          background: linear-gradient(135deg, var(--pl-green-deep), var(--pl-green));
          color: #fff;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.16em;
          border-radius: 6px;
          margin-bottom: 20px;
        }
        .pl-tldr-h {
          margin: 0 0 16px;
          font-size: clamp(22px, 3vw, 30px);
          line-height: 1.4;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--pl-text);
        }
        .pl-tldr-body {
          margin: 0;
          font-size: clamp(15px, 1.8vw, 17px);
          line-height: 1.95;
          color: var(--pl-sub);
        }

        /* ===== SECTION SHARED ===== */
        .pl-section {
          padding: clamp(64px, 9vw, 120px) clamp(20px, 4vw, 48px);
        }
        .pl-section-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .pl-section-head {
          margin-bottom: clamp(40px, 5vw, 64px);
          max-width: 760px;
        }
        .pl-section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--pl-green-deep);
          text-transform: uppercase;
          margin-bottom: 18px;
          font-weight: 700;
        }
        .pl-section-h {
          font-weight: 900;
          font-size: clamp(28px, 4vw, 48px);
          line-height: 1.18;
          letter-spacing: -0.03em;
          margin: 0 0 16px;
          word-break: keep-all;
        }
        .pl-section-sub {
          font-size: clamp(15px, 1.8vw, 17px);
          line-height: 1.85;
          color: var(--pl-sub);
          margin: 0;
        }

        /* ===== WHY IT MATTERS ===== */
        .pl-why-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(16px, 2vw, 24px);
        }
        .pl-why-card {
          padding: clamp(24px, 3vw, 36px);
          background: #fff;
          border: 1px solid var(--pl-border);
          border-radius: 20px;
          position: relative;
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .pl-why-card:hover {
          transform: translateY(-3px);
          border-color: var(--pl-green-deep);
          box-shadow: 0 20px 40px -24px rgba(6, 95, 70, 0.18);
        }
        .pl-why-num {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--pl-green-deep);
          background: rgba(18, 163, 125, 0.08);
          padding: 4px 10px;
          border-radius: 6px;
          display: inline-block;
          margin-bottom: 16px;
        }
        .pl-why-card-h {
          margin: 0 0 12px;
          font-size: clamp(17px, 2vw, 20px);
          font-weight: 800;
          line-height: 1.4;
          letter-spacing: -0.015em;
        }
        .pl-why-card-body {
          margin: 0;
          font-size: 14px;
          line-height: 1.8;
          color: var(--pl-sub);
        }

        /* ===== STAGES ===== */
        .pl-stages {
          background:
            radial-gradient(ellipse 80% 60% at 50% 10%, rgba(18, 163, 125, 0.05), transparent 60%),
            #fff;
          border-top: 1px solid var(--pl-border);
          border-bottom: 1px solid var(--pl-border);
        }
        .pl-stages-track {
          display: flex;
          flex-direction: column;
          gap: clamp(28px, 3vw, 40px);
        }
        .pl-stage {
          display: grid;
          grid-template-columns: 88px minmax(0, 1fr);
          gap: clamp(20px, 3vw, 32px);
        }
        .pl-stage-rail {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .pl-stage-num {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--pl-green-deep), var(--pl-green));
          color: #fff;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 18px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: -0.02em;
          box-shadow:
            0 6px 20px rgba(6, 95, 70, 0.22),
            0 1px 0 rgba(255, 255, 255, 0.2) inset;
          flex-shrink: 0;
        }
        .pl-stage-line {
          flex: 1;
          width: 2px;
          background: linear-gradient(180deg, rgba(18, 163, 125, 0.3), transparent);
          margin: 8px 0;
        }
        .pl-stage-body {
          padding: 4px 0 32px;
          min-width: 0;
        }
        .pl-stage-label {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--pl-green-deep);
          margin-bottom: 10px;
        }
        .pl-stage-h {
          margin: 0 0 12px;
          font-size: clamp(20px, 2.4vw, 26px);
          font-weight: 800;
          line-height: 1.35;
          letter-spacing: -0.02em;
        }
        .pl-stage-p {
          margin: 0 0 14px;
          font-size: 15px;
          line-height: 1.85;
          color: var(--pl-sub);
        }
        .pl-stage-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          color: var(--pl-green-deep);
          font-weight: 700;
          letter-spacing: 0.04em;
          text-decoration: none;
          padding: 8px 14px;
          background: rgba(18, 163, 125, 0.07);
          border-radius: 999px;
          transition: all 0.2s ease;
        }
        .pl-stage-link:hover {
          background: var(--pl-green-deep);
          color: #fff;
        }
        .pl-stage-link svg {
          transition: transform 0.2s ease;
        }
        .pl-stage-link:hover svg {
          transform: translateX(2px);
        }

        /* ===== APPROACH ===== */
        .pl-approach-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(16px, 2vw, 24px);
        }
        .pl-approach-card {
          display: block;
          padding: clamp(24px, 3vw, 36px);
          background: #fff;
          border: 1px solid var(--pl-border);
          border-radius: 20px;
          text-decoration: none;
          color: var(--pl-text);
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .pl-approach-card:hover {
          transform: translateY(-3px);
          border-color: var(--pl-green-deep);
          box-shadow: 0 20px 40px -24px rgba(6, 95, 70, 0.2);
        }
        .pl-approach-h {
          margin: 0 0 12px;
          font-size: clamp(18px, 2.1vw, 22px);
          font-weight: 800;
          line-height: 1.4;
          letter-spacing: -0.02em;
        }
        .pl-approach-body {
          margin: 0 0 16px;
          font-size: 14px;
          line-height: 1.8;
          color: var(--pl-sub);
        }
        .pl-approach-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          color: var(--pl-green-deep);
          font-weight: 700;
          letter-spacing: 0.04em;
        }
        .pl-approach-card:hover .pl-approach-cta svg {
          transform: translateX(3px);
        }
        .pl-approach-cta svg {
          transition: transform 0.25s ease;
        }

        /* ===== CLUSTER ===== */
        .pl-cluster {
          background: #fff;
          border-top: 1px solid var(--pl-border);
          border-bottom: 1px solid var(--pl-border);
        }
        .pl-cluster-empty {
          font-size: 15px;
          color: var(--pl-sub);
          padding: 28px;
          background: #fafaf7;
          border-radius: 16px;
          border: 1px dashed var(--pl-border-2);
        }
        .pl-inline-link {
          color: var(--pl-green-deep);
          text-decoration: underline;
          text-underline-offset: 3px;
          font-weight: 700;
        }
        .pl-cluster-groups {
          display: flex;
          flex-direction: column;
          gap: clamp(36px, 5vw, 56px);
        }
        .pl-cluster-group-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--pl-border);
          margin-bottom: 24px;
        }
        .pl-cluster-group-h {
          margin: 0;
          font-size: clamp(18px, 2.1vw, 22px);
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .pl-cluster-group-count {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          color: var(--pl-mute);
          letter-spacing: 0.08em;
          font-weight: 700;
        }
        .pl-cluster-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(16px, 2vw, 20px);
        }
        .pl-post-card {
          display: block;
          background: #fafaf7;
          border: 1px solid var(--pl-border);
          border-radius: 14px;
          overflow: hidden;
          text-decoration: none;
          color: var(--pl-text);
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .pl-post-card:hover {
          transform: translateY(-2px);
          border-color: var(--pl-green-deep);
          background: #fff;
          box-shadow: 0 16px 32px -20px rgba(6, 95, 70, 0.18);
        }
        .pl-post-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 180px;
        }
        .pl-post-category {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--pl-green-deep);
          font-weight: 700;
        }
        .pl-post-title {
          margin: 0;
          font-size: 15px;
          font-weight: 800;
          line-height: 1.5;
          letter-spacing: -0.01em;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        .pl-post-desc {
          margin: 0;
          font-size: 12.5px;
          line-height: 1.7;
          color: var(--pl-sub);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .pl-post-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 8px;
        }
        .pl-post-date {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          color: var(--pl-mute);
          letter-spacing: 0.04em;
          font-weight: 600;
        }
        .pl-post-cta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          color: var(--pl-green-deep);
          font-weight: 700;
          letter-spacing: 0.06em;
        }
        .pl-post-card:hover .pl-post-cta svg {
          transform: translateX(2px);
        }
        .pl-post-cta svg {
          transition: transform 0.2s ease;
        }

        /* ===== FAQ ===== */
        .pl-faq-inner {
          max-width: 880px;
        }
        .pl-faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pl-faq-item {
          background: #fff;
          border: 1px solid var(--pl-border);
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.25s ease;
        }
        .pl-faq-item[open] {
          border-color: var(--pl-green-deep);
          box-shadow: 0 12px 32px -20px rgba(6, 95, 70, 0.18);
        }
        .pl-faq-q {
          list-style: none;
          cursor: pointer;
          padding: clamp(20px, 2.5vw, 28px);
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr) 28px;
          gap: 16px;
          align-items: center;
        }
        .pl-faq-q::-webkit-details-marker {
          display: none;
        }
        .pl-faq-q-num {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: var(--pl-green-deep);
        }
        .pl-faq-q-text {
          font-size: clamp(15px, 1.8vw, 17px);
          font-weight: 700;
          line-height: 1.55;
          color: var(--pl-text);
          letter-spacing: -0.01em;
        }
        .pl-faq-q-icon {
          color: var(--pl-mute);
          transition: transform 0.25s ease, color 0.25s ease;
          display: inline-flex;
        }
        .pl-faq-item[open] .pl-faq-q-icon {
          transform: rotate(180deg);
          color: var(--pl-green-deep);
        }
        .pl-faq-a {
          padding: 0 clamp(20px, 2.5vw, 28px) clamp(20px, 2.5vw, 28px) calc(44px + 16px + clamp(20px, 2.5vw, 28px));
          font-size: 15px;
          line-height: 1.9;
          color: var(--pl-sub);
        }

        /* ===== CTA ===== */
        .pl-cta {
          padding: clamp(80px, 12vw, 140px) clamp(20px, 4vw, 48px);
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(18, 163, 125, 0.1), transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(124, 92, 252, 0.06), transparent 60%),
            linear-gradient(180deg, #f5f5f0 0%, #fafaf7 100%);
          border-top: 1px solid var(--pl-border);
        }
        .pl-cta::before {
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
        .pl-cta-inner {
          position: relative;
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }
        .pl-cta-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--pl-green-deep);
          text-transform: uppercase;
          margin-bottom: 24px;
          font-weight: 700;
        }
        .pl-cta-eyebrow .pl-eyebrow-dash {
          background: linear-gradient(90deg, var(--pl-green), transparent);
        }
        .pl-cta-h {
          font-weight: 900;
          font-size: clamp(28px, 5vw, 52px);
          line-height: 1.18;
          letter-spacing: -0.03em;
          margin: 0 0 20px;
          word-break: keep-all;
        }
        .pl-cta-h em {
          font-style: normal;
          background: linear-gradient(135deg, var(--pl-green-deep), var(--pl-green));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pl-cta-p {
          font-size: clamp(15px, 1.8vw, 17px);
          line-height: 1.85;
          color: var(--pl-sub);
          margin: 0 0 36px;
        }
        .pl-cta-buttons {
          display: inline-flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* ===== BUTTONS ===== */
        .pl-btn {
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
        .pl-btn-primary {
          background: linear-gradient(135deg, var(--pl-green-deep), var(--pl-green));
          color: #fff;
          box-shadow:
            0 6px 20px rgba(6, 95, 70, 0.28),
            0 1px 0 rgba(255, 255, 255, 0.18) inset;
          letter-spacing: 0.01em;
        }
        .pl-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow:
            0 12px 32px rgba(6, 95, 70, 0.34),
            0 1px 0 rgba(255, 255, 255, 0.22) inset;
        }
        .pl-btn-primary svg {
          transition: transform 0.25s ease;
        }
        .pl-btn-primary:hover svg {
          transform: translateX(3px);
        }
        .pl-btn-ghost {
          background: #fff;
          color: var(--pl-text);
          border: 1.5px solid var(--pl-border-2);
        }
        .pl-btn-ghost:hover {
          border-color: var(--pl-green-deep);
          color: var(--pl-green-deep);
          background: rgba(18, 163, 125, 0.04);
          transform: translateY(-1px);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .pl-why-grid {
            grid-template-columns: 1fr;
          }
          .pl-approach-grid {
            grid-template-columns: 1fr;
          }
          .pl-cluster-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 720px) {
          .pl-stage {
            grid-template-columns: 56px minmax(0, 1fr);
            gap: 16px;
          }
          .pl-stage-num {
            width: 44px;
            height: 44px;
            font-size: 15px;
          }
          .pl-cluster-grid {
            grid-template-columns: 1fr;
          }
          .pl-cta-buttons,
          .pl-hero-cta {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            max-width: 320px;
            margin-left: auto;
            margin-right: auto;
          }
          .pl-btn {
            width: 100%;
          }
          .pl-faq-q {
            grid-template-columns: 32px minmax(0, 1fr) 24px;
            gap: 12px;
          }
          .pl-faq-a {
            padding-left: calc(32px + 12px + 20px);
          }
        }
      `}</style>
    </div>
  )
}
