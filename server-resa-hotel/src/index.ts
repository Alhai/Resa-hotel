import express from 'express';
import userRouter from './router/user.router';
import photoRouter from "./router/photo.router";
import chambreRouter from "./router/chambre.router";
import reservationRouter from "./router/reservation.router";
import hotelRouter from "./router/hotel.router";
// const {
//   TestLoginBDD,
// } = require('./services/bdd');

const app = express();
const port = 3000;
// import {Bdd} from '../bdd';
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

/** Appel de l'ensemble des routes des utilisateurs **/
app.use('/user', userRouter);

/** Appel de l'ensemble des routes des chambres **/
app.use('/chambres', chambreRouter);

/** Appel de l'ensemble des routes des photos **/
app.use('/photos', photoRouter);

/** Appel de l'ensemble des routes des reservations **/
app.use('/reservations', reservationRouter);

/** Appel de l'ensemble des routes des hotels **/
app.use('/hotels', hotelRouter);

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