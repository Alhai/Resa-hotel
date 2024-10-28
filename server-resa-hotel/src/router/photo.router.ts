import { PhotoController } from '../controllers/photo.controller';
import { PhotosDal } from "../dals/photos-dal";
import { PhotosService } from "../services/photos-service";
import { Router } from 'express';
import { pool } from "../config/config";

const photosService = new PhotosService(new PhotosDal());
const photoController = new PhotoController(photosService, pool);

const photoRouter = Router();
/**
 * @swagger
 * /photo:
 *   get:
 *     summary: Récupérer toutes les photos
 *     tags: [Photo]
 *     responses:
 *       200:
 *         description: Liste des photos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Photo'
 */
photoRouter.get('/', photoController.getAllPhotos.bind(photoController));

/**
 * @swagger
 * /photo/{id}:
 *   get:
 *     summary: Récupérer une photo par ID
 *     tags: [Photo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la photo
 *     responses:
 *       200:
 *         description: Photo trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Photo'
 *       404:
 *         description: Photo non trouvée
 */
photoRouter.get('/:id', photoController.getPhotoById.bind(photoController));

/**
 * @swagger
 * /photo/chambre/{idChambre}:
 *   get:
 *     summary: Récupérer des photos par ID de chambre
 *     tags: [Photo]
 *     parameters:
 *       - in: path
 *         name: idChambre
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la chambre
 *     responses:
 *       200:
 *         description: Liste des photos de la chambre
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Photo'
 *       404:
 *         description: Photos non trouvées pour cette chambre
 */
photoRouter.get('/chambre/:idChambre', photoController.getPhotoByIdChambre.bind(photoController));

/**
 * @swagger
 * /photo:
 *   post:
 *     summary: Ajouter une nouvelle photo
 *     tags: [Photo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Photo'
 *     responses:
 *       201:
 *         description: Photo ajoutée avec succès
 *       400:
 *         description: Données invalides
 */
photoRouter.post('/', photoController.addPhoto.bind(photoController));

/**
 * @swagger
 * /photo/{id}:
 *   put:
 *     summary: Mettre à jour une photo existante
 *     tags: [Photo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la photo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Photo'
 *     responses:
 *       200:
 *         description: Photo mise à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Photo non trouvée
 */
photoRouter.put('/:id', photoController.updatePhoto.bind(photoController));

/**
 * @swagger
 * /photo/{id}:
 *   delete:
 *     summary: Supprimer une photo
 *     tags: [Photo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la photo
 *     responses:
 *       200:
 *         description: Photo supprimée avec succès
 *       404:
 *         description: Photo non trouvée
 */
photoRouter.delete('/:id', photoController.deletePhoto.bind(photoController));

export default photoRouter;
