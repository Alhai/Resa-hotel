import { pool } from '../config/config';
import {ChambreInterface} from '../interfaces/chambre-interface';
import {PhotosDal} from "./photos-dal";

export class ChambresDal {
    constructor(private photosDal:PhotosDal) {
    }

    async findAll(): Promise<ChambreInterface[]> {
        let page = 1;
        const limit = 10;
        let allRows: ChambreInterface[] = [];
        let hasMoreData = true;

        while (hasMoreData) {
            const offset = (page - 1) * limit;
            const querySelectAllRoom = 'SELECT \n' +
                '    chambre.chambre_id,\n' +
                '    chambre.hotel_id,\n' +
                '    chambre.num,\n' +
                '    chambre.type,\n' +
                '    chambre.description,\n' +
                '    chambre.size,\n' +
                '    chambre.price,\n' +
                '    chambre.is_available,\n' +
                '    photo.photo_id,\n' +
                '    photo.url AS photo_url,\n' +
                '    photo.description AS photo_description\n' +
                'FROM \n' +
                '    chambre\n' +
                'LEFT JOIN \n' +
                '    photo ON chambre.chambre_id = photo.chambre_id\n' +
                'LIMIT ? OFFSET ?';

            try {
                // Utiliser pool.promise() pour les Promises avec MySQL2
                const [rows]: any = await pool.query(querySelectAllRoom, [limit, offset]);

                if (rows.length > 0) {
                    allRows = allRows.concat(rows);
                    page++;
                } else {
                    hasMoreData = false; // Arrêter si aucune donnée n'est retournée
                }
            } catch (error: any) {
                console.error('Error fetching rooms:', error);
                throw new Error(`An error occurred while fetching rooms: ${error.message}`);
            }
        }

        return allRows;
    }

    async findById(chambreId: number): Promise<ChambreInterface | null> {
            const querySelectRoomById = 'SELECT \n' +
                '    chambre.chambre_id,\n' +
                '    chambre.hotel_id,\n' +
                '    chambre.num,\n' +
                '    chambre.type,\n' +
                '    chambre.description,\n' +
                '    chambre.size,\n' +
                '    chambre.price,\n' +
                '    chambre.is_available,\n' +
                '    photo.photo_id,\n' +
                '    photo.url AS photo_url,\n' +
                '    photo.description AS photo_description\n' +
                'FROM \n' +
                '    chambre\n' +
                'LEFT JOIN \n' +
                '    photo ON chambre.chambre_id = photo.chambre_id\n' +
                'WHERE \n' +
                '    chambre.chambre_id = ?;\n';
            const [rows] = await pool.query(querySelectRoomById, [chambreId]);
            const result: any[] = rows as any[];
            if (result.length > 0) {
                return result[0] as ChambreInterface;
            } else {
                throw new Error(`la chambre avec l'ID ${chambreId} non trouvé`);
            }
    }

    async addChambre(chambre: ChambreInterface): Promise<void> {
        const queryAddRoom = 'INSERT INTO chambre (hotel_id, num, type, description, size, price, is_available) VALUES (?, ?, ?, ?, ?, ?, ?)';

        await pool.query(queryAddRoom, [
            chambre.hotel_id,
            chambre.num,
            chambre.type,
            chambre.description,
            chambre.size,
            chambre.price,
            chambre.is_available
        ]);
    }

    async updateChambre(chambre: ChambreInterface): Promise<void> {
        const query = `
            UPDATE chambre
            SET hotel_id = ?, num = ?, type = ?, description = ?, size = ?, price = ?, is_available = ?
            WHERE chambre_id = ?
        `;
        const values = [
            chambre.hotel_id,
            chambre.num,
            chambre.type,
            chambre.description,
            chambre.size,
            chambre.price,
            chambre.is_available,
            chambre.chambre_id
        ];

        await pool.query(query, values);
    }
    async deleteChambre(chambreId: number): Promise<void> {
        console.log(chambreId);
        const querySelectPhotoByIdChambre = 'SELECT photo_id FROM photo WHERE chambre_id = ?';
        const [rows]: any = await pool.query(querySelectPhotoByIdChambre, [chambreId]);

        for (let i = 0; i < rows.length; i++) {
            await this.photosDal.deletePhoto(rows[i]);
        }

        const queryDeleteRoomById = 'DELETE FROM chambre WHERE chambre_id = ?';
        await pool.query(queryDeleteRoomById, [chambreId]);
    }
}
