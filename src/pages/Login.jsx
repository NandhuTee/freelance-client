import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async () => {
  if (!email || !password) {
    toast.warning("Please enter both email and password");
    return;
  }

  try {
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.user._id);
    
    toast.success("Logged in successfully!");
    navigate("/");
  } catch (error) {
    console.error(error.response?.data || error.message);
    toast.error("Invalid credentials");
  }
};



  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px", margin: "auto", marginTop: "100px" }}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
