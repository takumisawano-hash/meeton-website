import Link from 'next/link'
import Image from 'next/image'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FAQJsonLd from '../components/FAQJsonLd'
import DemoBookingButton from '../components/DemoBookingButton'
import { getAllCaseStudies, type CaseStudy } from '../lib/case-studies'
import { FEATURED_CASE_EN } from '../lib/featured-cases'
import type { Lang } from '../lib/i18n'

// Fixed section chrome. JA is the default → existing call sites omit `lang`
// and render byte-identically. `industry` is the per-page industry label
// (industryJa for JA, industryEn for EN).
const UC_CHROME = {
  ja: {
    heroDemoCta: '業界別デモを30分で見る',
    heroCasesCta: '事例を見る',
    painsEyebrow: (industry: string) => `${industry}における課題`,
    modulesEyebrow: 'Meeton ai の AI 機能群',
    modulesH2lead: (industry: string) => `${industry} の営業課題を、`,
    modulesH2em: 'AI SDR が連動して解く。',
    moduleAngleLabel: (industry: string) => `${industry}向け`,
    moduleLink: '詳しく見る',
    caseEyebrow: (industry: string) => `${industry}の導入事例`,
    caseH2: '数字で語る、現場の成果。',
    caseCta: '事例を読む',
    intEyebrow: (industry: string) => `${industry}で多い連携先`,
    intH2lead: '既存のセールススタックを',
    intH2em: '置き換えずに、強化する。',
    faqEyebrow: 'よくある質問',
    faqH2lead: (industry: string) => `${industry}担当者からの`,
    faqH2em: (_industry: string) => '頻出質問',
    ctaEyebrow: 'Next Step',
    ctaH2lead: (industry: string) => `${industry}のリードを、`,
    ctaH2em: (_industry: string) => '商談化するAI SDR を見る。',
    ctaP: ['30分のデモで、貴社の業界特有のリード行動に対して', 'Meeton ai が具体的にどう応答・予約するかをご覧いただけます。'],
    ctaPrimary: '30分デモを予約する',
    ctaGhost: '資料請求',
  },
  en: {
    heroDemoCta: 'See an industry demo in 30 min',
    heroCasesCta: 'See customer stories',
    painsEyebrow: (industry: string) => `Challenges in ${industry}`,
    modulesEyebrow: "Meeton ai's AI capabilities",
    modulesH2lead: (industry: string) => `Solving ${industry} sales challenges,`,
    modulesH2em: 'with an AI SDR working in concert.',
    moduleAngleLabel: (industry: string) => `For ${industry}`,
    moduleLink: 'Learn more',
    caseEyebrow: (industry: string) => `${industry} customer story`,
    caseH2: 'Results from the field, told in numbers.',
    caseCta: 'Read the story',
    intEyebrow: (industry: string) => `Common integrations in ${industry}`,
    intH2lead: 'Strengthen your existing sales stack',
    intH2em: 'without replacing it.',
    faqEyebrow: 'FAQ',
    faqH2lead: (_industry: string) => `Frequent questions from `,
    faqH2em: (industry: string) => `${industry} teams`,
    ctaEyebrow: 'Next Step',
    ctaH2lead: (_industry: string) => `See the AI SDR that turns `,
    ctaH2em: (industry: string) => `${industry} leads into meetings.`,
    ctaP: ['In a 30-minute demo, see concretely how Meeton ai responds to', "and books your industry's specific lead behavior."],
    ctaPrimary: 'Book a 30-min demo',
    ctaGhost: 'Request materials',
  },
} as const

// ──────────────────────────────────────────────────────────────────
// Industry-specific landing page component
// Server-rendered, SSG. Renders Hero + Pain + Module Mapping +
// Mini case-study + Integration callouts + CTA + FAQ + JSON-LD.
// All copy is per-industry via props; visual chrome is shared.
// ──────────────────────────────────────────────────────────────────

export type UseCaseModule = {
  badge: string
  name: string
  href: string
  description: string
  industryAngle: string
}

export type UseCasePain = {
  title: string
  description: string
  metric?: string
  metricLabel?: string
}

export type UseCaseIntegration = {
  slug: string
  name: string
  logo: string
  reason: string
}

export type UseCaseFAQ = {
  question: string
  answer: string
}

export type UseCasePageProps = {
  industrySlug: string
  industryEn: string
  industryJa: string
  accentColor: string
  accentDeep: string
  accentLight: string
  accentGlow: string
  eyebrow: string
  heroTitleLead: string
  heroTitleAccent: string
  heroSub: string
  personaStatement: string
  pains: UseCasePain[]
  painsLead: string
  modules: UseCaseModule[]
  integrations: UseCaseIntegration[]
  faqs: UseCaseFAQ[]
  caseStudyMatcher: (cs: CaseStudy) => boolean
  pageUrl: string
  utmCampaign: string
  /** locale (JA default). EN swaps the fixed section chrome + Nav/Footer; the
   *  per-industry props above are passed pre-translated by the /en wrapper. */
  lang?: Lang
}

export default async function UseCasePageClient(props: UseCasePageProps) {
  const all = await getAllCaseStudies().catch(() => [] as CaseStudy[])
  const matchedRaw = all.find(props.caseStudyMatcher) ?? null
  const lang: Lang = props.lang ?? 'ja'
  // EN pages: overlay the (Japanese, Notion-sourced) matched case with the
  // translated fields from featured-cases.ts; drop the JA quote attribution.
  const matchedEn = matchedRaw && lang === 'en' ? FEATURED_CASE_EN[matchedRaw.slug] : undefined
  const matched = matchedRaw && matchedEn
    ? {
        ...matchedRaw,
        company: matchedEn.name ?? matchedRaw.company,
        industry: matchedEn.industry ?? matchedRaw.industry,
        title: matchedEn.title ?? matchedRaw.title,
        heroMetric: matchedEn.heroMetric ?? matchedRaw.heroMetric,
        heroMetricLabel: matchedEn.heroMetricLabel ?? matchedRaw.heroMetricLabel,
        quote: matchedEn.quote ?? matchedRaw.quote,
        quotePerson: undefined,
      }
    : matchedRaw
  const t = UC_CHROME[lang]
  // The industry label used inside chrome strings: EN pages use industryEn,
  // JA pages use industryJa (preserves byte-identical JA output).
  const industryLabel = lang === 'en' ? props.industryEn : props.industryJa

  return (
    <div className="uc-root" style={{
      // CSS variables drive the entire accent palette
      ['--uc-accent' as string]: props.accentColor,
      ['--uc-accent-deep' as string]: props.accentDeep,
      ['--uc-accent-light' as string]: props.accentLight,
      ['--uc-accent-glow' as string]: props.accentGlow,
    }}>
      <FAQJsonLd items={props.faqs} pageUrl={props.pageUrl} />
      <Nav variant="light" lang={lang} />

      {/* ────── HERO ────── */}
      <section className="uc-hero">
        <div className="uc-hero-grid" aria-hidden />
        <div className="uc-hero-inner">
          <div className="uc-eyebrow">
            <span className="uc-eyebrow-dash" />
            {props.eyebrow}
            <span className="uc-eyebrow-tag">{props.industryEn}</span>
          </div>
          <h1 className="uc-hero-h1">
            {props.heroTitleLead}
            <br />
            <em>{props.heroTitleAccent}</em>
          </h1>
          <p className="uc-hero-sub">{props.heroSub}</p>
          <div className="uc-hero-persona">
            <span className="uc-hero-persona-mark" aria-hidden>“</span>
            {props.personaStatement}
          </div>
          <div className="uc-hero-ctas">
            <DemoBookingButton
              className="uc-btn uc-btn-primary"
              utmCampaign={props.utmCampaign}
            >
              {t.heroDemoCta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </DemoBookingButton>
            <Link href="/case-studies/" className="uc-btn uc-btn-ghost">
              {t.heroCasesCta}
            </Link>
          </div>
        </div>
      </section>

      {/* ────── PAIN ────── */}
      <section className="uc-section">
        <div className="uc-section-inner">
          <div className="uc-section-head">
            <div className="uc-section-eyebrow">
              <span className="uc-eyebrow-dash" />
              {t.painsEyebrow(industryLabel)}
            </div>
            <h2 className="uc-section-h2">{props.painsLead}</h2>
          </div>
          <div className="uc-pain-grid">
            {props.pains.map((pain, idx) => (
              <div key={idx} className="uc-pain-card">
                <div className="uc-pain-num">0{idx + 1}</div>
                <h3 className="uc-pain-title">{pain.title}</h3>
                <p className="uc-pain-desc">{pain.description}</p>
                {pain.metric && (
                  <div className="uc-pain-metric-row">
                    <div className="uc-pain-metric">{pain.metric}</div>
                    {pain.metricLabel && (
                      <div className="uc-pain-metric-label">{pain.metricLabel}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── SOLUTION / MODULE MAPPING ────── */}
      <section className="uc-section uc-section-alt">
        <div className="uc-section-inner">
          <div className="uc-section-head">
            <div className="uc-section-eyebrow">
              <span className="uc-eyebrow-dash" />
              {t.modulesEyebrow}
            </div>
            <h2 className="uc-section-h2">
              {t.modulesH2lead(industryLabel)}<br />
              <em>{t.modulesH2em}</em>
            </h2>
          </div>
          <div className="uc-mod-grid">
            {props.modules.map((mod) => (
              <Link key={mod.href} href={mod.href} className="uc-mod-card">
                <div className="uc-mod-badge">{mod.badge}</div>
                <h3 className="uc-mod-name">{mod.name}</h3>
                <p className="uc-mod-desc">{mod.description}</p>
                <div className="uc-mod-angle">
                  <div className="uc-mod-angle-label">{t.moduleAngleLabel(industryLabel)}</div>
                  <p>{mod.industryAngle}</p>
                </div>
                <span className="uc-mod-link">
                  {t.moduleLink}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────── CASE STUDY (if matched) ────── */}
      {matched && (
        <section className="uc-section">
          <div className="uc-section-inner">
            <div className="uc-section-head">
              <div className="uc-section-eyebrow">
                <span className="uc-eyebrow-dash" />
                {t.caseEyebrow(industryLabel)}
              </div>
              <h2 className="uc-section-h2">{t.caseH2}</h2>
            </div>
            <Link href={lang === 'en' ? `/en/cases/${matched.slug}/` : `/case-studies/${matched.slug}/`} className="uc-cs-card">
              <div className="uc-cs-media">
                {matched.heroImage ? (
                  <Image
                    src={matched.heroImage}
                    alt={matched.company}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 900px) 100vw, 540px"
                  />
                ) : (
                  <div className="uc-cs-media-fallback" />
                )}
                <span className="uc-cs-media-badge">{matched.industry || industryLabel}</span>
              </div>
              <div className="uc-cs-body">
                <div className="uc-cs-company">
                  {matched.companyLogo ? (
                    <div className="uc-cs-logo">
                      <Image
                        src={matched.companyLogo}
                        alt={matched.company}
                        fill
                        style={{ objectFit: 'contain', objectPosition: 'left center' }}
                        sizes="160px"
                      />
                    </div>
                  ) : (
                    <span className="uc-cs-company-name">{matched.company}</span>
                  )}
                </div>
                <h3 className="uc-cs-title">{matched.title}</h3>
                {matched.heroMetric && (
                  <div className="uc-cs-metric-row">
                    <div className="uc-cs-metric">{matched.heroMetric}</div>
                    <div className="uc-cs-metric-label">{matched.heroMetricLabel}</div>
                  </div>
                )}
                {matched.quote && (
                  <blockquote className="uc-cs-quote">
                    <span className="uc-cs-quote-mark" aria-hidden>“</span>
                    {matched.quote}
                    {matched.quotePerson && (
                      <cite className="uc-cs-quote-cite">— {matched.quotePerson}</cite>
                    )}
                  </blockquote>
                )}
                <span className="uc-cs-cta">
                  {t.caseCta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ────── INTEGRATIONS ────── */}
      <section className="uc-section uc-section-alt">
        <div className="uc-section-inner">
          <div className="uc-section-head">
            <div className="uc-section-eyebrow">
              <span className="uc-eyebrow-dash" />
              {t.intEyebrow(industryLabel)}
            </div>
            <h2 className="uc-section-h2">
              {t.intH2lead}<br />
              <em>{t.intH2em}</em>
            </h2>
          </div>
          <div className="uc-int-grid">
            {props.integrations.map((it) => (
              <Link key={it.slug} href={`/integrations/${it.slug}/`} className="uc-int-card">
                <div className="uc-int-logo">
                  <Image
                    src={it.logo}
                    alt={it.name}
                    width={48}
                    height={48}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="uc-int-body">
                  <h3 className="uc-int-name">{it.name}</h3>
                  <p className="uc-int-reason">{it.reason}</p>
                </div>
                <svg className="uc-int-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────── FAQ ────── */}
      <section className="uc-section">
        <div className="uc-section-inner uc-faq-inner">
          <div className="uc-section-head">
            <div className="uc-section-eyebrow">
              <span className="uc-eyebrow-dash" />
              {t.faqEyebrow}
            </div>
            <h2 className="uc-section-h2">{t.faqH2lead(industryLabel)}<em>{t.faqH2em(industryLabel)}</em></h2>
          </div>
          <div className="uc-faq-list">
            {props.faqs.map((faq, idx) => (
              <details key={idx} className="uc-faq-item">
                <summary className="uc-faq-q">
                  <span className="uc-faq-q-num">Q{(idx + 1).toString().padStart(2, '0')}</span>
                  {faq.question}
                  <span className="uc-faq-q-icon" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className="uc-faq-a">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ────── CTA ────── */}
      <section className="uc-cta">
        <div className="uc-cta-inner">
          <div className="uc-section-eyebrow uc-cta-eyebrow">
            <span className="uc-eyebrow-dash" />
            {t.ctaEyebrow}
          </div>
          <h2 className="uc-cta-h">
            {t.ctaH2lead(industryLabel)}<br />
            <em>{t.ctaH2em(industryLabel)}</em>
          </h2>
          <p className="uc-cta-p">
            {t.ctaP[0]}<br />
            {t.ctaP[1]}
          </p>
          <div className="uc-cta-buttons">
            <DemoBookingButton
              className="uc-btn uc-btn-primary uc-btn-lg"
              utmCampaign={props.utmCampaign}
            >
              {t.ctaPrimary}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </DemoBookingButton>
            <Link href="/contact/" className="uc-btn uc-btn-ghost uc-btn-lg">
              {t.ctaGhost}
            </Link>
          </div>
        </div>
      </section>

      <Footer variant="light" lang={lang} />

      <style>{`
        .uc-root {
          background: #fafaf7;
          color: #0a0e0c;
          min-height: 100vh;
          --uc-border: #e4e3dd;
          --uc-border-2: #d8d7d0;
          --uc-text: #0a0e0c;
          --uc-sub: #3d4541;
          --uc-mute: #82897f;
        }

        /* ──────── HERO ──────── */
        .uc-hero {
          position: relative;
          padding: clamp(120px, 16vw, 180px) clamp(20px, 4vw, 48px) clamp(56px, 8vw, 88px);
          border-bottom: 1px solid var(--uc-border);
          overflow: hidden;
          background:
            radial-gradient(circle 380px at calc(100% - 60px) -100px, var(--uc-accent-glow), transparent 70%),
            radial-gradient(circle 320px at -60px calc(100% - 60px), var(--uc-accent-light), transparent 70%),
            radial-gradient(ellipse 80% 60% at 20% 0%, var(--uc-accent-light), transparent 65%),
            #fafaf7;
        }
        .uc-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle, rgba(10, 14, 12, 0.06) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse at top, black 30%, transparent 80%);
          pointer-events: none;
        }
        .uc-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
        }
        .uc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--uc-accent-deep);
          text-transform: uppercase;
          margin-bottom: 24px;
          font-weight: 700;
        }
        .uc-eyebrow-dash {
          width: 24px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--uc-accent));
        }
        .uc-eyebrow-tag {
          color: var(--uc-mute);
          font-weight: 600;
          padding-left: 8px;
          border-left: 1px solid var(--uc-border);
        }
        .uc-hero-h1 {
          font-weight: 900;
          font-size: clamp(38px, 6vw, 76px);
          line-height: 1.1;
          letter-spacing: -0.035em;
          margin: 0 0 28px;
          word-break: keep-all;
          max-width: 920px;
        }
        .uc-hero-h1 em {
          font-style: normal;
          background: linear-gradient(135deg, var(--uc-accent-deep) 0%, var(--uc-accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .uc-hero-sub {
          font-size: clamp(15px, 2vw, 19px);
          line-height: 1.85;
          color: var(--uc-sub);
          max-width: 680px;
          margin: 0 0 28px;
        }
        .uc-hero-persona {
          max-width: 720px;
          padding: 20px 24px;
          border-left: 3px solid var(--uc-accent);
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(6px);
          font-size: clamp(14px, 1.8vw, 16px);
          line-height: 1.75;
          color: var(--uc-sub);
          margin: 0 0 40px;
          border-radius: 0 12px 12px 0;
          font-weight: 500;
        }
        .uc-hero-persona-mark {
          font-family: 'Plus Jakarta Sans', Georgia, serif;
          font-size: 28px;
          line-height: 0;
          color: var(--uc-accent);
          font-weight: 800;
          margin-right: 6px;
          vertical-align: -4px;
        }
        .uc-hero-ctas {
          display: inline-flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* ──────── BUTTONS ──────── */
        .uc-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          cursor: pointer;
          transition:
            transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 0.25s ease,
            background 0.2s ease,
            border-color 0.2s ease;
          min-height: 48px;
          border: none;
          font-family: inherit;
          -webkit-tap-highlight-color: transparent;
        }
        .uc-btn-lg {
          padding: 16px 32px;
          font-size: 16px;
          min-height: 52px;
        }
        .uc-btn-primary {
          background: linear-gradient(135deg, var(--uc-accent-deep), var(--uc-accent));
          color: #fff;
          box-shadow:
            0 6px 20px var(--uc-accent-glow),
            0 1px 0 rgba(255, 255, 255, 0.18) inset;
          letter-spacing: 0.01em;
        }
        .uc-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow:
            0 12px 32px var(--uc-accent-glow),
            0 1px 0 rgba(255, 255, 255, 0.22) inset;
        }
        .uc-btn-primary svg {
          transition: transform 0.25s ease;
        }
        .uc-btn-primary:hover svg {
          transform: translateX(3px);
        }
        .uc-btn-ghost {
          background: #fff;
          color: var(--uc-text);
          border: 1.5px solid var(--uc-border-2);
        }
        .uc-btn-ghost:hover {
          border-color: var(--uc-accent-deep);
          color: var(--uc-accent-deep);
          background: var(--uc-accent-light);
          transform: translateY(-1px);
        }

        /* ──────── SECTIONS ──────── */
        .uc-section {
          padding: clamp(64px, 9vw, 112px) clamp(20px, 4vw, 48px);
        }
        .uc-section-alt {
          background: #fff;
          border-top: 1px solid var(--uc-border);
          border-bottom: 1px solid var(--uc-border);
        }
        .uc-section-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .uc-section-head {
          max-width: 760px;
          margin-bottom: clamp(40px, 5vw, 64px);
        }
        .uc-section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--uc-accent-deep);
          text-transform: uppercase;
          margin-bottom: 20px;
          font-weight: 700;
        }
        .uc-section-h2 {
          font-weight: 900;
          font-size: clamp(28px, 4.5vw, 48px);
          line-height: 1.2;
          letter-spacing: -0.025em;
          margin: 0;
          word-break: keep-all;
        }
        .uc-section-h2 em {
          font-style: normal;
          background: linear-gradient(135deg, var(--uc-accent-deep), var(--uc-accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ──────── PAIN GRID ──────── */
        .uc-pain-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(16px, 2.5vw, 24px);
        }
        @media (max-width: 900px) {
          .uc-pain-grid {
            grid-template-columns: 1fr;
          }
        }
        .uc-pain-card {
          padding: 28px;
          background: #fff;
          border: 1px solid var(--uc-border);
          border-radius: 20px;
          position: relative;
          transition: border-color 0.25s ease, transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .uc-pain-card:hover {
          transform: translateY(-3px);
          border-color: var(--uc-accent);
          box-shadow: 0 24px 48px -24px var(--uc-accent-glow);
        }
        .uc-pain-num {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--uc-accent-deep);
          margin-bottom: 16px;
          padding: 4px 10px;
          width: fit-content;
          border-radius: 999px;
          background: var(--uc-accent-light);
        }
        .uc-pain-title {
          font-weight: 800;
          font-size: clamp(17px, 2vw, 20px);
          line-height: 1.4;
          letter-spacing: -0.015em;
          margin: 0 0 12px;
          color: var(--uc-text);
        }
        .uc-pain-desc {
          font-size: 14px;
          line-height: 1.8;
          color: var(--uc-sub);
          margin: 0;
          flex: 1;
        }
        .uc-pain-metric-row {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px dashed var(--uc-border);
          display: flex;
          align-items: baseline;
          gap: 10px;
        }
        .uc-pain-metric {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-weight: 800;
          font-size: 26px;
          color: var(--uc-accent-deep);
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .uc-pain-metric-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--uc-mute);
          letter-spacing: 0.03em;
        }

        /* ──────── MODULE GRID ──────── */
        .uc-mod-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(16px, 2vw, 24px);
        }
        @media (max-width: 800px) {
          .uc-mod-grid {
            grid-template-columns: 1fr;
          }
        }
        .uc-mod-card {
          padding: 32px;
          background: #fff;
          border: 1px solid var(--uc-border);
          border-radius: 22px;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          color: var(--uc-text);
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: transform 0.3s ease, border-color 0.25s ease, box-shadow 0.3s ease;
        }
        .uc-mod-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--uc-accent);
          opacity: 0.85;
          transition: height 0.25s ease, opacity 0.25s ease;
        }
        .uc-mod-card:hover {
          transform: translateY(-4px);
          border-color: var(--uc-accent-deep);
          box-shadow: 0 28px 56px -24px var(--uc-accent-glow);
        }
        .uc-mod-card:hover::before {
          height: 5px;
          opacity: 1;
        }
        .uc-mod-badge {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--uc-accent-deep);
          padding: 5px 12px;
          background: var(--uc-accent-light);
          border-radius: 999px;
          width: fit-content;
        }
        .uc-mod-name {
          font-weight: 800;
          font-size: clamp(20px, 2.4vw, 26px);
          letter-spacing: -0.02em;
          line-height: 1.3;
          margin: 0;
        }
        .uc-mod-desc {
          font-size: 14px;
          line-height: 1.8;
          color: var(--uc-sub);
          margin: 0;
        }
        .uc-mod-angle {
          padding: 16px 18px;
          background: #fafaf7;
          border: 1px solid var(--uc-border);
          border-radius: 12px;
          margin-top: auto;
        }
        .uc-mod-angle-label {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--uc-accent-deep);
          margin-bottom: 8px;
        }
        .uc-mod-angle p {
          font-size: 13.5px;
          line-height: 1.7;
          color: var(--uc-text);
          margin: 0;
          font-weight: 500;
        }
        .uc-mod-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12px;
          color: var(--uc-accent-deep);
          letter-spacing: 0.04em;
          font-weight: 700;
          padding-top: 8px;
        }
        .uc-mod-card:hover .uc-mod-link svg {
          transform: translateX(3px);
        }
        .uc-mod-link svg {
          transition: transform 0.25s ease;
        }

        /* ──────── CASE STUDY ──────── */
        .uc-cs-card {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
          background: #fff;
          border: 1px solid var(--uc-border);
          border-radius: 26px;
          overflow: hidden;
          text-decoration: none;
          color: var(--uc-text);
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, box-shadow 0.4s ease;
        }
        .uc-cs-card:hover {
          transform: translateY(-4px);
          border-color: var(--uc-accent-deep);
          box-shadow: 0 32px 64px -28px var(--uc-accent-glow);
        }
        @media (max-width: 900px) {
          .uc-cs-card { grid-template-columns: 1fr; }
        }
        .uc-cs-media {
          position: relative;
          min-height: 400px;
          overflow: hidden;
        }
        .uc-cs-media img { transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .uc-cs-card:hover .uc-cs-media img { transform: scale(1.04); }
        .uc-cs-media-fallback {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 30% 30%, var(--uc-accent-glow), transparent 50%),
            radial-gradient(circle at 70% 70%, var(--uc-accent-light), transparent 50%),
            #f3f2ed;
        }
        .uc-cs-media-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          padding: 8px 14px;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--uc-accent-deep);
          box-shadow: 0 4px 16px rgba(10, 14, 12, 0.08);
        }
        .uc-cs-body {
          padding: clamp(28px, 4vw, 48px);
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
        }
        .uc-cs-company { min-height: 40px; display: flex; align-items: center; }
        .uc-cs-logo { position: relative; width: 160px; height: 40px; }
        .uc-cs-company-name { font-weight: 800; font-size: 20px; }
        .uc-cs-title {
          font-weight: 800;
          font-size: clamp(22px, 2.4vw, 30px);
          line-height: 1.35;
          letter-spacing: -0.02em;
          margin: 0;
          word-break: break-word;
        }
        .uc-cs-metric-row {
          display: flex;
          align-items: baseline;
          gap: 16px;
          padding: 16px 0;
          border-top: 1px solid var(--uc-border);
          border-bottom: 1px solid var(--uc-border);
        }
        .uc-cs-metric {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-weight: 800;
          font-size: clamp(36px, 5vw, 56px);
          color: var(--uc-accent-deep);
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .uc-cs-metric-label {
          font-size: 13px;
          color: var(--uc-sub);
          line-height: 1.5;
          font-weight: 600;
        }
        .uc-cs-quote {
          margin: 0;
          padding: 0;
          font-size: 14.5px;
          line-height: 1.85;
          color: var(--uc-sub);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
        }
        .uc-cs-quote-mark {
          font-family: 'Plus Jakarta Sans', Georgia, serif;
          font-size: 32px;
          line-height: 0.8;
          color: var(--uc-accent);
          font-weight: 800;
          margin-right: 4px;
          vertical-align: -6px;
        }
        .uc-cs-quote-cite {
          display: block;
          margin-top: 10px;
          font-size: 12px;
          color: var(--uc-mute);
          font-style: normal;
          font-weight: 600;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          letter-spacing: 0.04em;
        }
        .uc-cs-cta {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 13px;
          color: var(--uc-accent-deep);
          letter-spacing: 0.04em;
          font-weight: 700;
          padding: 10px 16px;
          border-radius: 999px;
          background: var(--uc-accent-light);
          transition: all 0.25s ease;
          width: fit-content;
          min-height: 44px;
        }
        .uc-cs-card:hover .uc-cs-cta {
          background: var(--uc-accent-deep);
          color: #fff;
        }
        .uc-cs-cta svg { transition: transform 0.25s ease; }
        .uc-cs-card:hover .uc-cs-cta svg { transform: translateX(3px); }

        /* ──────── INTEGRATIONS ──────── */
        .uc-int-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(12px, 2vw, 20px);
        }
        @media (max-width: 720px) {
          .uc-int-grid { grid-template-columns: 1fr; }
        }
        .uc-int-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 24px;
          background: #fafaf7;
          border: 1px solid var(--uc-border);
          border-radius: 16px;
          text-decoration: none;
          color: var(--uc-text);
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .uc-int-card:hover {
          transform: translateY(-2px);
          background: #fff;
          border-color: var(--uc-accent);
          box-shadow: 0 12px 28px -16px var(--uc-accent-glow);
        }
        .uc-int-logo {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border: 1px solid var(--uc-border);
          border-radius: 12px;
        }
        .uc-int-body {
          flex: 1;
          min-width: 0;
        }
        .uc-int-name {
          font-weight: 800;
          font-size: 16px;
          margin: 0 0 4px;
          letter-spacing: -0.01em;
        }
        .uc-int-reason {
          font-size: 13px;
          line-height: 1.6;
          color: var(--uc-sub);
          margin: 0;
        }
        .uc-int-arrow {
          flex-shrink: 0;
          color: var(--uc-mute);
          transition: transform 0.25s ease, color 0.25s ease;
        }
        .uc-int-card:hover .uc-int-arrow {
          color: var(--uc-accent-deep);
          transform: translateX(3px);
        }

        /* ──────── FAQ ──────── */
        .uc-faq-inner { max-width: 920px; }
        .uc-faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .uc-faq-item {
          background: #fff;
          border: 1px solid var(--uc-border);
          border-radius: 14px;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          overflow: hidden;
        }
        .uc-faq-item[open] {
          border-color: var(--uc-accent);
          box-shadow: 0 8px 24px -12px var(--uc-accent-glow);
        }
        .uc-faq-q {
          list-style: none;
          cursor: pointer;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          font-weight: 700;
          font-size: clamp(14px, 1.8vw, 16px);
          letter-spacing: -0.005em;
          line-height: 1.5;
          color: var(--uc-text);
          -webkit-tap-highlight-color: transparent;
        }
        .uc-faq-q::-webkit-details-marker { display: none; }
        .uc-faq-q-num {
          font-family: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--uc-accent-deep);
          padding: 4px 10px;
          background: var(--uc-accent-light);
          border-radius: 6px;
          flex-shrink: 0;
        }
        .uc-faq-q-icon {
          margin-left: auto;
          color: var(--uc-mute);
          transition: transform 0.25s ease;
          flex-shrink: 0;
        }
        .uc-faq-item[open] .uc-faq-q-icon {
          transform: rotate(180deg);
          color: var(--uc-accent-deep);
        }
        .uc-faq-a {
          padding: 0 24px 22px;
          font-size: 14.5px;
          line-height: 1.85;
          color: var(--uc-sub);
        }

        /* ──────── CLOSING CTA ──────── */
        .uc-cta {
          padding: clamp(80px, 12vw, 140px) clamp(20px, 4vw, 48px);
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, var(--uc-accent-glow), transparent 60%),
            linear-gradient(180deg, #f5f5f0 0%, #fafaf7 100%);
          border-top: 1px solid var(--uc-border);
          position: relative;
          overflow: hidden;
        }
        .uc-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle, rgba(10, 14, 12, 0.06) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
          pointer-events: none;
        }
        .uc-cta-inner {
          position: relative;
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }
        .uc-cta-eyebrow {
          justify-content: center;
          margin-bottom: 24px;
          margin-left: auto;
          margin-right: auto;
        }
        .uc-cta-h {
          font-weight: 900;
          font-size: clamp(28px, 5vw, 52px);
          line-height: 1.2;
          letter-spacing: -0.03em;
          margin: 0 0 20px;
          word-break: keep-all;
        }
        .uc-cta-h em {
          font-style: normal;
          background: linear-gradient(135deg, var(--uc-accent-deep), var(--uc-accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .uc-cta-p {
          font-size: clamp(15px, 2vw, 17px);
          line-height: 1.85;
          color: var(--uc-sub);
          margin: 0 0 36px;
        }
        .uc-cta-buttons {
          display: inline-flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* ──────── RESPONSIVE ──────── */
        @media (max-width: 720px) {
          .uc-cta-buttons {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
          }
          .uc-cta-buttons .uc-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
