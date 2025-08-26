import dotenv from 'dotenv'

import express from 'express'
import { sequelize } from './db/mysql.db.js'
import cookieParser from 'cookie-parser'
import { routesOfUser } from './routes/user.routes.js'
import { routesOfProducts } from './routes/products.routes.js'
import { routesOfAuctions } from './routes/auctions.routes.js'
import { scheduleAuctionEnd } from './services/cronJob.services.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 3000

try {
  await sequelize.sync({ force: false })
} catch (error) {
  console.error('error conectando la base de datos', error.message)
}

app.use(express.json())
app.use(cookieParser())

app.use('/auth', routesOfUser)
app.use('/api', routesOfProducts)
app.use('/api', routesOfAuctions)

app.get('/', (req, res) => {
  res.send('hola mundo')
})

app.listen(PORT, () => {
  console.log('Your server is running')

  scheduleAuctionEnd()
})
