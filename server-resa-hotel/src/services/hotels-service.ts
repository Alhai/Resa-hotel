import {HotelDal} from '../dals/hotel-dal';
import {HotelInterface} from '../interfaces/hotel-interface';

export class HotelsService {
    constructor(private hotelsDal:HotelDal) {
    }

    getAllHotels = async (): Promise<HotelInterface[]> => {
        return await this.hotelsDal.findAll();
    };

    getHotelById = async (id: number): Promise<HotelInterface | null> => {
        return await this.hotelsDal.findById(id);
    };



    addHotel = async (Hotel: HotelInterface): Promise<void> => {
        return await this.hotelsDal.addHotel(Hotel);
    };

    async updateHotel(Hotel: HotelInterface): Promise<void> {
        return await this.hotelsDal.updateHotel(Hotel);
    }

    deleteHotel = async (HotelId: number): Promise<void> => {
        return  await this.hotelsDal.deleteHotel(HotelId);
    };
}

