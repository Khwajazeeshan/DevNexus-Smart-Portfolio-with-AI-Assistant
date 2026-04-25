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
        <div >
            <Toaster position="top-right" />
            
            <div >
                <header >
                    <div>
                        <Link href="/admindashboard" >
                            <FaArrowLeft  />
                            <span>Back to Dashboard</span>
                        </Link>
                        <h1 >Resume Manager</h1>
                        <p >Design your career path and technical expertise.</p>
                    </div>
                </header>

                <div >
                    {/* Sidebar Tabs */}
                    <div >
                        <div >
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
                    <div >
                        {activeSection === "education" && (
                            <section >
                                <h2 >
                                    <FaGraduationCap  /> Manage Education
                                </h2>
                                <div >
                                    <input 
                                        type="text" 
                                        placeholder="Enter Education (e.g. BS in CS - University, 2021)"
                                        
                                        value={educationInput}
                                        onChange={(e) => setEducationInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleEducationSubmit()}
                                    />
                                    <button onClick={handleEducationSubmit} >
                                        <FaPlus /> Add Item
                                    </button>
                                </div>
                                <div >
                                    {educationList.length > 0 ? educationList.map((item, index) => (
                                        <div 
                                            key={item._id} 
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index, "education")}
                                            onDragEnter={(e) => handleDragEnter(e, index, "education")}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={(e) => e.preventDefault()}
                                            
                                        >
                                            <span >{item.education}</span>
                                            <button onClick={() => handleDeleteEducation(item._id)} >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    )) : <p >No education entries found.</p>}
                                </div>
                            </section>
                        )}

                        {activeSection === "experience" && (
                            <section >
                                <h2 >
                                    <FaBriefcase  /> Manage Experience
                                </h2>
                                <div >
                                    <input 
                                        type="text" 
                                        placeholder="Enter Experience (e.g. Developer - Corp, 2022-Present)"
                                        
                                        value={experienceInput}
                                        onChange={(e) => setExperienceInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleExperienceSubmit()}
                                    />
                                    <button onClick={handleExperienceSubmit} >
                                        <FaPlus /> Add Item
                                    </button>
                                </div>
                                <div >
                                    {experienceList.length > 0 ? experienceList.map((item, index) => (
                                        <div 
                                            key={item._id} 
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index, "experience")}
                                            onDragEnter={(e) => handleDragEnter(e, index, "experience")}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={(e) => e.preventDefault()}
                                            
                                        >
                                            <span >{item.experience}</span>
                                            <button onClick={() => handleDeleteExperience(item._id)} >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    )) : <p >No experience entries found.</p>}
                                </div>
                            </section>
                        )}

                        {activeSection === "skills" && (
                            <section >
                                <h2 >
                                    <FaCode  /> Manage Skills
                                </h2>
                                <div >
                                    <input 
                                        type="text" 
                                        placeholder="Skill Name (e.g. React)"
                                        
                                        value={skillNameInput}
                                        onChange={(e) => setSkillNameInput(e.target.value)}
                                    />
                                    <input 
                                        type="number" 
                                        placeholder="%"
                                        
                                        value={skillPercentInput}
                                        onChange={(e) => setSkillPercentInput(e.target.value)}
                                    />
                                    <button onClick={handleSkillSubmit} >
                                        <FaPlus /> Add
                                    </button>
                                </div>
                                <div >
                                    {skillsList.length > 0 ? skillsList.map((item, index) => (
                                        <div 
                                            key={item._id} 
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index, "skills")}
                                            onDragEnter={(e) => handleDragEnter(e, index, "skills")}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={(e) => e.preventDefault()}
                                            
                                        >
                                            <div >
                                                <span >{item.name}</span>
                                                <span >{item.percentage}% Efficiency</span>
                                            </div>
                                            <button onClick={() => handleDeleteSkill(item._id)} >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    )) : <p >No skills added yet.</p>}
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
        
    >
        <span >{icon}</span>
        <span>{label}</span>
    </button>
);

export default ResumeCard;
