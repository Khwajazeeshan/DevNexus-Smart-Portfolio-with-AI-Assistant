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
      <div >
        <FaSpinner  />
      </div>
    );
  }

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
            <h1 >About Section</h1>
          </div>
        </header>

        <form onSubmit={handleSubmit} >
          {/* Image Upload */}
          <div >
            <label >
              <FaUser size={14}  /> Profile Image
            </label>
            <div >
              <div >
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile"  />
                ) : (
                  <FaCloudUploadAlt size={40}  />
                )}
                <div >
                  <span >Upload New</span>
                </div>
                <input type="file" onChange={handleImageChange} accept="image/*"  title="Upload Image" />
              </div>
              <div >
                <p >Recommended size: 500x500px. JPG, PNG or WebP format. Max 2MB.</p>
                <button type="button" onClick={() => {setImage(null); setImagePreview(null);}} >
                  <FaTrash size={10} /> Remove Image
                </button>
              </div>
            </div>
          </div>

          <div >
            <div >
              <label htmlFor="name" >
                <FaUser size={14}  /> Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                
                placeholder="e.g. Khawaja Zeeshan"
              />
            </div>
            <div >
              <label htmlFor="skills" >
                <FaTools size={14}  /> Skills
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                
                placeholder="e.g. React, Next.js, TailWind"
              />
            </div>
          </div>

          <div >
            <div >
              <label htmlFor="experienceYears" >
                <FaTools size={14}  /> Experience Years
              </label>
              <input
                type="text"
                id="experienceYears"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleInputChange}
                
                placeholder="e.g. 3+"
              />
            </div>
            <div >
              <label htmlFor="projectsCount" >
                <FaTools size={14}  /> Projects Completed
              </label>
              <input
                type="text"
                id="projectsCount"
                name="projectsCount"
                value={formData.projectsCount}
                onChange={handleInputChange}
                
                placeholder="e.g. 50+"
              />
            </div>
          </div>

          <div >
            <label htmlFor="description" >
              <FaQuoteLeft size={14}  /> Bio / Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="8"
              
              placeholder="Tell visitors about your professional journey..."
            />
            {formData.description && (
              <div >
                <span >Live Preview</span>
                {formData.description}
              </div>
            )}
          </div>

          <div >
            <button
              type="submit"
              disabled={isSubmitting}
              
            >
              {isSubmitting ? <><FaSpinner  /> Saving Tasks...</> : 'Confirm Updates'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


