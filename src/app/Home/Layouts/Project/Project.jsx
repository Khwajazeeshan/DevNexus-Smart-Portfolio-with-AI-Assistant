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
        <section ref={ref} className="relative py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 w-full overflow-hidden">
            <div className="absolute left-[-10%] top-1/2 w-96 h-96 bg-accent-2/5 rounded-full blur-[100px] -z-10 animate-float" style={{ animationDelay: '3s' }} />

            <div className="text-center mb-16 animate-fadeInUp">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-text-primary tracking-tight mb-4 sm:mb-6">
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-2">Innovations</span>
                </h2>
                <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto font-medium px-4">
                    "Crafting digital excellence through code and creativity."
                </p>
                <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8">
                    <span className="w-8 sm:w-12 h-1 bg-gradient-to-r from-transparent to-accent rounded-full"></span>
                    <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-accent rounded-full animate-glowPulse"></span>
                    <span className="w-8 sm:w-12 h-1 bg-gradient-to-l from-transparent to-accent rounded-full"></span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
                {displayedProjects.map((project, index) => {
                    const isWider = index % 4 === 0 || index % 4 === 3;
                    return (
                        <ProjectCard
                            key={index}
                            title={project.name}
                            link={ensureHttps(project.link)}
                            description={project.description}
                            technologies={project.technologies}
                            isWider={isWider}
                        />
                    );
                })}
            </div>

            {projects.length > 6 && (
                <div className="text-center mt-12 sm:mt-16 animate-fadeInUp">
                    <button
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-gradient-to-r from-accent to-accent-2 text-white text-sm sm:text-base font-bold tracking-wide shadow-custom hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                        onClick={() => setShowAll(!showAll)}
                    >
                        <span>{showAll ? "View Less" : "Load All Projects"}</span>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-60"></div>
                    </button>
                </div>
            )}
        </section>
    );
});

const ProjectCard = ({ title, subtitle, link, description, technologies, isHighlighted = false, isGithubLink = false, isWider }) => (
    <div className={`group relative rounded-[2rem] overflow-hidden bg-bg-card border border-border-color shadow-sm hover:shadow-custom hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col ${isWider ? 'lg:col-span-2' : 'lg:col-span-1'}`}>

        {/* Aesthetic Thumbnail / Placeholder Wrapper */}


        {/* Card Body */}
        <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col relative z-10 bg-bg-card">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-bg-primary/50 border border-border-color rounded-xl text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                    {isGithubLink ? <FaGithub size={20} /> : <FaFolder size={20} />}
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer" className="p-2 text-text-secondary hover:text-accent transition-colors duration-300 z-10">
                    <FaExternalLinkAlt size={16} className="transform group-hover:scale-110 transition-transform animate-liveBlink" />
                </a>
            </div>

            <h3 className="text-xl sm:text-2xl font-heading font-bold text-text-primary mb-2 sm:mb-3 transition-colors duration-300 truncate">
                {title}
            </h3>

            <p className="text-text-secondary leading-relaxed mb-4 sm:mb-6 line-clamp-3 md:line-clamp-4 text-sm sm:text-base">
                {description || subtitle || "A sophisticated technical project pushing the boundaries of modern development."}
            </p>

            {/* Technologies */}
            {technologies && technologies.length > 0 && (
                <div className="flex flex-nowrap overflow-x-auto gap-1 sm:gap-2 mt-auto pb-2 sm:pb-0 sm:flex-wrap [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {technologies.map((tech, i) => (
                        <span
                            key={i}
                            className="px-2 py-0.5 text-[10px] sm:text-xs sm:px-3 sm:py-1 font-medium bg-bg-primary text-text-secondary rounded-lg border border-border-color shadow-sm group-hover:border-accent/30 transition-colors duration-300 animate-techBlink whitespace-nowrap"
                            style={{ animationDelay: `${i * 1.5}s` }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            )}
        </div>
    </div>
)

Project.displayName = "Project";
export default Project;
