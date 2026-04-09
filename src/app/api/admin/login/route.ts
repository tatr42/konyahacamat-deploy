export const dynamic = 'force-dynamic'; // Bu satırı en üste ekle

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Fonksiyonun tam olarak bu isimle (POST) dışa aktarıldığından emin ol
export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const ADMIN_PASSWORD = "Eb@Hac2027#Net";

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "active", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
      return response;
    }
    return NextResponse.json({ error: "Şifre yanlış" }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: "Hata" }, { status: 500 });
  }
}