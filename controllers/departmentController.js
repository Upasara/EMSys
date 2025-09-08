import Department from '../models/Department.js';

{/*Controller to get details of departments from the data base */}
const getDepartments = async(req, res)=> {
  try{
    const departments = await Department.find()
    return res.status(200).json({success : true, departments})

  }catch(error){
    return res.status(500).json({success : false, error : "Get department server error !"})
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

const getDepartment = async (req, res) =>{
 try{
  const {id} = req.params
  const department = await Department.findById({_id: id})
  return res.status(200).json({success : true, department})
 }catch(error){
  return res.status(500).json({success : false, error : "Edit department server error !"})
 }
}

const updateDepartment = async (req, res) =>{
  try{
    const {id} = req.params
    const {dep_name, dep_manager, dep_email, dep_des} = req.body
    const updateDep = await Department.findByIdAndUpdate({_id: id},{
      dep_name,
      dep_manager,
      dep_email,
      dep_des
    })
    return res.status(200).json({success : true, updateDep})
  }catch(error){
    return res.status(500).json({success : false, error : "Edit department server error !"})
  }
}

const deleteDepartment = async (req, res)=>{
  try{
    const {id}= req.params
    const deleteDep = await Department.findByIdAndDelete({_id: id})
    return res.status(200).json({success : true, deleteDep})
  }catch(error){
    return res.status(500).json({success : false, error : "Delete department server error !"})
  }
}


export { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment };
