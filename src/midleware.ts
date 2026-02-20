import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const ROLE_PERMISSIONS: Record<string, string[]> = {
  "/dashboard": ["SUPER_ADMIN", "ADMIN", "STAFF"],
  "/checkout": ["CUSTOMER", "SUPER_ADMIN", "ADMIN"],
  "/profile": ["CUSTOMER", "STAFF", "ADMIN", "SUPER_ADMIN"],
  "/cart": ["CUSTOMER", "STAFF", "ADMIN", "SUPER_ADMIN"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Never block login page itself
  if (pathname.startsWith("/login")) return NextResponse.next();

  const protectedRoute = Object.entries(ROLE_PERMISSIONS).find(
    ([route]) => pathname === route || pathname.startsWith(route + "/")
  );

  if (!protectedRoute) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callback", pathname);

  if (!token) return NextResponse.redirect(loginUrl);

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    const userRole = typeof payload.role === "string" ? payload.role : null;
    if (!userRole) throw new Error("Invalid role");

    const allowedRoles = protectedRoute[1];

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.redirect(
        new URL("/?error=permission_denied", request.url)
      );
    }

    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/checkout/:path*",
    "/profile/:path*",
    "/cart/:path*",
  ],
};