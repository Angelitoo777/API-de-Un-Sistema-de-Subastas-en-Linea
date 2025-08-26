import cron from 'node-cron'
import { User, Bids, Auctions } from '../models/associations.js'
import { Op } from 'sequelize'
import { sequelize } from '../db/mysql.db.js'
import { publishMessage } from './rabbitMQ.services.js'

export const scheduleAuctionEnd = () => {
  cron.schedule('* * * * *', async () => {
    console.log('Buscando subastas para finalizar...')

    const t = await sequelize.transaction()

    try {
      const now = new Date()

      const auctionsToEnd = await Auctions.findAll({
        where: {
          endTime: {
            [Op.lte]: now
          },
          status: 'Abierta'
        }
      })

      for (const auction of auctionsToEnd) {
        console.log(`Finalizando subasta para la subasta ID: ${auction.id}`)

        const highestBid = await Bids.findOne({
          where: { auctions_id: auction.id },
          order: [['amount', 'DESC']],
          transaction: t
        })

        if (highestBid) {
          const winnerId = highestBid.user_id

          // Obtener la puja más alta de cada usuario
          const highestBidsPerUser = await Bids.findAll({
            where: { auctions_id: auction.id },
            attributes: [
              'user_id',
              [sequelize.fn('MAX', sequelize.col('amount')), 'highest_bid_amount']
            ],
            group: ['user_id'],
            transaction: t
          })

          // Procesar las pujas más altas para cada usuario
          for (const bid of highestBidsPerUser) {
            const userId = bid.get('user_id')
            const bidAmount = bid.get('highest_bid_amount')

            if (userId === winnerId) {
              // Lógica para el ganador: acreditar el pago
              await User.update(
                { balance: sequelize.literal(`balance - ${bidAmount}`) },
                { where: { id: userId }, transaction: t }
              )
              console.log(`Pago de ${bidAmount} procesado para el ganador ${userId}`)
            } else {
              // Lógica para los perdedores: reembolsar la puja más alta
              await User.update(
                { balance: sequelize.literal(`balance + ${bidAmount}`) },
                { where: { id: userId }, transaction: t }
              )
              console.log(`Reembolso de ${bidAmount} a usuario ${userId}`)
            }
          }

          // Actualizar el estado de la subasta
          await auction.update({
            status: 'Finalizada',
            winner_id: winnerId,
            current_price: highestBid.amount
          }, { transaction: t })

          const winner = await User.findByPk(winnerId, { transaction: t })
          if (winner) {
            const message = {
              email: winner.email,
              auctions_id: auction.id,
              winningAmount: highestBid.amount

            }

            await publishMessage('notification_queue', message)
            console.log(`Mensaje enviado a la cola para notificar al ganador de la subasta ${auction.id}.`)
          }
        } else {
          // Si no hubo pujas
          await auction.update({ status: 'Cerrada' }, { transaction: t })
          console.log('Subasta cerrada sin pujas.')
        }
      }

      await t.commit()
    } catch (error) {
      await t.rollback()
      console.error('Error en el cron job de subastas:', error)
    }
  })
}
