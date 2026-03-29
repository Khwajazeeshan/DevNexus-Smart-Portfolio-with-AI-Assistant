"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaPlus, FaTrash, FaLink, FaExternalLinkAlt, FaTerminal } from "react-icons/fa";
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
        <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8">
            <Toaster position="top-right" />
            
            <div className="max-w-4xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <Link href="/admindashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group">
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Dashboard</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Project Management</h1>
                        <p className="text-slate-400 text-sm mt-1">Curate and showcase your best professional work.</p>
                    </div>
                </header>

                <div className="bg-slate-900/50 border border-white/5 p-6 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden backdrop-blur-xl">
                    <div className="space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Project Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-800/80 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium placeholder:text-slate-600"
                                    placeholder="e.g. Health Monitoring AI"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Project Link</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500"><FaLink size={14} /></span>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-800/80 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium placeholder:text-slate-600"
                                        placeholder="GitHub URL or Live Demo"
                                        value={projectLink}
                                        onChange={(e) => setProjectLink(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Technologies (comma separated)</label>
                            <input
                                type="text"
                                className="w-full bg-slate-800/80 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium placeholder:text-slate-600"
                                placeholder="React, Node.js, Tailwind, MongoDB"
                                value={projectTech}
                                onChange={(e) => setProjectTech(e.target.value)}
                            />
                            <p className="text-[10px] text-slate-600 italic">Enter up to 4 technologies separated by commas.</p>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Project Description (~15-18 Words)</label>
                            <textarea
                                className="w-full bg-slate-800/80 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium placeholder:text-slate-600 min-h-[150px] resize-y"
                                placeholder="Briefly describe the core problem solved, user impact, or key technologies used in this project."
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                            />
                            <div className="flex justify-between items-center px-2">
                                <p className="text-[10px] text-slate-600 italic">Total Words: {projectDescription.trim() ? projectDescription.trim().split(/\s+/).length : 0} / 20 max</p>
                            </div>
                        </div>

                        <button 
                            onClick={handleProjectSubmit}
                            disabled={loading || !projectName.trim() || !projectLink.trim() || !projectDescription.trim() || !projectTech.trim() || (projectDescription.trim().split(/\s+/).length > 20)}
                            className="w-full py-5 bg-gradient-to-r from-brand-primary to-violet-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Adding Project...</span>
                                </div>
                            ) : (
                                <>
                                    <FaPlus className="group-hover:rotate-90 transition-transform" /> Add to Portfolio Showcase
                                </>
                            )}
                        </button>
                    </div>

                    <div className="pt-12 border-t border-white/5 mt-10">
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                             Published Works 
                             <span className="text-[10px] bg-brand-primary/20 text-brand-primary px-3 py-1 rounded-full border border-brand-primary/10 tracking-widest uppercase">
                                 {projectsList.length} Total
                             </span>
                        </h3>
                        
                        <div className="space-y-6">
                            {projectsList.length > 0 ? (
                                projectsList.map((item) => (
                                    <div 
                                        key={item._id} 
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, projectsList.indexOf(item))}
                                        onDragEnter={(e) => handleDragEnter(e, projectsList.indexOf(item))}
                                        onDragEnd={handleDragEnd}
                                        onDragOver={(e) => e.preventDefault()}
                                        className={`p-6 md:p-8 bg-slate-800/40 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row gap-6 relative group overflow-hidden shadow-lg hover:shadow-2xl cursor-move ${draggingIndex === projectsList.indexOf(item) ? "opacity-50 ring-2 ring-brand-primary" : ""}`}
                                    >
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <h4 className="text-lg font-black text-white">{item.name}</h4>
                                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-brand-secondary text-xs flex items-center gap-1 hover:underline opacity-80 mt-1 truncate max-w-[200px] md:max-w-none">
                                                    {item.link} <FaExternalLinkAlt size={10} />
                                                </a>
                                            </div>
                                            
                                            <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-wrap">{item.description}</p>
                                            
                                            <div className="flex flex-wrap gap-2">
                                                {item.technologies?.map((tech, i) => (
                                                    <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-slate-400 border border-white/5 flex items-center gap-1.5 hover:text-brand-primary hover:bg-white/10 transition-colors">
                                                        <FaTerminal size={8} className="text-brand-primary" /> {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-start md:items-center">
                                            <button 
                                                onClick={() => handleDeleteProject(item._id)} 
                                                className="p-4 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all rounded-2xl border border-red-500/20 group-hover:scale-105"
                                                title="Delete Project"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
                                    <p className="text-slate-600 font-medium italic">Your showcase is empty. Start adding projects above!</p>
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
