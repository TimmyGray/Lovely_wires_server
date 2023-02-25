﻿import { Request, Response } from 'express';
import { ObjectId, Collection, GridFSBucket } from 'mongodb';
import { Buy } from '../models/buy.js';
import * as fs from 'fs';
import { Image } from '../models/image.js';
import { Multer } from 'multer';

export class BuyController {

	getBuys(req: Request, res: Response) {

		console.log('Get all buys from storage');

		const collection: Collection = req.app.locals.buyscollection;

		collection.find({}).toArray((e,data) => {

			if (e) {

				console.log(e);
				return res.status(204).send(`No content ${e}`);

			}
			console.log(data);
			return res.send(data);

		});

		

	}

	getBuy(req: Request, res: Response) {

		console.log('Get one buy from storage');

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

		console.log('Edit existing buy');

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
				req.body.count,
				req.body.img);

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

	putImg(req: Request, res: Response) {

		console.log('Edit existing image');

		if (!req.params) {

			console.error('Empty request params');
			return res.status(400).send('Empty request params');

        }

		let image = req.file;
		console.log(image);

        if (image) {

			const imagestore: GridFSBucket = req.app.locals.imagestorage;
			const imgid: ObjectId = new ObjectId(req.params.imgid);
			imagestore.delete(imgid).then(() => {

				if (image != undefined) {

					fs.createReadStream(`./images/${image?.filename}`).pipe(

						imagestore.openUploadStreamWithId(imgid, image.filename, { contentType: `${image?.mimetype}` })

					);

					let editimage: Image = new Image(
						imgid,
						image.filename,
						image.buffer,
						image.size,
						image.mimetype);

					console.log(`Upload successfully:${editimage}`);
					return res.send(editimage);

                }

			}).catch((e) => {

				console.error(e);
				return res.status(400).send(`Bad request ${e}`);

			});


		}

		console.log('The image no editing');
		return res.sendStatus(400);

	}

	postImg(req: Request, res: Response) {

		console.log('Insert image to storage');

		let image = req.file;
		console.log(image);

		if (image) {

			const imagestore: GridFSBucket = req.app.locals.imagestorage;
			let imageid: ObjectId = fs.createReadStream(`./images/${image.filename}`).pipe(imagestore.openUploadStream(image.filename, {
				contentType: `${image.mimetype}`
			}
			)).id;

			console.log(imageid);

			let finalimg: Image = new
				Image(
					imageid,
					image.filename,
					image.buffer,
					image.size,
					image.mimetype);

			console.log(finalimg);
			return res.send(finalimg);
		}

		console.log('The image not inserted');
		return res.sendStatus(400);

	}

	postBuy(req: Request, res: Response) {

		console.log('Insert buy to storage');

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
				req.body.count,
				req.body.img);

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
				count: buy.count,
				img: {
					_id: buy.image?._id,
					name: buy.image?.name,
					size: buy.image?.size,
					bytes: buy.image?.bytes,
					type: buy.image?.type
				}
			});

		});
	}

	deleteBuy(req: Request, res: Response) {

		console.log('Delete buy from storage');

		if (!req.body) {

			console.log("Empty request");
			return res.status(400).send("Bad request");

		}

		const id: ObjectId = new ObjectId(req.params._id);
		const imgeid: ObjectId = new ObjectId(req.params.imgid);
		const collection: Collection = req.app.locals.buyscollection;
		const imagestore: GridFSBucket = req.app.locals.imagestorage;

		collection.findOneAndDelete({ _id: id }, (e, data) => {

			if (e) {

				console.log(e);
				return res.status(204).send(`No content ${e}`);

			}

			console.log(data?.value);

			imagestore.delete(imgeid).then(() => {

				console.log('The image deleted');

			}).catch(() => {

				console.log('The image not deleted');

			});

			return res.send(data?.value);
			
		});

	}

}