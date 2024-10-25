const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL user
  password: '', // replace with your MySQL password
  database: 'hotel_db', // replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// API route to handle form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // SQL query to insert form data into the database
  const query = `INSERT INTO contact_form (name, email, subject, message) VALUES (?, ?, ?, ?)`;

  db.query(query, [name, email, subject, message], (err, result) => {
    if (err) {
      console.log('Error inserting data:', err);
      res.status(500).json({ message: 'Failed to save data.' });
    } else {
      console.log('Data inserted successfully');
      res.status(200).json({ message: 'Form submitted successfully!' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
