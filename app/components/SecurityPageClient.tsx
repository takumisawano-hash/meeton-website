'use client'

import Image from 'next/image'
import Footer from './Footer'
import Nav from './Nav'

// ── 第三者認証（ISO/IEC 27001・27017）マーク + 認証範囲（per cert）─────
// SGS 公式マークを unoptimized で原本配信（改変・比率変更・トリミング不可）。
// 認定シンボル単体使用不可（SGS 認証マーク一体のロックアップを使用）。白地に配置。
// scope は証明書の「登録範囲／適用範囲」を一字一句（verbatim）で記載すること。
// 空の場合はプレースホルダを表示（公開前に必ず証明書の記載で差し替える）。
const CERT_MARKS = [
  {
    src: '/certifications/sgs-iso-27001-isms-ac.jpg',
    alt: 'SGS ISO/IEC 27001 認証マーク（ISMS-AC 認定 ISR021）',
    width: 1261,
    height: 736,
    standard: 'ISO/IEC 27001:2022',
    // 証明書記載の登録範囲（verbatim）
    scope: '法人向け業務支援システムの開発・運用・保守',
  },
  {
    src: '/certifications/sgs-iso-27017-isms-ac.jpg',
    alt: 'SGS ISO/IEC 27017 認証マーク（ISMS-AC 認定 ISR021）',
    width: 605,
    height: 369,
    standard: 'ISO/IEC 27017:2015',
    // 証明書記載の登録範囲（verbatim、CSP / CSC の 2 区分）
    scope:
      'クラウドサービスプロバイダ:\n業務支援プラットフォーム「DynaMeet Platform」(Meeton ai 等を含む)の提供\n\nクラウドサービスカスタマ:\n業務支援プラットフォーム「DynaMeet Platform」(Meeton ai 等を含む)の提供における AWS の利用',
  },
]

const securityFeatures = [
  {
    eyebrow: 'Infrastructure',
    title: '堅牢なインフラ',
    description:
      'AWSのセキュアな基盤を利用し、データはすべて日本国内のデータセンターに保管されます。',
  },
  {
    eyebrow: 'Encryption',
    title: '通信とデータの暗号化',
    description:
      'すべての通信はTLS 1.2以上で、保存データはAES-256等により強力に暗号化されています。',
  },
  {
    eyebrow: 'AI Governance',
    title: 'セキュアなAI運用',
    description:
      'LLMの利用において、プロンプトインジェクション対策等のシステムレベルの保護を適用し、顧客データがAIの学習に無断で利用されることはありません。',
  },
]

export default function SecurityPageClient() {
  return (
    <>
      <Nav />
      <main
        style={{
          paddingTop: 'clamp(72px, 11vw, 96px)',
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #f3f8f7 0%, #fbfdfc 24%, #ffffff 100%)',
          color: '#10231e',
        }}
      >
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: 'clamp(28px, 5vw, 48px) clamp(16px, 4vw, 28px) 0',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 'auto auto 10% 8%',
              width: 'min(44vw, 420px)',
              height: 'min(44vw, 420px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(18,163,125,0.16) 0%, rgba(18,163,125,0) 72%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 24,
              right: '6%',
              width: 'min(38vw, 320px)',
              height: 'min(38vw, 320px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(8,145,178,0.14) 0%, rgba(8,145,178,0) 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              maxWidth: 1180,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(24px, 4vw, 40px)',
              alignItems: 'stretch',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(9,40,34,0.96) 0%, rgba(10,54,48,0.94) 46%, rgba(7,87,103,0.92) 100%)',
                borderRadius: 28,
                padding: 'clamp(28px, 5vw, 52px)',
                color: '#f4fffc',
                boxShadow: '0 28px 80px rgba(16,35,30,0.16)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h1
                style={{
                  fontSize: 'clamp(32px, 6vw, 56px)',
                  lineHeight: 1.08,
                  fontWeight: 900,
                  marginBottom: 18,
                  letterSpacing: '-0.04em',
                }}
              >
                情報セキュリティ対策について
              </h1>
              <p
                style={{
                  fontSize: 'clamp(16px, 2vw, 20px)',
                  lineHeight: 1.8,
                  color: 'rgba(244,255,252,0.84)',
                  maxWidth: 700,
                  margin: 0,
                }}
              >
                DynaMeetはお客様のデータを安全に保護するため、国際水準の情報セキュリティ体制を構築しています。
              </p>
            </div>

            {/* Certifications — placed where the snapshot was; white card keeps
                the marks on solid white (SGS rule). Scope shown per cert. */}
            <div
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(245,252,250,0.98) 100%)',
                borderRadius: 28,
                padding: 'clamp(24px, 4vw, 34px)',
                border: '1px solid rgba(16,35,30,0.08)',
                boxShadow: '0 24px 60px rgba(16,35,30,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#0f766e',
                    marginBottom: 12,
                  }}
                >
                  Certifications
                </div>
                <h2
                  style={{
                    fontSize: 'clamp(20px, 2.6vw, 26px)',
                    lineHeight: 1.3,
                    fontWeight: 850,
                    color: '#132822',
                    margin: 0,
                  }}
                >
                  ISO/IEC 27001・27017 認証取得
                </h2>
              </div>

              <div style={{ display: 'grid', gap: 16 }}>
                {CERT_MARKS.map((m, i) => (
                  <div
                    key={m.src}
                    style={{
                      display: 'flex',
                      gap: 14,
                      alignItems: 'flex-start',
                      paddingTop: i === 0 ? 0 : 16,
                      borderTop: i === 0 ? 'none' : '1px solid #e2efea',
                    }}
                  >
                    <div
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e6f0ec',
                        borderRadius: 10,
                        padding: 8,
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={m.src}
                        alt={m.alt}
                        width={m.width}
                        height={m.height}
                        unoptimized
                        style={{ height: 58, width: 'auto', display: 'block' }}
                      />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#16332b', marginBottom: 4 }}>
                        {m.standard}
                      </div>
                      <div style={{ fontSize: 12.5, lineHeight: 1.65, color: '#4d645d' }}>
                        <span
                          style={{
                            display: 'block',
                            fontSize: 11,
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            color: '#6a8178',
                            marginBottom: 3,
                          }}
                        >
                          認証範囲
                        </span>
                        <span style={{ whiteSpace: 'pre-line' }}>
                          {m.scope || '〔証明書記載の登録範囲をそのまま記載〕'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 12, lineHeight: 1.7, color: '#6a8178', margin: 0 }}>
                審査・認証: SGSジャパン株式会社 ／ 認定: 情報マネジメントシステム認定センター（ISMS-AC, ISR021） ／ 2026年6月取得
              </p>
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 28px)' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 18,
              }}
            >
              {securityFeatures.map((feature, index) => (
                <article
                  key={feature.title}
                  style={{
                    padding: '24px 22px 22px',
                    borderRadius: 24,
                    background: index % 2 === 0 ? '#ffffff' : '#f7fbfa',
                    border: '1px solid #deebe7',
                    boxShadow: '0 12px 34px rgba(16,35,30,0.05)',
                    minHeight: 240,
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      padding: '7px 12px',
                      borderRadius: 999,
                      background: 'rgba(18,163,125,0.1)',
                      color: '#0f766e',
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      marginBottom: 18,
                    }}
                  >
                    {feature.eyebrow}
                  </div>
                  <h3
                    style={{
                      fontSize: 22,
                      lineHeight: 1.35,
                      fontWeight: 850,
                      color: '#17352d',
                      marginBottom: 12,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.85, color: '#5a7168' }}>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '0 clamp(16px, 4vw, 28px) clamp(64px, 9vw, 112px)' }}>
          <div
            style={{
              maxWidth: 1180,
              margin: '0 auto',
              background: 'linear-gradient(180deg, #0f201c 0%, #112824 100%)',
              borderRadius: 30,
              padding: 'clamp(24px, 5vw, 42px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(24px, 4vw, 38px)',
              color: '#ecfaf6',
              boxShadow: '0 32px 90px rgba(8, 21, 18, 0.24)',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#7fe4c4',
                  marginBottom: 12,
                }}
              >
                Whitepaper Download
              </div>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  lineHeight: 1.15,
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  marginBottom: 16,
                }}
              >
                情報セキュリティホワイトペーパー
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.9,
                  color: 'rgba(236,250,246,0.82)',
                  marginBottom: 26,
                  maxWidth: 560,
                }}
              >
                インフラ構成、データ保護方針、バックアップ体制など、より詳細な情報セキュリティ仕様をまとめたホワイトペーパーをご用意しています。
              </p>
              <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
                {[
                  'インフラ構成とデータ保管方針',
                  '暗号化・アクセス制御・運用統制の考え方',
                  'バックアップ体制と継続運用の前提',
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '14px 16px',
                      borderRadius: 16,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: '#7fe4c4',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 15, lineHeight: 1.7, color: '#ecfaf6' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: '#ffffff',
                borderRadius: 24,
                padding: 'clamp(22px, 4vw, 30px)',
                color: '#17352d',
              }}
            >
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 24, fontWeight: 850, marginBottom: 8 }}>ホワイトペーパーをご確認ください</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: '#5b7169' }}>
                  より詳細な情報セキュリティ仕様は、専用のホワイトペーパーから確認できます。以下のリンクからダウンロードページへ進んでください。
                </p>
              </div>
              <div
                style={{
                  borderRadius: 20,
                  background: 'linear-gradient(180deg, #f1fbf7 0%, #ffffff 100%)',
                  border: '1px solid #d8ebe4',
                  padding: '28px 22px',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gap: 12,
                    marginBottom: 18,
                  }}
                >
                  {[
                    'インフラ構成とデータ保護方針を収録',
                    'バックアップ体制と運用統制の概要を掲載',
                    '専用ダウンロードページからすぐ確認可能',
                  ].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '12px 14px',
                        borderRadius: 14,
                        background: '#ffffff',
                        border: '1px solid #e2efea',
                      }}
                    >
                      <div
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: '50%',
                          background: '#12a37d',
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: 14, lineHeight: 1.7, color: '#365149' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    (window as any).Meeton?.openDownloadCenter({
                      docId: '54a7d40d-e99d-40f2-bed2-80d64a400093',
                      pageNumber: 1,
                    })
                  }
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '13px 20px',
                    borderRadius: 999,
                    background: '#132822',
                    color: '#fff',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  ホワイトペーパーを見る
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
