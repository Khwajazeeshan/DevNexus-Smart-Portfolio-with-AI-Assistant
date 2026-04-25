"use client";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "next-themes";

const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
};

export default function Footer() {
    const [footer, setFooter] = useState(null);
    const [userName, setUserName] = useState("Khawaja Zeeshan");
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const fetchData = async () => {
            try {
                const footerRes = await fetch("/api/footer/get-footer");
                if (footerRes.ok) {
                    const data = await footerRes.json();
                    setFooter(data.footer);
                }

                const aboutRes = await fetch("/api/about");
                if (aboutRes.ok) {
                    const data = await aboutRes.json();
                    if (data.success && data.data && data.data.name) {
                        setUserName(data.data.name);
                    }
                }
            } catch (error) {
                console.error("Error fetching footer data:", error);
            }
        };
        fetchData();
    }, []);

    const socialLinks = [
        { icon: <FaLinkedin size={22} />, link: ensureHttps(footer?.linkedin), label: "LinkedIn" },
        { icon: <FaGithub size={22} />, link: ensureHttps(footer?.github), label: "GitHub" },
        { icon: <FaFacebook size={22} />, link: ensureHttps(footer?.facebook), label: "Facebook" },
        { icon: <FaInstagram size={22} />, link: ensureHttps(footer?.instagram), label: "Instagram" },


    ];

    return (
        <footer className="relative bg-bg-card border-t border-border-color py-3 px-4 sm:px-6 lg:px-8 mt-10 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen animate-float"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-2/10 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen animate-float" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-7xl mx-auto flex flex-col items-center z-10 relative">



                {/* Social Icons */}
                <div className="flex flex-wrap justify-center gap-6 mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative p-4 bg-bg-primary border border-border-color rounded-2xl shadow-sm hover:shadow-custom hover:-translate-y-2 transition-all duration-500 ease-out flex items-center justify-center overflow-hidden text-text-secondary hover:text-accent"
                            aria-label={social.label}
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Blinking light animation wrapper */}
                            <span
                                className="relative z-10 animate-blueBlink"
                                style={{ animationDelay: `${index * 1.5}s` }}
                            >
                                {social.icon}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center justify-center gap-4 mb-6 opacity-50">
                        <span className="w-12 h-[1px] bg-border-color"></span>
                        <span className="text-xs font-bold tracking-widest uppercase text-text-secondary">Signature Line</span>
                        <span className="w-12 h-[1px] bg-border-color"></span>
                    </div>
                    <p className="text-text-secondary font-medium">
                        © {new Date().getFullYear()} <span className="font-bold text-text-primary">{userName.toUpperCase()}</span> || <span className="italic"> All Rights Reserved.</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}


