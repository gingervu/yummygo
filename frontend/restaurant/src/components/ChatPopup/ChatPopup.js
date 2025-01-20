import React, { useState } from "react";
import "./ChatPopup.css";

const ChatPopup = ({ isOpen, toggleChat }) => {
  const [message, setMessage] = useState(""); // state to hold the chat message

  const handleMessageChange = (e) => {
    setMessage(e.target.value); // Update message state when typing
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sent message: ", message); // Log the message or send it to a server
      setMessage(""); // Clear message input after sending
    }
  };

  return (
    <>
      {isOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <h4>Nhắn tin</h4>
            <button className="close-btn" onClick={toggleChat}>X</button>
          </div>
          <div className="chat-body">
            <div className="messages">
              {/* You can dynamically display messages here */}
            </div>
            <textarea
              value={message}
              onChange={handleMessageChange}
              placeholder="Type a message..."
              rows="4"
            ></textarea>
          </div>
          <div className="chat-footer">
            <button onClick={handleSendMessage}>Gửi</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPopup;
