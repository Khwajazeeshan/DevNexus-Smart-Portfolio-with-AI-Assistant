"use client"
import React, { useState, useRef, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import VoiceChatButton from "./VoiceChatButton";
import { sendMessageToBot } from "../chatbotAPI/chatbotAPI";


const ChatbotContainer = ({ onClose }) => {
    const [userName, setUserName] = useState("Zeeshan");

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await fetch("/api/about");
                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.data && data.data.name) {
                        const name = data.data.name.split(" ")[0]; // Use first name
                        setUserName(name);
                        setMessages([{ from: "bot", text: `👋 Hi, How can I help you ?` }]);
                    }
                }
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };
        fetchUserName();
    }, []);

    const [messages, setMessages] = useState([
        { from: "bot", text: `👋 Hi, How can I help you ?` }
    ]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (msg) => {
        if (!msg.trim()) return;
        setMessages((prev) => [...prev, { from: "user", text: msg }]);
        setInputValue("");
        setLoading(true);
        try {
            const res = await sendMessageToBot(msg);
            if (res?.error) {
                setMessages((prev) => [
                    ...prev,
                    { from: "bot", text: `⚠️ ${res.error}` }
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { from: "bot", text: res?.reply || "I'm sorry, I couldn't process that. Please try again later." }
                ]);
            }
        } catch (error) {
            console.error("Frontend HandleSend Error:", error);
            setMessages((prev) => [
                ...prev,
                { from: "bot", text: "Oops! Unexpected error occurred." }
            ]);
        }
        setLoading(false);
    };

    return (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] max-h-[70vh] glass rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col z-[70] animate-slide-up">
            <div className="p-4 bg-gradient-to-r from-brand-primary to-brand-secondary flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <i className="fas fa-robot text-sm"></i>
                    </div>
                    <span className="font-bold text-sm tracking-tight">Personal Assistant</span>
                </div>
                <button className="w-8 h-8 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col bg-slate-900/95">
                <ChatMessages
                    messages={messages}
                    loading={loading}
                    messagesEndRef={messagesEndRef}
                />
            </div>

            <div className="p-4 bg-slate-900/50 border-t border-white/5">
                <ChatInput
                    onSend={handleSend}
                    disabled={loading}
                    value={inputValue || ""}
                    onChange={(e) => setInputValue(e.target.value || "")}
                >
                    <VoiceChatButton
                        setInputValue={setInputValue}
                        getInputValue={() => inputValue || ""}
                    />
                </ChatInput>
            </div>
        </div>
    );
};

export default ChatbotContainer;
