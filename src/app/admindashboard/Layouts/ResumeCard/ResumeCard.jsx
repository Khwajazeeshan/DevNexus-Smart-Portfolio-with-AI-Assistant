"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaPlus, FaTrash, FaGraduationCap, FaBriefcase, FaCode, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const ResumeCard = () => {
    const [activeSection, setActiveSection] = useState("education");
    const [educationInput, setEducationInput] = useState("");
    const [educationList, setEducationList] = useState([]);

    const [experienceInput, setExperienceInput] = useState("");
    const [experienceList, setExperienceList] = useState([]);

    const [categoryInput, setCategoryInput] = useState("");
    const [subSkillInputs, setSubSkillInputs] = useState({});
    const [expandedCategories, setExpandedCategories] = useState({});
    const [skillsList, setSkillsList] = useState([]);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [draggingSection, setDraggingSection] = useState(null);
    const [draggingCategory, setDraggingCategory] = useState(null);

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

    const handleCategorySubmit = async () => {
        if (!categoryInput.trim()) return toast.error("Enter category name");
        try {
            const response = await fetch(`/api/resume/add-category`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category: categoryInput }),
            });
            if (response.ok) {
                const data = await response.json();
                setSkillsList(data.skills || []);
                setCategoryInput("");
                toast.success("Category added!");
            }
        } catch { toast.error("Error adding category"); }
    };

    const handleDeleteCategory = async (id) => {
        if (!confirm("Delete entire category?")) return;
        try {
            const response = await fetch(`/api/resume/delete-category/${id}`, { method: "DELETE" });
            if (response.ok) {
                const data = await response.json();
                setSkillsList(data.skills || []);
                toast.success("Category deleted");
            }
        } catch { toast.error("Error deleting category"); }
    };

    const handleSubSkillSubmit = async (categoryId) => {
        const input = subSkillInputs[categoryId] || { name: "", percentage: "" };
        if (!input.name.trim() || !input.percentage.trim()) return toast.error("Enter name and %");
        try {
            const response = await fetch(`/api/resume/add-subskill`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoryId, name: input.name, percentage: input.percentage }),
            });
            if (response.ok) {
                const data = await response.json();
                setSkillsList(data.skills || []);
                setSubSkillInputs({ ...subSkillInputs, [categoryId]: { name: "", percentage: "" } });
                toast.success("Sub-skill added!");
            }
        } catch { toast.error("Error adding sub-skill"); }
    };

    const handleDeleteSubSkill = async (categoryId, subSkillId) => {
        if (!confirm("Delete sub-skill?")) return;
        try {
            const response = await fetch(`/api/resume/delete-subskill/${categoryId}/${subSkillId}`, { method: "DELETE" });
            if (response.ok) {
                const data = await response.json();
                setSkillsList(data.skills || []);
                toast.success("Sub-skill deleted");
            }
        } catch { toast.error("Error deleting sub-skill"); }
    };

    const toggleCategory = (categoryId) => {
        setExpandedCategories((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
    };

    const handleDragStart = (e, index, section, categoryId = null) => {
        setDraggingIndex(index);
        setDraggingSection(section);
        if (categoryId) setDraggingCategory(categoryId);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragEnter = (e, index, section, categoryId = null) => {
        if (draggingIndex === index || draggingSection !== section) return;
        if (section === "subskills" && draggingCategory !== categoryId) return; // Prevent dragging across categories
        
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
        } else if (section === "subskills") {
            newList = [...skillsList];
            const categoryIndex = newList.findIndex(c => c._id === categoryId);
            if (categoryIndex !== -1) {
                const subSkillsList = [...newList[categoryIndex].subSkills];
                const draggedItem = subSkillsList[draggingIndex];
                subSkillsList.splice(draggingIndex, 1);
                subSkillsList.splice(index, 0, draggedItem);
                newList[categoryIndex].subSkills = subSkillsList;
                setSkillsList(newList);
            }
        }
        setDraggingIndex(index);
    };

    const handleDragEnd = async () => {
        const currentSection = draggingSection;
        const currentCategory = draggingCategory;
        let ids = [];
        let reqBody = { type: currentSection };
        
        if (currentSection === "education") ids = educationList.map(item => item._id);
        else if (currentSection === "experience") ids = experienceList.map(item => item._id);
        else if (currentSection === "skills") ids = skillsList.map(item => item._id);
        else if (currentSection === "subskills") {
            const category = skillsList.find(c => c._id === currentCategory);
            ids = category ? category.subSkills.map(item => item._id) : [];
            reqBody.categoryId = currentCategory;
        }

        reqBody.ids = ids;

        setDraggingIndex(null);
        setDraggingSection(null);
        setDraggingCategory(null);

        try {
            const response = await fetch(`/api/resume/reorder-resume`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reqBody),
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
                                {/* Add Category Section */}
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
                                            placeholder="New Category (e.g. Frontend, Backend)"
                                            className="sm:flex-1 px-5 py-3.5 rounded-xl bg-bg-primary border border-border-color focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/30"
                                            value={categoryInput}
                                            onChange={(e) => setCategoryInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleCategorySubmit()}
                                        />
                                        <button 
                                            onClick={handleCategorySubmit} 
                                            className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            <FaPlus /> <span className="hidden sm:inline">Add Category</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {skillsList.length > 0 ? skillsList.map((categoryItem, index) => (
                                        <div 
                                            key={categoryItem._id} 
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index, "skills")}
                                            onDragEnter={(e) => handleDragEnter(e, index, "skills")}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={(e) => e.preventDefault()}
                                            className={`bg-bg-card rounded-2xl border ${draggingIndex === index && draggingSection === "skills" ? 'border-accent opacity-50' : 'border-border-color'} hover:border-accent/40 transition-all duration-300 overflow-hidden cursor-grab active:cursor-grabbing shadow-sm`}
                                        >
                                            {/* Category Header */}
                                            <div className="p-5 flex items-center justify-between bg-bg-primary/30 border-b border-border-color/50">
                                                <div 
                                                    className="flex items-center gap-3 cursor-pointer flex-1"
                                                    onClick={() => toggleCategory(categoryItem._id)}
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-bg-primary flex items-center justify-center text-accent">
                                                        {expandedCategories[categoryItem._id] ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                                                    </div>
                                                    <span className="text-lg font-black text-text-primary uppercase tracking-wider">{categoryItem.category}</span>
                                                    <span className="ml-2 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-bold">{categoryItem.subSkills?.length || 0}</span>
                                                </div>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteCategory(categoryItem._id); }} 
                                                    className="p-2.5 rounded-lg bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90 ml-4"
                                                    title="Delete Category"
                                                >
                                                    <FaTrash size={14} />
                                                </button>
                                            </div>

                                            {/* Expandable Sub-skills Section */}
                                            {expandedCategories[categoryItem._id] && (
                                                <div className="p-5 space-y-6 cursor-default" onDragStart={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                                    {/* Add Sub-skill form */}
                                                    <div className="flex flex-col sm:flex-row gap-3">
                                                        <input 
                                                            type="text" 
                                                            placeholder="Skill (e.g. React)"
                                                            className="sm:flex-1 px-4 py-3 rounded-xl bg-bg-primary border border-border-color focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/40 text-sm"
                                                            value={subSkillInputs[categoryItem._id]?.name || ""}
                                                            onChange={(e) => setSubSkillInputs(prev => ({...prev, [categoryItem._id]: {...(prev[categoryItem._id] || {}), name: e.target.value}}))}
                                                        />
                                                        <div className="w-full sm:w-28 relative">
                                                            <input 
                                                                type="number" 
                                                                placeholder="%"
                                                                className="w-full pl-4 pr-8 py-3 rounded-xl bg-bg-primary border border-border-color focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/40 text-sm"
                                                                value={subSkillInputs[categoryItem._id]?.percentage || ""}
                                                                onChange={(e) => setSubSkillInputs(prev => ({...prev, [categoryItem._id]: {...(prev[categoryItem._id] || {}), percentage: e.target.value}}))}
                                                                onKeyDown={(e) => e.key === 'Enter' && handleSubSkillSubmit(categoryItem._id)}
                                                            />
                                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-text-secondary/50">%</span>
                                                        </div>
                                                        <button 
                                                            onClick={() => handleSubSkillSubmit(categoryItem._id)} 
                                                            className="px-5 py-3 rounded-xl bg-accent/10 text-accent font-bold hover:bg-accent hover:text-white transition-all flex items-center justify-center text-sm"
                                                        >
                                                            <FaPlus />
                                                        </button>
                                                    </div>

                                                    {/* Sub-skills Grid */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {categoryItem.subSkills && categoryItem.subSkills.length > 0 ? categoryItem.subSkills.map((subSkill, subIndex) => (
                                                            <div 
                                                                key={subSkill._id} 
                                                                draggable
                                                                onDragStart={(e) => handleDragStart(e, subIndex, "subskills", categoryItem._id)}
                                                                onDragEnter={(e) => handleDragEnter(e, subIndex, "subskills", categoryItem._id)}
                                                                onDragEnd={handleDragEnd}
                                                                onDragOver={(e) => e.preventDefault()}
                                                                className={`bg-bg-primary p-4 rounded-xl border ${draggingIndex === subIndex && draggingSection === "subskills" && draggingCategory === categoryItem._id ? 'border-accent opacity-50' : 'border-border-color/50'} relative group hover:border-accent/30 transition-all cursor-grab active:cursor-grabbing`}
                                                            >
                                                                <button 
                                                                    onClick={() => handleDeleteSubSkill(categoryItem._id, subSkill._id)} 
                                                                    className="absolute top-2 right-2 p-1.5 rounded-md bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                                                >
                                                                    <FaTrash size={10} />
                                                                </button>
                                                                <div className="pr-6">
                                                                    <h4 className="text-sm font-bold text-text-primary uppercase tracking-tight mb-3 truncate">{subSkill.name}</h4>
                                                                    <div className="space-y-1.5">
                                                                        <div className="flex justify-between items-end">
                                                                            <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest opacity-60">Level</span>
                                                                            <span className="text-[11px] font-black text-accent">{subSkill.percentage}%</span>
                                                                        </div>
                                                                        <div className="w-full h-1.5 bg-bg-card rounded-full overflow-hidden border border-border-color/30">
                                                                            <div 
                                                                                className="h-full bg-gradient-to-r from-accent to-accent-2 transition-all duration-1000 ease-out" 
                                                                                style={{ width: `${subSkill.percentage}%` }}
                                                                            ></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )) : (
                                                            <div className="col-span-full py-6 text-center">
                                                                <p className="text-text-secondary text-xs font-medium italic">No sub-skills added to this category yet.</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )) : (
                                        <div className="col-span-full p-12 bg-bg-card/50 border-2 border-dashed border-border-color rounded-[2rem] text-center">
                                            <p className="text-text-secondary text-sm font-medium italic">No skill categories initialized.</p>
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
