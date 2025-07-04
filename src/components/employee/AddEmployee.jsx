import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';

const AddEmployee = () => {
 const navigate = useNavigate();
 const [departments, setDepartments] = useState([]);
 const [formData, setFormData] = useState({});

 //state to track validation errors
 const [errors, setErrors] = useState({});

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

  // Validate phone numbers
  let errorMessage = '';
  const phoneRegex = /^[0-9]{10}$/; //phone number regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email regex

  if (
   name === 'emp_number1' ||
   name === 'emp_number2' ||
   name === 'emp_Enumber'
  ) {
   if (!phoneRegex.test(value)) {
    errorMessage = 'Phone number must be 10 digits long...';
   }
  }

  if (name === 'email') {
   if (!emailRegex.test(value)) {
    errorMessage = 'Please enter a valid email address...';
   }
  }

  //update error state
  if (errorMessage) {
   setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: errorMessage,
   }));
  } else {
   setErrors((prevErrors) => {
    const { [name]: _, ...rest } = prevErrors; // remove the error for the current field
    return rest;
   });
  }

  if (name === 'image') {
   setFormData((prevData) => ({
    ...prevData,
    [name]: files && files[0] ? files[0] : null, // handle file input
   }));
  } else {
   setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
 };

 // submit handler function
 const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataObj = new FormData();

  if (!formData.image) {
   const response = await fetch('/1.png');
   const blob = await response.blob();
   formDataObj.append('image', blob, '1.png');
  } else {
   formDataObj.append('image', formData.image);
  }

  Object.keys(formData).forEach((key) => {
   if (key !== 'image') {
    formDataObj.append(key, formData[key]);
   }
  });

  try {
   const response = await axios.post(
    'http://localhost:5000/api/employee/add',
    formDataObj,
    {
     headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data', // Set the content type for file upload
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
  <div className='bg-slate-100'>
   <div className='max-w-4xl mx-auto bg-white shadow-md rounded-md mt-10 p-8'>
    <h3 className='text-2xl text-blue-800 font-medium text-center mb-10 mt-5'>
     Employee Register Form
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
        placeholder='eg : Pathiranage Don Dinesh Kumara'
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
        rows='2'
        required
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
        required
       />
      </div>

      {/* name with initials*/}
      <div>
       <label className='block text-primaryText'>Name with Initials</label>
       <input
        type='text'
        name='name'
        onChange={handleChange}
        placeholder='eg : P D Dinesh Kumara'
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
        required
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

      {/* designation */}
      <div>
       <label className='block text-primaryText'>Designation</label>
       <input
        type='text'
        name='emp_designation'
        onChange={handleChange}
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
        required
       />
      </div>

      {/* department */}
      <div>
       <label className='block text-primaryText'>Department</label>
       <select
        name='emp_dep'
        onChange={handleChange}
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600 cursor-pointer'
        required
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

      {/* department */}
      <div>
       <label className='block text-primaryText'>Company</label>
       <select
        name='emp_company'
        onChange={handleChange}
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600 cursor-pointer'
        required
       >
        <option value=''>Select the Company</option>
        <option value='P E Mathew & Company'>P E Mathew & Company</option>
        <option value='PEMCO Accountants Pvt Ltd'>
         PEMCO Accountants Pvt Ltd
        </option>
        <option value='Business Managemant Services Ltd'>
         Business Management Services Ltd
        </option>
       </select>
      </div>

      {/* national ID */}
      <div>
       <label className='block text-primaryText'>National ID</label>
       <input
        type='text'
        name='emp_Nid'
        onChange={handleChange}
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
        required
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
        required
       />
      </div>

      {/* phone number 1 */}
      <div>
       <label className='block text-primaryText'>Phone Number</label>
       <input
        type='number'
        name='emp_number1'
        onChange={handleChange}
        placeholder='eg : 0112123456'
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       />
       {errors.emp_number1 && (
        <p className='text-red-500 text-sm mt-1'>{errors.emp_number1}</p>
       )}
      </div>

      {/* phone number 2*/}
      <div>
       <label className='block text-primaryText'>Mobile Number</label>
       <input
        type='number'
        name='emp_number2'
        onChange={handleChange}
        placeholder='eg : 0711234567'
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
        required
       />
       {errors.emp_number2 && (
        <p className='text-red-500 text-sm mt-1'>{errors.emp_number2}</p>
       )}
      </div>

      {/* email */}
      <div>
       <label className='block text-primaryText'>E-mail</label>
       <input
        type='email'
        name='email'
        onChange={handleChange}
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
        required
       />
       {errors.email && (
        <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
       )}
      </div>

      {/* gender */}
      <div>
       <label className='block text-primaryText'>Gender</label>
       <select
        name='emp_gender'
        onChange={handleChange}
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600 cursor-pointer'
        required
       >
        <option value=''>Select Gender</option>
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
        <option value='Other'>Other</option>
       </select>
      </div>

      {/* marital status */}
      <div>
       <label className='block text-primaryText'>Marital Status</label>
       <select
        name='emp_Mstatus'
        onChange={handleChange}
        className=' mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600 cursor-pointer'
        required
       >
        <option value=''>Select Marital Status</option>
        <option value='Single'>Single</option>
        <option value='Married'>Married</option>
       </select>
      </div>

      {/* start date */}
      <div>
       <label className='block text-primaryText'>Start Date</label>
       <input
        type='date'
        name='emp_Sdate'
        placeholder='date of joining'
        onChange={handleChange}
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
        required
       />
      </div>

      {/* image upload */}
      <div>
       <label className='block text-primaryText'>Image</label>
       <input
        type='file'
        name='image'
        onChange={handleChange}
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600 cursor-pointer'
        accept='image/*'
       />
      </div>

      {/* emergency contact name */}
      <div>
       <label className='block text-primaryText'>Emergency Contact Name</label>
       <input
        type='text'
        name='emp_Ename'
        placeholder='Name of the emergency contact person'
        onChange={handleChange}
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
        required
       />
      </div>

      {/* emergency contact number*/}
      <div>
       <label className='block text-primaryText'>
        Emergency Contact Number
       </label>
       <input
        type='number'
        name='emp_Enumber'
        placeholder='Number of the emergency contact person'
        onChange={handleChange}
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
        required
       />
       {errors.emp_Enumber && (
        <p className='text-red-500 text-sm mt-1'>{errors.emp_Enumber}</p>
       )}
      </div>

      {/* medical history */}
      <div>
       <label className='block text-primaryText'>Medical History</label>
       <textarea
        type='text'
        name='emp_medical'
        placeholder='Any medical conditions or allergies?'
        onChange={handleChange}
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
        rows='2'
       />
      </div>

      {/* password */}
      <div>
       <label className='block text-primaryText'>Password</label>
       <input
        type='password'
        name='password'
        onChange={handleChange}
        placeholder='  ****************** '
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
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600 cursor-pointer'
        required
       >
        <option value=''>select a role</option>
        <option value='admin'>ADMIN</option>
        <option value='employee'>EMPLOYEE</option>
       </select>
      </div>
     </div>

     {/*------------------------------------------------------------------------------------------------------ */}
     <div className=' grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-4 p-6 shadow-xl rounded-2xl'>
      {/* basic salary */}
      <div>
       <label className='block text-primaryText'>Basic Salary</label>
       <input
        type='number'
        name='emp_salary'
        placeholder='Rs. 0'
        onChange={handleChange}
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
        required
       />
      </div>

      {/* allowance */}
      <div>
       <label className='block text-primaryText'>Traveling Allowance</label>
       <input
        type='number'
        name='emp_allowance'
        placeholder='Rs. 0'
        onChange={handleChange}
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       />
      </div>

      {/* staff loan */}
      <div>
       <label className='block text-primaryText'>Staff Loan</label>
       <input
        type='number'
        name='staff_loan'
        placeholder='Rs. 0'
        onChange={handleChange}
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       />
      </div>

      {/* stamp duty */}
      <div>
       <label className='block text-primaryText'>Stamp Duty</label>
       <input
        type='number'
        name='stamp_duty'
        placeholder='Rs. 0'
        onChange={handleChange}
        className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       />
      </div>
     </div>
     <div className='flex justify-between items-center mt-5 gap-3'>
      <button
       type='submit'
       className='w-1/2 bg-green-700 py-1.5 rounded-md hover:bg-green-600 text-white transition'
      >
       Register Employee
      </button>
      <Link
       to='/admin-dashboard/employees'
       className='bg-red-700 py-1.5 w-1/2 text-center rounded-md text-white hover:bg-red-600 transition'
      >
       Cancel
      </Link>
     </div>
    </form>
   </div>
  </div>
 );
};

export default AddEmployee;
