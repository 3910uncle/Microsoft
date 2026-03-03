import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only protect /admin routes (but not /admin/login)
  if (request.nextUrl.pathname.startsWith("/admin") && 
      !request.nextUrl.pathname.startsWith("/admin/login")) {
    
    // Check for the admin session cookie
    const adminSession = request.cookies.get("admin_session");

    // If no session cookie or not authenticated, redirect to login
    if (!adminSession || adminSession.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
