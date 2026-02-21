'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import HubSpotModal from './HubSpotModal'
import HubSpotMeetingModal from './HubSpotMeetingModal'

type NavProps = {
  variant?: 'light' | 'dark'
}

export default function Nav({ variant = 'light' }: NavProps) {
  const pathname = usePathname()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false)

  const isDark = variant === 'dark'

  const navLinks = [
    { href: '/', label: 'Meeton AI' },
    { href: '/talent/', label: 'Meeton Talent' },
    { href: '/blog/', label: 'ブログ' },
    { href: '/careers/', label: '採用情報' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  if (isDark) {
    return (
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '16px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(10,10,18,.8)',
        backdropFilter: 'blur(24px) saturate(1.4)',
        borderBottom: '1px solid rgba(42,42,68,.5)'
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image
            src="/logo.svg"
            alt="DynaMeet"
            width={140}
            height={30}
            style={{ height: 28, width: 'auto' }}
          />
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 6,
            background: '#1a1a2e',
            border: '1px solid #2a2a44',
            color: '#7878a0'
          }}>Careers</span>
        </Link>
        <div style={{ display: 'flex', gap: 28 }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: 14,
                color: isActive(link.href) ? '#12a37d' : '#7878a0',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'color .2s'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 14,
            padding: '10px 24px',
            borderRadius: 10,
            background: 'linear-gradient(135deg,#12a37d,#3b6ff5)',
            color: '#fff',
            boxShadow: '0 4px 20px rgba(18,163,125,.25)'
          }}>募集職種を見る</button>
        </div>
      </nav>
    )
  }

  // Light variant (for Meeton AI and Meeton Talent pages)
  const isTalent = pathname.startsWith('/talent')
  const ctaColor = isTalent ? '#2563eb' : '#12a37d'
  const ctaGradient = isTalent
    ? 'linear-gradient(135deg,#2563eb,#3b82f6)'
    : 'linear-gradient(135deg,#12a37d,#0fc19a)'
  const ctaGlow = isTalent
    ? 'rgba(37,99,235,.22)'
    : 'rgba(18,163,125,.25)'

  const utmCampaign = isTalent ? 'meeton-talent' : 'meeton-ai'
  const demoUrl = isTalent
    ? 'https://meetings-na2.hubspot.com/takumi-sawano?utm_source=website&utm_medium=cta&utm_campaign=meeton-talent'
    : 'https://meetings-na2.hubspot.com/takumi-sawano?utm_source=website&utm_medium=cta&utm_campaign=meeton-ai'

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '14px 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(255,255,255,.85)',
      backdropFilter: 'blur(20px) saturate(1.4)',
      borderBottom: '1px solid rgba(223,227,240,.6)'
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Image
          src="/logo-dark.svg"
          alt="DynaMeet"
          width={140}
          height={30}
          style={{ height: 28, width: 'auto' }}
        />
      </Link>
      <div style={{ display: 'flex', gap: 28 }}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: 15,
              color: isActive(link.href) ? ctaColor : '#6e7494',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color .2s',
              position: 'relative'
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            background: 'transparent',
            border: '2px solid #c8cedf',
            color: '#6e7494',
            padding: '12px 26px',
            borderRadius: 10,
            fontSize: 15,
            cursor: 'pointer',
            fontWeight: 700,
            transition: 'all .25s'
          }}
        >
          資料請求
        </button>
        <button
          onClick={() => setIsMeetingModalOpen(true)}
          style={{
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
            borderRadius: 10,
            background: ctaGradient,
            color: '#fff',
            padding: '12px 26px',
            fontSize: 15,
            boxShadow: `0 4px 16px ${ctaGlow}`,
            transition: 'all .25s',
          }}
        >
          デモを予約
        </button>
      </div>
      <HubSpotModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} utmCampaign={utmCampaign} />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign={utmCampaign} />
    </nav>
  )
}
