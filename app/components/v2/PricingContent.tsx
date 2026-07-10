import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CTAButtons from "@/app/components/v2/CTAButtons";
import MobileStickyCta from "@/app/components/v2/MobileStickyCta";
import { Section, SectionHead, Eyebrow, Card, Check } from "@/app/components/v2/ui";
import LogoWall from "@/app/components/v2/LogoWall";
import IntegrationLogos, { pickIntegrations } from "@/app/components/v2/IntegrationLogos";
import { demoUrl } from "@/app/lib/cta-urls";
import type { Lang } from "@/app/lib/i18n";

// Lang-aware pricing body. JA is the default → the existing /pricing/ page
// renders byte-identically (all EN-only sections hang off optional fields).
// 2026-07-02 pricing model v3 (founder deck p20): ONE base plan (リード獲得
// ¥15万〜 = Chat + Ads + Library) + add-ons (商談化/Calendar +¥5万,
// 追客/Email +¥5万). Popular setups: base+convert ¥20万〜 (recommended),
// full ¥25万〜. EN mirrors with From-pricing and trial-first CTAs.

// Deck-p20 pricing model: ONE base plan + add-ons + a "popular setups" panel.
type BasePlan = {
  label: string; // 基本プラン
  name: string; // リード獲得
  stageLine: string; // 掴む・育てる（Chat + Ads + Library）
  price: string; // ¥15万 / ¥150,000
  pricePrefix?: string; // EN "From "
  desc: string;
  pill: string; // マーケチームだけで導入可能
  ctaLabel: string;
  ctaHref?: string; // default: demo
  fit?: string; // こんな企業に
};
type Addon = { title: string; price: string; product: string; desc: string };
type PopularSetup = { title: string; price: string; pricePrefix?: string; badge?: string; ctaLabel: string; ctaHref?: string; fit?: string };
/** 稟議 layer: Meeton vs hiring an SDR vs stacking individual tools. */
type CostRow = { dim: string; meeton: string; humanSdr: string; toolStack: string };

type PricingStrings = {
  metaTitleAbsolute: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  heroEyebrow: string;
  heroH1a: React.ReactNode;
  heroSub: string;
  heroSecondaryLabel: string;
  plansEyebrow: string;
  plansTitle: string;
  plansLede: string;
  priceUnit: string; // suffix after the ¥ amount
  planCta: string;
  stagesLinkPre: string;
  stagesLinkText: string;
  trafficEyebrow: string;
  trafficTitle: string;
  trafficColTier: string;
  trafficColAdd: string;
  trafficNote: React.ReactNode;
  integEyebrow: string;
  integTitle: string;
  faqEyebrow: string;
  faqTitle: string;
  roiLink: string;
  finalTitle: string;
  finalSub: string;
  casesLabel: string;
  basePlan: BasePlan;
  addonsHeading: string;
  addons: Addon[];
  popularHeading: string;
  popular: PopularSetup[];
  traffic: { tier: string; add: string }[];
  faq: { q: string; a: string }[];
  /** 稟議 layer (§料金ページ強化 2026-07-10) */
  costEyebrow: string;
  costTitle: string;
  costLede: string;
  costCols: { meeton: string; human: string; stack: string };
  costRows: CostRow[];
  costNote: string;
  roiExampleTitle: string;
  roiExampleBody: string;
  roiExampleCta: string;
  roiExampleHref: string;
  /** EN-only: reassurance line under the plan grid (trial terms) */
  plansFine?: string;
  /** EN-only: slim Enterprise banner under the plan grid */
  enterprise?: { name: string; desc: string; price: string; ctaLabel: string; ctaHref: string };
  /** EN-only: extra reassurance under the traffic table ("not sure?") */
  trafficReassure?: string;
};

export const PRICING_STR: Record<Lang, PricingStrings> = {
  ja: {
    metaTitleAbsolute: "料金｜Meeton ai — 基本プラン15万円〜＋必要な分だけアドオン",
    metaDescription:
      "Meeton ai の料金。基本プラン「リード獲得」15万円〜（Chat + Ads + Library）に、商談化アドオン（Calendar +5万円）・追客アドオン（Email +5万円）を必要な分だけ。人気の「基本＋商談化」は20万円〜。規模は月間トラフィックで決まります。すべて税抜/月・適格請求書対応。",
    ogTitle: "料金｜Meeton ai — 基本15万円〜＋アドオンで必要な分だけ",
    ogDescription:
      "基本プラン15万円〜（掴む・育てる）＋商談化・追客アドオン各5万円。人気の基本＋商談化は20万円〜。",
    heroEyebrow: "料金プラン",
    heroH1a: (
      <>
        掴む → 育てる → <span style={{ color: "var(--cta)" }}>商談化</span> → 追客。<br />必要な段階から。
      </>
    ),
    heroSub: "マーケの課題「掴む・育てる」を基本プランに。商談化と追客は、必要な分だけアドオンで。規模は月間トラフィックで決まります。すべて税抜/月。",
    heroSecondaryLabel: "導入事例を見る",
    plansEyebrow: "基本プラン＋アドオン",
    plansTitle: "基本は「リード獲得」。あとは必要な分だけ。",
    plansLede:
      "基本プランに、商談化（Calendar）・追客（Email）のアドオンを自由に追加。事業の成長に合わせて、いつでも足せます。",
    priceUnit: " 〜 / 月（税抜）",
    planCta: "この構成で相談する",
    stagesLinkPre: "ステージの考え方は",
    stagesLinkText: "AI SDR の4つの仕事",
    trafficEyebrow: "トラフィック追加（全プラン共通）",
    trafficTitle: "規模は、月間トラフィックで。",
    trafficColTier: "月間トラフィック",
    trafficColAdd: "追加料金",
    trafficNote: (
      <>
        カレンダー連携は全プラン無制限。複数サイト・高度な連携は{" "}
        <Link href="/enterprise/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>Enterprise（要相談）</Link>。年額前払いは2ヶ月無料（約17%オフ）。適格請求書（インボイス制度対応）を発行します。
      </>
    ),
    integEyebrow: "連携",
    integTitle: "主要なCRM・MA・通知基盤とつながります。",
    faqEyebrow: "よくある質問",
    faqTitle: "料金のFAQ",
    roiLink: "まず商談化の余地を試算する（ROI診断）→",
    finalTitle: "どのプランが合うか、まず相談。",
    finalSub: "30分のデモで、自社の規模と段階に合う構成を具体的に提案します。",
    casesLabel: "導入事例を見る",
    basePlan: {
      label: "基本プラン",
      name: "リード獲得",
      stageLine: "掴む・育てる（ Chat + Ads + Library ）",
      price: "¥15万",
      desc: "会話と広告で潜在層を掴み、資料で育て、リードにする。CRM 連携込み。",
      pill: "マーケチームだけで導入可能",
      ctaLabel: "この構成で相談する",
      fit: "こんな企業に: 問い合わせ・資料DLをまず増やしたい。マーケ主導で始めたい。",
    },
    addonsHeading: "＋ 必要な分だけアドオン",
    addons: [
      { title: "商談化アドオン", price: "+5万円", product: "Meeton Calendar", desc: "掴んだリードを予約まで運ぶ。連携人数 無制限。" },
      { title: "追客アドオン", price: "+5万円", product: "Meeton Email", desc: "逃したリードを 1:1 で回収し、再商談化へ戻す。" },
    ],
    popularHeading: "人気の構成",
    popular: [
      { title: "基本＋商談化", price: "¥20万〜", badge: "おすすめ", ctaLabel: "この構成で相談する", fit: "こんな企業に: リードはあるが、商談化率・初動スピードに課題がある。" },
      { title: "フル構成（＋追客）", price: "¥25万〜", ctaLabel: "この構成で相談する", fit: "こんな企業に: 獲得〜追客までパイプライン全体を自動化したい。休眠リードが多い。" },
    ],
    plansFine:
      "アドオンは基本プランに自由に追加できます。商談化アドオンの Calendar 連携人数は無制限。構成はいつでも変更可能。",
    traffic: [
      { tier: "〜3万セッション/月", add: "基本料金に込み" },
      { tier: "〜10万セッション/月", add: "+¥6万" },
      { tier: "〜30万セッション/月", add: "+¥12万" },
      { tier: "30万超", add: "要相談" },
    ],
    faq: [
      {
        q: "プランはどう選べばいいですか？",
        a: "基本プラン『リード獲得』（15万円〜、Chat + Ads + Library）がすべての土台です。掴んだリードを商談まで運ぶなら商談化アドオン（Calendar +5万円/月）、逃したリードの回収まで自動化するなら追客アドオン（Email +5万円/月）を追加します。最も選ばれるのは基本＋商談化の構成（20万円〜）、フル構成は25万円〜です。",
      },
      {
        q: "料金は何で決まりますか？",
        a: "構成（基本プラン＋追加したアドオン）と、月間トラフィック（セッション数）の2軸で決まります。基本料金に3万セッション/月まで込み、〜10万で+¥6万、〜30万で+¥12万、30万超は要相談です。商談化アドオンのカレンダー連携人数は無制限です。",
      },
      {
        q: "アドオンは後から追加できますか？",
        a: "できます。基本プランで始めて、商談化（Calendar）や追客（Email）のアドオンを事業の成長に合わせて後から自由に追加・変更できます。",
      },
      {
        q: "複数サイト・高度な要件は？",
        a: "複数サイト運用・高度なCRM連携・SSO・セキュリティ要件などは Enterprise（要相談）で対応します。詳細は エンタープライズ ページをご覧ください。",
      },
      {
        q: "支払い方法と請求書（インボイス）は？",
        a: "クレジットカードまたは請求書（銀行振込）に対応します。いずれもインボイス制度に対応した適格請求書（登録番号入り）を発行します。",
      },
      {
        q: "価格が高いように感じます。何と比較すべきですか？",
        a: "比較対象は『ツール単体の価格』ではなく『商談を生む体制のコスト』です。インサイドセールスを1名採用すると年収換算で月30万円台後半＋採用・育成コストがかかり、対応は営業時間内に限られます。Meeton ai はフル構成でも25万円〜/月で、24時間365日、初動5秒でWebサイト上の商談化を自動化します。まず自社の数字でROI診断（無料・登録不要）をお試しください。",
      },
      {
        q: "今のMAツールがあれば十分ではないですか？",
        a: "MAツールの主な仕事はスコアリングとメール配信で、『いまサイトに来ている見込み客と会話し、その場で商談予約まで運ぶ』仕事は範囲外です。Meeton ai はMAを置き換えるのではなく、MAが取りこぼす初動対応・会話・予約導線を担い、HubSpot・Salesforce 等と連携して併用できます。詳しくは比較ページ「MAツールとAI SDRの違い」をご覧ください。",
      },
      {
        q: "シナリオ型チャットボットで十分ではないですか？",
        a: "シナリオ型チャットボットは決められた分岐に沿って答えるだけで、商談まで運ぶ設計になっていません。実際、シナリオ型から Meeton ai に切り替えた BizteX 様では、チャット経由のリードが月1〜2件から月20件以上（20倍以上）に増えました。違いは比較ページ「チャットボットとAI SDRの違い」で解説しています。",
      },
      {
        q: "AIの回答品質・セキュリティが不安です。",
        a: "回答は自社の資料・サイト情報を根拠に生成し、会話ログは管理画面で全件確認できます。運用開始後も回答の調整が可能です。セキュリティは ISO/IEC 27001・27017 認証を取得し、通信は暗号化されています。詳細はセキュリティページをご覧ください。",
      },
    ],
    costEyebrow: "コストの考え方",
    costTitle: "採用・ツール積み上げと比べて、どうか。",
    costLede: "稟議でよく比較される2つの選択肢と並べました。数字はいずれも一般的な目安です（2026年時点）。",
    costCols: { meeton: "Meeton ai（フル構成）", human: "インサイドセールス採用（1名）", stack: "ツールを個別に導入" },
    costRows: [
      { dim: "月額の目安", meeton: "25万円〜", humanSdr: "約37.5万円〜（年収450万円換算）＋採用・育成・管理コスト", toolStack: "チャットボット＋MA＋日程調整＋資料共有＋メール配信で計10万〜数十万円" },
      { dim: "対応時間", meeton: "24時間365日・初動5秒", humanSdr: "営業時間内（1人分の処理量）", toolStack: "ツールごとに分断" },
      { dim: "カバー範囲", meeton: "掴む→育てる→商談化→追客をひとつで", humanSdr: "架電・メール中心。Web訪問者へのその場の初動は困難", toolStack: "機能は揃うが導線が分断。連携の設計・開発が別途必要" },
      { dim: "立ち上がり", meeton: "JSタグ1行・約5分で設置", humanSdr: "採用に1〜3ヶ月＋育成期間", toolStack: "ツールごとに選定・契約・設定" },
      { dim: "データ", meeton: "会話・資料閲覧・予約・追客を1つのCRM連携に集約", humanSdr: "SFA入力は本人の運用次第", toolStack: "ツール間のデータ統合が別途必要" },
    ],
    costNote: "※ 人件費・ツール価格は一般的な目安です。Meeton ai は人間のSDR/ISの置き換えではなく、Web上の初動・商談化を自動化して、人が商談そのものに集中できるようにする位置づけです。",
    roiExampleTitle: "稟議のためのROI試算例",
    roiExampleBody: "例えば受注単価100万円の企業が「基本＋商談化」（20万円/月）を導入した場合、月1件の追加受注で投資額の5倍になります。自社の訪問数・CV率・商談化率から、商談化の余地を無料で試算できます。",
    roiExampleCta: "60秒で、商談化の余地を診断する →",
    roiExampleHref: "/tools/roi/",
  },
  en: {
    metaTitleAbsolute: "Pricing｜Meeton ai — start with a 1-month free trial",
    metaDescription:
      "Meeton ai pricing. Base plan (Lead Acquisition: Chat + Ads + Library) from ¥150,000/mo, then add only what you need — Meeting Booking add-on (Calendar) +¥50,000, Win-back add-on (Email) +¥50,000. Most-popular setup from ¥200,000/mo. Every setup starts with a 1-month free trial, no credit card required.",
    ogTitle: "Pricing｜Meeton ai — start with a 1-month free trial",
    ogDescription:
      "Base plan from ¥150,000/mo · add-ons ¥50,000 each (meeting booking / win-back). Most-popular setup from ¥200,000/mo. 1-month free trial, no credit card required.",
    heroEyebrow: "Pricing",
    heroH1a: (
      <>
        Start with a <span style={{ color: "var(--cta)" }}>1-month free trial</span>.
      </>
    ),
    heroSub: "One base plan for capture & nurture, then add only what you need — meeting booking and win-back are simple add-ons. No credit card required to start. All prices are tax-exclusive / month.",
    heroSecondaryLabel: "See customer stories",
    plansEyebrow: "Base plan + add-ons",
    plansTitle: "Start with the base. Add only what you need.",
    plansLede:
      "Every setup starts with a 1-month free trial. Add meeting booking (Calendar) and win-back (Email) to the base plan whenever you're ready — ¥50,000/mo each.",
    priceUnit: " / mo (excl. tax)",
    planCta: "Start 1-month free trial",
    stagesLinkPre: "For how the stages work, see",
    stagesLinkText: "the four jobs of an AI SDR",
    trafficEyebrow: "Included traffic (all plans)",
    trafficTitle: "Every plan includes up to 30,000 sessions / month.",
    trafficColTier: "Monthly website sessions",
    trafficColAdd: "Add-on",
    trafficNote: (
      <>
        Calendar integration is unlimited on every plan. Annual prepay is 2 months free (about 17% off). For multiple sites and advanced integrations, see{" "}
        <Link href="/en/enterprise/" className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>Enterprise</Link>.
      </>
    ),
    trafficReassure:
      "Not sure about your traffic? Start with the base plan — we'll notify you before any traffic-based change to your plan. No surprise charges.",
    integEyebrow: "Integrations",
    integTitle: "Connects with major CRM, MA, and notification platforms.",
    faqEyebrow: "FAQ",
    faqTitle: "Pricing FAQ",
    roiLink: "First, estimate your meeting-conversion upside (ROI diagnosis) →",
    finalTitle: "Start your 1-month free trial today.",
    finalSub: "Install with a single JS tag, connect your calendar and CRM, and see your first AI-qualified conversations this week. Prefer a walkthrough first? Book a 30-minute demo.",
    casesLabel: "See customer stories",
    plansFine:
      "✓ Add-ons are ¥50,000/mo each and can be added to the base plan anytime · ✓ 1-month free trial on every setup · ✓ No credit card required · ✓ You approve before any paid plan begins",
    enterprise: {
      name: "Enterprise",
      desc: "Multiple sites, advanced CRM integrations, SSO, and security reviews — custom traffic and terms.",
      price: "Custom",
      ctaLabel: "Book a demo",
      ctaHref: "/en/contact/",
    },
    basePlan: {
      label: "Base plan",
      name: "Lead Acquisition",
      stageLine: "Capture & nurture ( Chat + Ads + Library )",
      price: "¥150,000",
      pricePrefix: "From ",
      desc: "Capture latent prospects with conversation and on-site ads, nurture them with content. CRM integration included.",
      pill: "Your marketing team can run it alone",
      ctaLabel: "Start 1-month free trial",
      ctaHref: "/en/trial/?src=pricing&plan=lead",
      fit: "Best for: teams that first want more inquiries and content downloads, led by marketing.",
    },
    addonsHeading: "＋ Add only what you need",
    addons: [
      { title: "Meeting Booking add-on", price: "+¥50,000", product: "Meeton Calendar", desc: "Carries captured leads to a booked meeting. Unlimited calendar seats." },
      { title: "Win-back add-on", price: "+¥50,000", product: "Meeton Email", desc: "Recovers missed leads 1:1 and brings them back to a meeting." },
    ],
    popularHeading: "Popular setups",
    popular: [
      { title: "Base + Meeting Booking", price: "¥200,000", pricePrefix: "From ", badge: "Recommended", ctaLabel: "Start free trial", ctaHref: "/en/trial/?src=pricing&plan=meeting", fit: "Best for: teams that capture leads already but struggle with meeting conversion and speed to lead." },
      { title: "Full stack (+ win-back)", price: "¥250,000", pricePrefix: "From ", ctaLabel: "Start free trial", ctaHref: "/en/trial/?src=pricing&plan=all-in-one", fit: "Best for: teams automating the whole pipeline from capture to win-back, or sitting on many dormant leads." },
    ],
    traffic: [
      { tier: "Up to 30,000 sessions / mo", add: "Included in every plan" },
      { tier: "30,000 – 100,000 sessions / mo", add: "+¥60,000 / mo" },
      { tier: "100,000 – 300,000 sessions / mo", add: "+¥120,000 / mo" },
      { tier: "Over 300,000 sessions / mo", add: "Contact us" },
    ],
    faq: [
      {
        q: "How does the 1-month free trial work?",
        a: "Request a trial, and we'll reach out within 1 business day to get you live — a single JS tag on your site, plus calendar and CRM connections. You then get full access to your plan's features for one month, free. No credit card is required to start, and you won't be billed automatically: paid service begins only after you confirm your plan at the end of the trial.",
      },
      {
        q: "How should I choose a setup?",
        a: "The base plan — Lead Acquisition (from ¥150,000/mo: Chat + Ads + Library) — is the foundation. Add the Meeting Booking add-on (Meeton Calendar, +¥50,000/mo) to convert leads into booked meetings, and the Win-back add-on (Meeton Email, +¥50,000/mo) to recover missed leads automatically. The most popular setup is Base + Meeting Booking (from ¥200,000/mo); the full stack is from ¥250,000/mo. Every setup starts with a free trial.",
      },
      {
        q: "What determines the final price?",
        a: "Two axes: your setup (base plan + the add-ons you choose, ¥50,000/mo each) and your monthly website traffic. Every setup includes up to 30,000 sessions/mo; 30,000–100,000 is +¥60,000/mo, 100,000–300,000 is +¥120,000/mo, and over 300,000 is quote-based. If you're not sure about your traffic, start with the base plan — we'll notify you before any traffic-based change. Calendar seats are unlimited on the Meeting Booking add-on.",
      },
      {
        q: "Can I add or remove add-ons later?",
        a: "Yes. Start with the base plan and add meeting booking (Calendar) or win-back (Email) whenever you're ready — each is a simple ¥50,000/mo add-on, and you can change your setup as your business grows.",
      },
      {
        q: "What about multiple sites or advanced requirements?",
        a: "Multiple-site operation, advanced CRM integration, SSO, and security requirements are handled with Enterprise (custom pricing). See the Enterprise page or book a demo to discuss your setup.",
      },
      {
        q: "What payment methods and invoices do you support?",
        a: "We support credit card or invoice (bank transfer). In either case we issue Japan qualified invoices (with registration number) compliant with the invoice system.",
      },
      {
        q: "It feels expensive. What should I compare it against?",
        a: "Compare it against the cost of a meeting-generating capacity, not a tool's sticker price. Hiring one inside-sales rep costs roughly ¥375,000+/mo in salary terms (at ¥4.5M/yr) plus recruiting and ramp-up, and covers business hours only. The Meeton ai full stack is from ¥250,000/mo, works 24/7, and responds to leads within 5 seconds. Try the free ROI estimate (no signup) with your own numbers first.",
      },
      {
        q: "Isn't our existing MA tool enough?",
        a: "MA tools score leads and send email campaigns — engaging the visitor who is on your site right now, in conversation, and carrying them to a booked meeting is outside their job. Meeton ai doesn't replace your MA; it covers the first response, conversation, and booking flow your MA misses, and integrates with HubSpot, Salesforce, and more.",
      },
      {
        q: "Isn't a scripted chatbot enough?",
        a: "Scripted chatbots answer along fixed decision trees; they aren't designed to carry a lead to a meeting. When BizteX switched from a scripted chat to Meeton ai, chat-sourced leads grew from 1–2 a month to 20+ — more than 20x. See our chatbot-vs-AI-SDR comparison for details.",
      },
      {
        q: "What about AI answer quality and security?",
        a: "Answers are grounded in your own content and site information, every conversation log is reviewable in the console, and responses can be tuned after launch. Security-wise we hold ISO/IEC 27001 and 27017 certifications and encrypt data in transit. See the security page for details.",
      },
    ],
    costEyebrow: "How to think about the cost",
    costTitle: "Compared with hiring, or stacking tools.",
    costLede: "The two options most often weighed against Meeton ai in internal approvals. All figures are general estimates (as of 2026).",
    costCols: { meeton: "Meeton ai (full stack)", human: "Hiring one inside-sales rep", stack: "Stacking individual tools" },
    costRows: [
      { dim: "Monthly cost (approx.)", meeton: "From ¥250,000", humanSdr: "≈¥375,000+ (at ¥4.5M/yr) + recruiting, ramp-up, management", toolStack: "Chatbot + MA + scheduling + content sharing + email: ¥100,000 to several hundred thousand combined" },
      { dim: "Coverage hours", meeton: "24/7, first response in 5 seconds", humanSdr: "Business hours (one person's throughput)", toolStack: "Fragmented across tools" },
      { dim: "Scope", meeton: "Capture → nurture → convert → win back, in one platform", humanSdr: "Calls and email; hard to catch website visitors in the moment", toolStack: "Features exist but journeys are fragmented; integration work required" },
      { dim: "Time to launch", meeton: "One JS tag, ~5 minutes to install", humanSdr: "1–3 months to hire, plus ramp-up", toolStack: "Selection, contracting, and setup per tool" },
      { dim: "Data", meeton: "Conversations, content views, bookings, and follow-ups in one CRM integration", humanSdr: "CRM hygiene depends on the individual", toolStack: "Cross-tool data unification is extra work" },
    ],
    costNote: "Labor and tool costs are general estimates. Meeton ai is not a replacement for human SDRs — it automates the first response and website-side conversion so your people can focus on the meetings themselves.",
    roiExampleTitle: "An ROI example for your internal approval",
    roiExampleBody: "If your average deal is ¥1,000,000 and you run Base + Meeting Booking (¥200,000/mo), one additional won deal per month returns 5x the investment. Estimate your own meeting upside from your traffic, CVR, and meeting rate — free, no signup.",
    roiExampleCta: "Estimate your meeting upside in 60 seconds →",
    roiExampleHref: "/en/tools/roi/",
  },
};

export const pricingFaqSchema = (lang: Lang, url: string) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url,
  mainEntity: PRICING_STR[lang].faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const pricingProductSchema = (lang: Lang, url: string) => {
  const st = PRICING_STR[lang];
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#product`,
    name: "Meeton ai",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url,
    publisher: { "@id": "https://dynameet.ai/#organization" },
    offers: [
      { "@type": "Offer", name: `${st.basePlan.label} ${st.basePlan.name}`, price: "150000", priceCurrency: "JPY" },
      { "@type": "Offer", name: st.popular[0].title, price: "200000", priceCurrency: "JPY" },
      { "@type": "Offer", name: st.popular[1].title, price: "250000", priceCurrency: "JPY" },
    ],
  };
};

// SectionHead owns its <h2>, so balance line breaks via a block-level span.
const balanced = (text: string) => <span style={{ display: "block", textWrap: "balance", wordBreak: "auto-phrase" }}>{text}</span>;

const th: React.CSSProperties = { textAlign: "left", padding: "14px 16px", fontWeight: 800, color: "var(--heading)", borderBottom: "2px solid var(--border)" };
const td: React.CSSProperties = { padding: "14px 16px", color: "var(--text)", borderBottom: "1px solid var(--border)", fontSize: 14, lineHeight: 1.7, fontVariantNumeric: "tabular-nums" };

export default function PricingContent({ lang = "ja" }: { lang?: Lang }) {
  const s = PRICING_STR[lang];
  const casesHref = lang === "en" ? "/en/cases/" : "/cases/";
  const stagesHref = lang === "en" ? "/en/#stages" : "/#stages";
  return (
    <>
      <Nav lang={lang} />

      {/* Hero */}
      <Section tone="navy" py={0} style={{ paddingTop: 124, paddingBottom: 64 }}>
        <div style={{ maxWidth: 760 }}>
          <Eyebrow tone="dark">{s.heroEyebrow}</Eyebrow>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.18, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--on-navy)", margin: "20px 0 0", textWrap: "balance", wordBreak: "auto-phrase" }}>
            {s.heroH1a}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.85, color: "var(--on-navy-sub)", margin: "20px 0 28px" }}>
            {s.heroSub}
          </p>
          <CTAButtons
            source="pricing-hero"
            tone="onNavy"
            size="lg"
            lang={lang}
            secondaryLabel={s.heroSecondaryLabel}
            secondaryHref={casesHref}
            assurances={
              lang === "en"
                ? ["No credit card required to start", "Cancel anytime during the trial", "Live within 1 business day"]
                : ["30分のデモ・オンライン", "年額前払いは2ヶ月無料", "適格請求書（インボイス）対応"]
            }
          />
        </div>
      </Section>

      <LogoWall tone="surface" lang={lang} />

      {/* 3 plans (deck p19) */}
      <Section tone="white">
        <SectionHead eyebrow={s.plansEyebrow} title={balanced(s.plansTitle)} lede={s.plansLede} align="center" />
        <div className="pv3">
          {/* base plan (deck-left) */}
          <div className="pv3-base">
            <div className="pv3-bar" />
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--sub)" }}>{s.basePlan.label}</div>
            <h3 style={{ fontFamily: "var(--fd)", fontSize: 30, fontWeight: 800, color: "var(--heading)", margin: "8px 0 6px", letterSpacing: "-0.02em" }}>{s.basePlan.name}</h3>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: "var(--cta-ink)" }}>{s.basePlan.stageLine}</div>
            <div style={{ fontFamily: "var(--fd)", fontWeight: 800, color: "var(--cta-ink)", margin: "16px 0 4px", fontVariantNumeric: "tabular-nums" }}>
              {s.basePlan.pricePrefix && <span style={{ fontSize: 20, fontWeight: 700, color: "var(--sub)" }}>{s.basePlan.pricePrefix}</span>}
              <span style={{ fontSize: 46 }}>{s.basePlan.price}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "var(--sub)" }}>{s.priceUnit}</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: "var(--text)", margin: "10px 0 14px" }}>{s.basePlan.desc}</p>
            {s.basePlan.fit && (
              <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "var(--sub)", margin: "0 0 14px" }}>{s.basePlan.fit}</p>
            )}
            <div style={{ background: "var(--cta-wash)", border: "1px solid var(--cta-border)", borderRadius: 10, padding: "10px 14px", textAlign: "center", fontSize: 13, fontWeight: 800, color: "var(--cta-ink)" }}>{s.basePlan.pill}</div>
            <a href={s.basePlan.ctaHref ?? demoUrl("pricing-lead")} className="v2-cta-primary" style={{ marginTop: 16, textAlign: "center", padding: "13px 20px", borderRadius: 12, fontSize: 15, fontWeight: 800, textDecoration: "none", background: "var(--cta)", color: "var(--on-cta)", display: "block", boxShadow: "0 6px 22px var(--cta-glow)" }}>
              {s.basePlan.ctaLabel}
            </a>
          </div>

          {/* plus */}
          <div className="pv3-plus" aria-hidden>＋</div>

          {/* add-ons (deck-middle) */}
          <div className="pv3-addons">
            <div style={{ fontSize: 12, fontWeight: 800, color: "var(--sub)", letterSpacing: ".06em", textTransform: "uppercase" }}>{s.addonsHeading}</div>
            {s.addons.map((a) => (
              <div key={a.title} className="pv3-addon">
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--heading)", margin: 0 }}>{a.title}</h3>
                  <div style={{ whiteSpace: "nowrap" }}>
                    <span style={{ fontFamily: "var(--fd)", fontSize: 24, fontWeight: 800, color: "var(--cta-ink)", fontVariantNumeric: "tabular-nums" }}>{a.price}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--sub)" }}>{lang === "en" ? " / mo" : " / 月"}</span>
                  </div>
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 800, color: "var(--cta-ink)", margin: "6px 0 8px" }}>{a.product}</div>
                <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--text)", margin: 0 }}>{a.desc}</p>
              </div>
            ))}
          </div>

        </div>

        {/* popular setups — full-width navy band below (roomier than the
            deck's side column at web widths) */}
        <div className="pv3-popular">
          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--cta)" }}>{s.popularHeading}</div>
          <div className="pv3-combos">
            {s.popular.map((c, i) => (
              <div key={c.title} className="pv3-combo" style={{ borderLeft: i === 0 ? "3px solid var(--cta)" : "3px solid transparent" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "var(--on-navy)" }}>{c.title}</span>
                  {c.badge && <span style={{ background: "var(--cta)", color: "var(--on-cta)", fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 999 }}>{c.badge}</span>}
                </div>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 800, color: "var(--cta)", margin: "10px 0 12px", fontVariantNumeric: "tabular-nums" }}>
                  {c.pricePrefix && <span style={{ fontSize: 16, color: "var(--on-navy-sub)" }}>{c.pricePrefix}</span>}
                  <span style={{ fontSize: 38 }}>{c.price}</span>
                </div>
                {c.fit && (
                  <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "var(--on-navy-sub)", margin: "0 0 12px" }}>{c.fit}</p>
                )}
                <a href={c.ctaHref ?? demoUrl(i === 0 ? "pricing-convert" : "pricing-allinone")} className={i === 0 ? "v2-cta-primary" : "v2-cta-ghost"} style={i === 0 ? { display: "inline-block", fontSize: 14, fontWeight: 800, color: "var(--on-cta)", textDecoration: "none", background: "var(--cta)", borderRadius: 10, padding: "10px 20px", boxShadow: "0 6px 22px var(--cta-glow)" } : { display: "inline-block", fontSize: 14, fontWeight: 800, color: "var(--on-navy)", textDecoration: "none", border: "1.5px solid var(--on-navy-border)", borderRadius: 10, padding: "10px 20px" }}>
                  {c.ctaLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .pv3{display:grid;grid-template-columns:1.1fr auto 1fr;gap:clamp(18px,2.5vw,32px);align-items:stretch;max-width:980px;margin:0 auto}
          .pv3-base{position:relative;background:#fff;border:1px solid var(--border);border-radius:18px;padding:26px 26px 24px;display:flex;flex-direction:column;box-shadow:0 12px 40px rgba(15,17,40,.06)}
          .pv3-bar{position:absolute;top:0;left:0;right:0;height:5px;border-radius:18px 18px 0 0;background:var(--cta)}
          .pv3-plus{align-self:center;font-size:34px;font-weight:800;color:var(--sub)}
          .pv3-addons{display:flex;flex-direction:column;gap:14px;justify-content:center}
          .pv3-addon{background:#fff;border:1.6px solid var(--cta-border);border-radius:16px;padding:18px 20px}
          .pv3-popular{background:var(--navy);border-radius:18px;padding:clamp(20px,3vw,28px);display:flex;flex-direction:column;gap:16px;max-width:980px;margin:24px auto 0}
          .pv3-combos{display:grid;grid-template-columns:1fr 1fr;gap:16px}
          @media(max-width:720px){.pv3-combos{grid-template-columns:1fr}}
          .pv3-combo{background:var(--navy-2);border-radius:12px;padding:16px 18px}
          @media(max-width:1023px){.pv3{grid-template-columns:1fr}.pv3-plus{padding:0;text-align:center}}
        `}</style>
        {s.plansFine && (
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13.5, fontWeight: 600, color: "var(--cta-ink)", lineHeight: 1.8 }}>
            {s.plansFine}
          </p>
        )}
        {s.enterprise && (
          <div style={{ maxWidth: 900, margin: "24px auto 0", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, justifyContent: "space-between" }}>
            <div style={{ minWidth: 240, flex: "1 1 320px" }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", marginRight: 10 }}>{s.enterprise.name}</span>
              <span style={{ fontFamily: "var(--fd)", fontSize: 15, fontWeight: 800, color: "var(--heading)" }}>{s.enterprise.price}</span>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--text)", margin: "6px 0 0" }}>{s.enterprise.desc}</p>
            </div>
            <a href={s.enterprise.ctaHref} className="v2-cta-ghost" style={{ padding: "11px 22px", borderRadius: 12, fontSize: 14, fontWeight: 800, textDecoration: "none", color: "var(--heading)", border: "1.5px solid var(--border2)", whiteSpace: "nowrap" }}>
              {s.enterprise.ctaLabel}
            </a>
          </div>
        )}
        <p style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "var(--sub)" }}>
          {s.stagesLinkPre}{" "}
          <Link href={stagesHref} className="v2-link" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>{s.stagesLinkText}</Link>
          {lang === "ja" ? " をご覧ください。" : "."}
        </p>
      </Section>

      {/* Traffic add-on */}
      <Section tone="surface">
        <SectionHead eyebrow={s.trafficEyebrow} title={balanced(s.trafficTitle)} align="center" />
        <div style={{ overflowX: "auto", maxWidth: 720, margin: "0 auto", background: "#fff", border: "1px solid var(--border)", borderRadius: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><th scope="col" style={th}>{s.trafficColTier}</th><th scope="col" style={th}>{s.trafficColAdd}</th></tr></thead>
            <tbody>
              {s.traffic.map((tr) => (
                <tr key={tr.tier}><th scope="row" style={{ ...td, textAlign: "left", fontWeight: 700, color: "var(--heading)" }}>{tr.tier}</th><td style={td}>{tr.add}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        {s.trafficReassure && (
          <p style={{ textAlign: "center", marginTop: 16, fontSize: 14, fontWeight: 700, color: "var(--cta-ink)", maxWidth: 640, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
            {s.trafficReassure}
          </p>
        )}
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "var(--sub)" }}>
          {s.trafficNote}
        </p>
      </Section>

      {/* Cost framing — 稟議 layer: vs hiring / vs stacking tools (2026-07-10) */}
      <Section tone="white">
        <SectionHead eyebrow={s.costEyebrow} title={balanced(s.costTitle)} lede={s.costLede} align="center" />
        <div style={{ overflowX: "auto", maxWidth: 980, margin: "0 auto", background: "#fff", border: "1px solid var(--border)", borderRadius: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
            <thead>
              <tr>
                <th scope="col" style={th} aria-label={lang === "en" ? "Dimension" : "比較軸"}></th>
                <th scope="col" style={{ ...th, color: "var(--cta-ink)" }}>{s.costCols.meeton}</th>
                <th scope="col" style={th}>{s.costCols.human}</th>
                <th scope="col" style={th}>{s.costCols.stack}</th>
              </tr>
            </thead>
            <tbody>
              {s.costRows.map((row) => (
                <tr key={row.dim}>
                  <th scope="row" style={{ ...td, textAlign: "left", fontWeight: 800, color: "var(--heading)", whiteSpace: "nowrap" }}>{row.dim}</th>
                  <td style={{ ...td, fontWeight: 700, color: "var(--heading)", background: "var(--cta-wash)" }}>{row.meeton}</td>
                  <td style={td}>{row.humanSdr}</td>
                  <td style={td}>{row.toolStack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 12.5, color: "var(--sub)", maxWidth: 760, marginLeft: "auto", marginRight: "auto", lineHeight: 1.8 }}>
          {s.costNote}
        </p>
        {/* 稟議 ROI example → ROI diagnostic */}
        <div style={{ maxWidth: 760, margin: "28px auto 0", background: "var(--navy)", borderRadius: 16, padding: "24px 28px", color: "var(--on-navy)" }}>
          <div style={{ fontFamily: "var(--fm)", fontSize: 12, fontWeight: 700, letterSpacing: ".08em", color: "var(--cta)", marginBottom: 8 }}>{s.roiExampleTitle}</div>
          <p style={{ fontSize: 14.5, lineHeight: 1.9, color: "var(--on-navy-sub)", margin: "0 0 14px" }}>{s.roiExampleBody}</p>
          <Link href={s.roiExampleHref} className="v2-link" style={{ fontSize: 14, fontWeight: 800, color: "var(--cta)", textDecoration: "underline" }}>
            {s.roiExampleCta}
          </Link>
        </div>
      </Section>

      {/* Integration logos */}
      <Section tone="surface" py={56}>
        <SectionHead eyebrow={s.integEyebrow} title={balanced(s.integTitle)} align="center" />
        <IntegrationLogos items={pickIntegrations(["Salesforce", "HubSpot", "Marketo", "Google Calendar", "Slack", "Microsoft Teams", "Zoom"])} lang={lang} />
      </Section>

      {/* FAQ */}
      <Section tone="white">
        <SectionHead eyebrow={s.faqEyebrow} title={balanced(s.faqTitle)} align="center" />
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 14 }}>
          {s.faq.map((f) => (
            <Card key={f.q}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--heading)", margin: "0 0 8px" }}>{f.q}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text)", margin: 0 }}>{f.a}</p>
            </Card>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 24, fontSize: 14 }}>
          <Link href="/tools/roi/" className="v2-link" style={{ color: "var(--cta-ink)", fontWeight: 700, textDecoration: "underline" }}>
            {s.roiLink}
          </Link>
        </p>
      </Section>

      {/* Final CTA */}
      <Section tone="navyDeep" py={72}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "var(--on-navy)", margin: "0 0 14px", letterSpacing: "-0.02em", textWrap: "balance", wordBreak: "auto-phrase" }}>
            {s.finalTitle}
          </h2>
          <p style={{ fontSize: 16, color: "var(--on-navy-sub)", margin: "0 0 28px" }}>{s.finalSub}</p>
          <div style={{ display: "flex", justifyContent: "center" }}><CTAButtons source="pricing-footer" tone="onNavy" size="lg" align="center" lang={lang} secondaryLabel={s.casesLabel} secondaryHref={casesHref} /></div>
        </div>
      </Section>

      <MobileStickyCta lang={lang} source="pricing" />
      <Footer lang={lang} />
    </>
  );
}
