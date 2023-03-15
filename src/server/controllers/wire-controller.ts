import { Request, Response } from 'express';
import { Collection, ObjectId } from 'mongodb';
import { Wire } from '../models/wire.js';




export class WiresController {


    getWires(req: Request, res: Response) {

        console.log("Get all wires from storage");


        const collection: Collection = req.app.locals.wirecollection;

        collection.find({}).toArray(function (err, result) {
            if (err) {

                console.log(err);
                return res.status(400).send(err);
            }

            console.log(result);
            return res.send(result);


        });


    }

    getWire(req: Request, res: Response) {

		console.log("Get one wire");

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad request");

        }

        const id: ObjectId = new ObjectId(req.params._id);
        const collection: Collection = req.app.locals.wirescollection;

        collection.findOne({ _id: id }, (e, data) => {

            if (e) {

                console.log(e);
                return res.status(204).send("No content");

            }

            console.log(data);
            return res.send(data);

        });

    }

    getOrderWires(req: Request,res:Response) {
		
		console.log("Get ordered wires");
		
        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad request");

        }

        const group: string = req.params.group;
        const order: number = parseInt(req.params.order);

        const collection: Collection = req.app.locals.wirecollection;

        switch (group) {

            case 'firstconnector': {

                collection.aggregate([

                    { $sort: { "firstconn": order } }

                ]).toArray(function (err, result) {

                    if (err) {

                        console.log(err);
                        return res.status(400).send(err);

                    }

                    console.log(result);
                    return res.send(result);

                });

                break;

            }

            case 'length': {

                collection.aggregate([

                    { $sort: { "length": order } }

                ]).toArray(function (err, result) {

                    if (err) {

                        console.log(err);
                        return res.status(400).send(err);

                    }

                    console.log(result);
                    return res.send(result);

                });

                break;

            }

            case 'secondconnector': {

                collection.aggregate([

                    { $sort: { "secondconn": order } }

                ]).toArray(function (err, result) {

                    if (err) {

                        console.log(err);
                        return res.status(400).send(err);
                    }
                    
                    console.log(result);
                    return res.send(result);

                });

                break;

            }

        }
     

        
    }

    postWire(req: Request, res: Response) {

		console.log("Add wire to storage");

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad request");
        }


        const newwire: Wire = new Wire(req.body.name, req.body.firstconn, req.body.secondconn, req.body.length, req.body.coil);
        const collection: Collection = req.app.locals.wirecollection;

        collection.insertOne(newwire, function (err, result) {

            if (err) {

                return console.log(err);
            }

            console.log(result);

            return res.send({
                _id: result?.insertedId,
                name: newwire.name,
                firstconn: newwire.firstconn,
                secondconn: newwire.secondconn,
                length: newwire.length,
                coil: newwire.coil
            });


        })




    }


    editWire(req: Request, res: Response) {
		
		console.log("Edit wire");
		
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }


        const id = new ObjectId(req.body._id);

        const editwire: Wire = new Wire(req.body.name, req.body.firstconn, req.body.secondconn, req.body.length, req.body.coil);
        const collection: Collection = req.app.locals.wirecollection;

        collection.findOneAndUpdate({ _id: id }, { $set: editwire }, { returnDocument: 'after' }, function (err, result) {

            if (err) {

                console.log(err);
                return res.status(400).send(err);

            }

            console.log(result?.value);

            return res.send(result?.value);


        });



    }
  

    deleteWire(req: Request, res: Response) {
		
		console.log("Delete wire from storage");
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }

        const id = new ObjectId(req.params._id);

        const collection: Collection = req.app.locals.wirecollection;

        collection.findOneAndDelete({ _id: id }, function (err, result) {

            if (err) {
                return console.log(err);
            }

            res.send(result);
            return console.log(result?.value);

        })


    }

    



}

