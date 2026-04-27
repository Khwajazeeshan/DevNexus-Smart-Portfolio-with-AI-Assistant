"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaPlus, FaTrash, FaGraduationCap, FaBriefcase, FaCode, FaTimes } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const ResumeCard = () => {
    const [activeSection, setActiveSection] = useState("education");
    const [educationInput, setEducationInput] = useState("");
    const [educationList, setEducationList] = useState([]);

    const [experienceInput, setExperienceInput] = useState("");
    const [experienceList, setExperienceList] = useState([]);

    const [skillNameInput, setSkillNameInput] = useState("");
    const [skillPercentInput, setSkillPercentInput] = useState("");
    const [skillsList, setSkillsList] = useState([]);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [draggingSection, setDraggingSection] = useState(null);

    const fetchResumeData = async () => {
        try {
            const response = await fetch(`/api/resume/get-resume`);
            if (response.ok) {
                const data = await response.json();
                setEducationList(data.education || []);
                setExperienceList(data.experience || []);
                setSkillsList(data.skills || []);
            }
        } catch (error) {
            toast.error("Failed to fetch resume data");
        }
    };

    useEffect(() => {
        fetchResumeData();
    }, []);

    const handleEducationSubmit = async () => {
        if (!educationInput.trim()) return toast.error("Please enter details");
        try {
            const response = await fetch(`/api/resume/add-education`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ education: educationInput }),
            });
            if (response.ok) {
                const data = await response.json();
                setEducationList(data.education || []);
                setEducationInput("");
                toast.success("Added!");
            }
        } catch { toast.error("Error adding"); }
    };

    const handleDeleteEducation = async (id) => {
        if (!confirm("Delete?")) return;
        try {
            const response = await fetch(`/api/resume/delete-education/${id}`, { method: "DELETE" });
            if (response.ok) {
                const data = await response.json();
                setEducationList(data.education || []);
                toast.success("Deleted");
            }
        } catch { toast.error("Error deleting"); }
    };

    const handleExperienceSubmit = async () => {
        if (!experienceInput.trim()) return toast.error("Please enter details");
        try {
            const response = await fetch(`/api/resume/add-experience`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ experience: experienceInput }),
            });
            if (response.ok) {
                const data = await response.json();
                setExperienceList(data.experience || []);
                setExperienceInput("");
                toast.success("Added!");
            }
        } catch { toast.error("Error adding"); }
    };

    const handleDeleteExperience = async (id) => {
        if (!confirm("Delete?")) return;
        try {
            const response = await fetch(`/api/resume/delete-experience/${id}`, { method: "DELETE" });
            if (response.ok) {
                const data = await response.json();
                setExperienceList(data.experience || []);
                toast.success("Deleted");
            }
        } catch { toast.error("Error deleting"); }
    };

    const handleSkillSubmit = async () => {
        if (!skillNameInput.trim() || !skillPercentInput.trim()) return toast.error("Enter name and %");
        try {
            const response = await fetch(`/api/resume/add-skill`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: skillNameInput, percentage: skillPercentInput }),
            });
            if (response.ok) {
                const data = await response.json();
                setSkillsList(data.skills || []);
                setSkillNameInput("");
                setSkillPercentInput("");
                toast.success("Added!");
            }
        } catch { toast.error("Error adding"); }
    };

    const handleDeleteSkill = async (id) => {
        if (!confirm("Delete?")) return;
        try {
            const response = await fetch(`/api/resume/delete-skill/${id}`, { method: "DELETE" });
            if (response.ok) {
                const data = await response.json();
                setSkillsList(data.skills || []);
                toast.success("Deleted");
            }
        } catch { toast.error("Error deleting"); }
    };

    const handleDragStart = (e, index, section) => {
        setDraggingIndex(index);
        setDraggingSection(section);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragEnter = (e, index, section) => {
        if (draggingIndex === index || draggingSection !== section) return;
        
        let newList = [];
        if (section === "education") {
            newList = [...educationList];
            const draggedItem = newList[draggingIndex];
            newList.splice(draggingIndex, 1);
            newList.splice(index, 0, draggedItem);
            setEducationList(newList);
        } else if (section === "experience") {
            newList = [...experienceList];
            const draggedItem = newList[draggingIndex];
            newList.splice(draggingIndex, 1);
            newList.splice(index, 0, draggedItem);
            setExperienceList(newList);
        } else if (section === "skills") {
            newList = [...skillsList];
            const draggedItem = newList[draggingIndex];
            newList.splice(draggingIndex, 1);
            newList.splice(index, 0, draggedItem);
            setSkillsList(newList);
        }
        setDraggingIndex(index);
    };

    const handleDragEnd = async () => {
        const currentSection = draggingSection;
        let ids = [];
        
        if (currentSection === "education") ids = educationList.map(item => item._id);
        else if (currentSection === "experience") ids = experienceList.map(item => item._id);
        else if (currentSection === "skills") ids = skillsList.map(item => item._id);

        setDraggingIndex(null);
        setDraggingSection(null);

        try {
            const response = await fetch(`/api/resume/reorder-resume`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: currentSection, ids }),
            });
            if (response.ok) {
                toast.success("Order saved");
            }
        } catch {
            toast.error("Error saving order");
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
                                Career Stack<span className="text-accent">.</span>
                            </h1>
                            <p className="mt-2 text-text-secondary text-sm md:text-base font-medium max-w-2xl">Construct and refine your professional timeline, educational background, and technical arsenal.</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-3 bg-bg-card rounded-[2rem] p-4 md:p-6 border border-border-color shadow-sm animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 custom-scrollbar">
                            <TabButton 
                                active={activeSection === "education"} 
                                onClick={() => setActiveSection("education")}
                                icon={<FaGraduationCap size={16} />}
                                label="Education"
                            />
                            <TabButton 
                                active={activeSection === "experience"} 
                                onClick={() => setActiveSection("experience")}
                                icon={<FaBriefcase size={16} />}
                                label="Experience"
                            />
                            <TabButton 
                                active={activeSection === "skills"} 
                                onClick={() => setActiveSection("skills")}
                                icon={<FaCode size={16} />}
                                label="Technical"
                            />
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-9 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        {activeSection === "education" && (
                            <section className="space-y-6">
                                <div className="bg-bg-card p-6 md:p-8 rounded-[2rem] border border-border-color shadow-sm space-y-6">
                                    <h2 className="text-xl font-heading font-black text-text-primary flex items-center gap-3">
                                        <div className="p-2.5 bg-accent/10 rounded-xl text-accent">
                                            <FaGraduationCap size={20} />
                                        </div>
                                        Academic History
                                    </h2>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input 
                                            type="text" 
                                            placeholder="Entry details (e.g. BS in CS - Stanford University, 2021)"
                                            className="flex-1 px-5 py-3.5 rounded-xl bg-bg-primary border border-border-color focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30"
                                            value={educationInput}
                                            onChange={(e) => setEducationInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleEducationSubmit()}
                                        />
                                        <button 
                                            onClick={handleEducationSubmit} 
                                            className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            <FaPlus /> <span className="hidden sm:inline">Add Item</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {educationList.length > 0 ? educationList.map((item, index) => (
                                        <div 
                                            key={item._id} 
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index, "education")}
                                            onDragEnter={(e) => handleDragEnter(e, index, "education")}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={(e) => e.preventDefault()}
                                            className={`group bg-bg-card p-5 rounded-2xl border ${draggingIndex === index && draggingSection === "education" ? 'border-accent opacity-50' : 'border-border-color'} hover:border-accent/40 hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4 cursor-grab active:cursor-grabbing`}
                                        >
                                            <div className="flex items-center gap-4 min-w-0">
                                                <div className="w-8 h-8 rounded-lg bg-bg-primary flex items-center justify-center text-text-secondary/30 group-hover:text-accent transition-colors">
                                                    <FaGraduationCap size={14} />
                                                </div>
                                                <span className="text-sm font-bold text-text-primary truncate">{item.education}</span>
                                            </div>
                                            <button 
                                                onClick={() => handleDeleteEducation(item._id)} 
                                                className="p-2.5 rounded-lg bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    )) : (
                                        <div className="p-12 bg-bg-card/50 border-2 border-dashed border-border-color rounded-[2rem] text-center">
                                            <p className="text-text-secondary text-sm font-medium italic">No education modules found.</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {activeSection === "experience" && (
                            <section className="space-y-6">
                                <div className="bg-bg-card p-6 md:p-8 rounded-[2rem] border border-border-color shadow-sm space-y-6">
                                    <h2 className="text-xl font-heading font-black text-text-primary flex items-center gap-3">
                                        <div className="p-2.5 bg-accent/10 rounded-xl text-accent">
                                            <FaBriefcase size={20} />
                                        </div>
                                        Professional Timeline
                                    </h2>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input 
                                            type="text" 
                                            placeholder="Entry details (e.g. Senior Dev - Google, 2022-Present)"
                                            className="flex-1 px-5 py-3.5 rounded-xl bg-bg-primary border border-border-color focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30"
                                            value={experienceInput}
                                            onChange={(e) => setExperienceInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleExperienceSubmit()}
                                        />
                                        <button 
                                            onClick={handleExperienceSubmit} 
                                            className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            <FaPlus /> <span className="hidden sm:inline">Add Item</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {experienceList.length > 0 ? experienceList.map((item, index) => (
                                        <div 
                                            key={item._id} 
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index, "experience")}
                                            onDragEnter={(e) => handleDragEnter(e, index, "experience")}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={(e) => e.preventDefault()}
                                            className={`group bg-bg-card p-5 rounded-2xl border ${draggingIndex === index && draggingSection === "experience" ? 'border-accent opacity-50' : 'border-border-color'} hover:border-accent/40 hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4 cursor-grab active:cursor-grabbing`}
                                        >
                                            <div className="flex items-center gap-4 min-w-0">
                                                <div className="w-8 h-8 rounded-lg bg-bg-primary flex items-center justify-center text-text-secondary/30 group-hover:text-accent transition-colors">
                                                    <FaBriefcase size={14} />
                                                </div>
                                                <span className="text-sm font-bold text-text-primary truncate">{item.experience}</span>
                                            </div>
                                            <button 
                                                onClick={() => handleDeleteExperience(item._id)} 
                                                className="p-2.5 rounded-lg bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    )) : (
                                        <div className="p-12 bg-bg-card/50 border-2 border-dashed border-border-color rounded-[2rem] text-center">
                                            <p className="text-text-secondary text-sm font-medium italic">No experience modules found.</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {activeSection === "skills" && (
                            <section className="space-y-6">
                                <div className="bg-bg-card p-6 md:p-8 rounded-[2rem] border border-border-color shadow-sm space-y-6">
                                    <h2 className="text-xl font-heading font-black text-text-primary flex items-center gap-3">
                                        <div className="p-2.5 bg-accent/10 rounded-xl text-accent">
                                            <FaCode size={20} />
                                        </div>
                                        Technical Arsenal
                                    </h2>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input 
                                            type="text" 
                                            placeholder="Skill (e.g. React)"
                                            className="sm:flex-1 px-5 py-3.5 rounded-xl bg-bg-primary border border-border-color focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30"
                                            value={skillNameInput}
                                            onChange={(e) => setSkillNameInput(e.target.value)}
                                        />
                                        <div className="w-full sm:w-32 relative">
                                            <input 
                                                type="number" 
                                                placeholder="%"
                                                className="w-full pl-5 pr-10 py-3.5 rounded-xl bg-bg-primary border border-border-color focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30"
                                                value={skillPercentInput}
                                                onChange={(e) => setSkillPercentInput(e.target.value)}
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-text-secondary/40">%</span>
                                        </div>
                                        <button 
                                            onClick={handleSkillSubmit} 
                                            className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            <FaPlus /> <span className="hidden sm:inline">Add</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {skillsList.length > 0 ? skillsList.map((item, index) => (
                                        <div 
                                            key={item._id} 
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index, "skills")}
                                            onDragEnter={(e) => handleDragEnter(e, index, "skills")}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={(e) => e.preventDefault()}
                                            className={`group bg-bg-card p-5 rounded-2xl border ${draggingIndex === index && draggingSection === "skills" ? 'border-accent opacity-50' : 'border-border-color'} hover:border-accent/40 hover:shadow-md transition-all duration-300 space-y-4 cursor-grab active:cursor-grabbing`}
                                        >
                                            <div className="flex items-center justify-between min-w-0">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="w-8 h-8 rounded-lg bg-bg-primary flex items-center justify-center text-accent/40 group-hover:text-accent transition-colors">
                                                        <FaCode size={14} />
                                                    </div>
                                                    <span className="text-sm font-bold text-text-primary truncate uppercase tracking-tight">{item.name}</span>
                                                </div>
                                                <button 
                                                    onClick={() => handleDeleteSkill(item._id)} 
                                                    className="p-2.5 rounded-lg bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
                                                >
                                                    <FaTrash size={14} />
                                                </button>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest opacity-60">Competency</span>
                                                    <span className="text-xs font-black text-accent">{item.percentage}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-bg-primary rounded-full overflow-hidden border border-border-color/50">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-accent to-accent-2 transition-all duration-1000 ease-out" 
                                                        style={{ width: `${item.percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="col-span-full p-12 bg-bg-card/50 border-2 border-dashed border-border-color rounded-[2rem] text-center">
                                            <p className="text-text-secondary text-sm font-medium italic">No technical units initialized.</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm tracking-tight whitespace-nowrap lg:w-full ${active ? 'bg-accent text-white shadow-lg shadow-accent/25 translate-x-1' : 'bg-bg-primary/50 text-text-secondary border border-transparent hover:border-accent/30 hover:bg-bg-primary hover:text-text-primary'}`}
    >
        <span className={active ? 'text-white' : 'text-accent'}>{icon}</span>
        <span>{label}</span>
    </button>
);

export default ResumeCard;
