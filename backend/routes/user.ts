import { Router } from 'express'
import UserControllers from '../controllers/user'
// import AuthenticateMiddleware from '../middlewares/authentication'

const router = Router()
const user = new UserControllers()

// Login
router.route('/create').post((req, res, next) => user.create(req, res, next))

export default router 
