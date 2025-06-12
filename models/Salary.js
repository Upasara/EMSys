import mongoose  from "mongoose";
import { Schema } from "mongoose";

const salarySchema = new Schema({
    sal_emp_id : {type : Schema.Types.ObjectId, ref : "Employee", required : true},
    basic_salary : {type : Number, required : true},
    allowances : {type : Number},
    deductions : {type : Number},
    net_salary : {type : Number, required : true},
    pay_date : {type : Date, required : true},
    createdAt : {type : Date, default: Date.now},
    updatedAt : {type : Date, default: Date.now}
})

const Salary = mongoose.model("Salary", salarySchema)
export default Salary;