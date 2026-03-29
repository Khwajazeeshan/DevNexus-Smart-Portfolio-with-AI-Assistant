import Project from "@/models/Project.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        await Project.findByIdAndDelete(id);

        const projects = await Project.find().sort({ position: 1 });
        return NextResponse.json({ message: "Project deleted successfully", projects });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
