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
        <div className="min-h-screen bg-bg-dark flex items-center justify-center p-6 relative overflow-hidden">
            <Toaster position="top-center" reverseOrder={false} />

            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-secondary/10 rounded-full blur-[120px]"></div>
            </div>

            <Link href="/" className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 group transition-colors">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium text-sm">Back to Portfolio</span>
            </Link>

            <div className="w-full max-w-md animate-fade-in relative z-10">
                <div className="glass p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
                    <div className="flex flex-col items-center text-center mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-lg shadow-brand-primary/20 mb-6 group">
                            <FaLock size={24} className="group-hover:rotate-12 transition-transform" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Admin Panel</h2>
                        <p className="text-slate-400 text-sm">Enter your secure password to proceed</p>
                    </div>

                    <div className="space-y-6">
                        <div className="relative group flex items-center">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-primary transition-colors">
                                <FaLock size={16} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter Access Code"
                                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/10 transition-all"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full bg-brand-primary hover:bg-violet-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-brand-primary/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden relative group"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Authenticating...</span>
                                </div>
                            ) : (
                                <>
                                    <span>Sign into Dashboard</span>
                                    <FaSignInAlt className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-600 font-medium">SHIELDED AUTHENTICATION SYSTEM</p>
                    </div>
                </div>
            </div>
        </div>
    );
};



