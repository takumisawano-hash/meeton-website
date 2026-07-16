'use client'

import Image from 'next/image'
import Link from 'next/link'
import Footer from './Footer'
import Nav from './Nav'
import type { Lang } from '../lib/i18n'

// 2026-07-09: /en/trust/ was merged into this page (owner call — one trust
// surface, not two). The "Data residency & documents" section below is the
// single home for: hosting region, all-sub-processors-in-Japan, and the
// legal-doc index. Single-source-of-truth: commitments live in the DPA,
// the provider list on /en/legal/sub-processors/ — link, don't restate.
// Referenced by Privacy Policy §8.1 / 第8条 and DPA §4 as the hosting anchor.

// ── 第三者認証（ISO/IEC 27001・27017）─────────────────────────────
// SGS 公式マークを unoptimized で原本配信（改変・比率変更・トリミング不可）。
// 白地に配置。cert standards/IDs are verbatim facts; `kind` label is localised.
const CERT_MARKS = [
  {
    src: '/certifications/sgs-iso-27001-isms-ac.jpg',
    alt: { ja: 'SGS ISO/IEC 27001 認証マーク（ISMS-AC 認定 ISR021）', en: 'SGS ISO/IEC 27001 certification mark (ISMS-AC accredited, ISR021)' },
    width: 1261,
    height: 736,
    standard: 'ISO/IEC 27001:2022',
    kind: { ja: '情報セキュリティ', en: 'Information Security' },
    regNo: 'JP26/00000205',
  },
  {
    src: '/certifications/sgs-iso-27017-isms-ac.jpg',
    alt: { ja: 'SGS ISO/IEC 27017 認証マーク（ISMS-AC 認定 ISR021）', en: 'SGS ISO/IEC 27017 certification mark (ISMS-AC accredited, ISR021)' },
    width: 605,
    height: 369,
    standard: 'ISO/IEC 27017:2015',
    kind: { ja: 'クラウドセキュリティ', en: 'Cloud Security' },
    regNo: 'JP26/00000206',
  },
]

// プロダクト対策 / 組織的・人的対策（Immedio の二軸構成を踏襲）。
// カテゴリのみを提示し、詳細はホワイトペーパーに委ねる（ティザー）。
// ※ 一般的な ISMS 運用に基づく想定項目。公開前に自社の実運用と一致するか要確認。
const PRODUCT_MEASURES = {
  ja: [
    '通信・保存データの暗号化',
    'アクセス制御・監査ログ',
    '国内リージョンでの保管・高可用性',
    'クラウドセキュリティ（ISO/IEC 27017）',
    'セキュアな AI 運用',
    'サポートアクセス制御（時間制限・操作ログ記録・設定で無効化可能）',
  ],
  en: [
    'Encryption of data in transit and at rest',
    'Access control and audit logs',
    'Domestic-region storage and high availability',
    'Cloud security (ISO/IEC 27017)',
    'Secure AI operation',
    'Customer-controlled support access (time-limited, activity-logged, can be switched off)',
  ],
}

const ORG_MEASURES = {
  ja: [
    '第三者認証の取得・維持',
    '情報セキュリティ方針の運用',
    '従業員へのセキュリティ研修',
    '脆弱性診断・管理',
    'アクセス権限管理・NDA 締結',
  ],
  en: [
    'Obtaining and maintaining third-party certification',
    'Operating an information-security policy',
    'Security training for employees',
    'Vulnerability assessment and management',
    'Access-permission management and NDA execution',
  ],
}

// Data residency + legal-document index (ex-/en/trust/ content).
// EN-only legal docs are labelled （英語） on the JA page.
const LEGAL_DOCS = [
  {
    href: { ja: '/privacy-policy/', en: '/en/privacy-policy/' },
    label: { ja: 'プライバシーポリシー', en: 'Privacy Policy' },
  },
  {
    href: { ja: '/terms/', en: '/en/terms/' },
    label: { ja: '利用規約（マネージドプラン）', en: 'Terms of Service (managed plans)' },
  },
  {
    href: { ja: '/en/legal/terms-self-serve/', en: '/en/legal/terms-self-serve/' },
    label: { ja: 'Self-Serve Terms of Service（英語）', en: 'Self-Serve Terms of Service' },
  },
  {
    href: { ja: '/en/legal/dpa/', en: '/en/legal/dpa/' },
    label: { ja: 'データ処理補遺（DPA・英語）', en: 'Data Processing Addendum (DPA)' },
  },
  {
    href: { ja: '/en/legal/sub-processors/', en: '/en/legal/sub-processors/' },
    label: { ja: 'サブプロセッサー一覧（英語）', en: 'Sub-processor list' },
  },
] as const

// Localised page chrome. JA is the default → existing call sites omit `lang`
// and render byte-identically.
const SEC_STR = {
  ja: {
    heroEyebrow: 'Information Security',
    heroH1a: 'プロダクトと組織の',
    heroH1em: '両輪',
    heroH1b: 'で、',
    heroH1c: 'お客様のデータを守る。',
    heroSub: 'ISO/IEC 27001（情報セキュリティ）・ISO/IEC 27017（クラウドセキュリティ）の第三者認証のもと、DynaMeet はお客様のデータ保護に継続的に取り組んでいます。',
    certEyebrow: 'Certifications',
    certTitle: '第三者認証 — ISO/IEC 27001・27017',
    certLead: '基本となる情報セキュリティ（ISO/IEC 27001）に加え、クラウドサービス固有の管理策（ISO/IEC 27017）まで第三者認証を取得しています。',
    certRegLabel: '登録番号',
    certAttribution: '審査・認証: SGSジャパン株式会社 ／ 認定: 情報マネジメントシステム認定センター（ISMS-AC, ISR021） ／ 2026年6月取得',
    prodEyebrow: 'Product Security',
    prodTitle: 'プロダクトセキュリティ対策',
    prodSub: 'サービスとインフラの技術的な対策。',
    orgEyebrow: 'Organizational & Human',
    orgTitle: '組織的・人的セキュリティ対策',
    orgSub: '体制と人による継続的な対策。',
    residencyEyebrow: 'Data Residency & Documents',
    residencyTitle: 'データの所在地と関連文書',
    residencyBody:
      '本サービスおよび顧客データは、Amazon Web Services 東京リージョン（ap-northeast-1・日本国内）でホスティングされています。現在のすべてのサブプロセッサーは、顧客データを日本国内で処理しています。日本の個人情報保護法制は EU の十分性認定を受けており、日本は Global CBPR システムに参加しています。越境処理に関する契約上のコミットメントはデータ処理補遺（DPA）に定めています。',
    docsTitle: '関連文書',
    ctaH2: 'さらに詳しい情報セキュリティ仕様を公開しています',
    ctaSub: 'インフラ構成・データ保護方針・バックアップ体制などをまとめたホワイトペーパーをご用意しています。導入前のセキュリティ確認にもご活用ください。',
    ctaPrimary: 'ホワイトペーパーを見る',
    ctaGhost: 'セキュリティについて問い合わせる',
  },
  en: {
    heroEyebrow: 'Information Security',
    heroH1a: 'Protecting your data with',
    heroH1em: 'both',
    heroH1b: ' ',
    heroH1c: 'product and organization.',
    heroSub: 'Under third-party certification for ISO/IEC 27001 (information security) and ISO/IEC 27017 (cloud security), DynaMeet works continuously to protect your data.',
    certEyebrow: 'Certifications',
    certTitle: 'Third-party certification — ISO/IEC 27001 & 27017',
    certLead: 'In addition to foundational information security (ISO/IEC 27001), we hold third-party certification covering cloud-service-specific controls (ISO/IEC 27017).',
    certRegLabel: 'Registration No.',
    certAttribution: 'Audit & certification: SGS Japan Inc. / Accreditation: Information Management System Accreditation Center (ISMS-AC, ISR021) / Obtained June 2026',
    prodEyebrow: 'Product Security',
    prodTitle: 'Product security measures',
    prodSub: 'Technical measures for the service and infrastructure.',
    orgEyebrow: 'Organizational & Human',
    orgTitle: 'Organizational & human security measures',
    orgSub: 'Continuous measures by structure and people.',
    residencyEyebrow: 'Data Residency & Documents',
    residencyTitle: 'Data residency & documents',
    residencyBody:
      'The Service and customer data are hosted in the Amazon Web Services Tokyo region (ap-northeast-1), Japan. All current sub-processors process customer data in Japan. Japan’s data-protection framework holds an EU adequacy decision, and Japan participates in the Global CBPR system. Contractual commitments for cross-border processing are set out in the Data Processing Addendum (DPA).',
    docsTitle: 'Documents',
    ctaH2: 'We publish more detailed information-security specifications',
    ctaSub: 'We have a whitepaper covering infrastructure configuration, data-protection policy, backup setup, and more. Use it for your pre-deployment security review.',
    ctaPrimary: 'View the whitepaper',
    ctaGhost: 'Contact us about security',
  },
} as const

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="12" cy="12" r="11" fill="#12a37d" />
      <path d="M7 12.4l3.1 3.1L17 8.8" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const SHELL = { maxWidth: 1120, margin: '0 auto' } as const

export default function SecurityPageClient({ lang = 'ja' }: { lang?: Lang }) {
  const s = SEC_STR[lang]
  return (
    <>
      <Nav lang={lang} />
      <main
        style={{
          paddingTop: 'clamp(72px, 11vw, 96px)',
          minHeight: '100vh',
          background: '#ffffff',
          color: '#102b24',
        }}
      >
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          style={{
            background: 'linear-gradient(180deg, #eef7f4 0%, #f7fcfa 60%, #ffffff 100%)',
            padding: 'clamp(40px, 7vw, 84px) clamp(16px, 4vw, 28px) clamp(20px, 3vw, 32px)',
          }}
        >
          <div style={SHELL}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#0f766e',
                marginBottom: 18,
              }}
            >
              {s.heroEyebrow}
            </div>
            <h1
              style={{
                fontSize: 'clamp(24px, 5vw, 50px)',
                lineHeight: 1.25,
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: '#0e231d',
                maxWidth: 760,
                margin: '0 0 18px',
              }}
            >
              <span style={{ display: 'inline-block' }}>
                {s.heroH1a}<span style={{ color: '#12a37d' }}>{s.heroH1em}</span>{s.heroH1b}
              </span>
              <wbr />
              <span style={{ display: 'inline-block' }}>{s.heroH1c}</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(15px, 1.7vw, 18px)',
                lineHeight: 1.9,
                color: '#4d645d',
                maxWidth: 600,
                textWrap: 'pretty',
                margin: 0,
              }}
            >
              {s.heroSub}
            </p>
          </div>
        </section>

        {/* ── Certifications (marks + verbatim scope per cert) ──────── */}
        <section style={{ padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 28px)' }}>
          <div style={SHELL}>
            <SectionHead
              eyebrow={s.certEyebrow}
              title={s.certTitle}
              lead={s.certLead}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 18,
                marginTop: 24,
                alignItems: 'start',
              }}
            >
              {CERT_MARKS.map((m) => (
                <div
                  key={m.src}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2efea',
                    borderRadius: 22,
                    padding: 'clamp(22px, 2.6vw, 30px)',
                    boxShadow: '0 14px 40px rgba(16,35,30,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                    <div
                      style={{
                        background: '#ffffff',
                        border: '1px solid #eef4f1',
                        borderRadius: 14,
                        padding: 12,
                        flexShrink: 0,
                      }}
                    >
                      <Image src={m.src} alt={m.alt[lang]} width={m.width} height={m.height} unoptimized style={{ height: 92, width: 'auto', display: 'block' }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 19, fontWeight: 850, color: '#16332b', lineHeight: 1.2 }}>{m.standard}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f766e', marginTop: 4 }}>{m.kind[lang]}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#94a8a0' }}>
                          {s.certRegLabel}
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.02em', color: '#16332b', fontVariantNumeric: 'tabular-nums' }}>
                          {m.regNo}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#6a8178', margin: '18px 0 0' }}>
              {s.certAttribution}
            </p>
          </div>
        </section>

        {/* ── Dual axis: product + organizational/human ────────────── */}
        <section style={{ padding: '0 clamp(16px, 4vw, 28px) clamp(40px, 6vw, 72px)' }}>
          <div style={SHELL}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
              <MeasureCard accent="#12a37d" eyebrow={s.prodEyebrow} title={s.prodTitle} sub={s.prodSub} items={PRODUCT_MEASURES[lang]} />
              <MeasureCard accent="#0891b2" eyebrow={s.orgEyebrow} title={s.orgTitle} sub={s.orgSub} items={ORG_MEASURES[lang]} />
            </div>
          </div>
        </section>

        {/* ── Data residency & legal documents (ex-/en/trust/) ─────── */}
        <section style={{ padding: '0 clamp(16px, 4vw, 28px) clamp(40px, 6vw, 72px)' }}>
          <div style={SHELL}>
            <SectionHead eyebrow={s.residencyEyebrow} title={s.residencyTitle} lead={s.residencyBody} />
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2efea',
                borderRadius: 24,
                padding: 'clamp(24px, 3vw, 32px)',
                boxShadow: '0 14px 40px rgba(16,35,30,0.05)',
                marginTop: 24,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#12a37d', marginBottom: 14 }}>
                {s.docsTitle}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
                {LEGAL_DOCS.map((d) => (
                  <li key={d.href[lang]} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <Check />
                    <a href={d.href[lang]} style={{ fontSize: 15, fontWeight: 700, color: '#16332b', lineHeight: 1.5, textDecoration: 'underline', textDecorationColor: '#bfe3d7', textUnderlineOffset: 3 }}>
                      {d.label[lang]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <section style={{ padding: '0 clamp(16px, 4vw, 28px) clamp(56px, 9vw, 104px)' }}>
          <div
            style={{
              ...SHELL,
              background: 'linear-gradient(120deg, #0f201c 0%, #112824 58%, #0c3038 100%)',
              borderRadius: 28,
              padding: 'clamp(28px, 4vw, 48px)',
              color: '#ecfaf6',
              boxShadow: '0 28px 80px rgba(8,21,18,0.22)',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 12px' }}>
              {s.ctaH2}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: 'rgba(236,250,246,0.8)', maxWidth: 620, margin: '0 auto 26px' }}>
              {s.ctaSub}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={() =>
                  (window as any).Meeton?.openDownloadCenter({
                    docId: '8ef0ccfb-da0f-4683-b1f8-ebfa290c5ee7',
                    pageNumber: 1,
                  })
                }
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '15px 28px',
                  borderRadius: 999,
                  background: '#12a37d',
                  color: '#ffffff',
                  fontSize: 15,
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 14px 32px rgba(18,163,125,0.32)',
                }}
              >
                {s.ctaPrimary}
              </button>
              <Link
                href={lang === 'en' ? '/en/contact/' : '/contact/'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '15px 28px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: '#ecfaf6',
                  fontSize: 15,
                  fontWeight: 800,
                  textDecoration: 'none',
                }}
              >
                {s.ctaGhost}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  )
}

function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div style={{ maxWidth: 760 }}>
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#0f766e', marginBottom: 12 }}>
        {eyebrow}
      </div>
      <h2 style={{ fontSize: 'clamp(24px, 3.4vw, 34px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0e231d', margin: '0 0 10px' }}>{title}</h2>
      <p style={{ fontSize: 16, lineHeight: 1.85, color: '#567168', margin: 0 }}>{lead}</p>
    </div>
  )
}

function MeasureCard({
  accent,
  eyebrow,
  title,
  sub,
  items,
}: {
  accent: string
  eyebrow: string
  title: string
  sub: string
  items: string[]
}) {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e2efea',
        borderRadius: 24,
        padding: 'clamp(24px, 3vw, 32px)',
        boxShadow: '0 14px 40px rgba(16,35,30,0.05)',
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: 10 }}>{eyebrow}</div>
      <h3 style={{ fontSize: 'clamp(20px, 2.4vw, 24px)', fontWeight: 850, color: '#15332b', margin: '0 0 6px' }}>{title}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: '#6a8178', margin: '0 0 20px' }}>{sub}</p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 14 }}>
        {items.map((it) => (
          <li key={it} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Check />
            <span style={{ fontSize: 15, fontWeight: 700, color: '#16332b', lineHeight: 1.5 }}>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
