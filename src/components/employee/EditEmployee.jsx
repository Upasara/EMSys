import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';

const EditEmployee = () => {
 const navigate = useNavigate();
 const [departments, setDepartments] = useState([]);
 const [employee, setEmployee] = useState({
  emp_id: '',
  emp_Fname: '',
  emp_address: '',
  emp_Nid: '',
  emp_dob: '',
  emp_number1: '',
  emp_number2: '',
  emp_gender: '',
  emp_Mstatus: '',
  emp_designation: '',
  emp_dep: '',
  emp_company: '',
  emp_Sdate: '',
  emp_Enumber: '',
  emp_Ename: '',
  emp_medical: '',
  emp_salary: 0,
  emp_allowance: 0, // default value for allowance
  staff_loan: 0,
  stamp_duty: 0,
  name: '',
  email: '',
  role: '',
  profileImage: '',
 });
 const { id } = useParams();

 const [errors, setErrors] = useState({});

 useEffect(() => {
  const getDepartments = async () => {
   const departments = await fetchDepartments();
   setDepartments(departments);
  };
  getDepartments();
 }, []);

 useEffect(() => {
  const fetchEmployee = async () => {
   try {
    const response = await axios.get(
     `http://localhost:5000/api/employee/${id}`,
     {
      /* get request includes n authorization header with a token retirieved from localstorage,
              to ensure that only authenticated user can access the data.  */
      headers: {
       Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
     }
    );

    if (response.data.success) {
     // Format the date of birth to YYYY-MM-DD format
     const formattedDob = response.data.employee.emp_dob
      ? new Date(response.data.employee.emp_dob).toISOString().split('T')[0]
      : '';
     const formattedSdate = response.data.employee.emp_Sdate
      ? new Date(response.data.employee.emp_Sdate).toISOString().split('T')[0]
      : '';

     setEmployee({
      ...response.data.employee,
      name: response.data.employee.userId.name || '',
      email: response.data.employee.userId.email || '',
      role: response.data.employee.userId.role || '',
      profileImage: response.data.employee.userId.profileImage || '',
      emp_dep: response.data.employee.emp_dep || '', // Ensure emp_dep is set correctly
      emp_dob: formattedDob,
      emp_Sdate: formattedSdate,

      // profileImage: response.data.employee.userId.profileImage || '',
     });
    }
   } catch (error) {
    if (error.response && !error.response.data.success) {
     alert(error.response.data.error);
    }
   }
  };
  fetchEmployee();
 }, []);

 //change handler function
 const handleChange = (e) => {
  const { name, value } = e.target;

  // Validate phone numbers
  let errorMessage = '';
  const phoneRegex = /^[0-9]{9}$/; //phone number regex
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

  setEmployee((prevData) => ({ ...prevData, [name]: value }));
 };

 // submit handler function
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
   const response = await axios.put(
    `http://localhost:5000/api/employee/${id}`,
    employee,
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
  <>
   {departments && employee ? (
    <div className='bg-slate-100'>
     <div className='max-w-4xl mx-auto bg-white shadow-md rounded-md mt-10 p-8'>
      <h3 className='text-2xl text-blue-800 font-medium text-center mb-10 mt-5'>
       Edit Employee
      </h3>
      <div className='flex justify-center mb-5'>
       <img
        src={
         employee.profileImage
          ? `http://localhost:5000/${employee.profileImage}`
          : '/placeholder.avif'
        }
        className='rounded-full border w-44 '
       />
      </div>

      <form onSubmit={handleSubmit}>
       <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
        {/* full name */}
        <div>
         <label className='block text-primaryText'>Full Name</label>
         <textarea
          type='text'
          name='emp_Fname'
          onChange={handleChange}
          value={employee.emp_Fname || ''}
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
          value={employee.emp_address || ''}
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
          value={employee.name || ''}
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
          value={employee.emp_id || ''}
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
          value={employee.emp_designation || ''}
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
          value={employee.emp_dep || ''}
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
        {/* company */}
        <div>
         <label className='block text-primaryText'>Company</label>
         <select
          name='emp_company'
          onChange={handleChange}
          value={employee.emp_company || ''}
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
          value={employee.emp_Nid || ''}
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
          value={employee.emp_dob || ''}
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
          value={employee.emp_number1 || ''}
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
          value={employee.emp_number2 || ''}
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
          value={employee.email || ''}
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
          value={employee.emp_gender || ''}
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
          value={employee.emp_Mstatus || ''}
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
          value={employee.emp_Sdate || ''}
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
          value={employee.role || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600 cursor-pointer'
          required
         >
          <option value=''>select a role</option>
          <option value='admin'>ADMIN</option>
          <option value='employee'>EMPLOYEE</option>
         </select>
        </div>
        {/* emergency contact name */}
        <div>
         <label className='block text-primaryText'>
          Emergency Contact Name
         </label>
         <input
          type='text'
          name='emp_Ename'
          placeholder='Name of the emergency contact person'
          onChange={handleChange}
          value={employee.emp_Ename || ''}
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
          value={employee.emp_Enumber || ''}
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
          value={employee.emp_medical || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
          rows='2'
         />
        </div>
       </div>
       <div className='w-full h-0.5 bg-gray-300 mb-2 mt-5'></div>

       {/*------------------------------------salary------------------------------------------------------------------ */}
       <p className='mt-2 mb-5 text-gray-500 text-sm'>Salary details</p>
       <div className=' grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4  p-6 pt-0 rounded-2xl'>
        {/* salary */}
        <div>
         <label className='block text-primaryText'>Salary</label>
         <input
          type='number'
          name='emp_salary'
          onChange={handleChange}
          value={employee.emp_salary || ''}
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
          onChange={handleChange}
          value={employee.emp_allowance || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
         />
        </div>
        {/* staff loan */}
        <div>
         <label className='block text-primaryText'>Staff Loan</label>
         <input
          type='number'
          name='staff_loan'
          onChange={handleChange}
          value={employee.staff_loan || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
         />
        </div>
        {/* stamp duty */}
        <div>
         <label className='block text-primaryText'>Stamp Duty</label>
         <input
          type='number'
          name='stamp_duty'
          onChange={handleChange}
          value={employee.stamp_duty || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
         />
        </div>
       </div>
       <div className='w-full h-0.5 bg-gray-300 mb-2 mt-5'></div>

       {/*------------------------------------bank details------------------------------------------------------------------ */}
       <p className='mt-2 mb-5 text-gray-500 text-sm'>Bank details</p>
       <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
        {/* bank name */}
        <div>
         <label className='block text-primaryText'>Bank Name</label>
         <input
          type='text'
          name='bank_name'
          onChange={handleChange}
          value={employee.stamp_duty || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
         />
        </div>
        {/* branch name */}
        <div>
         <label className='block text-primaryText'>Bank Branch</label>
         <input
          type='text'
          name='bank'
          onChange={handleChange}
          value={employee.stamp_duty || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
         />
        </div>
       </div>
       <div className='flex justify-between items-center mt-5 gap-3'>
        <button
         type='submit'
         className='w-1/2 bg-green-700 py-1.5 rounded-md hover:bg-green-600 text-white transition'
        >
         Edit Employee
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
   ) : (
    <div>Loading...</div>
   )}
  </>
 );
};

export default EditEmployee;
