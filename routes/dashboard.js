import expres from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getSummary } from '../controllers/dashboardController.js'

const router = expres.Router()

router.get('/summary', authMiddleware, getSummary )

export default router