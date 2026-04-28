'use client'

import { useState } from 'react'
import HubSpotModal from './HubSpotModal'
import HubSpotMeetingModal from './HubSpotMeetingModal'

type BlogCTAProps = {
  category?: string
  slug?: string
}

const COPY_BY_CATEGORY: Record<string, { eyebrow: string; headline: React.ReactNode; description: string; primary: string }> = {
  Sales: {
    eyebrow: 'Meeton AI for Sales',
    headline: <>営業の<span style={{ background: 'linear-gradient(135deg, #12a37d, #3b6ff5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>商談化率を2倍</span>にするAI</>,
    description: 'AIが見込み客を自動でナーチャリングし、商談予約までを完結。営業組織の生産性を抜本的に変える実装ガイドを資料でお届けします。',
    primary: '実装ガイドを受け取る',
  },
  'Inside Sales': {
    eyebrow: 'Meeton AI for Inside Sales',
    headline: <><span style={{ background: 'linear-gradient(135deg, #12a37d, #3b6ff5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AI SDR</span>で 月間商談数を倍増</>,
    description: 'インサイドセールスの架電・メール・LinkedIn DMをAIエージェントが自動化。商談化率40%超を実現する選定ガイドと事例集をお送りします。',
    primary: 'AI SDR選定ガイドを受け取る',
  },
  Marketing: {
    eyebrow: 'Meeton AI for Marketing',
    headline: <>Web訪問者を<span style={{ background: 'linear-gradient(135deg, #12a37d, #3b6ff5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>商談に変える</span>AI</>,
    description: 'チャットボット × 行動ログ × AIナーチャリングで、サイト訪問者を見込み客→商談へ自動転換。マーケ施策のCV率改善ガイドを資料でお届けします。',
    primary: 'CV改善ガイドを受け取る',
  },
}

const DEFAULT_COPY = {
  eyebrow: 'Meeton AI',
  headline: <>Webサイト訪問者を<br /><span style={{ background: 'linear-gradient(135deg, #12a37d, #3b6ff5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>商談に変える</span> AI</>,
  description: 'AIがすべてのWebサイト訪問者に対応し、リードを自動で獲得・育成。商談予約まで自動化します。',
  primary: '資料請求',
}

export default function BlogCTA({ category, slug }: BlogCTAProps = {}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false)
  const copy = (category && COPY_BY_CATEGORY[category]) || DEFAULT_COPY
  const utmCampaign = slug ? `blog-${slug}` : 'meeton-ai-blog'

  return (
    <>
      <section
        style={{
          marginTop: 64,
          padding: '48px 32px',
          background: 'linear-gradient(165deg, #edfcf7 0%, #fff 40%, #f3f0ff 80%, #eaf0fe 100%)',
          borderRadius: 20,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 400,
            background: 'rgba(18, 163, 125, 0.1)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 12,
              fontWeight: 700,
              color: '#7c5cfc',
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {copy.eyebrow}
          </p>
          <h3
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: '#0f1128',
              lineHeight: 1.3,
              marginBottom: 16,
            }}
          >
            {copy.headline}
          </h3>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: '#6e7494',
              maxWidth: 520,
              margin: '0 auto 28px',
            }}
          >
            {copy.description}
          </p>
          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #12a37d, #0fc19a)',
                color: '#fff',
                padding: '14px 28px',
                fontSize: 15,
                boxShadow: '0 4px 16px rgba(18, 163, 125, 0.25)',
                transition: 'all 0.25s',
              }}
            >
              {copy.primary}
            </button>
            <button
              onClick={() => setIsMeetingModalOpen(true)}
              style={{
                background: 'transparent',
                color: '#0f1128',
                border: '2px solid #c8cedf',
                padding: '12px 26px',
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
            >
              デモを予約 →
            </button>
          </div>
        </div>
      </section>

      <HubSpotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        utmCampaign={utmCampaign}
      />
      <HubSpotMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        utmCampaign={utmCampaign}
      />
    </>
  )
}

export function BlogInlineCTA({ category, slug }: BlogCTAProps = {}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const copy = (category && COPY_BY_CATEGORY[category]) || DEFAULT_COPY
  const utmCampaign = slug ? `blog-inline-${slug}` : 'meeton-ai-blog-inline'

  return (
    <>
      <aside
        style={{
          margin: '40px 0',
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #f0fdf8 0%, #f5f3ff 100%)',
          borderLeft: '4px solid #12a37d',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#12a37d', marginBottom: 4 }}>
            📘 関連資料 — 無料ダウンロード
          </p>
          <p style={{ fontSize: 14, color: '#3c4257', lineHeight: 1.6, margin: 0 }}>
            {copy.description}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
            borderRadius: 8,
            background: '#12a37d',
            color: '#fff',
            padding: '10px 20px',
            fontSize: 14,
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
          }}
        >
          {copy.primary} →
        </button>
      </aside>

      <HubSpotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        utmCampaign={utmCampaign}
      />
    </>
  )
}
