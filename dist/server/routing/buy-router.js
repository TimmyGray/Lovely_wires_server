import { Router } from 'express';
import { BuyController } from '../controllers/buy-controller.js';
const buycontroller = new BuyController();
export const buyrouter = Router();
buyrouter.delete(`/deletebuy/:_id`, buycontroller.deleteBuy);
buyrouter.put('/putbuy', buycontroller.putBuy);
buyrouter.post('/postbuy', buycontroller.postBuy);
buyrouter.get('/:_id', buycontroller.getBuy);
buyrouter.get('/', buycontroller.getBuys);
//# sourceMappingURL=buy-router.js.map