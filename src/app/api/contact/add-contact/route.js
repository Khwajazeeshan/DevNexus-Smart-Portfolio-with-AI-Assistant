import Contact from "@/models/Contact.model.js";
import connectDB from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { address, mapLink, email, phone } = await request.json();

        if (!address || !mapLink || !email || !phone) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        let contact = await Contact.findOne();

        if (contact) {
            contact.address = address;
            contact.mapLink = mapLink;
            contact.email = email;
            contact.phone = phone;
            await contact.save();
            return NextResponse.json({ message: "Contact info updated successfully", contact });
        }

        const newContact = new Contact({ address, mapLink, email, phone });
        await newContact.save();

        return NextResponse.json({ message: "Contact info added successfully", contact: newContact });
    } catch (error) {
        console.error("Error adding contact info:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
