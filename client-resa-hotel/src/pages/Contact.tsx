// /////////////////
import React, { useState } from 'react';
import './Contact.css';
import contactPageImage from '../assets/images/contact-hotel.png';
import headerImage from '../assets/images/recept.jpg';

const Contact: React.FC = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Handling input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handling form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);

    // Here you can integrate your API for submitting the form
    // Reset the form after submission
    // try {
    //   const response = await;
    //   fetch('http://localhost:5000/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     alert('Message sent successfully!');
    //   } else {
    //     alert('Error sending message.');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   alert('Error sending message.');
    // }

    // //////////
    // Send form data to backend API
    fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Form submitted:', data);
        alert('Your message has been sent!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('There was an error sending your message.');
      });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    // alert('Your message has been sent!');
  };

  return (
    <div>
      {/* Header Image Section */}
      <div className="header-image">
        <img src={headerImage} alt="Hotel Header" />
      </div>
      <div className="container">
        {/* Hotel Description Section */}
        <div className="contact-section">
          <div className="hotel-description">
            <h2>Resa Hôtels en quelques mots!</h2>
            <p>
              Chez Resa Hôtels, nous sommes une communauté de
              <strong> plus de 100 hôteliers</strong> indépendants, fiers de
              notre métier, de nos régions et de vous offrir une expérience
              personnalisée. Chacun de<strong> nos hôtels est unique. </strong>
              Nous nous engageons à vous accueillir chaleureusement et à vous
              offrir le meilleur service possible.
            </p>
            <p>
              Avec <strong>plus de 5 hôtels</strong> distinctifs à travers la
              France, nous vous invitons à réserver votre prochain séjour sur
              notre site sécurisé. Que vous planifiiez un voyage d'affaires, une
              escapade romantique ou des vacances en famille ou entre amis, vous
              trouverez de nombreuses offres exclusives et promotions spéciales.
            </p>
            <p>
              Vous voyagez souvent?
              <strong> Rejoignez notre programme de fidélité:</strong> l'un des
              plus généreux en France avec plus de 1 000 membres !
            </p>
            <p>
              Nous sommes passionnés par l'hospitalité et à votre écoute. Si
              vous avez des questions ou besoin d'assistance, n'hésitez pas à
              nous contacter. Nous avons hâte de vous accueillir bientôt !
            </p>
            <p>
              <strong>
                Resa Hôtel- Là où l'hospitalité se conjugue avec une touche
                personnelle.
              </strong>
            </p>
          </div>
          <div className="image-section">
            <div className="image-block">
              <img src={contactPageImage} alt="Hotel 1" />
            </div>
            {/* <div className="image-block round-img">
            <img src="https://via.placeholder.com/150" alt="Hotel 2" />
          </div>
          <div className="image-block round-img">
            <img src="https://via.placeholder.com/150" alt="Hotel 3" />
          </div> */}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="contact-container">
          <div className="contact-info">
            <h2>Besoin de nous!</h2>
            <p>
              On est à un clic-
              <strong>plus rapide que le room service, </strong>
              plus rapide que le room service, mais avec tout le charme !
              <strong>Des questions ou besoin d'aide ?</strong> Envoyez-nous un
              message, et on s'en occupe comme un concierge avec des
              super-pouvoirs !
            </p>

            <div className="info-block">
              <h3>Phone</h3>
              <p>+33 01 23 45 67 89</p>
            </div>
            <div className="info-block">
              <h3>Email</h3>
              <p>
                <a href="mailto:info@resahotel.com" className="email-link">
                  info@resahotel.com
                </a>
              </p>
            </div>
            <div className="info-block">
              <h3>Address</h3>
              <p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=360+Rue+Real,+69000+Lyon,+France"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="address-link"
                >
                  360 Rue Real, 69000 Lyon, France
                </a>
              </p>
            </div>
          </div>

          {/*#############contact form #############*/}
          <div className="contact-form">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {/* <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            /> */}
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="submit-btn">
                Send enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
