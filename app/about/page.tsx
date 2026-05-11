import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: '会社概要',
  description: 'DynaMeet株式会社の会社概要。営業支援AI「Meeton ai」を開発・運用しています。',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: '会社概要',
    description: 'DynaMeet株式会社の会社概要。営業支援AI「Meeton ai」を開発・運用しています。',
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

  const founders = [
    {
      name: 'Ray Ayan',
      title: 'Co-founder & CTO',
      titleJa: '共同創業者 兼 CTO',
      initial: 'R',
      color: '#7c5cfc',
      bg: 'linear-gradient(135deg,#7c5cfc 0%,#5b3fd1 100%)',
    },
    {
      name: '澤野 拓実',
      title: 'Co-founder & CRO',
      titleJa: '共同創業者 兼 CRO',
      initial: '澤',
      color: '#12a37d',
      bg: 'linear-gradient(135deg,#12a37d 0%,#0891b2 100%)',
    },
  ]

  const mapsQuery = encodeURIComponent('東京都渋谷区猿楽町17-10 代官山アートヴィレッジ2C')

  return (
    <>
      <Nav />
      <style>{`
        :root{--cta:#12a37d;--cta-dark:#065f46;--cta-light:#eafff7;--cta-glow:rgba(18,163,125,.28);--accent:#7c5cfc;--accent-light:#f3f0ff;--blue:#0891b2;--heading:#0f1128;--text:#1f2340;--sub:#5b6080;--muted:#6e7494;--border:#e8eaf2;--border2:#d0d4e0;--bg:#fff;--surface:#f8fafc;--surface2:#f3f5fa;--fb:'Inter',system-ui,-apple-system,'Hiragino Kaku Gothic ProN','Yu Gothic UI',sans-serif;--fm:'JetBrains Mono','SF Mono',Menlo,monospace}

        .about-main{min-height:100vh;background:#fff;font-family:var(--fb);color:var(--text);padding-top:clamp(70px,12vw,100px)}

        /* HERO */
        .ab-hero{position:relative;overflow:hidden;padding:clamp(48px,8vw,96px) clamp(16px,5vw,48px) clamp(56px,10vw,112px);background:linear-gradient(165deg,#edfcf7 0%,#fff 35%,#f3f0ff 75%,#fff 100%)}
        .ab-hero-inner{max-width:980px;margin:0 auto;position:relative;z-index:2;text-align:center}
        .ab-dot-grid{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(124,92,252,.10) 1px,transparent 1px);background-size:28px 28px;pointer-events:none;mask-image:radial-gradient(ellipse 70% 60% at 50% 40%,#000 30%,transparent 80%);-webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 40%,#000 30%,transparent 80%)}
        .ab-glow{position:absolute;border-radius:50%;filter:blur(110px);pointer-events:none;opacity:.55}
        .ab-glow-1{top:-120px;left:-80px;width:380px;height:380px;background:radial-gradient(circle,rgba(18,163,125,.32),transparent 70%)}
        .ab-glow-2{bottom:-160px;right:-100px;width:420px;height:420px;background:radial-gradient(circle,rgba(124,92,252,.28),transparent 70%)}

        .ab-breadcrumb{display:flex;justify-content:center;gap:8px;font-size:13px;color:var(--muted);margin-bottom:clamp(20px,3vw,28px);font-family:var(--fm);letter-spacing:.02em}
        .ab-breadcrumb a{color:var(--muted);text-decoration:none;transition:color .2s}
        .ab-breadcrumb a:hover{color:var(--cta)}

        .ab-eyebrow{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--cta-light),var(--accent-light));border:1px solid rgba(18,163,125,.18);padding:8px 18px;border-radius:24px;margin-bottom:28px;font-family:var(--fm);font-size:12px;font-weight:700;color:var(--cta);letter-spacing:2.4px;text-transform:uppercase}
        .ab-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:var(--cta);box-shadow:0 0 0 4px rgba(18,163,125,.18)}

        .ab-h1{font-size:clamp(32px,6vw,60px);font-weight:900;color:var(--heading);line-height:1.16;letter-spacing:-.025em;margin:0 0 24px;max-width:820px;margin-left:auto;margin-right:auto}
        .ab-h1 em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .ab-hero-sub{font-size:clamp(15px,2.2vw,19px);line-height:1.85;color:var(--sub);max-width:640px;margin:0 auto;font-weight:500}

        /* SECTIONS */
        .ab-section{padding:clamp(56px,9vw,96px) clamp(16px,5vw,48px);position:relative}
        .ab-section-inner{max-width:1080px;margin:0 auto;position:relative;z-index:2}
        .ab-section-alt{background:linear-gradient(180deg,#fff 0%,var(--surface) 100%)}

        .ab-slabel{font-family:var(--fm);font-size:11px;font-weight:700;color:var(--cta);letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;display:block}
        .ab-stitle{font-size:clamp(26px,4.5vw,40px);font-weight:900;color:var(--heading);line-height:1.22;letter-spacing:-.02em;margin:0 0 16px}
        .ab-ssub{font-size:clamp(15px,2vw,17px);line-height:1.85;color:var(--sub);max-width:620px;margin:0}

        /* MISSION */
        .ab-mission-grid{display:grid;grid-template-columns:5fr 6fr;gap:clamp(28px,5vw,56px);align-items:start;margin-top:clamp(32px,5vw,48px)}
        @media (max-width:820px){.ab-mission-grid{grid-template-columns:1fr;gap:24px}}
        .ab-mission-left{position:sticky;top:120px}
        .ab-mission-statement{font-size:clamp(22px,3.4vw,32px);font-weight:800;color:var(--heading);line-height:1.45;letter-spacing:-.02em;margin:0}
        .ab-mission-statement em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .ab-mission-right{display:flex;flex-direction:column;gap:20px}
        .ab-mission-p{font-size:clamp(15px,1.9vw,16px);line-height:1.95;color:var(--text);margin:0}
        .ab-mission-bullets{list-style:none;padding:0;margin:8px 0 0;display:flex;flex-direction:column;gap:14px}
        .ab-mission-bullet{display:flex;align-items:flex-start;gap:14px;font-size:15px;line-height:1.7;color:var(--text);font-weight:500}
        .ab-mission-bullet-dot{flex-shrink:0;width:22px;height:22px;border-radius:50%;background:var(--cta-light);color:var(--cta);display:flex;align-items:center;justify-content:center;font-family:var(--fm);font-size:11px;font-weight:800;margin-top:1px}

        /* FOUNDERS */
        .ab-founder-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(16px,3vw,24px);margin-top:clamp(32px,5vw,48px)}
        @media (max-width:720px){.ab-founder-grid{grid-template-columns:1fr}}
        .ab-founder-card{background:var(--bg);border:1px solid var(--border);border-radius:18px;padding:clamp(24px,4vw,36px);transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s,border-color .25s;display:flex;flex-direction:column;align-items:flex-start;gap:18px;box-shadow:0 1px 2px rgba(15,17,40,.03)}
        .ab-founder-card:hover{transform:translateY(-4px);box-shadow:0 24px 56px -20px rgba(15,17,40,.16);border-color:var(--border2)}
        .ab-founder-avatar{width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:32px;letter-spacing:-.01em;box-shadow:0 8px 24px rgba(15,17,40,.12);font-family:var(--fb)}
        .ab-founder-name{font-size:clamp(20px,2.6vw,24px);font-weight:800;color:var(--heading);letter-spacing:-.015em;line-height:1.3;margin:0}
        .ab-founder-title-en{font-family:var(--fm);font-size:12px;font-weight:700;color:var(--cta);letter-spacing:1.8px;text-transform:uppercase;margin-top:6px}
        .ab-founder-title-ja{font-size:14px;color:var(--sub);margin-top:4px;font-weight:600}
        .ab-founder-tag{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:100px;background:var(--surface);border:1px solid var(--border);font-size:12px;font-weight:700;color:var(--text);font-family:var(--fm);letter-spacing:.04em;margin-top:6px}

        /* COMPANY INFO TABLE - showpiece */
        .ab-info-card{background:var(--bg);border:1px solid var(--border);border-radius:20px;overflow:hidden;box-shadow:0 1px 2px rgba(15,17,40,.03),0 24px 60px -32px rgba(15,17,40,.10);margin-top:clamp(32px,5vw,48px)}
        .ab-info-row{display:grid;grid-template-columns:240px 1fr;border-bottom:1px solid var(--border);transition:background .2s}
        .ab-info-row:last-child{border-bottom:none}
        .ab-info-row:hover{background:var(--surface)}
        .ab-info-label{padding:clamp(18px,3vw,22px) clamp(20px,3vw,28px);font-family:var(--fm);font-size:11px;font-weight:700;color:var(--muted);letter-spacing:2px;text-transform:uppercase;background:var(--surface);border-right:1px solid var(--border);display:flex;align-items:center}
        .ab-info-value{padding:clamp(18px,3vw,22px) clamp(20px,3vw,28px);font-size:clamp(14px,1.9vw,16px);font-weight:600;color:var(--heading);line-height:1.75;display:flex;align-items:center}
        @media (max-width:680px){
          .ab-info-row{grid-template-columns:1fr}
          .ab-info-label{padding:14px 18px 6px;border-right:none;background:var(--surface);font-size:10px;letter-spacing:1.6px}
          .ab-info-value{padding:6px 18px 16px;font-size:14px}
        }

        /* LOCATION CARD */
        .ab-location-card{display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,3vw,32px);align-items:center;background:linear-gradient(135deg,var(--cta-light) 0%,var(--accent-light) 100%);border:1px solid rgba(18,163,125,.15);border-radius:20px;padding:clamp(28px,4vw,40px);margin-top:clamp(28px,4vw,40px);position:relative;overflow:hidden}
        @media (max-width:720px){.ab-location-card{grid-template-columns:1fr;gap:20px}}
        .ab-location-card::before{content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(124,92,252,.18),transparent 70%);pointer-events:none}
        .ab-location-left{position:relative;z-index:2}
        .ab-location-eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:var(--fm);font-size:11px;font-weight:700;color:var(--cta);letter-spacing:2px;text-transform:uppercase;margin-bottom:14px}
        .ab-location-title{font-size:clamp(20px,2.8vw,24px);font-weight:800;color:var(--heading);margin:0 0 12px;letter-spacing:-.015em;line-height:1.35}
        .ab-location-addr{font-size:clamp(14px,1.9vw,16px);line-height:1.85;color:var(--text);font-weight:600;margin:0}
        .ab-map-link{display:inline-flex;align-items:center;gap:8px;margin-top:18px;font-family:var(--fb);font-size:14px;font-weight:800;color:var(--cta);text-decoration:none;padding:11px 20px;background:var(--bg);border:1px solid rgba(18,163,125,.25);border-radius:100px;transition:all .25s;min-height:44px;box-sizing:border-box}
        .ab-map-link:hover{background:var(--cta);color:#fff;transform:translateY(-1px);box-shadow:0 8px 22px var(--cta-glow);border-color:var(--cta)}
        .ab-map-arrow{transition:transform .25s}
        .ab-map-link:hover .ab-map-arrow{transform:translateX(3px)}
        .ab-location-right{position:relative;z-index:2;display:flex;justify-content:center;align-items:center}
        .ab-map-pin{width:140px;height:140px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 16px 40px -8px rgba(18,163,125,.25),0 2px 6px rgba(15,17,40,.06);position:relative}
        .ab-map-pin svg{width:64px;height:64px}

        /* CTA */
        .ab-cta-section{padding:clamp(64px,10vw,112px) clamp(16px,5vw,48px);text-align:center;position:relative;overflow:hidden;background:linear-gradient(165deg,#edfcf7 0%,#fff 40%,#f3f0ff 80%,#eaf0fe 100%)}
        .ab-cta-inner{max-width:680px;margin:0 auto;position:relative;z-index:2}
        .ab-cta-title{font-size:clamp(26px,4.5vw,42px);font-weight:900;color:var(--heading);line-height:1.22;letter-spacing:-.02em;margin:0 0 18px}
        .ab-cta-title em{font-style:normal;background:linear-gradient(135deg,var(--cta),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .ab-cta-sub{font-size:clamp(15px,2vw,17px);line-height:1.85;color:var(--sub);margin:0 0 36px;font-weight:500}
        .ab-cta-buttons{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
        .ab-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:var(--fb);font-weight:800;border-radius:12px;min-height:52px;padding:14px 30px;font-size:15px;text-decoration:none;cursor:pointer;transition:transform .2s cubic-bezier(.16,1,.3,1),box-shadow .25s,background .2s,border-color .2s;letter-spacing:.01em;border:none;box-sizing:border-box}
        .ab-btn-primary{background:linear-gradient(135deg,var(--cta),#0fc19a);color:#fff;box-shadow:0 4px 16px var(--cta-glow),0 1px 0 rgba(255,255,255,.18) inset}
        .ab-btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px var(--cta-glow),0 1px 0 rgba(255,255,255,.22) inset}
        .ab-btn-ghost{background:var(--bg);color:var(--heading);border:2px solid var(--border2)}
        .ab-btn-ghost:hover{border-color:var(--cta);color:var(--cta);background:var(--cta-light);transform:translateY(-1px)}

        @media (max-width:720px){
          .ab-mission-left{position:static}
          .ab-info-card{border-radius:16px}
        }
      `}</style>

      <main className="about-main">
        {/* HERO */}
        <section className="ab-hero">
          <div className="ab-dot-grid" />
          <div className="ab-glow ab-glow-1" />
          <div className="ab-glow ab-glow-2" />

          <div className="ab-hero-inner">
            <nav aria-label="パンくずリスト" className="ab-breadcrumb">
              <Link href="/">HOME</Link>
              <span aria-hidden="true">/</span>
              <span style={{ color: '#0f1128' }}>ABOUT</span>
            </nav>

            <div className="ab-eyebrow">
              <span className="ab-eyebrow-dot" />
              <span>会社情報 / About DynaMeet</span>
            </div>

            <h1 className="ab-h1">
              営業の<em>ラストワンマイル</em>を、<br />
              AIで解く。
            </h1>

            <p className="ab-hero-sub">
              DynaMeet株式会社は、商談化までのプロセスをAIで自動化する営業支援プラットフォーム「Meeton ai」を開発・運用しています。
            </p>
          </div>
        </section>

        {/* MISSION */}
        <section className="ab-section">
          <div className="ab-section-inner">
            <span className="ab-slabel">Mission</span>
            <h2 className="ab-stitle">私たちのミッション</h2>

            <div className="ab-mission-grid">
              <div className="ab-mission-left">
                <p className="ab-mission-statement">
                  営業現場の<em>属人化と取りこぼし</em>をなくし、すべての見込み顧客に<em>最適な接点</em>を届ける。
                </p>
              </div>

              <div className="ab-mission-right">
                <p className="ab-mission-p">
                  営業組織のボトルネックは、リストでもツールでもなく「接点の作り方」にあります。Meeton aiは、Webサイト・メール・カレンダー・オファーという4つの接点を統合し、生成AIで一人ひとりに最適化したコミュニケーションを自動で実行します。
                </p>
                <p className="ab-mission-p">
                  これにより、これまで人手では追いきれなかった見込み顧客にも、温度感に合わせた最適なタイミングでアプローチできるようになります。
                </p>

                <ul className="ab-mission-bullets">
                  <li className="ab-mission-bullet">
                    <span className="ab-mission-bullet-dot">01</span>
                    <span>AIによる商談化プロセスの完全自動化を実現する</span>
                  </li>
                  <li className="ab-mission-bullet">
                    <span className="ab-mission-bullet-dot">02</span>
                    <span>すべての企業が、エンタープライズ級の営業基盤を持てる世界をつくる</span>
                  </li>
                  <li className="ab-mission-bullet">
                    <span className="ab-mission-bullet-dot">03</span>
                    <span>日本のBtoBセールスを、世界水準のスピードと品質に引き上げる</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FOUNDERS */}
        <section className="ab-section ab-section-alt">
          <div className="ab-section-inner">
            <span className="ab-slabel">Founders</span>
            <h2 className="ab-stitle">共同創業者</h2>
            <p className="ab-ssub">
              プロダクト（CTO）とビジネス（CRO）、両輪の責任者がMeeton aiを開発・運用しています。
            </p>

            <div className="ab-founder-grid">
              {founders.map((f) => (
                <div key={f.name} className="ab-founder-card">
                  <div className="ab-founder-avatar" style={{ background: f.bg }}>
                    {f.initial}
                  </div>
                  <div>
                    <h3 className="ab-founder-name">{f.name}</h3>
                    <div className="ab-founder-title-en">{f.title}</div>
                    <div className="ab-founder-title-ja">{f.titleJa}</div>
                  </div>
                  <span className="ab-founder-tag">共同創業者</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPANY INFO TABLE */}
        <section className="ab-section">
          <div className="ab-section-inner">
            <span className="ab-slabel">Company Profile</span>
            <h2 className="ab-stitle">会社概要</h2>
            <p className="ab-ssub">
              DynaMeet株式会社の登記情報をご案内します。
            </p>

            <div className="ab-info-card">
              {companyInfo.map((item) => (
                <div key={item.label} className="ab-info-row">
                  <div className="ab-info-label">{item.label}</div>
                  <div className="ab-info-value">{item.value}</div>
                </div>
              ))}
            </div>

            {/* LOCATION CARD */}
            <div className="ab-location-card">
              <div className="ab-location-left">
                <div className="ab-location-eyebrow">
                  <span>Headquarters</span>
                </div>
                <h3 className="ab-location-title">代官山オフィス</h3>
                <p className="ab-location-addr">
                  〒150-0033
                  <br />
                  東京都渋谷区猿楽町17-10
                  <br />
                  代官山アートヴィレッジ2C
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ab-map-link"
                >
                  <span>Googleマップで見る</span>
                  <span className="ab-map-arrow" aria-hidden="true">→</span>
                </a>
              </div>
              <div className="ab-location-right">
                <div className="ab-map-pin" aria-hidden="true">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M32 6C22 6 14 14 14 24c0 13 18 34 18 34s18-21 18-34c0-10-8-18-18-18z"
                      fill="url(#pinGrad)"
                    />
                    <circle cx="32" cy="24" r="7" fill="#fff" />
                    <defs>
                      <linearGradient id="pinGrad" x1="14" y1="6" x2="50" y2="58" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#12a37d" />
                        <stop offset="1" stopColor="#7c5cfc" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="ab-cta-section">
          <div className="ab-dot-grid" style={{ opacity: 0.4 }} />
          <div className="ab-glow ab-glow-1" style={{ opacity: 0.4 }} />
          <div className="ab-glow ab-glow-2" style={{ opacity: 0.4 }} />

          <div className="ab-cta-inner">
            <h2 className="ab-cta-title">
              一緒に、<em>営業の未来</em>を作りませんか？
            </h2>
            <p className="ab-cta-sub">
              プロダクトのデモも、キャリアの相談も、まずは気軽にお問い合わせください。
            </p>
            <div className="ab-cta-buttons">
              <Link href="/contact/" className="ab-btn ab-btn-primary">
                デモを予約する
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/careers/" className="ab-btn ab-btn-ghost">
                採用情報を見る
              </Link>
            </div>
          </div>
        </section>
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
