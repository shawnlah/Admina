import { Router } from 'express'
import AuthControllers from '../controllers/authentication'

const router = Router()
const auth = new AuthControllers()

// Login
router.route('/login').post(auth.login)

// Logout
router.route('/logout').post(auth.logout)

export default router 
