import React, { useState, useEffect, useRef } from 'react';
import socket from '../services/socket';
import API from '../services/api';
import { useSearchParams } from 'react-router-dom';
import UserList from './UserList';



const Chat = (props) => {
  const [searchParams] = useSearchParams();
  const currentUserId = props.currentUserId || searchParams.get("current");
  const selectedUserId = props.selectedUserId || searchParams.get("receiver");
  

  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const chatEndRef = useRef(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
useEffect(() => {
  console.log("currentUserId:", currentUserId, "selectedUserId:", selectedUserId);
}, [currentUserId, selectedUserId]);


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
  return <p style={{ textAlign: 'center', padding: '20px' }}>You must be logged in to start chatting.</p>;
}

if (!selectedUserId) {
  return <UserList />;
}


  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <h3 style={{ textAlign: 'center' }}>Chat</h3>

      <div style={{
        height: '300px',
        overflowY: 'scroll',
        border: '1px solid gray',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
      }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              padding: '5px 10px',
              margin: '5px 0',
              textAlign: msg.senderId === currentUserId ? 'right' : 'left',
            }}
          >
            <div style={{
              display: 'inline-block',
              backgroundColor: msg.senderId === currentUserId ? '#dcf8c6' : '#ffffff',
              borderRadius: '8px',
              padding: '8px 12px',
              maxWidth: '70%',
            }}>
              <span>{msg.content}</span>
              {/* Uncomment if your message has timestamp */}
              {/* <div style={{ fontSize: '10px', color: 'gray', textAlign: 'right' }}>{new Date(msg.createdAt).toLocaleTimeString()}</div> */}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
