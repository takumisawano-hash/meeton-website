// Single source of truth for the 4 product LPs (/calendar /chat /library
// /email). Copy follows spec §2.2 (8-section template) and §2.0 (hero fuses
// the "why" = problem truth with the "what" = the product's job).
// Proof figures use the Takumi-approved proof-bar numbers and named cases.

export type Step = { title: string; desc: string };
export type Diff = { title: string; desc: string };
export type FAQ = { q: string; a: string };

export type ProductLPData = {
  slug: "calendar" | "chat" | "library" | "email";
  productName: string;
  icon: "calendar" | "chat" | "library" | "email";
  metaTitle: string;
  metaDescription: string;
  keyword: string;
  // hero
  eyebrow: string;
  problemLine: string;
  h1: string;
  heroSub: string;
  // how it works
  steps: Step[];
  // differentiation
  competitorsLabel: string;
  diffTitle: string;
  diffPoints: Diff[];
  // proof
  proof: { metric: string; label: string; quote: string; source: string };
  // integrations
  integrations: string[];
  // pricing (this product only)
  freeTier: string;
  proPrice: string;
  proIncludes: string[];
  // expansion teaser cross-sell line
  crossSell: string;
  faq: FAQ[];
};

export const PRODUCTS: Record<ProductLPData["slug"], ProductLPData> = {
  calendar: {
    slug: "calendar",
    productName: "Meeton Calendar",
    icon: "calendar",
    metaTitle: "Meeton Calendar｜即フォローで商談化する日程調整・商談予約",
    metaDescription:
      "リードが発生した瞬間に商談予約まで運ぶ AI 日程調整。フォーム送信・資料DLの直後に AI が予約を提示し、自動アサイン・CRM登録まで自律化。immedio / TimeRex / Calendly との違いも解説。無料で開始（クレカ不要）。",
    keyword: "日程調整 自動化 / 商談予約 / インバウンド 商談化",
    eyebrow: "AI 商談予約 / 日程調整",
    problemLine: "リードが動いた“その瞬間”を、待たせている。",
    h1: "リードが動いた瞬間に、商談を予約する。",
    heroSub:
      "Speed to Lead の業界標準は数時間〜数日。Meeton Calendar は、フォーム送信・資料DLの直後にAIが商談予約を提示し、自動アサイン・CRM登録まで一気に走らせます。最も関心が高い瞬間を、商談に変える。",
    steps: [
      { title: "コンバートを検知", desc: "フォーム送信・資料DL・チャット完了など、関心が最高潮の瞬間をトリガーに。" },
      { title: "その場で予約を提示", desc: "AIコンシェルジュが空き枠を提示。担当者を自動アサインし、最短の枠へ誘導。" },
      { title: "CRM・通知に着弾", desc: "予約はSalesforce/HubSpotに自動登録、Slack/Teamsへ即通知。取りこぼしゼロ。" },
    ],
    competitorsLabel: "vs immedio / TimeRex / Spir / Calendly",
    diffTitle: "ただの日程調整ツールではない。",
    diffPoints: [
      { title: "予約の前に“会話”がある", desc: "URLを渡すだけの予約ツールと違い、予約前にAIが疑問を解消し温度を上げてから枠へ運ぶ。" },
      { title: "コンバート直後に自動起動", desc: "人がメールを書くより速く、関心が最高潮の数秒で予約導線を出す。初動が商談化率を決める。" },
      { title: "アサインとCRM登録まで自律", desc: "ラウンドロビン/条件アサイン・CRM登録・通知を自動化。営業は商談だけに集中できる。" },
    ],
    proof: {
      metric: "60%+",
      label: "即予約フロー経由の商談化率",
      quote: "コンバート直後に予約導線を出すだけで、商談化率が大きく変わった。",
      source: "Meeton ai 利用企業（即予約フロー導入後）",
    },
    integrations: ["Salesforce", "HubSpot", "Google Calendar", "Outlook", "Zoom", "Slack", "Microsoft Teams"],
    freeTier: "1名・基本予約（AIコンシェルジュは制限）。クレカ不要で今すぐ。",
    proPrice: "¥4万",
    proIncludes: ["AIコンシェルジュ", "自動アサイン/ルーティング", "CRM自動登録", "3名まで"],
    crossSell: "予約の前にチャットで温度を上げ、予約しなかった人はメールで追う——4つの仕事がつながると一気通貫のAI SDRに。",
    faq: [
      { q: "Calendly や TimeRex と何が違いますか？", a: "予約URLを渡すだけのツールと異なり、Meeton Calendar はコンバート直後にAIが会話で疑問を解消し、温度を上げてから予約枠へ誘導します。さらに担当者の自動アサイン・CRM登録・通知まで自律化するため、初動の速さと取りこぼし防止の両方を同時に解決します。" },
      { q: "無料でどこまで使えますか？", a: "無料ティアで1名・基本予約が使え、クレジットカード不要で登録できます。AIコンシェルジュや自動アサイン・CRM登録などは単体Pro（¥4万/月）で開放されます。" },
      { q: "導入にどれくらいかかりますか？", a: "ノーコードです。カレンダーをOAuth接続し、予約URLを発行すれば数分で稼働します。設定はすべてアプリ内でユーザー自身が完結でき、開発は不要です。" },
    ],
  },

  chat: {
    slug: "chat",
    productName: "Meeton Chat",
    icon: "chat",
    metaTitle: "Meeton Chat（Live）｜接触前の検討に効く商談化AIチャット",
    metaDescription:
      "買い手は購買の約70%を営業接触前に独力で進める。Meeton Chat は、その“接触前の検討”の土台に立ち、Webでは出せない答えをその場で渡して商談化する AI チャット。Intercom / シナリオ型チャットボットとの違いも解説。無料で開始。",
    keyword: "Web接客 ツール / チャットボット 商談化 / サイト離脱 防止",
    eyebrow: "AI チャット（Live）",
    problemLine: "買い手は、問い合わせる前にもう決めはじめている。",
    h1: "接触前の検討の“土台”に立つ、商談化AIチャット。",
    heroSub:
      "買い手は購買プロセスの約70%を営業に接触する前に独力で進めます（Gartner/6sense）。Meeton Chat は、その時間に訪問者と対話し、Webサイトでは得られない答えをその場で渡して、問い合わせ確率そのものを引き上げます。",
    steps: [
      { title: "スニペットを設置", desc: "1行のタグを貼るだけ。シナリオ設計は不要、設置後すぐにAIが訪問者に話しかけます。" },
      { title: "文脈を理解して対話", desc: "過去の閲覧・DL・会話履歴を引き継ぎ、生成AIが疑問に的確に回答。商談化に最適化。" },
      { title: "その場で予約へ", desc: "温度が上がった瞬間にCalendarへ繋ぎ、会話の中で商談予約まで完結させます。" },
    ],
    competitorsLabel: "vs Intercom / シナリオ型チャットボット",
    diffTitle: "“会話できる”だけでは、商談は増えない。",
    diffPoints: [
      { title: "接触前の検討を動かす", desc: "問い合わせを待つのではなく、検討の70%が進む接触前の時間に、答えを渡して前進させる。" },
      { title: "商談化に最適化", desc: "FAQ応答ボットでなく、温度を上げて予約へ運ぶことを目的に設計。過去文脈を引き継ぐ。" },
      { title: "シナリオ設計不要", desc: "想定問答を組まなくても生成AIが文脈で回答。設置5分、メンテも最小。" },
    ],
    proof: {
      metric: "20x",
      label: "チャット経由の商談機会（導入前比）",
      quote: "“接客できる”だけのボットから、商談を生むチャットに変わった。",
      source: "Meeton ai 利用企業（AIチャット導入後）",
    },
    integrations: ["Salesforce", "HubSpot", "Slack", "Microsoft Teams", "Google Chat", "Webhook"],
    freeTier: "200会話/月・1サイト・Meetonブランド表示。クレカ不要で今すぐ。",
    proPrice: "¥3万",
    proIncludes: ["会話上限を大幅増（実質無制限）", "過去文脈の引き継ぎ", "1サイト", "詳細な会話ログ"],
    crossSell: "盛り上がった会話はCalendarで予約に、資料が欲しい人にはLibraryを——つなぐと一気通貫のAI SDRに。",
    faq: [
      { q: "普通のチャットボットと何が違いますか？", a: "シナリオ型チャットボットは想定問答に沿った応答しかできず、商談化は人頼みでした。Meeton Chat は生成AIが文脈を理解し、過去の閲覧・DL・会話履歴を引き継いで自律的に対話し、温度が上がった瞬間に商談予約まで会話内で完結します。" },
      { q: "なぜ「接触前」が重要なのですか？", a: "B2Bの買い手は購買プロセスの約70%を営業に接触する前に独力で進めるとされています（Gartner/6sense）。この時間にWebでは出せない答えを渡せるかどうかが、問い合わせ確率と最終的な商談化率を左右します。Meeton Chat はこの“接触前の検討”に効くよう設計されています。" },
      { q: "設置は難しいですか？", a: "1行のスニペットを貼るだけで、シナリオ設計は不要です。設置後すぐにAIが訪問者に話しかけ始めます。無料ティア（200会話/月・1サイト）はクレジットカード不要で開始できます。" },
    ],
  },

  library: {
    slug: "library",
    productName: "Meeton Library",
    icon: "library",
    metaTitle: "Meeton Library｜資料を渡し、AIが解説し、誰が見たかわかる",
    metaDescription:
      "営業資料を共有URLで渡し、AIチャットが中身を解説、誰がいつどこまで開いたかを開封トラッキング。CRM不要のDocSend型 + AI。提案資料の開封率・商談化を可視化。DocSend 代替。無料で開始（クレカ不要）。",
    keyword: "営業資料 共有 ツール / 資料 トラッキング / DocSend 代替",
    eyebrow: "資料共有 + 開封トラッキング + AI解説",
    problemLine: "送った資料が、読まれたかどうかも分からない。",
    h1: "資料を渡し、AIが解説し、誰が見たかわかる。",
    heroSub:
      "共有URLを発行して資料を渡すと、AIチャットが中身を解説し、誰がいつどこまで開いたかをリアルタイムで可視化。読まれた瞬間に追えるから、提案資料が“送って終わり”でなくなります。CRM不要で始められるDocSend型 + AI。",
    steps: [
      { title: "資料をアップロード", desc: "PDF/スライドをアップし、共有URLを自動発行。CRMの設定は不要です。" },
      { title: "AIが中身を解説", desc: "受け取った相手の質問に、資料の文脈でAIチャットがその場で回答。理解を深める。" },
      { title: "開封を可視化して追客", desc: "誰がいつどこまで見たかを通知。よく見られた瞬間にEmail/Calendarへ繋いで追客。" },
    ],
    competitorsLabel: "vs DocSend",
    diffTitle: "“開封がわかる”の、その先まで。",
    diffPoints: [
      { title: "AIが資料を解説する", desc: "ただ配布・追跡するだけでなく、AIチャットが中身を説明。受け手の理解と前進を助ける。" },
      { title: "CRM不要で始められる", desc: "重い初期設定なしで開封トラッキングを開始。無料ユーザーでもコア計測は絞らない。" },
      { title: "追客に直結", desc: "開封シグナルをEmail/Calendarへ橋渡し。見られた瞬間を商談に変える。" },
    ],
    proof: {
      metric: "約2倍",
      label: "提案・資料提示の件数（運用効率化後）",
      quote: "誰がどの資料を見たかが分かるだけで、追客の精度と量が一段上がった。",
      source: "Meeton ai 利用企業（資料共有トラッキング導入後）",
    },
    integrations: ["Salesforce", "HubSpot", "Slack", "Microsoft Teams", "Webhook"],
    freeTier: "資料3点・基本開封トラッキング・AIチャット制限。クレカ不要で今すぐ。",
    proPrice: "¥3万",
    proIncludes: ["資料無制限", "AI解説（フル）", "リアルタイム通知", "詳細トラッキング"],
    crossSell: "よく見られた資料の開封者はEmailで追い、関心が高い人はCalendarで予約——つなぐと一気通貫のAI SDRに。",
    faq: [
      { q: "DocSend と何が違いますか？", a: "DocSend が資料の配布・開封トラッキングに特化するのに対し、Meeton Library はそこにAIチャットによる資料解説を加え、受け手の質問にその場で答えます。さらにCRM不要で始められ、開封シグナルをEmail/Calendarへ橋渡しして追客まで繋げられます。" },
      { q: "無料でも開封トラッキングは使えますか？", a: "はい。無料ティアでも資料3点まで基本の開封トラッキングが使えます。コア計測機能（誰がいつ見たか）は無料でも絞りません——それが追客とアップセル判定の燃料だからです。資料無制限やAIフル解説は単体Pro（¥3万/月）で開放されます。" },
      { q: "受け手に専用アプリは必要ですか？", a: "不要です。共有URLを開くだけで閲覧でき、AIチャットで質問できます。送り手はアップロードしてURLを発行するだけ、すべてノーコードで完結します。" },
    ],
  },

  email: {
    slug: "email",
    productName: "Meeton Email",
    icon: "email",
    metaTitle: "Meeton Email｜予約しなかったリードを諦めず追うAI 1:1フォロー",
    metaDescription:
      "即予約しなかったリードを、AIが行動シグナルを見て1:1で自律フォロー。テンプレ置換ではなくAI生成、チャット連携、目的達成まで自律。Lemlist / Smartlead / セールスエンゲージメント系との違いも解説。CRM連携前提。",
    keyword: "リードナーチャリング メール / 追客 自動化 / セールスエンゲージメント",
    eyebrow: "AI 1:1 自律フォロー",
    problemLine: "予約しなかったリードを、そのまま冷ましている。",
    h1: "予約しなかったリードを、諦めず追う。",
    heroSub:
      "その場で予約しなかったリードこそ、商談の伸びしろ。Meeton Email は、行動シグナル（再訪・開封・資料閲覧）を検知し、AIが1:1の文面を生成して追客します。テンプレの差し替えではなく、目的達成まで自律的に。",
    steps: [
      { title: "CRMを接続", desc: "Salesforce/HubSpotをOAuth接続。既存リードと行動データを取り込みます。" },
      { title: "シグナルを検知", desc: "再訪・開封・資料閲覧などの行動を検知し、追うべきタイミングをAIが判断。" },
      { title: "AIが1:1で追客", desc: "相手の文脈に合わせた文面をAIが生成して送信。返信・予約まで自律的に運びます。" },
    ],
    competitorsLabel: "vs Lemlist / Smartlead / セールスエンゲージメント系",
    diffTitle: "テンプレを流すツールではない。",
    diffPoints: [
      { title: "テンプレ置換でなくAI生成", desc: "変数差し替えの一斉送信でなく、相手の行動文脈に合わせてAIが1通ずつ生成する。" },
      { title: "行動シグナルで動く", desc: "送信スケジュールでなく、再訪・開封などのシグナルを起点に最適な瞬間に追う。" },
      { title: "目的達成まで自律", desc: "返信・商談予約というゴールに向けて、チャットとも連携しながら自律的に追い続ける。" },
    ],
    proof: {
      metric: "20件/月",
      label: "追客から生まれた商談機会（BizteX 様）",
      quote: "取りこぼしていた既存リードから、毎月安定して商談機会が生まれるようになった。",
      source: "BizteX 株式会社（Meeton ai 導入）",
    },
    integrations: ["Salesforce", "HubSpot", "Gmail", "Outlook", "Slack", "Webhook"],
    freeTier: "14日トライアル（CRM連携が前提のため常設無料はなし）。",
    proPrice: "¥5万",
    proIncludes: ["AI生成1:1フォロー", "行動シグナル検知", "チャット連携", "CRM連携"],
    crossSell: "チャットや資料で温まった人をEmailが追い、返信したらCalendarで予約——つなぐと一気通貫のAI SDRに。",
    faq: [
      { q: "Lemlist や Smartlead と何が違いますか？", a: "これらのツールがテンプレートの変数差し替えによる一斉送信を主とするのに対し、Meeton Email は相手の行動文脈に合わせてAIが1通ずつ文面を生成します。送信スケジュールではなく再訪・開封などの行動シグナルを起点に動き、返信・商談予約というゴールまで自律的に追い続けます。" },
      { q: "なぜ常設の無料プランがないのですか？", a: "Meeton Email はCRM連携を前提に行動シグナルを検知して動くため、価値を出すにはCRM接続が必須です。そのため常設無料ではなく14日間のトライアルを用意しています。他の3製品（Chat/Calendar/Library）には無料ティアがあります。" },
      { q: "送りすぎてしまう心配はありませんか？", a: "Meeton Email はスケジュール一斉送信ではなく、行動シグナルに基づいて“追うべき相手・タイミング”をAIが判断します。目的（返信・予約）に達したら止まるため、無関係な大量送信になりません。" },
    ],
  },
};

export const PRODUCT_ORDER: ProductLPData["slug"][] = ["calendar", "chat", "library", "email"];
