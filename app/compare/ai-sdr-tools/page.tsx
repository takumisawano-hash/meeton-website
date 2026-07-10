import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, Check } from "@/app/components/v2/ui";
import { altLanguages } from "@/app/lib/i18n";

/**
 * /compare/ai-sdr-tools/ — カテゴリ横断比較ハブ (AI SDR ツール比較 2026)。
 *
 * Target intent: "AI SDR ツール 比較" / "AI SDR おすすめ" / "商談化 自動化 ツール"
 * 競合ファクトは compare-data.ts + 検証済み競合ドシエ (2026-07) のみを使用。
 * 各ベンダーの 1:1 比較ページ (/compare/<slug>/) へのハブとして機能する。
 */

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "AI SDRツール比較 2026｜主要7ツールをカバー範囲で横断比較｜Meeton ai" },
  description:
    "日本で検討できるAI SDR・商談化自動化ツール7種（Meeton ai／immedio／Qualified／Drift／Warmly／チャネルトーク／HubSpot Breeze）を、会話・広告・資料・予約・追客のカバー範囲、料金公開、日本語対応で横断比較。2026年最新版。",
  alternates: altLanguages("/compare/ai-sdr-tools/", "ja"),
  openGraph: {
    title: "AI SDRツール比較 2026｜主要7ツールをカバー範囲で横断比較",
    description:
      "会話・広告・資料・予約・追客の5領域マトリクスで、日本で検討できるAI SDRツールを公正に横断比較。料金公開の有無と日本語対応も整理。",
    url: "https://dynameet.ai/compare/ai-sdr-tools/",
    siteName: "Meeton ai",
    locale: "ja_JP",
    type: "website",
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
};

// ───────────────────────── table primitives (CompareLP準拠) ─────────────────────────

const th: React.CSSProperties = { textAlign: "left", padding: "13px 14px", fontWeight: 800, color: "var(--heading)", borderBottom: "2px solid var(--border)", fontSize: 13.5, whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: "13px 14px", color: "var(--text)", borderBottom: "1px solid var(--border)", fontSize: 13.5, lineHeight: 1.7, verticalAlign: "top" };

type Mark = "yes" | "part" | "no";
const SIGN: Record<Mark, string> = { yes: "○", part: "△", no: "×" };
const MARK_STYLE: Record<Mark, React.CSSProperties> = {
  yes: { color: "var(--cta-ink)", fontWeight: 800 },
  part: { color: "#a16207", fontWeight: 700 },
  no: { color: "var(--sub)", fontWeight: 500 },
};

function MarkCell({ m, t }: { m: Mark; t?: string }) {
  return (
    <>
      <span style={MARK_STYLE[m]}>{SIGN[m]}</span>
      {t ? <span style={{ color: "var(--text)" }}> {t}</span> : null}
    </>
  );
}

// ───────────────────────── verified vendor data ─────────────────────────

type Cell = { m: Mark; t?: string };
type Vendor = {
  name: string;
  href: string;
  purpose: string;
  ai: Cell;
  booking: Cell;
  price: Cell;
  jp: Cell;
  coverage: string;
  matrix: [Mark, Mark, Mark, Mark, Mark]; // 会話 / 広告 / 資料 / 予約 / 追客
  matrixNote?: string;
  isMeeton?: boolean;
};

const VENDORS: Vendor[] = [
  {
    name: "Meeton ai",
    href: "/pricing/",
    purpose: "サイト訪問者の商談化を一気通貫で自動化（AI SDR Platform・国産）",
    ai: { m: "yes", t: "LLMネイティブ・初動5秒" },
    booking: { m: "yes", t: "チャット内で予約完結" },
    price: { m: "yes", t: "基本15万円〜を公開" },
    jp: { m: "yes", t: "日本語ネイティブ" },
    coverage: "会話・広告・資料・予約・追客（5/5）",
    matrix: ["yes", "yes", "yes", "yes", "yes"],
    matrixNote: "5製品（Chat / Ads / Library / Calendar / Email）",
    isMeeton: true,
  },
  {
    name: "immedio",
    href: "/compare/immedio/",
    purpose: "フォーム送信直後（サンクスページ）の即時商談化に特化（国産）",
    ai: { m: "no", t: "フォーム後にポップアップで予約提示" },
    booking: { m: "yes", t: "サンクスページ即時予約" },
    price: { m: "no", t: "非公開（要問い合わせ）" },
    jp: { m: "yes", t: "国産・日本語ネイティブ" },
    coverage: "予約（＋資料DL導線）",
    matrix: ["no", "no", "part", "yes", "no"],
    matrixNote: "資料△＝immedio Box（資料DL導線の商談化）",
  },
  {
    name: "Qualified（Piper）",
    href: "/compare/qualified/",
    purpose: "Salesforce環境のインバウンド来訪者の商談化（米国・Salesforceが2026年4月に買収）",
    ai: { m: "yes", t: "チャット・音声・ビデオ" },
    booking: { m: "yes", t: "空き状況から自動スケジュール" },
    price: { m: "no", t: "非公開（プラン名のみ公開）" },
    jp: { m: "part", t: "Salesforce Japanサイトで体験公開段階" },
    coverage: "会話・予約（＋Offers・AIメール）",
    matrix: ["yes", "no", "part", "yes", "part"],
    matrixNote: "資料/追客△＝Offers・AIメール（Piper内の機能）",
  },
  {
    name: "Drift",
    href: "/compare/drift/",
    purpose: "会話型マーケティング（米国・2026年3月に段階的サンセット発表）",
    ai: { m: "yes", t: "AIチャット（新規投資は終了方向）" },
    booking: { m: "yes", t: "ミーティング予約ルーティング" },
    price: { m: "no", t: "非公開（要問い合わせ）" },
    jp: { m: "no", t: "日本語ローカライズなし" },
    coverage: "会話・予約",
    matrix: ["yes", "no", "no", "yes", "no"],
    matrixNote: "メールシーケンスはSalesloft本体側の別製品",
  },
  {
    name: "Warmly",
    href: "/compare/warmly/",
    purpose: "匿名訪問者の特定→ウォームな接触づくり（米国・HubSpotが2026年6月に買収発表）",
    ai: { m: "yes", t: "AIチャット（$20,000/年プラン以上）" },
    booking: { m: "yes", t: "Inbound Agent内で予約" },
    price: { m: "yes", t: "$10,000/年〜を公開（年間契約）" },
    jp: { m: "no", t: "英語のみ" },
    coverage: "会話・予約・追客（＋広告RT）",
    matrix: ["yes", "part", "no", "yes", "yes"],
    matrixNote: "広告△＝LinkedIn/Meta リターゲティング（サイト外）",
  },
  {
    name: "チャネルトーク",
    href: "/compare/channel-talk/",
    purpose: "接客チャット・CS・社内チャットの一元化（韓国発・日本法人あり）",
    ai: { m: "yes", t: "ALF（RAG型・サポートFAQ中心）" },
    booking: { m: "no", t: "予約カレンダー機能は公開情報で確認できず" },
    price: { m: "yes", t: "無料〜Growth ¥9,600/月を公開" },
    jp: { m: "yes", t: "日本法人・完全ローカライズ" },
    coverage: "会話（＋セグメント配信）",
    matrix: ["yes", "no", "no", "no", "part"],
    matrixNote: "追客△＝CRMマーケティング（セグメント一斉配信）",
  },
  {
    name: "HubSpot（Breeze）",
    href: "/compare/hubspot-chatbot/",
    purpose: "HubSpot CRM付属のチャット＋サポート特化AI（米国・日本法人あり）",
    ai: { m: "part", t: "Chatflows＝ルールベース／Breeze＝サポート特化" },
    booking: { m: "part", t: "予約リンク提示型（条件によりリダイレクト）" },
    price: { m: "yes", t: "無料CRM〜＋AI解決$0.50/件" },
    jp: { m: "yes", t: "日本語UI・日本法人あり" },
    coverage: "会話△・予約△・追客△",
    matrix: ["part", "no", "no", "part", "part"],
    matrixNote: "追客△＝汎用Workflows/メール機能で個別構築",
  },
];

const MATRIX_HEADS = ["会話（AI会話）", "広告（サイト内広告）", "資料（コンテンツ提案）", "予約（商談予約）", "追客（フォローメール）"];

// ───────────────────────── vendor paragraphs (fair, sourced) ─────────────────────────

const VENDOR_NOTES: { name: string; href: string; body: string; fit: string }[] = [
  {
    name: "Meeton ai",
    href: "/pricing/",
    body: "国産のAI SDR Platform。①掴む（Chat・Ads）→②育てる（Library）→③商談化（Calendar）→④追客（Email）の4ステージ・5製品で、会話から追客までを1つの基盤で自動化します。初動5秒でAIが会話を開始し、24時間365日対応。設置はJSタグ1行・最短5分。導入企業では商談化率60%以上（EdulinX）、月間SQL2倍（G-gen）、チャット経由リード20倍（BizteX）などの実績を公開しています。料金は基本プラン15万円〜＋アドオン（商談化+5万・追客+5万）で公開。",
    fit: "日本のB2Bサイトで、会話・広告・資料・予約・追客を一気通貫で自動化したい場合の第一候補です。",
  },
  {
    name: "immedio",
    href: "/compare/immedio/",
    body: "フォーム送信直後という最も熱量の高い瞬間の商談化に特化した国産SaaS。immedio／Box／Formsの3製品構成で、Sansanの商談処理工数60%削減などの実績を公表しています。2024年5月にシリーズA 3.5億円を調達、ISMS認証も取得済みの堅実な専業です※1。AI会話や追客メールは持ちませんが、専業ゆえの完成度は明確な強みです。料金は非公開（要問い合わせ）。",
    fit: "サンクスページの即時商談予約「だけ」を確実に固めたい場合に有力です。",
  },
  {
    name: "Qualified（Piper）",
    href: "/compare/qualified/",
    body: "米国発、Salesforce専用に設計された「Agentic Marketing Platform」。AI SDRエージェント「Piper」がチャット・音声・ビデオで来訪者と会話し、商談の自動予約やAIメールまで実行します※2。500社超のエンタープライズが導入し、2026年4月にSalesforceが買収を完了（取得対価の公正価値$1.2B）、「Qualified from Salesforce」としてAgentforceへの統合が進行中です※3。日本では2026年6月にSalesforce Japan公式サイトで日本語体験が公開された段階で、専用の日本語サポート・日本向け料金は確認できていません※4。料金は非公開（Premier/Enterprise/Ultimateのプラン名のみ公開）。",
    fit: "Salesforceを基幹CRMとするグローバル・エンタープライズなら最有力の選択肢です。",
  },
  {
    name: "Drift",
    href: "/compare/drift/",
    body: "「会話型マーケティング」というカテゴリを作った米国のパイオニア。2024年にSalesloftが買収し、2026年3月にはSalesloft自身がDriftの「段階的サンセット（gradual sunset）」を公式発表、後継としてAIエージェント企業1mindへ既存顧客を誘導しています※5。drift.comは現在salesloft.comへリダイレクトされ、「We've transitioned from Drift to 1mind」と明記されています。日本語ローカライズはなく、国内レビューも僅少です※6。",
    fit: "2026年7月時点では新規導入の選択肢として推奨しにくく、既存ユーザーは移行先の比較検討が現実的です。",
  },
  {
    name: "Warmly",
    href: "/compare/warmly/",
    body: "米国発。匿名のサイト訪問者を企業・人物レベルでリアルタイムに特定し、AIチャット・Slack通知・行動起点の自動メール・広告リターゲティングで「ウォームな接触」に変えるGTMプラットフォームです。料金は$10,000/年（訪問者特定のみ）〜$30,000/年（AI Inbound Autopilot）を公開しており、年間・四半期契約が前提です※7。2026年6月30日にHubSpotによる買収が発表され、既存契約は当面変更なしとしつつ、長期的にはHubSpotプラットフォームへの統合方針が示されています※8。日本語UI・日本語サポートはありません。",
    fit: "米国市場中心のGTMチームが、訪問者特定を起点にアウトバウンドを温めたい場合に向きます。",
  },
  {
    name: "チャネルトーク",
    href: "/compare/channel-talk/",
    body: "韓国Channel Corporationの「AI Business Messenger」。接客チャット・コンタクトCRM・社内チャット・AIエージェント「ALF」を一体化し、日本法人は2015年1月設立で11年目、グローバル22万社超が利用。LINE・Instagram連携やShopify・カラーミーショップ対応など日本のEC向け統合が厚いのが強みです※9。料金は無料プラン〜Growth ¥9,600/月（税抜定価）を公開し、ALFはAIが自律解決したチャット1件¥50の成果課金。一方、商談予約カレンダー機能は公開情報では確認できず、主戦場はEC/B2Cの接客・サポートです。",
    fit: "EC・B2Cの接客/サポートを一元化したい場合に強力です。B2Bの商談化が主目的なら役割が異なります。",
  },
  {
    name: "HubSpot（Breeze）",
    href: "/compare/hubspot-chatbot/",
    body: "HubSpot CRMに付属するチャット層で、無料から使えるルールベースのChatflowsと、ナレッジベースを参照してサポート問い合わせを自動解決するBreeze Customer Agent（Service Hub Professional以上、2026年4月14日から解決1件$0.50の成果報酬課金）の2層構成です※10。最大の強みはCRMネイティブ統合で、会話がそのままコンタクトタイムラインとワークフローに反映されます。一方、Bot内の商談予約は予約リンクの提示が基本で、カスタム質問項目がある場合は予約ページへのリダイレクトが発生する仕様です※10。2026年6月30日にはWarmlyの買収を発表し、プロアクティブな訪問者エンゲージメント領域を外部から補完する動きを見せています※8。",
    fit: "既にHubSpotを全社CRMとして使っているなら、追加コストほぼゼロで試せる会話窓口として合理的です。",
  },
];

// ───────────────────────── FAQ ─────────────────────────

const FAQ = [
  {
    q: "AI SDRツールとは何ですか？",
    a: "Webサイト訪問者との会話・課題ヒアリング・商談予約・追客といったSDR（インサイドセールスの初動）業務をAIが自動化するツールです。FAQ応答が中心のチャットボットと異なり、商談機会の創出を主目的とします。ツールごとにカバー範囲（会話・広告・資料・予約・追客）が大きく異なるため、範囲の確認が選定の第一歩です。",
  },
  {
    q: "日本語で使えるAI SDRツールはどれですか？",
    a: "Meeton ai と immedio は国産・日本語ネイティブ、チャネルトークは日本法人による完全ローカライズ、HubSpot は日本語UIと日本法人があります。Qualified は2026年6月にSalesforce Japan公式サイトで日本語体験が公開された段階で、Drift と Warmly には日本語対応がありません（2026年7月時点）。",
  },
  {
    q: "料金を公開しているAI SDRツールはどれですか？",
    a: "Meeton ai（基本プラン15万円〜＋アドオン）、Warmly（$10,000/年〜）、チャネルトーク（無料〜Growth ¥9,600/月）、HubSpot（無料CRM〜＋AI解決1件$0.50）は料金を公開しています。immedio・Qualified・Drift は非公開（要問い合わせ）です（2026年7月時点）。",
  },
  {
    q: "Drift は今から導入できますか？",
    a: "推奨しにくい状況です。2026年3月にSalesloftがDriftの段階的サンセットを公式発表し、後継としてAIエージェント企業1mindへ既存顧客を誘導しています。新規検討では、現行製品として提供が継続しているツールから選ぶのが安全です。",
  },
  {
    q: "チャットボットとAI SDRツールの違いは何ですか？",
    a: "チャットボットは匿名訪問者へのFAQ応答が主目的、AI SDRツールは商談機会の創出が主目的です。AI SDRは課題ヒアリング・資料提案・商談予約・追客まで踏み込む点が構造的に異なります。両者は併用も可能です。",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: "https://dynameet.ai/compare/ai-sdr-tools/",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: "https://dynameet.ai/" },
    { "@type": "ListItem", position: 2, name: "AI SDRツール比較 2026", item: "https://dynameet.ai/compare/ai-sdr-tools/" },
  ],
};

// ───────────────────────── sources ─────────────────────────

const SOURCES = [
  "immedio 製品構成（immedio/Box/Forms）・Sansan事例・シリーズA 3.5億円・ISMS取得・料金非公開：immedio.io/function、immedio.io/case、corp.immedio.io",
  "Qualified（Piper）の機能（チャット・音声・ビデオ／商談自動予約／AIメール）と料金非公開：qualified.com/platform、qualified.com/ai-sdr、qualified.com/pricing",
  "SalesforceによるQualified買収完了（2026年4月・取得対価公正価値$1.2B）：SEC Form 10-Q（2026年4月30日締め四半期）、qualified.com/newsroom",
  "Piperの日本語体験公開（2026年6月）：Salesforce Japan公式ブログ「インサイドセールスAIエージェント『Piper』、日本上陸」",
  "Driftの段階的サンセット発表（2026年3月6日）と1mindへの移行：salesloft.com/company/newsroom/1-mind-partnership、salesloft.com/platform/drift",
  "Driftの国内レビュー状況（レビュー3件・満足度2.1/5）：itreview.jp/products/drift",
  "Warmlyの公開料金（$10,000〜$30,000/年・2026年7月時点）と製品構成：warmly.ai/p/pricing、warmly.ai",
  "WarmlyのHubSpotによる買収発表（2026年6月30日・既存契約は当面変更なし）：warmly.ai/p/blog/warmly-is-joining-hubspot",
  "チャネルトークの公開料金（Free／Early Stage ¥3,600／Growth ¥9,600・税抜定価）・ALF成果課金（AI自律解決1件¥50）・日本法人2015年1月設立・グローバル22万社超：channel.io/jp/pricing、docs.channel.io、prtimes.jp（Channel Corporation）",
  "HubSpot Chatflows／Breeze Customer Agentの構成・Bot予約アクションの仕様・成果報酬課金（2026年4月14日〜・解決1件$0.50）・Service Hub価格：hubspot.com/products/artificial-intelligence/breeze-ai-agents、knowledge.hubspot.com/chatflows、hubspot.com/company-news、hubspot.com/pricing/service",
];

// ───────────────────────── page ─────────────────────────

export default function AiSdrToolsComparePage() {
  const src = "compare-ai-sdr-tools";
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav />

      {/* Hero + 定義文 (AEO) */}
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 60 }}>
        <div style={{ maxWidth: 860 }}>
          <Eyebrow tone="dark">Compare — AI SDR ツール比較 2026</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(28px,4.6vw,46px)", lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0" }}>
            AI SDRツール比較 2026
          </h1>
          <div style={{ background: "var(--navy-2)", border: "1px solid var(--on-navy-border)", borderRadius: 14, padding: "18px 20px", margin: "24px 0 28px" }}>
            <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, color: "var(--cta)", marginBottom: 8 }}>結論</div>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--on-navy)", margin: 0 }}>
              AI SDRツールとは、サイト訪問者との会話・見極め・商談予約・追客をAIが代行し、Webサイトを商談獲得チャネルに変えるツールです。同じ「AI SDR」でもカバー範囲は大きく異なります。本ページでは日本で検討できる主要7ツールを、会話・広告・資料・予約・追客の5領域と料金公開・日本語対応の観点で横断比較します。
            </p>
          </div>
          <CTAButtons source={`${src}-hero`} tone="onNavy" size="lg" primaryLabel="自社に合う構成を相談する" />
          <div style={{ marginTop: 14 }}>
            <Link href="/tools/roi/" className="v2-link" style={{ fontSize: 13.5, fontWeight: 700, color: "var(--cta)", textDecoration: "underline" }}>
              60秒で、自社サイトの商談化の余地を診断する →
            </Link>
          </div>
        </div>
      </Section>

      {/* 比較の観点 */}
      <Section tone="white" py={72}>
        <SectionHead
          eyebrow="比較の観点"
          title="「AI SDR」の中身は、ツールごとに大きく違う"
          lede="チャット1機能だけのツールも、予約特化のツールも「AI SDR」と呼ばれます。本比較では、商談獲得までの流れを構成する5つの領域 —— ①会話（AIによる対話）②広告（サイト内での訴求出し分け）③資料（コンテンツ提案）④予約（商談予約）⑤追客（未予約リードへのフォロー）—— のカバー範囲を軸に、料金公開の有無と日本語対応を加えて整理します。"
        />
      </Section>

      {/* 横断比較表 */}
      <Section tone="surface" py={72} id="table">
        <SectionHead eyebrow="比較表" title="主要7ツール横断比較（2026年7月時点）" />
        <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: 16, background: "#fff" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 960 }}>
            <thead>
              <tr>
                <th style={th}>ツール</th>
                <th style={th}>対象・主目的</th>
                <th style={th}>AI会話</th>
                <th style={th}>商談予約</th>
                <th style={th}>料金公開</th>
                <th style={th}>日本語</th>
                <th style={th}>カバー範囲</th>
              </tr>
            </thead>
            <tbody>
              {VENDORS.map((v) => (
                <tr key={v.name} style={v.isMeeton ? { background: "var(--cta-wash)" } : undefined}>
                  <td style={{ ...td, fontWeight: 800, color: "var(--heading)", whiteSpace: "nowrap" }}>
                    <Link href={v.href} style={{ color: v.isMeeton ? "var(--cta-ink)" : "var(--heading)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                      {v.name}
                    </Link>
                  </td>
                  <td style={td}>{v.purpose}</td>
                  <td style={td}><MarkCell m={v.ai.m} t={v.ai.t} /></td>
                  <td style={td}><MarkCell m={v.booking.m} t={v.booking.t} /></td>
                  <td style={td}><MarkCell m={v.price.m} t={v.price.t} /></td>
                  <td style={td}><MarkCell m={v.jp.m} t={v.jp.t} /></td>
                  <td style={{ ...td, fontWeight: v.isMeeton ? 700 : 400 }}>{v.coverage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: "var(--sub)", marginTop: 12 }}>
          ※ 各社の情報は公開情報に基づく参考です（最新の仕様・料金は各社公式ページをご確認ください）。ツール名のリンクから1:1の詳細比較に進めます。
        </p>
      </Section>

      {/* カバー範囲マトリクス */}
      <Section tone="white" py={72}>
        <SectionHead
          eyebrow="カバー範囲マトリクス"
          title="会話・広告・資料・予約・追客 —— どこまで1つで賄えるか"
          lede="商談獲得は「会話して終わり」ではありません。訪問者を掴み、資料で育て、予約に変え、未予約リードを追う —— この流れの何割をツールが担うかで、運用コストと成果が変わります。"
        />
        <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 820 }}>
            <thead>
              <tr>
                <th style={th}>ツール</th>
                {MATRIX_HEADS.map((h) => (
                  <th key={h} style={{ ...th, whiteSpace: "normal", minWidth: 96 }}>{h}</th>
                ))}
                <th style={{ ...th, whiteSpace: "normal" }}>補足</th>
              </tr>
            </thead>
            <tbody>
              {VENDORS.map((v) => (
                <tr key={v.name} style={v.isMeeton ? { background: "var(--cta-wash)" } : undefined}>
                  <td style={{ ...td, fontWeight: 800, color: "var(--heading)", whiteSpace: "nowrap" }}>{v.name}</td>
                  {v.matrix.map((m, i) => (
                    <td key={i} style={{ ...td, textAlign: "center", fontSize: 15 }}>
                      <span style={MARK_STYLE[m]}>{SIGN[m]}</span>
                    </td>
                  ))}
                  <td style={{ ...td, fontSize: 12.5, color: "var(--sub)" }}>{v.matrixNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: "var(--sub)", marginTop: 12 }}>
          ○＝専用機能あり／△＝部分的・汎用機能で対応／×＝公開情報では確認できず（2026年7月時点）
        </p>
      </Section>

      {/* 分類解説 */}
      <Section tone="surface" py={72}>
        <SectionHead
          eyebrow="タイプ分類"
          title="4つのタイプに分けると、選択肢は整理しやすい"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          <Card style={{ border: "2px solid var(--cta)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>① 一気通貫型 AI SDR</h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
              会話・広告・資料・予約・追客の5領域を1つのプラットフォームで担う設計。ツール間のデータ分断が起きず、未予約リードの取りこぼしまで自動でカバーします。該当：<strong>Meeton ai</strong>
            </p>
          </Card>
          <Card>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>② 商談化特化型</h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
              フォーム送信直後など、特定の瞬間の予約転換に絞った専業型。範囲は狭い分、その一点の完成度が高い。該当：<strong>immedio</strong>
            </p>
          </Card>
          <Card>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>③ 米国エンタープライズ型</h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
              米国発・エンタープライズ商談型。2026年は再編の年で、QualifiedはSalesforceが買収、WarmlyはHubSpotが買収発表、Driftはサンセットへ。日本語対応は限定的です。該当：<strong>Qualified・Drift・Warmly</strong>
            </p>
          </Card>
          <Card>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>④ 接客・CRM付属型</h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
              接客・サポートやCRMの付属機能としてのチャット。導入障壁は低い一方、商談化への最適化は限定的。該当：<strong>チャネルトーク・HubSpot（Breeze）</strong>
            </p>
          </Card>
        </div>
      </Section>

      {/* 各ベンダー解説 */}
      <Section tone="white" py={72}>
        <SectionHead eyebrow="各ツールの実像" title="7ツールを公正に解説する" lede="いずれも領域内で実績あるプロダクトです。強みと「どんな場合に最適か」を明示します。" />
        <div style={{ display: "grid", gap: 16, maxWidth: 900 }}>
          {VENDOR_NOTES.map((v) => (
            <Card key={v.name}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>{v.name}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.9, color: "var(--text)", margin: "0 0 10px" }}>{v.body}</p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--heading)", fontWeight: 700, margin: "0 0 12px" }}>{v.fit}</p>
              <Link href={v.href} style={{ fontSize: 13.5, fontWeight: 700, color: "var(--cta-ink)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                {v.name === "Meeton ai" ? "料金の詳細を見る →" : "1:1 の詳細比較を見る →"}
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* 選び方 */}
      <Section tone="surface" py={72}>
        <SectionHead eyebrow="選び方" title="用途から逆引きする" />
        <div style={{ maxWidth: 860, display: "grid", gap: 12 }}>
          {[
            ["会話・広告・資料・予約・追客まで1つのAIで一気通貫にしたい（日本のB2B）", "Meeton ai"],
            ["サンクスページの即時商談化に用途を絞って固めたい", "immedio"],
            ["Salesforce中心のグローバル・エンタープライズ構成", "Qualified（Piper）"],
            ["既にHubSpot CRMを全社利用しており、まず無料で試したい", "HubSpot（Chatflows / Breeze）"],
            ["EC・B2Cの接客とサポートを一元化したい", "チャネルトーク"],
            ["米国市場で匿名訪問者の特定からウォームな接触を作りたい", "Warmly"],
            ["Driftからの移行先を探している", "現行製品での再比較（本ページの6ツール）"],
          ].map(([need, tool]) => (
            <div key={need as string} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 18px" }}>
              <Check size={18} />
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.8, color: "var(--text)" }}>
                {need} → <strong style={{ color: "var(--heading)" }}>{tool}</strong>
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Mid CTA */}
      <Section tone="navy" py={60}>
        <div style={{ maxWidth: 720 }}>
          <Eyebrow tone="dark">Meeton ai</Eyebrow>
          <p style={{ fontSize: "clamp(20px,3vw,28px)", lineHeight: 1.6, color: "var(--on-navy)", fontWeight: 700, margin: "16px 0 20px" }}>
            5領域を1つで賄うと、何が変わるか。デモで確認できます。
          </p>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
            <CTAButtons source={`${src}-mid`} tone="onNavy" size="md" />
            <Link href="/capture/" style={{ color: "var(--cta)", fontWeight: 700, textDecoration: "none" }}>
              製品の詳細 →
            </Link>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="white" py={72}>
        <SectionHead eyebrow="よくある質問" title="FAQ" align="center" />
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 14 }}>
          {FAQ.map((f) => (
            <Card key={f.q}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{f.q}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{f.a}</p>
            </Card>
          ))}
        </div>
        <p style={{ maxWidth: 800, margin: "20px auto 0", fontSize: 13.5, color: "var(--sub)", lineHeight: 1.8 }}>
          関連：<Link href="/compare/chatbot-vs-ai-sdr/" style={{ color: "var(--cta-ink)", fontWeight: 700 }}>AI チャットボット vs AI SDR の違い</Link>／<Link href="/compare/ma-vs-ai-sdr/" style={{ color: "var(--cta-ink)", fontWeight: 700 }}>MA vs AI SDR の違い</Link>
        </p>
      </Section>

      {/* Sources */}
      <Section tone="surface" py={48}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "var(--sub)", marginBottom: 10 }}>参考・出典（本文の ※ 番号に対応）</div>
          <ol style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 6 }}>
            {SOURCES.map((s, i) => (
              <li key={i} style={{ fontSize: 12, color: "var(--sub)", lineHeight: 1.6 }}>{s}</li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="navyDeep" py={68}>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(24px,3.6vw,34px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            迷ったら、デモで「一気通貫」を体験してください。
          </h2>
          <p style={{ fontSize: 15, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>
            30分のデモで、貴社サイトでの会話→予約→追客の流れを具体的に確認できます。料金は基本プラン15万円〜を公開しています。
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CTAButtons source={`${src}-footer`} tone="onNavy" size="lg" align="center" />
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}
