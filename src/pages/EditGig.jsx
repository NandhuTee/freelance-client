import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const EditGig = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    deliveryTime: ''
  });

  useEffect(() => {
    API.get(`/api/gigs/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async () => {
    try {
      await API.put(`/api/gigs/${id}`, form);
      alert('Gig updated!');
      navigate('/gigs');
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">Edit Gig</h2>
      
      <input
        className="w-full border border-gray-300 p-2 rounded mb-4"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="w-full border border-gray-300 p-2 rounded mb-4"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        className="w-full border border-gray-300 p-2 rounded mb-4"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        className="w-full border border-gray-300 p-2 rounded mb-4"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <input
        className="w-full border border-gray-300 p-2 rounded mb-6"
        placeholder="Delivery Time"
        value={form.deliveryTime}
        onChange={(e) => setForm({ ...form, deliveryTime: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
      >
        Update Gig
      </button>
    </div>
  );
};

export default EditGig;
