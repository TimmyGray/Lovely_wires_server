import { ConnectorController } from '../controllers/connector-controller.js';
import { Router } from 'express';

const controller: ConnectorController = new ConnectorController();
export const connectorrouter: Router = Router();

connectorrouter.delete('/deleteconn/:_id', controller.deleteConnector);
connectorrouter.put('/putconn', controller.putConnector);
connectorrouter.put('/putarrayofconn', controller.putArrayOfConn);
connectorrouter.post('/postconn', controller.postConnector);
connectorrouter.get('/:_id', controller.getConnector);
connectorrouter.get('/', controller.getConnectors);

