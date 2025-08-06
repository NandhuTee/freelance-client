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

  // Fetch gig data
  useEffect(() => {
    API.get(`/gigs/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async () => {
    try {
      await API.put(`/gigs/${id}`, form);
      alert('Gig updated!');
      navigate('/gigs');
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Edit Gig</h2>
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        placeholder="Delivery Time"
        value={form.deliveryTime}
        onChange={(e) => setForm({ ...form, deliveryTime: e.target.value })}
      />
      <button onClick={handleSubmit}>Update Gig</button>
    </div>
  );
};

export default EditGig;
