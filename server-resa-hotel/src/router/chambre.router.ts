import { Bdd } from "../../bdd";
import { ChambreController } from '../controllers/chambre.controller';
import { ChambresDal } from "../dals/chambres-dal";
import { ChambresService } from "../services/chambres-service";
import { Router } from 'express';
import { pool } from "../config/config";

const chambreService = new ChambresService(new ChambresDal());
const chambreController = new ChambreController(chambreService, pool);

const chambreRouter = Router();
/**
 * @swagger
 * /chambre:
 *   get:
 *     summary: Récupérer toutes les chambres
 *     tags: [Chambre]
 *     responses:
 *       200:
 *         description: Liste des chambres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chambre'
 */
chambreRouter.get('/', chambreController.getAllChambres.bind(chambreController));

/**
 * @swagger
 * /chambre/{id}:
 *   get:
 *     summary: Récupérer une chambre par ID
 *     tags: [Chambre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la chambre
 *     responses:
 *       200:
 *         description: Chambre trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chambre'
 *       404:
 *         description: Chambre non trouvée
 */
chambreRouter.get('/:id', chambreController.getChambreById.bind(chambreController));

/**
 * @swagger
 * /chambre:
 *   post:
 *     summary: Ajouter une nouvelle chambre
 *     tags: [Chambre]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chambre'
 *     responses:
 *       201:
 *         description: Chambre ajoutée avec succès
 *       400:
 *         description: Données invalides
 */
chambreRouter.post('/', chambreController.addChambre.bind(chambreController));

/**
 * @swagger
 * /chambre/{id}:
 *   put:
 *     summary: Mettre à jour une chambre existante
 *     tags: [Chambre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la chambre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chambre'
 *     responses:
 *       200:
 *         description: Chambre mise à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Chambre non trouvée
 */
chambreRouter.put('/:id', chambreController.updateChambre.bind(chambreController));

/**
 * @swagger
 * /chambre/{id}:
 *   delete:
 *     summary: Supprimer une chambre
 *     tags: [Chambre]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la chambre
 *     responses:
 *       200:
 *         description: Chambre supprimée avec succès
 *       404:
 *         description: Chambre non trouvée
 */
chambreRouter.delete('/:id', chambreController.deleteChambre.bind(chambreController));

export default chambreRouter;
