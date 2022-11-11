import { WiresController } from '../controllers/wire-controller.js';
import { Router } from 'express';
export const wirerouter = Router();
const wirecontroller = new WiresController();
wirerouter.post("/postwire", wirecontroller.PostWire);
wirerouter.put("/putwire", wirecontroller.EditWire);
wirerouter.delete("/deletewire/:_id", wirecontroller.DeleteWire);
wirerouter.get("/", wirecontroller.GetWires);
wirerouter.get("/:group/:order", wirecontroller.GetOrderWires);
//# sourceMappingURL=wire-router.js.map