// IndexNow — instantly notify Bing/Yandex (and IndexNow-participating engines)
// when a URL is published or updated, so it gets crawled/indexed faster
// (spec §4.15). Key is hosted at /<key>.txt at the site root.

const INDEXNOW_KEY = "27f8bf2273452b04d81c13f3769598f5";
const HOST = "dynameet.ai";

/** Ping IndexNow for one or more URLs (absolute or root-relative). Best-effort. */
export async function pingIndexNow(urls: string | string[]): Promise<{ ok: boolean; status?: number; error?: string }> {
  const list = (Array.isArray(urls) ? urls : [urls]).map((u) =>
    u.startsWith("http") ? u : `https://${HOST}${u.startsWith("/") ? "" : "/"}${u}`
  );
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: list,
      }),
    });
    return { ok: res.ok, status: res.status };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
