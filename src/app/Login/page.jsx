"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaLock, FaSignInAlt, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (password.length < 5) {
            toast.error("Password at least 5 characters");
            return;
        }
        setLoading(true);

        try {
            const res = await axios.post("/api/login", {
                password,
            }, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                router.push("/admindashboard");
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error("Server Error");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !loading) {
            handleLogin();
        }
    };

    return (
        <div className="relative min-h-screen bg-bg-primary flex items-center justify-center p-4 overflow-hidden">
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ className: 'font-body rounded-2xl bg-bg-card text-text-primary shadow-custom border border-border-color' }} />

            {/* Background Decoration: Animated floating ORBS */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[100px] opacity-70 animate-float" style={{ animationDuration: '8s' }}></div>
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-2/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[100px] opacity-70 animate-float" style={{ animationDelay: '2s', animationDuration: '9s' }}></div>
            </div>

            <Link href="/" className="absolute top-8 left-8 z-20 flex items-center gap-2 text-text-secondary hover:text-accent font-medium transition-all group px-4 py-2 bg-bg-card/50 backdrop-blur-md rounded-xl border border-white/10 shadow-sm">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span>Return to Portfolio</span>
            </Link>

            <div className="relative z-10 w-full max-w-md animate-fadeInUp">
                {/* Centered Glassmorphism Card */}
                <div className="backdrop-blur-xl bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/10 p-10 rounded-[2rem] shadow-[0_8px_32px_rgba(31,38,135,0.15)] flex flex-col items-center text-center group transition-all duration-500 hover:shadow-[0_8px_40px_rgba(79,70,229,0.2)] hover:border-accent/30">
                    <div className="w-20 h-20  rounded-3xl flex items-center justify-center text-white shadow-custom mb-8 transform group-hover:rotate-6 transition-transform duration-500">
                        <img 
                            src="/logo-2.png" 
                            alt="Khawaja Zeeshan Logo" 
                            className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
                        />
                    </div>
                    <h2 className="text-3xl font-heading font-black text-text-primary mb-3">Admin Portal</h2>
                    <p className="text-text-secondary font-medium mb-8">Authenticate to access management console</p>

                    <div className="w-full space-y-6">
                        <div className="relative group/input">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within/input:text-accent transition-colors">
                                <FaLock size={18} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter Access Code"
                                className="w-full pl-12 pr-12 py-4 bg-bg-card/80 border border-white/20 dark:border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-text-primary placeholder:text-text-secondary/50 font-medium"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent transition-colors outline-none"
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-accent to-accent-2 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-custom disabled:opacity-70 disabled:cursor-not-allowed group/btn"
                        >
                            {loading ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    <span>Authenticating...</span>
                                </div>
                            ) : (
                                <>
                                    <span>Sign into Dashboard</span>
                                    <FaSignInAlt className="group-hover/btn:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>

                    <div className="mt-8 border-t border-border-color/30 w-full pt-6">
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-text-secondary/60">
                            Shielded Authentication System
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


