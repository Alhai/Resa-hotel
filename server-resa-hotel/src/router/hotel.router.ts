import { HotelController } from '../controllers/hotel.controller';
import {HotelDal} from "../dals/hotel-dal";
import {HotelsService} from "../services/hotels-service";
import { Router } from 'express';
import {pool} from "../config/config";

const hotelsService = new HotelsService(new HotelDal());
const hotelController = new HotelController(hotelsService, pool);

const hotelRouter = Router();
/**
 * @swagger
 * /hotel:
 *   get:
 *     summary: Récupérer tous les hôtels
 *     tags: [Hotel]
 *     responses:
 *       200:
 *         description: Liste des hôtels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hotel'
 */
hotelRouter.get('/', hotelController.getAllHotels.bind(hotelController));

/**
 * @swagger
 * /hotel/{id}:
 *   get:
 *     summary: Récupérer un hôtel par ID
 *     tags: [Hotel]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'hôtel
 *     responses:
 *       200:
 *         description: Hôtel trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       404:
 *         description: Hôtel non trouvé
 */
hotelRouter.get('/:id', hotelController.getHotelById.bind(hotelController));

/**
 * @swagger
 * /hotel:
 *   post:
 *     summary: Ajouter un nouvel hôtel
 *     tags: [Hotel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       201:
 *         description: Hôtel ajouté avec succès
 *       400:
 *         description: Données invalides
 */
hotelRouter.post('/', hotelController.addHotel.bind(hotelController));

/**
 * @swagger
 * /hotel/{id}:
 *   put:
 *     summary: Mettre à jour un hôtel existant
 *     tags: [Hotel]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'hôtel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       200:
 *         description: Hôtel mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Hôtel non trouvé
 */
hotelRouter.put('/:id', hotelController.updateHotel.bind(hotelController));

/**
 * @swagger
 * /hotel/{id}:
 *   delete:
 *     summary: Supprimer un hôtel
 *     tags: [Hotel]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'hôtel
 *     responses:
 *       200:
 *         description: Hôtel supprimé avec succès
 *       404:
 *         description: Hôtel non trouvé
 */
hotelRouter.delete('/:id', hotelController.deleteHotel.bind(hotelController));

export default hotelRouter;
