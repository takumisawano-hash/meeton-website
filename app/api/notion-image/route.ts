import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(request: NextRequest) {
  const blockId = request.nextUrl.searchParams.get("blockId");
  const pageId = request.nextUrl.searchParams.get("pageId");
  const type = request.nextUrl.searchParams.get("type") || "block"; // "block" | "page-cover" | "page-icon"

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
        // Look for thumbnail/image property
        for (const key of Object.keys(props)) {
          const prop = props[key];
          if (prop.type === "files" && prop.files?.length > 0) {
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

    // Fetch the actual image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 502 }
      );
    }

    const contentType =
      imageResponse.headers.get("content-type") || "image/png";
    const buffer = await imageResponse.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
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
