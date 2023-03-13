import { Request, Response } from 'express';
import { ObjectId, Collection, GridFSBucket } from 'mongodb';
import { Buy } from '../models/buy.js';
import * as fs from 'fs';
import { Image } from '../models/image.js';
import { Multer } from 'multer';
import { mkdir } from 'fs/promises';

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

			if (e || data == undefined || data == null) {

				console.log(e);
				return res.status(400).send(`No content`);

			}

			

			console.log(data);
			return res.send(data);

		});


	}

	getBuyByItem(req: Request, res: Response) {

		console.log('Get one buy from storage by item field');

		if (!req.body) {

			console.log("Empty request");
			return res.status(400).send("Bade request");

		}

		const buyitem: string = req.params.item;
		const collection: Collection = req.app.locals.buyscollection;

		collection.findOne({ item: buyitem }, (e, data) => {

			if (e || data == undefined || data == null) {

				console.log(e);
				return res.status(400).send(`No content`);

			}



			console.log(data);
			return res.send(data);

		});

	}

	getArrayOfBuys(req: Request, res: Response) {

		console.log('Get array of buys from storage');

		let paramshead = JSON.parse(req.headers.params as string);
		if (paramshead == undefined) {

			console.log("Empty request");
			return res.status(400).send('Empty request');

        }
		let paramstofind: string[] = paramshead.arrayofbuys as string[];

		const collection: Collection = req.app.locals.buyscollection;
		collection.find({ item: {$in: paramstofind}  }).toArray((e, value) => {

			if (e || value == undefined) {

				console.log(e);
				return res.status(400).send(`Bad requet ${e}`);

			}
			console.log('paramstofind');
			console.log(paramstofind);
			console.log('find items');
			console.log(value);
			let arraytosend = new Array();
			let arrayofitems = new Array();

			value.forEach(b => {

				arrayofitems.push(b.item);

			});

			for (var i = 0; i < paramstofind.length; i++) {

				if (arrayofitems.includes(paramstofind[i])) {

					let buy = value.find(b => b.item == paramstofind[i]);
					console.log(`This buy was found in storage:${buy?.item}`);

					arraytosend.push(buy);

				}
                else {

					console.log(`This buy was not found in storage: ${paramstofind[i]}`);

					let emptybuy: Buy = new Buy('', '', 0, paramstofind[i], -999, null);
					arraytosend.push(emptybuy);


                }

            }

			console.log(arraytosend);
			return res.send(arraytosend);


		});

	}

	getImg(req: Request, res: Response) {

		console.log('Get image');

		const imgid: ObjectId = new ObjectId(req.params.imgid);
		const imagestore: GridFSBucket = req.app.locals.imagestorage;
		const path: string = './images';

		imagestore.openDownloadStream(imgid).pipe(res);

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
				req.body.image);

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

	async putImg(req: Request, res: Response) {

		console.log('Edit existing image');

		if (!req.params) {

			console.error('Empty request params');
			return res.status(400).send('Empty request params');

        }

		let image = req.file;

        if (image) {

			console.log(`Image to put:`);
			console.log(image);

			const path: string = `./images/${image?.filename}`;
			const imagestore: GridFSBucket = req.app.locals.imagestorage;
			const imgid: ObjectId = new ObjectId(req.params.imgid);
			
			await imagestore.delete(imgid).then(() => {

				if (image != undefined) {

					fs.createReadStream(path).pipe(

						imagestore.openUploadStreamWithId(imgid, image.filename, { contentType: `${image?.mimetype}` })

					);

					let editimage: Image = new Image(
						imgid,
						image.filename,
						image.size,
						image.mimetype);

					console.log(`Upload successfully`);
					console.log(editimage);
					res.send(editimage);


                }

			}).catch((e) => {

				console.error(e);
				res.status(400).send(`Bad request ${e}`);

			}).finally(() => {

				fs.rm(path, () => {

					return console.log('The temp image removed');

				});

			});

		}
		else {
			
			console.log('The image not edit');
			return res.sendStatus(400);

        }

	}

	postImg(req: Request, res: Response) {

		console.log('Insert image to storage');

		let image = req.file;
		console.log(image);

		if (image) {

			const path: string = `./images/${image.filename}`;
			const imagestore: GridFSBucket = req.app.locals.imagestorage;

			//let imageid: ObjectId = image.stream.pipe(imagestore.openUploadStream(image.filename, {
			//	contentType: `${image.mimetype}`
			//}
			//)).id;

			let imageid: ObjectId = fs.createReadStream(path).pipe(imagestore.openUploadStream(image.filename, {
				contentType: `${image.mimetype}`
			}
			)).id;
			fs.rm(path, () => {
				console.log('The temp image removed');
			});
			console.log(imageid);

			let finalimg: Image = new
				Image(
					imageid,
					image.filename,
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
				req.body.image);

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
				img: req.body.image
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
		const imgid: ObjectId = new ObjectId(req.params.imgid);
		const collection: Collection = req.app.locals.buyscollection;
		const imagestore: GridFSBucket = req.app.locals.imagestorage;

		collection.findOneAndDelete({ _id: id }, (e, data) => {

			if (e) {

				console.log(e);
				return res.status(204).send(`No content ${e}`);

			}

			console.log(data?.value);

			imagestore.delete(imgid).then(() => {

				console.log('The image deleted');

			}).catch(() => {

				console.log('The image not deleted');

			});

			return res.send(data?.value);
			
		});

	}

}