import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const AddLeave = () => {
 const { user } = useAuth();

 const navigate = useNavigate();

 const [leave, setLeave] = useState({
  userId: user._id,
 });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setLeave((prevState) => ({ ...prevState, [name]: value }));
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   const response = await axios.post('http://localhost:5000/api/leave/add', {
    Headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
   });
   if (response.data.success) {
    navigate('/employee-dashboard/leaves');
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    alert(error.response.data.error);
   }
  }
 };

 return (
  <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
   <h2 className='text-2xl font-bold mb-6'>Request for a Leave</h2>
   <form onSubmit={handleSubmit}>
    <div className='flex flex-col space-y-4'>
     <div>
      <label htmlFor='' className='block text-sm font-medium text-gray-700'>
       Leave Type
      </label>
      <select
       name='leave_type'
       onChange={handleChange}
       className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
       required
      >
       <option value=''>Select Leave Type</option>
       <option value='Sick Leave'>Sick Leave</option>
       <option value='Casual Leave'>Casual Leave</option>
       <option value='Annual Leave'>Annual Leave </option>
      </select>
     </div>
     <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {/* from date */}
      <div>
       <label className='block text-sm font-medium text-gray-700'>
        From Date
       </label>
       <input
        type='date'
        name='start_date'
        onChange={handleChange}
        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
        required
       />
      </div>

      {/* to date */}
      <div>
       <label className='block text-sm font-medium text-gray-700'>
        To Date
       </label>
       <input
        type='date'
        name='end_date'
        onChange={handleChange}
        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
        required
       />
      </div>
     </div>
     {/* description */}
     <div>
      <label className='block text-sm font-medium text-gray-700'>
       Description
      </label>
      <textarea
       type='date'
       name='description'
       onChange={handleChange}
       className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
       rows='2'
      ></textarea>
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
      to='/employee-dashboard/leaves'
      className='bg-red-700 py-1.5 w-1/2 text-center rounded-md text-white hover:bg-red-600 transition'
     >
      Cancel
     </Link>
    </div>
   </form>
  </div>
 );
};

export default AddLeave;
