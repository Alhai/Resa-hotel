import { Router } from 'express';
import { ReservationController } from '../controllers/reservation.controller';
import {ReservationsService} from "../services/reservations-service";
import {ReservationsDal} from "../dals/reservations-dal";
import {pool} from "../config/config";

const reservationsService = new ReservationsService(new ReservationsDal());
const reservationController = new ReservationController(reservationsService, pool);

const reservationRouter = Router();
reservationRouter.get('/', reservationController.getAllReservations.bind(reservationController));
reservationRouter.get('/:id', reservationController.getReservationById.bind(reservationController));
reservationRouter.post('/', reservationController.addReservation.bind(reservationController));
reservationRouter.put('/:id', reservationController.updateReservation.bind(reservationController));
reservationRouter.delete('/:id', reservationController.deleteReservation.bind(reservationController));

export default reservationRouter;
