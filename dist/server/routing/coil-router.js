import { CoilController } from '../controllers/coil-controller.js';
import { Router } from 'express';
export const coilrouter = Router();
const coilcontroller = new CoilController();
coilrouter.get("/", coilcontroller.GetCoils);
coilrouter.get("/:_id", coilcontroller.GetOneCoil);
coilrouter.post("/postcoil", coilcontroller.PostCoil);
coilrouter.put("/putcoil", coilcontroller.EditCoil);
coilrouter.delete("/deletecoil/:_id", coilcontroller.DeleteCoil);
//# sourceMappingURL=coil-router.js.map