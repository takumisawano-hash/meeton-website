import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: {
    absolute: '日程調整ツール vs AI SDR｜CV 前から商談機会を創出する違い ｜ Meeton ai',
  },
  description: '日程調整ツールと AI SDR の本質的な違いを能力軸で解説。CV 後の予約導線だけでなく、CV 前の訪問者から商談機会を創出する AI SDR の構造を、表と図で整理。Meeton ai の活用パターンも掲載。',
  alternates: { canonical: '/compare/scheduling-vs-ai-sdr/' },
  openGraph: {
    title: '日程調整ツール vs AI SDR｜CV 前から商談機会を創出する違い',
    description: '日程調整リンクを出すだけでは、商談は増えない。CV 前の訪問者から商談を生み出す AI SDR と、CV 後の予約導線最適化に特化した日程調整ツール。両者の役割と能力の違いを構造的に解説。',
    url: 'https://dynameet.ai/compare/scheduling-vs-ai-sdr/',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: 'https://dynameet.ai/compare/scheduling-vs-ai-sdr/',
  mainEntity: [
    {
      '@type': 'Question',
      name: '日程調整ツールとは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '日程調整ツールとは、フォーム送信後やサンクスページから商談予約までの導線を最適化するツールです。CV した訪問者が、その場でカレンダーから日時を選んで予約できるようにします。',
      },
    },
    {
      '@type': 'Question',
      name: 'AI SDR と日程調整ツールはどちらを選ぶべきですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '目的によります。CV 後の予約率改善だけが必要なら日程調整ツールで十分です。CV 前の訪問者・予約しなかったリード・再訪問リードからも商談機会を創出したいなら AI SDR が必要です。',
      },
    },
    {
      '@type': 'Question',
      name: 'AI SDR と日程調整ツールは併用できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。Meeton ai は日程調整機能（Meeton Calendar）を内包しているため、AI SDR Platform 1 つで両方の役割をカバーできます。既存の日程調整ツールから移行する企業も多いです。',
      },
    },
    {
      '@type': 'Question',
      name: 'なぜ日程調整リンクだけでは商談が増えないのですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'B2B 訪問者の 97% はフォーム送信せずに離脱します。日程調整リンクは CV 後にしか機能しないため、未 CV の訪問者・予約しなかったリード・再訪問リードに対しては商談機会を逃します。',
      },
    },
  ],
}

export default function CompareSchedulingPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://dynameet.ai/' },
    { name: '比較', url: 'https://dynameet.ai/compare/' },
    { name: '日程調整ツール vs AI SDR', url: 'https://dynameet.ai/compare/scheduling-vs-ai-sdr/' },
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
        <section className="cmp-hero">
          <div className="cmp-hero-inner">
            <div className="cmp-eyebrow">Compare</div>
            <h1>
              日程調整リンクを出すだけでは、<br />
              <span className="accent">商談は増えない。</span>
            </h1>
            <p className="hero-sub">
              日程調整ツールは予約導線を最適化します。AI SDR はその前段で、訪問者と会話し、課題を整理し、必要な情報を届けたうえで、商談予約や追客まで実行します。両者の役割と能力の違いを構造的に整理します。
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

        {/* PROBLEM */}
        <section className="section section-light">
          <div className="section-inner">
            <div className="section-label">01 — Problem</div>
            <h2>フォーム後だけの最適化では、訪問者の 97% を取りこぼす</h2>
            <p className="body">
              B2B サイト訪問者の 97% はフォームを送らずに離脱します。日程調整ツールは「CV した訪問者」だけが対象。残り 97% の訪問者、予約しなかったリード、再訪問リードに対しては商談機会を逃しています。
            </p>
            <div className="problem-funnel">
              <div className="problem-funnel-row">
                <span className="step">訪問</span>
                <span className="arrow">→</span>
                <span className="step gap">フォーム送信</span>
                <span className="arrow">→</span>
                <span className="step">カレンダー</span>
                <span className="arrow">→</span>
                <span className="step">予約</span>
              </div>
              <p className="problem-caption">
                ↑ 日程調整ツールはここしか動かない（97% は届かない）
              </p>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section id="table" className="section section-light alt">
          <div className="section-inner">
            <div className="section-label">02 — Comparison</div>
            <h2>日程調整ツール vs AI SDR｜能力の違い</h2>
            <p className="body">
              CV 前後どこで動くか、ヒアリング・資料提案・追客まで実行できるかで、本質的な能力差があります。
            </p>
            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>能力</th>
                    <th>日程調整ツール</th>
                    <th>AI SDR (Meeton ai)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>動作タイミング</td>
                    <td className="no">CV 後のみ</td>
                    <td className="yes">CV 前 + CV 後 + 再訪問</td>
                  </tr>
                  <tr>
                    <td>未 CV 訪問者への接客</td>
                    <td className="no">×</td>
                    <td className="yes">○ AI 会話で疑問解消</td>
                  </tr>
                  <tr>
                    <td>課題ヒアリング</td>
                    <td className="no">×</td>
                    <td className="yes">○ AI が自然に聞く</td>
                  </tr>
                  <tr>
                    <td>資料提案</td>
                    <td className="no">×</td>
                    <td className="yes">○ 文脈に合った資料を自動選定</td>
                  </tr>
                  <tr>
                    <td>商談予約</td>
                    <td className="yes">○ リンク経由</td>
                    <td className="yes">○ 会話文脈で誘導</td>
                  </tr>
                  <tr>
                    <td>予約しなかったリードへの追客</td>
                    <td className="no">×</td>
                    <td className="yes">○ AI メールで 1:1 継続</td>
                  </tr>
                  <tr>
                    <td>再訪問リードへの再接客</td>
                    <td className="no">×</td>
                    <td className="yes">○ 過去文脈を持って再開</td>
                  </tr>
                  <tr>
                    <td>訪問企業 ID + 行動シグナル</td>
                    <td className="no">×</td>
                    <td className="yes">○ Intent で判断</td>
                  </tr>
                  <tr>
                    <td>CRM 自動同期</td>
                    <td className="part">予約情報のみ</td>
                    <td className="yes">会話ログ + スコア + 興味も</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PROCESS DIFFERENCE */}
        <section className="section section-dark">
          <div className="section-inner">
            <div className="section-label section-label-dark">03 — Process</div>
            <h2 className="dark">商談機会が生まれる「前段」プロセス</h2>
            <p className="body-dark">
              日程調整リンクが動くのは「予約する直前」のみ。その手前にある会話・ヒアリング・資料提案・不安解消というプロセスは、AI SDR でしか自動化できません。
            </p>
            <div className="process-compare">
              <div className="process-side process-before">
                <div className="process-label">日程調整ツール</div>
                <div className="process-flow">
                  <span>フォーム送信</span>
                  <span className="proc-arrow">→</span>
                  <span>カレンダー表示</span>
                  <span className="proc-arrow">→</span>
                  <span>予約</span>
                </div>
                <p className="process-note">3 step。会話・課題ヒアリングなし。</p>
              </div>
              <div className="process-side process-after">
                <div className="process-label">AI SDR (Meeton ai)</div>
                <div className="process-flow">
                  <span>訪問</span>
                  <span className="proc-arrow">→</span>
                  <span>会話</span>
                  <span className="proc-arrow">→</span>
                  <span>ヒアリング</span>
                  <span className="proc-arrow">→</span>
                  <span>資料提案</span>
                  <span className="proc-arrow">→</span>
                  <span>不安解消</span>
                  <span className="proc-arrow">→</span>
                  <span>カレンダー</span>
                  <span className="proc-arrow">→</span>
                  <span>予約</span>
                  <span className="proc-arrow">→</span>
                  <span>追客</span>
                </div>
                <p className="process-note">8 step。AI SDR が文脈を持って商談化まで導く。</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHEN TO PICK WHICH */}
        <section className="section section-light">
          <div className="section-inner">
            <div className="section-label">04 — Choose</div>
            <h2>どちらを選ぶべきか</h2>
            <p className="body">
              目的とフェーズによって、最適な選択は変わります。
            </p>
            <div className="pick-grid">
              <div className="pick-card">
                <div className="pick-tag">日程調整ツール</div>
                <h3 className="pick-title">こんな企業に向いています</h3>
                <ul className="pick-list">
                  <li>すでに CV 後の予約率は十分高い</li>
                  <li>フォーム CVR が高く、CV 数自体は十分</li>
                  <li>営業組織が大きく、人手で初動できる</li>
                  <li>まず予約導線だけ整えたい</li>
                </ul>
              </div>
              <div className="pick-card pick-card-highlight">
                <div className="pick-tag pick-tag-accent">AI SDR (Meeton ai)</div>
                <h3 className="pick-title">こんな企業に向いています</h3>
                <ul className="pick-list">
                  <li>リードは増えたが商談が増えていない</li>
                  <li>CV 前訪問者の 97% を取りに行きたい</li>
                  <li>予約しなかったリードを 1:1 で追客したい</li>
                  <li>再訪問リードを取りこぼしている</li>
                  <li>CV 数ではなく商談数で KPI を見たい</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MEETON COVERS BOTH */}
        <section className="section section-dark">
          <div className="section-inner narrow">
            <div className="section-label section-label-dark">05 — Coverage</div>
            <h2 className="dark center">Meeton ai は、両方を 1 プラットフォームで内包します</h2>
            <p className="body-dark center">
              Meeton ai は、AI SDR Platform として日程調整機能（Meeton Calendar）も内包しています。日程調整ツールから移行する企業も、CV 前から商談を取りに行きたい企業も、Meeton ai 1 つでカバーできます。
            </p>
            <div className="cta-block center">
              <Link href="/" className="btn-primary-on-dark">
                Meeton ai のデモを予約 →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
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
.cmp-hero h1{font-size:clamp(32px,5.5vw,52px);font-weight:900;line-height:1.25;letter-spacing:-.02em;color:#fff;margin:0 0 24px}
.cmp-hero h1 .accent{color:#04cb78}
.cmp-hero .hero-sub{font-size:clamp(15px,2vw,18px);line-height:1.85;color:rgba(255,255,255,.7);max-width:680px;margin:0 auto 36px}
.cmp-hero .hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.btn-primary{display:inline-block;background:linear-gradient(135deg,#04cb78,#0fc19a);color:#fff;padding:16px 32px;border-radius:10px;font-weight:800;font-size:15px;text-decoration:none;box-shadow:0 4px 18px rgba(4,203,120,.32);transition:transform .2s,box-shadow .25s}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(4,203,120,.4)}
.btn-secondary{display:inline-block;background:transparent;color:rgba(255,255,255,.9);padding:16px 32px;border:1px solid rgba(255,255,255,.2);border-radius:10px;font-weight:700;font-size:15px;text-decoration:none}
.btn-secondary:hover{background:rgba(255,255,255,.05);border-color:rgba(4,203,120,.45)}
.btn-primary-on-dark{display:inline-block;background:linear-gradient(135deg,#04cb78,#0fc19a);color:#fff;padding:16px 32px;border-radius:10px;font-weight:800;font-size:15px;text-decoration:none;box-shadow:0 4px 18px rgba(4,203,120,.32);transition:transform .2s}
.btn-primary-on-dark:hover{transform:translateY(-2px)}

.section{padding:clamp(64px,8vw,96px) clamp(16px,5vw,48px)}
.section-inner{max-width:980px;margin:0 auto}
.section-inner.narrow{max-width:720px}
.section-light{background:#fff}
.section-light.alt{background:#F7FAF8}
.section-dark{background:#050807;color:#fff;border-top:1px solid #0d1411;border-bottom:1px solid #0d1411}

.section-label{font-family:var(--fm);font-size:11px;font-weight:800;letter-spacing:.2em;color:#04cb78;text-transform:uppercase;margin-bottom:18px}
.section-label-dark{color:#04cb78}
.section h2{font-size:clamp(26px,4vw,40px);font-weight:900;line-height:1.3;letter-spacing:-.02em;color:#0B1712;margin:0 0 24px}
.section h2.dark{color:#fff}
.section h2.center{text-align:center}
.section .body{font-size:clamp(15px,1.6vw,17px);line-height:1.9;color:#4B5A52;margin:0 0 20px;max-width:760px}
.section .body-dark{font-size:clamp(15px,1.6vw,17px);line-height:1.9;color:rgba(255,255,255,.7);margin:0 0 24px;max-width:760px}
.section .body-dark.center{text-align:center;margin:0 auto 32px}
.accent{color:#04cb78}

.problem-funnel{margin:32px 0;padding:32px clamp(16px,3vw,28px);background:#F7FAF8;border:1px solid #E5EEE8;border-radius:18px;text-align:center}
.problem-funnel-row{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:14px}
.problem-funnel-row .step{display:inline-block;padding:9px 16px;background:#fff;border:1px solid #E5EEE8;border-radius:9px;font-size:13px;font-weight:700;color:#0B1712}
.problem-funnel-row .step.gap{background:#fee2e2;border-color:#fecaca;color:#b91c1c}
.problem-funnel-row .arrow{color:#9CA3AF;font-size:14px;font-weight:600}
.problem-caption{font-size:13px;color:#b91c1c;font-weight:700;margin:0}

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

.process-compare{display:grid;grid-template-columns:1fr 1.6fr;gap:24px;margin-top:36px}
@media (max-width:880px){.process-compare{grid-template-columns:1fr}}
.process-side{padding:28px 24px;border-radius:16px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.03)}
.process-before .process-label{color:rgba(255,255,255,.5)}
.process-after{background:rgba(4,203,120,.06);border-color:rgba(4,203,120,.25)}
.process-label{font-family:var(--fm);font-size:11px;font-weight:800;letter-spacing:.18em;margin-bottom:18px;text-transform:uppercase}
.process-after .process-label{color:#04cb78}
.process-flow{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:14px}
.process-flow span:not(.proc-arrow){padding:7px 12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:8px;font-size:13px;font-weight:700;color:#fff}
.process-after .process-flow span:not(.proc-arrow){background:rgba(4,203,120,.1);border-color:rgba(4,203,120,.3)}
.proc-arrow{color:rgba(255,255,255,.45);font-size:12px;font-weight:600}
.process-note{font-size:13px;color:rgba(255,255,255,.55);font-weight:600;margin:0}

.pick-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:36px}
@media (max-width:880px){.pick-grid{grid-template-columns:1fr}}
.pick-card{padding:32px 28px;background:#fff;border:1px solid #E5EEE8;border-radius:14px}
.pick-card-highlight{border-color:rgba(4,203,120,.35);background:#F7FFFB}
.pick-tag{display:inline-block;padding:5px 12px;font-family:var(--fm);font-size:11px;font-weight:800;letter-spacing:.12em;background:#F7FAF8;color:#4B5A52;border-radius:999px;margin-bottom:18px;text-transform:uppercase}
.pick-tag-accent{background:#04cb78;color:#fff}
.pick-title{font-size:18px;font-weight:800;color:#0B1712;margin:0 0 16px;letter-spacing:-.005em}
.pick-list{margin:0;padding:0;list-style:none}
.pick-list li{padding:10px 0 10px 24px;font-size:14px;color:#0B1712;line-height:1.7;border-bottom:1px solid #F0F4F1;position:relative;font-weight:600}
.pick-list li:last-child{border-bottom:none}
.pick-list li::before{content:"●";position:absolute;left:0;top:10px;color:#04cb78;font-size:9px;line-height:1.7}

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
