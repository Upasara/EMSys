import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { changePassword } from "../controllers/settingsController.js"
import { updateProfileImage, upload } from "../controllers/employeeController.js"

const router = express.Router()

router.put('/change-password', authMiddleware, changePassword)
router.post('/change-profileImage/:id', authMiddleware, upload.single('image'), updateProfileImage)

export default router