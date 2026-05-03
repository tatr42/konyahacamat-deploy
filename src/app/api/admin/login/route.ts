import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const correct = process.env.ADMIN_PASSWORD;

    if (!correct) {
      console.error("ADMIN_PASSWORD environment variable is not set.");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    if (password === correct) {
      const sessionToken = await signSession({ role: "admin" });
      const cookieStore = await cookies();
      cookieStore.set("admin_auth", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 gün
        sameSite: "lax",
      });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Hatalı şifre" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Hata" }, { status: 500 });
  }
}
