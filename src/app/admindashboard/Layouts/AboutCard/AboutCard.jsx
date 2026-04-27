"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowLeft, FaCloudUploadAlt, FaSpinner, FaUser, FaQuoteLeft, FaTools, FaTrash } from "react-icons/fa";
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
      <div className="flex justify-center items-center h-[60vh]">
        <FaSpinner className="animate-spin text-accent text-4xl" />
      </div>
    );
  }

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-text-primary">
                Profile Identity<span className="text-accent">.</span>
                </h1>
                <div className="px-3 py-1 bg-accent/10 rounded-full text-accent text-xs font-bold uppercase tracking-wider w-fit">
                    Core Profile Data
                </div>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          {/* Image Upload Card */}
          <div className="bg-bg-card rounded-[2rem] p-6 md:p-8 border border-border-color shadow-sm hover:shadow-custom transition-all duration-300">
            <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-secondary mb-6">
              <FaUser size={14} className="text-accent" /> Profile Image
            </label>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group cursor-pointer">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-[2rem] border-2 border-dashed border-border-color group-hover:border-accent flex items-center justify-center overflow-hidden transition-all duration-300 bg-bg-primary/30">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="flex flex-col items-center text-text-secondary group-hover:text-accent">
                        <FaCloudUploadAlt size={40} className="mb-2" />
                        <span className="text-xs font-bold">Upload Photo</span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[2rem]">
                  <span className="text-white font-bold text-sm">Change Image</span>
                </div>
                <input type="file" onChange={handleImageChange} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" title="Upload Image" />
              </div>
              
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div>
                    <h3 className="text-lg font-heading font-bold text-text-primary mb-1">Visual Representation</h3>
                    <p className="text-text-secondary text-sm leading-relaxed max-w-sm">JPG, PNG or WebP. Recommended 500x500px for best results. Max 2MB.</p>
                </div>
                {imagePreview && (
                    <button 
                        type="button" 
                        onClick={() => {setImage(null); setImagePreview(null);}} 
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-bold mx-auto md:mx-0"
                    >
                        <FaTrash size={12} /> REMOVE IMAGE
                    </button>
                )}
              </div>
            </div>
          </div>

          {/* Form Fields Card */}
          <div className="bg-bg-card rounded-[2rem] p-6 md:p-10 border border-border-color shadow-sm hover:shadow-custom transition-all duration-300 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-secondary px-1">
                  <FaUser size={12} className="text-accent" /> Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-2xl bg-bg-primary border border-border-color focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/40"
                  placeholder="e.g. Khawaja Zeeshan"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="skills" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-secondary px-1">
                  <FaTools size={12} className="text-accent" /> Highlights
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-2xl bg-bg-primary border border-border-color focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/40"
                  placeholder="e.g. Full Stack Developer, AI Enthusiast"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="experienceYears" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-secondary px-1">
                  <FaTools size={12} className="text-accent-2" /> Years Experience
                </label>
                <input
                  type="text"
                  id="experienceYears"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-2xl bg-bg-primary border border-border-color focus:border-accent-2 focus:ring-4 focus:ring-accent-2/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/40"
                  placeholder="e.g. 5+"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="projectsCount" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-secondary px-1">
                  <FaTools size={12} className="text-accent-2" /> Delivered Projects
                </label>
                <input
                  type="text"
                  id="projectsCount"
                  name="projectsCount"
                  value={formData.projectsCount}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-2xl bg-bg-primary border border-border-color focus:border-accent-2 focus:ring-4 focus:ring-accent-2/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/40"
                  placeholder="e.g. 40+"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-secondary px-1">
                <FaQuoteLeft size={12} className="text-accent" /> Professional Bio
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="6"
                className="w-full px-6 py-4 rounded-2xl bg-bg-primary border border-border-color focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-medium text-text-primary placeholder:text-text-secondary/40 resize-none"
                placeholder="Tell the world your professional story..."
              />
              {formData.description && (
                <div className="mt-4 p-6 bg-bg-primary/50 rounded-2xl border border-dashed border-border-color">
                  <span className="inline-block px-2 py-0.5 bg-accent text-[10px] font-bold text-white uppercase rounded-md mb-3 tracking-tighter">Live Preview</span>
                  <p className="text-text-secondary text-sm italic leading-relaxed">{formData.description}</p>
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-fit px-10 py-4 rounded-2xl bg-gradient-to-r from-accent to-accent-2 text-white font-bold tracking-wide shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0 transition-all flex items-center justify-center gap-3"
              >
                {isSubmitting ? <><FaSpinner className="animate-spin" /> Synchronizing...</> : 'Confirm Updates'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


