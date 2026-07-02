import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import CTAButtons from '@/app/components/v2/CTAButtons'
import { Section, SectionHead, Eyebrow, Card } from '@/app/components/v2/ui'
import { STAGES, PRODUCT_IN_STAGE } from '@/app/lib/stages'
import type { Lang } from '@/app/lib/i18n'

// Lang-aware /about/ body. JA is the default → the existing /about/ page renders
// byte-identically. Registry facts (company name, founders, dates, addresses,
// invoice number) are kept verbatim in both locales; only labels translate.

type AboutStrings = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroH1: React.ReactNode;
  heroSub: string;
  missionEyebrow: string;
  missionTitle: React.ReactNode;
  missionLede: string;
  threeJobsLabel: string;
  foundersEyebrow: string;
  foundersTitle: string;
  foundersLede: string;
  profileEyebrow: string;
  profileTitle: string;
  profileLede: string;
  badgeReg: string;
  badgeOp: string;
  regOfficeName: string;
  regOfficeNote: string;
  opOfficeName: string;
  opOfficeNote: string;
  mapCta: string;
  finalTitle: string;
  finalSub: string;
  finalSecondaryLabel: string;
  careersLink: string;
  companyInfo: { label: string; value: React.ReactNode }[];
  founders: { name: string; titleEn: string; titleJa: string; initial: string; photo: string | null; line: string }[];
};

// Address blocks — JA verbatim; EN romanized (postal-valid either way).
const regAddress = (
  <>
    〒150-0033
    <br />
    東京都渋谷区猿楽町17-10
    <br />
    代官山アートヴィレッジ2C
  </>
);
const opAddress = (
  <>
    〒150-0002
    <br />
    東京都渋谷区渋谷2-12-4
    <br />
    ネクストサイト渋谷ビル
  </>
);
const regAddressEn = (
  <>
    Daikanyama Art Village 2C
    <br />
    17-10 Sarugakucho, Shibuya-ku
    <br />
    Tokyo 150-0033, Japan
  </>
);
const opAddressEn = (
  <>
    Next Site Shibuya Bldg.
    <br />
    2-12-4 Shibuya, Shibuya-ku
    <br />
    Tokyo 150-0002, Japan
  </>
);

export const ABOUT_STR: Record<Lang, AboutStrings> = {
  ja: {
    metaTitle: '会社概要',
    metaDescription:
      'DynaMeet株式会社の会社概要。Webサイトを商談を生む営業チャネルに変える AI SDR Platform「Meeton ai」を開発・運用しています。',
    heroEyebrow: '会社情報 / About DynaMeet',
    heroH1: (
      <>
        「待つ営業」を、<span style={{ color: 'var(--cta)' }}>終わらせる</span>。
      </>
    ),
    heroSub:
      'DynaMeet株式会社は、Webサイトを商談を生み出す営業チャネルに変える AI SDR Platform「Meeton ai」を開発・運用しています。',
    missionEyebrow: 'ミッション',
    missionTitle: (
      <>
        Webサイトを、
        <br />
        商談を生む営業チャネルに。
      </>
    ),
    missionLede:
      '問い合わせを待つだけのWebサイトでは、訪問者の多くが名前を残さず去り、せっかくのリードも初動の遅れや追客切れで商談になりません。Meeton ai は、Webサイトに配属する AI SDR としてこの取りこぼしをなくし、あらゆる瞬間を商談に変えます。',
    threeJobsLabel: 'AI SDR の3つの仕事',
    foundersEyebrow: '共同創業者',
    foundersTitle: 'プロダクトとビジネス、両輪で。',
    foundersLede: 'プロダクト（CTO）とビジネス（CRO）、それぞれの責任者が Meeton ai を開発・運用しています。',
    profileEyebrow: '会社概要',
    profileTitle: 'DynaMeet株式会社',
    profileLede: '登記情報とオフィスのご案内です。',
    badgeReg: '登記住所',
    badgeOp: '事業所',
    regOfficeName: '代官山オフィス',
    regOfficeNote: '法人登記上の所在地です。公式書類・請求書・郵便物の送付先としてご利用ください。',
    opOfficeName: '渋谷オフィス',
    opOfficeNote: '日常業務・開発の拠点です。お打ち合わせ等はこちらのオフィスで行っています。',
    mapCta: 'Googleマップで見る →',
    finalTitle: 'まずは、30分のデモから。',
    finalSub: '自社サイトにAI SDRを配属する具体策をご覧いただけます。そのほかのご相談はお問い合わせからどうぞ。',
    finalSecondaryLabel: 'お問い合わせ',
    careersLink: '採用情報を見る →',
    companyInfo: [
      { label: '会社名', value: 'DynaMeet株式会社' },
      { label: '共同創業者 兼 CTO', value: 'Ray Ayan' },
      { label: '共同創業者 兼 CRO', value: '澤野 拓実' },
      { label: '創立年月日', value: '2024年10月3日' },
      { label: '事業内容', value: '営業支援AI「Meeton ai」の開発・運用' },
      { label: '登記住所', value: regAddress },
      { label: '適格請求書番号', value: 'T9011001165145' },
    ],
    founders: [
      {
        name: 'Ray Ayan',
        titleEn: 'Co-founder & CTO',
        titleJa: '共同創業者 兼 CTO',
        initial: 'R',
        photo: null,
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
    ],
  },
  en: {
    metaTitle: 'About',
    metaDescription:
      'About DynaMeet, Inc. We build and operate Meeton ai, the AI SDR Platform that turns your website into a sales channel that generates meetings.',
    heroEyebrow: 'Company / About DynaMeet',
    heroH1: (
      <>
        Ending the era of <span style={{ color: 'var(--cta)' }}>"sales that waits."</span>
      </>
    ),
    heroSub:
      'DynaMeet, Inc. builds and operates Meeton ai, the AI SDR Platform that turns your website into a sales channel that generates meetings.',
    missionEyebrow: 'Mission',
    missionTitle: (
      <>
        Turn your website into
        <br />
        a sales channel that generates meetings.
      </>
    ),
    missionLede:
      'On a website that just waits for inquiries, most visitors leave without giving their name, and even the leads you do get never become meetings — lost to slow first response and dropped follow-up. As an AI SDR deployed on your website, Meeton ai eliminates these missed opportunities and turns every moment into a meeting.',
    threeJobsLabel: 'The three jobs of an AI SDR',
    foundersEyebrow: 'Co-founders',
    foundersTitle: 'Product and business, working in tandem.',
    foundersLede: 'The leaders of product (CTO) and business (CRO) build and operate Meeton ai together.',
    profileEyebrow: 'Company profile',
    profileTitle: 'DynaMeet, Inc.',
    profileLede: 'Registry information and our offices.',
    badgeReg: 'Registered address',
    badgeOp: 'Office',
    regOfficeName: 'Daikanyama office',
    regOfficeNote: 'This is our registered corporate address. Please use it for official documents, invoices, and postal mail.',
    opOfficeName: 'Shibuya office',
    opOfficeNote: 'This is our base for daily operations and development. We hold meetings at this office.',
    mapCta: 'View on Google Maps →',
    finalTitle: 'Start with a 30-minute demo.',
    finalSub: 'See concrete ways to deploy an AI SDR on your own site. For other inquiries, please use the contact page.',
    finalSecondaryLabel: 'Contact us',
    careersLink: 'See careers →',
    companyInfo: [
      { label: 'Company name', value: 'DynaMeet, Inc. (DynaMeet株式会社)' },
      { label: 'Co-founder & CTO', value: 'Ray Ayan' },
      { label: 'Co-founder & CRO', value: 'Takumi Sawano' },
      { label: 'Founded', value: 'October 3, 2024' },
      { label: 'Business', value: 'Development and operation of the sales AI "Meeton ai"' },
      { label: 'Registered address', value: regAddressEn },
      { label: 'Qualified invoice number', value: 'T9011001165145' },
    ],
    founders: [
      {
        name: 'Ray Ayan',
        titleEn: 'Co-founder & CTO',
        titleJa: 'Co-founder & CTO',
        initial: 'R',
        photo: null,
        line: 'Leads product development of Meeton ai.',
      },
      {
        name: 'Takumi Sawano',
        titleEn: 'Co-founder & CRO',
        titleJa: 'Co-founder & CRO',
        initial: 'T',
        photo: '/team/sawano.png',
        line: 'Experienced meeting conversion firsthand as an enterprise SDR / AE. Leads the business.',
      },
    ],
  },
};

export const aboutOrgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://dynameet.ai/#organization',
  name: 'DynaMeet株式会社',
  legalName: 'DynaMeet株式会社',
  alternateName: ['Meeton ai', 'Meeton AI', 'Meeton', 'ミートン', 'DynaMeet', 'DynaMeet株式会社', 'ダイナミート'],
  url: 'https://dynameet.ai',
  logo: 'https://dynameet.ai/logo-dark.svg',
  foundingDate: '2024-10-03',
  founders: [
    { '@type': 'Person', name: 'Ray Ayan', jobTitle: 'CTO' },
    { '@type': 'Person', name: '澤野 拓実', jobTitle: 'CRO' },
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
  description: 'AI SDR Platform「Meeton ai」の開発・運用を行うB2B SaaSスタートアップ。',
};

export default function AboutContent({ lang = 'ja' }: { lang?: Lang }) {
  const s = ABOUT_STR[lang];
  const mapsQuery = encodeURIComponent('東京都渋谷区猿楽町17-10 代官山アートヴィレッジ2C');
  const contactHref = lang === 'en' ? '/en/contact/' : '/contact/';

  return (
    <>
      <Nav lang={lang} />
      <main>
        {/* Hero (navy) — who we are, in the site's own words */}
        <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 64 }}>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow tone="dark">{s.heroEyebrow}</Eyebrow>
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
              {s.heroH1}
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: 'var(--on-navy-sub)', margin: '20px 0 0', maxWidth: 680 }}>
              {s.heroSub}
            </p>
          </div>
        </Section>

        {/* Mission (white) — v2 narrative + the 3 stages from stages.ts */}
        <Section tone="white">
          <SectionHead eyebrow={s.missionEyebrow} title={s.missionTitle} lede={s.missionLede} />
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
            {s.threeJobsLabel}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {STAGES.map((st) => (
              <Link
                key={st.id}
                href={lang === 'en' ? `/en${st.href}` : st.href}
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
                  <span style={{ fontFamily: 'var(--fm)', fontSize: 15, fontWeight: 700, color: 'var(--cta-ink)' }}>{st.num}</span>
                  <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--heading)' }}>{lang === 'en' ? st.titleEn : st.title}</span>
                </div>
                <div style={{ fontFamily: 'var(--fm)', fontSize: 12, color: 'var(--sub)', marginTop: 8 }}>{lang === 'en' ? st.transformEn : st.transform}</div>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text)', margin: '10px 0 0' }}>{lang === 'en' ? st.ledeEn : st.lede}</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--cta-ink)', marginTop: 14 }}>
                  {st.products.map((p) => PRODUCT_IN_STAGE[p].name).join(lang === 'en' ? ' · ' : '・')} →
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* Founders (surface) */}
        <Section tone="surface">
          <SectionHead eyebrow={s.foundersEyebrow} title={s.foundersTitle} lede={s.foundersLede} />
          <div className="ab2-founders">
            {s.founders.map((f) => (
              <Card key={f.name} style={{ display: 'flex', gap: 20, alignItems: 'center', padding: '26px 28px' }}>
                {f.photo ? (
                  <Image
                    src={f.photo}
                    alt={lang === 'en' ? `${f.name} (${f.titleEn})` : `${f.name}（${f.titleJa}）`}
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
          <SectionHead eyebrow={s.profileEyebrow} title={s.profileTitle} lede={s.profileLede} />

          <div className="ab2-info">
            {s.companyInfo.map((item) => (
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
                <span className="ab2-badge ab2-badge-reg">{s.badgeReg}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--heading)', margin: 0, letterSpacing: '-0.01em' }}>{s.regOfficeName}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.85, color: 'var(--text)', fontWeight: 600, margin: 0 }}>
                {lang === 'en' ? regAddressEn : regAddress}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--sub)', margin: 0 }}>
                {s.regOfficeNote}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ab2-map"
              >
                {s.mapCta}
              </a>
            </Card>

            {/* Operating office */}
            <Card style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 28 }}>
              <div>
                <span className="ab2-badge ab2-badge-op">{s.badgeOp}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--heading)', margin: 0, letterSpacing: '-0.01em' }}>{s.opOfficeName}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.85, color: 'var(--text)', fontWeight: 600, margin: 0 }}>
                {lang === 'en' ? opAddressEn : opAddress}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--sub)', margin: 0 }}>
                {s.opOfficeNote}
              </p>
              <a
                href="https://maps.app.goo.gl/rcynVB51VzSwQpDb8"
                target="_blank"
                rel="noopener noreferrer"
                className="ab2-map"
              >
                {s.mapCta}
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
              {s.finalTitle}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--on-navy-sub)', margin: '0 0 26px' }}>
              {s.finalSub}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CTAButtons source="about-footer" tone="onNavy" size="lg" align="center" lang={lang} secondaryLabel={s.finalSecondaryLabel} secondaryHref={contactHref} />
            </div>
            <p style={{ fontSize: 13, margin: '22px 0 0' }}>
              <Link href="/careers/" className="v2-link" style={{ color: 'var(--on-navy-sub)', textDecoration: 'underline' }}>
                {s.careersLink}
              </Link>
            </p>
          </div>
        </Section>
      </main>
      <Footer lang={lang} />

      {/* JSON-LD for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutOrgSchema) }}
      />
    </>
  );
}
