"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaPlus, FaTrash, FaLink, FaExternalLinkAlt, FaTerminal, FaProjectDiagram } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
};

const ProjectCard = () => {
    const [projectName, setProjectName] = useState("");
    const [projectLink, setProjectLink] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectTech, setProjectTech] = useState("");
    const [projectsList, setProjectsList] = useState([]);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchProjects = async () => {
        try {
            const response = await fetch(`/api/project/get-projects`);
            if (response.ok) {
                const data = await response.json();
                setProjectsList(data.projects || []);
            }
        } catch (error) {
            toast.error("Failed to fetch projects");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleProjectSubmit = async (e) => {
        e.preventDefault();

        // Basic word count validation for description (approx 15-18 words)
        const wordCount = projectDescription.trim().split(/\s+/).length;
        if (wordCount > 20) {
            return toast.error("Description should be around 15-18 words (max 20).");
        }

        if (!projectName.trim() || !projectLink.trim() || !projectDescription.trim() || !projectTech.trim()) {
            return toast.error("Please fill all fields (Name, Link, Description, and Technologies)");
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/project/add-project`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: projectName,
                    link: ensureHttps(projectLink),
                    description: projectDescription,
                    technologies: projectTech
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setProjectsList(data.projects || []);
                setProjectName("");
                setProjectLink("");
                setProjectDescription("");
                setProjectTech("");
                toast.success(data.message || "Added successfully!");
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error("Error adding project");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProject = async (id) => {
        if (!confirm("Are you sure?")) return;
        try {
            const response = await fetch(`/api/project/delete-project/${id}`, { method: "DELETE" });
            const data = await response.json();
            if (response.ok) {
                setProjectsList(data.projects || []);
                toast.success("Deleted successfully");
            }
        } catch { toast.error("Error deleting project"); }
    };
    const handleDragStart = (e, index) => {
        setDraggingIndex(index);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragEnter = (e, index) => {
        if (draggingIndex === index) return;
        const newProjectsList = [...projectsList];
        const draggedItem = newProjectsList[draggingIndex];
        newProjectsList.splice(draggingIndex, 1);
        newProjectsList.splice(index, 0, draggedItem);
        setDraggingIndex(index);
        setProjectsList(newProjectsList);
    };

    const handleDragEnd = async () => {
        setDraggingIndex(null);
        try {
            const response = await fetch(`/api/project/reorder-projects`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    projectsIds: projectsList.map(p => p._id)
                }),
            });
            if (response.ok) {
                toast.success("Position saved successfully");
            }
        } catch {
            toast.error("Failed to save new order");
        }
    };

    return (
        <div className="min-h-screen bg-bg-primary font-body pb-12">
            <Toaster position="top-right" toastOptions={{ className: 'font-body rounded-xl font-medium shadow-custom border border-border-color bg-bg-card text-text-primary' }} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
                <header className="mb-10 animate-fadeInUp">
                    <div className="flex flex-col gap-4">
                        <Link href="/admindashboard" className="flex items-center gap-2 text-text-secondary hover:text-accent font-medium transition-all group w-fit">
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Dashboard</span>
                        </Link>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-text-primary">
                                Project Showcase<span className="text-accent">.</span>
                            </h1>
                            <p className="mt-2 text-text-secondary text-sm md:text-base font-medium max-w-2xl">Manage your professional portfolio and showcase your best engineering works to the world.</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Project Entry Form */}
                    <div className="lg:col-span-5 bg-bg-card rounded-[2rem] p-6 md:p-8 border border-border-color shadow-sm hover:shadow-custom transition-all duration-300 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        <h3 className="text-lg font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
                            <div className="p-2 bg-accent/10 rounded-lg text-accent">
                                <FaPlus size={14} />
                            </div>
                            New Project Segment
                        </h3>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary px-1">Identity</label>
                                <input
                                    type="text"
                                    className="w-full px-5 py-3.5 rounded-xl bg-bg-primary border border-border-color focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30"
                                    placeholder="Project Name (e.g. AI Med)"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary px-1">Access Point</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-accent transition-colors">
                                        <FaLink size={14} />
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-bg-primary border border-border-color focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30"
                                        placeholder="GitHub or Live URL"
                                        value={projectLink}
                                        onChange={(e) => setProjectLink(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary px-1">Stack (Max 4)</label>
                                <input
                                    type="text"
                                    className="w-full px-5 py-3.5 rounded-xl bg-bg-primary border border-border-color focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30 text-sm"
                                    placeholder="React, Node.js, Tailwind..."
                                    value={projectTech}
                                    onChange={(e) => setProjectTech(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-secondary px-1">Narrative (~15 Words)</label>
                                <textarea
                                    className="w-full px-5 py-3.5 rounded-xl bg-bg-primary border border-border-color focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30 resize-none text-sm h-32"
                                    placeholder="Briefly describe the core value and technology stack used..."
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                />
                                <div className="flex items-center justify-between px-1">
                                    <p className={`text-[10px] font-bold uppercase tracking-tighter ${projectDescription.trim().split(/\s+/).length > 20 ? 'text-red-500' : 'text-text-secondary/50'}`}>
                                        Words: {projectDescription.trim() ? projectDescription.trim().split(/\s+/).length : 0} / 20
                                    </p>
                                    <p className="text-[10px] text-text-secondary/30 font-bold uppercase tracking-tighter">Optimal Range: 15-18</p>
                                </div>
                            </div>

                            <button
                                onClick={handleProjectSubmit}
                                disabled={loading || !projectName.trim() || !projectLink.trim() || !projectDescription.trim() || !projectTech.trim() || (projectDescription.trim().split(/\s+/).length > 20)}
                                className="w-full py-4 rounded-xl bg-accent text-white font-bold tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0 transition-all flex items-center justify-center gap-2 group"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Adding...</span>
                                    </div>
                                ) : (
                                    <>
                                        <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
                                        <span>Publish Project</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Project List */}
                    <div className="lg:col-span-7 space-y-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-2 px-2">
                            <h3 className="text-lg font-heading font-black text-text-primary">
                                Deployment Queue
                            </h3>
                            <span className="px-3 py-1 bg-bg-card border border-border-color rounded-full text-[10px] font-bold text-text-secondary uppercase tracking-widest shadow-sm">
                                {projectsList.length} Units Active
                            </span>
                        </div>

                        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                            {projectsList.length > 0 ? (
                                projectsList.map((item, index) => (
                                    <div
                                        key={item._id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragEnter={(e) => handleDragEnter(e, index)}
                                        onDragEnd={handleDragEnd}
                                        onDragOver={(e) => e.preventDefault()}
                                        className={`group bg-bg-card p-6 rounded-[1.5rem] border ${draggingIndex === index ? 'border-accent ring-4 ring-accent/5 opacity-50 scale-95' : 'border-border-color'} hover:border-accent/40 hover:shadow-custom transition-all duration-300 flex items-center gap-4 cursor-grab active:cursor-grabbing relative overflow-hidden`}
                                    >
                                        <div className="hidden sm:flex flex-col items-center gap-1 text-text-secondary/30 group-hover:text-accent/40 transition-colors">
                                            <div className="w-1 h-1 rounded-full bg-current"></div>
                                            <div className="w-1 h-1 rounded-full bg-current"></div>
                                            <div className="w-1 h-1 rounded-full bg-current"></div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                                                <h4 className="text-base font-heading font-black text-text-primary truncate uppercase tracking-tight group-hover:text-accent transition-colors">{item.name}</h4>
                                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-accent-2 font-bold hover:underline flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity truncate">
                                                    SOURCE CODE <FaExternalLinkAlt size={8} />
                                                </a>
                                            </div>

                                            <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-2 font-medium">{item.description}</p>

                                            <div className="flex flex-wrap gap-2">
                                                {item.technologies?.map((tech, i) => (
                                                    <span key={i} className="px-2 py-0.5 rounded-md bg-bg-primary border border-border-color text-[9px] font-bold text-text-secondary flex items-center gap-1.5 group-hover:bg-accent/5 group-hover:border-accent/20 group-hover:text-accent transition-colors">
                                                        <FaTerminal size={8} className="opacity-50" /> {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => handleDeleteProject(item._id)}
                                                className="p-3 rounded-xl bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
                                                title="Decommission Unit"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                        
                                        {/* Drag Indicator Overlay for Dragging Mode */}
                                        {draggingIndex === index && (
                                            <div className="absolute inset-0 bg-accent/5 pointer-events-none border-2 border-dashed border-accent rounded-[1.5rem]"></div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="bg-bg-card border-2 border-dashed border-border-color rounded-[2rem] p-12 text-center">
                                    <div className="w-16 h-16 bg-bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-text-secondary/30">
                                        <FaProjectDiagram size={32} />
                                    </div>
                                    <p className="text-text-secondary text-sm font-medium">Your showcase is currently offline.<br/>Initialize new project units to start.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
