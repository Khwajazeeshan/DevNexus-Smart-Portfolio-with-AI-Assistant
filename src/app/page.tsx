"use client";
import { useRef, useState } from "react";
import HomeComponent from "./Home/Home";
import Navbar from "./Home/Layouts/Navbar/page";
import Footer from "./Home/Layouts/Footer/page";
import LoadingScreen from "./Home/Layouts/LoadingScreen/page";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const sections = {
    about: useRef<HTMLDivElement>(null),
    resume: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
    footer: useRef<HTMLDivElement>(null),
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <Navbar sections={sections} />
        <HomeComponent sections={sections} />
        <Footer />
      </div>
    </>
  );
}