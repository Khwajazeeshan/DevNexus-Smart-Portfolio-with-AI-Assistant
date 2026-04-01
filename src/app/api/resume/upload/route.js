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
        await connectDB();
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
        }

        // Convert file to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "raw", // Use raw for non-image files like PDF in Cloudinary, or auto. "raw" is safer for raw files. Let's use auto though since some PDFs are handled as images. Actually "auto" works fine mostly. However, Cloudinary automatically assigns a resource_type 'raw' to pdf if 'auto' is used, or 'image' depending on settings. I will use 'raw'.
                    folder: "resumes",
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Error:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            uploadStream.end(buffer);
        });

        const resumeUrl = uploadResult.secure_url;

        let resume = await Resume.findOne();
        if (!resume) {
            resume = new Resume({ education: [], experience: [], skills: [] });
        }

        // Save URL to database
        resume.resumeUrl = resumeUrl;
        await resume.save();

        return NextResponse.json({
            success: true,
            message: "Resume uploaded successfully to Cloudinary",
            resumeUrl: resume.resumeUrl
        });
    } catch (error) {
        console.error("Error in remote resume upload:", error);
        return NextResponse.json({
            success: false,
            message: "Server error during upload",
            error: error.message
        }, { status: 500 });
    }
}

