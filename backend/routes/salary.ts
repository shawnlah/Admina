import { Router } from 'express'
import SalaryController from '../controllers/salary'

const router = Router()
const salary = new SalaryController()

// Create salary
router.route('/create').post((req, res, next) => salary.create(req, res, next))

// Update salary
router.route('/update').post((req, res, next) => salary.update(req, res, next))

export default router 
