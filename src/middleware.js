import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token");
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up");
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Additional check for admin routes
  if (isAdminPage && token) {
    try {
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET
      );
      const { payload } = await jwtVerify(token.value, secret);

      if (!payload || payload.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // Clone the response to modify headers
  const response = NextResponse.next();

  // Add token to response headers if it exists
  if (token) {
    response.headers.set("Authorization", `Bearer ${token.value}`);
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/upload/:path*",
    "/documents/:path*",
    "/history/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/help/:path*",
    "/admin/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
