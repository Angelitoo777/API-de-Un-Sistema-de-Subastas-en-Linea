import { User, Roles } from './user.model.js'
import { Auctions, Bids } from './auctions.model.js'
import { Products } from './products.model.js'

User.belongsToMany(Roles, {
  through: 'users_roles',
  foreignKey: 'users_id',
  otherKey: 'roles_id',
  as: 'roles'
})

Roles.belongsToMany(User, {
  through: 'users_roles',
  foreignKey: 'roles_id',
  otherKey: 'users_id',
  as: 'users'
})

Products.hasMany(Auctions, {
  foreignKey: 'products_id',
  as: 'auctions'
})

Auctions.belongsTo(Products, {
  foreignKey: 'product_id',
  as: 'products'
})

Auctions.hasMany(Bids, {
  foreignKey: 'auctions_id',
  as: 'bids'
})

Auctions.belongsTo(User, {
  foreignKey: 'winner_id',
  as: 'winner'
})

Bids.belongsTo(Auctions, {
  foreignKey: 'auctions_id',
  as: 'auctions'
})

Bids.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
})

export { User, Roles, Auctions, Bids, Products }
