import React, { useState, useRef, useEffect } from "react";

const VoiceChatButton = ({ setInputValue }) => {
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef(null);

    // Initialize speech recognition
    useEffect(() => {
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
    }, []);

    const handleVoiceClick = () => {
        if (!recognitionRef.current) return;
        listening ? recognitionRef.current.stop() : recognitionRef.current.start();
    };

    return (
        <button
            onClick={handleVoiceClick}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                listening 
                ? "bg-brand-secondary text-white scale-110 shadow-lg shadow-brand-secondary/40" 
                : "text-slate-400 hover:text-white"
            }`}
            title={listening ? "Stop voice chat" : "Start voice chat"}
        >
            {listening ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a1 1 0 1 1 2 0 7 7 0 0 1-6 6.92V21a1 1 0 1 1-2 0v-2.08A7 7 0 0 1 5 12a1 1 0 1 1 2 0 5 5 0 0 0 10 0z" />
                </svg>
            )}
        </button>
    );
};

export default VoiceChatButton;

