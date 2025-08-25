import { User, Roles } from '../models/associations.js'
import { Op } from 'sequelize'
import { validationUser, validationParcialUser } from '../validations/user.validation.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export class UserControllers {
  static async getAll (req, res) {
    try {
      const findAll = await User.findAll({
        include: [{
          model: Roles,
          as: 'roles',
          attributes: ['roles'],
          through: { attributes: [] }
        }]
      })

      return res.status(200).json(findAll)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error intero del servidor' })
    }
  }

  static async registerUser (req, res) {
    const validation = validationUser(req.body)

    if (!validation.success) {
      return res.status(422).json({
        message: 'Error de validacion',
        errors: validation.error.issues
      })
    }

    const { roles, username, email, password } = validation.data

    try {
      const userExisting = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } })

      if (userExisting) {
        return res.status(409).json({ message: 'Usuario o correo electronico ya registrado' })
      }

      const hasshedPassword = await bcrypt.hash(password, 10)

      const newUser = await User.create({
        username,
        email,
        password: hasshedPassword,
        balance: 1000
      })

      const foundRoles = await Roles.findAll({ where: { id: roles } })
      await newUser.addRoles(foundRoles)

      const userWithRoles = await User.findByPk(newUser.id, {
        include: {
          model: Roles,
          as: 'roles'
        }
      })

      return res.status(201).json({
        username: userWithRoles.username,
        email: userWithRoles.email,
        message: 'Usuario registrado exitosamente'
      })
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error intero del servidor' })
    }
  }

  static async loginUser (req, res) {
    const validation = validationParcialUser(req.body)

    if (!validation.success) {
      return res.status(422).json({
        message: 'Error de validacion',
        errors: validation.error.issues
      })
    }

    const { username, password } = validation.data

    try {
      const user = await User.findOne({
        where: { username },
        include: [{
          model: Roles,
          as: 'roles',
          attributes: ['roles'],
          through: { attributes: [] }
        }]
      })

      if (!user) {
        return res.status(404).json({ message: 'Credenciales incorrectas' })
      }

      const comparePassword = await bcrypt.compare(password, user.password)

      if (!comparePassword) {
        return res.status(404).json({ message: 'Credenciales incorrectas' })
      }

      const userRoles = user.roles.map(role => role.roles)

      const token = jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
        role: userRoles
      }, JWT_SECRET, { expiresIn: '1h' })

      return res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 3600000 // 1hr
        })
        .status(200)
        .json({ message: 'Te has logueado exitosamente' })
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error intero del servidor' })
    }
  }
}
