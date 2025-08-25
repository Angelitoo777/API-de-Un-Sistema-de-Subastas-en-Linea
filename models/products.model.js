import { DataTypes } from 'sequelize'
import { sequelize } from '../db/mysql.db.js'

export const Products = sequelize.define('products', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
