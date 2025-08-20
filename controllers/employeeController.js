import multer from 'multer';
import Employee from '../models/Employee.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import path from 'path';
import Department from '../models/Department.js';
import { Await } from 'react-router-dom';
import { error } from 'console';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
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
      emp_company,
      emp_Sdate,
      emp_Enumber,
      emp_Ename,
      emp_medical,
      emp_salary,
      emp_allowance = 0, //default value for allowance
      staff_loan = 0, //default value for staff_loan
      stamp_duty = 0, //default value for stamp duty
      festival_advance = 0,
      bank_name = '', //default value for bank name
      account_number = '', //default value for bank account
      bank_branch = '', //default value for bank branch
      name,
      email,
      password,
      role,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: 'user already exist' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : '',
    });

    const newEmployee = new Employee({
      userId: newUser._id,
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
      emp_company,
      emp_Sdate,
      emp_Enumber,
      emp_Ename,
      emp_medical,
      emp_salary,
      emp_allowance,
      staff_loan,
      stamp_duty,
      festival_advance,
      bank_name,
      bank_branch,
      account_number
    });

    // save user and employee to database
    const savedEmployee = await newEmployee.save();
    const savedUser = await newUser.save();

    // if(!savedUser && !savedEmployee){
    //     return res.status(500).json({success : false, error : "Employee or User saving error..."})
    // }

    return res
      .status(200)
      .json({ success: true, message: 'Employee data created...' });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, error: 'Employee ID exist...' });
  }
};

const getEmployees = async (req, res) => {
  try {
    //{password:0} to not show password in response
    const employees = await Employee.find()
      .populate('userId', { password: 0 })
      .populate('emp_dep').sort({isActive: -1, createdAt: -1})//load active employees first and then by creating date
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Employee fetching error...' });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee
    employee = await Employee.findById({ _id: id })
      .populate('userId', { password: 0 })
      .populate('emp_dep');
      if(!employee){
       employee = await Employee.findOne({ userId: id })
      .populate('userId', { password: 0 })
      .populate('emp_dep');
      }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Employee fetching error...' });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
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
      emp_company,
      emp_Sdate,
      emp_Enumber,
      emp_Ename,
      emp_medical,
      emp_salary,
      emp_allowance = 0, //default value for allowance
      staff_loan = 0,
      stamp_duty = 0, //default value for stamp duty
      festival_advance = 0,
      bank_name,
      bank_branch,
      account_number,
      name,
      email,
      role,
    } = req.body;

    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: 'Employee not found...' });
    }

    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: 'User not found...' });
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      {
        name,
        email,
        role,
      }
    );
    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        emp_id,
        emp_Fname,
        emp_address,
        emp_Nid,
        emp_dep,
        emp_company,
        emp_dob,
        emp_number1,
        emp_number2,
        emp_designation,
        emp_Ename,
        emp_Enumber,
        emp_gender,
        emp_medical,
        emp_Mstatus,
        emp_Sdate,
        emp_salary,
        emp_allowance,
        staff_loan,
        stamp_duty,
        festival_advance,
        bank_name,
        bank_branch,
        account_number
      }
    );

    if (!updateEmployee || !updateUser) {
      return res
        .status(404)
        .json({ success: false, error: 'Employee or User not found...' });
    }

    return res
      .status(200)
      .json({ success: true, message: 'Employee updated successfully...' });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Employee updating error...' });
  }
};

const getEmployeesByDepartmentId = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ emp_dep: id }).populate('userId', {
      password: 0,
    });
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        error: 'EmployeeByDepartmentId fetching error...',
      });
  }
};

const deactivateEmployee = async (req, res) => {
  try{
    const {id} = req.params

    const employee = await Employee.findByIdAndUpdate(
      id,
      {isActive: false},
      {new: true}
    )

    if(!employee){
      return res.status(404).json({success: false, error: "Employee not found..."})
    }

    res.status(200).json({success: true, message: "Employee deactivated successfully..."})
  }catch(error){
    return res.status(500).json({success : false, error : "Employee deactivation error..."})
  }
}

const activateEmployee = async (req, res) => {
  try{
    const {id} = req.params
    const employee = await Employee.findByIdAndUpdate( id, {isActive : true}, {new : true} )
    if(!employee){
      return res.status(4040).json({success : false, error:  " Employee not found..."})
    }
    res.status(200).json({success : true, message : "Employee activated successfully..."})
  }catch(error){
    return res.status(500).json({success : false, error : "Employee activation error..."})
  }
}

export {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  getEmployeesByDepartmentId,
  deactivateEmployee,
  activateEmployee
};
