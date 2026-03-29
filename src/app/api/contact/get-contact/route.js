import Contact from "@/models/Contact.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const contact = await Contact.findOne();
        return NextResponse.json({ contact });
    } catch (error) {
        console.error("Error fetching contact info:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
