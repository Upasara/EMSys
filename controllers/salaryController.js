import Salary from "../models/Salary.js"
import Employee from "../models/Employee.js"
import path from "path";



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
        epf12,
        etf3,
        staff_loan,
        stamp_duty,
        festival_advance,
        deductions,
        no_pay_days,
        no_pay_amount,
        tax,
        gross_salary_epf,
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
    epf12,
    etf3,
    staff_loan,
    stamp_duty,
    festival_advance,
    deductions,
    no_pay_days,
    no_pay_amount,
    tax,
    gross_salary_epf,
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
        
        let salary
        salary = await Salary.find({sal_emp_id: id}).populate('sal_emp_id', 'emp_id');
        if(!salary || salary.length < 1){
            const employee = await Employee.findOne({userId: id})
            salary = await Salary.find({sal_emp_id: employee._id}).populate('sal_emp_id', 'emp_id');
        }

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

const getSalaryByMonth = async (req, res) => {
try{
    const {month} = req.body
    
    if(!month){
        return res.status(400).json({success : false, error : "Please select a month"})
    }

    const startDate = new Date(`${month}-01T00:00:00.000Z`)
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + 1)

    const salaries = await Salary.find({
        pay_date : {$gte: startDate, $lt: endDate},
    }).populate({
        path: "sal_emp_id",
        populate: [
            {
                path: "emp_dep",
                select: "dep_name"
            },
            {
                path    : "userId",
                select  : "name"
            }

        ]
    })

    return res.status(200).json({success : true, salaries})

}catch(error){
    console.error("Error fetching salary by month : ", error)
    return res.status(500).json({success : false, error : "Salary by month server error"})
}
}


export{addSalary, getSalary, getSalaryDetails, getSalaryByMonth  }