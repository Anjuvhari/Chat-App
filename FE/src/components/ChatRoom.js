import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import SocketService from '../services/socketService';
import Login from './Login';
import MessageInput from './MessageInput';

function ChatRoom() {
  const { user, login } = useAuth();
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const socket = SocketService.connect();

    SocketService.onMessage((msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    SocketService.onUserList((users) => {
      setUserList(users);
    });

    return () => {
      SocketService.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogin = (username) => {
    login(username);
    SocketService.login(username);
  };

  const sendMessage = (text) => {
    if (user && text.trim()) {
      const messageData = {
        username: user.username,
        text,
        timestamp: new Date().toISOString()
      };
      SocketService.sendMessage(messageData);
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar for user list */}
      <div className="w-64 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Online Users</h2>
        <ul>
          {userList.map((username) => (
            <li key={username} className="p-2 bg-gray-100 rounded mb-2">
              {username}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col">
        <div className="flex-grow overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-2 p-2 rounded ${
                msg.type === 'system' 
                  ? 'bg-gray-200 text-center' 
                  : msg.username === user.username 
                  ? 'bg-blue-100 self-end text-right ml-auto' 
                  : 'bg-gray-100'
              }`}
            >
              {msg.type !== 'system' && (
                <div className="font-bold text-sm">{msg.username}</div>
              )}
              <div>{msg.text}</div>
              <div className="text-xs text-gray-500">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <MessageInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default ChatRoom;