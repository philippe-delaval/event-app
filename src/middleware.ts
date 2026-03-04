import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
        req.nextUrl.pathname.startsWith("/admin") &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req.nextauth.token?.role !== "ADMIN"
    ) {
      return NextResponse.rewrite(new URL("/login", req.url));
    }

    if (
        req.nextUrl.pathname.startsWith("/dashboard") &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req.nextauth.token?.role !== "ORGANIZER" &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req.nextauth.token?.role !== "ADMIN"
    ) {
      return NextResponse.rewrite(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
