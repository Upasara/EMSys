import Leave from "../models/Leave.js"
import Employee from "../models/Employee.js"

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
const employee = await Employee.findOne({userId: id})
const leaves = await Leave.find({employeeId: employee._id})
return res.status(200).json({success:true, leaves})
}catch(error){
    return res.status(500).json({success:false, error: "leave could not be fetched..."})
}
}

export {addLeave,getLeave}