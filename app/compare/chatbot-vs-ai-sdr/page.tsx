import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: {
    absolute: 'AI チャットボット vs AI SDR｜FAQ 応答と商談機会創出の違い ｜ Meeton ai',
  },
  description: 'AI チャットボットと AI SDR の本質的な違いを能力軸で解説。FAQ 応答の自動化に特化した chatbot と、訪問者を商談機会まで運ぶ AI SDR。両者の役割と能力差を表で整理。',
  alternates: { canonical: '/compare/chatbot-vs-ai-sdr/' },
  openGraph: {
    title: 'AI チャットボット vs AI SDR｜FAQ 応答と商談機会創出の違い',
    description: '匿名訪問者全員に FAQ 応答する chatbot と、識別済みリードを商談に押し上げる AI SDR。役割と能力の構造的な違いを解説。',
    url: 'https://dynameet.ai/compare/chatbot-vs-ai-sdr/',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: 'https://dynameet.ai/compare/chatbot-vs-ai-sdr/',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'AI チャットボットと AI SDR はどう違いますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'チャットボットは匿名訪問者の FAQ 応答が中心です。AI SDR は識別済みリード（特に再訪リードや CV 後リード）を対象に、課題ヒアリング・資料提案・商談予約・追客まで実行します。「質問に答える」のと「商談機会を作る」の違いです。',
      },
    },
    {
      '@type': 'Question',
      name: 'AI チャットボットでは商談は作れないのですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '一部は作れますが、商談機会創出が主目的ではないため、設計上の限界があります。FAQ 応答型のシナリオでは、訪問者の課題深掘りや CRM 文脈を踏まえた個別提案、商談予約までの誘導が弱くなりがちです。',
      },
    },
    {
      '@type': 'Question',
      name: 'AI SDR と AI チャットボットは併用すべきですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、役割が異なるため併用は有効です。FAQ 応答型 chatbot で「すぐ答えが欲しい訪問者」をカバーし、AI SDR で「商談に変えるべき識別済みリード」を担当する分担が現実的です。Meeton ai は AI SDR 役割に特化しています。',
      },
    },
  ],
}

export default function CompareChatbotPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://dynameet.ai/' },
    { name: '比較', url: 'https://dynameet.ai/compare/' },
    { name: 'AI チャットボット vs AI SDR', url: 'https://dynameet.ai/compare/chatbot-vs-ai-sdr/' },
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
        <section className="cmp-hero">
          <div className="cmp-hero-inner">
            <div className="cmp-eyebrow">Compare</div>
            <h1>
              チャットボットを置いただけでは、<span className="accent">商談は増えない。</span>
            </h1>
            <p className="hero-sub">
              FAQ 応答に特化した chatbot と、商談機会創出に特化した AI SDR。役割が違うため、商談を増やしたいなら AI SDR が必要です。両者の能力と用途の違いを構造的に整理します。
            </p>
            <div className="hero-ctas">
              <Link href="/" className="btn-primary">
                Meeton ai のデモを予約 →
              </Link>
              <a href="#table" className="btn-secondary">
                比較表を見る
              </a>
            </div>
          </div>
        </section>

        <section className="section section-light">
          <div className="section-inner">
            <div className="section-label">01 — Problem</div>
            <h2>FAQ 応答の自動化だけでは、商談機会は生まれない</h2>
            <p className="body">
              チャットボットは「訪問者の質問に答える」ことに最適化されています。一方で、商談機会の創出には課題ヒアリング、文脈に合った資料提案、商談予約までの誘導、未予約リードの追客といった、より積極的な営業活動が必要です。
            </p>
            <p className="body">
              「質問に答える」と「商談を生み出す」は別の能力です。
            </p>
          </div>
        </section>

        <section id="table" className="section section-light alt">
          <div className="section-inner">
            <div className="section-label">02 — Comparison</div>
            <h2>AI チャットボット vs AI SDR｜能力の違い</h2>
            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>能力</th>
                    <th>AI チャットボット</th>
                    <th>AI SDR (Meeton ai)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>主目的</td><td className="part">FAQ 応答</td><td className="yes">商談機会の創出</td></tr>
                  <tr><td>対象</td><td className="part">匿名訪問者全員</td><td className="yes">識別済みリード</td></tr>
                  <tr><td>会話の深さ</td><td className="part">事前定義シナリオ中心</td><td className="yes">AI 動的判断 + 文脈深掘り</td></tr>
                  <tr><td>課題ヒアリング</td><td className="no">×</td><td className="yes">○ AI が能動的に聞く</td></tr>
                  <tr><td>資料提案</td><td className="part">FAQ 内リンク提示</td><td className="yes">○ 文脈と CRM 履歴から最適選定</td></tr>
                  <tr><td>商談予約まで誘導</td><td className="no">×</td><td className="yes">○ 温度判定して提示</td></tr>
                  <tr><td>未予約リード追客</td><td className="no">×</td><td className="yes">○ AI メールで 1:1 継続</td></tr>
                  <tr><td>再訪リードの文脈引き継ぎ</td><td className="no">×</td><td className="yes">○ 過去会話・履歴を全保持</td></tr>
                  <tr><td>CRM 連携</td><td className="part">問い合わせログ送信のみ</td><td className="yes">会話・スコア・興味・商談まで同期</td></tr>
                  <tr><td>CRM 休眠リードの再商談化</td><td className="no">×</td><td className="yes">○ Meeton Intent + Email で実行</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section section-dark">
          <div className="section-inner narrow">
            <h2 className="dark center">Meeton ai は AI SDR Platform であり、<span className="accent">商談機会創出に特化</span>しています。</h2>
            <p className="body-dark center">
              FAQ 応答用 chatbot と併用可能ですが、商談を増やすゴールに対しては AI SDR が直接効きます。
            </p>
            <div className="cta-block center">
              <Link href="/" className="btn-primary-on-dark">
                Meeton ai のデモを予約 →
              </Link>
            </div>
          </div>
        </section>

        <section className="section section-light">
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
      </main>
      <Footer />
      <style dangerouslySetInnerHTML={{ __html: `
.cmp-hero{background:#050807;color:#fff;padding:130px 24px 96px;text-align:center;border-bottom:1px solid #0d1411}
.cmp-hero-inner{max-width:880px;margin:0 auto}
.cmp-eyebrow{font-family:var(--fm);font-size:12px;font-weight:800;letter-spacing:.18em;color:#04cb78;text-transform:uppercase;margin-bottom:24px}
.cmp-hero h1{font-size:clamp(32px,5.5vw,52px);font-weight:900;line-height:1.25;letter-spacing:-.025em;color:#fff;margin:0 0 24px;text-wrap:balance}
.cmp-hero h1 .accent{color:#04cb78}
.cmp-hero .hero-sub{font-size:clamp(15px,2vw,18px);line-height:1.85;color:rgba(255,255,255,.72);max-width:680px;margin:0 auto 36px;text-wrap:pretty}
.cmp-hero .hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.btn-primary{display:inline-flex;align-items:center;justify-content:center;background:#04cb78;color:#fff;padding:16px 32px;border-radius:10px;font-weight:800;font-size:15px;text-decoration:none;box-shadow:0 4px 18px rgba(4,203,120,.32);transition:transform .2s}
.btn-primary:hover{transform:translateY(-2px)}
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
.section h2{font-size:clamp(26px,4vw,40px);font-weight:900;line-height:1.3;letter-spacing:-.02em;color:#0B1712;margin:0 0 24px;text-wrap:balance}
.section h2.dark{color:#fff}
.section h2.center{text-align:center}
.section .body{font-size:clamp(15px,1.6vw,17px);line-height:1.9;color:#4B5A52;margin:0 0 20px;max-width:760px}
.section .body-dark{font-size:clamp(15px,1.6vw,17px);line-height:1.9;color:rgba(255,255,255,.72);margin:0 0 24px;max-width:760px}
.section .body-dark.center{text-align:center;margin:0 auto 32px}
.accent{color:#04cb78}
.compare-table-wrap{margin-top:32px;background:#fff;border:1px solid #E5EEE8;border-radius:14px;overflow-x:auto}
.compare-table{width:100%;border-collapse:collapse;min-width:680px}
.compare-table th{padding:16px 18px;font-size:13px;font-weight:800;text-align:left;background:#F7FAF8;color:#0B1712;border-bottom:1px solid #E5EEE8}
.compare-table th:first-child{font-size:11px;letter-spacing:.16em;font-family:var(--fm);color:#4B5A52;text-transform:uppercase}
.compare-table td{padding:14px 18px;font-size:14px;color:#0B1712;border-bottom:1px solid #E5EEE8}
.compare-table tr:last-child td{border-bottom:none}
.compare-table td:first-child{font-weight:700;color:#4B5A52;font-size:13px}
.compare-table td.yes{color:#04cb78;font-weight:700}
.compare-table td.part{color:#a16207;font-weight:700}
.compare-table td.no{color:#9CA3AF;font-weight:500}
.cta-block{margin-top:40px}
.cta-block.center{text-align:center}
.faq-list{display:flex;flex-direction:column;gap:18px;margin-top:32px}
.faq-item{padding:24px 28px;background:#fff;border:1px solid #E5EEE8;border-radius:12px}
.faq-q{font-size:16px;font-weight:800;color:#0B1712;margin:0 0 12px;letter-spacing:-.005em}
.faq-a{font-size:14.5px;line-height:1.85;color:#4B5A52;margin:0}
      ` }} />
    </>
  )
}
