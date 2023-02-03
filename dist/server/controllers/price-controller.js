import { Price } from '../models/price.js';
import { ObjectId } from 'mongodb';
export class PriceController {
    getPrices(req, res) {
        const collection = req.app.locals.pricecollection;
        collection.find({}).toArray((e, data) => {
            if (e) {
                console.log(e);
                return res.status(400).send(e);
            }
            console.log(data);
            return res.send(data);
        });
    }
    getPrice(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const id = new ObjectId(req.params._id);
        const collection = req.app.locals.pricecollection;
        collection.findOne({ _id: id }, (e, data) => {
            if (e) {
                console.log(e);
                return res.status(404).send(e);
            }
            console.log(data);
            return res.send(data);
        });
    }
    postPrice(req, res) {
        if (!req.body) {
            console.log("Empty request");
            res.status(400).send("Bad request");
        }
        const name = req.body.name;
        const cost = req.body.cost;
        const itemofprice = req.body.itemofprice;
        const newPrice = new Price(name, cost, itemofprice);
        const collection = req.app.locals.pricecollection;
        collection.insertOne(newPrice, (e, data) => {
            if (e) {
                console.log(e);
                return res.status(400).send(e);
            }
            console.log(data);
            return res.send({
                _id: data?.insertedId,
                name: newPrice.name,
                cost: newPrice.cost,
                itemofproce: newPrice.itemofprice
            });
        });
    }
    putPrice(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const id = new ObjectId(req.body._id);
        const name = req.body.name;
        const cost = req.body.cost;
        const itemofprice = req.body.itemofprice;
        const editPrice = new Price(name, cost, itemofprice);
        const collection = req.app.locals.pricecollection;
        collection.findOneAndUpdate({ _id: id }, { $set: editPrice }, { returnDocument: 'after' }, (e, data) => {
            if (e) {
                console.log(e);
                return res.status(400).send(e);
            }
            console.log(data?.value);
            return res.send(data?.value);
        });
    }
    deletePrice(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const id = new ObjectId(req.params._id);
        const collection = req.app.locals.pricecollection;
        collection.findOneAndDelete({ _id: id }, (e, data) => {
            if (e) {
                console.log(e);
                return res.status(400).send(e);
            }
            console.log(data?.value);
            return res.send(data?.value);
        });
    }
}
//# sourceMappingURL=price-controller.js.map