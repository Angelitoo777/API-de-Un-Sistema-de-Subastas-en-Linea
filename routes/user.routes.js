import { UserControllers } from '../controllers/user.controller.js'
import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { isAdmin } from '../middlewares/isAdmin.middleware.js'

export const routesOfUser = Router()

routesOfUser.get('/users', authMiddleware, isAdmin, UserControllers.getAll)

routesOfUser.post('/register', UserControllers.registerUser)
routesOfUser.post('/login', UserControllers.loginUser)
