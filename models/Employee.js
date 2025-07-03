import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeeSchema = new Schema({
    //data from User.js fetched here (name, email, password, role, profileImage)
    userId : {type : Schema.Types.ObjectId, ref : "User", required: true},
    emp_id : {type : String, required : true, unique : true},
    emp_Fname : {type : String},
    emp_address : {type : String},
    emp_Nid : {type : String},
    emp_dob : {type : Date},
    emp_number1 : {type : Number },
    emp_number2 : {type : Number },
    emp_gender : {type : String},
    emp_Mstatus : {type : String },
    emp_designation : {type : String },
    emp_dep : {type : Schema.Types.ObjectId, ref : "Department", required : true},
    emp_company: {type: String},
    emp_Sdate : {type : Date},
    emp_Ename : { type: String},
    emp_Enumber : { type: Number},
    emp_medical : {type : String},
    emp_salary : { type: Number, required: true },
    emp_allowance : { type: Number, default: 0 },
    staff_loan : { type: Number, default: 0 },
    stamp_duty : { type: Number, default: 0 },
    createdAt : {type : Date, default: Date.now},
    updatedAt : {type : Date, default: Date.now}

})

const Employee = mongoose.model("Employee", employeeSchema)
export default Employee