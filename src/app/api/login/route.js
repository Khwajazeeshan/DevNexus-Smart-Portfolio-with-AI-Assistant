import generateToken from "@/utils/generateToken.js";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const Password = process.env.Password;

export async function POST(request) {
    try {
        const { password } = await request.json();

        if (password === Password) {
            const token = generateToken();

            const response = NextResponse.json({ success: true, message: "Login Successful" });

            // Set cookie directly on the response - more reliable in Next.js App Router
            response.cookies.set("Accesstoken", token, {
                maxAge: 15 * 24 * 60 * 60, // 15 days in SECONDS
                expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days in MILLISECONDS
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                path: "/",
            });

            return response;
        }
        return NextResponse.json({ success: false, message: "Incorrect Password" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        const response = NextResponse.json({ success: true, message: "Logged out successfully" });
        response.cookies.set("Accesstoken", "", {
            maxAge: 0,
            path: "/",
        });
        return response;
    } catch (error) {
        console.log("Error in logout controller", error.message);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        // Read cookie from the incoming request directly - most reliable approach
        const token = request.cookies.get("Accesstoken")?.value;

        if (!token) {
            return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
        }

        return NextResponse.json({ success: true, user: { role: "admin" } });
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
