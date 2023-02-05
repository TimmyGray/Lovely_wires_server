import * as multer from 'multer';
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


