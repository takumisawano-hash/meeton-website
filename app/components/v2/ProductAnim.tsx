// Detailed product mock-animations — stand-ins for real screenshots/video.
// 2026-06-10 (Takumi: これらのサンプルはかなり大事): each scene is a concrete
// sales story, not abstract boxes. NO flicker — elements fade/slide in ONCE
// (animation-fill-mode:forwards) and STAY (no loop reset). prefers-reduced-
// motion → everything visible immediately. Navy + green theme, rendered inside
// the navy media frame.

export default function ProductAnim({ kind }: { kind: string }) {
  return (
    <div className="v2a">
      {kind === "chat" && <ChatScene />}
      {kind === "library" && <LibraryScene />}
      {kind === "calendar" && <CalendarScene />}
      {kind === "email" && <EmailScene />}
      <style>{`
        .v2a{position:absolute;inset:0;overflow:auto;
          background:radial-gradient(circle at 26% 20%,rgba(7,203,121,.16),transparent 52%),radial-gradient(circle at 80% 84%,rgba(7,203,121,.07),transparent 55%),var(--navy-2);
          display:flex;align-items:center;justify-content:center;padding:clamp(16px,3vw,32px)}
        .v2a *{box-sizing:border-box}
        /* shared app window chrome */
        .v2a .win{width:min(94%,560px);background:rgba(255,255,255,.035);border:1px solid var(--on-navy-border);border-radius:16px;overflow:hidden;box-shadow:0 24px 60px -30px rgba(0,0,0,.6)}
        .v2a .win-bar{display:flex;align-items:center;gap:7px;padding:11px 14px;border-bottom:1px solid var(--on-navy-border);background:rgba(255,255,255,.03)}
        .v2a .win-bar i{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.18)}
        .v2a .win-bar i:nth-child(1){background:#ff5f57}.v2a .win-bar i:nth-child(2){background:#febc2e}.v2a .win-bar i:nth-child(3){background:#28c840}
        .v2a .win-url{margin-left:8px;font-family:var(--fm);font-size:10px;color:var(--on-navy-sub);background:rgba(255,255,255,.05);border-radius:6px;padding:3px 10px;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .v2a .win-body{padding:16px}
        .v2a .tag{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:800;color:var(--cta);background:rgba(7,203,121,.14);border:1px solid rgba(7,203,121,.42);border-radius:999px;padding:5px 12px}
        .v2a .dot{width:7px;height:7px;border-radius:50%;background:var(--cta)}
        /* appear-once helpers */
        .ap{opacity:0;animation:apIn .55s cubic-bezier(.16,1,.3,1) forwards}
        @keyframes apIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        @media(prefers-reduced-motion:reduce){.v2a .ap{opacity:1!important;transform:none!important;animation:none!important}.v2a [class*="-fill"]{animation:none!important}}
      `}</style>
    </div>
  );
}

/* ───────── ① 掴む — Chat: reads the page the visitor is on, opens with a
   context-aware hook, pulls them in, qualifies → リード化 ───────── */
function ChatScene() {
  return (
    <div className="win cs">
      <div className="win-bar"><i /><i /><i /><span className="win-url">あなたのサイト ／ 料金ページを閲覧中</span></div>
      <div className="win-body cs-body">
        <div className="cs-context ap" style={{ animationDelay: ".15s" }}>
          <span className="dot" /> 訪問者が「料金」ページを 40秒 閲覧中 — AIが検知
        </div>
        <div className="cs-row bot ap" style={{ animationDelay: ".7s" }}>
          <span className="cs-av">M</span>
          <span className="cs-b">料金ページをご覧ですね。3つのプランの違い、御社の規模だと<b>どれが最適か</b>30秒でご案内できます。何名くらいでお使いの想定ですか？</span>
        </div>
        <div className="cs-row me ap" style={{ animationDelay: "1.7s" }}>
          <span className="cs-b me-b">営業5名で、まず商談化を増やしたい</span>
        </div>
        <div className="cs-row bot ap" style={{ animationDelay: "2.6s" }}>
          <span className="cs-av">M</span>
          <span className="cs-b">それなら<b>商談獲得プラン</b>が中心になります。実際に商談化率が60%超になった事例もお見せできます。<b>30分のデモ</b>、今すぐ予約しますか？</span>
        </div>
        <div className="cs-foot ap" style={{ animationDelay: "3.5s" }}>
          <span className="tag"><span className="dot" />リード化 — 興味・規模・課題を取得</span>
        </div>
      </div>
      <style>{`
        .cs-body{display:flex;flex-direction:column;gap:10px}
        .cs-context{font-size:11px;font-weight:700;color:var(--cta);display:flex;align-items:center;gap:7px}
        .cs-row{display:flex;align-items:flex-start;gap:8px;max-width:92%}
        .cs-row.me{flex-direction:row-reverse;align-self:flex-end}
        .cs-av{flex-shrink:0;width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,var(--cta),#0bd986);color:#04231a;font-weight:900;font-size:12px;display:flex;align-items:center;justify-content:center}
        .cs-b{font-size:12.5px;line-height:1.65;padding:10px 13px;border-radius:13px;background:rgba(255,255,255,.08);color:#fff;border-top-left-radius:4px}
        .cs-b b{color:var(--cta);font-weight:800}
        .me-b{background:var(--cta);color:#04231a;font-weight:700;border-top-left-radius:13px;border-top-right-radius:4px}
        .cs-foot{margin-top:2px}
      `}</style>
    </div>
  );
}

/* ───────── ① 育てる — Library: in-chat, AI proposes the doc that matches
   what the visitor just said, then explains it ───────── */
function LibraryScene() {
  return (
    <div className="win lb">
      <div className="win-bar"><i /><i /><i /><span className="win-url">チャット内 ／ 資料を提案・解説</span></div>
      <div className="win-body lb-body">
        <div className="lb-row me ap" style={{ animationDelay: ".2s" }}>
          <span className="lb-b me-b">製造業での導入効果と、セキュリティが気になる</span>
        </div>
        <div className="lb-row bot ap" style={{ animationDelay: "1.0s" }}>
          <span className="lb-av">M</span>
          <span className="lb-b">その2点に合う資料をお出しします。まず製造業の事例から。</span>
        </div>
        {/* proposed doc card */}
        <div className="lb-card ap" style={{ animationDelay: "1.7s" }}>
          <span className="lb-ic">📄</span>
          <span className="lb-meta">
            <span className="lb-name">製造業向け 導入事例集.pdf</span>
            <span className="lb-match"><span className="dot" />会話内容にマッチ — 提案理由: 「製造業」「導入効果」</span>
          </span>
        </div>
        {/* AI explaining the doc */}
        <div className="lb-row bot ap" style={{ animationDelay: "2.6s" }}>
          <span className="lb-av">M</span>
          <span className="lb-b">この資料の<b>P3</b>に、製造業A社が初動を自動化して<b>商談化2倍</b>にした流れがあります。セキュリティは<b>P8</b>にISMS対応をまとめています。要点だけ先にお伝えすると…</span>
        </div>
        <div className="lb-foot ap" style={{ animationDelay: "3.5s" }}>
          <span className="tag"><span className="dot" />検討が前進 — 関心に合う資料で育成</span>
        </div>
      </div>
      <style>{`
        .lb-body{display:flex;flex-direction:column;gap:10px}
        .lb-row{display:flex;align-items:flex-start;gap:8px;max-width:94%}
        .lb-row.me{flex-direction:row-reverse;align-self:flex-end}
        .lb-av{flex-shrink:0;width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,var(--cta),#0bd986);color:#04231a;font-weight:900;font-size:12px;display:flex;align-items:center;justify-content:center}
        .lb-b{font-size:12.5px;line-height:1.65;padding:10px 13px;border-radius:13px;background:rgba(255,255,255,.08);color:#fff;border-top-left-radius:4px}
        .lb-b b{color:var(--cta);font-weight:800}
        .lb-b.me-b{background:var(--cta);color:#04231a;font-weight:700;border-top-left-radius:13px;border-top-right-radius:4px}
        .lb-card{display:flex;align-items:center;gap:12px;padding:12px 14px;background:rgba(7,203,121,.08);border:1px solid rgba(7,203,121,.35);border-radius:12px}
        .lb-ic{font-size:22px}
        .lb-meta{display:flex;flex-direction:column;gap:3px}
        .lb-name{font-size:13px;font-weight:800;color:#fff}
        .lb-match{font-size:11px;color:var(--cta);font-weight:600;display:flex;align-items:center;gap:6px}
      `}</style>
    </div>
  );
}

/* ───────── ② 商談化 — Calendar: real dates/times, AI proposes a slot and
   drives the booking to 確定 + CRM ───────── */
function CalendarScene() {
  const days = [
    { d: "月", n: 9 }, { d: "火", n: 10 }, { d: "水", n: 11, sel: true }, { d: "木", n: 12 }, { d: "金", n: 13 },
  ];
  const times = ["10:00", "11:30", "14:00", "15:30"];
  return (
    <div className="win cl">
      <div className="win-bar"><i /><i /><i /><span className="win-url">チャット内 ／ その場で日程調整</span></div>
      <div className="win-body cl-body">
        <div className="cl-row bot ap" style={{ animationDelay: ".2s" }}>
          <span className="cl-av">M</span>
          <span className="cl-b">では<b>30分デモ</b>を。直近で空いている枠です。ご都合の良い時間を選んでください。</span>
        </div>
        <div className="cl-cal ap" style={{ animationDelay: "1.0s" }}>
          <div className="cl-mon">2026年 6月</div>
          <div className="cl-days">
            {days.map((x) => (
              <span key={x.n} className={`cl-day ${x.sel ? "sel" : "avail"}`}>
                <span className="cl-dn">{x.d}</span>{x.n}
              </span>
            ))}
          </div>
          <div className="cl-times">
            {times.map((t, i) => (
              <span key={t} className={`cl-t ${i === 2 ? "pick" : ""}`}>{t}</span>
            ))}
          </div>
        </div>
        <div className="cl-confirm ap" style={{ animationDelay: "2.4s" }}>
          <span className="dot" /> 6/11(水) 14:00 商談予約 確定 ・ Google Meet 発行
        </div>
        <div className="cl-foot ap" style={{ animationDelay: "3.3s" }}>
          <span className="tag"><span className="dot" />Salesforce 登録・担当へ Slack 通知 完了</span>
        </div>
      </div>
      <style>{`
        .cl-body{display:flex;flex-direction:column;gap:12px}
        .cl-row{display:flex;align-items:flex-start;gap:8px;max-width:92%}
        .cl-av{flex-shrink:0;width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,var(--cta),#0bd986);color:#04231a;font-weight:900;font-size:12px;display:flex;align-items:center;justify-content:center}
        .cl-b{font-size:12.5px;line-height:1.65;padding:10px 13px;border-radius:13px;background:rgba(255,255,255,.08);color:#fff;border-top-left-radius:4px}
        .cl-b b{color:var(--cta);font-weight:800}
        .cl-cal{background:rgba(255,255,255,.05);border:1px solid var(--on-navy-border);border-radius:12px;padding:14px}
        .cl-mon{font-size:12px;font-weight:800;color:#fff;text-align:center;margin-bottom:10px}
        .cl-days{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:10px}
        .cl-day{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:13px;font-weight:700;padding:7px 0;border-radius:8px;border:1px solid var(--on-navy-border);color:var(--on-navy-sub)}
        .cl-day .cl-dn{font-size:9px;font-weight:700;opacity:.8}
        .cl-day.avail{color:var(--cta);border-color:rgba(7,203,121,.4);background:rgba(7,203,121,.08)}
        .cl-day.sel{background:var(--cta);color:#04231a;border-color:var(--cta)}
        .cl-times{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
        .cl-t{font-size:11px;font-weight:700;text-align:center;padding:7px 2px;border-radius:7px;border:1px solid var(--on-navy-border);color:var(--on-navy-sub);position:relative}
        .cl-t.pick{background:var(--cta);color:#04231a;border-color:var(--cta);grid-column:span 2}
        .cl-t em{font-style:normal;font-size:10px;font-weight:800}
        .cl-confirm{display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:800;color:#fff;background:rgba(7,203,121,.10);border:1px solid rgba(7,203,121,.4);border-radius:10px;padding:10px 13px}
      `}</style>
    </div>
  );
}

/* ───────── ③ 追客 — Email: builds a personalized 1:1 from the lead's actual
   on-site behavior ───────── */
function EmailScene() {
  return (
    <div className="win em">
      <div className="win-bar"><i /><i /><i /><span className="win-url">Meeton Email ／ 行動シグナルから1:1生成</span></div>
      <div className="win-body em-body">
        {/* detected behavior */}
        <div className="em-sig ap" style={{ animationDelay: ".2s" }}>
          <div className="em-sig-h"><span className="dot" />田中様（株式会社A）の行動を検知</div>
          <ul className="em-sig-l">
            <li>昨日 21:14 「料金」ページを再訪（3回目）</li>
            <li>「製造業 事例」資料を P8 まで閲覧</li>
            <li>初回フォームから 6日 未予約</li>
          </ul>
        </div>
        {/* generated email */}
        <div className="em-mail ap" style={{ animationDelay: "1.4s" }}>
          <div className="em-meta"><span className="em-to">To: 田中様</span><span className="em-badge">AI生成 1:1</span></div>
          <div className="em-sub">件名：製造業での「初動の自動化」、P8の続きを30分で</div>
          <p className="em-body-txt">
            田中様<br />
            先日は料金ページと製造業の事例をご覧いただきありがとうございます。<br />
            <span className="hl">セキュリティ（ISMS）</span>を気にされていたかと思いますので、要件表と、製造業A社が<span className="hl">商談化を2倍</span>にした初動設計を、30分のデモでお見せします。
          </p>
        </div>
        <div className="em-foot ap" style={{ animationDelay: "2.6s" }}>
          <span className="tag"><span className="dot" />行動に基づき個別化 → 再商談化へ</span>
        </div>
      </div>
      <style>{`
        .em-body{display:flex;flex-direction:column;gap:12px}
        .em-sig{background:rgba(255,255,255,.05);border:1px solid var(--on-navy-border);border-radius:12px;padding:12px 14px}
        .em-sig-h{font-size:12px;font-weight:800;color:var(--cta);display:flex;align-items:center;gap:7px;margin-bottom:8px}
        .em-sig-l{list-style:none;margin:0;padding:0;display:grid;gap:5px}
        .em-sig-l li{font-size:11.5px;color:var(--on-navy-sub);padding-left:14px;position:relative}
        .em-sig-l li::before{content:"";position:absolute;left:0;top:7px;width:5px;height:5px;border-radius:50%;background:var(--cta)}
        .em-mail{background:rgba(255,255,255,.04);border:1px solid var(--on-navy-border);border-radius:12px;padding:14px}
        .em-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
        .em-to{font-size:11px;color:var(--on-navy-sub);font-weight:700}
        .em-badge{font-size:10px;font-weight:800;color:var(--cta);background:rgba(7,203,121,.14);border:1px solid rgba(7,203,121,.4);border-radius:999px;padding:3px 9px}
        .em-sub{font-size:12.5px;font-weight:800;color:#fff;margin-bottom:8px}
        .em-body-txt{font-size:12px;line-height:1.75;color:var(--on-navy-sub);margin:0}
        .em-body-txt .hl{color:var(--cta);font-weight:700}
      `}</style>
    </div>
  );
}
