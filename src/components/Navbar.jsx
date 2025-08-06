import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 track route change
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    setIsLoggedIn(!!storedId);
    setUserId(storedId);
  }, [location]); // 👈 re-run whenever route changes

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    toast.success("You have been logged out!");
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', gap: '10px', padding: '10px' }}>
      <Link to="/">Home</Link>
      <Link to="/gigs">Gigs</Link>
      <Link to="/create-gig">Create Gig</Link>
      {isLoggedIn && <Link to={`/chat?current=${userId}`}>Chat</Link>}

      {!isLoggedIn ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
