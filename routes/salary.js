import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addSalary, getSalary, getSalaryByMonth, getSalaryDetails,  } from '../controllers/salaryController.js'


const router = express.Router(2)

router.post('/add', authMiddleware, addSalary)
router.get('/details/:id', authMiddleware, getSalaryDetails )
router.get('/:id/:role', authMiddleware, getSalary)
router.post('/month', authMiddleware, getSalaryByMonth)


export default router