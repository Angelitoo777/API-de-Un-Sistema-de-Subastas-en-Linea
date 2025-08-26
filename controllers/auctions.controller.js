import { Transaction } from 'sequelize'
import { sequelize } from '../db/mysql.db.js'
import { Auctions, Bids, User, Products } from '../models/associations.js'
import { validationAuction, validationBid } from '../validations/auctions.validation.js'

export class AuctionController {
  static async getAll (req, res) {
    try {
      const findAll = await Auctions.findAll({
        include: [{
          model: Products,
          as: 'products',
          attributes: ['name']

        }]
      })

      return res.status(200).json(findAll)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error intero del servidor' })
    }
  }

  static async getById (req, res) {
    const { id } = req.params
    try {
      const findById = await Auctions.findByPk(id, {
        include: [{
          model: Products,
          as: 'products',
          attributes: ['name']

        }, {
          model: User,
          as: 'winner',
          attributes: ['username']
        }]
      })

      return res.status(200).json(findById)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error intero del servidor' })
    }
  }

  static async createAuction (req, res) {
    const validation = validationAuction(req.body)
    const userId = req.user.id

    if (!validation.success) {
      return res.status(422).json({
        message: 'Error de validacion',
        errors: validation.error.issues
      })
    }

    const { product_id, startingPrice, status, endTime } = validation.data

    try {
      const product = await Products.findByPk(product_id)
      const user = await User.findByPk(userId)

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }

      const newAuction = Auctions.create({
        product_id: product.id,
        startingPrice,
        currentPrice: startingPrice,
        status,
        endTime,
        user_id: userId,
        startTime: new Date()
      })

      return res.status(201).json(newAuction)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error intero del servidor' })
    }
  }

  static async createBids (req, res) {
    const validation = validationBid(req.body)
    const userId = req.user.id

    if (!validation.success) {
      return res.status(422).json({
        message: 'Error de validacion',
        errors: validation.error.issues
      })
    }

    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
    })

    const { amount, auctions_id } = validation.data

    try {
      const auction = await Auctions.findByPk(auctions_id, { transaction: t, lock: t.LOCK.UPDATE })
      const user = await User.findByPk(userId, { transaction: t })

      if (!auction || !user) {
        await t.rollback()
        return res.status(400).json({ message: 'Subasta o usuario no encontrado' })
      }

      const now = new Date()

      if (auction.endTime.getTime() <= now.getTime() || amount <= auction.currentPrice) {
        await t.rollback()
        return res.status(400).json({ message: 'Puja no valida' })
      }

      if (amount > user.balance) {
        await t.rollback()
        return res.status(400).json({ message: 'Fondos insuficientes' })
      }

      await user.update({ balance: user.balance - amount }, { transaction: t })

      await Bids.create({
        auctions_id,
        user_id: user.id,
        amount
      }, { transaction: t })

      await auction.update({ currentPrice: amount }, { transaction: t })

      await t.commit()

      return res.status(201).json({ message: 'Puja realizada con exito' })
    } catch (error) {
      await t.rollback()
      console.error(error.message)
      return res.status(500).json({ message: 'Error intero del servidor' })
    }
  }
}
