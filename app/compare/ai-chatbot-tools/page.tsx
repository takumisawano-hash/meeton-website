import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import CTAButtons from '@/app/components/v2/CTAButtons'
import { Section, SectionHead, Eyebrow, Card, Check } from '@/app/components/v2/ui'

/**
 * /compare/ai-chatbot-tools/ — Category comparison HUB (JA only).
 *
 * Target intent: "BtoB AIチャットボット 比較" / "AIチャットボット おすすめ 法人"
 *
 * Role split: /compare/chatbot-vs-ai-sdr/ = positioning (chatbot vs AI SDR の
 * 概念比較)。このページ = マルチベンダー比較表 (シナリオ型 / 生成AI型 / AI SDR型
 * の3分類で7ツールを整理)。競合ファクトは 1:1 比較ページ + 検証済みドシエのみ。
 */

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'BtoB向けAIチャットボット比較7選｜シナリオ型・生成AI型・AI SDR型',
  description:
    'BtoB向けAIチャットボット7種（Meeton Chat・チャネルトーク・ChatPlus・anybot・sinclo・HubSpot・Intercom）をシナリオ型・生成AI型・AI SDR型の3分類で比較。商談獲得を目的とした選び方を解説します。',
  alternates: {
    canonical: '/compare/ai-chatbot-tools/',
  },
  openGraph: {
    title: 'BtoB向けAIチャットボット比較7選｜シナリオ型・生成AI型・AI SDR型',
    description:
      'AIチャットボット7ツールを3分類（シナリオ型・生成AI型・AI SDR型）で公正に比較。BtoBの商談化目的での選び方を解説。',
    url: 'https://dynameet.ai/compare/ai-chatbot-tools/',
    siteName: 'Meeton ai',
    locale: 'ja_JP',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

// ───────────────────────── data ─────────────────────────

type Vendor = {
  name: string
  href: string
  linkLabel: string
  type: string
  purpose: string
  ai: string
  booking: string
  pricing: string
  japanese: string
  highlight?: boolean
}

const VENDORS: Vendor[] = [
  {
    name: 'Meeton Chat',
    href: '/chat/',
    linkLabel: '製品詳細',
    type: 'AI SDR型',
    purpose: 'BtoBリードの商談化',
    ai: '◎ LLMネイティブ（シナリオ設計不要）',
    booking: '◎ チャット内で完結（Google Calendar / Teams / Zoom 連携）',
    pricing: '公開（基本プラン15万円〜）',
    japanese: '◎ 国産・日本語ネイティブ',
    highlight: true,
  },
  {
    name: 'チャネルトーク',
    href: '/compare/channel-talk/',
    linkLabel: '詳細比較',
    type: '生成AI型（接客・CS）',
    purpose: '接客・CS・CRMマーケ（EC中心）',
    ai: '○ AIエージェント ALF',
    booking: '× 商談予約専用機能は公式資料で確認できず',
    pricing: '公開（無料〜。AIは¥50/解決の従量）',
    japanese: '○ 日本法人・完全ローカライズ',
  },
  {
    name: 'ChatPlus',
    href: '/compare/meeton-vs-chatplus/',
    linkLabel: '詳細比較',
    type: 'シナリオ型（AI併用）',
    purpose: 'FAQ自動化・Web接客',
    ai: '△ シナリオ主軸＋AI補助',
    booking: '△ 外部カレンダー連携（ネイティブ完結ではない）',
    pricing: '公開（低価格帯）',
    japanese: '○ 日本語（国内導入実績多数）',
  },
  {
    name: 'anybot',
    href: '/compare/meeton-vs-anybot/',
    linkLabel: '詳細比較',
    type: 'シナリオ型（LINE特化）',
    purpose: 'LINE公式アカウント運用・toCキャンペーン',
    ai: '△ シナリオ＋AI補助',
    booking: '× ネイティブ機能としての明示なし',
    pricing: '公式サイト参照',
    japanese: '○ 日本語',
  },
  {
    name: 'sinclo',
    href: '/compare/meeton-vs-sinclo/',
    linkLabel: '詳細比較',
    type: 'シナリオ型',
    purpose: 'FAQ自動化・有人チャット連携',
    ai: '△ シナリオ型（AI拡張は別オプション）',
    booking: '△ カレンダー連携は限定的',
    pricing: '公式サイト参照',
    japanese: '○ 日本語',
  },
  {
    name: 'HubSpot Chatflows',
    href: '/compare/hubspot-chatbot/',
    linkLabel: '詳細比較',
    type: 'シナリオ型＋生成AI（サポート）',
    purpose: 'CRM連動のチャット窓口・サポート',
    ai: '△ 本体はルールベース。AIは Breeze（サポート特化）',
    booking: '△ 予約リンク提示が基本（条件により予約ページへリダイレクト）',
    pricing: '公開（無料枠あり。AIは$0.50/解決の従量）',
    japanese: '○ 日本語ローカライズ',
  },
  {
    name: 'Intercom',
    href: '/compare/intercom/',
    linkLabel: '詳細比較',
    type: '生成AI型（サポート）',
    purpose: '既存顧客サポートの自動化',
    ai: '○ Fin（解決率67%公称・サポート特化）',
    booking: '△ 問い合わせ解決が中心（商談化特化ではない）',
    pricing: '公開（席料$29〜/月＋Fin $0.99/解決）',
    japanese: '△ 英語中心',
  },
]

const FAQ = [
  {
    q: 'BtoB向けAIチャットボットはどう選べばよいですか？',
    a: '「何を自動化したいか」で3分類から選ぶのが近道です。定型FAQの削減が目的なら低コストなシナリオ型、サポート問い合わせの自動解決が目的なら生成AI型、Webサイトからの商談獲得が目的なら商談予約まで完結するAI SDR型が適します。ツール単体の機能比較より先に、自社のKPI（問い合わせ削減か、商談数か）を確定させるのが失敗しない選び方です。',
  },
  {
    q: 'シナリオ型と生成AI型のチャットボットは何が違いますか？',
    a: 'シナリオ型は事前に設計した分岐・FAQ集の範囲で応答する方式で、低価格で定型質問に強い一方、想定外の質問に弱く、シナリオの設計・メンテナンス工数が継続的に発生します。生成AI型はLLMがナレッジを参照して自由文で応答するため、表現のゆらぎに強く、シナリオ設計の負荷が小さいのが利点です。ただし多くの生成AI型は「問い合わせ解決」を目的に設計されています。',
  },
  {
    q: '生成AI型チャットボット（Intercom・チャネルトーク等）で商談は増やせますか？',
    a: '一部は貢献しますが、主目的が異なります。Intercom の Fin やチャネルトークの ALF は問い合わせの自動解決（サポート・接客）に最適化されており、課金も「解決件数」ベースです。課題ヒアリング・資料提案・温度判定・商談予約への誘導といった営業アクションは中心スコープ外のため、商談獲得がKPIならAI SDR型を、サポート削減が目的なら生成AI型を選ぶのが適切です。',
  },
  {
    q: 'AI SDR型チャットボットとは何ですか？',
    a: '会話のゴールを「質問への回答」ではなく「商談機会の創出」に置いたAIチャットです。訪問者と対話しながら課題をヒアリングし、文脈に合う資料を提案し、温度が上がった瞬間にチャット内でカレンダーを提示して商談を確定します。Meeton Chat はこのタイプで、会話・興味・商談化結果を HubSpot / Salesforce に自動同期します。詳しい概念の違いは「AIチャットボット vs AI SDR」の解説ページをご覧ください。',
  },
  {
    q: '複数タイプの併用は有効ですか？',
    a: 'はい、役割が異なるため併用は合理的です。たとえば既存顧客のサポートは生成AI型（Intercom・チャネルトーク等）に任せ、新規リードの商談化はAI SDR型（Meeton Chat）が担当する構成です。1つのツールで両方を兼ねようとすると、どちらかのKPIが犠牲になりがちです。',
  },
]

const SOURCES = [
  {
    id: 1,
    text: 'Meeton ai 導入実績: 商談化率60%以上（EdulinX）、チャット経由リード20倍（BizteX）、月間SQL 2倍（G-gen）。料金は基本プラン15万円〜を公開（dynameet.ai/cases/, dynameet.ai/pricing/）',
  },
  {
    id: 2,
    text: 'チャネルトーク: 料金プラン（無料〜、Early Stage ¥3,600/月・Growth ¥9,600/月、Enterprise 要問い合わせ）と AIエージェント ALF の従量課金（AI自律解決 ¥50/件）（channel.io/jp/pricing, docs.channel.io、2026年7月時点）',
  },
  {
    id: 3,
    text: 'チャネルトーク: 日本法人は2015年1月設立、グローバル22万社超は自社公表値（prtimes.jp — Channel Corporation プレスリリース、2026年1月）',
  },
  {
    id: 4,
    text: 'HubSpot: Chatflows は無料CRMに含まれるルールベースBot＋ライブチャット。Breeze Customer Agent はサポート特化AIで2026年4月より成果報酬課金（解決1件=50クレジット≒$0.50）。Bot内予約はカスタム項目がある場合予約ページへリダイレクト（hubspot.com/pricing/service, knowledge.hubspot.com/chatflows, HubSpot company news）',
  },
  {
    id: 5,
    text: 'Intercom: AIエージェント Fin の解決率67%・累計4,000万件超は公称値。料金は席料$29〜132/seat/月＋Fin $0.99/解決（intercom.com/pricing, sacra.com/c/intercom）',
  },
  {
    id: 6,
    text: 'ChatPlus・anybot・sinclo: 各社公開情報および一般的な業界認識に基づく参考情報。最新の仕様・料金は各社公式サイトをご確認ください（詳細は各1:1比較ページ参照）',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: 'https://dynameet.ai/compare/ai-chatbot-tools/',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://dynameet.ai/' },
    { '@type': 'ListItem', position: 2, name: '比較', item: 'https://dynameet.ai/compare/chatbot-vs-ai-sdr/' },
    { '@type': 'ListItem', position: 3, name: 'BtoB向けAIチャットボット比較', item: 'https://dynameet.ai/compare/ai-chatbot-tools/' },
  ],
}

// table styles — CompareLP 準拠
const th: React.CSSProperties = { textAlign: 'left', padding: '13px 16px', fontWeight: 800, color: 'var(--heading)', borderBottom: '2px solid var(--border)', fontSize: 13.5, whiteSpace: 'nowrap' }
const td: React.CSSProperties = { padding: '13px 16px', color: 'var(--text)', borderBottom: '1px solid var(--border)', fontSize: 13.5, lineHeight: 1.7, verticalAlign: 'top' }

function Fn({ n }: { n: number }) {
  return (
    <sup style={{ fontSize: 10.5, lineHeight: 1 }}>
      <a href="#sources" style={{ color: 'var(--cta-ink)', textDecoration: 'none', fontWeight: 700 }}>[{n}]</a>
    </sup>
  )
}

const TYPE_CARDS = [
  {
    tag: 'シナリオ型',
    tools: 'ChatPlus / sinclo / anybot / HubSpot Chatflows',
    body: '事前に設計した分岐・FAQ集の範囲で応答する方式。低価格で定型質問の自動化に強く、FAQが整備済みの EC・toC サイトでは今も合理的な選択肢です。一方で想定外の質問に弱く、シナリオの設計・メンテナンス工数が継続的に発生します。会話から商談予約までをネイティブに完結する設計は一般的ではありません。',
  },
  {
    tag: '生成AI型',
    tools: 'チャネルトーク（ALF） / Intercom（Fin） / HubSpot（Breeze）',
    body: 'LLM がナレッジ（サイト・ドキュメント・FAQ）を参照して自由文で応答する方式。表現のゆらぎに強く、シナリオ設計の負荷が小さいのが利点です。ただし主目的は問い合わせの自動解決（サポート・接客）で、課金も「AIが解決した件数」ベースが主流。つまり「問い合わせを減らす」ために設計されており、「商談を増やす」ための能動的な営業会話は中心スコープ外です。',
  },
  {
    tag: 'AI SDR型',
    tools: 'Meeton Chat',
    body: '会話のゴールを「解決」ではなく「商談化」に置いた方式。課題ヒアリング → 文脈に合う資料提案 → 温度判定 → チャット内での商談予約確定までを AI が一気通貫で運び、会話・興味・商談化結果を CRM に自動同期します。BtoB で「Webサイトからの商談数」が KPI の場合に選ぶカテゴリです。',
  },
]

const VENDOR_DETAIL: { name: string; type: string; href: string; body: React.ReactNode }[] = [
  {
    name: 'Meeton Chat',
    type: 'AI SDR型',
    href: '/chat/',
    body: (
      <>
        BtoB 専用設計の AI SDR。訪問者の初動5秒で AI が会話を開始し、課題ヒアリング・資料提案・温度判定を経て、チャット内で商談予約まで完結します（Google Calendar / Teams / Zoom 連携）。会話・流入経路・興味・商談化結果は HubSpot / Salesforce に自動同期。導入は JS タグ1行・最短5分でシナリオ設計は不要、24時間365日稼働します。料金は基本プラン15万円〜を公開。導入企業では商談化率60%以上（EdulinX）、チャット経由リード20倍（BizteX）、月間SQL 2倍（G-gen）といった実績があります<Fn n={1} />。「Webサイトからの商談数」が KPI の BtoB 企業に向きます。
      </>
    ),
  },
  {
    name: 'チャネルトーク',
    type: '生成AI型（接客・CS）',
    href: '/compare/channel-talk/',
    body: (
      <>
        韓国 Channel Corporation 製のオールインワン AI メッセンジャー。日本法人は2015年設立で製品・サポートとも完全日本語ローカライズ、グローバル22万社超（自社公表）の導入規模を持ちます<Fn n={3} />。接客チャット・CRMマーケティング・社内チャットを統合し、AI エージェント「ALF」は AI が自律解決したチャット1件¥50の従量課金。料金は無料プランから公開されています（Early Stage ¥3,600/月〜、Enterprise は要問い合わせ）<Fn n={2} />。LINE・Instagram 連携など EC 向け機能が厚く、EC・toC の接客/CS 基盤としては有力な選択肢です。一方、商談予約専用の機能は公式資料では確認できず、BtoB の商談化が主目的の場合は設計思想が異なります。
      </>
    ),
  },
  {
    name: 'ChatPlus',
    type: 'シナリオ型（AI併用）',
    href: '/compare/meeton-vs-chatplus/',
    body: (
      <>
        低価格帯と国内の幅広い導入実績が強みのチャットボット<Fn n={6} />。シナリオが主軸で AI 応答は補助的な位置づけです。コーポレートサイトの FAQ 自動化や問い合わせ振り分けを低予算で始めたい場合に実利のある選択肢で、スモールスタートに向きます。商談予約は外部カレンダー連携が中心でチャット内ネイティブ完結ではなく、CRM 連携も Webhook / API 寄りの実装が中心のため、商談化が中心 KPI の場合は運用でカバーする部分が残ります。
      </>
    ),
  },
  {
    name: 'anybot',
    type: 'シナリオ型（LINE特化）',
    href: '/compare/meeton-vs-anybot/',
    body: (
      <>
        LINE 連携を強みとするチャットボットで、LINE 公式アカウント運用・toC キャンペーンの自動化に豊富なノウハウを持ちます<Fn n={6} />。クーポン配布・予約・問い合わせ対応を LINE エコシステム内で完結できる用途では本来の強みを発揮します。一方、BtoB の商談予約や Inside Sales 連携は中心スコープ外で、Web サイト起点の BtoB 商談化とは異なる市場のソリューションです。LINE が中核チャネルの toC 企業に向きます。
      </>
    ),
  },
  {
    name: 'sinclo',
    type: 'シナリオ型',
    href: '/compare/meeton-vs-sinclo/',
    body: (
      <>
        シナリオ型 Web 接客チャットの老舗で、FAQ 自動化や有人チャット連携で広く使われています<Fn n={6} />。FAQ 集が整備済みでシナリオ分岐により問い合わせの大半をカバーできるサイトでは、運用知見と価格帯が活きる合理的な選択肢です。分岐・条件・FAQ 集を設計し育て続ける運用が前提となり、AI 拡張は別オプションの位置づけ。多言語対応もシナリオの別途構築が基本です。
      </>
    ),
  },
  {
    name: 'HubSpot Chatflows',
    type: 'シナリオ型＋生成AI（サポート）',
    href: '/compare/hubspot-chatbot/',
    body: (
      <>
        HubSpot の無料 CRM に含まれるルールベースのボットビルダー＋ライブチャット。会話が HubSpot CRM のコンタクトタイムラインに自動記録されるネイティブ統合が最大の強みで、既に HubSpot を使っている企業なら追加コストほぼゼロで会話窓口を持てます<Fn n={4} />。AI 会話は別製品の Breeze Customer Agent（サポート特化・解決1件$0.50の成果報酬、2026年4月〜）が担い、商談化に特化した AI SDR エージェントではありません。ボット内のミーティング予約は予約リンクの提示が基本で、カスタム質問項目がある場合は予約ページへのリダイレクトが発生します<Fn n={4} />。
      </>
    ),
  },
  {
    name: 'Intercom',
    type: '生成AI型（サポート）',
    href: '/compare/intercom/',
    body: (
      <>
        AI エージェント「Fin」の問い合わせ解決率67%（公称・累計4,000万件超）を掲げる、カスタマーサポート特化の世界的プラットフォーム<Fn n={5} />。全チャネル統合やエンタープライズ要件への対応も強みで、既存顧客のサポート問い合わせを大量に自動解決したい場合の王道です。料金は席料$29〜132/seat/月＋Fin $0.99/解決の従量で公開<Fn n={5} />。英語中心のプロダクトであり、主目的は既存顧客のサポート自動化のため、新規リードの商談獲得とは解く課題が異なります。
      </>
    ),
  },
]

const CHOOSING = [
  {
    title: 'FAQ・サポート負荷の削減が目的',
    body: '生成AI型が第一候補。既存顧客サポートの規模が大きいなら Intercom（Fin）、日本語のEC・接客中心ならチャネルトーク（ALF）。HubSpot 利用企業なら Breeze Customer Agent も選択肢です。',
  },
  {
    title: '低予算で定型問い合わせを自動化したい',
    body: 'シナリオ型が現実的。FAQ が整備済みなら ChatPlus や sinclo、LINE 公式アカウントが中核チャネルなら anybot。HubSpot CRM を既に使っているなら、無料の Chatflows から試すのも合理的です。',
  },
  {
    title: 'BtoBの商談獲得がKPI',
    body: 'AI SDR型。FAQ 応答ではなく「課題ヒアリング → 資料提案 → 商談予約 → CRM 同期」まで運ぶ設計が必要です。Meeton Chat は初動5秒・24時間365日で商談化に振り切っています。',
  },
  {
    title: '併用という選択肢',
    body: 'サポートは生成AI型、新規リードの商談化は AI SDR型、という分担は実際に有効です。1つのツールで「問い合わせ削減」と「商談増」を兼ねると、どちらかの KPI が犠牲になりがちです。',
  },
]

export default function AiChatbotToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Nav />
      <main>
        {/* Hero + AEO定義文 */}
        <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 60 }}>
          <div style={{ maxWidth: 860 }}>
            <Eyebrow tone="dark">比較 — BtoB AIチャットボット</Eyebrow>
            <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(28px,4.6vw,46px)', lineHeight: 1.25, fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--on-navy)', margin: '20px 0 0' }}>
              BtoB向けAIチャットボット比較
              <br />
              シナリオ型・生成AI型・AI SDR型の選び方
            </h1>
            {/* 結論 — self-contained answer for AEO passage extraction */}
            <div style={{ background: 'var(--navy-2)', border: '1px solid var(--on-navy-border)', borderRadius: 14, padding: '18px 20px', margin: '24px 0 28px' }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 700, color: 'var(--cta)', marginBottom: 8 }}>結論</div>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--on-navy)', margin: 0 }}>
                BtoB向けAIチャットボットは「シナリオ型」「生成AI型」「AI SDR型」の3タイプに大別されます。FAQ削減が目的ならシナリオ型・生成AI型、商談獲得が目的なら商談予約まで完結するAI SDR型が適します。本ページでは7ツールを公開情報に基づき公正に比較します。
              </p>
            </div>
            <CTAButtons source="compare-ai-chatbot-tools-hero" tone="onNavy" size="lg" primaryLabel="自社に合う構成を相談する" />
            <div style={{ marginTop: 14 }}>
              <a href="#table" className="v2-link" style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--cta)', textDecoration: 'underline' }}>
                比較表をすぐ見る →
              </a>
            </div>
          </div>
        </Section>

        {/* 比較の観点 */}
        <Section tone="white" py={64}>
          <SectionHead
            eyebrow="比較の観点"
            title="「AIチャットボット」という一語に、3つの別物が混ざっている"
            lede="チャットボット選定が失敗する最大の原因は、目的の異なるツールを同じ土俵で比べることです。本ページでは、応答方式と会話のゴールをもとに7ツールを「分類」「主目的」「AI会話」「商談予約」「料金公開」「日本語対応」の6項目で整理しました。概念レベルの違いは、姉妹ページの「AIチャットボット vs AI SDR」で詳しく解説しています。"
          />
          <Link href="/compare/chatbot-vs-ai-sdr/" style={{ color: 'var(--cta-ink)', fontWeight: 700, textDecoration: 'underline', fontSize: 14.5 }}>
            AIチャットボット vs AI SDR｜FAQ応答と商談機会創出の違い →
          </Link>
        </Section>

        {/* 比較表 */}
        <Section tone="surface" id="table">
          <SectionHead eyebrow="比較表" title="BtoB向けAIチャットボット 7ツール比較" />
          <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 16, background: 'var(--bg)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 960 }}>
              <thead>
                <tr>
                  <th style={th}>ツール</th>
                  <th style={th}>分類</th>
                  <th style={th}>主目的</th>
                  <th style={th}>AI会話</th>
                  <th style={th}>商談予約</th>
                  <th style={th}>料金公開</th>
                  <th style={th}>日本語対応</th>
                </tr>
              </thead>
              <tbody>
                {VENDORS.map((v) => (
                  <tr key={v.name}>
                    <td style={{ ...td, fontWeight: 700, color: 'var(--heading)', whiteSpace: 'nowrap', background: v.highlight ? 'var(--cta-wash)' : undefined }}>
                      <Link href={v.href} style={{ color: v.highlight ? 'var(--cta-ink)' : 'var(--heading)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                        {v.name}
                      </Link>
                    </td>
                    <td style={{ ...td, whiteSpace: 'nowrap', background: v.highlight ? 'var(--cta-wash)' : undefined, fontWeight: v.highlight ? 700 : 400 }}>{v.type}</td>
                    <td style={{ ...td, background: v.highlight ? 'var(--cta-wash)' : undefined }}>{v.purpose}</td>
                    <td style={{ ...td, background: v.highlight ? 'var(--cta-wash)' : undefined }}>{v.ai}</td>
                    <td style={{ ...td, background: v.highlight ? 'var(--cta-wash)' : undefined }}>{v.booking}</td>
                    <td style={{ ...td, background: v.highlight ? 'var(--cta-wash)' : undefined }}>{v.pricing}</td>
                    <td style={{ ...td, background: v.highlight ? 'var(--cta-wash)' : undefined }}>{v.japanese}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: 'var(--sub)', marginTop: 12 }}>
            ※ 各社の情報は公開情報に基づく参考です（2026年7月時点）。「公式サイト参照」は本ページ作成時点で確認できた公開価格情報がないことを示します。最新の仕様・料金は各社公式サイトをご確認ください。ツール名のリンク先で1対1の詳細比較を掲載しています。
          </p>
        </Section>

        {/* 3分類解説 */}
        <Section tone="white">
          <SectionHead
            eyebrow="3つの分類"
            title="シナリオ型 / 生成AI型 / AI SDR型 — 何が違うのか"
            lede="応答の仕組み（シナリオか、LLMか）と、会話のゴール（解決か、商談化か）の2軸で分けると、7ツールは次の3タイプに整理できます。"
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {TYPE_CARDS.map((t) => (
              <Card key={t.tag}>
                <div style={{ fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 800, letterSpacing: '.06em', color: 'var(--cta-ink)', marginBottom: 10 }}>{t.tag}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--heading)', marginBottom: 10 }}>{t.tools}</div>
                <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--text)', margin: 0 }}>{t.body}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* 各ベンダー解説 */}
        <Section tone="surface">
          <SectionHead
            eyebrow="各ツールの詳細"
            title="7ツールの強みと、向いている用途"
            lede="どのツールにも「それが正解になる状況」があります。各ツールの強みと適した用途を、公開情報に基づいて公正に整理します。"
          />
          <div style={{ display: 'grid', gap: 16 }}>
            {VENDOR_DETAIL.map((v) => (
              <Card key={v.name}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--heading)', margin: 0 }}>{v.name}</h3>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 700, color: 'var(--cta-ink)' }}>{v.type}</span>
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.9, color: 'var(--text)', margin: '0 0 12px' }}>{v.body}</p>
                <Link href={v.href} style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--cta-ink)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                  {v.name === 'Meeton Chat' ? 'Meeton Chat の製品詳細 →' : `${v.name} との詳細比較 →`}
                </Link>
              </Card>
            ))}
          </div>
        </Section>

        {/* 選び方 */}
        <Section tone="white">
          <SectionHead
            eyebrow="選び方"
            title="目的から逆算する、4つの選び方"
            lede="機能一覧の突き合わせではなく、自社のKPIから逆算するのが確実です。"
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {CHOOSING.map((c) => (
              <Card key={c.title}>
                <h3 style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 16, fontWeight: 800, color: 'var(--heading)', margin: '0 0 10px' }}>
                  <Check size={18} /> {c.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--text)', margin: 0 }}>{c.body}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section tone="surface">
          <SectionHead eyebrow="よくある質問" title="FAQ" align="center" />
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gap: 14 }}>
            {FAQ.map((f) => (
              <Card key={f.q}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--heading)', margin: '0 0 8px' }}>{f.q}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text)', margin: 0 }}>{f.a}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* Sources */}
        <Section tone="white" py={48} id="sources">
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--sub)', marginBottom: 10 }}>参考・出典</div>
            <ol style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 6 }}>
              {SOURCES.map((s) => (
                <li key={s.id} style={{ fontSize: 12, color: 'var(--sub)', lineHeight: 1.6 }}>{s.text}</li>
              ))}
            </ol>
          </div>
        </Section>

        {/* Final CTA */}
        <Section tone="navyDeep" py={68}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(24px,3.6vw,34px)', fontWeight: 800, color: 'var(--on-navy)', margin: '0 0 14px', letterSpacing: '-0.02em' }}>
              商談獲得が目的なら、AI SDR型を。
            </h2>
            <p style={{ fontSize: 15, color: 'var(--on-navy-sub)', margin: '0 0 26px', lineHeight: 1.9 }}>
              30分のデモで、Meeton Chat が自社サイトでどう商談を生むかを具体的に確認できます。FAQ削減が目的の場合は、本ページの分類を参考に最適なツールをお選びください。
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CTAButtons source="compare-ai-chatbot-tools-footer" tone="onNavy" size="lg" align="center" />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
