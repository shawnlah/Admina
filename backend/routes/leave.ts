import { Router } from 'express'
import jwtAuthz from 'express-jwt-authz';
import LeaveControllers from '../controllers/leave'
import { checkJwt } from '../middlewares/authentication';
// import AuthenticateMiddleware from '../middlewares/authentication'

const router = Router()
const leave = new LeaveControllers()

// Checks permissions
const checkScopes = permissions => jwtAuthz(permissions);

// Requires user to be authenticated
router.use(checkJwt)

// Request leave
router.route('/request').post((req, res, next) => leave.create(req, res, next))

// Cancel leave request
router.route('/cancel').post((req, res, next) => leave.cancel(req, res, next))

// Approve leave request
router.route('/approve').post(checkScopes(['update:leave']), (req, res, next) => leave.approve(req, res, next))

// Reject leave request
router.route('/reject').post(checkScopes(['update:leave']), (req, res, next) => leave.reject(req, res, next))

export default router 
