"use client";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
};

export default function Footer() {
    const [footer, setFooter] = useState(null);
    const [userName, setUserName] = useState("Khawaja Zeeshan");

    useEffect(() => {
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
        { icon: <FaFacebook size={20} />, link: ensureHttps(footer?.facebook), label: "Facebook" },
        { icon: <FaInstagram size={20} />, link: ensureHttps(footer?.instagram), label: "Instagram" },
        { icon: <FaGithub size={20} />, link: ensureHttps(footer?.github), label: "GitHub" },
        { icon: <FaLinkedin size={20} />, link: ensureHttps(footer?.linkedin), label: "LinkedIn" },
    ];

    return (
        <footer className="py-12 px-6 border-t border-white/5">
            <div className="container mx-auto flex flex-col items-center gap-8">
                <div className="flex items-center gap-4">
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 transition-all duration-300"
                            aria-label={social.label}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-slate-500 text-sm font-medium">
                        © {new Date().getFullYear()} <span className="text-slate-300 font-bold">{userName}</span> || All Rights Reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
}


