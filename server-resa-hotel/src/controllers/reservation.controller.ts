// controllers/ReservationController.ts
import { Request, Response } from 'express';
import { ReservationsService } from '../services/reservations-service';
import {ReservationInterface} from "../interfaces/reservation-interface";
import {Pool} from "mysql2/promise";

export class ReservationController {
    constructor(private reservationsService: ReservationsService, private pool: Pool) {
    }

    getAllReservations = async (req: Request, res: Response): Promise<void> => {
        try {
            const Reservations = await this.reservationsService.getAllReservations();
            res.status(200).json(Reservations);
        } catch (error) {
            console.error('Erreur lors de la récupération des reservations :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des reservations' });
        }
    };

    getReservationById = async (req: Request, res: Response): Promise<void> => {
        try {
            const Reservation = await this.reservationsService.getReservationById(Number(req.params.id));
            if (!Reservation) {
                res.status(404).json({message: 'Reservation not found'});
            } else {
                res.status(200).json(Reservation);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de la reservation :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération de la reservation' });
        }
    };

    addReservation = async (req: Request, res: Response): Promise<void> => {
        const {user_id, chambre_id, start_date, end_date, status, created_at}: ReservationInterface = req.body;

        try {
            const newReservation: ReservationInterface = {user_id, chambre_id, start_date, end_date, status, created_at};
            await this.reservationsService.addReservation(newReservation);
            res.status(201).json({ message: 'Reservation ajouté avec succès' });
        } catch (error) {
            console.error('Erreur lors de l’ajout de la Reservation :', error);
            res.status(500).json({ error: 'Erreur lors de l’ajout de la reservation' });
        }
    };

     updateReservation = async(req: Request, res: Response): Promise<void> =>{
        const { id } = req.params;
        const {user_id, chambre_id, start_date, end_date, status, created_at}: ReservationInterface = req.body;

        try {
            const updatedReservation: ReservationInterface = { reservation_id: Number(id), user_id, chambre_id, start_date, end_date, status, created_at };
            await this.reservationsService.updateReservation(updatedReservation);
            res.status(200).json({ message: 'Reservation mis à jour avec succès' });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la réservation :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la réservation' });
        }
    }

    deleteReservation = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            await this.reservationsService.deleteReservation(Number(id));
            res.status(200).json({ message: 'Reservation supprimé avec succès' });
        } catch (error) {
            console.error('Erreur lors de la suppression de la reservation :', error);
            res.status(500).json({ error: 'Erreur lors de la suppression de la reservation' });
        }
    };

}