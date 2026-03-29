import Footer from "@/models/Footer.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { facebook, instagram, github, linkedin } = await request.json();

        let footer = await Footer.findOne();

        if (footer) {
            footer.facebook = facebook;
            footer.instagram = instagram;
            footer.github = github;
            footer.linkedin = linkedin;
            await footer.save();
            return NextResponse.json({ message: "Footer info updated successfully", footer });
        }

        const newFooter = new Footer({ facebook, instagram, github, linkedin });
        await newFooter.save();

        return NextResponse.json({ message: "Footer info added successfully", footer: newFooter });
    } catch (error) {
        console.error("Error adding footer info:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
