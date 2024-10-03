/** Test accès à la BDD **/
import {Bdd} from '../../bdd';
import {ChambreModel, CreateChambreModelDTO} from '../models/chambre-model';

export class ChambresDal {
    private db:any;
    constructor(private bdd:Bdd) {
        this.db = this.bdd.connection();
    }
    async findAll() {
        let page = 1;
        const limit = 10;
        let allRows: any[] = [];
        let hasMoreData = true;

        while (hasMoreData) {
            const offset = (page - 1) * limit;
            const querySelectAllRoom = 'SELECT * FROM chambre LIMIT ? OFFSET ?';
            try {
                const rows: any = await new Promise((resolve, reject) => {
                    this.db.query(querySelectAllRoom, [limit, offset], (err:any, rows:any) => {
                        if (err) {
                            console.error('Database query error:', err);
                            return reject({message: err.message});
                        }
                        resolve(rows);
                    });
                });

                if (rows.length > 0) {
                    allRows = allRows.concat(rows);
                    page++;
                } else {
                    hasMoreData = false;
                }
            } catch (err: any) {
                console.error('Erreur lors de la récupération des données:', err.message);
                return {message: err.message};
            }
        }

        return {message: 'yes', data: allRows};
    }

    async findById(chambreId: number): Promise<ChambreModel | null> {
        try {
            const querySelectRoomById = 'SELECT * FROM chambre WHERE chambre_id = ?';
            const [rows]:any = await new Promise((resolve, reject) => {
                this.db.query(querySelectRoomById, [chambreId], (err: any, rows: any) => {
                    if (err) {
                        console.error('Database query error:', err);
                        return reject({ message: err.message });
                    }
                    resolve(rows);
                });
            });

            if (rows) {
                return rows;
            } else {
                return null;
            }
        } catch (err: any) {
            console.error('Error fetching chambre:', err.message);
            throw err;
        }
    }


    async create(modelData: CreateChambreModelDTO): Promise<ChambreModel | null> {
        try {
            const queryAddRoom = 'INSERT INTO chambre (hotel_id, num, type, description, size, price, is_available) VALUES (?, ?, ?, ?, ?, ?, ?)';

            const result: any = await new Promise((resolve, reject) => {
                this.db.query(queryAddRoom, [
                    modelData.hotel_id,
                    modelData.num,
                    modelData.type,
                    modelData.description,
                    modelData.size,
                    modelData.price,
                    modelData.is_available
                ], (err: any, result: any) => {
                    if (err) {
                        console.error('Database query error:', err);
                        return reject({ message: err.message });
                    }
                    resolve(result);
                });
            });

            if (result) {
                return {
                    chambre_id: result.insertId,
                    ...modelData,
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error creating chambre:', error);
            throw error;
        }
    }

}
