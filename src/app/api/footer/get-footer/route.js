import Footer from "@/models/Footer.model.js";
import About from "@/models/About";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const footer = await Footer.findOne();

        // Also fetch name from About for the footer
        const about = await About.findOne();
        const name = about?.name || "Portfolio";

        return NextResponse.json({ footer, name });
    } catch (error) {
        console.error("Error fetching footer data:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
