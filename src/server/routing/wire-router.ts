import { WiresController } from '../controllers/wire-controller.js'
import { Router } from 'express';

export const wirerouter = Router();
const wirecontroller = new WiresController();

wirerouter.post("/postwire", wirecontroller.postWire);
wirerouter.put("/putwire", wirecontroller.editWire);
wirerouter.delete("/deletewire/:_id", wirecontroller.deleteWire);
wirerouter.get("/:_id", wirecontroller.getWire);
wirerouter.get("/", wirecontroller.getWires);
wirerouter.get("/:group/:order", wirecontroller.getOrderWires);


