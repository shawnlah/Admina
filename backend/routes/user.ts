import { Router } from 'express'
import UserControllers from '../controllers/user'
// import AuthenticateMiddleware from '../middlewares/authentication'

const router = Router()
const user = new UserControllers()

// Create user
router.route('/create').post((req, res, next) => user.create(req, res, next))

// Update user
router.route('/update').post((req, res, next) => user.update(req, res, next))

export default router 
