import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to React Chat App!', sender: 'bot', timestamp: new Date() },
    { id: 2, text: 'Type a message and press Enter to chat.', sender: 'bot', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [username] = useState('User');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(inputText.trim()),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  const generateBotResponse = (userMessage) => {
    const responses = [
      'That\'s interesting! Tell me more.',
      'I understand. How does that make you feel?',
      'Thanks for sharing that with me.',
      'I see what you mean.',
      'That\'s a great point!',
      'I\'m here to help. What else would you like to discuss?'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Chat App</h1>
        <p>Welcome to the open source chat application!</p>
      </header>
      
      <div className="chat-container">
        <div className="messages-container">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-header">
                <span className="sender-name">
                  {message.sender === 'user' ? username : 'ChatBot'}
                </span>
                <span className="timestamp">{formatTime(message.timestamp)}</span>
              </div>
              <div className="message-text">{message.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSendMessage} className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            className="message-input"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;