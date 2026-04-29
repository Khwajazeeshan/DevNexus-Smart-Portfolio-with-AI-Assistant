import Resume from "@/models/Resume.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { categoryId, name, percentage } = await request.json();

        if (!categoryId || !name || !percentage) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        let resume = await Resume.findOne();
        if (!resume) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        const category = resume.skills.id(categoryId);
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        category.subSkills.push({ name, percentage });
        await resume.save();

        return NextResponse.json({ message: "Sub-skill added successfully", skills: resume.skills });
    } catch (error) {
        console.error("Error adding sub-skill:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
