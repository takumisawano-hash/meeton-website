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
  // expansion teaser cross-sell line
  crossSell: string;
  faq: FAQ[];
};

export const PRODUCTS: Record<ProductLPData["slug"], ProductLPData> = {
  calendar: {
    slug: "calendar",
    productName: "Meeton Calendar",
    icon: "calendar",
    metaTitle: "日程調整ツール（商談化特化）｜Calendly代替のAI即予約｜Meeton Calendar",
    metaDescription:
      "リードが発生した瞬間に商談予約まで運ぶ AI 日程調整。フォーム送信・資料DLの直後に AI が予約を提示し、自動アサイン・CRM登録まで自律化。immedio / TimeRex / Calendly との違いも解説。30分のデモで体験。",
    keyword: "日程調整 自動化 / 商談予約 / インバウンド 商談化",
    eyebrow: "AI 商談予約 / 日程調整",
    problemLine: "リードが動いた“その瞬間”を、待たせている。",
    h1: "リードが動いた瞬間に、商談を予約する。",
    heroSub:
      "初動レスポンス（Speed to Lead）の業界標準は数時間〜数日。Meeton Calendar は、フォーム送信・資料DLの直後にAIが商談予約を提示し、自動アサイン・CRM登録まで一気に走らせます。最も関心が高い瞬間を、商談に変える。",
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
      metric: "60%以上",
      label: "Meeton ai 経由の商談化率（業界平均20%の約3倍／人材・研修）",
      quote: "Meeton ai を経由したお客様は、明らかにナーチャリングされた状態で問い合わせてくださる。商談化の部分で非常に有効だと感じています。",
      source: "研修業界リーダー（人材, Meeton ai 導入）",
    },
    integrations: ["Salesforce", "HubSpot", "Google Calendar", "Outlook", "Zoom", "Slack", "Microsoft Teams"],
    crossSell: "予約の前にチャットで温度を上げ、予約しなかった人はメールで追う——4つの仕事がつながると一気通貫のAI SDRに。",
    faq: [
      { q: "Calendly や TimeRex と何が違いますか？", a: "予約URLを渡すだけのツールと異なり、Meeton Calendar はコンバート直後にAIが会話で疑問を解消し、温度を上げてから予約枠へ誘導します。さらに担当者の自動アサイン・CRM登録・通知まで自律化するため、初動の速さと取りこぼし防止の両方を同時に解決します。" },
      { q: "料金はいくらですか？", a: "Meeton ai は月額12万円〜の3プラン（リード獲得 / 商談獲得 / オールインワン）で、月間トラフィックと利用機能で変動します。詳細は料金ページをご覧ください。まず30分のデモで自社への効き方を確認できます。" },
      { q: "導入にどれくらいかかりますか？", a: "ノーコードです。カレンダーをOAuth接続し、予約URLを発行すれば数分で稼働します。設定はすべてアプリ内でユーザー自身が完結でき、開発は不要です。" },
    ],
  },

  chat: {
    slug: "chat",
    productName: "Meeton Chat",
    icon: "chat",
    metaTitle: "Web接客×AIチャットボット｜BtoB訪問者を商談化｜Meeton Chat",
    metaDescription:
      "買い手は購買の約70%を営業接触前に独力で進める。Meeton Chat は、その“接触前の検討”の土台に立ち、Webでは出せない答えをその場で渡して商談化する Web接客 AIチャット（チャットボット）。Intercom / シナリオ型チャットボットとの違いも解説。30分のデモで体験。",
    keyword: "Web接客 ツール / チャットボット 商談化 / サイト離脱 防止",
    eyebrow: "Web接客 AIチャット",
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
      metric: "20倍以上",
      label: "チャット経由のリード獲得数（対 従来のシナリオ型チャット）",
      quote: "従来のチャットは月1〜2件あればいい方だった。Meeton ai にしてからは月20件以上——20倍以上のリードがチャットから生まれている。",
      source: "BizteX 株式会社（SaaS, Meeton ai 導入）",
    },
    integrations: ["Salesforce", "HubSpot", "Slack", "Microsoft Teams", "Google Chat", "Webhook"],
    crossSell: "盛り上がった会話はCalendarで予約に、資料が欲しい人にはLibraryを——つなぐと一気通貫のAI SDRに。",
    faq: [
      { q: "普通のチャットボットと何が違いますか？", a: "シナリオ型チャットボットは想定問答に沿った応答しかできず、商談化は人頼みでした。Meeton Chat は生成AIが文脈を理解し、過去の閲覧・DL・会話履歴を引き継いで自律的に対話し、温度が上がった瞬間に商談予約まで会話内で完結します。" },
      { q: "なぜ「接触前」が重要なのですか？", a: "B2Bの買い手は購買プロセスの約70%を営業に接触する前に独力で進めるとされています（Gartner/6sense）。この時間にWebでは出せない答えを渡せるかどうかが、問い合わせ確率と最終的な商談化率を左右します。Meeton Chat はこの“接触前の検討”に効くよう設計されています。" },
      { q: "設置は難しいですか？", a: "1行のスニペットを貼るだけで、シナリオ設計は不要です。設置後すぐにAIが訪問者に話しかけ始めます。設定はノーコードで完結します。" },
    ],
  },

  library: {
    slug: "library",
    productName: "Meeton Library",
    icon: "library",
    metaTitle: "営業資料の共有・育成ツール｜DocSend代替のAIナーチャリング｜Meeton Library",
    metaDescription:
      "まだ商談に早い見込み客を、資料で自動ナーチャリング。関心に合った資料を届け、AIが内容を解説し、反応を見て検討を育てる。開封・行動も可視化。資料を使ったリード育成を自動化。DocSend 代替。",
    keyword: "リード ナーチャリング 資料 / 資料 自動育成 / 営業資料 共有 ツール / DocSend 代替",
    eyebrow: "資料で、自動ナーチャリング",
    problemLine: "まだ早い見込み客を、放置して冷ましている。",
    h1: "資料で、見込み客を育てる。",
    heroSub:
      "まだ商談には早い見込み客を、資料で自動ナーチャリング。関心に合わせた資料を届け、AIが中身を解説し、反応を見て次の一手を出す。検討が温まるまで放置せず育て続け、商談につながるリードにします。",
    steps: [
      { title: "資料を用意して渡す", desc: "PDF/スライドをアップし、共有URLで届ける。CRMの設定は不要です。" },
      { title: "AIが解説して育てる", desc: "受け手の質問に資料の文脈でAIが回答し、理解と検討を前に進める。" },
      { title: "反応を見て次の一手", desc: "誰が何をどこまで見たかを可視化。温まった見込み客を商談化・追客へ繋ぐ。" },
    ],
    competitorsLabel: "vs DocSend",
    diffTitle: "“送って終わり”を、“育てる”に変える。",
    diffPoints: [
      { title: "資料が、育てる", desc: "配布・追跡だけでなく、AIが内容を解説し、まだ早い見込み客の検討を能動的に前へ進める。" },
      { title: "反応で次を打つ", desc: "開封・閲覧の行動シグナルを捉え、温まった相手を逃さず商談化・追客へ繋ぐ。" },
      { title: "CRM不要で始められる", desc: "重い初期設定なしで、資料を使ったリード育成をすぐ開始できる。" },
    ],
    proof: {
      metric: "受注2件",
      label: "3ヶ月で受注（Univis Group）。誰が見ているかが分かり提案の質も向上",
      quote: "アポにならなくても『どの企業が自社のコンテンツを見ているか』が瞬時にわかる。提案件数も増え、市場・競合分析の質まで上がった。",
      source: "Univis Group（コンサルティング／上田 翔太 氏）",
    },
    integrations: ["Salesforce", "HubSpot", "Slack", "Microsoft Teams", "Webhook"],
    crossSell: "資料で育てて温まった見込み客は、Calendarで予約に、まだの人はEmailで追客——つなぐと一気通貫のAI SDRに。",
    faq: [
      { q: "DocSend と何が違いますか？", a: "DocSend が資料の配布・開封トラッキングに特化するのに対し、Meeton Library はそこにAIチャットによる資料解説を加え、受け手の質問にその場で答えます。さらにCRM不要で始められ、開封シグナルをEmail/Calendarへ橋渡しして追客まで繋げられます。" },
      { q: "開封トラッキングではどこまで分かりますか？", a: "誰がいつ、どの資料をどこまで見たかを可視化できます。開封・閲覧の行動シグナルを捉え、温まった見込み客を逃さず商談化・追客へ繋げます。" },
      { q: "受け手に専用アプリは必要ですか？", a: "不要です。共有URLを開くだけで閲覧でき、AIチャットで質問できます。送り手はアップロードしてURLを発行するだけ、すべてノーコードで完結します。" },
    ],
  },

  email: {
    slug: "email",
    productName: "Meeton Email",
    icon: "email",
    metaTitle: "追客自動化・ナーチャリングメール｜AI 1:1フォロー｜Meeton Email",
    metaDescription:
      "即予約しなかったリードを、AIが行動シグナルを見て1:1で自律フォロー。テンプレ置換ではなくAI生成、チャット連携、目的達成まで自律。Lemlist / Smartlead / セールスエンゲージメント系との違いも解説。CRM連携前提。",
    keyword: "リードナーチャリング メール / 追客 自動化 / セールスエンゲージメント",
    eyebrow: "追客自動化・AI 1:1フォロー",
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
      metric: "再商談化",
      label: "休眠・未予約リードから商談機会を継続創出（利用企業の追客運用）",
      quote: "取りこぼしていた既存リードから、毎月安定して商談機会が生まれるようになった。",
      source: "Meeton ai 利用企業（追客運用）",
    },
    integrations: ["Salesforce", "HubSpot", "Gmail", "Outlook", "Slack", "Webhook"],
    crossSell: "チャットや資料で温まった人をEmailが追い、返信したらCalendarで予約——つなぐと一気通貫のAI SDRに。",
    faq: [
      { q: "Lemlist や Smartlead と何が違いますか？", a: "これらのツールがテンプレートの変数差し替えによる一斉送信を主とするのに対し、Meeton Email は相手の行動文脈に合わせてAIが1通ずつ文面を生成します。送信スケジュールではなく再訪・開封などの行動シグナルを起点に動き、返信・商談予約というゴールまで自律的に追い続けます。" },
      { q: "CRM がなくても使えますか？", a: "Meeton Email はCRM連携を前提に行動シグナルを検知して動くため、Salesforce / HubSpot などのCRM接続が必要です。既存リードと行動データを取り込み、追うべき相手とタイミングをAIが判断します。" },
      { q: "送りすぎてしまう心配はありませんか？", a: "Meeton Email はスケジュール一斉送信ではなく、行動シグナルに基づいて“追うべき相手・タイミング”をAIが判断します。目的（返信・予約）に達したら止まるため、無関係な大量送信になりません。" },
    ],
  },
};

export const PRODUCT_ORDER: ProductLPData["slug"][] = ["calendar", "chat", "library", "email"];
