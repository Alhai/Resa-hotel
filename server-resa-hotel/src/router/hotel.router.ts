import { Router } from 'express';
import { HotelController } from '../controllers/hotel.controller';
import {HotelsService} from "../services/hotels-service";
import {HotelDal} from "../dals/hotel-dal";
import {pool} from "../config/config";

const hotelsService = new HotelsService(new HotelDal());
const hotelController = new HotelController(hotelsService, pool);

const hotelRouter = Router();
hotelRouter.get('/', hotelController.getAllHotels.bind(hotelController));
hotelRouter.get('/:id', hotelController.getHotelById.bind(hotelController));
hotelRouter.post('/', hotelController.addHotel.bind(hotelController));
hotelRouter.put('/:id', hotelController.updateHotel.bind(hotelController));
hotelRouter.delete('/:id', hotelController.deleteHotel.bind(hotelController));

export default hotelRouter;
