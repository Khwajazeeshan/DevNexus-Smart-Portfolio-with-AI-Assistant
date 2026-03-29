"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowLeft, FaCloudUploadAlt, FaSpinner, FaUser, FaQuoteLeft, FaTools } from "react-icons/fa";
import Link from 'next/link';

export default function AboutCard() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    skills: '',
    experienceYears: '',
    projectsCount: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await axios.get("/api/about");
        if (response.data.success && response.data.data) {
          const data = response.data.data;
          setFormData({
            name: data.name || '',
            description: data.description || '',
            skills: data.skills || '',
            experienceYears: data.experienceYears || '',
            projectsCount: data.projectsCount || ''
          });
          if (data.imagePath) {
            setImagePreview(`/api${data.imagePath}`);
          }
        }
      } catch (error) {
        if (error.response?.status !== 404) {
          toast.error('Failed to load existing data');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchExistingData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('skills', formData.skills);
      data.append('experienceYears', formData.experienceYears);
      data.append('projectsCount', formData.projectsCount);
      if (image) data.append('image', image);

      const response = await axios.post(`/api/about`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Saved successfully!');
        setImage(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save data');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        <FaSpinner className="animate-spin text-4xl text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <Link href="/admindashboard" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group">
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-3xl font-bold text-white">About Section</h1>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/50 border border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
          {/* Image Upload */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
              <FaUser size={14} className="text-brand-primary" /> Profile Image
            </label>
            <div className="flex items-start gap-8">
              <div className="w-40 h-40 rounded-3xl overflow-hidden bg-slate-800 border-2 border-dashed border-white/10 flex items-center justify-center group relative cursor-pointer">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="w-full h-full object-cover transition-opacity group-hover:opacity-50" />
                ) : (
                  <FaCloudUploadAlt size={40} className="text-slate-600" />
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <span className="text-xs font-bold text-white uppercase transform translate-y-2 group-hover:translate-y-0 transition-transform">Upload New</span>
                </div>
                <input type="file" onChange={handleImageChange} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-slate-400 text-sm leading-relaxed">Recommended size: 500x500px. JPG, PNG or WebP format. Max 2MB.</p>
                <button type="button" onClick={() => {setImage(null); setImagePreview(null);}} className="text-xs text-red-400 hover:text-red-300 transition-colors uppercase font-bold tracking-widest">Remove Image</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label htmlFor="name" className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                <FaUser size={14} className="text-brand-primary" /> Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                placeholder="e.g. Khawaja Zeeshan"
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="skills" className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                <FaTools size={14} className="text-brand-primary" /> Skills
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                placeholder="e.g. React, Next.js, TailWind"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label htmlFor="experienceYears" className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                <FaTools size={14} className="text-brand-primary" /> Experience Years
              </label>
              <input
                type="text"
                id="experienceYears"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleInputChange}
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                placeholder="e.g. 3+"
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="projectsCount" className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                <FaTools size={14} className="text-brand-primary" /> Projects Completed
              </label>
              <input
                type="text"
                id="projectsCount"
                name="projectsCount"
                value={formData.projectsCount}
                onChange={handleInputChange}
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                placeholder="e.g. 50+"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label htmlFor="description" className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
              <FaQuoteLeft size={14} className="text-brand-primary" /> Bio / Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="8"
              className="w-full bg-slate-800/50 border border-white/5 rounded-3xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium resize-y leading-relaxed min-h-[150px]"
              placeholder="Tell visitors about your professional journey..."
            />
            {formData.description && (
              <div className="mt-4 p-6 bg-slate-800/30 rounded-2xl border border-white/5 whitespace-pre-wrap text-slate-400 text-sm leading-relaxed animate-fade-in">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 opacity-50">Live Preview</span>
                {formData.description}
              </div>
            )}
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-4 bg-brand-primary hover:bg-violet-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-brand-primary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
            >
              {isSubmitting ? <><FaSpinner className="animate-spin" /> Saving...</> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


