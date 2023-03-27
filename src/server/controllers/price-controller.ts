import { Price } from '../models/price.js';
import { Request, Response } from 'express';
import { Collection, ObjectId } from 'mongodb';
import { IItem } from '../models/IItem.js';
import console from 'console';

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
        console.log('id to find:');
        console.log(id);
        const collection: Collection = req.app.locals.pricecollection;
        collection.findOne({ "itemofprice._id": id },async (e, data) => {

            if (e) {

                console.log('Bad request');
                return res.status(404).send(`Bad request:${e}`);

            }

            if (data == null) {

                console.log('try to find price by item id');

                await collection.findOne({ "itemofprice._id": req.params._id }, (e, data) => {

                    if (e || data == null) {

                        console.log(e);
                        return res.status(400).send(`Bad request: ${e}`);

                    }

                    console.log(data);
                    return res.send(data);

                })

            }
            else {

                console.log(data);
                return res.send(data);

            }

        });

    }

    getArrayOfPrices(req:Request, res:Response){

        console.log("Get array of prices");

        let paramshead = JSON.parse(req.headers.params as string);
        if (paramshead == undefined) {

            console.log('Empty request');
            return res.status(400).send('Empty request');

        }

        let paramstofind: string[] = paramshead.arrayofprices as string[];
        const collecction: Collection = req.app.locals.pricecollection;
        collecction.find({ "itemofprice._id": { $in: paramstofind } }).toArray((e, value) => {

            if (e || value == undefined) {

                console.log(e);
                return res.status(400).send(`Bad request: ${e}`);

            }
            console.log("Prices to find:");
            console.log(paramstofind);
            console.log('Found prices:');
            console.log(value);

            let arrayoffound = new Array();
            let arraytosend = new Array();
            let find: boolean = false;

            for (var i = 0; i < value.length; i++) {

                console.log(value[i].name)
                arrayoffound.push(value[i]);

            }
           

            for (var i = 0; i < paramstofind.length; i++) {
                find = false;
                for (var j = 0; j < arrayoffound.length; j++) {

                    if (arrayoffound[j].itemofprice._id == paramstofind[i]) {

                        arraytosend.push(arrayoffound[j]);
                        find = true;
                        break;

                    }
                    
                   
                }
                if (!find) {

                    let price: Price = new Price("", 0, { name: "", type: "" });
                    arraytosend.push(price);

                }

            }

            console.log(arraytosend);
            return res.send(arraytosend);

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