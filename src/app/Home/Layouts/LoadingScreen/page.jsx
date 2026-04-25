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
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary text-text-primary overflow-hidden">
      <div className="absolute w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[100px] animate-pulse" />
      
      <div className="relative flex flex-col items-center animate-fadeInUp">
        <div className="relative flex items-center justify-center w-40 h-40">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="74"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="2"
              className="text-border-color/50"
            />
            <circle
              cx="80"
              cy="80"
              r="74"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={464.96}
              strokeDashoffset={464.96 - (464.96 * progress) / 100}
              strokeLinecap="round"
              className="text-accent transition-all duration-300 drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]"
            />
          </svg>
          <div className="flex flex-col items-center animate-glowPulse bg-bg-card/50 backdrop-blur-sm rounded-full w-28 h-28 justify-center shadow-custom">
            <span className="text-3xl font-heading font-bold text-text-primary tracking-tighter">
              {Math.round(progress)}<span className="text-xl text-accent">%</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-text-secondary mt-1 font-medium">
              Loading
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 flex flex-col items-center animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-2xl font-heading font-bold tracking-tight bg-bg-card/30 backdrop-blur-md px-6 py-2 rounded-2xl border border-white/10 dark:border-white/5 shadow-custom animate-glowPulse">
          Khawaja <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">Zeeshan</span>
        </h2>
        <div className="flex items-center gap-4 mt-6 w-64">
          <div className="h-1 w-full bg-border-color rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent to-accent-2 transition-all duration-300 ease-out rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
