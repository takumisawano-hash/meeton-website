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
  product: "calendar" | "chat" | "library" | "email";
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
      C("料金", "月額12万円〜の3プラン（公開）", "非公開（要問い合わせ）", true),
      C("CRM連携", "Salesforce / HubSpot 自動登録", "Salesforce / HubSpot 連携・自動差配"),
      C("提供", "国産・日本語ネイティブ", "国産・日本語ネイティブ"),
    ],
    chooseMeeton: [
      "予約だけでなく会話・資料提案・追客まで1つのAI SDRで完結させたい",
      "公開された料金体系（月額12万円〜）で検討を進めたい",
      "問い合わせ前の潜在層にもチャットで踏み込みたい",
    ],
    chooseCompetitor: [
      "サンクスページ商談化に用途を絞って堅実に導入したい",
      "展示会名刺など特定3導線の商談化が主目的",
    ],
    faq: [
      { q: "immedio と Meeton Calendar はどちらが商談化に強いですか？", a: "どちらもインバウンドの商談化に強い国産SaaSです。immedio はサンクスページ商談化の専業として実績が豊富です。Meeton Calendar は、予約の前にAIが会話で温度を上げ、さらにチャット・資料共有・追客まで同じプラットフォームで繋がる点が異なります。用途が予約特化なら immedio、会話から追客まで一気通貫にしたいなら Meeton が向きます。" },
      { q: "料金はどうなっていますか？", a: "Meeton ai は月額12万円〜の3プラン（リード獲得 / 商談獲得 / オールインワン）で、料金を公開しています。immedio は公開価格がなく要問い合わせです（2026年時点）。" },
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
      C("料金感", "月額12万円〜の3プラン（税抜・公開）", "無料〜プレミアム ¥1,500/月程度（税抜・ユーザー）"),
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
      { q: "料金はどちらが安いですか？", a: "純粋な日程調整の単価は TimeRex（無料〜月¥1,500程度/ユーザー）の方が安価です。Meeton ai は月額12万円〜の3プラン（税抜）で、会話・自動アサイン・CRM登録など商談化機能まで含みます。比較は『何を解きたいか』で行うのが適切です。" },
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
      C("料金", "月額12万円〜の3プラン（公開）", "無料（3名まで）〜チームプラン"),
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
      C("料金", "月額12万円〜の3プラン（公開）", "無料（1イベントタイプ）〜有料プラン"),
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
      { q: "料金はどうなっていますか？", a: "Meeton ai は月額12万円〜の3プラン（リード獲得 / 商談獲得 / オールインワン）で、料金を公開しています。DocSend は常設無料プランがなく、14日間トライアルが提供されています（2026年時点）。" },
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
      C("料金感", "月額12万円〜の3プラン（税抜・公開）", "席料 + Fin $0.99/解決の従量"),
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
      { q: "料金はどう違いますか？", a: "Intercom は席料（$29〜132/seat/月）に加え Fin AI が $0.99/解決件の従量課金です。Meeton ai は月額12万円〜の3プラン（税抜）で、月間トラフィックと機能で変動するシンプルな体系です。用途と課金体系が異なるため、目的に沿って選ぶのが適切です。" },
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
      C("Pricing", "3 plans from ¥120,000/mo (published)", "Not disclosed (contact required)", true),
      C("CRM integration", "Auto-registers to Salesforce / HubSpot", "Salesforce / HubSpot integration & auto-routing"),
      C("Provided by", "Made in Japan, Japanese-native", "Made in Japan, Japanese-native"),
    ],
    chooseMeeton: [
      "You want to complete not just booking but conversation, content recommendation, and follow-up in one AI SDR",
      "You want to move forward with a published pricing structure (from ¥120,000/mo)",
      "You want to engage even pre-inquiry prospects via chat",
    ],
    chooseCompetitor: [
      "You want to solidly deploy with a use case narrowed to thank-you-page meeting conversion",
      "Your main goal is meeting conversion for 3 specific flows such as trade-show business cards",
    ],
    faq: [
      { q: "Which is stronger at meeting conversion, immedio or Meeton Calendar?", a: "Both are Japanese SaaS strong at inbound meeting conversion. immedio has a rich track record as a specialist in thank-you-page meeting conversion. Meeton Calendar differs in that, before booking, the AI warms up the lead through conversation, and chat, content sharing, and follow-up all connect on the same platform. If your use case is booking-focused, immedio fits; if you want everything from conversation to follow-up end to end, Meeton fits." },
      { q: "How does pricing work?", a: "Meeton ai has 3 plans from ¥120,000/mo (Lead Generation / Meeting Generation / All-in-One) and discloses its pricing. immedio has no public pricing and requires an inquiry (as of 2026)." },
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
      C("Pricing feel", "3 plans from ¥120,000/mo (excl. tax, published)", "Free to Premium, around ¥1,500/mo (excl. tax, per user)"),
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
      { q: "Which is cheaper?", a: "For pure scheduling, the unit price of TimeRex (free to about ¥1,500/mo per user) is lower. Meeton ai has 3 plans from ¥120,000/mo (excl. tax), including meeting-conversion features such as conversation, auto-assignment, and CRM registration. It is appropriate to compare based on \"what problem you want to solve.\"" },
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
      C("Pricing", "3 plans from ¥120,000/mo (published)", "Free (up to 3 people) to Team plans"),
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
      C("Pricing", "3 plans from ¥120,000/mo (published)", "Free (1 event type) to paid plans"),
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
      { q: "How does pricing work?", a: "Meeton ai has 3 plans from ¥120,000/mo (Lead Generation / Meeting Generation / All-in-One) and discloses its pricing. DocSend has no permanent free plan and offers a 14-day trial (as of 2026)." },
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
      C("Pricing feel", "3 plans from ¥120,000/mo (excl. tax, published)", "Seat fee + Fin $0.99/resolution usage-based"),
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
      { q: "How does pricing differ?", a: "Intercom charges a seat fee ($29–132/seat/mo) plus usage-based Fin AI at $0.99/resolution. Meeton ai has 3 plans from ¥120,000/mo (excl. tax), a simple structure that varies by monthly traffic and features. Because the use cases and billing models differ, it is appropriate to choose based on your purpose." },
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
