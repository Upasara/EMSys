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
    emp_Fname,
    emp_name,
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

const  hashPassword = await bcrypt.hash(password, 10   )

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
    emp_Fname,
    emp_name,
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
    emp_medical,
    emp_ethnicity,
    emp_salary,
})
await newEmployee.save()
return res.status(200).json({success : true, message : "Employee data created..."})

}catch(error){
return res.status(500).json({success : false, error : "employee adding error..."})
}

}

export {addEmployee, upload}