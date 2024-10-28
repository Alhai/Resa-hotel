import { swaggerSpecs, swaggerUi } from "../swagger";

import chambreRouter from "./router/chambre.router";
import express from 'express';
import hotelRouter from "./router/hotel.router";
import photoRouter from "./router/photo.router";
import reservationRouter from "./router/reservation.router";
import userRouter from './router/user.router';
// const {
//   TestLoginBDD,
// } = require('./services/bdd');

const app = express();
const port = 3000;
// import {Bdd} from '../bdd';
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/** Appel de l'ensemble des routes des utilisateurs **/
app.use('/user', userRouter);

/** Appel de l'ensemble des routes des chambres **/
app.use('/chambre', chambreRouter);

/** Appel de l'ensemble des routes des photos **/
app.use('/photo', photoRouter);

/** Appel de l'ensemble des routes des reservations **/
app.use('/reservation', reservationRouter);

/** Appel de l'ensemble des routes des hotels **/
app.use('/hotel', hotelRouter);

/** Test connexion BDD : **/
/*app.get('/loginTest/:user', async (req, res) => {
  console.log('Lancement du test connexion BDD');
  try {
    const result = await TestLoginBDD(req.params.user);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});*/


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});