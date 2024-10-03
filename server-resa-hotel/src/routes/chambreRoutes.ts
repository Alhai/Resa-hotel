import { Router } from 'express';
import { ChambresController } from '../controllers/chambres-controller';
import {ChambresService} from "../services/chambres-service";
import {ChambresDal} from "../dals/chambres-dal";
import {Bdd} from "../../bdd";

const router = Router();
const bdd = new Bdd();
const chambresRepository = new ChambresDal(bdd);
const chambresService = new ChambresService(chambresRepository);
const chambresController = new ChambresController(chambresService);

router.get('/', chambresController.getAllChambres);
router.get('/:id', chambresController.getChambreById);
router.post('/new/', chambresController.createChambre);

export default router;
