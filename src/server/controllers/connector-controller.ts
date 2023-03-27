import { Connector } from '../models/connector.js';
import { ConnectorType } from '../models/enums.js';
import { Price } from '../models/price.js';
import { Collection, ObjectId } from 'mongodb';
import { Request,Response } from 'express';
import { async } from 'rxjs';

export class ConnectorController {

    getConnectors(req: Request, res: Response) {

		console.log("Get all connectors");

        const collection: Collection = req.app.locals.connectorcollection;

        collection.find({}).toArray(function (e, data) {

            if (e) {

                console.log(e);
                return res.status(400).send(`Bad request ${e.message}`);

            }

            console.log(data);
            return res.send(data);


        });

    }

    getConnector(req: Request, res: Response) {

		console.log("Get one connector from storage");

        if (!req.body) {

            console.log('Empty request');
            return res.status(400).send("Bad request");

        }

        const id: ObjectId = new ObjectId(req.params._id);
        const collection: Collection = req.app.locals.connectorcollection;

        collection.findOne({ _id: id }, (e, data) => {

            if (e) {

                console.log(e);
                return res.status(204).send(`No content ${e.message}`);

            }

            console.log(data);
            return res.send(data);

        });
        
    }

    postConnector(req: Request, res: Response) {

		console.log("Add connector to storage");

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad request");


        }


        const newConnector: Connector = new Connector(req.body.name, req.body.type, req.body.count);
        const collection: Collection = req.app.locals.connectorcollection;

        collection.insertOne(newConnector, function (e,data) {

            if (e) {

                console.log(e);
                return res.status(400).send(`Bad request ${e.message}`);

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

		console.log("Edit connector");

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
                return res.status(400).send(`Bad request ${e.message}`);

            }

            console.log(data?.value);
            return res.send(data?.value);

        })


    }

    async putArrayOfConn(req:Request,res:Response){

        console.log("Edit array of connectors");

        if(!req.body){

            console.error("Empty request");
            return res.status(400).send("Empty request");

        }

        let arraytoput = req.body;
        console.log("Array to put:");
        console.log(arraytoput);

        let arrayofids = new Array();
        for (let con of arraytoput) {

            arrayofids.push(new ObjectId(con._id));
        }

        console.log("Array of id:");
        console.log(arrayofids);

        let arraytosend = new Array();
        const collection: Collection = req.app.locals.connectorcollection;

        for (var i = 0; i < arrayofids.length; i++) {

            await collection.findOneAndUpdate({ _id: arrayofids[i] }, { $set: { count: arraytoput[i].count } }, { returnDocument: "after" })

                .then(value => {

                    console.log('Ediit successful');
                    console.log(value?.value);
                    arraytosend.push(value?.value);

                })

                .catch(e => {

                    console.error(e);
                    return res.status(400).send(`Bad request ${e.message}`);

                })
                
        }

        console.log('Array to send:');
        console.log(arraytosend);
        return res.send(arraytosend);

    }

    deleteConnector(req: Request, res: Response) {

		console.log("Delete connector from storage");

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