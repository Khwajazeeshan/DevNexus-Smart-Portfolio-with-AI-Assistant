import Resume from "@/models/Resume.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        let resume = await Resume.findOne();
        if (resume) {
            resume.education = resume.education.filter(item => item._id.toString() !== id);
            await resume.save();
        }

        return NextResponse.json({ message: "Education deleted successfully", education: resume?.education || [] });
    } catch (error) {
        console.error("Error deleting education:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
