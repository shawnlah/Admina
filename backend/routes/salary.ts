import { Router } from 'express'
import jwtAuthz from 'express-jwt-authz';
import SalaryController from '../controllers/salary'
import { checkJwt } from '../middlewares/authentication';

const router = Router()
const salary = new SalaryController()

// Checks permissions
const checkScopes = permissions => jwtAuthz(permissions);

// Requires user to be authenticated
router.use(checkJwt)

// Create salary
router.route('/create').post(checkScopes(['create:salary']), (req, res, next) => salary.create(req, res, next))

// Update salary
router.route('/update').post(checkScopes(['update:salary']), (req, res, next) => salary.update(req, res, next))

export default router 
