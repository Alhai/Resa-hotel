// controllers/ChambreController.ts
import { Request, Response } from 'express';
import { ChambresService } from '../services/chambres-service';
import {ChambreInterface} from "../interfaces/chambre-interface";
import {IUser} from "../interfaces/user-interface";
import {Pool} from "mysql2/promise";

export class ChambreController {
    constructor(private chambresService: ChambresService, private pool: Pool) {
    }

    getAllChambres = async (req: Request, res: Response): Promise<void> => {
        try {
            const chambres = await this.chambresService.getAllChambres();
            res.status(200).json(chambres);
        } catch (error) {
            console.error('Erreur lors de la récupération des chambres :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des chambres' });
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
        } catch (error) {
            console.error('Erreur lors de la récupération de la chambre :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération de la chambre' });
        }
    };

    addChambre = async (req: Request, res: Response): Promise<void> => {
        const {hotel_id, num, type, description, size, price, is_available}: ChambreInterface = req.body;

        try {
            const newChambre: ChambreInterface = {hotel_id, num, type, description, size, price, is_available};
            await this.chambresService.addChambre(newChambre);
            res.status(201).json({ message: 'Chambre ajouté avec succès' });
        } catch (error) {
            console.error('Erreur lors de l’ajout de la chambre :', error);
            res.status(500).json({ error: 'Erreur lors de l’ajout de la chambre' });
        }
    };

     updateChambre = async(req: Request, res: Response): Promise<void> =>{
        const { id } = req.params;
        const {hotel_id, num, type, description, size, price, is_available}: ChambreInterface = req.body;

        try {
            const updatedChambre: ChambreInterface = { chambre_id: Number(id), hotel_id, num, type, description, size, price, is_available };
            await this.chambresService.updateChambre(updatedChambre);
            res.status(200).json({ message: 'Chambre mis à jour avec succès' });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la chambre :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la chambre' });
        }
    }

    deleteChambre = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            await this.chambresService.deleteChambre(Number(id));
            res.status(200).json({ message: 'Chambre supprimé avec succès' });
        } catch (error) {
            console.error('Erreur lors de la suppression de la chambre :', error);
            res.status(500).json({ error: 'Erreur lors de la suppression de la chambre' });
        }
    };

}