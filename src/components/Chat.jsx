import React, { useState, useEffect, useRef } from 'react';
import socket from '../services/socket';
import API from '../services/api';
import { useSearchParams } from 'react-router-dom';
import UserList from './UserList';
import MessageBox from '../components/MessageBox';
const Chat = (props) => {
  const [searchParams] = useSearchParams();
  const currentUserId = props.currentUserId || searchParams.get("current");
  const selectedUserId = props.selectedUserId || searchParams.get("receiver");

  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!currentUserId || !selectedUserId) return;

    socket.emit('addUser', currentUserId);

    API.get(`/messages/${currentUserId}/${selectedUserId}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error('Failed to load messages', err));

    socket.on('receiveMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [currentUserId, selectedUserId]);

  const sendMessage = async () => {
    if (!content.trim()) return;

    try {
      const { data } = await API.post(`/messages/${currentUserId}/${selectedUserId}`, { content });
      setMessages(prev => [...prev, data]);

      socket.emit('sendMessage', {
        senderId: currentUserId,
        receiverId: selectedUserId,
        content,
      });

      setContent('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  if (!currentUserId) {
    return <p className="text-center py-10 text-gray-600">You must be logged in to start chatting.</p>;
  }

  if (!selectedUserId) {
    return <UserList />;
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10 px-4">
    <h3 className="text-center text-xl font-semibold mb-4 text-blue-600">Chat</h3>
    <div className="h-80 overflow-y-scroll border border-gray-300 p-4 mb-4 bg-gray-50 rounded-md">
        {messages.map((msg, idx) => (
           <MessageBox key={idx} message={msg} isSender={msg.senderId === currentUserId} />
        ))}
        <div ref={chatEndRef} />
    </div>

      <div className="flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
