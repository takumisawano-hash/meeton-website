'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FAQJsonLd from '../components/FAQJsonLd'
import DemoBookingButton from '../components/DemoBookingButton'
import DocRequestButton from '../components/DocRequestButton'
import type { Lang } from '../lib/i18n'

// Section chrome strings (eyebrows + fixed headings + CTA defaults). JA is the
// default → existing call sites omit `lang` and render byte-identically.
const SL_CHROME = {
  ja: {
    painEyebrow: '課題',
    solutionEyebrow: '解決策',
    solutionH2a: 'Meeton ai は、',
    solutionH2em: '3 つの AI 機能',
    solutionH2b: 'で解きます',
    proofEyebrow: '導入成果',
    proofDefault: 'Meeton ai による関連成果',
    howEyebrow: '仕組み',
    howH2: '導入から成果まで、4 ステップ',
    faqEyebrow: 'よくある質問',
    faqH2: 'よくある質問',
    solCta: '詳しく見る →',
    caseCta: '事例を読む →',
    primaryDefault: 'チェックリストを受け取る',
    heroConsult: '30 分で相談する →',
    finalConsult: '30 分で相談する →',
    webinarLead: 'まずはじっくり学びたい方は',
    webinar: '無料ウェビナー',
  },
  en: {
    painEyebrow: 'Challenges',
    solutionEyebrow: 'Solution',
    solutionH2a: 'Meeton ai solves it with ',
    solutionH2em: 'three AI capabilities',
    solutionH2b: '',
    proofEyebrow: 'Results',
    proofDefault: 'Related results with Meeton ai',
    howEyebrow: 'How it works',
    howH2: 'From setup to results, in 4 steps',
    faqEyebrow: 'FAQ',
    faqH2: 'Frequently asked questions',
    solCta: 'Learn more →',
    caseCta: 'Read the story →',
    primaryDefault: 'Get the checklist',
    heroConsult: 'Book a 30-min consult →',
    finalConsult: 'Book a 30-min consult →',
    webinarLead: 'Prefer to learn first?',
    webinar: 'Free webinar',
  },
} as const

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
  /** Heading for the Problem section.  GPT review 2026-05-23 flagged
   *  the prior auto-derivation (heroH1[0] + "が直面する 3 つの構造")
   *  produced broken Japanese — now require an explicit heading per LP. */
  painsHeading: string
  /** Pain blocks. Exactly 3 — keep them concrete, not generic. */
  pains: {
    title: string
    body: string
    /** Hint of evidence (directional, no fabricated stats). */
    signal: string
  }[]
  /** Heading for the Proof section. Defaults to a generic line if not
   *  set. */
  proofHeading?: string
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
  /** Sub-accent color (eyebrow, pain numbers, step badges) — use
   *  brand palette. */
  accent: '#12a37d' | '#0891b2' | '#7c5cfc' | '#3b6ff5' | '#d03ea1' | '#04cb78'
  /** Primary CTA color. Defaults to DynaMeet brand green so that CTA
   *  color stays consistent sitewide even when accent rotates per LP.
   *  Override only if a LP intentionally wants a different CTA hue. */
  primaryCtaColor?: string
  /** Primary CTA button label. Routes through openMeetonDownloadCenter
   *  (Meeton Library popup) — the LP's軽 CV. Default: "チェックリストを受け取る". */
  primaryCtaLabel?: string
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

export default function SolutionLpTemplate({ config, lang = 'ja' }: { config: SolutionLpConfig; lang?: Lang }) {
  const c = SL_CHROME[lang]
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
    <div
      className="sl-root"
      style={{
        ['--sl-accent' as string]: config.accent,
        ['--sl-cta' as string]: config.primaryCtaColor ?? '#04cb78',
      }}
    >
      <FAQJsonLd
        items={config.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
        pageUrl={config.pageUrl}
      />
      {/* 2026-05-23: ads LP は minimal nav (Logo / 導入事例 / セキュリティ
          / 30分で相談する のみ)。サイト全ナビを出すと checklist DL +
          30分相談 の CV CTA が薄まる。 */}
      <Nav variant="minimal" lang={lang} />

      {/* HERO. CSS vars (--sl-accent, --sl-cta) are set on .sl-root so
          they cascade into every section, not just hero. */}
      <section className="sl-hero">
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

          {/* 2026-05-23: Primary CTA = checklist DL (軽 CV、specの本意)
              Secondary = 30 分相談 (重 CV)。 GPT review で指摘された
              「Spec と LP の CTA 不整合」 の修正。 */}
          <div className="sl-ctas">
            <DocRequestButton className="sl-btn sl-btn-primary">
              {config.primaryCtaLabel ?? c.primaryDefault}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </DocRequestButton>
            <DemoBookingButton
              className="sl-btn sl-btn-ghost"
              utmCampaign={`${config.utmCampaignBase}__hero_consult`}
            >
              {c.heroConsult}
            </DemoBookingButton>
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
              {c.painEyebrow}
            </div>
            <h2 className="sl-h2">{config.painsHeading}</h2>
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
              {c.solutionEyebrow}
            </div>
            <h2 className="sl-h2">
              {c.solutionH2a}<em>{c.solutionH2em}</em>{c.solutionH2b}
            </h2>
          </div>
          <div className="sl-sol-grid">
            {config.solutions.map((s, i) => (
              <a key={i} href={s.href} className="sl-sol-card">
                <div className="sl-sol-badge">{s.badge}</div>
                <div className="sl-sol-title">{s.title}</div>
                <p className="sl-sol-body">{s.body}</p>
                <div className="sl-sol-cta">{c.solCta}</div>
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
                {c.proofEyebrow}
              </div>
              <h2 className="sl-h2">
                {config.proofHeading ?? c.proofDefault}
              </h2>
            </div>
            <div className="sl-case-grid">
              {config.cases.map((c) => (
                <Link key={c.slug} href={lang === 'en' ? `/en/cases/${c.slug}/` : `/cases/${c.slug}/`} className="sl-case-card">
                  <div className="sl-case-co">{c.company}</div>
                  <div className="sl-case-m">{c.metric}</div>
                  <div className="sl-case-l">{c.metricLabel}</div>
                  <div className="sl-case-cta">{SL_CHROME[lang].caseCta}</div>
                </Link>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', background: 'var(--sl-navy, #0f1128)', borderRadius: 18, padding: '24px 28px', marginTop: 28 }}>
              <p style={{ margin: 0, fontSize: 'clamp(16px,2vw,20px)', fontWeight: 800, color: '#fff' }}>
                {lang === 'en' ? 'Map this playbook to your own funnel — in 30 minutes.' : 'この打ち手を自社のファネルに当てはめると？ 30分でご案内します。'}
              </p>
              <DemoBookingButton className="sl-btn sl-btn-primary" utmCampaign={`${config.utmCampaignBase}__mid_consult`}>
                {c.heroConsult}
              </DemoBookingButton>
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
              {c.howEyebrow}
            </div>
            <h2 className="sl-h2">{c.howH2}</h2>
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
              {c.faqEyebrow}
            </div>
            <h2 className="sl-h2">{c.faqH2}</h2>
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

      {/* FINAL CTA — Primary 同様 checklist DL、Secondary 30分相談で
          spec と一致させる。ウェビナーは補助動線のみ。 */}
      <section className="sl-final">
        <div className="sl-final-inner">
          <h2 className="sl-final-h">{config.finalCta.heading}</h2>
          <p className="sl-final-sub">{config.finalCta.sub}</p>
          <div className="sl-ctas">
            <DocRequestButton className="sl-btn sl-btn-primary">
              {config.primaryCtaLabel ?? c.primaryDefault}
            </DocRequestButton>
            <DemoBookingButton
              className="sl-btn sl-btn-ghost"
              utmCampaign={`${config.utmCampaignBase}__final_consult`}
            >
              {c.finalConsult}
            </DemoBookingButton>
          </div>
          {/* 補助動線として小さくウェビナー誘導。Final CTA メインは
              checklist DL + 30分相談 の 2 つに集中。 */}
          {lang !== 'en' && (
  <div style={{ marginTop: 24, fontSize: 13, color: 'var(--sub)' }}>
              {c.webinarLead}{' '}
              <Link
                href="/webinar/"
                style={{ color: 'var(--sl-cta)', textDecoration: 'underline', fontWeight: 700 }}
              >
                {c.webinar}
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer variant="light" hideDiscoverGrid lang={lang} />

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
          background: var(--sl-cta); color: #fff;
          box-shadow: 0 8px 24px color-mix(in srgb, var(--sl-cta) 25%, transparent);
        }
        .sl-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px color-mix(in srgb, var(--sl-cta) 35%, transparent);
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
