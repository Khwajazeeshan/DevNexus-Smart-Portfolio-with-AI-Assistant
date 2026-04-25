"use client";
import React, { useState } from "react";
import About from "./Layouts/About/About";
import Resume from "./Layouts/Resume/Resume";
import Projects from "./Layouts/Project/Project";
import Contact from "./Layouts/Contact/Contact";
import Chatbot from "../chatbot/page";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Home({ sections, onReady }) {
  const [visibleSections, setVisibleSections] = useState(["About"]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const showNextSection = (next) => {
    setVisibleSections((prev) => !prev.includes(next) ? [...prev, next] : prev);
  };

  return (
    <main >
      <div >
        {visibleSections.includes("About") && (
          <About ref={sections.about} onComplete={() => showNextSection("Resume")} onReady={onReady} />
        )}
        {visibleSections.includes("Resume") && (
          <Resume ref={sections.resume} onComplete={() => showNextSection("Projects")} />
        )}
        {visibleSections.includes("Projects") && (
          <Projects ref={sections.projects} onComplete={() => showNextSection("Contact")} />
        )}
        {visibleSections.includes("Contact") && (
          <Contact ref={sections.contact} />
        )}
      </div>

      {/* Chatbot */}
      <div >
        <Chatbot open={isChatOpen} onToggle={toggleChat} />
      </div>
    </main>
  );
};

