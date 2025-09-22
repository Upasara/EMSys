import expres from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getSalaryByMonth, getSummary } from '../controllers/dashboardController.js'

const router = expres.Router()

router.get('/summary', authMiddleware, getSummary )
router.post('/summary/month', authMiddleware, getSalaryByMonth)

export default router