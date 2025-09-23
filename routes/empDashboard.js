import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getEmmployeeSummary } from '../controllers/employeeDashboardController.js'

const router = express.Router()

router.get('/summary/:id/:role', authMiddleware, getEmmployeeSummary)

export default router