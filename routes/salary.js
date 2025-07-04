import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addSalary, getSalary, getSalaryDetails } from '../controllers/salaryController.js'


const router = express.Router(2)

router.post('/add', authMiddleware, addSalary)
router.get('/:id', authMiddleware, getSalary)
router.get('/details/:id', authMiddleware, getSalaryDetails )

export default router