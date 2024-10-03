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
        const limit = 10; // Nombre de trajets par page
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
                return rows; // Assuming only one chambre with the given ID is expected
            } else {
                console.log(rows);
                return null; // Chambre not found
            }
        } catch (err: any) {
            console.error('Error fetching chambre:', err.message);
            throw err; // Rethrow the error for proper handling in the calling code
        }
    }


    async create(modelData: CreateChambreModelDTO): Promise<ChambreModel> {
        const result = await this.db.query('INSERT INTO chambre (hotel_id, num, type, description, size, price, is_available) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            modelData.hotel_id,
            modelData.num,
            modelData.type,
            modelData.description,
            modelData.size,
            modelData.price,
            modelData.is_available,
        ]);
        return {
            chambre_id: result[0].insertId,
            ...modelData,
        };
    };
}
