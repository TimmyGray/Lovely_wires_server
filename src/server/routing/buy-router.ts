import { Router } from 'express';
import multer from 'multer';
import { BuyController } from '../controllers/buy-controller.js';
//import { uploader } from '../uploadservice/upload.js';

//import * as multer from 'multer';
import { Request } from 'express';

const filter = function (req: Request, image: Express.Multer.File, cb: multer.FileFilterCallback) {

    if (image.mimetype === "image/jpeg" ||
        image.mimetype === "image/jpg" ||
        image.mimetype === "image/png") {

        return cb(null, true);
    }
    else {

        return cb(null, false);

    }

}

const memorystorage = multer.memoryStorage();
var uploader = multer({ storage: memorystorage, fileFilter: filter }).single("imagedata");

const buycontroller: BuyController = new BuyController();
export const buyrouter = Router();

buyrouter.delete(`/deletebuy/:_id`, buycontroller.deleteBuy);
buyrouter.put('/putbuy', uploader, buycontroller.putBuy);
buyrouter.post('/postbuy', uploader, buycontroller.postBuy);
buyrouter.get('/:_id', buycontroller.getBuy);
buyrouter.get('/', buycontroller.getBuys);