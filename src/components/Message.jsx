import React from 'react';

const Message = ({ message, isUser }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message ${isUser ? 'user' : 'bot'}`}>
      <div className="message-header">
        <span className="sender-name">{isUser ? 'You' : 'ChatBot'}</span>
        <span className="timestamp">{formatTime(message.timestamp)}</span>
      </div>
      <div className="message-text">{message.text}</div>
    </div>
  );
};

export default Message;