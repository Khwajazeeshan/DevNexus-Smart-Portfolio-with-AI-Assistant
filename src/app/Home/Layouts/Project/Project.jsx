"use client";
import React, { useState, useEffect, forwardRef } from "react";
import { FaGithub, FaExternalLinkAlt, FaFolder, FaTerminal } from "react-icons/fa";

const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
};

const Project = forwardRef(({ onComplete }, ref) => {
    const [showAll, setShowAll] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/project/get-projects");
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data.projects || []);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

    const displayedProjects = showAll ? projects : projects.slice(0, 6);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <section ref={ref} className="py-1 px-6 max-w-7xl mx-auto w-full">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
                <div className="w-20 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
                <p className="mt-6 text-slate-400 max-w-2xl mx-auto">A selection of my recent works, ranging from web applications to AI-powered solutions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


                {/* Dynamically Loaded Projects */}
                {displayedProjects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.name}
                        link={ensureHttps(project.link)}
                        description={project.description}
                        technologies={project.technologies}
                    />
                ))}

              
            </div>

            {projects.length > 6 && (
                <div className="flex justify-center mt-12">
                    <button
                        className="px-10 py-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-semibold hover:border-brand-primary hover:text-white transition-all duration-300"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "View Less" : "Load All Projects"}
                    </button>
                </div>
            )}
        </section>
    );
});

const ProjectCard = ({ title, subtitle, link, description, technologies, isHighlighted = false, isGithubLink = false }) => (
    <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex flex-col h-full overflow-hidden rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 shadow-xl ${isHighlighted
                ? "bg-gradient-to-br from-brand-primary/10 via-slate-950 to-bg-dark border-brand-primary/20"
                : "bg-slate-900/40 border-white/5 hover:border-brand-primary/40 backdrop-blur-xl"
            }`}
    >
        <div className="p-8 md:p-10 flex flex-col h-full relative z-10">
            <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-2xl ${isHighlighted ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/30" : "bg-slate-800 text-brand-primary"}`}>
                    {isGithubLink ? <FaGithub size={24} /> : <FaFolder size={24} />}
                </div>
                <div className="relative text-slate-600 group-hover:text-brand-primary transition-colors p-2 rounded-full overflow-hidden">
                    {/* Pulsing Aura Effect */}
                    <div className="absolute inset-0 bg-current opacity-20 animate-pulse rounded-full"></div>
                    <div className="relative z-10">
                        <FaExternalLinkAlt size={18} />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className={`text-2xl font-black mb-3 tracking-tight group-hover:text-brand-primary transition-colors ${isHighlighted ? "text-white" : "text-slate-200"}`}>
                    {title}
                </h3>

                {description ? (
                    <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-3">
                        {description}
                    </p>
                ) : subtitle ? (
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        {subtitle}
                    </p>
                ) : null}
            </div>

            {/* Technologies Row with Icons */}
            {technologies && technologies.length > 0 && (
                <div className="mt-auto pt-6 flex flex-wrap gap-2.5 border-t border-white/5">
                    {technologies.map((tech, i) => (
                        <span key={i} className="px-3.5 py-1.5 bg-white/5 rounded-full text-[10px] font-bold text-slate-300 hover:text-brand-primary hover:bg-white/10 transition-all border border-white/5 flex items-center gap-1.5 shadow-sm">
                            <FaTerminal size={8} className="text-brand-primary/70" /> {tech}
                        </span>
                    ))}
                </div>
            )}
        </div>

        {/* Dynamic Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/0 via-brand-primary/0 to-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
    </a>
)

Project.displayName = "Project";
export default Project;
