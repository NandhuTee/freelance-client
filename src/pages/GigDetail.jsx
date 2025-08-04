import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const GigDetail = () => {
  const { gigId } = useParams();
  const [gig, setGig] = useState(null);

  useEffect(() => {
    API.get(`/gigs/${gigId}`)
      .then((res) => setGig(res.data))
      .catch((err) => console.error(err));
  }, [gigId]);

  if (!gig) return <p>Loading gig details...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{gig.title}</h1>
      <p>{gig.description}</p>
      <p><strong>Price:</strong> ₹{gig.price}</p>
      <p><strong>Category:</strong> {gig.category}</p>
      <p><strong>Delivery Time:</strong> {gig.deliveryTime} days</p>
      {/* Add images or other details if available */}
    </div>
  );
};

export default GigDetail;
