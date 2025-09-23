import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const getEmmployeeSummary = async (req, res) => {
    try{
        
        const userId = req.user.id;
        const employee = await Employee.findOne({userId})
        console.log(employee)
        return res.status(200).json({success:true, employee})
    }catch(error){
        return res.status(500).json({success:false, error:"Could not fetch employee summary !"})
    }
}

export {getEmmployeeSummary}