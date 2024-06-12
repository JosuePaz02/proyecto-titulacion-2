const app = require("./app.js");
const { connecDb, createCollection } = require("./database.js");
const { PORT, HOST_ENV } = require("./config.js");
const { rabbitMQRpcServer } = require("./middlewares/queue/Consumidor.js");
const https = require("https");
const fs = require("fs");

connecDb();
rabbitMQRpcServer();

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/linkspago.com/fullchain.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/linkspago.com/privkey.pem"),
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server running on https://${HOST_ENV}`);
});
