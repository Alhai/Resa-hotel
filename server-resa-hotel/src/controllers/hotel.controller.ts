// controllers/HotelController.ts
import { Request, Response } from 'express';
import { HotelsService } from '../services/hotels-service';
import {HotelInterface} from "../interfaces/hotel-interface";
import {Pool} from "mysql2/promise";

export class HotelController {
    constructor(private hotelsService: HotelsService, private pool: Pool) {
    }

    getAllHotels = async (req: Request, res: Response): Promise<void> => {
        try {
            const hotels = await this.hotelsService.getAllHotels();
            res.status(200).json(hotels);
        } catch (error) {
            console.error('Erreur lors de la récupération des hôtels :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des hôtels' });
        }
    };

    getHotelById = async (req: Request, res: Response): Promise<void> => {
        try {
            const hotel = await this.hotelsService.getHotelById(Number(req.params.id));
            if (!hotel) {
                res.status(404).json({message: 'Hotel not found'});
            } else {
                res.status(200).json(hotel);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'hôtel :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération de l\'hôtel' });
        }
    };

    addHotel = async (req: Request, res: Response): Promise<void> => {
        const {name, city, address, description}: HotelInterface = req.body;

        try {
            const newHotel: HotelInterface = {name, city, address, description};
            await this.hotelsService.addHotel(newHotel);
            res.status(201).json({ message: 'Hôtel ajouté avec succès' });
        } catch (error) {
            console.error('Erreur lors de l’ajout de l\'hôtel :', error);
            res.status(500).json({ error: 'Erreur lors de l’ajout de l\'hôtel' });
        }
    };

     updateHotel = async(req: Request, res: Response): Promise<void> =>{
        const { id } = req.params;
        const {name, city, address, description}: HotelInterface = req.body;

        try {
            const updatedHotel: HotelInterface = { hotel_id: Number(id), name, city, address, description };
            await this.hotelsService.updateHotel(updatedHotel);
            res.status(200).json({ message: 'Hôtel mis à jour avec succès' });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'hôtel :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'hôtel' });
        }
    }

    deleteHotel = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            await this.hotelsService.deleteHotel(Number(id));
            res.status(200).json({ message: 'Hôtel supprimé avec succès' });
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'hôtel :', error);
            res.status(500).json({ error: 'Erreur lors de la suppression de l\'hôtel' });
        }
    };

}