"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

export default function Navbar({ sections }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [resumeUrl, setResumeUrl] = useState("");
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get("/api/about");
                if (response.data.success) {
                    setProfileData(response.data.data);
                }
            } catch (error) {
                console.error('Navbar: Error fetching profile data:', error);
            }
        };
        fetchProfileData();
    }, []);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await fetch("/api/resume/get-resume");
                const data = await response.json();
                if (data && data.resumeUrl) {
                    setResumeUrl(data.resumeUrl);
                }
            } catch (error) {
                console.error("Error fetching resume:", error);
            }
        };
        fetchResume();
    }, []);

    const scrollToSection = (ref) => {
        if (ref.current) {
            const offset = 80;
            const top = ref.current.offsetTop - offset;
            window.scrollTo({ top, behavior: "smooth" });
            setMenuOpen(false);
        }
    };

    const profileImage = profileData?.imagePath
        ? `${profileData.imagePath}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData?.name || "User")}&background=random`;

    const profileName = profileData?.name || "Dev";

    const handleDownloadResume = (e) => {
        if (e) e.preventDefault();
        if (!resumeUrl) return;

        // securely triggers a native download of the local file
        const link = document.createElement("a");
        link.href = resumeUrl;
        link.download = "Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-5 bg-bg-dark/90 backdrop-blur-xl shadow-lg border-b border-white/5`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo/Brand */}
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-brand-primary group-hover:scale-110 transition-transform duration-300">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = "https://ui-avatars.com/api/?name=User&background=random";
                            }}
                        />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gradient hidden sm:block">
                        {profileName}
                    </span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex items-center gap-8 text-sm font-medium text-slate-300">
                        {["About", "Resume", "Projects", "Contact"].map((item) => (
                            <li
                                key={item}
                                onClick={() => scrollToSection(sections[item.toLowerCase()])}
                                className="cursor-pointer hover:text-brand-primary transition-colors duration-200 relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
                            </li>
                        ))}
                    </ul>

                    {resumeUrl && (
                        <button
                            onClick={handleDownloadResume}
                            className="px-5 py-2.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary font-semibold text-sm hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-brand-primary/20 flex items-center gap-2 whitespace-nowrap"
                        >
                            Resume <IoMdDownload className="text-lg" />
                        </button>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-slate-300 hover:text-white transition-colors" onClick={toggleMenu}>
                    {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div 
                className={`absolute top-full left-0 right-0 md:hidden bg-bg-dark/95 backdrop-blur-2xl border-t border-white/5 transition-all duration-900 ease-in-out origin-top overflow-hidden h-[40vh] ${
                    menuOpen ? "scale-y-100 opacity-100 visible" : "scale-y-0 opacity-0 invisible"
                }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8 py-8">
                    <div className="flex flex-col items-center gap-6">
                        {["About", "Resume", "Projects", "Contact"].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(sections[item.toLowerCase()])}
                                className="text-2xl font-semibold text-slate-200 hover:text-brand-primary transition-all duration-300 relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full rounded-full"></span>
                            </button>
                        ))}
                    </div>

                    {resumeUrl && (
                        <button
                            onClick={handleDownloadResume}
                            className="px-6 py-3 rounded-full bg-brand-primary text-white font-bold text-base hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-brand-primary/20"
                        >
                            Resume <IoMdDownload className="text-lg" />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}



