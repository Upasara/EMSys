import Leave from "../models/Leave.js"
import Employee from "../models/Employee.js"
import path from "path"

const addLeave = async (req, res) => {
try{
const {userId, leave_type, start_date, end_date, days, description} = req.body
const employee = await Employee.findOne({userId})

const newLeave = new Leave({
    employeeId: employee._id,
    leave_type,
    start_date,
    end_date,
    days,
    description
})

await newLeave.save()
return res.status(200).json({success:true})

}catch(error){
console.log(error.message)
return res.status(500).json({success:false, error:"leave add server error"})
}  
}

const getLeave = async (req,res) =>{ 
try{
const {id} = req.params
let leaves = await Leave.find({employeeId: id})
if(!leaves){
    const employee = await Employee.findOne({userId: id})
    leaves = await Leave.find({employeeId: employee._id})
}
return res.status(200).json({success:true, leaves})
}catch(error){
    return res.status(500).json({success:false, error: "leave could not be fetched..."})
}
}

const getLeaves = async (req, res) => {
    try{
        const leaves = await Leave.find().populate({
            path:"employeeId",
            populate:  [
                {
                    path:"emp_dep",
                    select : "dep_name"
                },
                {
                    path: "userId",
                    select: "name"
                }
            ]
        })
        return res.status(200).json({success:true, leaves})
    }catch(error){
        return res.status(500).json({success:false, error: "leaves could not be fetched"})
    }
}

const getLeaveDetails = async (req,res) => {
try{
    const {id} = req.params
    const leaveDetails = await Leave.findById({_id: id}).populate({
        path:"employeeId",
        populate:[
            {
                path:"emp_dep",
                select: "dep_name"
            },
            {
                path:"userId",
                select: "name profileImage"
            }
        ]
    })
    return res.status(200).json({success:true, leaveDetails})
}catch(error){
    return res.status(500).json({success:false, error : "Leave details could not be fetched"})
}
}

const updateLeave = async (req, res) => {
    try{
        const {id} = req.params
        const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})
        if(!leave){
            return res.status(404).json({success:false, error: "Leave not found"})
        }
        return res.status(200).json({success:true})
    }catch(error){
        return res.status(500).json({success:false, error : "Status could not be updated"})
    }
}

export {addLeave,getLeave,getLeaves, getLeaveDetails, updateLeave}