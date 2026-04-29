import Resume from "@/models/Resume.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { category } = await request.json();

        let resume = await Resume.findOne();
        if (!resume) {
            resume = new Resume({ education: [], experience: [], skills: [{ category, subSkills: [] }] });
        } else {
            resume.skills.push({ category, subSkills: [] });
        }

        await resume.save();

        return NextResponse.json({ message: "Category added successfully", skills: resume.skills });
    } catch (error) {
        console.error("Error adding category:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
