// src/pages/Register.jsx
import React, { useState } from 'react';
import API from '../services/api';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'freelancer', // or buyer
  });

  const handleRegister = async () => {
    try {
      const { data } = await API.post('/auth/register', form);
      alert('Registration successful!');
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="freelancer">Freelancer</option>
        <option value="buyer">Buyer</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
