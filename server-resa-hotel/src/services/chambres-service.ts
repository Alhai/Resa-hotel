import {ChambresDal} from '../dals/chambres-dal';
import {ChambreInterface} from '../interfaces/chambre-interface';

export class ChambresService {
    constructor(private chambresDal:ChambresDal) {
    }

    getAllChambres = async (): Promise<ChambreInterface[]> => {
        return await this.chambresDal.findAll();
    };

    getChambreById = async (id: number): Promise<ChambreInterface | null> => {
        return await this.chambresDal.findById(id);
    };



    addChambre = async (chambre: ChambreInterface): Promise<void> => {
        return await this.chambresDal.addChambre(chambre);
    };

    async updateChambre(chambre: ChambreInterface): Promise<void> {
        return await this.chambresDal.updateChambre(chambre);
    }

    deleteChambre = async (chambreId: number): Promise<void> => {
        return  await this.chambresDal.deleteChambre(chambreId);
    };
}

