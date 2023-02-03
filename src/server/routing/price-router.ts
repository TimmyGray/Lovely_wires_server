import { Router } from 'express';
import { PriceController } from '../controllers/price-controller.js';

const pricecontroller: PriceController = new PriceController();
export const pricerouter: Router = Router();


pricerouter.delete('/deleteprice/:_id', pricecontroller.deletePrice);
pricerouter.put('/putprice', pricecontroller.putPrice);
pricerouter.post('/postprice', pricecontroller.postPrice);
pricerouter.get('/:_id', pricecontroller.getPrice);
pricerouter.get('/', pricecontroller.getPrices);
