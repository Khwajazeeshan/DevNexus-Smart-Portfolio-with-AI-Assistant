"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { ThemeToggle } from "@/components/ThemeToggle";

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
        if (ref && ref.current) {
            const offset = 80;
            const top = ref.current.offsetTop - offset;
            window.scrollTo({ top, behavior: "smooth" });
            setMenuOpen(false);
        }
    };

    const handleDownloadResume = (e) => {
        if (e) e.preventDefault();
        if (!resumeUrl) return;

        const link = document.createElement("a");
        link.href = "/api/resume/download";
        link.download = "Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setMenuOpen(false);
    };

    return (
        <nav className={`sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#0A0F1E]/70 border-b border-border-color transition-all duration-300 ${scrolled ? 'shadow-custom' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Left: Logo/Brand */}
                    <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        <div className="flex items-center gap-3 group">
                            <img
                                src="/logo-1.png"
                                alt="Khawaja Zeeshan Logo"
                                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Right: Desktop Links / Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        {/* Desktop Links */}
                        <div className="hidden md:block">
                            <ul className="flex items-center space-x-8">
                                {["About", "Resume", "Projects", "Contact"].map((item) => (
                                    <li
                                        key={item}
                                        onClick={() => scrollToSection(sections[item.toLowerCase()])}
                                        className="text-text-secondary hover:text-accent font-medium cursor-pointer transition-colors duration-300 relative group"
                                    >
                                        {item}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="hidden md:flex items-center gap-4 ml-4">
                            {resumeUrl && (
                                <button
                                    onClick={handleDownloadResume}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-bg-card border border-border-color shadow-sm hover:shadow-custom hover:-translate-y-1 transition-all duration-300 text-text-primary font-medium"
                                >
                                    Resume <IoMdDownload />
                                </button>
                            )}
                            <ThemeToggle />
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden items-center gap-3">
                            <ThemeToggle />
                            <button className="text-text-secondary hover:text-accent p-2 rounded-xl bg-bg-card border border-border-color shadow-sm transition-all duration-300" onClick={toggleMenu}>
                                {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div 
                className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-bg-card/95 backdrop-blur-xl border-b border-border-color ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="px-4 py-6 space-y-4 shadow-custom">
                    <div className="flex flex-col space-y-3">
                        {["About", "Resume", "Projects", "Contact"].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(sections[item.toLowerCase()])}
                                className="text-left w-full px-4 py-3 text-text-secondary hover:text-accent hover:bg-bg-primary rounded-xl transition-all duration-300 font-medium"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {resumeUrl && (
                        <button
                            onClick={handleDownloadResume}
                            className="w-full flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-2 text-white shadow-custom hover:opacity-90 font-medium transition-all duration-300"
                        >
                            Resume <IoMdDownload />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

