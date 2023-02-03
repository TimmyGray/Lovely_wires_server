import Express from 'express';
import Cors from 'cors';
import { wirerouter } from './routing/wire-router.js';
import { coilrouter } from './routing/coil-router.js';
import { orderrouter } from './routing/order-router.js';
import { connectorrouter } from './routing/connector-router.js';
import { pricerouter } from './routing/price-router.js';
import { buyrouter } from './routing/buy-router.js';
import { MongoClient } from 'mongodb';
import console from 'console';
const connectiondb = new MongoClient("mongodb://127.0.0.1:12908");
const port = process.env.PORT || 3200;
let dbclient;
const server = Express();
server.use(Cors());
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS");
    next();
});
connectiondb.connect(function (err, client) {
    if (err) {
        return console.log(err);
    }
    dbclient = client;
    server.locals.wirecollection = client?.db("wiresdb").collection("wires");
    server.locals.coilcollection = client?.db("wiresdb").collection("coils");
    server.locals.ordercollection = client?.db('wiresdb').collection('orders');
    server.locals.connectorcollection = client?.db('wiresdb').collection('connectors');
    server.locals.pricecollection = client?.db('wiresdb').collection('prices');
    server.locals.buyscollection = client?.db('wiresdb').collection('buys');
    server.listen(port, function () {
        console.log(`create client server listen on port ${port}...`);
    });
});
server.use(Express.json());
server.use("/api/wires", wirerouter);
server.use("/api/coils", coilrouter);
server.use("/api/orders", orderrouter);
server.use("/api/connectors", connectorrouter);
server.use("/api/prices", pricerouter);
server.use("/api/buys", buyrouter);
server.use(function (req, res, next) {
    res.status(404).send("Not Found");
});
process.on("SIGINT", () => {
    dbclient?.close();
    process.exit();
});
//# sourceMappingURL=nodeserver.js.map