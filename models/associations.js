import { User, Roles } from './user.model.js'

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

export { User, Roles }
