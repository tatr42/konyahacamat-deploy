import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login sayfasını koru — zaten giriş yapmışsa dashboard'a yönlendir
  if (pathname === "/admin/login") {
    const cookie = req.cookies.get("admin_auth");
    const session = await verifySession(cookie?.value);
    if (session) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // /admin ve tüm alt sayfaları koru
  if (pathname.startsWith("/admin")) {
    const cookie = req.cookies.get("admin_auth");
    const session = await verifySession(cookie?.value);
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
