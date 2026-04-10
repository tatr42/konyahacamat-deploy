import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const correct = process.env.ADMIN_PASSWORD ?? "Eb@Hac2027#Net";
    if (password === correct) {
      const cookieStore = await cookies();
      cookieStore.set("admin_auth", "session_ok", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 gün
      });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Hatalı şifre" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Hata" }, { status: 500 });
  }
}
