import { Router } from 'express';
import { ChambreController } from '../controllers/chambre.controller';
import {ChambresService} from "../services/chambres-service";
import {ChambresDal} from "../dals/chambres-dal";
import {Bdd} from "../../bdd";

import {pool} from "../config/config";

const chambreService = new ChambresService(new ChambresDal());
const chambreController = new ChambreController(chambreService, pool);

const chambreRouter = Router();
chambreRouter.get('/', chambreController.getAllChambres.bind(chambreController));
chambreRouter.get('/:id', chambreController.getChambreById.bind(chambreController));
chambreRouter.post('/', chambreController.addChambre.bind(chambreController));
chambreRouter.put('/:id', chambreController.updateChambre.bind(chambreController));
chambreRouter.delete('/:id', chambreController.deleteChambre.bind(chambreController));

export default chambreRouter;
