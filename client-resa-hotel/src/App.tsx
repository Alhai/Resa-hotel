import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        {/* Ajoute d'autres routes ici, comme /reservation et /restaurant */}
      </Routes>
    </Router>
  );
};

export default App;
