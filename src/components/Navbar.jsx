import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    setIsLoggedIn(!!storedId);
    setUserId(storedId);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    toast.success("You have been logged out!");
    navigate('/login');
  };

  return (
    <nav className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">
        <Link to="/" className="hover:text-yellow-400 transition-colors">Freelance Hub</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/gigs" className="hover:text-yellow-300">Gigs</Link>
        <Link to="/create-gig" className="hover:text-yellow-300">Create Gig</Link>
        {isLoggedIn && (
          <Link to={`/chat?current=${userId}`} className="hover:text-yellow-300">Chat</Link>
        )}
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:text-yellow-300">Login</Link>
            <Link to="/register" className="hover:text-yellow-300">Register</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
