const amqp = require("amqplib");
const { client, dbName } = require("../../database.js");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const { emailLink } = require("../generacionEmail");
const { HOST_ENV, PORT } = require("../../config.js");

const { sessionsMap } = require("../sessionsMap.js");

const rabbitMQRpcServer = async () => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("Links");

    const connection = await amqp.connect("amqp://myuser:mypassword@localhost");
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

        /* const hasUuid = await bcrypt.hash(linkUuid, 10);
        const cleanHash = hasUuid.replace(/\//g, ""); */

        const linkPay = `${HOST_ENV}:${PORT}/pago/${message.folio}`;
        message.link.pay = linkPay;

        //console.log(msg.properties);
        //console.log(buffer);
        //console.log(jsonString);
        //console.log(message);
        //const messageMongo = { $set: { link: message } };

        const idUser = message.link.idUser;
        console.log(`Este es el id  ${idUser}`);

        /* delete message.idUser; */

        //const filtro = { _id: idUser };
        //const userFound = await collection.findOne({ _id: idUser });
        await collection.insertOne(message);

        emailLink(message);

        const messageRes = "El correo ha sido enviado";

        channel.sendToQueue(msg.properties.replyTo, Buffer.from(messageRes), {
          correlationId: msg.properties.correlationId,
        });

        channel.ack(msg);
      } catch (error) {
        console.error(
          `Hubo un error en el consumo del servidor de RabbitMQ ${error}`
        );
      }
    });
  } catch (error) {
    console.error(`Hubo un error en el servidor de RabbitMQ ${error}`);
  }
};

module.exports = { rabbitMQRpcServer };
