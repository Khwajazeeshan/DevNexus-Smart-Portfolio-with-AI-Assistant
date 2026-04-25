"use client";
import React from 'react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { FaUser, FaFileAlt, FaProjectDiagram, FaEnvelope, FaLink, FaArrowLeft, FaFileUpload, FaHome } from "react-icons/fa";
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Admin() {
    return (
        <div className="flex h-screen bg-bg-primary text-text-primary overflow-hidden font-body relative">
            <Toaster position="top-center" toastOptions={{ className: 'font-body rounded-xl font-medium shadow-custom border border-border-color bg-bg-card text-text-primary' }} />

            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[100px] animate-float"></div>
                <div className="absolute top-1/2 -left-32 w-96 h-96 bg-accent-2/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Sidebar Navigation */}
            <aside className="w-20 md:w-72 bg-bg-card backdrop-blur-xl border-r border-border-color flex flex-col justify-between py-6 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 transition-all duration-300">
                <div>
                    <div className="px-4 md:px-8 mb-10 flex items-center justify-center md:justify-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center text-white shadow-custom font-bold tracking-widest text-sm">
                            <img
                                src="/logo-1.png"
                                alt="Khawaja Zeeshan Logo"
                                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <h2 className="hidden md:block font-heading font-black text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-2">
                            Khawaja Zeeshan
                        </h2>
                    </div>



                    <nav className="flex flex-col gap-2 px-2 md:px-4">
                        <SidebarLink href="/admindashboard" icon={<FaHome size={20} />} label="Overview" active />
                        <div className="h-px w-full bg-border-color/50 my-2"></div>
                        <SidebarLink href="/admindashboard/about" icon={<FaUser size={18} />} label="Profile" />
                        <SidebarLink href="/admindashboard/resume" icon={<FaFileAlt size={18} />} label="Resume" />
                        <SidebarLink href="/admindashboard/project" icon={<FaProjectDiagram size={18} />} label="Projects" />
                        <SidebarLink href="/admindashboard/contact" icon={<FaEnvelope size={18} />} label="Contact" />
                        <SidebarLink href="/admindashboard/footer" icon={<FaLink size={18} />} label="Socials" />
                        <SidebarLink href="/admindashboard/cv" icon={<FaFileUpload size={18} />} label="CV Upload" />
                    </nav>
                </div>

                <div className="px-2 md:px-4 flex flex-col items-center md:items-start gap-4">
                    <div className="md:px-4">
                        <ThemeToggle />
                    </div>
                    <Link href="/" className="flex items-center justify-center md:justify-start gap-3 w-full p-3 rounded-xl bg-bg-primary border border-border-color hover:bg-border-color/50 hover:text-accent transition-all group mt-2">
                        <FaArrowLeft className="text-text-secondary group-hover:text-accent transition-colors" />
                        <span className="hidden md:block font-bold text-sm text-text-secondary group-hover:text-accent transition-colors">Live Site</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto z-10 relative">
                <div className="max-w-7xl mx-auto p-6 lg:p-12 space-y-12 pb-24">
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border-color animate-fadeInUp">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <span className="text-xs uppercase tracking-widest font-bold text-accent">Administration System</span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-heading font-black tracking-tight text-text-primary">
                                Dashboard<span className="text-accent">.</span>
                            </h1>
                            <p className="mt-2 text-text-secondary text-lg">Manage your digital universe and synchronise changes.</p>
                        </div>
                        <div className='px-4 md:px-8'>
                            <Link href="/" className="md:top-8 md:left-8  flex items-center gap-2 text-text-secondary hover:text-accent font-medium transition-all group px-4 py-2 bg-bg-card/50 backdrop-blur-md rounded-xl border border-white/10 shadow-sm">
                                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                                <span>Return to Portfolio</span>
                            </Link>
                        </div>
                    </header>

                    {/* Statistics Overview */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        {[
                            { label: "Content Modules", value: "06", desc: "Active modules" },
                            { label: "System Status", value: "Optimal", desc: "No issues detected" },
                            { label: "Database", value: "Syncing", desc: "Real-time linked" },
                            { label: "Design System", value: "Antigrav", desc: "Material + Vercel" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-bg-card p-6 rounded-3xl border border-border-color shadow-sm flex flex-col justify-between hover:shadow-custom hover:-translate-y-1 transition-all duration-300">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">{stat.label}</h4>
                                <div className="text-3xl font-heading font-black text-text-primary mb-1">{stat.value}</div>
                                <p className="text-xs text-text-secondary/70 font-medium">{stat.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        <DashboardCard
                            href="/admindashboard/about"
                            icon={<FaUser size={24} />}
                            title="Profile & Identity"
                            desc="Update your bio, photo, and professional summary."
                            color="from-accent to-accent-2"
                        />
                        <DashboardCard
                            href="/admindashboard/resume"
                            icon={<FaFileAlt size={24} />}
                            title="Experience Stack"
                            desc="Manage your career timeline and technical skills."
                            color="from-accent to-accent-2"
                        />
                        <DashboardCard
                            href="/admindashboard/project"
                            icon={<FaProjectDiagram size={24} />}
                            title="Featured Works"
                            desc="Showcase your best projects with live previews."
                            color="from-accent to-accent-2"
                        />
                        <DashboardCard
                            href="/admindashboard/contact"
                            icon={<FaEnvelope size={24} />}
                            title="Contact Portal"
                            desc="Manage your email, location, and social reach."
                            color="from-accent to-accent-2"
                        />
                        <DashboardCard
                            href="/admindashboard/footer"
                            icon={<FaLink size={24} />}
                            title="Social Connect"
                            desc="Link your professional profiles and social media."
                            color="from-accent to-accent-2"
                        />
                        <DashboardCard
                            href="/admindashboard/cv"
                            icon={<FaFileUpload size={24} />}
                            title="CV Management"
                            desc="Upload and update your downloadable PDF resume."
                            color="from-accent to-accent-2"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

const SidebarLink = ({ href, icon, label, active }) => (
    <Link href={href} className={`flex items-center justify-center md:justify-start gap-4 p-3 md:px-4 rounded-xl transition-all duration-300 font-medium group ${active ? 'bg-accent/10 text-accent font-bold' : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'}`}>
        <span className={active ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary transition-colors'}>{icon}</span>
        <span className="hidden md:block">{label}</span>
    </Link>
);

const DashboardCard = ({ href, icon, title, desc, color }) => (
    <Link href={href} className="group h-full">
        <div className="bg-bg-card h-full p-8 rounded-[2rem] border border-border-color shadow-sm hover:shadow-custom hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 blur-3xl rounded-full transition-opacity duration-500`}></div>

            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-6 shadow-md shadow-accent/20 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 z-10`}>
                {icon}
            </div>

            <h3 className="text-xl font-heading font-black text-text-primary mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-accent-2 transition-all z-10">
                {title}
            </h3>
            <p className="text-text-secondary flex-1 mb-8 leading-relaxed font-medium z-10">
                {desc}
            </p>

            <div className="mt-auto flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-secondary group-hover:text-accent transition-colors z-10">
                <span className="border-b border-transparent group-hover:border-accent transition-all pb-0.5">Manage Segment</span>
                <div className="w-6 h-6 rounded-full bg-bg-primary flex items-center justify-center group-hover:bg-accent/10 transition-colors ml-auto">
                    <FaArrowLeft className="transform rotate-180 text-text-secondary group-hover:text-accent group-hover:translate-x-0.5 transition-all w-3 h-3" />
                </div>
            </div>
        </div>
    </Link>
)
