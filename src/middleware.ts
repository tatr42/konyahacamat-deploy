import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin koruması (/admin/dashboard ve altı)
  if (pathname.startsWith("/admin/dashboard") || pathname.startsWith("/admin/blog") || pathname.startsWith("/admin/basin")) {
    const cookie = req.cookies.get("admin_auth");
    if (!cookie || cookie.value !== "session_ok") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
