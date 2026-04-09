import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body: any = await req.json();
    const password = body.password;

    if (password === "Eb@Hac2027#Net") {
      const cookieStore: any = await cookies();
      cookieStore.set("admin_session", "active", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 86400,
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}