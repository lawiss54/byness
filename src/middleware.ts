import { NextRequest, NextResponse } from "next/server";

const protectedPaths = [
  '/admin/dashboard',
];

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;

  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtectedPath && !accessToken) {
    const loginUrl = new URL('/admin', origin);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
