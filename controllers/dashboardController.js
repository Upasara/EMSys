import Employee from '../models/Employee.js';
import Emloyee from '../models/Employee.js';

const getSummary = async (req,res) => {
    try{
        const Count = await Employee.countDocuments()
        const activeCount = await Emloyee.countDocuments({isActive:true})
        const inactiveCOunt = await Employee.countDocuments({isActive:false})
        return res.status(200).json({success : true, Count, activeCount, inactiveCOunt})
    }catch(error){
        return res.status(500).json({success: false, error: "Dashboard server error"})
    }
}

export {getSummary}