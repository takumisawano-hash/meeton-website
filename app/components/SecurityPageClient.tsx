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

const whitepaperTags = ['インフラ構成', 'データ保護・暗号化', 'アクセス制御・運用統制', 'バックアップ体制']

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
              padding: 'clamp(26px, 4vw, 44px)',
              color: '#f4fffc',
              boxShadow: '0 28px 80px rgba(16,35,30,0.16)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: 'clamp(24px, 4vw, 44px)',
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
                  marginBottom: 22,
                }}
              >
                Trust Center
              </div>
              <h1
                style={{
                  fontSize: 'clamp(30px, 5vw, 46px)',
                  lineHeight: 1.12,
                  fontWeight: 900,
                  marginBottom: 16,
                  letterSpacing: '-0.04em',
                }}
              >
                情報セキュリティ対策について
              </h1>
              <p
                style={{
                  fontSize: 'clamp(15px, 1.7vw, 18px)',
                  lineHeight: 1.85,
                  color: 'rgba(244,255,252,0.82)',
                  maxWidth: 480,
                  margin: 0,
                }}
              >
                Meeton ai はお客様のデータを安全に保護するため、ISO/IEC 27001・27017 認証のもと、国際規格に基づく情報セキュリティマネジメントシステムを構築・運用しています。
              </p>
            </div>

            {/* Marks — matted on white chips so each lockup stays on solid
                white over the dark hero (SGS background rule). */}
            <div
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20,
                padding: 'clamp(18px, 2.4vw, 24px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#7fe4c4',
                }}
              >
                Certifications
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                {CERT_MARKS.map((m) => (
                  <div
                    key={m.src}
                    style={{
                      background: '#ffffff',
                      borderRadius: 12,
                      padding: 10,
                      flex: '1 1 180px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      src={m.src}
                      alt={m.alt}
                      width={m.width}
                      height={m.height}
                      unoptimized
                      style={{ height: 104, width: 'auto', display: 'block' }}
                    />
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12.5, lineHeight: 1.7, color: 'rgba(244,255,252,0.66)', margin: 0 }}>
                審査・認証: SGSジャパン株式会社（{CERT.acquired}取得）
              </p>
              {CERT.scope ? (
                <p style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(244,255,252,0.56)', margin: 0 }}>
                  認証範囲: {CERT.scope}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        {/* ── Controls teaser. Headline points read at a glance; the full
            spec lives in the whitepaper below. ─────────────────────── */}
        <section style={{ padding: 'clamp(36px, 5vw, 60px) clamp(16px, 4vw, 28px)' }}>
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

        {/* ── Whitepaper download — compact CTA band (lead magnet). ──── */}
        <section style={{ padding: '0 clamp(16px, 4vw, 28px) clamp(56px, 8vw, 96px)' }}>
          <div
            style={{
              maxWidth: 1180,
              margin: '0 auto',
              background: 'linear-gradient(120deg, #0f201c 0%, #112824 60%, #0c3038 100%)',
              borderRadius: 26,
              padding: 'clamp(24px, 3.4vw, 38px)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'clamp(20px, 3vw, 36px)',
              color: '#ecfaf6',
              boxShadow: '0 28px 80px rgba(8, 21, 18, 0.22)',
            }}
          >
            <div style={{ flex: '1 1 460px', minWidth: 0 }}>
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
                Whitepaper
              </div>
              <h2
                style={{
                  fontSize: 'clamp(22px, 3vw, 30px)',
                  lineHeight: 1.25,
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  marginBottom: 12,
                }}
              >
                情報セキュリティホワイトペーパー
              </h2>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: 'rgba(236,250,246,0.78)',
                  margin: '0 0 16px',
                  maxWidth: 600,
                }}
              >
                インフラ構成・データ保護方針・バックアップ体制まで、より詳細な情報セキュリティ仕様をまとめています。
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {whitepaperTags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: 'rgba(236,250,246,0.9)',
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 999,
                      padding: '6px 12px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                (window as any).Meeton?.openDownloadCenter({
                  docId: '54a7d40d-e99d-40f2-bed2-80d64a400093',
                  pageNumber: 1,
                })
              }
              style={{
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '15px 26px',
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
