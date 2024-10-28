import { pool } from '../config/config';
import {ReservationInterface} from '../interfaces/reservation-interface';

export class ReservationsDal {
    async findAll(): Promise<ReservationInterface[]> {
        let page = 1;
        const limit = 10;
        let allRows: ReservationInterface[] = [];
        let hasMoreData = true;

        while (hasMoreData) {
            const offset = (page - 1) * limit;
            const querySelectAllReservation = 'SELECT * FROM reservation LIMIT ? OFFSET ?';

            try {
                // Utiliser pool.promise() pour les Promises avec MySQL2
                const [rows]: any = await pool.query(querySelectAllReservation, [limit, offset]);

                if (rows.length > 0) {
                    allRows = allRows.concat(rows);
                    page++;
                } else {
                    hasMoreData = false;
                }
            } catch (error: any) {
                console.error('Error fetching Reservations:', error);
                throw new Error(`An error occurred while fetching Reservations: ${error.message}`);
            }
        }

        return allRows;
    }

    async findById(reservationId: number): Promise<ReservationInterface | null> {
        const querySelectReservationById = 'SELECT * FROM reservation WHERE reservation_id = ?';
        const [rows] = await pool.query(querySelectReservationById, [reservationId]);
        const result: any[] = rows as any[];
        if (result.length > 0) {
            return result[0] as ReservationInterface;
        } else {
            throw new Error(`la reservation avec l'ID ${reservationId} non trouvé`);
        }
    }

    async addReservation(reservation: ReservationInterface): Promise<void> {
        const queryAddReservation = 'INSERT INTO reservation (user_id, chambre_id, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)';

        await pool.query(queryAddReservation, [
            reservation.user_id,
            reservation.chambre_id,
            reservation.start_date,
            reservation.end_date,
            reservation.status
        ]);
    }


    async updateReservation(reservation: ReservationInterface): Promise<void> {
        const query = `
            UPDATE reservation
            SET user_id = ?, chambre_id = ?, start_date = ?, end_date = ?, status = ?, created_at = ?
            WHERE reservation_id = ?
        `;
        const values = [
            reservation.user_id,
            reservation.chambre_id,
            reservation.start_date,
            reservation.end_date,
            reservation.status,
            reservation.created_at,
            reservation.reservation_id
        ];

        await pool.query(query, values);
    }
    async deleteReservation(reservationId: number): Promise<void> {
        const querySelectReservationById = 'DELETE FROM reservation WHERE reservation_id = ?';
        await pool.query(querySelectReservationById, [reservationId]);
    }
}
