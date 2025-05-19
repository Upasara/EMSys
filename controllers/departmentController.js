import Department from "../models/Department.js"

const addDepartment = async (req, res) =>{
    try{
        const {dep_name, dep_manager, dep_email, dep_des} = req.body
        const newDepartment = new Department({
            dep_name,
            dep_manager,
            dep_email,
            dep_des
        })
        await newDepartment.save()
        return res.status(200).json({success:true, department: newDepartment})
    }catch(error){
        return res.status(500).json({success: false, error: "add department error"})
    }
}

export {addDepartment}