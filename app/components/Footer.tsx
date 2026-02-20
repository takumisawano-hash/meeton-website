'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type FooterProps = {
  variant?: 'light' | 'dark'
}

export default function Footer({ variant = 'light' }: FooterProps) {
  const pathname = usePathname()
  const isDark = variant === 'dark'
  const isTalent = pathname.startsWith('/talent')

  const ctaColor = isTalent ? '#2563eb' : '#12a37d'

  if (isDark) {
    return (
      <footer style={{
        borderTop: '1px solid #2a2a44',
        padding: '32px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#12121e'
      }}>
        <div style={{
          fontWeight: 900,
          fontSize: 16,
          color: '#7878a0',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <div style={{
            width: 24,
            height: 24,
            borderRadius: 7,
            background: 'linear-gradient(135deg,#12a37d,#3b6ff5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 900,
            color: '#fff'
          }}>D</div>
          DynaMeet K.K.
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link href="/" style={{ fontSize: 13, color: '#7878a0', textDecoration: 'none', fontWeight: 600 }}>Meeton ai</Link>
          <Link href="/talent/" style={{ fontSize: 13, color: '#7878a0', textDecoration: 'none', fontWeight: 600 }}>Meeton Talent</Link>
          <a href="#" style={{ fontSize: 13, color: '#7878a0', textDecoration: 'none', fontWeight: 600 }}>会社概要</a>
          <a href="#" style={{ fontSize: 13, color: '#7878a0', textDecoration: 'none', fontWeight: 600 }}>お問い合わせ</a>
        </div>
        <div style={{ fontSize: 12, color: '#7878a0' }}>© 2025 DynaMeet K.K.</div>
      </footer>
    )
  }

  return (
    <footer style={{
      borderTop: '1px solid #dfe3f0',
      padding: '36px 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: isTalent ? '#f8f9fc' : '#f4f6fb'
    }}>
      <div style={{ fontWeight: 900, fontSize: 17, color: '#6e7494' }}>
        Meeton<span style={{ color: ctaColor }}> {isTalent ? 'Talent' : 'ai'}</span>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <Link href="/" style={{ fontSize: 13, color: '#6e7494', textDecoration: 'none', fontWeight: 600 }}>プロダクト</Link>
        <a href="#" style={{ fontSize: 13, color: '#6e7494', textDecoration: 'none', fontWeight: 600 }}>ブログ</a>
        <a href="#" style={{ fontSize: 13, color: '#6e7494', textDecoration: 'none', fontWeight: 600 }}>お問い合わせ</a>
      </div>
      <div style={{ fontSize: 12, color: '#9498b2' }}>© 2025 DynaMeet K.K.</div>
    </footer>
  )
}
