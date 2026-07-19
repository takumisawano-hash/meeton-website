"use client";

import { useEffect, useState } from "react";

// HubSpot partner-recruiting form — new-style embed (js-na2 embed script +
// .hs-form-frame). The script scans the DOM for frames and observes later
// mounts, so mounting the frame first and appending the script after is safe
// on both hard loads and client-side navigations.
const SCRIPT_SRC = "https://js-na2.hsforms.net/forms/embed/45872857.js";

export default function PartnersFormEmbed() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.defer = true;
    s.onerror = () => setFailed(true);
    document.body.appendChild(s);
  }, []);

  return (
    <div>
      <div
        className="hs-form-frame"
        data-region="na2"
        data-form-id="12362f7d-2d2a-4452-b443-2025f393319f"
        data-portal-id="45872857"
      />
      {failed && (
        <p style={{ fontSize: 14, color: "var(--sub)", margin: "16px 0 0" }}>
          フォームを読み込めませんでした。お手数ですが
          <a href="/contact/" style={{ color: "var(--cta-ink)", textDecoration: "underline" }}>
            お問い合わせ
          </a>
          より「パートナー希望」とご連絡ください。
        </p>
      )}
    </div>
  );
}
