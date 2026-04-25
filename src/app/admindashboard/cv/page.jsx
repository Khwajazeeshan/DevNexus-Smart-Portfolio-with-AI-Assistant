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
        <div >
            <Toaster position="top-right" />
            
            <div >
                <header >
                    <div>
                        <Link href="/admindashboard" >
                            <FaArrowLeft  />
                            <span>Back to Dashboard</span>
                        </Link>
                        <h1 >Portfolio Resume</h1>
                        <p >Upload and manage your downloadable professional file.</p>
                    </div>
                </header>

                <div >
                    <div >
                        <label >Upload New Resume (PDF)</label>
                        
                        <div >
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                
                            />
                            <div >
                                <div >
                                    <div >
                                        <FaCloudUploadAlt size={32} />
                                    </div>
                                    {selectedFile ? (
                                        <div >
                                            <p >{selectedFile.name}</p>
                                            <p >{(selectedFile.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                    ) : (
                                        <div >
                                            <p >Click to browse or drag & drop</p>
                                            <p >PDF, DOC or DOCX (Max 5MB)</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleResumeUpload}
                            disabled={!selectedFile || isUploading}
                            
                        >
                            <FaFileUpload /> {isUploading ? "Uploading..." : "Save Resume File"}
                        </button>
                    </div>

                    {/* Current Resume Info */}
                    <div >
                        <h3 >Currently Published</h3>
                        
                        {loading ? (
                            <div  />
                        ) : resumeUrl ? (
                            <div >
                                <div >
                                    <div >
                                        <FaFilePdf size={24} />
                                    </div>
                                    <div >
                                        <p >Active Portfolio Resume</p>
                                        <p >{resumeUrl.split("/").pop()}</p>
                                    </div>
                                </div>
                                <div >
                                    <button 
                                        onClick={handleDownload}
                                        
                                        title="Download Current Resume"
                                    >
                                        <FaExternalLinkAlt size={16} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div >
                                <p >No resume file uploaded yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

