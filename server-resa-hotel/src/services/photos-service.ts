import {PhotosDal} from '../dals/photos-dal';
import {PhotoInterface} from '../interfaces/photo-interface';

export class PhotosService {
    constructor(private photosDal:PhotosDal) {
    }

    getAllPhotos = async (): Promise<PhotoInterface[]> => {
        return await this.photosDal.findAll();
    };

    getPhotoById = async (id: number): Promise<PhotoInterface | null> => {
        return await this.photosDal.findById(id);
    };



    addPhoto = async (Photo: PhotoInterface): Promise<void> => {
        return await this.photosDal.addPhoto(Photo);
    };

    async updatePhoto(Photo: PhotoInterface): Promise<void> {
        return await this.photosDal.updatePhoto(Photo);
    }

    deletePhoto = async (PhotoId: number): Promise<void> => {
        return  await this.photosDal.deletePhoto(PhotoId);
    };
}

