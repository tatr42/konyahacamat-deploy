import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const folder = (formData.get("folder") as string) || "uploads";

  if (!file) return NextResponse.json({ error: "Dosya yok" }, { status: 400 });

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Sadece resim dosyaları kabul edilir" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Dosya adını slug'a çevir
  const originalName = file.name.replace(/\.[^/.]+$/, "");
  const slug = originalName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const fileName = `${slug}-${Date.now()}.webp`;

  // Klasörü oluştur
  const dir = path.join(process.cwd(), "public", folder);
  await fs.mkdir(dir, { recursive: true });

  // WebP'ye dönüştür
  await sharp(buffer)
    .webp({ quality: 85 })
    .toFile(path.join(dir, fileName));

  const url = `/${folder}/${fileName}`;
  return NextResponse.json({ url, fileName });
}
