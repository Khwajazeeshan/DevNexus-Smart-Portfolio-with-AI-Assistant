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
    <div >
            <Toaster position="top-right" />

            <div >
                <header >
                    <div>
                        <Link href="/admindashboard" >
                            <FaArrowLeft  />
                            <span>Back to Dashboard</span>
                        </Link>
                        <h1 >Project Management</h1>
                        <p >Curate and showcase your best professional work.</p>
                    </div>
                </header>

                <div >
                    <div >
                        <div >
                            <div >
                                <label >Project Name</label>
                                <input
                                    type="text"
                                    
                                    placeholder="e.g. Health Monitoring AI"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                            </div>

                            <div >
                                <label >Project Link</label>
                                <div >
                                    <span ><FaLink size={14} /></span>
                                    <input
                                        type="text"
                                        
                                        placeholder="GitHub URL or Live Demo"
                                        value={projectLink}
                                        onChange={(e) => setProjectLink(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div >
                            <label >Technologies (comma separated)</label>
                            <input
                                type="text"
                                
                                placeholder="React, Node.js, Tailwind, MongoDB"
                                value={projectTech}
                                onChange={(e) => setProjectTech(e.target.value)}
                            />
                            <p >Enter up to 4 technologies separated by commas.</p>
                        </div>

                        <div >
                            <label >Project Description (~15-18 Words)</label>
                            <textarea
                                
                                placeholder="Briefly describe the core problem solved, user impact, or key technologies used in this project."
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                            />
                            <div >
                                <p >Word Count: {projectDescription.trim() ? projectDescription.trim().split(/\s+/).length : 0} / 20</p>
                                <p >Around 15-18 words optimal</p>
                            </div>
                        </div>

                        <button
                            onClick={handleProjectSubmit}
                            disabled={loading || !projectName.trim() || !projectLink.trim() || !projectDescription.trim() || !projectTech.trim() || (projectDescription.trim().split(/\s+/).length > 20)}
                            
                        >
                            {loading ? (
                                <div >
                                    <div ></div>
                                    <span>Adding Project...</span>
                                </div>
                            ) : (
                                <>
                                    <FaPlus  /> Add to Portfolio Showcase
                                </>
                            )}
                        </button>
                    </div>

                    <div >
                        <h3 >
                            Published Works
                            <span >
                                {projectsList.length} Total
                            </span>
                        </h3>

                        <div >
                            {projectsList.length > 0 ? (
                                projectsList.map((item) => (
                                    <div
                                        key={item._id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, projectsList.indexOf(item))}
                                        onDragEnter={(e) => handleDragEnter(e, projectsList.indexOf(item))}
                                        onDragEnd={handleDragEnd}
                                        onDragOver={(e) => e.preventDefault()}
                                        
                                    >
                                        <div >
                                            <div>
                                                <h4 >{item.name}</h4>
                                                <a href={item.link} target="_blank" rel="noopener noreferrer" >
                                                    {item.link} <FaExternalLinkAlt size={10} />
                                                </a>
                                            </div>

                                            <p >{item.description}</p>

                                            <div >
                                                {item.technologies?.map((tech, i) => (
                                                    <span key={i} >
                                                        <FaTerminal size={8}  /> {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div >
                                            <button
                                                onClick={() => handleDeleteProject(item._id)}
                                                
                                                title="Delete Project"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div >
                                    <p >Your showcase is empty. Start adding projects above!</p>
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
