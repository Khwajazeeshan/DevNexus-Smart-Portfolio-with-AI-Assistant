import Project from "@/models/Project.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const projects = await Project.find().sort({ position: 1 });
        return NextResponse.json({ projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
