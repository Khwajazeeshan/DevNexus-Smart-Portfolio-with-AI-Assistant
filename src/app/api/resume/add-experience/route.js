import Resume from "@/models/Resume.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { experience } = await request.json();

        let resume = await Resume.findOne();
        if (!resume) {
            resume = new Resume({ education: [], experience: [], skills: [] });
        }

        resume.experience.push({ experience });
        await resume.save();

        return NextResponse.json({ message: "Experience added successfully", experience: resume.experience });
    } catch (error) {
        console.error("Error adding experience:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
