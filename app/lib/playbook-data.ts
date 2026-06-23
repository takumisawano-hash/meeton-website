// Solutions (役割別) + use-cases (瞬間別) data (spec §2.4). Both share the
// PlaybookLP template: 課題 → 解決(どの製品が効くか) → proof → CTA. MOFU.
// Products referenced by cluster id so links resolve to the pillar LPs.

import type { ClusterId } from "@/app/lib/content-clusters";

export type Play = { title: string; desc: string; product?: Exclude<ClusterId, "ai-sdr"> };

/** Translatable copy for a playbook entry. JA lives on the entry directly; the
 *  EN twin lives in `.en` and is consumed only when PlaybookLP gets lang="en".
 *  Slug / kind / product refs / proofRef are language-agnostic and not repeated
 *  here. Numbers/claims are faithful translations of the JA. */
export type PlaybookI18n = {
  badge: string;
  h1: string;
  problemLine: string;
  sub: string;
  pains: { title: string; desc: string }[];
  plays: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
};

export type PlaybookEntry = {
  slug: string;
  kind: "role" | "moment";
  badge: string; // eyebrow
  h1: string;
  problemLine: string;
  sub: string;
  pains: { title: string; desc: string }[];
  plays: Play[];
  proofRef?: "edulinx" | "biztex" | "univis";
  faq: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
  /** English translation (consumed only when lang="en"). */
  en?: PlaybookI18n;
};

export const SOLUTIONS: Record<string, PlaybookEntry> = {
  cmo: {
    slug: "cmo", kind: "role", badge: "CMO / マーケ責任者 向け",
    problemLine: "リードは増やした。でも、商談が増えていない。",
    h1: "集めたリードを、商談に変えるマーケへ。",
    sub: "CACが上がり、リード数だけでは評価されない時代。Meeton ai は、獲得したリード（と、まだ匿名の潜在層）を商談化まで運び、マーケの成果を商談数で語れるようにします。",
    pains: [
      { title: "リード数は増えたが商談が伸びない", desc: "MQLを積んでも、初動・追客・文脈の欠如で商談化率が頭打ち。" },
      { title: "CACが上がり続ける", desc: "広告単価の上昇に対し、獲得リードの転換効率が追いつかない。" },
      { title: "訪問者の大半が匿名で去る", desc: "フォーム到達は1%未満。残りの潜在層を取り切れていない。" },
    ],
    plays: [
      { title: "接触前の潜在層を会話で掴む", desc: "問い合わせ前の検討段階に踏み込み、リード化する。", product: "chat" },
      { title: "資料の反応を可視化して追う", desc: "誰が何を見たかを把握し、温度の高い相手を逃さない。", product: "library" },
      { title: "コンバート直後に即予約", desc: "最も熱い瞬間に商談予約まで運び、商談化率を底上げ。", product: "calendar" },
    ],
    proofRef: "edulinx",
    faq: [
      { q: "MAツールと競合しますか？", a: "競合しません。MA/広告がリードを集め、Meeton ai はその先（潜在層の獲得から商談化まで）を担います。HubSpot・Salesforce と連携し、商談化のレイヤーを補完します。" },
      { q: "成果はどう測れますか？", a: "記事→LP→無料登録→アクティベーション→商談化までを計測でき、マーケの成果を『商談数』で語れます。まず /tools/roi で自社の商談化の余地を試算できます。" },
    ],
    metaTitle: "CMO・マーケ責任者向け｜リードを商談に変える AI SDR｜Meeton ai",
    metaDescription: "リード数は増えても商談が伸びない——CMO/マーケ責任者向けに、潜在層の獲得から商談化までを自動化し、成果を商談数で語れるようにする Meeton ai のソリューション。",
    en: {
      badge: "For CMOs & Heads of Marketing",
      problemLine: "Leads are up. But meetings are not.",
      h1: "Marketing that turns the leads you gathered into meetings.",
      sub: "In an era of rising CAC where lead volume alone no longer counts, Meeton ai carries the leads you acquired (and the still-anonymous prospects) all the way to a booked meeting — so marketing can speak in meeting counts.",
      pains: [
        { title: "Lead volume is up, but meetings are not", desc: "Even as MQLs pile up, slow first response, missed follow-up, and lack of context cap your meeting-conversion rate." },
        { title: "CAC keeps climbing", desc: "As ad costs rise, the conversion efficiency of acquired leads cannot keep pace." },
        { title: "Most visitors leave anonymous", desc: "Under 1% reach a form. You are not capturing the rest of the prospect base." },
      ],
      plays: [
        { title: "Capture pre-contact prospects in conversation", desc: "Step into the consideration stage before an inquiry and turn prospects into leads." },
        { title: "Make content engagement visible and follow up", desc: "See who viewed what, and never miss a warm contact." },
        { title: "Book the meeting right after they convert", desc: "Carry the hottest moment all the way to a booking and lift meeting-conversion." },
      ],
      faq: [
        { q: "Does it compete with my MA tool?", a: "No. Your MA / ads gather leads, and Meeton ai handles what comes next — from capturing prospects to booking meetings. It integrates with HubSpot / Salesforce and complements the meeting-conversion layer." },
        { q: "How do I measure results?", a: "You can measure article → LP → free signup → activation → meeting, so marketing can speak in meeting counts. Start with /tools/roi to estimate your meeting-conversion upside." },
      ],
      metaTitle: "For CMOs & Heads of Marketing｜An AI SDR that turns leads into meetings｜Meeton ai",
      metaDescription: "Lead volume is up but meetings are not — for CMOs / heads of marketing, Meeton ai automates everything from capturing prospects to booking meetings, so you can speak in meeting counts.",
    },
  },
  cro: {
    slug: "cro", kind: "role", badge: "CRO / 営業責任者 向け",
    problemLine: "せっかくのリードを、初動の遅さで失っている。",
    h1: "取りこぼしを止め、パイプラインを太くする。",
    sub: "初動の遅延・追客漏れ・SDR工数。Meeton ai は、リード発生の瞬間の即フォローと、未予約リードのAI追客で、商談パイプラインの漏れを塞ぎます。",
    pains: [
      { title: "初動が遅く商談を逃す", desc: "Speed to Lead が守れず、熱いリードが競合に流れる。" },
      { title: "未予約リードを放置している", desc: "その場で予約しなかったリードを追い切れず、冷ましている。" },
      { title: "SDRの工数が逼迫", desc: "手動アサイン・追客で、商談以外に時間が溶ける。" },
    ],
    plays: [
      { title: "リード発生の瞬間に即フォロー", desc: "自動アサイン・CRM登録まで自律化し、初動を秒単位に。", product: "calendar" },
      { title: "未予約リードをAIが追客", desc: "行動シグナル起点で1:1フォロー、返信・予約まで自律。", product: "email" },
      { title: "一次対応をAIが代行", desc: "訪問者との会話・選別をAIが担い、営業は商談に集中。", product: "chat" },
    ],
    proofRef: "biztex",
    faq: [
      { q: "既存のSFA/CRMはそのまま使えますか？", a: "はい。Salesforce・HubSpot と連携し、会話ログや予約を自動登録します。既存のパイプライン管理を置き換えず、入口の漏れを塞ぎます。" },
      { q: "SDRの人員削減が前提ですか？", a: "いいえ。反復業務（初動・追客・選別）をAIが担い、人は商談・クロージングに集中する役割分担が前提です。" },
    ],
    metaTitle: "CRO・営業責任者向け｜取りこぼしを止める AI SDR｜Meeton ai",
    metaDescription: "初動遅延・追客漏れ・SDR工数——CRO/営業責任者向けに、即フォローとAI追客で商談パイプラインの漏れを塞ぐ Meeton ai のソリューション。",
    en: {
      badge: "For CROs & Heads of Sales",
      problemLine: "You're losing good leads to a slow first response.",
      h1: "Stop the leaks and build a thicker pipeline.",
      sub: "Slow first response, missed follow-up, SDR workload. Meeton ai plugs the leaks in your meeting pipeline with instant follow-up the moment a lead appears and AI follow-up of unbooked leads.",
      pains: [
        { title: "Slow first response loses meetings", desc: "When Speed to Lead slips, hot leads flow to a competitor." },
        { title: "Unbooked leads are left untouched", desc: "Leads that didn't book on the spot go un-pursued and cool off." },
        { title: "SDR capacity is stretched thin", desc: "Manual assignment and follow-up melt time that isn't spent in meetings." },
      ],
      plays: [
        { title: "Instant follow-up the moment a lead appears", desc: "Automate assignment and CRM logging end-to-end, bringing first response to seconds." },
        { title: "AI follows up unbooked leads", desc: "Triggered by behavioral signals, 1:1 follow-up that runs autonomously through reply and booking." },
        { title: "AI handles first response", desc: "AI handles visitor conversation and qualification so reps focus on meetings." },
      ],
      faq: [
        { q: "Can I keep my existing SFA / CRM?", a: "Yes. Meeton ai integrates with Salesforce / HubSpot and auto-logs conversation history and bookings. It plugs the leaks at the top without replacing your pipeline management." },
        { q: "Does it assume cutting SDR headcount?", a: "No. The premise is a division of labor: AI handles the repetitive work (first response, follow-up, qualification) so people focus on meetings and closing." },
      ],
      metaTitle: "For CROs & Heads of Sales｜An AI SDR that stops the leaks｜Meeton ai",
      metaDescription: "Slow first response, missed follow-up, SDR workload — for CROs / heads of sales, Meeton ai plugs the leaks in your meeting pipeline with instant follow-up and AI follow-up.",
    },
  },
  sdr: {
    slug: "sdr", kind: "role", badge: "IS / SDR 責任者 向け",
    problemLine: "大量のリードを、5分以内に捌き切れない。",
    h1: "初動・追客を、AIにスケールさせる。",
    sub: "リードが増えるほど初動は遅れ、追客は漏れる。Meeton ai は、即時対応・自動アサイン・行動起点の追客をAIに任せ、ISチームを少数精鋭の有望アカウント対応に集中させます。",
    pains: [
      { title: "初動5分を守れない", desc: "リード量が増えると手動対応では追いつかず、機会損失に。" },
      { title: "追客が属人化・漏れる", desc: "誰がいつ追うかが人依存で、休眠リードが積み上がる。" },
      { title: "有望アカウントに集中できない", desc: "全件対応に追われ、勝てる相手に時間を割けない。" },
    ],
    plays: [
      { title: "即時対応と自動アサイン", desc: "発生の瞬間に予約導線＋担当差配を自動化。", product: "calendar" },
      { title: "行動シグナルで追客自動化", desc: "再訪・開封を検知してAIが1:1で追う。漏れゼロ。", product: "email" },
      { title: "一次会話をAIが処理", desc: "訪問者対応・選別をAIが担い、ISは有望案件へ。", product: "chat" },
    ],
    proofRef: "biztex",
    faq: [
      { q: "PQL（有望アカウント）の通知はありますか？", a: "アクティベーション以降、顧客のファネル（訪問・予約・開封・反応）を計測し、上げどきのアカウントをシグナル化してSlack等に通知する設計です。" },
      { q: "導入の手間は？", a: "ノーコードです（スニペット設置・OAuth接続）。ISチーム側の運用負荷を増やさず、初動と追客を自動化します。" },
    ],
    metaTitle: "IS・SDR責任者向け｜初動と追客をスケールする AI SDR｜Meeton ai",
    metaDescription: "大量リードの初動5分・追客漏れ——IS/SDR責任者向けに、即時対応・自動アサイン・行動起点の追客をAIに任せ、有望アカウントに集中できる Meeton ai のソリューション。",
    en: {
      badge: "For Heads of IS / SDR",
      problemLine: "You can't process a flood of leads within 5 minutes.",
      h1: "Scale first response and follow-up with AI.",
      sub: "The more leads you get, the slower first response becomes and the more follow-up slips. Meeton ai hands instant response, auto-assignment, and behavior-triggered follow-up to AI, so your IS team can focus, lean and sharp, on promising accounts.",
      pains: [
        { title: "Can't hold the 5-minute first response", desc: "As lead volume grows, manual handling can't keep up and opportunities are lost." },
        { title: "Follow-up gets person-dependent and slips", desc: "Who follows up and when depends on individuals, so dormant leads pile up." },
        { title: "Can't focus on promising accounts", desc: "Buried in handling every lead, you can't spend time on the ones you can win." },
      ],
      plays: [
        { title: "Instant response and auto-assignment", desc: "Automate the booking path and rep assignment the instant a lead appears." },
        { title: "Behavior-triggered follow-up automation", desc: "Detect revisits and opens, and the AI follows up 1:1. Zero leaks." },
        { title: "AI handles first conversation", desc: "AI handles visitor response and qualification so IS moves to promising deals." },
      ],
      faq: [
        { q: "Are there notifications for PQLs (promising accounts)?", a: "After activation, we measure the customer funnel (visits, bookings, opens, responses) and signal accounts that are ready to move, notifying Slack and the like." },
        { q: "How much setup effort is required?", a: "It's no-code (snippet placement, OAuth connect). It automates first response and follow-up without adding operational load to your IS team." },
      ],
      metaTitle: "For Heads of IS / SDR｜An AI SDR that scales first response and follow-up｜Meeton ai",
      metaDescription: "The 5-minute first response and missed follow-up on a flood of leads — for heads of IS / SDR, Meeton ai hands instant response, auto-assignment, and behavior-triggered follow-up to AI so you can focus on promising accounts.",
    },
  },
  ceo: {
    slug: "ceo", kind: "role", badge: "経営者 向け",
    problemLine: "営業を増やさずに、商談を増やしたい。",
    h1: "人を増やさず、商談機会を増やす。",
    sub: "CAC・NRR・営業人件費。Meeton ai は、無料起点のPLGで獲得量を生み、一気通貫の商談化で効率を上げ、単体からプラットフォームへの拡張で収益を伸ばす土台になります。",
    pains: [
      { title: "CACが上がり採算が圧迫", desc: "獲得コストの上昇に、商談化の効率が追いつかない。" },
      { title: "営業人件費に依存した成長", desc: "商談を増やすたびに人を増やす構造から抜け出せない。" },
      { title: "拡張（NRR）が描けない", desc: "単発導入で終わり、アカウント内の拡張が起きない。" },
    ],
    plays: [
      { title: "無料起点で獲得量を生む", desc: "クレカ不要の無料ティアが量とシグナルのエンジンに。", product: "chat" },
      { title: "一気通貫で商談化効率を上げる", desc: "会話・資料・予約・追客を1つのAI SDRで完結。", product: "calendar" },
      { title: "単体→バンドルで拡張", desc: "価値が出た瞬間に隣接製品へ、NRRを伸ばす。", product: "email" },
    ],
    proofRef: "univis",
    faq: [
      { q: "投資対効果はどう考えればいいですか？", a: "無料起点で獲得量を増やし、商談化効率と拡張（単体→バンドル）で回収する設計です。/tools/roi で商談化の余地を試算できます。" },
      { q: "セキュリティ・コンプラ要件は？", a: "SSO・権限/監査ログ・CRMへの会話ログ自動登録に対応します。詳細は /security・/enterprise をご覧ください。" },
    ],
    metaTitle: "経営者向け｜人を増やさず商談を増やす AI SDR｜Meeton ai",
    metaDescription: "CAC・NRR・営業人件費——経営者向けに、無料起点のPLGと一気通貫の商談化、単体→バンドル拡張で効率的に成長する Meeton ai のソリューション。",
    en: {
      badge: "For Founders & CEOs",
      problemLine: "Grow meetings without growing the sales team.",
      h1: "More meeting opportunities, without more headcount.",
      sub: "CAC, NRR, sales payroll. Meeton ai is the foundation that generates volume with free-led PLG, raises efficiency with end-to-end meeting conversion, and grows revenue by expanding from a single product into a platform.",
      pains: [
        { title: "Rising CAC squeezes the economics", desc: "Meeting-conversion efficiency can't keep up with the rising cost of acquisition." },
        { title: "Growth dependent on sales payroll", desc: "You can't escape a structure where every added meeting means added headcount." },
        { title: "No path to expansion (NRR)", desc: "Deployments end as one-offs, and expansion within accounts never happens." },
      ],
      plays: [
        { title: "Generate volume from a free starting point", desc: "A no-credit-card free tier becomes the engine for volume and signal." },
        { title: "Lift conversion efficiency end-to-end", desc: "Conversation, content, booking, and follow-up complete in one AI SDR." },
        { title: "Expand from single product to bundle", desc: "The moment value lands, move to adjacent products and grow NRR." },
      ],
      faq: [
        { q: "How should I think about ROI?", a: "The design grows volume from a free starting point and recovers it through conversion efficiency and expansion (single → bundle). You can estimate your meeting-conversion upside at /tools/roi." },
        { q: "What about security and compliance requirements?", a: "We support SSO, permission / audit logs, and auto-logging of conversation history to your CRM. See /security and /enterprise for details." },
      ],
      metaTitle: "For Founders & CEOs｜An AI SDR that grows meetings without growing headcount｜Meeton ai",
      metaDescription: "CAC, NRR, sales payroll — for founders / CEOs, Meeton ai grows efficiently with free-led PLG, end-to-end meeting conversion, and single → bundle expansion.",
    },
  },
};

export const MOMENTS: Record<string, PlaybookEntry> = {
  "pre-inquiry": {
    slug: "pre-inquiry", kind: "moment", badge: "瞬間 — 問い合わせ前",
    problemLine: "訪問者の99%は、問い合わせる前に去っている。",
    h1: "問い合わせ前の検討を、商談に変える。",
    sub: "B2Bの買い手は購買の約70%を接触前に独力で進めます（Gartner/6sense）。その時間に会話で踏み込み、Webでは出せない答えを渡して、問い合わせ確率そのものを上げます。",
    pains: [
      { title: "大半が匿名で離脱する", desc: "フォーム到達は1%未満。検討中の潜在層を取り切れない。" },
      { title: "Webだけでは答えきれない", desc: "知りたいことが分からず、比較の土俵にすら乗れない。" },
    ],
    plays: [
      { title: "会話で検討の土台に立つ", desc: "訪問者と対話し疑問を解消、リード化する。", product: "chat" },
      { title: "資料で理解を進める", desc: "関連資料を渡しAIが解説、開封を可視化。", product: "library" },
    ],
    proofRef: "biztex",
    faq: [{ q: "匿名の訪問者にどう効きますか？", a: "AIチャットが匿名訪問者に話しかけ、会話の中で疑問を解消しながらリード化します。問い合わせを待たず、接触前の検討段階に踏み込みます。" }],
    metaTitle: "問い合わせ前の商談化｜検討段階の潜在層を掴む｜Meeton ai",
    metaDescription: "訪問者の99%は問い合わせ前に去る。購買の約70%が接触前に進む今、会話と資料で検討の土台に立ち、潜在層を商談に変える Meeton ai の活用。",
    en: {
      badge: "Moment — before the inquiry",
      problemLine: "99% of visitors leave before they ever inquire.",
      h1: "Turn pre-inquiry consideration into meetings.",
      sub: "B2B buyers complete about 70% of the purchase on their own before any contact (Gartner / 6sense). Step into that time with conversation, hand over answers the web can't, and raise the inquiry probability itself.",
      pains: [
        { title: "Most leave anonymous", desc: "Under 1% reach a form. You can't capture the prospects who are still considering." },
        { title: "The web alone can't answer them", desc: "They can't find what they need to know, and never make it onto the shortlist." },
      ],
      plays: [
        { title: "Get on the consideration footing in conversation", desc: "Talk with visitors, resolve their questions, and turn them into leads." },
        { title: "Advance understanding with content", desc: "Hand over relevant materials, let the AI explain, and make opens visible." },
      ],
      faq: [{ q: "How does it work for anonymous visitors?", a: "The AI chat speaks to anonymous visitors and turns them into leads while resolving their questions in conversation. It doesn't wait for an inquiry — it steps into the pre-contact consideration stage." }],
      metaTitle: "Meeting conversion before the inquiry｜Capture prospects in consideration｜Meeton ai",
      metaDescription: "99% of visitors leave before they inquire. With ~70% of the purchase happening before contact, Meeton ai gets on the consideration footing with conversation and content and turns prospects into meetings.",
    },
  },
  "post-download": {
    slug: "post-download", kind: "moment", badge: "瞬間 — 資料DL後",
    problemLine: "資料をダウンロードしたリードを、放置している。",
    h1: "資料DL直後の熱量を、商談に変える。",
    sub: "資料DLは関心が最高潮の瞬間。即予約導線・開封トラッキング・AI追客で、DL後の取りこぼしをなくします。",
    pains: [
      { title: "DL後の初動が遅い", desc: "人が対応する頃には温度が下がっている。" },
      { title: "誰がどこまで読んだか分からない", desc: "追うべき相手とタイミングが見えない。" },
    ],
    plays: [
      { title: "DL直後に即予約", desc: "最も熱い瞬間に商談予約を提示。", product: "calendar" },
      { title: "開封を可視化", desc: "誰がどこまで見たかを把握して追客。", product: "library" },
      { title: "未予約はAIが追客", desc: "予約しなかった相手を行動起点で1:1フォロー。", product: "email" },
    ],
    proofRef: "univis",
    faq: [{ q: "ホワイトペーパー施策と相性は？", a: "好相性です。DL（資料請求）直後に予約導線を出し、開封を追跡し、未予約者をAIが追客するため、コンテンツ施策の商談化率を底上げします。" }],
    metaTitle: "資料DL後の商談化｜ダウンロード直後を逃さない｜Meeton ai",
    metaDescription: "資料DLは関心が最高潮の瞬間。即予約・開封トラッキング・AI追客で、ダウンロード後の取りこぼしをなくす Meeton ai の活用シーン。",
    en: {
      badge: "Moment — after a download",
      problemLine: "Leads who downloaded a resource are left untouched.",
      h1: "Turn the heat right after a download into a meeting.",
      sub: "A download is the moment interest peaks. With an instant booking path, open tracking, and AI follow-up, eliminate the leaks after a download.",
      pains: [
        { title: "First response after a download is slow", desc: "By the time a person responds, the interest has cooled." },
        { title: "You can't see who read how far", desc: "Who to pursue and when is invisible." },
      ],
      plays: [
        { title: "Offer a booking right after the download", desc: "Present a meeting booking at the hottest moment." },
        { title: "Make opens visible", desc: "Grasp who read how far and follow up." },
        { title: "AI follows up the unbooked", desc: "Pursue those who didn't book, 1:1, triggered by behavior." },
      ],
      faq: [{ q: "How does it fit a whitepaper program?", a: "Very well. It offers a booking path right after a download (resource request), tracks opens, and has the AI follow up non-bookers — lifting the meeting-conversion rate of your content program." }],
      metaTitle: "Meeting conversion after a download｜Don't miss the moment after the download｜Meeton ai",
      metaDescription: "A download is the moment interest peaks. With instant booking, open tracking, and AI follow-up, Meeton ai eliminates the leaks after a download.",
    },
  },
  revisit: {
    slug: "revisit", kind: "moment", badge: "瞬間 — 再訪問",
    problemLine: "戻ってきた見込み客に、気づけていない。",
    h1: "再訪問は、検討再開のサイン。",
    sub: "再訪問は購買検討が動いた合図。識別済みリードの再訪をきっかけに、文脈を引き継いだ会話と追客で商談に繋げます。",
    pains: [
      { title: "再訪に気づかず逃す", desc: "せっかく戻ってきた相手に何もできていない。" },
      { title: "毎回ゼロから対応", desc: "過去の文脈を引き継げず、的を外す。" },
    ],
    plays: [
      { title: "文脈を引き継いで対話", desc: "過去の閲覧・会話を踏まえてAIが再対応。", product: "chat" },
      { title: "再訪起点で追客", desc: "再訪シグナルをトリガーにAIが1:1フォロー。", product: "email" },
    ],
    proofRef: "biztex",
    faq: [{ q: "誰が再訪したか分かりますか？", a: "識別済みリードの再訪を検知し、過去の文脈を引き継いだ会話・追客のトリガーにできます。検討再開の瞬間を逃しません。" }],
    metaTitle: "再訪問からの商談化｜検討再開の瞬間を掴む｜Meeton ai",
    metaDescription: "再訪問は検討再開のサイン。文脈を引き継いだ会話と再訪起点の追客で、戻ってきた見込み客を商談に繋げる Meeton ai の活用シーン。",
    en: {
      badge: "Moment — return visit",
      problemLine: "You don't notice the prospects who came back.",
      h1: "A return visit is a sign that consideration has restarted.",
      sub: "A return visit signals that the purchase decision has moved. Triggered by an identified lead's revisit, connect to a meeting with context-carrying conversation and follow-up.",
      pains: [
        { title: "You miss the revisit", desc: "You do nothing for someone who took the trouble to come back." },
        { title: "You start from zero every time", desc: "You can't carry over past context, so you miss the mark." },
      ],
      plays: [
        { title: "Converse with context carried over", desc: "The AI responds again based on past views and conversations." },
        { title: "Follow up triggered by the revisit", desc: "The AI follows up 1:1, triggered by the revisit signal." },
      ],
      faq: [{ q: "Can I tell who revisited?", a: "We detect the revisit of an identified lead and can use it as a trigger for conversation and follow-up that carry over past context. You won't miss the moment consideration restarts." }],
      metaTitle: "Meeting conversion from a return visit｜Catch the moment consideration restarts｜Meeton ai",
      metaDescription: "A return visit is a sign consideration has restarted. With context-carrying conversation and revisit-triggered follow-up, Meeton ai connects returning prospects to meetings.",
    },
  },
  nurture: {
    slug: "nurture", kind: "moment", badge: "瞬間 — 追客",
    problemLine: "予約しなかったリードを、そのまま冷ましている。",
    h1: "未予約・休眠リードを、商談に戻す。",
    sub: "すぐ予約しなかったリードこそ伸びしろ。行動シグナルを見て、AIが1通ずつ生成する1:1フォローで、諦めずに商談へ戻します。",
    pains: [
      { title: "一度きりで諦めている", desc: "追う粘りがなく、休眠リードが積み上がる。" },
      { title: "テンプレ一斉送信で響かない", desc: "文脈を無視した配信は開かれない。" },
    ],
    plays: [
      { title: "行動シグナルで追客", desc: "再訪・開封を検知し最適な瞬間に追う。", product: "email" },
      { title: "AIが1:1で文面生成", desc: "相手の文脈に合わせ1通ずつ生成、返信・予約まで自律。", product: "email" },
    ],
    proofRef: "univis",
    faq: [{ q: "送りすぎになりませんか？", a: "スケジュール一斉送信ではなく、行動シグナルに基づいて追うべき相手とタイミングをAIが判断します。目的（返信・予約）に達したら止まります。" }],
    metaTitle: "追客・ナーチャリングの自動化｜未予約リードを商談に｜Meeton ai",
    metaDescription: "予約しなかったリードこそ伸びしろ。行動シグナル起点でAIが1:1フォローし、休眠リードを諦めず商談に戻す Meeton ai の活用シーン。",
    en: {
      badge: "Moment — follow-up",
      problemLine: "Leads who didn't book are left to cool off.",
      h1: "Bring unbooked and dormant leads back to a meeting.",
      sub: "Leads who didn't book right away are where the upside is. Watching behavioral signals, the AI brings them back to a meeting with 1:1 follow-up generated one message at a time — without giving up.",
      pains: [
        { title: "You give up after one try", desc: "Without the persistence to pursue, dormant leads pile up." },
        { title: "Template blasts don't land", desc: "Sends that ignore context don't get opened." },
      ],
      plays: [
        { title: "Follow up on behavioral signals", desc: "Detect revisits and opens and pursue at the optimal moment." },
        { title: "AI generates 1:1 messages", desc: "Generated one at a time to fit the recipient's context, autonomous through reply and booking." },
      ],
      faq: [{ q: "Won't it over-send?", a: "Rather than scheduled blasts, the AI decides who to pursue and when based on behavioral signals. It stops once the goal (a reply or a booking) is reached." }],
      metaTitle: "Automating follow-up and nurturing｜Turn unbooked leads into meetings｜Meeton ai",
      metaDescription: "Leads who didn't book are where the upside is. Triggered by behavioral signals, the AI follows up 1:1 and brings dormant leads back to meetings without giving up — a Meeton ai use case.",
    },
  },
};

export function getSolution(slug: string) { return SOLUTIONS[slug]; }
export function getMoment(slug: string) { return MOMENTS[slug]; }
export const SOLUTION_SLUGS = Object.keys(SOLUTIONS);
export const MOMENT_SLUGS = Object.keys(MOMENTS);
