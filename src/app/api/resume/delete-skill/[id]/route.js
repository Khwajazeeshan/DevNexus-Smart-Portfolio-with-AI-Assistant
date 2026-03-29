import Resume from "@/models/Resume.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        let resume = await Resume.findOne();
        if (resume) {
            resume.skills = resume.skills.filter(item => item._id.toString() !== id);
            await resume.save();
        }

        return NextResponse.json({ message: "Skill deleted successfully", skills: resume?.skills || [] });
    } catch (error) {
        console.error("Error deleting skill:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
