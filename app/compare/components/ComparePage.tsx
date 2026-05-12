import Link from 'next/link'
import Image from 'next/image'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import FAQJsonLd from '../../components/FAQJsonLd'
import DemoBookingButton from '../../components/DemoBookingButton'
import { getAllCaseStudies, type CaseStudy } from '../../lib/case-studies'

/**
 * ComparePage — Shared layout for /compare/meeton-vs-{competitor}/ landing pages.
 *
 * Page anatomy:
 * - Hero with "[Competitor] と Meeton ai を比較" eyebrow + gradient H1
 * - Honest multi-row comparison table (Meeton column highlighted)
 * - "Recommendation by use case" — calls out where competitor is the right fit
 * - 3-pillar "Why Meeton ai" differentiators (specific, not generic)
 * - Case study chips (real, from getAllCaseStudies())
 * - FAQ + FAQPage JSON-LD
 * - CTA with utm `compare-{competitor}`
 * - Footer disclaimer (public-info caveat)
 *
 * Fairness rules:
 * - Claims about the competitor use cautious language ("一般的に", "公開情報では")
 * - No fabricated quotes or specific stats not verifiable
 * - Meeton strengths framed in absolute terms (what Meeton DOES)
 *
 * Visual: dot-grid + stacked radial-gradient (no filter:blur).
 */

export type CompareCellState = 'yes' | 'partial' | 'no'

export type CompareRow = {
  /** 機能カテゴリ — left column. */
  category: string
  /** Brief sub-explanation under the category name. */
  categoryNote?: string
  /** Competitor cell. */
  competitor: {
    state: CompareCellState
    /** Short text shown next to the indicator. */
    text: string
  }
  /** Meeton cell — highlighted column. */
  meeton: {
    state: CompareCellState
    text: string
  }
}

export type UseCaseRec = {
  /** Who should pick the competitor. */
  forCompetitor: string
  /** Who should pick Meeton ai. */
  forMeeton: string
}

export type Differentiator = {
  /** 3-12 character title. */
  title: string
  body: string
  /** Mono-style tag label e.g. "01" or "AI 対話". */
  tag: string
}

export type FAQItem = {
  question: string
  answer: string
}

export type CompareConfig = {
  /** URL segment after /compare/, e.g. "meeton-vs-sinclo". */
  slug: string
  /** Display name of the competitor. */
  competitor: string
  /** One-line public-info positioning of the competitor (used in copy). */
  competitorPositioning: string
  /** Eyebrow text. */
  eyebrow: string
  /** Hero H1 — split into two segments. Second is gradient. */
  heroH1: [string, string]
  /** Hero sub explaining the comparison's value to the reader. */
  heroSub: string
  /** Comparison table rows — multi-feature side-by-side. */
  rows: CompareRow[]
  /** Recommendation by use case — fairness section. */
  useCases: UseCaseRec
  /** 3 specific differentiators (NOT generic). */
  differentiators: [Differentiator, Differentiator, Differentiator]
  /** FAQ items (5-6). */
  faq: FAQItem[]
  /** UTM tag for demo CTAs. */
  utmCampaign: string
}

/* ── Helpers ── */
function pickCaseStudies(items: CaseStudy[], max = 4): CaseStudy[] {
  return items.filter((i) => !i.noIndex).slice(0, max)
}

function CellIndicator({ state }: { state: CompareCellState }) {
  if (state === 'yes') {
    return (
      <span className="cmp-cell-ind cmp-cell-ind-yes" aria-label="対応">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    )
  }
  if (state === 'partial') {
    return (
      <span className="cmp-cell-ind cmp-cell-ind-partial" aria-label="一部対応">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </span>
    )
  }
  return (
    <span className="cmp-cell-ind cmp-cell-ind-no" aria-label="非対応">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
      </svg>
    </span>
  )
}

export default async function ComparePage({ config }: { config: CompareConfig }) {
  const allCaseStudies = await getAllCaseStudies().catch(() => [] as CaseStudy[])
  const featuredCaseStudies = pickCaseStudies(allCaseStudies, 4)
  const pageUrl = `https://dynameet.ai/compare/${config.slug}/`

  return (
    <div className="cmp-root">
      <FAQJsonLd items={config.faq} pageUrl={pageUrl} />
      <Nav variant="light" />

      {/* ── HERO ── */}
      <section className="cmp-hero">
        <div className="cmp-hero-grid" aria-hidden />
        <div className="cmp-hero-inner">
          <div className="cmp-eyebrow">
            <span className="cmp-eyebrow-dash" />
            {config.eyebrow}
            <span className="cmp-eyebrow-tag">{config.competitor} vs Meeton ai</span>
          </div>
          <h1 className="cmp-hero-h1">
            {config.heroH1[0]}
            <br />
            <em>{config.heroH1[1]}</em>
          </h1>
          <p className="cmp-hero-sub">{config.heroSub}</p>

          <div className="cmp-hero-ctas">
            <DemoBookingButton className="cmp-btn cmp-btn-primary" utmCampaign={config.utmCampaign}>
              30分デモを予約する
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </DemoBookingButton>
            <Link href="#comparison" className="cmp-btn cmp-btn-ghost">
              比較表を見る
            </Link>
          </div>

          <div className="cmp-hero-proof">
            <div className="cmp-proof-stat">
              <div className="cmp-proof-v">5<span className="cmp-proof-u">秒</span></div>
              <div className="cmp-proof-l">初動対応</div>
            </div>
            <div className="cmp-proof-stat">
              <div className="cmp-proof-v">24<span className="cmp-proof-u">/7</span></div>
              <div className="cmp-proof-l">AI 稼働</div>
            </div>
            <div className="cmp-proof-stat">
              <div className="cmp-proof-v">4<span className="cmp-proof-u">モジュール</span></div>
              <div className="cmp-proof-l">Live / Email / Calendar / Library</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section id="comparison" className="cmp-section">
        <div className="cmp-section-inner">
          <div className="cmp-section-head">
            <div className="cmp-section-eyebrow">
              <span className="cmp-eyebrow-dash" />
              Comparison
            </div>
            <h2 className="cmp-h2">
              {config.competitor} と Meeton ai を、<br />
              <em>機能ごとに並べて比較</em>
            </h2>
            <p className="cmp-section-sub">
              公開情報および一般的な業界認識をもとに、買い手目線で並べました。
              色付き列が Meeton ai、フラット列が {config.competitor} です。
            </p>
          </div>

          <div className="cmp-table-wrap">
            <table className="cmp-table" aria-label={`${config.competitor} と Meeton ai の機能比較表`}>
              <thead>
                <tr>
                  <th className="cmp-th cmp-th-cat" scope="col">機能</th>
                  <th className="cmp-th cmp-th-comp" scope="col">{config.competitor}</th>
                  <th className="cmp-th cmp-th-meeton" scope="col">
                    <span className="cmp-th-meeton-badge">Meeton ai</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {config.rows.map((r) => (
                  <tr key={r.category}>
                    <th scope="row" className="cmp-cell cmp-cell-cat">
                      <div className="cmp-cell-cat-name">{r.category}</div>
                      {r.categoryNote && <div className="cmp-cell-cat-note">{r.categoryNote}</div>}
                    </th>
                    <td className="cmp-cell cmp-cell-comp">
                      <div className="cmp-cell-row">
                        <CellIndicator state={r.competitor.state} />
                        <span className="cmp-cell-text">{r.competitor.text}</span>
                      </div>
                    </td>
                    <td className="cmp-cell cmp-cell-meeton">
                      <div className="cmp-cell-row">
                        <CellIndicator state={r.meeton.state} />
                        <span className="cmp-cell-text">{r.meeton.text}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cmp-legend">
            <div className="cmp-legend-item"><CellIndicator state="yes" /> 対応 / ネイティブ</div>
            <div className="cmp-legend-item"><CellIndicator state="partial" /> 一部対応 / オプション</div>
            <div className="cmp-legend-item"><CellIndicator state="no" /> 非対応 / 公開情報なし</div>
          </div>
        </div>
      </section>

      {/* ── USE CASE RECOMMENDATION (fairness) ── */}
      <section className="cmp-section cmp-section-alt">
        <div className="cmp-section-inner">
          <div className="cmp-section-head">
            <div className="cmp-section-eyebrow">
              <span className="cmp-eyebrow-dash" />
              Which One Fits You
            </div>
            <h2 className="cmp-h2">
              「正直に言うと、こういう企業には<br />
              <em>{config.competitor} のほうが向いている</em>」
            </h2>
            <p className="cmp-section-sub">
              比較ページとして、買い手の意思決定に誠実な答えを出します。
              用途が違えば、最適解も違います。
            </p>
          </div>

          <div className="cmp-usecase">
            <article className="cmp-usecase-card cmp-usecase-card-comp">
              <div className="cmp-usecase-label">
                <span className="cmp-usecase-label-dot" />
                {config.competitor} を選ぶべきケース
              </div>
              <p className="cmp-usecase-body">{config.useCases.forCompetitor}</p>
            </article>
            <article className="cmp-usecase-card cmp-usecase-card-meeton">
              <div className="cmp-usecase-label cmp-usecase-label-meeton">
                <span className="cmp-usecase-label-dot" />
                Meeton ai を選ぶべきケース
              </div>
              <p className="cmp-usecase-body">{config.useCases.forMeeton}</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── DIFFERENTIATORS ── */}
      <section className="cmp-section">
        <div className="cmp-section-inner">
          <div className="cmp-section-head">
            <div className="cmp-section-eyebrow">
              <span className="cmp-eyebrow-dash" />
              Why Meeton ai
            </div>
            <h2 className="cmp-h2">
              {config.competitor} ではなく Meeton ai を選ぶ、<br />
              <em>3 つの具体理由</em>
            </h2>
          </div>

          <div className="cmp-diffs">
            {config.differentiators.map((d, i) => (
              <article key={d.title} className="cmp-diff-card">
                <div className="cmp-diff-num">0{i + 1}</div>
                <div className="cmp-diff-tag">{d.tag}</div>
                <h3 className="cmp-diff-title">{d.title}</h3>
                <p className="cmp-diff-body">{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      {featuredCaseStudies.length > 0 && (
        <section className="cmp-section cmp-section-alt">
          <div className="cmp-section-inner">
            <div className="cmp-section-head">
              <div className="cmp-section-eyebrow">
                <span className="cmp-eyebrow-dash" />
                Proof
              </div>
              <h2 className="cmp-h2">
                数字で語る、<em>Meeton ai 導入企業の成果</em>
              </h2>
              <p className="cmp-section-sub">
                {config.competitor} 系のツールから乗り換え検討中の意思決定者が、実際にチェックしている事例から。
              </p>
            </div>

            <div className="cmp-case-chips">
              {featuredCaseStudies.map((cs) => (
                <Link key={cs.id} href={`/case-studies/${cs.slug}/`} className="cmp-case-chip">
                  <div className="cmp-case-chip-head">
                    {cs.companyLogo ? (
                      <div className="cmp-case-chip-logo">
                        <Image
                          src={cs.companyLogo}
                          alt={cs.company}
                          fill
                          style={{ objectFit: 'contain', objectPosition: 'left center' }}
                          sizes="120px"
                        />
                      </div>
                    ) : (
                      <span className="cmp-case-chip-company">{cs.company}</span>
                    )}
                    {cs.industry && <span className="cmp-case-chip-industry">{cs.industry}</span>}
                  </div>

                  {cs.heroMetric && (
                    <div className="cmp-case-chip-metric-row">
                      <div className="cmp-case-chip-metric">{cs.heroMetric}</div>
                      <div className="cmp-case-chip-metric-label">{cs.heroMetricLabel}</div>
                    </div>
                  )}

                  <p className="cmp-case-chip-title">{cs.title}</p>
                  <span className="cmp-case-chip-cta">
                    事例を見る
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>

            <div className="cmp-case-more">
              <Link href="/case-studies/" className="cmp-case-more-link">
                すべての導入事例を見る
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="cmp-section">
        <div className="cmp-section-inner">
          <div className="cmp-section-head">
            <div className="cmp-section-eyebrow">
              <span className="cmp-eyebrow-dash" />
              FAQ
            </div>
            <h2 className="cmp-h2">
              {config.competitor} との比較で、<em>よく頂く質問</em>
            </h2>
          </div>

          <dl className="cmp-faq">
            {config.faq.map((f, i) => (
              <div key={i} className="cmp-faq-item">
                <dt className="cmp-faq-q">
                  <span className="cmp-faq-num">Q{(i + 1).toString().padStart(2, '0')}</span>
                  <span>{f.question}</span>
                </dt>
                <dd className="cmp-faq-a">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="cmp-cta">
        <div className="cmp-cta-inner">
          <div className="cmp-section-eyebrow">
            <span className="cmp-eyebrow-dash" />
            Next Step
          </div>
          <h2 className="cmp-cta-h">
            自社の用途に合うかを、<br />
            <em>30 分のデモ</em>で見極める
          </h2>
          <p className="cmp-cta-p">
            既存ツール ({config.competitor} ほか) との具体的な役割分担・置き換え可否を、
            その場でアーキテクチャ図に落としてお返しします。
          </p>
          <div className="cmp-cta-buttons">
            <DemoBookingButton className="cmp-btn cmp-btn-primary" utmCampaign={config.utmCampaign}>
              30分デモを予約する
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </DemoBookingButton>
            <Link href="/contact/" className="cmp-btn cmp-btn-ghost">
              資料請求
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="cmp-disclaimer">
        <div className="cmp-disclaimer-inner">
          本ページの比較は公開情報および一般的な業界認識に基づきます。
          最新の機能・料金は各社公式サイトをご確認ください。
          {config.competitor} は各権利者の商標です。
        </div>
      </div>

      <Footer variant="light" />

      <style>{compareCss()}</style>
    </div>
  )
}

/* ── Styles ──
 * Brand color: #12a37d primary (Meeton column highlight).
 * Backdrop pattern: dot-grid + stacked radial-gradient (no filter:blur).
 */
function compareCss(): string {
  return `
    .cmp-root {
      background: #fafaf7;
      color: #0a0e0c;
      min-height: 100vh;
      --c-accent: #12a37d;
      --c-accent-deep: #065f46;
      --c-purple: #7c5cfc;
      --c-cyan: #0891b2;
      --c-blue: #3b6ff5;
      --c-border: #e4e3dd;
      --c-border-2: #d8d7d0;
      --c-text: #0a0e0c;
      --c-sub: #3d4541;
      --c-mute: #82897f;
      --c-warn: #d97706;
      --c-danger: #b91c1c;
    }

    /* ========== HERO ========== */
    .cmp-hero {
      position: relative;
      padding: clamp(120px, 16vw, 180px) clamp(20px, 4vw, 48px) clamp(48px, 7vw, 80px);
      border-bottom: 1px solid var(--c-border);
      overflow: hidden;
      background:
        radial-gradient(circle 360px at calc(100% - 40px) -80px, rgba(18, 163, 125, 0.22), transparent 70%),
        radial-gradient(circle 280px at -40px calc(100% - 40px), rgba(124, 92, 252, 0.16), transparent 70%),
        radial-gradient(ellipse 80% 60% at 20% 0%, rgba(18, 163, 125, 0.06), transparent 60%),
        radial-gradient(ellipse 60% 50% at 90% 30%, rgba(124, 92, 252, 0.05), transparent 60%),
        #fafaf7;
    }
    .cmp-hero-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(6, 95, 70, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(6, 95, 70, 0.04) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: radial-gradient(ellipse at top, black 30%, transparent 80%);
      pointer-events: none;
    }
    .cmp-hero-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; }
    .cmp-eyebrow {
      display: inline-flex; align-items: center; gap: 12px;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; letter-spacing: 0.18em;
      color: var(--c-accent-deep);
      text-transform: uppercase;
      margin-bottom: 24px;
      font-weight: 700;
    }
    .cmp-eyebrow-dash { width: 24px; height: 1px; background: linear-gradient(90deg, transparent, var(--c-accent)); }
    .cmp-eyebrow-tag {
      color: var(--c-mute); font-weight: 600;
      padding-left: 8px; border-left: 1px solid var(--c-border);
    }
    .cmp-hero-h1 {
      font-weight: 900; font-size: clamp(36px, 5.5vw, 76px);
      line-height: 1.1; letter-spacing: -0.035em;
      margin: 0 0 28px; word-break: keep-all;
    }
    .cmp-hero-h1 em {
      font-style: normal;
      background: linear-gradient(135deg, var(--c-accent) 0%, var(--c-cyan) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .cmp-hero-sub {
      font-size: clamp(15px, 2vw, 19px);
      line-height: 1.85; color: var(--c-sub);
      max-width: 720px; margin: 0 0 36px;
    }
    .cmp-hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 48px; }
    .cmp-hero-proof {
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
      max-width: 640px; padding: 24px 0;
      border-top: 1px solid var(--c-border); border-bottom: 1px solid var(--c-border);
    }
    .cmp-proof-stat { position: relative; padding: 0 24px; }
    .cmp-proof-stat:first-child { padding-left: 0; }
    .cmp-proof-stat:not(:first-child)::before {
      content: ''; position: absolute; left: 0; top: 10%; bottom: 10%;
      width: 1px; background: var(--c-border);
    }
    .cmp-proof-v {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: clamp(24px, 3.5vw, 36px);
      font-weight: 800; line-height: 1; letter-spacing: -0.03em;
      color: var(--c-text);
    }
    .cmp-proof-u { font-size: 0.55em; font-weight: 700; margin-left: 2px; color: var(--c-accent-deep); }
    .cmp-proof-l {
      font-size: 12px; font-weight: 600; color: var(--c-sub);
      margin-top: 8px; letter-spacing: 0.02em;
    }

    /* ========== BUTTONS ========== */
    .cmp-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 26px; min-height: 48px;
      border-radius: 999px;
      font-family: inherit; font-size: 15px; font-weight: 700;
      text-decoration: none; cursor: pointer; border: none;
      letter-spacing: 0.01em;
      transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease, background 0.2s;
    }
    .cmp-btn-primary {
      background: linear-gradient(135deg, var(--c-accent), #0e8a6a);
      color: #fff;
      box-shadow: 0 6px 24px rgba(18, 163, 125, 0.28);
    }
    .cmp-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(18, 163, 125, 0.32); }
    .cmp-btn-ghost {
      background: #fff; color: var(--c-text);
      border: 1px solid var(--c-border-2);
    }
    .cmp-btn-ghost:hover { border-color: var(--c-accent); color: var(--c-accent); transform: translateY(-1px); }

    /* ========== SECTION FRAME ========== */
    .cmp-section { padding: clamp(64px, 10vw, 120px) clamp(20px, 4vw, 48px); }
    .cmp-section-alt { background: #fff; border-top: 1px solid var(--c-border); border-bottom: 1px solid var(--c-border); }
    .cmp-section-inner { max-width: 1200px; margin: 0 auto; }
    .cmp-section-head { margin-bottom: clamp(40px, 5vw, 64px); max-width: 760px; }
    .cmp-section-eyebrow {
      display: inline-flex; align-items: center; gap: 12px;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; letter-spacing: 0.18em;
      color: var(--c-accent-deep);
      text-transform: uppercase;
      margin-bottom: 16px; font-weight: 700;
    }
    .cmp-h2 {
      font-weight: 900; font-size: clamp(28px, 4vw, 48px);
      line-height: 1.18; letter-spacing: -0.025em; margin: 0 0 20px;
    }
    .cmp-h2 em {
      font-style: normal;
      background: linear-gradient(135deg, var(--c-accent), var(--c-cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .cmp-section-sub {
      font-size: clamp(15px, 1.8vw, 17px);
      line-height: 1.85; color: var(--c-sub);
      max-width: 720px;
    }

    /* ========== COMPARISON TABLE ========== */
    .cmp-table-wrap {
      background: #fff;
      border: 1px solid var(--c-border);
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 1px 2px rgba(10, 14, 12, 0.04);
    }
    .cmp-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14.5px;
    }
    .cmp-th {
      background: #fafaf7;
      border-bottom: 1px solid var(--c-border);
      padding: 18px 20px;
      text-align: left;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.01em;
      color: var(--c-text);
      vertical-align: middle;
    }
    .cmp-th-cat { width: 28%; }
    .cmp-th-comp { width: 36%; color: var(--c-sub); }
    .cmp-th-meeton {
      width: 36%;
      background: linear-gradient(135deg, rgba(18, 163, 125, 0.08), rgba(18, 163, 125, 0.02));
      border-left: 2px solid var(--c-accent);
    }
    .cmp-th-meeton-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 12px;
      background: linear-gradient(135deg, var(--c-accent), #0e8a6a);
      color: #fff;
      font-weight: 800;
      font-size: 12.5px;
      border-radius: 999px;
      letter-spacing: 0.01em;
    }
    .cmp-cell {
      padding: 18px 20px;
      border-bottom: 1px solid var(--c-border);
      vertical-align: top;
    }
    .cmp-table tbody tr:last-child .cmp-cell { border-bottom: none; }
    .cmp-cell-cat {
      background: #fafaf7;
      text-align: left;
      font-weight: 700;
      color: var(--c-text);
    }
    .cmp-cell-cat-name { font-size: 14.5px; font-weight: 800; line-height: 1.4; letter-spacing: -0.005em; }
    .cmp-cell-cat-note {
      font-size: 12px; line-height: 1.55; color: var(--c-mute);
      margin-top: 4px; font-weight: 500;
    }
    .cmp-cell-comp { color: var(--c-sub); }
    .cmp-cell-meeton {
      background: linear-gradient(135deg, rgba(18, 163, 125, 0.05), rgba(18, 163, 125, 0.01));
      border-left: 2px solid var(--c-accent);
      color: var(--c-text);
      font-weight: 600;
    }
    .cmp-cell-row {
      display: flex; align-items: flex-start; gap: 10px;
      line-height: 1.7;
    }
    .cmp-cell-text { flex: 1; font-size: 14px; }

    .cmp-cell-ind {
      flex-shrink: 0;
      width: 22px; height: 22px;
      border-radius: 50%;
      display: inline-flex; align-items: center; justify-content: center;
      margin-top: 1px;
    }
    .cmp-cell-ind-yes { background: rgba(18, 163, 125, 0.14); color: var(--c-accent-deep); }
    .cmp-cell-ind-partial { background: rgba(217, 119, 6, 0.14); color: var(--c-warn); }
    .cmp-cell-ind-no { background: rgba(130, 137, 127, 0.16); color: var(--c-mute); }

    .cmp-legend {
      display: flex; flex-wrap: wrap; gap: 20px;
      margin-top: 20px;
      font-size: 12.5px; color: var(--c-sub); font-weight: 600;
    }
    .cmp-legend-item { display: inline-flex; align-items: center; gap: 8px; }

    /* ========== USE CASE ========== */
    .cmp-usecase {
      display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: clamp(20px, 2vw, 28px);
    }
    .cmp-usecase-card {
      background: #fafaf7;
      border: 1px solid var(--c-border);
      border-radius: 22px;
      padding: clamp(24px, 3vw, 32px);
    }
    .cmp-usecase-card-meeton {
      background: linear-gradient(160deg, rgba(18, 163, 125, 0.06), #fff);
      border-color: var(--c-accent);
      box-shadow: 0 24px 48px -32px rgba(18, 163, 125, 0.32);
    }
    .cmp-usecase-label {
      display: inline-flex; align-items: center; gap: 10px;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11.5px; letter-spacing: 0.12em;
      color: var(--c-mute);
      text-transform: uppercase;
      margin-bottom: 16px;
      font-weight: 800;
    }
    .cmp-usecase-label-meeton { color: var(--c-accent-deep); }
    .cmp-usecase-label-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--c-mute);
    }
    .cmp-usecase-label-meeton .cmp-usecase-label-dot {
      background: var(--c-accent);
      box-shadow: 0 0 0 4px rgba(18, 163, 125, 0.18);
    }
    .cmp-usecase-body {
      font-size: 15px; line-height: 1.9; color: var(--c-text);
      margin: 0; font-weight: 500;
    }

    /* ========== DIFFERENTIATORS ========== */
    .cmp-diffs {
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: clamp(20px, 2vw, 28px);
    }
    .cmp-diff-card {
      background: #fff;
      border: 1px solid var(--c-border);
      border-radius: 22px;
      padding: clamp(28px, 3vw, 36px);
      display: flex; flex-direction: column; gap: 14px;
      position: relative;
      transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s, box-shadow 0.3s;
    }
    .cmp-diff-card:hover {
      transform: translateY(-3px);
      border-color: var(--c-accent);
      box-shadow: 0 24px 48px -24px rgba(18, 163, 125, 0.24);
    }
    .cmp-diff-num {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 13px; font-weight: 700; letter-spacing: 0.12em;
      color: var(--c-accent);
    }
    .cmp-diff-tag {
      display: inline-block;
      align-self: flex-start;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em;
      padding: 5px 10px;
      background: rgba(18, 163, 125, 0.08);
      color: var(--c-accent-deep);
      border-radius: 6px;
      text-transform: uppercase;
    }
    .cmp-diff-title {
      font-size: clamp(18px, 1.8vw, 22px); font-weight: 800;
      line-height: 1.4; color: var(--c-text); margin: 0;
      letter-spacing: -0.015em;
    }
    .cmp-diff-body {
      font-size: 14.5px; line-height: 1.85; color: var(--c-sub); margin: 0;
    }

    /* ========== CASE STUDY CHIPS ========== */
    .cmp-case-chips {
      display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: clamp(16px, 2vw, 24px);
    }
    .cmp-case-chip {
      background: #fff; border: 1px solid var(--c-border); border-radius: 18px;
      padding: 22px; text-decoration: none; color: var(--c-text);
      display: flex; flex-direction: column; gap: 14px;
      transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
    }
    .cmp-case-chip:hover {
      transform: translateY(-2px);
      border-color: var(--c-accent-deep);
      box-shadow: 0 18px 36px -18px rgba(6, 95, 70, 0.2);
    }
    .cmp-case-chip-head {
      display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 28px;
    }
    .cmp-case-chip-logo { position: relative; width: 96px; height: 24px; }
    .cmp-case-chip-company { font-size: 13px; font-weight: 800; color: var(--c-text); }
    .cmp-case-chip-industry {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--c-mute);
      padding: 4px 8px; background: #fafaf7; border-radius: 999px;
    }
    .cmp-case-chip-metric-row { display: flex; align-items: baseline; gap: 8px; }
    .cmp-case-chip-metric {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 28px; font-weight: 800;
      background: linear-gradient(135deg, var(--c-text), var(--c-accent-deep));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      letter-spacing: -0.02em;
    }
    .cmp-case-chip-metric-label { font-size: 11px; color: var(--c-sub); font-weight: 600; }
    .cmp-case-chip-title {
      font-size: 13.5px; line-height: 1.6; color: var(--c-sub); margin: 0;
      display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
    }
    .cmp-case-chip-cta {
      margin-top: auto;
      display: inline-flex; align-items: center; gap: 6px;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; color: var(--c-accent-deep);
      font-weight: 700; letter-spacing: 0.06em;
    }
    .cmp-case-more { margin-top: 32px; text-align: center; }
    .cmp-case-more-link {
      display: inline-flex; align-items: center; gap: 8px;
      color: var(--c-accent-deep); font-weight: 700; font-size: 14px;
      text-decoration: none; border-bottom: 1px solid currentColor;
      padding-bottom: 2px;
    }

    /* ========== FAQ ========== */
    .cmp-faq {
      max-width: 880px; margin: 0;
      display: flex; flex-direction: column; gap: 12px;
    }
    .cmp-faq-item {
      background: #fff;
      border: 1px solid var(--c-border);
      border-radius: 18px;
      padding: 24px 28px;
    }
    .cmp-faq-q {
      display: flex; align-items: flex-start; gap: 14px;
      font-size: 16px; font-weight: 800; color: var(--c-text);
      line-height: 1.55; letter-spacing: -0.005em;
      margin: 0 0 12px;
    }
    .cmp-faq-num {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; font-weight: 700;
      color: var(--c-accent); letter-spacing: 0.08em;
      padding-top: 4px; flex-shrink: 0;
    }
    .cmp-faq-a {
      font-size: 14.5px; line-height: 1.9; color: var(--c-sub);
      margin: 0; padding-left: 38px;
    }

    /* ========== FINAL CTA ========== */
    .cmp-cta {
      padding: clamp(72px, 10vw, 120px) clamp(20px, 4vw, 48px);
      background:
        radial-gradient(circle 320px at 80% -40px, rgba(18, 163, 125, 0.22), transparent 70%),
        radial-gradient(circle 240px at 0% 100%, rgba(124, 92, 252, 0.16), transparent 65%),
        #fafaf7;
      border-top: 1px solid var(--c-border);
      text-align: center;
    }
    .cmp-cta-inner { max-width: 760px; margin: 0 auto; }
    .cmp-cta-h {
      font-weight: 900; font-size: clamp(28px, 4vw, 48px);
      line-height: 1.22; letter-spacing: -0.025em; margin: 16px 0 20px;
    }
    .cmp-cta-h em {
      font-style: normal;
      background: linear-gradient(135deg, var(--c-accent), var(--c-cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .cmp-cta-p {
      font-size: clamp(15px, 1.8vw, 17px);
      line-height: 1.85; color: var(--c-sub);
      max-width: 600px; margin: 0 auto 32px;
    }
    .cmp-cta-buttons { display: inline-flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
    .cmp-cta .cmp-section-eyebrow { justify-content: center; }

    /* ========== DISCLAIMER ========== */
    .cmp-disclaimer {
      background: #fff;
      border-top: 1px solid var(--c-border);
      padding: 28px clamp(20px, 4vw, 48px);
    }
    .cmp-disclaimer-inner {
      max-width: 1100px; margin: 0 auto;
      font-size: 12px; line-height: 1.7;
      color: var(--c-mute);
      letter-spacing: 0.005em;
    }

    /* ========== RESPONSIVE ========== */
    @media (max-width: 1024px) {
      .cmp-case-chips { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .cmp-diffs { grid-template-columns: 1fr; }
    }
    @media (max-width: 820px) {
      .cmp-usecase { grid-template-columns: 1fr; }
      .cmp-table { font-size: 13.5px; }
      .cmp-th, .cmp-cell { padding: 14px 14px; }
      .cmp-th-cat { width: 32%; }
    }
    @media (max-width: 640px) {
      .cmp-case-chips { grid-template-columns: 1fr; }
      .cmp-hero-proof { grid-template-columns: 1fr; gap: 18px; }
      .cmp-proof-stat { padding: 0; }
      .cmp-proof-stat:not(:first-child)::before { display: none; }
      .cmp-proof-stat:not(:first-child) {
        border-top: 1px solid var(--c-border); padding-top: 16px;
      }
      .cmp-faq-a { padding-left: 0; }
      .cmp-table { font-size: 12.5px; }
      .cmp-th-meeton-badge { font-size: 11px; padding: 4px 8px; }
    }
  `
}
