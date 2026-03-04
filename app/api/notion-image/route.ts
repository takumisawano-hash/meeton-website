import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function GET(request: NextRequest) {
  const blockId = request.nextUrl.searchParams.get("blockId");
  const pageId = request.nextUrl.searchParams.get("pageId");
  const type = request.nextUrl.searchParams.get("type") || "block"; // "block" | "page-cover" | "page-icon" | "page-property"
  const property = request.nextUrl.searchParams.get("property"); // specific property name for "page-property" type

  if (!blockId && !pageId) {
    return NextResponse.json(
      { error: "blockId or pageId is required" },
      { status: 400 }
    );
  }

  try {
    let imageUrl: string | null = null;

    if (type === "block" && blockId) {
      const block = await notion.blocks.retrieve({ block_id: blockId });
      if ("type" in block && block.type === "image") {
        const image = (block as any).image;
        if (image.type === "file") {
          imageUrl = image.file.url;
        } else if (image.type === "external") {
          imageUrl = image.external.url;
        }
      }
    } else if (type === "page-cover" && pageId) {
      const page = await notion.pages.retrieve({ page_id: pageId });
      if ("cover" in page && page.cover) {
        const cover = page.cover as any;
        if (cover.type === "file") {
          imageUrl = cover.file.url;
        } else if (cover.type === "external") {
          imageUrl = cover.external.url;
        }
      }
    } else if (type === "page-property" && pageId) {
      const page = await notion.pages.retrieve({ page_id: pageId });
      if ("properties" in page) {
        const props = page.properties as any;
        // Look for specific property or first file property
        const keys = property ? [property] : Object.keys(props);
        for (const key of keys) {
          const prop = props[key];
          if (prop?.type === "files" && prop.files?.length > 0) {
            const file = prop.files[0];
            if (file.type === "file") {
              imageUrl = file.file.url;
            } else if (file.type === "external") {
              imageUrl = file.external.url;
            }
            break;
          }
        }
      }
    }

    if (!imageUrl) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Google Driveの場合、直接ダウンロードURLに変換
    if (imageUrl.includes("drive.google.com/uc?")) {
      // Already in direct download format
    } else if (imageUrl.includes("drive.google.com/file/d/")) {
      const match = imageUrl.match(/\/file\/d\/([^/]+)/);
      if (match) {
        imageUrl = `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }

    // Fetch the actual image (follow redirects, use server User-Agent)
    const imageResponse = await fetch(imageUrl, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MeetonBot/1.0)",
      },
    });
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 502 }
      );
    }

    const contentType =
      imageResponse.headers.get("content-type") || "image/png";

    // Google Driveがログインページを返した場合のフォールバック
    if (contentType.includes("text/html")) {
      return NextResponse.json(
        { error: "Image source returned HTML instead of image" },
        { status: 502 }
      );
    }

    const buffer = await imageResponse.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Notion image proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
