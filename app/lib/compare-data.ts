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
    metaTitle: "Meeton Calendar と immedio の違い｜インバウンド商談化の比較",
    metaDescription:
      "immedio はサンクスページ商談化に特化した実績ある国産SaaS。Meeton Calendar は会話・資料・予約・追客まで一気通貫のAI SDRで、無料から始められる点が違い。用途別の使い分けを比較表で解説。",
    verdict:
      "サンクスページでの即時商談化「だけ」を堅実に固めたいなら、専業で実績豊富な immedio は有力です。会話で温度を上げ、資料提案・追客まで1つのAI SDRで一気通貫にしたい、まず無料で試したい場合は Meeton Calendar が向きます。",
    competitorStrength:
      "immedio はフォーム送信直後という最も熱量の高い瞬間の商談化に特化した国産SaaSで、上場SaaS企業を含む豊富な導入実績とISMS認証を持つ堅実な選択肢です。その専業の完成度は明確な強みです。",
    rows: [
      C("主目的", "会話→予約→資料→追客の商談化（AI SDR）", "サンクスページでの即時商談化", true),
      C("予約前のAI会話", "AIが対話し温度を上げてから予約へ", "フォーム後にポップアップで予約提示", true),
      C("カバー範囲", "予約＋チャット＋資料共有＋追客の4機能", "商談化（サンクスページ/資料/名刺の3導線）"),
      C("無料プラン", "あり（クレカ不要で開始）", "なし（要問い合わせ）", true),
      C("CRM連携", "Salesforce / HubSpot 自動登録", "Salesforce / HubSpot 連携・自動差配"),
      C("提供", "国産・日本語ネイティブ", "国産・日本語ネイティブ"),
    ],
    chooseMeeton: [
      "予約だけでなく会話・資料提案・追客まで1つのAI SDRで完結させたい",
      "まず無料（クレカ不要）で効果を確かめてから拡げたい",
      "問い合わせ前の潜在層にもチャットで踏み込みたい",
    ],
    chooseCompetitor: [
      "サンクスページ商談化に用途を絞って堅実に導入したい",
      "展示会名刺など特定3導線の商談化が主目的",
    ],
    faq: [
      { q: "immedio と Meeton Calendar はどちらが商談化に強いですか？", a: "どちらもインバウンドの商談化に強い国産SaaSです。immedio はサンクスページ商談化の専業として実績が豊富です。Meeton Calendar は、予約の前にAIが会話で温度を上げ、さらにチャット・資料共有・追客まで同じプラットフォームで繋がる点が異なります。用途が予約特化なら immedio、会話から追客まで一気通貫にしたいなら Meeton が向きます。" },
      { q: "無料で始められますか？", a: "Meeton Calendar には無料ティア（1名・基本予約）があり、クレジットカード不要で始められます。immedio は公開価格がなく要問い合わせで、常設無料プランは確認されていません。" },
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
    metaTitle: "Meeton Calendar と TimeRex の違い｜日程調整 vs 商談化",
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
      C("無料プラン", "あり（1名・基本予約）", "あり（フリープラン）"),
      C("料金感", "無料〜単体Pro ¥4万/月（税抜）", "無料〜プレミアム ¥1,500/月程度（税抜・ユーザー）"),
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
      { q: "料金はどちらが安いですか？", a: "純粋な日程調整の単価は TimeRex（無料〜月¥1,500程度/ユーザー）の方が安価です。Meeton Calendar は無料ティアの後、単体Pro ¥4万/月（税抜）で、会話・自動アサイン・CRM登録など商談化機能まで含みます。比較は『何を解きたいか』で行うのが適切です。" },
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
    metaTitle: "Meeton Calendar と Spir の違い｜日程調整 vs 商談化AI",
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
      C("無料プラン", "あり（1名・基本予約）", "あり（3名まで）"),
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
    metaTitle: "Meeton Calendar と Calendly の違い｜日本語×商談化で比較",
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
      C("無料プラン", "あり（1名・基本予約）", "あり（1イベントタイプ）"),
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
    metaTitle: "Meeton Library と DocSend の違い｜AI解説×CRM不要で比較",
    metaDescription:
      "DocSend はページ単位の精密な資料トラッキングとVDRに強いDropbox傘下の定番。Meeton Library はAIチャットが資料を解説し、CRM不要・日本語で開封を可視化、追客まで繋ぐ。精密追跡/VDRか、AI解説×商談化かで使い分け。",
    verdict:
      "ピッチデックのページ単位精密トラッキングやデータルーム（VDR）が主目的なら、定番の DocSend が堅実です。資料をAIが解説し、開封を商談化・追客まで繋ぎたい、日本語でCRB不要に始めたいなら Meeton Library が向きます。",
    competitorStrength:
      "DocSend は「誰がどのページを何秒読んだか」をページ単位で追える精密なエンゲージメント分析と、資金調達・M&Aで使えるVDRが強みのDropbox傘下の定番です。トラッキング精度では業界屈指です。",
    rows: [
      C("主目的", "資料提案→AI解説→開封可視化→追客", "資料共有・精密トラッキング・VDR"),
      C("AIによる資料解説", "AIチャットが中身を解説・質問に回答", "なし（閲覧トラッキングが中心）", true),
      C("開封トラッキング", "誰がいつどこまで見たかを可視化", "ページ単位の精密トラッキングに強み"),
      C("追客への接続", "Email/Calendar へ自動で橋渡し", "Salesforce連携（有料アドオン）等"),
      C("CRM要否 / 無料", "CRM不要・無料ティアあり", "無料プランなし（14日トライアル）", true),
      C("提供", "日本語ネイティブ", "英語中心（日本語UIは要確認）", true),
    ],
    chooseMeeton: [
      "資料をAIが解説し、受け手の理解と前進を助けたい",
      "CRM不要・無料で開封トラッキングを始めたい",
      "開封シグナルを追客（Email/Calendar）まで繋ぎたい",
    ],
    chooseCompetitor: [
      "ピッチデックのページ単位精密トラッキングが主目的",
      "資金調達・M&Aのデータルーム（VDR）が必要",
    ],
    faq: [
      { q: "DocSend と Meeton Library の違いは？", a: "DocSend はページ単位の精密な資料トラッキングとVDRに強いDropbox傘下の定番です。Meeton Library はそこにAIチャットによる資料解説を加え、CRM不要・日本語で始められ、開封シグナルをEmail/Calendarへ繋いで追客まで自動化する点が異なります。" },
      { q: "無料で使えますか？", a: "Meeton Library には無料ティア（資料3点・基本開封トラッキング）があり、クレジットカード不要で始められます。DocSend は常設無料プランがなく、14日間トライアルが提供されています（2026年時点）。" },
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
    metaTitle: "Meeton Chat と Intercom の違い｜サポート vs 商談化AI",
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
      C("料金感", "無料〜単体Pro ¥3万/月（税抜）", "席料 + Fin $0.99/解決の従量"),
      C("提供", "日本語ネイティブ・商談化特化", "英語中心・サポート特化"),
    ],
    chooseMeeton: [
      "新規・潜在リードを会話で掴んで商談化したい",
      "問い合わせ前の検討段階に踏み込みたい",
      "無料・日本語で商談化に特化して始めたい",
    ],
    chooseCompetitor: [
      "既存顧客のサポート問い合わせを大量に自動解決したい",
      "全チャネル統合のカスタマーサービス基盤が必要",
    ],
    faq: [
      { q: "Intercom と Meeton Chat はどちらが良いですか？", a: "解きたい課題が異なります。Intercom（Fin）は既存顧客のカスタマーサポート自動化に強く、問い合わせ解決率の高さが特長です。Meeton Chat は新規・潜在リードの『商談化』に特化し、接触前の検討の土台に立って会話し、温度が上がれば予約まで運びます。サポート削減なら Intercom、商談獲得なら Meeton が向きます。" },
      { q: "料金はどう違いますか？", a: "Intercom は席料（$29〜132/seat/月）に加え Fin AI が $0.99/解決件の従量課金です。Meeton Chat は無料ティアの後、単体Pro ¥3万/月（税抜・会話実質無制限）とシンプルです。用途と課金体系が異なるため、目的に沿って選ぶのが適切です。" },
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
    metaTitle: "Meeton Email と lemlist の違い｜コールド配信 vs 行動追客AI",
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
    metaTitle: "Meeton Email と Smartlead の違い｜大量配信 vs 行動追客AI",
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

export function getCompare(slug: string): CompareData | undefined {
  return COMPARE[slug];
}
export function allCompareSlugs(): string[] {
  return Object.keys(COMPARE);
}
export function alternativeSlugs(): string[] {
  return Object.values(COMPARE).filter((c) => c.alternative).map((c) => c.slug);
}
