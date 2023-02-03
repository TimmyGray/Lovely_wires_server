import { Connector } from '../models/connector.js';
import { ObjectId } from 'mongodb';
export class ConnectorController {
    getConnectors(req, res) {
        const collection = req.app.locals.connectorcollection;
        collection.find({}).toArray(function (e, data) {
            if (e) {
                console.log(e);
                return res.status(400).send(e);
            }
            console.log(data);
            return res.send(data);
        });
    }
    getConnector(req, res) {
        if (!req.body) {
            console.log('Empty request');
            return res.status(400).send("Bad request");
        }
        const id = new ObjectId(req.params._id);
        const collection = req.app.locals.connectorcollection;
        collection.findOne({ _id: id }, (e, data) => {
            if (e) {
                console.log(e);
                return res.status(204).send(`No content ${e}`);
            }
            console.log(data);
            return res.send(data);
        });
    }
    postConnector(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const newConnector = new Connector(req.body.name, req.body.type, req.body.count);
        const collection = req.app.locals.connectorcollection;
        collection.insertOne(newConnector, function (e, data) {
            if (e) {
                console.log(e);
                return res.status(400).send(e);
            }
            console.log(data);
            return res.send({
                _id: data?.insertedId,
                name: newConnector.name,
                type: newConnector.type,
                count: newConnector.count
            });
        });
    }
    putConnector(req, res) {
        if (!req.body) {
            console.log("Emty request");
            return res.status(400).send("Bad request");
        }
        const id = new ObjectId(req.body._id);
        const editConnector = new Connector(req.body.name, req.body.type, req.body.count);
        const collection = req.app.locals.connectorcollection;
        collection.findOneAndUpdate({ _id: id }, { $set: editConnector }, { returnDocument: 'after' }, function (e, data) {
            if (e) {
                console.log(e);
                return res.status(400).send(e);
            }
            console.log(data?.value);
            return res.send(data?.value);
        });
    }
    deleteConnector(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const id = new ObjectId(req.params._id);
        const collection = req.app.locals.connectorcollection;
        collection.findOneAndDelete({ _id: id }, function (e, data) {
            if (e) {
                console.log(e);
                return res.status(400).send(e);
            }
            console.log(data?.value);
            return res.send(data?.value);
        });
    }
}
//# sourceMappingURL=connector-controller.js.map