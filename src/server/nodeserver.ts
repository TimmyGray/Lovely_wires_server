import Express from 'express';
import { wirerouter } from './routing/wire-router.js';
import { coilrouter } from './routing/coil-router.js';
import { MongoClient} from 'mongodb';

const connectiondb = new MongoClient("mongodb://127.0.0.1:27017");
const port = 3200;

let dbclient: MongoClient | undefined;

const server = Express();



server.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS");
  next();

});

connectiondb.connect(function (err, client) {
    if (err) return console.log(err);
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
})




process.on("SIGINT", () => {

  dbclient?.close();
  process.exit();

})





