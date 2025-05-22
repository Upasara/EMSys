import Department from '../models/Department.js';

{/*Controller to get details of departments from the data base */}
const getDepartments = async(req, res)=> {
  try{
    const departments = await Department.find()
    return res.status(200).json({success : true, departments})

  }catch(error){
    return res.status(500).json({success : false, error : "Get department server error"})
  }
}

{/*Controller to push departments to the data base */}

const addDepartment = async (req, res) => {
  try {
    const { dep_name, dep_manager, dep_email, dep_des,  } = req.body;
    const newDep = new Department({
      dep_name,
      dep_manager,
      dep_email,
      dep_des,
    });
    await newDep.save();
    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Department server error' });
  }
};



export { addDepartment, getDepartments };
