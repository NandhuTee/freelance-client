import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../services/socket';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const currentUserId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUserId) return;

    socket.emit('getUsers', currentUserId);  // request user list

    socket.on('usersList', (data) => {
      // filter current user out
      const filtered = data.filter(user => user._id !== currentUserId);
      setUsers(filtered);
    });

    // Cleanup to prevent memory leak
    return () => {
      socket.off('usersList');
    };
  }, [currentUserId]);

  const startChat = (receiverId) => {
    navigate(`/chat?current=${currentUserId}&receiver=${receiverId}`);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h3>Select a user to chat with:</h3>
      {users.length === 0 ? (
        <p>🙁 No other users found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map(user => (
            <li key={user._id} style={{ margin: '10px 0' }}>
              <button onClick={() => startChat(user._id)} style={{ width: '100%' }}>
                {user.name || user.email}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
