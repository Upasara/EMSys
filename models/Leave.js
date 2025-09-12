import mongoose from "mongoose";
import { Schema } from "mongoose";

const leaveSchema = new Schema({
    employeeId : {type:Schema.Types.ObjectId, ref: "Employee", required:true},
    leave_type : {type:String, enum:["Sick Leave", "Casual Leave", "Annual Leave"], required:true},
    start_date : {type:Date, required:true},
    end_date : {type:Date, default: null},
    days : {type:Number, required:true},
    description : {type:String, default: ""},
    status: {type:String, enum: ["Pending", "Approved", "Rejected"], default: "Pending"},
    appliedAt : {type:Date, default: Date.now},
    updatedAt : {type:Date, default: Date.now}
})

const Leave = mongoose.model("Leave", leaveSchema)
export default Leave