const amqp = require("amqplib");
const { client, dbName } = require("../../database.js");
const { sessionsMap } = require("../sessionsMap.js");

const rabbitMQRpcServer = async () => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("users");

    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "rpc_queue";

    await channel.assertQueue(queue, { durable: false });
    channel.prefetch(1);
    console.log(` [x] Awaiting RPC requests`);

    channel.consume(queue, async function (msg) {
      try {
        const buffer = msg.content;
        const jsonString = buffer.toString("utf8");
        const message = JSON.parse(jsonString);

        //console.log(msg.properties);
        console.log(buffer);
        console.log(jsonString);
        console.log(message);
        const messageMongo = { $set: { link: message } };

        const idUser = message.idUser;
        console.log(`Este es el id  ${idUser}`);

        delete message.idUser;

        const filtro = { _id: idUser };
        //const userFound = await collection.findOne({ _id: idUser });
        await collection.updateOne(filtro, messageMongo);

        const messageRes = `Su link ha sido procesado con nombre: ${message.nombre}, 
    email: ${message.email}, telefono ${message.telefono}, monto: ${message.monto},
    a ${message.mes} meses, con descripcion ${message.desc}, con fecha ${message.fecha_creacion}  `;

        channel.sendToQueue(msg.properties.replyTo, Buffer.from(messageRes), {
          correlationId: msg.properties.correlationId,
        });

        channel.ack(msg);
      } catch (error) {
        console.error(`Hubo un error en el consumo del servidor de RabbitMQ ${error}`)
      }
    });
  } catch (error) {
    console.error(`Hubo un error en el servidor de RabbitMQ ${error}`);
  }
};

module.exports = { rabbitMQRpcServer };
