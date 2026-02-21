import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: '会社概要',
  description: 'DynaMeet株式会社の会社概要。営業支援AI「Meeton AI」を開発・運用しています。',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: '会社概要｜Meeton AI',
    description: 'DynaMeet株式会社の会社概要。営業支援AI「Meeton AI」を開発・運用しています。',
    url: 'https://dynameet.ai/about/',
  },
}

export default function AboutPage() {
  const companyInfo = [
    { label: '会社名', value: 'DynaMeet株式会社' },
    { label: '共同創業者 兼 CTO', value: 'Ray Ayan' },
    { label: '共同創業者 兼 CRO', value: '澤野 拓実' },
    { label: '創立年月日', value: '2024年10月3日' },
    { label: '事業内容', value: '営業支援AI「Meeton ai」の開発・運用' },
    {
      label: '所在地',
      value: (
        <>
          〒150-0033
          <br />
          東京都渋谷区猿楽町17-10
          <br />
          代官山アートヴィレッジ2C
        </>
      ),
    },
    { label: '適格請求書番号', value: 'T9011001165145' },
  ]

  return (
    <>
      <Nav />
      <main
        style={{
          minHeight: '100vh',
          paddingTop: 100,
          background: '#fff',
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            padding: '48px 24px 80px',
          }}
        >
          {/* Breadcrumb */}
          <nav
            aria-label="パンくずリスト"
            style={{
              marginBottom: 32,
              fontSize: 14,
              color: '#6e7494',
            }}
          >
            <Link
              href="/"
              style={{
                color: '#6e7494',
                textDecoration: 'none',
              }}
            >
              ホーム
            </Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#0f1128' }}>会社概要</span>
          </nav>

          {/* Header */}
          <header style={{ marginBottom: 48 }}>
            <h1
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: '#0f1128',
                margin: 0,
              }}
            >
              会社概要
            </h1>
          </header>

          {/* Company Info Table */}
          <div
            style={{
              background: '#f8fafc',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
            }}
          >
            {companyInfo.map((item, index) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  borderBottom:
                    index < companyInfo.length - 1 ? '1px solid #e5e7eb' : 'none',
                }}
              >
                <div
                  style={{
                    width: 200,
                    flexShrink: 0,
                    padding: '20px 24px',
                    background: '#f1f5f9',
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#374151',
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: '20px 24px',
                    fontSize: 15,
                    color: '#0f1128',
                    lineHeight: 1.7,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {/* JSON-LD for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://dynameet.ai/#organization',
            name: 'DynaMeet株式会社',
            legalName: 'DynaMeet株式会社',
            alternateName: ['Meeton AI', 'DynaMeet', 'ダイナミート'],
            url: 'https://dynameet.ai',
            logo: 'https://dynameet.ai/logo-dark.svg',
            foundingDate: '2024-10-03',
            founders: [
              {
                '@type': 'Person',
                name: 'Ray Ayan',
                jobTitle: 'CTO',
              },
              {
                '@type': 'Person',
                name: '澤野 拓実',
                jobTitle: 'CRO',
              },
            ],
            address: {
              '@type': 'PostalAddress',
              streetAddress: '猿楽町17-10 代官山アートヴィレッジ2C',
              addressLocality: '渋谷区',
              addressRegion: '東京都',
              postalCode: '150-0033',
              addressCountry: 'JP',
            },
            vatID: 'T9011001165145',
            description:
              '営業支援AI「Meeton ai」の開発・運用を行うB2B SaaSスタートアップ。',
          }),
        }}
      />
    </>
  )
}
