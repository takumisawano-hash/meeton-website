'use client'

type JsonLdProps = {
  type: 'organization' | 'website' | 'breadcrumb'
  breadcrumbs?: { name: string; url: string }[]
}

export default function JsonLd({ type, breadcrumbs }: JsonLdProps) {
  const baseUrl = 'https://dynameet.ai'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'DynaMeet Inc.',
    legalName: 'DynaMeet株式会社',
    alternateName: ['Meeton AI', 'DynaMeet', 'ダイナミート'],
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo-dark.svg`,
      width: 602,
      height: 132,
    },
    image: `${baseUrl}/logo-dark.svg`,
    sameAs: [
      'https://twitter.com/meetonai',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: ['Japanese', 'English'],
      url: 'https://meetings-na2.hubspot.com/takumi-sawano',
    },
    description: 'Meeton AIは、ウェブサイト訪問者をAIチャット・インテントスコアリング・自動スケジューリングで商談に変えるB2B SaaSプラットフォームです。',
    // AEO/GEO: 組織の専門分野
    knowsAbout: [
      'AI営業',
      'B2Bマーケティング',
      'インサイドセールス',
      'リード獲得',
      '商談自動化',
      'チャットボット',
      'ABM',
      'Sales Development',
    ],
    // AEO: 提供サービス
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'SoftwareApplication',
        name: 'Meeton AI',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'AIチャットボットによるリード獲得・商談自動化プラットフォーム',
      },
    },
    // GEO: サービス提供地域
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
    // 業種
    industry: 'B2B SaaS',
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Meeton AI',
    alternateName: 'DynaMeet',
    url: baseUrl,
    description: 'Meeton AIは、ウェブサイト訪問者をAIで商談に変えるB2B SaaSプラットフォームです。',
    inLanguage: 'ja-JP',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    // AEO: サイト内検索
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/blog/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    // GEO: サイトの主要コンテンツ
    mainEntity: {
      '@type': 'Blog',
      '@id': `${baseUrl}/blog/#blog`,
      name: 'Meeton AI ブログ',
      description: 'AI営業、インサイドセールス、B2Bマーケティングに関する最新情報とノウハウ',
      url: `${baseUrl}/blog/`,
      inLanguage: 'ja-JP',
    },
  }

  const breadcrumbSchema = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }
    : null

  const getSchema = () => {
    switch (type) {
      case 'organization':
        return organizationSchema
      case 'website':
        return websiteSchema
      case 'breadcrumb':
        return breadcrumbSchema
      default:
        return null
    }
  }

  const schema = getSchema()
  if (!schema) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
