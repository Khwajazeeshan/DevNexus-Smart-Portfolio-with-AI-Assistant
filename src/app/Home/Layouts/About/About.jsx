"use client";
import React, { useEffect, useState, forwardRef } from "react";
import axios from "axios";

const About = forwardRef(({ onComplete }, ref) => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [showIntro, setShowIntro] = useState(false);
    const [showName, setShowName] = useState(false);
    const [visibleLines, setVisibleLines] = useState([]);
    const [profileLoaded, setProfileLoaded] = useState(false);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await axios.get("/api/about");
                if (response.data.success) {
                    setAboutData(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching about data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAboutData();
    }, []);

    const introWords = ["Hi 👋,", "I'm"];
    const nameLetters = aboutData?.name ? aboutData.name.split('') : [];
    const descriptionLines = aboutData?.description ? aboutData.description.split('\n').filter(line => line.trim() !== "") : [];
    const skillsList = aboutData?.skills
        ? aboutData.skills.split(',').map(skill => skill.trim())
        : [];
    const profileImage = aboutData?.imagePath ? `${aboutData.imagePath}` : null;

    useEffect(() => {
        if (!aboutData || loading) return;

        const introTimer = setTimeout(() => setShowIntro(true), 500);
        const nameTimer = setTimeout(() => setShowName(true), 1500);

        const lineTimers = descriptionLines.map((_, i) =>
            setTimeout(() => {
                setVisibleLines((prev) => !prev.includes(i) ? [...prev, i] : prev);
            }, 2500 + i * 500)
        );

        const completeTimer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 2500 + descriptionLines.length * 500 + 800);

        return () => {
            clearTimeout(introTimer);
            clearTimeout(nameTimer);
            lineTimers.forEach(clearTimeout);
            clearTimeout(completeTimer);
        };
    }, [aboutData, loading, onComplete, descriptionLines.length]);

    useEffect(() => {
        const timer = setTimeout(() => setProfileLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section ref={ref} className=" flex items-center justify-center pt-30 px-5 overflow-hidden">
            {loading ? (
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-medium animate-pulse">Loading Profile...</p>
                </div>
            ) : !aboutData ? (
                <div className="glass p-8 rounded-2xl text-center max-w-md">
                    <p className="text-slate-300">No profile data found. Please set it up in the dashboard.</p>
                </div>
            ) : (
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="order-2 lg:order-1 flex flex-col gap-8">
                        <div>
                            <div className="flex flex-wrap text-2xl md:text-3xl font-medium text-slate-300 mb-2">
                                {showIntro && introWords.map((word, i) => (
                                    <span key={i} className="animate-fade-in opacity-0" style={{ animationDelay: `${i * 0.3}s`, animationFillMode: 'forwards' }}>
                                        {word}&nbsp;
                                    </span>
                                ))}
                            </div>

                            <div className="text-4xl md:text-6xl font-bold tracking-tight">
                                {showName && nameLetters.map((letter, i) => (
                                    <span key={i}
                                        className={`inline-block animate-slide-up opacity-0 text-gradient ${letter === " " ? "min-w-[0.5em]" : ""}`}
                                        style={{ animationDelay: `${0.5 + i * 0.05}s`, animationFillMode: 'forwards' }}>
                                        {letter}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 max-w-xl">
                            {visibleLines.map((i) => (
                                <p key={i} className="text-lg md:text-xl text-slate-400 leading-relaxed animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
                                    {descriptionLines[i]}
                                </p>
                            ))}
                        </div>

                        {visibleLines.length === descriptionLines.length && skillsList.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-4 animate-fade-in">
                                {skillsList.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 rounded-full glass text-sm font-medium text-brand-secondary border border-brand-secondary/20 hover:border-brand-secondary/50 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                        {visibleLines.length === descriptionLines.length && (
                            <div className="flex gap-10 mt-2 animate-fade-in">
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold text-gradient tracking-tight">{aboutData.experienceYears || "0"}</span>
                                    <span className="text-slate-300 text-xs font-bold uppercase tracking-widest mt-1">Years Experience</span>
                                </div>
                                <div className="h-12 w-px bg-white/10 hidden sm:block"></div>
                                <div className="flex flex-col">
                                    <span className="text-4xl font-bold text-gradient tracking-tight">{aboutData.projectsCount || "0"}</span>
                                    <span className="text-slate-300 text-xs font-bold uppercase tracking-widest mt-1">Projects Completed</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Content - Profile Image */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                        <div className="relative group">
                            {/* Decorative Elements */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500"></div>

                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-tr from-brand-primary via-slate-800 to-brand-secondary shadow-2xl">
                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-bg-dark bg-slate-800">
                                    {profileImage && (
                                        <img
                                            src={profileImage}
                                            alt="profile"
                                            className={`w-full h-full object-cover transition-all duration-1000 ${profileLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Stats or Floating Badges could go here */}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
});

About.displayName = "About";
export default About;

