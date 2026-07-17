// Single source of truth for the 4 product LPs (/calendar /chat /library
// /email). Copy follows spec §2.2 (8-section template) and §2.0 (hero fuses
// the "why" = problem truth with the "what" = the product's job).
// Proof figures use the Takumi-approved proof-bar numbers and named cases.

export type Step = { title: string; desc: string };
export type Diff = { title: string; desc: string };
export type FAQ = { q: string; a: string };

export type ProductLPData = {
  slug: "calendar" | "chat" | "library" | "email" | "ads";
  productName: string;
  icon: "calendar" | "chat" | "library" | "email" | "ads";
  metaTitle: string;
  metaDescription: string;
  keyword: string;
  // hero
  eyebrow: string;
  problemLine: string;
  h1: string;
  heroSub: string;
  /** AEO: dictionary-style 50-100字 definition ("〜とは、…です。") rendered as
   *  an extractable callout — AI Overviews / ChatGPT search citation target. */
  definition?: string;
  // how it works
  steps: Step[];
  // differentiation
  competitorsLabel: string;
  diffTitle: string;
  diffPoints: Diff[];
  // proof — optional: products with no approved customer numbers yet (e.g.
  // the newly released Meeton Ads) omit the section instead of inventing one
  proof?: { metric: string; label: string; quote: string; source: string };
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
    definition:
      "Meeton Calendar とは、フォーム送信や資料DLなどリードの行動直後にAIが商談予約を提示し、担当者アサインとCRM登録まで自動化する、商談化に特化した日程調整ツールです。",
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
      { q: "料金はいくらですか？", a: "基本プラン「リード獲得」（15万円〜/月）に、商談化アドオン（Calendar +5万円）・追客アドオン（Email +5万円）を必要な分だけ追加する体系です。規模は月間トラフィックで変動します。詳細は料金ページをご覧ください。まず30分のデモで自社への効き方を確認できます。" },
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
    definition:
      "Meeton Chat とは、Webサイト訪問者とAIが自由に対話し、質問対応からリード化・商談予約までを自動で行うBtoB向けの商談化AIチャットです。シナリオ設計は不要です。",
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
    definition:
      "Meeton Library とは、営業資料やホワイトペーパーをAIが訪問者ごとに提案・解説し、閲覧シグナルから検討度を可視化するコンテンツナーチャリングツールです。",
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
    definition:
      "Meeton Email とは、商談予約に至らなかったリードへ、再訪や資料閲覧などの行動シグナルを起点にAIが1:1のフォローメールを送り、再商談化まで運ぶ追客自動化ツールです。",
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

  ads: {
    slug: "ads",
    productName: "Meeton Ads",
    icon: "ads",
    metaTitle: "サイト内広告×AI自動最適化｜自社サイトを広告枠に｜Meeton Ads",
    metaDescription:
      "自社サイトの空きスペースを、AIが運用する広告枠に。訪問者のページ・流入元・業種を見て最適なオファーを1本だけ出し分け、クリック・リード獲得を報酬に自動で学習。広告はAIが自社コンテンツから下書きし、承認したものだけ配信。広告予算ゼロ・Cookie不要でCVRを引き上げるサイト内広告。",
    keyword: "サイト内広告 / Web接客 ポップアップ / オンサイトマーケティング / CVR改善",
    eyebrow: "サイト内広告 × AI自動最適化",
    problemLine: "集めた訪問者に、サイトは“待つ”だけ。",
    h1: "自社サイトを、最強の広告枠に変える。",
    heroSub:
      "広告費をかけて集めた訪問者の大半は、何も残さず帰っていく。Meeton Ads は、訪問者ごとにAIが最適なオファー（資料・ウェビナー・商談予約）を選んで表示するサイト内広告。ページ・流入元・業種まで見て出し分け、クリックのたびに賢くなります。",
    definition:
      "Meeton Ads とは、自社サイトの訪問者ごとに、閲覧ページ・流入元・業種に応じた最適なオファーをAIが出し分けるサイト内広告（オンサイト広告）ツールです。配信結果から継続的に学習します。",
    steps: [
      { title: "AIが広告を下書き", desc: "自社の資料・コンテンツからAIが広告案を自動生成。あなたは承認キューでレビューして通すだけ。" },
      { title: "訪問者ごとに出し分け", desc: "ページ・デバイス・流入元・業種で毎回スコアリングし、1ページ1枠で最良の1本だけを表示。" },
      { title: "学習して伸ばす", desc: "クリックやリード獲得を報酬に自動で学習。勝てる広告と勝てるページに、配信が自然と集中します。" },
    ],
    competitorsLabel: "vs ポップアップツール / Web接客ツール",
    diffTitle: "“全員に同じポップアップ”は、もう効かない。",
    diffPoints: [
      { title: "訪問者ごとに最適化", desc: "ルールの手動設定ではなく、AIが文脈ごとに選ぶ。料金ページで勝つ広告とブログで勝つ広告は違う——それを自動で学ぶ。" },
      { title: "配置ページも自動", desc: "どのページに出すかを人が決めない。ページ毎の実際の勝率を学習し、効く場所に自動で集中する。" },
      { title: "人の承認で、安心して任せる", desc: "AI生成の広告は承認したものだけ配信。常時表示（固定枠）、表示回数の上限、離脱直前トリガーなどの手動制御も。" },
    ],
    integrations: ["Salesforce", "HubSpot", "Slack", "Microsoft Teams", "Webhook"],
    crossSell: "広告で掴んだリードは Calendar で予約へ、資料が欲しい人には Library を、逃したら Email が追う——掴む→育てる→商談化→追客がつながると一気通貫のAI SDRに。",
    faq: [
      { q: "ポップアップツールやWeb接客ツールと何が違いますか？", a: "従来のツールは「どのページに・誰に・何を出すか」をすべて人がルール設定し、全員に同じものを表示します。Meeton Ads はAIが訪問者ごとの文脈（ページ・デバイス・流入元・業種）でオファーをスコアリングして最良の1本だけを表示し、クリック・リード獲得を報酬に配信を自動で最適化し続けます。" },
      { q: "広告は自分で作る必要がありますか？", a: "AIが自社の資料やコンテンツから広告案を自動生成し、承認キューに並べます。あなたはレビューして承認するだけで配信が始まります。もちろん自分で作成することも、特定の広告を常時表示（固定枠）にすることも可能です。" },
      { q: "表示しすぎて訪問者の体験を損ないませんか？", a: "1ページに表示されるのは常に1枠だけです。セッション・累計の表示回数上限、即時／滞在時間／スクロール深度／離脱直前などのトリガー制御があり、すぐ閉じられた広告はペナルティとして学習されるため、うるさい広告は自然と減っていきます。" },
      { q: "効果はどう確認できますか？", a: "広告ごとのインプレッション・クリック・獲得リードを計測し、ベンチマークと比較できます。どのページでどの広告が勝っているかも可視化されます。" },
    ],
  },
};

export const PRODUCTS_EN: Record<ProductLPData["slug"], ProductLPData> = {
  calendar: {
    slug: "calendar",
    productName: "Meeton Calendar",
    icon: "calendar",
    metaTitle: "Meeting Scheduling for Sales｜Calendly Alternative｜Meeton Calendar",
    metaDescription:
      "AI scheduling that turns a fresh lead into a booked meeting the moment intent peaks. The instant a form is submitted or a doc is downloaded, AI offers a slot, auto-assigns the rep, and logs it to your CRM. See how it compares to immedio / TimeRex / Calendly. Try it in a 30-minute demo.",
    keyword: "meeting scheduling / sales booking automation / Calendly alternative / inbound conversion",
    eyebrow: "AI Meeting Booking / Scheduling",
    problemLine: "The moment a lead acts is the moment you make them wait.",
    h1: "Book the meeting the moment the lead acts.",
    heroSub:
      "The industry-standard speed to lead is hours to days. Meeton Calendar offers a meeting slot the instant a form is submitted or a doc is downloaded, then runs auto-assignment and CRM logging end to end. Turn the moment of peak interest into a booked meeting.",
    definition:
      "Meeton Calendar is a meeting-focused scheduling tool: the moment a lead acts — submits a form or downloads a document — AI offers a meeting slot and automates rep assignment and CRM logging.",
    steps: [
      { title: "Detect the conversion", desc: "A form submission, a doc download, a finished chat—trigger on the moment interest is at its peak." },
      { title: "Offer a slot on the spot", desc: "An AI concierge presents open slots, auto-assigns the right rep, and steers the lead to the earliest available time." },
      { title: "Land in CRM and notifications", desc: "Bookings sync automatically to Salesforce/HubSpot and ping Slack/Teams instantly. Zero leads slip through." },
    ],
    competitorsLabel: "vs immedio / TimeRex / Spir / Calendly",
    diffTitle: "Not just another scheduling tool.",
    diffPoints: [
      { title: "A conversation before the booking", desc: "Unlike tools that just hand over a URL, AI answers questions and raises intent before guiding the lead to a slot." },
      { title: "Auto-fires the instant they convert", desc: "Faster than a human could write an email, the booking path appears within seconds of peak interest—and that first move decides whether it becomes a meeting." },
      { title: "Autonomous assignment and CRM logging", desc: "Round-robin/rule-based assignment, CRM logging, and notifications are automated. Reps focus only on the meeting itself." },
    ],
    proof: {
      metric: "60%+",
      label: "Meeting conversion rate via Meeton ai (about 3x the 20% industry average / HR & training)",
      quote: "Customers who come through Meeton ai are clearly already nurtured when they reach out. We find it highly effective for converting to meetings.",
      source: "Corporate-training industry leader (HR sector, Meeton ai customer)",
    },
    integrations: ["Salesforce", "HubSpot", "Google Calendar", "Outlook", "Zoom", "Slack", "Microsoft Teams"],
    crossSell: "Raise intent with chat before the booking, and follow up by email with everyone who didn't book—when the four jobs connect, you get an end-to-end AI SDR.",
    faq: [
      { q: "How is this different from Calendly or TimeRex?", a: "Unlike tools that simply hand over a booking URL, Meeton Calendar has AI answer questions in conversation the instant a lead converts, raising intent before guiding them to a slot. It then automates rep assignment, CRM logging, and notifications—solving both speed to lead and lead leakage at the same time." },
      { q: "How much does it cost?", a: "One base plan from $999/mo (Chat + Ads + Library), plus a meeting-booking add-on at $350/mo — priced by monthly traffic. See the pricing page for details, and start with a 1-month free trial or a 30-minute demo." },
      { q: "How long does it take to get started?", a: "It's no-code. Connect your calendar via OAuth, issue a booking URL, and you're live in minutes. Every setting is configured by users themselves inside the app—no development required." },
    ],
  },

  chat: {
    slug: "chat",
    productName: "Meeton Chat",
    icon: "chat",
    metaTitle: "Web Chat & AI Chatbot for B2B｜Convert Visitors｜Meeton Chat",
    metaDescription:
      "Buyers complete roughly 70% of the purchase journey before ever talking to sales. Meeton Chat meets them on that pre-sales ground, delivering answers your website can't and turning visitors into meetings—a web-engagement AI chat (chatbot). See how it compares to Intercom / scripted chatbots. Try it in a 30-minute demo.",
    keyword: "web engagement tool / chatbot for conversion / website exit prevention",
    eyebrow: "Web-Engagement AI Chat",
    problemLine: "Buyers have already started deciding before they ever reach out.",
    h1: "The conversion AI chat that meets buyers in their pre-sales research.",
    heroSub:
      "Buyers complete roughly 70% of the purchase journey before they ever contact sales (Gartner/6sense). Meeton Chat talks with visitors during that window, delivers answers a website can't, and lifts the very probability that they reach out.",
    definition:
      "Meeton Chat is a B2B meeting-generation AI chat that converses freely with website visitors and automatically handles everything from answering questions to lead capture and meeting booking. No scenario design required.",
    steps: [
      { title: "Drop in the snippet", desc: "Just paste a single line of code. No scenario design—AI starts talking to visitors the moment it's installed." },
      { title: "Converse with full context", desc: "Carrying over past browsing, downloads, and conversation history, generative AI answers questions precisely—optimized for converting to meetings." },
      { title: "Move to a booking on the spot", desc: "The instant intent rises, it hands off to Calendar and closes the meeting booking right inside the conversation." },
    ],
    competitorsLabel: "vs Intercom / scripted chatbots",
    diffTitle: "Being able to “chat” alone won't grow your pipeline.",
    diffPoints: [
      { title: "Moves the pre-sales research forward", desc: "Instead of waiting for an inquiry, it delivers answers during the pre-sales window where 70% of the decision happens—and pushes it forward." },
      { title: "Optimized for conversion", desc: "Not an FAQ-answering bot, but designed to raise intent and carry visitors to a booking—carrying over past context." },
      { title: "No scenario design required", desc: "No need to script Q&A flows; generative AI answers from context. Five-minute install, minimal maintenance." },
    ],
    proof: {
      metric: "20x+",
      label: "Leads generated via chat (vs. a conventional scripted chatbot)",
      quote: "Our old chat was lucky to bring in one or two leads a month. Since switching to Meeton ai it's 20+ a month—over 20x more leads coming from chat.",
      source: "BizteX Inc. (SaaS, Meeton ai customer)",
    },
    integrations: ["Salesforce", "HubSpot", "Slack", "Microsoft Teams", "Google Chat", "Webhook"],
    crossSell: "Hand off heated-up conversations to Calendar for a booking, and point people who want materials to Library—connect them and you get an end-to-end AI SDR.",
    faq: [
      { q: "How is this different from an ordinary chatbot?", a: "Scripted chatbots can only respond along pre-built Q&A flows, leaving conversion up to humans. Meeton Chat uses generative AI that understands context, carries over past browsing, downloads, and conversation history to converse autonomously, and closes the meeting booking inside the conversation the instant intent rises." },
      { q: "Why does “pre-sales” matter so much?", a: "B2B buyers are said to complete roughly 70% of the purchase journey before ever contacting sales (Gartner/6sense). Whether you can deliver answers your website can't during this window determines both the probability of an inquiry and the final meeting conversion rate. Meeton Chat is designed to be effective in exactly this pre-sales research phase." },
      { q: "Is it hard to install?", a: "Just paste a single-line snippet—no scenario design required. AI starts talking to visitors the moment it's installed. Setup is entirely no-code." },
    ],
  },

  library: {
    slug: "library",
    productName: "Meeton Library",
    icon: "library",
    metaTitle: "Sales Document Sharing & Nurturing｜DocSend Alternative｜Meeton Library",
    metaDescription:
      "Nurture prospects who aren't ready for a meeting yet—automatically, with content. Deliver materials matched to their interest, let AI explain the content, and grow the deal by reading their reactions. Opens and activity are fully visible. Automate content-driven lead nurturing. A DocSend alternative.",
    keyword: "lead nurturing with content / automated content nurturing / sales document sharing tool / DocSend alternative",
    eyebrow: "Automated Nurturing, Through Content",
    problemLine: "You're letting not-yet-ready prospects go cold by ignoring them.",
    h1: "Nurture prospects with your content.",
    heroSub:
      "Nurture prospects who aren't ready for a meeting yet—automatically, with content. Deliver materials matched to their interest, let AI explain what's inside, and make the next move based on their reactions. Instead of leaving them to cool, keep nurturing until they become meeting-ready leads.",
    definition:
      "Meeton Library is a content-nurturing tool where AI recommends and explains sales materials to each visitor and turns viewing signals into a visible measure of buying intent.",
    steps: [
      { title: "Prepare and share materials", desc: "Upload a PDF/deck and deliver it via a share URL. No CRM setup required." },
      { title: "AI explains and nurtures", desc: "AI answers the recipient's questions in the context of the material, moving their understanding and consideration forward." },
      { title: "Read reactions, make the next move", desc: "See who viewed what and how far. Carry warmed-up prospects into a meeting or a follow-up." },
    ],
    competitorsLabel: "vs DocSend",
    diffTitle: "Turn “send and forget” into “nurture.”",
    diffPoints: [
      { title: "Content that nurtures", desc: "Beyond distribution and tracking, AI explains the content and actively pushes not-yet-ready prospects' consideration forward." },
      { title: "Act on every reaction", desc: "Capture behavioral signals from opens and views, and carry warmed-up prospects into a meeting or follow-up without missing them." },
      { title: "Start without a CRM", desc: "No heavy initial setup—start content-driven lead nurturing right away." },
    ],
    proof: {
      metric: "2 deals won",
      label: "Closed in three months (Univis Group). Knowing who's viewing also raised proposal quality",
      quote: "Even when it doesn't turn into a meeting, we instantly see which companies are viewing our content. Our proposal volume went up, and the quality of our market and competitive analysis improved too.",
      source: "Univis Group (consulting / Shota Ueda)",
    },
    integrations: ["Salesforce", "HubSpot", "Slack", "Microsoft Teams", "Webhook"],
    crossSell: "Prospects nurtured and warmed up by content go to Calendar for a booking, and those not yet there get followed up by Email—connect them and you get an end-to-end AI SDR.",
    faq: [
      { q: "How is this different from DocSend?", a: "Where DocSend specializes in distributing and tracking opens, Meeton Library adds AI chat that explains the material and answers the recipient's questions on the spot. It also starts without a CRM and bridges open signals to Email/Calendar to carry follow-up all the way through." },
      { q: "What can open tracking tell me?", a: "You can see who viewed which material, when, and how far. By capturing behavioral signals from opens and views, you carry warmed-up prospects into a meeting or follow-up without losing them." },
      { q: "Does the recipient need a dedicated app?", a: "No. They can view simply by opening the share URL and ask questions via AI chat. The sender just uploads and issues a URL—all entirely no-code." },
    ],
  },

  email: {
    slug: "email",
    productName: "Meeton Email",
    icon: "email",
    metaTitle: "Follow-Up Automation & Lead Nurturing Email｜AI 1:1｜Meeton Email",
    metaDescription:
      "Leads who didn't book on the spot get autonomous 1:1 follow-up from AI, driven by behavioral signals. Not template swaps but AI-generated copy, with chat integration, working autonomously until the goal is met. Compare it to Lemlist / Smartlead / sales-engagement tools. Requires a CRM connection.",
    keyword: "lead nurturing email / follow-up automation / sales engagement",
    eyebrow: "Follow-Up Automation / AI 1:1 Outreach",
    problemLine: "You're letting the leads who didn't book go cold, untouched.",
    h1: "Don't give up on the leads who didn't book—pursue them.",
    heroSub:
      "The leads who didn't book on the spot are exactly where your pipeline upside lives. Meeton Email detects behavioral signals—return visits, opens, document views—and has AI generate 1:1 copy to follow up. Not template swaps, but autonomous follow-up until the goal is met.",
    definition:
      "Meeton Email is a win-back automation tool: triggered by behavioral signals such as return visits and document views, AI sends 1:1 follow-up emails that carry lost leads back to a booked meeting.",
    steps: [
      { title: "Connect your CRM", desc: "Connect Salesforce/HubSpot via OAuth. We pull in your existing leads and their behavioral data." },
      { title: "Detect the signals", desc: "AI detects behaviors like return visits, opens, and document views, and decides the right moment to follow up." },
      { title: "AI follows up 1:1", desc: "AI generates copy tailored to each person's context and sends it, carrying them autonomously toward a reply or a booking." },
    ],
    competitorsLabel: "vs Lemlist / Smartlead / sales-engagement tools",
    diffTitle: "Not a tool for blasting templates.",
    diffPoints: [
      { title: "AI-generated, not template swaps", desc: "Not mass sends with variable swaps—AI generates each message individually, matched to the recipient's behavioral context." },
      { title: "Driven by behavioral signals", desc: "Not a send schedule—it triggers on signals like return visits and opens to follow up at the optimal moment." },
      { title: "Autonomous until the goal is met", desc: "Toward the goal of a reply or a meeting booking, it keeps pursuing autonomously while coordinating with chat." },
    ],
    proof: {
      metric: "Re-converted to meetings",
      label: "Continuously creating meeting opportunities from dormant and unbooked leads (customer follow-up operations)",
      quote: "We now generate meeting opportunities steadily every month from existing leads we used to let slip through.",
      source: "Meeton ai customer (follow-up operations)",
    },
    integrations: ["Salesforce", "HubSpot", "Gmail", "Outlook", "Slack", "Webhook"],
    crossSell: "Email pursues the people warmed up by chat or content, and when they reply, Calendar books the meeting—connect them and you get an end-to-end AI SDR.",
    faq: [
      { q: "How is this different from Lemlist or Smartlead?", a: "Where those tools center on mass sends via template variable swaps, Meeton Email has AI generate each message individually, matched to the recipient's behavioral context. It triggers on behavioral signals like return visits and opens rather than a send schedule, and keeps pursuing autonomously toward the goal of a reply or a meeting booking." },
      { q: "Can I use it without a CRM?", a: "Meeton Email works by detecting behavioral signals on the assumption of CRM integration, so it requires a CRM connection such as Salesforce or HubSpot. It pulls in your existing leads and behavioral data, and AI decides whom to pursue and when." },
      { q: "Will it over-send?", a: "Meeton Email doesn't blast on a schedule—AI decides “whom and when to pursue” based on behavioral signals. It stops once the goal (a reply or a booking) is reached, so it never becomes irrelevant mass sending." },
    ],
  },

  ads: {
    slug: "ads",
    productName: "Meeton Ads",
    icon: "ads",
    metaTitle: "On-Site Ads with AI Auto-Optimization｜Meeton Ads",
    metaDescription:
      "Turn your website's unused space into an ad channel run by AI. It scores every visitor's context—page, traffic source, industry—shows the single best offer, and keeps learning from every click and captured lead. AI drafts the ads from your own content; only what you approve goes live. Lift conversion with zero ad budget and no cookies.",
    keyword: "on-site ads / website popup alternative / on-site marketing / conversion rate optimization",
    eyebrow: "On-Site Ads × AI Auto-Optimization",
    problemLine: "You paid to bring visitors in — and your site just waits.",
    h1: "Turn your website into your best ad channel.",
    heroSub:
      "Most of the visitors you paid to acquire leave without a trace. Meeton Ads shows each visitor the single best offer—a guide, a webinar, a meeting—selected by AI from their context: page, traffic source, even industry. And it gets smarter with every click.",
    definition:
      "Meeton Ads is an on-site advertising tool that uses AI to show each website visitor the best offer for their context — page, traffic source, and industry — and keeps learning from every result.",
    steps: [
      { title: "AI drafts your ads", desc: "AI generates ad candidates from your own content and materials. You just review and approve them in the queue." },
      { title: "One best offer per visitor", desc: "Every impression is scored on page, device, traffic source, and industry — one slot per page, only the single best offer shows." },
      { title: "Learns and compounds", desc: "Clicks and captured leads are the reward signal. Winning ads and winning pages automatically get more of the traffic." },
    ],
    competitorsLabel: "vs popup tools / web-engagement tools",
    diffTitle: "The same popup for everyone doesn't work anymore.",
    diffPoints: [
      { title: "Optimized per visitor", desc: "No hand-written rules — the AI chooses per context. The ad that wins on your pricing page isn't the one that wins on your blog, and it learns that automatically." },
      { title: "Auto page placement", desc: "You never pick where an ad runs. It learns each page's real win rate and concentrates delivery where it converts." },
      { title: "You approve, it runs", desc: "Only ads you approve go live. Manual controls too: pinned always-on ads, per-session and lifetime frequency caps, exit-intent triggers." },
    ],
    integrations: ["Salesforce", "HubSpot", "Slack", "Microsoft Teams", "Webhook"],
    crossSell: "Leads captured by an ad go to Calendar for a booking, content-seekers go to Library, and Email pursues the ones who slip away — connect capture → nurture → convert → win back and you get an end-to-end AI SDR.",
    faq: [
      { q: "How is this different from popup or web-engagement tools?", a: "Traditional tools make humans configure every rule — which page, which audience, which creative — and then show everyone the same thing. Meeton Ads scores offers per visitor context (page, device, traffic source, industry), shows only the single best one, and keeps optimizing delivery automatically with clicks and captured leads as the reward signal." },
      { q: "Do I have to create the ads myself?", a: "AI drafts ad candidates from your own content and materials and queues them for review — you approve, and they go live. You can also author ads yourself, and pin specific ads to run always-on." },
      { q: "Won't it hurt the visitor experience?", a: "Only one slot ever shows per page. You get per-session and lifetime frequency caps plus trigger controls (immediate, time on page, scroll depth, exit intent), and an ad that gets dismissed quickly is penalized in the learning loop — annoying ads phase themselves out." },
      { q: "How do I measure the impact?", a: "Impressions, clicks, and captured leads are tracked per ad and compared against benchmarks — and you can see which ads are winning on which pages." },
    ],
  },
};

export const PRODUCT_ORDER: ProductLPData["slug"][] = ["calendar", "chat", "library", "email", "ads"];
