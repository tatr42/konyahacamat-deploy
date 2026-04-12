import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) return NextResponse.json({ error: "Dosya yok" }, { status: 400 });

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: `Desteklenmeyen format: ${file.type}` }, { status: 400 });
    }

    const inputBuffer = Buffer.from(await file.arrayBuffer());

    // Dosya adı oluştur
    const originalName = file.name.replace(/\.[^/.]+$/, "");
    const slug = originalName
      .toLowerCase()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    const fileName = `${slug}-${Date.now()}.webp`;

    // Localhost: dosya sistemine yaz
    const dir = path.join(process.cwd(), "public", folder);
    await fs.mkdir(dir, { recursive: true });

    let webpBuffer: Buffer;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const sharp = require("sharp");
      webpBuffer = await sharp(inputBuffer).webp({ quality: 85 }).toBuffer();
    } catch {
      // sharp çalışmazsa orijinal dosyayı kullan
      webpBuffer = inputBuffer;
    }

    await fs.writeFile(path.join(dir, fileName), webpBuffer);
    const url = `/${folder}/${fileName}`;
    return NextResponse.json({ url, fileName });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Upload hatası:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
