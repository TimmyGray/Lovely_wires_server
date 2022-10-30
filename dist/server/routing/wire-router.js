import { WiresController } from '../controllers/wire-controller.js';
import { Router } from 'express';
export const wirerouter = Router();
const wirecontroller = new WiresController();
wirerouter.post("/post", wirecontroller.PostWire);
wirerouter.put("/edit", wirecontroller.EditWire);
wirerouter.delete("/delete/:_id", wirecontroller.DeleteWire);
wirerouter.get("/", wirecontroller.GetWires);
//# sourceMappingURL=wire-router.js.map