import { Router } from 'express'
import { AuctionController } from '../controllers/auctions.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

export const routesOfAuctions = Router()

routesOfAuctions.get('/auctions', AuctionController.getAll)
routesOfAuctions.get('/auctions/:id', AuctionController.getById)

routesOfAuctions.post('/auctions', authMiddleware, AuctionController.createAuction)
routesOfAuctions.post('/bids', authMiddleware, AuctionController.createBids)
