'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FAQJsonLd from '../components/FAQJsonLd'
import DemoBookingButton from '../components/DemoBookingButton'
import DocRequestButton from '../components/DocRequestButton'

/**
 * SolutionLpTemplate — shared LP shell for the 2026 ads relaunch.
 *
 * Two new LPs sit on top of this template (see /solutions/crm-to-meeting/
 * and /solutions/lead-to-meeting/). The template is intentionally
 * narrow — no carousel, no animation gimmicks — so we can A/B 訴求 + KW
 * quickly without LP-specific CSS drift. Visual quality target is the
 * existing PersonaPage (/for/*), trimmed for paid traffic.
 *
 * Sections (in order):
 *   1. Hero (eyebrow + H1 + sub + 2 CTAs + proof row)
 *   2. Pain (3 cards — what the visitor is feeling today)
 *   3. Solution (3 modules — what Meeton does for them)
 *   4. Proof (case-study chips + numbers)
 *   5. How it works (4 steps)
 *   6. FAQ (FAQPage schema attached)
 *   7. Final CTA
 *
 * Tracking: every CTA uses utmCampaign passed from the page. The page-
 * level body has data-lp-slug set so GA4 page_view picks it up via the
 * AttributionBootstrap reader.
 */

export type SolutionLpConfig = {
  /** URL slug under /solutions/, e.g. "crm-to-meeting". Also used for
   *  data-lp-slug + utm_campaign. */
  slug: string
  /** Eyebrow text, e.g. "For HubSpot / Salesforce ユーザー". */
  eyebrow: string
  /** Hero H1, split into two parts. The second is gradient-emphasized. */
  heroH1: [string, string]
  /** Hero subheadline — 1-2 sentences max. */
  heroSub: string
  /** Right-side stat row in the hero. Max 3. */
  heroProof: { value: string; unit?: string; label: string }[]
  /** Pain blocks. Exactly 3 — keep them concrete, not generic. */
  pains: {
    title: string
    body: string
    /** Hint of evidence (directional, no fabricated stats). */
    signal: string
  }[]
  /** Solution modules. Each maps a pain → a Meeton capability. */
  solutions: {
    badge: string
    title: string
    body: string
    href: string
  }[]
  /** Proof case-study chips. Each links to /case-studies/<slug>/. */
  cases: {
    slug: string
    company: string
    metric: string
    metricLabel: string
  }[]
  /** "How it works" — exactly 4 steps. */
  steps: { title: string; body: string }[]
  /** FAQ items. 4-6 ideal. */
  faqs: { question: string; answer: string }[]
  /** Final-CTA copy. */
  finalCta: { heading: string; sub: string }
  /** Accent color — use brand palette. */
  accent: '#12a37d' | '#0891b2' | '#7c5cfc' | '#3b6ff5' | '#d03ea1'
  /** UTM campaign tag prefix; the per-CTA utm appends the location. */
  utmCampaignBase: string
  /** Full canonical URL of this LP. */
  pageUrl: string
}

/** Read first-touch attribution from localStorage (set by
 *  AttributionBootstrap on root layout). Returns null if missing. */
function useAttribution() {
  const [attr, setAttr] = useState<Record<string, string> | null>(null)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('mlp_attribution')
      if (raw) setAttr(JSON.parse(raw))
    } catch {
      /* ignore */
    }
  }, [])
  return attr
}

export default function SolutionLpTemplate({ config }: { config: SolutionLpConfig }) {
  // Side-effect: tag body with data-lp-slug so GA4 page_view custom
  // dimension picks it up. Avoid mutating from render — useEffect.
  useEffect(() => {
    document.body.setAttribute('data-lp-slug', config.slug)
    return () => {
      document.body.removeAttribute('data-lp-slug')
    }
  }, [config.slug])

  // Pull attribution for personalization hooks (e.g. show different
  // proof to /utm_campaign=crm-to-meeting visitors). Not used in v1
  // but available.
  useAttribution()

  return (
    <div className="sl-root">
      <FAQJsonLd
        items={config.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
        pageUrl={config.pageUrl}
      />
      <Nav variant="light" />

      {/* HERO */}
      <section className="sl-hero" style={{ ['--sl-accent' as string]: config.accent }}>
        <div className="sl-hero-grid" aria-hidden />
        <div className="sl-hero-inner">
          <div className="sl-eyebrow">
            <span className="sl-eyebrow-dash" />
            {config.eyebrow}
          </div>
          <h1 className="sl-h1">
            {config.heroH1[0]}
            <br />
            <em>{config.heroH1[1]}</em>
          </h1>
          <p className="sl-sub">{config.heroSub}</p>

          <div className="sl-ctas">
            <DemoBookingButton
              className="sl-btn sl-btn-primary"
              utmCampaign={`${config.utmCampaignBase}__hero_demo`}
            >
              30 分のデモを予約する
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </DemoBookingButton>
            <DocRequestButton className="sl-btn sl-btn-ghost">
              資料請求
            </DocRequestButton>
          </div>

          {config.heroProof.length > 0 && (
            <div className="sl-proof-row">
              {config.heroProof.map((p, i) => (
                <div key={i} className="sl-proof">
                  <div className="sl-proof-v">
                    {p.value}
                    {p.unit && <span className="sl-proof-u">{p.unit}</span>}
                  </div>
                  <div className="sl-proof-l">{p.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PAINS */}
      <section className="sl-section">
        <div className="sl-section-inner">
          <div className="sl-section-head">
            <div className="sl-section-eyebrow">
              <span className="sl-eyebrow-dash" />
              The Problem
            </div>
            <h2 className="sl-h2">{config.heroH1[0].replace(/、$/, '')}が直面する 3 つの構造</h2>
          </div>
          <div className="sl-pain-grid">
            {config.pains.map((p, i) => (
              <article key={i} className="sl-pain-card">
                <div className="sl-pain-num">0{i + 1}</div>
                <h3 className="sl-pain-title">{p.title}</h3>
                <p className="sl-pain-body">{p.body}</p>
                <div className="sl-pain-signal">
                  <span className="sl-pain-dot" />
                  {p.signal}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="sl-section sl-section-alt">
        <div className="sl-section-inner">
          <div className="sl-section-head">
            <div className="sl-section-eyebrow">
              <span className="sl-eyebrow-dash" />
              The Solution
            </div>
            <h2 className="sl-h2">
              Meeton ai は、<em>3 つの AI 機能</em>で解きます
            </h2>
          </div>
          <div className="sl-sol-grid">
            {config.solutions.map((s, i) => (
              <a key={i} href={s.href} className="sl-sol-card">
                <div className="sl-sol-badge">{s.badge}</div>
                <div className="sl-sol-title">{s.title}</div>
                <p className="sl-sol-body">{s.body}</p>
                <div className="sl-sol-cta">詳しく見る →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF */}
      {config.cases.length > 0 && (
        <section className="sl-section">
          <div className="sl-section-inner">
            <div className="sl-section-head">
              <div className="sl-section-eyebrow">
                <span className="sl-eyebrow-dash" />
                Proof
              </div>
              <h2 className="sl-h2">実際に成果が出ている 3 社の数字</h2>
            </div>
            <div className="sl-case-grid">
              {config.cases.map((c) => (
                <Link key={c.slug} href={`/case-studies/${c.slug}/`} className="sl-case-card">
                  <div className="sl-case-co">{c.company}</div>
                  <div className="sl-case-m">{c.metric}</div>
                  <div className="sl-case-l">{c.metricLabel}</div>
                  <div className="sl-case-cta">事例を読む →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="sl-section sl-section-alt">
        <div className="sl-section-inner">
          <div className="sl-section-head">
            <div className="sl-section-eyebrow">
              <span className="sl-eyebrow-dash" />
              How it works
            </div>
            <h2 className="sl-h2">導入から成果まで、4 ステップ</h2>
          </div>
          <ol className="sl-steps">
            {config.steps.map((s, i) => (
              <li key={i} className="sl-step">
                <div className="sl-step-num">{i + 1}</div>
                <div>
                  <div className="sl-step-title">{s.title}</div>
                  <p className="sl-step-body">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="sl-section">
        <div className="sl-section-inner">
          <div className="sl-section-head">
            <div className="sl-section-eyebrow">
              <span className="sl-eyebrow-dash" />
              FAQ
            </div>
            <h2 className="sl-h2">よくある質問</h2>
          </div>
          <dl className="sl-faq">
            {config.faqs.map((f, i) => (
              <div key={i} className="sl-faq-item">
                <dt className="sl-faq-q">{f.question}</dt>
                <dd className="sl-faq-a">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="sl-final">
        <div className="sl-final-inner">
          <h2 className="sl-final-h">{config.finalCta.heading}</h2>
          <p className="sl-final-sub">{config.finalCta.sub}</p>
          <div className="sl-ctas">
            <DemoBookingButton
              className="sl-btn sl-btn-primary"
              utmCampaign={`${config.utmCampaignBase}__final_demo`}
            >
              30 分のデモを予約する
            </DemoBookingButton>
            <Link href="/webinar/" className="sl-btn sl-btn-ghost">
              無料ウェビナーで先に学ぶ
            </Link>
          </div>
        </div>
      </section>

      <Footer variant="light" />

      <style>{`
        .sl-root { background: #fafaf7; color: #0a0e0c; min-height: 100vh; }

        /* HERO */
        .sl-hero {
          position: relative;
          padding: clamp(96px, 14vw, 140px) clamp(20px, 4vw, 48px) clamp(56px, 8vw, 88px);
          background: linear-gradient(180deg, #fff 0%, #f5f7fc 100%);
          overflow: hidden;
        }
        .sl-hero-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle at 1px 1px, rgba(15,45,64,.07) 1px, transparent 0);
          background-size: 24px 24px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%);
        }
        .sl-hero-inner { position: relative; max-width: 1080px; margin: 0 auto; }
        .sl-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 7px 16px;
          background: color-mix(in srgb, var(--sl-accent) 8%, #fff);
          border: 1px solid color-mix(in srgb, var(--sl-accent) 25%, transparent);
          color: var(--sl-accent);
          border-radius: 999px;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 24px;
        }
        .sl-eyebrow-dash {
          width: 14px; height: 2px; background: var(--sl-accent); border-radius: 2px;
        }
        .sl-h1 {
          font-size: clamp(28px, 5vw, 52px);
          font-weight: 900; line-height: 1.2; letter-spacing: -0.025em;
          color: var(--heading); margin: 0 0 22px; max-width: 900px;
        }
        .sl-h1 em {
          font-style: normal;
          background: linear-gradient(120deg, var(--sl-accent), color-mix(in srgb, var(--sl-accent) 70%, #7c5cfc 30%));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .sl-sub {
          font-size: clamp(15px, 2vw, 19px);
          line-height: 1.85; color: var(--sub);
          max-width: 720px; margin: 0 0 36px;
        }
        .sl-ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 40px; }
        .sl-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 12px;
          font-weight: 800; font-size: 15px; cursor: pointer;
          transition: transform .2s, box-shadow .2s, background .2s, border-color .2s;
          font-family: inherit; text-decoration: none; border: none;
        }
        .sl-btn-primary {
          background: var(--sl-accent); color: #fff;
          box-shadow: 0 8px 24px color-mix(in srgb, var(--sl-accent) 25%, transparent);
        }
        .sl-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px color-mix(in srgb, var(--sl-accent) 35%, transparent);
        }
        .sl-btn-ghost {
          background: transparent; color: var(--heading);
          border: 1.5px solid #c8cedf;
        }
        .sl-btn-ghost:hover {
          background: #fff; border-color: var(--sl-accent); color: var(--sl-accent);
        }

        .sl-proof-row {
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
          max-width: 640px; padding: 28px 0;
          border-top: 1px solid #e4eaef; border-bottom: 1px solid #e4eaef;
          gap: 16px;
        }
        @media (max-width: 640px) { .sl-proof-row { grid-template-columns: 1fr 1fr; } }
        .sl-proof { padding: 0 8px; }
        .sl-proof-v {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: clamp(24px, 3.5vw, 36px);
          font-weight: 800; line-height: 1; letter-spacing: -0.03em;
          color: var(--heading);
        }
        .sl-proof-u {
          font-size: clamp(12px, 1.5vw, 16px);
          font-weight: 800; color: var(--sub); margin-left: 4px;
        }
        .sl-proof-l { font-size: 12px; color: var(--sub); font-weight: 700; margin-top: 6px; letter-spacing: 0.04em; }

        /* SECTIONS */
        .sl-section { padding: clamp(56px, 8vw, 96px) clamp(20px, 4vw, 48px); }
        .sl-section-alt { background: #fff; border-top: 1px solid #e4eaef; border-bottom: 1px solid #e4eaef; }
        .sl-section-inner { max-width: 1080px; margin: 0 auto; }
        .sl-section-head { margin-bottom: clamp(28px, 4vw, 44px); }
        .sl-section-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px; font-weight: 800; letter-spacing: 0.16em;
          color: var(--sub); text-transform: uppercase; margin-bottom: 14px;
        }
        .sl-section-eyebrow .sl-eyebrow-dash { background: var(--sub); }
        .sl-h2 {
          font-size: clamp(22px, 3.5vw, 32px);
          font-weight: 900; line-height: 1.35;
          color: var(--heading); margin: 0; letter-spacing: -0.02em;
        }
        .sl-h2 em {
          font-style: normal;
          background: linear-gradient(120deg, var(--sl-accent), color-mix(in srgb, var(--sl-accent) 70%, #7c5cfc 30%));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        /* PAIN GRID */
        .sl-pain-grid {
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        @media (max-width: 880px) { .sl-pain-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; } }
        .sl-pain-card {
          padding: 28px 24px 22px;
          background: #fff;
          border: 1px solid #e4eaef;
          border-radius: 14px;
          transition: transform .2s, box-shadow .2s, border-color .2s;
        }
        .sl-pain-card:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--sl-accent) 25%, #e4eaef);
          box-shadow: 0 12px 32px -16px rgba(15,45,64,.12);
        }
        .sl-pain-num {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 14px; font-weight: 800; color: var(--sl-accent);
          margin-bottom: 12px; letter-spacing: 0.06em;
        }
        .sl-pain-title { font-size: 17px; font-weight: 800; color: var(--heading); margin: 0 0 10px; line-height: 1.45; }
        .sl-pain-body { font-size: 14px; line-height: 1.85; color: var(--text); margin: 0 0 16px; }
        .sl-pain-signal {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 12px;
          background: #f4f6fb;
          border-radius: 999px;
          font-size: 12px; color: var(--sub); font-weight: 600;
        }
        .sl-pain-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sl-accent); }

        /* SOLUTION GRID */
        .sl-sol-grid {
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        @media (max-width: 880px) { .sl-sol-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; } }
        .sl-sol-card {
          display: block; padding: 28px 24px 22px;
          background: #fff;
          border: 1px solid #e4eaef;
          border-radius: 14px;
          text-decoration: none; color: inherit;
          transition: transform .2s, box-shadow .2s, border-color .2s;
        }
        .sl-sol-card:hover {
          transform: translateY(-3px);
          border-color: var(--sl-accent);
          box-shadow: 0 16px 36px -18px color-mix(in srgb, var(--sl-accent) 35%, transparent);
        }
        .sl-sol-badge {
          display: inline-flex;
          padding: 4px 10px;
          background: color-mix(in srgb, var(--sl-accent) 10%, #fff);
          color: var(--sl-accent);
          border-radius: 999px;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px; font-weight: 800; letter-spacing: 0.08em;
          margin-bottom: 14px;
        }
        .sl-sol-title { font-size: 18px; font-weight: 800; color: var(--heading); margin: 0 0 10px; }
        .sl-sol-body { font-size: 14px; line-height: 1.8; color: var(--text); margin: 0 0 18px; }
        .sl-sol-cta { font-size: 13px; font-weight: 800; color: var(--sl-accent); }

        /* CASE GRID */
        .sl-case-grid {
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        @media (max-width: 880px) { .sl-case-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; } }
        .sl-case-card {
          padding: 22px 22px 20px;
          background: #fff;
          border: 1px solid #e4eaef;
          border-radius: 14px;
          text-decoration: none; color: inherit;
          transition: transform .2s, box-shadow .2s, border-color .2s;
        }
        .sl-case-card:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--sl-accent) 30%, #e4eaef);
          box-shadow: 0 12px 32px -16px rgba(15,45,64,.12);
        }
        .sl-case-co {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 11px; font-weight: 800; color: var(--sub); letter-spacing: 0.08em;
          margin-bottom: 10px;
        }
        .sl-case-m {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: clamp(22px, 2.6vw, 28px);
          font-weight: 800; color: var(--sl-accent); letter-spacing: -0.02em;
          line-height: 1; margin-bottom: 6px;
        }
        .sl-case-l { font-size: 13px; color: var(--text); line-height: 1.6; margin-bottom: 14px; }
        .sl-case-cta { font-size: 12px; font-weight: 700; color: var(--sl-accent); }

        /* STEPS */
        .sl-steps {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 14px;
          max-width: 760px;
        }
        .sl-step {
          display: flex; gap: 18px; align-items: flex-start;
          padding: 20px 22px;
          background: #fff;
          border: 1px solid #e4eaef;
          border-radius: 14px;
        }
        .sl-step-num {
          flex-shrink: 0;
          width: 36px; height: 36px;
          display: inline-flex; align-items: center; justify-content: center;
          background: var(--sl-accent);
          color: #fff;
          border-radius: 50%;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 14px; font-weight: 800;
        }
        .sl-step-title { font-size: 16px; font-weight: 800; color: var(--heading); margin: 4px 0 8px; }
        .sl-step-body { font-size: 14px; line-height: 1.8; color: var(--text); margin: 0; }

        /* FAQ */
        .sl-faq {
          margin: 0;
          display: flex; flex-direction: column; gap: 14px;
        }
        .sl-faq-item {
          padding: 20px 22px;
          background: #fff;
          border: 1px solid #e4eaef;
          border-radius: 14px;
        }
        .sl-faq-q { font-size: 15px; font-weight: 800; color: var(--heading); margin-bottom: 10px; }
        .sl-faq-a { font-size: 14px; line-height: 1.85; color: var(--text); margin: 0; }

        /* FINAL */
        .sl-final {
          padding: clamp(56px, 8vw, 96px) clamp(20px, 4vw, 48px);
          background: linear-gradient(160deg, color-mix(in srgb, var(--sl-accent) 8%, #fff) 0%, #fff 100%);
          border-top: 1px solid #e4eaef;
        }
        .sl-final-inner { max-width: 760px; margin: 0 auto; text-align: center; }
        .sl-final-h {
          font-size: clamp(22px, 3.5vw, 32px);
          font-weight: 900; color: var(--heading); margin: 0 0 14px; line-height: 1.4;
          letter-spacing: -0.015em;
        }
        .sl-final-sub { font-size: clamp(14px, 1.8vw, 17px); color: var(--sub); line-height: 1.85; margin: 0 0 28px; }
        .sl-final .sl-ctas { justify-content: center; margin-bottom: 0; }
      `}</style>
    </div>
  )
}
