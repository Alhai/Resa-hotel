import express from 'express';
import mysql from "mysql2";
const {
  TestLoginBDD,
} = require('../bdd');
const {getAllRoom} = require('./dals/chambres-dal');

const dbConfig = require('../mysqlConf');
const app = express();
const port = 3000;
const connection = mysql.createPool(dbConfig);

// Gérer les erreurs de la base de données
connection.on('error', (err) => {
  console.error('Database error:', err);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});


/** Test connexion BDD : **/
app.get('/loginTest/:user', async (req, res) => {
  console.log('Lancement du test connexion BDD');
  try {
    const result = await TestLoginBDD(req.params.user, connection);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/** Récupération de l'ensemble des chambres **/
app.get('/chambres', async (req:any, res:any) => {
  console.log('Récupération des chambres');
  try {
    const connexion = await getAllRoom(connection);

    if (connexion.message === 'yes')
      return res.json(connexion.data);
    else
      return res.status(500).json(connexion.message);

  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});