"use client";
import React from 'react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { FaUser, FaFileAlt, FaProjectDiagram, FaEnvelope, FaLink, FaArrowLeft, FaFileUpload } from "react-icons/fa";

export default function Admin() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden selection:bg-brand-primary/30">
            <Toaster position="top-center" />
            
            {/* Ambient background decorative elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                    <div className="animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-brand-primary/20">
                                Management Console
                            </span>
                            <div className="h-px w-12 bg-white/10"></div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
                            Dashboard <span className="text-brand-primary">.</span>
                        </h1>
                        <p className="text-slate-400 text-lg font-medium opacity-80">Welcome back. Manage your digital world.</p>
                    </div>

                    <Link href="/" className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-primary/30 transition-all group backdrop-blur-xl animate-fade-in">
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-slate-400 text-sm" />
                        <span className="font-bold text-sm text-white">Live Portfolio</span>
                    </Link>
                </header>

                {/* Statistics Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-fade-in-delayed">
                    {[
                        { label: "Content Sections", value: "06", desc: "Active modules" },
                        { label: "System Status", value: "Optimal", desc: "No issues detected" },
                        { label: "Database", value: "Syncing", desc: "Real-time updates" },
                        { label: "Last Patch", value: "2.1.0", desc: "Stability release" },
                    ].map((stat, i) => (
                        <div key={i} className="glass p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">{stat.label}</h4>
                            <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                            <p className="text-slate-600 text-[10px] font-semibold">{stat.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <DashboardCard 
                        href="/admindashboard/about"
                        icon={<FaUser />}
                        title="Profile & Identity"
                        desc="Update your bio, photo, and professional summary."
                        color="from-blue-600 to-indigo-600"
                        glow="shadow-blue-500/20"
                    />

                    <DashboardCard 
                        href="/admindashboard/resume"
                        icon={<FaFileAlt />}
                        title="Experience Stack"
                        desc="Manage your career timeline and technical skills."
                        color="from-orange-500 to-amber-500"
                        glow="shadow-orange-500/20"
                    />

                    <DashboardCard 
                        href="/admindashboard/project"
                        icon={<FaProjectDiagram />}
                        title="Featured Works"
                        desc="Showcase your best projects with live previews."
                        color="from-purple-600 to-violet-600"
                        glow="shadow-purple-500/20"
                    />

                    <DashboardCard 
                        href="/admindashboard/contact"
                        icon={<FaEnvelope />}
                        title="Contact Portal"
                        desc="Manage your email, location, and social reach."
                        color="from-emerald-500 to-teal-500"
                        glow="shadow-emerald-500/20"
                    />

                    <DashboardCard 
                        href="/admindashboard/footer"
                        icon={<FaLink />}
                        title="Social Connect"
                        desc="Link your professional profiles and social media."
                        color="from-pink-500 to-rose-500"
                        glow="shadow-pink-500/20"
                    />

                    <DashboardCard 
                        href="/admindashboard/cv"
                        icon={<FaFileUpload />}
                        title="CV Management"
                        desc="Upload and update your downloadable PDF resume."
                        color="from-cyan-500 to-sky-500"
                        glow="shadow-cyan-500/20"
                    />
                </div>

                {/* Footer Insight */}
                <div className="mt-20 p-10 glass rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-primary/10 transition-colors"></div>
                    <div className="md:max-w-xl text-center md:text-left relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-3">Seamless Synchronization</h3>
                        <p className="text-slate-400 font-medium leading-relaxed">
                            Your dashboard is directly connected to your portfolio's public view. 
                            Every change you confirm here is pushed instantly to your global audience.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(n => (
                                <div key={n} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                    0{n}
                                </div>
                            ))}
                        </div>
                        <div className="h-8 w-px bg-white/10 hidden md:block"></div>
                        <div className="text-emerald-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                             System Active
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const DashboardCard = ({ href, icon, title, desc, color, glow }) => (
    <Link href={href} className="group block h-full">
        <div className="h-full glass-hover p-10 rounded-[2.5rem] border border-white/10 transition-all duration-500 flex flex-col relative overflow-hidden active:scale-[0.98]">
            {/* Subtle inner gradient shadow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
            
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} ${glow} flex items-center justify-center text-white text-2xl mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-xl relative z-10`}>
                {icon}
            </div>
            
            <h3 className="text-2xl font-black text-white mb-3 tracking-tight relative z-10">
                {title}
            </h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8 relative z-10">
                {desc}
            </p>
            
            <div className="mt-auto flex items-center gap-2 text-xs font-bold text-white/40 group-hover:text-brand-primary transition-all relative z-10">
                <span className="uppercase tracking-widest">Update Module</span>
                <FaArrowLeft className="rotate-180 text-[10px] group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    </Link>
)

