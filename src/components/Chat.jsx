import React, { useState, useEffect } from 'react';
import socket from '../services/socket';
import API from '../services/api';

const Chat = ({ currentUserId, selectedUserId }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    socket.emit('addUser', currentUserId);

    API.get(`/messages/${currentUserId}/${selectedUserId}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));

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
        content
      });
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid gray' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ padding: '5px', textAlign: msg.sender === currentUserId ? 'right' : 'left' }}>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>

      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
