import Salary from "../models/Salary.js"



const addSalary = async (req, res) => {
 try{

    const {
        sal_emp_id,
        basic_salary,
        allowances,
        deductions,
        net_salary,
        pay_date,
    }
    = req.body;
// const totalSalary = parseInt(basic_salary) + parseInt(allowances) - parseInt(deductions);

const newSalary = new Salary({
    sal_emp_id,
    basic_salary,
    allowances,
    deductions,
    net_salary ,// : totalSalary,
    pay_date
})

await newSalary.save();

return res.status(200).json({success : true})

 }catch(error){
    return res.status(500).json({success : false, error : "Salary could not be added..."})
 }


}

export{addSalary}