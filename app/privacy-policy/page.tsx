import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'DynaMeet株式会社のプライバシーポリシー。個人情報の取り扱いについて定めています。',
  alternates: {
    canonical: '/privacy-policy/',
  },
  openGraph: {
    title: 'プライバシーポリシー｜Meeton AI',
    description: 'DynaMeet株式会社のプライバシーポリシー。個人情報の取り扱いについて定めています。',
    url: 'https://dynameet.ai/privacy-policy/',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main
        style={{
          minHeight: '100vh',
          paddingTop: 100,
          background: '#fff',
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            padding: '48px 24px 80px',
          }}
        >
          {/* Breadcrumb */}
          <nav
            aria-label="パンくずリスト"
            style={{
              marginBottom: 32,
              fontSize: 14,
              color: '#6e7494',
            }}
          >
            <Link
              href="/"
              style={{
                color: '#6e7494',
                textDecoration: 'none',
              }}
            >
              ホーム
            </Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#0f1128' }}>プライバシーポリシー</span>
          </nav>

          {/* Header */}
          <header style={{ marginBottom: 48 }}>
            <h1
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: '#0f1128',
                margin: 0,
              }}
            >
              プライバシーポリシー
            </h1>
          </header>

          {/* Content */}
          <div
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: '#374151',
            }}
          >
            <p style={{ marginBottom: 32 }}>
              DynaMeet株式会社（以下「当社」といいます）は、お客様の個人情報の保護を重要な責務と考え、以下のプライバシーポリシーに従って個人情報を適切に取り扱います。
            </p>

            <Section title="第1条（個人情報の定義）">
              <p>
                本プライバシーポリシーにおいて「個人情報」とは、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別できるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含みます）をいいます。
              </p>
            </Section>

            <Section title="第2条（個人情報の収集方法）">
              <p>当社は、以下の方法により個人情報を収集することがあります。</p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>お問い合わせフォームからの送信時</li>
                <li>サービスのご利用登録時</li>
                <li>メールマガジンの登録時</li>
                <li>その他、当社サービスの利用に関連して</li>
              </ul>
            </Section>

            <Section title="第3条（個人情報の利用目的）">
              <p>当社は、収集した個人情報を以下の目的で利用いたします。</p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>当社サービスの提供・運営のため</li>
                <li>お問い合わせへの対応のため</li>
                <li>サービスに関するご案内やお知らせのため</li>
                <li>サービスの改善・新サービスの開発のため</li>
                <li>利用規約に違反した行為への対応のため</li>
                <li>その他、上記利用目的に付随する目的のため</li>
              </ul>
            </Section>

            <Section title="第4条（個人情報の第三者提供）">
              <p>
                当社は、法令に基づく場合を除き、あらかじめお客様の同意を得ることなく、第三者に個人情報を提供することはありません。ただし、以下の場合はこの限りではありません。
              </p>
              <ul style={{ paddingLeft: 24, marginTop: 12 }}>
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
              </ul>
            </Section>

            <Section title="第5条（個人情報の安全管理）">
              <p>
                当社は、個人情報の紛失、破壊、改ざん、漏洩等を防止するため、適切なセキュリティ対策を講じます。また、個人情報を取り扱う従業員に対して、適切な監督を行います。
              </p>
            </Section>

            <Section title="第6条（個人情報の開示・訂正・削除）">
              <p>
                お客様は、当社に対して、ご自身の個人情報の開示、訂正、追加、削除、利用停止を請求することができます。請求を受けた場合、当社は本人確認を行った上で、合理的な期間内に対応いたします。
              </p>
            </Section>

            <Section title="第7条（Cookie等の利用）">
              <p>
                当社のウェブサイトでは、サービスの利便性向上やアクセス解析のため、Cookieおよび類似の技術を使用しています。お客様はブラウザの設定によりCookieを無効にすることができますが、一部のサービスが正常に機能しない場合があります。
              </p>
            </Section>

            <Section title="第8条（アクセス解析ツールについて）">
              <p>
                当社のウェブサイトでは、Google Inc.が提供するアクセス解析ツール「Google Analytics」を利用しています。Google Analyticsはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
              </p>
            </Section>

            <Section title="第9条（外部サービスとの連携）">
              <p>
                当社サービスは、お客様の利便性向上のため、外部サービス（CRM、カレンダー等）と連携する場合があります。連携に際しては、必要最小限の情報のみを共有し、各外部サービスのプライバシーポリシーに従って取り扱われます。
              </p>
            </Section>

            <Section title="第10条（プライバシーポリシーの変更）">
              <p>
                当社は、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当社ウェブサイトに掲載した時点から効力を生じるものとします。
              </p>
            </Section>

            <Section title="第11条（お問い合わせ窓口）">
              <p>本プライバシーポリシーに関するお問い合わせは、下記までご連絡ください。</p>
              <div
                style={{
                  background: '#f8fafc',
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

            <p style={{ marginTop: 48, color: '#6e7494', fontSize: 14 }}>
              制定日：2024年10月3日
              <br />
              最終更新日：2024年10月3日
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#0f1128',
          marginBottom: 16,
          paddingBottom: 8,
          borderBottom: '2px solid #12a37d',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
