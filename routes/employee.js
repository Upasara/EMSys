import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addEmployee, upload, getEmployees, getEmployee, updateEmployee, getEmployeesByDepartmentId } from '../controllers/employeeController.js';


const router = express.Router();

router.get("/", authMiddleware, getEmployees)
router.post("/add", authMiddleware, upload.single('image'), addEmployee );
router.get("/:id", authMiddleware, getEmployee )
router.put("/:id", authMiddleware, updateEmployee)
//router.delete("/:id", authMiddleware, deleteDepartment)
router.get("/department/:id",authMiddleware, getEmployeesByDepartmentId)


export default router;
