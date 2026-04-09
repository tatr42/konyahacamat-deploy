import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    // Şifreyi doğrudan koda gömdük (Hardcoded)
    // Bu sayede .env dosyasındaki eksiklik giriş yapmana engel olmaz
    const ADMIN_PASSWORD = "Eb@Hac2027#Net";

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      
      // Çerez (Cookie) oluşturarak oturumu başlatıyoruz
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "active", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 Saat geçerli
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { error: "Şifre yanlış. Lütfen tekrar deneyin." },
      { status: 401 }
    );
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json(
      { error: "Sunucu tarafında bir hata oluştu." },
      { status: 500 }
    );
  }
}