import type { Metadata } from 'next'
import { getAllPosts } from '@/app/lib/notion'
import PillarPage, { type PillarFaq, type PillarStage } from '../components/PillarPage'
import { buildClusterGroups } from '../components/cluster'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'クッキーレス時代の B2B マーケティング戦略 | 1st party data・計測・AI 接客の再設計',
  description:
    'サードパーティクッキーの廃止が B2B マーケティングに与える影響と、1st party data 中心の計測・ナーチャリング・AI 接客への移行戦略を体系化。Meeton ai が解説するクッキーレス Pillar Guide。',
  alternates: { canonical: '/pillar/cookieless-marketing/' },
  openGraph: {
    title: 'クッキーレス時代の B2B マーケティング戦略',
    description:
      '1st party data・計測再設計・AI 接客への移行を、現場運用視点で解説。',
    url: 'https://dynameet.ai/pillar/cookieless-marketing/',
    siteName: 'Meeton ai',
    locale: 'ja_JP',
    type: 'article',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

const FAQ: PillarFaq[] = [
  {
    question: 'クッキーレスマーケティングとは何ですか？',
    answer:
      'クッキーレスマーケティングとは、サードパーティクッキー（他社ドメインが発行する識別子）に依存せず、自社が直接取得する 1st party data や、コンテキストベース広告・コホート IDなどの代替シグナルを基に行うマーケティング活動の総称です。Apple Safari と Mozilla Firefox は既にデフォルトで 3rd party cookie をブロックしており、Google Chrome も段階的な廃止プロセスを公表しています。',
  },
  {
    question: 'なぜサードパーティクッキーは廃止されるのですか？',
    answer:
      '主な背景はプライバシー保護とブラウザ間競争です。GDPR（EU）・CCPA / CPRA（カリフォルニア）・改正個人情報保護法（日本）などの規制強化に加え、ユーザーがトラッキングを嫌うトレンド、Apple が ITP（Intelligent Tracking Prevention）を導入してプライバシーを差別化軸にした流れが重なっています。',
  },
  {
    question: '日本の改正個人情報保護法はクッキーをどう扱いますか？',
    answer:
      '2022 年施行の改正法では、Cookie などの識別子を「個人関連情報」と位置付け、第三者提供時に本人同意の確認が必要となるケースが規定されました。実務上は、サイトでクッキー同意バナーを提示し、目的別オプトインを取る運用が一般化しています。',
  },
  {
    question: 'B2B マーケに具体的にどう影響しますか？',
    answer:
      '主に 3 領域に影響します。（1）リターゲティング広告の母集団が縮小し効率が落ちる、（2）GA4 などのアトリビューションでクロスドメイン計測精度が低下する、（3）MA ツールの匿名訪問者トラッキングが弱体化する、です。これらの代替として、自社サイト内の行動ログ・チャット会話・フォーム送信内容といった 1st party data 中心の設計に重心が移っています。',
  },
  {
    question: '1st party data とは具体的に何ですか？',
    answer:
      '1st party data とは、自社が直接取得し管理するデータです。Web サイト訪問・滞在時間・ページ閲覧履歴、フォーム入力情報、チャットやメールでの会話内容、CRM 上の商談・取引履歴などが該当します。これらは自社ドメイン内で発生するため、サードパーティクッキー廃止の影響を受けません。',
  },
  {
    question: 'AI チャットはクッキーレス対応で何が違いますか？',
    answer:
      'AI チャットは、訪問者との会話を通じて関心領域・課題・購買フェーズを「会話データ」として取得します。これはクッキー識別子に依存せず、訪問者が自発的に提供する 1st party data であるため、規制環境の変化に強い構造です。Meeton Live もこの設計を採用しています。',
  },
  {
    question: 'CV 計測はどう変わりますか？',
    answer:
      'クライアントサイドのピクセル計測（gtag、Meta Pixel など）は引き続き動きますが、3rd party cookie 経由のクロスドメイン補完が弱体化します。代替として、サーバーサイド計測（Conversions API、Enhanced Conversions）と CRM 連携（HubSpot・Salesforce）による Lifecycle ベースのアトリビューションへ移行する動きが進んでいます。',
  },
  {
    question: 'Meeton ai はクッキーレス環境でどう機能しますか？',
    answer:
      'Meeton ai は、訪問者の会話履歴・フォーム入力・滞在ページといった 1st party data を起点に動作します。サードパーティクッキーに依存しないため、Chrome での廃止が進んでも機能性は影響を受けません。むしろ、計測精度が下がる広告 / リターゲティングを補完する「サイト内 CV エンジン」として位置付けられます。',
  },
]

const STAGES: PillarStage[] = [
  {
    num: '01',
    label: 'First-party identification',
    title: 'サイト内で訪問者を識別する設計',
    body: 'チャット会話・フォーム入力・ログインなどを通じて、訪問者を 1st party の文脈で識別します。Cookie に頼らずユーザー ID を取得することで、規制やブラウザ変化に依存しない計測基盤を作るのが出発点です。',
    link: { href: '/features/ai-chat/', label: 'AI チャットで識別する例' },
  },
  {
    num: '02',
    label: 'AI-driven engagement',
    title: 'AI による文脈接客で再訪率を高める',
    body: 'リターゲティング広告の補完として、サイト内で訪問者の意図に応じたコンテンツ提示と会話を AI が行います。匿名訪問者であっても、行動ログをもとに「再訪時に最適化された接客」を返す設計が、クッキーレス時代の主要戦術になります。',
    link: { href: '/features/ai-library/', label: 'AI ライブラリの詳細' },
  },
  {
    num: '03',
    label: 'Content as conversion engine',
    title: 'コンテンツを CV エンジンとして設計',
    body: 'ホワイトペーパー DL・無料ウェビナー・ナレッジベースなど、訪問者が能動的に情報提供する瞬間を増やします。広告主導の獲得から、コンテンツ主導の獲得へ重心を移すと、ファネル全体がクッキー非依存になります。',
    link: { href: '/webinar/', label: '無料ウェビナー例' },
  },
  {
    num: '04',
    label: 'Server-side measurement',
    title: 'サーバーサイド計測とインテントシグナル',
    body: 'Conversions API、Enhanced Conversions、CRM 連携によるサーバーサイド計測でアトリビューションを再構築します。さらに、検索行動・SaaS レビューサイト閲覧などのインテントシグナルを取り込み、確度の高いリードを能動的に検知する設計が進んでいます。',
  },
  {
    num: '05',
    label: 'AI SDR closes the loop',
    title: 'AI SDR で初動から商談化まで一気通貫',
    body: '1st party で取得した会話データを元に、AI SDR がそのまま商談予約まで完結させます。Cookie が消えても、訪問者本人とのコンタクト情報が会話の中で取得されているため、商談化までのデータが途切れません。',
    link: { href: '/features/meetings/', label: 'AI カレンダーの詳細' },
  },
]

const CLUSTER_SPEC = [
  {
    label: 'クッキーレス / プライバシー',
    keywords: [
      'クッキー',
      'cookie',
      'クッキーレス',
      'cookieless',
      'プライバシー',
      '個人情報保護',
      'gdpr',
      'ccpa',
      'itp',
    ],
  },
  {
    label: '1st party data・計測',
    keywords: [
      '1st party',
      'ファーストパーティ',
      'first party',
      'アトリビューション',
      '計測',
      'コンバージョン api',
      'ga4',
      'attribution',
    ],
  },
  {
    label: 'AI 接客・チャットによる代替',
    keywords: [
      'ai チャット',
      'aiチャット',
      'チャットボット',
      'web 接客',
      'web接客',
      'パーソナライズ',
    ],
  },
]

export default async function CookielessPillarPage() {
  const posts = await getAllPosts()
  const { groups, total } = buildClusterGroups(posts, CLUSTER_SPEC)

  return (
    <PillarPage
      slug="cookieless-marketing"
      kicker="Pillar / Cookieless"
      heroTitle={
        <>
          クッキーレス時代の<br />
          <em>B2B マーケティング戦略</em>
        </>
      }
      heroSub="サードパーティクッキー廃止は、B2B のリターゲティング・アトリビューション・MA 計測に直撃します。1st party data を起点に、AI 接客と AI SDR で CV をサイト内に閉じ込める設計を解説します。"
      headTerms={[
        'クッキーレス マーケティング',
        'Cookieレス 対応',
        'サードパーティクッキー 廃止',
        '1st party data',
        'ファーストパーティデータ',
      ]}
      tldrTitle="クッキーレスマーケティングとは"
      tldrBody="クッキーレスマーケティングは、サードパーティクッキー（他社ドメインが発行する識別子）に依存せず、自社が直接取得する 1st party data や、コンテキストベース広告・サーバーサイド計測などの代替シグナルでマーケティングを設計する手法です。Safari と Firefox は既に 3rd party cookie をデフォルトでブロックしており、Google Chrome も段階的な廃止プロセスを表明しています。B2B では、リターゲティング広告の母集団縮小、GA4 のクロスドメイン計測精度の低下、MA の匿名訪問者トラッキング弱体化という 3 つの直接的影響が出ます。対応の主軸は、Web サイト内の行動ログ・チャット会話・フォーム送信といった 1st party data を中心に CV を再定義し、AI SDR で初動 → 商談化までをサイト内に閉じる設計です。"
      whyMatters={[
        {
          title: 'Safari / Firefox は既に 3rd party cookie を遮断済み',
          body: 'Apple ITP と Mozilla ETP により、業界一般に PC トラフィックの 30〜40% は既にクッキーレス環境で動いています。Chrome の廃止プロセスは「最後の段差」に過ぎません。',
        },
        {
          title: '日本の規制も無視できない',
          body: '改正個人情報保護法では、Cookie 等の識別子を「個人関連情報」と位置付け、第三者提供に同意確認が必要なケースが規定されています。同意取得 UX の設計が前提条件になりました。',
        },
        {
          title: '1st party data の質が、競合優位の源泉になる',
          body: 'クッキーが消えても、自社サイト内で発生する会話・行動・取引データは残ります。これらをどれだけ深く取得し、AI で活用できるかが、業界内の競争差を生みます。',
        },
      ]}
      stagesHeading="クッキーレス時代の B2B マーケ 5 戦略"
      stagesIntro="リターゲティング依存から脱却する基本構造は下記の通りです。広告と計測だけを差し替えるのではなく、サイト内の会話と CV エンジンを再設計するアプローチが、業界一般で再現性が高い形です。"
      stages={STAGES}
      approachHeading="Meeton ai のクッキーレス対応設計"
      approachIntro="Meeton ai は元々、訪問者との会話・サイト内行動・CRM データを起点に動作する 1st party 中心設計です。サードパーティクッキー廃止の影響を受けずに、CV と商談化を最大化します。"
      approachItems={[
        {
          title: 'AI チャットで匿名訪問者を会話に変換',
          body: 'Cookie に依存せず、ページ閲覧と意図に応じて訪問者に話しかけ、会話の中で関心と連絡先を取得します。広告リターゲティングが効きにくい環境でも CV を生み続ける構造です。',
          href: '/features/ai-chat/',
          cta: 'Meeton Live を見る',
        },
        {
          title: 'AI ライブラリで再訪者のナーチャリング',
          body: '過去の会話と関心トピックに基づき、再訪したリードへパーソナライズされたコンテンツを提示します。3rd party cookie 不要のサイト内ナーチャリング層を担います。',
          href: '/features/ai-library/',
          cta: 'Meeton Library を見る',
        },
        {
          title: 'CRM 連携で 1st party ライフサイクル計測',
          body: 'HubSpot・Salesforce とネイティブ連携し、サーバーサイドで Contact → MQL → SQL → Customer の遷移を追跡。クッキー計測に頼らないアトリビューションを構築します。',
          href: '/integrations/',
          cta: '連携一覧を見る',
        },
        {
          title: 'AI メールで問い合わせを即商談化',
          body: 'クッキーが消えても、メールアドレスは残ります。受信メールに AI が即返信し、商談予約まで完結。リターゲティング広告に頼らない「Inbound 一点突破」が機能します。',
          href: '/features/ai-email/',
          cta: 'Meeton Email を見る',
        },
      ]}
      clusterHeading="クッキーレス関連記事"
      clusterIntro="クッキーレス・プライバシー・1st party data・AI 接客に該当する記事を自動で集約しています。テーマ自体が新しいため記事数は限定的ですが、今後追加予定の記事もあります。"
      clusterGroups={groups}
      clusterCount={total}
      faqHeading="クッキーレスに関するよくある質問"
      faq={FAQ}
      ctaHeading={
        <>
          クッキーが消えても、<br />
          <em>商談は止めない</em>。
        </>
      }
      ctaBody="サードパーティクッキー廃止後の B2B マーケに、AI SDR がどう効くか。30 分のデモで、自社の計測・接客・CV 構造に当てて検証できます。"
      utmCampaign="pillar-cookieless"
    />
  )
}
