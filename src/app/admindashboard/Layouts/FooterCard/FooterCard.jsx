"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaFacebook, FaInstagram, FaGithub, FaLinkedin, FaSave } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
};

const FooterCard = () => {
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const fetchFooter = async () => {
        try {
            const response = await fetch(`/api/footer/get-footer`);
            if (response.ok) {
                const data = await response.json();
                if (data.footer) {
                    setFacebook(data.footer.facebook || "");
                    setInstagram(data.footer.instagram || "");
                    setGithub(data.footer.github || "");
                    setLinkedin(data.footer.linkedin || "");
                }
            }
        } catch (error) {
            console.error("Error fetching footer info:", error);
        }
    };

    useEffect(() => {
        fetchFooter();
    }, []);

    const handleFooterSubmit = async (e) => {
        e.preventDefault();
        if (!facebook.trim() || !instagram.trim() || !github.trim() || !linkedin.trim()) {
            return toast.error("All social links are required");
        }

        setIsSaving(true);
        try {
            const response = await fetch(`/api/footer/add-footer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    facebook: ensureHttps(facebook),
                    instagram: ensureHttps(instagram),
                    github: ensureHttps(github),
                    linkedin: ensureHttps(linkedin)
                }),
            });

            if (response.ok) {
                toast.success("Social links updated successfully!");
            }
        } catch {
            toast.error("Error saving footer links");
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
                                Social Ecosystem<span className="text-accent">.</span>
                            </h1>
                            <p className="mt-2 text-text-secondary text-sm md:text-base font-medium max-w-2xl">Initialize and maintain your digital footprint across professional and social platforms.</p>
                        </div>
                    </div>
                </header>

                <form onSubmit={handleFooterSubmit} className="space-y-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    <div className="bg-bg-card rounded-[2rem] p-6 md:p-10 border border-border-color shadow-sm hover:shadow-custom transition-all duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Facebook */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary px-1">
                                    <FaFacebook size={12} className="text-[#1877F2]" /> Facebook Node
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-6 py-4 rounded-2xl bg-bg-primary border border-border-color focus:border-[#1877F2] focus:ring-4 focus:ring-[#1877F2]/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30"
                                    placeholder="Facebook Profile URL"
                                    value={facebook}
                                    onChange={(e) => setFacebook(e.target.value)}
                                />
                            </div>

                            {/* Instagram */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary px-1">
                                    <FaInstagram size={12} className="text-[#E4405F]" /> Instagram Node
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-6 py-4 rounded-2xl bg-bg-primary border border-border-color focus:border-[#E4405F] focus:ring-4 focus:ring-[#E4405F]/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30"
                                    placeholder="Instagram Profile URL"
                                    value={instagram}
                                    onChange={(e) => setInstagram(e.target.value)}
                                />
                            </div>

                            {/* GitHub */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary px-1">
                                    <FaGithub size={12} className="text-text-primary" /> GitHub Repository
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-6 py-4 rounded-2xl bg-bg-primary border border-border-color focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30"
                                    placeholder="GitHub Profile URL"
                                    value={github}
                                    onChange={(e) => setGithub(e.target.value)}
                                />
                            </div>

                            {/* LinkedIn */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary px-1">
                                    <FaLinkedin size={12} className="text-[#0A66C2]" /> LinkedIn Network
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-6 py-4 rounded-2xl bg-bg-primary border border-border-color focus:border-[#0A66C2] focus:ring-4 focus:ring-[#0A66C2]/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30"
                                    placeholder="LinkedIn Profile URL"
                                    value={linkedin}
                                    onChange={(e) => setLinkedin(e.target.value)}
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
};

export default FooterCard;
