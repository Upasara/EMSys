import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import settingsRouter from './routes/settings.js'
import dashboardRouter from './routes/dashboard.js'
import employeeDashboardRouter from './routes/empDashboard.js'
import connectToDatabase from './db/db.js';

connectToDatabase();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'));
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/setting', settingsRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/employee/dashboard', employeeDashboardRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
