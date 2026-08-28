import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

const STAFF_ROLES = new Set(["ADMIN", "RECEPCION", "ENTRENADOR"]);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/login";
  const session = req.auth;
  const isLoggedIn = Boolean(session);
  const role = session?.user?.role;

  if (isLoginPage) {
    if (isLoggedIn) {
      const dest = role && STAFF_ROLES.has(role) ? "/admin" : "/cuenta";
      return NextResponse.redirect(new URL(dest, req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url));
    if (!role || !STAFF_ROLES.has(role)) return NextResponse.redirect(new URL("/cuenta", req.url));
    return NextResponse.next();
  }

  if (pathname.startsWith("/cuenta")) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.url));
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/login", "/cuenta/:path*"],
};
