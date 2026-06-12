import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import CTAButtons from '@/app/components/v2/CTAButtons'
import { Section, SectionHead, Eyebrow, Card } from '@/app/components/v2/ui'
import { STAGES, PRODUCT_IN_STAGE } from '@/app/lib/stages'

// /about/ — v2 re-skin (navy frame / white canvas / green accent).
// Pre-booking trust checkpoint: mission in v2 vocabulary, founders,
// and the registry facts (会社概要) kept verbatim.

export const metadata: Metadata = {
  title: '会社概要',
  description:
    'DynaMeet株式会社の会社概要。Webサイトを商談を生む営業チャネルに変える AI SDR Platform「Meeton ai」を開発・運用しています。',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: '会社概要',
    description:
      'DynaMeet株式会社の会社概要。Webサイトを商談を生む営業チャネルに変える AI SDR Platform「Meeton ai」を開発・運用しています。',
    url: 'https://dynameet.ai/about/',
  },
}

// Registry facts — do not edit values without checking the corporate registry.
const COMPANY_INFO: { label: string; value: React.ReactNode }[] = [
  { label: '会社名', value: 'DynaMeet株式会社' },
  { label: '共同創業者 兼 CTO', value: 'Ray Ayan' },
  { label: '共同創業者 兼 CRO', value: '澤野 拓実' },
  { label: '創立年月日', value: '2024年10月3日' },
  { label: '事業内容', value: '営業支援AI「Meeton ai」の開発・運用' },
  {
    label: '登記住所',
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

const FOUNDERS = [
  {
    name: 'Ray Ayan',
    titleEn: 'Co-founder & CTO',
    titleJa: '共同創業者 兼 CTO',
    initial: 'R',
    photo: null as string | null,
    line: 'Meeton ai のプロダクト開発を統括。',
  },
  {
    name: '澤野 拓実',
    titleEn: 'Co-founder & CRO',
    titleJa: '共同創業者 兼 CRO',
    initial: '澤',
    photo: '/team/sawano.png',
    line: 'エンタープライズ領域のSDR / AEとして商談化の現場を経験。ビジネスを統括。',
  },
]

export default function AboutPage() {
  const mapsQuery = encodeURIComponent('東京都渋谷区猿楽町17-10 代官山アートヴィレッジ2C')

  return (
    <>
      <Nav />
      <main>
        {/* Hero (navy) — who we are, in the site's own words */}
        <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 64 }}>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow tone="dark">会社情報 / About DynaMeet</Eyebrow>
            <h1
              style={{
                fontFamily: 'var(--fd)',
                fontSize: 'clamp(32px, 5.4vw, 54px)',
                lineHeight: 1.2,
                fontWeight: 800,
                letterSpacing: '-0.025em',
                color: 'var(--on-navy)',
                margin: '18px 0 0',
              }}
            >
              「待つ営業」を、<span style={{ color: 'var(--cta)' }}>終わらせる</span>。
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: 'var(--on-navy-sub)', margin: '20px 0 0', maxWidth: 680 }}>
              DynaMeet株式会社は、Webサイトを商談を生み出す営業チャネルに変える
              AI SDR Platform「Meeton ai」を開発・運用しています。
            </p>
          </div>
        </Section>

        {/* Mission (white) — v2 narrative + the 3 stages from stages.ts */}
        <Section tone="white">
          <SectionHead
            eyebrow="ミッション"
            title={
              <>
                Webサイトを、
                <br />
                商談を生む営業チャネルに。
              </>
            }
            lede="問い合わせを待つだけのWebサイトでは、訪問者の多くが名前を残さず去り、せっかくのリードも初動の遅れや追客切れで商談になりません。Meeton ai は、Webサイトに配属する AI SDR としてこの取りこぼしをなくし、あらゆる瞬間を商談に変えます。"
          />
          <h3
            style={{
              fontFamily: 'var(--fm)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--cta-ink)',
              margin: '0 0 16px',
            }}
          >
            AI SDR の3つの仕事
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {STAGES.map((s) => (
              <Link
                key={s.id}
                href={s.href}
                className="v2-card-link"
                style={{
                  display: 'block',
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-card)',
                  padding: 24,
                  textDecoration: 'none',
                  boxShadow: '0 1px 2px rgba(15,17,40,.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: 15, fontWeight: 700, color: 'var(--cta-ink)' }}>{s.num}</span>
                  <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--heading)' }}>{s.title}</span>
                </div>
                <div style={{ fontFamily: 'var(--fm)', fontSize: 12, color: 'var(--sub)', marginTop: 8 }}>{s.transform}</div>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text)', margin: '10px 0 0' }}>{s.lede}</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--cta-ink)', marginTop: 14 }}>
                  {s.products.map((p) => PRODUCT_IN_STAGE[p].name).join('・')} →
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* Founders (surface) */}
        <Section tone="surface">
          <SectionHead
            eyebrow="共同創業者"
            title="プロダクトとビジネス、両輪で。"
            lede="プロダクト（CTO）とビジネス（CRO）、それぞれの責任者が Meeton ai を開発・運用しています。"
          />
          <div className="ab2-founders">
            {FOUNDERS.map((f) => (
              <Card key={f.name} style={{ display: 'flex', gap: 20, alignItems: 'center', padding: '26px 28px' }}>
                {f.photo ? (
                  <Image
                    src={f.photo}
                    alt={`${f.name}（${f.titleJa}）`}
                    width={72}
                    height={72}
                    style={{ width: 72, height: 72, borderRadius: 999, objectFit: 'cover', flexShrink: 0, border: '2px solid var(--cta-light)' }}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 999,
                      flexShrink: 0,
                      background: 'var(--navy)',
                      color: 'var(--on-navy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--fd)',
                      fontSize: 28,
                      fontWeight: 800,
                    }}
                  >
                    {f.initial}
                  </div>
                )}
                <div>
                  <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--heading)', margin: 0, letterSpacing: '-0.01em' }}>{f.name}</h3>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 700, color: 'var(--cta-ink)', letterSpacing: '.06em', textTransform: 'uppercase', marginTop: 6 }}>
                    {f.titleEn}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sub)', marginTop: 2 }}>{f.titleJa}</div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--text)', margin: '8px 0 0' }}>{f.line}</p>
                </div>
              </Card>
            ))}
          </div>
          <style>{`
            .ab2-founders{display:grid;grid-template-columns:1fr 1fr;gap:20px}
            @media(max-width:720px){.ab2-founders{grid-template-columns:1fr;gap:14px}}
          `}</style>
        </Section>

        {/* Company profile (white) — registry table + offices */}
        <Section tone="white">
          <SectionHead eyebrow="会社概要" title="DynaMeet株式会社" lede="登記情報とオフィスのご案内です。" />

          <div className="ab2-info">
            {COMPANY_INFO.map((item) => (
              <div key={item.label} className="ab2-info-row">
                <div className="ab2-info-label">{item.label}</div>
                <div className="ab2-info-value">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="ab2-offices">
            {/* Registered address */}
            <Card style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 28 }}>
              <div>
                <span className="ab2-badge ab2-badge-reg">登記住所</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--heading)', margin: 0, letterSpacing: '-0.01em' }}>代官山オフィス</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.85, color: 'var(--text)', fontWeight: 600, margin: 0 }}>
                〒150-0033
                <br />
                東京都渋谷区猿楽町17-10
                <br />
                代官山アートヴィレッジ2C
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--sub)', margin: 0 }}>
                法人登記上の所在地です。公式書類・請求書・郵便物の送付先としてご利用ください。
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ab2-map"
              >
                Googleマップで見る →
              </a>
            </Card>

            {/* Operating office */}
            <Card style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 28 }}>
              <div>
                <span className="ab2-badge ab2-badge-op">事業所</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--heading)', margin: 0, letterSpacing: '-0.01em' }}>渋谷オフィス</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.85, color: 'var(--text)', fontWeight: 600, margin: 0 }}>
                〒150-0002
                <br />
                東京都渋谷区渋谷2-12-4
                <br />
                ネクストサイト渋谷ビル
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--sub)', margin: 0 }}>
                日常業務・開発の拠点です。お打ち合わせ等はこちらのオフィスで行っています。
              </p>
              <a
                href="https://maps.app.goo.gl/rcynVB51VzSwQpDb8"
                target="_blank"
                rel="noopener noreferrer"
                className="ab2-map"
              >
                Googleマップで見る →
              </a>
            </Card>
          </div>

          <style>{`
            .ab2-info{background:#fff;border:1px solid var(--border);border-radius:var(--r-card);overflow:hidden;box-shadow:0 1px 2px rgba(15,17,40,.04)}
            .ab2-info-row{display:grid;grid-template-columns:220px 1fr;border-bottom:1px solid var(--border)}
            .ab2-info-row:last-child{border-bottom:none}
            .ab2-info-label{padding:18px 24px;font-size:13px;font-weight:700;color:var(--sub);background:var(--surface);border-right:1px solid var(--border);display:flex;align-items:center}
            .ab2-info-value{padding:18px 24px;font-size:15px;font-weight:600;color:var(--heading);line-height:1.75}
            .ab2-offices{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:28px}
            .ab2-badge{display:inline-flex;align-items:center;padding:4px 12px;border-radius:999px;font-size:11px;font-weight:800;letter-spacing:.04em}
            .ab2-badge-reg{background:var(--surface2);color:var(--sub);border:1px solid var(--border2)}
            .ab2-badge-op{background:var(--cta-light);color:var(--cta-ink);border:1px solid var(--cta-border)}
            .ab2-map{display:inline-flex;align-items:center;gap:6px;align-self:flex-start;margin-top:auto;font-size:13px;font-weight:700;color:var(--cta-ink);text-decoration:none;border:1.5px solid var(--border2);border-radius:999px;padding:9px 18px;transition:border-color .2s,background .2s}
            .ab2-map:hover{border-color:var(--cta);background:var(--cta-wash)}
            @media(max-width:640px){
              .ab2-info-row{grid-template-columns:1fr}
              .ab2-info-label{padding:12px 18px 4px;border-right:none;font-size:12px}
              .ab2-info-value{padding:4px 18px 14px;font-size:14px}
              .ab2-offices{grid-template-columns:1fr;gap:14px}
            }
          `}</style>
        </Section>

        {/* Closing CTA (navy deep) — modest, demo primary / contact secondary */}
        <Section tone="navyDeep" py={72}>
          <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(24px,3.6vw,34px)', fontWeight: 800, color: 'var(--on-navy)', margin: '0 0 14px', letterSpacing: '-0.02em' }}>
              まずは、30分のデモから。
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--on-navy-sub)', margin: '0 0 26px' }}>
              自社サイトにAI SDRを配属する具体策をご覧いただけます。そのほかのご相談はお問い合わせからどうぞ。
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CTAButtons source="about-footer" tone="onNavy" size="lg" align="center" secondaryLabel="お問い合わせ" secondaryHref="/contact/" />
            </div>
            <p style={{ fontSize: 13, margin: '22px 0 0' }}>
              <Link href="/careers/" className="v2-link" style={{ color: 'var(--on-navy-sub)', textDecoration: 'underline' }}>
                採用情報を見る →
              </Link>
            </p>
          </div>
        </Section>
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
              'AI SDR Platform「Meeton ai」の開発・運用を行うB2B SaaSスタートアップ。',
          }),
        }}
      />
    </>
  )
}
