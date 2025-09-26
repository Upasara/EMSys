    import Employee from "../models/Employee.js";
    import Leave from "../models/Leave.js";
    import Salary from "../models/Salary.js"

    const getEmmployeeSummary = async (req, res) => {
        try{
            const {id} = req.params
            let leaves
            let employee
            employee = await Employee.findOne({userId: id})
            //leave details
            leaves = await Leave.find({employeeId:employee._id})

            const currentYear = new Date().getFullYear()

            const approvedLeaves = leaves.filter(leave => leave.status === "Approved" && new Date(leave.start_date).getFullYear() === currentYear)
            const approvedDays = approvedLeaves.reduce((acc, leave) => acc + leave.days, 0)
            const totalLeaveDays = employee.leave_days || 0
            const remainingLeaveDays = totalLeaveDays - approvedDays

            //salary details
            const today = new Date();
            const fiveMonthsAgo = new Date()
            fiveMonthsAgo.setMonth(today.getMonth() - 5)
            const salaries = await Salary.find({sal_emp_id:employee._id, pay_date:{$gte:fiveMonthsAgo, $lte:today}}).sort({pay_date: -1}).limit(5)
                   return res.status(200).json({success:true, remainingLeaveDays, totalLeaveDays, usedLeaveDays: approvedDays,salaries})
        }catch(error){
            return res.status(500).json({success:false, error:"Could not fetch employee summary !"})
        }
    }

    export {getEmmployeeSummary}
