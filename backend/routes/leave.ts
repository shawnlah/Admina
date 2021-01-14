import { Router } from 'express'
import LeaveControllers from '../controllers/leave'
// import AuthenticateMiddleware from '../middlewares/authentication'

const router = Router()
const leave = new LeaveControllers()

// Request leave
router.route('/request').post((req, res, next) => leave.create(req, res, next))

// Cancel leave request
router.route('/cancel').post((req, res, next) => leave.cancel(req, res, next))

// Approve leave request
router.route('/approve').post((req, res, next) => leave.approve(req, res, next))

// Reject leave request
router.route('/reject').post((req, res, next) => leave.reject(req, res, next))

export default router 
