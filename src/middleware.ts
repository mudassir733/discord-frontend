import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const { pathname } = request.nextUrl;

    // Allow static files, API routes, and _next
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // Redirect unauthenticated users
    if (!token && pathname === "/channels/me" || pathname === "/") {
        return NextResponse.redirect(new URL("/en/login", request.url));
    }

    // Redirect "/" to "/en" if logged in
    if (pathname === "/" && token) {
        return NextResponse.redirect(new URL("/en", request.url));
    }

    if (token && pathname === "/en/login" || pathname === "/en/register") {
        return NextResponse.redirect(new URL("/channels/me", request.url));

    }

    return NextResponse.next();
}
export const config = {
    matcher: ["/", "/channels/me", "/((?!_next|api|static|.*\\..*).*)"],
};