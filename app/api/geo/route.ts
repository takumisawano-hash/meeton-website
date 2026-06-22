import { NextResponse } from "next/server";

// Returns the visitor's country (Vercel edge geo header) for the client-side
// language-suggestion banner. SEO-safe: this is a client fetch, so bots (no JS)
// never trigger any language steering — they crawl whatever path they request,
// and hreflang signals the alternates. No IP redirect anywhere.
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const country = req.headers.get("x-vercel-ip-country") || "";
  return NextResponse.json(
    { country },
    { headers: { "cache-control": "no-store, max-age=0" } }
  );
}
