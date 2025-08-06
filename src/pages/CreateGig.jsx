import React, { useState } from 'react';
import API from '../services/api';

const CreateGig = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    deliveryTime: '',
    images: ['']
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await API.post('/gigs', form);
      alert('Gig created!');
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Create a New Gig</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        name="category"
        placeholder="Category (e.g. Design)"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        name="deliveryTime"
        type="number"
        placeholder="Delivery Time (in days)"
        value={form.deliveryTime}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        name="images"
        placeholder="Image URL (optional)"
        value={form.images[0]}
        onChange={(e) => setForm({ ...form, images: [e.target.value] })}
        className="w-full p-2 mb-6 border border-gray-300 rounded"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
      >
        Create Gig
      </button>
    </div>
  );
};

export default CreateGig;
