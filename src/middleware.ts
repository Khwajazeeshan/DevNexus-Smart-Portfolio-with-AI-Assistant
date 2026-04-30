import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isLoginPath = path === "/login";
    const isAdminPath = path === "/admindashboard" || path.startsWith("/admindashboard/");
    const token = request.cookies.get("Accesstoken")?.value || "";

    // Unauthenticated user trying to access admin pages → redirect to Login
    if (isAdminPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Authenticated user trying to access Login page → redirect to Dashboard
    if (isLoginPath && token) {
        return NextResponse.redirect(new URL("/admindashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/login',
        '/admindashboard',
        '/admindashboard/:path*'
    ]
}
