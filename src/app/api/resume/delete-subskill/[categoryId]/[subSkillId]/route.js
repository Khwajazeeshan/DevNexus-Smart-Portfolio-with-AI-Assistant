import Resume from "@/models/Resume.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { categoryId, subSkillId } = await params;

        const resume = await Resume.findOne();
        if (!resume) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        const category = resume.skills.id(categoryId);
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        category.subSkills = category.subSkills.filter(skill => skill._id.toString() !== subSkillId);
        await resume.save();

        return NextResponse.json({ message: "Sub-skill deleted successfully", skills: resume.skills });
    } catch (error) {
        console.error("Error deleting sub-skill:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
