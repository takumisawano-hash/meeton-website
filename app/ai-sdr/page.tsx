import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { getAllPosts } from '@/app/lib/notion'
import { buildClusterGroups } from '@/app/pillar/components/cluster'

export const revalidate = 3600

export const metadata: Metadata = {
  title: {
    absolute: 'AI SDRとは？仕組み・従来SDRとの違い・導入効果を解説｜Meeton ai',
  },
  description: 'AI SDR とは、Web 行動と CRM データをもとに、見込み客への初動対応・資料提案・日程調整・追客を自動化する AI 営業エージェント。人間 SDR・チャットボット・日程調整ツールとの違い、Meeton ai の特徴と活用事例を解説。',
  alternates: { canonical: '/ai-sdr/' },
  openGraph: {
    title: 'AI SDRとは？仕組み・従来SDRとの違い・導入効果を解説',
    description: 'AI SDR は、Web 訪問者・資料 DL リード・再訪問者・CRM に蓄積された既存リードまで、会話・資料提案・日程調整・追客を自動化し、商談機会を創出する AI 営業エージェント。',
    url: 'https://dynameet.ai/ai-sdr/',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: 'https://dynameet.ai/ai-sdr/',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'AI SDR とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI SDR（AI Sales Development Representative）とは、Web 行動と CRM データをもとに、見込み客への初動対応・会話・資料提案・日程調整・追客を自動化する AI 営業エージェントです。Web 訪問者・資料 DL リード・再訪問者から CRM に蓄積された既存リードまで対応し、商談機会を創出します。',
      },
    },
    {
      '@type': 'Question',
      name: 'AI SDR と AI チャットボットの違いは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI チャットボットは主に FAQ 応答や問い合わせ対応を担います。AI SDR は、訪問者の行動・会話・CRM 履歴をもとに、資料提案、日程調整、追客まで行い、商談機会を前に進めます。「質問に答える」のと「商談機会を前に進める」の違いです。',
      },
    },
    {
      '@type': 'Question',
      name: 'AI SDR と人間 SDR の違いは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI SDR は 24 時間 365 日稼働し、リード発生の瞬間に初動対応できます。人間 SDR の平均初動対応時間 42 時間に対し、AI SDR は即時。コストも人間 SDR 1 名の年間人件費を大きく下回ります。',
      },
    },
    {
      '@type': 'Question',
      name: 'AI SDR を導入するには何が必要ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Meeton ai の場合、JavaScript タグを 1 行 Web サイトに設置するだけで稼働します。HubSpot・Salesforce 等の主要 CRM と連携し、リード情報・会話ログ・スコアを自動同期できます。',
      },
    },
  ],
}

const HUB_LINKS = [
  {
    href: '/pillar/website-shodanka/',
    label: '完全ガイド',
    title: 'BtoBサイト商談化 完全ガイド',
    desc: 'Web サイトを商談チャネルに変える設計と運用を体系化。AI SDR 導入の全体像はこちら。',
  },
  {
    href: '/pillar/lead-generation/',
    label: '完全ガイド',
    title: 'B2B リードジェネレーション完全ガイド',
    desc: '認知から商談化まで、リードジェン 5 段階と AI の入れどころを解説。',
  },
  {
    href: '/compare/ai-sdr-tools/',
    label: '比較',
    title: 'AI SDR ツール比較',
    desc: '主要な AI SDR ツールを機能・対応領域・価格の観点で比較。',
  },
  {
    href: '/compare/chatbot-vs-ai-sdr/',
    label: '比較',
    title: 'チャットボット vs AI SDR',
    desc: 'FAQ 応答と商談機会創出。能力ベースでの違いを整理。',
  },
  {
    href: '/compare/ma-vs-ai-sdr/',
    label: '比較',
    title: 'MA ツール vs AI SDR',
    desc: 'マーケファネルと商談化ラストワンマイル、それぞれの守備範囲。',
  },
  {
    href: '/glossary/speed-to-lead/',
    label: '用語集',
    title: 'Speed to Lead（初動レスポンス）',
    desc: '初動対応速度が商談化率を左右する理由と改善アプローチ。',
  },
  {
    href: '/glossary/shodanka-ritsu/',
    label: '用語集',
    title: '商談化率',
    desc: '定義・計算式・パイプライン効率の見方をコンパクトに解説。',
  },
  {
    href: '/tools/roi/',
    label: '診断ツール',
    title: '商談化の余地 診断（ROI 診断）',
    desc: '自社サイトにどれだけ商談化の余地があるか、その場で試算。',
  },
  {
    href: '/cases/',
    label: '導入事例',
    title: '導入事例一覧',
    desc: '商談化率 60%+ など、AI SDR を導入した企業の成果を紹介。',
  },
]

const CLUSTER_SPEC = [
  {
    label: 'AI SDR・商談化',
    keywords: ['ai sdr', 'aisdr', 'ai-sdr', '商談化', 'speed to lead', '初動'],
  },
  {
    label: 'AI チャット・Web 接客',
    keywords: ['ai チャット', 'aiチャット', 'チャットボット', 'web接客', 'web 接客'],
  },
  {
    label: 'インサイドセールス・SDR',
    keywords: ['インサイドセールス', 'sdr', 'bdr', '営業 dx', '営業dx'],
  },
]

function formatPostDate(d: string): string {
  if (!d) return ''
  return d.slice(0, 10).replace(/-/g, '.')
}

export default async function AiSdrPage() {
  const posts = await getAllPosts()
  const { groups: clusterGroups } = buildClusterGroups(posts, CLUSTER_SPEC)

  const breadcrumbs = [
    { name: 'Home', url: 'https://dynameet.ai/' },
    { name: 'AI SDR とは', url: 'https://dynameet.ai/ai-sdr/' },
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
        <section className="ai-sdr-hero">
          <div className="ai-sdr-hero-inner">
            <div className="ai-sdr-eyebrow">AI SDR Guide</div>
            <h1>
              AI SDR とは？<br />
              <span className="accent">Web と CRM に眠る商談機会を動かす AI 営業エージェント</span>
            </h1>
            <p className="hero-sub">
              AI SDR は、Web 行動と CRM データをもとに、見込み客への初動対応・会話・資料提案・日程調整・追客を自動化する AI 営業エージェントです。Web 訪問者・資料 DL リード・再訪問者から、CRM に蓄積された既存リードまで対応します。本ガイドでは、AI SDR の定義、人間 SDR・チャットボット・日程調整ツールとの違い、導入メリットを解説します。
            </p>
            <div className="hero-ctas">
              <Link href="/" className="btn-primary" data-cta="hero-demo">
                Meeton ai のデモを予約 →
              </Link>
              <a href="#what-is" className="btn-secondary">
                AI SDR の定義から読む
              </a>
            </div>
          </div>
        </section>

        {/* WHAT IS AI SDR */}
        <section id="what-is" className="section section-light">
          <div className="section-inner">
            <div className="section-label">01 — Definition</div>
            <h2>AI SDR とは何か</h2>
            <p className="body">
              AI SDR（AI Sales Development Representative）とは、Web 行動と CRM データをもとに、見込み客への初動対応・資料提案・日程調整・追客を自動化する AI 営業エージェントです。従来の SDR（営業開発担当）が人間として行っていた業務を、AI が 24 時間 365 日自動で実行します。
            </p>
            <p className="body">
              対象は、新規 Web 訪問者だけではありません。資料 DL リード、再訪問者、予約しなかったリード、CRM に蓄積された過去 MQL ・失注リード・休眠 contact まで含めて、文脈に応じて会話・提案・予約・追客を実行します。
            </p>
            <div className="callout">
              <div className="callout-label">AI SDR の定義</div>
              <p>
                <strong>「Web と CRM の見込み客に対して、AI が初動対応・会話・資料提案・日程調整・追客を自律的に行う AI 営業エージェント」</strong>
              </p>
            </div>
          </div>
        </section>

        {/* WHY NOW */}
        <section className="section section-dark">
          <div className="section-inner">
            <div className="section-label section-label-dark">02 — Why now</div>
            <h2 className="dark">なぜ今、AI SDR か</h2>
            <p className="body-dark">
              リード獲得は限界に近づきつつあります。広告 CPC は年々上昇し、SEO の競合は飽和し、ホワイトペーパー DL の質は劣化しています。一方、B2B 営業の初動対応時間の平均は依然として 42 時間。CV してから商談まで、ほとんどのリードは温度が下がってしまいます。
            </p>
            <div className="why-grid">
              <div className="why-card">
                <div className="why-num">42h</div>
                <div className="why-title">B2B 平均初動対応時間</div>
                <p className="why-desc">
                  CV してから営業が連絡するまで、平均 42 時間。この間にリードの温度は急速に下がります。
                </p>
              </div>
              <div className="why-card">
                <div className="why-num">大半</div>
                <div className="why-title">未コンバートで離脱</div>
                <p className="why-desc">
                  多くの B2B サイト訪問者は、フォーム送信前に離脱します。会話のきっかけがないため商談機会が失われます。
                </p>
              </div>
              <div className="why-card">
                <div className="why-num">24/7</div>
                <div className="why-title">AI SDR 稼働時間</div>
                <p className="why-desc">
                  AI SDR は深夜・休日・年末年始も稼働。リードの温度が最も高い瞬間を逃しません。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI SDR vs Human SDR vs Chatbot vs Scheduling */}
        <section className="section section-light">
          <div className="section-inner">
            <div className="section-label">03 — Comparison</div>
            <h2>AI SDR vs 人間 SDR vs チャットボット vs 日程調整</h2>
            <p className="body">
              既存ツールとの違いを能力ベースで整理します。
            </p>
            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>能力</th>
                    <th>AI SDR</th>
                    <th>人間 SDR</th>
                    <th>チャットボット</th>
                    <th>日程調整ツール</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>稼働時間</td>
                    <td className="yes">24/7</td>
                    <td className="no">営業時間内</td>
                    <td className="yes">24/7</td>
                    <td className="yes">24/7</td>
                  </tr>
                  <tr>
                    <td>初動対応速度</td>
                    <td className="yes">即時</td>
                    <td className="no">数時間〜数日</td>
                    <td className="yes">即時</td>
                    <td className="part">CV 後のみ</td>
                  </tr>
                  <tr>
                    <td>課題ヒアリング</td>
                    <td className="yes">○</td>
                    <td className="yes">○</td>
                    <td className="no">FAQ 中心</td>
                    <td className="no">×</td>
                  </tr>
                  <tr>
                    <td>資料提案</td>
                    <td className="yes">○ (文脈ベース)</td>
                    <td className="yes">○</td>
                    <td className="part">事前定義のみ</td>
                    <td className="no">×</td>
                  </tr>
                  <tr>
                    <td>商談予約</td>
                    <td className="yes">○ (会話文脈で)</td>
                    <td className="yes">○</td>
                    <td className="part">フォーム経由</td>
                    <td className="yes">○ (リンク経由)</td>
                  </tr>
                  <tr>
                    <td>追客 (1:1)</td>
                    <td className="yes">○ AI メール</td>
                    <td className="yes">○ 手動</td>
                    <td className="no">×</td>
                    <td className="no">×</td>
                  </tr>
                  <tr>
                    <td>スケーラビリティ</td>
                    <td className="yes">高 (人員不要)</td>
                    <td className="no">低 (採用必要)</td>
                    <td className="yes">高</td>
                    <td className="yes">高</td>
                  </tr>
                  <tr>
                    <td>初期コスト</td>
                    <td className="yes">低 (5 分設置)</td>
                    <td className="no">高 (採用 + 教育)</td>
                    <td className="yes">低</td>
                    <td className="yes">低</td>
                  </tr>
                  <tr>
                    <td>CRM 既存リードの再商談化</td>
                    <td className="yes">○</td>
                    <td className="part">手動</td>
                    <td className="no">×</td>
                    <td className="no">×</td>
                  </tr>
                  <tr>
                    <td>Web 行動 + CRM シグナル判断</td>
                    <td className="yes">○</td>
                    <td className="part">部分的</td>
                    <td className="no">×</td>
                    <td className="no">×</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4 USE CASES */}
        <section className="section section-light alt">
          <div className="section-inner">
            <div className="section-label">04 — Use cases</div>
            <h2>AI SDR が商談化する 5 つの瞬間</h2>
            <p className="body">
              AI SDR は、リードの状態に応じて 4 つの場面で商談機会を創出します。
            </p>
            <div className="usecase-grid">
              <div className="usecase-card">
                <div className="usecase-num">01</div>
                <div className="usecase-title">問い合わせ前の訪問者</div>
                <p className="usecase-pain">課題: フォーム送信せず離脱する</p>
                <p className="usecase-action">AI が会話して疑問解消、商談化まで導く</p>
              </div>
              <div className="usecase-card">
                <div className="usecase-num">02</div>
                <div className="usecase-title">資料 DL 直後のリード</div>
                <p className="usecase-pain">課題: 温度が高いのに放置される</p>
                <p className="usecase-action">即時に日程調整を提示、その場で予約まで</p>
              </div>
              <div className="usecase-card">
                <div className="usecase-num">03</div>
                <div className="usecase-title">予約しなかったリード</div>
                <p className="usecase-pain">課題: その場で決めきれない</p>
                <p className="usecase-action">AI メールで 1:1 追客、文脈を引き継いで再接客</p>
              </div>
              <div className="usecase-card">
                <div className="usecase-num">04</div>
                <div className="usecase-title">再訪問した既存リード</div>
                <p className="usecase-pain">課題: 検討再開を見逃す</p>
                <p className="usecase-action">過去文脈を持って再接客、温度感に応じて商談化</p>
              </div>
              <div className="usecase-card">
                <div className="usecase-num">05</div>
                <div className="usecase-title">CRM に眠る既存リード</div>
                <p className="usecase-pain">課題: 過去 MQL ・失注リードの再検討シグナルを見逃す</p>
                <p className="usecase-action">Web 行動・メール反応・CRM 履歴をもとに、AI が自然に再接触</p>
              </div>
            </div>
          </div>
        </section>

        {/* MEETON AI AS AI SDR */}
        <section className="section section-dark">
          <div className="section-inner">
            <div className="section-label section-label-dark">05 — Meeton ai</div>
            <h2 className="dark">Meeton ai は、日本市場向けの AI SDR Platform です</h2>
            <p className="body-dark">
              Meeton ai は、日本の B2B 企業向けに開発された AI SDR Platform です。日本語・英語・中国語・韓国語に対応し、HubSpot・Salesforce 等の主要 CRM と連携。JavaScript タグ 1 行で稼働開始します。
            </p>
            <div className="cap-grid">
              <div className="cap-card">
                <div className="cap-job">会話する</div>
                <div className="cap-feat">Meeton Live</div>
              </div>
              <div className="cap-card">
                <div className="cap-job">商談予約する</div>
                <div className="cap-feat">Meeton Calendar</div>
              </div>
              <div className="cap-card">
                <div className="cap-job">資料を提案する</div>
                <div className="cap-feat">Meeton Library</div>
              </div>
              <div className="cap-card">
                <div className="cap-job">追客 + 休眠リード再商談化</div>
                <div className="cap-feat">Meeton Email</div>
                <div className="cap-sub">未予約リード + CRM 既存リードのシグナルを検知し、文脈に沿って 1:1 で再アプローチ</div>
              </div>
            </div>
            <div className="cta-block center">
              <Link href="/" className="btn-primary-on-dark">
                Meeton ai のデモを予約 →
              </Link>
            </div>
          </div>
        </section>

        {/* CROSS LINK — Web side ⇄ CRM side */}
        <section className="section section-light">
          <div className="section-inner narrow">
            <div className="section-label">06 — Beyond website</div>
            <h2>AI SDR は、Web 接点と CRM 接点をつなぐ。</h2>
            <p className="body">
              新規 Web 訪問者だけでなく、資料 DL 後に離脱したリード、過去に商談化しなかった MQL、失注後に再訪した既存リード、休眠 contact も AI SDR の対象です。Web 行動と CRM 履歴をつなぐことで、これまで見逃していた商談機会を再び動かせます。
            </p>
            <div className="cross-link-cards">
              <Link href="/lead-revival/" className="cross-card">
                <div className="cross-card-label">CRM-to-Meeting</div>
                <div className="cross-card-title">CRM に眠るリードの再商談化 →</div>
                <p className="cross-card-desc">過去 MQL・失注・休眠 contact から AI SDR が商談を掘り起こす。</p>
              </Link>
              <Link href="/" className="cross-card">
                <div className="cross-card-label">Platform 全体</div>
                <div className="cross-card-title">Meeton ai トップ →</div>
                <p className="cross-card-desc">Web と CRM の両ループを含む AI SDR Platform。</p>
              </Link>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
.cross-link-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:32px}
@media (max-width:680px){.cross-link-cards{grid-template-columns:1fr}}
.cross-card{display:block;padding:24px 24px;background:#fff;border:1px solid #E5EEE8;border-radius:12px;text-decoration:none;color:inherit;transition:transform .18s,border-color .18s}
.cross-card:hover{transform:translateY(-2px);border-color:rgba(4,203,120,.35)}
.cross-card-label{font-family:var(--fm);font-size:10px;font-weight:800;letter-spacing:.16em;color:#6C7B73;text-transform:uppercase;margin-bottom:8px}
.cross-card-title{font-size:16px;font-weight:800;color:#0B1712;margin-bottom:8px}
.cross-card-desc{font-size:13px;color:#4B5A52;line-height:1.7;margin:0}
.cap-sub{font-size:11px;line-height:1.6;color:rgba(255,255,255,.55);margin-top:8px;text-align:left}
` }} />
          </div>
        </section>

        {/* HUB — Guide continues */}
        <section className="section section-light alt">
          <div className="section-inner">
            <div className="section-label">07 — Keep reading</div>
            <h2>ガイドの続き</h2>
            <p className="body">
              AI SDR の定義を押さえたら、次は「自社サイトをどう商談化するか」「どのツールをどう選ぶか」の具体化です。目的別に、以下のガイド・比較・診断へ進んでください。
            </p>
            <div className="hub-grid">
              {HUB_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="hub-card">
                  <div className="hub-card-label">{item.label}</div>
                  <div className="hub-card-title">{item.title} →</div>
                  <p className="hub-card-desc">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CLUSTER ARTICLES */}
        {clusterGroups.length > 0 && (
          <section className="section section-light">
            <div className="section-inner">
              <div className="section-label">08 — Related articles</div>
              <h2>AI SDR 関連記事</h2>
              <p className="body">
                ブログで公開済みの記事のうち、AI SDR・AI チャット・インサイドセールスに関連するものを集約しています。
              </p>
              {clusterGroups.map((group) => (
                <div key={group.label} className="cluster-group">
                  <div className="cluster-group-head">
                    <h3 className="cluster-group-h">{group.label}</h3>
                    <span className="cluster-group-count">{group.posts.length} 記事</span>
                  </div>
                  <div className="cluster-grid">
                    {group.posts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.slug}/`} className="cluster-card">
                        {post.category && <div className="cluster-card-cat">{post.category}</div>}
                        <h4 className="cluster-card-title">{post.title}</h4>
                        <div className="cluster-card-date">{formatPostDate(post.publishedDate)}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

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

        {/* FINAL CTA */}
        <section className="section section-dark final">
          <div className="section-inner narrow">
            <h2 className="dark center">
              Web と CRM に眠る商談機会を、<span className="accent">30 分で可視化しませんか？</span>
            </h2>
            <p className="body-dark center">
              Web 訪問者から CRM に残る過去 MQL・失注リードまで、Meeton ai で商談化できる余地を診断します。
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
.ai-sdr-hero{background:#050807;color:#fff;padding:130px 24px 96px;text-align:center;border-bottom:1px solid #0d1411}
.ai-sdr-hero-inner{max-width:880px;margin:0 auto}
.ai-sdr-eyebrow{font-family:var(--fm);font-size:12px;font-weight:800;letter-spacing:.18em;color:#04cb78;text-transform:uppercase;margin-bottom:24px}
.ai-sdr-hero h1{font-size:clamp(32px,5.5vw,56px);font-weight:900;line-height:1.18;letter-spacing:-.02em;color:#fff;margin:0 0 24px}
.ai-sdr-hero h1 .accent{color:#04cb78}
.ai-sdr-hero .hero-sub{font-size:clamp(15px,2vw,18px);line-height:1.85;color:rgba(255,255,255,.7);max-width:680px;margin:0 auto 36px}
.ai-sdr-hero .hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.btn-primary{display:inline-block;background:#04cb78;color:#fff;padding:16px 32px;border-radius:10px;font-weight:800;font-size:15px;text-decoration:none;box-shadow:0 4px 18px rgba(4,203,120,.32);transition:transform .2s,box-shadow .25s}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(4,203,120,.4)}
.btn-secondary{display:inline-block;background:transparent;color:rgba(255,255,255,.9);padding:16px 32px;border:1px solid rgba(255,255,255,.2);border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;transition:background .2s,border-color .2s}
.btn-secondary:hover{background:rgba(255,255,255,.05);border-color:rgba(4,203,120,.45)}
.btn-primary-on-dark{display:inline-block;background:#04cb78;color:#fff;padding:16px 32px;border-radius:10px;font-weight:800;font-size:15px;text-decoration:none;box-shadow:0 4px 18px rgba(4,203,120,.32);transition:transform .2s}
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

.callout{margin-top:28px;padding:24px 28px;background:#F7FAF8;border-left:none;border:1px solid #E5EEE8;border-radius:14px}
.callout-label{font-family:var(--fm);font-size:11px;font-weight:800;letter-spacing:.16em;color:#04cb78;text-transform:uppercase;margin-bottom:10px}
.callout p{font-size:16px;line-height:1.85;color:#0B1712;margin:0}

.why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
@media (max-width:780px){.why-grid{grid-template-columns:1fr}}
.why-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.10);border-radius:14px;padding:28px 24px}
.why-num{font-family:var(--fm);font-size:42px;font-weight:900;color:#04cb78;letter-spacing:-.02em;margin-bottom:10px;line-height:1}
.why-title{font-size:16px;font-weight:800;color:#fff;margin-bottom:12px}
.why-desc{font-size:13.5px;line-height:1.75;color:rgba(255,255,255,.65)}

.compare-table-wrap{margin-top:32px;background:#fff;border:1px solid #E5EEE8;border-radius:14px;overflow-x:auto}
.compare-table{width:100%;border-collapse:collapse;min-width:680px}
.compare-table th{padding:14px 16px;font-size:13px;font-weight:800;text-align:left;background:#F7FAF8;color:#0B1712;border-bottom:1px solid #E5EEE8}
.compare-table th:first-child{font-size:11px;letter-spacing:.16em;font-family:var(--fm);color:#4B5A52;text-transform:uppercase}
.compare-table td{padding:14px 16px;font-size:14px;color:#0B1712;border-bottom:1px solid #E5EEE8}
.compare-table tr:last-child td{border-bottom:none}
.compare-table td:first-child{font-weight:700;color:#4B5A52;font-size:13px}
.compare-table td.yes{color:#04cb78;font-weight:700}
.compare-table td.part{color:#a16207;font-weight:700}
.compare-table td.no{color:#9CA3AF;font-weight:500}

.usecase-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:36px}
@media (max-width:780px){.usecase-grid{grid-template-columns:1fr}}
.usecase-card{background:#fff;border:1px solid #E5EEE8;border-radius:14px;padding:28px 24px;transition:transform .2s,border-color .2s}
.usecase-card:hover{transform:translateY(-3px);border-color:rgba(4,203,120,.35)}
.usecase-num{font-family:var(--fm);font-size:11px;font-weight:800;letter-spacing:.2em;color:#04cb78;margin-bottom:14px}
.usecase-title{font-size:18px;font-weight:800;color:#0B1712;margin-bottom:14px;letter-spacing:-.01em}
.usecase-pain{font-size:13px;color:#9CA3AF;margin-bottom:8px;font-weight:600}
.usecase-action{font-size:14px;color:#0B1712;font-weight:600;line-height:1.7;margin:0}

.cap-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:36px}
@media (max-width:880px){.cap-grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:480px){.cap-grid{grid-template-columns:1fr}}
.cap-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.10);border-radius:12px;padding:18px 16px;text-align:center}
.cap-job{font-size:14px;font-weight:800;color:#fff;margin-bottom:6px}
.cap-feat{font-family:var(--fm);font-size:12px;font-weight:800;color:#04cb78;letter-spacing:.04em}

.cta-block{margin-top:40px;text-align:left}
.cta-block.center{text-align:center}

.hub-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:32px}
@media (max-width:880px){.hub-grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:560px){.hub-grid{grid-template-columns:1fr}}
.hub-card{display:block;padding:22px;background:#fff;border:1px solid #E5EEE8;border-radius:12px;text-decoration:none;color:inherit;transition:transform .18s,border-color .18s}
.hub-card:hover{transform:translateY(-2px);border-color:rgba(4,203,120,.35)}
.hub-card-label{font-family:var(--fm);font-size:10px;font-weight:800;letter-spacing:.16em;color:#04cb78;text-transform:uppercase;margin-bottom:8px}
.hub-card-title{font-size:15px;font-weight:800;color:#0B1712;margin-bottom:8px;line-height:1.5}
.hub-card-desc{font-size:12.5px;color:#4B5A52;line-height:1.7;margin:0}

.cluster-group{margin-top:36px}
.cluster-group-head{display:flex;align-items:baseline;gap:12px;margin-bottom:16px}
.cluster-group-h{font-size:18px;font-weight:800;color:#0B1712;margin:0;letter-spacing:-.01em}
.cluster-group-count{font-family:var(--fm);font-size:11px;font-weight:700;color:#6C7B73}
.cluster-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media (max-width:880px){.cluster-grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:560px){.cluster-grid{grid-template-columns:1fr}}
.cluster-card{display:block;padding:20px;background:#fff;border:1px solid #E5EEE8;border-radius:12px;text-decoration:none;color:inherit;transition:transform .18s,border-color .18s}
.cluster-card:hover{transform:translateY(-2px);border-color:rgba(4,203,120,.35)}
.cluster-card-cat{font-family:var(--fm);font-size:10px;font-weight:800;letter-spacing:.14em;color:#6C7B73;text-transform:uppercase;margin-bottom:8px}
.cluster-card-title{font-size:14.5px;font-weight:800;color:#0B1712;line-height:1.6;margin:0 0 10px}
.cluster-card-date{font-family:var(--fm);font-size:11px;color:#9CA3AF}

.faq-list{display:flex;flex-direction:column;gap:18px;margin-top:32px}
.faq-item{padding:24px 28px;background:#fff;border:1px solid #E5EEE8;border-radius:12px}
.faq-q{font-size:16px;font-weight:800;color:#0B1712;margin:0 0 12px;letter-spacing:-.005em}
.faq-a{font-size:14.5px;line-height:1.85;color:#4B5A52;margin:0}

.section-dark.final{padding:80px 24px 100px}
      ` }} />
    </>
  )
}
