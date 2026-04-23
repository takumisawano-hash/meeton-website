import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "DynaMeet株式会社のプライバシーポリシー。個人情報の取り扱いについて定めています。",
  alternates: {
    canonical: "/privacy-policy/",
  },
  openGraph: {
    title: "プライバシーポリシー｜Meeton ai",
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

          {/* Content */}
          <div
            style={{
              fontSize: "clamp(14px, 2vw, 15px)",
              lineHeight: 1.8,
              color: "#374151",
            }}
          >
            <p style={{ marginBottom: 32 }}>
                DynaMeet株式会社（以下「当社」といいます）は、当社が提供する「DynaMeet Platform」（Meeton ai等を含み、以下「本サービス」といいます）において、お客様の個人情報の保護を重要な責務と考え、以下のプライバシーポリシーに従って個人情報を適切に取り扱います。
            </p>

            <Section title="第1条（個人情報の定義）">
              <p>
                本プライバシーポリシーにおいて「個人情報」とは、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別できるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含みます）をいいます。
              </p>
            </Section>

            <Section title="第2条（個人情報の収集方法）">
              <p>当社は、以下の方法により個人情報を収集することがあります。</p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>（1）当社ウェブサイトのお問い合わせフォームからの送信時</li>
                <li>（2）本サービスのご利用登録時</li>
                <li>（3）メールマガジンの登録時</li>
                <li>
                  （4）本サービスの各機能（AIチャット、カレンダー予約フォーム、ポップアップ/バナー、その他の入力フォーム）を通じて、お客様のウェブサイトの訪問者が情報（氏名、メールアドレス、電話番号、会社名、役職、部署名等）を入力した場合
                </li>
                <li>
                  （5）本サービスのメール配信・アウトリーチ機能を通じて訪問者の行動データ（メール開封、リンククリック等）を取得する場合
                </li>
                <li>
                  （6）本サービスの機能により、お客様のウェブサイト上で訪問者の行動データ（閲覧ページURL、滞在時間、スクロール深度、セッション情報、各機能へのエンゲージメント、ダウンロードセンターにおける資料の閲覧ページ・閲覧時間等）、IPアドレス、デバイス情報、ブラウザ情報、Cookie・セッション情報を自動的に取得する場合
                </li>
                <li>
                  （7）IPアドレス等の情報に基づき企業属性情報（企業名、業種、所在地、従業員規模等）を推定する場合
                </li>
                <li>
                  （8）お客様がご指定する外部CRM（HubSpot、Salesforce等）との連携を通じてデータを送受信する場合
                </li>
                <li>（9）その他、当社サービスの利用に関連して</li>
              </ul>
            </Section>

            <Section title="第3条（個人情報の利用目的）">
              <p>当社は、収集した個人情報を以下の目的で利用いたします。</p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>
                  （1）当社サービスの提供・運営のため（AIチャットボットによる自動応答の生成、商談機会の創出、カレンダー連携による日程調整、メール配信によるナーチャリングを含む）
                </li>
                <li>（2）お問い合わせへの対応のため</li>
                <li>（3）サービスに関するご案内やお知らせのため</li>
                <li>
                  （4）サービスの改善・新サービスの開発のため（匿名化されたデータに基づくAIモデルの改善を含む）
                </li>
                <li>（5）お客様への利用状況レポートの提供のため</li>
                <li>
                  （6）お客様がご指定する外部CRM等へのデータ連携・転送のため
                </li>
                <li>
                  （7）サービスのセキュリティ維持および不正利用の防止のため
                </li>
                <li>（8）利用規約に違反した行為への対応のため</li>
                <li>（9）その他、上記利用目的に付随する目的のため</li>
              </ul>
            </Section>

            <Section title="第4条（個人情報の第三者提供）">
              <p>
                当社は、法令に基づく場合を除き、あらかじめお客様の同意を得ることなく、第三者に個人情報を提供することはありません。ただし、以下の場合はこの限りではありません。
              </p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>法令に基づく場合</li>
                <li>
                  人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
                </li>
                <li>
                  公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
                </li>
                <li>
                  国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
                </li>
              </ul>
            </Section>

            <Section title="第5条（個人情報の安全管理）">
              <p>
                当社は、個人情報の紛失、破壊、改ざん、漏洩等を防止するため、適切なセキュリティ対策を講じます。また、個人情報を取り扱う従業員に対して、適切な監督を行います。
              </p>
            </Section>

            <Section title="第5条の2（データの保管場所およびインシデント発生時の連絡体制）">
              <SubHeading>1. データの保管場所</SubHeading>
              <p>
                当社は、本サービスにおいて取得した個人情報および顧客データを、日本国内のデータセンターにおいて安全に保管します。
              </p>

              <SubHeading>2. 個人情報保護委員会等への報告</SubHeading>
              <p>
                個人情報保護法に基づき、個人データの漏洩等の事故が発生した場合、または発生するおそれがある場合には、取締役が主導し、個人情報保護委員会（PPC）へ報告いたします。報告にあたっては、事態を把握してから原則3〜5日以内に速報を、調査完了後、原則30日以内に確報を行います。
              </p>

              <SubHeading>3. 関係当局との連携</SubHeading>
              <p>
                大規模なサイバー攻撃発生時の情報共有や技術支援の依頼は、JPCERT/CCへ行います。また、窃盗、脅迫、不正アクセスなどの犯罪行為の疑いに関する通報および相談は、管轄警察署のサイバー犯罪対策課へ速やかに行います。
              </p>
            </Section>

            <Section title="第6条（個人情報の開示・訂正・削除）">
              <p>
                1.
                お客様は、当社に対して、ご自身の個人情報の開示、訂正、追加、削除、利用停止を請求することができます。請求を受けた場合、当社は本人確認を行った上で、合理的な期間内に対応いたします。
              </p>
              <p style={{ marginTop: 12 }}>
                2.
                本サービスの利用契約が終了した場合、当社は当社の定める期間内（原則として終了から90日以内）に、お客様が登録した識別可能な個人データ（氏名、メールアドレス等）を削除または匿名化いたします。
              </p>
              <p style={{ marginTop: 12 }}>
                3.
                前項の規定にかかわらず、個人を特定できないように加工された行動履歴、統計情報、およびメタデータについては、サービスの向上や分析の目的で、契約終了後も保持および利用させていただきます。
              </p>
              <p style={{ marginTop: 12 }}>
                4.
                お客様が契約終了時にデータのエクスポートまたは個別の削除を希望される場合は、契約終了日の30日前までに当社にご通知ください。当社は、合理的な範囲で当該要請に対応いたします。
              </p>
            </Section>

            <Section title="第7条（Cookie等の利用）">
              <p>
                当社のウェブサイトでは、サービスの利便性向上やアクセス解析のため、Cookieおよび類似の技術を使用しています。お客様はブラウザの設定によりCookieを無効にすることができますが、一部のサービスが正常に機能しない場合があります。
              </p>
            </Section>

            <Section title="第8条（アクセス解析ツールについて）">
              <p>
                当社のウェブサイトでは、Google
                Inc.が提供するアクセス解析ツール「Google
                Analytics」を利用しています。Google
                Analyticsはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
              </p>
            </Section>

            <Section title="第9条（外部サービスおよびOAuth連携におけるデータ取り扱い）">
              <SubHeading>1. 共通規定</SubHeading>
              <p>
                当社サービスは、お客様の利便性向上および機能提供のため、外部サービス（Google、Microsoft、Slack、Zoom、Salesforce、HubSpot等）と連携（OAuth認証等）を行う場合があります。連携に際しては、当該機能の提供に必要な最小限の情報のみを収集し、各外部サービスの規約および本条の定めに従って適切に取り扱います。
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
                APIを通じて取得したユーザーの音声、ビデオ、チャット内容、その他の通信内容にアクセス、取得、または保存することは一切ありません。また、これらのデータを当社のAIモデルや第三者のAIモデルの学習・改善に利用することもありません。取得したデータは、Zoomプライバシーに関する声明に従って取り扱われるとともに、広告配信やユーザーのプロファイリング目的で使用されることはありません。お客様がZoomマーケットプレイスから本サービスの連携を解除（アンインストール）した場合、当社は第6条の規定にかかわらず、取得済みのOAuthアクセストークンおよびZoom関連データを24時間以内に速やかに削除または匿名化いたします。
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

            <Section title="第10条（プライバシーポリシーの変更）">
              <p>
                当社は、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当社ウェブサイトに掲載した時点から効力を生じるものとします。
              </p>
            </Section>

            <Section title="第11条（お問い合わせ窓口）">
              <p>
                本プライバシーポリシーに関するお問い合わせは、下記までご連絡ください。
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
                  <strong>DynaMeet株式会社</strong>
                  <br />
                  〒150-0033 東京都渋谷区猿楽町17-10 代官山アートヴィレッジ2C
                  <br />
                  メール: info@dynameet.ai
                </p>
              </div>
            </Section>

            <p style={{ marginTop: 48, color: "#6e7494", fontSize: 14 }}>
              制定日：2024年10月3日
              <br />
              最終更新日：2026年4月23日
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
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

