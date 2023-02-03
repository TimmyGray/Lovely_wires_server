import { ObjectId } from 'mongodb';
import { Coil } from '../models/coil.js';
export class CoilController {
    getCoils(req, res) {
        const collection = req.app.locals.coilcollection;
        collection.find({}).toArray(function (err, result) {
            if (err) {
                return console.log(err);
            }
            console.log(result);
            return res.send(result);
        });
    }
    getCoil(req, res) {
        if (!req.body) {
            console.log("Bad request");
            return res.status(400).send("Empty Request");
        }
        const id = new ObjectId(req.params._id);
        const collection = req.app.locals.coilcollection;
        collection.findOne({ _id: id }, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            console.log(result);
            return res.send(result);
        });
    }
    postCoil(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const collection = req.app.locals.coilcollection;
        const newcoil = new Coil(req.body.name, req.body.type, req.body.typeofsignal, req.body.length);
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
    editCoil(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad Request");
        }
        const _coilid = new ObjectId(req.body._id);
        const editcoil = new Coil(req.body.name, req.body.type, req.body.typeofsignal, req.body.length);
        const collection = req.app.locals.coilcollection;
        collection.findOneAndUpdate({ _id: _coilid }, { $set: editcoil }, { returnDocument: 'after' }, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            console.log(result);
            return res.send(result);
        });
    }
    deleteCoil(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad Request");
        }
        const _coilid = new ObjectId(req.params._id);
        const collection = req.app.locals.coilcollection;
        collection.findOneAndDelete({ _id: _coilid }, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            console.log(result);
            return res.send(result);
        });
    }
}
//# sourceMappingURL=coil-controller.js.map