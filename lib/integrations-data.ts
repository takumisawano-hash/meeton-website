export type IntegrationCategory = "crm" | "notify" | "calendar" | "meeting";

export type Integration = {
  slug: string;
  name: string;
  logo: string;
  category: IntegrationCategory;
  en: {
    categoryLabel: string;
    tagline: string;
    description: string;
    ctaText: string;
    steps: string[];
    uninstallSteps: string[];
  };
  ja: {
    categoryLabel: string;
    tagline: string;
    description: string;
    ctaText: string;
    steps: string[];
    uninstallSteps: string[];
  };
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
        "Connect Meeton ai to Slack and receive real-time notifications for new leads, booked meetings, and completed AI interviews — delivered to any channel your team chooses. Keep every rep in the loop automatically, with zero manual forwarding.",
      ctaText: "Connect Slack",
      steps: [
        "Log into your Meeton ai account at app.dynameet.ai.",
        "Navigate to Settings → Integrations.",
        "Click Connect next to the Slack logo and authorize your workspace.",
        "Select the channel(s) to receive notifications and click Save.",
      ],
      uninstallSteps: [
        "Log into your Meeton ai account at app.dynameet.ai.",
        "Navigate to Settings → Integrations.",
        "Click Disconnect next to the Slack logo.",
        "Confirm the disconnection. Notifications to Slack will stop immediately.",
      ],
    },
    ja: {
      categoryLabel: "通知・アラート",
      tagline: "商談予約・リード獲得をSlackへリアルタイム通知。",
      description:
        "Meeton aiとSlackを連携すると、新規リード獲得・商談予約・AIヒアリング完了などのイベントを、指定したSlackチャンネルへリアルタイムで通知します。営業チーム全員への即時共有が自動化され、対応漏れをゼロにします。",
      ctaText: "Slackと連携する",
      steps: [
        "app.dynameet.ai にログインします。",
        "設定 → 連携 を開きます。",
        "Slackの「連携を開始する」をクリックし、ワークスペースを認証します。",
        "通知を受け取るチャンネルを選択して「保存」をクリックすれば完了です。",
      ],
      uninstallSteps: [
        "app.dynameet.ai にログインします。",
        "設定 → 連携 を開きます。",
        "Slackの「連携を解除する」をクリックします。",
        "確認ダイアログで解除を確定します。Slackへの通知は即座に停止されます。",
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
      uninstallSteps: [
        "Log into your Meeton ai account at app.dynameet.ai.",
        "Navigate to Settings → Integrations.",
        "Click Disconnect next to the Zoom logo.",
        "Confirm the disconnection. New bookings will no longer include a Zoom link.",
      ],
    },
    ja: {
      categoryLabel: "Web会議連携",
      tagline: "商談予約と同時にZoomリンクを自動生成。",
      description:
        "ZoomアカウントをMeeton aiと接続することで、商談が予約されると同時にZoomミーティングリンクを自動生成・カレンダーに追加します。URLの発行・共有作業をゼロにします。",
      ctaText: "Zoomと連携する",
      steps: [
        "app.dynameet.ai にログインします。",
        "設定 → 連携 を開きます。",
        "Zoomの「連携を開始する」をクリックし、Zoomアカウントを認証します。",
        "以降、すべての商談予約にZoomリンクが自動付与されます。",
      ],
      uninstallSteps: [
        "app.dynameet.ai にログインします。",
        "設定 → 連携 を開きます。",
        "Zoomの「連携を解除する」をクリックします。",
        "確認ダイアログで解除を確定します。以降の予約にはZoomリンクが付与されなくなります。",
      ],
    },
    links: {
      cta: "https://app.dynameet.ai/settings/integrations",
      website: "https://dynameet.ai",
      support: "https://dynameet.ai/support/zoom",
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
