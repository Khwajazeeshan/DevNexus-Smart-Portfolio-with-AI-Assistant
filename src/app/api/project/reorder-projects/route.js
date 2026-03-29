import Project from "@/models/Project.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { projectsIds } = await request.json(); // Array of IDs in the new order

        if (!projectsIds || !Array.isArray(projectsIds)) {
            return NextResponse.json({ message: "Invalid project ID list" }, { status: 400 });
        }

        // Bulk update positions
        const updatePromises = projectsIds.map((id, index) => {
            return Project.findByIdAndUpdate(id, { position: index });
        });

        await Promise.all(updatePromises);

        const updatedProjects = await Project.find().sort({ position: 1 });
        return NextResponse.json({ message: "Order updated successfully", projects: updatedProjects });
    } catch (error) {
        console.error("Error reordering projects:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
