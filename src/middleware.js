import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("token");
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up");

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
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
    "/sign-in",
    "/sign-up",
  ],
};
