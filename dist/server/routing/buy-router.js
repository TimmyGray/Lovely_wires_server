import { Router } from 'express';
import multer from 'multer';
import { BuyController } from '../controllers/buy-controller.js';
const mystorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
const upload = multer({ storage: mystorage });
const buycontroller = new BuyController();
export const buyrouter = Router();
buyrouter.delete(`/deletebuy/:_id/:imgid`, buycontroller.deleteBuy);
buyrouter.put('/putbuy', buycontroller.putBuy);
buyrouter.put('/putimg/:imgid', buycontroller.putImg);
buyrouter.post('/postbuy', buycontroller.postBuy);
buyrouter.post('/postimg', upload.single('imagedata'), buycontroller.postImg);
buyrouter.get('/:_id', buycontroller.getBuy);
buyrouter.get('/', buycontroller.getBuys);
//# sourceMappingURL=buy-router.js.map