/** Test accès à la BDD **/
import { pool } from '../config/config';
import {PhotoInterface} from '../interfaces/photo-interface';

export class PhotosDal {
    async findAll(): Promise<PhotoInterface[]> {
        let page = 1;
        const limit = 10;
        let allRows: PhotoInterface[] = [];
        let hasMoreData = true;

        while (hasMoreData) {
            const offset = (page - 1) * limit;
            const querySelectAllPictures = 'SELECT * FROM photo LIMIT ? OFFSET ?';

            try {
                const [rows]: any = await pool.query(querySelectAllPictures, [limit, offset]);

                if (rows.length > 0) {
                    allRows = allRows.concat(rows);
                    page++;
                } else {
                    hasMoreData = false;
                }
            } catch (error: any) {
                console.error('Error fetching Pictures:', error);
                throw new Error(`An error occurred while fetching pictures: ${error.message}`);
            }
        }

        return allRows;
    }

    async findById(photoId: number): Promise<PhotoInterface | null> {
        const querySelectPictureById = 'SELECT * FROM photo WHERE photo_id = ?';
        const [rows] = await pool.query(querySelectPictureById, [photoId]);
        const result: any[] = rows as any[];
        if (result.length > 0) {
            return result[0] as PhotoInterface;
        } else {
            throw new Error(`la Photo avec l'ID ${photoId} non trouvé`);
        }
    }

    async addPhoto(photo: PhotoInterface): Promise<void> {
        const queryAddPicture = 'INSERT INTO photo (chambre_id, url, description ) VALUES (?, ?, ?)';

        await pool.query(queryAddPicture, [
            photo.chambre_id,
            photo.url,
            photo.alt,
        ]);
    }

    async updatePhoto(photo: PhotoInterface): Promise<void> {
        const query = `UPDATE photo SET chambre_id = ?, url = ?, description = ? WHERE Photo_id = ? `;

        const values = [
            photo.chambre_id,
            photo.url,
            photo.alt,
            photo.photo_id
        ];

        await pool.query(query, values);
    }
    async deletePhoto(photoId: number): Promise<void> {
        const querySelectPictureById = 'DELETE FROM photo WHERE photo_id = ?';
        await pool.query(querySelectPictureById, [photoId]);
    }
}
