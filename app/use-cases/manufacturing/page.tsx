import type { Metadata } from 'next'
import UseCasePageClient from '../UseCasePageClient'

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/use-cases/manufacturing/'

export const metadata: Metadata = {
  title: '製造業向け AI SDR — 技術問い合わせを商談化 | Meeton ai',
  description:
    '製造業の AI SDR。技術スペック・見積依頼・サンプル相談など、専門性の高いBtoB問い合わせを AI が一次対応し、有望リードのみを技術IS / 営業に引き継ぎます。',
  alternates: { canonical: '/use-cases/manufacturing/' },
  openGraph: {
    title: '製造業向け AI SDR — 技術問い合わせを商談化 | Meeton ai',
    description: '製造業の長期・高単価営業に AI SDR を。技術問い合わせの一次対応から商談予約までを自動化。',
    url: PAGE_URL,
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

export default function ManufacturingUseCasePage() {
  return (
    <UseCasePageClient
      industrySlug="manufacturing"
      industryEn="Manufacturing"
      industryJa="製造業"
      // Manufacturing accent: blue
      accentColor="#3b6ff5"
      accentDeep="#1e3a8a"
      accentLight="#e8efff"
      accentGlow="rgba(59, 111, 245, 0.22)"
      eyebrow="USE CASE / MANUFACTURING"
      heroTitleLead="技術問い合わせを、"
      heroTitleAccent="商談化する AI SDR。"
      heroSub="製造業BtoBの問い合わせは、技術スペック・見積・サンプル依頼など専門性が高く、対応に時間がかかります。Meeton ai はAIが一次対応で要件を整理し、有望リードのみを技術IS・営業に引き継ぎます。"
      personaStatement="製造業のWeb問い合わせは、月10件でも1件が数千万〜数億円の案件になります。だからこそ取りこぼせない。だが技術質問の一次対応に営業時間外も対応するのは現実的でない。Meeton ai がその穴を埋めます。"
      painsLead="技術問い合わせ・カタログ請求の温度感を見極められず、営業対応が後手になる。"
      pains={[
        {
          title: '技術スペック問い合わせの一次対応負荷',
          description: '材質・公差・対応サイズ・温度範囲・対応規格… 製造業の問い合わせは技術者でないと答えられない質問が多く、営業窓口で滞留します。技術IS の工数を圧迫し、有望リードの初動が遅れます。',
          metric: '24-72時間',
          metricLabel: '従来の一次返信リードタイム',
        },
        {
          title: '長期サイクル × 低頻度接点でリード消失',
          description: '製造業の購買サイクルは半年〜2年。問い合わせから本商談まで時間が空く間に、ナーチャーが切れて担当者が忘れられる事案が頻発します。技術資料・カタログを送って終わる「単発接点」では受注に至りません。',
          metric: '6-24ヶ月',
          metricLabel: '購買検討サイクル',
        },
        {
          title: '海外・地方からの時差問い合わせを取り逃す',
          description: '製造業の引合は海外・地方の顧客からも入ります。営業時間外・休日に問い合わせが来ても、月曜の朝に返信していてはすでに他社に流れています。Speed to Lead が受注確率を決定づけます。',
          metric: '+21%',
          metricLabel: '5分以内応答時の商談化率向上',
        },
      ]}
      modules={[
        {
          badge: 'Chat',
          name: 'Meeton Chat',
          href: '/chat/',
          description: 'WebサイトのチャットでAIがリアルタイムに対話。製品仕様・カタログ情報・標準スペックを学習し、技術問い合わせの一次切り分けを担います。',
          industryAngle: '製品カタログ・技術データシート・規格対応表を学習データとし、「この材質で対応可能か」「温度範囲は」など基礎技術質問は AI が即答。要件が固まったリードのみを技術IS に引き継ぐため、担当者の工数を3割削減できます。',
        },
        {
          badge: 'Email',
          name: 'Meeton Email',
          href: '/email/',
          description: '問い合わせメール（見積依頼・サンプル請求・技術質問）に AI が返信。商談化見込みを判定し、有望案件のみアラート通知。',
          industryAngle: '海外・地方の時差問い合わせ、深夜のサンプル依頼にも AI が24/7 で一次回答。「いつ・どんな量を・どんな用途で」必要かを AI がメール内で聞き出し、見積に必要な要件を揃えてから営業に引き渡します。',
        },
        {
          badge: 'Calendar',
          name: 'Meeton Calendar',
          href: '/calendar/',
          description: 'Google Calendar / MS Teams / Zoom 連携の自動スケジューリング。技術IS・営業・客先の3者調整も自動化。',
          industryAngle: '技術相談には「営業＋技術IS＋客先技術者」の3者打ち合わせが多発します。Meeton Calendar は複数カレンダーを横断して最適枠を提案し、客先での工場訪問・サンプル送付スケジュールまで管理可能です。',
        },
        {
          badge: 'Library',
          name: 'Meeton Library',
          href: '/library/',
          description: '訪問者の関心セグメント（業界・用途・素材）に応じた技術資料・事例・カタログをパーソナライズ配信。',
          industryAngle: '半年〜2年の長い検討サイクル中、AI が顧客の業界・用途に合わせた事例・技術資料を継続的に提示。「忘れられない仕組み」として、再訪リードに今読むべき1本を届け続けます。',
        },
        {
          badge: 'Ads',
          name: 'Meeton Ads',
          href: '/ads/',
          description: 'サイト訪問者ごとに、閲覧ページ・流入元・業種に合わせて最適なオファーを AI が出し分けるオンサイト広告。クリック・リード獲得から継続的に学習します。',
          industryAngle: '技術資料やカタログを閲覧する訪問者に、用途・業種・流入元に応じた最適オファー（サンプル依頼 / 技術相談 / 見積）を AI が提示。チャットを開かない引合もオンサイト広告でリード化します。広告文は AI が下書きし、承認したものだけを配信します。',
        },
      ]}
      integrations={[
        {
          slug: 'salesforce',
          name: 'Salesforce',
          logo: '/integrations/01_Salesforce.png',
          reason: '製造業の大手は Salesforce ベースの SFA を運用しています。リード・案件・関係者を自動連携。',
        },
        {
          slug: 'microsoft-teams',
          name: 'Microsoft Teams',
          logo: '/integrations/04_Microsoft_Teams.png',
          reason: '製造業の社内コミュニケーション基盤として最も普及。引合通知・技術相談アサインを Teams 通知。',
        },
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: '中堅製造業の CRM/MA として導入が拡大中。長期ナーチャーのトラッキングに最適。',
        },
        {
          slug: 'google-calendar',
          name: 'Google Calendar',
          logo: '/integrations/05_Google_Calendar.png',
          reason: '技術IS・営業・客先の複数カレンダー横断で最適商談枠を自動提案。',
        },
      ]}
      faqs={[
        {
          question: '製造業の専門的な技術質問にAIで本当に対応できますか？',
          answer: 'AI は貴社の製品カタログ・技術データシート・規格対応表を学習データとして使用し、基礎的なスペック質問（材質・公差・温度範囲・対応サイズなど）には正確に回答できます。判断が必要な詳細仕様や個別カスタマイズ案件は AI が自動判定し、技術IS への引き継ぎに切り替えます。「AIで答えるべきこと」「人で答えるべきこと」を明確に分けるのが設計思想です。',
        },
        {
          question: '製造業の長期サイクル（6-24ヶ月）でもナーチャー効果がありますか？',
          answer: 'Meeton Library が訪問者の過去閲覧履歴・関心セグメントを記憶し、半年後・1年後の再訪時にもその文脈に合わせた資料を提示します。「忘れられないインサイドセールス」として、長期サイクルこそ最も効果が出やすい設計です。',
        },
        {
          question: '海外からの英語問い合わせにも対応できますか？',
          answer: 'Meeton Chat / Meeton Email は多言語対応しており、英語・中国語などの問い合わせにも AI が自動で言語を判定して返信します。海外・地方の時差問い合わせを取り逃す課題を解決できます。',
        },
        {
          question: '見積依頼・サンプル依頼など、フォーム連携はどうなりますか？',
          answer: 'Meeton ai はWebサイト上の既存フォームと並列で動作し、フォーム送信前のチャット段階で「どんな量・用途・納期か」を AI がヒアリングします。フォーム送信時には必要要件が整理された状態で営業に届くため、見積回答までの時間が短縮されます。',
        },
        {
          question: '技術IS が少人数の体制でも導入する価値はありますか？',
          answer: 'むしろ少人数の技術IS にこそ最も効きます。AI が一次対応で要件を整理することで、技術IS は「答えるべき高度な質問」だけに集中できます。導入企業では、技術IS 1名分の工数削減効果を実現したケースがあります。',
        },
        {
          question: '既存の SFA / CRM（Salesforce など）はそのまま使えますか？',
          answer: 'Salesforce / HubSpot とネイティブ連携しており、リード・商談情報・問い合わせ履歴が自動同期されます。既存の SFA を置き換える必要はありません。',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('製造') || target.includes('manufactur') || target.includes('工業')
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-manufacturing"
    />
  )
}
