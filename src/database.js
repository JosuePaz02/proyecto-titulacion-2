const {MongoClient} = require('mongodb')

const url = "mongodb://payments:kidbudir@www.sateav.com:27017/payments";
const dbName = 'payments'
const client = new MongoClient(url)

const connecDb = async () => {
    try {
        await client.connect()
        client.db(dbName);
        console.log('Conexion exitosa a MongoDB')
    } catch (error) {
        confirm.error(`Error en la conexion a MongoDB ${error}`)
    }
}




module.exports = {connecDb, client, dbName}