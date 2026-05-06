import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";

async function isAuthorized() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_auth")?.value;
  const session = await verifySession(token);
  return !!session;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    if (!(await isAuthorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) return NextResponse.json({ error: "Dosya yok" }, { status: 400 });

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
    if (!allowed.includes(file.type))
      return NextResponse.json({ error: `Desteklenmeyen format: ${file.type}` }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    // Cloudinary'ye yükle (buffer'dan stream olarak)
    const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: `hacamat/${folder}`, format: "webp", quality: "auto" },
        (error, result) => {
          if (error || !result) reject(error);
          else resolve(result as { secure_url: string; public_id: string });
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({ url: result.secure_url, fileName: result.public_id });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
