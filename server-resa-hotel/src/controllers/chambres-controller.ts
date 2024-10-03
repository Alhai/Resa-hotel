// controllers/ChambreController.ts
import { Request, Response } from 'express';
import { ChambresService } from '../services/chambres-service';

export class ChambresController {
    constructor(private chambresService: ChambresService) {
    }

    getAllChambres = async (req: Request, res: Response): Promise<void> => {
        try {
            const chambres = await this.chambresService.getAllChambres();
            res.status(200).json(chambres);
        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    };

    getChambreById = async (req: Request, res: Response): Promise<void> => {
        try {
            const chambre = await this.chambresService.getChambreById(Number(req.params.id));
            if (!chambre) {
                res.status(404).json({message: 'Chambre not found'});
            } else {
                res.status(200).json(chambre);
            }
        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    };

    createChambre = async (req: Request, res: Response): Promise<void> => {
        try {
            const chambre = await this.chambresService.createChambre(req.query);
            res.status(201).json(chambre);
        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    };

}