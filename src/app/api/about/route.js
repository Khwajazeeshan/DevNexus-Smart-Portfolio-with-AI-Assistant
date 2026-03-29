import About from "@/models/About";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
    try {
        await connectDB();
        const aboutData = await About.findOne().sort({ createdAt: -1 });

        if (!aboutData) {
            return NextResponse.json({
                success: false,
                message: "No about data found"
            });
        }

        return NextResponse.json({
            success: true,
            data: aboutData
        });
    } catch (error) {
        console.error("Error in getAbout:", error);
        return NextResponse.json({
            success: false,
            message: "Server error",
            error: error.message
        }, { status: 200 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const formData = await request.formData();
        const name = formData.get("name");
        const description = formData.get("description");
        const skills = formData.get("skills");
        const experienceYears = formData.get("experienceYears");
        const projectsCount = formData.get("projectsCount");
        const file = formData.get("file") || formData.get("image");

        // Check if about data already exists
        const existingAbout = await About.findOne();

        let imagePath = existingAbout?.imagePath || null;

        if (file && typeof file !== 'string') {
            // Convert file to Buffer
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Upload to Cloudinary
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "auto",
                        folder: "profile",
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });

            imagePath = uploadResult.secure_url;
        }

        let aboutData;
        if (existingAbout) {
            if (name !== null) existingAbout.name = name;
            if (description !== null) existingAbout.description = description;
            if (skills !== null) existingAbout.skills = skills;
            if (experienceYears !== null) existingAbout.experienceYears = experienceYears;
            if (projectsCount !== null) existingAbout.projectsCount = projectsCount;
            if (imagePath) existingAbout.imagePath = imagePath;
            aboutData = await existingAbout.save();
        } else {
            aboutData = new About({
                name: name || '',
                description: description || '',
                skills: skills || '',
                experienceYears: experienceYears || '0',
                projectsCount: projectsCount || '0',
                imagePath: imagePath || ''
            });
            await aboutData.save();
        }

        return NextResponse.json({
            success: true,
            message: "About data saved successfully with Cloudinary",
            data: aboutData
        });
    } catch (error) {
        console.error("Error in createOrUpdateAbout:", error);
        return NextResponse.json({
            success: false,
            message: "Server error during profile update",
            error: error.message
        }, { status: 500 });
    }
}


