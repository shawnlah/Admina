import { Router } from 'express'
import jwtAuthz from 'express-jwt-authz';
import UserControllers from '../controllers/user'
import { checkJwt } from '../middlewares/authentication';
// import AuthenticateMiddleware from '../middlewares/authentication'

const router = Router()
const user = new UserControllers()

// Checks permissions
const checkScopes = permissions => jwtAuthz(permissions);

// Requires user to be authenticated
router.use(checkJwt)

// Create user
router.route('/create').post(checkScopes(['create:user']), (req, res, next) => user.create(req, res, next))

// Update user
router.route('/update').post(checkScopes(['update:user']), (req, res, next) => user.update(req, res, next))

export default router 
