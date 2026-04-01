"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaFileUpload, FaFilePdf, FaCloudUploadAlt, FaExternalLinkAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function AdminCVPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [resumeUrl, setResumeUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await fetch("/api/resume/get-resume");
                const data = await response.json();
                if (data && data.resumeUrl) {
                    setResumeUrl(data.resumeUrl);
                }
            } catch (error) {
                console.error("Error fetching resume:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchResume();
    }, []);

    const handleResumeUpload = async () => {
        if (!selectedFile) {
            return toast.error("Please select a file to upload");
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch(`/api/resume/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                setResumeUrl(data.resumeUrl);
                toast.success("Resume uploaded successfully!");
                setSelectedFile(null);
                setTimeout(() => window.location.reload(), 1000);
            } else {
                toast.error(data.message || "Failed to upload resume");
            }
        } catch (error) {
            toast.error("Error uploading resume");
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                return toast.error("File size must be less than 5MB");
            }
            setSelectedFile(file);
        }
    };

    const handleDownload = (e) => {
        if (e) e.preventDefault();
        if (!resumeUrl) return;

        // Securely prompt download for local files without redirecting
        const link = document.createElement("a");
        link.href = resumeUrl;
        link.download = "Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 px-4 py-8 md:p-8">
            <Toaster position="top-right" />
            
            <div className="max-w-3xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <Link href="/admindashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group w-fit">
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Dashboard</span>
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Portfolio Resume</h1>
                        <p className="text-slate-400 text-sm mt-1 font-medium italic opacity-80">Upload and manage your downloadable professional file.</p>
                    </div>
                </header>

                <div className="space-y-8 bg-slate-900/50 border border-white/5 p-6 md:p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
                    <div className="space-y-6">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Upload New Resume (PDF)</label>
                        
                        <div className="relative group">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className={`border-2 border-dashed ${selectedFile ? 'border-brand-primary bg-brand-primary/5' : 'border-white/10 bg-slate-800/50'} rounded-3xl p-8 md:p-12 text-center transition-all group-hover:border-brand-primary/50`}>
                                <div className="flex flex-col items-center gap-4">
                                    <div className={`p-4 rounded-2xl ${selectedFile ? 'bg-brand-primary text-white' : 'bg-slate-800 text-slate-500'} transition-all`}>
                                        <FaCloudUploadAlt size={32} />
                                    </div>
                                    {selectedFile ? (
                                        <div className="space-y-1">
                                            <p className="text-white font-bold">{selectedFile.name}</p>
                                            <p className="text-slate-400 text-xs text-uppercase">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            <p className="text-slate-300 font-medium">Click to browse or drag & drop</p>
                                            <p className="text-slate-500 text-xs uppercase">PDF, DOC or DOCX (Max 5MB)</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleResumeUpload}
                            disabled={!selectedFile || isUploading}
                            className="w-full py-4 bg-brand-primary hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-3 active:scale-95"
                        >
                            <FaFileUpload /> {isUploading ? "Uploading..." : "Save Resume File"}
                        </button>
                    </div>

                    {/* Current Resume Info */}
                    <div className="pt-10 border-t border-white/5">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Currently Published</h3>
                        
                        {loading ? (
                            <div className="h-20 bg-white/5 rounded-2xl animate-pulse" />
                        ) : resumeUrl ? (
                            <div className="flex items-center justify-between p-6 bg-slate-800/50 rounded-3xl border border-white/5 hover:bg-slate-800 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-red-500/10 text-red-500 rounded-xl">
                                        <FaFilePdf size={24} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-bold truncate">Active Portfolio Resume</p>
                                        <p className="text-slate-500 text-xs truncate opacity-70 mt-0.5">{resumeUrl.split("/").pop()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={handleDownload}
                                        className="p-4 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white rounded-2xl transition-all shadow-lg active:scale-95"
                                        title="Download Current Resume"
                                    >
                                        <FaExternalLinkAlt size={16} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 bg-white/5 rounded-3xl border border-dashed border-white/10 text-center">
                                <p className="text-slate-500 italic">No resume file uploaded yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

