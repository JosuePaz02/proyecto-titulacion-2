const amqp = require("amqplib");
const uuid = require("uuid");

const rabbitMQRpcClient = async (link) => {
  let connection;
  let channel;
  let replyQueue;

  try {
    connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();

    replyQueue = await channel.assertQueue("", { exclusive: true });
    const correlationId = uuid.v4();

    await channel.consume(
      replyQueue.queue,
      function (msg) {
        if (msg.properties.correlationId === correlationId) {
          console.log(` [.] Got Mensaje recibido`);
          connection.close();
        }
      },
      { noAck: true }
    );

    if (Array.isArray(link)) {
      for (const elemento of link) {
        const mensaje = JSON.stringify(elemento);
        channel.sendToQueue("rpc_queue", Buffer.from(mensaje), {
          correlationId: correlationId,
          replyTo: replyQueue.queue,
        });
      }
    } else {
      const mensaje = JSON.stringify(link);
      channel.sendToQueue("rpc_queue", Buffer.from(mensaje), {
        correlationId: correlationId,
        replyTo: replyQueue.queue,
      });
    }
  } catch (error) {
    console.error(`Hubo un error en RabbitMQ ${error}`);
    // Intentar reconectar y volver a ejecutar la lógica
  }
};

module.exports = { rabbitMQRpcClient };
