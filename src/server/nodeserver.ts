import Express from 'express';
import Cors from 'cors';
import { wirerouter } from './routing/wire-router.js';
import { coilrouter } from './routing/coil-router.js';
import { orderrouter } from './routing/order-router.js';
import { connectorrouter } from './routing/connector-router.js';
import { pricerouter } from './routing/price-router.js';
import { buyrouter } from './routing/buy-router.js';
import { MongoClient } from 'mongodb';
import * as mongodb from 'mongodb';
import console from 'console';
import { env } from 'process';
import multer from 'multer';


const mongoclient: MongoClient = new MongoClient(`mongodb://${process.argv[2]}`);

const port: string | number = process.env.PORT || process.argv[3];

const server = Express();

server.use(Cors());

server.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS");
  next();

});

mongoclient.connect(function (err, client) {

    if (err) { return console.log(err); }

    if (client!=null) {

        server.locals.wirecollection = client.db("wiresdb").collection("wires");
        server.locals.coilcollection = client.db("wiresdb").collection("coils");
        server.locals.ordercollection = client.db('wiresdb').collection('orders');
        server.locals.connectorcollection = client.db('wiresdb').collection('connectors');
        server.locals.pricecollection = client.db('wiresdb').collection('prices');
        server.locals.buyscollection = client.db('wiresdb').collection('buys');
        server.locals.imagestorage = new mongodb.GridFSBucket(client.db("wiresdb"), { bucketName:"imagestore" });

        server.locals.testcollection = client.db("wiresdb").collection("testcollection");

        server.listen(port, function () {
            console.log(`create client server listen on port ${port}...`);
        });

    }

});

server.use(Express.json());
//server.use(Express.static(__dirname));
server.use("/api/wires", wirerouter);
server.use("/api/coils", coilrouter);
server.use("/api/orders", orderrouter);
server.use("/api/connectors", connectorrouter);
server.use("/api/prices", pricerouter);
server.use("/api/buys", buyrouter);

server.use(function (req, res, next) {
  res.status(404).send("Not Found");
})


process.on("SIGINT", () => {

  mongoclient.close();
  process.exit();

})






