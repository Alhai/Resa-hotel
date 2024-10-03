import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#2c3e50', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="navbar-logo">
        <Link to="/" style={{ color: '#ecf0f1', fontSize: '28px', fontWeight: 'bold', textDecoration: 'none' }}>Resa-Hotel</Link>
      </div>
      <ul className="navbar-links" style={{ listStyle: 'none', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <li><Link to="/" style={{ color: '#ecf0f1', textDecoration: 'none', fontSize: '18px', padding: '5px 10px' }}>Accueil</Link></li>
        <li><Link to="/reservation" style={{ color: '#ecf0f1', textDecoration: 'none', fontSize: '18px', padding: '5px 10px' }}>Réservation</Link></li>
        <li><Link to="/restaurant" style={{ color: '#ecf0f1', textDecoration: 'none', fontSize: '18px', padding: '5px 10px' }}>Restaurant</Link></li>
        <li><Link to="/contact" style={{ color: '#ecf0f1', textDecoration: 'none', fontSize: '18px', padding: '5px 10px' }}>Contact</Link></li>
        <li><Link to="/login" style={{ color: '#ecf0f1', textDecoration: 'none', fontSize: '18px', padding: '5px 10px' }}>Se connecter</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
