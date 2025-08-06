import { Link } from 'react-router-dom';

const GigCard = ({ gig }) => {
  return (
    <Link
      to={`/gigs/${gig._id}`}
      className="block p-6 bg-white rounded-lg shadow hover:shadow-md hover:scale-105 transition-transform duration-200"
    >
      <h2 className="text-xl font-semibold text-blue-700 mb-2">{gig.title}</h2>
      <p className="text-gray-700 mb-2">{gig.description}</p>
      <p className="text-sm text-gray-500">Price: ₹{gig.price}</p>
    </Link>
  );
};

export default GigCard;
