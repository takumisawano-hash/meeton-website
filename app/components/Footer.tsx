'use client'

import Link from 'next/link'
import Image from 'next/image'
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
        <Image
          src="/logo.svg"
          alt="DynaMeet"
          width={120}
          height={26}
          style={{ height: 24, width: 'auto', opacity: 0.7 }}
        />
        <div style={{ display: 'flex', gap: 20 }}>
          <Link href="/" style={{ fontSize: 13, color: '#7878a0', textDecoration: 'none', fontWeight: 600 }}>Meeton ai</Link>
          <Link href="/talent/" style={{ fontSize: 13, color: '#7878a0', textDecoration: 'none', fontWeight: 600 }}>Meeton Talent</Link>
          <Link href="/about/" style={{ fontSize: 13, color: '#7878a0', textDecoration: 'none', fontWeight: 600 }}>会社概要</Link>
          <Link href="/privacy-policy/" style={{ fontSize: 13, color: '#7878a0', textDecoration: 'none', fontWeight: 600 }}>プライバシーポリシー</Link>
          <Link href="/terms/" style={{ fontSize: 13, color: '#7878a0', textDecoration: 'none', fontWeight: 600 }}>利用規約</Link>
        </div>
        <div style={{ fontSize: 12, color: '#7878a0' }}>© 2026 DynaMeet K.K. All rights reserved.</div>
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
      <Image
        src="/logo-dark.svg"
        alt="DynaMeet"
        width={120}
        height={26}
        style={{ height: 24, width: 'auto', opacity: 0.7 }}
      />
      <div style={{ display: 'flex', gap: 24 }}>
        <Link href="/" style={{ fontSize: 13, color: '#6e7494', textDecoration: 'none', fontWeight: 600 }}>Meeton ai</Link>
        <Link href="/talent/" style={{ fontSize: 13, color: '#6e7494', textDecoration: 'none', fontWeight: 600 }}>Meeton Talent</Link>
        <Link href="/blog/" style={{ fontSize: 13, color: '#6e7494', textDecoration: 'none', fontWeight: 600 }}>ブログ</Link>
        <Link href="/about/" style={{ fontSize: 13, color: '#6e7494', textDecoration: 'none', fontWeight: 600 }}>会社概要</Link>
        <Link href="/privacy-policy/" style={{ fontSize: 13, color: '#6e7494', textDecoration: 'none', fontWeight: 600 }}>プライバシーポリシー</Link>
        <Link href="/terms/" style={{ fontSize: 13, color: '#6e7494', textDecoration: 'none', fontWeight: 600 }}>利用規約</Link>
      </div>
      <div style={{ fontSize: 12, color: '#9498b2' }}>© 2026 DynaMeet K.K. All rights reserved.</div>
    </footer>
  )
}
