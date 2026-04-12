import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

const BUCKET = "hacamat-site.appspot.com";

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

    // Dosya adı oluştur
    const originalName = file.name.replace(/\.[^/.]+$/, "");
    const slug = originalName
      .toLowerCase()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    const fileName = `${slug}-${Date.now()}.webp`;
    const storagePath = `${folder}/${fileName}`;

    // Bellekte WebP'ye dönüştür
    const inputBuffer = Buffer.from(await file.arrayBuffer());
    const webpBuffer = await sharp(inputBuffer).webp({ quality: 85 }).toBuffer();

    // Firebase Storage REST API ile yükle
    const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o?uploadType=media&name=${encodeURIComponent(storagePath)}`;
    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": "image/webp" },
      body: new Uint8Array(webpBuffer),
    });

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      return NextResponse.json({ error: `Firebase Storage hatası: ${err}` }, { status: 500 });
    }

    // İndirme URL'si
    const url = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(storagePath)}?alt=media`;
    return NextResponse.json({ url, fileName, storagePath });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Upload hatası:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
