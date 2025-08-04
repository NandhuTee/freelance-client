import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/gigs">Gigs</Link>
    <Link to="/create-gig">Create Gig</Link>
    <Link to="/chat">Chat</Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </nav>
);

export default Navbar;
