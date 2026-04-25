"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaMapMarkerAlt, FaEnvelope, FaPhone, FaSave } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
};

export default function ContactCard() {
    const [address, setAddress] = useState("");
    const [mapLink, setMapLink] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const fetchContact = async () => {
        try {
            const response = await fetch(`/api/contact/get-contact`);
            if (response.ok) {
                const data = await response.json();
                if (data.contact) {
                    setAddress(data.contact.address || "");
                    setMapLink(data.contact.mapLink || "");
                    setEmail(data.contact.email || "");
                    setPhone(data.contact.phone || "");
                }
            }
        } catch (error) {
            console.error("Error fetching contact info:", error);
        }
    };

    useEffect(() => {
        fetchContact();
    }, []);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        if (!address.trim() || !mapLink.trim() || !email.trim() || !phone.trim()) {
            return toast.error("All fields are required");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return toast.error("Please enter a valid email address");
        }

        setIsSaving(true);
        try {
            const response = await fetch(`/api/contact/add-contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ address, mapLink: ensureHttps(mapLink), email, phone }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message || "Contact info saved!");
            }
        } catch {
            toast.error("Error saving contact info");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div >
            <Toaster position="top-right" />

            <div >
                <header >
                    <div>
                        <Link href="/admindashboard" >
                            <FaArrowLeft  />
                            <span>Back to Dashboard</span>
                        </Link>
                        <h1 >Contact Portal</h1>
                        <p >Manage how the world reaches out to you.</p>
                    </div>
                </header>

                <form onSubmit={handleContactSubmit} >
                    <div >
                        {/* Address */}
                        <div >
                            <label >
                                <FaMapMarkerAlt  /> Office Address
                            </label>
                            <input
                                type="text"
                                
                                placeholder="e.g. 123 Street, City, Country"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        {/* Map Link */}
                        <div >
                            <label >
                                <FaMapMarkerAlt  /> Map URL (Embed or Link)
                            </label>
                            <input
                                type="text"
                                
                                placeholder="Google Maps URL"
                                value={mapLink}
                                onChange={(e) => setMapLink(e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <div >
                            <label >
                                <FaEnvelope  /> Public Email
                            </label>
                            <input
                                type="email"
                                
                                placeholder="hello@portfolio.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Phone */}
                        <div >
                            <label >
                                <FaPhone  /> Business Phone
                            </label>
                            <input
                                type="text"
                                
                                placeholder="+92 3XX XXXXXXX"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div >
                        <button
                            type="submit"
                            disabled={isSaving}
                            
                        >
                            <FaSave  /> {isSaving ? "Synchronizing..." : "Update Contact Info"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


