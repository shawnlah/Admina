import { Router } from 'express'
import LeaveControllers from '../controllers/leave'
// import AuthenticateMiddleware from '../middlewares/authentication'

const router = Router()
const leave = new LeaveControllers()

// Login
router.route('/create').post((req, res, next) => leave.create(req, res, next))

export default router 
