import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addSalary } from '../controllers/salaryController.js'


const router = express.Router(2)

router.post('/add', authMiddleware, addSalary)

export default router