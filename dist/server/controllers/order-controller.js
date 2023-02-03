import { ObjectId } from 'mongodb';
import { Order } from '../models/order.js';
import { MailSender } from '../models/mail-sender.js';
import * as fs from 'fs';
export class OrderController {
    getOrders(req, res) {
        const collection = req.app.locals.ordercollection;
        collection.find({}).toArray(function (e, data) {
            if (e) {
                console.log(e);
                return res.status(400).send(`Bad request - ${e}`);
            }
            console.log(data);
            return res.send(data);
        });
    }
    putOrder(req, res) {
        if (!req.body) {
            console.log("Empty body");
            return res.status(400).send("Empty body");
        }
        const collection = req.app.locals.ordercollection;
        const id = new ObjectId(req.body._id);
        const editOrder = new Order(req.body.name, req.body.client, req.body.created, req.body.status, req.body.listofbuys);
        collection.findOneAndUpdate({ _id: id }, { $set: editOrder }, { returnDocument: 'after' }, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(`Bad request - ${err}`);
            }
            fs.readFile('../emailsettings.json', 'utf8', (e, data) => {
                if (e) {
                    console.log(e);
                }
                else {
                    let settings = JSON.parse(data);
                    console.log(data);
                    console.log(settings);
                    let sender = new MailSender(settings.email, settings.password, editOrder);
                    sender.sendMail();
                }
            });
            console.log(result?.value);
            return res.send(result?.value);
        });
    }
    deleteOrder(req, res) {
        if (!req.body) {
            console.log("Empty request");
            return res.status(400).send("Empty request");
        }
        const collection = req.app.locals.ordercollection;
        const id = new ObjectId(req.params._id);
        collection.findOneAndDelete({ _id: id }, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(`Bad request - ${err}`);
            }
            console.log(result?.value);
            return res.send(result?.value);
        });
    }
}
//# sourceMappingURL=order-controller.js.map