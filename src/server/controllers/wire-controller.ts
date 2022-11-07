import { Request, Response } from 'express';
import { Collection, ObjectId } from 'mongodb';
import { Wire } from '../models/wire.js';




export class WiresController {

    GetWires(req: Request, res: Response) {

        const collection: Collection = req.app.locals.collection;

        collection.find({}).toArray(function (err, result) {
            if (err) {
                return console.log(err);
            }

            res.send(result);
            return console.log(result);


        });


    }

    GetOrderWires(req: Request,res:Response) {

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad request");

        }

        const group: string = req.params.group;
        const order: string = req.params.order;

        const collection: Collection = req.app.locals.collection;

    }

    PostWire(req: Request, res: Response) {

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad request");
        }


        const newwire: Wire = new Wire(req.body.name, req.body.firstconn, req.body.secondconn, req.body.length, req.body.coil);
        const collection: Collection = req.app.locals.collection;

        collection.insertOne(newwire, function (err, result) {

            if (err) {

                return console.log(err);
            }

            res.send(result);
            return console.log(result);


        })




    }


    EditWire(req: Request, res: Response) {

        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }


        const id = new ObjectId(req.body._id);

        const editwire: Wire = new Wire(req.body.name, req.body.firstconn, req.body.secondconn, req.body.length, req.body.coil);
        const collection: Collection = req.app.locals.collection;

        collection.findOneAndUpdate({ _id: id }, { $set: editwire }, function (err, result) {

            if (err) {

                return console.log(err);

            }

            res.send(result);
            return console.log(result);


        });



    }
  

    DeleteWire(req: Request, res: Response) {

        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }

        const id = new ObjectId(req.params._id);

        const collection: Collection = req.app.locals.collection;

        collection.findOneAndDelete({ _id: id }, function (err, result) {

            if (err) {
                return console.log(err);
            }

            res.send(result);
            return console.log(result);

        })


    }

    



}

