import express from 'express';
import chambreRoutes from "./router/chambre.router";
import userRouter from './router/user.router';
// const {
//   TestLoginBDD,
// } = require('./services/bdd');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


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

/** Récupération de l'ensemble des chambres **/
app.use('/chambres', chambreRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});