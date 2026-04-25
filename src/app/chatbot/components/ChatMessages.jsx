import React from "react";

const ChatMessages = ({ messages, loading, messagesEndRef }) => (
    <div className="space-y-4">
        {messages.map((msg, idx) => (
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
                    {msg.text}
                </div>
            </div>
        ))}
        {loading && (
            <div className="flex justify-start animate-fadeInUp">
                <div className="bg-bg-card border border-border-color px-5 py-3 rounded-[1.2rem] rounded-bl-none flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
    </div>
);

export default ChatMessages;