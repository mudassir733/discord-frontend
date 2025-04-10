import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



export function middleware(req: NextRequest) {

    if (req.nextUrl.pathname.startsWith("/")) {
        return NextResponse.redirect(new URL('/en', req.url))

    }

}


export const config = {
    matcher: '/',
}