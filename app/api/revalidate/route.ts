import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { pingIndexNow } from "@/app/lib/indexnow";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path") || "/blog";
  revalidatePath(path);

  // IndexNow: notify search engines of the published/updated URL so it gets
  // recrawled fast (§4.15). Best-effort — never block revalidation. Skip with
  // &indexnow=0 (e.g. bulk revalidation that shouldn't spam IndexNow).
  let indexnow: unknown = null;
  if (request.nextUrl.searchParams.get("indexnow") !== "0") {
    indexnow = await pingIndexNow(path).catch((e) => ({ ok: false, error: String(e) }));
  }

  return NextResponse.json({ revalidated: true, path, indexnow });
}
