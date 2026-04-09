import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    if (password === "Eb@Hac2027#Net") {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "active", {
        httpOnly: true,
        secure: true,
        path: "/",
      });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Hatalı şifre" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Hata" }, { status: 500 });
  }
}