const amqp = require("amqplib");
const uuid = require("uuid");

const rabbitMQRpcClient = async (link) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const replyQueue = await channel.assertQueue("", { exclusive: true });
    const correlationId = uuid.v4();
   

    //const mensaje = `Su link se ha procesado`
    console.log(correlationId);
    console.log(replyQueue.queue);

    await channel.consume(
      replyQueue.queue,
      function (msg) {
        if (msg.properties.correlationId === correlationId) {
          console.log(` [.] Got ${msg.content.toString()}`);
          setTimeout(() => {
            connection.close();
          }, 500);
        }
      },
      { noAck: true }
    );

    channel.sendToQueue("rpc_queue", Buffer.from(JSON.stringify(link)), {
      correlationId: correlationId,
      replyTo: replyQueue.queue,
    });
  } catch (error) {
    console.error(`Hubo en error en RabbitMQ ${error}`)
  }
};

module.exports = { rabbitMQRpcClient };
