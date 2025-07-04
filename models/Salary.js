import mongoose  from "mongoose";
import { Schema } from "mongoose";

const salarySchema = new Schema({
    sal_emp_id : {type : Schema.Types.ObjectId, ref : "Employee", required : true},
    emp_dep : {type :Schema.Types.ObjectId, ref : "Department"},
    basic_salary : {type : Number, required : true},
    allowances : {type : Number},
    travelling : {type : Number},
    over_time : {type : Number},
    other_allowances : {type : Number},
    epf8 : {type : Number},
    staff_loan : {type : Number},
    stamp_duty : {type : Number},
    festival_advance : {type : Number},
    deductions : {type : Number},
    gross_salary : {type : Number, required : true},
    total_deductions : {type : Number, required : true},
    net_salary : {type : Number, required : true},
    pay_date : {type : Date, required : true},
    createdAt : {type : Date, default: Date.now},
    updatedAt : {type : Date, default: Date.now}
})

const Salary = mongoose.model("Salary", salarySchema)
export default Salary;