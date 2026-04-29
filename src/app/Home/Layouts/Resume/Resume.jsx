"use client";
import React, { useState, useEffect, forwardRef, useRef } from "react";
import { FaGraduationCap, FaBriefcase, FaCode } from "react-icons/fa";

const Resume = forwardRef(({ onComplete }, outerRef) => {
    const [showMoreExperience, setShowMoreExperience] = useState(false);
    const [showMoreSkills, setShowMoreSkills] = useState(false);

    const [educationList, setEducationList] = useState([]);
    const [experienceList, setExperienceList] = useState([]);
    const [skillsList, setSkillsList] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    // We use a local ref for intersection observer if outerRef is just for parent scrolling
    const sectionRef = useRef(null);
    const setRefs = (element) => {
        sectionRef.current = element;
        if (typeof outerRef === 'function') outerRef(element);
        else if (outerRef) outerRef.current = element;
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) setIsVisible(true);
            },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchResumeData = async () => {
            try {
                const response = await fetch("/api/resume/get-resume");
                if (response.ok) {
                    const data = await response.json();
                    setEducationList(data.education || []);
                    setExperienceList(data.experience || []);
                    setSkillsList(data.skills || []);
                }
            } catch (error) {
                console.error("Error fetching resume data:", error);
            }
        };
        fetchResumeData();
    }, []);

    const visibleExperience = showMoreExperience ? experienceList : experienceList.slice(0, 4);
    const visibleSkills = showMoreSkills ? skillsList : skillsList.slice(0, 8);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <section ref={setRefs} className="relative py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 w-full overflow-hidden">
            <div className="absolute right-0 top-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -z-10 animate-float" />

            <div className="text-center mb-20 animate-fadeInUp">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <span className="p-4 inline-block bg-gradient-to-br from-bg-card to-bg-primary border border-border-color rounded-full shadow-custom text-accent animate-float">
                        <FaBriefcase size={24} />
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-text-primary tracking-tight">
                        Experience
                    </h2>
                </div>


                <div className="flex justify-center items-center gap-2 mt-8">
                    <span className="w-12 h-1 bg-gradient-to-r from-transparent to-accent rounded-full"></span>
                    <span className="w-3 h-3 bg-accent rounded-full animate-glowPulse"></span>
                    <span className="w-12 h-1 bg-gradient-to-l from-transparent to-accent rounded-full"></span>
                </div>
            </div>

            <div className="flex flex-col gap-24 relative">

                {/* 1. Experience Section */}
                <div className="relative w-full">


                    <div className="relative">
                        {/* Centered Line (Desktop) */}
                        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border-color"></div>
                        <div className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-accent to-accent-2 transition-all ease-out duration-[2000ms] ${isVisible ? 'h-full' : 'h-0'}`}></div>

                        {/* Left Line (Mobile) */}
                        <div className="md:hidden absolute left-2 w-0.5 h-full bg-border-color"></div>
                        <div className={`md:hidden absolute left-2 w-0.5 bg-gradient-to-b from-accent to-accent-2 transition-all ease-out duration-[2000ms] ${isVisible ? 'h-full' : 'h-0'}`}></div>

                        <div className="space-y-12">
                            {visibleExperience.length > 0 ? (
                                visibleExperience.map((item, index) => (
                                    <div key={index} className={`relative flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                        {/* Content Wrapper */}
                                        <div className="w-full md:w-1/2 px-8 md:px-16 group animate-fadeInUp" style={{ animationDelay: `${(index % 4) * 0.1}s` }}>
                                            <div className="bg-bg-card p-6 rounded-3xl border border-border-color shadow-sm group-hover:shadow-custom group-hover:-translate-y-2 transition-all duration-500 ease-out group-hover:border-accent/30 relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-2 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                                                <p className="text-text-secondary leading-relaxed font-medium">{item.experience}</p>
                                            </div>
                                        </div>

                                        {/* Timeline Node */}
                                        <div className="absolute left-2 md:left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-bg-primary border-4 border-accent shadow-[0_0_15px_rgba(79,70,229,0.3)] z-10 animate-glowPulse"></div>

                                        {/* Spacer for desktop layout */}
                                        <div className="hidden md:block md:w-1/2"></div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-text-secondary italic text-center w-full">Charting professional milestones...</p>
                            )}
                        </div>
                    </div>

                    {experienceList.length > 4 && (
                        <div className="mt-10 text-center w-full pl-10 md:pl-0">
                            <button
                                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-bg-card border border-border-color text-text-primary font-medium hover:shadow-custom hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 group"
                                onClick={() => setShowMoreExperience(!showMoreExperience)}
                            >
                                <span className="group-hover:text-accent transition-colors">{showMoreExperience ? "Hide" : "Show More"}</span>
                                <div className="w-2 h-2 rounded-full bg-accent group-hover:animate-glowPulse"></div>
                            </button>
                        </div>
                    )}
                </div>

                {/* 2. Elite Skills Section */}
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="flex flex-col items-center mb-16 text-center">
                        <div className="flex items-center justify-center gap-4 mb-2">
                            <div className="p-4 bg-gradient-to-br from-bg-card to-bg-primary border border-border-color rounded-full shadow-custom text-accent animate-float">
                                <FaCode size={24} />
                            </div>
                            <h3 className="text-3xl font-heading font-bold text-text-primary font-extrabold ">Technical Skills</h3>
                        </div>
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <span className="w-12 h-1 bg-gradient-to-r from-transparent to-accent rounded-full"></span>
                            <span className="w-3 h-3 bg-accent rounded-full animate-glowPulse"></span>
                            <span className="w-12 h-1 bg-gradient-to-l from-transparent to-accent rounded-full"></span>
                        </div>
                    </div>


                    <div className="space-y-12">
                        {visibleSkills.length > 0 ? (
                            visibleSkills.map((categoryItem, categoryIndex) => (
                                <div key={categoryIndex} className="animate-fadeInUp" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
                                    {/* Category Header */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <h4 className="text-xl sm:text-2xl font-heading font-bold text-text-primary uppercase tracking-widest">{categoryItem.category}</h4>
                                        <div className="flex-1 h-px bg-border-color relative">
                                            <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent to-transparent w-1/2"></div>
                                        </div>
                                    </div>
                                    
                                    {/* Sub-skills Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                        {categoryItem.subSkills && categoryItem.subSkills.length > 0 ? (
                                            categoryItem.subSkills.map((skill, index) => (
                                                <div key={index} className="group bg-bg-card p-4 sm:p-6 rounded-3xl border border-border-color hover:border-accent/40 hover:shadow-custom hover:-translate-y-2 transition-all duration-500 ease-out relative overflow-hidden">
                                                    <div className="absolute -inset-2 bg-gradient-to-r from-accent/0 via-accent/5 to-accent-2/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 transform -translate-x-full skew-x-12"></div>
                                                    <div className="flex justify-between items-end mb-3 sm:mb-4 relative z-10">
                                                        <div className="flex flex-col min-w-0 pr-2">
                                                            <span className="text-[8px] sm:text-xs uppercase tracking-wider text-text-secondary font-medium mb-0.5 sm:mb-1 truncate">{categoryItem.category}</span>
                                                            <span className="text-sm sm:text-lg font-heading font-bold text-text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-accent-2 transition-colors duration-300 truncate">{skill.name}</span>
                                                        </div>
                                                        {/* <span className="text-accent font-bold text-sm sm:text-lg">{skill.percentage}%</span> */}
                                                    </div>
                                                    <div className="h-1.5 sm:h-2 w-full bg-border-color rounded-full overflow-hidden relative z-10">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-accent to-accent-2 rounded-full relative group-hover:shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                                                            style={{
                                                                width: isVisible ? `${skill.percentage}%` : '0%',
                                                                transition: `width 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.1}s`
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-text-secondary text-sm italic">No specific technologies listed.</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-text-secondary text-center col-span-full">Loading skill matrices...</p>
                        )}
                    </div>

                    {skillsList.length > 8 && (
                        <div className="text-center mt-12">
                            <button
                                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-bg-card border border-border-color text-text-primary font-medium hover:shadow-custom hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 group"
                                onClick={() => setShowMoreSkills(!showMoreSkills)}
                            >
                                <span className="group-hover:text-accent transition-colors">{showMoreSkills ? "Hide" : "Show More"}</span>
                                <div className="w-2 h-2 rounded-full bg-accent group-hover:animate-glowPulse"></div>
                            </button>
                        </div>
                    )}
                </div>

                {/* 3. Education Section */}
                <div className="relative w-full text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="p-4 inline-block bg-gradient-to-br from-bg-card to-bg-primary border border-border-color rounded-full shadow-custom text-accent-2 animate-float">
                            <FaGraduationCap size={24} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-heading  text-text-primary tracking-tight">
                            Education
                        </h2>
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <span className="w-12 h-1 bg-gradient-to-r from-transparent to-accent rounded-full"></span>
                        <span className="w-3 h-3 bg-accent rounded-full animate-glowPulse"></span>
                        <span className="w-12 h-1 bg-gradient-to-l from-transparent to-accent rounded-full"></span>
                    </div>

                    <div className="relative border-l-2 border-border-color pl-10 space-y-12 py-3 text-left">
                        {/* Vertical Line fill */}
                        <div className={`absolute left-[-2px] top-0 w-[2px] bg-gradient-to-b from-accent-2 to-accent transition-all ease-out duration-[2000ms] ${isVisible ? 'h-full' : 'h-0'}`}></div>

                        {educationList.length > 0 ? (
                            educationList.map((item, index) => (
                                <div key={index} className="relative group animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                    {/* Timeline Node */}
                                    <div className="absolute top-0 -left-[49px] w-5 h-5 rounded-full bg-bg-primary border-4 border-accent-2 shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover:scale-150 transition-all duration-300 z-10 animate-glowPulse" style={{ animationDelay: '1s' }}></div>

                                    <div className="bg-bg-card p-6 rounded-3xl border border-border-color shadow-sm group-hover:shadow-[0_4px_24px_rgba(34,211,238,0.15)] group-hover:-translate-y-2 transition-all duration-500 ease-out group-hover:border-accent-2/30 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-2 to-accent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                                        <p className="text-text-secondary leading-relaxed font-medium">{item.education}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-text-secondary italic">Curating academic history...</p>
                        )}
                    </div>
                </div>
            </div>


        </section>
    );
});

Resume.displayName = "Resume";
export default Resume;
