import { Router } from 'express';
import { OrderController } from '../controllers/order-controller.js'

export const orderrouter: Router = Router();
const ordercontroller: OrderController = new OrderController();

orderrouter.delete("/deleteorder/:_id", ordercontroller.deleteOrder);
orderrouter.put("/putorder", ordercontroller.putOrder);
orderrouter.get("/", ordercontroller.getOrders);
