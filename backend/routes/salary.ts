import { Router } from 'express'
import SalaryController from '../controllers/salary'

const router = Router()
const salary = new SalaryController()

router.route('/create').post((req, res, next) => salary.create(req, res, next))

export default router 
