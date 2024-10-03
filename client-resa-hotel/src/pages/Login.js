import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Retirer 'Link' puisqu'il n'est pas utilisé
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.pseudo) {
      newErrors.pseudo = 'Le pseudo est obligatoire';
    }

    if (!formData.email) {
      newErrors.email = 'L\'email est obligatoire';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email est invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est obligatoire';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validate();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Si pas d'erreurs, procéder avec la soumission
      alert('Formulaire soumis');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Pseudo</label>
            <input
              type="text"
              name="pseudo"
              value={formData.pseudo}
              onChange={handleChange}
              placeholder="Entrez votre pseudo"
            />
            {errors.pseudo && <p className="error">{errors.pseudo}</p>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Entrez votre email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button type="submit" className="btn">Se connecter</button>
        </form>
        <div className="signup-link">
          <p>Vous n'avez pas de compte ?</p>
          <button onClick={() => navigate('/signup')} className="btn-signup">
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
