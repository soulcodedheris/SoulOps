import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/api/mood", "/api/user"];

// Routes that are always public
const publicRoutes = ["/", "/auth", "/api/auth/login", "/api/auth/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check for authentication token
  const token =
    request.headers.get("authorization")?.replace("Bearer ", "") ||
    request.cookies.get("token")?.value;

  if (!token) {
    // Redirect to login if no token
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    return NextResponse.next();
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    // Add user info to headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decoded.userId);
    requestHeaders.set("x-user-email", decoded.email);
    requestHeaders.set("x-user-language", decoded.language || "en");
    requestHeaders.set(
      "x-user-cultural-context",
      decoded.culturalContext || ""
    );

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // Invalid token - redirect to login
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
