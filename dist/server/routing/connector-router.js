import { ConnectorController } from '../controllers/connector-controller.js';
import { Router } from 'express';
const controller = new ConnectorController();
export const connectorrouter = Router();
connectorrouter.delete('/deleteconn/:_id', controller.deleteConnector);
connectorrouter.put('/putconn', controller.putConnector);
connectorrouter.post('/postconn', controller.postConnector);
connectorrouter.get('/:_id', controller.getConnector);
connectorrouter.get('/', controller.getConnectors);
//# sourceMappingURL=connector-router.js.map