import Resume from "@/models/Resume.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const resume = await Resume.findOneAndUpdate(
            {},
            { $pull: { skills: { _id: id } } },
            { returnDocument: 'after' }
        );

        if (!resume) {
            return NextResponse.json({ message: "Resume not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Category deleted successfully", skills: resume.skills });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
