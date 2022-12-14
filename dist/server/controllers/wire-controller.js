import { ObjectId } from 'mongodb';
import { Wire } from '../models/wire.js';
export class WiresController {
    GetWires(req, res) {
        const collection = req.app.locals.collection;
        collection.find({}).toArray(function (err, result) {
            if (err) {
                return console.log(err);
            }
            res.send(result);
            return console.log(result);
        });
    }
    GetOrderWires(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const group = req.params.group;
        const order = parseInt(req.params.order);
        const collection = req.app.locals.collection;
        switch (group) {
            case 'firstconnector': {
                collection.aggregate([
                    { $sort: { "firstconn": order } }
                ]).toArray(function (err, result) {
                    if (err) {
                        return console.log(err);
                    }
                    res.send(result);
                    return console.log(result);
                });
                break;
            }
            case 'length': {
                collection.aggregate([
                    { $sort: { "length": order } }
                ]).toArray(function (err, result) {
                    if (err) {
                        return console.log(err);
                    }
                    res.send(result);
                    return console.log(result);
                });
                break;
            }
            case 'secondconnector': {
                collection.aggregate([
                    { $sort: { "secondconn": order } }
                ]).toArray(function (err, result) {
                    if (err) {
                        return console.log(err);
                    }
                    res.send(result);
                    return console.log(result);
                });
                break;
            }
        }
    }
    PostWire(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const newwire = new Wire(req.body.name, req.body.firstconn, req.body.secondconn, req.body.length, req.body.coil);
        const collection = req.app.locals.collection;
        collection.insertOne(newwire, function (err, result) {
            if (err) {
                return console.log(err);
            }
            res.send(result);
            return console.log(result);
        });
    }
    EditWire(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const id = new ObjectId(req.body._id);
        const editwire = new Wire(req.body.name, req.body.firstconn, req.body.secondconn, req.body.length, req.body.coil);
        const collection = req.app.locals.collection;
        collection.findOneAndUpdate({ _id: id }, { $set: editwire }, function (err, result) {
            if (err) {
                return console.log(err);
            }
            res.send(result);
            return console.log(result);
        });
    }
    DeleteWire(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const id = new ObjectId(req.params._id);
        const collection = req.app.locals.collection;
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