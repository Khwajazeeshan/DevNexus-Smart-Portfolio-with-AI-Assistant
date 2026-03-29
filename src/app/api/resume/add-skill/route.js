import Resume from "@/models/Resume.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { name, percentage } = await request.json();

        let resume = await Resume.findOne();
        if (!resume) {
            resume = new Resume({ education: [], experience: [], skills: [] });
        }

        resume.skills.push({ name, percentage });
        await resume.save();

        return NextResponse.json({ message: "Skill added successfully", skills: resume.skills });
    } catch (error) {
        console.error("Error adding skill:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
