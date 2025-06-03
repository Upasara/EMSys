import multer from "multer"
import Employee from "../models/Employee.js"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import path from "path"



const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null,"public/uploads")
    },
    filename : (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload  = multer({storage :storage})

const addEmployee = async (req,res) => {
try{
const {
emp_id,
emp_Fname,
emp_address,
emp_Nid,
emp_dob,
emp_number1,
emp_number2,
emp_gender,
emp_Mstatus,
emp_designation,
emp_dep,
emp_Sdate,
emp_Enumber,
emp_Ename, 
emp_medical,
emp_ethnicity,
emp_salary,
name,
email,
password,
role,

} = req.body

const user = await User.findOne({email})
if(user){
return res.status(400).json({success : false, error : "user already exist"})
}



const  hashPassword = await bcrypt.hash(password, 10)


const newUser = new User({
name,
email,
password : hashPassword,
role,
profileImage : req.file ? req.file.filename : ""
})

const savedUser = await newUser.save()

const newEmployee = new Employee({
userId : savedUser._id,
emp_id,
emp_Fname,
emp_address,
emp_Nid,
emp_dob,
emp_number1,
emp_number2,
emp_gender,
emp_Mstatus,
emp_designation,
emp_dep,
emp_Sdate,
emp_Enumber,
emp_Ename,
emp_medical,
emp_ethnicity,
emp_salary,
})
await newEmployee.save()
return res.status(200).json({success : true, message : "Employee data created..."})

}catch(error){
    console.log(error.message)
    return res.status(500).json({success : false, error : "Employee adding error..."})
}

}

const getEmployees = async (req,res) =>{

    try{
        //{password:0} to not show password in response
        const employees = await Employee.find().populate("userId",{password:0}).populate("emp_dep")
        return res.status(200).json({success : true, employees})
    }catch(error){
        return res.status(500).json({success : false, error : "Employee fetching error..."})
    }

}

const getEmployee = async (req,res) => {
    const {id} = req.params;
    try{
        const employee = await Employee.findById({_id: id}).populate('userId',{password:0}).populate("emp_dep")
        return res.status(200).json({success : true, employee})
    }catch(error){
        return res.status(500).json({success : false, error : "Employee fetching error..."})
    }
}

export {addEmployee, upload, getEmployees, getEmployee}