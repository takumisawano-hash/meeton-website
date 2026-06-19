'use client'

import Image from 'next/image'
import Link from 'next/link'
import Footer from './Footer'
import Nav from './Nav'

// ── 第三者認証（ISO/IEC 27001・27017）─────────────────────────────
// SGS 公式マークを unoptimized で原本配信（改変・比率変更・トリミング不可）。
// 白地に配置。scope は証明書記載の登録範囲（verbatim）。
const CERT_MARKS = [
  {
    src: '/certifications/sgs-iso-27001-isms-ac.jpg',
    alt: 'SGS ISO/IEC 27001 認証マーク（ISMS-AC 認定 ISR021）',
    width: 1261,
    height: 736,
    standard: 'ISO/IEC 27001:2022',
    kind: '情報セキュリティ',
    scope: '法人向け業務支援システムの開発・運用・保守',
  },
  {
    src: '/certifications/sgs-iso-27017-isms-ac.jpg',
    alt: 'SGS ISO/IEC 27017 認証マーク（ISMS-AC 認定 ISR021）',
    width: 605,
    height: 369,
    standard: 'ISO/IEC 27017:2015',
    kind: 'クラウドセキュリティ',
    scope:
      'クラウドサービスプロバイダ:\n業務支援プラットフォーム「DynaMeet Platform」(Meeton ai 等を含む)の提供\n\nクラウドサービスカスタマ:\n業務支援プラットフォーム「DynaMeet Platform」(Meeton ai 等を含む)の提供における AWS の利用',
  },
]

// プロダクト対策 / 組織的・人的対策（Immedio の二軸構成を踏襲）。
// カテゴリのみを提示し、詳細はホワイトペーパーに委ねる（ティザー）。
// ※ 一般的な ISMS 運用に基づく想定項目。公開前に自社の実運用と一致するか要確認。
const PRODUCT_MEASURES = [
  '通信・保存データの暗号化',
  'アクセス制御・監査ログ',
  '国内リージョンでの保管・高可用性',
  'クラウドセキュリティ（ISO/IEC 27017）',
  'セキュアな AI 運用',
]

const ORG_MEASURES = [
  '第三者認証の取得・維持',
  '情報セキュリティ方針の運用',
  '従業員へのセキュリティ研修',
  '脆弱性診断・管理',
  'アクセス権限管理・NDA 締結',
]

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="12" cy="12" r="11" fill="#12a37d" />
      <path d="M7 12.4l3.1 3.1L17 8.8" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const SHELL = { maxWidth: 1120, margin: '0 auto' } as const

export default function SecurityPageClient() {
  return (
    <>
      <Nav />
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
              Information Security
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
                プロダクトと組織の<span style={{ color: '#12a37d' }}>両輪</span>で、
              </span>
              <wbr />
              <span style={{ display: 'inline-block' }}>お客様のデータを守る。</span>
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
              ISO/IEC 27001（情報セキュリティ）・ISO/IEC 27017（クラウドセキュリティ）の第三者認証のもと、DynaMeet はお客様のデータ保護に継続的に取り組んでいます。
            </p>
          </div>
        </section>

        {/* ── Certifications (marks + verbatim scope per cert) ──────── */}
        <section style={{ padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 28px)' }}>
          <div style={SHELL}>
            <SectionHead
              eyebrow="Certifications"
              title="第三者認証 — ISO/IEC 27001・27017"
              lead="基本となる情報セキュリティ（ISO/IEC 27001）に加え、クラウドサービス固有の管理策（ISO/IEC 27017）まで第三者認証を取得しています。"
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
                      <Image src={m.src} alt={m.alt} width={m.width} height={m.height} unoptimized style={{ height: 92, width: 'auto', display: 'block' }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 19, fontWeight: 850, color: '#16332b', lineHeight: 1.2 }}>{m.standard}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f766e', marginTop: 4 }}>{m.kind}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#6a8178', margin: '18px 0 0' }}>
              審査・認証: SGSジャパン株式会社 ／ 認定: 情報マネジメントシステム認定センター（ISMS-AC, ISR021） ／ 2026年6月取得
            </p>
          </div>
        </section>

        {/* ── Dual axis: product + organizational/human ────────────── */}
        <section style={{ padding: '0 clamp(16px, 4vw, 28px) clamp(40px, 6vw, 72px)' }}>
          <div style={SHELL}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
              <MeasureCard accent="#12a37d" eyebrow="Product Security" title="プロダクトセキュリティ対策" sub="サービスとインフラの技術的な対策。" items={PRODUCT_MEASURES} />
              <MeasureCard accent="#0891b2" eyebrow="Organizational & Human" title="組織的・人的セキュリティ対策" sub="体制と人による継続的な対策。" items={ORG_MEASURES} />
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
              さらに詳しい情報セキュリティ仕様を公開しています
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: 'rgba(236,250,246,0.8)', maxWidth: 620, margin: '0 auto 26px' }}>
              インフラ構成・データ保護方針・バックアップ体制などをまとめたホワイトペーパーをご用意しています。導入前のセキュリティ確認にもご活用ください。
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
                ホワイトペーパーを見る
              </button>
              <Link
                href="/contact/"
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
                セキュリティについて問い合わせる
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
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
