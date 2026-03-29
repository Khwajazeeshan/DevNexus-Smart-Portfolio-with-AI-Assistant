import Project from "@/models/Project.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { name, link, description, technologies } = await request.json();

        if (!name || !link || !description || !technologies) {
            return NextResponse.json({ message: "All fields (name, link, description, tech) are required" }, { status: 400 });
        }

        // Process technologies: comma-separated string to Array
        const techArray = typeof technologies === 'string' 
            ? technologies.split(",").map(tech => tech.trim()).filter(tech => tech !== "")
            : Array.isArray(technologies) ? technologies : [];

        // Determine next position
        const lastProject = await Project.findOne().sort({ position: -1 });
        const position = lastProject ? lastProject.position + 1 : 0;
        
        const newProject = new Project({ 
            name, 
            link, 
            description, 
            technologies: techArray.slice(0, 4), // Only take top 4 as requested
            position
        });
        
        await newProject.save();

        const projects = await Project.find().sort({ position: 1 });
        return NextResponse.json({ message: "Project added successfully", projects });
    } catch (error) {
        console.error("Error adding project:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
