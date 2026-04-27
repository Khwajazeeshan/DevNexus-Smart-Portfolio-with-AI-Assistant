"use client"
import React from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

const ChatbotButton = ({ onClick, isOpen }) => (
    <button
        className={`fixed bottom-4 right-2 z-[999] w-16 h-16 rounded-full flex items-center justify-center shadow-custom transition-all duration-500 hover:scale-110 active:scale-95 group overflow-hidden animate-float ${
            isOpen 
            ? "bg-bg-card border border-border-color text-text-primary rotate-180" 
            : "bg-accent text-white"
        }`}
        onClick={onClick}
        title={isOpen ? "Close Chat" : "Chat with AI Assistant!"}
    >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className={` transition-transform duration-500`}>
            {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
        </span>
    </button>
);

export default ChatbotButton;
