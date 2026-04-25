"use client";
import { useRef, useState } from "react";
import HomeComponent from "./Home/Home";
import Navbar from "./Home/Layouts/Navbar/page";
import Footer from "./Home/Layouts/Footer/page";
import LoadingScreen from "./Home/Layouts/LoadingScreen/page";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHomeReady, setIsHomeReady] = useState(false);

  const sections = {
    about: useRef<HTMLDivElement>(null),
    resume: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
    footer: useRef<HTMLDivElement>(null),
  };

  return (
    <>
      {isLoading && (
        <LoadingScreen 
          isReady={isHomeReady} 
          onComplete={() => setIsLoading(false)} 
        />
      )}
      <div 
        className={`transition-opacity duration-500 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Navbar sections={sections} />
        {/* @ts-ignore */}
        <HomeComponent sections={sections} onReady={() => setIsHomeReady(true)} />
        <Footer />
      </div>
    </>
  );
}