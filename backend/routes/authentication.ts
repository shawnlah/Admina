import { Router } from 'express'
import jwtAuthz from 'express-jwt-authz'
import AuthControllers from '../controllers/authentication'
import { testauth } from '../interfaces/permissions'
import { checkJwt, checkPermissions } from '../middlewares/authentication'

const router = Router()
const auth = new AuthControllers()
const checkScopes = permissions => jwtAuthz(permissions);
router.use(checkJwt)
// Login
router.route('/testing').get(checkScopes(['read:posts']), auth.testing)
router.route('/login').post(auth.login)

// Logout
router.route('/logout').post(auth.logout)

export default router 
