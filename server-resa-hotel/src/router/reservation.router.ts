import { ReservationController } from '../controllers/reservation.controller';
import { ReservationsDal } from "../dals/reservations-dal";
import { ReservationsService } from "../services/reservations-service";
import { Router } from 'express';
import { pool } from "../config/config";

const reservationsService = new ReservationsService(new ReservationsDal());
const reservationController = new ReservationController(reservationsService, pool);

const reservationRouter = Router();
/**
 * @swagger
 * /reservation:
 *   get:
 *     summary: Récupérer toutes les réservations
 *     tags: [Reservation]
 *     responses:
 *       200:
 *         description: Liste des réservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */
reservationRouter.get('/', reservationController.getAllReservations.bind(reservationController));

/**
 * @swagger
 * /reservation/{id}:
 *   get:
 *     summary: Récupérer une réservation par ID
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la réservation
 *     responses:
 *       200:
 *         description: Réservation trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Réservation non trouvée
 */
reservationRouter.get('/:id', reservationController.getReservationById.bind(reservationController));

/**
 * @swagger
 * /reservation:
 *   post:
 *     summary: Ajouter une nouvelle réservation
 *     tags: [Reservation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Réservation ajoutée avec succès
 *       400:
 *         description: Données invalides
 */
reservationRouter.post('/', reservationController.addReservation.bind(reservationController));

/**
 * @swagger
 * /reservation/{id}:
 *   put:
 *     summary: Mettre à jour une réservation existante
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la réservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Réservation mise à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Réservation non trouvée
 */
reservationRouter.put('/:id', reservationController.updateReservation.bind(reservationController));

/**
 * @swagger
 * /reservation/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la réservation
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès
 *       404:
 *         description: Réservation non trouvée
 */
reservationRouter.delete('/:id', reservationController.deleteReservation.bind(reservationController));

export default reservationRouter;
