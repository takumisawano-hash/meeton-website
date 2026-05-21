import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: {
    absolute: 'CRM に眠るリードの再商談化｜過去 MQL・失注・休眠リード掘り起こしを AI SDR が自動化 ｜ Meeton ai',
  },
  description: 'CRM に眠る過去 MQL・失注リード・休眠 contact の再検討シグナルを AI が検知し、文脈に沿って再アプローチ。新規 Web リードだけでなく、既存 CRM データから商談機会を掘り起こす AI SDR の仕組みを解説。',
  alternates: { canonical: '/lead-revival/' },
  openGraph: {
    title: 'CRM に眠るリードの再商談化｜AI SDR で休眠リードを商談へ',
    description: '過去 MQL・失注リード・休眠 contact からも商談を生み出す。CRM データと行動シグナルを使った AI SDR の再商談化アプローチ。',
    url: 'https://dynameet.ai/lead-revival/',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: 'https://dynameet.ai/lead-revival/',
  mainEntity: [
    {
      '@type': 'Question',
      name: '休眠リードの掘り起こしとは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CRM 内に登録されている過去の MQL（マーケティングクオリファイドリード）、失注リード、長期間アクションのない contact から、再検討タイミングを捉えて商談機会を再創出することです。Meeton ai では Meeton Email が CRM データと行動シグナルを検知して再アプローチし、Meeton Live + Calendar が商談化を担います。',
      },
    },
    {
      '@type': 'Question',
      name: 'どのような行動シグナルを検知できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'サイト再訪、料金ページ閲覧、比較ページ閲覧、過去メールの再開封、ウェビナー再エントリー、競合キーワード検索、SNS エンゲージメントなど、再検討意思を示す複数のシグナルを CRM データと組み合わせて検知します。',
      },
    },
    {
      '@type': 'Question',
      name: 'MA ツールのナーチャリングと何が違いますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MA ツールのナーチャリングは事前定義したシナリオでメールを配信します。Meeton ai は CRM 上のリード個別の文脈・最新行動・過去履歴を AI が動的判断し、1:1 で再アプローチします。MA はマーケファネル全体、Meeton ai は個別リードの再商談化、と役割分担できます。',
      },
    },
    {
      '@type': 'Question',
      name: '過去 MQL・失注リードからどれくらい商談化できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '導入企業の状況により変動しますが、休眠リード数 × 検討再開率 × 接触成功率 × 商談化率の積で算出可能です。デモの場で自社 CRM データに基づく試算を提供できます。',
      },
    },
  ],
}

export default function LeadRevivalPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://dynameet.ai/' },
    { name: 'CRM に眠るリードの再商談化', url: 'https://dynameet.ai/lead-revival/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((b, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: b.name,
              item: b.url,
            })),
          }),
        }}
      />
      <Nav />
      <main>
        {/* HERO */}
        <section className="lr-hero">
          <div className="lr-hero-inner">
            <div className="lr-eyebrow">CRM-to-Meeting</div>
            <h1>
              CRM に眠るリードを、<span className="accent">AI SDR が商談へ変える。</span>
            </h1>
            <p className="hero-sub">
              過去 MQL・失注リード・休眠 contact は、再検討の瞬間が来ても見逃される。Meeton ai は CRM データと行動シグナルから再検討タイミングを検知し、AI が文脈に沿って再アプローチ。既存 CRM 資産から新しい商談機会を生み出します。
            </p>
            <div className="hero-ctas">
              <Link href="/" className="btn-primary">
                Meeton ai のデモを予約 →
              </Link>
              <a href="#how" className="btn-secondary">
                仕組みを見る
              </a>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="section section-light">
          <div className="section-inner">
            <div className="section-label">01 — Problem</div>
            <h2>CRM に眠るリードは、企業最大の未活用資産</h2>
            <p className="body">
              多くの B2B 企業は、新規リード獲得に予算を集中させています。しかし、CRM の中には過去に獲得した MQL・失注リード・長期間アクションのない contact が、新規リードの何倍も蓄積されています。彼らの再検討タイミングが来ても、人手で追えないため見逃されているのが現実です。
            </p>
            <div className="stat-strip">
              <div className="stat-item">
                <div className="stat-num">5–10<span className="stat-unit">倍</span></div>
                <div className="stat-label">新規 vs CRM 蓄積リード数</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">放置</div>
                <div className="stat-label">再検討シグナル発火時の対応</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">未活用</div>
                <div className="stat-label">休眠 MQL からの商談機会</div>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNAL / CONTEXT / PERSISTENCE */}
        <section className="section section-dark">
          <div className="section-inner">
            <div className="section-label section-label-dark">02 — Approach</div>
            <h2 className="dark">休眠リード掘り起こしの 3 要素</h2>
            <p className="body-dark">
              再検討タイミングを捉えるには、Signal（シグナル検知）・Context（文脈理解）・Persistence（継続）の 3 要素が必要です。Meeton ai はこの 3 つを AI で自動化します。
            </p>
            <div className="approach-grid">
              <div className="approach-card">
                <div className="approach-num">Signal</div>
                <div className="approach-title">シグナル検知</div>
                <p className="approach-desc">
                  サイト再訪、料金ページ閲覧、比較ページ閲覧、過去メール再開封、ウェビナー再エントリーなど、再検討意思を示す複数シグナルを Meeton Email が捉え、文脈に沿って再アプローチします。
                </p>
              </div>
              <div className="approach-card">
                <div className="approach-num">Context</div>
                <div className="approach-title">文脈理解</div>
                <p className="approach-desc">
                  過去の閲覧履歴・DL 資料・営業メモ・失注理由・最後の接触日まで、CRM 上の全文脈を踏まえて、最適なアプローチ内容を AI が動的判断します。
                </p>
              </div>
              <div className="approach-card">
                <div className="approach-num">Persistence</div>
                <div className="approach-title">継続</div>
                <p className="approach-desc">
                  1 回のメールで終わらず、反応がなければタイミングを変えて再接触。再訪・返信があれば Meeton Live が会話を再開し、商談予約まで進めます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="section section-light">
          <div className="section-inner">
            <div className="section-label">03 — How it works</div>
            <h2>CRM-to-Meeting Loop</h2>
            <p className="body">
              CRM に眠るリードから商談を生み出す 5 ステップ。
            </p>
            <div className="how-flow">
              <div className="how-step">
                <div className="how-step-num">01</div>
                <div className="how-step-body">
                  <div className="how-step-title">既存リード</div>
                  <p className="how-step-desc">CRM 上の過去 MQL・失注リード・休眠 contact が対象。新規取得は不要。</p>
                </div>
              </div>
              <div className="how-arrow" aria-hidden>→</div>
              <div className="how-step">
                <div className="how-step-num">02</div>
                <div className="how-step-body">
                  <div className="how-step-title">シグナル検知</div>
                  <p className="how-step-desc">Meeton Email が複数の再検討シグナルを継続監視。</p>
                </div>
              </div>
              <div className="how-arrow" aria-hidden>→</div>
              <div className="how-step">
                <div className="how-step-num">03</div>
                <div className="how-step-body">
                  <div className="how-step-title">AI 再アプローチ</div>
                  <p className="how-step-desc">Meeton Email が文脈に沿った 1:1 メールで再接触。AI が動的に内容・タイミングを決定。</p>
                </div>
              </div>
              <div className="how-arrow" aria-hidden>→</div>
              <div className="how-step">
                <div className="how-step-num">04</div>
                <div className="how-step-body">
                  <div className="how-step-title">再訪・返信</div>
                  <p className="how-step-desc">サイト再訪・メール返信があれば Meeton Live が会話を再開。</p>
                </div>
              </div>
              <div className="how-arrow" aria-hidden>→</div>
              <div className="how-step">
                <div className="how-step-num">05</div>
                <div className="how-step-body">
                  <div className="how-step-title">商談化</div>
                  <p className="how-step-desc">Meeton Calendar が商談予約まで進め、CRM に自動登録。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="section section-light alt">
          <div className="section-inner">
            <div className="section-label">04 — Use cases</div>
            <h2>CRM-to-Meeting の活用パターン</h2>
            <div className="usecase-grid">
              <div className="usecase-card">
                <div className="usecase-tag">過去 MQL</div>
                <div className="usecase-title">過去 MQL の再活性化</div>
                <p className="usecase-desc">
                  資料 DL ・ウェビナー参加・無料相談など過去に獲得した MQL が、再び興味を示した瞬間に AI が再接触。担当営業の手間ゼロで再商談化。
                </p>
              </div>
              <div className="usecase-card">
                <div className="usecase-tag">失注リード</div>
                <div className="usecase-title">失注リードの再アプローチ</div>
                <p className="usecase-desc">
                  半年〜1 年前に失注したリードが料金ページや比較ページに戻ってきた瞬間を検知。失注理由を踏まえた文面で再接触し、再検討商談へ。
                </p>
              </div>
              <div className="usecase-card">
                <div className="usecase-tag">休眠 contact</div>
                <div className="usecase-title">休眠 contact の覚醒</div>
                <p className="usecase-desc">
                  数ヶ月以上アクションのない CRM 上の contact から、新製品ニュース閲覧・市場変化に伴う再訪などのシグナルを検知し、再エンゲージ。
                </p>
              </div>
              <div className="usecase-card">
                <div className="usecase-tag">ウェビナー後</div>
                <div className="usecase-title">ウェビナー参加後フォロー</div>
                <p className="usecase-desc">
                  過去ウェビナー参加者を対象に、関連コンテンツ閲覧・関心領域の変化を検知し、文脈に合わせた個別フォローで商談化。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="section section-dark">
          <div className="section-inner">
            <div className="section-label section-label-dark">05 — Capabilities</div>
            <h2 className="dark">CRM-to-Meeting を支える Meeton ai の機能</h2>
            <div className="cap-grid">
              <div className="cap-card">
                <div className="cap-feat">Meeton Email</div>
                <div className="cap-desc">CRM データと行動シグナルから再検討タイミングを検知し、過去 MQL・失注・休眠 contact へ 1:1 で再アプローチ。AI が文脈・タイミング・内容を動的決定。</div>
              </div>
              <div className="cap-card">
                <div className="cap-feat">Meeton Live</div>
                <div className="cap-desc">再訪したリードに過去全文脈を引き継いで対話を再開。検討状況に応じて会話。</div>
              </div>
              <div className="cap-card">
                <div className="cap-feat">Meeton Calendar</div>
                <div className="cap-desc">商談予約まで導き、CRM へ自動登録。営業の手間ゼロで再商談化完了。</div>
              </div>
            </div>
            <div className="cta-block center">
              <Link href="/" className="btn-primary-on-dark">
                Meeton ai のデモを予約 →
              </Link>
            </div>
          </div>
        </section>

        {/* CROSS LINK */}
        <section className="section section-light">
          <div className="section-inner narrow">
            <h2>Meeton ai は、Web と CRM の両方から商談を生み出す</h2>
            <p className="body">
              CRM に眠るリードからの再商談化は、Meeton ai が持つ 2 つの商談機会創出ループのうちの 1 つです。もう 1 つは Web サイト訪問者からの商談化。両方を 1 つの Platform でカバーします。
            </p>
            <div className="cross-link-cards">
              <Link href="/ai-sdr/" className="cross-card">
                <div className="cross-card-label">Website-to-Meeting</div>
                <div className="cross-card-title">AI SDR とは →</div>
                <p className="cross-card-desc">Web サイト訪問者を AI SDR が商談化する仕組み。</p>
              </Link>
              <Link href="/" className="cross-card">
                <div className="cross-card-label">Platform 全体</div>
                <div className="cross-card-title">Meeton ai トップ →</div>
                <p className="cross-card-desc">Web と CRM の両ループを含む AI SDR Platform。</p>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section section-light alt">
          <div className="section-inner narrow">
            <div className="section-label">FAQ</div>
            <h2>よくある質問</h2>
            <div className="faq-list">
              {faqSchema.mainEntity.map((q, i) => (
                <div className="faq-item" key={i}>
                  <h3 className="faq-q">{q.name}</h3>
                  <p className="faq-a">{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section section-dark final">
          <div className="section-inner narrow">
            <h2 className="dark center">
              自社 CRM に眠る商談機会を、<span className="accent">30 分で可視化しませんか？</span>
            </h2>
            <p className="body-dark center">
              CRM データから再商談化できるリード規模を、デモの場で試算します。
            </p>
            <div className="cta-block center">
              <Link href="/" className="btn-primary-on-dark">
                Meeton ai のデモを予約 →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style dangerouslySetInnerHTML={{ __html: `
.lr-hero{background:#050807;color:#fff;padding:130px 24px 96px;text-align:center;border-bottom:1px solid #0d1411}
.lr-hero-inner{max-width:880px;margin:0 auto}
.lr-eyebrow{font-family:var(--fm);font-size:12px;font-weight:800;letter-spacing:.18em;color:#04cb78;text-transform:uppercase;margin-bottom:24px}
.lr-hero h1{font-size:clamp(32px,5.5vw,52px);font-weight:900;line-height:1.25;letter-spacing:-.025em;color:#fff;margin:0 0 24px;text-wrap:balance}
.lr-hero h1 .accent{color:#04cb78}
.lr-hero .hero-sub{font-size:clamp(15px,2vw,18px);line-height:1.85;color:rgba(255,255,255,.72);max-width:680px;margin:0 auto 36px;text-wrap:pretty}
.lr-hero .hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}

.btn-primary{display:inline-flex;align-items:center;justify-content:center;background:#04cb78;color:#fff;padding:16px 32px;border-radius:10px;font-weight:800;font-size:15px;text-decoration:none;box-shadow:0 4px 18px rgba(4,203,120,.32);transition:transform .2s,box-shadow .25s}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(4,203,120,.4)}
.btn-secondary{display:inline-flex;align-items:center;justify-content:center;background:transparent;color:rgba(255,255,255,.9);padding:16px 32px;border:1px solid rgba(255,255,255,.2);border-radius:10px;font-weight:700;font-size:15px;text-decoration:none}
.btn-secondary:hover{background:rgba(255,255,255,.05);border-color:rgba(4,203,120,.45)}
.btn-primary-on-dark{display:inline-flex;align-items:center;justify-content:center;background:#04cb78;color:#fff;padding:16px 32px;border-radius:10px;font-weight:800;font-size:15px;text-decoration:none;box-shadow:0 4px 18px rgba(4,203,120,.32);transition:transform .2s}
.btn-primary-on-dark:hover{transform:translateY(-2px)}

.section{padding:clamp(64px,8vw,96px) clamp(16px,5vw,48px)}
.section-inner{max-width:980px;margin:0 auto}
.section-inner.narrow{max-width:720px}
.section-light{background:#fff}
.section-light.alt{background:#F7FAF8}
.section-dark{background:#050807;color:#fff;border-top:1px solid #0d1411;border-bottom:1px solid #0d1411}

.section-label{font-family:var(--fm);font-size:11px;font-weight:800;letter-spacing:.2em;color:#04cb78;text-transform:uppercase;margin-bottom:18px}
.section-label-dark{color:#04cb78}
.section h2{font-size:clamp(26px,4vw,40px);font-weight:900;line-height:1.3;letter-spacing:-.02em;color:#0B1712;margin:0 0 24px;text-wrap:balance}
.section h2.dark{color:#fff}
.section h2.center{text-align:center}
.section .body{font-size:clamp(15px,1.6vw,17px);line-height:1.9;color:#4B5A52;margin:0 0 20px;max-width:760px}
.section .body-dark{font-size:clamp(15px,1.6vw,17px);line-height:1.9;color:rgba(255,255,255,.72);margin:0 0 24px;max-width:760px}
.section .body-dark.center{text-align:center;margin:0 auto 32px}
.accent{color:#04cb78}

.stat-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px;padding-top:24px;border-top:1px solid #E5EEE8}
@media (max-width:680px){.stat-strip{grid-template-columns:1fr}}
.stat-item{text-align:left}
.stat-num{font-family:var(--fm);font-size:clamp(28px,3.5vw,38px);font-weight:900;color:#0B1712;letter-spacing:-.02em;line-height:1;margin-bottom:8px}
.stat-unit{font-size:.55em;color:#04cb78;margin-left:2px;font-weight:700}
.stat-label{font-size:13px;color:#6C7B73;font-weight:600}

.approach-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
@media (max-width:780px){.approach-grid{grid-template-columns:1fr}}
.approach-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.10);border-radius:14px;padding:28px 24px}
.approach-num{font-family:var(--fm);font-size:11px;font-weight:800;color:#04cb78;letter-spacing:.18em;margin-bottom:14px;text-transform:uppercase}
.approach-title{font-size:20px;font-weight:800;color:#fff;margin-bottom:14px;letter-spacing:-.01em}
.approach-desc{font-size:13.5px;line-height:1.85;color:rgba(255,255,255,.65)}

.how-flow{display:flex;align-items:stretch;gap:8px;margin-top:36px;flex-wrap:wrap}
.how-step{flex:1;min-width:160px;background:#fff;border:1px solid #E5EEE8;border-radius:12px;padding:20px 18px;display:flex;flex-direction:column;gap:10px}
.how-step-num{font-family:var(--fm);font-size:11px;font-weight:800;color:#04cb78;letter-spacing:.16em}
.how-step-title{font-size:15px;font-weight:800;color:#0B1712;letter-spacing:-.005em}
.how-step-desc{font-size:13px;color:#4B5A52;line-height:1.7;margin:0}
.how-arrow{display:flex;align-items:center;color:#9CA3AF;font-size:18px;font-weight:600}
@media (max-width:780px){.how-arrow{transform:rotate(90deg);width:100%;justify-content:center}}

.usecase-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:36px}
@media (max-width:780px){.usecase-grid{grid-template-columns:1fr}}
.usecase-card{background:#fff;border:1px solid #E5EEE8;border-radius:14px;padding:28px 24px;transition:transform .18s,border-color .18s}
.usecase-card:hover{transform:translateY(-3px);border-color:rgba(4,203,120,.35)}
.usecase-tag{display:inline-block;font-family:var(--fm);font-size:10px;font-weight:800;letter-spacing:.16em;color:#04cb78;background:#E8FBF1;padding:4px 10px;border-radius:999px;margin-bottom:12px;text-transform:uppercase}
.usecase-title{font-size:17px;font-weight:800;color:#0B1712;margin-bottom:12px;letter-spacing:-.005em}
.usecase-desc{font-size:13.5px;color:#4B5A52;line-height:1.85;margin:0}

.cap-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:36px}
@media (max-width:780px){.cap-grid{grid-template-columns:1fr}}
.cap-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.10);border-radius:12px;padding:22px 22px}
.cap-feat{font-family:var(--fm);font-size:13px;font-weight:800;color:#04cb78;letter-spacing:.04em;margin-bottom:10px}
.cap-desc{font-size:14px;line-height:1.75;color:rgba(255,255,255,.7)}

.cross-link-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:32px}
@media (max-width:680px){.cross-link-cards{grid-template-columns:1fr}}
.cross-card{display:block;padding:24px 24px;background:#fff;border:1px solid #E5EEE8;border-radius:12px;text-decoration:none;color:inherit;transition:transform .18s,border-color .18s}
.cross-card:hover{transform:translateY(-2px);border-color:rgba(4,203,120,.35)}
.cross-card-label{font-family:var(--fm);font-size:10px;font-weight:800;letter-spacing:.16em;color:#6C7B73;text-transform:uppercase;margin-bottom:8px}
.cross-card-title{font-size:16px;font-weight:800;color:#0B1712;margin-bottom:8px}
.cross-card-desc{font-size:13px;color:#4B5A52;line-height:1.7;margin:0}

.cta-block{margin-top:40px}
.cta-block.center{text-align:center}

.faq-list{display:flex;flex-direction:column;gap:18px;margin-top:32px}
.faq-item{padding:24px 28px;background:#fff;border:1px solid #E5EEE8;border-radius:12px}
.faq-q{font-size:16px;font-weight:800;color:#0B1712;margin:0 0 12px;letter-spacing:-.005em}
.faq-a{font-size:14.5px;line-height:1.85;color:#4B5A52;margin:0}

.section-dark.final{padding:80px 24px 100px}
      ` }} />
    </>
  )
}
