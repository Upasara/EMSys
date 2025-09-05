import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import toast from 'react-hot-toast';

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
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
   const response = await axios.post(
    'http://localhost:5000/api/employee/add',
    formDataObj,
    {
     headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Set the content type for file upload
     },
    }
   );

   if (response.data.success) {
    toast.success("Employee added successfully...")
    navigate('/admin-dashboard/employees');
   } else {
    toast.error(response.data.error || "Error adding employee...")
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    toast.error(error.response.data.error || "Server Error...")
   }
  }
 };

 return (
  <div className='px-4 py-8'>
   <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-lg  p-8'>
    <h3 className='text-2xl text-blue-800  text-center mb-10  text-shadow-2xs font-semibold'>
     Employee Register Form
    </h3>
    <form onSubmit={handleSubmit}>
     <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
      {/* full name */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Full Name *</label>
       <textarea
        type='text'
        name='emp_Fname'
        onChange={handleChange}
        
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        rows='2'
        required
       />
      </div>

      {/* address */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Permanent Address *</label>
       <textarea
        type='text'
        name='emp_address'
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        rows='2'
        required
       />
      </div>

      {/* name with initials*/}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Name with Initials</label>
       <input
        type='text'
        name='name'
        onChange={handleChange}
        
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        required
       />
      </div>

      {/* employee ID */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Employee ID</label>
       <input
        type='text'
        name='emp_id'
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        required
       />
      </div>

      {/* designation */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Designation</label>
       <input
        type='text'
        name='emp_designation'
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        required
       />
      </div>

      {/* department */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Department</label>
       <select
        name='emp_dep'
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300 cursor-pointer'
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
       <label className='block text-gray-600 font-mono text-lg'>Company</label>
       <select
        name='emp_company'
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300 cursor-pointer'
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
       <label className='block text-gray-600 font-mono text-lg'>National ID</label>
       <input
        type='text'
        name='emp_Nid'
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        required
       />
      </div>

      {/* DOB */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Date of Birth</label>
       <input
        type='date'
        name='emp_dob'
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        required
       />
      </div>

      {/* phone number 1 */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Phone Number</label>
       <input
        type='number'
        name='emp_number1'
        onChange={handleChange}
        
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
       />
       {errors.emp_number1 && (
        <p className='text-red-500  mt-1'>{errors.emp_number1}</p>
       )}
      </div>

      {/* phone number 2*/}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Mobile Number</label>
       <input
        type='number'
        name='emp_number2'
        onChange={handleChange}
        
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        required
       />
       {errors.emp_number2 && (
        <p className='text-red-500  mt-1'>{errors.emp_number2}</p>
       )}
      </div>

      {/* email */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>E-mail</label>
       <input
        type='email'
        name='email'
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        required
       />
       {errors.email && (
        <p className='text-red-500  mt-1'>{errors.email}</p>
       )}
      </div>

      {/* gender */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Gender</label>
       <select
        name='emp_gender'
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300 cursor-pointer'
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
       <label className='block text-gray-600 font-mono text-lg'>Marital Status</label>
       <select
        name='emp_Mstatus'
        onChange={handleChange}
        className=' mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300 cursor-pointer'
        required
       >
        <option value=''>Select Marital Status</option>
        <option value='Single'>Single</option>
        <option value='Married'>Married</option>
       </select>
      </div>

      {/* start date */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Start Date</label>
       <input
        type='date'
        name='emp_Sdate'
        
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        required
       />
      </div>

      {/* image upload */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Image</label>
       <input
        type='file'
        name='image'
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300 cursor-pointer'
        accept='image/*'
       />
      </div>

      {/* emergency contact name */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Emergency Contact Name</label>
       <input
        type='text'
        name='emp_Ename'
        
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        required
       />
      </div>

      {/* emergency contact number*/}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>
        Emergency Contact Number
       </label>
       <input
        type='number'
        name='emp_Enumber'
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        required
       />
       {errors.emp_Enumber && (
        <p className='text-red-500  mt-1'>{errors.emp_Enumber}</p>
       )}
      </div>

      {/* medical history */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Medical History</label>
       <textarea
        type='text'
        name='emp_medical'
        
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        rows='2'
       />
      </div>

      {/* password */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Password</label>
       <input
        type='password'
        name='password'
        onChange={handleChange}
        
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        required
       />
      </div>

      {/* role */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Role</label>
       <select
        name='role'
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300 cursor-pointer'
        required
       >
        <option value=''>select a role</option>
        <option value='admin'>ADMIN</option>
        <option value='employee'>EMPLOYEE</option>
       </select>
      </div>
     </div>
     <div className='w-full h-0.5 bg-gray-400 mb-2 mt-10'></div>

     {/*------------------------------------salary------------------------------------------------------------------ */}
     <p className='mt-2 mb-5 text-gray-500 font-semibold '>Salary details</p>
     <div className=' grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6  p-6 pt-0 rounded-2xl'>
      {/* basic salary */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Basic Salary</label>
       <input
        type='number'
        name='emp_salary'
        
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        required
       />
      </div>

      {/* allowance */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Traveling Allowance</label>
       <input
        type='number'
        name='emp_allowance'
        
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
       />
      </div>

      {/* staff loan */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Staff Loan</label>
       <input
        type='number'
        name='staff_loan'
        
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
       />
      </div>

      {/* stamp duty */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Stamp Duty</label>
       <input
        type='number'
        name='stamp_duty'
        
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
       />
      </div>

      {/* festival advance */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>festival Advance</label>
       <input
        type='number'
        name='festival_advance'
        
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
       />
      </div>
     </div>
     {/*------------------------------------bank details------------------------------------------------------------------ */}
     <div className='w-full h-0.5 bg-gray-400 mb-2 mt-5'></div>
     <p className='mt-2 mb-5 text-gray-500 font-semibold '>Bank details</p>
     <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
      {/* bank name */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Bank Name</label>
       <input
        type='text'
        name='bank_name'
        
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
       />
      </div>
      {/* branch name */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Branch</label>
       <input
        type='text'
        name='bank_branch'
        
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
       />
      </div>
      {/* account number */}
      <div>
       <label className='block text-gray-600 font-mono text-lg'>Account Number</label>
       <input
        type='number'
        name='account_number'
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
       />
      </div>
     </div>

     <div className='flex justify-between items-center mt-5 gap-3'>
      <button
       type='submit'
       className='w-1/2  py-1.5 rounded-md bg-transparent font-semibold text-green-700 transition duration-300 '
      >
       Register Employee
      </button>
      <Link
       to='/admin-dashboard/employees'
       className=' py-1.5 w-1/2 text-center rounded-md bg-transparent font-semibold text-red-700  border-2 border-red-700 hover:bg-red-700 hover:text-white hover:shadow-xl  transition duration-300'
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
