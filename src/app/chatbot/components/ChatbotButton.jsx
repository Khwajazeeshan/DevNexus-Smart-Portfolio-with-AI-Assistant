"use client"
import React from "react";

const ChatbotButton = ({ onClick, isOpen }) => (
    <button
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 active:scale-95 ${
            isOpen 
            ? "bg-slate-800 rotate-90" 
            : "bg-gradient-to-tr from-brand-primary to-brand-secondary hover:scale-110"
        }`}
        onClick={onClick}
        title={isOpen ? "Close Chat" : "Chat with us!"}
    >
        <i className={`fas ${isOpen ? "fa-times" : "fa-comments"} text-xl`}></i>
    </button>
);


export default ChatbotButton;
