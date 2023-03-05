import { ObjectId } from 'mongodb';
import { Buy } from '../models/buy.js';
import * as fs from 'fs';
import { Image } from '../models/image.js';
export class BuyController {
    getBuys(req, res) {
        console.log('Get all buys from storage');
        const collection = req.app.locals.buyscollection;
        collection.find({}).toArray((e, data) => {
            if (e) {
                console.log(e);
                return res.status(204).send(`No content ${e}`);
            }
            console.log(data);
            return res.send(data);
        });
    }
    getBuy(req, res) {
        console.log('Get one buy from storage');
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bade request");
        }
        const id = new ObjectId(req.params._id);
        const collection = req.app.locals.buyscollection;
        collection.findOne({ _id: id }, (e, data) => {
            if (e) {
                console.log(e);
                return res.status(204).send(`No content ${e}`);
            }
            console.log(data);
            return res.send(data);
        });
    }
    getImg(req, res) {
        console.log('Get image');
        const imgid = new ObjectId(req.params.imgid);
        const imagestore = req.app.locals.imagestorage;
        const path = './images';
        imagestore.openDownloadStream(imgid).pipe(res);
    }
    putBuy(req, res) {
        console.log('Edit existing buy');
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const id = new ObjectId(req.body._id);
        const buy = new Buy(req.body.name, req.body.description, req.body.cost, req.body.item, req.body.count, req.body.image);
        const collection = req.app.locals.buyscollection;
        collection.findOneAndUpdate({ _id: id }, { $set: buy }, { returnDocument: 'after' }, (e, data) => {
            if (e) {
                console.log(e);
                return res.status(400).send(`Bad request ${e}`);
            }
            console.log(data?.value);
            return res.send(data?.value);
        });
    }
    async putImg(req, res) {
        console.log('Edit existing image');
        if (!req.params) {
            console.error('Empty request params');
            return res.status(400).send('Empty request params');
        }
        let image = req.file;
        if (image) {
            console.log(`Image to put:`);
            console.log(image);
            const path = `./images/${image?.filename}`;
            const imagestore = req.app.locals.imagestorage;
            const imgid = new ObjectId(req.params.imgid);
            await imagestore.delete(imgid).then(() => {
                if (image != undefined) {
                    fs.createReadStream(path).pipe(imagestore.openUploadStreamWithId(imgid, image.filename, { contentType: `${image?.mimetype}` }));
                    let editimage = new Image(imgid, image.filename, image.size, image.mimetype);
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
    postImg(req, res) {
        console.log('Insert image to storage');
        let image = req.file;
        console.log(image);
        if (image) {
            const path = `./images/${image.filename}`;
            const imagestore = req.app.locals.imagestorage;
            //let imageid: ObjectId = image.stream.pipe(imagestore.openUploadStream(image.filename, {
            //	contentType: `${image.mimetype}`
            //}
            //)).id;
            let imageid = fs.createReadStream(path).pipe(imagestore.openUploadStream(image.filename, {
                contentType: `${image.mimetype}`
            })).id;
            fs.rm(path, () => {
                console.log('The temp image removed');
            });
            console.log(imageid);
            let finalimg = new Image(imageid, image.filename, image.size, image.mimetype);
            console.log(finalimg);
            return res.send(finalimg);
        }
        console.log('The image not inserted');
        return res.sendStatus(400);
    }
    postBuy(req, res) {
        console.log('Insert buy to storage');
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const buy = new Buy(req.body.name, req.body.description, req.body.cost, req.body.item, req.body.count, req.body.image);
        const collection = req.app.locals.buyscollection;
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
    deleteBuy(req, res) {
        console.log('Delete buy from storage');
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Bad request");
        }
        const id = new ObjectId(req.params._id);
        const imgeid = new ObjectId(req.params.imgid);
        const collection = req.app.locals.buyscollection;
        const imagestore = req.app.locals.imagestorage;
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
//# sourceMappingURL=buy-controller.js.map