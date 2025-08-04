import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const Gigs = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    API.get('/gigs')
      .then((res) => setGigs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Available Gigs</h1>
      {gigs.length === 0 ? (
        <p>No gigs available yet.</p>
      ) : (
        gigs.map((gig) => (
          <Link
            to={`/gigs/${gig._id}`}
            key={gig._id}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              marginBottom: '15px'
            }}
          >
            <div style={{
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '8px',
              background: '#f9f9f9'
            }}>
              <h2>{gig.title}</h2>
              <p>{gig.description}</p>
              <small>Price: ₹{gig.price}</small>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Gigs;
