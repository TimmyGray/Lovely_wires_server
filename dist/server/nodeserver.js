import Express from 'express';
import Cors from 'cors';
import { wirerouter } from './routing/wire-router.js';
import { coilrouter } from './routing/coil-router.js';
import { MongoClient } from 'mongodb';
import console from 'console';
const connectiondb = new MongoClient("mongodb://127.0.0.1:28015");
const port = process.env.PORT || 3200;
const port2 = process.env.PORT || 3202;
let dbclient;
const server = Express();
const server2 = Express();
server2.listen(port2, function () {
    console.log("server two is listen too");
});
server.use(Cors());
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS");
    next();
});
connectiondb.connect(function (err, client) {
    if (err)
        return console.log(err);
    dbclient = client;
    server.locals.collection = client?.db("wiresdb").collection("wires");
    server.locals.coilcollection = client?.db("wiresdb").collection("coils");
    server.listen(port, function () {
        console.log(`Server listen on port ${port}...`);
    });
});
server.use(Express.json());
server.use("/api/wires", wirerouter);
server.use("/api/coils", coilrouter);
server.use(function (req, res, next) {
    res.status(404).send("Not Found");
});
process.on("SIGINT", () => {
    dbclient?.close();
    process.exit();
});
//# sourceMappingURL=nodeserver.js.map