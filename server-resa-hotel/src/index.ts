import express from 'express';
import ChambreRoutes from "./routes/chambreRoutes";
import chambreRoutes from "./routes/chambreRoutes";
const app = express();
const port = 3000;
// import {Bdd} from '../bdd';


app.get('/', (req, res) => {
  res.send('Hello World!');
});


/** Test connexion BDD : **/
/*app.get('/loginTest/:user', async (req, res) => {
  console.log('Lancement du test connexion BDD');
  try {
    const result = await Bdd.TestLoginBDD(req.params.user);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});*/

/** Récupération de l'ensemble des chambres **/
app.use('/chambres', chambreRoutes);

/*app.get('/chambres', async (req:any, res:any) => {
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
});*/

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});