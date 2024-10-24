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

export interface IChambreOperations {

    addChambre(chambre: ChambreInterface): Promise<void>;
    findAllChambres(): Promise<ChambreInterface[]>;
    findChambreById(chambreId: number): Promise<ChambreInterface | null>;
    updateChambre(chambre: ChambreInterface): Promise<void>;
    deleteChambre(chambreId: number): Promise<void>;
}