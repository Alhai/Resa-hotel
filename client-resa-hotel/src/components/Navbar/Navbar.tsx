import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Resa-Hotel</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/reservation">Réservation</Link></li>
        <li><Link to="/restaurant">Restaurant</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">Se connecter</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
