import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { pingIndexNow } from "@/app/lib/indexnow";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path") || "/blog";
  revalidatePath(path);

  // Optional tag busting. The Notion fetches are tagged 'notion' (see
  // app/lib/notion.ts) with a 1h TTL. revalidatePath alone purges the rendered
  // route but can leave the SHARED full-list Notion fetch (the one getAllPosts
  // reads, keyed by URL not by route) serving stale data — so a brand-new post
  // renders at its own /…/[slug] URL (a fresh per-slug query) yet is missing
  // from the hub/category/tag lists until the TTL lapses. Passing &tag=notion
  // busts every Notion fetch at once so list surfaces update immediately.
  const tag = request.nextUrl.searchParams.get("tag");
  if (tag) revalidateTag(tag);

  // IndexNow: notify search engines of the published/updated URL so it gets
  // recrawled fast (§4.15). Best-effort — never block revalidation. Skip with
  // &indexnow=0 (e.g. bulk revalidation that shouldn't spam IndexNow).
  let indexnow: unknown = null;
  if (request.nextUrl.searchParams.get("indexnow") !== "0") {
    indexnow = await pingIndexNow(path).catch((e) => ({ ok: false, error: String(e) }));
  }

  return NextResponse.json({ revalidated: true, path, tag: tag || null, indexnow });
}
