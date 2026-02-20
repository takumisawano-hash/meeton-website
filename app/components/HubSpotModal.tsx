'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          portalId: string
          formId: string
          region: string
          target: string
        }) => void
      }
    }
  }
}

type HubSpotModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function HubSpotModal({ isOpen, onClose }: HubSpotModalProps) {
  const formContainerRef = useRef<HTMLDivElement>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('hubspot-script')) {
      const script = document.createElement('script')
      script.id = 'hubspot-script'
      script.src = '//js-na2.hsforms.net/forms/embed/v2.js'
      script.charset = 'utf-8'
      script.async = true
      script.onload = () => setScriptLoaded(true)
      document.head.appendChild(script)
    } else if (window.hbspt) {
      setScriptLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (isOpen && scriptLoaded && formContainerRef.current && window.hbspt) {
      formContainerRef.current.innerHTML = ''
      window.hbspt.forms.create({
        portalId: '45872857',
        formId: 'dd42d8b3-e426-4079-9479-fa28287c0544',
        region: 'na2',
        target: '#hubspot-form-container',
      })
    }
  }, [isOpen, scriptLoaded])

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
          padding: '40px 36px',
          maxWidth: 520,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 25px 80px rgba(0,0,0,0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
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
          }}
          aria-label="閉じる"
        >
          ×
        </button>
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: '#0f1128',
              marginBottom: 8,
            }}
          >
            資料請求
          </h2>
          <p style={{ fontSize: 14, color: '#6e7494' }}>
            以下のフォームにご記入ください
          </p>
        </div>
        <div id="hubspot-form-container" ref={formContainerRef} />
      </div>
    </div>
  )
}
