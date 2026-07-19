import type { Metadata } from 'next'
import { altLanguages } from '@/app/lib/i18n'
import UseCasePageClient from '../UseCasePageClient'

export const revalidate = 3600

const PAGE_URL = 'https://dynameet.ai/use-cases/bpo/'

export const metadata: Metadata = {
  title: 'BPO・コールセンター向け AI SDR — 問い合わせを商談化 | Meeton ai',
  description:
    'BPO・コールセンター受託企業向け AI SDR。複雑な RFP・要件の一次ヒアリングと問い合わせ対応を AI が代行し、24時間365日・5秒初動で商談予約まで自動化。対応品質を売る会社の自社サイトを強化します。',
  alternates: altLanguages('/use-cases/bpo/', 'ja'),
  openGraph: {
    title: 'BPO・コールセンター向け AI SDR — 問い合わせを商談化 | Meeton ai',
    description: '対応のプロの自社サイトを AI SDR が強化。複雑な要件ヒアリングと一次対応を自動化し、問い合わせを商談化。',
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

export default function BpoUseCasePage() {
  return (
    <UseCasePageClient
      industrySlug="bpo"
      industryEn="BPO & Contact Centers"
      industryJa="BPO・コールセンター"
      // BPO accent: deep teal (distinct from CTA green #07CB79)
      accentColor="#0f766e"
      accentDeep="#115e59"
      accentLight="#e0f2f0"
      accentGlow="rgba(15, 118, 110, 0.22)"
      eyebrow="USE CASE / BPO"
      heroTitleLead="対応品質を売る会社こそ、"
      heroTitleAccent="自社サイトの5秒初動で選ばれる。"
      heroSub="BPO・コールセンター受託企業の営業サイト。複雑な RFP・要件、価格非公開の商習慣。Meeton ai は問い合わせに5秒で応答し、要件ヒアリングから商談予約までを自動で運びます。"
      personaStatement="委託先を探す企業は、まず貴社サイトの対応を見ています。フォームを送って返信が翌営業日 — その体験は「この会社に自社の窓口を任せて大丈夫か」という不安に直結します。Meeton ai はその第一印象を、5秒初動の対話に変えます。"
      painsLead="「対応」のプロなのに、自社サイトの問い合わせ対応が手薄になっている。"
      pains={[
        {
          title: '対応品質を見られる立場なのに、初動が遅い',
          description: '委託を検討する企業は、BPO 会社の Web サイトでの対応スピード・丁寧さを「委託後の品質」の予告編として見ています。フォーム送信後の返信が翌営業日では、対応のプロとしての説得力を欠きます。',
          metric: '5秒',
          metricLabel: 'Speed to Lead 基準',
        },
        {
          title: 'RFP・要件が複雑で、初期ヒアリングが重い',
          description: '席数・稼働時間帯・チャネル（電話 / メール / チャット）・繁閑差・セキュリティ要件・立ち上げ時期 — BPO の見積もりに必要な情報は多岐にわたります。営業担当が一件ずつヒアリングすると初回提案までが遅れ、他社に先行されます。',
          metric: '数十項目',
          metricLabel: '見積もりに必要な確認事項',
        },
        {
          title: '価格非公開の商習慣が、見込み客の離脱を生む',
          description: '案件ごとの個別見積もりが業界慣行のため、料金ページが「お問い合わせください」で終わりがち。価格の目安すら得られない見込み客は、比較検討の初期段階で静かに離脱します。検討が進む夜間・週末には、誰も応えられません。',
          metric: '夜間・週末',
          metricLabel: '検討が進むが窓口不在の時間帯',
        },
      ]}
      modules={[
        {
          badge: 'Chat',
          name: 'Meeton Chat',
          href: '/chat/',
          description: 'Webサイトを訪れたリードに対して、AIがリアルタイムで会話。資料DLや動画閲覧の文脈を踏まえて、深いプロダクト質問にも具体的に回答します。',
          industryAngle: '委託を検討する企業の「対応可能な業務範囲」「セキュリティ体制」「立ち上げまでの期間」といった質問に、貴社の公式情報を根拠に即回答。席数・チャネル・時期などの要件も対話の中で自然にヒアリングし、初回提案前の情報収集を自動化します。',
        },
        {
          badge: 'Email',
          name: 'Meeton Email',
          href: '/email/',
          description: '問い合わせメールに対し、AIがインサイドセールスに代わって返信し、商談を予約します。Slack・HubSpot 通知と連動。',
          industryAngle: 'RFP・見積もり依頼のメールに、AIが営業時間外でも一次返信。不足している要件（業務量・稼働時間帯・開始時期）を丁寧に確認し、営業担当が提案に入る時点で要件が整理された状態を作ります。',
        },
        {
          badge: 'Calendar',
          name: 'Meeton Calendar',
          href: '/calendar/',
          description: 'Google Calendar / MS Teams / Zoom と連携した自動スケジューリング。バイヤーが空き枠を選ぶだけで商談が確定。',
          industryAngle: '要件ヒアリングが済んだ見込み客を、そのまま営業担当のカレンダーへ。クライアント側の情シス・調達担当が同席する複数名の商談調整も、AIが全員の空き枠から自動で組みます。',
        },
        {
          badge: 'Library',
          name: 'Meeton Library',
          href: '/library/',
          description: '訪問者の業界・役職・閲覧履歴に基づき、最適な資料・事例・動画をパーソナライズして提示。再訪リードを温め続けます。',
          industryAngle: 'コールセンター立ち上げ事例・業界別の BPO 実績・セキュリティ資料を、訪問者の業種・関心に合わせて自動提示。価格を即答できない分、「この会社なら任せられる」と判断できる材料を先回りで届けます。',
        },
        {
          badge: 'Ads',
          name: 'Meeton Ads',
          href: '/ads/',
          description: 'サイト訪問者一人ひとりに、閲覧ページ・流入元・業種に応じて最適なオファーを AI が出し分けるオンサイト広告。クリック・リード獲得から継続的に学習します。',
          industryAngle: 'サービス紹介や実績ページを見ている検討中の訪問者に、閲覧文脈に合わせたオファー（事例DL / 無料相談）を AI が提示。フォームまで辿り着かない訪問者もオンサイト広告でリード化します。広告文は AI が下書きし、承認したものだけを配信します。',
        },
      ]}
      integrations={[
        {
          slug: 'salesforce',
          name: 'Salesforce',
          logo: '/integrations/01_Salesforce.png',
          reason: 'コンタクトセンター業界で広く使われる CRM。問い合わせ・案件・商談をネイティブ連携で同期。',
        },
        {
          slug: 'hubspot',
          name: 'HubSpot',
          logo: '/integrations/02_HubSpot.png',
          reason: 'BPO 営業チームの CRM/MA。ヒアリング済みの要件情報を HubSpot Contact / Deal に自動連携。',
        },
        {
          slug: 'microsoft-teams',
          name: 'Microsoft Teams',
          logo: '/integrations/04_Microsoft_Teams.png',
          reason: '大手 BPO・コールセンター運営企業の標準コミュニケーション基盤。商談ミーティングもそのまま Teams で。',
        },
        {
          slug: 'slack',
          name: 'Slack',
          logo: '/integrations/03_Slack.png',
          reason: '営業・オペレーション部門への即時通知。要件の揃った有望案件をリアルタイムで把握。',
        },
      ]}
      faqs={[
        {
          question: 'BPO・コールセンターの見積もりは案件ごとの個別対応です。価格を公開していなくても Meeton ai は使えますか？',
          answer: 'はい。価格非公開のまま運用できます。Meeton Chat は「概算は席数・稼働時間帯・チャネルによって変わるため、要件を伺ったうえでお見積もりします」と案内しながら、見積もりに必要な要件を対話の中でヒアリングします。見込み客は「問い合わせても何も分からない」状態を避けられ、貴社は要件の揃ったリードだけを受け取れます。',
        },
        {
          question: 'RFP や要件定義が複雑な案件でも、AI がヒアリングできますか？',
          answer: '一次ヒアリングの範囲であれば可能です。業務内容・想定件数・稼働時間帯・チャネル・開始希望時期といった定型的な確認項目は Meeton Chat / Meeton Email が対話とメールで収集し、CRM に構造化して記録します。複雑な要件のすり合わせは、情報が整理された状態から営業担当が商談で行う設計です。',
        },
        {
          question: '自社がコールセンターを運営しているのに、AI チャットを入れるのは矛盾しませんか？',
          answer: '逆です。委託を検討する企業は、貴社サイトでの対応スピードと品質を「委託後のサービス品質」の判断材料にしています。24時間365日・5秒初動の対応を自社サイトで実践することは、対応品質を売る会社としての最も説得力あるデモンストレーションになります。「AI が一次対応し、人が仕上げる」という形は、貴社がクライアントに提案する運用モデルとも一致します。',
        },
        {
          question: '夜間や週末の問い合わせにも対応できますか？',
          answer: 'はい。Meeton ai は24時間365日稼働します。委託検討の情報収集は担当者の業務時間外に行われることも多く、夜間・週末の問い合わせにも5秒で応答し、そのまま翌週の商談予約まで完了させられます。営業チームは翌営業日に、要件と商談予定が揃った状態から始められます。',
        },
        {
          question: 'クライアント業務で厳しいセキュリティ要件を扱っています。自社サイトに AI チャットを入れても大丈夫ですか？',
          answer: 'Meeton Chat の回答は、貴社が学習させた公式情報（サービス資料・FAQ・実績ページ）のみを根拠とし、回答できない質問は担当者への引き継ぎに切り替えます。取得したリード情報は Salesforce / HubSpot などの既存 CRM に連携され、貴社の管理下で扱えます。セキュリティ体制の詳細はセキュリティページをご参照ください。',
        },
        {
          question: '導入に専任エンジニアや既存システムの置き換えは必要ですか？',
          answer: '不要です。JSタグ1行をサイトに設置するだけで、最短5分で稼働開始できます。Salesforce・HubSpot・Slack・Microsoft Teams とはネイティブ連携し、既存のセールススタックを置き換えずにそのまま使えます。クライアント向けに提供しているシステムと干渉することもありません。',
        },
      ]}
      caseStudyMatcher={(cs) => {
        const target = (cs.industry || '').toLowerCase()
        return target.includes('bpo') || target.includes('コールセンター') || target.includes('コンタクトセンター') || (cs.tags || []).some(t => t.toLowerCase().includes('bpo'))
      }}
      pageUrl={PAGE_URL}
      utmCampaign="industry-bpo"
    />
  )
}
