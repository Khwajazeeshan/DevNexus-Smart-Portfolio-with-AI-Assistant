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
        <div className="min-h-screen bg-bg-primary font-body pb-12">
            <Toaster position="top-right" toastOptions={{ className: 'font-body rounded-xl font-medium shadow-custom border border-border-color bg-bg-card text-text-primary' }} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
                <header className="mb-10 animate-fadeInUp">
                    <div className="flex flex-col gap-4">
                        <Link href="/admindashboard" className="flex items-center gap-2 text-text-secondary hover:text-accent font-medium transition-all group w-fit">
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Dashboard</span>
                        </Link>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-text-primary">
                                Contact Portal<span className="text-accent">.</span>
                            </h1>
                            <p className="mt-2 text-text-secondary text-sm md:text-base font-medium max-w-2xl">Configure your communication nodes and ensure potential clients can reach you seamlessly.</p>
                        </div>
                    </div>
                </header>

                <form onSubmit={handleContactSubmit} className="space-y-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    <div className="bg-bg-card rounded-[2rem] p-6 md:p-10 border border-border-color shadow-sm hover:shadow-custom transition-all duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Address */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary px-1">
                                    <FaMapMarkerAlt size={12} className="text-accent" /> Physical Location
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-6 py-4 rounded-2xl bg-bg-primary border border-border-color focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30"
                                    placeholder="e.g. 123 Street, City, Country"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            {/* Map Link */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary px-1">
                                    <FaMapMarkerAlt size={12} className="text-accent-2" /> Geo-Coordinate Link
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-6 py-4 rounded-2xl bg-bg-primary border border-border-color focus:border-accent-2 focus:ring-4 focus:ring-accent-2/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30"
                                    placeholder="Google Maps URL"
                                    value={mapLink}
                                    onChange={(e) => setMapLink(e.target.value)}
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary px-1">
                                    <FaEnvelope size={12} className="text-accent" /> Communication Hub
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-6 py-4 rounded-2xl bg-bg-primary border border-border-color focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30"
                                    placeholder="hello@portfolio.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary px-1">
                                    <FaPhone size={12} className="text-accent-2" /> Voice Channel
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-6 py-4 rounded-2xl bg-bg-primary border border-border-color focus:border-accent-2 focus:ring-4 focus:ring-accent-2/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30"
                                    placeholder="+92 3XX XXXXXXX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-12">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="w-full md:w-fit px-10 py-4 rounded-2xl bg-gradient-to-r from-accent to-accent-2 text-white font-bold tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0 transition-all flex items-center justify-center gap-3 group"
                            >
                                <FaSave className={`group-hover:scale-110 transition-transform ${isSaving ? 'animate-pulse' : ''}`} />
                                <span>{isSaving ? "Synchronizing..." : "Initialize Update"}</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
