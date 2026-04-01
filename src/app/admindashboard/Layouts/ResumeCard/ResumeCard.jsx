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
        <div className="min-h-screen bg-[#020617] text-slate-200 px-4 py-8 md:p-8">
            <Toaster position="top-right" />
            
            <div className="max-w-5xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <Link href="/admindashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group w-fit">
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Dashboard</span>
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Resume Manager</h1>
                        <p className="text-slate-400 text-sm mt-1 font-medium italic opacity-80">Design your career path and technical expertise.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-1 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide no-scrollbar">
                        <div className="flex lg:flex-col gap-2 min-w-max lg:min-w-0 w-full">
                            <TabButton 
                                active={activeSection === "education"} 
                                onClick={() => setActiveSection("education")}
                                icon={<FaGraduationCap />}
                                label="Education"
                            />
                            <TabButton 
                                active={activeSection === "experience"} 
                                onClick={() => setActiveSection("experience")}
                                icon={<FaBriefcase />}
                                label="Experience"
                            />
                            <TabButton 
                                active={activeSection === "skills"} 
                                onClick={() => setActiveSection("skills")}
                                icon={<FaCode />}
                                label="Skills"
                            />
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3 space-y-8 bg-slate-900/50 border border-white/5 p-6 md:p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
                        {activeSection === "education" && (
                            <section className="animate-fade-in space-y-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                    <FaGraduationCap className="text-brand-primary" /> Manage Education
                                </h2>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input 
                                        type="text" 
                                        placeholder="Enter Education (e.g. BS in CS - University, 2021)"
                                        className="w-full sm:flex-1 bg-slate-800 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                        value={educationInput}
                                        onChange={(e) => setEducationInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleEducationSubmit()}
                                    />
                                    <button onClick={handleEducationSubmit} className="w-full sm:w-auto px-8 py-4 sm:py-0 rounded-2xl bg-brand-primary text-white hover:bg-violet-600 transition-all flex items-center justify-center gap-2 font-black shadow-xl shadow-brand-primary/20 active:scale-[0.98]">
                                        <FaPlus /> Add Item
                                    </button>
                                </div>
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    {educationList.length > 0 ? educationList.map((item, index) => (
                                        <div 
                                            key={item._id} 
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index, "education")}
                                            onDragEnter={(e) => handleDragEnter(e, index, "education")}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={(e) => e.preventDefault()}
                                            className={`flex justify-between items-center p-4 bg-slate-800/50 rounded-2xl group hover:bg-slate-800 transition-all cursor-move border border-transparent hover:border-white/10 ${draggingIndex === index && draggingSection === "education" ? "opacity-50 ring-2 ring-brand-primary" : ""}`}
                                        >
                                            <span className="text-slate-300">{item.education}</span>
                                            <button onClick={() => handleDeleteEducation(item._id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    )) : <p className="text-slate-500 text-center py-8 italic">No education entries found.</p>}
                                </div>
                            </section>
                        )}

                        {activeSection === "experience" && (
                            <section className="animate-fade-in space-y-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                    <FaBriefcase className="text-brand-primary" /> Manage Experience
                                </h2>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input 
                                        type="text" 
                                        placeholder="Enter Experience (e.g. Developer - Corp, 2022-Present)"
                                        className="w-full sm:flex-1 bg-slate-800 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                        value={experienceInput}
                                        onChange={(e) => setExperienceInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleExperienceSubmit()}
                                    />
                                    <button onClick={handleExperienceSubmit} className="w-full sm:w-auto px-8 py-4 sm:py-0 rounded-2xl bg-brand-primary text-white hover:bg-violet-600 transition-all flex items-center justify-center gap-2 font-black shadow-xl shadow-brand-primary/20 active:scale-[0.98]">
                                        <FaPlus /> Add Item
                                    </button>
                                </div>
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    {experienceList.length > 0 ? experienceList.map((item, index) => (
                                        <div 
                                            key={item._id} 
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index, "experience")}
                                            onDragEnter={(e) => handleDragEnter(e, index, "experience")}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={(e) => e.preventDefault()}
                                            className={`flex justify-between items-center p-4 bg-slate-800/50 rounded-2xl group hover:bg-slate-800 transition-all cursor-move border border-transparent hover:border-white/10 ${draggingIndex === index && draggingSection === "experience" ? "opacity-50 ring-2 ring-brand-primary" : ""}`}
                                        >
                                            <span className="text-slate-300">{item.experience}</span>
                                            <button onClick={() => handleDeleteExperience(item._id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    )) : <p className="text-slate-500 text-center py-8 italic">No experience entries found.</p>}
                                </div>
                            </section>
                        )}

                        {activeSection === "skills" && (
                            <section className="animate-fade-in space-y-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                                    <FaCode className="text-brand-primary" /> Manage Skills
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    <input 
                                        type="text" 
                                        placeholder="Skill Name (e.g. React)"
                                        className="md:col-span-3 bg-slate-800 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                        value={skillNameInput}
                                        onChange={(e) => setSkillNameInput(e.target.value)}
                                    />
                                    <input 
                                        type="number" 
                                        placeholder="%"
                                        className="md:col-span-1 bg-slate-800 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium text-center"
                                        value={skillPercentInput}
                                        onChange={(e) => setSkillPercentInput(e.target.value)}
                                    />
                                    <button onClick={handleSkillSubmit} className="md:col-span-1 py-4 rounded-2xl bg-brand-primary text-white hover:bg-violet-600 transition-all flex items-center justify-center gap-2 font-bold shadow-lg shadow-brand-primary/20">
                                        <FaPlus /> Add
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                    {skillsList.length > 0 ? skillsList.map((item, index) => (
                                        <div 
                                            key={item._id} 
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index, "skills")}
                                            onDragEnter={(e) => handleDragEnter(e, index, "skills")}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={(e) => e.preventDefault()}
                                            className={`flex justify-between items-center p-4 bg-slate-800/50 rounded-2xl group hover:bg-slate-800 transition-all cursor-move border border-white/5 hover:border-white/10 ${draggingIndex === index && draggingSection === "skills" ? "opacity-50 ring-2 ring-brand-primary" : ""}`}
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold">{item.name}</span>
                                                <span className="text-brand-secondary text-xs uppercase tracking-widest font-bold">{item.percentage}% Efficiency</span>
                                            </div>
                                            <button onClick={() => handleDeleteSkill(item._id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    )) : <p className="text-slate-500 text-center col-span-full py-8 italic">No skills added yet.</p>}
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
        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold ${
            active 
            ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
            : "text-slate-400 hover:text-white hover:bg-white/5"
        }`}
    >
        <span className={active ? "scale-110" : ""}>{icon}</span>
        <span>{label}</span>
    </button>
);

export default ResumeCard;
