import React, { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'freelancer',
  });

  const [loading, setLoading] = useState(false); // 👈 loader state

  const handleRegister = async () => {
    if (loading) return; // 👈 Prevent double-clicks

    setLoading(true); // 👈 Set loading to true before request
    try {
      await API.post('/api/auth/register', form);
      toast.success('🎉 Registration successful!');
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error('❌ Registration failed.');
    } finally {
      setLoading(false); // 👈 Reset loading after request
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
        </select>

        <button
          onClick={handleRegister}
          disabled={loading} // 👈 disable when loading
          className={`w-full py-2 rounded transition duration-200 text-white ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
    </div>
  );
};

export default Register;
