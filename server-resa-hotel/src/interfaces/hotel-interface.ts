export interface HotelInterface {
    hotel_id?: number;
    name: number;
    city: string;
    address: string;
    description: number;
}

export interface IHotelOperations {
    addHotel(hotel: HotelInterface): Promise<void>;
    findAllHotels(): Promise<HotelInterface[]>;
    findHotelById(hotelId: number): Promise<HotelInterface | null>;
    updateHotel(hotel: HotelInterface): Promise<void>;
    deleteHotel(hotelId: number): Promise<void>;
}