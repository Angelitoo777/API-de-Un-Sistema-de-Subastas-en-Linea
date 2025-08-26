import amqp from 'amqplib'

export async function connectRabbitMQ () {
  const connection = await amqp.connect('amqps://tauxqwgu:J6jYgcj0flUW9gRECNOySW_Lr2a664mf@jackal.rmq.cloudamqp.com/tauxqwgu')
  const channel = await connection.createChannel()

  console.log('your rabbitmq db is connected')

  return channel
}

export async function publishMessage (queue, message) {
  try {
    const channel = await connectRabbitMQ()

    await channel.assertQueue(queue)

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))

    console.log('Mensaje enviado a la cola')
  } catch (error) {
    throw new Error(error)
  }
}
