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
      const response = await API.post('/gigs', form);
      alert('Gig created!');
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create a New Gig</h2>
      
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      /><br /><br />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      /><br /><br />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      /><br /><br />

      <input
        name="category"
        placeholder="Category (e.g. Design)"
        value={form.category}
        onChange={handleChange}
      /><br /><br />

      <input
        name="deliveryTime"
        type="number"
        placeholder="Delivery Time (in days)"
        value={form.deliveryTime}
        onChange={handleChange}
      /><br /><br />

      <input
        name="images"
        placeholder="Image URL (optional)"
        value={form.images[0]}
        onChange={(e) => setForm({ ...form, images: [e.target.value] })}
      /><br /><br />

      <button onClick={handleSubmit}>Create Gig</button>
    </div>
  );
};

export default CreateGig;
