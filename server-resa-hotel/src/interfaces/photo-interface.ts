export interface PhotoInterface {
    photo_id?: number;
    chambre_id: number;
    url: string;
    alt: string;
}

export interface IPhotoOperations {

    addPhoto(photo: PhotoInterface): Promise<void>;
    findAllPhotos(): Promise<PhotoInterface[]>;
    findPhotoById(photoId: number): Promise<PhotoInterface | null>;
    updatePhoto(photo: PhotoInterface): Promise<void>;
    deletePhoto(photoId: number): Promise<void>;
}