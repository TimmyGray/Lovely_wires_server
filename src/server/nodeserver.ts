import Express from 'express';
import Cors from 'cors';
import { wirerouter } from './routing/wire-router.js';
import { coilrouter } from './routing/coil-router.js';
import { MongoClient} from 'mongodb';
import console from 'console';
import { env } from 'process';

const connectiondb: MongoClient = new MongoClient("mongodb://127.0.0.1:28015");

const port: string | number = process.env.PORT || 3200;
//const port2: string | number = process.env.PORT || 3202;

let dbclient: MongoClient | undefined;

const server = Express();
//const server2 = Express();



server.use(Cors());
//server2.use(Cors());

server.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS");
  next();

});

connectiondb.connect(function (err, client) {
    if (err) { return console.log(err); }

    dbclient = client;
    server.locals.collection = client?.db("wiresdb").collection("wires");
    server.locals.coilcollection = client?.db("wiresdb").collection("coils");
    //server2.locals.collection = client?.db("wiresdb").collection("wires")

    server.listen(port, function () {
        console.log(`create client server listen on port ${port}...`);
    });

    //server2.listen(port2, function () {
    //    console.log(`buy client server listen on port ${port2}...`);
    //});
});

server.use(Express.json());

server.use("/api/wires", wirerouter);
server.use("/api/coils", coilrouter);

server.use(function (req, res, next) {
  res.status(404).send("Not Found");
})




process.on("SIGINT", () => {

  dbclient?.close();
  process.exit();

})






