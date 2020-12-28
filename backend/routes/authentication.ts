import { Router } from 'express'
import AuthControllers from '../controllers/authentication'

const router = Router()
const auth = new AuthControllers()

// Login
router.route('/').get(auth.getLogin)
router.route('/').post(auth.postLogin)

// Logout
router.route('/logout').get(auth.getLogout)

export default router 
