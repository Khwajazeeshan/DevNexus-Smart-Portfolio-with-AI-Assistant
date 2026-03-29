import Resume from "@/models/Resume.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { education } = await request.json();

        let resume = await Resume.findOne();
        if (!resume) {
            resume = new Resume({ education: [], experience: [], skills: [] });
        }

        resume.education.push({ education });
        await resume.save();

        return NextResponse.json({ message: "Education added successfully", education: resume.education });
    } catch (error) {
        console.error("Error adding education:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
