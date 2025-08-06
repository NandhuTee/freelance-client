import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../services/socket';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const currentUserId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUserId) return;

    socket.emit('getUsers', currentUserId); // request user list

    socket.on('usersList', (data) => {
      const filtered = data.filter(user => user._id !== currentUserId);
      setUsers(filtered);
    });

    return () => {
      socket.off('usersList');
    };
  }, [currentUserId]);

  const startChat = (receiverId) => {
    navigate(`/chat?current=${currentUserId}&receiver=${receiverId}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h3 className="text-xl font-semibold text-center mb-4 text-blue-600">Select a user to chat with:</h3>
      {users.length === 0 ? (
        <p className="text-center text-gray-600">🙁 No other users found.</p>
      ) : (
        <ul className="space-y-3">
          {users.map(user => (
            <li key={user._id}>
              <button
                onClick={() => startChat(user._id)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition"
              >
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
