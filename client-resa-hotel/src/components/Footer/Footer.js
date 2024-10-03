import React from 'react';
import './Footer.css';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
export {};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          {/* About Us Section */}
          <div className="footer-col">
            <h3>About Us</h3>
            <p>
              Découvrez le luxe dans notre hôtel, où le confort rencontre l'élégance.
              Réservez votre séjour dès aujourd'hui et profitez du meilleur service de l'industrie.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="/">Accueil</a></li>
                <li><a href="/restaurant">Restaurant</a></li>
                <li><a href="/reservation">Réservation</a></li>
                <li><a href="/contact">Contact</a></li>
               
            </ul>

          </div>

          {/* Contact Section */}
          <div className="footer-col">
            <h3>Contactez-nous</h3>
            <ul>
              <li>360 Rue Real, 69000 Lyon</li>
              <li>30 Rue Marceau, 38000 Grenoble</li>
              <li>+33 012456789</li>
              <li>info@resahotel.com</li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="footer-col">
            <h3>Suivez-nous</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; 2024 Resa Hotel | All Rights Reserved</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button id="scrollTopBtn" onClick={scrollToTop}>&#9650;</button>
    </footer>
  );
};

// Function for Scroll to Top Button
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default Footer;
