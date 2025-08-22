import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddDepartment = () => {
 const [department, setDepartment] = useState({
  dep_name: '',
  dep_manager: '',
  dep_des: '',
 });

 const navigate = useNavigate();

 const handleChange = (e) => {
  const { name, value } = e.target;
  setDepartment({ ...department, [name]: value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
   const response = await axios.post(
    'http://localhost:5000/api/department/add',
    department,
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   if (response.data.success) {
    navigate('/admin-dashboard/departments');
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
  <div className='max-w-lg mx-auto bg-white mt-10 p-8 rounded-md '>
   <h3 className='text-2xl text-center text-blue-800 font-medium'>
    Add Department
   </h3>
   <form onSubmit={handleSubmit}>
    <div className='mt-5'>
     <label htmlFor='dep_name' className='text-primaryText'>
      Department Name
     </label>
     <input
      type='text'
      name='dep_name'
      onChange={handleChange}
      className='mt-1 w-full p-2 border border-primaryLight rounded-md outline-none text-gray-600'
      required
     />
    </div>
    <div className='mt-3'>
     <label htmlFor='dep_manager' className='text-primaryText'>
      Department Manager
     </label>
     <input
      type='text'
      name='dep_manager'
      onChange={handleChange}
      className='mt-1 w-full p-2 border border-primaryLight rounded-md outline-none text-gray-600'
      required
     />
    </div>
    <div className='mt-3'>
     <label htmlFor='dep_email' className='text-primaryText'>
      Department Email
     </label>
     <input
      type='email'
      name='dep_email'
      onChange={handleChange}
      className='mt-1 w-full p-2 border border-primaryLight rounded-md outline-none text-gray-600'
      required
     />
    </div>
    <div className='mt-3'>
     <label htmlFor='dep_des' className='block text-primaryText'>
      Description
     </label>
     <textarea
      rows='4'
      type='text'
      name='dep_des'
      onChange={handleChange}
      className='mt-1 block p-2 w-full border border-primaryLight rounded-md outline-none text-gray-600'
     />
    </div>
    <div className='flex justify-between items-center mt-5 gap-3'>
     <button
      type='submit'
      className='w-1/2 bg-green-700 py-1.5 rounded-md hover:bg-green-600 text-white transition'
     >
      Add Department
     </button>
     <Link
      to='/admin-dashboard/departments'
      className='bg-red-700 py-1.5 w-1/2 text-center rounded-md text-white hover:bg-red-600 transition'
     >
      Cancel
     </Link>
    </div>
   </form>
  </div>
 );
};

export default AddDepartment;
