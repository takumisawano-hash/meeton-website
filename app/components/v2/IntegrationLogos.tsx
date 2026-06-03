import Image from "next/image";

// Real integration-logo strip (assets in public/integrations/). Replaces the
// text-only stack chips so the supported stack is visible at a glance.
// Server-rendered; grayscale → color on hover.

export type IntegrationLogo = { name: string; file: string };

export const INTEGRATIONS: IntegrationLogo[] = [
  { name: "Salesforce", file: "/integrations/01_Salesforce.png" },
  { name: "HubSpot", file: "/integrations/02_HubSpot.png" },
  { name: "Slack", file: "/integrations/03_Slack.png" },
  { name: "Microsoft Teams", file: "/integrations/04_Microsoft_Teams.png" },
  { name: "Google Calendar", file: "/integrations/05_Google_Calendar.png" },
  { name: "Google Chat", file: "/integrations/06_Google_Chat.png" },
  { name: "Zoom", file: "/integrations/07_Zoom.png" },
  { name: "Marketo", file: "/integrations/08_Marketo.png" },
  { name: "Oracle Eloqua", file: "/integrations/10_Oracle_Eloqua.png" },
];

const ALIAS: Record<string, string> = {
  Salesforce: "Salesforce", HubSpot: "HubSpot", Slack: "Slack",
  "Microsoft Teams": "Microsoft Teams", "Google Calendar": "Google Calendar",
  "Google Chat": "Google Chat", Zoom: "Zoom", Marketo: "Marketo",
  Outlook: "Microsoft Teams", Gmail: "Google Chat", Webhook: "",
};

/** pick logos matching a name list; falls back to the full set. */
export function pickIntegrations(names?: string[]): IntegrationLogo[] {
  if (!names || names.length === 0) return INTEGRATIONS;
  const out: IntegrationLogo[] = [];
  for (const n of names) {
    const canon = ALIAS[n] ?? n;
    const hit = INTEGRATIONS.find((i) => i.name === canon);
    if (hit && !out.includes(hit)) out.push(hit);
  }
  return out.length ? out : INTEGRATIONS;
}

export default function IntegrationLogos({ items, size = 38 }: { items?: IntegrationLogo[]; size?: number }) {
  const list = items ?? INTEGRATIONS;
  return (
    <div className="v2-intlogos">
      {list.map((it) => (
        <div key={it.name} className="v2-intlogo" title={it.name}>
          <Image src={it.file} alt={`${it.name} 連携`} width={size} height={size} style={{ height: size, width: size, objectFit: "contain" }} />
          <span>{it.name}</span>
        </div>
      ))}
      <style>{`
        .v2-intlogos{display:flex;flex-wrap:wrap;gap:14px;justify-content:center}
        .v2-intlogo{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--border);border-radius:12px;padding:8px 14px;filter:grayscale(.5);opacity:.85;transition:filter .2s,opacity .2s}
        .v2-intlogo:hover{filter:grayscale(0);opacity:1}
        .v2-intlogo span{font-size:13px;font-weight:700;color:var(--heading)}
      `}</style>
    </div>
  );
}
