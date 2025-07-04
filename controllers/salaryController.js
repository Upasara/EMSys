import path from "path";
import Salary from "../models/Salary.js"



const addSalary = async (req, res) => {
 try{

    const {
        sal_emp_id,
        basic_salary,
        allowances,
        travelling,
        over_time,
        other_allowances,
        epf8,
        staff_loan,
        stamp_duty,
        festival_advance,
        deductions,
        gross_salary,
        total_deductions,
        net_salary,
        pay_date,
    }
    = req.body;
// const totalSalary = parseInt(basic_salary) + parseInt(allowances) - parseInt(deductions);

const newSalary = new Salary({
    sal_emp_id,
    basic_salary,
    allowances,
    travelling,
    over_time,
    other_allowances,
    epf8,
    staff_loan,
    stamp_duty,
    festival_advance,

    deductions,
    gross_salary,
    total_deductions,
    net_salary ,// : totalSalary,
    pay_date
})

await newSalary.save();

return res.status(200).json({success : true})

 }catch(error){
    return res.status(500).json({success : false, error : "Salary could not be added..."})
 }


}

const getSalary = async (req,res) =>{
    try{
        const {id} = req.params;
        const salary = await Salary.find({sal_emp_id: id}).populate('sal_emp_id', 'emp_id');
        return res.status(200).json({success : true, salary})
    }catch(error){
        return res.status(500).json({success :false, error:"Salary get server error"})
    }
} 

const getSalaryDetails = async (req, res) => {
    try{
        const {id} = req.params
        const salaryDetails = await Salary.findById(id).populate({path: 'sal_emp_id',  populate: {path: 'emp_dep', select: 'dep_des' }})
        return res.status(200).json({success: true, salaryDetails})
    }catch(error){
        console.error('Error fetching salary details:', error);
        return res.status(500).json({success : false, error : "Salary details get server error"})
    }
}
export{addSalary, getSalary, getSalaryDetails}