import { Router } from 'express';
import { PriceController } from '../controllers/price-controller.js';
const pricecontroller = new PriceController();
export const pricerouter = Router();
pricerouter.delete('/deleteprice/:_id', pricecontroller.deletePrice);
pricerouter.put('/putprice', pricecontroller.putPrice);
pricerouter.post('/postprice', pricecontroller.postPrice);
pricerouter.get('/:_id', pricecontroller.getPrice);
pricerouter.get('/', pricecontroller.getPrices);
//# sourceMappingURL=price-router.js.map