import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Gigs = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    API.get('/gigs')
      .then((res) => setGigs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {gigs.map((gig) => (
        <div key={gig._id}>
          <h2>{gig.title}</h2>
          <p>{gig.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Gigs;
