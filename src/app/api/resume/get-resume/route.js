import Resume from "@/models/Resume.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const resume = await Resume.findOne();
        if (!resume) {
            return NextResponse.json({ education: [], experience: [], skills: [] });
        }
        return NextResponse.json(resume);
            
    } catch (error) {   
        console.error("Error fetching resume:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
