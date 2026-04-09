export type IntegrationCategory = "crm" | "notify" | "calendar" | "meeting";

export type IntegrationUseCase = {
  title: string;
  description: string;
};

export type IntegrationLocaleContent = {
  categoryLabel: string;
  tagline: string;
  description: string;
  ctaText: string;
  steps: string[];
  /** Optional note shown after install steps (e.g. troubleshooting link). */
  installNote?: string;
  /** Optional prerequisites text shown in "Usage & Prerequisites" section. */
  prerequisites?: string;
  /** Optional feature use-cases shown in "Usage & Prerequisites" section. */
  useCases?: IntegrationUseCase[];
  uninstallSteps: string[];
  /** Optional paragraph describing implications of removal. */
  uninstallImplications?: string;
  /** Optional paragraph describing how user data is handled after removal. */
  dataHandling?: string;
};

export type Integration = {
  slug: string;
  name: string;
  logo: string;
  category: IntegrationCategory;
  en: IntegrationLocaleContent;
  ja: IntegrationLocaleContent;
  links: {
    cta: string;
    website: string;
    support: string;
    privacyPolicy: string;
  };
};

export const integrations: Integration[] = [
  {
    slug: "slack",
    name: "Slack",
    logo: "/integrations/03_Slack.png",
    category: "notify",
    en: {
      categoryLabel: "Notifications & alerts",
      tagline: "Get instant deal and lead alerts in any Slack channel.",
      description:
        "Meeton AI is an AI-powered sales assistant that runs on your website — automatically engaging visitors, qualifying leads, and booking meetings. Connect Meeton AI to Slack and your whole team stays informed in real time: receive alerts the moment a visitor sends a message, a lead shares their contact info, a meeting is booked, or a known lead returns to your site. Every notification includes a direct link to the visitor's profile in Meeton AI, so your reps can jump into context and act fast.",
      ctaText: "Connect Slack",
      steps: [
        "Log into your Meeton ai account at app.dynameet.ai.",
        "Navigate to Settings → Integrations.",
        "Click Connect next to the Slack logo and authorize your workspace.",
        "Select the channel(s) to receive notifications and click Save.",
      ],
      installNote:
        "Need help finding the Slack setup? Log in to app.dynameet.ai and go to Settings → Integrations.",
      prerequisites:
        "An active Meeton AI account at app.dynameet.ai and Slack workspace Admin or App Management permissions to authorize third-party apps.",
      useCases: [
        {
          title: "Real-Time Chat Alerts",
          description:
            "See visitor messages and the AI's replies posted to your Slack channel the moment they happen. Your team can monitor conversations and jump in whenever a high-value lead appears.",
        },
        {
          title: "Lead Capture & Meeting Booking Notifications",
          description:
            "Get a Slack alert the moment a visitor shares their contact info or books a meeting — including their name, email, and scheduled time. No need to log in to stay on top of your pipeline.",
        },
        {
          title: "Return Visitor & Content Engagement Alerts",
          description:
            "Know when a known lead revisits your site or opens your Download Center. Perfectly timed outreach starts with knowing exactly when a prospect is actively engaging.",
        },
        {
          title: "Direct Links to Visitor Profiles",
          description:
            "Every Slack notification includes a clickable link to that visitor's full profile in Meeton AI — conversation history, contact info, and intent signals — so your team can act without switching contexts.",
        },
      ],
      uninstallSteps: [
        "Log into your DynaMeet account at app.dynameet.ai.",
        "Navigate to Settings → Integrations.",
        "Click Disconnect next to the Slack logo.",
        "Confirm the disconnection. Notifications to Slack will stop immediately.",
      ],
      uninstallImplications:
        "Once disconnected, Meeton AI will immediately stop sending notifications to Slack. Your existing Slack messages and channel history are not affected.",
      dataHandling:
        "Upon disconnection, Meeton AI permanently deletes your Slack OAuth tokens from our database. No visitor data or notification history is retained by Meeton AI after removal.",
    },
    ja: {
      categoryLabel: "通知・アラート",
      tagline: "商談予約・リード獲得をSlackへリアルタイム通知。",
      description:
        "Meeton AIは、Webサイト上でリアルタイムに訪問者と対話し、リードを自動獲得・商談予約まで行うAI搭載の営業アシスタントです。Meeton AIとSlackを連携すると、訪問者からのチャットメッセージ送信・リード化・商談予約・既知リードの再訪問など、重要なイベントが起きた瞬間にチームへSlack通知が届きます。すべての通知には訪問者プロフィールへの直接リンクが含まれており、ダッシュボードにログインせずとも即座にアクションできます。",
      ctaText: "Slackと連携する",
      steps: [
        "app.dynameet.ai にログインします。",
        "設定 → 連携 を開きます。",
        "Slackの「連携を開始する」をクリックし、ワークスペースを認証します。",
        "通知を受け取るチャンネルを選択して「保存」をクリックすれば完了です。",
      ],
      installNote:
        "Slack連携の設定が見つからない場合は、app.dynameet.ai にログインし、設定 → 連携 を開いてください。",
      prerequisites:
        "app.dynameet.ai のMeeton AIアカウントと、Slackワークスペースでのアプリ管理またはAdmin権限が必要です。",
      useCases: [
        {
          title: "リアルタイムチャットアラート",
          description:
            "訪問者のメッセージとAIの返答が、送信された瞬間にSlackチャンネルへ投稿されます。チームはチャットをモニタリングし、重要なリードが現れた際にすぐ対応できます。",
        },
        {
          title: "リード獲得・商談予約通知",
          description:
            "訪問者が連絡先を共有した瞬間・商談を予約した瞬間にSlack通知が届きます。氏名・メールアドレス・予約日時が含まれるため、ダッシュボードにログインしなくてもパイプラインを把握できます。",
        },
        {
          title: "再訪問・コンテンツエンゲージメントアラート",
          description:
            "既知のリードがサイトを再訪問したり、ダウンロードセンターを開いたりした際に通知が届きます。見込み客がアクティブなタイミングを把握して、最適な間隔でアウトリーチを実施できます。",
        },
        {
          title: "訪問者プロフィールへの直接リンク",
          description:
            "すべてのSlack通知に、訪問者のMeeton AI上のプロフィールへのリンクが含まれます。会話履歴・連絡先・購買意向シグナルにワンクリックでアクセスでき、すぐにアクションへ移れます。",
        },
      ],
      uninstallSteps: [
        "app.dynameet.ai にログインします。",
        "設定 → 連携 を開きます。",
        "Slackの「連携を解除する」をクリックします。",
        "確認ダイアログで解除を確定します。Slackへの通知は即座に停止されます。",
      ],
      uninstallImplications:
        "連携解除後、Meeton AIからSlackへの通知は即座に停止されます。すでにSlack上に投稿されたメッセージやチャンネル履歴には影響しません。",
      dataHandling:
        "連携解除後、Meeton AIはSlack OAuth認証トークンをデータベースから完全に削除します。解除後、訪問者データや通知履歴はMeeton AI側に一切保持されません。",
    },
    links: {
      cta: "https://app.dynameet.ai/settings/integrations",
      website: "https://dynameet.ai",
      support: "mailto:support@dynameet.ai",
      privacyPolicy: "https://dynameet.ai/privacy-policy",
    },
  },
  {
    slug: "zoom",
    name: "Zoom",
    logo: "/integrations/07_Zoom.png",
    category: "meeting",
    en: {
      categoryLabel: "Video conferencing",
      tagline: "Auto-generate Zoom links the moment a meeting is booked.",
      description:
        "Connect your Zoom account to Meeton ai and automatically generate a unique Zoom meeting link the moment a meeting is booked. Links are added to calendar invites instantly — no manual copy-paste needed.",
      ctaText: "Connect Zoom",
      steps: [
        "Log into your Meeton ai account at app.dynameet.ai.",
        "Navigate to Settings → Integrations.",
        "Click Connect next to the Zoom logo and authorize your Zoom account.",
        "All future bookings will automatically include a Zoom link.",
      ],
      installNote: "Having trouble?",
      prerequisites:
        "You must have an active DynaMeet account and a Zoom account.",
      useCases: [
        {
          title: "Auto-Generate Meeting Links",
          description:
            "Once connected, Meeton AI automatically generates a unique Zoom meeting link the moment a meeting is booked. When a client schedules a meeting with you through your Meeton AI booking page, our integration automatically creates a Zoom meeting and adds the join link directly to both your and your client's calendar invite. No manual copy-pasting is needed.",
        },
      ],
      uninstallSteps: [
        "Log in to your Zoom account and navigate to the Zoom App Marketplace.",
        "Click Manage > Added Apps or search for the \u201cDynaMeet\u201d app.",
        "Select the \u201cDynaMeet\u201d app.",
        "Click Remove.",
      ],
      uninstallImplications:
        "Once removed, DynaMeet will immediately lose access to your Zoom account. Any new meetings booked through DynaMeet will no longer include an automatically generated Zoom link.",
      dataHandling:
        "Upon de-authorizing the app, DynaMeet will permanently delete your Zoom authentication tokens from our database. We do not retain any Zoom-specific data after removal. Any Zoom meetings that were successfully scheduled prior to removal will remain intact on your calendar.",
    },
    ja: {
      categoryLabel: "Web会議連携",
      tagline: "商談予約と同時にZoomリンクを自動生成。",
      description:
        "ZoomアカウントをDynaMeetと接続することで、商談が予約されると同時にZoomミーティングリンクを自動生成・カレンダーに追加します。URLの発行・共有作業をゼロにします。",
      ctaText: "Zoomと連携する",
      steps: [
        "app.dynameet.ai にログインします。",
        "設定 → 連携 を開きます。",
        "Zoomの「連携を開始する」をクリックし、Zoomアカウントを認証します。",
        "以降、すべての商談予約にZoomリンクが自動付与されます。",
      ],
      installNote: "うまくいかない場合は、",
      prerequisites: "DynaMeetアカウントおよびZoomアカウントが必要です。",
      useCases: [
        {
          title: "ミーティングリンクの自動生成",
          description:
            "連携後、Meeton AIは商談が予約された瞬間にZoomミーティングリンクを自動生成します。クライアントがMeeton AIの予約ページから商談を予約すると、Zoomミーティングが自動的に作成され、あなたとクライアントの両方のカレンダー招待にリンクが追加されます。手動でのコピー＆ペーストは不要です。",
        },
      ],
      uninstallSteps: [
        "Zoomアカウントにログインし、Zoom App Marketplaceに移動します。",
        "「管理」→「追加済みアプリ」をクリックするか、「DynaMeet」アプリを検索します。",
        "「DynaMeet」アプリを選択します。",
        "「削除」をクリックします。",
      ],
      uninstallImplications:
        "削除後、DynaMeetは直ちにZoomアカウントへのアクセスを失います。以降にDynaMeetを通じて予約された商談には、Zoomリンクが自動付与されなくなります。",
      dataHandling:
        "アプリの認証解除後、DynaMeetはお客様のZoom認証トークンをデータベースから完全に削除します。削除後、Zoom関連のデータは一切保持しません。削除前に正常にスケジュールされたZoomミーティングは、カレンダー上にそのまま残ります。",
    },
    links: {
      cta: "https://app.dynameet.ai/settings/integrations",
      website: "https://dynameet.ai",
      support: "mailto:support@dynameet.ai",
      privacyPolicy: "https://dynameet.ai/privacy-policy",
    },
  },
  {
    slug: "salesforce",
    name: "Salesforce",
    logo: "/integrations/01_Salesforce.png",
    category: "crm",
    en: {
      categoryLabel: "CRM",
      tagline: "Push every qualified lead straight into Salesforce.",
      description:
        "Meeton ai automatically creates and enriches Salesforce leads and contacts the moment an AI conversation ends. Capture name, company, role, and intent data — all written to Salesforce before your rep even looks at the pipeline.",
      ctaText: "Connect Salesforce",
      steps: [
        "Log into your Meeton ai account at app.dynameet.ai.",
        "Navigate to Settings → Integrations.",
        "Click Connect next to the Salesforce logo and authorize with your Salesforce credentials.",
        "Map the Meeton ai fields to your Salesforce object fields and click Save.",
      ],
      uninstallSteps: [
        "Log into your Meeton ai account at app.dynameet.ai.",
        "Navigate to Settings → Integrations.",
        "Click Disconnect next to the Salesforce logo.",
        "Confirm the disconnection. Lead and contact syncing will stop immediately.",
      ],
    },
    ja: {
      categoryLabel: "CRM連携",
      tagline: "商談化リードをSalesforceへ自動登録。",
      description:
        "Meeton aiはAIヒアリング完了と同時に、Salesforceのリード・取引先責任者を自動作成・更新します。氏名・会社名・役職・商談意向データがSalesforceに書き込まれるため、営業担当がパイプラインを確認する前にデータが揃っています。",
      ctaText: "Salesforceと連携する",
      steps: [
        "app.dynameet.ai にログインします。",
        "設定 → 連携 を開きます。",
        "Salesforceの「連携を開始する」をクリックし、Salesforceの認証情報で承認します。",
        "Meeton aiのフィールドをSalesforceオブジェクトフィールドにマッピングして「保存」をクリックします。",
      ],
      uninstallSteps: [
        "app.dynameet.ai にログインします。",
        "設定 → 連携 を開きます。",
        "Salesforceの「連携を解除する」をクリックします。",
        "確認ダイアログで解除を確定します。リード・コンタクトの同期は即座に停止されます。",
      ],
    },
    links: {
      cta: "https://app.dynameet.ai/settings/integrations",
      website: "https://dynameet.ai",
      support: "mailto:support@dynameet.ai",
      privacyPolicy: "https://dynameet.ai/privacy-policy",
    },
  },
  {
    slug: "hubspot",
    name: "HubSpot",
    logo: "/integrations/02_HubSpot.png",
    category: "crm",
    en: {
      categoryLabel: "CRM",
      tagline:
        "Sync contacts, deals, and meeting data to HubSpot automatically.",
      description:
        "Every lead captured by Meeton ai is synced to HubSpot as a contact with full conversation context attached. Meeting outcomes, intent signals, and AI interview summaries flow into HubSpot deals — so your team can act on hot leads the moment they surface.",
      ctaText: "Connect HubSpot",
      steps: [
        "Log into your Meeton ai account at app.dynameet.ai.",
        "Navigate to Settings → Integrations.",
        "Click Connect next to the HubSpot logo and sign in with your HubSpot account.",
        "Choose which properties to sync and click Save.",
      ],
      uninstallSteps: [
        "Log into your Meeton ai account at app.dynameet.ai.",
        "Navigate to Settings → Integrations.",
        "Click Disconnect next to the HubSpot logo.",
        "Confirm the disconnection. Contact and deal syncing will stop immediately.",
      ],
    },
    ja: {
      categoryLabel: "CRM連携",
      tagline: "コンタクト・商談・面談データをHubSpotへ自動同期。",
      description:
        "Meeton aiが獲得したすべてのリードは、会話履歴とともにHubSpotのコンタクトとして同期されます。商談結果・購買意向シグナル・AIヒアリング要約がHubSpotの案件に流れ込むため、ホットリードが発生した瞬間にアクションできます。",
      ctaText: "HubSpotと連携する",
      steps: [
        "app.dynameet.ai にログインします。",
        "設定 → 連携 を開きます。",
        "HubSpotの「連携を開始する」をクリックし、HubSpotアカウントでサインインします。",
        "同期するプロパティを選択して「保存」をクリックします。",
      ],
      uninstallSteps: [
        "app.dynameet.ai にログインします。",
        "設定 → 連携 を開きます。",
        "HubSpotの「連携を解除する」をクリックします。",
        "確認ダイアログで解除を確定します。コンタクト・案件の同期は即座に停止されます。",
      ],
    },
    links: {
      cta: "https://app.dynameet.ai/settings/integrations",
      website: "https://dynameet.ai",
      support: "mailto:support@dynameet.ai",
      privacyPolicy: "https://dynameet.ai/privacy-policy",
    },
  },
  {
    slug: "google-calendar",
    name: "Google Calendar",
    logo: "/integrations/05_Google_Calendar.png",
    category: "calendar",
    en: {
      categoryLabel: "Calendar",
      tagline:
        "Book meetings directly into Google Calendar — zero back-and-forth.",
      description:
        "Meeton ai reads your Google Calendar availability in real time and offers prospects only the slots that work for you. Confirmed meetings land directly on your calendar with all attendee details filled in — no double-booking, no manual scheduling.",
      ctaText: "Connect Google Calendar",
      steps: [
        "Log into your Meeton ai account at app.dynameet.ai.",
        "Navigate to Settings → Integrations.",
        "Click Connect next to the Google Calendar logo and authorize with your Google account.",
        "Meeting bookings will now sync automatically with your calendar.",
      ],
      uninstallSteps: [
        "Log into your Meeton ai account at app.dynameet.ai.",
        "Navigate to Settings → Integrations.",
        "Click Disconnect next to the Google Calendar logo.",
        "Confirm the disconnection. Meeting bookings will no longer sync to your calendar.",
      ],
    },
    ja: {
      categoryLabel: "カレンダー連携",
      tagline: "Googleカレンダーの空き時間を自動読み取り、即座に予約確定。",
      description:
        "Meeton aiはGoogleカレンダーの空き時間をリアルタイムで読み取り、都合の良いスロットだけを候補として提示します。予約が確定されると、参加者情報が入力済みの状態でカレンダーに自動追加。二重予約なし、手動作業なしで商談を確保できます。",
      ctaText: "Googleカレンダーと連携する",
      steps: [
        "app.dynameet.ai にログインします。",
        "設定 → 連携 を開きます。",
        "Googleカレンダーの「連携を開始する」をクリックし、Googleアカウントで認証します。",
        "以降、すべての商談予約がカレンダーに自動同期されます。",
      ],
      uninstallSteps: [
        "app.dynameet.ai にログインします。",
        "設定 → 連携 を開きます。",
        "Googleカレンダーの「連携を解除する」をクリックします。",
        "確認ダイアログで解除を確定します。以降の予約はカレンダーに同期されなくなります。",
      ],
    },
    links: {
      cta: "https://app.dynameet.ai/settings/integrations",
      website: "https://dynameet.ai",
      support: "mailto:support@dynameet.ai",
      privacyPolicy: "https://dynameet.ai/privacy-policy",
    },
  },
  {
    slug: "microsoft-teams",
    name: "Microsoft Teams",
    logo: "/integrations/04_Microsoft_Teams.png",
    category: "meeting",
    en: {
      categoryLabel: "Video conferencing",
      tagline:
        "Auto-generate Microsoft Teams links the moment a meeting is booked.",
      description:
        "Connect your Microsoft account to Meeton ai and automatically generate a unique Teams meeting link the moment a meeting is booked. Links are added to calendar invites instantly — no manual setup needed.",
      ctaText: "Connect Microsoft Teams",
      steps: [
        "Log into your Meeton ai account at app.dynameet.ai.",
        "Navigate to Settings → Integrations.",
        "Click Connect next to the Microsoft Teams logo and authorize with your Microsoft account.",
        "All future bookings will automatically include a Teams meeting link.",
      ],
      uninstallSteps: [
        "Log into your Meeton ai account at app.dynameet.ai.",
        "Navigate to Settings → Integrations.",
        "Click Disconnect next to the Microsoft Teams logo.",
        "Confirm the disconnection. New bookings will no longer include a Teams meeting link.",
      ],
    },
    ja: {
      categoryLabel: "Web会議連携",
      tagline: "商談予約と同時にTeamsリンクを自動生成。",
      description:
        "MicrosoftアカウントをMeeton aiと接続することで、商談が予約されると同時にTeamsミーティングリンクを自動生成・カレンダーに追加します。URLの発行・共有作業をゼロにします。",
      ctaText: "Microsoft Teamsと連携する",
      steps: [
        "app.dynameet.ai にログインします。",
        "設定 → 連携 を開きます。",
        "Microsoft Teamsの「連携を開始する」をクリックし、Microsoftアカウントで認証します。",
        "以降、すべての商談予約にTeamsリンクが自動付与されます。",
      ],
      uninstallSteps: [
        "app.dynameet.ai にログインします。",
        "設定 → 連携 を開きます。",
        "Microsoft Teamsの「連携を解除する」をクリックします。",
        "確認ダイアログで解除を確定します。以降の予約にはTeamsリンクが付与されなくなります。",
      ],
    },
    links: {
      cta: "https://app.dynameet.ai/settings/integrations",
      website: "https://dynameet.ai",
      support: "mailto:support@dynameet.ai",
      privacyPolicy: "https://dynameet.ai/privacy-policy",
    },
  },
];
