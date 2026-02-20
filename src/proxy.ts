import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const loginUrl = new URL("/login", request.url);

  /**
   * Only protect these routes
   */
  const isProtected =
    pathname.startsWith("/dashboard") || pathname.startsWith("/cart");

  // -------- PUBLIC ROUTES --------
  if (!isProtected) {
    return NextResponse.next();
  }

  /**
   * -------- NO TOKEN --------
   * Redirect to login WITH callback
   */
  if (!token) {
    const callbackPath = pathname + search; // keep query params
    loginUrl.searchParams.set("callback", callbackPath);

    return NextResponse.redirect(loginUrl);
  }

  /**
   * -------- CHECK TOKEN --------
   */
  try {
    const decoded = jwtDecode<DecodedToken>(token);

    // token expired
    if (decoded.exp * 1000 < Date.now()) {
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete("token");

      const callbackPath = pathname + search;
      loginUrl.searchParams.set("callback", callbackPath);

      return res;
    }

    // valid token → allow
    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete("token");

    const callbackPath = pathname + search;
    loginUrl.searchParams.set("callback", callbackPath);

    return res;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/cart/:path*"],
};