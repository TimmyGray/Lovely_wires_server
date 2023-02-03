import { Connector } from '../models/connector.js';
import { ConnectorType } from '../models/enums.js';
import { Price } from '../models/price.js';
import { Collection, ObjectId } from 'mongodb';
import { Request,Response } from 'express';

export class ConnectorController {

    getConnectors(req: Request, res: Response) {

        const collection: Collection = req.app.locals.connectorcollection;

        collection.find({}).toArray(function (e, data) {

            if (e) {

                console.log(e);
                return res.status(400).send(e);

            }

            console.log(data);
            return res.send(data);


        });

    }

    getConnector(req: Request, res: Response) {

        if (!req.body) {

            console.log('Empty request');
            return res.status(400).send("Bad request");

        }

        const id: ObjectId = new ObjectId(req.params._id);
        const collection: Collection = req.app.locals.connectorcollection;

        collection.findOne({ _id: id }, (e, data) => {

            if (e) {

                console.log(e);
                return res.status(204).send(`No content ${e}`);

            }

            console.log(data);
            return res.send(data);

        });
        
    }

    postConnector(req: Request, res: Response) {


        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad request");


        }


        const newConnector: Connector = new Connector(req.body.name, req.body.type, req.body.count);
        const collection: Collection = req.app.locals.connectorcollection;

        collection.insertOne(newConnector, function (e,data) {

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

    putConnector(req: Request, res: Response) {

        if (!req.body) {

            console.log("Emty request");
            return res.status(400).send("Bad request");

        }

        const id: ObjectId = new ObjectId(req.body._id);
        const editConnector: Connector = new Connector(req.body.name, req.body.type, req.body.count);
        const collection: Collection = req.app.locals.connectorcollection;

        collection.findOneAndUpdate({ _id: id }, { $set: editConnector }, { returnDocument: 'after' }, function (e, data) {

            if (e) {

                console.log(e);
                return res.status(400).send(e);

            }

            console.log(data?.value);
            return res.send(data?.value);

        })


    }

    deleteConnector(req: Request, res: Response) {

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad request");

        }

        const id: ObjectId = new ObjectId(req.params._id);
        const collection: Collection = req.app.locals.connectorcollection;

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