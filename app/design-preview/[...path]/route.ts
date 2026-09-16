import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DESIGN_ROOT = path.resolve(process.cwd(), "design");
const PUBLIC_ASSETS = path.resolve(process.cwd(), "public", "assets");

const MIME_BY_EXT: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
};

function isInside(root: string, candidate: string) {
  const rel = path.relative(root, candidate);
  return rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel);
}

async function readSafe(root: string, segments: string[]) {
  const resolved = path.resolve(root, ...segments);
  if (!isInside(root, resolved) && resolved !== root) {
    return null;
  }

  try {
    const info = await stat(resolved);
    if (!info.isFile()) return null;
    return { resolved, body: await readFile(resolved) };
  } catch {
    return null;
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  const { path: segments } = await params;
  if (!segments?.length) {
    return new NextResponse("Not found", { status: 404 });
  }

  const fromAssets =
    segments[0] === "assets"
      ? await readSafe(PUBLIC_ASSETS, segments.slice(1))
      : null;
  const fromDesign = fromAssets ?? (await readSafe(DESIGN_ROOT, segments));

  if (!fromDesign) {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = path.extname(fromDesign.resolved).toLowerCase();
  const contentType = MIME_BY_EXT[ext] ?? "application/octet-stream";

  return new NextResponse(new Uint8Array(fromDesign.body), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
    },
  });
}
