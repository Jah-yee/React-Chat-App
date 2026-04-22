import React, { useState } from 'react';

function ChatInput({ onSend }) {
  const [text, setText] = useState('');

  return (
    <form
      className="chat-input"
      onSubmit={(e) => {
        e.preventDefault();
        if (text.trim() && onSend) onSend(text.trim());
        setText('');
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
