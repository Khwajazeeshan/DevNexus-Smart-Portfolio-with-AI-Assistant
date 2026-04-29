"use client";
import React, { useEffect, useState } from "react";


const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
};

export default function Footer() {
    const [userName, setUserName] = useState("Khawaja Zeeshan");

    useEffect(() => {
        const fetchData = async () => {
            try {
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
    return (
        <footer className="relative bg-bg-card border-t border-border-color py-3 px-4 sm:px-6 lg:px-8 mt-3 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen animate-float"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-2/10 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen animate-float" style={{ animationDelay: '2s' }}></div>

            {/* Copyright */}
            <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <p className="text-text-secondary font-medium text-[12px] xs:text-xs sm:text-base whitespace-nowrap px-2 mt-2 mb-2">
                    © {new Date().getFullYear()} <span className="font-bold text-text-primary">{userName.toUpperCase()}</span> || <span className="italic"> All Rights Reserved.</span>
                </p>
            </div>
        </footer>
    );
}


