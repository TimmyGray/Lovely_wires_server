import { Price } from '../models/price.js';
import { Request, Response } from 'express';
import { Collection, ObjectId } from 'mongodb';
import { IItem } from '../models/IItem.js';

export class PriceController {


    getPrices(req: Request, res: Response) {

        console.log("Get all prices from storage");

        const collection: Collection = req.app.locals.pricecollection;
        collection.find({}).toArray((e, data) => {

            if (e) {

                console.log(e);
                return res.status(400).send(e);
            }

            console.log(data);
            return res.send(data);

        })

    }

    getPrice(req: Request, res: Response) {

		console.log("Get price from storage");

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad request");

        }

        const id: ObjectId = new ObjectId(req.params._id);
        const collection: Collection = req.app.locals.pricecollection;
        collection.findOne({ _id: id }, (e, data) => {

            if (e) {
                console.log(e);
                return res.status(404).send(e);
            }

            console.log(data);
            return res.send(data);

        });

    }

    postPrice(req: Request, res: Response) {

		console.log("Add price to storage");

        if (!req.body) {

            console.log("Empty request");
            res.status(400).send("Bad request");

        }

        const name: string = req.body.name;
        const cost: number = req.body.cost;
        const itemofprice: IItem = req.body.itemofprice;
        const newPrice: Price = new Price(name, cost, itemofprice);
        const collection: Collection = req.app.locals.pricecollection;

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

    putPrice(req: Request, res: Response) {

		console.log("Edit price");

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad request");

        }

        const id: ObjectId = new ObjectId(req.body._id);
        const name: string = req.body.name;
        const cost: number = req.body.cost;
        const itemofprice: IItem = req.body.itemofprice;
        const editPrice: Price = new Price(name, cost, itemofprice);
        const collection: Collection = req.app.locals.pricecollection;

        collection.findOneAndUpdate({ _id: id }, { $set: editPrice }, { returnDocument: 'after' }, (e, data) => {

            if (e) {

                console.log(e);
                return res.status(400).send(e);

            }

            console.log(data?.value);
            return res.send(data?.value);

        });


    }

    deletePrice(req: Request, res: Response) {

		console.log("Delete price from storage");

        if (!req.body) {

            console.log("Empty request");
            return res.status(400).send("Bad request");

        }

        const id: ObjectId = new ObjectId(req.params._id);
        const collection: Collection = req.app.locals.pricecollection;

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