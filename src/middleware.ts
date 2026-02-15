import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

/**
 * 1. RBAC CONFIGURATION
 * Define which routes require which roles.
 * Paths are used as prefixes (e.g., /dashboard also protects /dashboard/settings).
 */
const ROLE_PERMISSIONS: Record<string, string[]> = {
  "/dashboard": ["SUPER_ADMIN", "ADMIN", "STAFF"],
  "/checkout": ["CUSTOMER", "SUPER_ADMIN", "ADMIN"],
  "/profile": ["CUSTOMER", "STAFF", "ADMIN", "SUPER_ADMIN"],
  "/cart": ["CUSTOMER", "STAFF", "ADMIN", "SUPER_ADMIN"], // Forced login for Cart
};

// Encode the secret for the 'jose' library
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-fallback-secret-for-dev-only"
);

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const loginUrl = new URL("/login", request.url);

  // --- STEP 1: DEFINE PROTECTED STATUS ---
  // Check if current path starts with any of our defined protected routes
  const protectedRoute = Object.keys(ROLE_PERMISSIONS).find(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // --- STEP 2: HANDLE UNAUTHENTICATED USERS ---
  if (!token) {
    console.log("hello")
    if (protectedRoute) {
      loginUrl.searchParams.set("callback", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // --- STEP 3: VERIFY TOKEN & CHECK PERMISSIONS ---
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userRole = payload.role as string;

    // Prevent logged-in users from seeing the login page
    if (pathname === "/login") {
      const callback = searchParams.get("callback") || "/";
      return NextResponse.redirect(new URL(callback, request.url));
    }

    // Role-Based Access Control (RBAC) check
    if (protectedRoute) {
      const allowedRoles = ROLE_PERMISSIONS[protectedRoute];
      
      if (!allowedRoles.includes(userRole)) {
        // Forbidden: Redirect home with a status for the UI to handle
        return NextResponse.redirect(
          new URL("/?error=permission_denied", request.url)
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.log({massge: error})
    // Token is invalid, expired, or signature is wrong
    console.error("JWT Verification failed:", error);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("token"); // Clean up the bad cookie
    return response;
  }
}

/**
 * 2. MATCHER CONFIGURATION
 * Senior Note: We use one clean regex. It includes /cart and all pages
 * but excludes internal Next.js files and static assets for performance.
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};