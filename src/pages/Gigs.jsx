import React, { useEffect, useState } from 'react';
import API from '../services/api';
import GigCard from '../components/GigCard';

const Gigs = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    API.get('api/gigs')
      .then((res) => setGigs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-blue-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Available Gigs</h1>

      {gigs.length === 0 ? (
        <p className="text-center text-gray-500">No gigs available yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gigs;
