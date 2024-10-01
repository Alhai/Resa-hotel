import React from 'react';
import heroImage from '../assets/images/path_to_hero_image.avif'; // Image de la section Hero
import roomImage from '../assets/images/path_to_hero_image.avif'; // Image de la chambre

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-text">
          <h1>Bienvenue à Resa-Hotel</h1>
          <p>Réservez des chambres de luxe avec des services 5 étoiles et profitez d'une expérience unique au cœur de la ville.</p>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="highlight">
        <div className="highlight-content">
          <img src={roomImage} alt="Chambre d'hôtel" />
          <div className="highlight-text">
            <h2>Nos chambres de luxe</h2>
            <p>
              Découvrez nos chambres modernes et élégantes, conçues pour offrir un maximum de confort. 
              Réservez maintenant et profitez d'un cadre luxueux avec des équipements de premier choix.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
