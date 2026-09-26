import fs from "node:fs";
import path from "node:path";

const MEDIA_DIR = path.join(process.cwd(), "public", "Instagram-photography");

const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".mp4", ".mov"]);

export type InspirationMedia = {
  id: string;
  src: string;
  kind: "image" | "video";
};

function mediaId(filename: string): bigint {
  const stem = path.parse(filename).name;
  return /^\d+$/.test(stem) ? BigInt(stem) : BigInt(0);
}

function isVideo(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  return ext === ".mp4" || ext === ".mov";
}

/** Every unique photo and video under public/Instagram-photography, newest Instagram id first. */
export function listInspirationMedia(): InspirationMedia[] {
  const byName = new Map<string, string>();

  function walk(dir: string, relDir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = relDir ? `${relDir}/${entry.name}` : entry.name;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full, rel);
        continue;
      }
      if (!EXTENSIONS.has(path.extname(entry.name).toLowerCase())) continue;
      const existing = byName.get(entry.name);
      if (!existing || rel.length < existing.length) byName.set(entry.name, rel);
    }
  }

  walk(MEDIA_DIR, "");

  return [...byName.entries()]
    .sort(([a], [b]) => {
      const aId = mediaId(a);
      const bId = mediaId(b);
      if (aId === bId) return a.localeCompare(b);
      return aId > bId ? -1 : 1;
    })
    .map(([name, rel]) => ({
      id: path.parse(name).name,
      src: `/Instagram-photography/${rel}`,
      kind: isVideo(name) ? "video" : "image",
    }));
}
