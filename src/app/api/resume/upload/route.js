import Resume from "@/models/Resume.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(request) {
    try {
        await connectDB();
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
        }

        // Convert file to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define the local path (public/resumes directory so it can be served statically)
        const publicDir = path.join(process.cwd(), "public");
        const resumeDir = path.join(publicDir, "resumes");

        // Ensure the resumes directory exists
        if (!fs.existsSync(resumeDir)) {
            await mkdir(resumeDir, { recursive: true });
        }

        // We will just overwrite \"resume.pdf\" to keep things clean
        const filename = "resume.pdf";
        const filePath = path.join(resumeDir, filename);

        // Write the file to the local disk
        await writeFile(filePath, buffer);

        // The URL is simply the path relative to the public folder
        const resumeUrl = `/resumes/${filename}?v=${new Date().getTime()}`; // Add timestamp to break cache

        let resume = await Resume.findOne();
        if (!resume) {
            resume = new Resume({ education: [], experience: [], skills: [] });
        }

        // Save local path to database
        resume.resumeUrl = resumeUrl;
        await resume.save();

        return NextResponse.json({
            success: true,
            message: "Resume uploaded successfully to local host",
            resumeUrl: resume.resumeUrl
        });
    } catch (error) {
        console.error("Error in local resume upload:", error);
        return NextResponse.json({
            success: false,
            message: "Server error during upload",
            error: error.message
        }, { status: 500 });
    }
}

