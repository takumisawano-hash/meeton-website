'use client'

import { useState } from 'react'
import HubSpotModal from './HubSpotModal'
import HubSpotMeetingModal from './HubSpotMeetingModal'

export default function BlogCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false)

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
            Meeton AI
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
            Webサイト訪問者を
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #12a37d, #3b6ff5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              商談に変える
            </span>{' '}
            AI
          </h3>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: '#6e7494',
              maxWidth: 480,
              margin: '0 auto 28px',
            }}
          >
            AIがすべてのWebサイト訪問者に対応し、リードを自動で獲得・育成。商談予約まで自動化します。
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
              資料請求
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
        utmCampaign="meeton-ai-blog"
      />
      <HubSpotMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        utmCampaign="meeton-ai-blog"
      />
    </>
  )
}
