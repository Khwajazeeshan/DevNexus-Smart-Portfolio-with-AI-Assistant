"use client"
import React, { useState, useRef, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import VoiceChatButton from "./VoiceChatButton";
import { sendMessageToBot } from "../chatbotAPI/chatbotAPI";
import { FaRobot, FaTimes } from "react-icons/fa";

const ChatbotContainer = ({ onClose }) => {
    const [userName, setUserName] = useState("User");

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await fetch("/api/about");
                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.data && data.data.name) {
                        const name = data.data.name.split(" ")[0]; 
                        setUserName(name);
                    }
                }
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };
        fetchUserName();
    }, []);

    const [messages, setMessages] = useState([
        { from: "bot", text: `👋 Hi, How can I help you today?` }
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
        <div className="fixed bottom-28 right-8 z-[998] w-[90vw] sm:w-[400px] h-[600px] max-h-[70vh] bg-bg-card border border-border-color rounded-[2rem] shadow-custom flex flex-col overflow-hidden animate-fadeInUp backdrop-blur-xl bg-opacity-95">
            {/* Header */}
            <div className="p-6 bg-accent text-white flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                        <FaRobot size={20} />
                    </div>
                    <div>
                        <h3 className="font-heading font-bold tracking-wide">AI Assistant</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-[10px] font-bold uppercase tracking-tighter opacity-80">Online</span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <FaTimes size={20} />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <ChatMessages
                    messages={messages}
                    loading={loading}
                    messagesEndRef={messagesEndRef}
                />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-bg-primary/50 border-t border-border-color">
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
