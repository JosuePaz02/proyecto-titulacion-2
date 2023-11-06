const app = require("./app.js");
const {connecDb, createCollection} = require('./database.js')
const { PORT} = require('./config.js')

connecDb()

app.listen(PORT);
console.log(`Server on port ${PORT}`);
