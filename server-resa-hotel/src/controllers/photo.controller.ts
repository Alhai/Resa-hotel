// controllers/PhotoController.ts
import { Request, Response } from 'express';
import { PhotosService } from '../services/photos-service';
import {PhotoInterface} from "../interfaces/photo-interface";
import {Pool} from "mysql2/promise";

export class PhotoController {
    constructor(private photosService: PhotosService, private pool: Pool) {
    }

    getAllPhotos = async (req: Request, res: Response): Promise<void> => {
        try {
            const photos = await this.photosService.getAllPhotos();
            res.status(200).json(photos);
        } catch (error) {
            console.error('Erreur lors de la récupération des photos :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des photos' });
        }
    };

    getPhotoById = async (req: Request, res: Response): Promise<void> => {
        try {
            const photo = await this.photosService.getPhotoById(Number(req.params.id));
            if (!photo) {
                res.status(404).json({message: 'photo not found'});
            } else {
                res.status(200).json(photo);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de la photo :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération de la photo' });
        }
    };

    addPhoto = async (req: Request, res: Response): Promise<void> => {
        const {chambre_id, url, alt}: PhotoInterface = req.body;

        try {
            const newPhoto: PhotoInterface = {chambre_id, url, alt};
            await this.photosService.addPhoto(newPhoto);
            res.status(201).json({ message: 'Photo ajouté avec succès' });
        } catch (error) {
            console.error('Erreur lors de l’ajout de la photo :', error);
            res.status(500).json({ error: 'Erreur lors de l’ajout de la photo' });
        }
    };

     updatePhoto = async(req: Request, res: Response): Promise<void> =>{
        const { id } = req.params;
        const {chambre_id, url, alt}: PhotoInterface = req.body;

        try {
            const updatedPhoto: PhotoInterface = { photo_id: Number(id), chambre_id, url, alt };
            await this.photosService.updatePhoto(updatedPhoto);
            res.status(200).json({ message: 'photo mis à jour avec succès' });
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la photo :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la photo' });
        }
    }

    deletePhoto = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            await this.photosService.deletePhoto(Number(id));
            res.status(200).json({ message: 'Photo supprimé avec succès' });
        } catch (error) {
            console.error('Erreur lors de la suppression de la photo :', error);
            res.status(500).json({ error: 'Erreur lors de la suppression de la photo' });
        }
    };

}