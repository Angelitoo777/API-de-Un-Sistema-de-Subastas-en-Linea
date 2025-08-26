import dotenv from 'dotenv'
import nodeMailer from 'nodemailer'
import { connectRabbitMQ } from '../services/rabbitMQ.services.js'
dotenv.config()

const queue = 'notification_queue'

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'angeloropeza1604@gmail.com',
    pass: 'vebo ccmm qkva lndv'
  }
})

const startConsumer = async () => {
  try {
    const channel = await connectRabbitMQ()

    await channel.assertQueue(queue)
    console.log(`[*] Esperando mensajes en '${queue}'.`)

    channel.consume(queue, async (msg) => {
      const auctionData = JSON.parse(msg.content.toString())
      console.log(' [x] Mensaje recibido:', auctionData)

      const emailSender = {
        from: 'angeloropeza1604@gmail.com',
        to: auctionData.email,
        subject: `🎉 ¡Felicidades, ganaste la subasta de $${auctionData.winningAmount}!`,
        html: `
            <h1>¡Eres el ganador!</h1>
            <p>Has ganado la subasta ID: ${auctionData.auctions_id} con una puja de $${auctionData.winningAmount}.</p>
            <p>¡Gracias por participar!</p>
          `
      }

      try {
        await transporter.sendMail(emailSender)
        console.log(`[Consumer] Correo enviado exitosamente a ${auctionData.email}.`)
        channel.ack(msg)
      } catch (error) {
        console.error(`[Consumer] Error al enviar el correo a ${auctionData.email}:`, error)
        channel.nack(msg)
      }
    })
  } catch (error) {
    console.error('[Consumer] Error al iniciar el consumidor:', error)
  }
}

startConsumer()
