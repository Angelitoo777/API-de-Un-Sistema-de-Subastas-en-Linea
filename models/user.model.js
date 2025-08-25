import { DataTypes } from 'sequelize'
import { sequelize } from '../db/mysql.db.js'

export const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  balance: {
    type: DataTypes.INTEGER,
    defaultValue: 1000,
    allowNull: false
  }
})

export const Roles = sequelize.define('roles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roles: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: 'User'
  }
}, {
  timestamps: false
})
