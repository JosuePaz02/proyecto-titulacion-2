const app = require("./app.js");
const {connecDb, createCollection} = require('./database.js')
const { PORT} = require('./config.js')
const {rabbitMQRpcServer} = require('./middlewares/queue/Consumidor.js')

connecDb()
rabbitMQRpcServer()

app.listen(PORT);
console.log(`Server on port ${PORT}`);
