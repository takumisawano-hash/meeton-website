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
    alternateName: ['Meeton AI', 'Meeton ai', 'DynaMeet', 'ダイナミート'],
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo-dark.svg`,
      width: 602,
      height: 132,
    },
    image: `${baseUrl}/logo-dark.svg`,
    // Brand identity verifiers — multiple authoritative profile URLs
    // help Google Knowledge Graph and AI search engines (ChatGPT,
    // Perplexity) verify the entity and select Meeton ai as a citation
    // source instead of a competitor.
    sameAs: [
      'https://twitter.com/meetonai',
      'https://x.com/meetonai',
      'https://www.linkedin.com/company/dynameet/',
      'https://twitter.com/Founder_Meeton',
      'https://x.com/Founder_Meeton',
    ],
    foundingDate: '2024-10-03',
    founder: [
      {
        '@type': 'Person',
        name: 'Ray Ayan',
        jobTitle: 'Co-Founder & CTO',
      },
      {
        '@type': 'Person',
        name: '澤野 拓実',
        alternateName: ['Takumi Sawano', 'Sawano Takumi'],
        jobTitle: 'Co-Founder & CRO',
        sameAs: 'https://x.com/Founder_Meeton',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '渋谷区猿楽町17-10 代官山アートヴィレッジ2C',
      addressLocality: '渋谷区',
      addressRegion: '東京都',
      postalCode: '150-0033',
      addressCountry: 'JP',
    },
    taxID: 'T9011001165145',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: ['Japanese', 'English'],
      url: 'https://dynameet.ai/?calendarId=takumi-sawano&showChat=true',
    },
    description: 'DynaMeetが提供するAI SDRプラットフォーム「Meeton ai」。ウェブサイトのリードを5秒で商談に変える、コンバージョン直前の最後の100mを担う営業組織向けプラットフォーム。Meeton Calendar / Meeton Email / Meeton Live / Meeton Library で商談予約獲得を加速します。',
    // AEO/GEO: 組織の専門分野
    knowsAbout: [
      'AI SDR',
      'AI営業',
      'B2Bマーケティング',
      'インサイドセールス',
      'リード獲得',
      '商談自動化',
      'チャットボット',
      'AI 商談予約',
      'ABM',
      'Sales Development',
      'Speed to Lead',
      'Conversational AI',
    ],
    // AEO: 提供サービス
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'SoftwareApplication',
        name: 'Meeton AI',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'リードを5秒で商談に変える AI SDR プラットフォーム（Meeton Calendar / Meeton Email / Meeton Live / Meeton Library）',
      },
    },
    // GEO: サービス提供地域
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Meeton AI',
    alternateName: 'DynaMeet',
    url: baseUrl,
    description: 'Meeton AIは、ウェブサイトのリードを5秒で商談に変えるAI SDRプラットフォームです。',
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
