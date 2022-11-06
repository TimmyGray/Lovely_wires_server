import { Request, Response } from 'express';
import { Collection, ObjectId } from 'mongodb';




export class WiresController {

    GetWires(req: Request, res: Response) {

        const collection: Collection = req.app.locals.collection;

        collection.find({}).toArray(function (err, result) {
            if (err) {
                return console.log(err);
            }

            res.send(result);
            return console.log(result);


        })


    }

    PostWire(req: Request, res: Response) {

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("No content");
        }


        const wirename = req.body.name;

        const wirefirstconn = req.body.firstconn;

        const wiresecondconn = req.body.secondconn;

        const wirelength = req.body.length;


        const wire = { name: wirename, firstconn: wirefirstconn, secondconn: wiresecondconn, length: wirelength };
        const collection: Collection = req.app.locals.collection;

        collection.insertOne(wire, function (err, result) {

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
            return res.status(400).send("No content");
        }


        const id = new ObjectId(req.body._id);
        const wirename = req.body.name;
        const wirefirstconn = req.body.firstconn;
        const wiresecondconn = req.body.secondconn;
        const wirelength = req.body.length;
        const collection: Collection = req.app.locals.collection;

        collection.findOneAndUpdate({ _id: id }, { $set: { name: wirename, firstconn: wirefirstconn, secondconn: wiresecondconn, length: wirelength } }, function (err, result) {

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
            return res.status(400).send("No content");
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

