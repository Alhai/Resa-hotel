import { pool } from '../config/config';
import {HotelInterface} from '../interfaces/hotel-interface';

export class HotelDal {
    async findAll(): Promise<HotelInterface[]> {
        let page = 1;
        const limit = 10;
        let allRows: HotelInterface[] = [];
        let hasMoreData = true;

        while (hasMoreData) {
            const offset = (page - 1) * limit;
            const querySelectAllHotel = 'SELECT * FROM hotel LIMIT ? OFFSET ?';

            try {
                const [rows]: any = await pool.query(querySelectAllHotel, [limit, offset]);

                if (rows.length > 0) {
                    allRows = allRows.concat(rows);
                    page++;
                } else {
                    hasMoreData = false;
                }
            } catch (error: any) {
                console.error('Error fetching hotels:', error);
                throw new Error(`An error occurred while fetching hotels: ${error.message}`);
            }
        }

        return allRows;
    }

    async findById(hotelId: number): Promise<HotelInterface | null> {
        const querySelectHotelById = 'SELECT * FROM hotel WHERE Hotel_id = ?';
        const [rows] = await pool.query(querySelectHotelById, [hotelId]);
        const result: any[] = rows as any[];
        if (result.length > 0) {
            return result[0] as HotelInterface;
        } else {
            throw new Error(`l'hôtel avec l'ID ${hotelId} non trouvé`);
        }
    }

    async addHotel(hotel: HotelInterface): Promise<void> {
        const queryAddHotel = 'INSERT INTO hotel (name, city, address, description) VALUES (?, ?, ?, ?)';

        await pool.query(queryAddHotel, [
            hotel.name,
            hotel.city,
            hotel.address,
            hotel.description,
        ]);
    }

    async updateHotel(hotel: HotelInterface): Promise<void> {
        const query = `UPDATE Hotel SET name = ?, city = ?, address = ?, description = ? WHERE hotel_id = ?`;
        const values = [
            hotel.name,
            hotel.city,
            hotel.address,
            hotel.description,
            hotel.hotel_id
        ];

        await pool.query(query, values);
    }
    async deleteHotel(hotelId: number): Promise<void> {
        const querySelectHotelById = 'DELETE FROM hotel WHERE Hotel_id = ?';
        await pool.query(querySelectHotelById, [hotelId]);
    }
}
