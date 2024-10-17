import {IUser} from "./user-interface";

export interface ChambreInterface {
    chambre_id?: number;
    hotel_id: number;
    num: number;
    type: string;
    description: string;
    size: number;
    price: number;
    is_available: boolean;
}

export interface IUserOperations {

    addChambre(user: IUser): Promise<void>;
    findAllChambres(): Promise<IUser[]>;
    findChambreById(userId: number): Promise<IUser | null>;
    updateChambre(user: IUser): Promise<void>;
    deleteChambre(userId: number): Promise<void>;
}