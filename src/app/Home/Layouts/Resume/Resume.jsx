"use client";
import React, { useState, useEffect, forwardRef } from "react";
import { FaGraduationCap, FaBriefcase, FaCode } from "react-icons/fa";

const Resume = forwardRef(({ onComplete }, ref) => {
    const [showMore, setShowMore] = useState(false);
    const [educationList, setEducationList] = useState([]);
    const [experienceList, setExperienceList] = useState([]);
    const [skillsList, setSkillsList] = useState([]);

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

    const visibleSkills = showMore ? skillsList : skillsList.slice(0, 6);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <section ref={ref} className="py-15 px-4 max-w-6xl mx-auto w-full">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Professional <span className="text-gradient">Resume</span></h2>
                <div className="w-20 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Education */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary">
                            <FaGraduationCap size={28} />
                        </div>
                        <h3 className="text-2xl font-bold">Education</h3>
                    </div>
                    
                    <div className="relative border-l-2 border-slate-800 ml-6 pl-8 space-y-10">
                        {educationList.length > 0 ? (
                            educationList.map((item, index) => (
                                <div key={index} className="relative group">
                                    <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-bg-dark bg-brand-primary group-hover:scale-125 transition-transform duration-300"></div>
                                    <div className="glass p-6 rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-all duration-300">
                                        <p className="text-slate-300 font-medium leading-relaxed">{item.education}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-500 italic">No education details available yet.</p>
                        )}
                    </div>
                </div>

                {/* Experience */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-xl bg-brand-secondary/10 text-brand-secondary">
                            <FaBriefcase size={28} />
                        </div>
                        <h3 className="text-2xl font-bold">Experience</h3>
                    </div>

                    <div className="relative border-l-2 border-slate-800 ml-6 pl-8 space-y-10">
                        {experienceList.length > 0 ? (
                            experienceList.map((item, index) => (
                                <div key={index} className="relative group">
                                    <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-bg-dark bg-brand-secondary group-hover:scale-125 transition-transform duration-300"></div>
                                    <div className="glass p-6 rounded-2xl border border-white/5 hover:border-brand-secondary/30 transition-all duration-300">
                                        <p className="text-slate-300 font-medium leading-relaxed">{item.experience}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-500 italic">No experience details available yet.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Skills */}
            <div className="mt-20">
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400">
                        <FaCode size={28} />
                    </div>
                    <h3 className="text-2xl font-bold">Technical Skills</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visibleSkills.length > 0 ? (
                        visibleSkills.map((skill, index) => (
                            <div key={index} className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-semibold text-slate-200 group-hover:text-brand-primary transition-colors">{skill.name}</span>
                                    <span className="text-sm font-medium text-slate-400">{skill.percentage}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                                        style={{ width: `${skill.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-500 italic">No skills added yet.</p>
                    )}
                </div>

                {skillsList.length > 6 && (
                    <div className="flex justify-center mt-12">
                        <button 
                            className="px-8 py-3 rounded-full border border-slate-700 hover:border-brand-primary text-slate-300 hover:text-white transition-all font-medium" 
                            onClick={() => setShowMore(!showMore)}
                        >
                            {showMore ? "Show Less" : "Show All Skills"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
});

Resume.displayName = "Resume";
export default Resume;

