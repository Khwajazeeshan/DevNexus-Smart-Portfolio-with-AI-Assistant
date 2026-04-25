import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";

const VoiceChatButton = ({ setInputValue }) => {
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef(null);

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = "en-US";
        recognitionRef.current.interimResults = false;
        recognitionRef.current.maxAlternatives = 1;

        recognitionRef.current.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (setInputValue) setInputValue(prev => (prev ? prev + " " : "") + transcript);
        };

        recognitionRef.current.onstart = () => setListening(true);
        recognitionRef.current.onerror = () => setListening(false);
        recognitionRef.current.onend = () => setTimeout(() => setListening(false), 100);

        return () => recognitionRef.current?.abort();
    }, [setInputValue]);

    const handleVoiceClick = () => {
        if (!recognitionRef.current) return;
        listening ? recognitionRef.current.stop() : recognitionRef.current.start();
    };

    return (
        <button
            onClick={handleVoiceClick}
            className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
                listening 
                ? "bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]" 
                : "text-text-secondary hover:text-accent hover:bg-bg-primary/50"
            }`}
            title={listening ? "Stop Listening" : "Start Voice Typing"}
            type="button"
        >
            {listening ? (
                <FaStop size={14} />
            ) : (
                <FaMicrophone size={18} />
            )}
        </button>
    );
};

export default VoiceChatButton;
