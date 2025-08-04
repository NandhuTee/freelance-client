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
    // Load current gig data
    API.get(`/gigs/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = async () => {
    try {
      await API.put(`/gigs/${id}`, form);
      alert('Gig updated successfully!');
      navigate(`/gigs/${id}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Gig</h2>
      <input
        value={form.title}
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        value={form.description}
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        value={form.price}
        placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        value={form.category}
        placeholder="Category"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        value={form.deliveryTime}
        placeholder="Delivery Time (days)"
        onChange={(e) => setForm({ ...form, deliveryTime: e.target.value })}
      />
      <button onClick={handleUpdate}>Update Gig</button>
    </div>
  );
};

export default EditGig;
