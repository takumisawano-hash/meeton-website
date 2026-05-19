import type { Metadata } from 'next'
import { getAllPosts } from '@/app/lib/notion'
import PillarPage, { type PillarFaq, type PillarStage } from '../components/PillarPage'
import { buildClusterGroups } from '../components/cluster'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'B2B リードジェネレーション完全ガイド | AI 時代の戦略・5ステージ・運用設計',
  description:
    'B2B リードジェネレーションとは何か、5つの段階（認知 → エンゲージメント → リード獲得 → ナーチャリング → 商談化）と AI SDR の役割を、現場運用の視点で解説。Meeton ai が監修する実務向け Pillar Guide。',
  alternates: { canonical: '/pillar/lead-generation/' },
  openGraph: {
    title: 'B2B リードジェネレーション完全ガイド',
    description:
      '5ステージ・AI SDR の役割・運用設計を一気通貫で。関連記事 20+ にリンク。',
    url: 'https://dynameet.ai/pillar/lead-generation/',
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
    question: 'B2B リードジェネレーションとは何ですか？',
    answer:
      'B2B リードジェネレーションとは、自社の製品やサービスに関心を持つ可能性のある法人見込み客（リード）を獲得し、商談化までの導線を設計する一連のマーケティング活動を指します。広告・コンテンツ・SEO・ウェビナー・展示会・アウトバウンドなど複数チャネルで興味を喚起し、ランディングページやチャットでコンタクト情報を取得、その後 MA / CRM でナーチャリングして営業に引き渡すまでが含まれます。',
  },
  {
    question: 'インバウンドとアウトバウンドの違いは何ですか？',
    answer:
      'インバウンドは、SEO・コンテンツ・SNS・広告などを通じて見込み客側から問い合わせや資料請求が発生する形のリード獲得です。一方アウトバウンドは、テレアポ・メール送信・LinkedIn DM などで自社から接触を試みる形を指します。多くの B2B 企業はこの 2 つを併用し、案件の質を担保しつつボリュームを補完しています。',
  },
  {
    question: 'AI SDR は従来の SDR と何が違いますか？',
    answer:
      '従来の SDR（インサイドセールス）は人手でメール送信・初回ヒアリング・商談設定を行いますが、AI SDR は AI が会話・メール返信・スケジュール調整を自動化します。業界一般に初動対応時間は 5 秒以内まで短縮可能で、人的リソースを高付加価値な商談クロージングに集中させられる構造になります。Meeton ai もこの AI SDR カテゴリに含まれます。',
  },
  {
    question: 'リードジェンの KPI として何を見るべきですか？',
    answer:
      'リード数（MQL）・商談化数（SQL）・受注数・CAC（顧客獲得単価）・LTV / CAC を中心に置きます。さらに ICP マッチ率・初動対応時間・チャネル別 CV 率・パイプライン金額を併走させると、量と質の両軸が見えるようになります。重要なのは「リード数」だけで意思決定しないことです。',
  },
  {
    question: '小さなマーケティングチームでも始められますか？',
    answer:
      'はい。多くの場合、最初は 1 つのチャネル（オーガニック検索 + ブログ、または LinkedIn 広告 + 資料 DL）に絞り、AI SDR でフォロー工数を吸収する構成が再現性高く動きます。リソースが限られているほど、商談獲得までの工程を圧縮できる AI の費用対効果は高くなります。',
  },
  {
    question: 'リード獲得から商談化までの一般的なコンバージョン率は？',
    answer:
      '業界一般に、Webサイト訪問 → リード獲得は 1〜3%、リード → 商談化は 5〜15% 程度がベンチマークとして語られます。ただし業種・購買単価・ICP 適合度によって大きく振れるため、自社の過去データを基準にした改善幅で評価することを推奨します。',
  },
  {
    question: 'クッキー規制はリードジェンにどう影響しますか？',
    answer:
      'サードパーティクッキー廃止により、リターゲティング広告や訪問者ベースのアトリビューションが弱体化しています。これに対応するため、1st party data（自社サイトでの行動データ・チャット会話履歴・フォーム送信内容）を中心とした計測・育成設計が主流になりつつあります。',
  },
  {
    question: 'Meeton ai はリードジェンのどの段階を支援しますか？',
    answer:
      'Meeton ai は主に「リード獲得」「ナーチャリング」「商談化」の 3 段階を AI で自動化します。Meeton Live がチャットでリードを捕捉し、Meeton Email が問い合わせメールに即返信、Meeton Library が再訪者にコンテンツを提示してナーチャリングし、Meeton Calendar が商談化までの予定調整を完結させます。',
  },
]

const STAGES: PillarStage[] = [
  {
    num: '01',
    label: 'Awareness',
    title: '認知 — ターゲットに見つけてもらう',
    body: '対象 ICP が自社カテゴリやペインで検索した時に、自社が「答えの選択肢」として現れる状態を作る段階です。SEO（オーガニック検索）、コンテンツマーケティング、SNS、業界メディア寄稿、ペイド広告（Google・LinkedIn・Meta）が主な手段になります。多くの場合、ここで認知を取り損ねると以降の段階の絶対値が伸びません。',
  },
  {
    num: '02',
    label: 'Engagement',
    title: 'エンゲージメント — 関心を継続させる',
    body: 'ランディングページ・ブログ・ホワイトペーパー・動画・無料ウェビナーなどで、訪問者の課題解決に貢献するコンテンツを提供し、「自社に解像度高く知ってもらう」段階です。ここで滞在時間・ページ回遊・再訪が増えるかが、後続の CV 率を大きく左右します。',
    link: { href: '/webinar/', label: '無料ウェビナーを見る' },
  },
  {
    num: '03',
    label: 'Lead capture',
    title: 'リード獲得 — コンタクト情報を取得する',
    body: 'フォーム・チャット・資料 DL・ウェビナー登録などで、訪問者が「名前 + 会社 + 連絡先 + 関心領域」を提供してくれる瞬間を設計する段階です。フォームを長くするほど数は減り、短くするほど質は下がるトレードオフがあります。AI チャットは会話の流れの中で情報を分割取得できるため、フォーム完了率の低下を回避しやすい構造です。',
    link: { href: '/features/ai-chat/', label: 'Meeton Live を見る' },
  },
  {
    num: '04',
    label: 'Nurture',
    title: 'ナーチャリング — 関心の温度を上げる',
    body: '獲得したリードがすぐに商談に進むケースは限定的で、多くは数週間〜数ヶ月の検討期間を挟みます。この期間に MA（マーケティングオートメーション）でメール配信、AI ライブラリで関連コンテンツをレコメンド、再訪時にチャットがコンテキストを思い出して接客する設計が、ROI の改善に直結します。',
    link: { href: '/features/ai-library/', label: 'Meeton Library を見る' },
  },
  {
    num: '05',
    label: 'Conversion',
    title: '商談化 — 営業に繋ぐ',
    body: '十分にナーチャリングされたリードを、確度の高い商談として営業に引き渡す段階です。SDR（インサイドセールス）が初回ヒアリングを行いカレンダーを押さえる従来モデルから、AI SDR が会話の中で直接商談を予約する 24/7 モデルへの移行が、業界一般で加速しています。',
    link: { href: '/features/meetings/', label: 'Meeton Calendar を見る' },
  },
]

const CLUSTER_SPEC = [
  {
    label: 'リード獲得・ジェネレーション基礎',
    keywords: [
      'リードジェネレーション',
      'リードジェン',
      'リード獲得',
      'lead generation',
      'leadgen',
      'btob リード',
      'b2b リード',
      'リード数',
    ],
  },
  {
    label: 'インサイドセールス・SDR',
    keywords: [
      'インサイドセールス',
      'sdr',
      'bdr',
      '商談化',
      '営業 dx',
      '初動',
    ],
  },
  {
    label: 'ナーチャリング・MA',
    keywords: [
      'ナーチャリング',
      'マーケティングオートメーション',
      'ma ',
      ' ma',
      'メールマーケ',
      'リード育成',
    ],
  },
  {
    label: 'AI SDR・チャットボット運用',
    keywords: [
      'aisdr',
      'ai sdr',
      'ai チャット',
      'aiチャット',
      'チャットボット',
      'web 接客',
      'web接客',
      'コンバージョン',
    ],
  },
  {
    label: 'ABM・ICP 設計',
    keywords: ['abm', 'icp', 'ターゲットアカウント', 'アカウントベース'],
  },
]

export default async function LeadGenerationPillarPage() {
  const posts = await getAllPosts()
  const { groups, total } = buildClusterGroups(posts, CLUSTER_SPEC)

  return (
    <PillarPage
      slug="lead-generation"
      kicker="Pillar / Lead Generation"
      heroTitle={
        <>
          B2B リードジェネレーションの<br />
          <em>完全ガイド</em>
        </>
      }
      heroSub="認知から商談化までの 5 段階を、Web チャネル・インサイドセールス・AI SDR の現場目線で再構築。リード数だけで戦わない、ICP 適合と商談化率で勝つためのリードジェン戦略を体系化します。"
      headTerms={[
        'B2B リードジェネレーション',
        'BtoB リード獲得',
        'AI リード獲得',
        'リードジェン 戦略',
        'インサイドセールス',
      ]}
      tldrTitle="B2B リードジェネレーションとは"
      tldrBody="B2B リードジェネレーションは、法人見込み客（リード）を獲得し、商談化までの導線を意図的に設計するマーケティング活動です。SEO・広告・コンテンツ・ウェビナーといった「認知」、ランディングページや AI チャットを介した「エンゲージメント」「リード獲得」、MA とコンテンツによる「ナーチャリング」、そして AI SDR や人手 SDR による「商談化」の 5 段階に分解できます。サードパーティクッキーの廃止と AI SDR の普及によって、訪問者の行動データ（1st party data）を起点に、初動 5 秒・24/7 で商談を予約する運用が業界一般に広がっています。Meeton ai はこの 5 段階のうち「リード獲得」「ナーチャリング」「商談化」を一気通貫で AI が担う構造を採用しています。"
      whyMatters={[
        {
          title: 'ICP が解像度高くなるほど、量だけの KPI では戦えない',
          body: 'リード数だけを追うと、商談化しないノイズが MQL に混入します。ICP 適合・ファーモグラフィック（業種・規模・役職）でフィルタする設計が前提になります。',
        },
        {
          title: '初動対応時間は商談化率に直接影響する',
          body: '業界一般に「5 分以内の初動」がコンバージョン率を大きく押し上げると言われます。AI SDR を使うと、この時間を実質的に 5 秒近くまで圧縮できます。',
        },
        {
          title: 'クッキーレス時代、計測は 1st party 中心へ',
          body: 'リターゲティングや訪問者アトリビューションの精度が低下しています。チャット・フォーム・会話履歴といった 1st party data を起点に、CV を再定義する必要があります。',
        },
      ]}
      stagesHeading="リードジェネレーションの 5 段階"
      stagesIntro="どのチャネルから入ろうと、B2B のリードジェンは下記 5 段階を必ず通ります。各段階で「何を測るか」「どの記事を当てるか」「どこに AI を入れるか」をセットで設計するのが推奨アプローチです。"
      stages={STAGES}
      approachHeading="Meeton ai が担う 3 つの工程"
      approachIntro="Meeton ai は AI SDR プラットフォームとして、5 段階のうち特にリード獲得以降の 3 段階を AI で自動化します。既存の MA / CRM と並行運用できる構造です。"
      approachItems={[
        {
          title: 'Meeton Live — AI チャットでリードを捕捉',
          body: '訪問者の意図を AI が理解し、フォーム送信ではなく自然な会話の中でコンタクト情報と商談ニーズを取得します。シナリオ型チャットボットとの最大の差分はこの「意図理解」です。',
          href: '/features/ai-chat/',
          cta: 'AI チャットの詳細',
        },
        {
          title: 'Meeton Email — 受信メールに即時 AI 返信',
          body: '問い合わせフォーム経由のメールに、AI が文脈を理解した上で返信し、商談予約まで完結させます。SDR の初動対応工数を構造的にゼロ化する設計です。',
          href: '/features/ai-email/',
          cta: 'AI メールの詳細',
        },
        {
          title: 'Meeton Library — 再訪リードのナーチャリング',
          body: '過去の会話履歴と関心トピックを基に、再訪したリードへ最適なコンテンツを提示します。MA メールに代わる、Web 上での 1st party ナーチャリング層を担います。',
          href: '/features/ai-library/',
          cta: 'AI ライブラリの詳細',
        },
        {
          title: 'Meeton Calendar — 商談を 24/7 で予約',
          body: 'Google Calendar / Microsoft 365 / Zoom と連携し、SDR が起きていない時間帯でも商談予約を完結させます。AI チャット / メールから直接時間枠を提示できます。',
          href: '/features/meetings/',
          cta: 'AI カレンダーの詳細',
        },
      ]}
      clusterHeading="リードジェネレーション関連記事"
      clusterIntro="Notion で公開済みの記事のうち、リードジェン・インサイドセールス・AI SDR・ABM・ナーチャリングに該当するものを自動で集約しています。今後追加予定の記事もあります。"
      clusterGroups={groups}
      clusterCount={total}
      faqHeading="リードジェンに関するよくある質問"
      faq={FAQ}
      ctaHeading={
        <>
          リード数ではなく、<br />
          <em>商談化率</em>で勝つ。
        </>
      }
      ctaBody="リードジェネレーションの 5 段階のうち、3 段階を AI で自動化したら何が変わるのか。30 分のデモで、自社のチャネル構成にどう効くかを具体的に検証できます。"
      utmCampaign="pillar-leadgen"
    />
  )
}
