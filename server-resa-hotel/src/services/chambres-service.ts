import {ChambresDal} from '../dals/chambres-dal';
import {ChambreModel, CreateChambreModelDTO} from '../models/chambre-model';

export class ChambresService {
    constructor(private chambresDal:ChambresDal) {
    }

    getAllChambres = async (): Promise<{ message: any } | { data: any[]; message: string }> => {
        return await this.chambresDal.findAll();
    };

    getChambreById = async (id: number): Promise<ChambreModel | null> => {
        try {
            return await this.chambresDal.findById(id);
        } catch (error: any) {
            console.error(`Error fetching chambre with ID ${id}:`, error);
            throw new Error(`An error occurred while fetching the chambre: ${error.message}`);
        }
    };



    createChambre = async (ChambreData: CreateChambreModelDTO): Promise<ChambreModel> => {
        return await this.chambresDal.create(ChambreData);
    };
}

