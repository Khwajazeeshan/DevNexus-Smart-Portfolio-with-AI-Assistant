import Resume from "@/models/Resume.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
    try {
        // Check if environment variables are set
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            return NextResponse.json({ 
                success: false, 
                message: "Cloudinary configuration is missing on the server (Vercel Environment Variables)" 
            }, { status: 500 });
        }

        await connectDB();
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
        }

        // Convert file to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary using upload_stream
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    folder: "resumes",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        let resume = await Resume.findOne();
        if (!resume) {
            resume = new Resume({ education: [], experience: [], skills: [] });
        }

        // Note: With Cloudinary, we don't necessarily need to delete the old file 
        // using fs, but if we wanted to delete from Cloudinary, we'd use its public_id.
        // For now, we just update the URL.

        resume.resumeUrl = uploadResult.secure_url;
        await resume.save();

        return NextResponse.json({
            success: true,
            message: "Resume uploaded successfully to Cloudinary",
            resumeUrl: resume.resumeUrl
        });
    } catch (error) {
        console.error("Error in resume upload:", error);
        return NextResponse.json({
            success: false,
            message: "Server error during upload",
            error: error.message
        }, { status: 500 });
    }
}

