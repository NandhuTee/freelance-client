// src/pages/GigDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const GigDetails = () => {
  const { gigId } = useParams();
  const [gig, setGig] = useState(null);

  useEffect(() => {
    API.get(`/gigs/${gigId}`)
      .then(res => setGig(res.data))
      .catch(err => console.error(err));
  }, [gigId]);

  if (!gig) return <p>Loading...</p>;

  return (
    <div>
      <h2>{gig.title}</h2>
      <p>{gig.description}</p>
      <p>Price: ${gig.price}</p>
      <p>Delivery Time: {gig.deliveryTime} days</p>
      <p>Category: {gig.category}</p>
    </div>
  );
};

export default GigDetails;
