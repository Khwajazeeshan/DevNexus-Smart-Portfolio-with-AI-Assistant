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

        // We use the download API route to proxy the file download from Cloudinary
        // This avoids cross-origin security errors in the browser
        const link = document.createElement("a");
        link.href = "/api/resume/download";
        link.download = "Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-bg-primary font-body pb-12">
            <Toaster position="top-right" toastOptions={{ className: 'font-body rounded-xl font-medium shadow-custom border border-border-color bg-bg-card text-text-primary' }} />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
                <header className="mb-10 animate-fadeInUp">
                    <div className="flex flex-col gap-4">
                        <Link href="/admindashboard" className="flex items-center gap-2 text-text-secondary hover:text-accent font-medium transition-all group w-fit">
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Dashboard</span>
                        </Link>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-text-primary">
                                Document Control<span className="text-accent">.</span>
                            </h1>
                            <p className="mt-2 text-text-secondary text-sm md:text-base font-medium max-w-2xl">Initialize and maintain your downloadable professional artifacts for potential collaborators.</p>
                        </div>
                    </div>
                </header>

                <div className="space-y-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    {/* Upload Section */}
                    <div className="bg-bg-card rounded-[2rem] p-6 md:p-10 border border-border-color shadow-sm hover:shadow-custom transition-all duration-300">
                        <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-4 px-1">Source Selection (PDF)</label>
                        
                        <div className="relative group cursor-pointer">
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
                            />
                            <div className={`p-8 md:p-12 rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center gap-4 ${selectedFile ? 'border-accent bg-accent/5' : 'border-border-color hover:border-accent/40 bg-bg-primary/50'}`}>
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${selectedFile ? 'bg-accent text-white scale-110' : 'bg-bg-card text-text-secondary group-hover:text-accent group-hover:scale-105'}`}>
                                    <FaCloudUploadAlt size={32} />
                                </div>
                                {selectedFile ? (
                                    <div className="space-y-1">
                                        <p className="font-bold text-text-primary text-sm md:text-base break-all">{selectedFile.name}</p>
                                        <p className="text-xs font-bold text-accent uppercase tracking-widest">{(selectedFile.size / 1024).toFixed(1)} KB Ready</p>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        <p className="font-bold text-text-primary text-sm md:text-base">Click to browse or drag & drop</p>
                                        <p className="text-xs font-medium text-text-secondary">PDF, DOC or DOCX (Max 5MB)</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button 
                            onClick={handleResumeUpload}
                            disabled={!selectedFile || isUploading}
                            className="mt-8 w-full md:w-fit px-10 py-4 rounded-2xl bg-gradient-to-r from-accent to-accent-2 text-white font-bold tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0 transition-all flex items-center justify-center gap-3 group"
                        >
                            <FaFileUpload className={`group-hover:scale-110 transition-transform ${isUploading ? 'animate-pulse' : ''}`} />
                            <span>{isUploading ? "Transmitting..." : "Initialize Upload"}</span>
                        </button>
                    </div>

                    {/* Current File Status */}
                    <div className="bg-bg-card rounded-[2rem] p-6 md:p-10 border border-border-color shadow-sm">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-6 px-1">Active Artifact</h3>
                        
                        {loading ? (
                            <div className="h-20 bg-bg-primary animate-pulse rounded-2xl" />
                        ) : resumeUrl ? (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-bg-primary border border-border-color hover:border-accent/30 transition-all group">
                                <div className="flex items-center gap-5 w-full sm:w-auto">
                                    <div className="w-14 h-14 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shadow-sm">
                                        <FaFilePdf size={24} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-text-primary uppercase tracking-tight">Active Portfolio Resume</p>
                                        <p className="text-xs font-medium text-text-secondary truncate max-w-[200px] md:max-w-xs">{resumeUrl.split("/").pop()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <button 
                                        onClick={handleDownload}
                                        className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-bg-card border border-border-color hover:border-accent hover:text-accent text-text-secondary font-bold text-sm transition-all flex items-center justify-center gap-2"
                                        title="Download Current Resume"
                                    >
                                        <FaExternalLinkAlt size={14} />
                                        <span>Preview</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-10 rounded-2xl border-2 border-dashed border-border-color text-center">
                                <p className="text-text-secondary text-sm font-medium italic">No document initialized in current cluster.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

