import { Request, response, Response } from 'express';
import { Collection, ObjectId } from 'mongodb';
import { Coil } from '../models/coil.js';

export class CoilController {

    getCoils(req:Request,res:Response) {

		console.log("Get all coils from storage");

        const collection: Collection = req.app.locals.coilcollection;

        collection.find({}).toArray(function(err, result){

            if (err) {

                return console.log(err);

            }

            console.log(result);
            return res.send(result);



        })


    }

    getCoil(req:Request,res:Response) {

		console.log("Get one coil from storage");

        if (!req.body) {

            console.log("Bad request");
            return res.status(400).send("Empty Request");

        }

        const id: ObjectId = new ObjectId(req.params._id);

        const collection: Collection = req.app.locals.coilcollection;

        collection.findOne({ _id: id }, function (err, result) {

            if (err) {

                console.log(err);
                return res.status(400).send(err);

            }

            console.log(result);
            return res.send(result);



        });


    }

    postCoil(req: Request, res: Response) {

		console.log("Add coil to storage");

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad request");

        }

        const collection: Collection = req.app.locals.coilcollection;

        const newcoil: Coil = new Coil(req.body.name, req.body.type, req.body.typeofsignal, req.body.length);

        collection.insertOne(newcoil, function (err, result) {

            if (err) {

                console.log(err);
                return res.status(400).send(err);

            }


            console.log(result);
            return res.send({
                _id: result?.insertedId,
                name: newcoil.name,
                type: newcoil.type,
                typeofsignal: newcoil.typeofsignal,
                length: newcoil.length
            });


        });
    }

    editCoil(req: Request, res: Response) {

		console.log("Edit coil");

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad Request");
        }

        const _coilid: ObjectId = new ObjectId(req.body._id); 

        const editcoil: Coil = new Coil(req.body.name, req.body.type, req.body.typeofsignal, req.body.length);

        const collection: Collection = req.app.locals.coilcollection;

        collection.findOneAndUpdate({ _id: _coilid }, { $set: editcoil }, { returnDocument: 'after' },

            function (err, result) {

                if (err) {

                    console.log(err);
                    return res.status(400).send(err);

                }

                console.log(result);
                return res.send(result);


            }
        );

    }

    deleteCoil(req: Request, res: Response) {

		console.log("Delete one coil from storage");

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad Request");

        }

        const _coilid: ObjectId = new ObjectId(req.params._id);

        const collection: Collection = req.app.locals.coilcollection;

        collection.findOneAndDelete({ _id: _coilid }, function (err, result) {

            if (err) {

                console.log(err);
                return res.status(400).send(err);

            }

            console.log(result);
            return res.send(result?.value);


        })

    }

}