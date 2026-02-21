'use client'

import { useEffect } from 'react'

type HubSpotMeetingModalProps = {
  isOpen: boolean
  onClose: () => void
  utmCampaign?: string
}

export default function HubSpotMeetingModal({ isOpen, onClose, utmCampaign }: HubSpotMeetingModalProps) {
  const baseUrl = 'https://meetings-na2.hubspot.com/takumi-sawano'
  const utmParams = utmCampaign
    ? `utm_source=website&utm_medium=cta&utm_campaign=${utmCampaign}`
    : ''
  const embedUrl = `${baseUrl}?embed=true${utmParams ? `&${utmParams}` : ''}`

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15, 17, 40, 0.6)',
          backdropFilter: 'blur(8px)',
        }}
      />
      <div
        style={{
          position: 'relative',
          background: '#fff',
          borderRadius: 20,
          padding: '24px',
          maxWidth: 700,
          width: '100%',
          height: '85vh',
          maxHeight: 750,
          boxShadow: '0 25px 80px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1px solid #e5e7eb',
            background: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            color: '#6e7494',
            transition: 'all 0.2s',
            zIndex: 10,
          }}
          aria-label="閉じる"
        >
          ×
        </button>
        <div style={{ marginBottom: 16, textAlign: 'center', paddingRight: 40 }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: '#0f1128',
              marginBottom: 4,
            }}
          >
            デモを予約
          </h2>
          <p style={{ fontSize: 14, color: '#6e7494' }}>
            ご都合の良い日時をお選びください
          </p>
        </div>
        <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          <iframe
            src={embedUrl}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            title="デモ予約カレンダー"
          />
        </div>
      </div>
    </div>
  )
}
