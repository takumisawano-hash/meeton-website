import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'セキュリティポリシー',
  description: 'DynaMeet株式会社のセキュリティポリシー。情報セキュリティへの取り組み方針を掲載しています。',
  alternates: {
    canonical: '/security-policy/',
  },
  openGraph: {
    title: 'セキュリティポリシー｜Meeton ai',
    description:
      'DynaMeet株式会社のセキュリティポリシー。情報セキュリティへの取り組み方針を掲載しています。',
    url: 'https://dynameet.ai/security-policy/',
  },
}

const policyBlocks = [
  'DynaMeet株式会社（以下、当社）は、当社の情報資産、並びにお客様からお預かりした情報資産を事故・災害・犯罪などの脅威から守り、お客様ならびに社会の信頼に応えるべく、以下の方針に基づき全社で情報セキュリティに取り組みます。',
  '1.経営者の責任\n当社は、経営者主導で組織的かつ継続的に情報セキュリティの改善・向上に努めます。',
  '2.社内体制の整備\n当社は、情報セキュリティの維持及び改善のために組織を設置し、情報セキュリティ対策を社内の正式な規則として定めます。',
  '3.従業員の取組み\n当社の従業員は、情報セキュリティおよび最新のAI利活用のために必要とされる知識、技術を習得し、情報セキュリティへの取り組みを確かなものにします。',
  '4.法令及び契約上の要求事項の遵守\n当社は、情報セキュリティに関わる法令、規制、規範、契約上の義務を遵守するとともに、お客様の期待に応えます。',
  '5.違反及び事故への対応\n当社は、情報セキュリティに関わる法令違反、契約違反及び事故が発生した場合には適切に対処し、再発防止に努めます。',
  '6. クラウドセキュリティへの取り組み 当社は、クラウドサービスプロバイダおよびクラウドサービスカスタマとして、クラウド特有のリスクを認識し、適切な管理策を適用することで、安心・安全なクラウド環境を実現します。',
  '7. AIファースト企業としてのガバナンスとイノベーションの推進\n当社は、AIファースト企業として、AI技術を競争力の源泉かつ経営の最優先事項として積極的に活用します。利用にあたっては、日本の「AI推進法」等の関連法規を遵守します。企業秘密や個人情報がAIモデルの学習に意図せず利用されることを防ぐため、安全なエンタープライズ環境の提供と適切な管理体制を構築し、安全性と業務スピードを高度に両立した価値創造を追求します。',
  '制定日:2026年01月23日\nDynaMeet株式会社\n取締役 Ray Ayan',
] as const

export default function SecurityPolicyPage() {
  return (
    <>
      <Nav />
      <main
        style={{
          minHeight: '100vh',
          paddingTop: 'clamp(70px, 12vw, 100px)',
          background: '#fff',
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            padding: 'clamp(24px, 6vw, 48px) clamp(16px, 4vw, 24px) clamp(50px, 10vw, 80px)',
          }}
        >
          <nav
            aria-label="パンくずリスト"
            style={{
              marginBottom: 'clamp(20px, 4vw, 32px)',
              fontSize: 'clamp(12px, 2vw, 14px)',
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
            <span style={{ color: '#0f1128' }}>セキュリティポリシー</span>
          </nav>

          <header style={{ marginBottom: 'clamp(32px, 6vw, 48px)' }}>
            <h1
              style={{
                fontSize: 'clamp(28px, 5vw, 36px)',
                fontWeight: 800,
                color: '#0f1128',
                margin: 0,
              }}
            >
              セキュリティポリシー
            </h1>
          </header>

          <div
            style={{
              fontSize: 'clamp(14px, 2vw, 15px)',
              lineHeight: 1.9,
              color: '#374151',
            }}
          >
            {policyBlocks.map((block, index) => (
              <p
                key={block}
                style={{
                  margin: index === policyBlocks.length - 1 ? 'clamp(32px, 6vw, 48px) 0 0' : '0 0 24px',
                  whiteSpace: 'pre-line',
                }}
              >
                {block}
              </p>
            ))}
          </div>

          <section
            style={{
              marginTop: 'clamp(32px, 6vw, 56px)',
              padding: 'clamp(22px, 4vw, 30px)',
              borderRadius: 24,
              background: 'linear-gradient(135deg, #f3faf7 0%, #ffffff 100%)',
              border: '1px solid #dceae4',
              boxShadow: '0 12px 32px rgba(15, 23, 42, 0.05)',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#0f766e',
                marginBottom: 10,
              }}
            >
              Security Overview
            </div>
            <h2
              style={{
                fontSize: 'clamp(22px, 4vw, 28px)',
                fontWeight: 850,
                lineHeight: 1.3,
                color: '#0f1128',
                margin: '0 0 10px',
              }}
            >
              具体的なセキュリティ対策は別ページで公開しています
            </h2>
            <p
              style={{
                fontSize: 'clamp(14px, 2vw, 15px)',
                lineHeight: 1.85,
                color: '#4b5563',
                margin: '0 0 18px',
              }}
            >
              情報セキュリティの基本方針に加えて、ISMS認証取得に向けた取り組み、インフラ構成、暗号化方針、AI運用上の保護策は「セキュリティ対策について」ページで確認できます。
            </p>
            <Link
              href="/security/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 22px',
                borderRadius: 999,
                background: 'linear-gradient(135deg, #12a37d, #0f8d73)',
                color: '#fff',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 12px 28px rgba(18, 163, 125, 0.22)',
              }}
            >
              セキュリティ対策について見る
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}