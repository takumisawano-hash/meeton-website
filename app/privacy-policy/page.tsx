import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import type { Metadata } from "next";
import Link from "next/link";

// /privacy-policy/ — 再構築版プライバシーポリシー（コントローラーの立場）の
// 日本語訳。英語版（/en/privacy-policy/）がマスター。SG/AU/NZ セルフサーブ
// 展開に伴う構造改訂: コントローラー/プロセッサーの分離（プロセッサーの立場は
// DPA が規律）、インフラ/AI サブプロセッサーの開示、保管リージョンの明記、
// 漏えい時の通知コミットメント、法域別annex、言語優先条項。
//
// ドラフト — 法務レビュー未了。DraftNotice を外す・公開するのはカウンセル
// 承認後。対応ギャップ一覧: docs/planning/sgaunz-selfserve-implications-
// 2026-07-07.md §7b（saas リポジトリ）。

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "DynaMeet株式会社のプライバシーポリシー。個人情報の取り扱いについて定めています。",
  alternates: {
    canonical: "/privacy-policy/",
  },
  openGraph: {
    title: "プライバシーポリシー",
    description:
      "DynaMeet株式会社のプライバシーポリシー。個人情報の取り扱いについて定めています。",
    url: "https://dynameet.ai/privacy-policy/",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main
        style={{
          minHeight: "100vh",
          paddingTop: "clamp(70px, 12vw, 100px)",
          background: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding:
              "clamp(24px, 6vw, 48px) clamp(16px, 4vw, 24px) clamp(50px, 10vw, 80px)",
          }}
        >
          {/* Breadcrumb */}
          <nav
            aria-label="パンくずリスト"
            style={{
              marginBottom: "clamp(20px, 4vw, 32px)",
              fontSize: "clamp(12px, 2vw, 14px)",
              color: "#6e7494",
            }}
          >
            <Link
              href="/"
              style={{
                color: "#6e7494",
                textDecoration: "none",
              }}
            >
              ホーム
            </Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: "#0f1128" }}>プライバシーポリシー</span>
          </nav>

          {/* Header */}
          <header style={{ marginBottom: "clamp(32px, 6vw, 48px)" }}>
            <h1
              style={{
                fontSize: "clamp(26px, 5vw, 36px)",
                fontWeight: 800,
                color: "#0f1128",
                margin: 0,
              }}
            >
              プライバシーポリシー
            </h1>
          </header>

          <DraftNotice />

          {/* Content */}
          <div
            style={{
              fontSize: "clamp(14px, 2vw, 15px)",
              lineHeight: 1.8,
              color: "#374151",
            }}
          >
            <p style={{ marginBottom: 32 }}>
              DynaMeet株式会社（以下「当社」といいます）は、「DynaMeet
              Platform」（Meeton
              ai等を含み、以下「本サービス」といいます）を提供しています。本プライバシーポリシー（以下「本ポリシー」といいます）は、当社が利用目的および取扱いの方法を自ら決定する個人情報——すなわち当社が
              <strong>コントローラー（取扱事業者）</strong>
              として取り扱う個人情報——の取扱いについて定めるものです。
            </p>

            <Section title="第1条（当社の2つの立場：コントローラーとプロセッサー）">
              <p>
                1. 当社は<strong>コントローラー</strong>
                として、お客様およびその担当者に関する情報（アカウント・請求・サポートに関するデータ）、当社へのお問い合わせやメールマガジン登録をされた方、当社自身のウェブサイト
                dynameet.ai
                の訪問者に関する情報、ならびに当社自身のマーケティングに用いる情報を取り扱います。本ポリシーはこれらの取扱いに適用されます。
              </p>
              <p style={{ marginTop: 12 }}>
                2. 当社は<strong>プロセッサー（受託者）</strong>
                として、本サービスを通じてお客様のウェブサイトの訪問者から収集される個人情報（チャット入力、フォーム送信、行動データ等）を、お客様のために、お客様の指示に基づいて取り扱います。この取扱いは本ポリシーではなく、お客様との間の
                <a href="/en/legal/dpa/" style={{ color: "#12a37d" }}>
                  データ処理補遺（DPA・英語）
                </a>
                が規律します。本サービスを導入しているウェブサイトの訪問者の方は、当該サイト運営者のプライバシーポリシーが適用されますので、開示等のご請求は当該サイト運営者にお願いします。当社はサイト運営者の対応に協力します。
              </p>
            </Section>

            <Section title="第2条（言語版と優先関係）">
              <p>
                本ポリシーは日本語および英語で公表されます。日本の申込書（営業経由）チャネルでご契約のお客様については日本語版が、セルフサーブ（オンライン申込）チャネルでご契約のお客様および日本国外のお客様については英語版が、それぞれ正文となります。
              </p>
            </Section>

            <Section title="第3条（コントローラーとして収集する情報）">
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>
                  （1）<strong>アカウント・登録情報</strong>
                  ——本サービスの登録・管理の際にご提供いただく氏名、勤務先メールアドレス、会社名、国、言語等
                </li>
                <li>
                  （2）<strong>請求情報</strong>
                  ——プラン、支払状況、事業者税務番号、請求先連絡先等（カード情報は決済事業者が処理し、当社は保持しません）
                </li>
                <li>
                  （3）<strong>お問い合わせ・サポート</strong>
                  ——お問い合わせフォーム、メール、サポート窓口を通じてご提供いただく情報
                </li>
                <li>
                  （4）<strong>メールマガジン・マーケティング情報</strong>
                  ——メールアドレスおよび配信設定
                </li>
                <li>
                  （5）<strong>当社サイト自身の訪問者データ</strong>——dynameet.ai
                  自体が Meeton
                  ウィジェットおよびアクセス解析ツールを利用しているため、本サービスがお客様のために収集するのと同じカテゴリーのデータ（閲覧ページ、滞在時間、ご自身で送信されたチャット・フォーム入力、IPアドレス、デバイス・ブラウザ情報、Cookie・セッション情報、IPアドレス等から推定される企業属性情報〔企業名・業種・所在地・従業員規模〕）を当社サイト上でも収集します。詳細は第12条をご覧ください。
                </li>
              </ul>
            </Section>

            <Section title="第4条（利用目的）">
              <p>当社は、第3条の情報を以下の目的で利用します。</p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>（1）本サービスの提供・運営・請求のため</li>
                <li>（2）お問い合わせへの対応・サポート提供のため</li>
                <li>
                  （3）サービス通知（更新リマインダー、セキュリティ・メンテナンス通知、規約変更の通知）の送付のため
                </li>
                <li>
                  （4）法令上認められる範囲でのマーケティング情報の送付のため（第11条によりいつでも配信停止できます）
                </li>
                <li>
                  （5）サービスの改善・新機能の開発のため（AIモデルの改善には非識別化されたデータのみを利用します）
                </li>
                <li>（6）セキュリティの維持および不正利用の防止のため</li>
                <li>（7）利用規約に違反する行為への対応のため</li>
                <li>（8）法令上の義務の履行のため</li>
                <li>（9）上記に付随する目的のため</li>
              </ul>
            </Section>

            <Section title="第5条（第三者提供）">
              <p>
                当社は、次の場合を除き、ご本人の同意なく個人情報を第三者に提供しません：法令に基づく場合または法令上認められる場合；人の生命、身体または財産の保護のために必要があり、本人の同意を得ることが困難な場合；公衆衛生の向上または児童の健全な育成の推進のために特に必要があり、本人の同意を得ることが困難な場合；国の機関等またはその委託を受けた者が法令の定める事務を遂行することに協力する必要がある場合；合併その他の事業承継に伴い、従前の利用目的の範囲内で提供される場合。第6条のサブプロセッサー等への提供は委託であり、第三者提供には該当しません。
              </p>
            </Section>

            <Section title="第6条（サブプロセッサー・委託先）">
              <p>
                1.
                当社は、本サービスの運営のため、適切な安全管理措置を義務付ける契約のもとで以下のカテゴリーの事業者を利用します。
              </p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>
                  （1）<strong>インフラ</strong>——Amazon Web
                  Services（ホスティング。東京リージョン）、Supabase（アプリケーションインフラ）
                </li>
                <li>
                  （2）<strong>AIモデル提供者</strong>——Google（Gemini
                  API）、Microsoft（Azure OpenAI
                  Service）。AI応答の生成に利用します。これらの提供者に渡されるチャット・コンテンツは本サービスの提供のために利用され、提供者自身の広告には利用されません
                </li>
                <li>
                  （3）<strong>決済処理</strong>
                  ——セルフサーブ課金におけるカード情報は決済事業者が処理します
                </li>
                <li>
                  （4）<strong>IPベースの企業情報エンリッチメント</strong>
                  ——日本国内のトラフィックについて、国内のジオロケーション事業者がIPアドレスから企業属性を推定します
                </li>
              </ul>
              <p style={{ marginTop: 12 }}>
                お客様の個人データに接するサブプロセッサーの最新の一覧（所在地を含む）は
                <a href="/en/legal/sub-processors/" style={{ color: "#12a37d" }}>
                  dynameet.ai/en/legal/sub-processors/
                </a>
                に公表し、同ページ記載の方法で事前通知のうえ更新します。
              </p>
              <p style={{ marginTop: 12 }}>
                2. <strong>お客様の指示による外部連携</strong>
                （Google、Microsoft、Slack、Zoom、Salesforce、HubSpot等）は、お客様が接続した場合にのみ、お客様の指示に基づいてデータを送受信します。第7条および各事業者の規約が適用されます。
              </p>
            </Section>

            <Section title="第7条（OAuth連携におけるデータ取り扱い）">
              <SubHeading>1. 共通規定</SubHeading>
              <p>
                当社サービスは、機能提供のため、外部サービス（Google、Microsoft、Slack、Zoom、Salesforce、HubSpot等）と連携（OAuth認証等）を行う場合があります。連携に際しては、当該機能の提供に必要な最小限の情報のみを収集し、各外部サービスの規約および本条の定めに従って適切に取り扱います。
              </p>

              <SubHeading>2. Google APIユーザーデータの限定的使用</SubHeading>
              <p>
                当社サービスがGoogle
                APIから受け取った情報の使用および他アプリへの転送は、
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#12a37d" }}
                >
                  Google API サービスのユーザーデータに関するポリシー
                </a>
                （Limited Use（限定的使用）要件を含む）を遵守します。Google
                APIから取得したデータ（カレンダー情報等）は、本サービスの機能提供および改善の目的にのみ使用し、広告配信、マーケティング、または本サービスの機能に無関係な第三者への提供には一切使用いたしません。
              </p>

              <SubHeading>3. Microsoft（Teams/Outlook）との連携</SubHeading>
              <p>
                Microsoft Graph
                APIを通じて取得したデータは、商談の日程調整、会議設定、およびそれらに付随する通知目的にのみ使用されます。取得したデータが広告やプロファイリング目的で使用されることはありません。
              </p>

              <SubHeading>4. Slackとの連携</SubHeading>
              <p>
                連携により取得したワークスペース情報、チャンネル情報、およびメッセージデータ等は、本サービス内での通知およびログ作成の目的でのみ利用されます。取得したデータは、Slackの規約に従って適切に管理されます。
              </p>

              <SubHeading>5. Zoomとの連携</SubHeading>
              <p>
                Zoom
                APIを通じて取得したデータ（ミーティング情報、ユーザー名、メールアドレス等）は、商談の日程調整、会議URLの発行、およびそれらに付随する通知目的にのみ使用されます。当社は、Zoom
                APIを通じて取得したユーザーの音声、ビデオ、チャット内容、その他の通信内容にアクセス、取得、または保存することは一切ありません。また、これらのデータを当社のAIモデルや第三者のAIモデルの学習・改善に利用することもありません。取得したデータは、Zoomプライバシーに関する声明に従って取り扱われるとともに、広告配信やユーザーのプロファイリング目的で使用されることはありません。お客様がZoomマーケットプレイスから本サービスの連携を解除（アンインストール）した場合、当社は第10条の規定にかかわらず、取得済みのOAuthアクセストークンおよびZoom関連データを24時間以内に速やかに削除または匿名化いたします。
              </p>

              <SubHeading>6. CRM（Salesforce/HubSpot）との連携</SubHeading>
              <p>
                外部CRMとのデータ送受信は、お客様が指定したデータの同期および商談管理の効率化を目的として行われます。
              </p>

              <SubHeading>7. 人間の閲覧制限</SubHeading>
              <p>
                当社は、セキュリティ上の理由（不正利用の調査等）、法的義務、またはお客様の同意を得たサポート対応の場合を除き、外部連携によって取得したユーザーデータを従業員が閲覧することを制限しています。
              </p>
            </Section>

            <Section title="第8条（データの保管場所・国外移転）">
              <p>
                1. 本サービスにおいて取得した個人情報および顧客データは、日本国内の
                Amazon Web Services
                東京リージョン（ap-northeast-1）に保管します。ホスティングおよびセキュリティ体制の詳細は
                <a href="/en/trust/" style={{ color: "#12a37d" }}>
                  Trustページ（英語）
                </a>
                に公表しています。
              </p>
              <p style={{ marginTop: 12 }}>
                2.
                日本国外から本サービスをご利用の場合、お客様の個人情報は日本に移転され保管されます。日本の個人情報保護法制は欧州委員会より十分性認定を受けており、日本はGlobal
                CBPRシステムに参加しています。国外のサブプロセッサーを利用する場合（所在地はサブプロセッサー一覧ページ参照）は、お客様に適用される法令——シンガポールPDPAの移転要件、オーストラリアAPP
                8、ニュージーランドIPP
                12を含みます——と整合する契約上の保護措置を講じます。
              </p>
            </Section>

            <Section title="第9条（安全管理・漏えい時の対応）">
              <p>
                1. 当社は、ISO/IEC 27001 および ISO/IEC 27017
                の認証を受けた情報セキュリティマネジメントシステムを運用し、個人情報の紛失、破壊、改ざん、漏えい等を防止するための適切な技術的・組織的措置を講じます。詳細は
                <a href="/security/" style={{ color: "#12a37d" }}>
                  情報セキュリティ
                </a>
                をご覧ください。
              </p>
              <p style={{ marginTop: 12 }}>
                2.
                個人データの漏えい等が発生し、または発生したおそれがある場合、当社は：DPAに定める通知コミットメントに従い、影響を受けるお客様に遅滞なく通知します；個人情報保護法に基づき、個人情報保護委員会（PPC）へ報告します（事態把握から原則3〜5日以内に速報、調査完了後原則30日以内に確報）；影響を受けるデータに適用される法令（オーストラリアのNotifiable
                Data Breaches制度、シンガポールPDPA、ニュージーランドPrivacy Act
                2020等）が求めるその他の当局報告・本人通知を行います。大規模なサイバー攻撃の際はJPCERT/CCと連携し、犯罪行為が疑われる場合は警察に通報・相談します。
              </p>
            </Section>

            <Section title="第10条（保有期間・削除）">
              <p>
                1.
                当社は、第4条の目的の達成および法令上の義務の履行に必要な期間、個人情報を保有します。
              </p>
              <p style={{ marginTop: 12 }}>
                2.
                お客様との契約が終了した場合、お客様が登録した識別可能な個人データ（氏名、メールアドレス等）は、適用される規約に定めるデータエクスポート期間の経過後、原則として終了から90日以内に削除または非識別化します。
              </p>
              <p style={{ marginTop: 12 }}>
                3.
                個人を識別できず、かつ再識別できないように加工された行動履歴、統計情報およびメタデータは、サービスの改善・分析の目的で契約終了後も保持することがあります。
              </p>
            </Section>

            <Section title="第11条（お客様の権利・マーケティング配信停止）">
              <p>
                1.
                お客様は、当社が保有するご自身の個人情報について、開示、訂正、追加、削除、利用停止、および適用法令が定める場合にはデータポータビリティを請求することができます。当社は本人確認のうえ、30日以内に対応します。より長い期間を要する場合は、その理由と対応予定時期をお知らせします。請求に応じられない場合は、理由と不服申立ての方法（第14条の各annex参照）をご案内します。
              </p>
              <p style={{ marginTop: 12 }}>
                2. <strong>マーケティング配信停止。</strong>
                当社が送信するマーケティングメールには、すべて配信停止リンクが含まれます。第15条の窓口へのご連絡によっても、いつでも配信を停止できます。配信停止後も、アカウント運営に必要なサービス通知は送信されます。
              </p>
            </Section>

            <Section title="第12条（Cookie・アクセス解析・当社自身のMeetonウィジェット利用）">
              <p>
                1.
                当社のウェブサイトでは、機能提供およびアクセス解析のため、Cookieおよび類似の技術を使用しています。ブラウザの設定によりCookieを無効にできますが、一部の機能が動作しなくなる場合があります。
              </p>
              <p style={{ marginTop: 12 }}>
                2. 当社のウェブサイトでは、アクセス解析のためGoogle
                Analyticsを利用しています。Google
                Analyticsはトラフィックデータの収集のためにCookieを使用しています。
              </p>
              <p style={{ marginTop: 12 }}>
                3. dynameet.ai 自身も、当社が販売するプロダクトである Meeton
                ウィジェットを設置しています。これにより、訪問に関する情報（閲覧ページ、滞在時間、ご自身で送信されたチャット・フォーム入力、IPアドレス、デバイス・ブラウザ情報）が当社のインフラに送信・処理され、IPアドレスから企業属性情報（企業名・業種・所在地・従業員規模）が推定される場合があります。当社はこれらを、お客様への対応、当社自身の営業・マーケティング活動、および本サービスの改善のために利用します。
              </p>
            </Section>

            <Section title="第13条（AIモデルの改善）">
              <p>
                当社は、個人またはお客様を識別できず、かつ合理的に再識別・再照合できないように非識別化・集計されたデータに限り、AIモデルの改善に利用することがあります。お客様は、本サービス内の設定画面から、自社データのAIモデル改善への利用をいつでもオプトアウトできます。
              </p>
            </Section>

            <Section title="第14条（法域別の定め）">
              <SubHeading>1. 日本（個人情報保護法）</SubHeading>
              <p>
                当社は、個人情報の保護に関する法律（APPI）に従って個人情報を取り扱います。保有個人データに関する開示・訂正・利用停止等のご請求は第11条に従い、第15条の窓口までお寄せください。個人情報保護委員会（PPC）に苦情を申し立てることもできます。
              </p>
              <SubHeading>2. オーストラリア（Privacy Act 1988・APPs）</SubHeading>
              <p>
                オーストラリアのPrivacy
                Actが当社の取扱いに適用される場合、当社はAustralian Privacy
                Principlesに整合的に個人情報を取り扱います。お客様の個人情報は日本で保管され、サブプロセッサー一覧ページに記載の国のサブプロセッサーがアクセスする場合があります。APPs違反があるとお考えの場合は、まず第15条の窓口にご連絡ください。当社は苦情を受領した旨をお知らせし、30日以内に回答します。回答にご満足いただけない場合は、Office
                of the Australian Information Commissioner（OAIC、
                www.oaic.gov.au）に申し立てることができます。
              </p>
              <SubHeading>3. シンガポール（PDPA）</SubHeading>
              <p>
                シンガポールPersonal Data Protection Act
                2012が適用される場合、第15条の窓口がデータ保護に関する連絡先となります。開示・訂正のご請求は第11条に従います。解決しない場合は、Personal
                Data Protection Commission（PDPC）に相談することができます。
              </p>
              <SubHeading>4. ニュージーランド（Privacy Act 2020）</SubHeading>
              <p>
                ニュージーランドPrivacy Act
                2020が適用される場合、ご請求・苦情は第11条および第15条に従います。当社の対応にご満足いただけない場合は、Office
                of the Privacy Commissioner（OPC、www.privacy.org.nz）
                に申し立てることができます。当社がお客様の個人情報を間接的に収集する場合（IPアドレスから推定される企業属性情報等）、本ポリシーがその収集の通知となります。
              </p>
            </Section>

            <Section title="第15条（お問い合わせ窓口）">
              <p>
                プライバシーに関するお問い合わせ、第11条に基づくご請求、苦情は、下記までご連絡ください。
              </p>
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: 12,
                  padding: 24,
                  marginTop: 16,
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong>DynaMeet株式会社</strong> プライバシー窓口
                  <br />
                  〒150-0033 東京都渋谷区猿楽町17-10 代官山アートヴィレッジ2C
                  <br />
                  メール: info@dynameet.ai
                </p>
              </div>
            </Section>

            <Section title="第16条（本ポリシーの変更）">
              <p>
                当社は、必要に応じて本ポリシーを変更することがあります。重要な変更については、効力発生前に、メールまたは本サービス内の通知によりお客様に事前にお知らせします。変更後のポリシーは、明示された効力発生日（重要でない変更については当社ウェブサイトへの掲載時点）から適用されます。
              </p>
            </Section>

            <p style={{ marginTop: 48, color: "#6e7494", fontSize: 14 }}>
              制定日：2024年10月3日
              <br />
              最終更新日：［ドラフト——法務レビュー未了。2026年4月23日公表版が引き続き有効です］
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function DraftNotice() {
  return (
    <div
      style={{
        background: "#fff8e6",
        border: "1px solid #f0c948",
        borderRadius: 12,
        padding: "16px 20px",
        marginBottom: 32,
        fontSize: 14,
        lineHeight: 1.7,
        color: "#7a5b00",
      }}
    >
      <strong>ドラフト——法務レビュー未了。</strong>
      本ページは有資格の弁護士によるレビューのために作成された改訂草案であり、まだ効力を有しません。承認・公表までは、2026年4月23日公表のプライバシーポリシーが引き続き有効です。
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "clamp(28px, 5vw, 40px)" }}>
      <h2
        style={{
          fontSize: "clamp(16px, 2.5vw, 18px)",
          fontWeight: 700,
          color: "#0f1128",
          marginBottom: "clamp(12px, 2vw, 16px)",
          paddingBottom: 8,
          borderBottom: "2px solid #12a37d",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontSize: "clamp(14px, 2vw, 16px)",
        fontWeight: 700,
        color: "#0f1128",
        marginTop: 20,
        marginBottom: 8,
      }}
    >
      {children}
    </h3>
  );
}
