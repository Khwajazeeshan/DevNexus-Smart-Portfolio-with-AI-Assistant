import Resume from "@/models/Resume.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { type, ids, categoryId } = await request.json();

        if (!type || !ids || !Array.isArray(ids)) {
            return NextResponse.json({ message: "Invalid request data" }, { status: 400 });
        }

        let resume = await Resume.findOne();
        if (!resume) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        if (type === "education") {
            const reordered = ids.map(id => resume.education.id(id)).filter(Boolean);
            resume.education = reordered;
        } else if (type === "experience") {
            const reordered = ids.map(id => resume.experience.id(id)).filter(Boolean);
            resume.experience = reordered;
        } else if (type === "skills") {
            const reordered = ids.map(id => resume.skills.id(id)).filter(Boolean);
            resume.skills = reordered;
        } else if (type === "subskills") {
            if (!categoryId) {
                return NextResponse.json({ message: "Category ID is required for subskills reordering" }, { status: 400 });
            }
            const category = resume.skills.id(categoryId);
            if (!category) {
                return NextResponse.json({ message: "Category not found" }, { status: 404 });
            }
            const reordered = ids.map(id => category.subSkills.id(id)).filter(Boolean);
            category.subSkills = reordered;
        } else {
            return NextResponse.json({ message: "Invalid type" }, { status: 400 });
        }

        await resume.save();
        return NextResponse.json({ 
            message: "Reordered successfully", 
            education: resume.education,
            experience: resume.experience,
            skills: resume.skills
        });

    } catch (error) {
        console.error("Error reordering resume:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
