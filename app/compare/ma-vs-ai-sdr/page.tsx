import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: {
    absolute: 'MA ツール vs AI SDR｜マーケファネルと商談化ラストワンマイルの違い ｜ Meeton ai',
  },
  description: 'MA ツール (HubSpot / Marketo / Pardot) と AI SDR の役割の違いを解説。MA はマーケファネル全体のリード管理・育成、AI SDR は個別リードを商談機会に変える実行レイヤー。補完関係を構造的に整理。',
  alternates: { canonical: '/compare/ma-vs-ai-sdr/' },
  openGraph: {
    title: 'MA ツール vs AI SDR｜マーケファネルと商談化ラストワンマイルの違い',
    description: 'MA ツールは置き換えではなく、AI SDR は MA の上で動く補完プロダクト。役割と能力の構造的な違いと、組み合わせ方を解説。',
    url: 'https://dynameet.ai/compare/ma-vs-ai-sdr/',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: 'https://dynameet.ai/compare/ma-vs-ai-sdr/',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'MA ツールと AI SDR は競合しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '競合しません。MA はマーケファネル全体のリード管理・スコアリング・一斉メール配信を担当し、AI SDR はその先の「個別リードを商談に変える」実行レイヤーを担当します。HubSpot・Marketo・Pardot 等とネイティブ連携・並走することを前提に設計されています。',
      },
    },
    {
      '@type': 'Question',
      name: 'すでに MA を導入していますが、AI SDR は必要ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。MA が引き渡したリードを商談に変えるラストワンマイルが現状の最大ボトルネックです。MA がいくらリードを育てても、初動対応の遅れ・個別フォロー不足・CRM 休眠化により多くは商談化しません。AI SDR がこの工程を自動化します。',
      },
    },
    {
      '@type': 'Question',
      name: 'MA のシナリオメールと Meeton Email は何が違いますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MA メールは「リストへの一斉配信 + 事前定義シナリオ」が基本です。Meeton Email は「個別リードのリアルタイム行動シグナル × AI 動的生成」で、送るタイミング・送る内容・送らない判断まで AI が文脈で都度決めます。MA を補完する 1:1 SDR 機能です。',
      },
    },
    {
      '@type': 'Question',
      name: 'MA のスコアリングと Meeton ai のシグナル検知はどう違いますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MA スコアリングは事前定義したルール（ページ閲覧 + N 点、資料 DL + M 点）に基づきます。Meeton ai は Web 行動・企業情報・CRM データを統合判断し、次に取るべきアクションまで判定。スコアだけでなく実行指示まで出す点が違いです。',
      },
    },
  ],
}

export default function CompareMAPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://dynameet.ai/' },
    { name: '比較', url: 'https://dynameet.ai/compare/' },
    { name: 'MA ツール vs AI SDR', url: 'https://dynameet.ai/compare/ma-vs-ai-sdr/' },
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
              MA ツールは、<span className="accent">商談化のラストワンマイル</span>までカバーしない。
            </h1>
            <p className="hero-sub">
              MA はマーケファネル全体のリード管理・育成を担当します。その先の「個別リードを商談に変える」工程は人手で残り、ボトルネックになります。AI SDR が MA の上で動き、商談化を自動化します。
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
            <div className="section-label">01 — Layered</div>
            <h2>MA と AI SDR は、役割が違うレイヤー</h2>
            <p className="body">
              MA ツール (HubSpot / Marketo / Pardot 等) はマーケファネルの「リード集め・スコアリング・一斉ナーチャリング」が中心。AI SDR は「個別リードを商談機会に変える実行」が中心。両者は競合ではなく、ファネル上の異なる位置を担当する補完プロダクトです。
            </p>
            <div className="layer-diagram">
              <div className="layer-item layer-ma">
                <div className="layer-tag">MA ツール</div>
                <div className="layer-title">マーケファネル全体管理</div>
                <p className="layer-desc">リード集め・スコアリング・一斉メール配信・キャンペーン管理</p>
              </div>
              <div className="layer-arrow" aria-hidden>↓</div>
              <div className="layer-item layer-aisdr">
                <div className="layer-tag">AI SDR (Meeton ai)</div>
                <div className="layer-title">個別リード商談化の実行</div>
                <p className="layer-desc">会話・ヒアリング・資料提案・日程調整・追客・CRM 休眠リード再商談化</p>
              </div>
              <div className="layer-arrow" aria-hidden>↓</div>
              <div className="layer-item layer-result">
                <div className="layer-tag">Result</div>
                <div className="layer-title">商談機会</div>
                <p className="layer-desc">マーケが集めたリードが、人手の都合で冷めることなく商談化する</p>
              </div>
            </div>
          </div>
        </section>

        <section id="table" className="section section-light alt">
          <div className="section-inner">
            <div className="section-label">02 — Comparison</div>
            <h2>MA ツール vs AI SDR｜役割と能力の違い</h2>
            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>能力</th>
                    <th>MA ツール</th>
                    <th>AI SDR (Meeton ai)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>主目的</td><td className="part">マーケファネル管理</td><td className="yes">個別リードの商談化</td></tr>
                  <tr><td>リード集め</td><td className="yes">○ フォーム / キャンペーン</td><td className="no">×</td></tr>
                  <tr><td>リードスコアリング</td><td className="yes">○ 事前定義ルール</td><td className="yes">○ AI 動的判断 (Email シグナル検知内蔵)</td></tr>
                  <tr><td>メール配信</td><td className="yes">○ 一斉配信 + シナリオ</td><td className="yes">○ 1:1 AI 動的生成 (Email)</td></tr>
                  <tr><td>Web 訪問者との会話</td><td className="no">×</td><td className="yes">○ AI SDR (Live)</td></tr>
                  <tr><td>課題ヒアリング</td><td className="no">×</td><td className="yes">○ AI が能動的に</td></tr>
                  <tr><td>商談予約まで誘導</td><td className="part">日程調整リンク提示のみ</td><td className="yes">○ 文脈で誘導 (Calendar)</td></tr>
                  <tr><td>未予約リード追客</td><td className="part">シナリオメール</td><td className="yes">○ AI 1:1 動的判断</td></tr>
                  <tr><td>CRM 休眠リード再商談化</td><td className="part">再エントリーシナリオ</td><td className="yes">○ Meeton Email がシグナル検知 + 再アプローチ</td></tr>
                  <tr><td>連携</td><td colSpan={2} className="yes" style={{ textAlign: 'center' }}>○ ネイティブ連携（HubSpot / Salesforce / Marketo）</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section section-dark">
          <div className="section-inner narrow">
            <h2 className="dark center">Meeton ai は、<span className="accent">MA の上で動く</span> AI SDR Platform です。</h2>
            <p className="body-dark center">
              MA を置き換えるのではなく、MA が引き渡したリードを商談に変えるラストワンマイルを担当します。
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
.layer-diagram{display:flex;flex-direction:column;align-items:center;gap:14px;margin-top:36px}
.layer-item{width:100%;max-width:600px;padding:24px 24px;background:#fff;border:1px solid #E5EEE8;border-radius:14px;text-align:center}
.layer-ma{background:#F7FAF8}
.layer-aisdr{background:rgba(4,203,120,.05);border-color:rgba(4,203,120,.3)}
.layer-result{background:#fff;border-color:#E5EEE8}
.layer-tag{font-family:var(--fm);font-size:11px;font-weight:800;letter-spacing:.16em;color:#04cb78;text-transform:uppercase;margin-bottom:8px}
.layer-ma .layer-tag{color:#6C7B73}
.layer-title{font-size:17px;font-weight:800;color:#0B1712;margin-bottom:8px}
.layer-desc{font-size:13.5px;color:#4B5A52;line-height:1.7;margin:0}
.layer-arrow{color:#9CA3AF;font-size:20px;font-weight:600}
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
