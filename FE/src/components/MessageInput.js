import React, { useState } from 'react';

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t flex">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow p-2 border rounded-l-lg"
      />
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;