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
        <div >
            <Toaster position="top-right" />
            
            <div >
                <header >
                    <div>
                        <Link href="/admindashboard" >
                            <FaArrowLeft  />
                            <span>Back to Dashboard</span>
                        </Link>
                        <h1 >Social Connect</h1>
                        <p >Link your professional profiles and social presence.</p>
                    </div>
                </header>

                <form onSubmit={handleFooterSubmit} >
                    <div >
                        {/* Facebook */}
                        <div >
                            <label >
                                <FaFacebook  /> Facebook
                            </label>
                            <input
                                type="text"
                                
                                placeholder="Facebook Profile URL"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                            />
                        </div>

                        {/* Instagram */}
                        <div >
                            <label >
                                <FaInstagram  /> Instagram
                            </label>
                            <input
                                type="text"
                                
                                placeholder="Instagram Profile URL"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </div>

                        {/* GitHub */}
                        <div >
                            <label >
                                <FaGithub  /> GitHub
                            </label>
                            <input
                                type="text"
                                
                                placeholder="GitHub Profile URL"
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                            />
                        </div>

                        {/* LinkedIn */}
                        <div >
                            <label >
                                <FaLinkedin  /> LinkedIn
                            </label>
                            <input
                                type="text"
                                
                                placeholder="LinkedIn Profile URL"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                            />
                        </div>
                    </div>

                    <div >
                        <button
                            type="submit"
                            disabled={isSaving}
                            
                        >
                            <FaSave  /> {isSaving ? "Synchronizing..." : "Update Social Ecosystem"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FooterCard;
