import Department from '../models/Department.js';

const addDepartment = async (req, res) => {
  try {
    const { dep_name, dep_des } = req.body;
    const newDep = new Department({
      dep_name,
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

export { addDepartment };
