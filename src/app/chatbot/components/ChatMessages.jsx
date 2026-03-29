import React from "react";

const ChatMessages = ({ messages, loading, messagesEndRef }) => (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-custom">
        {messages.map((msg, idx) => (
            <div
                key={idx}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start animate-fade-in"}`}
            >
                <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed font-medium shadow-sm transition-all whitespace-pre-line break-words ${
                        msg.from === "user" 
                        ? "bg-brand-primary text-white rounded-br-none" 
                        : "bg-slate-800 text-slate-200 rounded-bl-none border border-white/5"
                    }`}
                >
                    {msg.text}
                </div>
            </div>
        ))}
        {loading && (
            <div className="flex justify-start animate-fade-in">
                <div className="bg-slate-800 text-slate-200 px-4 py-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
    </div>
);

export default ChatMessages;