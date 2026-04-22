// Helpers for turning raw chat input into the message objects that the UI
// renders. These live in their own module so both the App shell and any
// future feature can build messages in exactly the same way.

const DEFAULT_SENDER = 'user';

/**
 * Build a message object from raw text.
 *
 * @param {string} text the raw text typed by the sender
 * @param {object} [options]
 * @param {string} [options.sender] 'user' or 'bot'
 * @param {number|Date} [options.timestamp] defaults to now
 * @returns {{id: number|null, text: string, sender: string, timestamp: Date}}
 */
export function formatMessage(text, options = {}) {
  const { sender = DEFAULT_SENDER, timestamp = new Date() } = options;
  const trimmed = typeof text === 'string' ? text.trim() : '';

  return {
    id: null,
    text: trimmed,
    sender,
    timestamp: timestamp instanceof Date ? timestamp : new Date(timestamp),
  };
}

/**
 * Format a timestamp for display, e.g. "09:41".
 *
 * @param {Date|string|number} date
 * @returns {string}
 */
export function formatTime(date) {
  const value = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(value.getTime())) return '';
  return value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default formatMessage;
