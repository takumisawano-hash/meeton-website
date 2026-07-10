import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, Check } from "@/app/components/v2/ui";

/**
 * /compare/inside-sales-automation/ — カテゴリ比較ハブ（JA only）。
 *
 * Target intent: "インサイドセールス 自動化 ツール" / "インサイドセールス 効率化 比較"
 *
 * 軸: IS業務の工程分解（初動対応/ヒアリング/日程調整/追客/記録）ごとに
 * 自動化ツールカテゴリを整理し、一気通貫型 vs 単機能特化型の使い分けを示す。
 * 競合ファクトは compare-data.ts（検証済み）+ ma-vs-ai-sdr の公開情報のみ
 * （数値の創作なし）。
 */

export const revalidate = 3600;

const PATH = "/compare/inside-sales-automation/";
const URL_ = `https://dynameet.ai${PATH}`;

export const metadata: Metadata = {
  title: "インサイドセールス自動化ツール比較｜工程別の分類と選び方",
  description:
    "IS業務を初動対応・ヒアリング・日程調整・追客・記録の5工程に分解し、Meeton ai・immedio・TimeRex・Spir・lemlist・Smartlead・MAツールを横断比較。一気通貫型と単機能特化型の使い分けを公正に整理。",
  alternates: { canonical: PATH },
  openGraph: {
    title: "インサイドセールス自動化ツール比較｜工程別の分類と選び方｜Meeton ai",
    description:
      "インサイドセールスの5工程（初動対応・ヒアリング・日程調整・追客・記録）ごとに自動化ツールカテゴリを整理。一気通貫型（AI SDR）と単機能特化型、それぞれが正解になるケースを解説。",
    url: URL_,
    siteName: "Meeton ai",
    locale: "ja_JP",
    type: "website",
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
};

// ───────────────────────── FAQ（FAQPage JSON-LD と共用） ─────────────────────────

const FAQ = [
  {
    q: "インサイドセールス自動化ツールとは何ですか？",
    a: "電話・メール・人手に依存していたインサイドセールス業務 — リード発生直後の初動対応、課題ヒアリング、商談の日程調整、未予約リードの追客、CRMへの記録 — を自動化するツールの総称です。全工程を1つのプラットフォームで担う一気通貫型（AI SDR）と、日程調整やメール配信など特定工程に特化した単機能型に大別されます。",
  },
  {
    q: "一気通貫型と単機能特化型は、どちらを選ぶべきですか？",
    a: "詰まっている工程の数で決まります。「日程調整だけが面倒」のようにボトルネックが1工程なら、その工程に特化したツール（immedio・TimeRex・Spir など）が最速かつ低コストです。初動の遅れ→ヒアリング不足→未予約リードの放置、と複数の工程でリードが漏れているなら、工程間の連携とデータの一元化そのものが課題のため、一気通貫型（AI SDR）が向きます。",
  },
  {
    q: "日程調整ツールだけで商談化は自動化できますか？",
    a: "日程調整ツール（TimeRex・Spir など）が自動化するのは「空き時間の調整」という1工程です。予約URLを送る前の初動対応・課題ヒアリングと、送った後の未予約リードのフォローは人手に残ります。日程調整の工数削減が目的なら十分ですが、商談化率を上げたい場合は、予約前の会話で温度を上げる工程と未予約リードへの追客工程まで含めて自動化するかを検討してください。",
  },
  {
    q: "MAツールを導入済みでも、インサイドセールス自動化ツールは必要ですか？",
    a: "役割が異なるため、併用が前提です。MA（HubSpot・Marketo・Pardot など）はマーケファネル全体のリード管理・スコアリング・一斉メール配信を担う基盤ですが、個別リードを商談に変える実行 — 初動の1対1対応、会話でのヒアリング、チャット内での予約確定 — は人手に残るのが一般的です。MAが引き渡したリードの商談化がボトルネックなら、実行レイヤー（AI SDR など）がMAを補完します。",
  },
  {
    q: "lemlist や Smartlead は日本のインサイドセールスに使えますか？",
    a: "両者は新規リストへのコールドメール配信（アウトバウンド開拓）に強い海外SaaSで、用途が合えば強力です。lemlist はメール・LinkedIn・電話を横断するマルチチャネル開拓、Smartlead は無制限メールボックスと自動ウォームアップによる大量配信・到達率管理が強みです。一方、日本のインバウンド型ISで多い「問い合わせ後の未予約リードの追客」は、送信リストではなく行動シグナル起点の1対1フォローが必要になるため、設計が異なります。新規開拓か追客か、目的を先に決めるのが失敗しない選び方です。",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: URL_,
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://dynameet.ai/" },
    { "@type": "ListItem", position: 2, name: "インサイドセールス自動化ツール比較", item: URL_ },
  ],
};

// ───────────────────────── 工程分解データ ─────────────────────────

const PROCESS_STEPS: { step: string; work: string; category: string; tools: string }[] = [
  {
    step: "① 初動対応",
    work: "問い合わせ・資料DL直後の一次応答。速度が商談化率を大きく左右する",
    category: "一気通貫型（AI SDR）",
    tools: "Meeton ai（初動5秒・24時間365日）",
  },
  {
    step: "② ヒアリング",
    work: "課題・検討状況の把握と、リードの温度の見極め",
    category: "一気通貫型（AI会話）／MAはスコアリングで補助",
    tools: "Meeton ai、MAツール群",
  },
  {
    step: "③ 日程調整",
    work: "商談予約・カレンダー調整・リマインド",
    category: "商談化特化型・日程調整型",
    tools: "immedio、TimeRex、Spir、Meeton ai",
  },
  {
    step: "④ 追客",
    work: "未予約・休眠リードのフォロー（新規開拓のコールド配信は別カテゴリ）",
    category: "メール自動化型",
    tools: "Meeton ai（行動シグナル起点の1:1）、MA（シナリオ配信）。新規開拓は lemlist・Smartlead",
  },
  {
    step: "⑤ 記録",
    work: "CRMへのコンタクト登録・活動履歴の管理",
    category: "CRM連携",
    tools: "Meeton ai（HubSpot / Salesforce 自動登録）、immedio（連携・自動差配）、MA / CRM",
  },
];

// ───────────────────────── 比較表データ ─────────────────────────

type VendorRow = {
  name: string;
  href: string;
  target: string; // 主な対象
  purpose: string; // 主目的
  ai: string; // AI会話
  booking: string; // 商談予約
  pricing: string; // 料金公開
  japanese: string; // 日本語
  coverage: string; // カバー工程
  meeton?: boolean;
};

const VENDORS: VendorRow[] = [
  {
    name: "Meeton ai",
    href: "/chat/",
    target: "BtoB企業のインバウンドリード",
    purpose: "商談化の一気通貫自動化（AI SDR）",
    ai: "○ LLMネイティブ（シナリオ設計不要）",
    booking: "○ 会話で温度を上げてチャット内で予約確定",
    pricing: "公開（基本プラン15万円〜＋アドオン）",
    japanese: "○ 国産・日本語ネイティブ",
    coverage: "初動対応→ヒアリング→日程調整→追客→記録",
    meeton: true,
  },
  {
    name: "immedio",
    href: "/compare/immedio/",
    target: "フォーム送信直後のインバウンドリード",
    purpose: "サンクスページでの即時商談化",
    ai: "− フォーム後にポップアップで予約提示（予約前のAI会話はなし）",
    booking: "○ サンクスページ／資料／名刺の3導線",
    pricing: "非公開（要問い合わせ）",
    japanese: "○ 国産",
    coverage: "日程調整（＋Salesforce / HubSpot 連携・自動差配）",
  },
  {
    name: "TimeRex",
    href: "/compare/timerex/",
    target: "個人〜企業の日程調整全般",
    purpose: "空き時間の自動調整（スケジューリング）",
    ai: "−（日程調整に特化）",
    booking: "○ 予約URL共有型（リマインド・会議室予約等）",
    pricing: "公開（無料〜月1,500円程度/ユーザー・税抜）",
    japanese: "○ 国産",
    coverage: "日程調整",
  },
  {
    name: "Spir",
    href: "/compare/spir/",
    target: "個人〜中規模チーム",
    purpose: "複数カレンダー統合のスケジューリング",
    ai: "−（日程調整に特化）",
    booking: "○ カレンダー統合・タイムゾーン対応に強み",
    pricing: "公開（無料（3名まで）〜チームプラン）",
    japanese: "○ 国産",
    coverage: "日程調整",
  },
  {
    name: "lemlist",
    href: "/compare/lemlist/",
    target: "新規開拓リスト（海外向け中心）",
    purpose: "コールドメール／マルチチャネル開拓",
    ai: "− テンプレ＋動的パーソナライズ配信",
    booking: "−（シーケンス到達・返信獲得がゴール）",
    pricing: "公開（Email $31/月〜、Multichannel $87/月〜）",
    japanese: "− 英語中心の海外SaaS",
    coverage: "送信シーケンス（新規開拓）",
  },
  {
    name: "Smartlead",
    href: "/compare/smartlead/",
    target: "大量コールド配信（代行・エージェンシー含む）",
    purpose: "大量配信の到達率管理",
    ai: "− テンプレ＋差し込み中心",
    booking: "−（大量配信の到達・返信獲得がゴール）",
    pricing: "公開（Basic $39/月〜Unlimited $174/月）",
    japanese: "− 英語中心の海外SaaS",
    coverage: "送信シーケンス（新規開拓）",
  },
  {
    name: "MAツール群（HubSpot 等）",
    href: "/compare/ma-vs-ai-sdr/",
    target: "マーケファネル全体",
    purpose: "リード管理・スコアリング・一斉メール配信",
    ai: "△ 製品による（HubSpot の Chatflows はルールベース中心）",
    booking: "△ 予約リンクの提示等（チャット内完結型ではない構成が中心）",
    pricing: "製品による（HubSpot は公開、例: Marketing Hub Professional $800/月〜）",
    japanese: "△ 製品による（HubSpot は日本語ローカライズ済み）",
    coverage: "ヒアリング補助（スコアリング）・追客（一斉配信）・記録",
  },
];

// ───────────────────────── 各ベンダー解説 ─────────────────────────

type VendorProfile = {
  name: string;
  href: string;
  linkLabel: string;
  body: string;
  fit: string;
  refs: number[];
};

const PROFILES: VendorProfile[] = [
  {
    name: "immedio（株式会社immedio）",
    href: "/compare/immedio/",
    linkLabel: "immedio との詳細比較を見る",
    body: "フォーム送信直後という最も熱量の高い瞬間の商談化に特化した国産SaaS。immedio / Box / Forms の3製品構成で、サンクスページ・資料・展示会名刺の3導線をカバーします。上場SaaS企業を含む導入実績があり、Sansan での商談処理工数60%削減などの成果を公表。2024年5月にシリーズA 3.5億円を調達し、ISMS（ISO/IEC 27001）も2023年10月に取得済みです。Salesforce / HubSpot 連携・担当者の自動差配に対応。料金は非公開（要問い合わせ）です。",
    fit: "フォーム送信直後の即時商談化という1工程に用途を絞って堅実に固めたいなら、専業としての完成度と実績が明確な強みです。",
    refs: [1],
  },
  {
    name: "TimeRex（ミクステンド株式会社）",
    href: "/compare/timerex/",
    linkLabel: "TimeRex との詳細比較を見る",
    body: "無料から使える国産の日程調整ツール。登録者45万人、フリー〜エンタープライズの4段階プランで、有料プランも月1,500円程度/ユーザー（税抜）からとコストパフォーマンスが高いのが特徴です。多様な調整パターン、会議室予約やリマインドに対応し、3,000以上の外部連携、ISO27001 取得、最大95%の調整工数削減を公称しています。予約URLを共有して相手が空き時間を選ぶ方式で、日程調整という工程の完成度は高い選択肢です。",
    fit: "用途が純粋な日程調整で、コストを最優先してスモールスタートしたい場合に最適です。",
    refs: [2],
  },
  {
    name: "Spir（株式会社Spir）",
    href: "/compare/spir/",
    linkLabel: "Spir との詳細比較を見る",
    body: "複数カレンダーの同時接続・タイムゾーン対応など、スケジューリング体験と統合の深さに強みを持つ国産の日程調整SaaS。登録40万人超、無料（3名まで）から使える PLG モデルで、個人から大企業まで裾野が広く、ISMS 認証も取得しています。海外取引先との調整や、複数の職場カレンダーを統合した空き時間管理を丁寧にやりたいチームに向きます。",
    fit: "複数カレンダー統合・海外とのスケジューリングなど、日程調整の質を重視する場合に向きます。",
    refs: [3],
  },
  {
    name: "lemlist",
    href: "/compare/lemlist/",
    linkLabel: "lemlist との詳細比較を見る",
    body: "新規リストへのコールドメール／マルチチャネル開拓に強い海外SaaS。メール・LinkedIn・電話・SMS などを横断するシーケンス、650M件超の内蔵リードDB、ハイパーパーソナライズ、到達率改善機能（lemwarm）が特徴で、海外向けアウトバウンドでは高評価（G2 4.6）です。料金は Email $31/月〜、Multichannel $87/月〜と公開されています。設計の起点は送信リスト・シーケンスであり、インバウンドリードの行動シグナル起点の追客とは目的が異なる点に注意が必要です。",
    fit: "海外向けに新規リストへのコールド開拓を大量に回したい場合、リードDB内蔵のマルチチャネル配信が強力です。",
    refs: [4],
  },
  {
    name: "Smartlead",
    href: "/compare/smartlead/",
    linkLabel: "Smartlead との詳細比較を見る",
    body: "無制限メールボックス接続と自動ウォームアップによる配信到達率の管理に特化した海外SaaS（G2 4.6）。複数クライアントを統合管理できるエージェンシー向け設計（ホワイトラベル対応）が特徴で、代行・エージェンシー用途で特に支持されています。料金は Basic $39/月〜Unlimited $174/月と公開。lemlist と同じく大量コールド配信が主目的で、既存リードの1対1追客用ではありません。",
    fit: "大量のコールドメールを高い到達率で送り続けたい場合、特に複数クライアントを扱う代行・エージェンシーに向きます。",
    refs: [5],
  },
  {
    name: "MAツール群（HubSpot・Marketo・Pardot 等）",
    href: "/compare/ma-vs-ai-sdr/",
    linkLabel: "MA vs AI SDR の詳細比較を見る",
    body: "マーケファネル全体のリード管理・スコアリング・一斉メール配信を担う基盤カテゴリ。IS業務の工程では、ヒアリングの補助（行動スコアリング）と追客（事前定義シナリオの一斉配信）、記録（CRM側）を広くカバーします。例えば HubSpot は無料CRM枠からチャット（Chatflows：ルールベースのボットビルダー＋ライブチャット）を使え、ボット内でミーティング予約リンクの提示も可能です（カスタム項目がある場合は予約ページへ遷移する仕様）。料金は HubSpot が公開（Marketing Hub Professional $800/月〜等）。一方、個別リードと会話しながら商談予約まで運ぶ実行レイヤーは主目的ではなく、AI SDR とは置き換えではなく補完関係です。",
    fit: "ファネル全体のリード管理・育成基盤が必要ならMAが土台です。その上で、商談化のラストワンマイルを自動化する実行レイヤーを重ねる構成が現実的です。",
    refs: [6],
  },
  {
    name: "Meeton ai",
    href: "/chat/",
    linkLabel: "Meeton ai の製品詳細を見る",
    body: "IS業務の5工程を1つのプラットフォームで自動化する、BtoB特化の国産 AI SDR。リード発生から初動5秒・24時間365日で AI が会話を開始し（①初動対応）、シナリオ設計なしで課題を聞き（②ヒアリング）、温度が上がった瞬間にチャット内で商談予約を確定（③日程調整）。未予約・休眠リードには行動シグナルを起点に AI が1対1で追客し（④追客）、会話・興味・商談化結果は HubSpot / Salesforce に自動登録されます（⑤記録）。JSタグ1行・最短5分で設置でき、料金は基本プラン15万円〜＋アドオンで公開。導入企業では商談化率60%以上（EdulinX）、チャット経由リード20倍（BizteX）、月間SQL 2倍（G-gen）などの成果が出ています。",
    fit: "複数の工程でリードが漏れている、ツール間のデータ分断を避けたい、IS人員が限られている — この場合は工程を横断する一気通貫型が直接効きます。",
    refs: [7],
  },
];

// ───────────────────────── 出典 ─────────────────────────

const SOURCES: { n: number; text: string }[] = [
  { n: 1, text: "immedio 公式：サンクスページ商談化・immedio / Box / Forms の3製品構成・Sansan 商談処理工数60%削減事例（immedio.io/function, immedio.io/case）。2024年5月シリーズA 3.5億円調達・ISMS（ISO/IEC 27001）2023年10月取得・料金非公開（corp.immedio.io）" },
  { n: 2, text: "TimeRex 公式：登録者45万人・フリー〜エンタープライズ4段階・ISO27001 取得・最大95%工数削減公称・3,000以上の外部連携（timerex.net/plan, timerex.net/feature）" },
  { n: 3, text: "Spir 公式：登録40万人超・Free（3名まで）〜チームプラン・ISMS 認証・複数カレンダー／タイムゾーン対応（spirinc.com）" },
  { n: 4, text: "lemlist 公式：メール／LinkedIn／電話のマルチチャネル開拓・650M件超リードDB・lemwarm・Email $31/月〜／Multichannel $87/月〜（lemlist.com/pricing）" },
  { n: 5, text: "Smartlead 公式：無制限メールボックス・自動ウォームアップ・エージェンシー向け統合管理・Basic $39/月〜Unlimited $174/月（smartlead.ai/pricing, g2.com）" },
  { n: 6, text: "HubSpot 公式：Chatflows（ライブチャット＋ルールベースBot）は無料CRMに含まれる・Bot内 Book a meeting は予約リンク提示（カスタム項目がある場合は予約ページへ遷移）・Marketing Hub Professional $800/月〜（hubspot.com/pricing/marketing, knowledge.hubspot.com/chatflows）。Marketo・Pardot 等その他MAの仕様・料金は各社公式をご確認ください" },
  { n: 7, text: "Meeton ai：商談化率60%以上（EdulinX事例）、チャット経由リード20倍（BizteX事例）、月間SQL 2倍（G-gen事例）、初動5秒・24時間365日・JSタグ1行最短5分・基本プラン15万円〜は自社公表（dynameet.ai/cases, dynameet.ai/pricing）" },
];

// ───────────────────────── スタイル ─────────────────────────

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "13px 16px",
  fontWeight: 800,
  color: "var(--heading)",
  borderBottom: "2px solid var(--border)",
  fontSize: 13,
  whiteSpace: "nowrap",
};
const td: React.CSSProperties = {
  padding: "13px 16px",
  color: "var(--text)",
  borderBottom: "1px solid var(--border)",
  fontSize: 13.5,
  lineHeight: 1.7,
  verticalAlign: "top",
};

function Refs({ ns }: { ns: number[] }) {
  return (
    <sup style={{ fontSize: 10.5, color: "var(--sub)", marginLeft: 4 }}>
      {ns.map((n, i) => (
        <a key={n} href="#sources" style={{ color: "var(--sub)", textDecoration: "none" }}>
          {i > 0 ? "," : ""}[{n}]
        </a>
      ))}
    </sup>
  );
}

// ───────────────────────── Page ─────────────────────────

export default function InsideSalesAutomationPage() {
  const SRC = "compare-inside-sales-automation";
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav />
      <main>
        {/* Hero — 定義文 + 結論先出し（AEO） */}
        <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 60 }}>
          <div style={{ maxWidth: 860 }}>
            <Eyebrow tone="dark">比較 — インサイドセールス自動化</Eyebrow>
            <h1
              style={{
                fontFamily: "var(--fd)",
                fontSize: "clamp(28px,4.6vw,44px)",
                lineHeight: 1.25,
                fontWeight: 800,
                letterSpacing: "-0.025em",
                color: "var(--on-navy)",
                margin: "20px 0 0",
                textWrap: "balance",
              }}
            >
              インサイドセールス自動化ツール比較 — 5つの工程ごとに、最適なカテゴリは違う。
            </h1>
            <div
              style={{
                background: "var(--navy-2)",
                border: "1px solid var(--on-navy-border)",
                borderRadius: 14,
                padding: "18px 20px",
                margin: "24px 0 28px",
              }}
            >
              <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: "var(--cta)", marginBottom: 8 }}>
                結論
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--on-navy)", margin: 0 }}>
                インサイドセールス自動化ツールとは、初動対応・ヒアリング・日程調整・追客・記録という IS の5工程を自動化するツールの総称です。全工程を1つで担う一気通貫型（AI SDR）と、特定工程に特化した単機能型に分かれます。ボトルネックが1工程なら単機能型、複数工程でリードが漏れているなら一気通貫型 — これが選定の基本原則です。
              </p>
            </div>
            <CTAButtons source={`${SRC}-hero`} tone="onNavy" size="lg" primaryLabel="自社に合う構成を相談する" />
          </div>
        </Section>

        {/* 工程分解 */}
        <Section tone="white">
          <SectionHead
            eyebrow="比較の観点"
            title="IS業務を5工程に分解すると、ツールの選び方が見える"
            lede="「インサイドセールス自動化」と一括りにされるツールは、実際には担当する工程がまったく異なります。まず自社のどの工程が詰まっているかを特定し、その工程を自動化するカテゴリから選ぶ — この順序が失敗しない選定です。"
          />
          <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: 16, background: "#fff" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
              <thead>
                <tr>
                  <th style={th}>工程</th>
                  <th style={th}>主な業務</th>
                  <th style={th}>自動化を担うカテゴリ</th>
                  <th style={th}>主なツール</th>
                </tr>
              </thead>
              <tbody>
                {PROCESS_STEPS.map((p) => (
                  <tr key={p.step}>
                    <td style={{ ...td, fontWeight: 800, whiteSpace: "nowrap", color: "var(--heading)" }}>{p.step}</td>
                    <td style={td}>{p.work}</td>
                    <td style={td}>{p.category}</td>
                    <td style={td}>{p.tools}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 分類解説 */}
        <Section tone="surface">
          <SectionHead
            eyebrow="4つのカテゴリ"
            title="一気通貫型か、単機能特化型か"
            lede="各カテゴリに優劣があるのではなく、担当する工程と設計思想が異なります。単機能型は特定工程の完成度、一気通貫型は工程間の連携とデータの一元化が価値です。"
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            <Card style={{ border: "2px solid var(--cta)" }}>
              <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 800, color: "var(--cta-ink)", marginBottom: 10 }}>
                分類① 一気通貫型（AI SDR）
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>Meeton ai</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
                初動対応からヒアリング・商談予約・追客・CRM記録まで、5工程を1つのAIプラットフォームで完結。工程間でリードが漏れず、会話・興味・履歴のデータが分断されないのが単機能型の組み合わせとの最大の違いです。
              </p>
            </Card>
            <Card>
              <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 800, color: "var(--cta-ink)", marginBottom: 10 }}>
                分類② 商談化・日程調整特化型
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>
                immedio・TimeRex・Spir
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
                「③日程調整」の工程に特化。immedio はフォーム直後の即時商談化、TimeRex・Spir は空き時間調整の自動化が主目的です。この1工程がボトルネックなら、最速・低コストで効果が出ます。前後の工程（初動の会話・未予約フォロー）は人手に残ります。
              </p>
            </Card>
            <Card>
              <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 800, color: "var(--cta-ink)", marginBottom: 10 }}>
                分類③ 営業メール配信型
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>
                lemlist・Smartlead
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
                新規リストへのコールドメール配信・到達率管理に特化した海外SaaS。工程では「④追客」に近く見えますが、対象は既存リードではなく新規開拓リストです。アウトバウンド開拓が目的なら強力、インバウンドリードの追客とは設計が異なります。
              </p>
            </Card>
            <Card>
              <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 800, color: "var(--cta-ink)", marginBottom: 10 }}>
                分類④ MAツール群
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>
                HubSpot・Marketo・Pardot 等
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
                ファネル全体のリード管理・スコアリング・一斉メール配信を担う基盤。②ヒアリング（スコアで補助）と④追客（シナリオ配信）を広くカバーしますが、個別リードと会話して商談に変える実行は主目的ではありません。AI SDR とは補完関係です。
              </p>
            </Card>
          </div>
        </Section>

        {/* 比較表 */}
        <Section tone="white" id="table">
          <SectionHead
            eyebrow="比較表"
            title="インサイドセールス自動化ツール 7選 横断比較"
            lede="各ツール名から個別の詳細比較ページに移動できます。"
          />
          <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: 16, background: "#fff" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1080 }}>
              <thead>
                <tr>
                  <th style={th}>ツール</th>
                  <th style={th}>主な対象</th>
                  <th style={th}>主目的</th>
                  <th style={th}>AI会話</th>
                  <th style={th}>商談予約</th>
                  <th style={th}>料金公開</th>
                  <th style={th}>日本語</th>
                  <th style={th}>カバー工程</th>
                </tr>
              </thead>
              <tbody>
                {VENDORS.map((v) => (
                  <tr key={v.name} style={v.meeton ? { background: "var(--cta-wash)" } : undefined}>
                    <td style={{ ...td, fontWeight: 800, whiteSpace: "nowrap" }}>
                      <Link href={v.href} style={{ color: v.meeton ? "var(--cta-ink)" : "var(--heading)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                        {v.name}
                      </Link>
                    </td>
                    <td style={td}>{v.target}</td>
                    <td style={{ ...td, fontWeight: v.meeton ? 700 : 400 }}>{v.purpose}</td>
                    <td style={td}>{v.ai}</td>
                    <td style={{ ...td, fontWeight: v.meeton ? 700 : 400 }}>{v.booking}</td>
                    <td style={td}>{v.pricing}</td>
                    <td style={td}>{v.japanese}</td>
                    <td style={{ ...td, fontWeight: v.meeton ? 700 : 400 }}>{v.coverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: "var(--sub)", marginTop: 12 }}>
            ※ 各社の情報は2026年時点の公開情報に基づく参考です（最新の仕様・料金は各社公式をご確認ください）。「−」は公開情報で該当機能を確認できなかったことを示し、機能が存在しないことの断定ではありません。
          </p>
        </Section>

        {/* 各ベンダー解説 */}
        <Section tone="surface">
          <SectionHead
            eyebrow="各ツールの特徴"
            title="7ツールの強みと、それぞれが正解になるケース"
            lede="どのツールにも明確な強みがあります。自社の詰まっている工程と目的（新規開拓か、インバウンド商談化か、日程調整か）に照らして選ぶのが失敗しない選定です。"
          />
          <div style={{ display: "grid", gap: 20 }}>
            {PROFILES.map((p) => (
              <Card key={p.name} style={p.name === "Meeton ai" ? { border: "2px solid var(--cta)" } : undefined}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>
                  {p.name}
                  <Refs ns={p.refs} />
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.85, color: "var(--text)", margin: "0 0 12px" }}>{p.body}</p>
                <p style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14, lineHeight: 1.75, color: "var(--heading)", fontWeight: 700, margin: "0 0 14px" }}>
                  <Check size={17} /> {p.fit}
                </p>
                <Link href={p.href} style={{ fontSize: 13.5, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                  {p.linkLabel} →
                </Link>
              </Card>
            ))}
          </div>
        </Section>

        {/* 選び方 */}
        <Section tone="white">
          <SectionHead eyebrow="選び方" title="インサイドセールス自動化ツール選定の3ステップ" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            <Card>
              <div style={{ fontFamily: "var(--fm)", fontSize: 13, fontWeight: 800, color: "var(--cta-ink)", marginBottom: 10 }}>STEP 1</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>詰まっている工程を特定する</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
                初動対応が遅い・夜間休日を取りこぼしている（①）、リードの温度が分からない（②）、日程調整の往復が多い（③）、未予約リードが放置されている（④）、CRM入力が回っていない（⑤）。まずどの工程でリードが漏れているかをデータで確認します。
              </p>
            </Card>
            <Card>
              <div style={{ fontFamily: "var(--fm)", fontSize: 13, fontWeight: 800, color: "var(--cta-ink)", marginBottom: 10 }}>STEP 2</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>1工程なら単機能型、複数なら一気通貫型</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
                ボトルネックが日程調整だけなら immedio・TimeRex・Spir が最速です。複数工程で漏れているなら、単機能ツールを継ぎ足すほど連携・運用コストとデータ分断が増えるため、初動から追客・記録まで1つで繋がる一気通貫型（AI SDR）が合理的になります。
              </p>
            </Card>
            <Card>
              <div style={{ fontFamily: "var(--fm)", fontSize: 13, fontWeight: 800, color: "var(--cta-ink)", marginBottom: 10 }}>STEP 3</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>料金の透明性と運用体制で絞る</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
                公開価格で稟議を進めたいか（TimeRex・Spir・lemlist・Smartlead・Meeton ai は公開、immedio は要問い合わせ）、英語UIでも運用できるか、シナリオ・シーケンスを設計する社内工数を確保できるか。運用にかかる人的コストまで含めた総コストで比較しましょう。
              </p>
            </Card>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: "var(--sub)", marginTop: 28 }}>
            関連するカテゴリ別比較：
            <Link href="/compare/scheduling-vs-ai-sdr/" style={{ color: "var(--cta-ink)", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3, marginLeft: 6 }}>日程調整ツール vs AI SDR</Link>
            <span style={{ margin: "0 6px" }}>／</span>
            <Link href="/compare/ma-vs-ai-sdr/" style={{ color: "var(--cta-ink)", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>MAツール vs AI SDR</Link>
            <span style={{ margin: "0 6px" }}>／</span>
            <Link href="/compare/chatbot-vs-ai-sdr/" style={{ color: "var(--cta-ink)", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>AIチャットボット vs AI SDR</Link>
          </p>
        </Section>

        {/* FAQ */}
        <Section tone="surface">
          <SectionHead eyebrow="よくある質問" title="FAQ" align="center" />
          <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 14 }}>
            {FAQ.map((f) => (
              <Card key={f.q}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{f.q}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{f.a}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* 出典 */}
        <Section tone="white" py={48} id="sources">
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "var(--sub)", marginBottom: 10 }}>参考・出典</div>
            <ol style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6 }}>
              {SOURCES.map((s) => (
                <li key={s.n} style={{ fontSize: 12, color: "var(--sub)", lineHeight: 1.6 }}>
                  {s.text}
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* CTA */}
        <Section tone="navyDeep" py={68}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--fd)",
                fontSize: "clamp(24px,3.6vw,34px)",
                fontWeight: 800,
                color: "var(--on-navy)",
                margin: "0 0 14px",
                letterSpacing: "-0.02em",
                textWrap: "balance",
              }}
            >
              5つの工程を、1つのAIで。
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>
              30分のデモで、初動対応から商談予約・追客まで AI が完遂する流れを、自社サイトに当てはめて確認できます。JSタグ1行・最短5分で設置できます。
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CTAButtons source={`${SRC}-footer`} tone="onNavy" size="lg" align="center" />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
