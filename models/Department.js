import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  dep_name: { type: String, required: true },
  dep_manager : {type : String, required : true},
  dep_email : {type : String, required : true},
  dep_des: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Department = mongoose.model('Department', departmentSchema);

export default Department;
