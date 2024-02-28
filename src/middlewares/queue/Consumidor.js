const amqp = require("amqplib");
const { client, dbName } = require("../../database.js");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const { execute } = require("../../sendEmail.js");

const { sessionsMap } = require("../sessionsMap.js");

const rabbitMQRpcServer = async () => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("Links");

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

        const linkUuid = uuid.v4();
        const hasUuid = await bcrypt.hash(linkUuid, 10);
        const cleanHash = hasUuid.replace(/\//g, "");

        const linkPay = `http://localhost:3000/banregio/${cleanHash}`;
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
        await collection.insertOne(message)

        const messageRes = `<!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ejemplo de Correo HTML</title>
    </head>
    <body>
      <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
        <h1 style="color: #333;">¡Hola!</h1>
        <p style="color: #555;">Buen día ${message.link.nombre} ha sido generado su link de pago con folio ${message.folio}.</p>
          <li><strong>Link de pago:</strong> <b>${message.link.pay}</b></li>
          <em>Monto:</em> <i>${message.link.monto} a ${message.link.mes} meses.</i>
        <p>${message.link.desc}</p>
      </div>
    </body>
    </html>
    `;

        const options = {
          from: "jpaz7913@gmail.com",
          to: {
            name: message.link.nombre,
            email: message.link.email,
          },
          subject: "Pagar por favor",
          body: messageRes,
        };

        execute(options);

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
