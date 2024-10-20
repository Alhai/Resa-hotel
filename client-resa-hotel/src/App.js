import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Restaurant from './pages/Restaurant';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Restaurant" element={<Restaurant />} />

        {/* Ajoute d'autres routes ici, comme /reservation et /restaurant */}
      </Routes>
      <Footer /> {/* Footer ajouté en bas */}
    </Router>
  );
};

export default App;
