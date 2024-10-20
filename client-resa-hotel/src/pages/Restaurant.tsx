import React from 'react';
import './Restaurant.css'; // Import a CSS file for styling

import reastaurantDine from '../assets/images/restMain.jpg'; // Image de la dine

// Image-gallary de la dine
import plat from '../assets/images/plat.jpg'; // Image de la dish
import poulet from '../assets/images/poulet.jpg'; // Image de la platPoulet
import table from '../assets/images/table.jpg';
import chefImage from '../assets/images/chef.jpg';

const Restaurant: React.FC = () => {
  return (
    <div className="restaurant-container">
      {/* Background Image Div */}
      <div className="background-image"></div>
      <div
        className="restaurant-page"
        // style={{ backgroundImage: `url(${resBackgroundImage})` }}
      >
        <header className="header">
          <h1>Bienvenue dans Notre Restaurant</h1>
        </header>
        <div className="content">
          <div className="description">
            <h2>À Propos de Nous</h2>
            <p>Bienvenue dans notre restaurant !</p>
            <p>
              Nous offrons une variété de plats délicieux préparés à partir des
              ingrédients les plus frais. Nos chefs sont dédiés à vous offrir
              une expérience culinaire inoubliable. Venez profiter de notre
              ambiance chaleureuse et de notre service excellent !
            </p>
          </div>

          <div className="image-box">
            <img src={reastaurantDine} alt="Delicious food" />
          </div>
        </div>
        <div className="bottom-images">
          <h3>Nos Plats</h3>
          <div className="image-gallery">
            <img src={plat} alt="Dish 1" />
            <img src={table} alt="Dish 2" />
            <img src={poulet} alt="Dish 3" />
            <img src={chefImage} alt="Dish 4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
