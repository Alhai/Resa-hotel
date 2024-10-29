export interface HotelInterface {
    hotel_id?: number;
    name: string;
    city: string;
    address: string;
    description: string;
}

export interface IHotelOperations {
    addHotel(hotel: HotelInterface): Promise<void>;
    findAllHotels(): Promise<HotelInterface[]>;
    findHotelById(hotelId: number): Promise<HotelInterface | null>;
    updateHotel(hotel: HotelInterface): Promise<void>;
    deleteHotel(hotelId: number): Promise<void>;
}