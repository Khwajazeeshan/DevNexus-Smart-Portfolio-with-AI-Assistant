import React from "react";
import ChatbotButton from "./components/ChatbotButton";
import ChatbotContainer from "./components/ChatbotContainer";
// import "./styles/chatbot.css";

const Chatbot = ({ open, onToggle }) => {
  return (
    <>
      <ChatbotButton onClick={onToggle} isOpen={open} />
      {open && <ChatbotContainer onClose={onToggle} />}
    </>
  );
};

export default Chatbot;
