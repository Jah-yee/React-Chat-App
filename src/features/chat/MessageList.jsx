import React from 'react';
import MessageBubble from '../../components/MessageBubble';

function MessageList({ messages = [] }) {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <MessageBubble key={message.id ?? index} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
