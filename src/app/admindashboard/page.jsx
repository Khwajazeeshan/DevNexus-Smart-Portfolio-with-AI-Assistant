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
            <aside className="fixed inset-y-0 left-0 w-20 md:relative md:w-72 bg-bg-card backdrop-blur-xl border-r border-border-color flex flex-col justify-between py-6 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30 transition-all duration-500 ease-in-out">
                <div>
                    <div className="px-4 md:px-8 mb-10 flex items-center justify-center md:justify-start gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center text-white shadow-lg shadow-accent/20 font-bold overflow-hidden p-2">
                            <img
                                src="/logo-1.png"
                                alt="Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="hidden md:block">
                            <h2 className="font-heading font-black text-lg tracking-tight leading-none text-text-primary">
                                Khawaja<span className="text-accent">.</span>
                            </h2>
                            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mt-1">Terminal</p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-1.5 px-3 md:px-6">
                        <SidebarLink href="/admindashboard" icon={<FaHome size={20} />} label="Overview" active />
                        <div className="h-px w-full bg-border-color/50 my-4"></div>
                        <SidebarLink href="/admindashboard/about" icon={<FaUser size={18} />} label="Identity" />
                        <SidebarLink href="/admindashboard/resume" icon={<FaFileAlt size={18} />} label="Career" />
                        <SidebarLink href="/admindashboard/project" icon={<FaProjectDiagram size={18} />} label="Projects" />
                        <SidebarLink href="/admindashboard/contact" icon={<FaEnvelope size={18} />} label="Portal" />
                        <SidebarLink href="/admindashboard/footer" icon={<FaLink size={18} />} label="Social" />
                        <SidebarLink href="/admindashboard/cv" icon={<FaFileUpload size={18} />} label="Documents" />
                    </nav>
                </div>

                <div className="px-3 md:px-6 flex flex-col items-center md:items-start gap-4">
                    <div className="w-full flex justify-center md:justify-start">
                        <ThemeToggle />
                    </div>
                    <Link href="/" className="flex items-center justify-center md:justify-start gap-3 w-full p-3.5 rounded-2xl bg-bg-primary border border-border-color hover:border-accent/40 hover:text-accent transition-all group shadow-sm">
                        <FaArrowLeft className="text-text-secondary group-hover:text-accent transition-colors group-hover:-translate-x-0.5" />
                        <span className="hidden md:block font-bold text-sm text-text-secondary group-hover:text-accent transition-colors">Return Site</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-20 md:ml-0 overflow-y-auto z-10 relative">
                <div className="max-w-7xl mx-auto p-5 md:p-8 lg:p-12 space-y-10 md:space-y-12 pb-24">
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-border-color animate-fadeInUp">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></div>
                                <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-accent">Core Administrative Hub</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter text-text-primary">
                                Intelligence<span className="text-accent">.</span>
                            </h1>
                            <p className="text-text-secondary text-base md:text-lg font-medium max-w-xl">Synchronize your digital footprint and manage cross-platform identifiers from a unified interface.</p>
                        </div>
                        <Link href="/" className="group flex items-center gap-3 px-6 py-3.5 bg-bg-card/50 backdrop-blur-xl rounded-2xl border border-border-color shadow-sm hover:border-accent/40 transition-all">
                            <FaArrowLeft className="text-text-secondary group-hover:text-accent transition-all group-hover:-translate-x-1" />
                            <span className="text-sm font-bold text-text-secondary group-hover:text-accent transition-colors">Portfolio Preview</span>
                        </Link>
                    </header>

                    {/* Statistics Overview */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                        {[
                            { label: "Active Nodes", value: "06", desc: "Operational segments", icon: <FaProjectDiagram /> },
                            { label: "System Latency", value: "Optimal", desc: "Response time < 20ms", icon: <FaHome /> },
                            { label: "Core Sync", value: "Enabled", desc: "Live-linked cloud", icon: <FaLink /> },
                            { label: "Design Spec", value: "Antigrav", desc: "v2.0.4 - Premium", icon: <FaFileUpload /> },
                        ].map((stat, i) => (
                            <div key={i} className="bg-bg-card p-6 rounded-[2rem] border border-border-color shadow-sm flex flex-col justify-between hover:shadow-custom hover:border-accent/20 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{stat.label}</h4>
                                    <div className="p-2 rounded-lg bg-bg-primary text-accent/30 group-hover:text-accent transition-colors">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-3xl font-heading font-black text-text-primary mb-1 tracking-tight">{stat.value}</div>
                                    <p className="text-[10px] text-text-secondary/60 font-bold uppercase tracking-wider">{stat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        <DashboardCard
                            href="/admindashboard/about"
                            icon={<FaUser size={24} />}
                            title="Profile & Identity"
                            desc="Configure your public persona, professional bio, and biometric visual assets."
                            color="from-blue-500 to-indigo-600"
                        />
                        <DashboardCard
                            href="/admindashboard/resume"
                            icon={<FaFileAlt size={24} />}
                            title="Experience Stack"
                            desc="Optimize your career timeline, technical arsenal, and educational benchmarks."
                            color="from-purple-500 to-pink-600"
                        />
                        <DashboardCard
                            href="/admindashboard/project"
                            icon={<FaProjectDiagram size={24} />}
                            title="Project Repository"
                            desc="Display your engineered solutions with live deployment links and source code."
                            color="from-emerald-500 to-teal-600"
                        />
                        <DashboardCard
                            href="/admindashboard/contact"
                            icon={<FaEnvelope size={24} />}
                            title="Contact Portal"
                            desc="Manage communication nodes, geographic coordinates, and voice channels."
                            color="from-orange-500 to-red-600"
                        />
                        <DashboardCard
                            href="/admindashboard/footer"
                            icon={<FaLink size={24} />}
                            title="Social Ecosystem"
                            desc="Initialize and update cross-platform identifiers and social networking links."
                            color="from-cyan-500 to-blue-600"
                        />
                        <DashboardCard
                            href="/admindashboard/cv"
                            icon={<FaFileUpload size={24} />}
                            title="Document Control"
                            desc="Upload and maintain downloadable professional artifacts and portfolio CVs."
                            color="from-gray-700 to-black"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

const SidebarLink = ({ href, icon, label, active }) => (
    <Link href={href} className={`flex items-center justify-center md:justify-start gap-4 p-3.5 md:px-5 rounded-2xl transition-all duration-300 font-bold text-sm group ${active ? 'bg-accent text-white shadow-lg shadow-accent/25' : 'text-text-secondary hover:bg-bg-primary hover:text-text-primary'}`}>
        <span className={`${active ? 'text-white' : 'text-text-secondary group-hover:text-accent'} transition-colors`}>{icon}</span>
        <span className="hidden md:block truncate">{label}</span>
    </Link>
);

const DashboardCard = ({ href, icon, title, desc, color }) => (
    <Link href={href} className="group flex flex-col h-full min-w-[280px]">
        <div className="bg-bg-card h-full p-8 rounded-[2.5rem] border border-border-color shadow-sm hover:shadow-custom hover:border-accent/20 hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col relative overflow-hidden">
            <div className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 blur-3xl rounded-full transition-all duration-700`}></div>

            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-8 shadow-lg shadow-accent/10 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 z-10`}>
                {icon}
            </div>

            <h3 className="text-xl md:text-2xl font-heading font-black text-text-primary mb-3 transition-all z-10 group-hover:translate-x-1">
                {title}
            </h3>
            <p className="text-text-secondary flex-1 mb-10 leading-relaxed font-medium text-sm md:text-base z-10 group-hover:text-text-primary/80 transition-colors">
                {desc}
            </p>

            <div className="mt-auto flex items-center justify-between z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">Initialize Management</span>
                <div className="w-10 h-10 rounded-xl bg-bg-primary border border-border-color flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-500 ml-auto group-hover:shadow-lg group-hover:shadow-accent/30">
                    <FaArrowLeft className="transform rotate-180 text-text-secondary group-hover:text-white transition-all w-4 h-4" />
                </div>
            </div>
        </div>
    </Link>
);
