import Salary from "../models/Salary.js"



const addSalary = async (req, res) => {
 try{

    const {
        sal_emp_id,
        basic_salary,
        allowances,
        travelling,
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
    travelling,
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

const getSalary = async (req,res) =>{
    try{
        const {id} = req.params;
        const salary = await Salary.find({sal_emp_id: id}).populate('sal_emp_id', 'emp_id');
        return res.status(200).json({success : true, salary})
    }catch(error){
        return res.status(500).json({success :false, error:"Salary get server error"})
    }
} 

export{addSalary, getSalary}