import Resume from "@/models/Resume.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const resume = await Resume.findOne();
        
        if (!resume || !resume.resumeUrl) {
            return NextResponse.json({ message: "No resume found" }, { status: 404 });
        }

        // We fetch the original URL, not the fl_attachment one, because we will handle the attachment header here
        let fetchUrl = resume.resumeUrl;
        if (fetchUrl.includes("/upload/fl_attachment/")) {
            fetchUrl = fetchUrl.replace("/upload/fl_attachment/", "/upload/");
        }

        // Fetch the actual PDF file from Cloudinary server-side
        const response = await fetch(fetchUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch file from remote server: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Return the file directly from our own domain with headers that force a download
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="Professional_Resume.pdf"`,
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Content-Length": buffer.length.toString(),
            },
        });
    } catch (error) {
        console.error("Error downloading resume:", error);
        return NextResponse.json({ message: "Failed to download resume" }, { status: 500 });
    }
}
