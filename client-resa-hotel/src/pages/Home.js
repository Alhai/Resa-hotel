import React from 'react';
import heroImage from '../assets/images/hero.jpg'; // Image d'accueil
import roomImage from '../assets/images/room.jpg'; // Image des chambres
import restaurantImage from '../assets/images/restaurant.jpg'; // Image du restaurant
import poolImage from '../assets/images/pool.jpg'; // Image de la piscine
import './Home.css'; // Import du fichier CSS

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
  <div className="hero-content">
    <h1>Bienvenue à Resa-Hotel</h1>
    <p>Offrez-vous un séjour dans un hôtel de luxe avec des services exceptionnels.</p>
  </div>
</section>



      {/* Services Section */}
      <section className="services">
        <h2>Nos Services</h2>
        <div className="service-list">
          <div className="service-item">
            <img src={roomImage} alt="Nos chambres" />
            <h3>Chambres de Luxe</h3>
            <p>Profitez de chambres spacieuses avec une vue imprenable.</p>
          </div>
          <div className="service-item">
            <img src={restaurantImage} alt="Notre restaurant" />
            <h3>Restaurant Gastronomique</h3>
            <p>Découvrez une cuisine raffinée dans notre restaurant.</p>
          </div>
          <div className="service-item">
            <img src={poolImage} alt="Piscine" />
            <h3>Piscine à débordement</h3>
            <p>Profitez de notre piscine avec une vue panoramique.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
