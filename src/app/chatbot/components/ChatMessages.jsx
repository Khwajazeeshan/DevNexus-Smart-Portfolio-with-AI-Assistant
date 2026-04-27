import React, { useState, useEffect } from "react";

const TypewriterText = ({ text, speed = 15 }) => {
    const [displayedText, setDisplayedText] = useState("");
    
    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setDisplayedText(text.substring(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(timer);
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);

    return <span>{displayedText}</span>;
};

const ChatMessages = ({ messages, loading, messagesEndRef }) => (
    <div className="space-y-4">
        {messages.map((msg, idx) => {
            const isLatestBotMessage = msg.from === "bot" && idx === messages.length - 1;
            
            return (
                <div
                    key={idx}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} animate-fadeInUp`}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                >
                    <div
                        className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm font-medium shadow-sm leading-relaxed ${
                            msg.from === "user"
                                ? "bg-accent text-white rounded-br-none"
                                : "bg-bg-card text-text-primary border border-border-color rounded-bl-none"
                        }`}
                    >
                        {isLatestBotMessage ? (
                            <TypewriterText text={msg.text} />
                        ) : (
                            msg.text
                        )}
                    </div>
                </div>
            );
        })}
        {loading && (
            <div className="flex justify-start animate-fadeInUp">
                <div className="bg-bg-card border border-border-color px-5 py-3 rounded-[1.2rem] rounded-bl-none flex gap-2 items-center shadow-sm">
                    <span className="text-accent font-black tracking-widest animate-pulse">...</span>
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-accent/40 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-accent/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1 h-1 bg-accent/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
    </div>
);

export default ChatMessages;