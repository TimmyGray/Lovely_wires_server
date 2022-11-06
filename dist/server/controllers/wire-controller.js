import { ObjectId } from 'mongodb';
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
            return res.status(400).send("No content");
        }
        const wirename = req.body.name;
        const wirefirstconn = req.body.firstconn;
        const wiresecondconn = req.body.secondconn;
        const wirelength = req.body.length;
        const wire = { name: wirename, firstconn: wirefirstconn, secondconn: wiresecondconn, length: wirelength };
        const collection = req.app.locals.collection;
        collection.insertOne(wire, function (err, result) {
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
            return res.status(400).send("No content");
        }
        const id = new ObjectId(req.body._id);
        const wirename = req.body.name;
        const wirefirstconn = req.body.firstconn;
        const wiresecondconn = req.body.secondconn;
        const wirelength = req.body.length;
        const collection = req.app.locals.collection;
        collection.findOneAndUpdate({ _id: id }, { $set: { name: wirename, firstconn: wirefirstconn, secondconn: wiresecondconn, length: wirelength } }, function (err, result) {
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
            return res.status(400).send("No content");
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