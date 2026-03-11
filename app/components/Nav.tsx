'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import HubSpotModal from './HubSpotModal'
import HubSpotMeetingModal from './HubSpotMeetingModal'

type NavProps = {
  variant?: 'light' | 'dark'
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])

  return isMobile
}

export default function Nav({ variant = 'light' }: NavProps) {
  const pathname = usePathname()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isFeaturesDropdownOpen, setIsFeaturesDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const featuresDropdownRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const isDark = variant === 'dark'

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (featuresDropdownRef.current && !featuresDropdownRef.current.contains(event.target as Node)) {
        setIsFeaturesDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const dropdownItems = [
    { href: '/', label: 'AI for 営業・マーケ' },
    { href: '/talent/', label: 'AI for 採用' },
  ]

  const featuresDropdownItems = [
    { href: '/features/chatbot/', label: 'AI Chat', sub: 'AIチャットボット' },
    { href: '/features/onsite/', label: 'On-Site', sub: 'サイト内チャネル' },
    { href: '/features/offsite/', label: 'Outreach', sub: 'サイト外チャネル' },
  ]

  const navLinks = [
    { href: '/blog/', label: 'ブログ' },
    { href: '#download-center', label: 'お役立ち資料', onClick: true },
    { href: '/contact/', label: 'お問い合わせ' },
    { href: '/careers/', label: '採用情報' },
  ]

  const isProductActive = pathname === '/' || pathname.startsWith('/talent')
  const isFeaturesActive = pathname.startsWith('/features')

  // Light variant colors
  const isTalent = pathname.startsWith('/talent')
  const ctaColor = isTalent ? '#2563eb' : '#12a37d'
  const ctaGradient = isTalent
    ? 'linear-gradient(135deg,#2563eb,#3b82f6)'
    : 'linear-gradient(135deg,#12a37d,#0fc19a)'
  const ctaGlow = isTalent
    ? 'rgba(37,99,235,.22)'
    : 'rgba(18,163,125,.25)'
  const utmCampaign = isDark ? 'meeton-careers' : (isTalent ? 'meeton-talent' : 'meeton-ai')

  // Colors based on variant
  const colors = isDark
    ? {
        bg: 'rgba(10,10,18,.95)',
        border: 'rgba(42,42,68,.5)',
        text: '#7878a0',
        textActive: '#12a37d',
        btnBorder: '#3a3a58',
        btnText: '#a8a8c8',
        dropdownBg: '#1a1a2e',
        dropdownBorder: '#2a2a44',
        logo: '/logo.svg',
      }
    : {
        bg: 'rgba(255,255,255,.95)',
        border: 'rgba(223,227,240,.6)',
        text: '#6e7494',
        textActive: ctaColor,
        btnBorder: '#c8cedf',
        btnText: '#6e7494',
        dropdownBg: '#fff',
        dropdownBorder: '#e5e7eb',
        logo: '/logo-dark.svg',
      }

  const HamburgerIcon = () => (
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      aria-label="メニュー"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        zIndex: 200
      }}
    >
      <span style={{
        display: 'block',
        width: 24,
        height: 2,
        background: isDark ? '#a8a8c8' : '#6e7494',
        borderRadius: 2,
        transition: 'all .3s',
        transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
      }} />
      <span style={{
        display: 'block',
        width: 24,
        height: 2,
        background: isDark ? '#a8a8c8' : '#6e7494',
        borderRadius: 2,
        transition: 'all .3s',
        opacity: isMobileMenuOpen ? 0 : 1
      }} />
      <span style={{
        display: 'block',
        width: 24,
        height: 2,
        background: isDark ? '#a8a8c8' : '#6e7494',
        borderRadius: 2,
        transition: 'all .3s',
        transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
      }} />
    </button>
  )

  const MobileMenu = () => (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,.5)',
          zIndex: 150,
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          transition: 'opacity .3s'
        }}
      />
      {/* Menu Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '80%',
        maxWidth: 320,
        background: isDark ? '#0a0a12' : '#fff',
        zIndex: 160,
        transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .3s ease-out',
        display: 'flex',
        flexDirection: 'column',
        padding: '80px 24px 32px',
        overflowY: 'auto'
      }}>
        {/* Product Links */}
        <div style={{ marginBottom: 24 }}>
          <p style={{
            fontSize: 12,
            fontWeight: 600,
            color: isDark ? '#5a5a7a' : '#9ca3af',
            marginBottom: 12,
            textTransform: 'uppercase',
            letterSpacing: 1
          }}>
            Products
          </p>
          {dropdownItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                padding: '14px 0',
                fontSize: 16,
                fontWeight: 600,
                color: pathname === item.href || (item.href === '/talent/' && pathname.startsWith('/talent'))
                  ? colors.textActive
                  : colors.text,
                textDecoration: 'none',
                borderBottom: `1px solid ${isDark ? '#1a1a2e' : '#f1f5f9'}`
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Features Links */}
        <div style={{ marginBottom: 24 }}>
          <p style={{
            fontSize: 12,
            fontWeight: 600,
            color: isDark ? '#5a5a7a' : '#9ca3af',
            marginBottom: 12,
            textTransform: 'uppercase',
            letterSpacing: 1
          }}>
            Features
          </p>
          {featuresDropdownItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                padding: '14px 0',
                textDecoration: 'none',
                borderBottom: `1px solid ${isDark ? '#1a1a2e' : '#f1f5f9'}`
              }}
            >
              <span style={{
                fontSize: 16,
                fontWeight: 600,
                color: pathname === item.href
                  ? colors.textActive
                  : colors.text,
              }}>
                {item.label}
              </span>
              <span style={{
                fontSize: 12,
                color: isDark ? '#5a5a7a' : '#9ca3af',
                fontWeight: 500,
                display: 'block',
                marginTop: 2,
              }}>
                {item.sub}
              </span>
            </Link>
          ))}
        </div>

        {/* Nav Links */}
        <div style={{ marginBottom: 32 }}>
          {navLinks.map(item => (
            item.onClick ? (
              <button
                key={item.href}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  (window as any).Meeton && (window as any).Meeton.openDownloadCenter()
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '14px 0',
                  fontSize: 16,
                  fontWeight: 600,
                  color: colors.text,
                  cursor: 'pointer',
                  borderBottom: `1px solid ${isDark ? '#1a1a2e' : '#f1f5f9'}`
                }}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  fontSize: 16,
                  fontWeight: 600,
                  color: pathname.startsWith(item.href.replace(/\/$/, ''))
                    ? colors.textActive
                    : colors.text,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${isDark ? '#1a1a2e' : '#f1f5f9'}`
                }}
              >
                {item.label}
              </Link>
            )
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {isDark ? (
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe57dBjNsS3pG0QYZAVRFJk4wPKOv6GX7WBF-1tisAslnq5OQ/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                width: '100%',
                padding: '14px 24px',
                fontSize: 15,
                fontWeight: 700,
                background: 'linear-gradient(135deg,#12a37d,#3b6ff5)',
                border: 'none',
                color: '#fff',
                borderRadius: 10,
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(18,163,125,.25)',
                textDecoration: 'none',
                textAlign: 'center'
              }}
            >
              応募する
            </a>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsModalOpen(true)
                }}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  fontSize: 15,
                  fontWeight: 700,
                  background: 'transparent',
                  border: `2px solid ${colors.btnBorder}`,
                  color: colors.btnText,
                  borderRadius: 10,
                  cursor: 'pointer'
                }}
              >
                資料請求
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsMeetingModalOpen(true)
                }}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  fontSize: 15,
                  fontWeight: 700,
                  background: ctaGradient,
                  border: 'none',
                  color: '#fff',
                  borderRadius: 10,
                  cursor: 'pointer',
                  boxShadow: `0 4px 16px ${ctaGlow}`
                }}
              >
                デモを予約
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: isMobile ? '12px 16px' : '14px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: colors.bg,
        backdropFilter: 'blur(24px) saturate(1.4)',
        borderBottom: `1px solid ${colors.border}`
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image
            src={colors.logo}
            alt="DynaMeet"
            width={140}
            height={30}
            style={{ height: isMobile ? 24 : 28, width: 'auto' }}
          />
          {isDark && (
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 6,
              background: '#1a1a2e',
              border: '1px solid #2a2a44',
              color: '#7878a0'
            }}>Careers</span>
          )}
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              {/* Dropdown */}
              <div
                ref={dropdownRef}
                style={{ position: 'relative' }}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 15,
                    color: isProductActive ? colors.textActive : colors.text,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: 0,
                    transition: 'color .2s'
                  }}
                >
                  Meeton ai
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    style={{
                      transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform .2s'
                    }}
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingTop: 12,
                    zIndex: 200
                  }}>
                    <div style={{
                      background: colors.dropdownBg,
                      border: `1px solid ${colors.dropdownBorder}`,
                      borderRadius: 12,
                      padding: '8px 0',
                      minWidth: 180,
                      boxShadow: isDark ? '0 8px 32px rgba(0,0,0,.4)' : '0 8px 32px rgba(0,0,0,.12)',
                    }}>
                      {dropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsDropdownOpen(false)}
                          style={{
                            display: 'block',
                            padding: '12px 20px',
                            fontSize: 14,
                            color: pathname === item.href || (item.href === '/talent/' && pathname.startsWith('/talent'))
                              ? colors.textActive
                              : (isDark ? '#a8a8c8' : colors.text),
                            textDecoration: 'none',
                            fontWeight: 600,
                            transition: 'all .2s',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Features Dropdown */}
              <div
                ref={featuresDropdownRef}
                style={{ position: 'relative' }}
                onMouseEnter={() => setIsFeaturesDropdownOpen(true)}
                onMouseLeave={() => setIsFeaturesDropdownOpen(false)}
              >
                <button
                  onClick={() => setIsFeaturesDropdownOpen(!isFeaturesDropdownOpen)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 15,
                    color: isFeaturesActive ? colors.textActive : colors.text,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: 0,
                    transition: 'color .2s'
                  }}
                >
                  機能
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    style={{
                      transform: isFeaturesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform .2s'
                    }}
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {isFeaturesDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingTop: 12,
                    zIndex: 200
                  }}>
                    <div style={{
                      background: colors.dropdownBg,
                      border: `1px solid ${colors.dropdownBorder}`,
                      borderRadius: 12,
                      padding: '8px 0',
                      minWidth: 220,
                      boxShadow: isDark ? '0 8px 32px rgba(0,0,0,.4)' : '0 8px 32px rgba(0,0,0,.12)',
                    }}>
                      {featuresDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsFeaturesDropdownOpen(false)}
                          style={{
                            display: 'block',
                            padding: '10px 20px',
                            textDecoration: 'none',
                            transition: 'all .2s',
                          }}
                        >
                          <div style={{
                            fontSize: 14,
                            color: pathname === item.href
                              ? colors.textActive
                              : (isDark ? '#a8a8c8' : '#0f1128'),
                            fontWeight: 700,
                            marginBottom: 2,
                          }}>
                            {item.label}
                          </div>
                          <div style={{
                            fontSize: 11,
                            color: isDark ? '#5a5a7a' : '#6e7494',
                            fontWeight: 500,
                          }}>
                            {item.sub}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {navLinks.map(item => (
                item.onClick ? (
                  <button
                    key={item.href}
                    onClick={() => { (window as any).Meeton && (window as any).Meeton.openDownloadCenter() }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      fontSize: 15,
                      color: colors.text,
                      textDecoration: 'none',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'color .2s'
                    }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      fontSize: 15,
                      color: pathname.startsWith(item.href.replace(/\/$/, '')) ? colors.textActive : colors.text,
                      textDecoration: 'none',
                      fontWeight: 600,
                      transition: 'color .2s'
                    }}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {isDark ? (
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe57dBjNsS3pG0QYZAVRFJk4wPKOv6GX7WBF-1tisAslnq5OQ/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg,#12a37d,#3b6ff5)',
                    color: '#fff',
                    padding: '12px 26px',
                    fontSize: 15,
                    boxShadow: '0 4px 20px rgba(18,163,125,.25)',
                    transition: 'all .25s',
                    textDecoration: 'none',
                  }}
                >
                  応募する
                </a>
              ) : (
                <>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                      background: 'transparent',
                      border: `2px solid ${colors.btnBorder}`,
                      color: colors.btnText,
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
                </>
              )}
            </div>
          </>
        )}

        {/* Mobile Hamburger */}
        {isMobile && <HamburgerIcon />}
      </nav>

      {/* Mobile Menu */}
      {isMobile && <MobileMenu />}

      {/* Modals */}
      <HubSpotModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} utmCampaign={utmCampaign} />
      <HubSpotMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} utmCampaign={utmCampaign} />
    </>
  )
}
