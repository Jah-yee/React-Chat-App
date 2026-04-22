import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import ChatWindow from '../src/features/chat/ChatWindow';
import { formatMessage, formatTime } from '../src/features/chat/formatMessage';

describe('ChatWindow', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('renders the chat window container', () => {
    const root = createRoot(container);
    act(() => {
      root.render(<ChatWindow />);
    });
    expect(container.querySelector('.chat-window')).not.toBeNull();
  });
});

describe('formatMessage', () => {
  it('trims the text and defaults to the user sender', () => {
    const message = formatMessage('  hello  ');
    expect(message.text).toBe('hello');
    expect(message.sender).toBe('user');
    expect(message.timestamp).toBeInstanceOf(Date);
  });

  it('keeps an explicit sender and timestamp', () => {
    const timestamp = new Date('2026-10-22T00:00:00Z');
    const message = formatMessage('hi', { sender: 'bot', timestamp });
    expect(message.sender).toBe('bot');
    expect(message.timestamp).toBe(timestamp);
  });
});

describe('formatTime', () => {
  it('returns an empty string for an invalid date', () => {
    expect(formatTime('not-a-date')).toBe('');
  });

  it('returns a non-empty time string for a valid date', () => {
    expect(formatTime(new Date('2026-10-22T00:00:00Z')).length).toBeGreaterThan(0);
  });
});
