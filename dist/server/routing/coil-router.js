import { CoilController } from '../controllers/coil-controller.js';
import { Router } from 'express';
export const coilrouter = Router();
const coilcontroller = new CoilController();
coilrouter.delete("/deletecoil/:_id", coilcontroller.deleteCoil);
coilrouter.put("/putcoil", coilcontroller.editCoil);
coilrouter.post("/postcoil", coilcontroller.postCoil);
coilrouter.get("/:_id", coilcontroller.getCoil);
coilrouter.get("/", coilcontroller.getCoils);
//# sourceMappingURL=coil-router.js.map