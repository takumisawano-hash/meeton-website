import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: {
    absolute: 'Meeton Intent｜訪問企業 ID + 行動シグナル + CRM データから次のアクションを判断する AI ｜ Meeton ai',
  },
  description: 'Meeton Intent は、Web 訪問者の企業情報・行動シグナル・CRM 履歴を統合判断し、AI SDR が次に取るべきアクションを決定する判断レイヤー。Live・Calendar・Email・Library を文脈で連動させ、Web と CRM の両方から商談機会を生み出します。',
  alternates: { canonical: '/features/ai-intent/' },
  openGraph: {
    title: 'Meeton Intent｜訪問企業 ID + 行動シグナル + CRM データの判断 AI',
    description: 'Web 行動・企業情報・CRM データを統合判断し、AI SDR が次のアクションを決定。Web と CRM の両方から商談機会を生み出す Meeton ai の判断レイヤー。',
    url: 'https://dynameet.ai/features/ai-intent/',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: 'https://dynameet.ai/features/ai-intent/',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Meeton Intent は何をするツールですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Meeton Intent は、Web 訪問者の企業情報・行動シグナル・CRM 履歴を統合判断する AI 判断レイヤーです。Live・Calendar・Email・Library の各機能に「いつ・誰に・何を・どのように」を指示します。',
      },
    },
    {
      '@type': 'Question',
      name: 'どのようなシグナルを検知できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'サイト訪問・再訪、料金ページ閲覧、比較ページ閲覧、資料 DL、メール開封・クリック、ウェビナー参加、競合キーワード検索、SNS エンゲージメントなど、Web 上の行動データと CRM 上の履歴・スコア・最終接触日を統合してインテントスコアを算出します。',
      },
    },
    {
      '@type': 'Question',
      name: '訪問企業 ID はどのように識別しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IP リバースルックアップ・ファーストパーティ Cookie・CRM ログイン履歴・フォーム送信履歴を組み合わせて、訪問者の所属企業を識別します。識別率は業種・規模により異なりますが、B2B サイトでは 30–60% 程度が一般的です。',
      },
    },
    {
      '@type': 'Question',
      name: '他社の Intent ツール（6sense / Bombora 等）と何が違いますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '汎用 Intent ツールはシグナル検知とスコアリングまでが提供範囲ですが、Meeton Intent はその先のアクション実行まで Meeton Live / Email / Calendar / Library に直接指示します。「検知 → 判断 → 実行」を 1 つの Platform で完結できる点が違いです。',
      },
    },
  ],
}

export default function AiIntentPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://dynameet.ai/' },
    { name: '機能', url: 'https://dynameet.ai/features/' },
    { name: 'Meeton Intent', url: 'https://dynameet.ai/features/ai-intent/' },
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
        <section className="in-hero">
          <div className="in-hero-inner">
            <div className="in-eyebrow">Meeton Intent</div>
            <h1>
              訪問企業 ID + 行動シグナル + CRM データから、<span className="accent">次のアクションを判断する AI</span>
            </h1>
            <p className="hero-sub">
              Meeton Intent は、Web 訪問者の企業情報・行動シグナル・CRM 履歴を統合判断し、AI SDR が次に取るべきアクションを決定する判断レイヤー。Live・Calendar・Email・Library を文脈で連動させ、Web と CRM の両方から商談機会を生み出します。
            </p>
            <div className="hero-ctas">
              <Link href="/" className="btn-primary">
                Meeton ai のデモを予約 →
              </Link>
              <a href="#how" className="btn-secondary">
                判断ロジックを見る
              </a>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="section section-light">
          <div className="section-inner">
            <div className="section-label">01 — Problem</div>
            <h2>シグナル検知だけでは、商談は増えない</h2>
            <p className="body">
              Intent ツール・MA・CRM・GA4・SNS。シグナルを取るためのツールは増えました。それでも商談化に至らないのは、検知したシグナルを「次のアクション」に変換する判断と実行がボトルネックだからです。
            </p>
            <p className="body">
              人手では追えない量のシグナルが毎日発生し、最適なタイミングと内容を考えて動くには工数も限界がある。検知が活きるのは、その先の判断と実行が自動化されている時だけです。
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="section section-dark">
          <div className="section-inner">
            <div className="section-label section-label-dark">02 — How it works</div>
            <h2 className="dark">3 つのインプット、1 つの判断、4 つの実行</h2>
            <div className="logic-flow">
              <div className="logic-col logic-inputs">
                <div className="logic-label">Inputs</div>
                <div className="logic-item">Web 訪問者の行動データ</div>
                <div className="logic-item">企業情報 (業種・規模・テクノグラフィー)</div>
                <div className="logic-item">CRM 履歴 (過去 MQL・失注・最終接触)</div>
              </div>
              <div className="logic-arrow" aria-hidden>→</div>
              <div className="logic-col logic-judge">
                <div className="logic-label">Judge</div>
                <div className="logic-judge-box">
                  Meeton Intent<br />
                  <span className="logic-judge-sub">統合判断 AI</span>
                </div>
              </div>
              <div className="logic-arrow" aria-hidden>→</div>
              <div className="logic-col logic-outputs">
                <div className="logic-label">Actions</div>
                <div className="logic-item">Live: 会話を開始 / 文脈で再開</div>
                <div className="logic-item">Calendar: 商談予約を提示</div>
                <div className="logic-item">Email: 個別文面で再アプローチ</div>
                <div className="logic-item">Library: 最適な資料を推薦</div>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNALS DETECTED */}
        <section className="section section-light">
          <div className="section-inner">
            <div className="section-label">03 — Signals</div>
            <h2>Meeton Intent が検知するシグナル</h2>
            <p className="body">
              Web 上の行動データと CRM 上の履歴を統合してインテントスコアを算出します。
            </p>
            <div className="signals-grid">
              <div className="signals-col">
                <div className="signals-col-label">Web 行動</div>
                <ul className="signals-list">
                  <li>サイト初回訪問 / 再訪</li>
                  <li>料金ページ閲覧</li>
                  <li>比較ページ閲覧</li>
                  <li>資料 DL</li>
                  <li>メール開封・クリック</li>
                  <li>ウェビナー参加</li>
                </ul>
              </div>
              <div className="signals-col">
                <div className="signals-col-label">企業情報</div>
                <ul className="signals-list">
                  <li>業種 / 規模 / 売上</li>
                  <li>利用テクノロジー (techno­graphics)</li>
                  <li>採用ポジション情報</li>
                  <li>競合導入状況</li>
                </ul>
              </div>
              <div className="signals-col">
                <div className="signals-col-label">CRM データ</div>
                <ul className="signals-list">
                  <li>過去 MQL / 失注履歴</li>
                  <li>最終接触日</li>
                  <li>過去会話・営業メモ</li>
                  <li>関心領域・利用ツール</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="section section-light alt">
          <div className="section-inner">
            <div className="section-label">04 — Use cases</div>
            <h2>Meeton Intent の活用パターン</h2>
            <div className="usecase-grid">
              <div className="usecase-card">
                <div className="usecase-title">新規訪問者の優先度判定</div>
                <p className="usecase-desc">企業情報と訪問行動から ICP 適合度を判定し、AI SDR Live が話しかける優先度を決定。</p>
              </div>
              <div className="usecase-card">
                <div className="usecase-title">CRM 休眠リードの再検討検知</div>
                <p className="usecase-desc">過去 MQL の Web 再訪・料金ページ閲覧などをリアルタイム検知し、Email で再アプローチを起動。</p>
              </div>
              <div className="usecase-card">
                <div className="usecase-title">失注リードの再活性化</div>
                <p className="usecase-desc">失注後の競合キーワード検索・新製品ページ閲覧をシグナルに、失注理由を踏まえた再接触を起動。</p>
              </div>
              <div className="usecase-card">
                <div className="usecase-title">既存顧客の追加商談機会</div>
                <p className="usecase-desc">既存顧客の新機能ページ閲覧・別部門の訪問を検知し、Upsell / Cross-sell 商談を提案。</p>
              </div>
            </div>
          </div>
        </section>

        {/* CROSS LINKS */}
        <section className="section section-light">
          <div className="section-inner narrow">
            <h2>Meeton Intent は、他の Meeton 機能と連動して動く</h2>
            <p className="body">
              Meeton Intent は判断レイヤー。実際のアクションは Live・Calendar・Email・Library が実行します。
            </p>
            <div className="cross-link-cards">
              <Link href="/features/ai-chat/" className="cross-card">
                <div className="cross-card-label">対話実行</div>
                <div className="cross-card-title">Meeton Live →</div>
                <p className="cross-card-desc">Intent の判断に基づいて、適切なタイミングで会話を開始。</p>
              </Link>
              <Link href="/features/meetings/" className="cross-card">
                <div className="cross-card-label">商談予約</div>
                <div className="cross-card-title">Meeton Calendar →</div>
                <p className="cross-card-desc">温度の高い瞬間に商談予約を提示。</p>
              </Link>
              <Link href="/features/ai-email/" className="cross-card">
                <div className="cross-card-label">追客 + 再商談化</div>
                <div className="cross-card-title">Meeton Email →</div>
                <p className="cross-card-desc">未予約リード追客 + CRM 休眠リードの再アプローチ。</p>
              </Link>
              <Link href="/features/ai-library/" className="cross-card">
                <div className="cross-card-label">資料提案</div>
                <div className="cross-card-title">Meeton Library →</div>
                <p className="cross-card-desc">会話文脈と CRM 履歴から最適な資料を自動選定。</p>
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
              シグナルだけでなく、<span className="accent">アクションまで自動化しませんか？</span>
            </h2>
            <p className="body-dark center">
              Meeton Intent + Live + Calendar + Email + Library で、検知から商談化までを一気通貫で実行します。
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
.in-hero{background:#050807;color:#fff;padding:130px 24px 96px;text-align:center;border-bottom:1px solid #0d1411}
.in-hero-inner{max-width:880px;margin:0 auto}
.in-eyebrow{font-family:var(--fm);font-size:12px;font-weight:800;letter-spacing:.18em;color:#04cb78;text-transform:uppercase;margin-bottom:24px}
.in-hero h1{font-size:clamp(28px,4.8vw,46px);font-weight:900;line-height:1.3;letter-spacing:-.02em;color:#fff;margin:0 0 24px;text-wrap:balance}
.in-hero h1 .accent{color:#04cb78}
.in-hero .hero-sub{font-size:clamp(15px,2vw,18px);line-height:1.85;color:rgba(255,255,255,.72);max-width:720px;margin:0 auto 36px;text-wrap:pretty}
.in-hero .hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}

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
.section h2{font-size:clamp(24px,3.8vw,38px);font-weight:900;line-height:1.3;letter-spacing:-.02em;color:#0B1712;margin:0 0 24px;text-wrap:balance}
.section h2.dark{color:#fff}
.section h2.center{text-align:center}
.section .body{font-size:clamp(15px,1.6vw,17px);line-height:1.9;color:#4B5A52;margin:0 0 20px;max-width:760px}
.section .body-dark{font-size:clamp(15px,1.6vw,17px);line-height:1.9;color:rgba(255,255,255,.72);margin:0 0 24px;max-width:760px}
.section .body-dark.center{text-align:center;margin:0 auto 32px}
.accent{color:#04cb78}

.logic-flow{display:flex;align-items:stretch;gap:14px;margin-top:36px;flex-wrap:wrap}
.logic-col{flex:1;min-width:200px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.10);border-radius:12px;padding:22px 20px;display:flex;flex-direction:column;gap:10px}
.logic-judge{background:rgba(4,203,120,.08);border-color:rgba(4,203,120,.3)}
.logic-label{font-family:var(--fm);font-size:10px;font-weight:800;letter-spacing:.2em;color:#04cb78;text-transform:uppercase;margin-bottom:6px}
.logic-item{font-size:13.5px;color:rgba(255,255,255,.7);line-height:1.6;padding-left:14px;position:relative}
.logic-item::before{content:"●";position:absolute;left:0;top:5px;color:#04cb78;font-size:7px}
.logic-judge-box{font-size:17px;font-weight:800;color:#fff;text-align:center;padding:14px 12px;background:rgba(4,203,120,.06);border:1px solid rgba(4,203,120,.4);border-radius:10px}
.logic-judge-sub{font-size:11px;font-weight:600;color:rgba(255,255,255,.6);font-family:var(--fm);letter-spacing:.1em}
.logic-arrow{display:flex;align-items:center;color:rgba(255,255,255,.4);font-size:18px;font-weight:600}
@media (max-width:880px){.logic-arrow{transform:rotate(90deg);width:100%;justify-content:center}}

.signals-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
@media (max-width:780px){.signals-grid{grid-template-columns:1fr}}
.signals-col{background:#fff;border:1px solid #E5EEE8;border-radius:12px;padding:24px 22px}
.signals-col-label{font-family:var(--fm);font-size:11px;font-weight:800;letter-spacing:.16em;color:#04cb78;text-transform:uppercase;margin-bottom:14px}
.signals-list{list-style:none;padding:0;margin:0}
.signals-list li{padding:8px 0 8px 18px;font-size:14px;color:#0B1712;border-bottom:1px solid #F0F4F1;position:relative;font-weight:600}
.signals-list li:last-child{border-bottom:none}
.signals-list li::before{content:"●";position:absolute;left:0;top:9px;color:#04cb78;font-size:8px}

.usecase-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:36px}
@media (max-width:780px){.usecase-grid{grid-template-columns:1fr}}
.usecase-card{background:#fff;border:1px solid #E5EEE8;border-radius:14px;padding:24px 22px;transition:transform .18s,border-color .18s}
.usecase-card:hover{transform:translateY(-2px);border-color:rgba(4,203,120,.35)}
.usecase-title{font-size:16px;font-weight:800;color:#0B1712;margin-bottom:12px;letter-spacing:-.005em}
.usecase-desc{font-size:13.5px;color:#4B5A52;line-height:1.85;margin:0}

.cross-link-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:32px}
@media (max-width:680px){.cross-link-cards{grid-template-columns:1fr}}
.cross-card{display:block;padding:22px 22px;background:#fff;border:1px solid #E5EEE8;border-radius:12px;text-decoration:none;color:inherit;transition:transform .18s,border-color .18s}
.cross-card:hover{transform:translateY(-2px);border-color:rgba(4,203,120,.35)}
.cross-card-label{font-family:var(--fm);font-size:10px;font-weight:800;letter-spacing:.16em;color:#6C7B73;text-transform:uppercase;margin-bottom:8px}
.cross-card-title{font-size:15px;font-weight:800;color:#0B1712;margin-bottom:8px}
.cross-card-desc{font-size:12.5px;color:#4B5A52;line-height:1.7;margin:0}

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
