import {ReservationsDal} from '../dals/reservations-dal';
import {ReservationInterface} from '../interfaces/reservation-interface';

export class ReservationsService {
    constructor(private reservationsDal:ReservationsDal) {
    }

    getAllReservations = async (): Promise<ReservationInterface[]> => {
        return await this.reservationsDal.findAll();
    };

    getReservationById = async (id: number): Promise<ReservationInterface | null> => {
        return await this.reservationsDal.findById(id);
    };



    addReservation = async (Reservation: ReservationInterface): Promise<void> => {
        return await this.reservationsDal.addReservation(Reservation);
    };

    async updateReservation(Reservation: ReservationInterface): Promise<void> {
        return await this.reservationsDal.updateReservation(Reservation);
    }

    deleteReservation = async (ReservationId: number): Promise<void> => {
        return  await this.reservationsDal.deleteReservation(ReservationId);
    };
}

