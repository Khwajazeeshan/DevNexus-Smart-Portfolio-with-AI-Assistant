import React from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({ onSend, disabled, value, onChange, children }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="relative flex-1 group">
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="w-full bg-bg-card border border-border-color rounded-2xl px-5 py-3.5 pr-14 text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-text-secondary/50"
                    onKeyDown={(e) => e.key === "Enter" && onSend(value)}
                    placeholder="Ask anything..."
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                    {children}
                </div>
            </div>
            
            <button
                onClick={() => onSend(value)}
                disabled={disabled || !value.trim()}
                className="w-12 h-12 bg-accent text-white rounded-2xl shadow-custom hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center group"
                title="Send"
                type="button"
            >
                <FaPaperPlane size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
        </div>
    );
};

export default ChatInput;
