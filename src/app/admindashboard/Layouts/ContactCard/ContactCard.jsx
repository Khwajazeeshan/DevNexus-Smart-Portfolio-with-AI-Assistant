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
        <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
            <Toaster position="top-right" />
            
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <Link href="/admindashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group">
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Dashboard</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-white">Contact Info</h1>
                    </div>
                </header>

                <form onSubmit={handleContactSubmit} className="space-y-8 bg-slate-900/50 border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Address */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                                <FaMapMarkerAlt className="text-brand-primary" /> Office Address
                            </label>
                            <input
                                type="text"
                                className="w-full bg-slate-800 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                placeholder="e.g. 123 Street, City, Country"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        {/* Map Link */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                                <FaMapMarkerAlt className="text-brand-primary" /> Map URL (Embed or Link)
                            </label>
                            <input
                                type="text"
                                className="w-full bg-slate-800 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                placeholder="Google Maps URL"
                                value={mapLink}
                                onChange={(e) => setMapLink(e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                                <FaEnvelope className="text-brand-primary" /> Public Email
                            </label>
                            <input
                                type="email"
                                className="w-full bg-slate-800 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                placeholder="hello@portfolio.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                                <FaPhone className="text-brand-primary" /> Business Phone
                            </label>
                            <input
                                type="text"
                                className="w-full bg-slate-800 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                placeholder="+92 3XX XXXXXXX"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-12 py-4 bg-brand-primary hover:bg-violet-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            <FaSave /> {isSaving ? "Saving..." : "Save Contact Details"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


