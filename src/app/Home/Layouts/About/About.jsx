"use client";
import React, { useEffect, useState, forwardRef } from "react";
import axios from "axios";

const About = forwardRef(({ onComplete, onReady }, ref) => {
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
                if (onReady) onReady();
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
        <section ref={ref} className="relative min-h-screen flex items-center justify-center py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Animated Gradient Background Orbs */}
            <div className="absolute top-[10%] -left-32 w-[30rem] h-[30rem] bg-accent/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[128px] opacity-70 animate-float" style={{ animationDuration: '8s' }}></div>
            <div className="absolute bottom-[10%] -right-32 w-[30rem] h-[30rem] bg-accent-2/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[128px] opacity-70 animate-float" style={{ animationDelay: '2s', animationDuration: '9s' }}></div>

            <div className="max-w-7xl mx-auto w-full relative z-10">
                {loading ? null : !aboutData ? (
                    <div className="flex justify-center items-center h-64 bg-bg-card rounded-3xl shadow-custom border border-border-color">
                        <p className="text-text-secondary text-lg">No profile data found. Please set it up in the dashboard.</p>
                    </div>
                ) : (
                    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-24">
                        {/* Left Content */}
                        <div className="flex-1 space-y-6 sm:space-y-8 flex flex-col justify-center text-center lg:text-left">
                            <div className="space-y-3 sm:space-y-4">
                                <div className="text-lg sm:text-2xl md:text-3xl font-medium text-text-secondary w-full">
                                    {showIntro && introWords.map((word, i) => (
                                        <span key={i} className="inline-block animate-fadeInUp" style={{ animationDelay: `${i * 0.15}s` }}>
                                            {word}&nbsp;
                                        </span>
                                    ))}
                                </div>

                                <div className="text-4xl sm:text-7xl lg:text-6xl font-heading font-extrabold tracking-tight w-full flex flex-wrap justify-center lg:justify-start leading-tight">
                                    {showName && nameLetters.map((letter, i) => (
                                        <span key={i}
                                            className="inline-block transition-all duration-500 transform hover:scale-110 pb-1 sm:pb-2"
                                            style={{
                                                transitionDelay: `${i * 50}ms`,
                                                opacity: showName ? 1 : 0,
                                                transform: showName ? 'translateY(0)' : 'translateY(24px)'
                                            }}
                                        >
                                            <span className={letter.trim() === '' ? '' : 'bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-2'}>
                                                {letter === ' ' ? '\u00A0' : letter}
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 max-w-2xl text-base sm:text-xl text-text-secondary leading-relaxed mx-auto lg:mx-0">
                                {descriptionLines.map((line, i) => (
                                    <p key={i} className={`transition-all duration-700 transform ${visibleLines.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                        {line}
                                    </p>
                                ))}
                            </div>

                            <div className="pt-4 max-w-2xl mx-auto lg:mx-0 w-full">
                                {skillsList.length > 0 && (
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-8 sm:mb-10">
                                        {skillsList.map((skill, index) => (
                                            <span
                                                key={index}
                                                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium bg-bg-card border border-border-color shadow-sm hover:shadow-custom hover:-translate-y-1 hover:border-accent/40 transition-all duration-300 animate-float`}
                                                style={{ animationDelay: `${index * 0.2}s`, opacity: visibleLines.length === descriptionLines.length ? 1 : 0, transitionDuration: '1s' }}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className={`flex items-center justify-center lg:justify-start gap-6 sm:gap-8 lg:gap-16 transition-all duration-1000 ${visibleLines.length === descriptionLines.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-primary">
                                            {aboutData.experienceYears || "0"}
                                            <span className="text-accent">+</span>
                                        </div>
                                        <span className="text-[10px] sm:text-sm md:text-base text-text-secondary uppercase tracking-wider font-medium max-w-[60px] sm:max-w-[80px]">Years of Craft</span>
                                    </div>
                                    <div className="w-[1px] h-10 sm:h-12 bg-border-color"></div>
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-primary">
                                            {aboutData.projectsCount || "0"}
                                            <span className="text-accent-2">+</span>
                                        </div>
                                        <span className="text-[10px] sm:text-sm md:text-base text-text-secondary uppercase tracking-wider font-medium max-w-[60px] sm:max-w-[80px]">Work Delivered</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Profile Image */}
                        <div className="flex-1 w-full flex justify-center items-center lg:justify-end relative group">
                            <div className="relative w-full max-w-sm aspect-[5/5]">
                                {/* Decorative Background Glows */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent to-accent-2 rounded-[2rem] md:rounded-[3rem] rotate-6 opacity-20 blur-xl group-hover:rotate-12 group-hover:scale-105 transition-all duration-700 ease-out"></div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent to-accent-2 rounded-[2rem] md:rounded-[3rem] -rotate-3 opacity-20 blur-xl group-hover:-rotate-6 group-hover:scale-105 transition-all duration-700 ease-out delay-75"></div>

                                <div className="relative h-full w-full rounded-[2rem] md:rounded-[3rem] border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden bg-bg-card flex items-center justify-center transform group-hover:-translate-y-2 group-hover:scale-[1.02] transition-all duration-500">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="profile"
                                            className="h-auto w-full object-cover object-top"
                                        />
                                    ) : (
                                        <div className="font-heading font-medium text-text-secondary">
                                            <span>Image Needed</span>
                                        </div>
                                    )}
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
});

About.displayName = "About";
export default About;
