import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const { pathname } = request.nextUrl;


    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    if (!token && pathname === "/channels/me" || pathname === "/") {
        return NextResponse.redirect(new URL("/en/login", request.url));
    } else if (!token && pathname === "/en/login" || pathname === "/en/register") {
        return NextResponse.next();
    }

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