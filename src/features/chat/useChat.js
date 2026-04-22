import { useCallback, useEffect, useRef, useState } from 'react';
import { formatMessage } from './formatMessage';

const BOT_RESPONSES = [
  "That's interesting! Tell me more.",
  'I understand. How does that make you feel?',
  'Thanks for sharing that with me.',
  'I see what you mean.',
  "That's a great point!",
  "I'm here to help. What else would you like to discuss?",
];

const INITIAL_MESSAGES = [
  { id: 1, text: 'Welcome to React Chat App!', sender: 'bot', timestamp: new Date() },
  { id: 2, text: 'Type a message and press Enter to chat.', sender: 'bot', timestamp: new Date() },
];

/**
 * Chat state hook: holds the message list, tracks the input value and
 * exposes a send handler that appends a user message and a canned bot reply.
 *
 * @param {{initialMessages?: Array}} [options]
 */
export function useChat(options = {}) {
  const { initialMessages = INITIAL_MESSAGES } = options;

  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [messages]);

  const generateBotResponse = useCallback(() => {
    const responses = BOT_RESPONSES;
    return responses[Math.floor(Math.random() * responses.length)];
  }, []);

  const sendMessage = useCallback(
    (rawText) => {
      const text = typeof rawText === 'string' ? rawText.trim() : '';
      if (!text) return;

      setMessages((prev) => {
        const nextUser = { ...formatMessage(text, { sender: 'user' }), id: prev.length + 1 };
        const nextBot = {
          ...formatMessage(generateBotResponse(), { sender: 'bot' }),
          id: prev.length + 2,
        };
        return [...prev, nextUser, nextBot];
      });

      setInputText('');
    },
    [generateBotResponse]
  );

  const handleSendMessage = useCallback(
    (event) => {
      event?.preventDefault?.();
      if (inputText.trim() === '') return;
      sendMessage(inputText);
    },
    [inputText, sendMessage]
  );

  return {
    messages,
    inputText,
    setInputText,
    sendMessage,
    handleSendMessage,
    messagesEndRef,
  };
}

export default useChat;
