import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    // Şifre kontrolü
    if (password === "Eb@Hac2027#Net") {
      const response = NextResponse.json({ success: true });
      
      // Cookie ayarı - Versiyon uyumluluğu için await ekledik
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "active", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 gün
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ error: "Şifre Yanlış" }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: "Sunucu Hatası" }, { status: 500 });
  }
}