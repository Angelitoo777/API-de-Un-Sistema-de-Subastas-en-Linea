import { DataTypes } from 'sequelize'
import { sequelize } from '../db/mysql.db.js'

export const Auctions = sequelize.define('auctions', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.DATE
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  startingPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 10
  },
  currentPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Abierta'
  }
}, {
  timestamps: false
})

export const Bids = sequelize.define('bids', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
})
