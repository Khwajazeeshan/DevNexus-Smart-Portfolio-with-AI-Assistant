"use client";
import React, { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete, isReady }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          if (isReady) {
            clearInterval(timer);
            setTimeout(onComplete, 500);
            return 100;
          }
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete, isReady]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center w-48 h-48">
        {/* Animated Background Ring */}
        <div className="absolute inset-0 border-4 border-white/5 rounded-full" />
        
        {/* Progress Ring */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={552.92} /* 2 * PI * r */
            strokeDashoffset={552.92 - (552.92 * progress) / 100}
            className="text-brand-primary transition-all duration-300 ease-out shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-black text-white tracking-tighter">
            {Math.round(progress)}%
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 mt-1">
            Loading
          </span>
        </div>
      </div>

      {/* Brand Label */}
      <div className="mt-12 text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-white tracking-widest uppercase">
          Khawaja <span className="text-brand-secondary">Zeeshan</span>
        </h2>
        <div className="mt-2 flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
          <span className="text-xs text-slate-500 font-medium uppercase tracking-[0.2em]">
            Porfolio Experience
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
