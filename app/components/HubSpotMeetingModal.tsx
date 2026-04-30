'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type HubSpotMeetingModalProps = {
  isOpen: boolean
  onClose: () => void
  utmCampaign?: string
}

// Defer link hints to browser idle. preconnect alone is cheap, but prefetch
// pulls the full meeting page bundle and was competing with LCP on every
// page that imports this modal — even when the modal never opens.
let preloadedIframe: HTMLLinkElement | null = null
if (typeof window !== 'undefined' && !preloadedIframe) {
  const addHints = () => {
    if (preloadedIframe) return
    preloadedIframe = document.createElement('link')
    preloadedIframe.rel = 'preconnect'
    preloadedIframe.href = 'https://meetings-na2.hubspot.com'
    document.head.appendChild(preloadedIframe)

    const prefetch = document.createElement('link')
    prefetch.rel = 'prefetch'
    prefetch.href = 'https://meetings-na2.hubspot.com/takumi-sawano?embed=true'
    document.head.appendChild(prefetch)
  }
  const idle = (window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  }).requestIdleCallback
  if (idle) idle(addHints, { timeout: 3000 })
  else setTimeout(addHints, 2000)
}

export default function HubSpotMeetingModal({ isOpen, onClose, utmCampaign }: HubSpotMeetingModalProps) {
  const baseUrl = 'https://meetings-na2.hubspot.com/takumi-sawano'
  const utmParams = utmCampaign
    ? `utm_source=website&utm_medium=cta&utm_campaign=${utmCampaign}`
    : ''
  const embedUrl = `${baseUrl}?embed=true${utmParams ? `&${utmParams}` : ''}`
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const handleMessage = (e: MessageEvent) => {
      if (e.origin.includes('hubspot.com') && e.data?.meetingBookSucceeded) {
        setBooked(true)
        if (typeof window !== 'undefined') {
          if (window.gtag) {
            window.gtag('event', 'conversion', {
              send_to: 'AW-18060590496/5EyJCIqrspUcEKD7-qND',
            })
            window.gtag('event', 'form_submit', {
              form_type: 'meeting',
              utm_campaign: utmCampaign || '',
            })
            window.gtag('event', 'generate_lead', { form_type: 'meeting' })
          }
          if ((window as unknown as { lintrk?: (a: string, b: { conversion_id: number }) => void }).lintrk) {
            (window as unknown as { lintrk: (a: string, b: { conversion_id: number }) => void }).lintrk('track', { conversion_id: 25161212 })
          }
        }
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      window.addEventListener('message', handleMessage)
      document.body.style.overflow = 'hidden'
      setIframeLoaded(false)
      setBooked(false)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      window.removeEventListener('message', handleMessage)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isOpen || !mounted) return null

  return createPortal(
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
        {booked ? (
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', textAlign: 'center',
            borderRadius: 12, border: '1px solid #e5e7eb', background: '#f8fafc',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'linear-gradient(135deg, #12a37d, #3b82f6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 24,
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0f1128', marginBottom: 8 }}>
              ご予約ありがとうございます
            </h3>
            <p style={{ fontSize: 14, color: '#6e7494', lineHeight: 1.7, marginBottom: 28 }}>
              確認メールをお送りしました。<br />当日お会いできることを楽しみにしています。
            </p>
            <button
              onClick={onClose}
              style={{
                padding: '12px 28px',
                background: 'linear-gradient(135deg, #12a37d, #0d8a6a)',
                color: '#fff', borderRadius: 10, fontWeight: 700,
                fontSize: 14, border: 'none', cursor: 'pointer',
              }}
            >
              閉じる
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', position: 'relative' }}>
            {!iframeLoaded && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8fafc',
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  border: '3px solid #e5e7eb',
                  borderTopColor: '#12a37d',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}
            <iframe
              src={embedUrl}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                opacity: iframeLoaded ? 1 : 0,
                transition: 'opacity 0.2s',
              }}
              title="デモ予約カレンダー"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
