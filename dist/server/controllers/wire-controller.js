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
    PostWire(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const newwire = new Wire(req.body.wirename, req.body.wirefirstconn, req.body.wiresecondconn, req.body.wirelength, req.body.wirecoil);
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
        const editwire = new Wire(req.body.wirename, req.body.wirefirstconn, req.body.wiresecondconn, req.body.wirelength, req.body.wirecoil);
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