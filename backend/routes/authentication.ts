import { Router } from 'express'
import AuthControllers from '../controllers/authentication'

const router = Router()
const auth = new AuthControllers()

// Login
router.route('/').post(auth.login)

// Logout
router.route('/logout').delete(auth.logout)

export default router 
