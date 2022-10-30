import { ObjectId } from 'mongodb';
export class WiresController {
    GetWires(req, res) {
        console.log("Get_Method");
        const collection = req.app.locals.collection;
        collection.find({}).toArray(function (err, wires) {
            if (err) {
                return console.log(err);
            }
            console.log(wires);
            res.send(wires);
        });
        return console.log("Get_Method end");
    }
    PostWire(req, res) {
        console.log("Post_Method");
        if (req.body.name == "" || req.body.name == null) {
            return res.status(400).send("No content");
        }
        const wirename = req.body.name;
        const wirefirstconn = req.body.firstconn;
        const wiresecondconn = req.body.secondconn;
        const wirelength = req.body.length;
        console.log(wirename);
        const wire = { name: wirename, firstconn: wirefirstconn, secondconn: wiresecondconn, length: wirelength };
        const collection = req.app.locals.collection;
        collection.insertOne(wire, function (err, result) {
            if (err) {
                return console.log(err);
            }
            console.log(result);
            console.log(`${wire}`);
            res.send(result);
        });
        return console.log("Post_Method end");
    }
    EditWire(req, res) {
        console.log("Edit_Method");
        if (req.body.name == "" || req.body.name == null) {
            return res.status(400).send("No content");
        }
        const id = new ObjectId(req.body._id);
        const wirename = req.body.name;
        const wirefirstconn = req.body.firstconn;
        const wiresecondconn = req.body.secondconn;
        const wirelength = req.body.length;
        const collection = req.app.locals.collection;
        collection.findOneAndUpdate({ _id: id }, { $set: { name: wirename, firstconn: wirefirstconn, secondconn: wiresecondconn, length: wirelength } }, function (err, result) {
            if (err)
                return console.log(err);
            const wire = result?.value;
            console.log(result);
            console.log(wire);
            res.send(wire);
        });
        return console.log("Edit_Method end");
    }
    DeleteWire(req, res) {
        console.log("Delete_Method");
        if (req.body == "" || req.body == null) {
            return res.status(400).send("No content");
        }
        const id = new ObjectId(req.params._id);
        const collection = req.app.locals.collection;
        collection.findOneAndDelete({ _id: id }, function (err, result) {
            if (err) {
                return console.log(err);
            }
            const wire = result?.value;
            console.log(result);
            console.log(wire);
            res.send(result);
        });
        return console.log("Delete_Method end");
    }
}
//# sourceMappingURL=wire-controller.js.map