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
        <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
            <Toaster position="top-right" />
            
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <Link href="/admindashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group">
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Dashboard</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-white">Social Links</h1>
                    </div>
                </header>

                <form onSubmit={handleFooterSubmit} className="space-y-8 bg-slate-900/50 border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Facebook */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                                <FaFacebook className="text-blue-500" /> Facebook
                            </label>
                            <input
                                type="text"
                                className="w-full bg-slate-800 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                placeholder="Facebook Profile URL"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                            />
                        </div>

                        {/* Instagram */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                                <FaInstagram className="text-pink-500" /> Instagram
                            </label>
                            <input
                                type="text"
                                className="w-full bg-slate-800 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                placeholder="Instagram Profile URL"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </div>

                        {/* GitHub */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                                <FaGithub className="text-white" /> GitHub
                            </label>
                            <input
                                type="text"
                                className="w-full bg-slate-800 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                placeholder="GitHub Profile URL"
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                            />
                        </div>

                        {/* LinkedIn */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                                <FaLinkedin className="text-blue-600" /> LinkedIn
                            </label>
                            <input
                                type="text"
                                className="w-full bg-slate-800 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                placeholder="LinkedIn Profile URL"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-12 py-4 bg-brand-primary hover:bg-violet-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-brand-primary/20 flex items-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            <FaSave /> {isSaving ? "Saving..." : "Update Socials"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FooterCard;
