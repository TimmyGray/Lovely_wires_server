import { Request, response, Response } from 'express';
import { Collection, ObjectId } from 'mongodb';

export class CoilController {

    GetCoils(req:Request,res:Response) {

        const collection: Collection = req.app.locals.coilcollection;

        collection.find({}).toArray(function(err, result){

            if (err) {

                return console.log(err);

            }

            res.send(result);

            return console.log(result);


        })


    }

    GetOneCoil(req:Request,res:Response) {

        if (!req.body) {

            console.log("Bad request");
            return res.status(400).send("Empty Request");

        }

        const id: ObjectId = new ObjectId(req.params._id);

        const collection: Collection = req.app.locals.coilcollection;

        collection.findOne({ _id: id }, function (err, result) {

            if (err) {

                return console.log(err);

            }

            res.send(result);

            return console.log(result);


        });


    }

    PostCoil(req: Request, res: Response) {

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad request");

        }

        const _coilname = req.body.coilname;
        const _coiltype = req.body.coiltype;
        const _coilcorenumber = req.body.coilcorenumber;
        const _coillength = req.body.coillength;

        const collection: Collection = req.app.locals.coilcollection;

        collection.insertOne({ coilname: _coilname, coiltype: _coiltype, coilcorenumber: _coilcorenumber, coillength: _coillength }, function (err, result) {

            if (err) {
                return console.log(err);
            }


            res.send(result);

            return console.log(result);

        });
    }

    EditCoil(req: Request, res: Response) {

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad Request");
        }

        const _coilid: ObjectId = new ObjectId(req.body._id); 
        const _coilname = req.body.coilname;
        const _coiltype = req.body.coiltype;
        const _coilcorenumber = req.body.coilcorenumber;
        const _coillength = req.body.coillength;

        const collection: Collection = req.app.locals.coilcollection;

        collection.findOneAndUpdate({ _id: _coilid }, { $set: { coilname: _coilname, coiltype: _coiltype, coilcorenumber: _coilcorenumber, coillength: _coillength } },
            function (err, result) {

                if (err) {

                    return console.log(err);

                }

                res.send(result);
                return console.log(result);

        });

    }

    DeleteCoil(req: Request, res: Response) {

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad Request");

        }

        const _coilid: ObjectId = new ObjectId(req.params._id);

        const collection: Collection = req.app.locals.coilcollection;

        collection.findOneAndDelete({ _id: _coilid }, function (err, result) {

            if (err) {
                return console.log(err);
            }

            res.send(result);
            return console.log(result);

        })

    }

}