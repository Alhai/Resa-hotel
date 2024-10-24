import { Router } from 'express';
import { PhotoController } from '../controllers/photo.controller';
import { PhotosService } from "../services/photos-service";
import {PhotosDal} from "../dals/photos-dal";

import {pool} from "../config/config";

const photosService = new PhotosService(new PhotosDal());
const photoController = new PhotoController(photosService, pool);

const photoRouter = Router();
photoRouter.get('/', photoController.getAllPhotos.bind(photoController));
photoRouter.get('/:id', photoController.getPhotoById.bind(photoController));
photoRouter.post('/', photoController.addPhoto.bind(photoController));
photoRouter.put('/:id', photoController.updatePhoto.bind(photoController));
photoRouter.delete('/:id', photoController.deletePhoto.bind(photoController));

export default photoRouter;
