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

    const totalNetSalaries = await Salary.aggregate([
        {$group: {_id:null, totalNetSalary:{$sum: "$net_salary"}}}
    ])
    const totalGrossSalaries = await Salary.aggregate([
        {$group: {_id:null, totalGrossSalary:{$sum: "$gross_salary"}}}
    ])
    //safely handle decimals
    const netSalary = totalNetSalaries[0]?.totalNetSalary || 0
    const grossSalary = totalGrossSalaries[0]?.totalGrossSalary || 0

    const employeeAppliedForLeave = await Leave.distinct('employeeId')
    const leaveStatus = await Leave.aggregate([
        {$group: {_id:"$status", count: {$sum: 1}}}
    ])
    const leaveSummary = {
        appliedFor: employeeAppliedForLeave.length,
        approved:leaveStatus.find(item => item._id === "Approved")?.count || 0,
        rejected:leaveStatus.find(item => item._id === "Rejected")?.count || 0,
        pending:leaveStatus.find(item => item._id === "Pending")?.count || 0

    }

    


    return res.status(200).json({success:true, totalDepartments, totalEmployees, activeEmployees, inactiveEmployees, 
       totalNetSalary:Number(netSalary).toFixed(2), totalGrossSalary:Number(grossSalary).toFixed(2), leaveSummary, employeesPerDepartment})
   }catch(error){
    return res.status(500).json({success: false, error:"Error loading data !"})
   }
}

export {getSummary}