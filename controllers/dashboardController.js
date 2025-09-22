import Employee from '../models/Employee.js';
import Department from '../models/Department.js'
import Leave from '../models/Leave.js'
import Salary from '../models/Salary.js';

const getSummary = async (req,res) => {
   try{
    const totalEmployees = await Employee.countDocuments()
    const activeEmployees = await Employee.countDocuments({isActive:true})
    const inactiveEmployees = await Employee.countDocuments({isActive:false})
    const totalDepartments = await Department.countDocuments()

    const employeeAppliedForLeave = await Leave.countDocuments()
    const leaveStatus = await Leave.aggregate([
        {$group: {_id:"$status", count: {$sum: 1}}}
    ])
    const leaveSummary = {
        appliedFor: employeeAppliedForLeave,
        approved:leaveStatus.find(item => item._id === "Approved")?.count || 0,
        rejected:leaveStatus.find(item => item._id === "Rejected")?.count || 0,
        pending:leaveStatus.find(item => item._id === "Pending")?.count || 0

    }

    


    return res.status(200).json({success:true, totalDepartments, totalEmployees, activeEmployees, inactiveEmployees, 
        leaveSummary})
   }catch(error){
    return res.status(500).json({success: false, error:"Error loading data !"})
   }
}

const getSalaryByMonth = async (req, res) =>{
    try{
        const {month} = req.body
        if(!month){
            return res.status(400).json({success:false, error: "Please select a Month !"})
        }
        const startDate = new Date(`${month}-01T00:00:00.000Z`)
        const endDate = new Date(startDate)
        endDate.setMonth(endDate.getMonth()+1)

        //salaries in that month
        const salaries = await Salary.find({pay_date:{$gte:startDate,$lt:endDate}})

        //calculate totals
        const totalNetSalary = salaries.reduce((acc,curr) =>acc +(curr.net_salary || 0),0)
        const totalGrossSalary = salaries.reduce((acc, curr) => acc + (curr.gross_salary || 0), 0)

        return res.status(200).json({success:true, totalNetSalary:Number(totalNetSalary.toFixed(2)), totalGrossSalary:Number(totalGrossSalary.toFixed(2))})
    }catch(error){
        return res.status(500).json({success:false, error:"Error loading data !"})
    }
}

export {getSummary, getSalaryByMonth}