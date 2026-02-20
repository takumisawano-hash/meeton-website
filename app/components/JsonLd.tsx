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
    name: 'DynaMeet',
    alternateName: 'Meeton AI',
    url: baseUrl,
    logo: `${baseUrl}/icon`,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: ['Japanese', 'English'],
    },
    description: 'AIを活用したB2Bセールス・採用プラットフォームを提供するスタートアップ',
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Meeton AI',
    alternateName: 'DynaMeet',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
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
