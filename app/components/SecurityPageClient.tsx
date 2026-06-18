'use client'

import Image from 'next/image'
import Footer from './Footer'
import Nav from './Nav'

// ── 第三者認証（ISO/IEC 27001・27017）マーク ───────────────────────
// SGS 提供の公式マークデータ（RGB / Web 用 JPG）をそのまま使用。
// SGS「システム認証マーク使用規程」/ ISMS-AC 認定シンボル使用規程:
//   - 画像の改変・比率変更・単色化・トリミング不可（unoptimized で原本配信）
//   - 認定シンボル単体使用不可（SGS 認証マーク一体の公式ロックアップを使用）
//   - 白系の単色背景に配置（写真・グラデーション背景不可）→ 濃色ヒーロー上では
//     各マークを白チップで台座し、アートワークが白地に乗るようにする
// 規格名・SGS・ISMS-AC・認定番号(ISR021)はマーク画像内に含まれるため、
// 本文では重複表記を避け、画像にない情報（審査機関・取得時期）のみ簡潔に補う。
const CERT_MARKS = [
  {
    src: '/certifications/sgs-iso-27001-isms-ac.jpg',
    alt: 'SGS ISO/IEC 27001 認証マーク（ISMS-AC 認定 ISR021）',
    width: 1261,
    height: 736,
  },
  {
    src: '/certifications/sgs-iso-27017-isms-ac.jpg',
    alt: 'SGS ISO/IEC 27017 認証マーク（ISMS-AC 認定 ISR021）',
    width: 605,
    height: 369,
  },
]

// ▼ 公開前に「証明書の記載」と一致しているか確認してください（要確定）
const CERT = {
  org: 'DynaMeet株式会社',
  acquired: '2026年6月', // TODO(cert): 証明書の発行日に合わせる
  // 認証範囲（登録範囲）は任意。規格名・SGS・ISMS-AC・認定番号はマーク画像に
  // 表示されるため必須ではなく、最小構成では省略する（同じ SGS 認証の immedio も
  // 範囲非掲載）。掲載する場合は、証明書の「登録範囲／適用範囲」を一字一句
  // そのまま（verbatim）貼り付けること。言い換え・要約は不可。空文字なら非表示。
  scope: '', // TODO(cert): 載せるなら証明書の登録範囲を verbatim で（空＝非表示）
}

// 詳細はホワイトペーパーに委ね、ページ上では要点のみを提示する（ティザー）。
const controls = [
  { label: 'データ保管', value: '国内リージョン（AWS 東京）' },
  { label: '暗号化', value: '通信 TLS 1.2+ ／ 保存 AES-256' },
  { label: 'アクセス制御', value: '最小権限・監査ログ' },
  { label: 'AI 運用', value: '学習データへの無断利用なし' },
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
        {/* ── Hero: certification is the centerpiece. One card — the claim
            and the official SGS marks together. Each mark sits on its own
            white chip so the artwork stays on solid white (SGS rule). ── */}
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
              background: 'linear-gradient(135deg, rgba(9,40,34,0.96) 0%, rgba(10,54,48,0.94) 46%, rgba(7,87,103,0.92) 100%)',
              borderRadius: 28,
              padding: 'clamp(28px, 5vw, 52px)',
              color: '#f4fffc',
              boxShadow: '0 28px 80px rgba(16,35,30,0.16)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(28px, 4vw, 48px)',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 14px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  marginBottom: 24,
                }}
              >
                Trust Center
              </div>
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
                  lineHeight: 1.85,
                  color: 'rgba(244,255,252,0.84)',
                  maxWidth: 560,
                  margin: 0,
                }}
              >
                Meeton ai はお客様のデータを安全に保護するため、ISO/IEC 27001・27017 認証のもと、国際規格に基づく情報セキュリティマネジメントシステムを構築・運用しています。
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                {CERT_MARKS.map((m) => (
                  <div
                    key={m.src}
                    style={{
                      background: '#ffffff',
                      borderRadius: 14,
                      padding: 12,
                      boxShadow: '0 12px 32px rgba(8,21,18,0.22)',
                    }}
                  >
                    <Image
                      src={m.src}
                      alt={m.alt}
                      width={m.width}
                      height={m.height}
                      unoptimized
                      style={{ height: 92, width: 'auto', display: 'block' }}
                    />
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(244,255,252,0.72)', margin: 0 }}>
                審査・認証: SGSジャパン株式会社（{CERT.acquired}取得）
              </p>
              {CERT.scope ? (
                <p style={{ fontSize: 12.5, lineHeight: 1.7, color: 'rgba(244,255,252,0.6)', margin: 0 }}>
                  認証範囲: {CERT.scope}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        {/* ── Controls teaser. Headline points read at a glance; the full
            spec lives in the whitepaper below. ─────────────────────── */}
        <section style={{ padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 28px)' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto' }}>
            <div style={{ marginBottom: 24, maxWidth: 760 }}>
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
                Core Controls
              </div>
              <h2
                style={{
                  fontSize: 'clamp(26px, 4vw, 38px)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  color: '#132822',
                  marginBottom: 10,
                }}
              >
                認証を支える情報セキュリティ運用
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: '#567168' }}>
                データの保管場所から通信経路、アクセス制御、AI 運用まで一貫して管理しています。各項目の詳細は情報セキュリティホワイトペーパーで公開しています。
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 14,
              }}
            >
              {controls.map((c) => (
                <div
                  key={c.label}
                  style={{
                    padding: '20px',
                    borderRadius: 20,
                    background: '#ffffff',
                    border: '1px solid #deebe7',
                    boxShadow: '0 12px 34px rgba(16,35,30,0.05)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#6a8178',
                      marginBottom: 10,
                    }}
                  >
                    {c.label}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.5, color: '#16332b' }}>
                    {c.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Whitepaper download — lead magnet; full spec lives here ── */}
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
