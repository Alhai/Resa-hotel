export interface ReservationInterface {
    reservation_id?: number;
    user_id: number;
    chambre_id: number;
    start_date: string;
    end_date: string;
    status: number;
    created_at: string;
}

export interface IReservationOperations {

    addReservation(reservation: ReservationInterface): Promise<void>;
    findAllReservations(): Promise<ReservationInterface[]>;
    findReservationById(reservationId: number): Promise<ReservationInterface | null>;
    updateReservation(reservation: ReservationInterface): Promise<void>;
    deleteReservation(reservationId: number): Promise<void>;
}