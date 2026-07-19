import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import { Section, SectionHead, Eyebrow, Card, Check } from "@/app/components/v2/ui";

/**
 * /compare/web-sekkyaku-tools/ — カテゴリ比較ハブ（JA only）。
 *
 * Target intent: "Web接客ツール 比較" / "Web接客 BtoB" / "Web接客 商談"
 *
 * 軸: B2C向けCX/CVR最適化ツールと、B2B商談化（AI SDR）の「目的の違い」。
 * 個別比較ページ（/compare/meeton-vs-karte/ 等 + /compare/sprocket/ 等）への
 * リンクハブ。競合ファクトは compare-competitor-research の検証済みドシエ +
 * 既存 1:1 比較ページの公開情報のみ（数値の創作なし）。
 */

export const revalidate = 3600;

const PATH = "/compare/web-sekkyaku-tools/";
const URL_ = `https://dynameet.ai${PATH}`;

export const metadata: Metadata = {
  title: "BtoB向けWeb接客ツール比較｜商談獲得で選ぶ主要7ツール",
  description:
    "KARTE・Sprocket・Flipdesk・チャネルトーク・ChatPlus・sinclo・Meeton ai をBtoB商談獲得の観点で横断比較。B2C向けCVR最適化とB2B商談化（AI SDR）の目的の違い、料金公開状況、選び方を整理。",
  alternates: { canonical: PATH },
  openGraph: {
    title: "BtoB向けWeb接客ツール比較｜商談獲得で選ぶ主要7ツール｜Meeton ai",
    description:
      "Web接客ツールを「商談獲得」の観点で横断比較。CX/CVR最適化型・チャット接客型・B2B商談化特化（AI SDR）の3分類と、各ツールが向くケースを公正に整理。",
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
    q: "Web接客ツールとは何ですか？",
    a: "Webサイトの訪問者一人ひとりの行動・属性に合わせて、ポップアップ・バナー・チャットなどで最適な働きかけを行い、CVR（コンバージョン率）を高めるツールです。KARTE・Sprocket・Flipdesk のような接客・CVR最適化型と、チャネルトーク・ChatPlus・sinclo のようなチャット接客型に大別され、近年はさらに BtoB の商談獲得まで完結させる AI SDR 型（Meeton ai など）が登場しています。",
  },
  {
    q: "BtoB企業がWeb接客ツールを選ぶ際の最大の分岐点は？",
    a: "「接客して終わり」か「商談予約まで完結するか」です。多くの Web 接客ツールは EC・B2C サイトの CVR 最適化を主目的に設計されており、ポップアップやチャットで訪問者を後押しした後の商談化（日程調整・CRM 記録・追客）は人手に残ります。BtoB で商談獲得が KPI なら、AI が会話から商談予約・CRM 書き戻しまで実行する設計かどうかを最初に確認するのが近道です。",
  },
  {
    q: "KARTE や Sprocket と Meeton ai は併用できますか？",
    a: "可能です。行動データ解析・サイト全体のパーソナライゼーションは KARTE や Sprocket、商談化導線（会話→商談予約→追客）は Meeton ai という役割分担は理にかなっています。両者は主目的が異なるため、置き換えではなく補完関係になるケースも多くあります。",
  },
  {
    q: "料金が公開されているWeb接客ツールはどれですか？",
    a: "本ページで扱う中では、Flipdesk（Standard プラン：初期費用5万円＋月額5万円・税抜、月間80万PVまで）、チャネルトーク（無料プランあり、有料は月3,600円〜・税抜＋AI応対の従量課金）、Meeton ai（基本プラン15万円〜＋アドオン）が公開しています。KARTE・Sprocket は公開価格がなく要問い合わせです（2026年時点の公開情報）。",
  },
  {
    q: "AI SDR と Web接客ツールはどう違いますか？",
    a: "Web接客ツールは「訪問者への働きかけ（接客）」までを担い、その後の商談化は人が行う前提です。AI SDR は、AI が訪問者と会話して課題を聞き、資料を提案し、温度が上がった瞬間にチャット内で商談予約まで確定し、未予約リードには追客まで実行します。接客が目的なら Web接客ツール、商談獲得が目的なら AI SDR が直接効きます。",
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
    { "@type": "ListItem", position: 2, name: "BtoB向けWeb接客ツール比較", item: URL_ },
  ],
};

// ───────────────────────── 比較表データ ─────────────────────────

type VendorRow = {
  name: string;
  href: string; // 1:1 比較ページ
  target: string; // 主な対象
  purpose: string; // 主目的
  ai: string; // AI会話
  booking: string; // 商談予約
  pricing: string; // 料金公開
  coverage: string; // カバー範囲
  meeton?: boolean;
};

const VENDORS: VendorRow[] = [
  {
    name: "Meeton ai",
    href: "/chat/",
    target: "BtoB企業のサイト",
    purpose: "商談獲得（AI SDR）",
    ai: "○ LLMネイティブ（文脈理解・シナリオ不要）",
    booking: "○ チャット内で予約確定まで完結",
    pricing: "公開（基本プラン15万円〜＋アドオン）",
    coverage: "会話→資料提案→商談予約→追客",
    meeton: true,
  },
  {
    name: "KARTE",
    href: "/compare/meeton-vs-karte/",
    target: "EC・大規模サイト中心",
    purpose: "CX改善・CVR最適化",
    ai: "△ チャット機能はあるが、公開情報では LLM ネイティブの位置づけは限定的",
    booking: "− 公開情報ではネイティブ機能として明示なし",
    pricing: "要問い合わせ",
    coverage: "行動データ解析＋Web接客（ポップアップ／バナー等）",
  },
  {
    name: "Sprocket",
    href: "/compare/sprocket/",
    target: "EC・金融など大手中心",
    purpose: "CX改善（コンサル伴走型）",
    ai: "△ 生成AIは分析・運用支援（Insights / SproAgent）が中心",
    booking: "− 公開情報では商談予約機能の記載なし",
    pricing: "非公開（要問い合わせ）",
    coverage: "接客＋CDP＋BI＋コンサルティング",
  },
  {
    name: "Flipdesk",
    href: "/compare/flipdesk/",
    target: "EC・D2C・小売中心",
    purpose: "サイト内接客・CVR改善",
    ai: "△ チャット（Cross Talk）はシナリオ／QA型。生成AIはシナリオ作成支援等",
    booking: "− 公開情報では商談予約機能の記載なし",
    pricing: "公開（初期5万円＋月額5万円〜・税抜）",
    coverage: "ポップアップ・バナー・クーポン等の接客",
  },
  {
    name: "チャネルトーク",
    href: "/compare/channel-talk/",
    target: "EC・スタートアップ中心",
    purpose: "接客チャット・CS対応",
    ai: "△ AIエージェント ALF（FAQ・問い合わせ解決が中心）",
    booking: "− 公開情報では日程調整・予約機能の記載なし",
    pricing: "公開（無料〜、有料は月3,600円〜・税抜＋AI従量）",
    coverage: "チャット＋顧客管理＋社内チャット",
  },
  {
    name: "ChatPlus",
    href: "/compare/meeton-vs-chatplus/",
    target: "幅広い業種・規模",
    purpose: "FAQ自動化・Web接客",
    ai: "△ シナリオ＋AI併用（AI応答は補助的または別オプション）",
    booking: "△ 外部カレンダー連携（ネイティブ完結ではない場合が多い）",
    pricing: "低価格帯（詳細は公式サイト参照）",
    coverage: "チャットボット（サポート〜接客）",
  },
  {
    name: "sinclo",
    href: "/compare/meeton-vs-sinclo/",
    target: "EC・toCサイト中心",
    purpose: "FAQ自動化・有人チャット",
    ai: "△ シナリオ型（AI拡張は別オプションの位置づけ）",
    booking: "△ 外部カレンダー連携は限定的またはカスタム実装",
    pricing: "公式サイト参照",
    coverage: "チャット接客（シナリオ＋有人切替）",
  },
];

// ───────────────────────── 各ベンダー解説 ─────────────────────────

type VendorProfile = {
  name: string;
  href: string;
  linkLabel: string;
  body: string;
  fit: string; // このツールが正解になるケース
  refs: number[]; // 出典番号
};

const PROFILES: VendorProfile[] = [
  {
    name: "KARTE（株式会社プレイド）",
    href: "/compare/meeton-vs-karte/",
    linkLabel: "KARTE との詳細比較を見る",
    body: "Plaid の CX プラットフォーム。行動データ解析を起点に、ポップアップ・バナー・チャットなどの Web 接客で EC や大規模サイトの CVR 改善を支えてきた代表格です。詳細な行動データとセグメント設計の深さが中核価値で、公開情報では商談予約はネイティブ機能として明示されていません。料金は公開されておらず、一般的にはエンタープライズ規模の予算が前提とされます。",
    fit: "大規模 EC・toC サービスで、行動データを起点に「いつ・誰に・何を出すか」を精緻に最適化したい場合は KARTE が向きます。",
    refs: [7],
  },
  {
    name: "Sprocket（株式会社Sprocket）",
    href: "/compare/sprocket/",
    linkLabel: "Sprocket との詳細比較を見る",
    body: "2014年創業の国産 CX 改善プラットフォーム。Web接客（ポップアップ等）の Personalize、CDP の DataStudio、生成AI 分析の Insights、AI エージェント SproAgent の4モジュール構成で、専任コンサルタント（プロデューサー）が12万回超の A/B テスト知見をもとに伴走する運用モデルが特徴です。導入は400社以上、ITreview Grid Award（Web接客ツール部門）で継続的に Leader を受賞。事例は EC・金融など B2C 中心ですが、ヤンマーのオンライン展示会登録改善など B2B 事例も公表されています。料金は非公開（要問い合わせ）で、公開情報ではチャットから商談予約まで運ぶ機能は確認できません。",
    fit: "大手企業がコンサル伴走型で CX 改善の PDCA を回したい場合、Sprocket の知見と運用体制は明確な強みです。",
    refs: [1, 2],
  },
  {
    name: "Flipdesk（株式会社マテリアルデジタル）",
    href: "/compare/flipdesk/",
    linkLabel: "Flipdesk との詳細比較を見る",
    body: "ポップアップ・バナー・クーポン・A/B テスト・ヒートマップを約30パラメータの行動セグメントで出し分ける国産 Web 接客ツール。1,600社以上・2,000サイト以上の導入実績があり、Standard プランは初期費用5万円＋月額5万円（税抜・月間80万PVまで）と料金を公開している点は、要問い合わせ型が多いこのカテゴリで貴重です。チャットは別製品 Cross Talk（シナリオ／QA型・有人切替あり）が担い、2024年には生成AIによるシナリオ作成支援等も追加されましたが、公開情報では商談予約や日程調整の機能は確認できません。事例は EC・D2C・小売が中心です。",
    fit: "EC・D2C サイトで、低コストかつノーコードでサイト内接客・CVR 改善を始めたい場合に有力な選択肢です。",
    refs: [3, 4],
  },
  {
    name: "チャネルトーク（Channel Corporation）",
    href: "/compare/channel-talk/",
    linkLabel: "チャネルトークとの詳細比較を見る",
    body: "韓国発・日本法人は2015年設立の「オールインワン AI ビジネスメッセンジャー」。接客チャット・顧客管理・社内チャット・ノーコード自動化を1製品にまとめ、グローバルで22万社以上（公称）が利用します。無料プランがあり、有料プランは月3,600円〜（税抜・年払割引あり）、AI エージェント ALF は AI が自動解決したチャット分のみの従量課金（50円/件）という透明な料金も特徴です。LINE・Instagram 連携や Shopify 等の EC 連携が厚く、主戦場は EC・スタートアップの CS／接客。公開情報では商談予約・日程調整のネイティブ機能は確認できません。",
    fit: "EC やスタートアップが、CS と接客チャットを低コストに一本化したい場合にフィットします。",
    refs: [5, 6],
  },
  {
    name: "ChatPlus（チャットプラス株式会社）",
    href: "/compare/meeton-vs-chatplus/",
    linkLabel: "ChatPlus との詳細比較を見る",
    body: "シナリオ＋AI 併用の国産チャットボット SaaS。低価格帯と幅広い業種での導入実績が強みで、FAQ 自動化や問い合わせ振り分けなど「まずチャットボットを置く」用途で広く使われています。商談予約は外部カレンダー連携が中心で、公開情報ではチャット内で予約確定まで完結するネイティブ機能ではない場合が多い構成です。",
    fit: "低予算で FAQ 自動化・簡易な Web 接客から始めたい場合、価格帯と運用のしやすさが活きます。",
    refs: [7],
  },
  {
    name: "sinclo（シンクロ）",
    href: "/compare/meeton-vs-sinclo/",
    linkLabel: "sinclo との詳細比較を見る",
    body: "シナリオ型 Web 接客チャットの老舗。分岐・キーワード応答と有人チャット連携で、EC・toC サイトの FAQ 自動化・接客補助を支えてきました。シナリオ設計・メンテナンスを継続する運用が前提で、AI 拡張は別オプションの位置づけ。商談予約は外部カレンダー連携が限定的またはカスタム実装となります。",
    fit: "FAQ 集が整備済みで、シナリオ分岐により問い合わせの大半をカバーできるサイトでは、今も合理的な選択肢です。",
    refs: [7],
  },
  {
    name: "Meeton ai",
    href: "/chat/",
    linkLabel: "Meeton ai の製品詳細を見る",
    body: "BtoB の商談獲得に特化した AI SDR プラットフォーム。LLM ネイティブの AI がシナリオ設計なしで訪問者と会話し、課題を聞き、資料を提案し、温度が上がった瞬間にチャット内で商談予約まで確定します。初動5秒・24時間365日対応、未予約リードへの AI 追客まで一気通貫。JS タグ1行・最短5分で設置でき、料金は基本プラン15万円〜＋アドオンで公開しています。導入企業では商談化率60%以上（EdulinX）、チャット経由リード20倍（BizteX）、月間SQL 2倍（G-gen）などの成果が出ています。",
    fit: "BtoB で「サイト訪問者を商談に変える」ことが KPI なら、接客で終わらず商談予約・追客まで AI が完遂する Meeton ai が直接効きます。",
    refs: [8],
  },
];

// ───────────────────────── 出典 ─────────────────────────

const SOURCES: { n: number; text: string }[] = [
  { n: 1, text: "Sprocket 公式：プラットフォーム構成（Personalize / DataStudio / Insights / SproAgent）・導入400社以上・料金は要問い合わせ（sprocket.bz/platform, sprocket.bz/company/outline.html, sprocket.bz/faq）" },
  { n: 2, text: "Sprocket：ITreview Grid Award Web接客ツール部門 Leader 連続受賞、ヤンマーB2B事例（itreview.jp/products/sprocket, sprocket.bz/release）" },
  { n: 3, text: "Flipdesk 公式料金ページ：Standard プラン 初期費用50,000円＋月額50,000円（税抜）・月間80万PVまで、導入1,600社以上・2,000サイト以上（materialdigital.jp/service/flipdesk/price_opiton）" },
  { n: 4, text: "運営会社は株式会社マテリアルデジタル（2023年7月に株式会社フリップデスクから社名変更）。Cross Talk 製品ページ（materialgroup.jp/news/20230731, materialdigital.jp/service/crosstalk）" },
  { n: 5, text: "チャネルトーク公式料金ページ：無料プラン／Early Stage 月3,600円〜／Growth 月9,600円〜（いずれも税抜・年払割引あり）／Enterprise 要問い合わせ、AIエージェント ALF は自動解決チャットごとの従量課金（channel.io/jp/pricing, docs.channel.io）" },
  { n: 6, text: "Channel Corporation：日本法人2015年1月設立、グローバル利用22万社以上（自社公表、2026年1月 PR TIMES リリース）" },
  { n: 7, text: "KARTE・ChatPlus・sinclo の情報は各社公式サイトの公開情報および一般的な業界認識に基づく参考です。詳細は各個別比較ページと各社公式をご確認ください。" },
  { n: 8, text: "Meeton ai：商談化率60%以上（EdulinX事例）、チャット経由リード20倍（BizteX事例）、月間SQL 2倍（G-gen事例）、初動5秒・24時間365日・JSタグ1行最短5分・基本プラン15万円〜は自社公表（dynameet.ai/cases, dynameet.ai/pricing）。" },
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

export default function WebSekkyakuToolsPage() {
  const SRC = "compare-web-sekkyaku-tools";
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav />
      <main>
        {/* Hero — 定義文 + 結論先出し（AEO） */}
        <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 60 }}>
          <div style={{ maxWidth: 860 }}>
            <Eyebrow tone="dark">比較 — Web接客ツール</Eyebrow>
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
              BtoB向けWeb接客ツール比較 — 「接客」で終わるか、「商談」まで運ぶか。
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
                Web接客ツールとは、サイト訪問者にポップアップ・バナー・チャットで個別に働きかけ、CVRを高めるツールです。ただしその多くは EC・B2C の CVR 最適化が主目的。BtoB で商談獲得が KPI なら、「接客して終わり」ではなく、AI が会話から商談予約・追客まで完結する設計か — ここが選定の最大の分岐点です。
              </p>
            </div>
            <CTAButtons source={`${SRC}-hero`} tone="onNavy" size="lg" primaryLabel="自社に合う構成を相談する" />
          </div>
        </Section>

        {/* 比較の観点 */}
        <Section tone="white">
          <SectionHead
            eyebrow="比較の観点"
            title="同じ「Web接客」でも、設計思想は3つに分かれる"
            lede="KARTE・Sprocket・Flipdesk・チャネルトーク・ChatPlus・sinclo・Meeton ai の7ツールを、BtoB 商談獲得の観点で並べます。各ツールに優劣があるのではなく、主目的（CVR最適化か、CS・FAQ対応か、商談化か）が異なります。"
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            <Card>
              <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 800, color: "var(--cta-ink)", marginBottom: 10 }}>
                分類① CX / CVR 最適化型
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>
                KARTE・Sprocket・Flipdesk
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
                行動データを起点に「いつ・誰に・何を出すか」を最適化し、ポップアップやバナーで CVR を高める設計。EC・B2C の大規模サイトで真価を発揮します。接客の後の商談化（日程調整・CRM 記録・追客）は人手に残ります。
              </p>
            </Card>
            <Card>
              <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 800, color: "var(--cta-ink)", marginBottom: 10 }}>
                分類② チャット接客型
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>
                チャネルトーク・ChatPlus・sinclo
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
                チャットを窓口に FAQ 自動化・CS 対応・接客補助を担う設計。シナリオ型または AI 併用で「質問に答える」ことに最適化されています。課題ヒアリングや商談予約への誘導は設計上の主目的ではありません。
              </p>
            </Card>
            <Card style={{ border: "2px solid var(--cta)" }}>
              <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 800, color: "var(--cta-ink)", marginBottom: 10 }}>
                分類③ B2B 商談化特化（AI SDR）
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>
                Meeton ai
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
                AI が訪問者と会話して課題を聞き、資料を提案し、温度が上がった瞬間にチャット内で商談予約まで確定。未予約リードには AI が追客します。BtoB の「サイト訪問者を商談に変える」に振り切った設計です。
              </p>
            </Card>
          </div>
        </Section>

        {/* 比較表 */}
        <Section tone="surface" id="table">
          <SectionHead
            eyebrow="比較表"
            title="主要Web接客ツール 7選 横断比較"
            lede="各ツール名から個別の詳細比較ページに移動できます。"
          />
          <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: 16, background: "#fff" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 960 }}>
              <thead>
                <tr>
                  <th style={th}>ツール</th>
                  <th style={th}>主な対象</th>
                  <th style={th}>主目的</th>
                  <th style={th}>AI会話</th>
                  <th style={th}>商談予約</th>
                  <th style={th}>料金公開</th>
                  <th style={th}>カバー範囲</th>
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
                    <td style={td}>{v.coverage}</td>
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
        <Section tone="white">
          <SectionHead
            eyebrow="各ツールの特徴"
            title="7ツールの強みと、それぞれが正解になるケース"
            lede="どのツールにも明確な強みがあります。自社の主目的（CVR最適化・CS対応・商談獲得）に照らして選ぶのが失敗しない選定です。"
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
        <Section tone="surface">
          <SectionHead eyebrow="選び方" title="BtoB企業のためのWeb接客ツール選定 3ステップ" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            <Card>
              <div style={{ fontFamily: "var(--fm)", fontSize: 13, fontWeight: 800, color: "var(--cta-ink)", marginBottom: 10 }}>STEP 1</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>KPI を1つに絞る</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
                CVR 改善が KPI なら CX/CVR 最適化型（KARTE・Sprocket・Flipdesk）、問い合わせ対応の効率化なら チャット接客型（チャネルトーク・ChatPlus・sinclo）、商談獲得なら AI SDR（Meeton ai）。KPI と設計思想のミスマッチが、導入後に「使われないツール」を生む最大の原因です。
              </p>
            </Card>
            <Card>
              <div style={{ fontFamily: "var(--fm)", fontSize: 13, fontWeight: 800, color: "var(--cta-ink)", marginBottom: 10 }}>STEP 2</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>「接客の後」を誰が担うか決める</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
                接客・CVR 最適化型は、ポップアップやチャットの後の商談化（日程調整・CRM 記録・追客）が人手に残ります。Inside Sales のキャパに余裕があるなら問題ありませんが、初動対応や夜間・休日のリードを取りこぼしているなら、商談予約まで AI が完結する設計を優先すべきです。
              </p>
            </Card>
            <Card>
              <div style={{ fontFamily: "var(--fm)", fontSize: 13, fontWeight: 800, color: "var(--cta-ink)", marginBottom: 10 }}>STEP 3</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 10px" }}>料金の透明性と運用体制で絞る</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
                公開価格で稟議を進めたいか（Flipdesk・チャネルトーク・Meeton ai は公開、KARTE・Sprocket は要問い合わせ）、コンサル伴走が必要か（Sprocket）、自走できる体制か。運用にかかる社内工数（シナリオ設計・メンテナンス）も総コストに含めて比較しましょう。
              </p>
            </Card>
          </div>
        </Section>

        {/* FAQ */}
        <Section tone="white">
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
        <Section tone="surface" py={48} id="sources">
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
              接客で終わらせず、商談まで。
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--on-navy-sub)", margin: "0 0 26px" }}>
              30分のデモで、自社サイトの訪問者が AI との会話から商談予約まで進む流れを具体的に確認できます。JSタグ1行・最短5分で設置できます。
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
