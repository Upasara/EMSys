import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { addLeave, getLeave, getLeaveDetails, getLeaves } from "../controllers/leaveController.js"

const router = express.Router()

router.post('/add', authMiddleware, addLeave)
router.get('/:id', authMiddleware, getLeave)
router.get("/detail/:id",authMiddleware, getLeaveDetails)
router.get("/", authMiddleware, getLeaves )

export default router