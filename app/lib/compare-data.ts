// Comparison data for /compare/<slug> and /alternatives/<slug> (spec §2.3).
// Each entry compares one Meeton product against a single competitor, framed
// fairly (§4.14): the competitor's genuine strengths are acknowledged, and
// the comparison differentiates at the capability level. Competitor facts are
// grounded in the compare-competitor-research workflow + cited public sources
// (2026-05). Verify against each vendor's official page for the latest specs.

export type CompareRow = { dim: string; meeton: string; competitor: string; meetonWins?: boolean };

export type CompareData = {
  slug: string;
  competitorName: string;
  product: "calendar" | "chat" | "library" | "email" | "ads";
  productName: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  verdict: string;
  competitorStrength: string;
  rows: CompareRow[];
  chooseMeeton: string[];
  chooseCompetitor: string[];
  faq: { q: string; a: string }[];
  sources?: { claim: string; source: string }[];
  alternative?: boolean;
};

export const PRODUCT_NAMES: Record<CompareData["product"], string> = {
  calendar: "Meeton Calendar",
  chat: "Meeton Chat",
  library: "Meeton Library",
  email: "Meeton Email",
  ads: "Meeton Ads",
};

const C = (dim: string, meeton: string, competitor: string, meetonWins = false): CompareRow => ({ dim, meeton, competitor, meetonWins });

export const COMPARE: Record<string, CompareData> = {
  // ───────────── Calendar cluster ─────────────
  immedio: {
    slug: "immedio",
    competitorName: "immedio",
    product: "calendar",
    productName: "Meeton Calendar",
    category: "インバウンド商談化",
    metaTitle: "immedio の料金・違いとAI代替｜インバウンド商談化で比較｜Meeton",
    metaDescription:
      "immedio はサンクスページ商談化に特化した実績ある国産SaaS。Meeton Calendar は会話・資料・予約・追客まで一気通貫のAI SDRである点が違い。用途別の使い分けを比較表で解説。",
    verdict:
      "サンクスページでの即時商談化「だけ」を堅実に固めたいなら、専業で実績豊富な immedio は有力です。会話で温度を上げ、資料提案・追客まで1つのAI SDRで一気通貫にしたい場合は Meeton Calendar が向きます。",
    competitorStrength:
      "immedio はフォーム送信直後という最も熱量の高い瞬間の商談化に特化した国産SaaSで、上場SaaS企業を含む豊富な導入実績とISMS認証を持つ堅実な選択肢です。その専業の完成度は明確な強みです。",
    rows: [
      C("主目的", "会話→予約→資料→追客の商談化（AI SDR）", "サンクスページでの即時商談化", true),
      C("予約前のAI会話", "AIが対話し温度を上げてから予約へ", "フォーム後にポップアップで予約提示", true),
      C("カバー範囲", "予約＋チャット＋資料共有＋追客の4機能", "商談化（サンクスページ/資料/名刺の3導線）"),
      C("料金", "基本プラン15万円〜＋アドオン（公開）", "非公開（要問い合わせ）", true),
      C("CRM連携", "Salesforce / HubSpot 自動登録", "Salesforce / HubSpot 連携・自動差配"),
      C("提供", "国産・日本語ネイティブ", "国産・日本語ネイティブ"),
    ],
    chooseMeeton: [
      "予約だけでなく会話・資料提案・追客まで1つのAI SDRで完結させたい",
      "公開された料金体系（基本プラン15万円〜）で検討を進めたい",
      "問い合わせ前の潜在層にもチャットで踏み込みたい",
    ],
    chooseCompetitor: [
      "サンクスページ商談化に用途を絞って堅実に導入したい",
      "展示会名刺など特定3導線の商談化が主目的",
    ],
    faq: [
      { q: "immedio と Meeton Calendar はどちらが商談化に強いですか？", a: "どちらもインバウンドの商談化に強い国産SaaSです。immedio はサンクスページ商談化の専業として実績が豊富です。Meeton Calendar は、予約の前にAIが会話で温度を上げ、さらにチャット・資料共有・追客まで同じプラットフォームで繋がる点が異なります。用途が予約特化なら immedio、会話から追客まで一気通貫にしたいなら Meeton が向きます。" },
      { q: "料金はどうなっていますか？", a: "Meeton ai は基本プラン15万円〜＋アドオン（商談化・追客 各5万円/月）で、料金を公開しています。immedio は公開価格がなく要問い合わせです（2026年時点）。" },
    ],
    sources: [
      { claim: "immedio はサンクスページに1行タグで商談化、製品は immedio / Box / Forms の3構成。Sansanで商談処理工数60%削減等を公表", source: "immedio.io/function, immedio.io/case" },
      { claim: "2024年5月シリーズA 3.5億円調達、ISMS（ISO/IEC 27001）2023年10月取得。料金は非公開（要問い合わせ）", source: "corp.immedio.io" },
    ],
    alternative: true,
  },

  timerex: {
    slug: "timerex",
    competitorName: "TimeRex",
    product: "calendar",
    productName: "Meeton Calendar",
    category: "日程調整自動化",
    metaTitle: "TimeRex の料金・違いとAI代替｜日程調整→商談化で比較｜Meeton Calendar",
    metaDescription:
      "TimeRex は無料から使えるコスパの高い国産日程調整ツール。Meeton Calendar は日程調整に加え、予約前のAI会話・即フォロー・商談化に最適化したAI SDR。純粋な日程調整か、商談化までかで使い分け。",
    verdict:
      "純粋な日程調整を低コストで効率化したいなら、無料から使えて完成度の高い TimeRex が最適です。リード発生時に会話で温度を上げ、予約を「商談化」まで持っていきたいなら Meeton Calendar が向きます。両者は目的が異なります。",
    competitorStrength:
      "TimeRex は登録者45万人・大手導入実績・ISMS認証を持つ、無料から使えるコストパフォーマンスの高い国産日程調整ツールです。多様な調整パターンと3,000以上の外部連携で、純粋なスケジューリングの完成度は高い選択肢です。",
    rows: [
      C("主目的", "リードの商談化（会話→予約→追客）", "空き時間の自動調整（スケジューリング）", true),
      C("予約前のAI会話", "AIが対話し温度を上げる", "なし（空き調整に特化）", true),
      C("コンバート直後の自動起動", "フォーム/資料DL直後に予約導線", "予約URLを共有して相手が選択"),
      C("料金感", "基本プラン15万円〜＋アドオン（税抜・公開）", "無料〜プレミアム ¥1,500/月程度（税抜・ユーザー）"),
      C("カバー範囲", "予約＋チャット＋資料＋追客の4機能", "日程調整（会議室予約・リマインド等）"),
    ],
    chooseMeeton: [
      "日程調整だけでなく、予約を商談化まで持っていきたい",
      "リード発生時に会話で温度を上げてから予約させたい",
      "予約・会話・資料・追客を1アカウントで運用したい",
    ],
    chooseCompetitor: [
      "用途は純粋な日程調整で、コストを最優先したい",
      "個人〜小チームでスケジューリングだけ自動化したい",
    ],
    faq: [
      { q: "TimeRex と Meeton Calendar の違いは？", a: "TimeRex は空き時間の自動調整（スケジューリング）に特化した国産ツールで、無料から使えコストパフォーマンスが高いのが強みです。Meeton Calendar は日程調整に加え、予約の前にAIが会話で温度を上げ、CRM自動登録や追客まで繋ぐ「商談化」に最適化されています。目的が日程調整なら TimeRex、商談化なら Meeton が向きます。" },
      { q: "料金はどちらが安いですか？", a: "純粋な日程調整の単価は TimeRex（無料〜月¥1,500程度/ユーザー）の方が安価です。Meeton ai は基本プラン15万円〜＋アドオン（税抜）で、会話・自動アサイン・CRM登録など商談化機能まで含みます。比較は『何を解きたいか』で行うのが適切です。" },
    ],
    sources: [
      { claim: "TimeRex は登録者45万人、フリー〜エンタープライズの4段階、ISO27001取得、最大95%工数削減を公称", source: "timerex.net/plan, timerex.net/feature" },
    ],
  },

  spir: {
    slug: "spir",
    competitorName: "Spir",
    product: "calendar",
    productName: "Meeton Calendar",
    category: "日程調整自動化",
    metaTitle: "Spir の料金・違いとAI代替｜日程調整→商談化で比較｜Meeton Calendar",
    metaDescription:
      "Spir は複数カレンダー統合とグローバル対応に強い国産日程調整SaaS。Meeton Calendar は予約前のAI会話・即フォロー・商談化に最適化。スケジューリングの質か、商談化までかで使い分け。",
    verdict:
      "複数カレンダー統合や海外取引先とのスケジューリングを丁寧にやりたいなら Spir が向きます。リード発生時の会話・即フォローで予約を「商談化」したいなら Meeton Calendar です。両者は解く課題が異なります。",
    competitorStrength:
      "Spir は複数カレンダーの同時接続・タイムゾーン対応などスケジューリングの体験と統合の深さに強みがあり、ISMS認証・PLGモデルで個人から大企業まで裾野が広い国産SaaSです。",
    rows: [
      C("主目的", "リードの商談化（会話→予約→追客）", "複数カレンダー統合のスケジューリング", true),
      C("予約前のAI会話", "AIが対話し温度を上げる", "なし", true),
      C("グローバル/タイムゾーン", "対応", "複数タイムゾーン対応に強み"),
      C("料金", "基本プラン15万円〜＋アドオン（公開）", "無料（3名まで）〜チームプラン"),
      C("カバー範囲", "予約＋チャット＋資料＋追客の4機能", "日程調整（カレンダー統合）"),
      C("提供", "国産・日本語", "国産・日本語"),
    ],
    chooseMeeton: [
      "日程調整を商談化まで繋げたい",
      "予約前にAIの会話で見込み度を上げたい",
      "会話・資料・追客まで一気通貫で運用したい",
    ],
    chooseCompetitor: [
      "複数カレンダー統合・海外調整など純粋な日程調整の質を重視",
      "個人〜中規模でスケジューリングだけ整えたい",
    ],
    faq: [
      { q: "Spir と Meeton Calendar はどう違いますか？", a: "Spir は複数カレンダー統合やタイムゾーン対応などスケジューリング体験に強い国産SaaSです。Meeton Calendar は、予約の前にAIが会話で温度を上げ、CRM登録・追客まで繋ぐ商談化に最適化しています。日程調整の質を求めるなら Spir、商談化まで求めるなら Meeton が向きます。" },
    ],
    sources: [
      { claim: "Spir は登録40万人超、Free（3名）〜チームプラン、ISMS認証取得、複数カレンダー/タイムゾーン対応", source: "spirinc.com" },
    ],
  },

  calendly: {
    slug: "calendly",
    competitorName: "Calendly",
    product: "calendar",
    productName: "Meeton Calendar",
    category: "日程調整自動化",
    metaTitle: "Calendly 日本語の料金・違い｜AI代替・商談化で比較｜Meeton Calendar",
    metaDescription:
      "Calendly は世界最大手の日程調整ツールで連携エコシステムが豊富。Meeton Calendar は日本語ネイティブで、予約前のAI会話・即フォロー・商談化に最適化。グローバル汎用か、日本のインバウンド商談化かで使い分け。",
    verdict:
      "世界標準の日程調整とリッチな連携エコシステムが欲しいなら Calendly が王道です。日本語ネイティブのUI・サポートで、予約を会話から商談化まで持っていきたいなら Meeton Calendar が向きます。",
    competitorStrength:
      "Calendly は世界シェア最大手で Fortune 500 の多くが導入、100以上の連携と低摩擦のPLGが強みです。グローバルなスケジューリング標準としての完成度は突出しています。",
    rows: [
      C("主目的", "日本のインバウンド商談化", "汎用スケジューリング（グローバル）"),
      C("予約前のAI会話", "AIが対話し温度を上げる", "なし", true),
      C("日本語UI・サポート", "日本語ネイティブ", "公式日本語UI非対応（翻訳のみ）", true),
      C("連携エコシステム", "主要CRM/カレンダー/通知に対応", "100以上の連携で最広"),
      C("料金", "基本プラン15万円〜＋アドオン（公開）", "無料（1イベントタイプ）〜有料プラン"),
      C("カバー範囲", "予約＋チャット＋資料＋追客の4機能", "日程調整（チームはルーティング）"),
    ],
    chooseMeeton: [
      "日本語ネイティブのUI・サポートが必要",
      "予約を会話・追客まで繋いで商談化したい",
      "日本のインバウンド商談化が主目的",
    ],
    chooseCompetitor: [
      "グローバルで標準的な日程調整と最広の連携が欲しい",
      "英語圏中心で個人〜大企業のスケジューリングを統一したい",
    ],
    faq: [
      { q: "Calendly の日本語対応は？", a: "Calendly は公式の日本語UIに非対応で、ブラウザ翻訳での利用となり日本語のサポート窓口もありません（2026年時点）。日本語ネイティブでの運用やサポートを重視する場合は、国産の Meeton Calendar が向きます。" },
      { q: "Calendly と Meeton Calendar の違いは？", a: "Calendly は世界最大手の汎用スケジューリングツールで連携が豊富です。Meeton Calendar は日本語ネイティブで、予約の前にAIが会話して温度を上げ、CRM登録・追客まで繋ぐ『商談化』に最適化しています。" },
    ],
    sources: [
      { claim: "Calendly は世界10万社超・Fortune500の86%導入、100以上の連携。公式日本語UIは非対応", source: "calendly.com, businesschatmaster.com" },
    ],
    alternative: true,
  },

  // ───────────── Library cluster ─────────────
  docsend: {
    slug: "docsend",
    competitorName: "DocSend",
    product: "library",
    productName: "Meeton Library",
    category: "資料共有・トラッキング",
    metaTitle: "DocSend 代替・日本語｜資料共有のAI解説・違いで比較｜Meeton Library",
    metaDescription:
      "DocSend はページ単位の精密な資料トラッキングとVDRに強いDropbox傘下の定番。Meeton Library はAIチャットが資料を解説し、CRM不要・日本語で開封を可視化、追客まで繋ぐ。精密追跡/VDRか、AI解説×商談化かで使い分け。",
    verdict:
      "ピッチデックのページ単位精密トラッキングやデータルーム（VDR）が主目的なら、定番の DocSend が堅実です。資料をAIが解説し、開封を商談化・追客まで繋ぎたい、日本語でCRM不要に始めたいなら Meeton Library が向きます。",
    competitorStrength:
      "DocSend は「誰がどのページを何秒読んだか」をページ単位で追える精密なエンゲージメント分析と、資金調達・M&Aで使えるVDRが強みのDropbox傘下の定番です。トラッキング精度では業界屈指です。",
    rows: [
      C("主目的", "資料提案→AI解説→開封可視化→追客", "資料共有・精密トラッキング・VDR"),
      C("AIによる資料解説", "AIチャットが中身を解説・質問に回答", "なし（閲覧トラッキングが中心）", true),
      C("開封トラッキング", "誰がいつどこまで見たかを可視化", "ページ単位の精密トラッキングに強み"),
      C("追客への接続", "Email/Calendar へ自動で橋渡し", "Salesforce連携（有料アドオン）等"),
      C("CRM要否 / 導入", "CRM不要ですぐ始められる", "無料プランなし（14日トライアル）", true),
      C("提供", "日本語ネイティブ", "英語中心（日本語UIは要確認）", true),
    ],
    chooseMeeton: [
      "資料をAIが解説し、受け手の理解と前進を助けたい",
      "CRM不要で開封トラッキングを始めたい",
      "開封シグナルを追客（Email/Calendar）まで繋ぎたい",
    ],
    chooseCompetitor: [
      "ピッチデックのページ単位精密トラッキングが主目的",
      "資金調達・M&Aのデータルーム（VDR）が必要",
    ],
    faq: [
      { q: "DocSend と Meeton Library の違いは？", a: "DocSend はページ単位の精密な資料トラッキングとVDRに強いDropbox傘下の定番です。Meeton Library はそこにAIチャットによる資料解説を加え、CRM不要・日本語で始められ、開封シグナルをEmail/Calendarへ繋いで追客まで自動化する点が異なります。" },
      { q: "料金はどうなっていますか？", a: "Meeton ai は基本プラン15万円〜＋アドオン（商談化・追客 各5万円/月）で、料金を公開しています。DocSend は常設無料プランがなく、14日間トライアルが提供されています（2026年時点）。" },
    ],
    sources: [
      { claim: "DocSendは2021年Dropboxが約1.65億ドルで買収。ページ単位トラッキング・VDR。無料プランなし/14日トライアル、Salesforce連携は有料アドオン", source: "dropbox.gcs-web.com, docsend.com" },
    ],
    alternative: true,
  },

  // ───────────── Chat cluster ─────────────
  intercom: {
    slug: "intercom",
    competitorName: "Intercom",
    product: "chat",
    productName: "Meeton Chat",
    category: "チャット / メッセージング",
    metaTitle: "Intercom 代替の料金・違い｜AI商談化チャットで比較｜Meeton Chat",
    metaDescription:
      "Intercom（Fin）は既存顧客のカスタマーサポート自動化に強い世界的プラットフォーム。Meeton Chat は新規・潜在リードの商談化に特化し、接触前の検討の土台に立つAIチャット。サポート削減か、商談獲得かで使い分け。",
    verdict:
      "既存顧客の問い合わせ対応・サポートを自動化したいなら、Fin の解決率が高い Intercom が王道です。Webサイトの新規・潜在訪問者を会話で掴み「商談化」したいなら Meeton Chat が向きます。両者は解く課題（サポート vs 商談獲得）が異なります。",
    competitorStrength:
      "Intercom は AIエージェント Fin が高い問い合わせ解決率（公称67%・累計4,000万件超）を持つ、カスタマーサポート特化の世界的プラットフォームです。全チャネル統合・大企業向けセキュリティ要件への対応も強みです。",
    rows: [
      C("主目的", "新規・潜在リードの商談化（AI SDR）", "既存顧客のカスタマーサポート自動化"),
      C("商談化への最適化", "温度を上げ予約まで運ぶ設計", "問い合わせ解決が中心", true),
      C("接触前の潜在層", "問い合わせ前の検討の土台に立つ", "主に既存/問い合わせ顧客", true),
      C("過去文脈の引き継ぎ", "閲覧・DL・会話履歴を引き継ぐ", "サポート文脈の管理に強い"),
      C("料金感", "基本プラン15万円〜＋アドオン（税抜・公開）", "席料 + Fin $0.99/解決の従量"),
      C("提供", "日本語ネイティブ・商談化特化", "英語中心・サポート特化"),
    ],
    chooseMeeton: [
      "新規・潜在リードを会話で掴んで商談化したい",
      "問い合わせ前の検討段階に踏み込みたい",
      "日本語で商談化に特化して始めたい",
    ],
    chooseCompetitor: [
      "既存顧客のサポート問い合わせを大量に自動解決したい",
      "全チャネル統合のカスタマーサービス基盤が必要",
    ],
    faq: [
      { q: "Intercom と Meeton Chat はどちらが良いですか？", a: "解きたい課題が異なります。Intercom（Fin）は既存顧客のカスタマーサポート自動化に強く、問い合わせ解決率の高さが特長です。Meeton Chat は新規・潜在リードの『商談化』に特化し、接触前の検討の土台に立って会話し、温度が上がれば予約まで運びます。サポート削減なら Intercom、商談獲得なら Meeton が向きます。" },
      { q: "料金はどう違いますか？", a: "Intercom は席料（$29〜132/seat/月）に加え Fin AI が $0.99/解決件の従量課金です。Meeton ai は基本プラン15万円〜＋アドオン（税抜）で、月間トラフィックと機能で変動するシンプルな体系です。用途と課金体系が異なるため、目的に沿って選ぶのが適切です。" },
    ],
    sources: [
      { claim: "IntercomはカスタマーサポートAI「Fin」が解決率67%・累計4,000万件超。席料$29〜132/月 + Fin $0.99/解決の従量", source: "intercom.com/pricing, sacra.com/c/intercom" },
    ],
    alternative: true,
  },

  // ───────────── Email cluster ─────────────
  lemlist: {
    slug: "lemlist",
    competitorName: "lemlist",
    product: "email",
    productName: "Meeton Email",
    category: "メール / 営業エンゲージメント",
    metaTitle: "lemlist 代替の料金・違い｜行動追客AIで比較｜Meeton Email",
    metaDescription:
      "lemlist は新規開拓のコールドメール/マルチチャネル配信に強い海外SaaS。Meeton Email は既存・未予約リードを行動シグナル起点にAIが1:1で追客するインバウンド追客特化。新規開拓か、温まったリードの追客かで使い分け。",
    verdict:
      "新規リストへのコールドメール・マルチチャネル開拓を大量に回したいなら lemlist が強力です。既に接点のある（未予約・休眠）リードを行動シグナル起点にAIが1:1で追客したいなら Meeton Email が向きます。目的が新規開拓か追客かで分かれます。",
    competitorStrength:
      "lemlist はメール・LinkedIn・電話などを横断するマルチチャネル開拓、650M件超のリードDB、ハイパーパーソナライズと到達率改善（lemwarm）に強く、海外向けアウトバウンドでは高評価（G2 4.6）の選択肢です。",
    rows: [
      C("主目的", "既存・未予約リードのインバウンド追客", "新規リストへのコールド開拓"),
      C("起点", "行動シグナル（再訪/開封/閲覧）", "送信シーケンス/リスト", true),
      C("文面生成", "相手の文脈にAIが1通ずつ生成", "テンプレ＋動的パーソナライズ", true),
      C("CRM前提", "CRM連携前提（既存リード活用）", "リードDB内蔵で新規抽出に強い"),
      C("チャネル", "メール（チャット/予約と連携）", "メール/LinkedIn/電話/SMS等マルチ"),
      C("ゴール", "返信・商談予約まで自律", "シーケンス到達・返信獲得"),
    ],
    chooseMeeton: [
      "既存CRMの未予約・休眠リードを掘り起こしたい",
      "行動シグナルを見てAIが最適な瞬間に追客してほしい",
      "チャット・予約と連携して商談化まで繋ぎたい",
    ],
    chooseCompetitor: [
      "新規リストへのコールドメールを大量に回したい",
      "メール以外（LinkedIn等）も横断する開拓をしたい",
    ],
    faq: [
      { q: "lemlist と Meeton Email の違いは？", a: "lemlist は新規リストへのコールドメール/マルチチャネル開拓に強い海外SaaSで、リードDB内蔵やパーソナライズが特長です。Meeton Email は、既に接点のある（未予約・休眠）リードを、行動シグナル（再訪・開封・閲覧）を起点にAIが1:1で追客するインバウンド追客に特化しています。新規開拓なら lemlist、追客なら Meeton が向きます。" },
    ],
    sources: [
      { claim: "lemlistはメール/LinkedIn/電話のマルチチャネル開拓、650M件超のリードDB、lemwarmで到達率改善。Email $31/月〜、Multichannel $87/月", source: "lemlist.com/pricing" },
    ],
  },

  smartlead: {
    slug: "smartlead",
    competitorName: "Smartlead",
    product: "email",
    productName: "Meeton Email",
    category: "メール / コールド配信",
    metaTitle: "Smartlead 代替の料金・違い｜行動追客AIで比較｜Meeton Email",
    metaDescription:
      "Smartlead は無制限メールボックスと自動ウォームアップで大量コールド配信・到達率に強い海外SaaS。Meeton Email は既存・未予約リードを行動シグナル起点にAIが1:1追客。大量アウトバウンドか、温まったリードの追客かで使い分け。",
    verdict:
      "大量のコールドメールを高い到達率で送り続けたい（特に代行・エージェンシー用途）なら Smartlead が強力です。既存・未予約リードを行動シグナル起点にAIが1:1で追客し、商談化まで繋ぎたいなら Meeton Email が向きます。",
    competitorStrength:
      "Smartlead は無制限メールボックス接続・自動ウォームアップによる配信到達率の管理と、複数クライアントを統合管理できるエージェンシー向け設計（ホワイトラベル）に強い海外SaaSです（G2 4.6）。",
    rows: [
      C("主目的", "既存・未予約リードのインバウンド追客", "大量コールドメールの送信・到達率管理"),
      C("起点", "行動シグナル（再訪/開封/閲覧）", "送信キャンペーン/リスト", true),
      C("文面生成", "相手の文脈にAIが1通ずつ生成", "テンプレ＋差し込み中心", true),
      C("到達率/ウォームアップ", "—（インバウンド前提）", "無制限メールボックス・自動ウォームアップに強み"),
      C("CRM前提", "CRM連携前提（既存リード活用）", "アウトバウンド配信が前提"),
      C("ゴール", "返信・商談予約まで自律", "大量配信の到達・返信獲得"),
    ],
    chooseMeeton: [
      "既存CRMの未予約・休眠リードを商談化したい",
      "送信スケジュールでなく行動シグナルで追ってほしい",
      "チャット・予約と連携して一気通貫にしたい",
    ],
    chooseCompetitor: [
      "大量のコールドメールを高到達率で送りたい",
      "代行・エージェンシーで複数クライアントを統合管理したい",
    ],
    faq: [
      { q: "Smartlead と Meeton Email の違いは？", a: "Smartlead は無制限メールボックスと自動ウォームアップで大量のコールドメールを高い到達率で送ることに特化した海外SaaSです。Meeton Email は、既存・未予約リードを行動シグナル起点にAIが1:1で追客するインバウンド追客に特化しています。大量アウトバウンドなら Smartlead、温まったリードの追客なら Meeton が向きます。" },
    ],
    sources: [
      { claim: "Smartleadは無制限メールボックス・自動ウォームアップ・エージェンシー向け統合管理に強み。Basic $39/月〜Unlimited $174/月", source: "smartlead.ai/pricing, g2.com" },
    ],
  },

    sprocket: {
    slug: "sprocket",
    competitorName: "Sprocket",
    product: "ads",
    productName: "Meeton Ads",
    category: "Web接客・CX改善",
    metaTitle: "Sprocket の料金・違いとAI代替｜Web接客×サイト内広告で比較｜Meeton",
    metaDescription:
      "Sprocket はコンサル伴走型のCX改善・Web接客プラットフォーム。Meeton Ads はサイト内広告をAIが自動最適化し、チャット・商談化まで繋ぐAI SDRの一部。料金公開の有無や適する用途を比較表で解説。",
    verdict:
      "EC・金融などトラフィックの多いB2CサイトのCX改善を、専任コンサルタントの伴走で腰を据えて進めるなら、実績豊富な Sprocket が有力です。B2Bサイトでサイト内広告からリードを獲得し、AI会話・商談化まで一気通貫にしたいなら Meeton Ads が向きます。両者は解く課題が異なります。",
    competitorStrength:
      "Sprocket は2014年創業・導入企業400社以上のCX改善プラットフォームです。金融など規制業界を含むエンタープライズ実績、ITreview Grid Award Web接客ツール部門での Leader 連続受賞（2026 Spring 時点）、ISO/IEC 27001:2022 認証に加え、12万回超のA/Bテスト知見を持つ専任プロデューサーが伴走してPDCAを回す提供モデルは、CROを本格的に進めたい企業にとって明確な強みです。",
    rows: [
      C("主目的", "サイト内広告のAI最適化でB2Bリードを獲得・商談化", "Web接客・パーソナライズによるCX改善（CRO）", true),
      C("AI会話・商談予約", "広告→AIチャット→予約まで接続（初動5秒・24時間365日）", "商談予約・訪問者向けAI会話の記載なし（ポップアップ・MA中心）", true),
      C("最適化の仕組み", "AIがサイト内広告の出し分けを自動最適化", "生成AI（Insights / SproAgent）×12万回超のA/Bテスト知見×専任コンサルのシナリオ設計"),
      C("料金", "基本プラン15万円〜＋アドオン（公開）", "非公開（要問い合わせ）", true),
      C("CRM連携", "HubSpot / Salesforce ネイティブ連携", "CDP（DataStudio）経由の外部ツール連携", true),
      C("導入・運用", "JSタグ1行・5分で導入、自走運用", "タグ1行で導入、専任プロデューサーが伴走運用"),
    ],
    chooseMeeton: [
      "B2Bサイトでサイト内広告→AI会話→商談化まで一気通貫にしたい",
      "公開された料金（基本プラン15万円〜＋アドオン）でスモールスタートしたい",
      "HubSpot / Salesforce にリードを自動登録し、自走で運用したい",
    ],
    chooseCompetitor: [
      "EC・金融などB2C・高トラフィックサイトのCVR改善（CRO）が主目的",
      "専任コンサルタントに伴走してもらい、豊富なA/Bテスト知見でPDCAを回したい",
      "CDP・BIまで含む統合CX基盤をエンタープライズで整備したい",
    ],
    faq: [
      { q: "Sprocket と Meeton Ads の違いは？", a: "Sprocket はポップアップなどのWeb接客・パーソナライズ（Personalize）、CDP（DataStudio）、生成AI BI（Insights）、AIエージェント（SproAgent）を組み合わせたCX改善プラットフォームで、専任コンサルタントが伴走してCVR改善のPDCAを回す提供モデルです。Meeton Ads はB2Bサイト向けにサイト内広告をAIが自動最適化し、AIチャット（初動5秒・24時間365日）から商談予約までを同じAI SDRプラットフォームで繋ぎます。CX改善のコンサル伴走なら Sprocket、リード獲得から商談化までの自動化なら Meeton が向きます。" },
      { q: "Sprocket の料金はいくらですか？", a: "Sprocket の料金は非公開で、要問い合わせです。公式FAQでは企業の課題・ニーズに合わせて最適なプランを個別提案するとしており、初期費用＋月額の構成です（2026年時点）。Meeton ai は基本プラン15万円〜＋アドオン（商談化・追客 各5万円/月）で料金を公開しています。" },
      { q: "B2Bのリード獲得にはどちらが向いていますか？", a: "Sprocket の導入実績はEC・金融・旅行などB2C・高トラフィックサイトが中心で、ヤンマーホールディングスのオンライン展示会申込（ポップアップなし比143%）のようなB2B事例もあります。Meeton はB2Bのリード獲得〜商談化に特化して設計されており、導入企業では商談化率60%以上（EdulinX社）などの実績があります。B2Bのリード獲得・商談化が主目的なら Meeton、B2CサイトのCX改善が主目的なら Sprocket が適しています。" },
    ],
    sources: [
      { claim: "Sprocket は Personalize（MA）/ DataStudio（CDP）/ Insights（生成AI BI）/ SproAgent の4モジュール構成のCX改善プラットフォーム。12万回超のA/Bテスト知見を持つ専任コンサルタントが伴走。導入企業400社以上", source: "sprocket.bz/service, sprocket.bz/company/outline.html" },
      { claim: "料金は非公開（要問い合わせ）。課題・ニーズに合わせた個別提案で、初期費用＋月額の構成", source: "sprocket.bz/faq/3.html" },
      { claim: "ITreview Grid Award Web接客ツール部門で Leader を連続受賞（2026 Spring 時点）。ISO/IEC 27001:2022・JIS Q 27001:2023 認証", source: "itreview.jp/award/2026_spring/web-customer-service.html, sprocket.bz/privacy" },
      { claim: "ヤンマーホールディングスのB2B事例：オンライン展示会の申込完了率がポップアップなし比143%に改善", source: "sprocket.bz/release/20221004.html" },
      { claim: "プラットフォームページに商談予約・チャット起点のリード獲得機能の記載なし（ポップアップ・MA・CDP・BIが中心）", source: "sprocket.bz/platform" },
    ],
  },

  'flipdesk': {
    slug: "flipdesk",
    competitorName: "Flipdesk",
    product: "ads",
    productName: "Meeton Ads",
    category: "Web接客・サイト内広告",
    metaTitle: "Flipdesk の料金・違いとAI代替｜Web接客×サイト内広告で比較｜Meeton",
    metaDescription:
      "Flipdesk は1,600社超が導入する国産Web接客ツール（ポップアップ・バナー・クーポン）。Meeton Ads は訪問者ごとにAIがオファーを出し分け、リード獲得から商談化まで繋ぐサイト内広告。料金・AI機能・使い分けを比較表で解説。",
    verdict:
      "EC/D2Cや小売サイトでポップアップ・クーポン・ABテストなどのWeb接客を公開価格で手堅く始めたいなら、1,600社超の実績を持つ Flipdesk は堅実な選択です。B2Bのリード獲得を目的に、出し分け・最適化をAIに任せ、商談予約まで一気通貫にしたいなら Meeton Ads が向きます。",
    competitorStrength:
      "Flipdesk は2019年提供開始のWeb接客ツールで、1,600社・2,000サイト超の導入とアスクル・三越伊勢丹（meeco）などの著名実績を持ちます。ポップアップ・バナー・クーポン・ABテスト・ヒートマップまで揃うノーコードの道具箱、初期5万円＋月額5万円（税抜）という公開された入りやすい価格、ITreview 4.2/5（167件）で評価される使いやすさとサポートは明確な強みです。2024年3月にはシナリオAI作成・AIコードなどの生成AI機能も追加されています。",
    rows: [
      C("主目的", "サイト内広告でリード獲得を最大化（AI SDRの入口）", "ポップアップ・バナーによるWeb接客でCVR改善", true),
      C("AIの役割", "配信最適化そのものをAIが担う（訪問者ごとに出し分け・クリックとリード獲得で自動学習）", "AIは制作補助（シナリオAI作成・AIコード・AI FAQボット、2024年3月〜）。配信はルール設定", true),
      C("商談化への接続", "Meeton Calendar と繋がり初動5秒で商談予約へ（商談化率60%+ = EdulinX）", "商談予約・日程調整機能は確認できず（接客・FAQまで）", true),
      C("カバー範囲", "掴む→育てる→商談化→追客の一気通貫（Ads/Chat/Library/Calendar/Email）", "サイト内接客＋Cross Talkチャットボット（ABテスト・ヒートマップ含む）"),
      C("料金", "基本プラン15万円〜＋アドオン（公開）", "Standard 初期5万円＋月額5万円（税抜・月80万PVまで公開、超過は要見積り）。Cross Talk は非公開（要問い合わせ）"),
      C("CRM連携", "HubSpot / Salesforce ネイティブ連携", "会員・CRMデータの取込によるパーソナライズ（SFA/CRMネイティブ連携の公式記載は確認できず）", true),
    ],
    chooseMeeton: [
      "B2Bのリード獲得〜商談化まで、サイト内広告を起点に一気通貫で自動化したい",
      "セグメントのルール設定やABテストの運用工数をかけず、出し分け・最適化をAIに任せたい",
      "HubSpot / Salesforce と連携し、獲得したリードをそのまま商談化パイプラインに乗せたい",
    ],
    chooseCompetitor: [
      "EC/D2C・小売・旅行など、購入CVRの改善が主目的（Flipdeskの実績が厚い領域）",
      "クーポン・カウントダウン・ヒートマップなどWeb接客の道具箱を幅広く使いたい",
      "初期5万円＋月額5万円（税抜）の公開価格でスモールスタートしたい",
    ],
    faq: [
      { q: "Flipdesk と Meeton Ads の違いは？", a: "Flipdesk はポップアップ・バナー・クーポンなどを約30項目のセグメント条件でルール設定して出し分ける国産Web接客ツールで、1,600社超の導入実績があります。Meeton Ads は自社サイトを広告枠と捉え、AIが訪問者ごと（ページ・流入元・業種）に最適なオファーを選び、クリック・リード獲得を報酬に配信を自動学習するサイト内広告です。ECのCVR改善が目的なら Flipdesk、B2Bのリード獲得〜商談化なら Meeton Ads が向きます。" },
      { q: "Flipdesk の料金はいくらですか？", a: "Flipdesk の Standard プランは初期費用5万円＋月額5万円（いずれも税抜）で月80万PVまで、超過する場合は要見積りです（2026年時点の公式公開価格）。チャットボットの Cross Talk は別料金で、公式サイトに価格の公開はなく要問い合わせです（二次情報の価格は情報源間で一致せず）。Meeton ai は基本プラン15万円〜＋アドオンで料金を公開しています。" },
      { q: "Flipdesk にAI機能はありますか？", a: "あります。2024年3月に生成AI機能（自然文からシナリオを作る「シナリオAI作成」、バナーHTMLを自動生成する「AIコード」、フリーテキストに対応するAI FAQボット）が追加されました。ただし配信の出し分け自体はルール設定型で、商談予約やリードのクオリフィケーション機能は確認できません。Meeton Ads は配信最適化そのものをAIが担い、Meeton Calendar と繋いで商談予約まで自動化する点が異なります。" },
    ],
    sources: [
      { claim: "Flipdesk はポップアップ・バナー・クーポン・ABテスト・ヒートマップ等のWeb接客。約30項目のセグメント条件で出し分け。1,600社・2,000サイト超、アスクル・三越伊勢丹（meeco）等の導入実績", source: "materialdigital.jp/service/flipdesk, materialdigital.jp/case/flipdesk" },
      { claim: "Standardプランは初期費用5万円＋月額5万円（税抜）・月80万PVまで、超過は要見積り（公式公開価格）", source: "materialdigital.jp/service/flipdesk/price_opiton" },
      { claim: "Cross Talk はシナリオ・QA・アンケート型チャットボット（有人チャット連携あり）。公式ページに商談予約・CRM連携の記載なし。料金は公式非公開で、二次情報間でも価格が一致しない（2026年7月確認）", source: "materialdigital.jp/service/crosstalk, it-trend.jp/chatbot/11285" },
      { claim: "2024年3月に生成AI機能（シナリオAI作成・AIコード・AI FAQボット）を追加", source: "materialgroup.jp/news/20240301, support.materialdigital.jp/manual/ai_suggestion" },
      { claim: "運営は株式会社マテリアルデジタル（2023年7月末に株式会社フリップデスクから社名変更、Material Group傘下）。ITreview 4.2/5（167件）", source: "materialgroup.jp/news/20230731, itreview.jp/products/flipdesk/profile" },
    ],
  },

    "channel-talk": {
    slug: "channel-talk",
    competitorName: "チャネルトーク",
    product: "chat",
    productName: "Meeton Chat",
    category: "接客チャット / CRM",
    metaTitle: "チャネルトーク の料金・違いとAI代替｜Web接客×商談化で比較｜Meeton",
    metaDescription:
      "チャネルトークはLINE連携やEC向け機能が充実し無料から使える接客チャット/CRM。Meeton Chat は新規・潜在リードの商談化に特化したAIチャット（初動5秒・24時間365日）。接客・サポートか、商談獲得かで使い分けを比較表で解説。",
    verdict:
      "EC/D2CサイトでLINE・Instagramと繋いだ接客・購入支援や、サポート問い合わせの自動化を低コストで始めたいなら、日本での実績が厚いチャネルトークは有力です。B2Bサイトの新規・潜在訪問者を会話で掴み、予約・追客まで含めて「商談化」したいなら Meeton Chat が向きます。接客か、商談獲得かで選ぶのが適切です。",
    competitorStrength:
      "チャネルトークは日本法人設立から10年以上、全世界22万社以上（自社公表）が利用する接客チャット/CRMです。LINE・Instagram DMのネイティブ連携やShopify・Cafe24・カラーミーショップ向けアプリなどEC向けの作り込みが深く、AIエージェント「ALF」はAIが自律解決したチャットにのみ課金される買い手に優しい従量モデル。無料プランから始められる導入ハードルの低さも明確な強みです。",
    rows: [
      C("主目的", "新規・潜在リードの商談化（AI SDR）", "接客チャットを軸にした顧客コミュニケーション統合"),
      C("AI会話の設計", "温度を上げ予約まで運ぶ（初動5秒・24時間365日）", "ALFが問い合わせを自律解決（サポート中心）", true),
      C("カバー範囲", "会話＋資料＋予約＋追客の商談化一気通貫", "チャット＋社内チャット＋CRMマーケ（日程予約機能は非搭載）", true),
      C("SFA/CRM連携", "HubSpot / Salesforce ネイティブ連携", "自社CRM（MU）内蔵・LINE / Instagram / EC系連携が充実", true),
      C("料金", "基本プラン15万円〜＋アドオン（公開）", "無料〜Growth ¥9,600/月＋MU数・AI解決数の従量（公開）"),
      C("得意領域", "B2Bサイトの商談獲得・日本語ネイティブ", "EC/D2Cの接客・購入支援・サポート"),
    ],
    chooseMeeton: [
      "B2Bサイトの訪問者を会話で掴み、予約・追客まで含めて商談化したい",
      "HubSpot / Salesforce を軸にした営業プロセスに自動で乗せたい",
      "JSタグ1行・5分で導入し、商談化率60%+（EdulinX）のような商談獲得の成果を狙いたい",
    ],
    chooseCompetitor: [
      "EC/D2CサイトでLINE・Instagram・Shopify等と繋いだ接客・購入支援をしたい",
      "サポート問い合わせの自律解決と社内チャット・CRMマーケまで1つにまとめたい",
      "まず無料〜月数千円で接客チャットを小さく始めたい",
    ],
    faq: [
      { q: "チャネルトークと Meeton Chat の違いは何ですか？", a: "チャネルトークは接客チャット・顧客CRM・社内チャット・CRMマーケティングを1つにまとめたオールインワンで、LINE・InstagramやShopify等のEC向け連携が充実し、EC/D2Cの接客・サポートに強みがあります。Meeton Chat はB2Bサイトの新規・潜在リードの『商談化』に特化したAIチャットで、初動5秒・24時間365日の会話で温度を上げ、予約・追客まで同じプラットフォームで運びます。接客・サポートならチャネルトーク、商談獲得なら Meeton が向きます。" },
      { q: "チャネルトークの料金はいくらですか？", a: "無料プランのほか、Early Stage ¥3,600/月〜・Growth ¥9,600/月〜（税抜、年払い割引あり）の公開料金で、MU（保存連絡先数）に応じてプランが決まります。加えてAIエージェント『ALF』はAIが自律解決したチャット1件につき¥50などの従量課金が別途かかります（2026年時点）。Meeton ai は基本プラン15万円〜＋アドオン（税抜）の公開料金です。" },
      { q: "B2Bの商談獲得にはどちらが向いていますか？", a: "チャネルトークにもチャットを使ったインサイドセールスの事例（ランサーズ）はありますが、製品の中心はEC/D2Cの接客・サポートで、日程予約機能は搭載されていません。Meeton Chat は商談獲得のためのAI SDRとして設計され、導入企業では商談化率60%以上（EdulinX）、チャット経由リード20倍（BizteX）、月間SQL2倍（G-gen）の実績があります。B2Bの商談獲得が主目的なら Meeton、接客との兼用ならチャネルトークも選択肢です。" },
    ],
    sources: [
      { claim: "チャネルトークは無料 / Early Stage ¥3,600/月 / Growth ¥9,600/月（税抜、年払い割引あり）の公開料金。MU（保存連絡先）数に応じたプランで、Enterpriseは要問い合わせ", source: "channel.io/jp/pricing, itreview.jp/products/channeltalk/price" },
      { claim: "AIエージェント「ALF」はAIが自律解決したチャットのみ¥50/件の従量課金。RAGで資料を学習し33言語・24時間対応", source: "channel.io/jp/pricing, docs.channel.io/help/en/articles/What-is-ALF--541f14b8" },
      { claim: "全世界22万社以上が利用・継続率98%（自社公表）。日本法人は2015年1月設立、ISO系情報セキュリティ認証4種", source: "prtimes.jp/main/html/rd/p/000000144.000029184.html, korit.jp" },
      { claim: "LINE・Instagram DM連携とShopify / Cafe24 / カラーミーショップ向けアプリを提供。ランサーズのチャットインサイドセールス事例も公表", source: "prtimes.jp/main/html/rd/p/000000041.000029184.html, channel.io/ja/blog/articles/case-lancers-0bf5304a" },
    ],
    alternative: true,
  },

    "hubspot-chatbot": {
    slug: "hubspot-chatbot",
    competitorName: "HubSpot Chatflows / Breeze",
    product: "chat",
    productName: "Meeton Chat",
    category: "チャットボット / CRM一体チャット",
    metaTitle: "HubSpotチャットボットの料金・違い｜商談化チャットで比較｜Meeton",
    metaDescription:
      "HubSpotのチャットボット（Chatflows / Breeze）は無料枠から使えるCRM一体のチャット基盤。Meeton Chat は商談化特化のAIチャットで、HubSpot CRMにネイティブ連携し置き換えなしで併用可能。役割の違いと使い分けを比較表で解説。",
    verdict:
      "既に HubSpot をお使いで、まず無料枠のライブチャットや既存顧客のサポート自動化（Breeze Customer Agent）から始めたいなら、HubSpot 純正のチャット機能が自然な選択です。サイト来訪者との会話を「商談化」まで運ぶAIを求めるなら、HubSpot CRM にネイティブ連携する Meeton Chat が向きます。両者は置き換えではなく、CRM＋サポートは HubSpot、商談化チャットは Meeton という役割分担での併用が可能です。",
    competitorStrength:
      "HubSpot は有料顧客299,458社（2026年3月末）・2025年通期売上約$3.13Bの世界的CRMプラットフォームです。チャット/Botの対話がコンタクトタイムライン・プロパティ・ワークフローにそのまま反映されるCRMネイティブ統合は純正ならではの強みで、無料枠からライブチャット＋簡易Botを始められる導入ハードルの低さ、成果報酬課金化（2026年4月）やWarmly買収発表（2026年6月）などAI領域への投資スピードも際立ちます。",
    rows: [
      C("主目的", "新規・潜在リードの商談化（AI SDR）", "CRM一体のチャット窓口（Chatflows）＋サポート自動解決（Breeze）"),
      C("AI会話", "AIが自然な対話で温度を上げ予約まで運ぶ", "Chatflowsは決定木型、Breezeはサポート解決に特化", true),
      C("チャット内予約", "会話の流れでヒアリング〜予約まで完結（初動5秒）", "予約リンクの提示が基本（カスタム項目は予約ページへ遷移）", true),
      C("CRM連携", "HubSpot / Salesforce ネイティブ連携（会話・商談を自動登録）", "HubSpot CRM そのもの（タイムライン自動記録）"),
      C("料金", "基本プラン15万円〜＋アドオン（公開）", "無料枠あり。高度機能はHub上位プラン＋Breezeは解決課金（$0.50/件）"),
      C("提供", "国産・日本語ネイティブ設計", "グローバル製品・日本語ローカライズ（日本法人あり）"),
    ],
    chooseMeeton: [
      "HubSpot CRM は維持したまま、サイト来訪者の商談化チャットを強化したい（ネイティブ連携で併用）",
      "決定木でなくAIの自然な対話で温度を上げたい（EdulinX社で商談化率60%+）",
      "会話の流れの中でヒアリングから予約まで完結させたい（24時間365日・初動5秒）",
    ],
    chooseCompetitor: [
      "まず無料枠のライブチャット＋簡易Botで小さく始めたい",
      "既存顧客のサポート問い合わせの自動解決が主目的（Breeze Customer Agent）",
      "マーケ・営業・サポートを HubSpot 単一プラットフォームに揃えたい",
    ],
    faq: [
      { q: "HubSpot のチャットボットと Meeton Chat は併用できますか？", a: "併用できます。Meeton Chat は HubSpot CRM とネイティブ連携しており、チャットの会話や獲得した商談はコンタクトのタイムラインに自動登録されます。HubSpot を CRM・サポート基盤として使い続けながら、サイト来訪者の商談化チャットだけを Meeton Chat で強化する役割分担が可能で、置き換えは不要です。導入はJSタグ1行・約5分です。" },
      { q: "HubSpot Chatflows / Breeze と Meeton Chat の違いは？", a: "HubSpot の Chatflows は無料枠から使える決定木型Bot＋ライブチャット、Breeze Customer Agent はナレッジベース等を参照して問い合わせを自動解決するサポート特化のAIエージェントです。Meeton Chat は新規・潜在リードの商談化に特化し、AIが自然な対話で温度を上げ、初動5秒で会話を始めて予約まで運びます。サポート自動化なら HubSpot、商談化なら Meeton が向きます。" },
      { q: "料金はどう違いますか？", a: "HubSpot の Chatflows は無料枠から始められ、高度な機能は Professional 以上（例: Service Hub Professional $90/seat/月）が必要です。Breeze Customer Agent は2026年4月14日から解決1件あたり50クレジット（$0.50）の成果報酬課金に移行しています。Meeton ai は基本プラン15万円〜＋アドオン（税抜）で料金を公開しています。" },
    ],
    sources: [
      { claim: "ChatflowsはHubSpot無料CRMに含まれるライブチャット＋ルールベースBot。高度な分岐・ワークフロー連携はProfessional以上", source: "resonatehq.com/blog/hubspot-chatbot-guide, hubspot.com/pricing/marketing" },
      { claim: "Bot内の予約はミーティングリンクの提示が基本で、カスタムフォーム項目がある場合はチャット内で完結せず予約ページへリダイレクトされる", source: "knowledge.hubspot.com/chatflows/a-guide-to-bot-actions" },
      { claim: "Breeze Customer Agentはナレッジベース等を参照して問い合わせを自動解決するサポート特化AI。2026年4月14日より解決1件50クレジット（$0.50）の成果報酬課金へ移行", source: "hubspot.com/products/artificial-intelligence/breeze-ai-agents, hubspot.com/company-news/hubspots-customer-agent-and-prospecting-agent-now-you-pay-when-the-task-is-complete" },
      { claim: "Service HubはStarter $7/seat・Professional $90/seat・Enterprise $150/seat。月次クレジットはStarter 500 / Professional 3,000 / Enterprise 5,000", source: "hubspot.com/pricing/service" },
      { claim: "2026年6月30日、Warmly（匿名訪問者特定＋能動的エンゲージメントAI）の買収を発表。統合は長期的取り組みで発表時点では未統合", source: "warmly.ai/p/blog/warmly-is-joining-hubspot" },
      { claim: "有料顧客299,458社（2026年3月末時点）、2025年通期売上約$3.13B", source: "ir.hubspot.com" },
    ],
  },

  'drift': {
    slug: "drift",
    competitorName: "Drift（Salesloft）",
    product: "chat",
    productName: "Meeton Chat",
    category: "会話型マーケティング",
    metaTitle: "Drift の料金・違いとAI代替｜会話型マーケで比較｜Meeton",
    metaDescription:
      "Drift は会話型マーケティングを創出した米国SaaSだが、2026年3月に Salesloft が段階的サンセットを発表。Meeton Chat は日本語ネイティブ・初動5秒のAI会話から商談化・追客まで一気通貫のAI SDR。移行先候補として比較表で解説。",
    verdict:
      "既に Salesloft をアウトバウンド営業基盤として標準採用しており、後継の 1mind への移行パスも含めて同一エコシステムで買い手シグナルを扱いたいエンタープライズなら、Drift（Salesloft）系譜は今も検討対象です。ただし Drift 自体は2026年3月に段階的サンセットが公式発表されています。日本語でチャット→商談化→追客を新規に立ち上げる、あるいは Drift からの移行先を探すなら、提供継続中の Meeton Chat が現実的な選択です。",
    competitorStrength:
      "Drift は「カンバセーショナルマーケティング」というカテゴリーそのものを創出した先駆者で、Salesloft による買収時点で両社合わせグローバル約6,000社の顧客基盤を持ちました。10年近くかけて磨かれた ABM・アカウントルーティング、Salesloft のケイデンス基盤とのネイティブ統合、広範なサードパーティ連携エコシステムは、エンタープライズのアカウントベース営業で高く評価されてきた本物の資産です。",
    rows: [
      C("主目的", "会話→予約→資料→追客までの商談化（AI SDR）", "会話型マーケティング（チャット＋ABMルーティング）", true),
      C("AI会話", "初動5秒・24時間365日のAI対話", "AIチャットボット＋ライブチャット/予約へのルーティング"),
      C("カバー範囲", "チャット＋サイト内広告＋資料＋予約＋追客を一気通貫", "チャット＋ABM（追客メールは Salesloft 側の別製品）", true),
      C("料金", "基本プラン15万円〜＋アドオン（公開）", "非公開（要問い合わせ）", true),
      C("CRM連携", "HubSpot / Salesforce ネイティブ連携", "Salesloft ネイティブ＋広範な連携エコシステム"),
      C("提供状況", "提供・開発継続中（国産・日本語ネイティブ）", "2026年3月に段階的サンセット発表（後継は 1mind）", true),
    ],
    chooseMeeton: [
      "チャット・広告・資料・予約・追客を1つのAI SDRで完結させたい（JSタグ1行・5分で導入）",
      "日本語ネイティブ＋初動5秒・24時間365日のAI会話で商談化したい（EdulinX 商談化率60%+、BizteX チャットリード20倍）",
      "公開料金（基本プラン15万円〜）と提供継続性、ISO27001/27017 の国産基盤を重視したい",
    ],
    chooseCompetitor: [
      "既に Salesloft をアウトバウンド営業のケイデンス基盤として標準採用しており、買い手会話シグナルを同一エコシステム内で扱いたい",
      "既存の Drift ユーザーで、公式後継である 1mind への移行パスを前提に当面の継続利用を考えている",
      "英語圏中心のエンタープライズ ABM で、成熟したアカウントルーティング資産を移行完了まで活かしたい",
    ],
    faq: [
      { q: "Drift はサービス終了するのですか？", a: "はい。Drift は2024年2月に Salesloft に買収された後、2026年3月に Salesloft が AIエージェント企業 1mind との提携とあわせて Drift の「段階的サンセット」を公式発表し、既存顧客を後継製品として 1mind へ案内しています。2026年7月時点で drift.com は salesloft.com/platform/drift へリダイレクトされ、同ページには『We've transitioned from Drift to 1mind』と明記されています。新規導入は事実上推奨されない状況です。" },
      { q: "Drift と Meeton Chat の違いは？", a: "Drift は会話型マーケティングの先駆で、チャットと ABM ルーティングに強みがありますが、追客メールは Salesloft 側の別製品で、日本語ローカライズや国内サポート体制の証跡はありません（ITreview のレビューも3件・満足度2.1/5にとどまります）。Meeton Chat は日本語ネイティブの AI SDR で、初動5秒・24時間365日のAI会話から資料提案・商談予約・追客まで一気通貫。HubSpot / Salesforce にネイティブ連携し、導入は JSタグ1行・5分です。" },
      { q: "Drift の料金はいくらですか？", a: "非公開（要問い合わせ）です。Salesloft / Drift とも金額を明記した公式の価格ページはありません（2026年時点）。Meeton ai は基本プラン15万円〜＋アドオン（商談化・追客 各5万円/月）で料金を公開しています。" },
    ],
    sources: [
      { claim: "2026年3月6日、Clari + Salesloft が 1mind との提携を発表し Drift の段階的サンセットを公式確認。drift.com は salesloft.com/platform/drift へリダイレクトされ「We've transitioned from Drift to 1mind」と明記", source: "salesloft.com/company/newsroom/1-mind-partnership, salesloft.com/platform/drift" },
      { claim: "2024年2月13日、Salesloft が Drift を買収。統合後の顧客基盤はグローバル約6,000社", source: "salesloft.com/company/newsroom/salesloft-acquires-drift" },
      { claim: "料金は非公開（要問い合わせ）。金額を明記した公式価格ページなし", source: "salesloft.com/platform/drift, help.salesloft.com" },
      { claim: "日本語ローカライズ・日本拠点サポートの証跡なし。ITreview のレビューは3件・満足度2.1/5", source: "itreview.jp/products/drift/profile" },
    ],
    alternative: true,
  },

  'qualified': {
    slug: "qualified",
    competitorName: "Qualified (Piper)",
    product: "chat",
    productName: "Meeton Chat",
    category: "AI SDR / 商談化チャット",
    metaTitle: "Qualified の料金・違いとAI代替｜AI商談化チャットで比較｜Meeton",
    metaDescription:
      "Qualified（Piper AI SDR）はSalesforceネイティブのエンタープライズ向けAgentic Marketing基盤。2026年4月にSalesforceが買収。Meeton Chat は日本語ネイティブ・公開料金で会話→予約→追客まで一気通貫。CRMスタックと市場で使い分け。",
    verdict:
      "Salesforceを基幹CRMとするエンタープライズで、CRMデータと深く連動した来訪者エンゲージメント（チャット・音声・ビデオ）を求めるなら、Salesforce傘下となった Qualified（Piper）は最有力です。日本語ネイティブの製品・サポートと公開料金で、会話から資料・予約・追客まで国内で一気通貫に商談化したいなら Meeton Chat が向きます。",
    competitorStrength:
      "Qualified は元Salesforce幹部が創業し、Salesforce Platform上にネイティブ構築されたAI SDR「Piper」を提供。チャット・音声・ビデオの3モダリティでの会話体験と、Salesforceのリード・商談・カスタムオブジェクトまで読み書きする統合の深さは競合の中でも突出しています。公式サイトで500社超の導入を掲げ、2026年4月にSalesforceによる買収が完了（対価公正価値$1.2B）。Agentforceへの統合が進む、資金力と実績に裏付けられたエンタープライズの本命です。",
    rows: [
      C("主目的", "新規・潜在リードの商談化（チャット起点のAI SDR）", "Salesforce前提のAgentic Marketing（Piper AI SDR）"),
      C("AI会話", "AIチャットが初動5秒・24時間365日で応答", "チャット・音声・ビデオの3モダリティで会話"),
      C("カバー範囲", "会話＋広告＋資料＋予約＋追客を一気通貫", "来訪者エンゲージメント中心（2026年にoutbound用「Hunter」を追加）"),
      C("料金", "基本プラン15万円〜＋アドオン（公開）", "非公開（要問い合わせ・デモ予約必須）", true),
      C("CRM連携", "HubSpot / Salesforce ネイティブ連携", "Salesforceネイティブ（カスタム項目まで深く読み書き）"),
      C("日本での提供", "国産・日本語ネイティブ・国内サポート", "独自の日本法人・日本語料金は未確認（Salesforce Japan経由で体験公開）", true),
    ],
    chooseMeeton: [
      "日本語ネイティブの製品・サポートで商談化チャットを立ち上げたい",
      "公開料金（基本プラン15万円〜＋アドオン）で稟議・比較検討を進めたい",
      "HubSpot中心などSalesforce以外のCRMスタックでも、JSタグ1行・5分で導入したい",
    ],
    chooseCompetitor: [
      "Salesforceが基幹CRMで、CRMデータと深く連動したエンゲージメントを求めるエンタープライズ",
      "チャットに加え音声・ビデオでのリアルタイム会話体験まで必要",
      "Agentforceエコシステムへの統合を見据えたSalesforce中心の投資をしたい",
    ],
    faq: [
      { q: "Qualified（Piper）とはどんな製品ですか？", a: "Qualified は米国発のAgentic Marketingプラットフォームで、AI SDR「Piper」がWebサイト来訪者とチャット・音声・ビデオで会話し、リード見極めから商談予約・AIメールまで自律的に実行します。Salesforce Platform上にネイティブ構築されており、2026年4月にSalesforceによる買収が完了、「Qualified from Salesforce」としてAgentforceへの統合が進んでいます。2026年6月にはoutbound向けのProspecting Agent「Hunter」（コンタクト特定＋メールシーケンス）も発表され、インバウンド専用ではなくなっています。" },
      { q: "Qualified の料金はいくらですか？", a: "Qualified の料金は非公開です。公式にはPremier / Enterprise / Ultimateの3プランと機能差分のみが公開されており、金額はデモ予約後のカスタム見積もりとなります（2026年時点）。Meeton ai は基本プラン15万円〜＋アドオン（商談化・追客 各5万円/月）で料金を公開しています。" },
      { q: "Qualified は日本語・日本市場に対応していますか？", a: "Piperの会話機能は多言語対応を謳っており、2026年6月のAgentforce World Tour Tokyoに合わせてSalesforce Japan公式サイト上で日本語で体験できる形が公開されました。ただし、Qualified独自の日本法人・日本語サポート体制・日本向け料金ページは確認されていません（2026年7月時点）。日本語ネイティブの製品・サポートを前提にするなら、国産の Meeton Chat が現実的な選択肢です。" },
    ],
    sources: [
      { claim: "PiperはWebサイト来訪者とチャット・音声・ビデオで会話し、Salesforce CRMデータを読み書きして商談予約・AIメールまで実行。料金はPremier/Enterprise/Ultimateの3プラン構成で金額非公開（要問い合わせ）", source: "qualified.com/pricing, qualified.com/ai-sdr, qualified.com/salesforce" },
      { claim: "2026年4月にSalesforceによる買収が完了（取得対価公正価値$1.2B、Salesforce FY2027 Q1 10-Q開示）。「Qualified from Salesforce」としてAgentforce Sales/Marketingへの統合が進行中。公式サイトは500社超の導入を表示", source: "sec.gov/Archives/edgar (crm-20260430), salesforceben.com, qualified.com" },
      { claim: "2026年6月のSalesforce Connectionsでoutbound向けProspecting Agent「Hunter」を発表（コンタクト特定・アウトリーチ・メールナーチャー）。Piperを補完するアウトバウンド機能として提供", source: "salesforceben.com/how-many-ai-agents-is-too-many-salesforce-adds-four-more-at-connections" },
      { claim: "2026年6月、Agentforce World Tour Tokyoに合わせSalesforce Japan公式サイトでPiperを日本語で体験公開。Qualified独自の日本法人・日本語料金体系は確認できず", source: "salesforce.com/jp/blog/jp-inside-sales-ai-agent-piper" },
    ],
    alternative: true,
  },

  'warmly': {
    slug: "warmly",
    competitorName: "Warmly",
    product: "chat",
    productName: "Meeton Chat",
    category: "訪問者特定・シグナル営業",
    metaTitle: "Warmly の料金・違いとAI代替｜訪問者特定×チャットで比較｜Meeton",
    metaDescription:
      "Warmly は匿名の訪問者を特定しウォームな営業接触につなげる米国製GTMプラットフォーム（2026年6月にHubSpotへの参画を発表）。Meeton Chat は日本語ネイティブで会話→予約→追客まで一気通貫のAI SDR。料金・機能・日本対応を公開情報で比較。",
    verdict:
      "英語圏のB2Bサイトで匿名トラフィックを特定し、ウォームなアウトバウンド接触に変えたいなら、専業として完成度の高い Warmly は有力な選択肢です。日本語のサイトで、AIの会話からそのまま予約・追客まで商談化を完結させたいなら Meeton Chat が向きます。両者は解いている課題が異なります。",
    competitorStrength:
      "Warmly はサイト訪問者の匿名解除を核とする米国製GTMプラットフォームです。約3秒の特定パイプライン、個人15-30%・企業30-60%という具体的なマッチ率を自ら公開する技術的な実直さがあり、特定後はチャット・Slack通知・メール・LinkedIn/Meta広告まで1つで接続します。500以上のGTMチームが利用し、G2 4.6/5（208件）・累計約$17M調達、2026年6月30日にはHubSpotへの参画（買収）を発表するなど、プロダクトの市場適合が裏付けられた選択肢です。",
    rows: [
      C("主目的", "会話→予約→資料→追客の商談化（AI SDR）", "訪問者の匿名解除→ウォームな外向き接触（チャット/メール/広告）"),
      C("AI会話の提供", "基本プランから搭載。初動5秒・24時間365日", "Inbound Chat（$20,000/年）以上で提供。エントリープランは特定のみ", true),
      C("訪問者の特定", "会話を通じて訪問者自身から情報を取得", "220M+件の照合で企業30-60%・個人15-30%を約3秒で特定"),
      C("日本語・国内対応", "国産・日本語ネイティブ。ISO27001/27017", "英語のみ。日本語UI・国内サポートの公開情報なし", true),
      C("料金", "基本プラン15万円〜＋アドオン（公開・月額）", "$10,000〜30,000/年＋アドオン（公開・年/四半期契約）"),
      C("CRM連携", "HubSpot / Salesforce ネイティブ連携", "CRM同期・Slack通知・リードルーティング（HubSpot参画を発表）"),
    ],
    chooseMeeton: [
      "日本語サイトの訪問者と会話し、そのまま予約・追客まで商談化を完結させたい（EdulinX で商談化率60%+）",
      "基本プランからAIチャットを使いたい（初動5秒・24時間365日、JSタグ1行・5分で導入）",
      "月額の公開価格（基本プラン15万円〜）と ISO27001/27017 で国内の稟議を通したい",
    ],
    chooseCompetitor: [
      "英語圏のB2B SaaSで、匿名Webトラフィックの特定→ウォームなアウトバウンドが主戦略",
      "Slack通知・メールシーケンス・LinkedIn/Meta リターゲティングまで一体で回す米国型GTMチーム",
      "HubSpot エコシステムへの深い統合を見据えたい（2026年6月に買収参画を発表済み）",
    ],
    faq: [
      { q: "Warmly と Meeton Chat の違いは何ですか？", a: "Warmly は匿名のサイト訪問者を企業・個人レベルで特定し（公称：企業30-60%・個人15-30%、約3秒）、チャット・メール・広告リターゲティングでウォームに接触する米国製のGTMプラットフォームです。Meeton Chat は日本語ネイティブのAI SDRで、初動5秒のAI会話から予約・資料提案・追客まで一気通貫で商談化します。匿名層への外向きの接触が主目的なら Warmly、日本語サイトのインバウンド商談化なら Meeton が向きます。" },
      { q: "Warmly の料金はいくらですか？", a: "公式料金ページで公開されており、AI Web-Deanonymization $10,000/年、Inbound Chat $20,000/年、AI Inbound Autopilot $30,000/年の3プラン＋アドオン（各$10,000/年）です（2026年7月時点、年または四半期契約）。AIチャットは $20,000/年のプラン以上で提供されます。Meeton ai は基本プラン15万円〜＋アドオン（税抜・月額）で料金を公開しています。" },
      { q: "Warmly は HubSpot に買収されたのですか？", a: "Warmly は2026年6月30日、HubSpot への参画（買収）を自社ブログで発表し、独立系メディアも報じています（買収条件は非公開）。同社は既存の契約・価格・製品は当面変更なしと説明していますが、長期的には HubSpot プラットフォームへの統合を掲げており、独立製品としてのロードマップは今後変わる可能性があります。" },
    ],
    sources: [
      { claim: "料金は公開: AI Web-Deanonymization $10,000/年、Inbound Chat $20,000/年、AI Inbound Autopilot $30,000/年＋アドオン各$10,000/年。無料プランは現行ページに記載なし。AIチャットは$20,000/年プラン以上", source: "warmly.ai/p/pricing" },
      { claim: "訪問者特定は約3秒・220M+件照合、マッチ率は個人15-30%・企業30-60%を公称。特定後はチャット・Slack通知・メール・LinkedIn/Meta広告に接続", source: "warmly.ai/p/solutions/use-cases/website-visitor-identification" },
      { claim: "2026年6月30日、HubSpotへの参画（買収）を発表（条件非公開）。既存契約・価格・製品は当面変更なしと自社説明、独立メディアも報道", source: "warmly.ai/p/blog/warmly-is-joining-hubspot, cmswire.com" },
      { claim: "2020年サンフランシスコ創業（YC）、約60名、累計約$17M調達。500以上のGTMチームが利用、G2 4.6/5（208件）", source: "ycombinator.com/companies/warmly, g2.com/products/warmly-warmly/reviews" },
      { claim: "公式サイト・製品・料金ページは英語のみで、日本語UI・国内サポート・国内事例の公開情報は確認できず。ISO/ISMS認証の記載なし（GDPR準拠を表明）", source: "warmly.ai" },
    ],
    alternative: true,
  },

  'fin': {
    slug: "fin",
    competitorName: "Fin",
    product: "chat",
    productName: "Meeton Chat",
    category: "AIエージェント・カスタマーサービスAI",
    metaTitle: "Fin（旧Intercom）代替の料金・違い｜サポートAIと商談化AI SDRで比較｜Meeton Chat",
    metaDescription:
      "Fin（旧Intercom）は問い合わせを自動解決するカスタマーサービスAIエージェントの代表格。Meeton Chat はWebサイト訪問者のリード獲得〜商談予約に特化したAI SDR。サポート自動化か商談獲得かの使い分けを比較表で解説。",
    verdict:
      "既存顧客のサポート問い合わせを多チャネルでAIに自動解決させたいなら、サポート会話特化の独自モデルと大規模実績を持つ Fin が第一候補です。Webサイトの新規訪問者を会話で掴み、商談予約まで運びたいなら Meeton Chat が向きます。Fin for Sales（2026年4月提供開始）はインバウンド限定の拡張機能で、アウトバウンド開拓やメール追客までは覆いません。両者は解く課題（サポート解決 vs リード獲得・商談化）が異なります。",
    competitorStrength:
      "Fin は「AIエージェント時代のヘルプデスク」を掲げる旧 Intercom（2026年5月に社名を Fin へ変更）のカスタマーサービスAIで、サポート会話に特化して追加学習した独自モデルにより公称76%の平均解決率を掲げます（自社発表）。Web・メール・音声・WhatsApp 等10以上のチャネルを横断し、Salesforce / HubSpot / Freshworks 等の既存ヘルプデスクの上に単体導入できる柔軟性も強みです。2026年6月には Salesforce が約36億ドルでの買収に合意しており、エンタープライズでの信頼性の裏付けがある一方、統合移行期のロードマップには不確実性が残ります。",
    rows: [
      C("主目的", "Web訪問者のリード獲得→商談予約（AI SDR）", "サポート問い合わせのAI自動解決（カスタマーサービス）"),
      C("対象部門", "マーケティング・インサイドセールス", "カスタマーサポート/CS部門（営業機能は拡張中の位置付け）"),
      C("リード獲得・商談予約", "初動5秒・24時間365日で会話→予約まで自動（商談化率60%+の実績）", "Fin for Sales はインバウンドのみ。予約は Calendly / Chili Piper 連携、アウトバウンド・メール追客は非対応", true),
      C("料金モデル", "基本プラン月15万円〜（税抜・公開・固定）", "従量課金 $0.99/成果 + $9.99/商談化、Intercom席料 $39〜139/席/月が別途（USDのみ）", true),
      C("日本語対応", "日本語ネイティブ設計・日本のチームが提供", "管理画面は日本語対応（2025年4月〜）。AI応答は日本語学習コンテンツ追加が前提、日本法人なし・円建てなし", true),
      C("CRM連携", "HubSpot / Salesforce ネイティブ連携（リード自動登録）", "Salesforce / HubSpot / Freshworks 等ネイティブ連携（成熟。買収完了後は Agentforce へ統合予定）"),
    ],
    chooseMeeton: [
      "Webサイト訪問者をリード化し、商談予約まで自動で運びたい（商談化率60%+・チャットリード20倍の事例）",
      "従量課金でなく、公開された月額固定（基本プラン15万円〜）で予算を確定させたい",
      "JSタグ1行・5分で導入し、HubSpot / Salesforce にリードを自動登録したい",
    ],
    chooseCompetitor: [
      "既存顧客のサポート問い合わせを音声・WhatsApp 含む10以上のチャネルで大量に自動解決したい",
      "既存ヘルプデスク（Salesforce / HubSpot / Freshworks 等）を替えずにサポートAIだけ載せたい",
    ],
    faq: [
      { q: "Fin（旧Intercom）と Meeton Chat の違いは何ですか？", a: "Fin は問い合わせをAIが自動解決するカスタマーサービスAIエージェントで、公称76%の平均解決率を掲げます（自社発表）。2026年4月に Fin for Sales を追加しましたが、対象はサイト上で意図を示したインバウンド訪問者に限定され、アウトバウンド開拓や単体のメールナーチャリングは非対応と自社FAQに明記されています。Meeton Chat はWebサイト訪問者のリード獲得〜商談予約に特化したAI SDRで、初動5秒・24時間365日で会話し、商談化率60%+（EdulinX事例）の実績があります。サポート自動化なら Fin、リード獲得・商談化なら Meeton が向きます。なお Fin は2026年6月に Salesforce による約36億ドルでの買収合意が発表され、Agentforce への統合が予定されています。" },
      { q: "Fin の料金はいくらですか？Meeton ai とどう違いますか？", a: "Fin は成果課金で、解決・引き継ぎ・失格判定が $0.99/件、Fin for Sales の商談化（Qualification）が $9.99/件です。Intercom 上で使う場合は席料（月払 $39〜139/席、年払 $29〜132）が別途かかり、既存ヘルプデスク上での単体利用は月50成果〜（約$49/月〜）。請求はUSDのみで日本円建てはありません。Meeton ai は基本プラン月15万円〜（税抜）の公開・固定型で、会話量に左右されず月々の予算が読みやすい体系です。" },
      { q: "Fin は日本語・日本市場に対応していますか？", a: "Fin の管理画面は2025年4月に日本語対応し、AI自体は日本語を含む45以上の言語に対応しますが、日本語の回答品質はワークスペースに日本語の学習コンテンツを追加する運用が前提です。Fin 直営の日本法人・日本語サポート組織は確認されておらず、国内の導入支援は正規代理店（INNOOV株式会社）経由、請求はUSDのみです。Meeton ai は日本語ネイティブ設計で、日本のチームが提供・サポートします。" },
    ],
    sources: [
      { claim: "Fin for Sales は2026年4月22日提供開始。サイト上の意図シグナル起点でインバウンド訪問者に会話・資格判定し、Calendly / Chili Piper 連携で予約、CRMへ連携。アウトバウンド開拓や単体のメールナーチャリングは非対応と自社FAQに明記", source: "intercom.com/blog/announcing-fin-for-sales, intercom.com/help/en/articles/13927115" },
      { claim: "料金は成果課金 $0.99/件（解決・引き継ぎ・失格判定）+ $9.99/商談化。Intercom 席料 Essential $39 / Advanced $99 / Expert $139（月払、年払 $29/$85/$132）が別途。単体利用は月50成果〜、USDのみ・円建てなし、14日間無料トライアルあり", source: "fin.ai/pricing, intercom.com/pricing" },
      { claim: "公称平均解決率76%・約12,000社・週100万件超の会話処理（自社発表・未監査。2026年6月の買収報道では3万社超・週約200万件とより大きい数字も引用されている）", source: "fin.ai/learn/what-is-fin-ai-agent, techcrunch.com" },
      { claim: "2026年5月12日に社名を Intercom, Inc. から Fin へ変更（Intercom はヘルプデスク製品名として存続）。2026年6月15日、Salesforce が約36億ドルでの買収に合意（Salesforce 2027年度Q4完了見込み・Agentforce へ統合予定）", source: "intercom.com/blog/today-intercom-becomes-fin, salesforce.com/news" },
      { claim: "管理画面の日本語対応は2025年4月開始。国内初の正規代理店は INNOOV株式会社。Fin は45+言語（日本語含む）対応だが、日本語応答はワークスペースへの学習コンテンツ追加が前提", source: "prtimes.jp/main/html/rd/p/000000018.000044187.html, innoov.io/intercom_fin, intercom.com/help/en/articles/8322387" },
      { claim: "Salesforce / HubSpot / Freshworks / Zoho 等の既存ヘルプデスク上に単体導入可能（非Intercom環境はセールス経由での提供）", source: "fin.ai/integrations, intercom.com/help/en/articles/10118495" },
    ],
    alternative: true,
  },
};

// ─────────────────────────────────────────────────────────────────────
// English mirror (COMPARE_EN). Same slugs/structure as COMPARE, faithful
// translation — no new claims/numbers, competitor names and figures exact.
// Rendered by CompareLP when lang="en" via /en/compare/* + /en/alternatives/*.
// ─────────────────────────────────────────────────────────────────────

export const COMPARE_EN: Record<string, CompareData> = {
  // ───────────── Calendar cluster ─────────────
  immedio: {
    slug: "immedio",
    competitorName: "immedio",
    product: "calendar",
    productName: "Meeton Calendar",
    category: "Inbound meeting conversion",
    metaTitle: "immedio pricing, differences & AI alternative｜Inbound meeting conversion｜Meeton",
    metaDescription:
      "immedio is a proven Japanese SaaS specialized in thank-you-page meeting conversion. Meeton Calendar is an AI SDR that handles conversation, content, booking, and follow-up end to end. A comparison table breaks down which fits which use case.",
    verdict:
      "If you want to solidly nail instant meeting conversion on the thank-you page \"only,\" the specialized and battle-tested immedio is a strong option. If you want to warm up leads through conversation and handle content recommendations and follow-up in one AI SDR end to end, Meeton Calendar fits better.",
    competitorStrength:
      "immedio is a Japanese SaaS specialized in converting meetings at the highest-intent moment—right after a form submission. With a strong track record including listed SaaS companies and ISMS certification, it is a solid choice. The completeness of its single-purpose focus is a clear strength.",
    rows: [
      C("Primary purpose", "Meeting conversion across conversation → booking → content → follow-up (AI SDR)", "Instant meeting conversion on the thank-you page", true),
      C("AI conversation before booking", "AI talks to warm up the lead before booking", "Shows a booking popup after the form", true),
      C("Coverage", "4 functions: booking + chat + content sharing + follow-up", "Meeting conversion (3 flows: thank-you page / content / business card)"),
      C("Pricing", "Base plan from ¥150,000/mo + add-ons (published)", "Not disclosed (contact required)", true),
      C("CRM integration", "Auto-registers to Salesforce / HubSpot", "Salesforce / HubSpot integration & auto-routing"),
      C("Provided by", "Made in Japan, Japanese-native", "Made in Japan, Japanese-native"),
    ],
    chooseMeeton: [
      "You want to complete not just booking but conversation, content recommendation, and follow-up in one AI SDR",
      "You want to move forward with a published pricing structure (base plan from ¥150,000/mo)",
      "You want to engage even pre-inquiry prospects via chat",
    ],
    chooseCompetitor: [
      "You want to solidly deploy with a use case narrowed to thank-you-page meeting conversion",
      "Your main goal is meeting conversion for 3 specific flows such as trade-show business cards",
    ],
    faq: [
      { q: "What is immedio?", a: "immedio is a Japanese AI inside-sales SaaS specialized in converting inbound leads into booked meetings at the highest-intent moment — right after a form submission (thank-you-page conversion). Its product line consists of immedio, immedio Box, and immedio Forms, and the company holds ISMS (ISO/IEC 27001) certification." },
      { q: "How much funding has immedio raised?", a: "immedio announced a ¥350 million Series A in May 2024 (per announcements on corp.immedio.io). It remains a privately held company as of 2026." },
      { q: "Does immedio have a blog?", a: "As of July 2026, immedio's site centers on product, function, and case-study pages — there is no blog published at immedio.io/blog. If you're researching how immedio compares to an end-to-end AI SDR, the comparison on this page covers features, pricing disclosure, and use-case fit." },
      { q: "Which is stronger at meeting conversion, immedio or Meeton Calendar?", a: "Both are Japanese SaaS strong at inbound meeting conversion. immedio has a rich track record as a specialist in thank-you-page meeting conversion. Meeton Calendar differs in that, before booking, the AI warms up the lead through conversation, and chat, content sharing, and follow-up all connect on the same platform. If your use case is booking-focused, immedio fits; if you want everything from conversation to follow-up end to end, Meeton fits." },
      { q: "How does pricing work?", a: "Meeton ai has a base plan from ¥150,000/mo plus add-ons (meeting booking / win-back, ¥50,000/mo each) and discloses its pricing. immedio has no public pricing and requires an inquiry (as of 2026)." },
    ],
    sources: [
      { claim: "immedio converts meetings with a one-line tag on the thank-you page; the product comprises immedio / Box / Forms. It publicly reports outcomes such as a 60% reduction in meeting-processing hours at Sansan", source: "immedio.io/function, immedio.io/case" },
      { claim: "Raised ¥350M Series A in May 2024; obtained ISMS (ISO/IEC 27001) in October 2023. Pricing is undisclosed (contact required)", source: "corp.immedio.io" },
    ],
    alternative: true,
  },

  timerex: {
    slug: "timerex",
    competitorName: "TimeRex",
    product: "calendar",
    productName: "Meeton Calendar",
    category: "Scheduling automation",
    metaTitle: "TimeRex pricing, differences & AI alternative｜Scheduling → meeting conversion｜Meeton Calendar",
    metaDescription:
      "TimeRex is a cost-effective, free-to-start Japanese scheduling tool. Meeton Calendar is an AI SDR optimized for pre-booking AI conversation, instant follow-up, and meeting conversion on top of scheduling. Choose by pure scheduling vs. meeting conversion.",
    verdict:
      "If you want to streamline pure scheduling at low cost, the free-to-start and highly polished TimeRex is ideal. If you want to warm up leads through conversation when they arise and carry the booking all the way to \"meeting conversion,\" Meeton Calendar fits. The two serve different purposes.",
    competitorStrength:
      "TimeRex is a cost-effective, free-to-start Japanese scheduling tool with 450,000 registered users, a track record at large enterprises, and ISMS certification. With diverse scheduling patterns and 3,000+ external integrations, it is a highly polished option for pure scheduling.",
    rows: [
      C("Primary purpose", "Meeting conversion of leads (conversation → booking → follow-up)", "Automatic coordination of open slots (scheduling)", true),
      C("AI conversation before booking", "AI talks to warm up the lead", "None (specialized in slot coordination)", true),
      C("Auto-trigger right after conversion", "Booking flow right after a form / content download", "Shares a booking URL for the other party to choose"),
      C("Pricing feel", "Base plan from ¥150,000/mo + add-ons (excl. tax, published)", "Free to Premium, around ¥1,500/mo (excl. tax, per user)"),
      C("Coverage", "4 functions: booking + chat + content + follow-up", "Scheduling (meeting-room booking, reminders, etc.)"),
    ],
    chooseMeeton: [
      "You want to carry not just scheduling but the booking all the way to meeting conversion",
      "You want to warm up leads through conversation before they book when a lead arises",
      "You want to run booking, conversation, content, and follow-up on one account",
    ],
    chooseCompetitor: [
      "Your use case is pure scheduling and you prioritize cost above all",
      "You want to automate scheduling only for an individual or small team",
    ],
    faq: [
      { q: "What's the difference between TimeRex and Meeton Calendar?", a: "TimeRex is a Japanese tool specialized in automatic slot coordination (scheduling), with the strength of being free to start and highly cost-effective. Meeton Calendar is optimized for \"meeting conversion\"—on top of scheduling, the AI warms up the lead through conversation before booking and connects to CRM auto-registration and follow-up. If your purpose is scheduling, TimeRex fits; if it is meeting conversion, Meeton fits." },
      { q: "Which is cheaper?", a: "For pure scheduling, the unit price of TimeRex (free to about ¥1,500/mo per user) is lower. Meeton ai has a base plan from ¥150,000/mo plus add-ons (excl. tax), including meeting-conversion features such as conversation, auto-assignment, and CRM registration. It is appropriate to compare based on \"what problem you want to solve.\"" },
    ],
    sources: [
      { claim: "TimeRex has 450,000 registered users, 4 tiers from Free to Enterprise, ISO 27001 certification, and claims up to 95% reduction in hours", source: "timerex.net/plan, timerex.net/feature" },
    ],
  },

  spir: {
    slug: "spir",
    competitorName: "Spir",
    product: "calendar",
    productName: "Meeton Calendar",
    category: "Scheduling automation",
    metaTitle: "Spir pricing, differences & AI alternative｜Scheduling → meeting conversion｜Meeton Calendar",
    metaDescription:
      "Spir is a Japanese scheduling SaaS strong at multi-calendar integration and global support. Meeton Calendar is optimized for pre-booking AI conversation, instant follow-up, and meeting conversion. Choose by scheduling quality vs. meeting conversion.",
    verdict:
      "If you want to carefully handle multi-calendar integration and scheduling with overseas partners, Spir fits. If you want to \"convert\" bookings into meetings through conversation and instant follow-up when a lead arises, Meeton Calendar fits. The two solve different problems.",
    competitorStrength:
      "Spir is strong in the experience and depth of integration in scheduling—such as simultaneously connecting multiple calendars and time-zone support—and, with ISMS certification and a PLG model, is a Japanese SaaS with a broad reach from individuals to large enterprises.",
    rows: [
      C("Primary purpose", "Meeting conversion of leads (conversation → booking → follow-up)", "Scheduling with multi-calendar integration", true),
      C("AI conversation before booking", "AI talks to warm up the lead", "None", true),
      C("Global / time zones", "Supported", "Strength in multi-time-zone support"),
      C("Pricing", "Base plan from ¥150,000/mo + add-ons (published)", "Free (up to 3 people) to Team plans"),
      C("Coverage", "4 functions: booking + chat + content + follow-up", "Scheduling (calendar integration)"),
      C("Provided by", "Made in Japan, Japanese", "Made in Japan, Japanese"),
    ],
    chooseMeeton: [
      "You want to connect scheduling all the way to meeting conversion",
      "You want to raise prospect intent through AI conversation before booking",
      "You want to run conversation, content, and follow-up end to end",
    ],
    chooseCompetitor: [
      "You value the quality of pure scheduling such as multi-calendar integration and overseas coordination",
      "You want to set up scheduling only at an individual to mid-size scale",
    ],
    faq: [
      { q: "How do Spir and Meeton Calendar differ?", a: "Spir is a Japanese SaaS strong in scheduling experience such as multi-calendar integration and time-zone support. Meeton Calendar is optimized for meeting conversion—before booking, the AI warms up the lead through conversation and connects to CRM registration and follow-up. If you want scheduling quality, Spir fits; if you want meeting conversion as well, Meeton fits." },
    ],
    sources: [
      { claim: "Spir has 400,000+ registered users, Free (3 people) to Team plans, ISMS certification, and multi-calendar / time-zone support", source: "spirinc.com" },
    ],
  },

  calendly: {
    slug: "calendly",
    competitorName: "Calendly",
    product: "calendar",
    productName: "Meeton Calendar",
    category: "Scheduling automation",
    metaTitle: "Calendly in Japanese: pricing & differences｜AI alternative & meeting conversion｜Meeton Calendar",
    metaDescription:
      "Calendly is the world's largest scheduling tool with a rich integration ecosystem. Meeton Calendar is Japanese-native and optimized for pre-booking AI conversation, instant follow-up, and meeting conversion. Choose by global general-purpose use vs. Japanese inbound meeting conversion.",
    verdict:
      "If you want world-standard scheduling and a rich integration ecosystem, Calendly is the classic choice. If you want Japanese-native UI and support and to carry bookings from conversation all the way to meeting conversion, Meeton Calendar fits.",
    competitorStrength:
      "Calendly is the world's largest by market share, adopted by many of the Fortune 500, with strengths in 100+ integrations and low-friction PLG. Its completeness as a global scheduling standard is outstanding.",
    rows: [
      C("Primary purpose", "Japanese inbound meeting conversion", "General-purpose scheduling (global)"),
      C("AI conversation before booking", "AI talks to warm up the lead", "None", true),
      C("Japanese UI & support", "Japanese-native", "No official Japanese UI (translation only)", true),
      C("Integration ecosystem", "Supports major CRMs / calendars / notifications", "Widest with 100+ integrations"),
      C("Pricing", "Base plan from ¥150,000/mo + add-ons (published)", "Free (1 event type) to paid plans"),
      C("Coverage", "4 functions: booking + chat + content + follow-up", "Scheduling (routing for teams)"),
    ],
    chooseMeeton: [
      "You need Japanese-native UI and support",
      "You want to connect bookings through conversation and follow-up into meeting conversion",
      "Your main goal is Japanese inbound meeting conversion",
    ],
    chooseCompetitor: [
      "You want standard global scheduling and the widest integrations",
      "You want to unify scheduling for individuals to large enterprises, mainly in English-speaking markets",
    ],
    faq: [
      { q: "What about Calendly's Japanese support?", a: "Calendly has no official Japanese UI; it is used via browser translation, and there is no Japanese-language support desk (as of 2026). If you value Japanese-native operation and support, the Japanese-made Meeton Calendar fits." },
      { q: "What's the difference between Calendly and Meeton Calendar?", a: "Calendly is the world's largest general-purpose scheduling tool with rich integrations. Meeton Calendar is Japanese-native and optimized for \"meeting conversion\"—before booking, the AI talks to warm up the lead and connects to CRM registration and follow-up." },
    ],
    sources: [
      { claim: "Calendly is used by 100,000+ companies worldwide and 86% of the Fortune 500, with 100+ integrations. There is no official Japanese UI", source: "calendly.com, businesschatmaster.com" },
    ],
    alternative: true,
  },

  // ───────────── Library cluster ─────────────
  docsend: {
    slug: "docsend",
    competitorName: "DocSend",
    product: "library",
    productName: "Meeton Library",
    category: "Content sharing & tracking",
    metaTitle: "DocSend alternative in Japanese｜AI content explainer & differences｜Meeton Library",
    metaDescription:
      "DocSend, a Dropbox-owned standard, is strong at precise page-level content tracking and VDR. Meeton Library has an AI chat explain content, visualizes opens in Japanese with no CRM required, and connects to follow-up. Choose by precise tracking/VDR vs. AI explanation × meeting conversion.",
    verdict:
      "If your main goal is page-level precise tracking of pitch decks or a data room (VDR), the standard DocSend is solid. If you want an AI to explain content, connect opens to meeting conversion and follow-up, and start in Japanese with no CRM, Meeton Library fits.",
    competitorStrength:
      "DocSend is a Dropbox-owned standard whose strengths are precise engagement analytics—tracking \"who read which page for how many seconds\" at the page level—and a VDR usable for fundraising and M&A. Its tracking precision is among the best in the industry.",
    rows: [
      C("Primary purpose", "Content recommendation → AI explanation → open visibility → follow-up", "Content sharing, precise tracking, VDR"),
      C("AI content explanation", "An AI chat explains the content and answers questions", "None (centered on viewing tracking)", true),
      C("Open tracking", "Visualizes who viewed when and how far", "Strength in page-level precise tracking"),
      C("Connection to follow-up", "Auto-bridges to Email / Calendar", "Salesforce integration (paid add-on), etc."),
      C("CRM required / onboarding", "No CRM required, start right away", "No free plan (14-day trial)", true),
      C("Provided by", "Japanese-native", "English-centric (Japanese UI to be confirmed)", true),
    ],
    chooseMeeton: [
      "You want an AI to explain content and help the recipient understand and move forward",
      "You want to start open tracking without a CRM",
      "You want to connect open signals to follow-up (Email / Calendar)",
    ],
    chooseCompetitor: [
      "Your main goal is page-level precise tracking of pitch decks",
      "You need a data room (VDR) for fundraising or M&A",
    ],
    faq: [
      { q: "What's the difference between DocSend and Meeton Library?", a: "DocSend is a Dropbox-owned standard strong at page-level precise content tracking and VDR. Meeton Library adds AI-chat content explanation on top, can start with no CRM in Japanese, and differs by connecting open signals to Email / Calendar to automate follow-up." },
      { q: "How does pricing work?", a: "Meeton ai has a base plan from ¥150,000/mo plus add-ons (meeting booking / win-back, ¥50,000/mo each) and discloses its pricing. DocSend has no permanent free plan and offers a 14-day trial (as of 2026)." },
    ],
    sources: [
      { claim: "DocSend was acquired by Dropbox for about $165M in 2021. Page-level tracking and VDR. No free plan / 14-day trial; Salesforce integration is a paid add-on", source: "dropbox.gcs-web.com, docsend.com" },
    ],
    alternative: true,
  },

  // ───────────── Chat cluster ─────────────
  intercom: {
    slug: "intercom",
    competitorName: "Intercom",
    product: "chat",
    productName: "Meeton Chat",
    category: "Chat / messaging",
    metaTitle: "Intercom alternative: pricing & differences｜AI meeting-conversion chat｜Meeton Chat",
    metaDescription:
      "Intercom (Fin) is a global platform strong at automating customer support for existing customers. Meeton Chat specializes in meeting conversion for new and latent leads, an AI chat that stands on the consideration foundation before contact. Choose by support reduction vs. meeting acquisition.",
    verdict:
      "If you want to automate inquiry handling and support for existing customers, Intercom—with Fin's high resolution rate—is the classic choice. If you want to capture new and latent visitors to your website through conversation and \"convert\" them into meetings, Meeton Chat fits. The two solve different problems (support vs. meeting acquisition).",
    competitorStrength:
      "Intercom is a global customer-support-focused platform whose AI agent Fin has a high inquiry resolution rate (claimed 67%, 40M+ cumulative). Omnichannel integration and support for enterprise security requirements are also strengths.",
    rows: [
      C("Primary purpose", "Meeting conversion of new and latent leads (AI SDR)", "Automating customer support for existing customers"),
      C("Optimization for meeting conversion", "Designed to warm up and carry to booking", "Centered on inquiry resolution", true),
      C("Pre-contact latent prospects", "Stands on the consideration foundation before inquiry", "Mainly existing / inquiring customers", true),
      C("Carrying over past context", "Carries over browsing, download, and conversation history", "Strong at managing support context"),
      C("Pricing feel", "Base plan from ¥150,000/mo + add-ons (excl. tax, published)", "Seat fee + Fin $0.99/resolution usage-based"),
      C("Provided by", "Japanese-native, meeting-conversion-focused", "English-centric, support-focused"),
    ],
    chooseMeeton: [
      "You want to capture new and latent leads through conversation and convert them to meetings",
      "You want to engage at the consideration stage before an inquiry",
      "You want to start specialized in meeting conversion in Japanese",
    ],
    chooseCompetitor: [
      "You want to auto-resolve a large volume of support inquiries from existing customers",
      "You need an omnichannel customer-service foundation",
    ],
    faq: [
      { q: "Which is better, Intercom or Meeton Chat?", a: "They solve different problems. Intercom (Fin) is strong at automating customer support for existing customers, with a high inquiry resolution rate as its hallmark. Meeton Chat specializes in \"meeting conversion\" of new and latent leads—standing on the consideration foundation before contact to talk, and carrying to booking once intent rises. For support reduction, Intercom fits; for meeting acquisition, Meeton fits." },
      { q: "How does pricing differ?", a: "Intercom charges a seat fee ($29–132/seat/mo) plus usage-based Fin AI at $0.99/resolution. Meeton ai has a base plan from ¥150,000/mo plus add-ons (excl. tax), a simple structure that varies by monthly traffic and features. Because the use cases and billing models differ, it is appropriate to choose based on your purpose." },
    ],
    sources: [
      { claim: "Intercom's customer-support AI \"Fin\" has a 67% resolution rate and 40M+ cumulative. Seat fee $29–132/mo + usage-based Fin at $0.99/resolution", source: "intercom.com/pricing, sacra.com/c/intercom" },
    ],
    alternative: true,
  },

  // ───────────── Email cluster ─────────────
  lemlist: {
    slug: "lemlist",
    competitorName: "lemlist",
    product: "email",
    productName: "Meeton Email",
    category: "Email / sales engagement",
    metaTitle: "lemlist alternative: pricing & differences｜Behavior-based follow-up AI｜Meeton Email",
    metaDescription:
      "lemlist is an overseas SaaS strong at cold email / multichannel outreach for new prospecting. Meeton Email specializes in inbound follow-up where AI follows up 1:1 with existing, unbooked leads triggered by behavior signals. Choose by new prospecting vs. follow-up of warmed leads.",
    verdict:
      "If you want to run large-scale cold email and multichannel outreach to new lists, lemlist is powerful. If you want an AI to follow up 1:1 with already-contacted (unbooked, dormant) leads triggered by behavior signals, Meeton Email fits. It splits by whether the purpose is new prospecting or follow-up.",
    competitorStrength:
      "lemlist is strong in multichannel outreach spanning email, LinkedIn, and phone, a lead DB of 650M+, hyper-personalization, and deliverability improvement (lemwarm), and is a well-rated option for overseas outbound (G2 4.6).",
    rows: [
      C("Primary purpose", "Inbound follow-up of existing, unbooked leads", "Cold outreach to new lists"),
      C("Trigger", "Behavior signals (re-visit / open / view)", "Sending sequence / list", true),
      C("Copy generation", "AI generates each message for the recipient's context", "Templates + dynamic personalization", true),
      C("CRM premise", "Premised on CRM integration (leveraging existing leads)", "Built-in lead DB, strong at extracting new prospects"),
      C("Channels", "Email (integrated with chat / booking)", "Multi: email / LinkedIn / phone / SMS, etc."),
      C("Goal", "Autonomous through reply and meeting booking", "Sequence delivery and reply acquisition"),
    ],
    chooseMeeton: [
      "You want to mine unbooked, dormant leads in your existing CRM",
      "You want an AI to watch behavior signals and follow up at the optimal moment",
      "You want to connect with chat and booking all the way to meeting conversion",
    ],
    chooseCompetitor: [
      "You want to run a large volume of cold email to new lists",
      "You want outreach that spans channels beyond email (e.g., LinkedIn)",
    ],
    faq: [
      { q: "What's the difference between lemlist and Meeton Email?", a: "lemlist is an overseas SaaS strong at cold email / multichannel outreach to new lists, featuring a built-in lead DB and personalization. Meeton Email specializes in inbound follow-up where, triggered by behavior signals (re-visit, open, view), an AI follows up 1:1 with already-contacted (unbooked, dormant) leads. For new prospecting, lemlist fits; for follow-up, Meeton fits." },
    ],
    sources: [
      { claim: "lemlist offers multichannel outreach across email/LinkedIn/phone, a lead DB of 650M+, and deliverability improvement with lemwarm. Email from $31/mo, Multichannel from $87/mo", source: "lemlist.com/pricing" },
    ],
  },

  smartlead: {
    slug: "smartlead",
    competitorName: "Smartlead",
    product: "email",
    productName: "Meeton Email",
    category: "Email / cold sending",
    metaTitle: "Smartlead alternative: pricing & differences｜Behavior-based follow-up AI｜Meeton Email",
    metaDescription:
      "Smartlead is an overseas SaaS strong at large-volume cold sending and deliverability with unlimited mailboxes and auto-warmup. Meeton Email follows up 1:1 with existing, unbooked leads triggered by behavior signals. Choose by large-volume outbound vs. follow-up of warmed leads.",
    verdict:
      "If you want to keep sending a large volume of cold email at high deliverability (especially for agency / outsourced use cases), Smartlead is powerful. If you want an AI to follow up 1:1 with existing, unbooked leads triggered by behavior signals and connect to meeting conversion, Meeton Email fits.",
    competitorStrength:
      "Smartlead is an overseas SaaS strong at deliverability management via unlimited mailbox connections and auto-warmup, and at agency-oriented design (white label) that lets you manage multiple clients in one place (G2 4.6).",
    rows: [
      C("Primary purpose", "Inbound follow-up of existing, unbooked leads", "Large-volume cold email sending and deliverability management"),
      C("Trigger", "Behavior signals (re-visit / open / view)", "Sending campaign / list", true),
      C("Copy generation", "AI generates each message for the recipient's context", "Templates + merge fields, mostly", true),
      C("Deliverability / warmup", "— (premised on inbound)", "Strength in unlimited mailboxes and auto-warmup"),
      C("CRM premise", "Premised on CRM integration (leveraging existing leads)", "Premised on outbound sending"),
      C("Goal", "Autonomous through reply and meeting booking", "Delivery and reply acquisition at high volume"),
    ],
    chooseMeeton: [
      "You want to convert unbooked, dormant leads in your existing CRM into meetings",
      "You want to be followed by behavior signals rather than a sending schedule",
      "You want to integrate with chat and booking end to end",
    ],
    chooseCompetitor: [
      "You want to send a large volume of cold email at high deliverability",
      "You want to centrally manage multiple clients for outsourcing / agency work",
    ],
    faq: [
      { q: "What's the difference between Smartlead and Meeton Email?", a: "Smartlead is an overseas SaaS specialized in sending a large volume of cold email at high deliverability with unlimited mailboxes and auto-warmup. Meeton Email specializes in inbound follow-up where, triggered by behavior signals, an AI follows up 1:1 with existing, unbooked leads. For large-volume outbound, Smartlead fits; for follow-up of warmed leads, Meeton fits." },
    ],
    sources: [
      { claim: "Smartlead is strong at unlimited mailboxes, auto-warmup, and agency-oriented centralized management. Basic from $39/mo to Unlimited $174/mo", source: "smartlead.ai/pricing, g2.com" },
    ],
  },

    sprocket: {
    slug: "sprocket",
    competitorName: "Sprocket",
    product: "ads",
    productName: "Meeton Ads",
    category: "Web engagement / CX improvement",
    metaTitle: "Sprocket pricing, differences & AI alternative｜Web engagement vs on-site ads｜Meeton",
    metaDescription:
      "Sprocket is a consultant-led CX improvement / web engagement platform from Japan. Meeton Ads auto-optimizes on-site ads with AI and connects to chat and meeting booking as part of an AI SDR. A comparison of pricing disclosure and best-fit use cases.",
    verdict:
      "If you want to run serious CX improvement on a high-traffic B2C site—e-commerce, finance, and the like—with a dedicated consultant driving the program, the well-proven Sprocket is a strong option. If you want to capture leads from on-site ads on a B2B website and connect AI conversation through to booked meetings end to end, Meeton Ads fits better. The two solve different problems.",
    competitorStrength:
      "Sprocket is a CX improvement platform founded in 2014 with 400+ client companies, including enterprises in regulated industries such as finance. It holds consecutive 'Leader' awards in the ITreview Grid Award Web engagement (Web接客) tool category (as of 2026 Spring) and ISO/IEC 27001:2022 certification. Its delivery model—a dedicated producer/consultant running the PDCA cycle on a knowledge base of 120,000+ cumulative A/B tests—is a clear strength for companies that want a managed, hands-on CRO program.",
    rows: [
      C("Primary purpose", "Capture and convert B2B leads via AI-optimized on-site ads", "CX improvement (CRO) via web engagement & personalization", true),
      C("AI conversation & meeting booking", "Ads connect to AI chat → booking (first response in 5 seconds, 24/7)", "No documented meeting-booking or visitor-facing AI conversation (popup/MA-centric)", true),
      C("Optimization approach", "AI auto-optimizes which on-site ads are shown", "Generative AI (Insights / SproAgent) × 120,000+ A/B-test knowledge base × consultant-designed scenarios"),
      C("Pricing", "Base plan from ¥150,000/mo + add-ons (published)", "Not disclosed (contact required)", true),
      C("CRM integration", "Native HubSpot / Salesforce integration", "External tool integration via its CDP (DataStudio)", true),
      C("Deployment & operation", "One line of JS, live in 5 minutes, self-serve operation", "One-line tag deployment, run by a dedicated producer/consultant"),
    ],
    chooseMeeton: [
      "You want on-site ads → AI conversation → booked meetings end to end on a B2B website",
      "You want to start small with published pricing (base plan from ¥150,000/mo + add-ons)",
      "You want leads auto-registered to HubSpot / Salesforce and a self-serve operation",
    ],
    chooseCompetitor: [
      "Your main goal is CVR improvement (CRO) on a high-traffic B2C site such as e-commerce or finance",
      "You want a dedicated consultant running the PDCA cycle with a deep A/B-testing knowledge base",
      "You want to build an integrated enterprise CX stack including CDP and BI",
    ],
    faq: [
      { q: "What is the difference between Sprocket and Meeton Ads?", a: "Sprocket is a CX improvement platform combining web engagement/personalization popups (Personalize), a CDP (DataStudio), generative-AI BI (Insights), and an AI agent (SproAgent), delivered with a dedicated consultant who runs the CVR-improvement PDCA cycle. Meeton Ads auto-optimizes on-site ads with AI for B2B websites and connects AI chat (first response in 5 seconds, 24/7) through to meeting booking on the same AI SDR platform. For consultant-led CX improvement, Sprocket fits; for automating lead capture through to booked meetings, Meeton fits." },
      { q: "How much does Sprocket cost?", a: "Sprocket does not publish pricing; you must contact them for a quote. Its official FAQ states plans are proposed individually based on each company's needs, structured as an initial fee plus a monthly fee (as of 2026). Meeton ai publishes its pricing: base plan from ¥150,000/mo plus add-ons (meeting booking / win-back, ¥50,000/mo each)." },
      { q: "Which fits B2B lead generation better?", a: "Sprocket's client base centers on B2C, high-traffic sites in e-commerce, finance, and travel, with some B2B cases such as Yanmar Holdings' online expo registration (completion rate improved to 143% vs. a no-popup baseline). Meeton is purpose-built for B2B lead capture through meeting conversion, with customer results such as a 60%+ meeting conversion rate (EdulinX). If B2B lead generation and meeting conversion is the goal, Meeton fits; if B2C site CX improvement is the goal, Sprocket fits." },
    ],
    sources: [
      { claim: "Sprocket is a CX improvement platform with 4 modules — Personalize (MA) / DataStudio (CDP) / Insights (generative-AI BI) / SproAgent — delivered with dedicated consultants drawing on 120,000+ cumulative A/B tests; 400+ client companies", source: "sprocket.bz/service, sprocket.bz/company/outline.html" },
      { claim: "Pricing is not disclosed (contact required); plans are proposed individually per company, structured as initial fee + monthly fee", source: "sprocket.bz/faq/3.html" },
      { claim: "Consecutive 'Leader' awards in the ITreview Grid Award Web engagement tool category (as of 2026 Spring); ISO/IEC 27001:2022 and JIS Q 27001:2023 certified", source: "itreview.jp/award/2026_spring/web-customer-service.html, sprocket.bz/privacy" },
      { claim: "Yanmar Holdings B2B case: online expo registration completion rate improved to 143% vs. a no-popup baseline", source: "sprocket.bz/release/20221004.html" },
      { claim: "No meeting-booking or chat-driven lead-capture feature documented on the platform page (popup / MA / CDP / BI centric)", source: "sprocket.bz/platform" },
    ],
  },

  'flipdesk': {
    slug: "flipdesk",
    competitorName: "Flipdesk",
    product: "ads",
    productName: "Meeton Ads",
    category: "Web engagement & on-site ads",
    metaTitle: "Flipdesk pricing, differences & AI alternative｜Web engagement vs on-site ads｜Meeton",
    metaDescription:
      "Flipdesk is a Japanese web-engagement tool (popups, banners, coupons) used by 1,600+ companies. Meeton Ads is AI-run on-site advertising that matches offers to each visitor and connects lead capture to booked meetings. Pricing, AI capabilities, and use-case fit compared.",
    verdict:
      "If you want to solidly start web engagement — popups, coupons, A/B testing — on an EC/D2C or retail site with published pricing, Flipdesk, with its 1,600+ company track record, is a sound choice. If your goal is B2B lead capture, you want AI to handle targeting and optimization, and you want an end-to-end path to booked meetings, Meeton Ads fits better.",
    competitorStrength:
      "Flipdesk is a web-engagement tool launched in 2019 with 1,600+ companies and 2,000+ sites deployed, including recognizable names such as Askul and Mitsukoshi Isetan (meeco). Its no-code toolkit spanning popups, banners, coupons, A/B testing, and heatmaps, its accessible published pricing of ¥50,000 setup + ¥50,000/mo (excl. tax), and the ease of use and support reflected in its ITreview 4.2/5 rating (167 reviews) are clear strengths. In March 2024 it also added generative-AI features such as AI scenario creation and AI code generation.",
    rows: [
      C("Primary purpose", "Maximize lead capture with on-site ads (the entry point of an AI SDR)", "Improve CVR through web engagement with popups and banners", true),
      C("Role of AI", "AI runs delivery optimization itself (per-visitor targeting, auto-learning from clicks and captured leads)", "AI assists creation (AI scenario creation, AI code, AI FAQ bot, since March 2024); delivery is rule-based", true),
      C("Path to booked meetings", "Connects to Meeton Calendar for booking within a 5-second first response (60%+ meeting-conversion rate = EdulinX)", "No meeting-booking or scheduling capability found (stops at engagement/FAQ)", true),
      C("Coverage", "End to end across capture → nurture → meetings → follow-up (Ads/Chat/Library/Calendar/Email)", "On-site engagement + Cross Talk chatbot (incl. A/B testing and heatmaps)"),
      C("Pricing", "Base plan from ¥150,000/mo + add-ons (published)", "Standard: ¥50,000 setup + ¥50,000/mo (excl. tax, published, up to 800,000 PV/mo; custom quote above). Cross Talk: not disclosed (contact required)"),
      C("CRM integration", "Native HubSpot / Salesforce integration", "Ingests member/CRM data for personalization (no official mention of native SFA/CRM integration found)", true),
    ],
    chooseMeeton: [
      "You want to automate everything from B2B lead capture to booked meetings, starting from on-site ads",
      "You want AI to handle targeting and optimization instead of spending hours on segment rules and A/B tests",
      "You want HubSpot / Salesforce integration so captured leads flow straight into your meeting pipeline",
    ],
    chooseCompetitor: [
      "Your main goal is improving purchase CVR on EC/D2C, retail, or travel sites (where Flipdesk's track record is deepest)",
      "You want a broad web-engagement toolkit — coupons, countdown timers, heatmaps",
      "You want to start small at the published price of ¥50,000 setup + ¥50,000/mo (excl. tax)",
    ],
    faq: [
      { q: "What's the difference between Flipdesk and Meeton Ads?", a: "Flipdesk is a Japanese web-engagement tool used by 1,600+ companies that displays popups, banners, and coupons via rule-based targeting with around 30 segmentation parameters. Meeton Ads treats your own site as ad inventory: AI picks the best offer for each visitor (page, traffic source, industry) and auto-learns delivery using clicks and captured leads as rewards. If your goal is EC conversion-rate improvement, Flipdesk fits; for B2B lead capture through to booked meetings, Meeton Ads fits." },
      { q: "How much does Flipdesk cost?", a: "Flipdesk's Standard plan is ¥50,000 setup + ¥50,000/mo (both excl. tax) for up to 800,000 PV/month, with a custom quote above that (official published pricing as of 2026). The Cross Talk chatbot is priced separately and is not disclosed on the official site — contact required (secondary sources disagree on its price). Meeton ai publishes its pricing: base plan from ¥150,000/mo plus add-ons." },
      { q: "Does Flipdesk have AI features?", a: "Yes. In March 2024 it added generative-AI features: AI scenario creation from natural-language prompts, AI code that auto-generates banner HTML, and an AI FAQ bot that handles free-text input. However, delivery targeting itself remains rule-based, and no meeting-booking or lead-qualification capability could be found. Meeton Ads differs in that AI runs delivery optimization itself and connects to Meeton Calendar to automate all the way to a booked meeting." },
    ],
    sources: [
      { claim: "Flipdesk offers web engagement with popups, banners, coupons, A/B testing, and heatmaps, targeted via ~30 segmentation parameters. 1,600+ companies / 2,000+ sites; customers include Askul and Mitsukoshi Isetan (meeco)", source: "materialdigital.jp/service/flipdesk, materialdigital.jp/case/flipdesk" },
      { claim: "Standard plan: ¥50,000 setup + ¥50,000/mo (excl. tax) up to 800,000 PV/month; custom quote above (official published pricing)", source: "materialdigital.jp/service/flipdesk/price_opiton" },
      { claim: "Cross Talk is a scenario/QA/survey-format chatbot with human-chat handoff. No mention of meeting booking or CRM integration on the official page. Pricing is not officially disclosed and secondary sources disagree (checked July 2026)", source: "materialdigital.jp/service/crosstalk, it-trend.jp/chatbot/11285" },
      { claim: "Generative-AI features (AI scenario creation, AI code, AI FAQ bot) added in March 2024", source: "materialgroup.jp/news/20240301, support.materialdigital.jp/manual/ai_suggestion" },
      { claim: "Operated by Material Digital Inc. (renamed from Flipdesk Inc. at the end of July 2023; part of Material Group). ITreview rating 4.2/5 (167 reviews)", source: "materialgroup.jp/news/20230731, itreview.jp/products/flipdesk/profile" },
    ],
  },

    "channel-talk": {
    slug: "channel-talk",
    competitorName: "Channel Talk",
    product: "chat",
    productName: "Meeton Chat",
    category: "Web engagement chat / CRM",
    metaTitle: "Channel Talk alternative: pricing & differences｜AI meeting-conversion chat｜Meeton",
    metaDescription:
      "Channel Talk is a web-engagement chat / CRM with rich LINE and e-commerce integrations, free to start. Meeton Chat is an AI chat specialized in converting new and latent leads into meetings (first response in 5 seconds, 24/7/365). Choose by engagement & support vs. meeting acquisition.",
    verdict:
      "If you want to run on-site customer engagement connected to LINE and Instagram on an EC/D2C site, or automate support inquiries at low cost, Channel Talk—with its deep track record in Japan—is a strong choice. If you want to capture new and latent visitors to a B2B website through conversation and \"convert\" them into meetings, including booking and follow-up, Meeton Chat fits. Choose by engagement vs. meeting acquisition.",
    competitorStrength:
      "Channel Talk is a web-engagement chat / CRM used by 220,000+ companies globally (self-reported), with a Japan subsidiary operating for over 10 years. Its e-commerce tooling runs deep—native LINE and Instagram DM integration plus dedicated apps for Shopify, Cafe24, and Color Me Shop—and its AI agent \"ALF\" uses a buyer-friendly usage model that charges only for chats the AI resolves autonomously. The low barrier to entry, starting from a free plan, is another clear strength.",
    rows: [
      C("Primary purpose", "Meeting conversion of new and latent leads (AI SDR)", "Unified customer communication centered on engagement chat"),
      C("AI conversation design", "Warms up and carries to booking (first response in 5 seconds, 24/7/365)", "ALF autonomously resolves inquiries (support-centric)", true),
      C("Coverage", "Conversation + content + booking + follow-up, end to end", "Chat + team chat + CRM marketing (no meeting-booking feature)", true),
      C("SFA/CRM integration", "Native HubSpot / Salesforce integration", "Built-in CRM (MU) with rich LINE / Instagram / e-commerce integrations", true),
      C("Pricing", "Base plan from ¥150,000/mo + add-ons (published)", "Free to Growth ¥9,600/mo + usage fees by MU count and AI resolutions (published)"),
      C("Best fit", "B2B website meeting acquisition, Japanese-native", "EC/D2C engagement, purchase support, and customer support"),
    ],
    chooseMeeton: [
      "You want to capture B2B website visitors through conversation and convert them to meetings, including booking and follow-up",
      "You want leads to flow automatically into a HubSpot / Salesforce-centered sales process",
      "You want to deploy with one line of JS in 5 minutes and aim for meeting-acquisition results like a 60%+ meeting conversion rate (EdulinX)",
    ],
    chooseCompetitor: [
      "You run an EC/D2C site and want engagement and purchase support connected to LINE, Instagram, Shopify, and more",
      "You want autonomous resolution of support inquiries plus team chat and CRM marketing in one tool",
      "You want to start small with a chat tool from free to a few thousand yen per month",
    ],
    faq: [
      { q: "What is the difference between Channel Talk and Meeton Chat?", a: "Channel Talk is an all-in-one combining engagement chat, a customer CRM, team chat, and CRM marketing, with rich EC-oriented integrations such as LINE, Instagram, and Shopify—strong for EC/D2C engagement and support. Meeton Chat is an AI chat specialized in \"meeting conversion\" of new and latent leads on B2B websites: it warms prospects up with conversation (first response in 5 seconds, 24/7/365) and carries them to booking and follow-up on the same platform. For engagement and support, Channel Talk fits; for meeting acquisition, Meeton fits." },
      { q: "How much does Channel Talk cost?", a: "Alongside a free plan, published pricing runs from Early Stage at ¥3,600/mo and Growth at ¥9,600/mo (excl. tax, with annual-prepay discounts), with plans determined by MU (stored contacts) count. On top of that, usage-based fees apply separately—for example, the ALF AI agent charges ¥50 per chat resolved autonomously by AI (as of 2026). Meeton ai has published pricing with a base plan from ¥150,000/mo plus add-ons (excl. tax)." },
      { q: "Which is better for B2B meeting acquisition?", a: "Channel Talk has chat-based inside-sales case studies (e.g., Lancers), but the product centers on EC/D2C engagement and support, and it has no meeting-booking feature. Meeton Chat is designed as an AI SDR for meeting acquisition, with customer results including a 60%+ meeting conversion rate (EdulinX), 20x chat-sourced leads (BizteX), and 2x monthly SQLs (G-gen). If B2B meeting acquisition is the main goal, Meeton fits; if you also need engagement and support in one tool, Channel Talk is a valid option." },
    ],
    sources: [
      { claim: "Channel Talk publishes pricing: Free / Early Stage ¥3,600/mo / Growth ¥9,600/mo (excl. tax, annual-prepay discounts). Plans are determined by MU (stored contacts) count; Enterprise is quote-based", source: "channel.io/jp/pricing, itreview.jp/products/channeltalk/price" },
      { claim: "The ALF AI agent charges usage-based ¥50 per chat resolved autonomously by AI only. RAG-based document learning, 33 languages, 24/7 operation", source: "channel.io/jp/pricing, docs.channel.io/help/en/articles/What-is-ALF--541f14b8" },
      { claim: "220,000+ companies globally and 98% retention (self-reported). Japan subsidiary established January 2015; holds 4 ISO information-security certifications", source: "prtimes.jp/main/html/rd/p/000000144.000029184.html, korit.jp" },
      { claim: "Native LINE and Instagram DM integration and dedicated apps for Shopify / Cafe24 / Color Me Shop. Published Lancers chat inside-sales case study", source: "prtimes.jp/main/html/rd/p/000000041.000029184.html, channel.io/ja/blog/articles/case-lancers-0bf5304a" },
    ],
    alternative: true,
  },

    "hubspot-chatbot": {
    slug: "hubspot-chatbot",
    competitorName: "HubSpot Chatflows / Breeze",
    product: "chat",
    productName: "Meeton Chat",
    category: "Chatbot / CRM-native chat",
    metaTitle: "HubSpot chatbot (Chatflows/Breeze): pricing & differences｜Meeting-conversion chat｜Meeton",
    metaDescription:
      "HubSpot's chatbots (Chatflows / Breeze) are a CRM-native chat foundation you can start on a free tier. Meeton Chat is a meeting-conversion-focused AI chat that integrates natively with HubSpot CRM — run them side by side, no replacement needed. Differences and how to combine them, in one table.",
    verdict:
      "If you already use HubSpot and want to start with the free live-chat tier or automate support for existing customers (Breeze Customer Agent), HubSpot's own chat features are the natural choice. If you want an AI that carries website conversations all the way to booked meetings, Meeton Chat — natively integrated with HubSpot CRM — fits. This is not a replacement decision: a division of roles works, with HubSpot as CRM + support and Meeton as the meeting-conversion chat.",
    competitorStrength:
      "HubSpot is a global CRM platform with 299,458 paying customers (as of March 2026) and roughly $3.13B in 2025 full-year revenue. Its CRM-native integration — chat and bot conversations flowing straight into contact timelines, properties, and workflows — is a strength only the first party can offer, alongside a low barrier to entry (free live chat + basic bots) and fast AI investment, from outcome-based pricing (April 2026) to the announced Warmly acquisition (June 2026).",
    rows: [
      C("Primary purpose", "Meeting conversion of new and latent leads (AI SDR)", "CRM-native chat window (Chatflows) + automated support resolution (Breeze)"),
      C("AI conversation", "AI warms leads through natural dialogue and carries them to booking", "Chatflows is decision-tree based; Breeze specializes in support resolution", true),
      C("Booking inside chat", "Qualifies and books within the conversation flow (5-second first response)", "Presents a meeting link; custom form fields redirect to a booking page", true),
      C("CRM integration", "Native HubSpot / Salesforce integration (conversations and meetings auto-logged)", "It is HubSpot CRM itself (auto-logged timelines)"),
      C("Pricing", "Base plan from ¥150,000/mo + add-ons (published)", "Free tier available; advanced features need upper Hub tiers + Breeze usage billing ($0.50/resolution)"),
      C("Provided by", "Made in Japan, Japanese-native design", "Global product, Japanese localization (Japan subsidiary)"),
    ],
    chooseMeeton: [
      "You want to keep HubSpot CRM and strengthen meeting-conversion chat for site visitors (runs alongside via native integration)",
      "You want AI-driven natural dialogue, not decision trees, to warm leads (60%+ meeting-conversion rate at EdulinX)",
      "You want qualification through booking completed inside the conversation (24/7, 5-second first response)",
    ],
    chooseCompetitor: [
      "You want to start small with the free live chat + basic bot tier",
      "Your main goal is auto-resolving support inquiries from existing customers (Breeze Customer Agent)",
      "You want marketing, sales, and support consolidated on the single HubSpot platform",
    ],
    faq: [
      { q: "Can HubSpot's chatbots and Meeton Chat be used together?", a: "Yes. Meeton Chat integrates natively with HubSpot CRM, so chat conversations and booked meetings are automatically logged to contact timelines. You can keep HubSpot as your CRM and support foundation while strengthening only the meeting-conversion chat with Meeton Chat — no replacement needed. Setup is one line of JS, about 5 minutes." },
      { q: "How do HubSpot Chatflows / Breeze differ from Meeton Chat?", a: "HubSpot's Chatflows is a decision-tree bot + live chat available from the free tier; Breeze Customer Agent is a support-focused AI agent that resolves inquiries by referencing knowledge bases and site content. Meeton Chat specializes in converting new and latent leads into meetings: AI warms them through natural dialogue, starts talking within 5 seconds, and carries them to booking. For support automation, HubSpot fits; for meeting conversion, Meeton fits." },
      { q: "How does pricing differ?", a: "HubSpot's Chatflows starts on a free tier, with advanced features requiring Professional or above (e.g., Service Hub Professional at $90/seat/mo). Breeze Customer Agent moved to outcome-based billing on April 14, 2026, at 50 credits ($0.50) per resolved conversation. Meeton ai publishes its pricing: base plan from ¥150,000/mo plus add-ons (excl. tax)." },
    ],
    sources: [
      { claim: "Chatflows is included in HubSpot's free CRM as live chat + a rule-based bot builder; advanced branching and workflow integration require Professional or above", source: "resonatehq.com/blog/hubspot-chatbot-guide, hubspot.com/pricing/marketing" },
      { claim: "In-bot booking primarily presents a meeting link; when custom form fields exist, the bot redirects to the booking page instead of completing in chat", source: "knowledge.hubspot.com/chatflows/a-guide-to-bot-actions" },
      { claim: "Breeze Customer Agent is a support-focused AI that resolves inquiries by referencing knowledge bases; from April 14, 2026 it bills 50 credits ($0.50) per resolved conversation", source: "hubspot.com/products/artificial-intelligence/breeze-ai-agents, hubspot.com/company-news/hubspots-customer-agent-and-prospecting-agent-now-you-pay-when-the-task-is-complete" },
      { claim: "Service Hub: Starter $7/seat, Professional $90/seat, Enterprise $150/seat; monthly credits: Starter 500 / Professional 3,000 / Enterprise 5,000", source: "hubspot.com/pricing/service" },
      { claim: "On June 30, 2026, HubSpot announced the acquisition of Warmly (anonymous-visitor identification + proactive engagement AI); integration described as a long-term effort, not yet integrated at announcement", source: "warmly.ai/p/blog/warmly-is-joining-hubspot" },
      { claim: "299,458 paying customers (as of end of March 2026) and roughly $3.13B in 2025 full-year revenue", source: "ir.hubspot.com" },
    ],
  },

  'drift': {
    slug: "drift",
    competitorName: "Drift (Salesloft)",
    product: "chat",
    productName: "Meeton Chat",
    category: "Conversational Marketing",
    metaTitle: "Drift Alternative｜Pricing & Comparison｜Meeton Chat",
    metaDescription:
      "Drift pioneered conversational marketing, but Salesloft announced its gradual sunset in March 2026. Meeton Chat is an actively developed AI SDR — 5-second first response, 24/7 AI conversations, public pricing from ¥150,000/mo. Compare the two and plan your migration.",
    verdict:
      "If your sales org is already standardized on Salesloft for outbound cadences and you intend to follow its official successor path to 1mind, staying inside that ecosystem is a reasonable enterprise choice. Drift itself, however, entered a gradual sunset announced in March 2026. If you need an actively developed platform that takes website visitors from AI conversation to booked meetings and follow-up, Meeton Chat is the practical alternative.",
    competitorStrength:
      "Drift created the conversational-marketing category and built nearly a decade of thought leadership, with a combined global base of roughly 6,000 customers at the time of the Salesloft acquisition. Its mature ABM and account-routing logic, native integration with Salesloft's cadence platform, and broad third-party integration ecosystem made it a genuine enterprise standard for account-based selling.",
    rows: [
      C("Primary purpose", "Pipeline generation end to end: conversation → booking → content → follow-up (AI SDR)", "Conversational marketing (chat + ABM routing)", true),
      C("AI conversation", "5-second first response, 24/7 AI dialogue", "AI chatbot with routing to live chat or meeting booking"),
      C("Coverage", "Chat + on-site ads + content + booking + follow-up in one platform", "Chat + ABM (follow-up email lives in separate Salesloft products)", true),
      C("Pricing", "From ¥150,000/mo + add-ons (public)", "Not published (contact sales)", true),
      C("CRM integration", "Native HubSpot / Salesforce integration", "Native to Salesloft, plus a broad integration ecosystem"),
      C("Availability", "Actively developed (built in Japan, native-level Japanese support)", "Gradual sunset announced March 2026 (successor: 1mind)", true),
    ],
    chooseMeeton: [
      "You want one AI SDR covering chat, on-site ads, content, meeting booking, and follow-up (1-line JS tag, live in 5 minutes)",
      "You want 24/7 AI conversations with a 5-second first response — customers report 60%+ meeting conversion (EdulinX) and 20x chat leads (BizteX)",
      "You value public pricing (from ¥150,000/mo + add-ons), an actively developed product, and ISO 27001/27017 certification",
    ],
    chooseCompetitor: [
      "Your sales org is standardized on Salesloft cadences and you want buyer-conversation signals inside that same ecosystem",
      "You are an existing Drift customer planning to follow the official successor path to 1mind",
      "You run enterprise ABM in English-speaking markets and want to preserve mature account-routing assets through the transition",
    ],
    faq: [
      { q: "Is Drift being discontinued?", a: "Yes. Drift was acquired by Salesloft in February 2024, and in March 2026 Salesloft officially announced a \"gradual sunset\" of Drift alongside a partnership with AI-agent company 1mind, which is positioned as the successor product. As of July 2026, drift.com redirects to salesloft.com/platform/drift, which states \"We've transitioned from Drift to 1mind.\" New adoption of Drift is effectively no longer an option." },
      { q: "What is the difference between Drift and Meeton Chat?", a: "Drift pioneered conversational marketing with strong chat and ABM routing, but follow-up email sequences live in separate Salesloft products, and there is no evidence of Japanese localization or a Japan-based support team. Meeton Chat is an AI SDR that runs the full journey on one platform — 24/7 AI conversations with a 5-second first response, content recommendations, meeting booking, and follow-up — with native HubSpot / Salesforce integration and a 1-line JS tag that deploys in 5 minutes." },
      { q: "How much does Drift cost?", a: "Pricing is not published — both Salesloft and Drift require you to contact sales, and no official page lists prices (as of 2026). Meeton ai publishes its pricing: from ¥150,000/mo for the base plan, plus add-ons for meeting conversion and follow-up." },
    ],
    sources: [
      { claim: "On March 6, 2026, Clari + Salesloft announced a partnership with 1mind and officially confirmed Drift's gradual sunset; drift.com redirects to salesloft.com/platform/drift, which states \"We've transitioned from Drift to 1mind\"", source: "salesloft.com/company/newsroom/1-mind-partnership, salesloft.com/platform/drift" },
      { claim: "Salesloft acquired Drift on February 13, 2024; combined customer base of about 6,000 companies globally", source: "salesloft.com/company/newsroom/salesloft-acquires-drift" },
      { claim: "Pricing is not published (contact sales); no official page lists prices", source: "salesloft.com/platform/drift, help.salesloft.com" },
      { claim: "No evidence of Japanese localization or Japan-based support; Drift has 3 reviews and a 2.1/5 score on ITreview (Japan)", source: "itreview.jp/products/drift/profile" },
    ],
    alternative: true,
  },

  'qualified': {
    slug: "qualified",
    competitorName: "Qualified (Piper)",
    product: "chat",
    productName: "Meeton Chat",
    category: "AI SDR / pipeline chat",
    metaTitle: "Qualified (Piper) pricing, differences & AI alternative｜AI SDR chat｜Meeton",
    metaDescription:
      "Qualified (Piper AI SDR) is a Salesforce-native agentic marketing platform for enterprises, acquired by Salesforce in April 2026. Meeton Chat is Japanese-native with published pricing, covering conversation → booking → follow-up end to end. Choose by CRM stack and market.",
    verdict:
      "If you are an enterprise with Salesforce as your system of record and want visitor engagement (chat, voice, video) deeply wired into CRM data, Qualified (Piper) — now part of Salesforce — is a top contender. If you want to build pipeline in Japan with a Japanese-native product and support, published pricing, and one platform covering conversation through content, booking, and follow-up, Meeton Chat fits better.",
    competitorStrength:
      "Qualified was founded by former Salesforce executives and its AI SDR \"Piper\" is built natively on the Salesforce Platform. Its three-modality conversation experience (chat, voice, video) and integration depth — reading and writing Salesforce leads, opportunities, and custom objects — stand out among competitors. Its official site cites 500+ companies, and Salesforce completed its acquisition in April 2026 (consideration fair value of $1.2B). With Agentforce integration underway, it is the enterprise heavyweight, backed by deep resources and a strong track record.",
    rows: [
      C("Primary purpose", "Meeting conversion of new & latent leads (chat-first AI SDR)", "Salesforce-first agentic marketing (Piper AI SDR)"),
      C("AI conversation", "AI chat responds within 5 seconds, 24/7/365", "Conversations across 3 modalities: chat, voice, video"),
      C("Coverage", "Conversation + ads + content + booking + follow-up end to end", "Visitor engagement centric (added outbound agent \"Hunter\" in 2026)"),
      C("Pricing", "Base plan from ¥150,000/mo + add-ons (published)", "Not disclosed (inquiry & demo booking required)", true),
      C("CRM integration", "Native Salesforce / HubSpot integration", "Salesforce-native (deep read/write down to custom fields)"),
      C("Availability in Japan", "Made in Japan, Japanese-native product & support", "No dedicated Japan entity or Japanese pricing confirmed (demo published via Salesforce Japan)", true),
    ],
    chooseMeeton: [
      "You want to launch pipeline-generating chat with a Japanese-native product and support",
      "You want to evaluate with published pricing (base plan from ¥150,000/mo plus add-ons)",
      "You run a non-Salesforce-centric stack such as HubSpot, and want a one-line JS tag, 5-minute install",
    ],
    chooseCompetitor: [
      "You are an enterprise with Salesforce as the system of record and want engagement deeply wired into CRM data",
      "You need real-time voice and video conversation experiences on top of chat",
      "You are investing in a Salesforce-centric stack with Agentforce ecosystem integration in view",
    ],
    faq: [
      { q: "What is Qualified (Piper)?", a: "Qualified is a US-born agentic marketing platform whose AI SDR \"Piper\" converses with website visitors via chat, voice, and video, autonomously handling lead qualification, meeting booking, and AI email. It is built natively on the Salesforce Platform; Salesforce completed its acquisition in April 2026, and integration into Agentforce is underway as \"Qualified from Salesforce.\" In June 2026 it also announced \"Hunter,\" an outbound prospecting agent (contact identification + email sequences), so it is no longer inbound-only." },
      { q: "How much does Qualified cost?", a: "Qualified's pricing is not disclosed. Officially, only three plan tiers (Premier / Enterprise / Ultimate) and their feature differences are published; actual amounts require a demo booking and custom quote (as of 2026). Meeton ai publishes its pricing: base plan from ¥150,000/mo plus add-ons (meeting booking / win-back, ¥50,000/mo each)." },
      { q: "Does Qualified support Japanese and the Japan market?", a: "Piper's conversation features claim multi-language support, and in June 2026 — timed with Agentforce World Tour Tokyo — Piper was made available to try in Japanese on the Salesforce Japan official site. However, no dedicated Qualified Japan entity, Japanese-language support organization, or Japan pricing page has been confirmed (as of July 2026). If a Japanese-native product and support are prerequisites, the Japan-made Meeton Chat is the practical choice." },
    ],
    sources: [
      { claim: "Piper converses with website visitors via chat, voice, and video, reads/writes Salesforce CRM data, and executes meeting booking and AI email. Pricing spans three plans (Premier/Enterprise/Ultimate) with no amounts disclosed (inquiry required)", source: "qualified.com/pricing, qualified.com/ai-sdr, qualified.com/salesforce" },
      { claim: "Salesforce completed the acquisition in April 2026 (consideration fair value $1.2B, disclosed in Salesforce's FY2027 Q1 10-Q). Integration into Agentforce Sales/Marketing underway as \"Qualified from Salesforce.\" Official site shows 500+ companies", source: "sec.gov/Archives/edgar (crm-20260430), salesforceben.com, qualified.com" },
      { claim: "At Salesforce Connections in June 2026, announced the outbound Prospecting Agent \"Hunter\" (contact identification, outreach, email nurture), offered as an outbound complement to Piper", source: "salesforceben.com/how-many-ai-agents-is-too-many-salesforce-adds-four-more-at-connections" },
      { claim: "In June 2026, timed with Agentforce World Tour Tokyo, Piper became available to try in Japanese on the Salesforce Japan official site. No dedicated Qualified Japan entity or Japanese pricing confirmed", source: "salesforce.com/jp/blog/jp-inside-sales-ai-agent-piper" },
    ],
    alternative: true,
  },

  'warmly': {
    slug: "warmly",
    competitorName: "Warmly",
    product: "chat",
    productName: "Meeton Chat",
    category: "Visitor ID & signal-based GTM",
    metaTitle: "Warmly Pricing, Differences & AI Alternative｜Meeton Chat",
    metaDescription:
      "Warmly is a US-built GTM platform that de-anonymizes website visitors and turns them into warm outbound touches (it announced it is joining HubSpot in June 2026). Meeton Chat is a Japan-native AI SDR that runs conversation → booking → follow-up in one flow. Compare pricing, features, and Japan readiness.",
    verdict:
      "If you run an English-market B2B site and your core motion is identifying anonymous traffic and converting it into warm outbound touches, Warmly is a strong, well-built choice. If you want an AI conversation on a Japanese-language site to carry visitors all the way to booked meetings and follow-up, Meeton Chat is the better fit. The two solve different problems.",
    competitorStrength:
      "Warmly is a US-built GTM platform centered on real-time visitor de-anonymization. It publishes concrete numbers rather than vague marketing — an identification pipeline of about 3 seconds with claimed match rates of 15-30% at the person level and 30-60% at the company level — and connects identification to chat, Slack alerts, email sequences, and LinkedIn/Meta ad retargeting in one platform. With 500+ GTM teams as customers, a 4.6/5 G2 rating (208 reviews), roughly $17M raised, and an announced acquisition by HubSpot (June 30, 2026), its product-market fit is well validated.",
    rows: [
      C("Primary purpose", "Meeting conversion: conversation → booking → content → follow-up (AI SDR)", "Visitor de-anonymization → warm outbound touches (chat / email / ads)"),
      C("AI chat availability", "Included from the base plan; 5-second first response, 24/7", "From the Inbound Chat tier ($20,000/yr); entry tier is identification-only", true),
      C("Visitor identification", "Captured directly from visitors through conversation", "220M+ record matching; 30-60% company-level, 15-30% person-level in ~3 seconds"),
      C("Japanese-market support", "Japan-native platform; ISO 27001/27017", "English only; no public evidence of Japanese UI or local support", true),
      C("Pricing", "From ¥150,000/mo + add-ons (public, monthly)", "$10,000-30,000/yr + add-ons (public, annual/quarterly contracts)"),
      C("CRM integration", "Native HubSpot / Salesforce integration", "CRM sync, Slack alerts, lead routing (announced it is joining HubSpot)"),
    ],
    chooseMeeton: [
      "You sell to the Japanese market and want conversations on a Japanese-language site to convert into booked meetings and follow-up (60%+ meeting conversion at EdulinX)",
      "You want AI chat from the base plan — 5-second first response, 24/7, deployed with a one-line JS tag in about 5 minutes",
      "You need public monthly pricing (from ¥150,000/mo) and ISO 27001/27017 for procurement in Japan",
    ],
    chooseCompetitor: [
      "You run an English-market B2B SaaS where de-anonymizing traffic and converting it into warm outbound is the core motion",
      "You want Slack alerts, email sequences, and LinkedIn/Meta retargeting orchestrated in one US-style GTM stack",
      "You are betting on deep HubSpot ecosystem integration (acquisition announced June 2026)",
    ],
    faq: [
      { q: "What is the difference between Warmly and Meeton Chat?", a: "Warmly is a US-built GTM platform that identifies anonymous website visitors at the company and person level (claimed 30-60% company-level and 15-30% person-level match rates, in about 3 seconds) and engages them with chat, email, and ad retargeting. Meeton Chat is a Japan-native AI SDR: an AI conversation with a 5-second first response carries visitors through booking, content sharing, and follow-up in one flow. Choose Warmly for warm-outbound motions on English-market traffic; choose Meeton for inbound meeting conversion on Japanese-language sites." },
      { q: "How much does Warmly cost?", a: "Warmly publishes its pricing: AI Web-Deanonymization at $10,000/year, Inbound Chat at $20,000/year, and AI Inbound Autopilot at $30,000/year, plus add-ons at $10,000/year each (as of July 2026, annual or quarterly contracts). AI chat is only available from the $20,000/year tier. Meeton ai publishes monthly pricing from ¥150,000/month plus add-ons." },
      { q: "Was Warmly acquired by HubSpot?", a: "On June 30, 2026, Warmly announced on its own blog that it is joining HubSpot, and independent press confirmed the acquisition (terms undisclosed). Warmly states that existing contracts, pricing, and the product remain unchanged for now, but its stated long-term ambition is integration across HubSpot's platform, so its roadmap as an independent product may change." },
    ],
    sources: [
      { claim: "Public pricing: AI Web-Deanonymization $10,000/yr, Inbound Chat $20,000/yr, AI Inbound Autopilot $30,000/yr, add-ons $10,000/yr each; no free plan on the current page; AI chat from the $20,000/yr tier", source: "warmly.ai/p/pricing" },
      { claim: "Visitor ID in ~3 seconds against 220M+ records; claimed match rates 15-30% person-level, 30-60% company-level; post-ID chat, Slack alerts, email, and LinkedIn/Meta ads", source: "warmly.ai/p/solutions/use-cases/website-visitor-identification" },
      { claim: "Announced it is joining HubSpot on June 30, 2026 (terms undisclosed); existing contracts, pricing, and product stated unchanged for now; confirmed by independent press", source: "warmly.ai/p/blog/warmly-is-joining-hubspot, cmswire.com" },
      { claim: "Founded 2020 in San Francisco (YC), ~60 employees, ~$17M total raised; 500+ GTM teams as customers; G2 4.6/5 (208 reviews)", source: "ycombinator.com/companies/warmly, g2.com/products/warmly-warmly/reviews" },
      { claim: "Official site, product, and pricing are English-only; no public evidence of Japanese UI, local support, or Japan case studies; no ISO/ISMS certification found (GDPR compliance claimed)", source: "warmly.ai" },
    ],
    alternative: true,
  },

  'fin': {
    slug: "fin",
    competitorName: "Fin",
    product: "chat",
    productName: "Meeton Chat",
    category: "AI agents / customer service AI",
    metaTitle: "Fin (by Intercom) alternative: pricing & differences｜Support AI vs sales AI SDR｜Meeton Chat",
    metaDescription:
      "Fin (formerly Intercom) is the flagship customer-service AI agent, autonomously resolving support conversations. Meeton Chat is a sales-side AI SDR that turns website visitors into booked meetings. Compare pricing models, Fin for Sales' inbound-only scope, and when each one fits.",
    verdict:
      "If your goal is automating customer-support resolution — deflecting conversations across chat, email, voice, and social at scale — Fin is the category leader, with a model purpose-trained for support and large published results. If your goal is turning website visitors into qualified leads and booked sales meetings, Meeton Chat is built for exactly that job. Fin for Sales (April 2026) adds inbound qualification, but it remains a bolt-on to a support platform: no outbound, no standalone email nurture, no on-site ads. Different jobs — choose by the problem you are hiring the AI to solve.",
    competitorStrength:
      "Fin — the company formerly known as Intercom, renamed in May 2026 — is the flagship AI agent for customer service, with a model post-trained specifically on support conversations and a company-claimed 76% average resolution rate. It spans 10+ channels (web, email, voice, SMS, WhatsApp, Slack, and more), can run standalone on top of Salesforce, HubSpot, or Freshworks helpdesks without migration, and gained significant enterprise backing when Salesforce agreed to acquire it for ~$3.6B in June 2026 — though the Agentforce transition adds near-term roadmap uncertainty.",
    rows: [
      C("Primary purpose", "Turning website visitors into leads and booked meetings (AI SDR)", "Autonomous resolution of customer-support conversations"),
      C("Target team", "Marketing and inside sales (new-lead acquisition)", "Customer support / CS teams (sales framed as an emerging expansion)"),
      C("Lead capture & meeting booking", "AI engages within 5 seconds, books meetings 24/7 (60%+ meeting conversion at EdulinX)", "Fin for Sales is inbound-only; books via Calendly / Chili Piper; no outbound prospecting or email nurture", true),
      C("Pricing model", "Published flat base plan from ¥150,000/mo + 1-month free trial", "Metered: $0.99/outcome + $9.99/qualification, plus Intercom seats $39–139/seat/mo; USD only", true),
      C("Japanese support", "Japanese-native product and team", "45+ languages incl. Japanese, but JP answers require customer-added training content; no JP entity, USD billing", true),
      C("CRM integration", "Native HubSpot / Salesforce auto-registration", "Mature native Salesforce / HubSpot / Freshworks ecosystem (folding into Agentforce post-acquisition)"),
    ],
    chooseMeeton: [
      "You want website visitors captured and carried to a booked meeting automatically — customers report 60%+ meeting conversion (EdulinX) and 20x chat-sourced leads (BizteX)",
      "You want a published flat price (from ¥150,000/mo with a 1-month free trial) instead of metered per-outcome fees stacked on seat plans",
      "You want a 1-line JS tag, 5-minute setup, and leads auto-registered in HubSpot / Salesforce",
    ],
    chooseCompetitor: [
      "You want to auto-resolve a high volume of customer-support conversations across 10+ channels, including voice and WhatsApp",
      "You want to add a support AI on top of your existing helpdesk (Salesforce / HubSpot / Freshworks) without migrating",
    ],
    faq: [
      { q: "What is the difference between Fin (by Intercom) and Meeton Chat?", a: "Fin is a customer-service AI agent: it autonomously resolves support conversations across 10+ channels, with a company-claimed 76% average resolution rate. In April 2026 it added Fin for Sales, an inbound-only sales agent, and in June 2026 Salesforce agreed to acquire Fin for ~$3.6B, folding it into Agentforce. Meeton Chat is a sales-side AI SDR: it engages website visitors within 5 seconds, 24/7, qualifies them in conversation, and books the meeting — customers report 60%+ meeting conversion (EdulinX) and 2x monthly SQLs (G-gen). Choose Fin for support automation; choose Meeton Chat for website lead generation and meeting booking." },
      { q: "Can Fin for Sales replace an AI SDR?", a: "Only for the inbound slice. Fin for Sales qualifies visitors already showing intent on your site ($9.99 per qualification) and books meetings via Calendly or Chili Piper, but Fin's own FAQ states it does not do outbound prospecting or standalone automated email nurture, and it requires an Intercom seat plan. A purpose-built AI SDR platform like Meeton ai covers the funnel in one product — chat capture, on-site ads, content library, meeting booking, and follow-up email — at a flat published price." },
      { q: "How does Fin's pricing compare with Meeton Chat?", a: "Fin is metered: $0.99 per outcome (resolutions, handoffs, disqualifications) and $9.99 per sales qualification, plus Intercom seat plans ($39–139/seat/mo monthly, $29–132 annual) when run on Intercom; standalone deployment on an existing helpdesk starts at a 50-outcome monthly minimum (~$49/mo). Billing is USD-only, with a 14-day free trial. Meeton ai publishes a flat base plan from ¥150,000/mo with a 1-month free trial — costs stay predictable regardless of conversation volume." },
    ],
    sources: [
      { claim: "Fin for Sales launched April 22, 2026: intent-triggered inbound engagement, AI qualification playbook, meeting booking via Calendly / Chili Piper, CRM routing. Fin's own FAQ confirms it is inbound-only with no outbound prospecting or standalone automated email nurture", source: "intercom.com/blog/announcing-fin-for-sales, intercom.com/help/en/articles/13927115" },
      { claim: "Pricing: $0.99/outcome (resolutions, handoffs, disqualifications) + $9.99/qualification; Intercom seat plans Essential $39 / Advanced $99 / Expert $139 monthly ($29/$85/$132 annual) required for Fin-on-Intercom; standalone from a 50-outcome/mo minimum; USD only, no JPY; 14-day free trial", source: "fin.ai/pricing, intercom.com/pricing" },
      { claim: "Company-claimed 76% average resolution rate, ~12,000 businesses, 1M+ conversations/week (unaudited marketing figures; June 2026 acquisition-era press cited larger current figures of 30,000+ customers and ~2M weekly resolutions)", source: "fin.ai/learn/what-is-fin-ai-agent, techcrunch.com" },
      { claim: "Intercom, Inc. renamed to Fin on May 12, 2026 (Intercom remains only as the helpdesk product name); on June 15, 2026 Salesforce signed a definitive agreement to acquire Fin for ~$3.6B, expected to close Salesforce FY2027 Q4, folding into Agentforce", source: "intercom.com/blog/today-intercom-becomes-fin, salesforce.com/news" },
      { claim: "Japanese admin interface launched April 2025; INNOOV is described as Japan's first official authorized reseller; Fin supports 45+ languages incl. Japanese but Japanese answers depend on customer-added training content per workspace", source: "prtimes.jp/main/html/rd/p/000000018.000044187.html, innoov.io/intercom_fin, intercom.com/help/en/articles/8322387" },
      { claim: "Fin runs standalone on existing helpdesks (Salesforce, HubSpot, Freshworks, Zoho, etc.); non-Intercom deployment is sold via sales, not self-serve", source: "fin.ai/integrations, intercom.com/help/en/articles/10118495" },
    ],
    alternative: true,
  },
};

export function getCompare(slug: string): CompareData | undefined {
  return COMPARE[slug];
}
export function getCompareEn(slug: string): CompareData | undefined {
  return COMPARE_EN[slug];
}
export function allCompareSlugs(): string[] {
  return Object.keys(COMPARE);
}
export function alternativeSlugs(): string[] {
  return Object.values(COMPARE).filter((c) => c.alternative).map((c) => c.slug);
}
