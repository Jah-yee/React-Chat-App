import React from 'react';
import ChatInput from '../../components/ChatINput';
import MessageList from './MessageList';
import { useChat } from './useChat';

function ChatWindow() {
  const { messages, sendMessage, messagesEndRef } = useChat();

  return (
    <div className="chat-window">
      <MessageList messages={messages} />
      <div ref={messagesEndRef} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}

export default ChatWindow;
