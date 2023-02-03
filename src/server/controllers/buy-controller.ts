import { Request, Response } from 'express';
import { ObjectId, Collection } from 'mongodb';
import { Buy } from '../models/buy.js';

export class BuyController {

	getBuys(req: Request, res: Response) {

		const collection: Collection = req.app.locals.buyscollection;

		collection.find({}).toArray((e,data) => {

			if (e) {

				console.log(e);
				return res.status(400).send(`Bad request ${e}`);

			}
			console.log(data);
			return res.send(data);

		});

		

	}

	getBuy(req: Request, res: Response) {

		if (!req.body) {

			console.log("Empty request");
			return res.status(400).send("Bade request");

		}

		const id: ObjectId = new ObjectId(req.params._id);
		const collection: Collection = req.app.locals.buyscollection;

		collection.findOne({ _id: id }, (e, data) => {

			if (e) {

				console.log(e);
				return res.status(204).send(`No content ${e}`);

			}

			console.log(data);
			return res.send(data);

		});


	}

	putBuy(req: Request, res: Response) {

		if (!req.body) {

			console.log("Empty request");
			return res.status(400).send("Bad request");

		}

		const id: ObjectId = new ObjectId(req.body._id);

		const buy: Buy =
			new Buy(
				req.body.name,
				req.body.description,
				req.body.cost,
				req.body.item,
				req.body.count);

		const collection: Collection = req.app.locals.buyscollection;

		collection.findOneAndUpdate({ _id: id }, { $set: buy }, { returnDocument: 'after' }, (e, data) => {

			if (e) {

				console.log(e);
				return res.status(400).send(`Bad request ${e}`);

			}

			console.log(data?.value);
			return res.send(data?.value);

		});
	}

	postBuy(req: Request, res: Response) {

		if (!req.body) {

			console.log("Empty request");
			return res.status(400).send("Bad request");

		}

		const buy: Buy =
			new Buy(
				req.body.name,
				req.body.description,
				req.body.cost,
				req.body.item,
				req.body.count);

		const collection: Collection = req.app.locals.buyscollection;

		collection.insertOne(buy, (e, data) => {

			if (e) {

				console.log(e);
				return res.status(400).send(`Bad request ${e}`);
			}
			
			console.log(data);


			return res.send({
				_id: data?.insertedId,
				name: buy.name,
				description: buy.description,
				item: buy.item,
				cost: buy.cost,
				count: buy.count
			});

		});
	}

	deleteBuy(req: Request, res: Response) {

		if (!req.body) {

			console.log("Empty request");
			return res.status(400).send("Bad request");

		}

		const id: ObjectId = new ObjectId(req.params._id);
		const collection: Collection = req.app.locals.buyscollection;

		collection.findOneAndDelete({ _id: id }, (e, data) => {

			if (e) {

				console.log(e);
				return res.status(204).send(`No content ${e}`);

			}

			console.log(data?.value);
			return res.send(data?.value);

		});

	}

}