import React from "react";

const ChatInput = ({ onSend, disabled, value, onChange, children }) => {
    return (
        <div className="flex items-center gap-2 w-full">
            <div className="flex-1 relative">
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="w-full bg-slate-800 border border-white/5 rounded-2xl py-3 pl-4 pr-12 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-brand-primary/50 transition-all"
                    onKeyDown={(e) => e.key === "Enter" && onSend(value)}
                    placeholder="Type your message..."
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                    {children}
                </div>
            </div>
            
            <button
                onClick={() => onSend(value)}
                disabled={disabled}
                className="w-12 h-12 rounded-full bg-brand-primary hover:bg-violet-600 text-white flex items-center justify-center transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-primary/20"
                title="Send"
                type="button"
            >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 21l21-9-21-9v7l15 2-15 2z" />
                </svg>
            </button>
        </div>
    );
};

export default ChatInput;

