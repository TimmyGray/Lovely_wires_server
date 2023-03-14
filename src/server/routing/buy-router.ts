import { Router } from 'express';
import multer from 'multer';
import { BuyController } from '../controllers/buy-controller.js';
import { Request } from 'express';
import mime from 'mime';

const mystorage = multer.diskStorage({

    destination: function (req: Request, file, cb) {
        cb(null, './images');
    },

    filename: function (req: Request, file, cb) {
        const extension: string[] = file.mimetype.split('/');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + extension[1];
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const upload = multer({ storage:mystorage });
const buycontroller: BuyController = new BuyController();
export const buyrouter = Router();

buyrouter.delete(`/deletebuy/:_id/:imgid`, buycontroller.deleteBuy);
buyrouter.put('/putarrayofbuys', buycontroller.putArrayOfBuys);
buyrouter.put('/putbuy', buycontroller.putBuy);
buyrouter.put('/putimg/:imgid',upload.single('editimagedata'), buycontroller.putImg);
buyrouter.post('/postbuy', buycontroller.postBuy);
buyrouter.post('/postimg', upload.single('imagedata'), buycontroller.postImg);
buyrouter.get('/getimg/:imgid', buycontroller.getImg);
buyrouter.get('/getitembuy/:item', buycontroller.getBuyByItem);
buyrouter.get('/arrayofbuys', buycontroller.getArrayOfBuys);
buyrouter.get('/:_id', buycontroller.getBuy);
buyrouter.get('/', buycontroller.getBuys);