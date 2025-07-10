import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 인증이 필요하지 않은 public 경로들
const publicPaths = ["/signin", "/terms"];

export function middleware(request: NextRequest) {
  const authUser = request.cookies.get("auth_user");
  const { pathname } = request.nextUrl;

  // public 경로는 항상 접근 가능
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 인증되지 않은 사용자는 /signin으로 리다이렉트
  if (!authUser) {
    const signInUrl = new URL("/signin", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
