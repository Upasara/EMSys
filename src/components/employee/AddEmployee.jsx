import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';

const AddEmployee = () => {
 const navigate = useNavigate();
 const [departments, setDepartments] = useState([]);
 const [formData, setFormData] = useState({});
 useEffect(() => {
  const getDepartments = async () => {
   const departments = await fetchDepartments();
   setDepartments(departments);
  };
  getDepartments();
 }, []);

 //change handler function
 const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === 'image') {
   setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  } else {
   setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
 };

 // submit handler function
 const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataObj = new FormData();
  Object.keys(formData).forEach((key) => {
   formDataObj.append(key, formData[key]);
  });

  try {
   const response = await axios.post(
    'http://localhost:5000/api/employee/add',
    formDataObj,
    {
     headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
     },
    }
   );

   if (response.data.success) {
    navigate('/admin-dashboard/employees');
   } else {
    console.log(response);
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    alert(error.response.data.error);
   }
  }
 };

 return (
  <div className='max-w-4xl mx-auto bg-white shadow-md rounded-md mt-10 p-8'>
   <h3 className='text-2xl text-blue-800 font-medium text-center mb-5'>
    Add New Employee
   </h3>
   <form onSubmit={handleSubmit}>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
     {/* full name */}
     <div>
      <label className='block text-primaryText'>Full Name</label>
      <textarea
       type='text'
       name='emp_Fname'
       onChange={handleChange}
       placeholder='Pathiranage Don Dinesh Kumara'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       rows='2'
      />
     </div>

     {/* address */}
     <div>
      <label className='block text-primaryText'>Permanent Address</label>
      <textarea
       type='text'
       name='emp_address'
       onChange={handleChange}
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       rows='2'
      />
     </div>

     {/* name with initials*/}
     <div>
      <label className='block text-primaryText'>Name with Initials</label>
      <input
       type='text'
       name='name'
       onChange={handleChange}
       placeholder='P D Dinesh Kumara'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      />
     </div>

     {/* employee ID */}
     <div>
      <label className='block text-primaryText'>Employee ID</label>
      <input
       type='text'
       name='emp_id'
       onChange={handleChange}
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       required
      />
     </div>

     {/* national ID */}
     <div>
      <label className='block text-primaryText'>National ID</label>
      <input
       type='text'
       name='emp_Nid'
       onChange={handleChange}
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      />
     </div>

     {/* DOB */}
     <div>
      <label className='block text-primaryText'>Date of Birth</label>
      <input
       type='date'
       name='emp_dob'
       onChange={handleChange}
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      />
     </div>

     {/* phone number 1 */}
     <div>
      <label className='block text-primaryText'>Phone Number</label>
      <input
       type='number'
       name='emp_number1'
       onChange={handleChange}
       placeholder='0112123456'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      />
     </div>

     {/* phone number 2*/}
     <div>
      <label className='block text-primaryText'>Mobile Number</label>
      <input
       type='number'
       name='emp_number2'
       onChange={handleChange}
       placeholder='0711234567'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      />
     </div>

     {/* email */}
     <div>
      <label className='block text-primaryText'>E-mail</label>
      <input
       type='email'
       name='email'
       onChange={handleChange}
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      />
     </div>

     {/* gender */}
     <div>
      <label className='block text-primaryText'>Gender</label>
      <select
       name='emp_gender'
       onChange={handleChange}
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      >
       <option value=''>Select Gender</option>
       <option value='male'>Male</option>
       <option value='female'>Female</option>
       <option value='other'>Other</option>
      </select>
     </div>

     {/* marital status */}
     <div>
      <label className='block text-primaryText'>Marital Status</label>
      <select
       name='emp_Mstatus'
       onChange={handleChange}
       className=' mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      >
       <option value=''>Select Marital Status</option>
       <option value='single'>Single</option>
       <option value='married'>Married</option>
      </select>
     </div>

     {/* designation */}
     <div>
      <label className='block text-primaryText'>Designation</label>
      <input
       type='text'
       name='emp_designation'
       onChange={handleChange}
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      />
     </div>

     {/* department */}
     <div>
      <label className='block text-primaryText'>Department</label>
      <select
       name='emp_dep'
       onChange={handleChange}
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      >
       <option value=''>Select department</option>
       {departments.map((dep) => (
        //dep_id could be an error
        <option key={dep._id} value={dep._id}>
         {dep.dep_name}
        </option>
       ))}
      </select>
     </div>

     {/* start date */}
     <div>
      <label className='block text-primaryText'>Start Date</label>
      <input
       type='date'
       name='emp_Sdate'
       onChange={handleChange}
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      />
     </div>

     {/* emergency contact */}
     <div>
      <label className='block text-primaryText'>Emergency Contact</label>
      <input
       type='number'
       name='emp_Enumber'
       onChange={handleChange}
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      />
     </div>

     {/* medical history */}
     <div>
      <label className='block text-primaryText'>Medical History</label>
      <input
       type='text'
       name='emp_medical'
       onChange={handleChange}
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      />
     </div>

     {/* ethnicity */}
     <div>
      <label className='block text-primaryText'>Ethnicity</label>
      <input
       type='text'
       name='emp_ethnicity'
       onChange={handleChange}
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      />
     </div>

     {/* salary */}
     <div>
      <label className='block text-primaryText'>Salary</label>
      <input
       type='number'
       name='emp_salary'
       onChange={handleChange}
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       required
      />
     </div>

     {/* password */}
     <div>
      <label className='block text-primaryText'>Password</label>
      <input
       type='password'
       name='password'
       onChange={handleChange}
       placeholder='****************** '
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       required
      />
     </div>

     {/* role */}
     <div>
      <label className='block text-primaryText'>Role</label>
      <select
       name='role'
       onChange={handleChange}
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       required
      >
       <option value=''>select a role</option>
       <option value='admin'>ADMIN</option>
       <option value='employee'>EMPLOYEE</option>
      </select>
     </div>

     {/* image upload */}
     <div>
      <label className='block text-primaryText'>Image</label>
      <input
       type='file'
       name='image'
       onChange={handleChange}
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       accept='image/*'
      />
     </div>
    </div>
    <div className='flex justify-between items-center mt-5 gap-3'>
     <button
      type='submit'
      className='w-1/2 bg-green-700 py-1.5 rounded-md hover:bg-green-600 text-white'
     >
      Add Department
     </button>
     <Link
      to='/admin-dashboard/employees'
      className='bg-red-700 py-1.5 w-1/2 text-center rounded-md text-white hover:bg-red-600'
     >
      Cancel
     </Link>
    </div>
   </form>
  </div>
 );
};

export default AddEmployee;
