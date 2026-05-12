import Link from 'next/link'
import Image from 'next/image'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import FAQJsonLd from '../../components/FAQJsonLd'
import DemoBookingButton from '../../components/DemoBookingButton'
import { getAllCaseStudies, type CaseStudy } from '../../lib/case-studies'

/**
 * PersonaPage — Shared layout for /for/{role}/ persona landing pages.
 *
 * Each persona page provides:
 * - Hero with persona-specific eyebrow / H1 / pain statement
 * - 3-pain section grounded in directional language (not fabricated stats)
 * - Solution mapping to Meeton's 4 modules
 * - Live case study chip row (sourced from getAllCaseStudies)
 * - ROI hint card linking to /roi-simulator/
 * - FAQ section + JSON-LD FAQPage schema (for AI citation)
 * - Final CTA via DemoBookingButton with persona-tagged UTM
 *
 * Visual quality target: HomePageClient.tsx / case-studies/page.tsx.
 * Brand palette: #12a37d (green), #7c5cfc (purple), #0891b2 (cyan), #3b6ff5 (blue).
 * Backdrop: dot-grid + stacked radial-gradient glows (NOT filter:blur — that's GPU-expensive).
 */

export type ModuleKey = 'live' | 'email' | 'calendar' | 'library'

type ModuleMapping = {
  key: ModuleKey
  /** Short reason this module solves THIS persona's problem. */
  reason: string
}

type Pain = {
  title: string
  body: string
  /** Directional, not a fabricated stat. e.g. "業界平均で〜", "多くの場合〜". */
  signal: string
}

type FAQItem = {
  question: string
  answer: string
}

export type PersonaConfig = {
  /** URL segment: cmo, cro, inside-sales, marketing-manager. */
  slug: string
  /** Eyebrow text. e.g. "For CMOs". */
  eyebrow: string
  /** Japanese persona label, used in subtitles. */
  personaJa: string
  /** Hero H1 — split into two segments. The second is gradient-styled. */
  heroH1: [string, string]
  /** Hero sub — the persona's headline pain in one sentence. */
  heroSub: string
  /** Three primary pains the persona faces. */
  pains: [Pain, Pain, Pain]
  /** Mapping of Meeton modules → why each one solves a pain. */
  moduleMapping: ModuleMapping[]
  /** FAQ tailored to this persona (4-6 questions). */
  faq: FAQItem[]
  /** Hero accent color from brand palette. */
  accent: '#12a37d' | '#7c5cfc' | '#0891b2' | '#3b6ff5'
  /** UTM campaign tag for demo bookings from this page. */
  utmCampaign: string
}

const MODULE_META: Record<ModuleKey, { name: string; href: string; color: string; description: string }> = {
  live: {
    name: 'Meeton Live (AI チャット)',
    href: '/features/ai-chat/',
    color: '#12a37d',
    description: 'サイト訪問者と対話し、関心が高い瞬間にそのまま商談を獲得',
  },
  email: {
    name: 'Meeton Email (AI メール)',
    href: '/features/ai-email/',
    color: '#3b6ff5',
    description: 'インバウンドメールに AI が自動応答し、ナーチャリングと商談化を両立',
  },
  calendar: {
    name: 'Meeton Calendar (AI カレンダー)',
    href: '/features/meetings/',
    color: '#0891b2',
    description: 'Google Calendar / Teams / Zoom と連携した即時予約。日程調整ゼロ',
  },
  library: {
    name: 'Meeton Library (AI ライブラリ)',
    href: '/features/ai-library/',
    color: '#7c5cfc',
    description: '訪問履歴に応じて最適な資料をレコメンドし、再訪リードを商談へ',
  },
}

/* ── Helpers ── */
function pickCaseStudies(items: CaseStudy[], max = 4): CaseStudy[] {
  return items.filter((i) => !i.noIndex).slice(0, max)
}

export default async function PersonaPage({ config }: { config: PersonaConfig }) {
  const allCaseStudies = await getAllCaseStudies().catch(() => [] as CaseStudy[])
  const featuredCaseStudies = pickCaseStudies(allCaseStudies, 4)
  const pageUrl = `https://dynameet.ai/for/${config.slug}/`

  return (
    <div className="persona-root">
      <FAQJsonLd items={config.faq} pageUrl={pageUrl} />
      <Nav variant="light" />

      {/* ── HERO ── */}
      <section className="persona-hero">
        <div className="persona-hero-grid" aria-hidden />
        <div className="persona-hero-inner">
          <div className="persona-eyebrow">
            <span className="persona-eyebrow-dash" />
            {config.eyebrow}
            <span className="persona-eyebrow-tag">{config.personaJa}</span>
          </div>
          <h1 className="persona-hero-h1">
            {config.heroH1[0]}
            <br />
            <em>{config.heroH1[1]}</em>
          </h1>
          <p className="persona-hero-sub">{config.heroSub}</p>

          <div className="persona-hero-ctas">
            <DemoBookingButton className="persona-btn persona-btn-primary" utmCampaign={config.utmCampaign}>
              30分デモを予約する
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </DemoBookingButton>
            <Link href="/roi-simulator/" className="persona-btn persona-btn-ghost">
              ROIを試算する
            </Link>
          </div>

          {/* Hero proof bar — uses well-known, public Meeton positioning facts only. */}
          <div className="persona-hero-proof">
            <div className="persona-proof-stat">
              <div className="persona-proof-v">5<span className="persona-proof-u">秒</span></div>
              <div className="persona-proof-l">初動対応</div>
            </div>
            <div className="persona-proof-stat">
              <div className="persona-proof-v">24<span className="persona-proof-u">/7</span></div>
              <div className="persona-proof-l">AI 稼働</div>
            </div>
            <div className="persona-proof-stat">
              <div className="persona-proof-v">4<span className="persona-proof-u">モジュール</span></div>
              <div className="persona-proof-l">Live / Email / Calendar / Library</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 PAINS ── */}
      <section className="persona-section">
        <div className="persona-section-inner">
          <div className="persona-section-head">
            <div className="persona-section-eyebrow">
              <span className="persona-eyebrow-dash" />
              The Pains
            </div>
            <h2 className="persona-h2">
              {config.personaJa}が、いま直面している<br />
              <em>3つの構造的な課題</em>
            </h2>
          </div>

          <div className="persona-pains">
            {config.pains.map((pain, i) => (
              <article key={pain.title} className="persona-pain-card">
                <div className="persona-pain-num">0{i + 1}</div>
                <h3 className="persona-pain-title">{pain.title}</h3>
                <p className="persona-pain-body">{pain.body}</p>
                <div className="persona-pain-signal">
                  <span className="persona-pain-signal-dot" />
                  {pain.signal}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION MAPPING ── */}
      <section className="persona-section persona-section-alt">
        <div className="persona-section-inner">
          <div className="persona-section-head">
            <div className="persona-section-eyebrow">
              <span className="persona-eyebrow-dash" />
              The Solution
            </div>
            <h2 className="persona-h2">
              {config.personaJa}の課題に、<br />
              Meeton ai の<em>4 モジュール</em>でこう効く
            </h2>
            <p className="persona-section-sub">
              「営業のラストワンマイル」を AI が埋めることで、マーケが生んだリードを商談まで一気通貫で運びます。
            </p>
          </div>

          <div className="persona-modules">
            {config.moduleMapping.map((m) => {
              const meta = MODULE_META[m.key]
              return (
                <Link
                  key={m.key}
                  href={meta.href}
                  className="persona-module-card"
                  style={{ ['--m-color' as string]: meta.color }}
                >
                  <div className="persona-module-head">
                    <span className="persona-module-dot" />
                    <span className="persona-module-name">{meta.name}</span>
                  </div>
                  <p className="persona-module-desc">{meta.description}</p>
                  <div className="persona-module-reason">
                    <span className="persona-module-reason-label">この課題に効く</span>
                    <p>{m.reason}</p>
                  </div>
                  <span className="persona-module-cta">
                    詳しく見る
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY CHIPS ── */}
      {featuredCaseStudies.length > 0 && (
        <section className="persona-section">
          <div className="persona-section-inner">
            <div className="persona-section-head">
              <div className="persona-section-eyebrow">
                <span className="persona-eyebrow-dash" />
                Proof
              </div>
              <h2 className="persona-h2">
                数字で語る、<em>導入企業の成果</em>
              </h2>
              <p className="persona-section-sub">
                同じ {config.personaJa} 文脈で意思決定された、実在の事例から。
              </p>
            </div>

            <div className="persona-case-chips">
              {featuredCaseStudies.map((cs) => (
                <Link key={cs.id} href={`/case-studies/${cs.slug}/`} className="persona-case-chip">
                  <div className="persona-case-chip-head">
                    {cs.companyLogo ? (
                      <div className="persona-case-chip-logo">
                        <Image
                          src={cs.companyLogo}
                          alt={cs.company}
                          fill
                          style={{ objectFit: 'contain', objectPosition: 'left center' }}
                          sizes="120px"
                        />
                      </div>
                    ) : (
                      <span className="persona-case-chip-company">{cs.company}</span>
                    )}
                    {cs.industry && <span className="persona-case-chip-industry">{cs.industry}</span>}
                  </div>

                  {cs.heroMetric && (
                    <div className="persona-case-chip-metric-row">
                      <div className="persona-case-chip-metric">{cs.heroMetric}</div>
                      <div className="persona-case-chip-metric-label">{cs.heroMetricLabel}</div>
                    </div>
                  )}

                  <p className="persona-case-chip-title">{cs.title}</p>
                  <span className="persona-case-chip-cta">
                    事例を見る
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>

            <div className="persona-case-more">
              <Link href="/case-studies/" className="persona-case-more-link">
                すべての導入事例を見る
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── ROI HINT ── */}
      <section className="persona-roi">
        <div className="persona-roi-inner">
          <div className="persona-roi-head">
            <div className="persona-section-eyebrow">
              <span className="persona-eyebrow-dash" />
              ROI Simulator
            </div>
            <h2 className="persona-roi-h">
              {config.personaJa}向けに、<br />
              <em>自社の数字</em>でインパクトを試算
            </h2>
            <p className="persona-roi-sub">
              月間リード数・商談化率・LTV から、Meeton ai 導入で何が変わるかを 3 分で算出します。
              意思決定の社内説明に、そのままお使いください。
            </p>
          </div>
          <div className="persona-roi-cta">
            <Link href="/roi-simulator/" className="persona-btn persona-btn-primary">
              ROI シミュレーターを開く
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ (semantic <dl> for FAQPage schema parity) ── */}
      <section className="persona-section persona-section-alt">
        <div className="persona-section-inner">
          <div className="persona-section-head">
            <div className="persona-section-eyebrow">
              <span className="persona-eyebrow-dash" />
              FAQ
            </div>
            <h2 className="persona-h2">
              {config.personaJa}から、<em>よく頂く質問</em>
            </h2>
          </div>

          <dl className="persona-faq">
            {config.faq.map((f, i) => (
              <div key={i} className="persona-faq-item">
                <dt className="persona-faq-q">
                  <span className="persona-faq-num">Q{(i + 1).toString().padStart(2, '0')}</span>
                  <span>{f.question}</span>
                </dt>
                <dd className="persona-faq-a">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="persona-cta">
        <div className="persona-cta-inner">
          <div className="persona-section-eyebrow">
            <span className="persona-eyebrow-dash" />
            Next Step
          </div>
          <h2 className="persona-cta-h">
            {config.personaJa}の意思決定を、<br />
            <em>30 分のデモ</em>で前に進める
          </h2>
          <p className="persona-cta-p">
            自社のリードジャーニーを共有いただければ、どこを Meeton ai に任せられるか、
            その場でアーキテクチャを描きます。意思決定までのスピードを上げてください。
          </p>
          <div className="persona-cta-buttons">
            <DemoBookingButton className="persona-btn persona-btn-primary" utmCampaign={config.utmCampaign}>
              30分デモを予約する
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </DemoBookingButton>
            <Link href="/contact/" className="persona-btn persona-btn-ghost">
              資料請求
            </Link>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <style>{personaCss(config.accent)}</style>
    </div>
  )
}

/* ── Styles ──
 * Pattern: dot-grid + stacked radial-gradients (no filter:blur).
 * Accent is per-persona, injected as a CSS var so the same stylesheet works
 * for all 4 pages without runtime conditionals.
 */
function personaCss(accent: string): string {
  return `
    .persona-root {
      background: #fafaf7;
      color: #0a0e0c;
      min-height: 100vh;
      --p-accent: ${accent};
      --p-green: #12a37d;
      --p-green-deep: #065f46;
      --p-purple: #7c5cfc;
      --p-cyan: #0891b2;
      --p-blue: #3b6ff5;
      --p-border: #e4e3dd;
      --p-border-2: #d8d7d0;
      --p-text: #0a0e0c;
      --p-sub: #3d4541;
      --p-mute: #82897f;
    }

    /* ========== HERO ========== */
    .persona-hero {
      position: relative;
      padding: clamp(120px, 16vw, 180px) clamp(20px, 4vw, 48px) clamp(48px, 7vw, 80px);
      border-bottom: 1px solid var(--p-border);
      overflow: hidden;
      background:
        radial-gradient(circle 360px at calc(100% - 40px) -80px, color-mix(in srgb, var(--p-accent) 22%, transparent), transparent 70%),
        radial-gradient(circle 280px at -40px calc(100% - 40px), rgba(124, 92, 252, 0.16), transparent 70%),
        radial-gradient(ellipse 80% 60% at 20% 0%, color-mix(in srgb, var(--p-accent) 6%, transparent), transparent 60%),
        radial-gradient(ellipse 60% 50% at 90% 30%, rgba(124, 92, 252, 0.05), transparent 60%),
        #fafaf7;
    }
    .persona-hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(6, 95, 70, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(6, 95, 70, 0.04) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: radial-gradient(ellipse at top, black 30%, transparent 80%);
      pointer-events: none;
    }
    .persona-hero-inner {
      position: relative; z-index: 1;
      max-width: 1200px; margin: 0 auto;
    }
    .persona-eyebrow {
      display: inline-flex; align-items: center; gap: 12px;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; letter-spacing: 0.18em;
      color: var(--p-green-deep);
      text-transform: uppercase;
      margin-bottom: 24px;
      font-weight: 700;
    }
    .persona-eyebrow-dash { width: 24px; height: 1px; background: linear-gradient(90deg, transparent, var(--p-accent)); }
    .persona-eyebrow-tag {
      color: var(--p-mute); font-weight: 600;
      padding-left: 8px; border-left: 1px solid var(--p-border);
    }
    .persona-hero-h1 {
      font-weight: 900; font-size: clamp(36px, 5.5vw, 76px);
      line-height: 1.1; letter-spacing: -0.035em;
      margin: 0 0 28px; word-break: keep-all;
    }
    .persona-hero-h1 em {
      font-style: normal;
      background: linear-gradient(135deg, var(--p-accent) 0%, var(--p-cyan) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .persona-hero-sub {
      font-size: clamp(15px, 2vw, 19px);
      line-height: 1.85; color: var(--p-sub);
      max-width: 660px; margin: 0 0 36px;
    }
    .persona-hero-ctas {
      display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 48px;
    }
    .persona-hero-proof {
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
      max-width: 640px; padding: 24px 0;
      border-top: 1px solid var(--p-border); border-bottom: 1px solid var(--p-border);
    }
    .persona-proof-stat { position: relative; padding: 0 24px; }
    .persona-proof-stat:first-child { padding-left: 0; }
    .persona-proof-stat:not(:first-child)::before {
      content: ''; position: absolute; left: 0; top: 10%; bottom: 10%;
      width: 1px; background: var(--p-border);
    }
    .persona-proof-v {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: clamp(24px, 3.5vw, 36px);
      font-weight: 800; line-height: 1; letter-spacing: -0.03em;
      color: var(--p-text);
    }
    .persona-proof-u {
      font-size: 0.55em; font-weight: 700; margin-left: 2px; color: var(--p-green-deep);
    }
    .persona-proof-l {
      font-size: 12px; font-weight: 600; color: var(--p-sub);
      margin-top: 8px; letter-spacing: 0.02em;
    }

    /* ========== BUTTONS ========== */
    .persona-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 26px; min-height: 48px;
      border-radius: 999px;
      font-family: inherit; font-size: 15px; font-weight: 700;
      text-decoration: none; cursor: pointer; border: none;
      letter-spacing: 0.01em;
      transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease, background 0.2s;
    }
    .persona-btn-primary {
      background: linear-gradient(135deg, var(--p-accent), var(--p-green));
      color: #fff;
      box-shadow: 0 6px 24px color-mix(in srgb, var(--p-accent) 28%, transparent);
    }
    .persona-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px color-mix(in srgb, var(--p-accent) 32%, transparent); }
    .persona-btn-ghost {
      background: #fff; color: var(--p-text);
      border: 1px solid var(--p-border-2);
    }
    .persona-btn-ghost:hover { border-color: var(--p-accent); color: var(--p-accent); transform: translateY(-1px); }

    /* ========== SECTION FRAME ========== */
    .persona-section { padding: clamp(64px, 10vw, 120px) clamp(20px, 4vw, 48px); }
    .persona-section-alt { background: #fff; border-top: 1px solid var(--p-border); border-bottom: 1px solid var(--p-border); }
    .persona-section-inner { max-width: 1200px; margin: 0 auto; }
    .persona-section-head { margin-bottom: clamp(40px, 5vw, 64px); max-width: 760px; }
    .persona-section-eyebrow {
      display: inline-flex; align-items: center; gap: 12px;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; letter-spacing: 0.18em;
      color: var(--p-green-deep);
      text-transform: uppercase;
      margin-bottom: 16px; font-weight: 700;
    }
    .persona-h2 {
      font-weight: 900; font-size: clamp(28px, 4vw, 48px);
      line-height: 1.18; letter-spacing: -0.025em;
      margin: 0 0 20px;
    }
    .persona-h2 em {
      font-style: normal;
      background: linear-gradient(135deg, var(--p-accent), var(--p-cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .persona-section-sub {
      font-size: clamp(15px, 1.8vw, 17px);
      line-height: 1.85; color: var(--p-sub);
      max-width: 640px;
    }

    /* ========== PAINS ========== */
    .persona-pains {
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: clamp(20px, 2vw, 28px);
    }
    .persona-pain-card {
      background: #fff;
      border: 1px solid var(--p-border);
      border-radius: 22px;
      padding: clamp(28px, 3vw, 36px);
      display: flex; flex-direction: column; gap: 16px;
      transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s, box-shadow 0.3s;
    }
    .persona-pain-card:hover {
      transform: translateY(-3px);
      border-color: var(--p-accent);
      box-shadow: 0 24px 48px -24px color-mix(in srgb, var(--p-accent) 24%, transparent);
    }
    .persona-pain-num {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 13px; font-weight: 700; letter-spacing: 0.12em;
      color: var(--p-accent);
    }
    .persona-pain-title {
      font-size: clamp(18px, 1.8vw, 22px); font-weight: 800;
      line-height: 1.4; color: var(--p-text); margin: 0;
      letter-spacing: -0.015em;
    }
    .persona-pain-body {
      font-size: 14.5px; line-height: 1.85; color: var(--p-sub); margin: 0;
    }
    .persona-pain-signal {
      display: flex; align-items: flex-start; gap: 10px;
      font-size: 12.5px; line-height: 1.7; color: var(--p-green-deep);
      background: color-mix(in srgb, var(--p-accent) 6%, #fff);
      border-left: 2px solid var(--p-accent);
      padding: 12px 14px; border-radius: 0 10px 10px 0;
      font-weight: 600;
      margin-top: auto;
    }
    .persona-pain-signal-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--p-accent); flex-shrink: 0; margin-top: 7px;
    }

    /* ========== MODULES ========== */
    .persona-modules {
      display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: clamp(20px, 2vw, 28px);
    }
    .persona-module-card {
      background: #fff;
      border: 1px solid var(--p-border);
      border-radius: 22px;
      padding: clamp(24px, 2.5vw, 32px);
      text-decoration: none;
      color: var(--p-text);
      display: flex; flex-direction: column; gap: 16px;
      transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s, box-shadow 0.3s;
      box-shadow: 0 1px 2px rgba(10, 14, 12, 0.04);
    }
    .persona-module-card:hover {
      transform: translateY(-3px);
      border-color: var(--m-color);
      box-shadow: 0 24px 48px -24px color-mix(in srgb, var(--m-color) 28%, transparent);
    }
    .persona-module-head { display: flex; align-items: center; gap: 10px; }
    .persona-module-dot {
      width: 10px; height: 10px; border-radius: 50%; background: var(--m-color);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--m-color) 14%, transparent);
    }
    .persona-module-name {
      font-size: 15px; font-weight: 800; color: var(--p-text);
      letter-spacing: -0.01em;
    }
    .persona-module-desc {
      font-size: 14px; line-height: 1.75; color: var(--p-sub); margin: 0;
    }
    .persona-module-reason {
      padding: 14px 16px;
      background: color-mix(in srgb, var(--m-color) 5%, #fafaf7);
      border-radius: 12px;
      border: 1px solid color-mix(in srgb, var(--m-color) 14%, transparent);
    }
    .persona-module-reason-label {
      display: inline-block;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--m-color); font-weight: 700; margin-bottom: 6px;
    }
    .persona-module-reason p {
      font-size: 13.5px; line-height: 1.7; color: var(--p-text); margin: 0;
    }
    .persona-module-cta {
      display: inline-flex; align-items: center; gap: 6px;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 12px; letter-spacing: 0.06em;
      color: var(--m-color); font-weight: 700;
      margin-top: auto;
    }
    .persona-module-card:hover .persona-module-cta svg { transform: translateX(3px); }
    .persona-module-cta svg { transition: transform 0.25s ease; }

    /* ========== CASE STUDY CHIPS ========== */
    .persona-case-chips {
      display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: clamp(16px, 2vw, 24px);
    }
    .persona-case-chip {
      background: #fff; border: 1px solid var(--p-border); border-radius: 18px;
      padding: 22px; text-decoration: none; color: var(--p-text);
      display: flex; flex-direction: column; gap: 14px;
      transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
    }
    .persona-case-chip:hover {
      transform: translateY(-2px);
      border-color: var(--p-green-deep);
      box-shadow: 0 18px 36px -18px rgba(6, 95, 70, 0.2);
    }
    .persona-case-chip-head {
      display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 28px;
    }
    .persona-case-chip-logo {
      position: relative; width: 96px; height: 24px;
    }
    .persona-case-chip-company {
      font-size: 13px; font-weight: 800; color: var(--p-text);
    }
    .persona-case-chip-industry {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--p-mute);
      padding: 4px 8px; background: #fafaf7; border-radius: 999px;
    }
    .persona-case-chip-metric-row {
      display: flex; align-items: baseline; gap: 8px;
    }
    .persona-case-chip-metric {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 28px; font-weight: 800;
      background: linear-gradient(135deg, var(--p-text), var(--p-green-deep));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      letter-spacing: -0.02em;
    }
    .persona-case-chip-metric-label { font-size: 11px; color: var(--p-sub); font-weight: 600; }
    .persona-case-chip-title {
      font-size: 13.5px; line-height: 1.6; color: var(--p-sub); margin: 0;
      display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
    }
    .persona-case-chip-cta {
      margin-top: auto;
      display: inline-flex; align-items: center; gap: 6px;
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; color: var(--p-green-deep);
      font-weight: 700; letter-spacing: 0.06em;
    }
    .persona-case-more { margin-top: 32px; text-align: center; }
    .persona-case-more-link {
      display: inline-flex; align-items: center; gap: 8px;
      color: var(--p-green-deep); font-weight: 700; font-size: 14px;
      text-decoration: none; border-bottom: 1px solid currentColor;
      padding-bottom: 2px;
    }

    /* ========== ROI BLOCK ========== */
    .persona-roi {
      padding: clamp(56px, 8vw, 96px) clamp(20px, 4vw, 48px);
      background:
        radial-gradient(circle 240px at 90% 20%, color-mix(in srgb, var(--p-accent) 18%, transparent), transparent 65%),
        radial-gradient(circle 200px at 10% 80%, rgba(124, 92, 252, 0.14), transparent 65%),
        #0a0e0c;
      color: #fff;
      position: relative; overflow: hidden;
    }
    .persona-roi-inner {
      max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; align-items: center;
    }
    .persona-roi-head .persona-section-eyebrow { color: color-mix(in srgb, var(--p-accent) 80%, #fff); }
    .persona-roi-h {
      font-weight: 900; font-size: clamp(26px, 3.5vw, 40px);
      line-height: 1.22; letter-spacing: -0.025em; margin: 0 0 16px; color: #fff;
    }
    .persona-roi-h em {
      font-style: normal;
      background: linear-gradient(135deg, var(--p-accent), #6ee7b7);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .persona-roi-sub {
      font-size: 15px; line-height: 1.85; color: rgba(255, 255, 255, 0.78); margin: 0;
    }
    .persona-roi-cta { justify-self: end; }
    @media (max-width: 900px) {
      .persona-roi-inner { grid-template-columns: 1fr; gap: 28px; }
      .persona-roi-cta { justify-self: start; }
    }

    /* ========== FAQ ========== */
    .persona-faq {
      max-width: 880px; margin: 0;
      display: flex; flex-direction: column; gap: 12px;
    }
    .persona-faq-item {
      background: #fafaf7;
      border: 1px solid var(--p-border);
      border-radius: 18px;
      padding: 24px 28px;
    }
    .persona-faq-q {
      display: flex; align-items: flex-start; gap: 14px;
      font-size: 16px; font-weight: 800; color: var(--p-text);
      line-height: 1.55; letter-spacing: -0.005em;
      margin: 0 0 12px;
    }
    .persona-faq-num {
      font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
      font-size: 11px; font-weight: 700;
      color: var(--p-accent); letter-spacing: 0.08em;
      padding-top: 4px; flex-shrink: 0;
    }
    .persona-faq-a {
      font-size: 14.5px; line-height: 1.9; color: var(--p-sub);
      margin: 0; padding-left: 38px;
    }

    /* ========== FINAL CTA ========== */
    .persona-cta {
      padding: clamp(72px, 10vw, 120px) clamp(20px, 4vw, 48px);
      background:
        radial-gradient(circle 320px at 80% -40px, color-mix(in srgb, var(--p-accent) 22%, transparent), transparent 70%),
        radial-gradient(circle 240px at 0% 100%, rgba(124, 92, 252, 0.16), transparent 65%),
        #fafaf7;
      border-top: 1px solid var(--p-border);
      text-align: center;
    }
    .persona-cta-inner { max-width: 760px; margin: 0 auto; }
    .persona-cta-h {
      font-weight: 900; font-size: clamp(28px, 4vw, 48px);
      line-height: 1.22; letter-spacing: -0.025em; margin: 16px 0 20px;
    }
    .persona-cta-h em {
      font-style: normal;
      background: linear-gradient(135deg, var(--p-accent), var(--p-cyan));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .persona-cta-p {
      font-size: clamp(15px, 1.8vw, 17px);
      line-height: 1.85; color: var(--p-sub);
      max-width: 580px; margin: 0 auto 32px;
    }
    .persona-cta-buttons {
      display: inline-flex; gap: 14px; flex-wrap: wrap; justify-content: center;
    }
    .persona-cta .persona-section-eyebrow { justify-content: center; }

    /* ========== RESPONSIVE ========== */
    @media (max-width: 1024px) {
      .persona-case-chips { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 820px) {
      .persona-pains { grid-template-columns: 1fr; }
      .persona-modules { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .persona-case-chips { grid-template-columns: 1fr; }
      .persona-hero-proof { grid-template-columns: 1fr; gap: 18px; }
      .persona-proof-stat { padding: 0; }
      .persona-proof-stat:not(:first-child)::before { display: none; }
      .persona-proof-stat:not(:first-child) {
        border-top: 1px solid var(--p-border); padding-top: 16px;
      }
      .persona-faq-a { padding-left: 0; }
    }
  `
}
