// GigDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const GigDetail = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/gigs/${id}`)
      .then((res) => setGig(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/gigs/${id}`);
      alert('Gig deleted!');
      navigate('/gigs');
    } catch (error) {
      console.error(error);
    }
  };

  if (!gig) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{gig.title}</h2>
      <p>{gig.description}</p>
      <p><strong>Price:</strong> ₹{gig.price}</p>

      {/* 🔽 Your Buttons */}
      <div style={{ marginTop: '20px' }}>
        <Link to={`/edit-gig/${gig._id}`}>
          <button style={{ marginRight: '10px' }}>Edit</button>
        </Link>
        <button
          onClick={handleDelete}
          style={{ backgroundColor: 'red', color: 'white' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default GigDetail;
