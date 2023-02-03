import { ObjectId } from 'mongodb';
import { Wire } from '../models/wire.js';
export class WiresController {
    getWires(req, res) {
        const collection = req.app.locals.wirecollection;
        collection.find({}).toArray(function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            console.log(result);
            return res.send(result);
        });
    }
    getWire(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const id = new ObjectId(req.params._id);
        const collection = req.app.locals.wirescollection;
        collection.findOne({ _id: id }, (e, data) => {
            if (e) {
                console.log(e);
                return res.status(204).send("No content");
            }
            console.log(data);
            return res.send(data);
        });
    }
    getOrderWires(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const group = req.params.group;
        const order = parseInt(req.params.order);
        const collection = req.app.locals.wirecollection;
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
    postWire(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const newwire = new Wire(req.body.name, req.body.firstconn, req.body.secondconn, req.body.length, req.body.coil);
        const collection = req.app.locals.wirecollection;
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
        });
    }
    editWire(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const id = new ObjectId(req.body._id);
        const editwire = new Wire(req.body.name, req.body.firstconn, req.body.secondconn, req.body.length, req.body.coil);
        const collection = req.app.locals.wirecollection;
        collection.findOneAndUpdate({ _id: id }, { $set: editwire }, { returnDocument: 'after' }, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            console.log(result?.value);
            return res.send(result?.value);
        });
    }
    deleteWire(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const id = new ObjectId(req.params._id);
        const collection = req.app.locals.wirecollection;
        collection.findOneAndDelete({ _id: id }, function (err, result) {
            if (err) {
                return console.log(err);
            }
            res.send(result);
            return console.log(result);
        });
    }
}
//# sourceMappingURL=wire-controller.js.map