export interface ChambreModel {
    chambre_id: number;
    hotel_id: number;
    num: number;
    type: string;
    description: string;
    size: number;
    price: number;
    is_available: boolean;
}
export interface CreateChambreModelDTO {
    hotel_id: number;
    num: number;
    type: string;
    description: string;
    size: number;
    price: number;
    is_available: boolean;
}