import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const folder = (formData.get("folder") as string) || "uploads";

  if (!file) return NextResponse.json({ error: "Dosya yok" }, { status: 400 });

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Sadece resim dosyaları kabul edilir" }, { status: 400 });
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

  // Bellekte WebP'ye dönüştür (dosya sistemine yazmadan)
  const inputBuffer = Buffer.from(await file.arrayBuffer());
  const webpBuffer = await sharp(inputBuffer).webp({ quality: 85 }).toBuffer();

  // Firebase Storage'a yükle
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, webpBuffer, { contentType: "image/webp" });
  const url = await getDownloadURL(storageRef);

  return NextResponse.json({ url, fileName, storagePath });
}
